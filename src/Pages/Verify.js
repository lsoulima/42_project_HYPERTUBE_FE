import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";

import { useHistory } from "react-router-dom";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import { verifyAccount } from "../services/auth";

import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

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
    margin: 25px 0px;
    background: red;
  }
`;

export default function Verify() {
  const [state, setState] = useState({});
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const aToken = window.location.search.split("=")[1];
  useEffect(() => {
    const onVerify = async () => {
      const responce = await verifyAccount(aToken);
      setState(responce);
      setOpen(true);
    };
    onVerify();
  }, []);

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
              {state.message}
            </Typography>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={open}
              autoHideDuration={3000}
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
            <form className="form">
              <Button
                href="/login"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
              >
                login
              </Button>

              <h4
                style={{
                  color: "#fff",
                  textAlign: "center",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              ></h4>
            </form>
          </div>
        </Container>
      </div>
    </Wrapper>
  );
}
