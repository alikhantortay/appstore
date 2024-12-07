import { ReactComponent as TruckIcon } from "../../../icons/support/Truck.svg";
import { ReactComponent as LockOpenIcon } from "../../../icons/support/LockOpen.svg";
import { ReactComponent as CreditCardIcon } from "../../../icons/support/CreditCard.svg";
import { ReactComponent as UserIcon } from "../../../icons/support/User.svg";
import { ReactComponent as StackIcon } from "../../../icons/support/Stack.svg";
import { ReactComponent as NotepadIcon } from "../../../icons/support/Notepad.svg";
import { ReactComponent as StorefrontIcon } from "../../../icons/support/Storefront.svg";

export const topics = [
  {
    svg: <TruckIcon />,
    title: "Track Order",
  },
  { svg: <LockOpenIcon />, title: "Reset Password" },
  { svg: <CreditCardIcon />, title: "Paymant Option" },
  { svg: <UserIcon />, title: "User & Account" },
  { svg: <StackIcon />, title: "Wishlist & Compare" },
  { svg: <NotepadIcon />, title: "Shipping & Billing" },
  {
    svg: <CreditCardIcon />,
    title: "Shoping Cart & Wallet",
  },
  { svg: <StorefrontIcon />, title: "Sell on AppStore" },
];
