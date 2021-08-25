import { register } from "next-offline/runtime"
import toastr from "toastr"
import Button from "../button/Button"
import { initGA, logPageView } from "../../public/analytics"
import Router from "next/router"
import NProgress from "nprogress"
import Head from "next/head"
import React from "react"
import Header from "../header/Header"
import LogoBuscador from "../logoBuscador/LogoBuscador"
import styles from "./layout.module.scss"
import Categorias from "../categorias/Categorias"

toastr.options.progressBar = true;
toastr.options.timeOut = 5000;

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteBeforeHistoryChange = (url) => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const options = {
  items: 1,
  nav: true,
  rewind: true,
  autoplay: true
};

const events = {
  onDragged: function (event) { },
  onChanged: function (event) { }
};

class Layout extends React.Component {
  club_short_name = null;
  state = {
    growMenu: false,
    swAdd: false,
    imagen_club_usuario: false,
    tenemosCookies: true,
  };

  tenemosCookies = () => {
    this.setState({ tenemosCookies: true });
    localStorage.setItem("tenemosCookies", true);
  };

  handleAdd = () => {
    this.setState((state) => ({
      swAdd: !state.swAdd,
      growMenu: !state.growMenu,
    }));
  };

  componentDidMount() {
    /* AOS.init({
       delay: 500,
     });*/
    register();
    if (localStorage.getItem("user")) {
      this.club_short_name = JSON.parse(localStorage.getItem("user"))
        .club_short_name
        ? JSON.parse(localStorage.getItem("user")).club_short_name
        : null;
    }

    /*const script = document.createElement("script");
    script.src = "../../indigital/sdk.min.js";
    script.async = true;
    script.onload = () => {
      indigitall.init({
        appKey: "206e8272-19eb-4ef5-a935-22ab1a9ee5df",
        workerPath: "../../indigital/worker.min.js",
        requestLocation: true,
      });
    };
    document.body.appendChild(script);*/

    if (localStorage.getItem("user")) {
      this.setState({
        logueado: true,
      });
    }

    if (!localStorage.getItem("tenemosCookies")) {
      this.setState({
        tenemosCookies: false,
      });
    }

    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();

    if (
      localStorage.getItem("user") &&
      JSON.parse(localStorage.getItem("user")).hasOwnProperty("club_imagen")
    ) {
      this.setState({
        imagen_club_usuario: JSON.parse(localStorage.getItem("user"))
          .club_imagen,
      });
    }
  }

  render() {
    const isMobile = typeof window != "undefined" ? !localStorage.getItem("isMobile") : null
    const props = this.props
    const { meta_descripcion, meta_title, meta_image } = this.props
    let { meta_url, is_partner, partner } = this.props
    return <React.Fragment>
      <Head>
        <title>{meta_title}</title>
        <meta property="title" content={meta_title} />
        <meta property="og:title" content={meta_title} />
        <meta name="description" content={meta_descripcion} />
        <meta property="og:description" content={meta_descripcion} />
        <meta property="og:image" content={meta_image} />
        <meta name="url" content={meta_url} />
        <meta name="og:url" content={meta_url} />
        <meta name="og:site_name" content="Pikajuegos" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0" />
        <meta name="theme-color" content="#4d9afa" />
        <meta name="google-site-verification" content="4IqXj9YLrm5eo3s_c3cTKcAqBwUhCf8qgJgL2sLtJko" />
        <meta name="twitter:description" content={meta_descripcion} />
        <meta name="keywords" value="" />
        <meta name="country" content="COL" />
        <meta name="author" content="pikajuegos.com" />
        <meta name="copyright" content="pikajuegos.com" />
        <meta name="language" content="es-CO"></meta>
        {/* Global site tag (gtag.js) - Google Ads: 941382150 */}
        <link rel="alternate" href={meta_url} hrefLang="es-CO" />
        <link rel="canonical" href={meta_url} />
        <link rel="icon" type="image/png" href="/images/logos/logo48x48.png" />
        <link rel="manifest" href={`/manifest.json`} />
        {/* <link rel="stylesheet" href="/css/swiper.min.css"></link> */}
        {/* <link rel="stylesheet" href="https://raw.githubusercontent.com/daneden/animate.css/master/animate.css"></link> */}
        {/* <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" /> */}
        <script type="text/javascript" src="https://checkout.epayco.co/checkout.js"></script>
        {/* <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script> */}
        {() => {
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', 'AW-941382150');
          gtag('event', 'conversion', { 'send_to': 'AW-941382150/e71oCMvon-0BEIa08cAD' });
        }}()
      </Head>
      <body className="App font-a">
        <Header {...props} />
        <LogoBuscador partner={is_partner ? partner : null} />
        <audio />
        <main className={styles.principal}>
          <Categorias scroll={false} />
          {props.children}
          <a target="_BLANK" href="https://api.whatsapp.com/send?phone=573052665725&text=Escribe%20aqu%C3%AD%20tu%20pregunta">
            <button className={styles["btn-whatsapp"]}>
              <img src="/images/icons/whatsapp.png" alt="Hablar con un asesor vía Whatsapp" />
            </button>
          </a>
        </main>
        {!this.state.tenemosCookies && (
          <div className="avisoCookies font-c">
            Pikajuegos utiliza cookies para medir el uso del sitio web,
            ofrecerte publicidad relacionada con tus intereses y habilitar
            funciones de redes sociales. Para más información y ajustar tu
            configuración de cookies, haz clic aquí.
            <p>
              <Button className="blue small m-l-10" text="Aceptar" onClick={this.tenemosCookies} />
            </p>
          </div>
        )}
      </body>
    </React.Fragment>
  }
}

export default Layout