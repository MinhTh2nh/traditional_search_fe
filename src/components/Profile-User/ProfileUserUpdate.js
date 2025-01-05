import React, { useState, useEffect } from 'react';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import './ProfileUserUpdate.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;


export default function ProfileUserUpdate() {

  const [firstname, setNewFirstName] = useState("");
  const [lastname, setNewLastName] = useState("");
  const [phone, setNewPhone] = useState("");
  const [address, setNewAddress] = useState("");
  const [email, setNewEmail] = useState("");


  const [id, setID] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const User = JSON.parse(localStorage.getItem('User'));
    setToken(User.token);
    setID(User.accounts.id);
    // Function to fetch user profile data from your API
    const fetchUserProfile = async () => {
      try {
        if (!id) return; // If userEmail is empty, exit early
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` // Add authorization header with token
          }
        }

        const response = await fetch(`${backendUrl}/api/profile/${id}`, requestOptions);
        if (response.ok) {
          const data = await response.json();
          setNewFirstName(data?.name);
          setNewLastName(data?.lastname);
          setNewPhone(data?.phone);
          setNewAddress(data?.address);
          setNewEmail(data?.email);
        } else {
          throw new Error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchUserProfile();
  }, [id]); // Add userEmail as a dependency to useEffect


  const handleNewFirstNameChange = (e) => {
    setNewFirstName(e.target.value);
    console.log(handleConfirmChange);
  };
  const handleNewLastNameChange = (e) => {
    setNewLastName(e.target.value);
    console.log(111);
  };
  const handleNewPhoneChange = (e) => {
    setNewPhone(e.target.value);
    console.log(22222);
  };
  const handleNewAddressChange = (e) => {
    setNewAddress(e.target.value);
    console.log(3333);
  };
  const handleNewEmailChange = (e) => {
    setNewEmail(e.target.value);
    console.log(4444);
  };


  const handleConfirmChange = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/profile/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          firstname,
          lastname: "",
          phone,
          email,
          address,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message); // Display success toast notification
        window.location.href = '/Profile-user';
      }
      else {
        toast.error(data.message); // Display error toast notification
      }
    } catch (error) {
      console.error('Error Updating :', error);
    }
  };

  return (
    <div>
      <div className="p-2 header">
        <Header />
      </div>
      <div className="container my-5">
        <div className="row">
          <div className="col-12">
            {/* Page title */}
            <div className="my-5">
              <h3>Profile</h3>
              <hr />
            </div>
            {/* Form START */}
            <form className="file-upload">
              <div className="row mb-5 gx-5">
                {/* Contact detail */}
                <div className="col-xxl-8 mb-5 mb-xxl-0">
                  <div className="bg-secondary-soft px-4 py-5 rounded">
                    <div className="row g-3">
                      <h4 className="mb-4 mt-0">Contact detail</h4>
                      {/* Full Name */}
                      <div className="col-md-6">
                        <label className="form-label">Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          aria-label="First name"
                          value={firstname} // Set the value from profile.firstname
                          onChange={handleNewFirstNameChange} // Use handleNewFirstNameChange here
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label">Address *</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          aria-label="First name"
                          value={address}
                          onChange={handleNewAddressChange}
                        />
                      </div>
                      {/* Email */}
                      <div className="col-md-6">
                        <label for="inputEmail4" className="form-label">Email *</label>
                        <input
                          type="email"
                          className="form-control"
                          id="inputEmail4"
                          value={email}
                          onChange={handleNewEmailChange}
                        />
                      </div>
                      {/* Phone number */}
                      <div className="col-md-6">
                        <label className="form-label">Phone number *</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          aria-label="Phone number"
                          value={phone}
                          onChange={handleNewPhoneChange}
                        />
                      </div>
                    </div> {/* Row END */}
                  </div>
                </div>
                {/* Upload profile */}

              </div> {/* Row END */}
              {/* button */}
              <div className="gap-3 d-md-flex justify-content-md-end text-center">
                <button type="button" className="btn btn-primary btn-lg " onClick={handleConfirmChange} >  Update profile</button>
              </div>
            </form> {/* Form END */}
          </div>
        </div>
      </div>
      <div className="p-2 footer d-flex align-items-center justify-content-center">
        <Footer />
      </div>
    </div>
  );
}
