import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './custom-styles.css'; // Import your custom CSS file
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBreadcrumb, MDBBreadcrumbItem } from 'mdb-react-ui-kit';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';


const backendUrl = process.env.REACT_APP_BACKEND_URL;


export default function ProfilePage() {
  const [profile, setProfile] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    address: '',
    email: ''
  });
  const [id, setID] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const User = JSON.parse(localStorage.getItem('User'));
    setToken(User.token);
    setID(User.accounts.id);
    // Function to fetch user profile data from your API
    const fetchUserProfile = async () => {
      try {
        if (!id) return;
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        };


        const response = await fetch(`${backendUrl}/api/profile/${id}`, requestOptions);
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          console.log(data);
        } else {
          throw new Error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchUserProfile();
  }, [id]); // Add userEmail as a dependency to useEffect

  console.log('Fetching user profile', { profile })

  return (
    <div>
      <div className="p-2 header">
        <Header />
      </div>
      <section style={{ backgroundColor: '#eee' }}>
        <MDBContainer className="py-5 my-7 d-block">
          <MDBRow>
            <MDBCol>
              <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
              </MDBBreadcrumb>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: '150px' }}
                    fluid
                  />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  {/* Conditionally render profile details if profile exists */}
                  {profile && (
                    <>
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Full Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">{profile?.name}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Phone</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">{profile?.phone}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Address</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">
                            {profile?.address ? profile.address : "Current don't have, please update it"}
                          </MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Email</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted">{profile?.email}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    </>
                  )}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <div className="p-2 footer d-flex align-items-center justify-content-center">
        <Footer />
      </div>
    </div>
  );
}