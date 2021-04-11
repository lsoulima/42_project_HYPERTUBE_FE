import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Carousel from "react-elastic-carousel";
import axios from "axios";
import { HyperContext } from "../Context/context";

const MyCard = styled.div`
  cursor: pointer;
  margin: 10px;
  width: 240px;
  height: 380px;
  position: relative;
  /* border: 5px solid #fff; */
  transition: all 0.8s;
  border-radius: 7px;
  box-shadow: 0px 4px 15px ${(props) => props.theme.background_grey_2};
  img {
    border-radius: 7px;
  }
  :focus {
    outline: none;
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
    :hover .play_button {
      opacity: 1;
    }
    .play_button {
      font-size: 70px;
      position: absolute;
      top: 50%;
      opacity: 0;
      z-index: 100;
      color: white;
      left: 50%;
      transform: translate(-50%, -50%);
      :hover {
        color: #ff8585;
        transition: all 0.9s;
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
const List = styled.div`
  width: 80%;
  .rec.rec-arrow {
    box-sizing: border-box;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    font-size: 1.6em;
    background: none;
    color: red;
    border: none;
    padding: 0;
    width: 20px;
    min-width: 20px;
    line-height: 50px;
    -webkit-align-self: center;
    -ms-flex-item-align: center;
    align-self: center;
    cursor: pointer;
    outline: none;
    border-radius: 0;
  }
`;

const WatchedList = () => {
  const [hovered, setHovered] = useState(false);
  const toggleHover = (value) => setHovered(value);
  const { userInfos } = useContext(HyperContext);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 425, itemsToShow: 2, itemsToScroll: 2 },
    { width: 550, itemsToShow: 3 },
    { width: 768, itemsToShow: 4 },
    { width: 1024, itemsToShow: 5 },
    { width: 1440, itemsToShow: 6 },
  ];

  const [movies, setmovies] = useState([]);
  useEffect(() => {
    async function fetchMovies() {
      const res = await axios.get(
        `https://api.apiumadomain.com/list?sort=popularity&page=1`
      );
      console.log(res.data.MovieList);
      setmovies(res.data.MovieList);
    }
    fetchMovies();
  }, []);

  return (
    <List>
      <Carousel
        autoPlaySpeed={2000}
        breakPoints={breakPoints}
        pagination={false}
        enableAutoPlay
      >
        {movies.map((movie, index) => (
          <MyCard
            key={index}
            // onClick={() => {
            //   handleClickMovie(movie.id);
            // }}
            onMouseEnter={() => toggleHover(true)}
            onMouseLeave={() => toggleHover(false)}
          >
            <img
              src={movie?.poster_big}
              width="100%"
              height="100%"
              alt="cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://t.ly/teEM";
              }}
            />

            <div className="eye">
              <i className="las la-eye  animate__animated animate__wobble animate__infinite"></i>
            </div>
            <div className="backHover">
              <div className="imdbPlace">
                <h6>{movie.rating}</h6>
              </div>
              <i className="las la-play-circle play_button" />
              <div className="mvName">
                <h4>{movie.title}</h4>
                <h6>{movie.year}</h6>
              </div>
            </div>
          </MyCard>
        ))}
      </Carousel>
    </List>
  );
};

export default WatchedList;

// {error.error ? (
//     <MessageCard>
//             <div className='info_section'>
//               <div className='movie_header'>
//                 <img className='cover' src='./img/404.svg' alt='cover' />
//                 <h1>No movies in this list</h1>
//               </div>
//             </div>
//           </MessageCard>
//         </Container>
//       ) : (
