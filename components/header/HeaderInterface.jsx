import Newsletter from "../newsletter/Newsletter"
import styles from "./Header.module.scss"

const HeaderInterface = ({ active }) =>
  <React.Fragment>
    <Newsletter />
    <header id={styles.view_Header} className={active ? styles.active : null}>
      <a href="https://pikajuegos.com/">
        <img className={styles["logo-blanco"]} alt="Logo en blanco de Pikajuegos" src="/images/logos/logo-blanco-pikajuegos.png" />
      </a>
      <nav className="f-l">
      </nav>
    </header>
  </React.Fragment>

export default HeaderInterface