
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reservationAction } from "../../redux/Actions/reservationAction";
import { SalleAction } from "../../redux/Actions/SalleAction";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../../App.css';
import ModifForm from "./Modifer";
import AddIcon from '@mui/icons-material/Add';
import Reservation from "./Ajouter";
import { ReservationBySalleIdAction } from "../../redux/Actions/reservationAction";
import jwt_decode from "jwt-decode";
import CustomEvent from "./event";

const localizer = momentLocalizer(moment);

const Calendrier = () => {

  const userToken = useSelector((state) => state.login.userToken);
  const decodedToken = jwt_decode(userToken);
  const userRole = decodedToken.role;
  const userId = decodedToken.userId;

  const dispatch = useDispatch();
  const [showModifForm, setShowModifForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const reservationState = useSelector((state) => state.reservations.reservation);
  const salleState = useSelector((state) => state.salle.salle);

  useEffect(() => {
    dispatch(reservationAction());
    dispatch(SalleAction());
  }, [dispatch]);

  const reservationsArray = Array.isArray(reservationState) ? reservationState : [];
  const salleArray = Array.isArray(salleState) ? salleState : Object.values(salleState);

 
  const events = reservationsArray.map(reservation => {
    const room = salleArray.find(salle => salle.id === reservation.salleId);
    return {
      id: reservation.id,
      start: new Date(reservation.startTime),
      end: new Date(reservation.endTime),
      title: reservation.sujet,
      location: room ? room.nom : '',
    };
  });
    const reservationsEmployee = reservationsArray.filter((reservation) => reservation.UserId === userId);
    const eventsEmployee = reservationsEmployee.map((reservation) => {
      const room = salleArray.find((salle) => salle.id === reservation.salleId);
      return {
        id: reservation.id,
        start: new Date(reservation.startTime),
        end: new Date(reservation.endTime),
        title: reservation.sujet,
        location: room ? room.nom : '',
      };
    });
  
  

  const handleEventClick = (event) => {
    setShowModifForm(true);
    setSelectedEvent(event);
  };

  //style des évènements
  const eventStyleGetter = (event) => {
    let backgroundColor = 'skyblue';
    let color = 'white';

    if (event.location === 'room 1') {
      backgroundColor = 'yellow';
      color = 'royalblue';
    }
    const style = {
      backgroundColor,
      color,
      borderRadius: '5px',
    };
    return {
      style,
    };
  };


  return (
    <div>
      <div>
        <Calendar
          views={{
            month: true,
            week: true,
            day: true,
          }}
          localizer={localizer}
          events={userRole === "admin" ? events : eventsEmployee}
          components={{
            event: CustomEvent,
          }}
          eventPropGetter={eventStyleGetter}
          style={{ height: 580, width: "85%", margin: "auto",
          }}
          onSelectEvent={handleEventClick}
        />
      </div>

      {/*Formulaire de modification */}
      {showModifForm && (
          <ModifForm
            event={selectedEvent}
            onCancel={() => setShowModifForm(false)}
          />
        
      )}

      {/*Formulaire d'ajout' */}
      <button
        className='but position-absolute bottom-0 end-0 rounded-circle p-4 mb-5'
        onClick={() => setShowAddForm(!showAddForm)}
      >
        <AddIcon />
      </button>
      {showAddForm &&
        <Reservation
          onCancel={() => setShowAddForm(false)} />}

      {userRole === "admin" && 
        <div className="d-flex justify-content-center mt-2">
          <button className="bajout m-1 rounded" onClick={() => dispatch(reservationAction())}>Tout</button>
          {salleArray.map((salle,index) =>
            <button key={index} className="bajout m-1 rounded" onClick={() => dispatch(ReservationBySalleIdAction(salle.id))}>{salle.nom}</button>
          )}
        </div>
      }

    </div>
  );
}

export default Calendrier;
