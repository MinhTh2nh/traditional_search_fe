// orderProfilePage.js
import React, { useState, useEffect } from 'react';
import './Vieworder.css'; // Import the CSS file
import Sidebar from '../Dashboard/sidebar';
import Header from '../Dashboard/Header-Admin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';
import { DeleteOrderByID, ViewOrderByID,UpdateOrderByID } from '../../Service/OrderService'; // Adjust the path as needed
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
        const response = await ViewOrderByID(orderID);
        setOrderData(response.data); // Assuming 'response.data' contains the order information
        console.log('Order data:', response.data);
        
      } catch (error) {
        console.error('Error fetching order:', error);
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
      await DeleteOrderByID(orderID);
      toast.success('Order deleted successfully');
  
      // Redirect to '/profile-admin' after successful deletion
      navigate('/order-manage');
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Error deleting order: Unable to delete the order');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditableFields({ ...editableFields});
  };

  const handleSave = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const orderID = orderData[0].orderID; // Get the ID from orderData
  
    try {
      const updatedOrderData = { ...orderData, ...editableFields };
      setOrderData(updatedOrderData); // Update orderData with the changes from editableFields
  
      await UpdateOrderByID(orderID, updatedOrderData); // Perform the update API call
  
      setIsEditing(false);
      toast.success('order updated successfully');
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Error updating order');
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
                <span onClick={() => handleEdit(orderData[0].orderID)}>
                  {`${orderData[0].orderID}`}
                </span>
              </div> 
              <div>
                <strong>Customer ID: </strong>
                <span onClick={() => handleEdit(orderData[0].customerid)}>
                  {`${orderData[0].customerid}`}
                </span>
              </div>
              <div>
                <strong> First Name: </strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableFields.firstname || ''}
                    onChange={(e) =>
                      setEditableFields({
                        ...editableFields,
                        firstname: e.target.value,
                      })
                    }
                  />
                ) : (
                  `${orderData[0].firstname}`
                )}
              </div>
              <div>
                <strong> Last Name: </strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableFields.lastname || ''}
                    onChange={(e) =>
                      setEditableFields({
                        ...editableFields,
                        lastname: e.target.value,
                      })
                    }
                  />
                ) : (
                  `${orderData[0].lastname}`
                )}
              </div>
              <div>
                <strong> Phone: </strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableFields.phone || ''}
                    onChange={(e) =>
                      setEditableFields({
                        ...editableFields,
                        phone: e.target.value,
                      })
                    }
                  />
                ) : (
                  `${orderData[0].phone}`
                )}
              </div>
              <div>
                <strong> Email: </strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableFields.email|| ''}
                    onChange={(e) =>
                      setEditableFields({
                        ...editableFields,
                        email: e.target.value,
                      })
                    }
                  />
                ) : (
                  `${orderData[0].email}`
                )}
              </div>
              <div>
                <strong> Address: </strong>
                {isEditing ? (
                  <input
                    type="text"
                    value={editableFields.address|| ''}
                    onChange={(e) =>
                      setEditableFields({
                        ...editableFields,
                       address: e.target.value,
                      })
                    }
                  />
                ) : (
                  `${orderData[0].address}`
                )}
              </div>
             

              <div className="action-buttons">
                {!isEditing ? (
                  <>
                    <button
                     type = "button"
                      className="action-button delete"
                      onClick={(e) => handleDelete(orderData[0].orderID, e)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      className="action-button update"
                      onClick={() => handleEdit(orderData[0].orderID)}
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
