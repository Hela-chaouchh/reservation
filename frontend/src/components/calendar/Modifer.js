import React, { useState, useEffect } from "react";
import { UpdateReservationAction, DeleteReservationAction, reservationAction } from "../../redux/Actions/reservationAction";
import { useDispatch, useSelector } from "react-redux";
import { SalleAction } from "../../redux/Actions/SalleAction";
import '../../App.css'
//import DatePicker from "react-datepicker"; 
//import "react-datepicker/dist/react-datepicker.css"; 
import CustomAlert from './Alert';
import jwt_decode from "jwt-decode";


const ModifForm = ({ event, onCancel }) => {

  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(false)
  const [showAlert2, setShowAlert2] = useState(false)
  const [showAlert3, setShowAlert3] = useState(false)
  const [showAlert4, setShowAlert4] = useState(false)
  const [showAlert5, setShowAlert5] = useState(false)
  const salleState = useSelector((state) => state.salle.salle);
  const salleArray = Array.isArray(salleState) ? salleState : Object.values(salleState);
  const reservationState = useSelector((state) => state.reservations.reservation)
  const reservationsArray = Array.isArray(reservationState) ? reservationState : Object.values(reservationState);

  useEffect(() => {
    dispatch(reservationAction())
    dispatch(SalleAction());
  }, [dispatch]);

  const userToken = useSelector((state) => state.login.userToken);
  const decodedToken = jwt_decode(userToken);
  const userRole = decodedToken.role;
  const userId = decodedToken.userId;

  const idUserEvent = reservationsArray.find(reservation => reservation.id === event.id).UserId;


  const [id] = useState(event ? event.id : "");
  const [title, setTitle] = useState(event ? event.title : "");
  const [debut, setDebut] = useState(event ? new Date(event.start).toISOString().substring(0, 16) : "");
  const [fin, setFin] = useState(event ? new Date(event.end).toISOString().substring(0, 16) : "");
  const [location, setLocation] = useState(event ? event.location : "");


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (idUserEvent !== userId && userRole !== "admin") {
      setShowAlert3(true);
      return;
    }
    
    if (new Date(fin).getTime() >= new Date(debut).getTime() + 24 * 60 * 60 * 1000) {
      setShowAlert4(true);
      return;
    }

    const dayOfWeekDebut = new Date(debut).getDay();
    const dayOfWeekFin = new Date(fin).getDay();
    
    if (dayOfWeekDebut === 0 || dayOfWeekDebut === 6 || dayOfWeekFin === 0 || dayOfWeekFin === 6) {
      setShowAlert5(true);
      return
    }


    if (fin <= debut) {
      setShowAlert2(true)
      return;
    }

    const salleId = salleArray.find(salle => salle.nom === location).id;

    const periodeOccupe = reservationsArray.find(reservation =>
      reservation.id !== id &&
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

    const modifiedReservation = {
      id,
      startTime: debut,
      endTime: fin,
      sujet: title,
      salleId: salleId,
      userId,
    };
    await dispatch(UpdateReservationAction(modifiedReservation));
    onCancel();
    dispatch(reservationAction());
  };

  const deleteSubmit = async (id) => {
    dispatch(DeleteReservationAction(id));
    dispatch(reservationAction());
  }

  return (
    <div className="reservation-overlay">
      <div className="d-flex flex-column justify-content-center align-items-center position-fixed top-50 start-50 translate-middle reservation-modal">
        <button type="button" className="btn-close position-absolute top-0 end-0 mt-3 me-3" aria-label="Close" onClick={onCancel}></button>
        <form className='w-100 mt-5' onSubmit={handleSubmit}>
          <div className='d-flex mb-3'><label className="form-label  w-25">titre</label>
            <input type="text" name="titre" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className='d-flex mb-3'><label className="form-label w-25">début</label>
            <input type="datetime-local" name="debut" className="form-control" value={debut} onChange={(e) => setDebut(e.target.value)} />
            {/*
              <DatePicker
                selected={new Date(debut)}
                onChange={(date) => setDebut(date.toISOString())}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="yyyy-MM-dd HH:mm"
                className="w-100 form-control"
                name="debut"
              />
            */}
          </div>

          <div className='d-flex mb-3'><label className="form-label w-25">fin</label>
            <input type="datetime-local" name="fin" className="form-control" value={fin} onChange={(e) => setFin(e.target.value)} />
            {/* 
              <DatePicker
                selected={new Date(fin)}
                onChange={(date) => setFin(date.toISOString())}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="yyyy-MM-dd HH:mm"
                className="w-100 form-control"
                name="fin"
              />
              */}
          </div>

          <div className='d-flex mb-3'><label className="form-label w-25">location</label>
            <select className="form-control" value={location} name="location" onChange={(e) => setLocation(e.target.value)}>
              {salleArray.map((salle, index) =>
                <option key={index}>{salle.nom}</option>
              )}

            </select>
          </div>

          <div className="mt-4 mb-2 d-flex justify-content-center">
            <button type="submit" className="bajout rounded ms-2">Enregistrer</button>
            <button type="button" onClick={onCancel} className="bajout rounded ms-2">Annuler</button>
            <button className="bdelete rounded ms-2 bg-danger" aria-label="Close" onClick={() => deleteSubmit(id)}>delete</button>
          </div>

        </form>
      </div>
      <CustomAlert show={showAlert} message="Période occupée !" onClose={() => setShowAlert(false)} />
      <CustomAlert show={showAlert2} message="endTime < startTime!" onClose={() => setShowAlert2(false)} />
      <CustomAlert show={showAlert3} message="non autorisé !!!" onClose={() => setShowAlert3(false)} />
      <CustomAlert show={showAlert4} message="pèriode réservation dépasse 24h!" onClose={() => setShowAlert4(false)} />
      <CustomAlert show={showAlert5} message="Weekend !!" onClose={() => setShowAlert5(false)} />
    </div>
  );
}

export default ModifForm;
