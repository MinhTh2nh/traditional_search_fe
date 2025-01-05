// UserProfilePage.js
import React, { useState, useEffect } from "react";
import "./Listprofile.css"; // Import the CSS file
import Sidebar from "../Dashboard/sidebar";
import Header from "../Dashboard/Header-Admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  DeleteProfileByID,
  ViewProfileByID,
  UpdateProfileByID,
} from "../../Service/UserService"; // Adjust the path as needed
import { ToastContainer, toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const UserProfileList = () => {
  const [userData, setUserData] = useState([]);
  const [editableFields, setEditableFields] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    // Make an API call using the 'id' parameter
    const fetchData = async () => {
      try {
        const response = await ViewProfileByID(id);
        setUserData(response.data); // Assuming 'response.data' contains the user information
        console.log("Profile data:", response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    // Call the fetchData function when 'id' changes or the component mounts
    fetchData();
  }, [id]); // Re-run the effect whenever 'id' changes

  const navigate = useNavigate();
  const handleDelete = async (id, event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      await DeleteProfileByID(id);
      toast.success("Profile deleted successfully");

      // Redirect to '/profile-admin' after successful deletion
      navigate("/profile-list");
    } catch (error) {
      console.error("Error deleting profile:", error);
      toast.error("Error deleting profile: Unable to delete the profile");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditableFields({ ...editableFields });
  };

  const handleSave = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const id = userData.id; // Get the ID from userData

    try {
      const updatedUserData = { ...userData, ...editableFields };
      setUserData(updatedUserData); // Update userData with the changes from editableFields

      await UpdateProfileByID(id, updatedUserData); // Perform the update API call

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
            {Object.keys(userData).length > 0 && (
              <form>
                <div>
                  <strong>ID: </strong>
                  <span onClick={() => handleEdit(userData.id)}>
                    {`${userData.id}`}
                  </span>
                </div>
                <div>
                  <strong> First Name: </strong>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableFields.firstname || ""}
                      onChange={(e) =>
                        setEditableFields({
                          ...editableFields,
                          firstname: e.target.value,
                        })
                      }
                    />
                  ) : (
                    `${userData.firstname}`
                  )}
                </div>
                <div>
                  <strong> Last Name: </strong>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableFields.lastname || ""}
                      onChange={(e) =>
                        setEditableFields({
                          ...editableFields,
                          lastname: e.target.value,
                        })
                      }
                    />
                  ) : (
                    `${userData.lastname}`
                  )}
                </div>
                <div>
                  <strong> Phone: </strong>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableFields.phone || ""}
                      onChange={(e) =>
                        setEditableFields({
                          ...editableFields,
                          phone: e.target.value,
                        })
                      }
                    />
                  ) : (
                    `${userData.phone}`
                  )}
                </div>
                <div>
                  <strong> Email: </strong>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableFields.email || ""}
                      onChange={(e) =>
                        setEditableFields({
                          ...editableFields,
                          email: e.target.value,
                        })
                      }
                    />
                  ) : (
                    `${userData.email}`
                  )}
                </div>
                <div>
                  <strong> Address: </strong>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editableFields.address || ""}
                      onChange={(e) =>
                        setEditableFields({
                          ...editableFields,
                          address: e.target.value,
                        })
                      }
                    />
                  ) : (
                    `${userData.address}`
                  )}
                </div>

                <div className="action-buttons">
                  {!isEditing ? (
                    <>
                      <button
                        className="action-button delete"
                        onClick={(e) => handleDelete(userData.id, e)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button
                        className="action-button update"
                        onClick={() => handleEdit(userData.id)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </>
                  ) : (
                    <button
                      className="action-button confirm"
                      type="submit"
                      onClick={handleSave}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                  )}
                </div>
              </form>
            )}
          </ul>
        </div>
        <Sidebar />
      </div>
    </div>
  );
};

export default UserProfileList;
