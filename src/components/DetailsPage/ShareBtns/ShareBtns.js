import { useParams } from "react-router-dom";

import { ReactComponent as TelegramIcon } from "../../../icons/socials/Telegram.svg";
import { ReactComponent as FacebookIcon } from "../../../icons/socials/FacebookWhite.svg";
import { ReactComponent as TwitterIcon } from "../../../icons/socials/Twitter.svg";
import { ReactComponent as PinIcon } from "../../../icons/socials/Pinterest.svg";

import { ShareBtnsStyled } from "./ShareBtns.styled";

export const ShareBtns = () => {
  const params = useParams();

  // Проверяем, есть ли title в params
  let title = params.title ? params.title.replaceAll("-", " ") : "";

  // Если title определен, делаем первую букву заглавной
  if (title.length > 0) {
    title = title.charAt(0).toUpperCase() + title.slice(1);
  } else {
    // Если title отсутствует, используем заголовок страницы или запасное значение
    title = document.title || "Product";
  }

  return (
      <ShareBtnsStyled>
        <p>Share product:</p>
        <ul>
          <li>
            <a
                href={`https://t.me/share/url?url=${window.location.href}&text=${title}`}
                aria-label="Share product via Telegram"
                target="_blank"
                rel="noreferrer"
            >
              <TelegramIcon />
            </a>
          </li>
          <li>
            <a
                href={`http://www.facebook.com/sharer.php?u=${window.location.href}&p=${title}`}
                aria-label="Share product via Facebook"
                target="_blank"
                rel="noreferrer"
            >
              <FacebookIcon />
            </a>
          </li>
          <li>
            <a
                href={`http://twitter.com/share?text=${title}&url=${window.location.href}`}
                aria-label="Share product via Twitter"
                target="_blank"
                rel="noreferrer"
            >
              <TwitterIcon />
            </a>
          </li>
          <li>
            <a
                href={`http://pinterest.com/pin/create/button/?url=${window.location.href}&description=${title}`}
                aria-label="Share product via Pinterest"
                target="_blank"
                rel="noreferrer"
            >
              <PinIcon />
            </a>
          </li>
        </ul>
      </ShareBtnsStyled>
  );
};
