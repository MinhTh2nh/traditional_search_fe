// ProfileManage.js
import React from 'react';
import './ProfileManage.css'; // Import the CSS file
import Sidebar from '../Dashboard/sidebar';
import Header from '../Dashboard/Header-Admin';
import {Link} from "react-router-dom";
import { ListAllProfile, AddNewUser } from '../../Service/UserService'; // Import ListAllProfile function
import {useState,useEffect} from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useNavigate } from 'react-router-dom';


const ProfileManage = () => {
  const [profiles, setProfiles] = useState([]);
  const[idSearch,setIDSearch] = useState('');
  const [id, setID] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); 



  const fetchProfiles = async () => {
    try {
      const response = await ListAllProfile(); // Call the ListAllProfile function
      setProfiles(response.data); // Set the fetched profiles in state
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  useEffect(() => {
    // Fetch profiles when the component mounts
    fetchProfiles();
  }, []); // Empty dependency array ensures this runs only once


  const insertUser = async () => {
    try {

      // Make sure all fields are filled before inserting
      if ( 
      id &&
      firstname &&
      lastname &&
      phone &&
      address &&
      email) 
        {
    
       const response = await AddNewUser(
            id,
            firstname,
            lastname,
            phone,
            address,
            email
        );
         // Call the function to insert user profile

          // Show toast notification
        toast.success('User inserted successfully!', {
          position: toast.POSITION.TOP_CENTER
        });
        navigate('/profile-list');
      } else {
        alert('Please fill in all fields');
      }
    } catch (error) {
      console.error('Error inserting user:', error);
      toast.error('Failed to insert user!', {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };



  return (
    <div>
      <Header />
      <div className="main-content44">
        <div className="card-container44">
          <div className="card44">
            <h3>View User</h3>
            <div className="input-group44">
              <input 
              type="text" 
              placeholder="Enter User ID" 
              value={idSearch}
              onChange={(e) => setIDSearch(e.target.value)}
              />
             <Link to={`/view-profile/${idSearch}`}><button >View User</button></Link>
            </div>
          </div>
          <div className="card44">
            <h3>Add User</h3>
            <div className="input-group44">
              <input type="text" placeholder="ID" value={id}        onChange={(e) => setID(e.target.value)}/>
              <input type="text" placeholder="First Name"  value={firstname}         onChange={(e) => setFirstName(e.target.value)}/>
              <input type="text" placeholder="Last Name" value={lastname}     onChange={(e) => setLastName(e.target.value)} />
              <input type="text" placeholder="Phone"  value={phone}        onChange={(e) => setPhone(e.target.value)}/>
              <input type="text" placeholder="Address" value={address}          onChange={(e) => setAddress(e.target.value)}/>
              <input type="text" placeholder="Email" value={email}      onChange={(e) => setEmail(e.target.value)}/>
              {/* Add other input fields for last name, phone, address, email */}
              <button onClick={insertUser}>Insert User</button>
            </div>
          </div>
          <div className="card44">
            <h3>List User</h3>
            <div className="input-group44">
              <Link to = '/profile-list'><button>List All Users</button></Link>
            </div>
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default ProfileManage;
