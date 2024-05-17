import React, { useEffect, useState } from 'react'
import dish from '../../Images/dish.png'
import veg from '../../Images/veg.png'
import nonveg from '../../Images/Non.png'
import { Delete, DeleteForever, ExpandLess, ExpandMore } from '@mui/icons-material'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Collapse } from '@mui/material';
import CartFooter from '../Layout/CartFooter';
import TextField from '@mui/material/TextField';
import { Checkout } from 'capacitor-razorpay';
import axios from 'axios';
import { BASE_URL, IMAGE_URL } from '../Utils/BaseUrl';
import Loader from './Loader';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ecart from '../../Images/empty-cart.webp'
import Loader2 from './Loader2'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Cart = () => {

    const [data, setData] = useState([])
    const [loader, setLoader] = useState(false)
    const [loader2, setLoader2] = useState(true)
    const [quantities, setQuantities] = useState({});
    const [product, setProduct] = useState([])
    const [cerr, setCERR] = useState('')
    const [discount, setDiscount] = useState([])
    const [hide, setHide] = useState(false)
    const [code, setCode] = useState('')

    const [open, setOpen] = React.useState(false);
    const [mobile, setMobile] = useState(localStorage.getItem('food_mobile'));

    const handleOpen = () => {
        getMobile();
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    const name = localStorage.getItem("Name")





    const [number, setNUmber] = useState({
        number: "",
    })

    const [numberError, setNumberError] = useState(false);
    const [numberErrortext, setNUmberErrorText] = useState('');
    const onNumberchange = (e) => {
        const { name, value } = e.target;

        setNUmber(prevState => ({
            ...prevState,
            [name]: value,
        }))
        setNumberError(false);
        setNUmberErrorText('');
    }


    const paymentHandler = async (e) => {
        setLoader(true)
        
        setTimeout(() => {
        
        }, 1000);
         
        const data = {
            amount: (totalPrice - discount) * 100,
            currency: "INR",

        }
        const response = await axios.post(`${BASE_URL}/order`, data)

        const order = await response.data;

        if(response.data){
            setLoader(false)
        }

        const options = {
            "key": "rzp_test_YZMqXjrMNG4P3U", // Enter the Key ID generated from the Dashboard
            "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": order.currency,
            "name": "Acme Corp", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "7977611021"  //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#000"
            }
        };
        try {
            let data = (await Checkout.open(options));
            e.preventDefault()
            console.log(data.response+"AcmeCorp");
            console.log(JSON.stringify(data))
           
          } catch (error) {
            if (error.code === "checkout.window.dismiss") {
                // User closed the payment gateway without completing the payment
                console.log("Payment cancelled by user");
          
            }
            //it's paramount that you parse the data into a JSONObject
            // let errorObj = JSON.parse(error['code'])
            console.log(error);
          }
      
      

    }



    async function getcartdata() {

        const data = {
            order_id: localStorage.getItem("orderid")
        }
        axios.post(`${BASE_URL}/getcartData`, data)
            .then((res) => {
                console.log(res.data)
                setProduct(res.data)
               
                setLoader2(false)
            })
    }

    useEffect(() => {

        if (localStorage.getItem("orderid")) {
            getcartdata()
        }

        setTimeout(() => {
            setLoader2(false)
        }, 500);
        
    }, [])

    const getMobile = async () => {
        const user_id = localStorage.getItem('food_id')

        axios.post(`${BASE_URL}/getMobile`, { user_id: user_id })
            .then((res) => {
                console.log(res);
                setNUmber(prevState => ({
                    ...prevState,
                    number: res.data[0].mobile
                }))
            }).catch((err) => {
                console.log(err)
            })
    }


    const handleNumberSubmit = (e) => {
        e.preventDefault();

        const numberRegex = /^\d+$/; // Regular expression to allow only digits

        if (!numberRegex.test(number.number)) {
            setNumberError(true);
            setNUmberErrorText("Error: Mobile number should only contain digits.");
            console.error("Error: Mobile number should only contain digits.");
            return;
        } else if (number.number.length !== 10) {
            setNumberError(true);
            setNUmberErrorText("Error: Mobile number should only contain 10 digits.");
            return
        }


        const user = {
            mobile: number.number,
            user_id: localStorage.getItem('food_id'),
        }

        axios.post(`${BASE_URL}/updateMobile`, user)
            .then((res) => {
                console.log(res);
                localStorage.setItem("food_mobile", number.number)
                setMobile(number.number)

            }).catch((err) => {
                console.log(err);
            })
        console.log(user);
        handleClose();
    }


    const removeitem = (id) => {
        const userConfirmed = window.confirm('Are you sure you want to delete?');

        if (userConfirmed) {
            const data = {
                cart_id: id
            }
    
            axios.post(`${BASE_URL}/remove_product`, data)
                .then((res) => {
                    console.log(res)
                    getcartdata()
                })

        } else {
 
            console.log('Action canceled.');
        }
    
    }

    const handleConfirmation = (id) => {
        const userConfirmed = window.confirm('Are you sure you want to proceed?');

     
    };


    const handleIncrease = (itemId) => {

        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [itemId]: (prevQuantities[itemId] || 0) + 1
        }));

        let pqty;

        if (quantities[itemId] == null) {
            pqty = 1
        } else {
            pqty = quantities[itemId] + 1
        }



        const data = {
            cartid: itemId,
            proqty: pqty,
        }

        axios.post(`${BASE_URL}/update_product_count`, data)
            .then((res) => {

            })

    };

    const handleDecrease = (itemId) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [itemId]: Math.max((prevQuantities[itemId] || 1) - 1, 1)
        }));


        let proqty;

        if (quantities[itemId] == 1) {
            proqty = quantities[itemId]
        } else if (quantities[itemId] == null) {
            proqty = 1
        } else {
            proqty = quantities[itemId] - 1

        }


        const data = {
            cartid: itemId,
            proqty: proqty,
        }

        axios.post(`${BASE_URL}/update_product_count`, data)
            .then((res) => {

            })



    };

    const ApplyCode = () => {
        const data = {
            coupon: code.toLocaleLowerCase()
        }

        axios.post(`${BASE_URL}/check_coupen`, data)
            .then((res) => {
                setDiscount(res.data[0] && res.data[0].disc_price)

                setCERR(res.data && res.data.message)

                if(res.data[0] && res.data[0].disc_price){
                    setHide(true)
                    
                }

                if(res.data && res.data.message){
                    setHide(false)
                }

                setTimeout(() => {
                    setCERR('')
                }, 3000)
            })
    }


    const totalPrice = product.reduce((acc, item) => {
        const itemTotal = item.price * (quantities[item.id] || item.pqty); // Use 1 as default quantity if not 
        return acc + itemTotal;
    }, 0);



    return (
        <>
            {loader && <Loader />}
            {loader2 && <Loader2 />}

            <div className='p-3'>

                {product.length == 0 && <div>
                    <img style={{ width: "100%" }} src={ecart} alt='' /> </div>}

                {product.map((item) => {

                    const prototal = item.price * (quantities[item.id] || item.pqty)

                    return (
                        <div className='cart-pro-card '>
                            <div className='row p-1 border rounded-3 my-1'>
                                <div className='col-2 col-md-2 '>
                                    <div className='position-relative rounded pro-img d-flex'>
                                        <img src={`${IMAGE_URL}/product/` + item.upload_image} alt='' />
                                    </div>
                                </div>

                                <div className='col-6 col-md-6 pro-description position-relative'>
                                    <div className='d-flex'>
                                        <h2>{item.pname}</h2>
                                        {item.type == "1" ? <img className='veg-icon' style={{ width: "10px", height: "10px" }} src={veg} alt='' /> : <img className='veg-icon' style={{ width: "10px", height: "10px" }} src={nonveg} alt='' />}
                                    </div>
                                    <h3>Rs. {item.price}/-</h3>
                                    <p className='disc'>
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                    </p>
                                </div>

                                <div className='col-3 col-md-3 border-end '>
                                    <div className='d-flex mx-2' style={{ justifyContent: "end" }}>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className='menu-add-remmove d-flex align-items-center '>
                                                <button onClick={() => {

                                                    handleDecrease(item.id)

                                                }} className='minus'>
                                                    -
                                                </button>
                                                <input value={quantities[item.id] || item.pqty} className='text' disabled />

                                                <button onClick={() => handleIncrease(item.id, item.pqty)} className='plus'  >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='d-flex mx-2 mt-1' style={{ justifyContent: "end" }}>
                                        <p >Rs.{prototal}/-</p>

                                    </div>
                                </div>


                                <div className='col-1 col-md-1 position-relative'>
                                    <DeleteOutlineOutlinedIcon onClick={() => removeitem(item.id)} sx={{ color: "red", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
                                </div>


                            </div>


                        </div>
                    )
                })}

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography className='mb-2' id="modal-modal-title" variant="h6" component="h2">
                            Edit Number

                        </Typography>
                        <TextField id="outlined-basic" label="Mobile No" variant="outlined" fullWidth className='mb-2' name='number' value={number.number} onChange={onNumberchange} />
                        {numberError && <Typography>{numberErrortext}</Typography>}
                        <Button style={{ background: "#FEBF10" }} fullWidth variant='contained' onClick={handleNumberSubmit}>Edit</Button>
                    </Box>
                </Modal>

                {/* <div className='cart-pro-card  '>
                    <div className='row p-1 border rounded-3 my-1'>
                        <div className='col-2 col-md-2 '>
                            <div className='position-relative rounded pro-img d-flex'>
                                <img className='rounded' src={dish} alt='' />
                            </div>
                        </div>

                        <div className='col-6 col-md-6 pro-description position-relative'>
                            <div className='d-flex'>
                                <h2>MARGERITA PIZZA</h2>
                                <img style={{ width: "10px", height: "10px" }} className='mx-1' src={veg} alt='' />
                            </div>

                            <h3>Rs. 300/-</h3>
                            <p className='disc'>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            </p>
                        </div>

                        <div className='col-3 col-md-3 border-end '>
                            <div className='d-flex mx-2' style={{ justifyContent: "end" }}>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className='menu-add-remmove d-flex align-items-center '>
                                        <button onClick={() => {

                                            if (count > 0) {
                                                setCount(count - 1)
                                            }

                                        }} className='minus'>
                                            -
                                        </button>
                                        <input value={count} className='text' disabled />
                                        <button onClick={() => setCount(count + 1)} className='plus'>
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex mx-2 mt-1' style={{ justifyContent: "end" }}>
                                <p >Rs. 600/-</p>

                            </div>
                        </div>
                        <div className='col-1 col-md-1 position-relative'>
                            <DeleteOutlineOutlinedIcon sx={{ color: "red", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
                        </div>


                    </div>


                </div> */}

                <div className='instruction mt-4'>
                    {/* <p>INSTRUCTION TO KITCHEN<span style={{ fontSize: "8px", color: "lightgray" }}>(if any)</span></p> */}


                    <div className='row align-items-center'>
                        <p className='col-3 col-md-3'>HAVE COUPON?</p>
                        <div className='col-6 col-md-6'>
                            <input className='border-yellow' name='code' onChange={(e) => setCode(e.target.value)} type='text' alt='' />
                        </div>
                        <div className='col-3 col-md-3 '>
                            <button className='btn-yellow' onClick={() => ApplyCode()} >APPLY CODE</button>
                        </div>
                    </div>
                    <span className='text-danger'>{cerr}</span>
                </div>
                <hr />
                <div className='info-sec'>
                    <p>{name} &nbsp; +91 {mobile} &nbsp;<span onClick={handleOpen}>Edit</span></p>
                    <hr />
                    <div className='d-flex justify-content-between'>
                        <div>
                            <p>Total Bill</p>
                            {hide && <p>Coupen Discount</p>}
                         

                        </div>
                        <div style={{ color: "lightslategrey" }}>
                            <p>Rs. {totalPrice}</p>
                            {hide && <p>- Rs. {discount}</p>}
                          
                            {/* <p>- Rs. 100</p>
                            <p>+ Rs. 540</p> */}
                        </div>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-between'>
                        <div>
                            {hide && <p>Total</p>}

                        </div>
                        <div style={{ color: "lightslategrey" }}>            
                            {hide && <p> Rs. {totalPrice - discount}</p>}
                            {/* <p>- Rs. 100</p>
                            <p>+ Rs. 540</p> */}
                        </div>
                    </div>
                    {/* <div >
                        <p>Add Payment Method</p>
                        <div className='pay-meth my-2'>
                            <div className='d-flex justify-content-between' onClick={() => handleToggle('upi')}>
                                <p>Pay through UPI</p>
                                {openStates.upi ? <ExpandLess className='mx-1' /> : <ExpandMore className='mx-1' />}
                            </div>
                            <Collapse in={openStates.upi} timeout="auto" unmountOnExit>
                                <div className='py-1'>
                                    <div className='d-flex align-items-center'>
                                        <input type='radio' /> <span style={{ fontSize: "12px" }} className='px-2'>Gpay</span>
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <input type='radio' /> <span style={{ fontSize: "12px" }} className='px-2'>Paytm</span>
                                    </div>
                                    <div className='d-flex align-items-center'>
                                        <input type='radio' /> <span style={{ fontSize: "12px" }} className='px-2'>Upi id</span>
                                    </div>
                                </div>
                            </Collapse>
                        </div>
                        <div className='pay-meth my-2'>
                            <div className='d-flex justify-content-between' onClick={() => handleToggle('netbank')}>
                                <p>Net Banking</p>
                                {openStates.netbank ? <ExpandLess className='mx-1' /> : <ExpandMore className='mx-1' />}
                            </div>
                            <Collapse in={openStates.netbank} timeout="auto" unmountOnExit>
                           
                            </Collapse>
                        </div>
                        <div className='pay-meth my-2'>
                            <div className='d-flex justify-content-between' onClick={() => handleToggle('Debit')}>
                                <p>Debit / Credit Card</p>
                                {openStates.Debit ? <ExpandLess className='mx-1' /> : <ExpandMore className='mx-1' />}
                            </div>
                            <Collapse in={openStates.Debit} timeout="auto" unmountOnExit>
                            
                            </Collapse>
                        </div>
                        <div className='pay-meth my-2'>
                            <div className='d-flex justify-content-between' >
                                <p id='cod'>COD</p>
                                <input type='radio' />
                            </div>

                        </div>
                    </div> */}
                </div>

            </div>
            <div className='row cart-footer p-2 justify-content-center'>

                <div className='col-md-9 col-9 text-center'>
                    <button onClick={paymentHandler}>Total Rs. {discount ? totalPrice - discount : totalPrice}/-</button>
                </div>
            </div>
        </>

    )
}

export default Cart