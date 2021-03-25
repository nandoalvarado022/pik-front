import TopNavbar from '../topNavbar/TopNavbar'
import { register, unregister } from 'next-offline/runtime'
import toastr from "toastr"
import Grow from "@material-ui/core/Grow"
import firebase from 'firebase'
import Btn from "../btn/Btn"
import { initGA, logPageView } from '../../public/analytics'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandHoldingHeart, faPlus, faPencilAlt, faQuestion, faFlagCheckered, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
import Router from 'next/router'
import NProgress from 'nprogress'
import Head from 'next/head'
import React from 'react'
import Header from '../header/Header'
import BottomNavbar from '../bottomNavbar/BottomNavbar'
import LogoBuscador from '../logoBuscador/LogoBuscador'

// Importing styles
import '../plan/plan.scss'
import '../planes/planes.scss'
import '../perfil/perfil.scss'
import '../perfil/perfilVisitante.scss'
import '../addRodada/addRodada.scss'
import '../medallas/medallas.scss'
import '../plan/chat.scss'
import '../home/home.scss'
import '../ayuda/ayuda.scss'
import '../clubs/clubs.scss'
import '../club/club.scss'
import "../rodadas/rodadas.scss"
import '../preguntas/detallePregunta.scss'
import '../topNavbar/topNavbar.scss'
import '../../pages/ubicacion.scss'
import '../perfil/parteSuperior.scss'
import '../card/card.scss'
import '../card/cardDetalleProducto.scss'
import '../rodadas/filtrarRodadas.scss'
import '../bottomNavbar/bottomNavbar.scss'
import '../puedeInteresarte/puedeInteresarte.scss'
import '../frasesUsuarios/frasesUsuarios.scss'
import '../destacado/destacado.scss'
import '../logoBuscador/logoBuscador.scss'
import '../../public/css/carousel.min.scss'
import '../../public/css/react-zoom-styles.scss'
import '../../public/css/gracias-por-tu-compra.scss'
import '../../public/css/modalIngresoInfo.scss'
import '../../public/css/detalle_publicacion.scss'
import 'react-image-gallery/styles/scss/image-gallery.scss'
import "../header/header.scss"

toastr.options.progressBar = true;
toastr.options.timeOut = 5000;

