import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import date from 'date-and-time'
import Link from 'next/link'
import './pregunta.scss'

export default class Pregunta extends React.Component{
    render(){
        return <Link href={{pathname: '/pregunta', query: {preguntaDetalle: JSON.stringify(this.props.preguntaDetalle)}}} as={`/pregunta?pregunta=como-puedo`}>
            <div className="Card pregunta">
                <span className="tipo">
                    <FontAwesomeIcon className="color-pregunta" icon={faQuestion} />
                </span>
                <span className="fecha_sistema">
                    {
                        date.format(new Date(this.props.preguntaDetalle.fecha), 'ddd hh:mm A')
                    }
                </span>
                {
                    this.props.preguntaDetalle && 
                        <p className="text">{this.props.preguntaDetalle.descripcion}</p>
                }
            </div>
        </Link>
    }
}