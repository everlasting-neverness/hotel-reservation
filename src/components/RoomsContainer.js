import React from 'react';
import { withRoomConsumer } from '../context';
import RoomsFilter from './RoomsFilter.js';
import RoomsList from './RoomsList.js';
import Loading from '../components/Loading';

function RoomsContainer({ context }) {
    const { loading, rooms, sortedRooms } = context;

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <RoomsFilter rooms={rooms} />
            <RoomsList rooms={sortedRooms} />
        </>
    );
}

export default withRoomConsumer(RoomsContainer);

// 2 way of using context Consumer
// import React from 'react';
// import { RoomConsumer } from '../context';
// import RoomsFilter from './RoomsFilter.js';
// import RoomsList from './RoomsList.js';
// import Loading from '../components/Loading';

// export default function RoomsContainer(props) {
//     return (
//         <RoomConsumer>
//             {value => {
//                 const { loading, rooms, sortedRooms } = value;

//                 if (loading) {
//                     return <Loading />;
//                 }

//                 return (
//                     <div>
//                         <RoomsFilter rooms={rooms} />
//                         <RoomsList rooms={sortedRooms} />
//                     </div>
//                 );
//             }}
//         </RoomConsumer>
//     );
// }
