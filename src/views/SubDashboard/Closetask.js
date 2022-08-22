import React from "react";
import Typography from "@material-ui/core/Typography";
import { useAppContext } from "../../context/appContext";

export default function CloseTask() {
  const { AllTasks } = useAppContext();

  const getTotalCloseTask = AllTasks?.filter((i) => i.status === "close");

  console.log(getTotalCloseTask);

  return (
    <React.Fragment>
      <Typography component="p" variant="h4">
        Close Task
      </Typography>
      <Typography component="p" variant="h4">
        {getTotalCloseTask.length}
      </Typography>
    </React.Fragment>
  );
}
