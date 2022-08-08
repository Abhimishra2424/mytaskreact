import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "../components/Navbars/Navbar";
import Sidebar from "../components/Sidebar/Sidebar.js";


import routes from "../routes";

import styles from "../assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "../assets/img/sidebar-2.jpg";
import logo from "../assets/img/reactlogo.png";
import SubDashboard from "../views/SubDashboard/SubDashboard";

let ps;


const switchRoutes = (
    <Switch>
        {routes.map((prop, key) => {
            return (
                <Route
                    path={prop.path}
                    component={prop.component}
                    key={key}
                />
            );
        })}
    </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
    // styles
    const classes = useStyles();
    // ref to help us initialize PerfectScrollbar on windows devices
    const mainPanel = React.createRef();

    const [image, setImage] = React.useState(bgImage);
    const [color, setColor] = React.useState("blue");
    const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const getRoute = () => {
        return window.location.pathname !== "/mytask";
    };
    const resizeFunction = () => {
        if (window.innerWidth >= 960) {
            setMobileOpen(false);
        }
    };

    React.useEffect(() => {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(mainPanel.current, {
                suppressScrollX: true,
                suppressScrollY: false,
            });
            document.body.style.overflow = "hidden";
        }
        window.addEventListener("resize", resizeFunction);
        // Specify how to clean up after this effect:
        return function cleanup() {
            if (navigator.platform.indexOf("Win") > -1) {
                ps.destroy();
            }
            window.removeEventListener("resize", resizeFunction);
        };
    }, [mainPanel]);

    return (
        <div className={classes.wrapper}>
            
            <Sidebar
                routes={routes}
                logoText={"Creative Tim"}
                logo={logo}
                image={image}
                handleDrawerToggle={handleDrawerToggle}
                open={mobileOpen}
                color={color}
                {...rest}
            />
   
            <div className={classes.mainPanel} ref={mainPanel}>
                <Navbar
                    routes={routes}
                    handleDrawerToggle={handleDrawerToggle}
                    {...rest}
                />

                {getRoute() ? (
                    <div className={classes.content}>
                        <div className={classes.container}>{switchRoutes}
                       
                        </div>
                    </div>
                ) : (
                    <><div className={classes.map}>{switchRoutes}</div>   <SubDashboard /></>
                    
                )}
                
            </div>
         

        </div>
    );
}
