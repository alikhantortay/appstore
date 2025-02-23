import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { usePrice } from "../../../../hooks/usePrice";

import {
    HotPriceStyled,
    HotStyled,
    HotWarningsStyled,
} from "./Hot.styled";

export const Hot = ({ hot }) => {
    const { countPrice, countSalePrice } = usePrice();

    if (!hot) return null; // Если hot не определён, ничего не рендерим

    const {
        id,
        imageUrls = [],
        name = "No Title",
        categoryName = "uncategorized",
        price = 0,
        discountPercentage = 0,
        description = "",
    } = hot;

    const imageUrl = imageUrls.length > 0
        ? `https://appstore.up.railway.app/shop-service/api/public/images/${encodeURIComponent(imageUrls[0])}`
        : "/placeholder.png";

    return (
        <HotStyled>
            <HotWarningsStyled>
                <span>{`${Math.round(discountPercentage)}% OFF`}</span>
                <span>HOT</span>
            </HotWarningsStyled>
            <Link to={`/shop/${categoryName.toLowerCase().replaceAll(" ", "-")}?id=${id}`}>
                <img
                    src={imageUrl}
                    alt={name}
                    width={280}
                    height={280}
                    loading="lazy"
                />
            </Link>
            <Link to={`/shop/${categoryName.toLowerCase().replaceAll(" ", "-")}?id=${id}`}>
                {name}
            </Link>
            <HotPriceStyled>
                <span>{countPrice(price)}</span>
                <span>{countSalePrice(price, discountPercentage)}</span>
            </HotPriceStyled>
            <p>{description ? description.slice(0, 150) + "..." : "Описание отсутствует."}</p>
        </HotStyled>
    );
};

Hot.propTypes = {
    hot: PropTypes.shape({
        id: PropTypes.number.isRequired,
        imageUrls: PropTypes.array,
        name: PropTypes.string,
        categoryName: PropTypes.string,
        price: PropTypes.number,
        discountPercentage: PropTypes.number,
        description: PropTypes.string,
    }),
};
