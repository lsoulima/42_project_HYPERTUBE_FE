import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import styled from "styled-components";

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
    background: url("./img/net.jpg") no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

    /* Set up proportionate scaling */
    width: 100%;
    height: 100%;
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

const useStyles = makeStyles((theme) => ({}));

export default function Login() {
  const classes = useStyles();
  let history = useHistory();

  return (
    <Wrapper>
      <div className="container">
        <Container component="main" maxWidth="xs">
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
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
              >
                Sign In
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
                <i className="lab la-google-plus-g"></i>
                <span>Continue With Goolge</span>
              </ButtonAuth>
              <ButtonAuth>
                <i className="lab la-github"></i>
                <span>Continue With Github</span>
              </ButtonAuth>
              <ButtonAuth>
                <i>42</i>
                <span>Continue With Intra</span>
              </ButtonAuth>
              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    style={{ color: "#fff" }}
                    onClick={() => {
                      history.push("/forgotpswd");
                    }}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    style={{ color: "#fff" }}
                    onClick={() => {
                      history.push("/register");
                    }}
                  >
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
