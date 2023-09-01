import React from 'react';

const CustomEvent = ({ event }) => {
    /*
    const startHour = new Date(event.start).getHours();
    const startMinutes = new Date(event.start).getMinutes();
    const endHour = new Date(event.end).getHours();
    const endMinutes = new Date(event.end).getMinutes();
    */
    return (
        <div className='text-center'>
            <p>{event.title} -- {event.location} </p>
                {/*De {`${startHour}:${startMinutes < 10 ? '0' : ''}${startMinutes}`} à {`${endHour}:${endMinutes < 10 ? '0' : ''}${endMinutes}`}
                */}
        </div>
    );
};

export default CustomEvent;
