import React, { useContext } from 'react';
import { RoomContext } from '../context';
import Title from './Title';

const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))];
};

export default function RoomsFilter({ rooms }) {
    const context = useContext(RoomContext),
        {
            type,
            capacity,
            price,
            minprice,
            maxPrice,
            minSize,
            maxSize,
            breakfast,
            pets,
            handleChange
        } = context,
        types = ['all', ...getUnique(rooms, 'type')].map((item, index) => (
            <option key={index} value={item}>
                {item}
            </option>
        ));

    return (
        <section className='filter-container'>
            <Title title='search rooms' />
            <form className='filter-form'>
                <div className='form-group'>
                    <label htmlFor='type'>room type</label>
                    <select
                        name='type'
                        id='type'
                        value={type}
                        className='form-control'
                        onChange={handleChange}
                    >
                        {types}
                    </select>
                </div>
            </form>
        </section>
    );
}
