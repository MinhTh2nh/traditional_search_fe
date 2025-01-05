import React, { useState, useEffect } from "react";
import "./Listprofile.css"; // Import the CSS file
import Sidebar from "../Dashboard/sidebar";
import Header from "../Dashboard/Header-Admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  DeleteProfileByID,
  ListAllProfile,
  UpdateProfileByID,
} from "../../Service/UserService"; // Adjust the path as needed
import { ToastContainer, toast } from "react-toastify";

const UserProfileList = () => {
  const [userData, setUserData] = useState([]);
  const [editableFields, setEditableFields] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    
    fetchData(); // Call the fetchData function to execute the API call
  }, []); // The empty dependency array means this effect runs only once (on mount)
  const fetchData = async () => {
    try {
      const response = await ListAllProfile();
      setUserData(response.data);
      console.log(response.data); // Assuming the data is in the 'data' property of the response
    } catch (error) {
      // Handle errors if the request fails
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await DeleteProfileByID(id);
      const updatedUserList = userData.filter((user) => user.id !== id);
      setUserData(updatedUserList); // Update the state with the new user list (excluding the deleted user)
      toast.success("Profile deleted successfully"); // Display success toast
      fetchData();
    } catch (error) {
      console.error("Error deleting profile:", error);
      toast.error("Error deleting profile"); // Display error toast
    }
  };

  const handleEdit = (id) => {
    setIsEditing(true);
    const userToEdit = userData.find((user) => user.id === id);
    setEditableFields({ ...editableFields, [id]: { ...userToEdit } });
  };

  const handleSave = async (event, id) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Handle save functionality for the specific user (e.g., update user data in the backend)
      const updatedUserData = userData.map((user) => {
        if (user.id === id) {
          return { ...user, ...editableFields[id] };
        }
        return user;
      });

      // Update the user data state
      setUserData(updatedUserData);
      console.log(updatedUserData);
      await UpdateProfileByID(id, editableFields[id]);

      // Perform API call to update user data here if needed
      // Example: await updateProfileById(id, editableFields[id]);

      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile");
    }
  };

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="container-profile">
        <div className="user-profile">
          <hr />

          <h2>User Profiles</h2>
          <ul className="user-list">
            {userData.map((user) => (
              <li key={user.id}>
                <form onSubmit={(event) => handleSave(event, user.id)}>
                  <div>
                    <strong>ID: </strong>
                    <span onClick={() => handleEdit(user.id)}>
                      {`${user.id}`}
                    </span>
                  </div>
                  <div>
                    <strong> First Name: </strong>
                    {isEditing && editableFields[user.id] ? (
                      <input
                        type="text"
                        value={editableFields[user.id].firstname || ""}
                        onChange={(e) =>
                          setEditableFields({
                            ...editableFields,
                            [user.id]: {
                              ...editableFields[user.id],
                              firstname: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      `${user.firstname}`
                    )}
                  </div>
                  <div>
                    <strong> Last Name: </strong>
                    {isEditing && editableFields[user.id] ? (
                      <input
                        type="text"
                        value={editableFields[user.id].lastname || ""}
                        onChange={(e) =>
                          setEditableFields({
                            ...editableFields,
                            [user.id]: {
                              ...editableFields[user.id],
                              lastname: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      `${user.lastname}`
                    )}
                  </div>
                  <div>
                    <strong> Email: </strong>
                    {isEditing && editableFields[user.id] ? (
                      <input
                        type="text"
                        value={editableFields[user.id].email || ""}
                        onChange={(e) =>
                          setEditableFields({
                            ...editableFields,
                            [user.id]: {
                              ...editableFields[user.id],
                              email: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      `${user.email}`
                    )}
                  </div>
                  <div>
                    <strong> Phone: </strong>
                    {isEditing && editableFields[user.id] ? (
                      <input
                        type="text"
                        value={editableFields[user.id].phone || ""}
                        onChange={(e) =>
                          setEditableFields({
                            ...editableFields,
                            [user.id]: {
                              ...editableFields[user.id],
                              phone: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      `${user.phone}`
                    )}
                  </div>
                  <div>
                    <strong> Address: </strong>
                    {isEditing && editableFields[user.id] ? (
                      <input
                        type="text"
                        value={editableFields[user.id].address || ""}
                        onChange={(e) =>
                          setEditableFields({
                            ...editableFields,
                            [user.id]: {
                              ...editableFields[user.id],
                              address: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      `${user.address}`
                    )}
                  </div>
                  <div className="action-buttons">
                    {!isEditing ? (
                      <>
                        <button
                          type="button"
                          className="action-button delete"
                          onClick={() => handleDelete(user.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button
                          className="action-button update"
                          onClick={() => handleEdit(user.id)}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                      </>
                    ) : (
                      <button className="action-button confirm" type="submit">
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                    )}
                  </div>
                </form>
              </li>
            ))}
          </ul>
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default UserProfileList;
