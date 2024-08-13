import { ReactComponent as Google } from "../../../icons/companies/google.svg";
import { ReactComponent as Amazon } from "../../../icons/companies/amazon.svg";
import { ReactComponent as Philips } from "../../../icons/companies/philips.svg";
import { ReactComponent as Toshiba } from "../../../icons/companies/toshiba.svg";
import { ReactComponent as Samsung } from "../../../icons/companies/samsung.svg";

export const companies = [
  {
    href: "/shop?q=google",
    svg: <Google />,
    label: "Shop Google products",
  },
  {
    href: "/shop?q=amazon",
    svg: <Amazon />,
    label: "Shop Amazon products",
  },
  {
    href: "/shop?q=philips",
    svg: <Philips />,
    label: "Shop Philips products",
  },
  {
    href: "/shop?q=toshiba",
    svg: <Toshiba />,
    label: "Shop Toshiba products",
  },
  {
    href: "/shop?q=samsung",
    svg: <Samsung />,
    label: "Shop Samsung products",
  },
];
