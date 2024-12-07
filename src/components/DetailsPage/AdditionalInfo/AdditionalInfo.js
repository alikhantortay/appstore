import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { fetch } from "../../../API";

import { Loader } from "../../Loader/Loader";

import { ErrorMessageStyled } from "../../../styles/common";
import {
  AdditionalInfoStyled,
  AdditionalTagsStyled,
} from "./AdditionalInfo.styled";

const AdditionalInfo = () => {
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
    <AdditionalInfoStyled>
      {item && (
        <ul>
          <li>
            <p>Brand: </p>
            <Link to={`/shop?q=${item.brand || "AppStore"}`}>
              {item.brand || "AppStore"}
            </Link>
          </li>
          <li>
            <p>Category: </p>
            <Link to={`/shop/${item.category}`}>
              {item.category.replaceAll("-", " ")}
            </Link>
          </li>
          <li>
            <p>Tags: </p>
            <AdditionalTagsStyled>
              {item.tags.map((tag) => {
                return (
                  <li key={tag}>
                    <Link
                      to={`/shop?q=${tag.replaceAll(
                        " ",
                        "-",
                      )}`}>
                      {tag}
                    </Link>
                  </li>
                );
              })}
            </AdditionalTagsStyled>
          </li>
          <li>
            <p>Return Policy: </p>
            <span>{item.returnPolicy}</span>
          </li>
        </ul>
      )}
      {error && (
        <ErrorMessageStyled>
          {error.message}
        </ErrorMessageStyled>
      )}
      {loading && <Loader />}
    </AdditionalInfoStyled>
  );
};

export default AdditionalInfo;
