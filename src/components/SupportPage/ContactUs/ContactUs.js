import { ReactComponent as CallIcon } from "../../../icons/support/Call.svg";
import { ReactComponent as ChatIcon } from "../../../icons/support/Chat.svg";
import { ReactComponent as ArrowRightIcon } from "../../../icons/ArrowRight.svg";

import { TitleStyled } from "../../../styles/common";
import { Container } from "../../Container/Container";
import {
  ContactLinkWrapper,
  ContactLinksStyled,
  ContactSpanStyled,
  ContactUsStyled,
} from "./ContactUs.styled";

export const ContactUs = () => {
  return (
    <ContactUsStyled>
      <Container>
        <ContactSpanStyled>CONTACT US</ContactSpanStyled>
        <TitleStyled>
          Don’t find your answer.
          <br />
          Contact with us
        </TitleStyled>
        <ContactLinksStyled>
          <ContactLinkWrapper $call>
            <CallIcon />
            <div>
              <h3>Call us now</h3>
              <p>
                We are available online from 9:00 AM to 5:00
                PM.
                <br />
                Talk with us now
              </p>
              <span>+1-202-555-0126</span>
              <a href="tel:+12025550126">
                CALL NOW
                <ArrowRightIcon />
              </a>
            </div>
          </ContactLinkWrapper>
          <ContactLinkWrapper>
            <ChatIcon />
            <div>
              <h3>Chat with us</h3>
              <p>
                We are available online from 9:00 AM to 5:00
                PM.
                <br />
                Talk with us now
              </p>
              <span>Support@clicon.com</span>
              <a href="mailto:support@clicon.com">
                CONTACT US
                <ArrowRightIcon />
              </a>
            </div>
          </ContactLinkWrapper>
        </ContactLinksStyled>
      </Container>
    </ContactUsStyled>
  );
};
