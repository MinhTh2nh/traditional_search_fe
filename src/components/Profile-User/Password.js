import React, { useState, useEffect } from 'react';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Password() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [id, setID] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('User'));
    if (user && user.accounts && user.accounts.id) {
      setID(user.accounts.id);
      setToken(user.token);
    }
  }, []);

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const resetFormFields = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };


  const handleConfirmChange = async () => {
    if (newPassword === confirmPassword) {
      try {
        const response = await fetch(`${backendUrl}/api/password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            id: id,
            oldPassword,
            newPassword,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success(data.message); // Display success toast notification
          resetFormFields(); // Reset form fields on successful password update
        } else if (response.status === 401) {
          toast.error('Old password is incorrect'); // Display toast for incorrect old password}else {
        } else {
        toast.error(data.message); // Display error toast notification
        } 
      } catch (error) {
        console.error('Error changing password:', error);
      }
    } else {
      toast.error('New password and confirm password must match');
    }
  };

  return (
    <div>
      <div className="p-2 header">
        <Header />
      </div>
      <ToastContainer />
      <div className="my-5 d-flex justify-content-center">
        <div className="col-xxl-6">
          <div className="bg-secondary-soft px-4 py-5 rounded">
            <div className="row g-3">
              <h4 className="my-4">Change Password</h4>
              <div className="col-md-6">
                <label htmlFor="exampleInputPassword1" className="form-label">Old password *</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  value={oldPassword}
                  onChange={handleOldPasswordChange}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="exampleInputPassword2" className="form-label">New password *</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword2"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="exampleInputPassword3" className="form-label">Confirm Password *</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword3"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              <div className="gap-3 d-md-flex justify-content-md-center text-center my-5">
                <button type="button" className="btn btn-danger btn-lg" onClick={handleConfirmChange}>
                  Confirm Change
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-2 footer d-flex align-items-center justify-content-center">
        <Footer />
      </div>
    </div>
  );
}

export default Password;
