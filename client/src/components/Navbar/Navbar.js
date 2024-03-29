import React, {useState, useEffect} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import memories from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';
import useStyles from './styles'
import storiess from "../../images/Capture-removebg-preview.png";


const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [ user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const logout = () => {
      dispatch({type: "LOGOUT"});
      history.push('/')
      setUser(null)
    }
    useEffect(() => {
        const token = user?.token;

        //JWT
        if(token) {
          const decodedToken = decode(token);

          if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

          setUser(JSON.parse(localStorage.getItem('profile')))

    }, [location])

    const gotoauth = () => {
      history.push('/auth')
    }

  return (
 <AppBar className={classes.appBar} position="static" color = "inherit">
  <Link to="/" className={classes.brandContainer} >
    <img src={storiess} alt= "icon" height = "95px"/>
  </Link>
  <Toolbar className={classes.toolbar} >
      { user ? (
          <div className={classes.profile} >
              <Avatar className={classes.purple} alt = {user.result.name} src= {user.result.imageUrl} > {user.result.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant = "h6"> {user.result.name}</Typography>
              <Button variant='contained' color='secondary' onClick={logout}>Logout</Button>
          </div>
      ): (
          <Button component= {Link} to = "/auth" onClick={gotoauth} variant='contained' color='primary'>Sign In</Button>
      )}
  </Toolbar>

</AppBar>
  )
}

export default Navbar