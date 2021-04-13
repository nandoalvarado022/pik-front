import { Button, TextField } from '@material-ui/core'
import styles from './newsletter.module.scss'

const handleSuscripcion = () => {
    const texto = `Hola, quisiera pertenecer al grupo de PIKAMIGOS para que me lleguen las promociones, cupones y noticias semanalmente =)`
    window.open("https://api.whatsapp.com/send?phone=573124532441&text=" + texto)
}

const Newsletter = () => <div className={styles.Newsletter}>
    <div className={styles.content} onClick={handleSuscripcion}>
        <h3>Suscribete a nuestras mejores promociones vía Whatsapp</h3>
        {/* <div className={styles.content_fields}>
            <TextField id={styles["txt-numero-newsletter"]} label="Número de whatsapp" />
            <Button variant="contained" color="primary" onClick={handleSuscripcion}>
                Enviar
            </Button>
        </div> */}
    </div>
</div>

export default Newsletter