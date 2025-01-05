// orderProfilePage.js
import React, { useState, useEffect } from 'react';
import './Vieworder.css'; // Import the CSS file
import Sidebar from '../Dashboard/sidebar';
import Header from '../Dashboard/Header-Admin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';
import { DeleteOrderDetailByID, ViewOrderDetailByID,UpdateOrderDetailByID } from '../../Service/OrderService'; // Adjust the path as needed
import { ToastContainer, toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const OrderList = () => {
  const [orderData, setOrderData] = useState([]);
  const [editableFields, setEditableFields] = useState({});
  const [isEditing, setIsEditing] = useState(false);



  const { orderID } = useParams();
  useEffect(() => {
    // Make an API call using the 'id' parameter
    const fetchData = async () => {
      try {
        const response = await ViewOrderDetailByID(orderID);
        setOrderData(response.data); // Assuming 'response.data' contains the order information
        console.log('Profile data:', response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    // Call the fetchData function when 'id' changes or the component mounts
    fetchData();
  }, [orderID]); // Re-run the effect whenever 'id' changes


  const navigate = useNavigate();
  const handleDelete = async (orderID, event) => {
    event.preventDefault(); // Prevent default form submission behavior
    event.stopPropagation(); // Stop the event from propagating further up the DOM tree
    try {
      await DeleteOrderDetailByID(orderID);
      toast.success('Profile deleted successfully');
  
      // Redirect to '/profile-admin' after successful deletion
      navigate('/orderdetail-manage');
    } catch (error) {
      console.error('Error deleting profile:', error);
      toast.error('Error deleting profile: Unable to delete the profile');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditableFields({ ...editableFields});
  };

  const handleSave = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const orderID = orderData.orderID; // Get the ID from orderData
  
    try {
      const updatedOrderData = { ...orderData, ...editableFields };
      setOrderData(updatedOrderData); // Update orderData with the changes from editableFields
  
      await UpdateOrderDetailByID(orderID, updatedOrderData); // Perform the update API call
  
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    }
  };
  return (
    <div>
    <Header />
    <ToastContainer />
    <div className="container-profile">
      <div className="order-profile">
        <hr />
        <h2>Order Profiles</h2>
        <ul className="order-list">
          {Object.keys(orderData).length > 0 && (
            <form >
              <div>
                <strong>ID: </strong>
                <span onClick={() => handleEdit(orderData.orderID)}>
                  {`${orderData.orderID}`}
                </span>
              </div> 
              <div>
                <strong>Product ID: </strong>
                <span onClick={() => handleEdit(orderData.productID)}>
                  {`${orderData.productID}`}
                </span>
              </div> 
              <div>
                <strong> Product Name: </strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableFields.productname || ''}
                    onChange={(e) =>
                      setEditableFields({
                        ...editableFields,
                        productname: e.target.value,
                      })
                    }
                  />
                ) : (
                  `${orderData.productname}`
                )}
              </div>
              <div>
                <strong> Type: </strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableFields.type || ''}
                    onChange={(e) =>
                      setEditableFields({
                        ...editableFields,
                        type: e.target.value,
                      })
                    }
                  />
                ) : (
                  `${orderData.type}`
                )}
              </div>
              <div>
                <strong> Size: </strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableFields.size || ''}
                    onChange={(e) =>
                      setEditableFields({
                        ...editableFields,
                        size: e.target.value,
                      })
                    }
                  />
                ) : (
                  `${orderData.size}`
                )}
              </div>
              <div>
                <strong> Color: </strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableFields.color|| ''}
                    onChange={(e) =>
                      setEditableFields({
                        ...editableFields,
                        color: e.target.value,
                      })
                    }
                  />
                ) : (
                  `${orderData.color}`
                )}
              </div>
              <div>
                <strong> Quantity: </strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableFields.quantity|| ''}
                    onChange={(e) =>
                      setEditableFields({
                        ...editableFields,
                        quantity: e.target.value,
                      })
                    }
                  />
                ) : (
                  `${orderData.quantity}`
                )}
              </div>
             

              <div className="action-buttons">
                {!isEditing ? (
                  <>
                    <button
                     type = "button"
                      className="action-button delete"
                      onClick={(e) => handleDelete(orderData.orderID, e)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      className="action-button update"
                      onClick={() => handleEdit(orderData.orderID)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </>
                ) : (
                  <button className="action-button confirm" type="submit" onClick={handleSave}>
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

export default OrderList;
