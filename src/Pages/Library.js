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
import Button from "@material-ui/core/Button";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

const Container = styled.div`
  margin: 0 20px 20px 20px;
  padding-top: 50px;
  display: flex;
  justify-content: space-between;

  .filter_card {
    flex-basis: 50%;
    background-color: ${(props) => props.theme.cards};
    border-radius: 15px;
    /* height: 290px; */
    display: flex;
    flex-direction: column;
    align-items: center;

    .filter_row {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    .firstDiv {
      text-align: center;
      width: 10%;
      color: ${(props) => props.theme.text};
    }
    .secondDiv {
      text-align: center;
      width: 20%;
      color: ${(props) => props.theme.text};
    }

    .filterByName {
      background: transparent;
      display: flex;
      justify-content: center;
      /* width: 20%; */

      .filter {
        background: ${(props) => props.theme.cards};
        border: 2px solid ${(props) => props.theme.border};
        width: 300px;
        border-radius: 50px;
        color: ${(props) => props.theme.background};
        font-family: inherit;
        font-size: 0.8rem;
        padding: 0.6rem 1.6rem;
      }
    }
    .submit {
      margin: 25px 0px;
      background: red;
    }
  }
  .genre {
    .MuiFormControl-root {
      min-width: 170px;
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
    .sort_card,
    .filter_card {
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
  border-radius: 7px;
  box-shadow: 0px 4px 15px ${(props) => props.theme.background_grey_2};
  img {
    border-radius: 7px;
  }
  .backHover {
    border-radius: 7px;
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
      border-radius: 7px;
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
      border-radius: 7px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  flex-basis: 48%;
  border-radius: 15px;
  background-color: ${(props) => props.theme.cards};
  height: 290px;
`;
const MainContainer = styled.div`
  background: ${(props) => props.theme.background};
`;
const SearchCard = styled.div`
  background: transparent;
  display: flex;
  padding-top: 40px;
  justify-content: center;

  .search {
    background: ${(props) => props.theme.cards};
    border: 2px solid ${(props) => props.theme.border};
    width: 400px;
    border-radius: 50px;
    color: ${(props) => props.theme.background};
    font-family: inherit;
    font-size: 1.2rem;
    padding: 0.6rem 1.6rem;

    @media (max-width: 768px) {
      width: auto;
      font-size: 0.8rem;
    }
  }
  .search:focus {
    outline: none;
  }
  input.search {
    color: ${(props) => props.theme.text};
  }
`;

export default function Library() {
  const [hovered, setHovered] = useState(false);
  const toggleHover = (value) => setHovered(value);
  const [imdb, setImdb] = useState(10);
  const [gapYear, setGapYear] = useState(2021);
  const [radioValue, setRadioValue] = useState("rating");
  const [genre, setGenre] = useState("");
  const [movies, setmovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // const API_ONE = `https://api.apiumadomain.com/list?sort=popularity&cb=&quality=720p&page=${page}`;
  // const API_SORT = `https://yts.mx/api/v2/list_movies.json?&sort_by=${radioValue}&limit=50&page=${page}`;
  const API_SEARCH = `https://yts.mx/api/v2/list_movies.json?query_term=${searchTerm}&sort_by=${radioValue}&limit=50&page=${page}`;
  // const API_TWO = `https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=50&page=${page}`;

  const handleImdbChange = (event, newValue) => {
    setImdb(newValue);
  };
  const handleGapYearChange = (event, newValue) => {
    setGapYear(newValue);
  };
  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  // const fetchMovies = async (API) => {
  //   const res = await axios.get(API);
  //   let mydata = movies.concat(res.data.MovieList); //res.data.data.movies
  //   setmovies(mydata);
  // };
  const fetchYtsMovies = async () => {
    const res = await axios.get(API_SEARCH);
    let mydata = [...movies, ...res.data.data.movies]; //movies.concat(res.data.data.movies);
    setmovies(mydata);
  };

  const handleChangeRadio = (event) => {
    setRadioValue(event.target.value);

    const getSortMovies = async () => {
      const res = await axios.get(
        `https://yts.mx/api/v2/list_movies.json?&sort_by=${radioValue}&limit=50&page=${page}`
      );
      let sortData =
        res.data.data.movie_count === 0 ? [] : res.data.data.movies;
      console.log(sortData);
      setmovies(sortData);
    };
    getSortMovies();
  };

  useEffect(() => {
    fetchYtsMovies();
    // eslint-disable-next-line
  }, [page]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("c'est ce que vous rechercher " + searchTerm);
    const searchMovies = async () => {
      // const res1 = axios.get(API_ONE);
      // if (res.data) movies = res.data;
      // else {
      //   const res2 = axios.get(API_TWO);
      //   res.data.forEach((e) => {
      //     movies.push({
      //       id: e.hash,
      //       img: e.pic,
      //     });
      //   });
      // }
      const res = await axios.get(API_SEARCH);
      let searchData =
        res.data.data.movie_count === 0 ? [] : res.data.data.movies;
      setmovies(searchData);
      console.log("resultat de la recherche ", searchData);
    };
    searchMovies();
    setSearchTerm("");
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
    setmovies([]);
  };

  return (
    <MainContainer>
      <SearchCard>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="search"
            placeholder="Search ..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </SearchCard>
      <Container>
        <FilterCard>
          <div className="genre">
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
          <FormControl error component="fieldset" style={{ width: "100%" }}>
            <RadioGroup
              // name="sort"
              value={radioValue}
              onChange={(e) => handleChangeRadio(e)}
              className="radioContainer"
            >
              <FormControlLabel
                value="rating"
                control={<Radio />}
                label="Rating"
              />
              <FormControlLabel value="year" control={<Radio />} label="Year" />
              <FormControlLabel
                value="title"
                control={<Radio />}
                label="Title"
              />
            </RadioGroup>
          </FormControl>
        </FilterCard>
        <div className="filter_card">
          <div className="filter_row">
            <div className="firstDiv">
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
            <div className="secondDiv">
              <Typography id="range-slider" gutterBottom>
                Gape of prod year
              </Typography>
              <MySlider
                value={gapYear}
                onChange={handleGapYearChange}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                // step={1}
                // marks
                min={1970}
                max={2021}
              />
            </div>
            <div className="filterByName">
              <form onSubmit={handleOnSubmit}>
                <input
                  className="filter"
                  type="search"
                  placeholder="Enter Name ..."
                  value={searchTerm}
                  onChange={handleOnChange}
                />
              </form>
            </div>
            <div className="genre">
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

          <Button
            type="submit"
            variant="contained"
            className="submit"
            color="primary"
          >
            Filter
          </Button>
        </div>
      </Container>
      <InfiniteScroll
        dataLength={movies.length} //This is important field to render the next data
        next={() => setPage(page + 1)}
        hasMore={true}
      >
        <CardContainer>
          {movies.map((movie, id) => (
            <MyCard
              key={id}
              onMouseEnter={() => toggleHover(true)}
              onMouseLeave={() => toggleHover(false)}
            >
              <img
                src={movie?.large_cover_image} //poster_big}
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
