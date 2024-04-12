import React, { useContext, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Container, Row, Col, ListGroup, Button, Card } from "react-bootstrap";
import "./Cart.css";
import { Store } from "../ContextApi/context";
import { Link } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const { cart, setCart, getCart } = useContext(Store);
  const [total, setTotal] = useState();

  useEffect(()=>{
    getCart();
  },[]);

  useEffect(() => {
    const cartTotal = cart.reduce((acc, item) => {
      return acc + item.quantity * +(item.price)
    }, 0);
    setTotal(cartTotal);
  }, [cart]);

  const removeFromCart = async (id) => {
    await axios.delete(`http://localhost:5000/api/addcart/${id}`);
    getCart();
  }

  const increaseQuantity = (id) => {
    const updatedCartItems = cart.map((item) =>
      item._id === id ? { ...item, quantity: parseInt(item.quantity) + 1 } : item
    );
    setCart(updatedCartItems);
  }

  const decreaseQuantity = (id) => {
    const updatedCartItems = cart.map((item) =>
      item._id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
    );
    setCart(updatedCartItems);
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">
        {cart.length !== 0 ? "Cart - " + cart.length : ""}
      </h2>
      {cart.length !== 0 ? (
        <>
          <ListGroup>
            {cart.map((product) => (
              <ListGroup.Item key={product._id} className="cart-item">
                <Row>
                  <Col>
                    <Card className="card-cart">
                      <div className="cart-item-content d-flex align-items-center">
                        <Card.Img
                          className="cart-item-image"
                          src={product.image}
                        />
                        <div className="cart-item-details px-2 flex-grow-1">
                          <Card.Title className="cart-item-title">{product.title}</Card.Title>
                          <Card.Title className="cart-item-title">{product.company}</Card.Title>
                          <Card.Text>
                            <strong>${product.price}</strong>
                          </Card.Text>
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col xs={12} md={4} className="d-flex align-items-center justify-content-center">
                    <div className="quantity">
                      <Button
                        variant="outline-secondary"
                        onClick={() => decreaseQuantity(product._id)}
                      >
                        -
                      </Button>
                      <span className="px-2">{Math.max(+(product.quantity) || 1, 1)}</span>
                      <Button
                        variant="outline-secondary"
                        onClick={() => increaseQuantity(product._id)}
                      >
                        +
                      </Button>

                    </div>
                    <p className="cp-price text-dark mx-5 my-3">Rs: {product.quantity * +(product.price)}</p>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() =>
                        removeFromCart(product._id) }
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="total">Total Price: ${total}</div>
        </>
      ) : (
        <>
          <h2 className="text-center">Cart is Empty</h2>
          <Link
            to="/home"
            className="d-flex justify-content-center mt-3 text-decoration-none"
          >
            <Button variant="dark" className="text-decoration-none">Add Products</Button>
          </Link>
        </>
      )}
    </Container>
  );
};

export default Cart;
