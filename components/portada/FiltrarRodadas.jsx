const { createRef, useState, useEffect } = React
// const { createRef, useState, useEffect } = React
import WrapperConsumer from '../store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen, faGlobeAmericas, faHandHoldingHeart, faPlus, faPencilAlt, faQuestion, faFlagCheckered, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'

const FiltrarRodadas = (props) => {
    let textFiltroActive
    const { scrollHeader } = props.context
    const { tipo_coleccion, tipo_publicacion, tipo_producto } = props.filtroActive
    if (tipo_coleccion == 'publicaciones' && tipo_publicacion == 'producto') textFiltroActive = 'productos'

    const ref = React.createRef()
    const [isSticky, setIsSticky] = useState(false)

    useEffect(() => {
        if (window.screen.width > 481) {
            const cachedRef = ref.current,
                observer = new IntersectionObserver(
                    ([e]) => {
                        const valor = e.intersectionRatio > 0
                        setIsSticky(valor)
                        props.context.changeValor('scrollHeader', valor)
                    },
                    { threshold: [1] }
                )

            observer.observe(cachedRef)

            // unmount
            return function () {
                observer.unobserve(cachedRef)
            }
        }
    }, [])

    return <div className={"_filtrarRodadas" + (isSticky ? ' scroll' : '')}>
        <div ref={ref} className="avisofiltrarArriba"></div>
        <div className="opciones font-c">
            <button style={{ background: 'var(--colorTodo)', color: 'var(--colorTodo)' }} onClick={() => props.filtrarRodadas({})}>
                <FontAwesomeIcon icon={faGlobeAmericas} />
                <span>Todo</span>
            </button>
            <button style={{ background: 'var(--colorProducto)', color: 'var(--colorProducto)' }} className={"productos"} onClick={() => props.filtrarRodadas({ tipo_coleccion: 'publicaciones', tipo_publicacion: 'producto', })}>
                <FontAwesomeIcon icon={faBoxOpen} />
                <span>Productos</span>
            </button>
            <button style={{ background: 'var(--colorPublicacion)', color: 'var(--colorPublicacion)' }} className="actividades" onClick={() => props.filtrarRodadas({ tipo_coleccion: 'publicaciones', tipo_publicacion: 'post' })}>
                <FontAwesomeIcon icon={faPencilAlt} />
                <span>Publicaciones</span>
            </button>
            <button style={{ background: 'var(--colorActividad)', color: 'var(--colorActividad)' }} className="actividades" onClick={() => props.filtrarRodadas({ tipo_coleccion: 'actividades' })}>
                <FontAwesomeIcon icon={faFlagCheckered} />
                <span>Rodadas</span>
            </button>
            <button style={{ background: 'var(--colorRecomendacion)', color: 'var(--colorRecomendacion)' }} className="recomendaciones" onClick={() => props.filtrarRodadas({ tipo_coleccion: 'publicaciones', tipo_publicacion: 'recomendacion', })}>
                <FontAwesomeIcon icon={faHandHoldingHeart} />
                <span>Recomendaciónes</span>
            </button>
            <button style={{ background: 'var(--colorPregunta)', color: 'var(--colorPregunta)' }} onClick={() => props.filtrarRodadas({ tipo_coleccion: 'preguntas' })}>
                <FontAwesomeIcon icon={faQuestion} />
                <span>Preguntas</span>
            </button>
        </div>

        <div className={"opcionesSecundarias" + (textFiltroActive == 'productos' ? ' active' : '')}>
            <span onClick={() => props.filtrarRodadas({ tipo_coleccion, tipo_publicacion, tipo_producto: 'casco' })}>Cascos</span>
            <span onClick={() => props.filtrarRodadas({ tipo_coleccion, tipo_publicacion, tipo_producto: 'ropa' })}>Ropa</span>
            <span>Guantes</span>
            <span>Productos</span>
            <span>Intercomunicadores</span>
            <span>Relojes</span>
            <span>Otros</span>
        </div>
    </div>
}

export default WrapperConsumer(FiltrarRodadas)