import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import data from './data'
import "./destacado.module.scss";

const Destacado = (props) => {
    let datosMostrar
    const tipo_coleccion = props.filtroActive.tipo_coleccion
    // if(tipo_coleccion == 'actividades') datosMostrar = data.find(item => item.tipo_coleccion == tipo_coleccion)
    datosMostrar = data.find(item => item.tipo_coleccion == tipo_coleccion && (item.tipo_publicacion ? item.tipo_publicacion == props.filtroActive.tipo_publicacion : true))

    if (!datosMostrar) return <div className='m-b-20 ancho100'></div>

    return <div className='_Destacado'>
        <img data-aos="fade-up-right" src={datosMostrar.imagen} />
        <div className='textos'>
            <p>
                <h2 data-aos="fade-left" className='font-c animated infinite bounce delay-2s'>
                    {datosMostrar.titulo}
                </h2>
                {datosMostrar.descripcion}
                {
                    datosMostrar.link_texto &&
                    <Link href={datosMostrar.href} as={datosMostrar.as} className='font-b'>
                        <a>
                            {datosMostrar.link_texto}
                            <FontAwesomeIcon className="" icon={faArrowRight} />
                        </a>
                    </Link>
                }
            </p>
        </div>
    </div>
}

export default Destacado