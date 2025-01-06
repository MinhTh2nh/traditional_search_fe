
import React, { useState, useEffect } from 'react';
import './Order.css'; // Import the CSS file
import Sidebar from '../Dashboard/sidebar';
import Header from '../Dashboard/Header-Admin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSearch, faCheck, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import { ListAllOrders, UpdateOrderByID, DeleteOrderByID } from '../../Service/OrderService';
import { Link } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';

const OrderList = () => {
  const [orderData, setOrderData] = useState([]);
  const [editableFields, setEditableFields] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [orderIDSearch, setOrderIDSearch] = useState('');
  useEffect(() => {

    fetchData(); // Call the fetchData function to execute the API call

  }, []); // The empty dependency array means this effect runs only once (on mount)

  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await ListAllOrders();
      setOrderData(response.data);
      console.log(response.data); // Assuming the data is in the 'data' property of the response
    } catch (error) {
      // Handle errors if the request fails
      console.error('Error fetching data:', error);
    }
  };
  const handleDelete = async (orderID) => {
    try {
      await DeleteOrderByID(orderID);
      const updatedOrderList = orderData.filter(order => order.orderID !== order.orderID);
      setOrderData(updatedOrderList); // Update the state with the new order list (excluding the deleted order)
      toast.success('Order deleted successfully'); // Display success toast
      navigate('/order-manage');
      fetchData();
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Error deleting order'); // Display error toast
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
      console.log('Updating order before passing:', updatedOrderData);
      await UpdateOrderByID(orderID, editableFields[orderID]);

      // Perform API call to update order data here if needed
      // Example: await updateProfileById(id, editableFields[id]);

      setIsEditing(false);
      toast.success('Order updated successfully');
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Error updating order');
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'yellow';
      case 'Confirmed':
        return 'blue';
      case 'Success':
        return 'green';
      case 'Cancel':
        return 'red';
      default:
        return 'gray'; // Default color if status is unknown
    }
  };

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="container-profile">
        <div className="search">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Order by ID"
              value={orderIDSearch}
              onChange={(e) => setOrderIDSearch(e.target.value)}
            />
            <Link to={`/view-order/${orderIDSearch}`}>
              <button>
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </Link>
          </div>
        </div>
        <div className="order-profile">
          <hr />

          <h2>Order List</h2>

          <ul className="order-list">
            {orderData.map((order) => (
              <li key={order._id}>
                <form onSubmit={(event) => handleSave(event, order._id)}>
                  <div>
                    <strong> Order ID: </strong>
                    <span onClick={() => handleEdit(order._id)}>
                      {`${order._id}`}
                    </span>
                  </div>
                  <div>
                    <strong> Customer ID: </strong>
                    <span onClick={() => handleEdit(order.userId)}>
                      {`${order.userId}`}
                    </span>
                  </div>
                  <div>
                    <strong>Full Name</strong>
                    {isEditing && editableFields[order._id] ? (
                      <input
                        type="text"
                        value={editableFields[order._id].fullName || order.fullName || ''}
                        onChange={(e) => {
                          const newFullName = e.target.value;
                          if (newFullName !== editableFields[order._id]?.fullName) {
                            setEditableFields({
                              ...editableFields,
                              [order._id]: {
                                ...editableFields[order._id],
                                fullName: newFullName,
                              },
                            });
                          }
                        }}
                      />
                    ) : (
                      <span>{order.fullName}</span>
                    )}
                  </div>

                  <div>
                    <strong> Phone: </strong>
                    {isEditing && editableFields[order._id] ? (
                      <input
                        type="text"
                        value={editableFields[order._id].phoneNumber || order.phoneNumber || ''}
                        onChange={(e) =>
                          setEditableFields({
                            ...editableFields,
                            [order._id]: {
                              ...editableFields[order._id],
                              phoneNumber: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      `${order.phoneNumber}`
                    )}
                  </div>
                  <div>
                    <strong> Address: </strong>
                    {isEditing && editableFields[order._id] ? (
                      <input
                        type="text"
                        value={editableFields[order._id].shipping_address || order.shipping_address || ''}
                        onChange={(e) =>
                          setEditableFields({
                            ...editableFields,
                            [order._id]: {
                              ...editableFields[order._id],
                              shipping_address: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      `${order.shipping_address}`
                    )}
                  </div>
                  <div>
                    <strong> Total Amount: </strong>
                    {isEditing && editableFields[order._id] ? (
                      <input
                        type="text"
                        disabled
                        value={editableFields[order._id].totalAmount || order.totalAmount || ''}
                        onChange={(e) =>
                          setEditableFields({
                            ...editableFields,
                            [order._id]: {
                              ...editableFields[order._id],
                              totalAmount: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      `${order.totalAmount}$`
                    )}
                  </div>
                  <div>
                    <strong> Payment Method: </strong>
                    {isEditing && editableFields[order._id] ? (
                      <input
                        type="text"
                        value={editableFields[order._id].paymentMethod || order.paymentMethod || ''}
                        onChange={(e) =>
                          setEditableFields({
                            ...editableFields,
                            [order._id]: {
                              ...editableFields[order._id],
                              paymentMethod: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      `${order.paymentMethod}`
                    )}
                  </div>
                  <div>
                    <strong>Status</strong>
                    {isEditing && editableFields[order._id] ? (
                      <select
                        value={editableFields[order._id]?.status || order.status ||'Pending'}
                        onChange={(e) =>
                          setEditableFields({
                            ...editableFields,
                            [order._id]: {
                              ...editableFields[order._id],
                              status: e.target.value,
                            },
                          })
                        }
                        style={{
                          backgroundColor: getStatusColor(editableFields[order._id]?.status),
                          color: '#1A1A1A',
                          padding: '5px 10px',
                          border: '1px solid #1A1A1A',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Success">Success</option>
                        <option value="Cancel">Cancel</option>
                      </select>
                    ) : (
                      <span
                        style={{
                          backgroundColor: getStatusColor(order.status),
                          color: '#1A1A1A',
                          fontWeight: 'bold',
                          padding: '5px 10px',
                          borderRadius: '4px',
                          borderWidth: '1px solid #1A1A1A',
                        }}
                      >
                        {order.status}
                      </span>
                    )}
                  </div>

                  <div className="action-buttons">
                    {!isEditing ? (
                      <>
                        <Link to={`/orderdetail-manage/${order._id}`}>
                          <button
                            type="button"
                            className="action-button detail"

                          >
                            Show Detail
                          </button></Link>
                        <button
                          type="button"
                          className="action-button delete"
                          onClick={() => handleDelete(order._id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button
                          className="action-button update"
                          onClick={() => handleEdit(order._id)}
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
