import React, { useEffect, useState } from 'react'
import Banner from './DashComponent/Banner'
import Category from './DashComponent/Category'
import PopularDish from './DashComponent/PopularDish'
import DashSearch from './DashComponent/DashSearch'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import veg from '../../Images/veg.png'
import nonveg from '../../Images/Non.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../Utils/BaseUrl'

const Dash = () => {
  const [click, setclick] = useState('')
  const [toggle, settoggle] = useState(false)
  const [toggle2, settoggle2] = useState(false);
  const [Vendor, setVendor] = useState([]);
  const [VendorProducts, setVendorProducts] = useState([]);
  const [locid, setLocId] = useState('')
  const [currentloc, setCurrentid] = useState('')

  const handleclick = (e) => {
    settoggle(!toggle)
    settoggle2(false);
     if(!toggle){
       setclick(e.target.value)
      }else{
        setclick('')
     }
    
   
  }

  const handleclick2 = (e) => {
    settoggle(false)
    settoggle2(!toggle2);
    setclick(e.target.value)

    if(!toggle2){
      setclick(e.target.value)
     }else{
       setclick('')
    }

  }



  const [location, setLocation] = useState([]);


  async function getLocation() {
    const data = {
      loc_id: localStorage.getItem('locid')
    }

    axios.post(`${BASE_URL}/get_loc`, data)
      .then((res) => {
        setLocation(res.data)
        if (res.data[0] && res.data[0].id) {

          setLocId(res.data[0].id)
        }
      })
  }



  const Navigate = useNavigate()

  const getVendorSpecificProducts = async (id) => {

    const response = await axios.post(`${BASE_URL}/vendorProducts`, {
      vendorId: id
    })

    // console.log(response.data);
    setVendorProducts(response.data);

    Navigate(`/vendorpage/${id}`)
  }
  useEffect(() => {
    getLocation();
  }, [])


  const handlegetvendor = async (id) => {
    const data = {
      loc_id: id || locid
    }
    const response = await axios.post(`${BASE_URL}/vendorList`, data);

    setCurrentid(id)

    setVendor(response.data);
  }

  useEffect(() => {
    setTimeout(() => {
      handlegetvendor()
    }, 500)
  }, [locid])


  const handleremove = () =>{
    settoggle(false)
    settoggle2(false)
    setclick('')
  }

  return (
    <div>
      <Banner />
      <div className='px-3 pt-1 dash-search'>
        <div className='row'>

          <div className='col-md-7 col-7 position-relative'>
            {/* <input className="border-yellow p-1" type='text' placeholder="ANDHERI-POWAI-CAFE-1" alt='' disabled /> */}
            <select onChange={(e) => handlegetvendor(e.target.value)} className="border-yellow p-1 w-100" >
              {
                location?.map((item) => {
                  return (
                    <option key={item.id} value={item.id}>{item.location}</option>
                  )
                })
              }
            </select>
            {/* <LocationOnIcon className='search-icon' /> */}
          </div>

          <div className='col-md-5 col-5 '>
            <select className="border-yellow w-100 px-1 py-1 mx-1" onChange={(e) => {
              getVendorSpecificProducts(e.target.value)
            }}>

              <option>SELECT VENDOR</option>
              {/* <option>1</option>
              <option>2</option>
              <option>3</option> */}
              {
                Vendor?.map((item) => {
                  return (
                    <option key={item.id} value={item.id}> <Link to={`/menupage/${item.id}`}> {item.company_name}</Link></option>
                  )
                })
              }
            </select>
          </div>

        </div>
        <div className='row py-2'>

          <div className='col-md-7 col-7 position-relative'>
            <Link to={`/searchpage/${locid}/${currentloc}`}>  <input className="border-yellow p-1" type='search' placeholder='Search (eg. Pav Bhaji)' /></Link>
            <SearchIcon sx={{ color: "lightgray" }} className='search-icon' />
          </div>
          <div className='col-md-5 col-5 row align-items-center'>
            <div className='col-md-6 col-6 text-center px-1'>
              <button style={{ color: "green" }} value="1" onClick={(e) => handleclick(e)} className={toggle === false ? "border-yellow p-1 w-100 " : "border-yellow p-1 back-yellow w-100"}><img style={{ width: "10px", paddingRight: "1px" }} src={veg} alt='' />VEG</button>

            </div>
            <div className='col-md-6 col-6 text-center'>
              <button style={{ color: "red" }} value="2" onClick={(e) => handleclick2(e)} className={toggle2 === false ? "border-yellow p-1 w-100 " : "border-yellow p-1 back-yellow w-100"}><img style={{ width: "10px", paddingRight: "1px" }} src={nonveg} alt='' />NON VEG</button>
            </div>
          </div>

        </div>
     
      </div>
      <Category />
      <PopularDish currentloc={currentloc} locid={locid} click={click} vendorProducts={VendorProducts} />
    </div>
  )
}

export default Dash