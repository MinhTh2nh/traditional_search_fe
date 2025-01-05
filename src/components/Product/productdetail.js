import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./productdetail.css";
import { ViewProductById } from "../../Service/productService";
import {
  AddProduct,
  getUserIdFromLocalStorage,
} from "../../Service/CartService";
import { useNavigate } from 'react-router-dom';

const extractColors = (colorsString) => {
  if (colorsString && typeof colorsString === "string") {
    return colorsString.split(", ").map((color) => color.trim());
  }
  return [];
};

const extractSizes = (sizesString) => {
  if (sizesString && typeof sizesString === "string") {
    return sizesString.split(",").map((size) => size.trim());
  }
  return [];
};

function ProductDetail() {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);
  const [clicked, setClicked] = useState(false);
  const { id } = useParams();
  const user_id = getUserIdFromLocalStorage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ViewProductById(id, user_id);

        if (!response.data || !response.data.item) {
          console.error("Response Data Structure:", response.data);
          throw new Error("Data structure is not as expected");
        }

        const colors = extractColors(response.data.item.color);
        const sizes = extractSizes(response.data.item.size);

        setProduct({ ...response.data.item, colors, sizes });
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };

    fetchData();
  }, [id, user_id]);

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const addToCart = async () => {
    try {
      if (!selectedSize || !selectedColor) {
        console.error("Size and color must be selected.");
        return;
      }

      const cartItem = {
        name: product.product_name,
        type: product.product_type,
        price: product.price,
        quantity: 1,
        size: selectedSize,
        color: selectedColor,
      };

      console.log(cartItem);

      const response = await AddProduct(cartItem);
      setClicked(true);
      if (response && clicked) {
        navigate(`/cart/${user_id}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };

  return (
    <div className="whole">
      {product ? (
        <>
          <div className="left">
            <img src={product.picture_one} alt="Product" />
          </div>
          <div className="right">
            <div key={product.id} className="info-container">
              <h1>Name: {product.product_name}</h1>
              <div className="description">
                <p id="desc">Product: {product.product_type}</p>
                <p id="price">Price: {product.price}</p>
              </div>
            </div>

            <div className="filtercontainer">
              <div className="filter">
                <div className="filtercolor">
                  <p>Color</p>
                  <div>
                    {product.colors ? (
                      <ul style={{ display: "flex", paddingLeft: "0px" }}>
                        {product.colors.map((color, index) => (
                          <li
                            key={index}
                            className={`color-wrapper ${selectedColor === color ? "selected" : ""
                              }`}
                            onClick={() => handleColorClick(color)}
                          >
                            {color}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No colors available</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="filter">
                <div className="filtersize">
                  <p id="size">Size</p>
                  <div>
                    {product.sizes ? (
                      <ul style={{ display: "flex", paddingLeft: "0px" }}>
                        {product.sizes.map((size, index) => (
                          <li
                            key={index}
                            className={`size-wrapper ${selectedSize === size ? "selected" : ""
                              }`}
                            onClick={() => handleSizeClick(size)}
                          >
                            {size}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No sizes available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button className="addcontainer" onClick={addToCart}>
                ADD TO CART
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProductDetail;
