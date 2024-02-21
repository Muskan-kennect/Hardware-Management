// middleware/checkAuth.js
export default function ({ route, redirect }) {
    // Your logic here

   
    if (process.client && route.path !== '/login') {
        const userLoggedData = JSON.parse(localStorage.getItem("EmployeeDetails"));
    
        console.log("logged IN",userLoggedData)
        // Your logic here based on userLoggedData
        if (!userLoggedData ) {
          // Redirect to login page if not logged in
          return redirect('/login');
        }
      }
      else if(process.client && route.path === '/login') {
        console.log("logN")
        const userLoggedData = JSON.parse(localStorage.getItem("EmployeeDetails"));
    
        if (userLoggedData && userLoggedData.isAdmin === 1) {
          return redirect('/admin');
        } else if(userLoggedData && userLoggedData.isAdmin !== 1){
          return redirect('/employee/specificEmployee/${userLoggedData.employeeId}');
        }
      }
  }
  