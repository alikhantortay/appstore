import { Container } from "../../Container/Container";
import { ReactComponent as PackageIcon } from "../../../icons/benefits/Package.svg";
import { ReactComponent as TrophyIcon } from "../../../icons/benefits/Trophy.svg";
import { ReactComponent as CreditCardIcon } from "../../../icons/benefits/CreditCard.svg";
import { ReactComponent as HeadphonesIcon } from "../../../icons/benefits/Headphones.svg";

import { BenefitsStyled } from "./Benefits.styled";

export const Benefits = () => {
  return (
    <BenefitsStyled>
      <Container>
        <ul>
          <li>
            <PackageIcon />
            <div>
              <h2>Fasted Delivery</h2>
              <p>Delivery in 24/H</p>
            </div>
          </li>
          <li>
            <CreditCardIcon />
            <div>
              <h2>Secure Payment</h2>
              <p>Your money is safe</p>
            </div>
          </li>
          <li>
            <HeadphonesIcon />
            <div>
              <h2>Support 24/7</h2>
              <p>Live contact/message</p>
            </div>
          </li>
        </ul>
      </Container>
    </BenefitsStyled>
  );
};
