import React from 'react';
import { UserProfileAction } from "../redux/Actions/UserAction";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import ModifPassword from './ModifPassword';

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import profil from "../assets/profil.png";
import ModifProfile from './ModifierProfile';
import { LogoutAction } from "../redux/Actions/LoginAction";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";


const User = () => {
    const [showModifForm, setShowModifForm] = useState(false);
    const [showModifProfileForm, setShowModifProfileForm] = useState(false);
    const dispatch = useDispatch()
    const userState = useSelector((state) => state.user.user);
    const userToken = useSelector((state) => state.login.userToken);
    const decodedToken = jwt_decode(userToken);
    const userId = decodedToken.userId;
    
    useEffect(() => {
        dispatch(UserProfileAction(userId));
    }, [dispatch, userId]);

    const navigate = useNavigate()
    useEffect(() => { !userToken && navigate("/") }, [navigate, userToken])

    const LogoutSubmit = () => {
        dispatch(LogoutAction());
        navigate("/");
      }
    return (
        <div style={{ width: "100vw;", height: "100vh", margin: 0, }}>
            <AppBar>
                <Toolbar >
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className="d-flex justify-content-start"
                    >
                        <IconButton color="inherit" onClick={() => { window.location.pathname = "/home"; }}>
                            <ArrowBackIcon />
                        </IconButton>
                        <p className="mt-3 ms-3">Mon Profile </p>
                    </Typography>
                    <IconButton color="inherit" className="position-absolute  end-0 me-3" onClick={LogoutSubmit} >
            <ExitToAppIcon />
          </IconButton>
                </Toolbar>
            </AppBar>

            <Container Name="Left-section " style={{width:"40%"}}>
                <img src={profil} alt="meeting" className="image mb-5" style={{position:"absolute", left:"15%",top:"10%"}} />

            </Container>
            <Container component="main" className="Right-section" style={{position:"absolute", left:"50%", top:"25%", width:"40%"}}>
                <table class="table shadow" >

                    <tbody>
                        <tr className='tr'>
                            <th scope="row" className='p-3 ps-4'>nom :</th>
                            <td className='text-center p-3'>{userState.nom}</td>

                        </tr>
                        <tr className='tr'>
                            <th scope="row" className='p-3 ps-4'>prenom :</th>
                            <td className='text-center p-3'>{userState.prenom}</td>
                        </tr>
                        <tr className='tr'>
                            <th scope="row" className='p-3 ps-4'>email :</th>
                            <td className='text-center p-3'>{userState.email}</td>
                        </tr>
                        <tr className='tr'>
                            <th scope="row" className='p-3 ps-4'>password :</th>
                            <td className='text-center p-3'>
                                <button className='bajout rounded bg-body ms-2 ' style={{ width: '170px', color: "#0038a7cd", border: "1px solid #0038a7cd" }} onClick={() => setShowModifForm(!showModifForm)} >modifier password</button>
                            </td>
                        </tr>
                        <tr className='tr'>
                            <th scope="row" className='p-3 ps-4'>role :</th>
                            <td className='text-center p-3'>{userState.role}</td>
                        </tr>
                    </tbody>
                </table>
                
                
            </Container>
            <button className='bajout rounded position-absolute' style={{ left:"63%", top: "75%", width: "200px" }} onClick={() => setShowModifProfileForm(!showModifProfileForm)}>Modifier Profile</button>
            {showModifForm && <ModifPassword onCancel={() => setShowModifForm(false)} />}
            {showModifProfileForm && <ModifProfile onCancel={() => setShowModifProfileForm(false)} />}
        </div>


    );
}

export default User;