import React, { useEffect } from "react";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { useSelector, useDispatch } from "react-redux";
import Calendrier from "./calendar/calendar";
import jwt_decode from "jwt-decode";
import { LogoutAction } from "../redux/Actions/LoginAction";
import { useNavigate } from "react-router-dom";
import AccountBoxIcon from '@mui/icons-material/AccountBox';


export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userToken = useSelector((state) => state.login.userToken);
  const decodedToken = jwt_decode(userToken);
  const userRole = decodedToken.role;
  const userInfo = useSelector((state) => state.login.userInfo);

  const LogoutSubmit = () => {
    dispatch(LogoutAction());
    navigate("/");
  }
  const ProfileSubmit = () => {
    navigate("/profile");
  }

  useEffect(() => { !userInfo && navigate("/") }, [userInfo, navigate]);

  return (
    <div style={{ width: "100%", height: "100vh", margin: 0, }}>
      <AppBar>
        <Toolbar >
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className="d-flex justify-content-start"
          >
            <div onClick={ProfileSubmit} className="mt-2">
              <IconButton color="inherit">
                <AccountBoxIcon />
              </IconButton>
            </div>
            <p className="mt-3 ms-3">Bienvenue  {userRole}</p>

          </Typography>
          <IconButton color="inherit" className="position-absolute  end-0 me-3" onClick={LogoutSubmit} >
            <ExitToAppIcon />
          </IconButton>

        </Toolbar>
      </AppBar>


      <div style={{ position: "absolute", top: "10%", left: "5%", width: "90%", height: "80%" }} >
        <Calendrier />
      </div>

    </div>
  );

}
