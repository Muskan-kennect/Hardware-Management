const { filterEmployeeData } = require("../Config/filterFunction");
const EmployeeList = require("../Modals/EmployeeList");

 const getEmployees = async (req, res) => {
    try {
      const employees = await EmployeeList.find();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
     
      const employee = await EmployeeList.findOne({employeeEmail : email});
  
      if (!employee) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      const filteredEmployee = filterEmployeeData(employee);

      res.status(200).json(filteredEmployee);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const addEmployee = async (req, res) => {
    try {
      const { employeeName, employeeDept, employeeEmail, employeePassword } = req.body;
  
      const newEmployee = new EmployeeList({ employeeName, employeeDept, employeeEmail, employeePassword });
      await newEmployee.save();
  
      res.status(201).json("Successfully added!!");
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.employeeEmail) {
        // Duplicate key error, indicating that the email is not unique
        res.status(400).json({ error: "Email address must be unique." });
      } else {
        // Other errors
        res.status(500).json({ error: error.message });
      }
    }
  };
  
  
  // DELETE route to remove an employee by employeeId
const deleteEmployee = async (req, res) => {
    try {
      const { employeeId } = req.params;
  
      // Validate if employeeId is a valid UUID (optional, but recommended)
      const validUUID = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-4[a-fA-F0-9]{3}-[89aAbB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$/;
      if (!validUUID.test(employeeId)) {
        return res.status(400).json({ error: 'Invalid employeeId format' });
      }
  
      // Find and remove the employee by employeeId
      const deletedEmployee = await EmployeeList.findOneAndRemove({ employeeId });
  
      if (!deletedEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      res.json(deletedEmployee);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports={getEmployees,addEmployee,deleteEmployee,login};
  