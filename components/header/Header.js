import Newsletter from "../newsletter/Newsletter";
import WrapperConsumer from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.scss";

const Header = (props) => {
  const [active, setActive] = useState(false)
  const checkScroll = () => {
    window.addEventListener("scroll", (event) => {
      let scroll = window.scrollY;
      if (scroll > 100) setActive(true) // document.querySelector("#view_Header").classList.add('active');
      else setActive(false) // document.querySelector("#view_Header").classList.remove('active');
    });
  }

  useEffect(() => {
    checkScroll()
  }, [])

  return (<React.Fragment>
    <Newsletter />
    <header id={styles.view_Header} className={active ? styles.active : null}>
      <a href="https://pikajuegos.com/">
        <img className={styles["logo-blanco"]} src="/images/logos/logo-blanco-pikajuegos.png" />
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
