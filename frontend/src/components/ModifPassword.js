import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUserAction, UserProfileAction } from '../redux/Actions/UserAction';
import jwt_decode from "jwt-decode";
import '../App.css'
import CustomAlert from '../components/calendar/Alert';

function ModifPassword({onCancel}) {
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState(false);
  const [errorMessage2, setErrorMessage2] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const userToken = useSelector((state) => state.login.userToken);
  const decodedToken = jwt_decode(userToken);
  const userId = decodedToken.userId;
  const user = useSelector((state) => state.user.user)
  
  const [password, setPassword] = useState(user.password);
  const [confirmPassword, setConfirmPassword] = useState('');
  
  useEffect(() => {
    dispatch(UserProfileAction(userId));
  }, [dispatch, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage(true);
      return;
    }
    
      const modifUser = {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email ,
        password: password,
        role: user.role,
      };

      try {
      await dispatch(UpdateUserAction(modifUser));
      setSuccessMessage(true);
      onCancel();
    } catch (error) {
      setErrorMessage2(true);
    }
  };

  return (
    <div className="reservation-overlay">
    <div className="d-flex flex-column justify-content-center align-items-center position-fixed top-50 start-50 translate-middle reservation-modal">
        <button type="button" className="btn-close position-absolute top-0 end-0 mt-3 me-3" aria-label="Close" onClick={onCancel}></button>
        <form className='w-100 mt-5' onSubmit={handleSubmit}>
            <div className='d-flex mb-3'>
                <input type="password" name="Newpassword" className="form-control" placeholder='Nouveau Password' onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className='d-flex mb-3'>
                <input type="password" name="Confirmpassword" placeholder='Confirmer Nouveau Password' className="form-control" onChange={(e) => setConfirmPassword(e.target.value)} />

            </div>

            <div className="mt-4 mb-2 d-flex justify-content-center">
                <button type="submit" className="bajout rounded ms-2">Enregistrer</button>
                <button type="button" onClick={onCancel} className="bajout rounded ms-2">Annuler</button>
            </div>

        </form>
    </div>


    <CustomAlert show={errorMessage} message="Les 2 mots de passe ne sont pas identiques !" onClose={() => setErrorMessage(false)} />
    <CustomAlert show={successMessage} message=" Mot de passe mis à jour avec succès !" onClose={() => setSuccessMessage(false)} />
    <CustomAlert show={errorMessage2} message="Erreur lors du changement de mot de passe. !" onClose={() => setErrorMessage2(false)} />


         
        
    </div>
  );
}

export default ModifPassword;
