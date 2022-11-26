import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/appContext";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}));
const CreateNote = () => {
  const { createEmpNote, token , note } = useAppContext();
  const classes = useStyles();
  let navigate = useHistory()

  const [createNote, setCreateNote] = useState({
    note_id: "",
    notes: "",
  });

  const [SendData, setSendData] = useState({});

  useEffect(() => {
    var decoded = jwt_decode(token);
    setSendData(decoded.payload.employee);
  }, [token]);

  const saveNote = (e) => {
    e.preventDefault();
    let payload = {
      company_id: SendData.company_id,
      companyName: SendData.companyName,
      employeeCode: SendData.employeeCode,
      employeeName: SendData.employeeName,
      employeeEmail: SendData.employeeEmail,
      notes: createNote.notes ? createNote.notes : "",
      note_id: createNote.note_id ? createNote.note_id : 0,
    };
    createEmpNote(payload);
    if(note !== ""){
      let msg = note.msg ? note.msg : "Note created" 
      toast.success(msg)
      setCreateNote({note_id:"", notes:""})
      setTimeout(() => {
        navigate.push("/mytask/employee/AllNotes")
      }, 2000);
     }
  };

  return (
    <>
    <ToastContainer />
      <Grid container>
        <Grid item xs={12}>
          <Container maxWidth="md">
            <div className={classes.formWrapper}>
              <form onSubmit={saveNote}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography
                      style={{
                        textAlign: "center",
                        fontSize: 26,
                        backgroundColor: "#3d6889",
                        color: "white",
                      }}
                    >
                      Create Note
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="NoteID"
                      label="NoteID"
                      fullWidth
                      variant="outlined"
                      onChange={(e) => {
                        setCreateNote({
                          ...createNote,
                          note_id: e.target.value,
                        });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="notes"
                      label="Notes"
                      multiline
                      rows={4}
                      fullWidth
                      variant="outlined"
                      onChange={(e) => {
                        setCreateNote({
                          ...createNote,
                          notes: e.target.value,
                        });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#3d6889",
                        color: "white",
                      }}
                      fullWidth
                      type="submit"
                    >
                      Craete a Note
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateNote;
