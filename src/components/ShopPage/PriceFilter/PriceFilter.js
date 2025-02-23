import PropTypes from "prop-types";

export const PriceFilter = ({ selectedPriceRange, onPriceSelect }) => {
    const priceRanges = ["До $20", "$25 - $100", "$100 - $300", "$300 - $500", "$500 - $1000", "1000+ долларов"];

    return (
        <div>
            <h2>Диапазон цен</h2>
            <ul>
                {priceRanges.map((range) => (
                    <li key={range}>
                        <input type="radio" checked={selectedPriceRange === range} onChange={() => onPriceSelect(range)} />
                        {range}
                    </li>
                ))}
            </ul>
        </div>
    );
};

PriceFilter.propTypes = {
    selectedPriceRange: PropTypes.string,
    onPriceSelect: PropTypes.func.isRequired,
};
