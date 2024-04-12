import React, { useState, useEffect } from "react";
import { Navbar, Container } from "react-bootstrap";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
      setShowFooter(isScrolledToBottom);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
      {showFooter && (
        <Navbar bg="dark" variant="dark" className="foot">
          <Container>
            <Navbar.Brand className="logo">
              <Link to="/" className="text-decoration-none" style={{color:"white"}}>SoulStore</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className="dev">
                Developed by{" "}
                <a href="https://ashishprabhuk.me/">Ashish Prabhu K</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  );
};

export default Footer;