Router.onRouteChangeStart = (url) => NProgress.start();
Router.onRouteBeforeHistoryChange = (url) => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class LayoutPartner extends React.Component {
    club_short_name = null
    state = {
        growMenu: false,
        swAdd: false,
        imagen_club_usuario: false,
        tenemosCookies: true
    }

    tenemosCookies = () => {
        this.setState({ tenemosCookies: true })
        localStorage.setItem("tenemosCookies", true)
    }

    handleAdd = () => {
        this.setState(state => ({
            swAdd: !state.swAdd,
            growMenu: !state.growMenu
        }))
    }

    /*
    renderMenu(){
        const menu = [<div>
            <Link href="/publicaciones/crear">
                <a>
                    <span>Publicación</span>
                    <FontAwesomeIcon icon={faPencilAlt} />
                </a>
            </Link>
        </div>
        ]
        return <Grow style={{ transformOrigin: "0 0 0" }} in={false}>
            {
                menu.map(item => item)
            }
        </Grow>
                            
    }*/

    verifyStickyNav(){
        
    }

    componentDidMount() {
        AOS.init({
            delay: 500
        })
        register()
        this.verifyStickyNav()
        if(localStorage.getItem("user")){
            this.club_short_name = JSON.parse(localStorage.getItem("user")).club_short_name ? JSON.parse(localStorage.getItem("user")).club_short_name : null
        }

        firebase.auth().onAuthStateChanged(function(user) {
            if (!user) {
                localStorage.removeItem('user')
            }
        });

        const script = document.createElement("script");
        script.src = "../../indigital/sdk.min.js";
        script.async = true;
        script.onload = () => {
            indigitall.init({
                appKey: '206e8272-19eb-4ef5-a935-22ab1a9ee5df',
                workerPath: '../../indigital/worker.min.js',
                requestLocation: true
            })
        }
        document.body.appendChild(script);

        if (localStorage.getItem("user")) {
            this.setState({
                logueado: true
            })
        }

        if (!localStorage.getItem("tenemosCookies")) {
            this.setState({
                tenemosCookies: false
            })
        }

        if (!window.GA_INITIALIZED) {
            initGA()
            window.GA_INITIALIZED = true
        }
        logPageView()

        if (localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).hasOwnProperty("club_imagen")) {
            this.setState({
                imagen_club_usuario: JSON.parse(localStorage.getItem("user")).club_imagen
            })
        }
    }

    render() {
        const isMobile  = typeof window != 'undefined' ? !localStorage.getItem('isMobile') : null
        const props = this.props
        const { growMenu } = this.state
        const { meta_descripcion, meta_title, meta_image } = this.props
        let { meta_url } = this.props
        const club_short_name = this.club_short_name
        const feed = this.feed;
        return (
            <div className="App font-a">
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
                    <link rel="alternate" href={meta_url} hrefLang="es-CO" />
                    <link rel="canonical" href={meta_url} />
                    <link rel="icon" type="image/png" href="/images/logos/logo48x48.png" />
                    <link rel="manifest" href={`/manifest.json`} />
                    <link rel="stylesheet" href="/css/swiper.min.css"></link>
                    <link rel="stylesheet" href="https://raw.githubusercontent.com/daneden/animate.css/master/animate.css"></link>
                    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
                    <script type="text/javascript" src="https://checkout.epayco.co/checkout.js"></script>
                    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
                </Head>
                <Header {...props} />
                {
                    // !isMobile && <TopNavbar feed={feed} limite={10} />
                }

                <LogoBuscador />

                <main className='principal'>
                    {props.children}
                </main>

                {/* 
                MENU ADMINISTRACION
                <div className={(String(this.state.swAdd)) + " add"} onClick={this.handleAdd}>
                    <div className="background"></div>
                    <div className="opciones font-b">
                        <Grow timeout={1500} style={{ transformOrigin: "0 0 0" }} in={growMenu}>
                            <div>
                                <Link href="/publicacion/crear">
                                    <a>
                                        <span>Publicar</span>
                                        <FontAwesomeIcon className="color-publicacion" icon={faPencilAlt} />
                                    </a>
                                </Link>
                            </div>
                        </Grow>
                        
                        <Grow timeout={600} style={{ transformOrigin: "0 0 0" }} in={growMenu}>
                            <div>
                                <Link href="/rodadas/crear">
                                    <a>
                                        <span>Crear Rodada</span>
                                        <FontAwesomeIcon className="color-actividad" icon={faFlagCheckered} />
                                    </a>
                                </Link>
                            </div>
                        </Grow>
                        <Grow timeout={900} style={{ transformOrigin: "0 0 0" }} in={growMenu}>
                            <div>
                                <Link href="/preguntas/crear">
                                    <a>
                                        <span>Hacer Pregunta</span>
                                        <FontAwesomeIcon className="color-pregunta" icon={faQuestion} />
                                    </a>
                                </Link>
                            </div>
                        </Grow>
                        <Grow timeout={300} style={{ transformOrigin: "0 0 0" }} in={growMenu}>
                            <div>
                                <Link href="/registrar-revision">
                                    <a>
                                        <span>Registrar Revisión</span>
                                        <FontAwesomeIcon className="color-revision" icon={faCalendarCheck} />
                                    </a>
                                </Link>
                            </div>
                        </Grow>
                        <Grow timeout={300} style={{ transformOrigin: "0 0 0" }} in={growMenu}>
                            <div className="whatsapp">
                                <a href="https://api.whatsapp.com/send?phone=573041032854&amp;text=¡Hola Club2ruedas!" target="_BLANK">
                                    <span>Chatea con nosotros</span>
                                    <FontAwesomeIcon style={{ color: "#3ce059" }} icon={faWhatsapp} />
                                </a>
                            </div>
                        </Grow>
                    </div>

                    {/* <div className="content_plus">
                        <FontAwesomeIcon icon={faPlus} />
                    </div> 
                </div>
                */}

                {
                    !this.state.tenemosCookies &&
                    <div className="avisoCookies font-c">
                        Pikajuegos utiliza cookies para medir el uso del sitio web, ofrecerte publicidad relacionada con tus intereses y habilitar funciones de redes sociales. Para más información y ajustar tu configuración de cookies, haz clic aquí.
                            <p>
                            <Btn className="blue small m-l-10" text="Aceptar" onClick={this.tenemosCookies} />
                        </p>
                    </div>
                }

                {/* <BottomNavbar {...this.props} /> */}
            </div>
        )
    }
}

export default LayoutPartner;