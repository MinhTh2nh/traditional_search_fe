import React, { useState, useEffect } from "react";
import "./ListProduct.css";
import Sidebar from "../Dashboard/sidebar";
import Header from "../Dashboard/Header-Admin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faEdit } from "@fortawesome/free-solid-svg-icons";
import {
  ListAllProduct,
  deleteProduct,
  updateProductID,
} from "../../Service/productadmin";
import { ToastContainer, toast } from "react-toastify";

const ProductList = () => {
  const [productData, setProductData] = useState([]);
  const [editableFields, setEditableFields] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await ListAllProduct();
      if (response.data.items && Array.isArray(response.data.items)) {
        setProductData(response.data.items);
        console.log(response.data.items);
      } else {
        console.error(
          "Error: response.data.items is not an array",
          response.data
        );
        toast.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      toast.error("Error fetching data");
    }
  };

  const deleteProductHandler = async (id) => {
    try {
      await deleteProduct(id);
      const updateProductList = productData.filter(
        (product) => product.id !== id
      );
      setProductData(updateProductList);
      toast.success("Product deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product");
    }
  };

  const handleEdit = (id) => {
    setIsEditing(true);
    const productToEdit = productData.find((product) => product.id === id);
    setEditableFields({ ...editableFields, [id]: { ...productToEdit } });
  };

  const handleSave = async (event, id) => {
    event.preventDefault();

    try {
      const updatedProductData = productData.map((product) => {
        if (product.id === id) {
          return { ...product, ...editableFields[id] };
        }
        return product;
      });

      setProductData(updatedProductData);
      console.log(updatedProductData);
      await updateProductID(id, editableFields[id]);

      setIsEditing(false);
      toast.success("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product");
    }
  };

  return (
    <div>
      <Header />
      <ToastContainer />
      <div className="container-profile">
        <div className="user-profile">
          <hr />
          <h2>Product Information</h2>
          <ul className="user-list">
            {productData.map((product) => (
              <li key={product.id}>
                <form onSubmit={(event) => handleSave(event, product.id)}>
                  <div>
                    <strong>ID: </strong>
                    <span>{`${product.id}`}</span>
                  </div>
                  {/*ID */}
                  <div>
                    <strong> Name: </strong>
                    {isEditing && editableFields[product.id] ? (
                      <input
                        type="text"
                        value={editableFields[product.id].product_name || ""}
                        onChange={(e) =>
                          setEditableFields({
                            ...editableFields,
                            [product.id]: {
                              ...editableFields[product.id],
                              product_name: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      `${product.product_name}`
                    )}
                  </div>
                  {/*Name */}
                  <div>
                    <strong> Type: </strong>
                    {isEditing && editableFields[product.id] ? (
                      <input
                        type="text"
                        value={editableFields[product.id].product_type || ""}
                        onChange={(e) =>
                          setEditableFields({
                            ...editableFields,
                            [product.id]: {
                              ...editableFields[product.id],
                              product_type: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      `${product.product_type}`
                    )}
                  </div>
                  {/*Price */}
                  <div>
                    <strong> Price: </strong>
                    {isEditing && editableFields[product.id] ? (
                      <input
                        type="text"
                        value={editableFields[product.id].price || ""}
                        onChange={(e) =>
                          setEditableFields({
                            ...editableFields,
                            [product.id]: {
                              ...editableFields[product.id],
                              price: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      `${product.price}`
                    )}
                  </div>
                  {/*Quantity */}
                  <div>
                    <strong> Quantity: </strong>
                    {isEditing && editableFields[product.id] ? (
                      <input
                        type="text"
                        value={editableFields[product.id].quantity || ""}
                        onChange={(e) =>
                          setEditableFields({
                            ...editableFields,
                            [product.id]: {
                              ...editableFields[product.id],
                              quantity: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      `${product.quantity}`
                    )}
                  </div>
                  {/*Color */}
                  <div>
                    <strong> Color: </strong>
                    {isEditing && editableFields[product.id] ? (
                      <input
                        type="text"
                        value={editableFields[product.id].color || ""}
                        onChange={(e) =>
                          setEditableFields({
                            ...editableFields,
                            [product.id]: {
                              ...editableFields[product.id],
                              color: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      `${product.color}`
                    )}
                  </div>
                  {/*Size */}
                  <div>
                    <strong> Size: </strong>
                    {isEditing && editableFields[product.id] ? (
                      <input
                        type="text"
                        value={editableFields[product.id].size || ""}
                        onChange={(e) =>
                          setEditableFields({
                            ...editableFields,
                            [product.id]: {
                              ...editableFields[product.id],
                              size: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      `${product.size}`
                    )}
                  </div>
                  {/*Material */}
                  <div>
                    <strong> Material: </strong>
                    {isEditing && editableFields[product.id] ? (
                      <input
                        type="text"
                        value={editableFields[product.id].material || ""}
                        onChange={(e) =>
                          setEditableFields({
                            ...editableFields,
                            [product.id]: {
                              ...editableFields[product.id],
                              material: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      `${product.material}`
                    )}
                  </div>
                  {/*Picture_one */}
                  <div>
                    <strong> Picture One: </strong>
                    {isEditing && editableFields[product.id] ? (
                      <input
                        type="text"
                        value={editableFields[product.id].picture_one || ""}
                        onChange={(e) =>
                          setEditableFields({
                            ...editableFields,
                            [product.id]: {
                              ...editableFields[product.id],
                              picture_one: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      `${product.picture_one}`
                    )}
                  </div>
                  {/*Picture_Two */}
                  <div>
                    <strong> Picture Two: </strong>
                    {isEditing && editableFields[product.id] ? (
                      <input
                        type="text"
                        value={editableFields[product.id].picture_two || ""}
                        onChange={(e) =>
                          setEditableFields({
                            ...editableFields,
                            [product.id]: {
                              ...editableFields[product.id],
                              picture_two: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      `${product.picture_two}`
                    )}
                  </div>
                  {/*Picture Three */}
                  <div>
                    <strong> Picture Three: </strong>
                    {isEditing && editableFields[product.id] ? (
                      <input
                        type="text"
                        value={editableFields[product.id].picture_three || ""}
                        onChange={(e) =>
                          setEditableFields({
                            ...editableFields,
                            [product.id]: {
                              ...editableFields[product.id],
                              picture_three: e.target.value,
                            },
                          })
                        }
                      />
                    ) : (
                      `${product.picture_three}`
                    )}
                  </div>

                  <div className="action-buttons">
                    {!isEditing ? (
                      <>
                        <button
                          type="button"
                          className="action-button delete"
                          onClick={() => deleteProductHandler(product.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <button
                          className="action-button update"
                          onClick={() => handleEdit(product.id)}
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

export default ProductList;
