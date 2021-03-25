import WrapperConsumer from '../store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faUserPlus, faPencilAlt, faQuestion, faFlagCheckered } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const TopNavbar = (props) => {
    return <div className={"view_TopNavBar font-b"}>
        <h3>
            <FontAwesomeIcon className="color-actividad" icon={faStar} />
            Tendencias
        </h3>
        <div className="content">
            {
                props.feed && props.feed.map((item, ind) => {
                    if (ind > 9 || !item.author) return
                    let href, ass, icono;
                    let imagen = item.author ? item.author.picture : ''
                    if (item.tipo_coleccion == 'actividades') {
                        href = `/plan/[id]`;
                        ass = `/plan/${item.short_name}`;
                        icono = <FontAwesomeIcon className="color-actividad" icon={faFlagCheckered} />
                    }

                    if (item.tipo_coleccion == 'publicaciones' && item.author) {
                        href = '/publicacion/[id]'
                        ass = `/publicacion/${item.short_name}`
                        icono = <FontAwesomeIcon className="color-publicacion" icon={faPencilAlt} />
                    }

                    if (item.descripcion == 'nuevo_usuario' && item.author) {
                        href = '/perfil/[id]'
                        ass = `/perfil/${item.author.nickname}`
                        icono = <FontAwesomeIcon className="color-nuevo_usuario" icon={faUserPlus} />
                    }

                    if (item.tipo_coleccion == 'preguntas') {
                        href = { pathname: '/pregunta', query: { preguntaDetalle: JSON.stringify(item) } }
                        ass = `/pregunta?pregunta=como-puedo`
                        icono = <FontAwesomeIcon className="color-pregunta" icon={faQuestion} />
                    }

                    if (item.tipo_coleccion == 'usuarios') {
                        imagen = item.picture
                        href = ""
                        ass = ""
                        icono = <FontAwesomeIcon className="color-nuevo_usuario" icon={faUserPlus} />
                    }

                    return item.tipo_coleccion != "recomendaciones" && href &&
                        <Link key={ind} href={href} as={ass}>
                            <a ind={ind}>
                                {
                                    // ind == 0 && <div className="elementoPrueba"></div>
                                }
                                <img src={`${item.imagenes[0]}_400x400.jpg?alt=media`} />
                                {/* <span className="tipo">
                                    {icono}
                                </span> */}
                                <span className="title">
                                    {item.descripcion.substr(0, 15)}
                                </span>
                            </a>
                        </Link>
                })
            }
        </div>
    </div>
}

export default React.memo(WrapperConsumer(TopNavbar))