import styled from "styled-components";

export const CategoriesStyled = styled.div`
    position: absolute;
    top: 50px;
    left: 0;
    background: white;
    border: 1px solid #ddd;
    width: 250px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        padding: 10px 15px;
        position: relative;
        cursor: pointer;

        &:hover {
            background: #f5f5f5;
        }

        a {
            text-decoration: none;
            color: #333;
            font-weight: 500;
        }
    }
`;

export const SubCategoriesStyled = styled.div`
    position: absolute;
    top: 0;
    left: 100%;
    background: white;
    border: 1px solid #ddd;
    width: 220px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    display: block;

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    li {
        padding: 8px 12px;

        &:hover {
            background: #eaeaea;
        }

        a {
            text-decoration: none;
            color: #555;
        }
    }
`;
