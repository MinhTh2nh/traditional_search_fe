// ShopPage.js
import React, { useState } from "react";
import Linebar from "./linebar";
import GridView from "./gridView";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import Title from "./title";
import "bootstrap/dist/css/bootstrap.min.css";
import Stack from "react-bootstrap/Stack";

function ShopPage() {
  const [filters, setFilters] = useState({
    selectedCategories: [],
    selectedColors: [],
  });
  const [sortType, setSortType] = useState("product_name");

  return (
    <Stack gap={5} className="stack">
      <div className="p-2 header">
        <Header />
      </div>
      <div className="p-2 Title">
        <Title />
      </div>
      <div className="p-2 GridView">
        <GridView setFilters={setFilters} sortType={sortType} />
      </div>
      <div className="p-2 footer d-flex align-items-center justify-content-center">
        <Footer />
      </div>
    </Stack>
  );
}

export default ShopPage;
