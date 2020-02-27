import React, { useEffect, useRef, useState } from 'react';
import { Menu, MenuItem, Hidden, Icon, IconButton, Tab, Tabs, Typography } from '@material-ui/core';
import { FuseAnimateGroup, FusePageSimple } from '@fuse';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions'
import reducer from './store/reducers';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import Widget6 from './widgets/Widget6';
import Widget7 from './widgets/Widget7';
import Widget8 from './widgets/Widget8';
import Widget9 from './widgets/Widget9';
import Widget10 from './widgets/Widget10';
import WidgetNow from './widgets/WidgetNow';
import WidgetWeather from './widgets/WidgetWeather';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Line } from 'react-chartjs-2';
import Cards from './widgets/Cards'
import PaymentForm from './widgets/PaymentForm'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
    content: {
        '& canvas': {
            maxHeight: '100%'
        }
    },
    selectedProject: {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: '8px 0 0 0'
    },
    projectMenuButton: {
        background: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: '0 8px 0 0',
        marginLeft: 1
    },
}));

const ProjectDashboardApp = (props) => {
    const card = useDispatch(({ auth }) => auth.card);
    console.log(card.success)
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const cardData = { success: true }

    // useEffect(() => {
    //     dispatch(allActions.userActions.setUser(user))
    // }, [])

    if (card.success === true) {
        setOpen(false);
    }

    const initialState = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Monthly Transaction',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    };



    const _this = this;

    setInterval(function () {
        const oldDataSet = initialState.datasets[0];
        const newData = [];

        for (let x = 0; x < initialState.labels.length; x++) {
            newData.push(Math.floor(Math.random() * 100));
        }

        const newDataSet = {
            ...oldDataSet
        };

        newDataSet.data = newData;

        // const newState = {
        //     ...initialState,
        //     datasets: [newDataSet]
        // };

        // _this.setState(newState);
    }, 5000);

    const dispatch = useDispatch();
    const user = useSelector(({ auth }) => auth.user);

    const widgets = useSelector(({ projectDashboardApp }) => projectDashboardApp.widgets);
    const projects = useSelector(({ projectDashboardApp }) => projectDashboardApp.projects);

    const classes = useStyles(props);
    const pageLayout = useRef(null);
    const [tabValue, setTabValue] = useState(0);
    const [selectedProject, setSelectedProject] = useState({
        id: 1,
        menuEl: null
    });


    useEffect(() => {
        dispatch(Actions.getWidgets());
        dispatch(Actions.getProjects());
    }, [dispatch]);

    function handleChangeTab(event, tabValue) {
        setTabValue(tabValue);
    }

    function handleChangeProject(id) {
        setSelectedProject({
            id,
            menuEl: null
        });
    }

    function handleOpenProjectMenu(event) {
        setSelectedProject({
            id: selectedProject.id,
            menuEl: event.currentTarget
        });
    }

    function handleCloseProjectMenu() {
        setSelectedProject({
            id: selectedProject.id,
            menuEl: null
        });
    }

    if (!widgets || !projects) {
        return null;
    }

    return (
        <FusePageSimple
            classes={{
                header: "min-h-160 h-160",
                toolbar: "min-h-48 h-48",
                rightSidebar: "w-288",
                content: classes.content,
            }}
            header={
                <div className="flex flex-col justify-between flex-1 px-24 pt-24">
                    <div className="flex justify-between items-start">
                        <Typography className="py-0 sm:py-24" variant="h4">Welcome back, {user.data.displayName}!</Typography>
                        <Hidden lgUp>
                            <IconButton
                                onClick={(ev) => pageLayout.current.toggleRightSidebar()}
                                aria-label="open left sidebar"
                            >
                                <Icon>menu</Icon>
                            </IconButton>
                        </Hidden>
                    </div>


                </div>
            }
            contentToolbar={
                <Tabs
                    value={tabValue}
                    onChange={handleChangeTab}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="scrollable"
                    scrollButtons="off"
                    className="w-full border-b-1 px-24"
                >
                    <Tab className="text-14 font-600 normal-case" label="Home" />
                    <Tab className="text-14 font-600 normal-case" label="Budget Summary" />
                </Tabs>
            }
            content={
                <div className="p-12">
                    {tabValue === 0 &&
                        (
                            <FuseAnimateGroup
                                className="flex flex-wrap"
                                enter={{
                                    animation: "transition.slideUpBigIn"
                                }}
                            >
                                <div className="widget flex w-full p-12 text-center" style={{ justifyContent: 'center' }}>
                                    <Button onClick={handleOpen} variant="contained" color="primary" className={classes.button}>Add Card</Button>
                                </div>
                                <div>

                                    <Modal
                                        aria-labelledby="transition-modal-title"
                                        aria-describedby="transition-modal-description"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                        open={open}
                                        onClose={handleClose}
                                        closeAfterTransition
                                        BackdropComponent={Backdrop}
                                        BackdropProps={{
                                            timeout: 500,
                                        }}
                                    >
                                        <Fade in={open}>
                                            <div style={{ backgroundColor: 'transparent', padding: '2, 4, 3' }}>
                                                <PaymentForm />
                                            </div>
                                        </Fade>
                                    </Modal>
                                </div>
                                <div className="widget flex w-full" style={{ justifyContent: 'center', display: 'inline-grid' }}> <hr /><Cards /></div>

                                <div className="widget flex w-full p-12">
                                    <Line data={initialState} />
                                </div>
                                <div className="widget flex w-full sm:w-1/2 p-12">
                                    <Widget6 widget={widgets.widget6} />
                                </div>
                                <div className="widget flex w-full sm:w-1/2 p-12">
                                    <Widget7 widget={widgets.widget7} />
                                </div>
                            </FuseAnimateGroup>
                        )}
                    {tabValue === 1 && (
                        <FuseAnimateGroup
                            className="flex flex-wrap"
                            enter={{
                                animation: "transition.slideUpBigIn"
                            }}
                        >
                            <div className="widget flex w-full sm:w-1/2 p-12">
                                <Widget8 widget={widgets.widget8} />
                            </div>
                            <div className="widget flex w-full sm:w-1/2 p-12">
                                <Widget9 widget={widgets.widget9} />
                            </div>
                            <div className="widget flex w-full p-12">
                                <Widget10 widget={widgets.widget10} />
                            </div>
                        </FuseAnimateGroup>
                    )}
                </div>
            }
            rightSidebarContent={
                <FuseAnimateGroup
                    className="w-full"
                    enter={{
                        animation: "transition.slideUpBigIn"
                    }}
                >
                    <div className="widget w-full p-12">
                        <WidgetNow />
                    </div>
                    <div className="widget w-full p-12">
                        <WidgetWeather widget={widgets.weatherWidget} />
                    </div>
                </FuseAnimateGroup>
            }
            ref={pageLayout}
        />
    );
}

export default withReducer('projectDashboardApp', reducer)(ProjectDashboardApp);
