const filterEmployeeData = (employee) => {
    const { _id, employeeId, employeeName, employeeDept, employeeEmail, isAdmin, created_at, modified_at } = employee;

    return {
        _id,
        employeeId,
        employeeName,
        employeeDept,
        employeeEmail,
        isAdmin,
        created_at,
        modified_at,
    };
};

module.exports={filterEmployeeData}