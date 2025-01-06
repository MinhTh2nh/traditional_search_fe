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
  const [product_search, setProductSearch] = useState(""); // Added state for ID search
  const [loading, setLoading] = useState(false); // Added state for loading

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ListAllProduct();
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
    if (
      !productName ||
      !productType ||
      !price ||
      !quantity ||
      !color ||
      !size ||
      !material ||
      !picone
    ) {
      alert("Please fill in all fields");
      return;
    }
    try {
      setLoading(true); // Set loading to true when function starts
      await addNewProduct(
        productName,
        productType,
        price,
        quantity,
        size,
        color,
        material,
        picone
      );
      toast.success("Product inserted successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/product-list");
    } catch (error) {
      console.error("Error inserting product:", error);
      toast.error("Failed to insert product!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setLoading(false); // Set loading to false when function completes
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
                placeholder="Enter Product Id"
                value={product_search}
                onChange={(e) => setProductSearch(e.target.value)}
              />
              <Link to={product_search ? `/product-view/${product_search}` : "#"}>
                <button disabled={!product_search}>View Product</button>
              </Link>
            </div>
          </div>
          <div className="card44">
            <h3>Add Product</h3>
            <div className="input-group44">
              <input
                type="text"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Product Type"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
              />
              <input
                type="text"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <input
                type="text"
                placeholder="Size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
              <input
                type="text"
                placeholder="Color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <input
                type="text"
                placeholder="Material"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
              />
              <input
                type="text"
                placeholder="Product Image"
                value={picone}
                onChange={(e) => setPicone(e.target.value)}
              />
              <button onClick={insertProduct} disabled={loading}>
                {loading ? "Processing..." : "Insert Product"}
              </button>
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
