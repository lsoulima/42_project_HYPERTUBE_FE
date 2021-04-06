import React, { useState, useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useHistory, Redirect } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import { loginAction } from "../services/auth";
import { useForm } from "react-hook-form";
import Alert from "@material-ui/lab/Alert";
import { Snackbar, Box } from "@material-ui/core";
import { HyperContext } from "../Context/context";

const API_URL = "http://localhost:3001/api/users/";

const ButtonAuth = styled.button`
  width: 100%;
  height: 36px;
  padding: 6px 16px 6px 16px;
  position: relative;
  margin-bottom: 20px;
  :hover {
    cursor: pointer;
  }

  i {
    position: absolute;
    left: 20px;
    font-size: 20px;
    margin: auto;
  }
  @media (max-width: 425px) {
    span {
      display: none;
    }
    i {
      font-size: 20px;
      position: absolute;
      left: 45%;
      top: 15%;
    }
  }
`;

const LinkBtn = styled.div`
  width: 100%;
  height: 36px;
  padding: 6px 16px 6px 16px;
  position: relative;
  margin-bottom: 20px;
  :hover {
    cursor: pointer;
  }

  i {
    position: absolute;
    left: 20px;
    font-size: 20px;
    margin: auto;
  }
  @media (max-width: 425px) {
    span {
      display: none;
    }
    i {
      font-size: 20px;
      position: absolute;
      left: 45%;
      top: 15%;
    }
  }
`;

const WhiteBorderTextField = styled(TextField)`
  & .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline {
    border-color: #fff !important;
  }
  & .MuiOutlinedInput-notchedOutline {
    border-color: #fff;
  }
  & label.Mui-focused {
    color: #fff;
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #fff;
    }
  }
  label {
    color: #fff !important;
    font-size: 13px;
  }
  input:hover {
    border-color: red !important;
  }
  input {
    border-color: #fff;
    color: #fff;
  }
`;

const Wrapper = styled.div`
  & {
    background: url("./img/net.jpg") no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

    /* Set up proportionate scaling */
    width: 100%;
    height: 100%;
    @media (max-width: 768px) {
      height: auto;
    }
  }
  .container {
    padding-top: 100px;
    height: 100%;
    min-height: 100%;
    width: 100%;
    background: rgba(51, 51, 51, 0.5);
  }
  .paper {
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 15px;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .avatar {
    margin: 50px;
    background-color: red;
  }
  .form {
    width: 100%; // Fix IE 11 issue.
  }
  .submit {
    margin: theme.spacing(3, 0, 2);
    background: red;
  }
`;

export default function Login() {
  const { dispatch } = useContext(HyperContext);
  const [state, Setstate] = useState({});
  const { register, handleSubmit, errors } = useForm();
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  let history = useHistory();
  const onSubmit = async (data) => {
    const responce = await loginAction(data, dispatch);
    Setstate(responce);
    setOpen(true);
    if (responce.success === true) {
      history.replace("/library");
    }
  };

  return (
    <Wrapper>
      <div className='container'>
        <Container component='main' maxWidth='xs'>
          <div className='paper'>
            <Typography
              component='h1'
              variant='h5'
              style={{
                alignSelf: "start",
                fontSize: "40px",
                fontWeight: 600,
                color: "#fff",
              }}>
              Sign in
            </Typography>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}>
              {state.success === true ? (
                <Alert
                  onClose={handleClose}
                  severity='success'
                  variant='filled'>
                  {state.message}
                </Alert>
              ) : (
                <Alert onClose={handleClose} severity='error' variant='filled'>
                  {state.error}
                </Alert>
              )}
            </Snackbar>
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
              <WhiteBorderTextField
                variant='outlined'
                margin='normal'
                fullWidth
                id='username'
                label='username'
                name='username'
                autoComplete='username'
                autoFocus
                inputRef={register({
                  required: "You must provide your username to login!",
                })}
              />
              {errors.username && (
                <Box variant='filled' color='red' style={{ fontSize: "12px" }}>
                  {errors.username.message}
                </Box>
              )}
              <WhiteBorderTextField
                variant='outlined'
                margin='normal'
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                inputRef={register({
                  required: "You must provide your Password to login!",
                })}
              />
              {errors.password && (
                <Box variant='filled' color='red' style={{ fontSize: "12px" }}>
                  {errors.password.message}
                </Box>
              )}

              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className='submit'>
                Sign In
              </Button>
              <h4
                style={{
                  color: "#fff",
                  textAlign: "center",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}>
                OR
              </h4>
              <Grid container>
                <Grid item xs>
                  <Link
                    href='#'
                    variant='body2'
                    style={{ color: "#fff" }}
                    onClick={() => {
                      history.push("/forgetpwd");
                    }}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href='#'
                    variant='body2'
                    style={{ color: "#fff" }}
                    onClick={() => {
                      history.push("/register");
                    }}>
                    {"Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
            <Grid style={{ margin: "10px" }}>
              <Link href={`${API_URL}/auth/42`}>
                <i>42</i>
                <span>Continue With Intra</span>
              </Link>
              {/* <Link href={`${API_URL}/auth/`}>
                <i className='lab la-google-plus-g'></i>
                <span>Continue With Google</span>
              </Link>
              <Link>
                <i className='lab la-github'></i>
                <span>Continue With Github</span>
              </Link> */}
            </Grid>
          </div>
        </Container>
      </div>
    </Wrapper>
  );
}
