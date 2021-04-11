import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { Box, Snackbar } from "@material-ui/core";
import { useForm } from "react-hook-form";

import { registerAction } from "../services/auth";

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
  .MuiBox-root.MuiBox-root-15 {
    margin-bottom: 20px;
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
    height: fit-content;
    width: 100%;
    @media (max-width: 768px) {
      height: auto;
    }
  }
  .container {
    padding: 100px 0;
    min-height: 90vh;
    height: 100%;
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
    margin: 25px 0px;
    background: red;
  }
`;

export default function Register() {
  const [state, Setstate] = useState({});
  const { register, handleSubmit, errors } = useForm();
  const [open, setOpen] = useState(false);
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  let history = useHistory();
  const onSubmit = async (data) => {
    let registerData = data;
    const responce = await registerAction(registerData);
    Setstate(responce);
    setOpen(true);
    if (responce.success === true) {
      history.push("/login");
    }
  };

  return (
    <Wrapper>
      <div className="container">
        <Container component="main" maxWidth="sm">
          <div className="paper">
            <Typography
              component="h1"
              variant="h5"
              style={{
                alignSelf: "start",
                fontSize: "40px",
                fontWeight: 600,
                color: "#fff",
              }}
            >
              Sign Up
            </Typography>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              {state.success === true ? (
                <Alert
                  onClose={handleClose}
                  severity="success"
                  variant="filled"
                >
                  {state.message}
                </Alert>
              ) : (
                <Alert onClose={handleClose} severity="error" variant="filled">
                  {state.error}
                </Alert>
              )}
            </Snackbar>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <WhiteBorderTextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="firstname"
                    label="First Name"
                    name="firstname"
                    autoComplete="firstname"
                    autoFocus
                    inputRef={register({
                      required: "You must provide your firstname!",
                      pattern: {
                        value: /^[a-zA-Z]{3,20}$/,
                        message:
                          "The firstname must contain between 3 and 20 letters !",
                      },
                    })}
                  />
                  {errors.firstname && (
                    <Box
                      variant="filled"
                      color="red"
                      style={{ fontSize: "12px" }}
                    >
                      {errors.firstname.message}
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <WhiteBorderTextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="lastname"
                    label="Last Name"
                    name="lastname"
                    inputRef={register({
                      required: "You must provide your lastname!",
                      pattern: {
                        value: /^[a-zA-Z]{3,20}$/,
                        message:
                          "The lastname  must contain between 3 and 20 letters !",
                      },
                    })}
                  />
                  {errors.lastname && (
                    <Box
                      variant="filled"
                      color="red"
                      style={{ fontSize: "12px" }}
                    >
                      {errors.lastname.message}
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <WhiteBorderTextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    min={3}
                    max={20}
                    id="username"
                    label="User Name"
                    name="username"
                    inputRef={register({
                      required: "You must provide your username!",
                      pattern: {
                        value: /^[a-z]+(([-_.]?[a-z0-9])?)+$/,
                        message:
                          "The username must contain between 3 and 20 letters or numbers (-, _ or.) !",
                      },
                    })}
                  />
                  {errors.username && (
                    <Box
                      variant="filled"
                      color="red"
                      style={{ fontSize: "12px" }}
                    >
                      {errors.username.message}
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <WhiteBorderTextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    inputRef={register({
                      required: "You must provide your email!",
                      pattern: {
                        value: /[a-zA-Z0-9-_.]{1,50}@[a-zA-Z0-9-_.]{1,50}\.[a-z0-9]{2,10}$/,
                        message: "Invalid email address !",
                      },
                    })}
                  />
                  {errors.email && (
                    <Box
                      variant="filled"
                      color="red"
                      style={{ fontSize: "12px" }}
                    >
                      {errors.email.message}
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <WhiteBorderTextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    inputRef={register({
                      required: "You must provide your password!",
                      pattern: {
                        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,}$/,
                        message:
                          "Password must be at least eight characters long, at least one uppercase letter, one lowercase letter, one number and one special character !",
                      },
                    })}
                  />
                  {errors.password && (
                    <Box
                      variant="filled"
                      color="red"
                      style={{ fontSize: "12px" }}
                    >
                      {errors.password.message}
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <WhiteBorderTextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="confirmpassword"
                    label="Retype Password"
                    type="password"
                    id="confirmpassword"
                    inputRef={register({
                      required: "You must confirm your password!",
                    })}
                  />
                  {errors.confirmpassword && (
                    <Box
                      variant="filled"
                      color="red"
                      style={{ fontSize: "12px" }}
                    >
                      {errors.confirmpassword.message}
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="submit"
                  >
                    Sign Up
                  </Button>
                </Grid>
                <Grid container>
                  <Grid
                    item
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "100%",
                    }}
                  >
                    <Link to="/login" style={{ color: "#fff" }}>
                      Sign In
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      </div>
    </Wrapper>
  );
}
