import Club from '../../components/club/Club'

export default class extends React.Component {
    static async getInitialProps(context, Funciones) {
        let id_club = context.query.id
        const club = await Funciones.getClub({ id_club, logUsuarios: true })
        const obj = {
            club: id_club
        }
        const feed = await Funciones.getFeed(obj)
        return { club, feed }
    }

    render() {
        // return <div></div>
        return <Club feed={this.props.feed} club={this.props.club[0]} />
    }
}