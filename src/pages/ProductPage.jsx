import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Navbar } from "../components";
import localData from "../products.json";
import Config from "./Config";
import Marquee from "react-fast-marquee";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const productData = localData.find((item) => item.id.toString() === id);
    setProduct(productData);
  }, [id]);

  const ShowProduct = () => {
    return (
      <div className="container my-5 py-2">
        <div className="row">
          <div className="col-md-6 col-sm-12 py-3">
            <img
              className="img-fluid"
              src={product.imgurl1}
              alt={product.title}
              width="400px"
              height="400px"
            />
          </div>
          <div className="col-md-6 col-sm-12 py-5">
            <h4 className="text-uppercase text-muted">{product.category}</h4>
            <h1 className="display-5">{product.title}</h1>
            <p className="lead">{product.description}</p>
            <h3 className="display-6 my-4">Starting from Rs. {product.cost}</h3>
            <button
              className="btn btn-outline-dark"
              onClick={() => addProduct(product)}
            >
              Add to Cart
            </button>
            <Link to="/cart" className="btn btn-dark mx-3">
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowAccessories = () => {
    const percentageThreshold = 0.05; // 5% threshold
    const priceThreshold = product.cost * percentageThreshold; // 5% of the viewing product's price
    const accessoriesSortedByPriceDifference = localData
      .filter(
        (item) =>
          item.id !== product.id &&
          item.type === "Accessories" &&
          item.category === product.category
      )
      .sort((a, b) => Math.abs(a.cost - priceThreshold) - Math.abs(b.cost - priceThreshold));

    const recommendedAccessories = accessoriesSortedByPriceDifference.slice(0, 6);

    // If there are not enough recommendations, populate with additional accessories
    if (recommendedAccessories.length < 6) {
      const remainingAccessories = accessoriesSortedByPriceDifference.slice(6 - recommendedAccessories.length);
      recommendedAccessories.push(...remainingAccessories);
    }

    return (
      <div className="py-4 my-4">
        <div className="d-flex">
          {recommendedAccessories.map((item) => {
            return (
              <div key={item.id} className="card mx-4 text-center">
                <img
                  className="card-img-top p-3"
                  src={item.imgurl1}
                  alt={item.title}
                  height={300}
                  width={300}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-description">{item.description}</p>
                  <h6 className="card-price">Rs. {item.cost}</h6>
                </div>
                <div className="card-body">
                  <Link to={`/product/${item.id}`} className="btn btn-dark m-1">
                    View More
                  </Link>
                  <button
                    className="btn btn-dark m-1"
                    onClick={() => addProduct(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const ShowSimilarProducts = () => {
    const recommendedProducts = localData
      .filter((item) => item.id !== product.id)
      .sort((a, b) => Math.abs(a.cost - product.cost) - Math.abs(b.cost - product.cost))
      .slice(0, 6); // Limit the number of recommendations

    return (
      <div className="py-4 my-4">
        <div className="d-flex">
          {recommendedProducts.map((item) => (
            <div key={item.id} className="card mx-4 text-center">
              <img
                className="card-img-top p-3"
                src={item.imgurl1}
                alt={item.title}
                height={300}
                width={300}
              />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-description">{item.description}</p>
                <h6 className="card-price">Rs. {item.cost}</h6>
              </div>
              <div className="card-body">
                <Link to={`/product/${item.id}`} className="btn btn-dark m-1">
                  View More
                </Link>
                <button
                  className="btn btn-dark m-1"
                  onClick={() => addProduct(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <ShowProduct />
          {product.type !== "Accessories" && <Config />}
          <h2>Buy It With</h2>
          <Marquee pauseOnHover={true} speed={100}>
            <ShowAccessories />
          </Marquee>
          <hr />
          <h2>Recommended Products</h2>
          <Marquee pauseOnHover={true} speed={60}>
            <ShowSimilarProducts />
          </Marquee>
        </div>
      </div>
    </>
  );
};

export default Product;

