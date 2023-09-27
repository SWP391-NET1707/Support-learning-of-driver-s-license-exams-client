import React from 'react';
import '../style/home.css';
import { Facts, Carousel, About, Course, Spinner } from '../components';
// import 'owl.carousel'
// import 'wowjs'
import 'animate.css';

const Home = () => {
    return (
    <div>
            <Spinner />
            <Carousel />
            <Facts />
            <About />   
            <Course />
    </div>
    )
}

export default Home;