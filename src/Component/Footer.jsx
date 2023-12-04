import React from "react";

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer mt-auto py-3">
      <div className="container">
        <p>Copyright &copy; {currentYear}</p>
      </div>
    </footer>
  );
}

export default Footer;
