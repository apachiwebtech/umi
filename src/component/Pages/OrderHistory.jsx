import React from 'react'
import InnerHeader from '../Layout/InnerHeader'
import clocki from '../../Images/clock.png'
import { colors } from '@mui/material'

function OrderHistory() {
  return (
    <>
    <InnerHeader/>
    <div className='navi'>
        <span>all</span> 
        <span>completed</span>
        <span>processing</span>
        <span>Cancel</span>
    </div>
        <div>
            <div className="order-card">
            <h1>Order number : #ORD123545</h1>
            {/* <hr/> */}
            <div className=''>
            <strong>UMI powai</strong>
            <p> total amount: <b>$ 16</b> items: <b>10</b></p> 
            </div>
            
            
            <div className="detail-card">
            <button type='button'>Details</button>
            <img src={clocki} alt='clock'/><span sx={{colors : 'primary'}}>processing</span>
            </div> 
            
            {/* <p>ddd</p> */}
            </div>

        </div>
    </>
  )
}

export default OrderHistory