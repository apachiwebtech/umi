import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import cart from '../../Images/icon/Group (3).png'
import home from '../../Images/icon/Vector.png'
import offer from '../../Images/icon/Group 2 (1).png'
import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  const [value, setValue] = React.useState('home');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = () => {

    window.location.pathname = '/'

    localStorage.removeItem('food_id')
    localStorage.removeItem('otp')
    localStorage.removeItem('food_role')
    localStorage.removeItem('food_value')
    localStorage.removeItem('food_email')
    localStorage.removeItem('food_mobile')
    localStorage.removeItem('Name')
  }

  return (
    <div className='d-flex justify-content-around footer py-1'>
      <div className='text-center'>
        <img src={home} alt='' />
        <p>HOME</p>
      </div>

      <Link to="/cart" className='text-center foot-middle'>  <div >
        <img className='img1' src={cart} alt='' />
      </div>
      </Link>
      <p className='cartname'>CART</p>
      <Link to="/dash" style={{textDecoration:"none"}} className='text-center '>
          <img src={offer} alt='' />
          <p>OFFER</p>
      </Link>
    </div>
    // <div className='footer py-1'>
    //   <BottomNavigation sx={{ width: "100%", background: "#FBA834" }} value={value} onChange={handleChange}>
    //     <BottomNavigationAction

    //       label="Home"
    //       value="home"
    //       icon={<HomeOutlinedIcon />}
    //       style={{ color: '#fff' }}
    //       selected
    //     />
    //     {localStorage.getItem("pet_role") == 1 ? <BottomNavigationAction

    //       label="Profile"
    //       value="profile"
    //       style={{ color: '#fff' }}
    //       icon={<PetsOutlinedIcon />}
    //     /> : null}
    //     {localStorage.getItem("pet_role") == 2 ? <BottomNavigationAction

    //       label="Service"
    //       value="Service Request"
    //       style={{ color: '#fff' }}
    //       icon={<MoveToInboxIcon />}
    //     /> : null}
    //     {localStorage.getItem("pet_role") == 1 ?
    //       <BottomNavigationAction

    //         label="Community"
    //         value="Community"
    //         style={{ color: '#fff' }}
    //         icon={<HandshakeIcon />}
    //       /> : null}

    //     <BottomNavigationAction

    //       label="Setting"
    //       value="setting"

    //       style={{ color: '#fff' }}
    //       icon={<SettingsOutlinedIcon />}
    //     />
    //     <BottomNavigationAction
    //       onClick={handleLogout}
    //       style={{ color: '#fff' }}
    //       value="logout"
    //       icon={<LogoutOutlinedIcon />}
    //     />
    //   </BottomNavigation>
    // </div>

  )
}

export default Footer