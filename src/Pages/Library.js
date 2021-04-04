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
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const Container = styled.div`
  margin: 0 20px 20px 20px;
  padding-top: 50px;
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
  /* border: 5px solid #fff; */
  transition: all 0.8s;
  border-radius: 10px;
  box-shadow: 0px 4px 15px ${(props) => props.theme.background_grey_2};
  img {
    border-radius: 10px;
  }
  .backHover {
    border-radius: 10px;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  &:hover .backHover {
    background: rgba(54, 54, 54, 0.7);
    box-shadow: 0px 0px 50px -25px rgba(255, 0, 0, 0.8);
  }
  &:hover {
    transform: scale(1.05);
    transition: all 0.7s;
    /* border: 5px solid #ffffff; */
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
      border-radius: 10px;
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
// const CardHover = styled.div`
//   position: relative;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
// `;
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

export default function Library() {
  const [hovered, setHovered] = useState(false);
  const toggleHover = (value) => setHovered(value);
  const [movies, setmovies] = useState([]);
  const [page, setPage] = useState(1);

  const API_ONE = `https://api.apiumadomain.com/list?sort=popularity&short=1&cb=&quality=720p,1080p,3d&page=${page}`;
  const API_TWO = `https://yts.mx/api/v2/list_movies.json?sort=popularity&limit=50&page=${page}`;
  useEffect(() => {
    async function fetchMovies() {
      const res = await axios.get(API_TWO);
      let mydata = movies.concat(res.data.data.movies);
      setmovies(mydata);
    }

    fetchMovies();
  }, [page]);
  console.log("movies ", movies);

  const [imdb, setImdb] = React.useState(10);
  const handleImdbChange = (event, newValue) => {
    setImdb(newValue);
  };

  const [radioValue, setRadioValue] = useState("female");
  const handleChangeRadio = (event) => {
    setRadioValue(event.target.value);
  };

  const [genre, setGenre] = useState("");
  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };
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
              value={imdb}
              onChange={handleImdbChange}
              aria-labelledby="continuous-slider"
              valueLabelDisplay="auto"
              // step={1}
              // marks
              min={0}
              max={10}
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
                value={genre}
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
      <InfiniteScroll
        dataLength={movies.length} //This is important field to render the next data
        next={() => setPage(page + 1)}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <CardContainer>
          {movies.map((movie) => (
            <MyCard
              onMouseEnter={() => toggleHover(true)}
              onMouseLeave={() => toggleHover(false)}
            >
              <img
                src={movie.large_cover_image} //poster_big}
                width="100%"
                height="100%"
                alt="cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://t.ly/teEM";
                }}
              />
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
      </InfiniteScroll>
    </MainContainer>
  );
}
