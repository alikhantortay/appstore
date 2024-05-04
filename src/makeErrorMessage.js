import { Notify } from "notiflix/build/notiflix-notify-aio";

export const makeErrorMessage = (code) => {
  switch (code) {
    case "auth/invalid-display-name":
      return Notify.failure("Invalid name.");
    case "auth/email-already-in-use":
      return Notify.failure("Email already in use.");
    case "auth/email-already-exists":
      return Notify.failure("Email already exists.");
    case "auth/invalid-email":
      return Notify.failure("Invalid email.");
    case "auth/not-verified":
      return Notify.failure("Email not verified");
    case "auth/weak-password":
      return Notify.failure(
        "Password should be at least 6 characters.",
      );
    case "auth/invalid-password":
      return Notify.failure("Invalid password");
    case "auth/invalid-credential":
      return Notify.failure(
        "Email or password is incorrect.",
      );
    case "auth/user-not-found":
      return Notify.failure("User not found");

    default:
      return Notify.failure(
        "Something went wrong. Try again",
      );
  }
};
