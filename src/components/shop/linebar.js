// Linebar.js
import React, { useEffect, useState } from "react";
import "./linebar.css";
import { Link } from "react-router-dom";
import { ViewProductByName } from "../../Service/productService";

function Linebar({ onCategoryChange, onSortChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [api, setApi] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [uniqueColors, setUniqueColors] = useState([]);
  const [selected, setSelected] = useState([]);
  const [uniqueProductTypes, setUniqueProductTypes] = useState(new Set());
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL; 

  const handleSortChange = (value) => {
    let sortedProducts = [...api];
    let sortBy = "name"; // Giá trị mặc định nếu không có lựa chọn nào phù hợp
    let sortOrder = "asc"; // Giá trị mặc định nếu không có lựa chọn nào phù hợp

    switch (value) {
      case "priceLowToHigh":
        sortBy = "price";
        sortOrder = "asc";
        break;
      case "priceHighToLow":
        sortBy = "price";
        sortOrder = "desc";
        break;
      case "nameAsc":
        sortBy = "product_name";
        sortOrder = "asc";
        break;
      case "nameDesc":
        sortBy = "product_name";
        sortOrder = "desc";
        break;
      default:
        break;
    }

    sortedProducts = applySorting(sortedProducts, sortBy, sortOrder);

    onSortChange(sortedProducts);
  };

  const applySorting = (products, sortBy, sortOrder) => {
    if (sortBy === "product_name") {
      return products.sort((a, b) => {
        const nameA = a.product_name.toUpperCase();
        const nameB = b.product_name.toUpperCase();

        return sortOrder === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });
    }

    if (sortBy === "price") {
      return products.sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      );
    }
    return products;
  };

  const handleSearch = async () => {
    try {
      const encodedSearchTerm = encodeURIComponent(searchTerm);
      const response = await ViewProductByName(encodedSearchTerm);
      const { item } = response?.data?.items;
    } catch (error) {
      console.error("Error searching for product:", error);
    }
  };

  const getToken = () => {
    return JSON.parse(localStorage.getItem("User")).token;
  };

  const getAuthHeaders = () => {
    const token = getToken();
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getToken();
        const response = await fetch(`${backendUrl}/api/product`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json();
        setApi(data.items);
        const allColors = data.items.flatMap((product) =>
          product.color.split(", ").map((color) => color.trim())
        );
        const colorsSet = new Set(allColors);
        const uniqueColorsArray = Array.from(colorsSet);
        setUniqueColors(uniqueColorsArray);
        const typesSet = new Set(
          data.items.map((product) => product.product_type)
        );
        setUniqueProductTypes(typesSet);
      } catch (error) {
        console.error("Error fetching product data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleColorChange = (e) => {
    const color = e.target.value;

    if (selectedColors.includes(color)) {
      setSelectedColors((prevColors) =>
        prevColors.filter((prevColor) => prevColor !== color)
      );
    } else {
      setSelectedColors((prevColors) => [...prevColors, color]);
    }

    console.log("Filters Changed:", { selected, selectedColors });
  };

  useEffect(() => {
    const filteredProducts = api.filter((product) =>
      selectedColors.some((selectedColor) =>
        product.color.includes(selectedColor)
      )
    );
    onCategoryChange({
      selectedCategories: selected,
      selectedColors: selectedColors,
    });
  }, [selectedColors, api, onCategoryChange]);

  const handleChange = (e, type) => {
    const activeData = document.getElementById(type).checked;

    if (activeData) {
      setSelected((oldData) => [...oldData, type]);
    } else {
      setSelected((oldData) => oldData.filter((value) => value !== type));
    }
  };

  const handlePriceFilter = () => {
    if (minPrice !== null && maxPrice !== null) {
      const filteredProducts = api.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );

      onCategoryChange({
        selectedCategories: selected,
        selectedColors: selectedColors,
      });

      let sortedProducts = applySorting(filteredProducts);
      onSortChange(sortedProducts);
    }
  };

  useEffect(() => {
    const filteredProducts = api.filter((product) => {
      const categoryMatch = selected.includes(product.product_type);
      const colorMatch = selectedColors.some((selectedColor) =>
        product.color.includes(selectedColor)
      );

      return categoryMatch || colorMatch;
    });

    console.log("Filtered Products:", filteredProducts);

    onCategoryChange({
      selectedCategories: selected,
      selectedColors: selectedColors,
    });
  }, [selected, selectedColors, api, onCategoryChange]);

  return (
    <div>
      <div className="linebbar">
        <div className="containerlinebar">
          <p>
            <a
              className="btn btn-success"
              data-toggle="collapse"
              href="#example_1"
              role="button"
              id="btn-1"
              aria-expanded="false"
              aria-controls="example_1"
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABCUlEQVR4nO2ZQU7DMBBFXRa9E3A2/7cqhWuVfcWOHqDlGiBDIlVVqJqQUk/ynzSbiWT5Zxxnvp2SmQDAUtIL8AF8lpB0kLQuz1IUgOdWQEc8pShIOpRJ55zv2xzw0FYmRYHm7V+arxYqFrIA3s6s+844HeQ433esISHp9XQCd8A2mhBgM9mlNU8harbfsuW2uZzzY5Pbpyjo5w/+2we4SsFalPVRZb4rUUSEalGMMaYXNmi1YYM2h+ZzMcRYjRXnhPAfxurWQvirsRqLyfgapiJENmiVYYNmjLkeNkG1Id9SVQYRGjxgCeyu7B1GD3UYq3Io/R5NCEOMVYilNSshsgmqDHxLZVIfvgD9PwLtQGV+DAAAAABJRU5ErkJggg=="
                alt="FILTER"
              />{" "}
              &nbsp;<span> FILTER</span>
            </a>
          </p>
          <p style={{ display: "flex", paddingLeft: "10%" }}>
            <input
              type="text"
              placeholder="Search product"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span>
              <Link to={searchTerm.trim() ? `/search/${encodeURIComponent(searchTerm)}` : "#"}>
                <button onClick={handleSearch} disabled={!searchTerm.trim()}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </Link>
            </span>
          </p>
          <div className="sort-grid">
            <div className="sortby">
              <p>SORT BY</p>
              <select onChange={(e) => handleSortChange(e.target.value)}>
                <option value="nameAsc">A - Z</option>
                <option value="nameDesc">Z - A</option>
                <option value="priceLowToHigh">PRICE, LOW - HIGH</option>
                <option value="priceHighToLow">PRICE, HIGH - LOW</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="collapse" id="example_1">
        <div className="card card-body">
          <div className="content-line-bar">
            <div>
              <p id="cat">CATEGORY</p>
              <div className="typeorsomethingelse">
                {[...uniqueProductTypes].map((type, i) => (
                  <div className="typetype" key={i}>
                    <span className="catbig">{type}</span>
                    <input
                      id={type}
                      type="checkbox"
                      value={type}
                      checked={selected.includes(type)}
                      onChange={(e) => handleChange(e, type)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p id="cat">COLOR</p>
              <div className="typeorsomethingelse">
                {Array.isArray(uniqueColors) && uniqueColors.length > 0 ? (
                  uniqueColors.map((color, i) => (
                    <div className="typetype" key={i}>
                      <span className="catbig">{color}</span>
                      <input
                        id={i}
                        type="checkbox"
                        value={color}
                        checked={selectedColors.includes(color)}
                        onChange={handleColorChange}
                      />
                    </div>
                  ))
                ) : (
                  <p>No colors available</p>
                )}
              </div>
            </div>
            <div>
              <p id="cat">PRICE RANGE</p>
              <div className="typeorsomethingelse">
                <input
                  type="number"
                  placeholder="Min"
                  onChange={(e) => setMinPrice(parseInt(e.target.value))}
                />
                <input
                  type="number"
                  placeholder="Max"
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                />
                <button onClick={handlePriceFilter}>Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Linebar;
