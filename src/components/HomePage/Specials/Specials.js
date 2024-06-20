import { useEffect, useState } from "react";
import { Container } from "../../Container/Container";
import {
  SpecialsPhoneStyled,
  SpecialsPodStyled,
  SpecialsStyled,
  SpecialsPodTextStyled,
  SpecialPhoneTextStyled,
  SpecialsPhonePriceStyled,
} from "./Specials.styled";
import { fetch } from "../../../API";
import {
  ShopLinkStyled,
  TitleStyled,
} from "../../../styles/common";
import { ReactComponent as ArrowRightIcon } from "../../../icons/ArrowRight.svg";
import { usePrice } from "../../../hooks/usePrice";

export const Specials = () => {
  const { countSalePrice } = usePrice();
  const [pod, setPods] = useState(null);
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const pod = await fetch("products/103");
        setPods(pod.data);
        const phone = await fetch("products/134");
        setPhone(phone.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <SpecialsStyled>
      <Container>
        {pod && (
          <SpecialsPodStyled>
            <SpecialsPodTextStyled>
              <span>INTRODUCING</span>
              <TitleStyled $left>{pod.title}</TitleStyled>
              <p>{pod.description.slice(0, 65) + "..."}</p>
              <ShopLinkStyled
                to={`shop/${pod.category}/${pod.title
                  .toLowerCase()
                  .replaceAll(" ", "-")}`}
                state={pod.id}>
                SHOP NOW
                <ArrowRightIcon />
              </ShopLinkStyled>
            </SpecialsPodTextStyled>
            <img
              src={pod.thumbnail}
              alt={pod.title}
              width={240}
              height={240}
            />
          </SpecialsPodStyled>
        )}
        {phone && (
          <SpecialsPhoneStyled>
            <SpecialPhoneTextStyled>
              <span>INTRODUCING NEW</span>
              <TitleStyled $left>{phone.title}</TitleStyled>
              <p>
                {phone.description.slice(0, 70) + "..."}
              </p>
              <ShopLinkStyled
                to={`shop/${phone.category}/${phone.title
                  .toLowerCase()
                  .replaceAll(" ", "-")}`}
                state={phone.id}>
                SHOP NOW
                <ArrowRightIcon />
              </ShopLinkStyled>
            </SpecialPhoneTextStyled>
            <img
              src={phone.thumbnail}
              alt={phone.title}
              width={312}
              height={312}
            />
            <SpecialsPhonePriceStyled>
              {countSalePrice(
                phone.price,
                phone.discountPercentage,
              )}
            </SpecialsPhonePriceStyled>
          </SpecialsPhoneStyled>
        )}
      </Container>
    </SpecialsStyled>
  );
};
