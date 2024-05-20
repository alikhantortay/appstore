import { ReactComponent as UserIcon } from "../../../../icons/header/User.svg";

import { useEffect, useState } from "react";
import { MenuStyled } from "./Menu.styled";
import { UserModal } from "../Modal/UserModal/UserModal";

export const UserMenu = () => {
  const [isUserModalOpen, setIsUserModalOpen] =
    useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      !e.target.closest('[name="userMenu"]') &&
        setIsUserModalOpen(false);
    });

    return () => {
      document.removeEventListener("mousedown", (e) => {
        !e.target.closest('[name="userMenu"]') &&
          setIsUserModalOpen(false);
      });
    };
  });

  return (
    <MenuStyled $quantity={0}>
      <button
        name="userMenu"
        type="button"
        onClick={() =>
          setIsUserModalOpen((prevState) => !prevState)
        }>
        <UserIcon />
      </button>
      {isUserModalOpen && (
        <UserModal
          onClick={() => setIsUserModalOpen(false)}
        />
      )}
    </MenuStyled>
  );
};
