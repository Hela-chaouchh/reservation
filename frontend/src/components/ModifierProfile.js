import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../App.css'
import jwt_decode from "jwt-decode";
import { UpdateUserAction, UserProfileAction } from "../redux/Actions/UserAction";


const ModifProfile = ({ onCancel }) => {

    const dispatch = useDispatch();
    const userToken = useSelector((state) => state.login.userToken);
    const decodedToken = jwt_decode(userToken);
    const userId = decodedToken.userId;

    useEffect(() => {
        dispatch(UserProfileAction(userId));
    }, [dispatch, userId]);

    const userState = useSelector((state) => state.user.user);

    const [nom, setNom] = useState(userState.nom);
    const [prenom, setPrenom] = useState(userState.prenom);
    const [email, setEmail] = useState(userState.email);


    const handleSubmit = async (e) => {
        e.preventDefault();


        const modifiedUser = {
            id: userState.id,
            nom: nom,
            prenom: prenom,
            email: email,
        };
        try {
            await dispatch(UpdateUserAction(modifiedUser));
            onCancel();

        } catch (error) {
            console.error("Error updating user profile:", error);
        }
        dispatch(UserProfileAction(userId));
    };


    return (
        <div className="reservation-overlay">
            <div className="d-flex flex-column justify-content-center align-items-center position-fixed top-50 start-50 translate-middle reservation-modal">
                <button type="button" className="btn-close position-absolute top-0 end-0 mt-3 me-3" aria-label="Close" onClick={onCancel}></button>
                <form className='w-100 mt-5' onSubmit={handleSubmit}>
                    <div className='d-flex mb-3'><label className="form-label  w-25">nom</label>
                        <input type="text" name="nom" className="form-control" value={nom} onChange={(e) => setNom(e.target.value)} />
                    </div>

                    <div className='d-flex mb-3'><label className="form-label w-25">prénom</label>
                        <input type="text" name="prenom" className="form-control" value={prenom} onChange={(e) => setPrenom(e.target.value)} />

                    </div>

                    <div className='d-flex mb-3'><label className="form-label w-25">email</label>
                        <input type="email" name="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />

                    </div>

                    <div className="mt-4 mb-2 d-flex justify-content-center">
                        <button type="submit" className="bajout rounded ms-2">Enregistrer</button>
                        <button type="button" onClick={onCancel} className="bajout rounded ms-2">Annuler</button>
                    </div>

                </form>
            </div>

        </div>
    );
}

export default ModifProfile;
