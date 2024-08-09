import { ReactComponent as GoogleIcon } from "../../../icons/companies/Google.svg";
import { ReactComponent as AmazonIcon } from "../../../icons/companies/Amazon.svg";
import { ReactComponent as PhilipsIcon } from "../../../icons/companies/Philips.svg";
import { ReactComponent as ToshibaIcon } from "../../../icons/companies/Toshiba.svg";
import { ReactComponent as SamsungIcon } from "../../../icons/companies/Samsung.svg";

export const companies = [
  {
    href: "/shop?q=google",
    svg: <GoogleIcon />,
    label: "Shop Google products",
  },
  {
    href: "/shop?q=amazon",
    svg: <AmazonIcon />,
    label: "Shop Amazon products",
  },
  {
    href: "/shop?q=philips",
    svg: <PhilipsIcon />,
    label: "Shop Philips products",
  },
  {
    href: "/shop?q=toshiba",
    svg: <ToshibaIcon />,
    label: "Shop Toshiba products",
  },
  {
    href: "/shop?q=samsung",
    svg: <SamsungIcon />,
    label: "Shop Samsung products",
  },
];
