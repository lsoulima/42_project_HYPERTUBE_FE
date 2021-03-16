import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
    background-image: url("./img/net.jpg");
    background-repeat: no-repeat;
    background-position: center;
  }
  .container {
    padding-top: 100px;
    height: 100%;
    width: 100%;
    background: rgba(51, 51, 51, 0.5);
    padding-bottom: 100px;
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

const useStyles = makeStyles((theme) => ({}));

export default function Login() {
  const classes = useStyles();

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
              Sign in
            </Typography>
            <form className="form" noValidate>
              <WhiteBorderTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstname"
                label="First Name"
                name="firstname"
                autoComplete="firstname"
                autoFocus
              />
              <WhiteBorderTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
              />
              <WhiteBorderTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
              />
              <WhiteBorderTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <WhiteBorderTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <WhiteBorderTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="checkpassword"
                label="Retype Password"
                type="password"
                id="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
              >
                Sign Up
              </Button>
              <h4
                style={{
                  color: "#fff",
                  textAlign: "center",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                OR
              </h4>
              <ButtonAuth>
                <i class="lab la-google-plus-g"></i>
                <span>Continue With Goolge</span>
              </ButtonAuth>
              <ButtonAuth>
                <i class="lab la-github"></i>
                <span>Continue With Github</span>
              </ButtonAuth>
              <ButtonAuth>
                <i>42</i>
                <span>Continue With Intra</span>
              </ButtonAuth>
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
            </form>
          </div>
        </Container>
      </div>
    </Wrapper>
  );
}
