import bcrypt from "bcryptjs";
import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

// This function hashes the user's password using bcrypt
const hashPassword = async (password) => {
  try {
    const saltRounds = 10; // Salt rounds for bcrypt hash
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

const getToken = () => {
  return JSON.parse(localStorage.getItem("User")).token;
};

const getAuthHeaders = () => {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const ListAllProfile = async () => {
  return await axios.get(`${backendUrl}/api/profile-admin`, {
    headers: getAuthHeaders(),
  });
};

export const ViewProfileByID = async (id) => {
  return await axios.get(`${backendUrl}/api/profile-admin/${id}`, {
    headers: getAuthHeaders(),
  });
};

export const AddNewUser = async (firstname, lastname, phone, address, email) => {
  try {
    // Send the user details to the backend
    return await axios.post(
      `${backendUrl}/api/profile-admin/`,
      {
        firstname,
        lastname,
        phone,
        address,
        email,
        password: "12345678", // Default password
      },
      { headers: getAuthHeaders() } // Include authorization headers
    );
  } catch (error) {
    console.error('Error adding new user:', error);

    // Throw a meaningful error for better debugging
    throw new Error('Error adding new user: ' + error.message);
  }
};

export const UpdateProfileByID = async (id, updatedData) => {
  try {
    console.log("update profile by id", updatedData);
    return await axios.put(
      `${backendUrl}/api/profile-admin/${id}`,
      updatedData,
      { headers: getAuthHeaders() }
    );
  } catch (error) {
    throw new Error("Error updating user profile");
  }
};

export const DeleteProfileByID = async (id) => {
  return await axios.delete(`${backendUrl}/api/profile-admin/${id}`, {
    headers: getAuthHeaders(),
  });
};
