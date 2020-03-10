import React, {useEffect, useRef} from 'react';
import {FusePageSimple} from '@fuse';
import {useDispatch, useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import CardList from 'app/main/apps/dashboards/project/widgets/Cards.js';
import PaymentForm from 'app/main/apps/dashboards/project/widgets/PaymentForm.js'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import './App.css';
import Logo from 'app/fuse-layouts/shared-components/Logo';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        backgroundColor: 'white',
        color: 'rgb(0, 116, 224)'
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

const FileManagerApp = (props) =>
{
    const dispatch = useDispatch();
    const files = useSelector(({fileManagerApp}) => fileManagerApp.files);

    useEffect(() => {
        dispatch(Actions.getFiles());
    }, [dispatch]);
    const classes = useStyles(props);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <FusePageSimple
            classes={{
                root         : "bg-red",
                sidebarHeader: "h-96 min-h-96 sm:h-160 sm:min-h-160",
                rightSidebar : "w-320"
            }}
            content={
                <div style={{backgroundColor: 'rgb(0, 116, 224)'}}>
                <div className="" style={{backgroundColor: 'white', width: '100%', height: '200px', borderRadius: '0px 0px 110px 110px', textAlign: 'center', color: 'rgb(0, 116, 224)'}}>
                    <h1 style={{fontSize: '40px', paddingTop: '50px', fontWeight: '900'}}>CARDS</h1>
                </div>
                <div className="card 1">
                    <div className="card_image"> <Logo /> </div>
                   <div className="widget flex w-full p-12 text-center" style={{ justifyContent: 'center'}}>
                                    <Button onClick={handleOpen} variant="contained" color="primary" className={classes.button}>Add Card</Button>
                                </div>
                <div className="flex items-center justify-between" style={{display: 'inline-block'}}>
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
                </div>
                </div>
                 <div className="widget flex w-full" style={{ justifyContent: 'center', display: 'inline-grid',margin: '180px auto' }}> <hr /><CardList /></div>
                 </div>
            }
        />
    )
}

export default withReducer('fileManagerApp', reducer)(FileManagerApp);
