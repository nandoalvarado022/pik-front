import Newsletter from "../newsletter/Newsletter";
import WrapperConsumer from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
  return (<React.Fragment>
    <Newsletter />
    <header id="view_Header">
      <a href="https://pikajuegos.com/">
        <img className="logo-blanco" src="/images/logos/logo-blanco-pikajuegos.png" />
      </a>
      <nav className="f-l">
        {/* <a>Login</a> */}
        {/* <a>Estado de mi pedido</a> */}
        {/* <a>Ofertas</a> */}
        {/* <a>Nosotros</a> */}
      </nav>
      <nav className="f-r">{/* <a>Envíos a toda Colombia</a> */}</nav>
    </header>
  </React.Fragment>
  );
};

export default WrapperConsumer(Header);
