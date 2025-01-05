import React from "react";
import Header from "../../Layout/Header";
import Footer_stw from "../../Layout/Footer_stw.js";
import "./Blog.css";

const BlogCategory = () => (
  <div className="blog__categories-and-search">
    <ul className="blog__categories">
      <li>
        <a href="#">All</a>
      </li>
      <li>
        <a href="#">Inspiration</a>
      </li>
      <li>
        <a href="#">Lookbook</a>
      </li>
      <li>
        <a href="#">Tips &amp; tricks</a>
      </li>
      <li>
        <a href="#">News</a>
      </li>
      <li>
        <a href="#">Others</a>
      </li>
    </ul>
  </div>
);

const BlogArticle = ({ link, imageSrc, date, author, title }) => (
  <div className="col-lg-4">
    <div className="blog-article">
      <div className="blog-article__image">
        <a href={link}>
          <img
            alt="Image"
            data-sizes="auto"
            data-srcset={imageSrc}
            src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
            className="lazyautosizes lazyloaded"
            sizes="365px"
            srcSet={imageSrc}
          />
        </a>
      </div>
      <ul className="blog-article__meta">
        <li>
          <a href="/blogs/blog">Blog</a>
        </li>
        <li>{date}</li>
        <li>By {author}</li>
      </ul>
      <h5 className="blog-article__title">
        <a href={link}>{title}</a>
      </h5>
    </div>
  </div>
);

const BlogList = () => (
  <div>
    <div className="p-2 header">
      <Header />
    </div>
    <div className="container container--type-4">
      <div>
        <BlogCategory />
        <div className="js-blog-row">
          <div className="blog__articles row">
            <BlogArticle
              link="/blogs/blog/jurgen-kloop-fashion-designer-leading-the-minimalist-trend"
              imageSrc="//durotan-fashion.myshopify.com/cdn/shop/articles/article_9_350x205_crop_center.jpg?v=1653829541 400w, //durotan-fashion.myshopify.com/cdn/shop/articles/article_9_700x410_crop_center.jpg?v=1653829541 800w"
              date="May 29, 2022"
              author="Artur"
              title="Jurgen Kloop - Fashion Designer leading the minimalist trend"
            />
            <BlogArticle
              link="/blogs/blog/for-long-day-activities"
              imageSrc="//durotan-fashion.myshopify.com/cdn/shop/articles/article_8_350x205_crop_center.jpg?v=1653829530 400w, //durotan-fashion.myshopify.com/cdn/shop/articles/article_8_700x410_crop_center.jpg?v=1653829530 800w"
              date="May 29, 2022"
              author="Artur"
              title="For long day activities"
            />
            <BlogArticle
              link="/blogs/blog/downtown"
              imageSrc="//durotan-fashion.myshopify.com/cdn/shop/articles/article_7_350x205_crop_center.jpg?v=1653829516 400w, //durotan-fashion.myshopify.com/cdn/shop/articles/article_7_700x410_crop_center.jpg?v=1653829516 800w"
              date="May 29, 2022"
              author="Artur"
              title="Downtown"
            />
            <BlogArticle
              link="/blogs/blog/hello-summer-discover-the-new-sunglasses-in-lookbook-82"
              imageSrc="//durotan-fashion.myshopify.com/cdn/shop/articles/article_3_350x205_crop_center.jpg?v=1653829460 400w, //durotan-fashion.myshopify.com/cdn/shop/articles/article_3_700x410_crop_center.jpg?v=1653829460 800w"
              date="May 29, 2022"
              author="Artur"
              title="Hello summer, discover the new sunglasses in lookbook #82"
            />
            <BlogArticle
              link="/blogs/blog/how-to-mixed-minimalist-fashion-style-with-basic-items"
              imageSrc="//durotan-fashion.myshopify.com/cdn/shop/articles/article_2_350x205_crop_center.jpg?v=1653829444 400w,//durotan-fashion.myshopify.com/cdn/shop/articles/article_2_700x410_crop_center.jpg?v=1653829444 800w"
              date="May 29, 2022"
              author="Artur"
              title="How to mixed minimalist fashion style with basic items"
            />
            <BlogArticle
              link="/blogs/blog/ready-for-the-winter-discover-the-new-collections-of-durotan"
              imageSrc="//durotan-fashion.myshopify.com/cdn/shop/articles/article_4_350x205_crop_center.jpg?v=1653829479 400w,//durotan-fashion.myshopify.com/cdn/shop/articles/article_4_700x410_crop_center.jpg?v=1653829479 800w"
              date="May 29, 2022"
              author="Artur"
              title="Ready for the winter! Discover the new collections of Durotan"
            />

            {/* Add more BlogArticle components for other articles */}
          </div>
        </div>
      </div>
    </div>
    <div className="p-2 footer">
      <Footer_stw />
    </div>
  </div>
);

export default BlogList;
