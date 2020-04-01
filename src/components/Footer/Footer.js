import React from "react";
import { Navbar } from "react-bootstrap";

const Footer = () => {
  const date = new Date();
  return (
    <Navbar bg="dark" variant="dark" className="Footer">
      {date.getFullYear()} &copy; all rights reserved
    </Navbar>
  );
};

export default Footer;
