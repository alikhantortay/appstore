import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetch } from "../../../API";

import { Loader } from "../../Loader/Loader";

import { ErrorMessageStyled } from "../../../styles/common";
import { SpecsStyled } from "./Specs.styled";

const Specs = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getItem = async () => {
      try {
        setLoading(true);
        const responce = await fetch(`/${id}`);
        setItem(responce.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getItem();
  }, [id]);

  return (
    <SpecsStyled>
      {item && (
        <ul>
          <li>
            <p>
              <span>Weight: </span>
              {`${Math.round(item.weight * 453.6)} g (${(
                item.weight * 16
              ).toFixed(2)} oz)`}
            </p>
          </li>
          <li>
            <p>
              <span>Width: </span>
              {`${item.dimensions.width} inches, ${(
                item.dimensions.width * 2.54
              ).toFixed(2)} cm`}
            </p>
          </li>
          <li>
            <p>
              <span>Height: </span>
              {`${item.dimensions.height} inches, ${(
                item.dimensions.height * 2.54
              ).toFixed(2)} cm`}
            </p>
          </li>
          <li>
            <p>
              <span>Depth: </span>
              {`${item.dimensions.depth} inches, ${(
                item.dimensions.depth * 2.54
              ).toFixed(2)} cm`}
            </p>
          </li>
        </ul>
      )}

      {error && (
        <ErrorMessageStyled>
          {error.message}
        </ErrorMessageStyled>
      )}
      {loading && <Loader />}
    </SpecsStyled>
  );
};

export default Specs;
