import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Carousel from "react-elastic-carousel";
import axios from "axios";
import { HyperContext } from "../Context/context";
import { Typography } from "@material-ui/core";

const MyCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 350px;
  width: 100%;
  margin: 15px;

  position: relative;
  border: 5px solid #fff;
  transition: all 0.8s;
  .backHover {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  &:hover .backHover {
    background: rgba(54, 54, 54, 0.7);
    box-shadow: 0px 0px 50px -25px rgba(255, 0, 0, 0.5);
  }
  &:hover {
    transform: scale(1.05);
    transition: all 0.7s;
    border: 5px solid #ffffff;
  }
  &:hover .backHover {
    opacity: 1;
  }
  &:hover .eye {
    z-index: 100;
  }
  .backHover {
    opacity: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    .mvName {
      width: 100%;
      color: #fff;
      padding: 10px;
      text-align: center;
      background: url("./img/mask-title.png");
      h4,
      h6 {
        text-shadow: 0 0 10px rgb(0 0 0 / 60%);
      }
    }
    .imdbPlace {
      margin: 5px;
      width: 40px;
      height: 30px;
      background: red;
      align-self: flex-start;
      border-radius: 10px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      h6 {
        font-family: ui-sans-serif;
        color: #fff;
        font-size: 15px;
      }
    }
    .watch {
      position: relative;
      text-align: center;
      .watchBtn {
        width: 100px;
        padding: 10px;
        border: 2px solid red;
        color: white;
      }
      .test1 {
        height: 2px;
        width: 50px;
        background: red;
        position: absolute;
        top: 50%;
        left: -40%;
      }
      .test2 {
        height: 2px;
        width: 50px;
        background: red;
        position: absolute;
        top: 50%;
        right: -40%;
      }
    }
  }
  .eye {
    position: absolute;
    top: 0;
    right: 10px;
    color: #ffe600;
    font-size: 30px;
  }
`;

const Container = styled.div`
  background: ${(props) => props.theme.background};
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  background: ${(props) => props.theme.cards};
  height: 60%;
  flex-basis: 18%;
  min-width: 150px;
  border-radius: 30px;
  box-shadow: 0px 0px 18px #cdcdcd;
  padding-top: 100px;
  /* margin: 0px 20px; */

  h1 {
    margin-top: 40px;
    font-size: 30px;
    font-weight: 700;
    line-height: 64px;
    letter-spacing: -1px;
    word-wrap: break-word;
    color: ${(props) => props.theme.text};
  }
`;

const MovieList = styled.div`
  /* background: green; */
  flex-basis: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* margin: 40px; */
  .watchedList,
  .favouriteList {
    background: ${(props) => props.theme.cards};
    width: 100%;
    height: 450px;
    margin: 20px;
    display: flex;
    align-items: center;
    border-radius: 30px;
    box-shadow: 0px 0px 18px #cdcdcd;

    .rec.rec-arrow {
      box-sizing: border-box;
      -webkit-transition: all 0.3s ease;
      transition: all 0.3s ease;
      font-size: 1.6em;
      background: none;
      color: ${(props) => props.theme.text};
      border: none;
      padding: 0;
      width: 20px;
      /* height: 0; */
      min-width: 20px;
      line-height: 50px;
      -webkit-align-self: center;
      -ms-flex-item-align: center;
      align-self: center;
      cursor: pointer;
      outline: none;
      border-radius: 0;
    }
  }
`;
const Avatar = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100%;
`;

export default function Profile() {
  return (
    <Container>
      <MovieList>
        <div className="favouriteList">
          <Carousel
            breakPoints={breakPoints}
            pagination={false}
            // showArrows={false}
            enableMouseSwipe
            enableAutoPlay
            autoPlaySpeed={1500}
          >
            {movies.map((movie, id) => (
              <MyCard
                key={id}
                onMouseEnter={() => toggleHover(true)}
                onMouseLeave={() => toggleHover(false)}
              >
                <img
                  src={movie.poster_big}
                  width="100%"
                  height="100%"
                  alt="cover"
                />

                <div className="eye ">
                  <i className="las la-star  animate__animated animate__tada animate__infinite"></i>
                </div>
                <div className="backHover">
                  <div className="imdbPlace">
                    <h6>{movie.rating}</h6>
                  </div>
                  <div className="watch">
                    <div
                      className={
                        hovered
                          ? "watchBtn animate__animated  animate__backInDown animate__faster"
                          : "watchBtn"
                      }
                    >
                      Watch
                    </div>
                    <div
                      className={
                        hovered
                          ? "test1 animate__animated  animate__backInLeft animate__faster"
                          : "test1"
                      }
                    ></div>
                    <div
                      className={
                        hovered
                          ? "test2 animate__animated  animate__backInRight animate__faster"
                          : "test2"
                      }
                    ></div>
                  </div>
                  <div className="mvName">
                    <h4>{movie.title}</h4>
                    <h6>{movie.year}</h6>
                  </div>
                </div>
              </MyCard>
            ))}
          </Carousel>
        </div>
      </MovieList>
    </Container>
  );
}
