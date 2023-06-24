import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { useAppContext } from "../../context/appContext";


export default function TotalEmployee() {
  const { AllEmployees , AllTasks  , getAllEmployeescompanyId , iswho } = useAppContext();
  
  useEffect(() => {
    if (iswho.trim() === "employee") {
      return; // Early return, no further execution of the hook
    } else {
      getAllEmployeescompanyId();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [iswho]);

  const getTotalEmployee = AllTasks.map(task => task.employeeName);
  const getUniqueEmployee = [...new Set(getTotalEmployee)];

  return (
  <React.Fragment>
    <Typography component="p" variant="h4">
      Total Employee
      </Typography>
      <Typography component="p" variant="h4">
       {AllEmployees?.length ?  AllEmployees.length : getUniqueEmployee.length}
    </Typography>
  </React.Fragment>
  );
}
