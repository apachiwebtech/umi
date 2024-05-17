import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Avatar from '@mui/material/Avatar';
import logo from '../../Images/umilogo.png'
const Header = () => {




  return (
    <div className='head text-center position-relative'>

      <Link to='/dash'>
        <img style={{width :"70px"}} src={logo} alt="" />
      </Link>
      <Link to='/profile'>
      <div className='avatar'>
        <Avatar>H</Avatar>
      </div>
      </Link>
    </div>
  )
}

export default Header