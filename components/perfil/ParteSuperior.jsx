export default function ParteSuperior(props){
    return <div className="_parteSupeiorPerfil">
        <header>
            {
                props.info_usuario.club && <img className="imagen_club" src={`/images/clubs/portadas/${props.info_usuario.club.short_name}.jpg`} />
            }

            {
                props.info_usuario.ciudad && <React.Fragment>
                    <img className="imagen_ciudad" src={`/images/ciudades/${props.info_usuario.ciudad}.jpg`} />
                </React.Fragment>
            }

            {
                !props.info_usuario.club && <img className="imagen_club" src={`/images/backgrounds/sinclub.png`} />
            }
        </header>
        <img className="imagen_perfil" src={`${props.info_usuario.picture}_400x400.jpg?alt=media`} />
    </div>
}