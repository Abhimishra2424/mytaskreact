import React from "react";
import Typography from "@material-ui/core/Typography";
import { useAppContext } from "../../context/appContext";

export default function DoneTask() {
  const { AllTasks } = useAppContext();

  const getTotalDoneTask = AllTasks?.filter((i) => i.status === "done");

  return (
    <React.Fragment>
      <Typography component="p" variant="h4">
        Done Task
      </Typography>
      <Typography component="p" variant="h4">
        {getTotalDoneTask.length}
      </Typography>
    </React.Fragment>
  );
}
