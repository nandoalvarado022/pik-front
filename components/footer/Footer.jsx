import Link from "next/link"
// import Categorias from "../categorias/Categorias"
import styles from "./footer.module.scss"

const Footer = ({ filtrarRodadas }) => {
  return (<div className={styles.SideToSide}>
    <div className={styles.logo}>
      <Link href="/">
        <img width="200" className="pikajuegos desktop logo" src="/images/logos/logo-pikajuegos.png" alt="" />
      </Link>
    </div>
    <hr />
    <div>
      <h3>Artículos de interes</h3>
      <Link href="/start">
        <a>
          Quienes somos
        </a>
      </Link>
    </div>
    <hr />
    <div>
      <h3>Aliados</h3>
      <a href="https://juanchofenix.pik.com.co/">
        Juancho Fenix
      </a>
    </div>
    <hr />
    <div>
      <h3>Contáctanos</h3>
      <p>Medellín - Colombia</p>
      <p>
        pikajuegoscolombia@gmail.com
      </p>
      <p>
        <a target="_BLANK" href="https://www.instagram.com/pikajuegos">https://www.instagram.com/pikajuegos</a>
      </p>
      <p>
        <a target="_BLANK" href="https://www.facebook.com/pikajuegos">https://www.facebook.com/pikajuegos</a>
      </p>
    </div>
  </div>
  );
};

export default Footer