import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import {Dropdown} from "react-bootstrap";
import png from "../assets/icons/user.png";
import * as React from "react";
import {styled} from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import {useDispatch, useSelector} from "react-redux";
import {selectUser, USER_LOADING_REQUEST, USER_LOGOUT_SUCCESS} from "../features/user/userSlice";
import {useNavigate} from "react-router-dom";

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: 240,
        width: `calc(100% - ${240}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

function Header(){

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const userAccount = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        dispatch(USER_LOADING_REQUEST());
        localStorage.removeItem("token");
        await delay(500);
        dispatch(USER_LOGOUT_SUCCESS());
    };

    const handleProfile = () => {
        navigate(`/profile/${userAccount.userAccountInfor.UserId}`);
    };

    const handleChangePassword = () => {
        navigate(`/changePassword/${userAccount.userAccountInfor.UserId}`);
    };

    return(
        <AppBar position="absolute" open={open}>
            <Toolbar
                sx={{
                    pr: '24px', // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1 }}
                >
                    Dashboard
                </Typography>
                <IconButton color="inherit">
                    <Dropdown className="nav-item dropdown no-arrow">
                        <Dropdown.Toggle className="nav-link dropdown-toggle "
                                         id="userDropdown"
                                         style={{height:"40px", width:"40px"}}>
                            <img className="img-profile rounded-circle" style={{height:"25px", width:"25px"}}
                                 src={png}/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleProfile()}>
                                <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                Profile
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleChangePassword()}>
                                <i class="fas fa-lock fa-sm fa-fw mr-2 text-gray-400"></i>
                                Change password
                            </Dropdown.Item>
                            <Dropdown.Item href="/" onClick={() => handleLogout()}>
                                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Header