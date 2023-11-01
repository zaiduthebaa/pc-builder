import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
import { Link } from 'react-router-dom';
const productData = require('../products.json');

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const dispatch = useDispatch();

  const addProductToCart = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const fetchData = async () => {
      setData(productData);
      setFilter(productData);
    };

    fetchData();

    return () => {
    };
  }, []);

  useEffect(() => {
    // Filter products based on category and type
    const filteredData = data.filter((product) => {
      const categoryMatch = categoryFilter === 'All' || product.category === categoryFilter;
      const typeMatch = typeFilter === 'All' || product.type === typeFilter;
      return categoryMatch && typeMatch;
    });

    setFilter(filteredData);
  }, [data, categoryFilter, typeFilter]);

  const categoryOptions = ['All', 'Gaming', 'Business'];
  const typeOptions = ['All', 'PC', 'Laptop', 'Accessories'];

  const ShowProducts = () => {
    return (
      <>
        <div className="filter-section py-3">
          <div className="dropdown-container">
            <label style={{ fontSize: '1.2em' }}>Category:</label>
            <select
              className="form-select m-2"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="dropdown-container">
            <label style={{ fontSize: '1.2em' }}>Type:</label>
            <select
              className="form-select m-2"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              {typeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filter.map((product) => (
          <div key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
            <div className="card text-center h-100">
              <img
                className="card-img-top p-3"
                src={product.imgurl1}
                alt="Card"
                height={300}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {product.title}
                </h5>
                <p className="card-text">
                  {product.description}
                </p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item lead">Starting from Rs. {product.price}</li>
              </ul>
              <div className="card-body">
                <Link to={`/product/${product.id}`} className="btn btn-dark m-1">
                  View More
                </Link>
                <button className="btn btn-dark m-1" onClick={() => addProductToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="container my-3 py-3">
      <div className="row">
        <div className="col-12">
          <h2 className="display-5 text-center">Our Products</h2>
          <hr />
        </div>
      </div>
      <div className="row justify-content-center">
        <ShowProducts />
      </div>
    </div>
  );
};

export default Products;

