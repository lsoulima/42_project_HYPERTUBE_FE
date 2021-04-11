import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import VisibilityIcon from "@material-ui/icons/Visibility";
import StarIcon from "@material-ui/icons/Star";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import { HyperContext } from "../Context/context";
import { useHistory } from "react-router-dom";
import WatchedList from "./WatchedList";
import FavoriteList from "./FavoriteList";

const LabelImage = styled.label`
  cursor: pointer;
  color: #fff;
  border-radius: 50%;
  input {
    display: none;
  }
  text-align: center;
  img {
    border-radius: 100%;
    width: 150px;
    height: 150px;
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
    height: fit-content;

    @media (max-width: 768px) {
      & {
        height: auto;
      }
    }
  }
  .container {
    padding: 100px 0;
    height: 100%;
    min-height: 90vh;
    width: 100%;
    background: rgba(51, 51, 51, 0.5);
  }
  .paper {
    background-color: rgba(0, 0, 0, 0.75);
    border-radius: 0 0 15px 15px;
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
    margin: 45px 0px;
    background: red;
  }
`;

export default function Settings() {
  const { userInfos } = useContext(HyperContext);
  const [tab, setTab] = useState(0);
  let history = useHistory();

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const TabPanel = (props) => {
    const { children, value, index } = props;

    return (
      <div role='tabpanel' hidden={value !== index}>
        {value === index && <div className='paper'>{children}</div>}
      </div>
    );
  };

  return (
    <Wrapper>
      <div className='container'>
        <Container component='main' maxWidth='sm'>
          <Paper elevation={5}>
            <Tabs
              value={tab}
              onChange={handleChange}
              variant='fullWidth'
              indicatorColor='secondary'
              textcolor='primary'
              TabIndicatorProps={{ style: { background: "red" } }}
              style={{ background: "rgb(8, 7, 8)", color: "white" }}>
              <Tab
                icon={<PersonPinIcon />}
                label='Info'
                style={{ padding: "20px 0" }}
              />
              <Tab
                icon={<VisibilityIcon />}
                label='Watched'
                style={{ padding: "20px 0" }}
              />
              <Tab
                icon={<StarIcon />}
                label='Favorite'
                style={{ padding: "20px 0" }}
              />
            </Tabs>
          </Paper>

          <TabPanel value={tab} index={0}>
            <Typography
              component='h1'
              variant='h5'
              style={{
                fontSize: "40px",
                fontWeight: 600,
                color: "#fff",
              }}>
              {userInfos.username}
            </Typography>
            <form className='form'>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  style={{ margin: "20px 0 20px 0", textAlign: "center" }}>
                  <LabelImage type='file'>
                    <img
                      src={
                        userInfos.profile
                          ? userInfos.profile
                          : "./img/avatar.jpeg"
                      }
                      alt='avatar'
                    />
                  </LabelImage>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <WhiteBorderTextField
                    variant='outlined'
                    defaultValue={userInfos.firstname}
                    margin='normal'
                    fullWidth
                    label='First Name'
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <WhiteBorderTextField
                    variant='outlined'
                    margin='normal'
                    defaultValue={userInfos.lastname}
                    fullWidth
                    label='Last Name'
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className='submit'
                  onClick={() => {
                    history.push("/library");
                  }}>
                  Browse Movies
                </Button>
              </Grid>
            </form>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <WatchedList />
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <FavoriteList />
          </TabPanel>
        </Container>
      </div>
    </Wrapper>
  );
}
