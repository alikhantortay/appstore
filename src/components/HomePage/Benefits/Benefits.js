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
              <h3>Быстрая доставка</h3>
              <p>Доставка круглосуточно</p>
            </div>
          </li>
          <li>
            <CreditCardIcon />
            <div>
              <h3>Безопасная оплата</h3>
              <p>Ваши деньги в безопасности</p>
            </div>
          </li>
          <li>
            <HeadphonesIcon />
            <div>
              <h3>Поддержка 24/7</h3>
              <p>Живой контакт/сообщение</p>
            </div>
          </li>
        </ul>
      </Container>
    </BenefitsStyled>
  );
};
