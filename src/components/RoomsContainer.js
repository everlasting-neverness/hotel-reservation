import React from 'react';
import { RoomConsumer } from '../context';
import RoomsFilter from './RoomsFilter.js';
import RoomsList from './RoomsList.js';
import Loading from '../components/Loading';

export default function RoomsContainer(props) {
    return (
        <RoomConsumer>
            {value => {
                const { loading, rooms, sortedRooms } = value;

                return (
                    <div>
                        <RoomsFilter rooms={rooms} />
                        <RoomsList rooms={sortedRooms} />
                    </div>
                );
            }}
        </RoomConsumer>
    );
}
