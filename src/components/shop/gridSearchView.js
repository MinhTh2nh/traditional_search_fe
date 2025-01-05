// GridView.js
import React, { useState, useEffect } from "react";
import "./gridview.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import * as productProfileService from "../../Service/productService";
import Linebar from "./linebar";
import { useParams } from "react-router-dom"; // Import useParams

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "white" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "white" }}
      onClick={onClick}
    />
  );
}

function GridSearchView() {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const { product_name } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const [filters, setFilters] = useState({
    selectedCategories: [],
    selectedColors: [],
  });
  const [sortType, setSortType] = useState("product_name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productProfileService.ListProductBySearchTerm(
          product_name
        );
        setProducts(response.data.items ?? []);
        console.log("products after update: ", products)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error.message);
        setError("Error fetching product data: " + error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [product_name]);

  useEffect(() => {
    const sortedProducts = [...products].sort((a, b) => {
      const valueA = a[sortType].toUpperCase();
      const valueB = b[sortType].toUpperCase();

      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    });

    setFilteredProducts(sortedProducts);
  }, [products, sortType, sortOrder]);

  useEffect(() => {
    const { selectedCategories, selectedColors } = filters;
    const filtersSelected =
      selectedCategories.length > 0 || selectedColors.length > 0;

    const updatedProducts = products.filter((product) => {
      const categoryMatch =
        filtersSelected && selectedCategories.includes(product.product_type);

      const colorMatch =
        filtersSelected &&
        selectedColors.some((selectedColor) =>
          product.color.includes(selectedColor)
        );

      return filtersSelected ? categoryMatch || colorMatch : true;
    });

    setFilteredProducts(updatedProducts);
  }, [products, filters]);

  const sortProducts = (sortedProducts) => {
    setFilteredProducts(sortedProducts);
  };

  const renderProducts = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    const { selectedCategories, selectedColors } = filters;
    const filtersSelected =
      selectedCategories.length > 0 || selectedColors.length > 0;

    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const rowProducts = filteredProducts.slice(startIndex, endIndex);

    return (
      <div style={{ display: "flex" }}>
        {rowProducts.map((item) => (
          <div key={item.id} className="qview">
            <div className="imge">
              <Slider {...settings}>
                <div>
                  <img src={item.picture_one} alt="product" />
                </div>
                <div>
                  <img src={item.picture_two} alt="product" />
                </div>
                <div>
                  <img src={item.picture_three} alt="product" />
                </div>
              </Slider>
              <div className="info">
                <button className="btn-grid">Quick view</button>
              </div>
            </div>
            <div className="description">
              <Link to={`/productdetail/${item.id}`}>
                <p id="name">Name: {item.product_name}</p>
              </Link>
              <Link to={`/productdetail/${item.id}`}>
                <p id="price">Price: {item.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const prePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeCPage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    const maxPage = Math.ceil(filteredProducts.length / recordsPerPage);
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <Linebar onCategoryChange={setFilters} onSortChange={sortProducts} />
      <div className="quickviewpage">{renderProducts()}</div>
      <nav className="pagination" style={{ marginLeft: "40%" }}>
        <button className="page-link" onClick={prePage}>
          Prev
        </button>
        {[
          ...Array(Math.ceil(filteredProducts.length / recordsPerPage)).keys(),
        ].map((n, i) => (
          <button
            key={i}
            className={`page-link ${currentPage === n + 1 ? "active" : ""}`}
            onClick={() => changeCPage(n + 1)}
          >
            {n + 1}
          </button>
        ))}
        <button className="page-link" onClick={nextPage}>
          Next
        </button>
      </nav>
    </div>
  );
}

export default GridSearchView;
