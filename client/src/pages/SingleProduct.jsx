// SingleProduct.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getproducts"
        );
        const foundProduct = response.data.find(
          (product) => product._id === productId
        );
        setProduct(foundProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  return (
    <div>
      {product ? (
        <div style={{ margin: "20" }}>
          <h2>{product.title}</h2>
          <img src={product.image} alt={product.title} />
          <p>{product.company}</p>
          <b style={{ fontStyle: "bold" }}>Price: ${product.price}</b>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SingleProduct;
