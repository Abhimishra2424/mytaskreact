import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { useAppContext } from "../../context/appContext";

export default function TotalTask() {
  const { AllTasks, getTaskSearchParam } =
    useAppContext();

  useEffect(() => {
    const searchParam = "";
    getTaskSearchParam(searchParam);
  }, []);

  return (
    <React.Fragment>
      <Typography component="p" variant="h4">
        Total Task
      </Typography>
      <Typography component="p" variant="h4">
        {AllTasks.length}
      </Typography>
    </React.Fragment>
  );
}
