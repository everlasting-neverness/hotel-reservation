import React, { useContext } from 'react';
import { RoomContext } from '../context';
import Title from './Title';

const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))];
};

const createOptions = arr =>
    arr.map((item, index) => (
        <option key={index} value={item}>
            {item}
        </option>
    ));

export default function RoomsFilter({ rooms }) {
    const context = useContext(RoomContext),
        {
            type,
            capacity,
            price,
            minPrice,
            maxPrice,
            minSize,
            maxSize,
            breakfast,
            pets,
            handleChange
        } = context,
        types = createOptions(['all', ...getUnique(rooms, 'type')]),
        guests = createOptions(getUnique(rooms, 'capacity'));

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
                <div className='form-group'>
                    <label htmlFor='capacity'>Guests</label>
                    <select
                        name='capacity'
                        id='capacity'
                        value={capacity}
                        className='form-control'
                        onChange={handleChange}
                    >
                        {guests}
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor='price'>room price ${price}</label>
                    <input
                        type='range'
                        name='price'
                        id='price'
                        min={minPrice}
                        max={maxPrice}
                        value={price}
                        className='form-control'
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='size'>room size</label>
                    <div className='size-inputs'>
                        <input
                            type='number'
                            name='minSize'
                            id='size'
                            value={minSize}
                            className='size-input'
                            onChange={handleChange}
                        />
                        <input
                            type='number'
                            name='maxSize'
                            id='size'
                            value={maxSize}
                            className='size-input'
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className='form-group'>
                    <div className='single-extra'>
                        <input
                            type='checkbox'
                            name='breakfast'
                            id='breakfast'
                            checked={breakfast}
                            onChange={handleChange}
                        />
                        <label htmlFor='breakfast'>breakfast</label>
                    </div>
                    <div className='single-extra'>
                        <input
                            type='checkbox'
                            name='pets'
                            id='pets'
                            checked={pets}
                            onChange={handleChange}
                        />
                        <label htmlFor='pets'>pets</label>
                    </div>
                </div>
            </form>
        </section>
    );
}
