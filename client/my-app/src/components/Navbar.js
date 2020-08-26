import React, { useState, useEffect } from "react";
import client from "../config/config";
import Modal from "../components/Modal";
import Menu from "@material-ui/core/Menu";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { GET_CACHE_USER } from "../query/cacheQuery";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    // color: 'blue'
  },
  title: {
    display: "none",
    // color: 'blue',
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    // color: "blue",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const Navbar = () => {
  const { pathname } = useLocation();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [modalShow, setModalShow] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const menuId = "primary-search-account-menu";

  /** START STATE YANG DIGUNAKAN */
  const [isLoggedIn, setIsLoggedIn] = useState(null); // check Login
  const [updatedSubsStatus, setUpdatedStatus] = useState();
  const [checkedSubsStatus, setCheckedSubsStatus] = useState(null); // Buat ngerubah value di switch
  const [updateSubs, setUpdateSubs] = useState({
    access_token: localStorage.getItem("access_token"),
    subsStatus: false,
  }); // Ini buat onSubmit yang dikirim ke server

  /** END STATE YANG DIGUNAKAN */

  /** ============= START FUNGSI UPDATE DARI LUQMAN ================ */
  const [userInfo, setUserInfo] = useState({
    userName: "",
    subsStatus: false,
  });
  const { cacheUser } = client.readQuery({
    query: GET_CACHE_USER,
  });

  useEffect(() => {
    if (cacheUser) {
      const { userNameCache, subsStatusCache } = cacheUser;
      setUserInfo({
        ...userInfo,
        userName: userNameCache,
        subsStatus: subsStatusCache,
      });
      setCheckedSubsStatus(subsStatusCache);
    }
  }, [cacheUser, userInfo]);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setUpdateSubs({ ...updateSubs, [name]: checked });
  };

  useEffect(() => {
    checkLoggedIn();
  });

  const checkLoggedIn = () => {
    localStorage.getItem("access_token");
    if ("access_token") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const toggleChecked = (e) => {
    const { name, checked } = e.target;
    setUpdateSubs({ ...updateSubs, [name]: checked });
    // setCheckedSubsStatus()
  };

  /** ============= END FUNGSI UPDATE DARI LUQMAN ================ */

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

<<<<<<< HEAD
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuClose}>woqeiqwopeiwqpopqoweiqwopeipoqwiepqo</MenuItem>
    </Menu>
  );
=======
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
>>>>>>> development

  const renderMenu = (
    <>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <div className="row">
          <MenuItem onClick={handleMenuClose}>
            <div className="col-sm-12">
              <span>You re signed in as</span>
            </div>
<<<<<<< HEAD
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>


              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
=======
            <div className="col-sm-8">
              <span>{userInfo.userName}</span>
>>>>>>> development
            </div>
          </MenuItem>
        </div>

        <div className="row justify content center">
          <MenuItem onClick={handleMenuClose}>
            <FormControlLabel
              control={
                <Switch checked={checkedSubsStatus} onChange={toggleChecked} />
              }
              label="Normal"
            />
            {/* {updatedStatus ? <Button>Save changes!</Button> : null} */}
          </MenuItem>
        </div>
      </Menu>
    </>
  );

  if (pathname !== "/login" && pathname !== "/register") {
    return (
      <>
        <div className={classes.grow}>
          <Modal show={modalShow} onHide={() => setModalShow(false)}></Modal>
          <AppBar
            position="absolute"
            style={
              pathname === "/"
                ? {
                    background: "transparent",
                    boxShadow: "none",
                    color: "blue",
                  }
                : {
                    background: "transparent",
                    boxShadow: "none",
                    color: "black",
                  }
            }
          >
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              ></IconButton>
              <Typography className={classes.title} variant="h6" noWrap>
                Smart-Fly
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>{/* <SearchIcon /> */}</div>
                {pathname !== "/" ? (
                  <Button
                    onClick={() => setModalShow(true)}
                    variant="outlined"
                    color="primary"
                  >
                    New Search
                  </Button>
                ) : null}
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle style={{ fontSize: 40 }} />
                </IconButton>
              </div>
            </Toolbar>
            {/* {isLoggedIn ? renderMenu : null} */}
            {renderMenu}
          </AppBar>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default Navbar;
