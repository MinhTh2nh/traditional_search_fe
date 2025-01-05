import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import "./About.css";

function About() {
    return (
        <div>
<div className = "p-2 header">
    <Header/>
</div>
<div className="container container--type-4">
      <h1 className="about-page__title">Durian's Story</h1>
      <div className="about-page__description">
        Established in 1991, Durotan & Logan Cee, 2 fashion artists work together in the UK. The inspiration is drawn from nature, pastel colors, and daily activities. Durotan’s items always possess a basic yet timeless look, easily complementing any style.
      </div>
      <div className="about-page__image">
        <img
          alt="Image"
          data-sizes="auto"
          data-srcset="//durotan-fashion.myshopify.com/cdn/shop/files/about_us_3000x.jpg?v=1653052880 1560w,//durotan-fashion.myshopify.com/cdn/shop/files/about_us_3000x.jpg?v=1653052880 3120w"
          src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
          className="lazyautosizes lazyloaded"
          sizes="925px"
          srcSet="//durotan-fashion.myshopify.com/cdn/shop/files/about_us_3000x.jpg?v=1653052880 1560w,//durotan-fashion.myshopify.com/cdn/shop/files/about_us_3000x.jpg?v=1653052880 3120w"
        />
      </div>
      <div className="about-page__features">
        <div className="row">
          <div className="col-lg-4">
            <div className="about-feature">
              <div className="about-feature__icon">
             
              </div>
              <div className="about-feature__text">
                <h3 className="about-feature__title">Quality materials</h3>
                <div className="about-feature__description">
                  Guarantee 100% polyurethane and 100% polyester
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="about-feature">
              <div className="about-feature__icon">
                <i className="lnil lnil-ship"></i>
              </div>
              <div className="about-feature__text">
                <h3 className="about-feature__title">Free shipping</h3>
                <div className="about-feature__description">
                  We offer free shipping for all orders over $199
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="about-feature">
              <div className="about-feature__icon">
                <i className="lnil lnil-money-protection"></i>
              </div>
              <div className="about-feature__text">
                <h3 className="about-feature__title">Secure payment</h3>
                <div className="about-feature__description">
                  Guarantee 100% secure payment online on our website
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="about-page">
      {/* About company */}
      <div className="about-company">
        {/* Container */}
        <div className="container container--type-4">
          {/* Row */}
          <div className="row">
            {/* Company */}
            <div className="col-lg-6 about-company__item">
              {/* Image */}
              <div className="about-company__image">
                <img
                  alt="Image"
                  data-sizes="auto"
                  data-srcset="//durotan-fashion.myshopify.com/cdn/shop/files/about_company_2000x.jpg?v=1653059807 735w,
                    //durotan-fashion.myshopify.com/cdn/shop/files/about_company_2000x.jpg?v=1653059807 1470w"
                  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                  className="lazyautosizes ls-is-cached lazyloaded"
                  sizes="925px"
                  srcSet="//durotan-fashion.myshopify.com/cdn/shop/files/about_company_2000x.jpg?v=1653059807 735w,
                    //durotan-fashion.myshopify.com/cdn/shop/files/about_company_2000x.jpg?v=1653059807 1470w"
                />
              </div>
              {/* End image */}
              {/* Title */}
              <h2 className="about-company__title">The company</h2>
              {/* End title */}
              {/* Description */}
              <div className="about-company__description">
                <p>
                  <span>
                    With a strong sense of community and a moral responsibility, our brand was born. Our passion for the environment and unique design brought our vision, and products, to life.
                  </span>
                </p>
                <p>
                  Each product is infused with the elements of aroma, memory, place and beauty traditions from across the globe. These “artifacts” carry with them stories and maps of their discoveries. Always striving to inspire and to be inspired.
                </p>
                <p>
                  <strong>EST. 1991</strong>
                </p>
              </div>
              {/* End description */}
            </div>
            {/* End company */}

            {/* Company */}
            <div className="col-lg-6 about-company__item">
              {/* Image */}
              <div className="about-company__image">
                <img
                  alt="Image"
                  data-sizes="auto"
                  data-srcset="//durotan-fashion.myshopify.com/cdn/shop/files/about_leader_2000x.jpg?v=1653059843 735w,
                    //durotan-fashion.myshopify.com/cdn/shop/files/about_leader_2000x.jpg?v=1653059843 1470w"
                  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                  className="lazyautosizes ls-is-cached lazyloaded"
                  sizes="925px"
                  srcSet="//durotan-fashion.myshopify.com/cdn/shop/files/about_leader_2000x.jpg?v=1653059843 735w,
                    //durotan-fashion.myshopify.com/cdn/shop/files/about_leader_2000x.jpg?v=1653059843 1470w"
                />
              </div>
              {/* End image */}
              {/* Title */}
              <h2 className="about-company__title">The leader</h2>
              {/* End title */}
              {/* Description */}
              <div className="about-company__description">
                <p>
                  What that starts with, then, is a design which meets the needs not only of today and tomorrow, but the tomorrow after tomorrow, too, and of any number of tomorrows after that. It is a design which has designs to be, above all, pleasing to wear and satisfying to use, and, all the while, to go about its business in a way best described as unassuming.
                </p>
                <p>
                  Absolutely no hassle. No matter what you spill on it - coffee, oil, cranberry juice, nail polish, you can easily wipe it clean with just soap and water.
                </p>
                <p>
                  From Durian with Love,
                </p>
                <p>
                  <strong>LOGAN CEE</strong>
                </p>
              </div>
              {/* End description */}
            </div>
            {/* End company */}
          </div>
          {/* End row */}
        </div>
        {/* End container */}
      </div>
      {/* End about company */}
    </div>
    <div className="about-page">
      <div className="about-section wrap-brands-list">
        <div className="container container--type-4">
          <hr />
          <h3 className="about-section__title">Our partners</h3>
          <div className="home-brands__items">
            <div className="home-brand-item">
              <a href="#">
                <img
                  alt="Image"
                  src="//durotan-fashion.myshopify.com/cdn/shop/files/brand_1_2000x.png?v=1652950424"
                  className=" ls-is-cached lazyloaded"
                />
              </a>
            </div>
            <div className="home-brand-item">
              <a href="#">
                <img
                  alt="Image"
                  src="//durotan-fashion.myshopify.com/cdn/shop/files/brand_2_2000x.png?v=1652950434"
                  className=" ls-is-cached lazyloaded"
                />
              </a>
            </div>
            <div className="home-brand-item">
              <a href="#">
                <img
                  alt="Image"
                  src="//durotan-fashion.myshopify.com/cdn/shop/files/brand_3_2000x.png?v=1652950444"
                  className=" ls-is-cached lazyloaded"
                />
              </a>
            </div>
            <div className="home-brand-item">
              <a href="#">
                <img
                  alt="Image"
                  src="//durotan-fashion.myshopify.com/cdn/shop/files/brand_4_2000x.png?v=1652950454"
                  className=" ls-is-cached lazyloaded"
                />
              </a>
            </div>
            <div className="home-brand-item">
              <a href="#">
                <img
                  alt="Image"
                  src="//durotan-fashion.myshopify.com/cdn/shop/files/brand_5_2000x.png?v=1652950465"
                  className=" ls-is-cached lazyloaded"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
<div className = "p-2 footer">
    <Footer/>
</div>
</div>
    );
}

export default About;