import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Carousel, Card, Button, Image } from "react-bootstrap";
import "./Home.css";
import { Store } from "../ContextApi/context";
import axios from "axios";

const Home = () => {
  const { cart, setCart, token } = useContext(Store);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/getproducts"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const addToCart = async (id, image, title, company, price) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Check if the item already exists in the cart
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem) {
      alert("Item already exists in the cart");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/addcart",
        {
          id,
          image,
          title,
          company,
          price,
        },
        {
          headers,
        }
      );
      if (response.data.itemExists) {
        alert("Item already exists in the cart");
      } else {
        alert("Added to the cart");
        setCart([...cart, { id, image, title, company, price }]);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <Container className="my-5">
      <Carousel
        className="mb-4"
        style={{ maxWidth: "1100px", margin: "0 auto" }}
      >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/600x300/7286D3/ffffff?text=50%+Discount"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/600x300/FF7878/ffffff?text=Free+Delivery"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/600x300/FFD966/ffffff?text=Free+Coupons"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <div className="d-flex flex-wrap">
        <Container className="my-5">
          <h2 className="text-center mb-4">Products</h2>
          <div className="products">
            {products && products.length > 0 ? (
              products.map((product) => (
                <Card key={product.id} className="product-card">
                  <Card.Img variant="top" src={product.image} />
                  <Card.Body>
                  <Link to={`/single/${product._id}`}>
                    <Card.Title>
                      {product.title.length > 17
                        ? product.title.substring(0, 17) + "..."
                        : product.title}
                    </Card.Title>
                    <p>{product.company}</p>
                    <Card.Text>${product.price}</Card.Text>
                  </Link>
                    <Button
                      variant="dark"
                      onClick={() => {
                        addToCart(
                          product._id,
                          product.image,
                          product.title,
                          product.company,
                          product.price
                        );
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <div>
                <p>no product found</p>
              </div>
            )}
          </div>
        </Container>
      </div>
    </Container>
  );
};

export default Home;
