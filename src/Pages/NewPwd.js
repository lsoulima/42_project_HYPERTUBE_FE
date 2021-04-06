import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import { newPwd } from "../services/auth";
import { useForm } from "react-hook-form";
import Alert from "@material-ui/lab/Alert";
import { Snackbar, Box } from "@material-ui/core";

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

export default function NewPassword() {
  const [state, Setstate] = useState({});
  const { register, handleSubmit, errors } = useForm();
  const [open, setOpen] = useState(false);
  const [newPwdData, setNewPwdData] = useState({
    token: null,
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const aToken = window.location.search.split("=")[1];
  let history = useHistory();
  const onSubmit = async (data) => {
    const responce = await newPwd(data, aToken);
    Setstate(responce);
    setOpen(true);
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
              New Password
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
                name='newpassword'
                label='NewPassword'
                type='password'
                id='newpassword'
                autoComplete='current-password'
                inputRef={register({
                  required: "You must provide your Password!",
                })}
              />
              {errors.newpassword && (
                <Box variant='filled' color='red' style={{ fontSize: "12px" }}>
                  {errors.newpassword.message}
                </Box>
              )}
              <WhiteBorderTextField
                variant='outlined'
                margin='normal'
                fullWidth
                name='confirmpassword'
                label='Confirm_Password'
                type='password'
                id='confirmpassword'
                autoComplete='current-password'
                inputRef={register({
                  required: "You must Confirm your Password!",
                })}
              />
              {errors.confirmpassword && (
                <Box variant='filled' color='red' style={{ fontSize: "12px" }}>
                  {errors.confirmpassword.message}
                </Box>
              )}

              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className='submit'>
                Confirm
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
                      history.push("/login");
                    }}>
                    {"Sign In"}
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
          </div>
        </Container>
      </div>
    </Wrapper>
  );
}
