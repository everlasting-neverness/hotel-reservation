import React from 'react';
import Room from './Room';

export default function RoomsList({ rooms }) {

    if (!rooms) {
        return null;
    }

    return (
        <div className='roomslist-center'>
            {rooms.map(room => (
                <Room key={room.id} room={room} />
            ))}
        </div>
    )
}
