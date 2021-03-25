import Layout from '../components/layout/Layout'

export default function GraciasCompra(){
    return <Layout title="Gracias por tu compra">
        <div className="_GraciasCompra h-100vh">
            <div className="background"></div>
            <div className="imageMove">
            </div>
            <div className="content font-c">
                <p style={{fontSize: '30px'}}>¡Gracias por tu compra!</p>
                <p>Pronto nos estaremos comunicando contigo vía whatapp o a tú número telefonico</p>
                <p>
                    Si tienes alguna duda en cualquier momento puedes dar clic donde dice "Chatea con nosotros" un asesor te brindara toda la información que necesites 🧙‍♂️
                </p>
            </div>
        </div>
    </Layout>
}