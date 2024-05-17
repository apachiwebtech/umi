import React, { useState, useEffect } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import banner from "../../../Images/1600w-xPGAjV9zPS0.webp";
import axios from "axios";
import image1 from "../../../Images/boy.png";
import image2 from "../../../Images/cat.png";
import video from "../../../Images/video.mp4";
import { BASE_URL, IMAGE_URL } from "../../Utils/BaseUrl";
import ReactPlayer from "react-player";

const Banner = () => {
  const tempBanner = [
    {
      id: "1",
      upload_image: image1,
    },
    {
      id: "2",
      upload_image: image2,
    },
    {
      id: "3",
      upload_image: video,
    },
  ];
  const [banner, setBanner] = useState([]);

  const responsive = {
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const getBannerImage = async () => {
    const response = await axios.get(`${BASE_URL}/banner`);
    // console.log(response.data);
    setBanner(response.data);
  };

  useEffect(() => {
    getBannerImage();
  }, []);

  const checkExtension = (file) => {
    return file.split(".").pop().toLowerCase();
  };
  return (
    <div>
      <Carousel
        infinite={true}
        responsive={responsive}
        arrows={false}
        showDots={true}
      // autoPlay={true}


      >
        {/* <div className='card banner-card'>
                   <img src={banner} alt=""/>
                </div>
                <div className='card banner-card'>
                <img src={banner} alt=""/>
                </div> */}
        {banner.map((item) => {
          let extent = checkExtension(item.upload_image);
          // console.log(extent);
          if (extent === "jpeg" || extent === "png" || extent === "jpg" || extent === "webp" || extent === "svg") {
            return (
              <div className="card banner-card">
                <img src={`${IMAGE_URL}/banner/${item.upload_image}`} alt="" />
                {/* <img src={`${item.upload_image}`} alt="" /> */}
              </div>
            );
          } else {
            return (<div className="card banner-card" key={item.id}>
              {/* <ReactPlayer url={`${IMAGE_URL}/banner/${item.upload_image}`}></ReactPlayer> */}
              <ReactPlayer
                width="100%"
                height="200px"
                url={`${IMAGE_URL}/banner/${item.upload_image}`}
                playing={true}
                loop={true}
                controls={false}
              />

            </div>)
          }
        })}
      </Carousel>
    </div>
  );
};

export default Banner;
