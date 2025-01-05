import React from "react";
import "./styles.css";
import { color } from "@chakra-ui/react";

function NewIn(){
    return (
            <div className="shoppable-new-in">
            <div className="NewIn-container">
                <div className="shoppable-title-and-action">
                    <h4 className ="shoppable-title">New In</h4>
                <div className="shoppable-new-in-action">
                    <a>All new items</a>
                </div>
                </div>
                <div className ="row">
                    <div className ="col-12 col-md-6 col-lg-3 meo">
                    <a href="/shop" className="shoppable-new-in__category">
                    <img alt="Image" data-sizes="auto" data-srcset="//durotan-fashion.myshopify.com/cdn/shop/files/new-in-1_2000x.jpg?v=1656931670 400w,
                //durotan-fashion.myshopify.com/cdn/shop/files/new-in-1_2000x.jpg?v=1656931670 800w" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" className="lazyautosizes lazyloaded hover-scale"  sizes="290px" srcset="//durotan-fashion.myshopify.com/cdn/shop/files/new-in-1_2000x.jpg?v=1656931670 400w,
                //durotan-fashion.myshopify.com/cdn/shop/files/new-in-1_2000x.jpg?v=1656931670 800w"/>
                <p>Clothings</p>
                </a>
                </div>
                <div className ="col-12 col-md-6 col-lg-3">
                    <a href="/shop" className="shoppable-new-in__category">
                    <img alt="Image" data-sizes="auto" data-srcset="//durotan-fashion.myshopify.com/cdn/shop/files/new-in-2_2000x.jpg?v=1656931684 400w,
                //durotan-fashion.myshopify.com/cdn/shop/files/new-in-2_2000x.jpg?v=1656931684 800w" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" className="lazyautosizes lazyloaded hover-scale" sizes="290px" srcset="//durotan-fashion.myshopify.com/cdn/shop/files/new-in-2_2000x.jpg?v=1656931684 400w,
                //durotan-fashion.myshopify.com/cdn/shop/files/new-in-2_2000x.jpg?v=1656931684 800w"/>
                <p>Shoes</p>
                </a>
                </div>
             <div className ="col-12 col-md-6 col-lg-3">
                    <a href="/shop" className="shoppable-new-in__category">
                    <img alt="Image" data-sizes="auto" data-srcset="//durotan-fashion.myshopify.com/cdn/shop/files/new-in-3_2000x.jpg?v=1656931699 400w,
                //durotan-fashion.myshopify.com/cdn/shop/files/new-in-3_2000x.jpg?v=1656931699 800w" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" className="lazyautosizes lazyloaded hover-scale" sizes="290px" srcset="//durotan-fashion.myshopify.com/cdn/shop/files/new-in-3_2000x.jpg?v=1656931699 400w,
                //durotan-fashion.myshopify.com/cdn/shop/files/new-in-3_2000x.jpg?v=1656931699 800w"/>
                <p>Bags</p>
                </a>
                </div>
                <div className ="col-12 col-md-6 col-lg-3">
                    <a href="/shop" className="shoppable-new-in__category">
                    <img alt="Image" data-sizes="auto" data-srcset="//durotan-fashion.myshopify.com/cdn/shop/files/new-in-4_2000x.jpg?v=1656931712 400w,
                //durotan-fashion.myshopify.com/cdn/shop/files/new-in-4_2000x.jpg?v=1656931712 800w" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" className="lazyautosizes lazyloaded hover-scale" sizes="290px" srcset="//durotan-fashion.myshopify.com/cdn/shop/files/new-in-4_2000x.jpg?v=1656931712 400w,
                //durotan-fashion.myshopify.com/cdn/shop/files/new-in-4_2000x.jpg?v=1656931712 800w"/>
                <p>Accessories</p>
                    </a>
                    </div>
                    </div>
                </div>
            </div>
    );
}
export default NewIn;