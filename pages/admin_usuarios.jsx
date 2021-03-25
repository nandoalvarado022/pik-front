import Functions from "../lib/functions";

export default class Admin_Usuarios extends React.Component {
  static async getInitialProps(context) {
    const usuarios = await Functions.getUsuarios();
    return { usuarios };
  }

  render() {
    const usuarios = this.props.usuarios;
    return (
      <div>
        <table>
          {usuarios &&
            usuarios.map((usuario) => {
              return (
                <tr>
                  <td>{usuario.id && usuario.id}</td>
                  <td>{usuario.email && usuario.email}</td>
                  <td style={{ width: "5000px", display: "block" }}>
                    {JSON.stringify(usuario)}
                  </td>
                </tr>
              );
            })}
        </table>
      </div>
    );
  }
}
