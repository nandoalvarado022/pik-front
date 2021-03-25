import Link from "next/link";
import Categorias from "../Categorias/Categorias"

const Footer = ({ filtrarRodadas }) => {
  return (
    <div className="SideToSide">
      <div className="logo">
        <Link href="/">
          <img width="200" className="pikajuegos desktop logo" src="/images/logos/logo-pikajuegos.png" alt="" />
        </Link>
      </div>
      <hr />
      <div className="categorias">
        <Categorias scroll={true} />
      </div>
      <hr />
      <div>
        <h3>Artículos de interes</h3>
        <div>Quienes somos</div>
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
        <div>
          <a href="https://api.whatsapp.com/send?phone=573124532441&text=Hola, quisiera conversar con Pikajuegos" target="_BLANK">Conversemos por Whatsapp</a>
        </div>
        <div>
          pikajuegoscolombia@gmail.com
        </div>
        <div>
          <a target="_BLANK" href="https://www.instagram.com/pikajuegos">https://www.instagram.com/pikajuegos</a>
        </div>
        <div>
          <a target="_BLANK" href="https://www.facebook.com/pikajuegos">https://www.facebook.com/pikajuegos</a>
        </div>
      </div>
    </div>
  );
};

export default Footer