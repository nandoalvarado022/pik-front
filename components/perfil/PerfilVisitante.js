import { faUsers, faMapMarkerAlt, faHandHoldingHeart, faPencilAlt, faQuestion, faFlagCheckered } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Ayuda from "../ayuda/Ayuda"
import Card from "@material-ui/core/Card"
import CardPubli from '../card/Card'
import React from 'react'
import ParteSuperior from './ParteSuperior'
import { getPaises, getCiudades } from "../../lib/utilidades";

export default class PerfilVisitante extends React.Component {
    async handleLike(params = {}) {
        const elemento = params.event.currentTarget
        const obj = {
            docID: elemento.getAttribute("doc_id"),
            tipo_coleccion: elemento.getAttribute("tipo_coleccion"),
            elemento
        }

        const result = await instanciaFunc.handleLike(obj)
        if (!result) return
    }

    async componentDidMount() {
    }

    render() {
        const { publicaciones, recomendaciones, rodadas, preguntas } = this.props.info_usuario.estadisticas
        return (<div className="_perfilVisitante">
            <ParteSuperior info_usuario={this.props.info_usuario} />
            <Card className="Card">
                {
                    this.props.info_usuario.descripcion &&
                    <p>
                        {this.props.info_usuario.descripcion}
                    </p>
                }
                
                {
                    this.props.info_usuario.club && this.props.info_usuario.club['nombre'] &&
                    <p>
                        <FontAwesomeIcon className="color-azul" icon={faUsers} />
                        &nbsp;&nbsp;{this.props.info_usuario.club && this.props.info_usuario.club.nombre}
                    </p>
                }
                <p>
                    <FontAwesomeIcon className="color-azul" icon={faMapMarkerAlt} />
                    &nbsp;&nbsp;
                        {
                        this.props.info_usuario.pais && getPaises().find(item => item.id == this.props.info_usuario.pais).nombre
                    }
                    /
                        {
                        this.props.info_usuario.ciudad && getCiudades().find(item => item.id == this.props.info_usuario.ciudad).nombre
                    }
                </p>
            </Card>
            <br />

            <div className="">
                <div className="content listadoRodadas">
                    {
                        this.props.productos && this.props.productos.map((item, ind) => {
                            if (item.disponible_feed != false) {
                                return <CardPubli key={ind} logDetalle={false} doc_id={item.id} handleLike={this.handleLike} permitirLink={true} {...item} coleccion={item.coleccion} indice_item={ind} />
                            }
                        })
                    }
                </div>
            </div>

            <Card className="Card cardTitle logros">
                <h2>Logros</h2>
                <div className="content font-b">
                    <div className="item">
                        <div className="number">{publicaciones}</div>
                        <div>
                            <FontAwesomeIcon className="color-publicacion" icon={faPencilAlt} />
                            &nbsp;&nbsp;&nbsp;
                            Publicaciones
                            </div>
                    </div>
                    <div className="item">
                        <div className="number">{recomendaciones}</div>
                        <div>
                            <FontAwesomeIcon className="color-recomendacion" icon={faHandHoldingHeart} />
                            &nbsp;&nbsp;&nbsp;
                            Recomendaciónes
                            </div>
                    </div>
                    <div className="item">
                        <div className="number">{preguntas}</div>
                        <div>
                            <FontAwesomeIcon className="color-pregunta" icon={faQuestion} />
                            &nbsp;&nbsp;&nbsp;
                            Preguntas
                            </div>
                    </div>
                    <div className="item">
                        <div className="number">{rodadas}</div>
                        <div>
                            <FontAwesomeIcon className="color-actividad" icon={faFlagCheckered} />
                            &nbsp;&nbsp;&nbsp;
                            Rodadas
                            </div>
                    </div>
                </div>
            </Card>


            {/* <Ayuda nombreAyuda="perfil_visitante" background={true} steps={this.stepsAyuda}></Ayuda> */}
        </div>
        )
    }
}