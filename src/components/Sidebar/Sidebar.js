/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";

import styles from "../../assets/jss/material-dashboard-react/components/sidebarStyle.js";
import { useAppContext } from "../../context/appContext.js";
import { Button, Divider } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const { company, iswho } = useAppContext();
  const classes = useStyles();
  let location = useLocation();

  function activeRoute(routeName) {
    return location.pathname === routeName;
  }
  const { routes } = props;

  var brand = (
    <div className={classes.logo}>
      <a
        href={"" ? "" : null}
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive,
        })}
        // target="_blank"
      >
        <div className={classes.logoImage}>{/* Add LOGO Todo */}</div>
        <Link to="/mytask"> {"Task Manager"}</Link>
      </a>
    </div>
  );

  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
          style={{ backgroundColor: "#458FED" }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <Button
              // style={{ marginTop: "10px" }}
              style={{
                marginTop: "10px",
                color: "white",
              }}
              fullWidth
            >
              <Link to="/mytask/dashboard"> {"Dashboard"}</Link>
            </Button>
            <Divider />
            <Button
              size="small"
              style={{
                marginTop: "10px",
                color: "white",
              }}
              fullWidth
            >
              <Link to="/mytask/tasklist"> {"All Task List"}</Link>
            </Button>
            <Divider />
            {iswho === "company" ? (
              ""
            ) : (
              <Button
                style={{
                  marginTop: "10px",
                  color: "white",
                }}
                fullWidth
                disabled={iswho === "company" ? true : false}
              >
                <Link to="/mytask/employee/tasklist"> {"Assign Task"}</Link>
              </Button>
            )}

            <Divider />
            {iswho === "employee" ? (
              ""
            ) : (
              <Button
                style={{
                  marginTop: "10px",
                  color: "white",
                }}
                fullWidth
                disabled={iswho === "employee" ? true : false}
              >
                <Link to="/mytask/createTask"> {"Create task"}</Link>
              </Button>
            )}

            <Divider />
            {iswho === "employee" ? (
              ""
            ) : (
              <Button
                style={{
                  marginTop: "10px",
                  color: "white",
                }}
                fullWidth
                disabled={iswho === "employee" ? true : false}
              >
                <Link to="/mytask/createEmployee"> {"Create Employee"}</Link>
              </Button>
            )}

            {iswho === "employee" ? (
              ""
            ) : (
              <Button
                style={{
                  marginTop: "10px",
                  color: "white",
                }}
                fullWidth
              >
                <Link to="/mytask/AllEmployee"> {"All Employee"}</Link>
              </Button>
            )}
            {iswho === "company" ? (
              ""
            ) : (
              <Button
                style={{
                  marginTop: "10px",
                  color: "white",
                }}
                fullWidth
              >
                <Link to="/mytask/employee/createNote"> {"Create Note"}</Link>
              </Button>
            )}
          </div>
          <div className={classes.background} />
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive,
            }),
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <Button
              // style={{ marginTop: "10px" }}
              style={{
                marginTop: "10px",
                color: "white",
              }}
              fullWidth
            >
              <Link to="/mytask/dashboard"> {"Dashboard"}</Link>
            </Button>
            <Divider />
            <Button
              size="small"
              style={{
                marginTop: "10px",
                color: "white",
              }}
              fullWidth
            >
              <Link to="/mytask/tasklist"> {"All Task List"}</Link>
            </Button>
            <Divider />
            {iswho === "company" ? (
              ""
            ) : (
              <Button
                style={{
                  marginTop: "10px",
                  color: "white",
                }}
                fullWidth
                disabled={iswho === "company" ? true : false}
              >
                <Link to="/mytask/employee/tasklist"> {"Assign Task"}</Link>
              </Button>
            )}
                <Divider />
            {iswho === "employee" ? (
              ""
            ) : (
              <Button
                style={{
                  marginTop: "10px",
                  color: "white",
                }}
                fullWidth
                disabled={iswho === "employee" ? true : false}
              >
                <Link to="/mytask/createTask"> {"Create task"}</Link>
              </Button>
            )}

            <Divider />
            {iswho === "employee" ? (
              ""
            ) : (
              <Button
                style={{
                  marginTop: "10px",
                  color: "white",
                }}
                fullWidth
                disabled={iswho === "employee" ? true : false}
              >
                <Link to="/mytask/createEmployee"> {"Create Employee"}</Link>
              </Button>
            )}

            {iswho === "employee" ? (
              ""
            ) : (
              <Button
                style={{
                  marginTop: "10px",
                  color: "white",
                }}
                fullWidth
              >
                <Link to="/mytask/AllEmployee"> {"All Employee"}</Link>
              </Button>
            )}
            {iswho === "company" ? (
              ""
            ) : (
              <Button
                style={{
                  marginTop: "10px",
                  color: "white",
                }}
                fullWidth
              >
                <Link to="/mytask/employee/createNote"> {"Create Note"}</Link>
              </Button>
            )}
          </div>
          <div className={classes.background} />
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};
