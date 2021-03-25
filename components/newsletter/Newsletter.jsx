import { Button, TextField } from '@material-ui/core'

import './newsletter.scss'

const handleSuscripcion = () => {
    const number = document.querySelector("#txt-numero-newsletter").value
    const texto = `Hola, mi número es ${number} y quisiera pertenecer al grupo de PIKAMIGOS para que me lleguen las promociones, cupones y noticias semanalmente =)`
    window.open("https://api.whatsapp.com/send?phone=573124532441&text=" + texto)
}

const Newsletter = () => <div className="Newsletter">
    <div className="content">
        <h3>Suscribete a nuestras mejores promociones vía Whatsapp</h3>
        <div className="content_fields">
            <TextField id="txt-numero-newsletter" label="Número de whatsapp" />
            <Button variant="contained" color="primary" onClick={handleSuscripcion}>
                Enviar
            </Button>
        </div>
    </div>
</div>

export default Newsletter