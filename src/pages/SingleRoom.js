import React, { Component } from 'react';
import Hero from '../components/Hero';
export default class SingleRoom extends Component {
    render() {
        return (
            <Hero hero='roomsHero'>
                <div>SingleRoom</div>
            </Hero>
        );
    }
}
