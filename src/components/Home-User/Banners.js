import React from "react";
import "./Banners.css";
import { Link } from "react-router-dom";
const Banners = () => {
  return (
    <div className="shoppable-banners ">
      <div className="container container--type-4">
        <div className="row" id="banner-row">
          {/* Featured product 1 */}
          <div className="col-lg-6">
            <div className="featured-product">
              {/* Image */}
              <div className="featured-product__image">
                <img
                  alt="Image"
                  src="//durotan-fashion.myshopify.com/cdn/shop/files/banner-01_8ea7bbfb-6c6f-4272-950d-dc67ddc83495_3000x.jpg?v=1656932619"
                  className="ls-is-cached lazyloaded"
                />
              </div>
              {/* End Image */}
              {/* Content */}
              <div className="featured-product__content">
                {/* Category */}
                <div className="featured-product__category">
                  limited edition
                </div>
                {/* End Category */}
                {/* Product name */}
                <h3 className="featured-product__product-name font-family-jost">
                  Essential <br /> Items
                </h3>
                {/* End product name */}
                {/* Product description */}
                <div className="featured-product__product-description">
                  Simple always is the best choice for your any style. Check our
                  lookbook
                </div>
                {/* End product description */}
                {/* Button */}
                <div className="featured-product__button">
                  <Link to="/Shop">
                    {" "}
                    <a href>Shop now</a>
                  </Link>
                </div>
                {/* End button */}
              </div>
              {/* End content */}
            </div>
          </div>
          {/* End featured product 1 */}
          {/* Featured product 2 */}
          <div className="col-lg-6">
            <div className="featured-product">
              {/* Image */}
              <div className="featured-product__image">
                <img
                  alt="Image"
                  src="//durotan-fashion.myshopify.com/cdn/shop/files/banner-02_e0644982-7488-46c5-b061-1b708f2c115f_3000x.jpg?v=1656932661"
                  className="ls-is-cached lazyloaded"
                />
              </div>
              {/* End Image */}
              {/* Content */}
              <div className="featured-product__content">
                {/* Product name */}
                <h3 className="featured-product__product-name font-family-jost">
                  <span>30%</span>
                  <br />
                  Discount
                </h3>
                {/* End product name */}
                {/* Product description */}
                <div className="featured-product__product-description">
                  Simple always is the best choice for your any style. Check our
                  lookbook
                </div>
                {/* End product description */}
                {/* Button */}
                <div className="featured-product__button">
                  <Link to="/Shop">
                    {" "}
                    <a href>Shop now</a>
                  </Link>
                </div>
                {/* End button */}
              </div>
              {/* End content */}
            </div>
          </div>
          {/* End featured product 2 */}
        </div>
        {/* End row */}
      </div>
    </div>
  );
};

export default Banners;
