// ProductManage.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ListAllProduct, addNewProduct } from "../../Service/productadmin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Dashboard/sidebar";
import Header from "../Dashboard/Header-Admin";

const ProductManage = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [picone, setPicone] = useState("");
  const [pictwo, setPictwo] = useState("");
  const [picthree, setPicthree] = useState("");

  const [idSearch, setIDSearch] = useState(""); // Added state for ID search
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ListAllProduct();
        // Ensure that the response.data.items is an array before setting state
        if (Array.isArray(response.data.items)) {
          setProducts(response.data.items);
        } else {
          console.error("Invalid data format for products:", response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const insertProduct = async () => {
    try {
      if (
        productName &&
        productType &&
        price &&
        quantity &&
        color &&
        size &&
        material &&
        picone &&
        pictwo &&
        picthree
      ) {
        await addNewProduct(
          productName,
          productType,
          price,
          quantity,
          size,
          color,
          material,
          picone,
          pictwo,
          picthree
        );

        toast.success("Product inserted successfully!", {
          position: toast.POSITION.TOP_CENTER,
        });

        // Refresh the product list after inserting
        const response = await ListAllProduct();
        // Ensure that the response.data.items is an array before setting state
        if (Array.isArray(response.data.items)) {
          setProducts(response.data.items);
        } else {
          console.error("Invalid data format for products:", response.data);
        }
      } else {
        alert("Please fill in all fields");
      }
    } catch (error) {
      console.error("Error inserting product:", error);
      toast.error("Failed to insert product!", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div>
      <Header />
      <div className="main-content44">
        <div className="card-container44">
          <div className="card44">
            <h3>Product List</h3>
            <div className="input-group44">
              <input
                type="text"
                placeholder="Enter Product ID"
                value={idSearch}
                onChange={(e) => setIDSearch(e.target.value)}
              />
              <Link to={`/product-view/${idSearch}`}>
                <button>View Product</button>
              </Link>
            </div>
          </div>

          <div className="card44">
            <h3>Add Product</h3>
            <div className="input-group44">
              {/*Product Name */}
              <input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              {/*Product Type */}
              <input
                type="text"
                placeholder="Product Type"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
              />
              {/*Product Price */}
              <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {/*Product Quantity */}
              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              {/*Product Size */}
              <input
                type="text"
                placeholder="Size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
              {/*Product Color */}
              <input
                type="text"
                placeholder="Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              {/*Product Material */}
              <input
                type="text"
                placeholder="Material"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
              />
              {/*Product One */}
              <input
                type="text"
                placeholder="Picture one"
                value={picone}
                onChange={(e) => setPicone(e.target.value)}
              />
              {/*Product Two */}
              <input
                type="text"
                placeholder="Picture two"
                value={pictwo}
                onChange={(e) => setPictwo(e.target.value)}
              />
              {/*Product Three */}
              <input
                type="text"
                placeholder="Picture three"
                value={picthree}
                onChange={(e) => setPicthree(e.target.value)}
              />
              <button onClick={insertProduct}>Insert Product</button>
            </div>
          </div>
          <div className="card44">
            <h3>List Product</h3>
            <div className="input-group44">
              <Link to="/product-list">
                <button>List All Product</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default ProductManage;
