import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useAppContext } from "../../context/appContext";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const NoteList = () => {
  const classes = useStyles();
  const { AllNotes, getAllNotesByEmployeeIdandCompanyId } = useAppContext();

  useEffect(() => {
    getAllNotesByEmployeeIdandCompanyId();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Typography>All Notes</Typography>
      <Grid container spacing={2}>
        {AllNotes?.map((val, index) => {
          return (
            <Grid item xs={12} key={index}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography>{val?.note_id}</Typography>
                   <br />
                   {val?.notes}
                </CardContent>
                <CardActions>
                  <Button size="small">Delete</Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default NoteList;
