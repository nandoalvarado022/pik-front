import Layout from '../../components/layout/Layout'
import ReactMarkdown from 'react-markdown/with-html'
export default () => {
  const html = `<div>
        <style>
          td{
            padding: 8px;
          }    
        </style>
        <h1 style="text-align: center;">Listado de precios de los juegos mas top de nintendo switch, nuevos y usados. (Actulizaci&oacute;n semanal)</h1>
        <p>&nbsp;</p>
        <p style="text-align: center;">Vuelvete un verdadero gamer con los titulos m&aacute;s importantes de Nintendo Switch.&nbsp;</p>
        <table style="height: 400px; width: 650px; margin-left: auto; margin-right: auto;" border="1">
            <tbody>
                <tr>
                    <td style="width: 194px; text-align: center;"><strong>Nombre&nbsp;</strong></td>
                    <td style="width: 83px; text-align: center;"><strong>Estado&nbsp;</strong></td>
                    <td style="width: 120px; text-align: center;"><strong>Consola</strong></td>
                    <td style="width: 133px; text-align: center;"><strong>Precio&nbsp;</strong></td>
                </tr>
                <tr>
                    <td style="width: 194px; text-align: center;">Mario Kart 8</td>
                    <td style="width: 83px; text-align: center;">&nbsp;Nuevo</td>
                    <td style="width: 120px; text-align: center;">Nintendo Switch</td>
                    <td style="width: 133px; text-align: center;">$230.000</td>
                </tr>
                <tr>
                    <td style="width: 194px; text-align: center;">Mario Kart 8</td>
                    <td style="width: 83px; text-align: center;">Usado</td>
                    <td style="width: 120px; text-align: center;">Nintendo Switch</td>
                    <td style="width: 133px; text-align: center;">$190.000</td>
                </tr>
                <tr>
                    <td style="width: 194px; text-align: center;">Luigis Mansion</td>
                    <td style="width: 83px; text-align: center;">Nuevo</td>
                    <td style="width: 120px; text-align: center;">Nintendo Switch</td>
                    <td style="width: 133px; text-align: center;">$230.000</td>
                </tr>
                <tr>
                    <td style="width: 194px; text-align: center;">Luigis Mansion</td>
                    <td style="width: 83px; text-align: center;">Usado</td>
                    <td style="width: 120px; text-align: center;">Nintendo Switch</td>
                    <td style="width: 133px; text-align: center;">$199.000</td>
                </tr>
                <tr>
                    <td style="width: 194px; text-align: center;">Mortal Kombat 11</td>
                    <td style="width: 83px; text-align: center;">Nuevo</td>
                    <td style="width: 120px; text-align: center;">Nintendo Switch</td>
                    <td style="width: 133px; text-align: center;">$160.000</td>
                </tr>
                <tr>
                    <td style="width: 194px; text-align: center;">Mortal Kombat 11</td>
                    <td style="width: 83px; text-align: center;">Usado</td>
                    <td style="width: 120px; text-align: center;">Nintendo Switch</td>
                    <td style="width: 133px; text-align: center;">$120.000</td>
                </tr>
                <tr>
                    <td style="width: 194px; text-align: center;">Super Smash Bross</td>
                    <td style="width: 83px; text-align: center;">Nuevo</td>
                    <td style="width: 120px; text-align: center;">Nintendo Switch</td>
                    <td style="width: 133px; text-align: center;">$240.000</td>
                </tr>
                <tr>
                    <td style="width: 194px; text-align: center;">Super Smash Bross</td>
                    <td style="width: 83px; text-align: center;">Usado</td>
                    <td style="width: 120px; text-align: center;">Nintendo Switch</td>
                    <td style="width: 133px; text-align: center;">$180.000</td>
                </tr>
                <tr>
                    <td style="width: 194px; text-align: center;">Rocket League</td>
                    <td style="width: 83px; text-align: center;">Nuevo</td>
                    <td style="width: 120px; text-align: center;">Nintendo Switch</td>
                    <td style="width: 133px; text-align: center;">$120.000</td>
                </tr>
                <tr>
                    <td style="width: 194px; text-align: center;">Rocket League</td>
                    <td style="width: 83px; text-align: center;">Usado</td>
                    <td style="width: 120px; text-align: center;">Nintendo Switch</td>
                    <td style="width: 133px; text-align: center;">$90.000</td>
                </tr>
                <tr>
                    <td style="width: 194px; text-align: center;">Animal Crossing</td>
                    <td style="width: 83px; text-align: center;">Nuevo</td>
                    <td style="width: 120px; text-align: center;">Nintendo Switch</td>
                    <td style="width: 133px; text-align: center;">$240.000</td>
                </tr>
                <tr>
                    <td style="width: 194px; text-align: center;">Animal Crossing</td>
                    <td style="width: 83px; text-align: center;">Usado</td>
                    <td style="width: 120px; text-align: center;">Nintendo Switch</td>
                    <td style="width: 133px; text-align: center;">$190.000</td>
                </tr>
                <tr>
                    <td style="width: 194px; text-align: center;">The Legend Of Zelda Breath Of The Wild</td>
                    <td style="width: 83px; text-align: center;">Nuevo</td>
                    <td style="width: 120px; text-align: center;">Nintendo Switch</td>
                    <td style="width: 133px; text-align: center;">$230.00</td>
                </tr>
                <tr>
                    <td style="width: 194px; text-align: center;">The Legend Of Zelda Breath Of The Wild</td>
                    <td style="width: 83px; text-align: center;">Usado</td>
                    <td style="width: 120px; text-align: center;">Nintendo Switch</td>
                    <td style="width: 133px; text-align: center;">$180.000</td>
                </tr>
                <tr>
                    <td style="width: 194px; text-align: center;">Paper Mario: The Origami King</td>
                    <td style="width: 83px; text-align: center;">Nuevo</td>
                    <td style="width: 120px; text-align: center;">Nintendo Switch</td>
                    <td style="width: 133px; text-align: center;">$235.000</td>
                </tr>
                <tr>
                    <td style="width: 194px; text-align: center;">Paper Mario: The Origami King</td>
                    <td style="width: 83px; text-align: center;">Usado</td>
                    <td style="width: 120px; text-align: center;">Nintendo Switch</td>
                    <td style="width: 133px; text-align: center;">$169.000</td>
                </tr>
                <tr>
                    <td style="width: 194px; text-align: center;">Captain Tsubasa: Rise of New Champions</td>
                    <td style="width: 83px; text-align: center;">Nuevo</td>
                    <td style="width: 120px; text-align: center;">Nintendo Switch</td>
                    <td style="width: 133px; text-align: center;">$210.000</td>
                </tr>
                <tr>
                    <td style="width: 194px; text-align: center;">Captain Tsubasa: Rise of New Champions</td>
                    <td style="width: 83px; text-align: center;">Usado</td>
                    <td style="width: 120px; text-align: center;">Nintendo Switch</td>
                    <td style="width: 133px; text-align: center;">$168.000</td>
                </tr>
                <tr>
                    <td style="width: 194px; text-align: center;">Streets of Rage 4</td>
                    <td style="width: 83px; text-align: center;">Nuevo</td>
                    <td style="width: 120px; text-align: center;">Nintendo Switch</td>
                    <td style="width: 133px; text-align: center;">$240.000</td>
                </tr>
                <tr>
                    <td style="width: 194px; text-align: center;">Streets of Rage 4</td>
                    <td style="width: 83px; text-align: center;">Usado</td>
                    <td style="width: 120px; text-align: center;">Nintendo Switch</td>
                    <td style="width: 133px; text-align: center;">$185.000</td>
                </tr>
                <tr>
                    <td style="width: 194px; text-align: center;">Xenoblade Chronicles Definitive Edition</td>
                    <td style="width: 83px; text-align: center;">Nuevo&nbsp;</td>
                    <td style="width: 120px; text-align: center;">Nintendo Switch</td>
                    <td style="width: 133px; text-align: center;">$240.000</td>
                </tr>
                <tr>
                    <td style="width: 194px; text-align: center;">Xenoblade Chronicles Definitive Edition</td>
                    <td style="width: 83px; text-align: center;">Usado</td>
                    <td style="width: 120px; text-align: center;">Nintendo Switch</td>
                    <td style="width: 133px; text-align: center;">$189.000</td>
                </tr>
                <tr>
                    <td style="width: 194px; text-align: center;">Pok&eacute;mon Mundo Misterioso: Equipo de Rescate DX</td>
                    <td style="width: 83px; text-align: center;">Nuevo</td>
                    <td style="width: 120px; text-align: center;">Nintendo Switch</td>
                    <td style="width: 133px; text-align: center;">$230.000</td>
                </tr>
                <tr>
                    <td style="width: 194px; text-align: center;">Pok&eacute;mon Mundo Misterioso: Equipo de Rescate DX</td>
                    <td style="width: 83px; text-align: center;">Usado</td>
                    <td style="width: 120px; text-align: center;">Nintendo Switch</td>
                    <td style="width: 133px; text-align: center;">$165.000</td>
                </tr>
            </tbody>
        </table>
        <p>&nbsp;</p>
        <p><span style="vertical-align: inherit;"><span style="vertical-align: inherit;"><br /><br /></span></span></p>
    </div>`;
  const title = "Listado de precios de los juegos mas top de nintendo switch, nuevos y usados. (Actulización semanal)"
  const url = "http://pikajuegos.com/publicacion/lista-precios-nintendo-switch-actualizada";
  return <Layout meta_title={title} title={title} descripcion={title} meta_url={url}>
    <ReactMarkdown source={html} escapeHtml={false}></ReactMarkdown>
  </Layout>
}