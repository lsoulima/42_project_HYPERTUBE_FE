import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import {
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Typography,
  Slider,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";
import { moviesAction } from "../services/moviesActions";
import { HyperContext } from "../Context/context";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

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
      margin-bottom: 200px;
    }
    div#loader {
      margin-top: 200px;
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
  width: 150px;
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
    margin-top: 200px;
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
  min-height: 100%;
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
  const { state } = useContext(HyperContext);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [radioValue, setRadioValue] = useState("like_count");
  const [searching, setSearching] = useState(false);
  const [isloading, setIsloading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({
    rating: [0, 10],
    year: [1950, 2021],
    title: "",
    genre: "",
  });
  const [hovered, setHovered] = useState(false);
  const toggleHover = (value) => setHovered(value);
  // eslint-disable-next-line
  // const [search, setSearchRes] = useState([]);
  // const [sortByPopularity, setPopularity] = useState([]);
  // const [sortByYears, setYears] = useState([]);
  // const [sortByImdb, setImdb] = useState([]);
  // const [sortByGenre, setGenre] = useState([]);

  // const API_ONE = `https://api.apiumadomain.com/list?sort=popularity&cb=&quality=720p&page=${page}`;
  // const API_SORT = `https://yts.mx/api/v2/list_movies.json?&sort_by=${radioValue}&limit=50&page=${page}`;
  // const API_SEARCH = `https://yts.mx/api/v2/list_movies.json?query_term=${searchTerm}&sort_by=${radioValue}&limit=50&page=${page}`;
  // const API_TWO = `https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=50&page=${page}`;

  // const handleImdbChange = (event, newValue) => {
  //   setImdb(newValue);
  // };
  const handleYearChange = (newvalue) => {
    setFilter({ ...filter, year: newvalue });
  };
  const handleGenreChange = (event) => {
    setFilter({ ...filter, genre: event.target.value });
  };

  const handleChangeRadio = (event) => {
    setRadioValue(event.target.value);
    setIsloading(true);
    setMovies([]);
    setPage(1);
    fetchSortedMovies(page, event.target.value);
  };

  const fetchMovies = async (page, sort, filter) => {
    const res = await moviesAction(state.token, page, sort, filter);

    if (res) {
      setMovies([...movies, ...res]);
      setTimeout(() => {
        setIsloading(false);
      }, 2000);
    }
    // }
  };
  const fetchSortedMovies = async (page, sort, filter) => {
    const res = await moviesAction(state.token, page, sort, filter);

    if (res) {
      setMovies(res);
      setTimeout(() => {
        setIsloading(false);
      }, 2000);
    }

    // }
  };

  useEffect(() => {
    fetchMovies(page, radioValue);
  }, [page, radioValue]);

  const handleOnSubmit = (e) => {
    console.log("hello");

    e.preventDefault();
    console.log("c'est ce que vous rechercher " + searchTerm);
    // const searchMovies = async () => {
    //   //     const res1 = axios.get(API_ONE);
    //   // if (res.data) movies = res.data;
    //   // else {
    //   //   const res2 = axios.get(API_TWO);
    //   //   res.data.forEach((e) => {
    //   //     movies.push({
    //   //       id: e.hash,
    //   //       img: e.pic,
    //   //     });
    //   //   });
    //   // }
    //   const res = await axios.get(API_SEARCH);
    //   let searchData =
    //     res.data.data.movie_count === 0 ? [] : res.data.data.movies;
    //   setmovies(searchData);
    //   console.log("resultat de la recherche ", searchData);
    // };
    // searchMovies();
    // setSearchTerm("");
  };

  const handleOnChange = (e) => {
    // setSearchTerm(e.target.value);
    // setmovies([]);
  };

  return (
    <MainContainer>
      <SearchCard>
        <form onSubmit={handleOnSubmit}>
          <input
            className='search'
            type='search'
            placeholder='Search ...'
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </SearchCard>
      <Container>
        <FilterCard style={{ margin: "10px" }}>
          <FormControl error component='fieldset' style={{ width: "100%" }}>
            <RadioGroup
              // name="sort"
              value={radioValue}
              onChange={(e) => handleChangeRadio(e)}
              className='radioContainer'>
              <FormControlLabel
                value='like_count'
                control={<Radio />}
                label='Rating'
              />
              <FormControlLabel value='year' control={<Radio />} label='Year' />
              <FormControlLabel
                value='title'
                control={<Radio />}
                label='Title'
              />
            </RadioGroup>
          </FormControl>
        </FilterCard>
        <div className='filter_card' style={{ padding: "60px" }}>
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Typography
                id='range-slider'
                gutterBottom
                style={{ color: "#fff" }}>
                Rating
              </Typography>
              <MySlider
                value={filter.rating}
                valueLabelDisplay='auto'
                aria-labelledby='range-slider'
                min={0}
                max={10}
                // onChange={handleImdbChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography
                id='range-slider'
                gutterBottom
                style={{ color: "#fff" }}>
                Production year
              </Typography>
              <MySlider
                defaultValue={[1950, 2021]}
                min={1950}
                max={2021}
                valueLabelDisplay='auto'
                aria-labelledby='range-slider'
                onChange={handleYearChange}
              />
            </Grid>
            <Grid item xs={6}>
              <div className='filterByName'>
                <input
                  className='filter'
                  type='search'
                  placeholder='Enter Name ...'
                  value={filter.title}
                  // onChange={handleOnChange}
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              <FormControlMdf>
                <InputLabel id='demo-simple-select-helper-label'>
                  Genre
                </InputLabel>
                <Select
                  labelId='demo-simple-select-helper-label'
                  id='demo-simple-select-helper'
                  value={filter.genre}
                  onChange={handleGenreChange}>
                  <MenuItem value='Romantic'>Romantic</MenuItem>
                  <MenuItem value='Comedy'>Comedy</MenuItem>
                  <MenuItem value='Drama'>Drama</MenuItem>
                  <MenuItem value='Horror'>Horror</MenuItem>
                  <MenuItem value='Action'>Action</MenuItem>
                  <MenuItem value='Crime'>Crime</MenuItem>
                </Select>
              </FormControlMdf>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button
                type='submit'
                variant='contained'
                className='submit'
                color='primary'
                style={{ width: "150px", padding: "10px", fontSize: "16px" }}>
                Filter
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
      <InfiniteScroll
        dataLength={movies.length} //This is important field to render the next data
        next={() => setPage(page + 1)}
        hasMore={true}>
        {isloading ? (
          <div
            id="loader"
            style={{
              // background: "white",
              padding: "10px 10px 10px 100px",
              borderRadius: "15px",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              marginTop: "100px",
              marginLeft: "15px",
              marginRight: "15px",
            }}>
            <Loader
              type='Grid'
              color='red'
              height={200}
              width={200}
              timeout={2000}
            />
          </div>
        ) : (
          <CardContainer>
            {movies.map((movie, id) => (
              <MyCard
                key={id}
                onMouseEnter={() => toggleHover(true)}
                onMouseLeave={() => toggleHover(false)}>
                <img
                  src={movie?.large_cover_image} //poster_big}
                  width='100%'
                  height='100%'
                  alt='cover'
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://t.ly/teEM";
                  }}
                />
                {movie.isWatched ? (
                  <div className='eye '>
                    <i className='las la-eye'></i>
                  </div>
                ) : (
                  ""
                )}
                <div className='backHover'>
                  <div className='imdbPlace'>
                    <h6>{movie.rating}</h6>
                  </div>
                  <div className='watch'>
                    <div
                      className={
                        hovered
                          ? "watchBtn animate__animated  animate__backInDown animate__faster"
                          : "watchBtn"
                      }>
                      Watch
                    </div>
                    <div
                      className={
                        hovered
                          ? "test1 animate__animated  animate__backInLeft animate__faster"
                          : "test1"
                      }></div>
                    <div
                      className={
                        hovered
                          ? "test2 animate__animated  animate__backInRight animate__faster"
                          : "test2"
                      }></div>
                  </div>
                  <div className='mvName'>
                    <h4>{movie.title}</h4>
                    <h6>{movie.year}</h6>
                  </div>
                </div>
              </MyCard>
            ))}
          </CardContainer>
        )}
      </InfiniteScroll>
    </MainContainer>
  );
}
