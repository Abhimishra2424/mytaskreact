import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TabPanel from "../../components/TabPanel";

export default function Dashboard() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography
          component="div"
        // style={{ backgroundColor: "#cfe8fc", height: "100vh" }}
        >

          <TabPanel />
        </Typography>
      </Container>
    </React.Fragment>
  );
}
