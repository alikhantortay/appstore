import { useParams } from "react-router-dom";

import { ReactComponent as TelegramIcon } from "../../../icons/socials/Telegram.svg";
import { ReactComponent as FacebookIcon } from "../../../icons/socials/FacebookWhite.svg";
import { ReactComponent as TwitterIcon } from "../../../icons/socials/Twitter.svg";
import { ReactComponent as PinIcon } from "../../../icons/socials/Pinterest.svg";

import { ShareBtnsStyled } from "./ShareBtns.styled";

export const ShareBtns = () => {
  const params = useParams();

  const title =
    params.title.charAt(0).toUpperCase() +
    params.title.slice(1).replaceAll("-", " ");

  return (
    <ShareBtnsStyled>
      <p>Share product:</p>
      <ul>
        <li>
          <a
            href={`https://t.me/share/url?url=${window.location.href}&text=${title}`}
            target="_blank"
            rel="noreferrer">
            <TelegramIcon />
          </a>
        </li>
        <li>
          <a
            href={`http://www.facebook.com/sharer.php?u=${window.location.href}&p=${title}`}
            target="_blank"
            rel="noreferrer">
            <FacebookIcon />
          </a>
        </li>
        <li>
          <a
            href={`http://twitter.com/share?text=${title}&url=${window.location.href}`}
            target="_blank"
            rel="noreferrer">
            <TwitterIcon />
          </a>
        </li>
        <li>
          <a
            href={`http://pinterest.com/pin/create/button/?url=${window.location.href}&description=${title}`}
            target="_blank"
            rel="noreferrer">
            <PinIcon />
          </a>
        </li>
      </ul>
    </ShareBtnsStyled>
  );
};
