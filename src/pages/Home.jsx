import React from 'react';
import '../style/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Facts, Carousel, About, Course, Spinner } from '../components';


const Home = () => {
    return (
    <div>
            <Carousel />
            <Facts />
            <About />   
            <Course />
    </div>
    )
}

export default Home;