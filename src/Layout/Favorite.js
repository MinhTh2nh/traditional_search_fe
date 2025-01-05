import React from 'react';
import "./Favorite.css";

function Favorite() {
  return (
    <div className="our-products minimal-our-products shoppable-our-products">
      <div className="container container--type-4">
        <div className="our-products__title-and-action d-flex">
          <h4 className="our-products__title font-family-jost">Favourite Products</h4>
          <div className="product-tabs__action">
            <a href="/collections/all">See all products</a>
          </div>
        </div>
        <div className="row">
          <div className="col-6 col-md-4 col-xl-3">
            <div className="product-grid-item product-grid-item--type-2 product-grid-item--type-5">
              <div className="product-grid-item__tag">Online exclusive</div>
              <div className="product-grid-item__images js-product-grid-images" data-current-image="0">
                <div className="product-grid-item__images-arrows">
                  <div className="product-grid-item__previous-image js-product-grid-previous-image">
                    <i className="lnil lnil-chevron-left"></i>
                  </div>
                  <div className="product-grid-item__next-image js-product-grid-next-image">
                    <i className="lnil lnil-chevron-right"></i>
                  </div>
                </div>
                <div className="product-grid-item__image js-product-grid-image active">
                  <a href="/collections/womens-clothing/products/legendary-whitetails-mens-shotgun-western-long-sleeve-shirt">
                    <img
                      alt="Image"
                      data-sizes="auto"
                      data-srcset="//durotan-fashion.myshopify.com/cdn/shop/products/26a_1200x.jpg?v=1654626096 400w, //durotan-fashion.myshopify.com/cdn/shop/products/26a_1200x.jpg?v=1654626096 800w"
                      src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw."
                      className="lazyautosizes ls-is-cached lazyloaded"
                      sizes="338px"
                      srcSet="//durotan-fashion.myshopify.com/cdn/shop/products/26a_1200x.jpg?v=1654626096 400w, //durotan-fashion.myshopify.com/cdn/shop/products/26a_1200x.jpg?v=1654626096 800w"
                    />
                  </a>
                </div>
                {/* Other product images */}
                {/* Quick shop */}
                <div className="product-grid-item__quick-shop">
                  <a
                    href="#"
                    className="open-tooltip js-quick-view"
                    data-product-url="/products/legendary-whitetails-mens-shotgun-western-long-sleeve-shirt"
                  >
                    Quick view
                  </a>
                </div>
              </div>
              <div className="product-grid-item__feature">Legendary</div>
              <div className="product-grid-item__name">
                <a href="/collections/womens-clothing/products/legendary-whitetails-mens-shotgun-western-long-sleeve-shirt">
                  Legendary Whitetails Men's Shotgun Western Long Sleeve Shirt
                </a>
              </div>
              <div className="product-grid-item__price">
                <span className="product-grid-item__price-new">$49.50</span>
                <span className="product-grid-item__price-old">$68.50</span>
              </div>
            </div>
          </div>
          {/* Repeat similar structure for other products */}
        </div>
      </div>
    </div>
  );
}

export default Favorite;