
import React, { useState, useEffect } from 'react';
import './Order.css'; // Import the CSS file
import Sidebar from '../Dashboard/sidebar';
import Header from '../Dashboard/Header-Admin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash,faSearch, faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import {  ViewOrderDetailByID, UpdateOrderByID, DeleteOrderDetailByID } from '../../Service/OrderService';
import {Link} from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';

const OrderList = () => {
  const [orderData, setOrderData] = useState([]);
  const [editableFields, setEditableFields] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    
    fetchData(); // Call the fetchData function to execute the API call

  }, []); // The empty dependency array means this effect runs only once (on mount)

  const navigate = useNavigate();
  const { orderID } = useParams();
  const fetchData = async () => {
    try {
      const response = await  ViewOrderDetailByID( orderID ); 
      setOrderData(response.data); 
      console.log(response.data); // Assuming the data is in the 'data' property of the response
    } catch (error) {
      // Handle errors if the request fails
      console.error('Error fetching data:', error);
    }
  };
  const handleDelete = async (orderID) => {
    try {
      await DeleteOrderDetailByID(orderID);
      const updatedOrderList = orderData.filter(order => order.orderID !== order.orderID);
      setOrderData(updatedOrderList); // Update the state with the new order list (excluding the deleted order)
      toast.success('Order detail deleted successfully'); // Display success toast
      navigate('/order-manage');
      fetchData();
    } catch (error) {
      console.error('Error deleting Order detail:', error);
      toast.error('Error deleting Order detail'); // Display error toast
    }
  };

  const handleEdit = (orderID) => {
    setIsEditing(true);
    const orderToEdit = orderData.find(order => order.orderID === orderID);
    setEditableFields({ ...editableFields, [orderID]: { ...orderToEdit } });
  };


  const handleSave = async (event, orderID) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    try {
      // Handle save functionality for the specific order (e.g., update order data in the backend)
      const updatedOrderData = orderData.map(order => {
        if (order.orderID === orderID) {
          return { ...order, ...editableFields[orderID] };
        }
        return order;
      });
  
      // Update the order data state
      setOrderData(updatedOrderData);
      console.log(updatedOrderData);
      await UpdateOrderByID(orderID, editableFields[orderID]);
      
      // Perform API call to update order data here if needed
      // Example: await updateProfileById(id, editableFields[id]);
  
      setIsEditing(false);
      toast.success('Order detail updated successfully');
    } catch (error) {
      console.error('Error updating Order detail:', error);
      toast.error('Error updating Order detail');
    }
  };
  return (
    <div>
        <Header />
        <ToastContainer />
    <div className="container-profile">
      <div className="order-profile">
        <hr />

        <h2>Order Detail</h2>
        <Link to = "/order-manage">
                  <button
          type = "button"
          className="action-button detail"
        >
          Back to OrderList
        </button></Link>
        <ul className="order-list">
        {orderData.map((order) => (
          <li key={order.orderID}>
          <form onSubmit={(event) => handleSave(event, order.orderID)}>
              <div>
                <strong> Order ID: </strong>
                <span onClick={() => handleEdit(order.orderID)}>
                  {`${order.orderID}`}
                </span>
              </div>   
              <div>
                <strong> Product ID: </strong>
                <span onClick={() => handleEdit(order.productID)}>
                  {`${order.productID}`}
                </span>
              </div>   
              <div>
                <strong> Product Name: </strong>
                {isEditing && editableFields[order.orderID] ? (
                  <input
                    type="text"
                    value={editableFields[order.orderID].productname || ''}
                    onChange={(e) =>
                      setEditableFields({
                        ...editableFields,
                        [order.orderID]: {
                          ...editableFields[order.orderID],
                          productname: e.target.value,
                        },
                      })
                    }
                  />
                ) : (
                  `${order.productname}`
                )}
              </div>
              <div>
                <strong> Type: </strong>
                {isEditing && editableFields[order.orderID] ? (
                  <input
                    type="text"
                    value={editableFields[order.orderID].type || ''}
                    onChange={(e) =>
                      setEditableFields({
                        ...editableFields,
                        [order.orderID]: {
                          ...editableFields[order.orderID],
                          type: e.target.value,
                        },
                      })
                    }
                  />
                ) : (
                  `${order.type}`
                )}
              </div>
              <div>
                <strong> Size: </strong>
                {isEditing && editableFields[order.orderID] ? (
                  <input
                    type="text"
                    value={editableFields[order.orderID].size || ''}
                    onChange={(e) =>
                      setEditableFields({
                        ...editableFields,
                        [order.orderID]: {
                          ...editableFields[order.orderID],
                          size: e.target.value,
                        },
                      })
                    }
                  />
                ) : (
                  `${order.size}`
                )}
              </div>
              <div>
                <strong> Color: </strong>
                {isEditing && editableFields[order.orderID] ? (
                  <input
                    type="text"
                    value={editableFields[order.orderID].color|| ''}
                    onChange={(e) =>
                      setEditableFields({
                        ...editableFields,
                        [order.orderID]: {
                          ...editableFields[order.orderID],
                          color: e.target.value,
                        },
                      })
                    }
                  />
                ) : (
                  `${order.color}`
                )}
              </div>
              <div>
                <strong> Quantity: </strong>
                {isEditing && editableFields[order.orderID] ? (
                  <input
                    type="text"
                    value={editableFields[order.orderID].quantity|| ''}
                    onChange={(e) =>
                      setEditableFields({
                        ...editableFields,
                        [order.orderID]: {
                          ...editableFields[order.orderID],
                          quantity: e.target.value,
                        },
                      })
                    }
                  />
                ) : (
                  `${order.quantity}`
                )}
              </div>
                  <div className="action-buttons">
                {!isEditing ? (
                  <>
                  <button
                     type = "button"
                      className="action-button delete"
                      onClick={() => handleDelete(order.orderID)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      className="action-button update"
                      onClick={() => handleEdit(order.orderID)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </>
                ) : (
                  <button
                    className="action-button confirm"
                    type="submit"
                  >
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

export default OrderList;
