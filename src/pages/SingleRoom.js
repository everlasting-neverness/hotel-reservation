import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import { RoomContext } from '../context';
import defaultBcg from '../images/room-1.jpeg';

export default class SingleRoom extends Component {
    render() {
        return (
            <Hero hero='roomsHero'>
                <div>SingleRoom</div>
            </Hero>
        );
    }
}
