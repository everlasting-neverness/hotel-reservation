import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { RoomContext } from '../context';
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

        return (
            <Hero hero='roomsHero'>
                <Banner title={`${name} room`}>
                    <Link to='/rooms' className='btn-primary'>
                        Back to rooms
                    </Link>
                </Banner>
                <div>SingleRoom</div>
            </Hero>
        );
    }
}
