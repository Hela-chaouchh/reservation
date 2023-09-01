
import React, { useState } from 'react';
import { AddReservationAction, reservationAction } from "../../redux/Actions/reservationAction";
import { SalleAction } from "../../redux/Actions/SalleAction";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomAlert from './Alert';

const Reservation = ({ onCancel }) => {

    const [showAlert,setShowAlert] = useState(false)
    const [showAlert2,setShowAlert2] = useState(false)
    const [showAlert3,setShowAlert3] = useState(false)
    const [showAlert4,setShowAlert4] = useState(false)
    const dispatch = useDispatch()
    const salleState = useSelector((state) => state.salle.salle);
    const reservationState = useSelector((state) => state.reservations.reservation)

    useEffect(() => {
        dispatch(reservationAction())
        dispatch(SalleAction());
    }, [dispatch]);


    const salleArray = Array.isArray(salleState) ? salleState : Object.values(salleState);
    const reservationsArray = Array.isArray(reservationState) ? reservationState : Object.values(reservationState);

    const userToken = useSelector((state) => state.login.userToken);
    const decodedToken = jwt_decode(userToken);
    const userId = decodedToken.userId;

    const handleEventAdded = async (addedEvent) => {
        const salleId = salleArray.find(salle => salle.nom === addedEvent.location).id;
        const newReservation = {
            startTime: addedEvent.debut,
            endTime: addedEvent.fin,
            sujet: addedEvent.titre,
            salleId: salleId,
            userId: userId,
        };

        try {
            await dispatch(AddReservationAction(newReservation));
            onCancel();
            dispatch(reservationAction());
        } catch (error) {
            console.error('Error adding reservation:', error.message);
        }
    };

    
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const debut = new Date(formData.get("debut")).toISOString(); 
        const fin = new Date(formData.get("fin")).toISOString();     
        const location = formData.get("location");

        if (new Date(fin).getTime() >= new Date(debut).getTime() + 24 * 60 * 60 * 1000) {
            setShowAlert3(true);
            return;
          }

          const dayOfWeekDebut = new Date(debut).getDay();
          const dayOfWeekFin = new Date(fin).getDay();
          
          if (dayOfWeekDebut === 0 || dayOfWeekDebut === 6 || dayOfWeekFin === 0 || dayOfWeekFin === 6) {
            setShowAlert4(true);
            return;
          }
          
        if (fin <= debut) {
            setShowAlert2(true)
            return;
        }

        const salleId = salleArray.find(salle => salle.nom === location).id;

        const periodeOccupe = reservationsArray.find(reservation =>
            reservation.salleId === salleId &&
            (
                (debut >= new Date(reservation.startTime).toISOString() && debut < new Date(reservation.endTime).toISOString()) ||
                (fin > new Date(reservation.startTime).toISOString() && fin <= new Date(reservation.endTime).toISOString())
            )

        );

        if (periodeOccupe) {
            setShowAlert(true);
            return;
        }

        const addedEvent = {
            debut: debut,
            fin: fin,
            titre: formData.get("titre"),
            location: location,
            
        };

        handleEventAdded(addedEvent);
        form.reset();

    };



    return (
        <div className="reservation-overlay">
            <div className="d-flex flex-column justify-content-center align-items-center position-fixed top-50 start-50 translate-middle reservation-modal">
                <button type="button" className="btn-close position-absolute top-0 end-0 mt-2 me-2" aria-label="Close" onClick={onCancel}></button>
    
                <form className='w-100 mt-5' onSubmit={handleSubmit}>
                    <div className='d-flex mb-3'><label className="form-label w-25">début</label>
                        <input type="datetime-local" name="debut" className="form-control" required />
                    </div>
                    <div className='d-flex mb-3'><label className="form-label w-25">fin</label>
                        <input type="datetime-local" name="fin" className="form-control" required />
                    </div>
                    <div className='d-flex mb-3'><label className="form-label w-25">titre</label>
                        <input type="text" name="titre" className="form-control" required />
                    </div>
                    <div className='d-flex mb-3'><label className="form-label w-25">location</label>
                        <select className="form-control" name="location" >
                            {salleArray.map((salle,index) =>
                                <option key={index}>{salle.nom}</option>
                            )}

                        </select>

                        
                    </div>

                    <div className='mt-4 mb-2 d-flex justify-content-center btn-group'>
                        <input type="submit" value='Ajouter' className='bajout fw-bold rounded ms-2' ></input>
                        <input type="reset" value='Annuler' onClick={onCancel} className='bajout fw-bold rounded ms-2'></input>
                    </div>
                </form>
            </div>
            <CustomAlert show={showAlert} message="Période occupée !" onClose={() => setShowAlert(false)} />
            <CustomAlert show={showAlert2} message="endTime < startTime!" onClose={() => setShowAlert2(false)} />
            <CustomAlert show={showAlert3} message="pèriode réservation dépasse 24h!" onClose={() => setShowAlert3(false)} />
            <CustomAlert show={showAlert4} message="Weekend !!" onClose={() => setShowAlert4(false)} />
        </div>
    );
}

export default Reservation;


