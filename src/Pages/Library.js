import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import axios from "axios";

// const movies = [
//   {
//     Name: "Nature Unleashed: Avalanche",
//     Year: "2004",
//     Cover:
//       "https://img.yts.mx/assets/images/movies/nature_unleashed_avalanche_2004/large-cover.jpg",
//     isWatched: true,
//     imdbRating: "3.7",
//     imdbCode: "tt0363448",
//   },
//   {
//     Name: "Summer Daydream",
//     Year: "2018",
//     Cover:
//       "https://yts.mx/assets/images/movies/summer_daydream_2018/large-cover.jpg",
//     isWatched: true,
//     imdbRating: "8.1",
//     imdbCode: "tt4940526",
//   },
//   {
//     Name: "Children of the Tsunami",
//     Year: "2012",
//     Cover:
//       "https://yts.mx/assets/images/movies/children_of_the_tsunami_2012/large-cover.jpg",
//     isWatched: false,
//     imdbRating: "5.6",
//     imdbCode: "tt2368687",
//   },
//   {
//     Name: "7 ore per farti innamorare",
//     Year: "2020",
//     Cover:
//       "https://yts.mx/assets/images/movies/7_ore_per_farti_innamorare_2020/large-cover.jpg",
//     isWatched: true,
//     imdbRating: "5.9",
//     imdbCode: "tt10814876",
//   },
//   {
//     Name: "Back to the 90s",
//     Year: "2015",
//     Cover:
//       "https://yts.mx/assets/images/movies/back_to_the_90s_2015/large-cover.jpg",
//     isWatched: true,
//     imdbRating: "6.5",
//     imdbCode: "tt4556700",
//   },
//   {
//     Name: "U2's Beautiful Day",
//     Year: "2002",
//     Cover:
//       "https://yts.mx/assets/images/movies/u2s_beautiful_day_2002/large-cover.jpg",
//     isWatched: false,
//     imdbRating: "8.7",
//     imdbCode: "tt0339832",
//   },
//   ,
//   {
//     Name: "The Poker House",
//     Year: "2008",
//     Cover:
//       "https://yts.mx/assets/images/movies/the_poker_house_2008/large-cover.jpg",
//     isWatched: false,
//     imdbRating: "6.4",
//     imdbCode: "tt1014806",
//   },
//   ,
//   {
//     Name: "TFW NO GF",
//     Year: "2020",
//     Cover: "https://yts.mx/assets/images/movies/tfw_no_gf_2020/large-cover.jpg",
//     isWatched: false,
//     imdbRating: "5.9",
//     imdbCode: "tt11602648",
//   },
//   ,
//   {
//     Name: "Alone in the Dark",
//     Year: "1982",
//     Cover:
//       "https://yts.mx/assets/images/movies/alone_in_the_dark_1982/large-cover.jpg",
//     isWatched: false,
//     imdbRating: "6.1",
//     imdbCode: "tt0083542",
//   },
//   ,
//   {
//     Name: "Cabras da Peste",
//     Year: "2021",
//     Cover:
//       "https://yts.mx/assets/images/movies/cabras_da_peste_2021/large-cover.jpg",
//     isWatched: false,
//     imdbRating: "0",
//     imdbCode: "tt14111726",
//   },
//   ,
//   {
//     Name: "Deadly Illusions",
//     Year: "2021",
//     Cover:
//       "https://yts.mx/assets/images/movies/deadly_illusions_2021/large-cover.jpg",
//     isWatched: false,
//     imdbRating: "8.9",
//     imdbCode: "tt7897330",
//   },
//   ,
//   {
//     Name: "Friendly Monsters: A Monster Holiday",
//     Year: "1994",
//     Cover:
//       "https://yts.mx/assets/images/movies/friendly_monsters_a_monster_holiday_1994/large-cover.jpg",
//     isWatched: true,
//     imdbRating: "7.4",
//     imdbCode: "tt2833106",
//   },
// ];

