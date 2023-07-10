import React, { useEffect } from "react";
import "./Card.scss";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  
  return (
    <Link className="link" to={`/products/${item._id}`}>
      <div className="card" key={item._id}>
        <div className="image">
          {/* {item?.attributes.isNew && <span>New Season</span>} */}
          <img
            src={
              item?.img[0]
            }
            alt=""
            className="mainImg"
          />
          <img
            src={
              item?.img[1]
            }
            alt=""
            className="secondImg"
          />
        </div>
        <h2>{item?.name.toString()}</h2>
        <div className="prices">
          <h3>${item.promotion && item.price}</h3>
          <h3>${item.price * (1 - item.promotion)}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;