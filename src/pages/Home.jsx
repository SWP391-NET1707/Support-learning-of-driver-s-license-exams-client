import React from 'react';
import '../style/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Facts, Carousel, About, Course } from '../components';


const Home = () => {
    return (
        <div>
            <Carousel />
            <Course />
            <Facts />
            <About />   
    </div>
    )
}

export default Home;