const Container = styled.div`
  margin: 0 20px 20px 20px;
  padding-top: 20px;
  display: flex;
  justify-content: space-between;

  .first_card,
  .second_card {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-basis: 48%;
    border-radius: 15px;
    background-color: ${(props) => props.theme.cards};
    height: 200px;
  }
  .second_card > div:first-of-type {
    text-align: center;
    width: 50%;
    color: ${(props) => props.theme.text};
  }
  .second_card > div:last-of-type {
    .MuiFormControl-root {
      min-width: 140px;
      padding-bottom: 28px;
    }
  }

  .radioContainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    color: ${(props) => props.theme.text};
  }
  @media (max-width: 768px) {
    flex-direction: column;
    height: 300px;
    .first_card,
    .second_card {
      margin-bottom: 20px;
    }
  }
  @media (max-width: 425px) {
    & {
      justify-content: center;
      .first_card div:first-of-type {
        width: auto !important;
      }
      .second_card div:first-of-type {
        text-align: center;
        width: 90% !important;
      }
      .second_card {
        flex-direction: column;
      }
    }

    .radioContainer {
      flex-direction: column;
    }
  }
`;

const MySlider = styled(Slider)`
  color: red;
`;

const MyCard = styled.div`
  margin: 10px;
  width: 240px;
  height: 382px;
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
    color: #fff;
    font-size: 30px;
  }
`;

const FormControlMdf = styled(FormControl)`
  .MuiFormLabel-root.Mui-focused {
    color: ${(props) => props.theme.text};
  }
  .MuiInput-underline:after {
    border: 1px solid #333;
  }
  .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: 2px solid #333;
  }
  .MuiFormLabel-root {
    color: ${(props) => props.theme.text};
  }
`;
const CardHover = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 80%;
  margin: 0 auto;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;
const FilterCard = styled.div`
  .MuiRadio-colorSecondary.Mui-checked {
    color: red;
  }
`;
const MainContainer = styled.div`
  background: ${(props) => props.theme.background}; ;
`;

function valuetext(value) {
  return `${value}°C`;
}

export default function Library() {
  const [value, setValue] = React.useState([20, 37]);
  const [radioValue, setRadioValue] = React.useState("female");
  const [age, setAge] = React.useState("");
  const [hovered, setHovered] = useState(false);
  const toggleHover = (value) => setHovered(value);
  const [movies, setmovies] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeRadio = (event) => {
    setRadioValue(event.target.value);
  };
  const handleGenreChange = (event) => {
    setAge(event.target.value);
  };

  useEffect(() => {
    async function fetchMovies() {
      const res = await axios.get(
        `https://api.apiumadomain.com/list?sort=popularity&short=1&cb=&quality=720p,1080p,3d&page=1`
      );
      console.log(res.data.MovieList);
      setmovies(res.data.MovieList);
    }
    fetchMovies();
  }, []);

  return (
    <MainContainer>
      <Container>
        <div className="first_card">
          <FilterCard style={{ width: "100%" }}>
            <FormControl component="fieldset" style={{ width: "100%" }}>
              <RadioGroup
                name="gender1"
                value={radioValue}
                onChange={handleChangeRadio}
                className="radioContainer"
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="popularity"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Year"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Name"
                />
              </RadioGroup>
            </FormControl>
          </FilterCard>
        </div>
        <div className="second_card">
          <div className="firsrDiv">
            <Typography id="range-slider" gutterBottom>
              Imdb Rating
            </Typography>
            <MySlider
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
            />
          </div>
          <div>
            <FormControlMdf>
              <InputLabel id="demo-simple-select-helper-label">
                Genre
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={age}
                onChange={handleGenreChange}
              >
                <MenuItem value="">Romantic</MenuItem>
                <MenuItem value={10}>Comedy</MenuItem>
                <MenuItem value={20}>Drama</MenuItem>
                <MenuItem value={30}>Horror</MenuItem>
              </Select>
            </FormControlMdf>
          </div>
        </div>
      </Container>
      <CardContainer>
        {movies?.map((movie) => (
          <MyCard
            onMouseEnter={() => toggleHover(true)}
            onMouseLeave={() => toggleHover(false)}
          >
            <img src={movie.poster_big} width="100%" height="100%" />
            {movie.isWatched ? (
              <div className="eye ">
                <i className="las la-eye"></i>
              </div>
            ) : (
              ""
            )}

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
      </CardContainer>
    </MainContainer>
  );
}
