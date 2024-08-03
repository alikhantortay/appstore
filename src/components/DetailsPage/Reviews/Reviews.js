import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetch } from "../../../API";

import { Loader } from "../../Loader/Loader";
import { ReactComponent as UserIcon } from "../../../icons/header/User.svg";

import { ErrorMessageStyled } from "../../../styles/common";
import { ReviewsStyled } from "./Reviews.styled";
import { Stars } from "../../Stars/Stars";

const Reviews = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getItem = async () => {
      try {
        setLoading(true);
        const responce = await fetch(`/${id}`);
        setReviews(responce.data.reviews);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getItem();
  }, [id]);

  return (
    <ReviewsStyled>
      {reviews.length > 0 && (
        <ul>
          {reviews.map(
            ({
              reviewerName,
              reviewerEmail,
              rating,
              comment,
            }) => {
              return (
                <li key={reviewerName}>
                  <a href={`mailto:${reviewerEmail}`}>
                    <UserIcon />
                    {reviewerName}
                  </a>
                  <Stars rating={rating} />
                  <p>{comment}</p>
                </li>
              );
            },
          )}
        </ul>
      )}

      {error && (
        <ErrorMessageStyled>
          {error.message}
        </ErrorMessageStyled>
      )}
      {loading && <Loader />}
    </ReviewsStyled>
  );
};

export default Reviews;
