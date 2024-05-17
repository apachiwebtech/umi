import React from 'react'
import boy from '../../Images/boy.png'
const OrderConfirm = () => {
    return (
        <div className='p-5'>
            <div style={{ width: "200px", margin: "auto" }} >
                <img style={{ width: "100%" }} src={boy} alt='' />
            </div>
            <div className='text-center'>

                <h1 style={{ fontSize: "30px", color: "#FEBF10", fontWeight: "900" }}>Thanks For OrderRing With Us!</h1>
            </div>
            <div className='text-center py-5'>
                <p>Payment Confirmed</p>
                <p>₹ 3450</p>
            </div>
        </div>
    )
}

export default OrderConfirm