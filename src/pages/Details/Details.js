import { useLocation } from "react-router-dom";

const Details = () => {
  const id = useLocation().state;
  console.log(id);
  return <div>Details</div>;
};

export default Details;
