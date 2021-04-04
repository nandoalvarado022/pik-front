import { Carousel } from 'react-responsive-carousel'
import "./frasesUsuarios.module.scss";

const FrasesUsuario = () => {
    const frases = [
        "Recuerda que solo tienes 1 publicacion al día, aprovechala compartiendo consejos, ganar puntos y redimirlos 🛍",
        "Reducir la velocidad al acercarse a transportes escolares o cualquier vehículos que se hayan detenido",
        "Reducir la velocidad si hay trabajos en la vía",
    ]

    return <div className="_FrasesUsuarios">
        <div className="content">
            <div className="textos font-c">
                <Carousel autoPlay={true}
                    transitionTime={1000}
                    infiniteLoop={true}
                    showThumbs={false}
                    className="owl-theme"
                    showArrows={false} showIndicators={false} showStatus={false} emulateTouch={true}>
                    {
                        frases && frases.map((item, ind) => <div key={ind}>{item.substr(0, 1000)}</div>)
                    }
                </Carousel>
            </div>
            <img src="/images/general/chica_motera.png" alt="" />
        </div>
    </div>
}

export default FrasesUsuario