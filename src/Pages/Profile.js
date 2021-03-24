import React, { useState } from "react";
import styled from "styled-components";
import Carousel from "react-elastic-carousel";

const movies = [
  {
    Name: "Nature Unleashed: Avalanche",
    Year: "2004",
    Cover:
      "https://img.yts.mx/assets/images/movies/nature_unleashed_avalanche_2004/large-cover.jpg",
    isWatched: true,
    imdbRating: "3.7",
    imdbCode: "tt0363448",
  },
  {
    Name: "Summer Daydream",
    Year: "2018",
    Cover:
      "https://yts.mx/assets/images/movies/summer_daydream_2018/large-cover.jpg",
    isWatched: true,
    imdbRating: "8.1",
    imdbCode: "tt4940526",
  },
  {
    Name: "Children of the Tsunami",
    Year: "2012",
    Cover:
      "https://yts.mx/assets/images/movies/children_of_the_tsunami_2012/large-cover.jpg",
    isWatched: false,
    imdbRating: "5.6",
    imdbCode: "tt2368687",
  },
  {
    Name: "7 ore per farti innamorare",
    Year: "2020",
    Cover:
      "https://yts.mx/assets/images/movies/7_ore_per_farti_innamorare_2020/large-cover.jpg",
    isWatched: true,
    imdbRating: "5.9",
    imdbCode: "tt10814876",
  },
  {
    Name: "Back to the 90s",
    Year: "2015",
    Cover:
      "https://yts.mx/assets/images/movies/back_to_the_90s_2015/large-cover.jpg",
    isWatched: true,
    imdbRating: "6.5",
    imdbCode: "tt4556700",
  },
  {
    Name: "U2's Beautiful Day",
    Year: "2002",
    Cover:
      "https://yts.mx/assets/images/movies/u2s_beautiful_day_2002/large-cover.jpg",
    isWatched: false,
    imdbRating: "8.7",
    imdbCode: "tt0339832",
  },
  ,
  {
    Name: "The Poker House",
    Year: "2008",
    Cover:
      "https://yts.mx/assets/images/movies/the_poker_house_2008/large-cover.jpg",
    isWatched: false,
    imdbRating: "6.4",
    imdbCode: "tt1014806",
  },
  ,
  {
    Name: "TFW NO GF",
    Year: "2020",
    Cover: "https://yts.mx/assets/images/movies/tfw_no_gf_2020/large-cover.jpg",
    isWatched: false,
    imdbRating: "5.9",
    imdbCode: "tt11602648",
  },
  ,
  {
    Name: "Alone in the Dark",
    Year: "1982",
    Cover:
      "https://yts.mx/assets/images/movies/alone_in_the_dark_1982/large-cover.jpg",
    isWatched: false,
    imdbRating: "6.1",
    imdbCode: "tt0083542",
  },
  ,
  {
    Name: "Cabras da Peste",
    Year: "2021",
    Cover:
      "https://yts.mx/assets/images/movies/cabras_da_peste_2021/large-cover.jpg",
    isWatched: false,
    imdbRating: "0",
    imdbCode: "tt14111726",
  },
  ,
  {
    Name: "Deadly Illusions",
    Year: "2021",
    Cover:
      "https://yts.mx/assets/images/movies/deadly_illusions_2021/large-cover.jpg",
    isWatched: false,
    imdbRating: "8.9",
    imdbCode: "tt7897330",
  },
  ,
  {
    Name: "Friendly Monsters: A Monster Holiday",
    Year: "1994",
    Cover:
      "https://yts.mx/assets/images/movies/friendly_monsters_a_monster_holiday_1994/large-cover.jpg",
    isWatched: true,
    imdbRating: "7.4",
    imdbCode: "tt2833106",
  },
];

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
  height: 75%;
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
  justify-content: space-around;
  align-items: center;
  /* margin: 40px; */
  .watchedList,
  .favouriteList {
    background: ${(props) => props.theme.cards};
    width: 100%;
    height: 400px;
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
`;

export default function Profile() {
  const [hovered, setHovered] = useState(false);
  const toggleHover = (value) => setHovered(value);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 425, itemsToShow: 2, itemsToScroll: 2 },
    { width: 550, itemsToShow: 3 },
    { width: 768, itemsToShow: 4 },
    { width: 1024, itemsToShow: 5 },
    { width: 1440, itemsToShow: 6 },
  ];

  return (
    <Container>
      <UserProfile>
        <div>
          <Avatar alt="Cindy Baker" src="./img/avatar.jpeg" />
          <h1>Loubna Soulimani</h1>
        </div>
      </UserProfile>
      <MovieList>
        <div className="watchedList">
          <Carousel
            breakPoints={breakPoints}
            pagination={false}
            // showArrows={false}
            enableMouseSwipe
            // enableAutoPlay
            autoPlaySpeed={1500}
          >
            {movies.map((movie) => (
              <MyCard
                onMouseEnter={() => toggleHover(true)}
                onMouseLeave={() => toggleHover(false)}
              >
                <img src={movie.Cover} width="100%" height="100%" />

                <div className="eye">
                  <i className="las la-eye  animate__animated animate__wobble animate__infinite"></i>
                </div>
                <div className="backHover">
                  <div className="imdbPlace">
                    <h6>{movie.imdbRating}</h6>
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
                    <h4>{movie.Name}</h4>
                    <h6>{movie.Year}</h6>
                  </div>
                </div>
              </MyCard>
            ))}
          </Carousel>
        </div>
        <div className="favouriteList">
          <Carousel
            breakPoints={breakPoints}
            pagination={false}
            // showArrows={false}
            enableMouseSwipe
            enableAutoPlay
            autoPlaySpeed={1500}
          >
            {movies.map((movie) => (
              <MyCard
                onMouseEnter={() => toggleHover(true)}
                onMouseLeave={() => toggleHover(false)}
              >
                <img src={movie.Cover} width="100%" height="100%" />

                <div className="eye ">
                  <i class="las la-star  animate__animated animate__tada animate__infinite"></i>
                </div>
                <div className="backHover">
                  <div className="imdbPlace">
                    <h6>{movie.imdbRating}</h6>
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
                    <h4>{movie.Name}</h4>
                    <h6>{movie.Year}</h6>
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
