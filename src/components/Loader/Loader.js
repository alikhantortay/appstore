import { Rings } from "react-loader-spinner";

export const Loader = ({ color = "#fa8232" }) => {
  return (
    <Rings
      width="100%"
      height="80"
      color={color}
      ariaLabel="rings-loading'"
      wrapperStyle={{ padding: "20px" }}
      wrapperClassName=""
      visible={true}
    />
  );
};
