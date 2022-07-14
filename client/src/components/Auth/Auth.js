import React, { useState, useEffect  } from 'react'
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import useStyles from './styles';
import { GoogleLogin } from 'react-google-login'
import { useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { signup, signin} from '../../actions/auth'
import Input from './input';
import Icon from './icon'
import { gapi } from "gapi-script";

const initialState = {firstName :"", lastName : "", email : "", password : "" , confirmPassword: "" }

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup , setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const [fomData, setFormData] = useState(initialState);
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword )
    const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignup) {
            dispatch(signup(fomData, history))
        }else {
            dispatch(signin(fomData, history))
        }
        console.log("the formData: " , fomData)
    }
    const handleChange = (e) => {
      setFormData({ ...fomData, [e.target.name]: e.target.value})
    }
    const switchMode = () => {
        setIsSignup((prevIsSignup) =>  !prevIsSignup);
        setShowPassword(false)
    }
    useEffect(() => {
        function start() {
        gapi.client.init({
        clientId:"1006431482588-ef2e6ihcpekd787egfbirgfhqnssphgq.apps.googleusercontent.com",
        scope: 'email',
          });
           }
          gapi.load('client:auth2', start);
           }, []);

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type: "AUTH", data: { result, token }});
            history.push('/')
        } catch (error) {
            console.log("error in googlesuccess function---" , error);
        }
        console.log(res);
    }
    const googleFailure = (error) => {
        console.log(error)
        console.log("Google Sign In was unSuccessful. Try agian")
    }

  return (
    <Container component= "main"  maxWidth= "xs" > 
        <Paper className={classes.paper} elevation = {4}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignup? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit= {handleSubmit}>
                <Grid container spacing= {2}>
                    {
                        isSignup && (
                            <>
                                <Input name = "firstName" label = "First Name" handleChange={handleChange} autoFocus half/>
                         
                                <Input name = "lastName" label = "Last Name" handleChange={handleChange}  half/>
                            </>
                        )}
                        <Input name= "email" label= "Email Address" handleChange= {handleChange} type = "email" />
                        <Input name= "password" label= "password" handleChange= {handleChange} type = {showPassword ? "text" : "password"} handleShowPassword = {handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label = "Repeat Password" handleChange = {handleChange} type = "password"/>}
                </Grid>
                <Button type= "submit" fullWidth variant = "contained" color= "primary" className={classes.submit}>
                        {isSignup ? "Sign Up" : "Sign In"}
                </Button>
           
                <GoogleLogin
                    clientId='1006431482588-ef2e6ihcpekd787egfbirgfhqnssphgq.apps.googleusercontent.com'
                    render={(renderProps) => (
                        <Button 
                        className = { classes.googleButton} color = "primary" 
                        fullWidth
                         onClick= {renderProps.onClick} 
                        disabled = {renderProps.disabled} 
                        startIcon= {<Icon />} 
                        variant = "contained">
                            Google Sign In
                        </Button>
                    )}
                    onSuccess= {googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy = "single_host_origin"
                />
                <Grid container justifyContent='flex-end'>
                        <Grid item >
                            <Button onClick={switchMode}>
                                { isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up "}
                            </Button>
                        </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth