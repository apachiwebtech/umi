import React, { useEffect, useState } from 'react'

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import banner from '../../../Images/1600w-xPGAjV9zPS0.webp'
import catimg from '../../../Images/cat.png'
import pasta from '../../../Images/pasta.jpeg'
import dish from '../../../Images/dish.png'
import { Link } from 'react-router-dom';
import { BASE_URL, IMAGE_URL } from '../../Utils/BaseUrl';
import axios from 'axios';
const Category = () => {
    const [category, setCategory] = useState([]);

    const responsive = {
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 4,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 5,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    const getCategory = async () => {
        const response = await axios.get(`${BASE_URL}/category`);

        // console.log(response.data);
        setCategory(response.data);
    }
    useEffect(() => {
        getCategory();
    }, [])
    return (
        <div>
            <div className='Cat-head'>
                <hr />
                <p className='p0'>CATEGORY</p>
            </div>
            <Carousel responsive={responsive} autoPlay={true} infinite={true} arrows={false}>


                {
                    category.map((item) => {
                        return (
                            <div className='text-center cat-sec  '>
                                <Link to={`/menupage/${item.id}`}>
                                    <div className='circle m-auto'>
                                        <img src={`${IMAGE_URL}/category/${item.upload_image}`} alt="" />
                                    </div>
                                    <p>{item.category}</p>
                                </Link>

                            </div>
                        )
                    })
                }
            </Carousel>
        </div>
    )
}

export default Category