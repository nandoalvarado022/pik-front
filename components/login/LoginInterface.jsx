import "./login.module.scss"

const LoginInterface = ({ handleKeyUp, handleEnviar }) => {
  return <div>
    <input placeholder="Tu número celular" type="number" id="phoneLogin" value="3187414972" />
    <input placeholder="Código de verificación" type="number" id="verificationCode" onKeyUp={handleKeyUp} />
    <button onClick={handleEnviar}>Enviar</button>
  </div>
}

export default LoginInterface