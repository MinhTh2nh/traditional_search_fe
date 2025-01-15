import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ListAllProduct, addNewProduct, exportAllProducts as exportProductsService } from "../../Service/productadmin";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Dashboard/sidebar";
import Header from "../Dashboard/Header-Admin";
import "./ProductManage.css";

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
  const [productSearch, setProductSearch] = useState(""); // Renamed for clarity
  const [loading, setLoading] = useState(false);

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

    if (isNaN(price) || isNaN(quantity)) {
      alert("Price and Quantity must be numeric values.");
      return;
    }

    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  const exportAllProducts = async () => {
    try {
      setLoading(true);
      const response = await exportProductsService(); // Use the service function
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "products.csv");
      document.body.appendChild(link);
      link.click();
      toast.success("Products exported successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.error("Error exporting products:", error);
      toast.error("Failed to export products!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setLoading(false);
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
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
              />
              <Link to={productSearch ? `/product-view/${productSearch}` : "#"}>
                <button disabled={!productSearch}>View Product</button>
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
                type="number"
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
                placeholder="Product Image URL"
                value={picone}
                onChange={(e) => setPicone(e.target.value)}
              />
              <button onClick={insertProduct} disabled={loading}>
                {loading ? "Processing..." : "Insert Product"}
              </button>
            </div>
          </div>

          <div className="card44-container">
            <div className="card-full">
              <h3>List Product</h3>
              <div className="input-group44">
                <Link to="/product-list">
                  <button>List All Products</button>
                </Link>
              </div>
            </div>
            <div className="card-full">
              <h3>Export Products</h3>
              <div className="input-group44">
                <button onClick={exportAllProducts} disabled={loading}>
                  {loading ? "Exporting..." : "Export All Products"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default ProductManage;
