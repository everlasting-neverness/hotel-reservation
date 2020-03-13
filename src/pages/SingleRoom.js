import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { RoomContext } from '../context';
import StyledHero from '../components/StyledHero';
import defaultBcg from '../images/room-1.jpeg';

export default class SingleRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slug: this.props.match.params.slug,
            defaultBcg
        };
    }

    static contextType = RoomContext;

    render() {
        const { getRoom } = this.context,
            room = getRoom(this.state.slug);

        if (!room) {
            return (
                <div className='error'>
                    <h3>No such room could be found...</h3>
                    <Link to='/rooms' className='btn-primary'>
                        Back to rooms
                    </Link>
                </div>
            );
        }

        const {
            name,
            description,
            images,
            capacity,
            size,
            price,
            extras,
            brekfast,
            pets
        } = room;

        const [mainImg, ...defaultImg] = images;

        return (
            <>
                <StyledHero img={mainImg || this.state.defaultBcg}>
                    <Banner title={`${name} room`}>
                        <Link to='/rooms' className='btn-primary'>
                            Back to rooms
                        </Link>
                    </Banner>
                    <div>SingleRoom</div>
                </StyledHero>
                <section className='single-room'>
                    <div className='single-room-images'>
                        {defaultImg.map((item, index) => {
                            return <img key={index} src={item} alt={name} />;
                        })}
                    </div>
                    <div className='single-room-info'>
                        <article className='desc'>
                            <h3>details</h3>
                            <p>{description}</p>
                        </article>
                        <article className='info'>
                            <h3>info</h3>
                            <h6>price : ${price}</h6>
                            <h6>size : {size} SQFT</h6>
                            <h6>
                                max capacity : {capacity}{' '}
                                {capacity > 1 ? `people` : `person`}
                            </h6>
                            <h6>{pets ? '' : 'no '} pets allowed</h6>
                            <h6>{brekfast && 'free brekfast included'}</h6>
                        </article>
                    </div>
                </section>
                <section className='room-extras'>
                    <h6>extras</h6>
                    <ul className='extras'>
                        {extras.map((item, index) => (
                            <li key={index}>- {item}</li>
                        ))}
                    </ul>
                </section>
            </>
        );
    }
}
