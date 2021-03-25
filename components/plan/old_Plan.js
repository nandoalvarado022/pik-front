import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import { Tabs } from 'antd'
import React from 'react'
import PropTypes, { array } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Layout from "../layout/Layout"
// import SwipeableViews from 'react-swipeable-views'
import './plan.scss'
import Btn from '../btn/Btn'
// import Chat from './Chat'
// import Multimedia from './Multimedia'
// import socketIOClient from 'socket.io-client'
import Destino from './Destino'
import Functions from '../../lib/functions'
// Data
const TabPane = Tabs.TabPane;

const styles = theme => ({
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    direction: "rtl"
});

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

class Plan extends React.Component {
    state = {
        value: 0,
        conversation_list: [
            { picture: "user1.jpg", name: "Paula", text: "Ullamco sint commodo 🤓😅 fugiat ipsum." },
        ],
        wantToSpeak: false,
        avalibleUsers: [],
        participantes: []
    }

    componentDidMount() {
        this.props;
    }

    handleWantToSpeak = (e) => {
        this.setState({ wantToSpeak: true })
        e.preventDefault();
        /*
        var iosocket = socketIOClient("/");
        this.setState({wantToSpeak: true});
        let name = prompt ("Digite nombre", "Developer User");
        // let sala = prompt ("Digite sala", "Sala 1");
        iosocket.emit('signIn', {
            userName: name,
            channelName: "sala1"
        });

        iosocket.on('signIn', (params) => {
            let newArray = this.state.listUsers;
            newArray.push(params);
            this.setState({listUsers: newArray})
        });*/
    }

    handleChange = (event, newValue) => {
		// setValue(newValue);
		this.setState({
			value: newValue
		})
	}

    a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    render() {
        const { title, image, by, date } = this.props.dataPlan;
        const { classes, direction } = this.props;
        const { value, participantes } = this.state;
        let online_users = ["user1.jpg", "user2.jpg", "user3.jpg", "user4.jpg", "user5.jpg", "user1.jpg", "user2.jpg", "user3.jpg", "user4.jpg", "user5.jpg"];
        return <div>
            <AppBar position="static">
                <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
                    <Tab label="Item One" {...this.a11yProps(0)} />
                    <Tab label="Item Two" {...this.a11yProps(1)} />
                    <Tab label="Item Three" {...this.a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={this.state.value} index={0}>
                Item One
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={this.state.value} index={2}>
                Item Three
            </TabPanel>
        </div>

        return (<Layout title={title}>
            <div id="view_Plan">
                <div className="content">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Destino" key="1" className="tab1">
                            <Destino image={image} by={by} date={date} />
                        </TabPane>

                        <TabPane tab="Combo" key="2" className="tab2">
                            <div id="online_users">
                                <div className="title font-b">
                                    Personas que irán
                                </div>
                                <div className="list">
                                    {
                                        this.state.participantes.map((persona, ind) => {
                                            return <div>
                                                <img key={ind} className="radius" src={persona.picture} />
                                            </div>
                                        })
                                    }
                                </div>

                                {!this.state.wantToSpeak &&
                                    <div className="t-center m-t-10">
                                        <Btn className="green small" onClick={this.handleWantToSpeak} text="Abrir sala" />
                                    </div>
                                }

                                {/* { this.state.wantToSpeak && <Chat eventName="Salida a cocorollo" /> } */}
                            </div>
                        </TabPane>

                        <TabPane tab="Multimedia" key="3" className="tab3">
                            Estamos trabajando en esto
                            {/* <Multimedia /> */}
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </Layout>
        )
    }
}

export default withStyles(styles)(Plan);