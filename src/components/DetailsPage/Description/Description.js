{/*import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetch } from "../../../API";

import { Loader } from "../../Loader/Loader";
import { ReactComponent as MedalIcon } from "../../../icons/descriptionFeatures/Medal.svg";
import { ReactComponent as HandshakeIcon } from "../../../icons/descriptionFeatures/Handshake.svg";
import { ReactComponent as HeadphonesIcon } from "../../../icons/descriptionFeatures/Headphones.svg";
import { ReactComponent as CreditCardIcon } from "../../../icons/descriptionFeatures/CreditCard.svg";

import { ErrorMessageStyled } from "../../../styles/common";
import {
  DescriptionFeaturesStyled,
  DescriptionShippingInfoStyled,
  DescriptionStyled,
  DescriptionTextStyled,
} from "./Description.styled";

const Description = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getItem = async () => {
      try {
        setLoading(true);
        const responce = await fetch(`catalogs/${catalogId}/products/${id}`);
        setItem(responce.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getItem();
  }, [id]);

  return (
    <DescriptionStyled>
      {item && (
        <>
          <DescriptionTextStyled>
            <h2>Description</h2>
            <p>{item.description}</p>
          </DescriptionTextStyled>

          <DescriptionFeaturesStyled>
            <h2>Features</h2>
            <ul>
              <li>
                <MedalIcon />
                <p>{item.warrantyInformation}</p>
              </li>
              <li>
                <HandshakeIcon />
                <p>100% Money-back guarantee</p>
              </li>
              <li>
                <HeadphonesIcon />
                <p>24/7 Customer support</p>
              </li>
              <li>
                <CreditCardIcon />
                <p>Secure payment method</p>
              </li>
            </ul>
          </DescriptionFeaturesStyled>
        </>
      )}

      <DescriptionShippingInfoStyled>
        <h2>Shipping Information</h2>
        <ul>
          <li>
            <p>
              <span>Courier: </span>2 - 4 days, free
              shipping
            </p>
          </li>
          <li>
            <p>
              <span>Local Shipping: </span>up to one week,
              $19.00
            </p>
          </li>
          <li>
            <p>
              <span>UPS Ground Shipping: </span>4 - 6 days,
              $29.00
            </p>
          </li>
          <li>
            <p>
              <span>Unishop Global Export: </span>3 - 4
              days, $39.00
            </p>
          </li>
        </ul>
      </DescriptionShippingInfoStyled>

      {error && (
        <ErrorMessageStyled>
          {error.message}
        </ErrorMessageStyled>
      )}
      {loading && <Loader />}
    </DescriptionStyled>
  );
};

export default Description;
*/}