import Btn from '../button/Button'
import Link from 'next/link'
import "./puedeInteresarte.module.scss";

class PuedeInteresarte extends React.Component {
    state = {
        items: [
            {
                tipo_publicacion: "post",
                imagen: "https://firebasestorage.googleapis.com/v0/b/mi-club2ruedas.appspot.com/o/images%2Fpublicaciones%2F5c1a0814-ba04-4925-bb2e-ee2d5c75a081.jfif?alt=media&token=6bbb245c-bbef-45c9-8ebc-9fac959b4d24",
                titulo: "Hola que tal! Soy Diana",
                as: "/publicacion/hola-que-tal-soy-diana-en-la-actualidad-aun-existen-mucha-de-430",
                href: "/publicacion/[id]",
                descripcion: "Hola que tal! Soy Diana... En la actualidad, aun existen mucha dependencia a la hora de transportarse, por miedo quizás; a caerse, a que pase algo en la calle, a que los demás no respeten a una mujer conductora... PERO eso debe quedar en el pasado... Tener tu propia libertad, es lo máximo, ir donde quieras cuando quieras, sentir el viento en la cara.Anímate a tener tu propio amigo de 2 ruedas. No te arrepentirás, además te escapas cuando quieras, manejas tu propio horario, vas a tu propio ritmo 🤷🏻‍♀ pá que mas! 🥳"
            },
            {
                tipo_publicacion: "producto",
                titulo: "Shaft 571 'Shen Long",
                imagen: "https://firebasestorage.googleapis.com/v0/b/mi-club2ruedas.appspot.com/o/images%2Fpublicaciones%2F81167452_612996179477660_5753202626978927309_n.jpg?alt=media&token=f9158b01-6729-44e6-b6f6-87198e6d61a2",
                as: "/publicacion/shaft-571-shen-long-precio-220000-varios-colores-dudas-info--229",
                href: "/publicacion/[id]",
                descripcion: `Shaft 571 Shen Long 🐲
                Precio $220.000 💰
                Varios colores 🚨
                Dudas? Info. Dm o al 📲 +57 3212547538...`
            },
            {
                tipo_publicacion: "post",
                imagen: "https://firebasestorage.googleapis.com/v0/b/mi-club2ruedas.appspot.com/o/images%2Fpublicaciones%2Fmaria%20camila%20quintero.jpg?alt=media&token=c4a8a7cc-2be4-419c-8d88-b73e00465097",
                titulo: "Biker: MARÍA CAMILA QUINTERO",
                as: "/publicacion/biker-maria-camila-quintero-con-27-anos-es-una-publicista-gr-793",
                href: "/publicacion/[id]",
                descripcion: "Con 27 años, es una publicista graduada de la Universidad Pontificia Bolivariana.Su pasión por el ciclismo se desarrolló hace más de 6 años, cuando el que era su novio e"
            },
        ]
    }

    componentDidMount() {

    }

    render() {
        return <div className="_PuedeInteresarte">
            {
                this.state.items.map((item, ind) => {
                    return <div key={ind}>
                        <Link href={item.href} as={item.as}>
                            <a className={item.tipo_publicacion} style={{ backgroundImage: `url(${item.imagen})` }}>
                                <h2>
                                    {item.titulo}
                                </h2>
                                <div className="descripcion">
                                    {item.descripcion.substr(0, 200)}...
                                    {/* <Btn className="blue m-l-10" text="Abrir"/> */}
                                </div>
                            </a>
                        </Link>
                    </div>
                })
            }
        </div>
    }
}

export default PuedeInteresarte