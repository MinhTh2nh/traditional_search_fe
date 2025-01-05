import React from 'react';
import "./Features.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShirt } from '@fortawesome/free-solid-svg-icons';
import { faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
const AboutFeatures = () => {
  return (
    <div className="about-page__features shoppable-features">
      <div className="row">
        {/* Feature 1 */}
        <div className="col-lg-4">
          <div className="about-feature">
            <div className="about-feature__icon">
            <FontAwesomeIcon icon={faShirt} />
            </div>
            <div className="about-feature__text">
              <h3 className="about-feature__title">Quality materials</h3>
              <div className="about-feature__description">Guarantee 100% polyurethane and 100% polyester</div>
            </div>
          </div>
        </div>
        {/* End Feature 1 */}

        {/* Feature 2 */}
        <div className="col-lg-4">
          <div className="about-feature">
            <div className="about-feature__icon">
            <FontAwesomeIcon icon={faShippingFast} className="fas fa-shipping-fast" />
            </div>
            <div className="about-feature__text">
              <h3 className="about-feature__title">Free shipping</h3>
              <div className="about-feature__description">We offer free shipping for all orders over $199</div>
            </div>
          </div>
        </div>
        {/* End Feature 2 */}

        {/* Feature 3 */}
        <div className="col-lg-4">
          <div className="about-feature">
            <div className="about-feature__icon">
            <FontAwesomeIcon icon={faCreditCard} />
            </div>
            <div className="about-feature__text">
              <h3 className="about-feature__title">Secure payment</h3>
              <div className="about-feature__description">Guarantee 100% secure payment online on our website</div>
            </div>
          </div>
        </div>
        {/* End Feature 3 */}
      </div>
    </div>
  );
};

export default AboutFeatures;
