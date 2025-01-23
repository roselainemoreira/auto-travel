import React from "react";
import "./style.css";

const Footer = () => {
  const dataAtual = new Date().getFullYear();

  return (
    <div className="footer-wrapper">
      <footer className="footer-validador">
       AutoTravel, desenvolvido por Roselaine Moreira - {dataAtual} © Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default Footer;
