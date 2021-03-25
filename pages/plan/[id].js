import React from 'react'
import Plan from '../../components/plan/Plan'
import Funciones from "../../lib/functions"

const instanciaFunc = new Funciones
export default class extends React.Component{
    static async getInitialProps(context){
        let idActividad = context.query.id
        const dataPlan = await instanciaFunc.getActividadDetalle({idActividad})
        return { dataPlan }
    }

    render(){
        if(this.props.dataPlan) return <Plan dataPlan={this.props.dataPlan} />
        // else return <div>No se encontaron datos</div>
        // console.log("Datos:");
        // console.log(this.props);
        return null
    }
}