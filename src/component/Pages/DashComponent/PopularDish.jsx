import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import veg from '../../../Images/veg.png';
import CartFooter from '../../Layout/CartFooter';
import { BASE_URL, IMAGE_URL } from '../../Utils/BaseUrl';
import nonveg from '../../../Images/Non.png'
import { Link } from 'react-router-dom';

const PopularDish = ({ click, currentloc ,locid}) => {
    const [count, setCount] = useState(0)
    const [popular, setPopular] = useState([])
    const [detail, setdetail] = useState([])
    const [open, setOpen] = useState(false)
    const handleclick = (id) => {
        setOpen(true)

        axios.post(`${BASE_URL}/detail_product`, { proid: id })
            .then((res) => {
                setdetail(res.data[0])
            })

    }

    const handleclose = () => {
        setOpen(false)
        setdetail([])
    }

    useEffect(()=>{
        let dataString = localStorage.getItem("locid")

        const firstNumber = parseInt(dataString.match(/\d+/)[0], 10);

        localStorage.setItem("currentloc" , firstNumber)

    },[])

    const getPopular = async () => {

        const data ={
            locid : currentloc || locid
        }
        const response = await axios.post(`${BASE_URL}/products`,data);

        // console.log(response);
        setPopular(response.data);
    }

    useEffect(() => {

        getPopular();

    }, [currentloc,locid])


    const [itemCounts, setItemCounts] = useState({});

    // Function to handle item count changes
    const handleItemCountChange = (itemId, newCount) => {
        setItemCounts(prevCounts => ({
            ...prevCounts,
            [itemId]: newCount
        }));
    };



    return (
        <div style={{ paddingBottom: "90px" }}>
            <div className='Cat-head'>
                <hr />
                <p>MOST POPULAR</p>
            </div>
            <div className='row'>
                {
                    popular?.filter((item) => (item.type).includes(click)).map((item) => {
                        return (
                            <div className='col-6'>
                                <div className='pro-card p-1' >
                                    <div className='row p-1 border rounded-3'>
                                        <div className='col-5 col-md-5 '>
                                            <div className='position-relative rounded pro-img d-flex overflow-hidden'>
                                                <img onClick={() => handleclick(item.id)} src={`${IMAGE_URL}/product/` + item.upload_image} alt='' />
                                                {/* <h3>Upto {item.rate} Off</h3> */}
                                            </div>
                                        </div>

                                        <div className='col-7 col-md-7 pro-description position-relative'>
                                            <div onClick={() => handleclick(item.id)}>
                                                <h2>{item.title}</h2>
                                                <p>{item.vendor_name}</p>
                                                {item.type == "1" ? <img className='veg-icon' src={veg} alt='' /> : <img className='veg-icon' src={nonveg} alt='' />}
                                                {/* <p className='disc'>
                                                    {item.description}
                                                </p> */}
                                                {item.type == "2" ? <p className='disc py-1'>
                                                    Contain Eggs<span className='text-danger'>*</span>
                                                </p> : <p></p>}
                                            </div>



                                            <div className='d-flex justify-content-between align-items-center'>
                                                <h2>Rs. {item.price}/-</h2>

                                                <div className='add-remmove d-flex align-items-center '>
                                                    <button onClick={() => {

                                                        const newCount = itemCounts[item.id] ? itemCounts[item.id] - 1 : 0;
                                                        handleItemCountChange(item.id, newCount)

                                                    }} className='minus'>
                                                        -
                                                    </button>
                                                    <input value={itemCounts[item.id] || 0} className='text' disabled />
                                                    <button onClick={() => {
                                                        const newCount = (itemCounts[item.id] || 0) + 1;
                                                        handleItemCountChange(item.id, newCount);

                                                        const data = {
                                                            cat_id: item.cat_id,
                                                            pro_id: item.id,
                                                            pro_name: item.title,
                                                            price: item.price,
                                                            p_qty: newCount,
                                                            orderid: localStorage.getItem("orderid"),
                                                            userId: localStorage.getItem("food_id")
                                                        };

                                                        axios.post(`${BASE_URL}/addToCart`, data)
                                                            .then((res) => {
                                                                if (res.data[0] && res.data[0].orderid) {
                                                                    localStorage.setItem("orderid", res.data[0].orderid);
                                                                }
                                                            });
                                                    }} className='plus'>
                                                        +
                                                    </button>


                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                }








                {open ? <div className='overlay'></div> : null}


                <div className={open ? 'dish-details show-details positon-relative' : 'dish-details'}>
                    {open ? <div className='close-btn'>
                        <button onClick={handleclose}>Close &nbsp;X</button>
                    </div> : null}

                    <div className='pro-detail-card m-2 p-2'>
                        <div className='detail-img d-flex justify-content-center align-items-center'>
                            <img src={`${IMAGE_URL}/product/` + detail.upload_image} alt='' />

                        </div>

                        <div>
                            <div className='d-flex align-items-center pt-3 justify-content-between'>
                                <div className='d-flex align-items-center'>
                                    <h2 className='mb-0'>{detail.title}</h2>
                                    {detail.type == "1" ? <img className='mx-1' style={{ width: "17px", height: "17px" }} src={veg} alt='' /> : <img className='mx-1' style={{ width: "17px", height: "17px" }} src={nonveg} alt='' />}
                                </div>

                                <div className='d-flex align-items-center '>
                                    <i class="ri-heart-line text-danger"></i>
                                    <i class="ri-share-forward-box-fill mx-2 share-icon"></i>
                                </div>
                            </div>
                            <p>Rs.{detail.price}/-</p>
                            <p className=''><span className='p-1 mb-3'>4.5 ⭐</span></p>

                            <p className='disc'>
                                {detail.description}
                            </p>

                        </div>
                    </div>


                </div>

                {open ? <div className='row cart-footer p-2 '>

                    <div className=' d-flex align-items-center col-md-3 col-3 '>
                        <button onClick={() => {

                            const newCount = itemCounts[detail.id] ? itemCounts[detail.id] - 1 : 0;
                            handleItemCountChange(detail.id, newCount)

                        }} className='minus'>
                            -
                        </button>
                        <input value={itemCounts[detail.id] || 0} className='text' disabled />
                        <button onClick={() => {
                            const newCount = (itemCounts[detail.id] || 0) + 1;
                            handleItemCountChange(detail.id, newCount);

                            const data = {
                                cat_id: detail.cat_id,
                                pro_id: detail.id,
                                pro_name: detail.title,
                                price: detail.price,
                                p_qty: newCount,
                                orderid: localStorage.getItem("orderid"),
                                userId: localStorage.getItem("food_id")
                            };

                            axios.post(`${BASE_URL}/addToCart`, data)
                                .then((res) => {
                                    if (res.data[0] && res.data[0].orderid) {
                                        localStorage.setItem("orderid", res.data[0].orderid);
                                    }
                                });
                        }} className='plus'>
                            +
                        </button>
                    </div>

                    <div className='col-md-9 col-9 text-center'>
                        <Link to="/cart"> <button>View Cart</button></Link>
                    </div>
                </div> : null}




            </div>


        </div>
    )
}

export default PopularDish