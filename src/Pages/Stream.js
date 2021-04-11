import React, { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";
import { HyperContext } from "../Context/context";
import { movieDetailsAction } from "../services/moviesActions";
import Alert from "@material-ui/lab/Alert";
import { Snackbar, Box } from "@material-ui/core";

const Container = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 90%;
  margin: 0 auto;
  .suggestions_like {
    margin: 0;
    font-size: 30px;
    font-weight: 700;
    line-height: 64px;
    letter-spacing: -1px;
    color: ${(props) => props.theme.text};
    margin-top: 50px;
    text-align: center;
    position: relative;
  }
`;
const MyVideo = styled.div`
  height: 700px;
  width: 100%;
`;
const Suggestions = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const MyCard = styled.div`
  position: relative;
  display: block;
  width: 480px;
  min-height: 300px;
  height: 100px;
  margin: 40px 10px;
  overflow: hidden;
  border-radius: 10px;
  transition: all 0.4s;
  box-shadow: 0px 0px 80x -25px rgb(0 0 0 / 50%);
  transition: all 0.4s;
  :hover {
    transform: scale(1.02);
    transition: all 0.4s;
    height: auto;
    .movie_desc {
      display: block !important;
      transition: all 0.9s;
    }
  }
  .blur_back {
    position: absolute;
    top: 0;
    z-index: 1;
    height: 100%;
    right: 0;
    background-size: cover;
    border-radius: 11px;
    width: 100%;
    background-position: 50% 50% !important;
  }
  .bright_back {
    background: url("https://yts.mx/assets/images/movies/deadly_illusions_2021/large-cover.jpg");
  }
  .info_section {
    position: relative;
    width: 100%;
    height: 100%;
    background-blend-mode: multiply;
    z-index: 2;
    border-radius: 10px;
    background: linear-gradient(to top, #e5e6e6 50%, transparent 100%);
    display: inline-grid;
    .movie_header {
      position: relative;
      padding: 25px;
      height: 40%;
      width: 100%;
      margin-top: 85px;
      .cover {
        position: relative;
        float: left;
        margin-right: 20px;
        height: 120px;
        box-shadow: 0 0 20px -10px rgb(0 0 0 / 50%);
      }
      h1 {
        color: black;
        font-weight: 400;
      }
      h4 {
        color: #555;
        font-weight: 400;
      }
      .minutes {
        display: inline-block;
        margin-top: 15px;
        color: #555;
        padding: 5px;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.05);
      }
      .type {
        display: inline-block;
        color: #959595;
        margin-left: 10px;
      }
    }
    .movie_desc {
      display: none;
      width: 100%;
      padding: 25px;
      height: 50%;
      transition: all 0.9s;
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
  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 1024px) {
    width: 50%;
  }
  @media (max-width: 1440px) {
    width: 45%;
  }
`;
const MovieDetailes = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const MainContainer = styled.div`
  background: ${(props) => props.theme.background};
  .movie_section {
    height: 100%;
    flex-basis: 11%;
    min-width: 250px;
    div:first-of-type {
      height: 300px;
      margin: 15px;
      img {
        height: 100%;
        width: 100%;
      }
    }
    div:last-of-type {
      margin: 15px;
      background: ${(props) => props.theme.background_btn};
      height: 50px;
      text-align: center;
      vertical-align: middle;
      line-height: 50px;
      color: ${(props) => props.theme.text_background};
      border-radius: 5px;
      cursor: pointer;
    }
  }
  .detail_section {
    display: flex;
    flex-direction: column;
    flex-basis: 70%;
    .divider {
      width: 100%;
      border-bottom: 1px solid ${(props) => props.theme.background_grey_2};
    }
    .detail_section_name {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0 30px;
      div {
        color: #fff;
        span:first-of-type {
          color: ${(props) => props.theme.background_grey_2};
          margin-right: 20px;
        }
        span:last-of-type {
          background-color: ${(props) => props.theme.background_grey_2};
          padding: 0 10px;
        }
      }
      h1 {
        margin: 0;
        font-size: 67px;
        font-weight: 700;
        line-height: 64px;
        letter-spacing: -1px;
        color: ${(props) => props.theme.text};
      }
      @media (max-width: 768px) {
        h1 {
          font-size: 40px;
        }
      }
    }
    .detail_section_duration {
      color: ${(props) => props.theme.background_grey_5};
      padding-bottom: 35px !important;
      padding-top: 35px !important;
      span:nth-child(2) {
        margin: 0 3px;
      }
      .movie_genre {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        div {
          background: ${(props) => props.theme.background_grey_2};
          color: #fff;
          padding: 10px 15px;
          font-size: 12px;
          margin-right: 5px;
          border-radius: 25px;
        }
      }
    }
    .detail_section_description {
      color: ${(props) => props.theme.text};
      font-size: 14px;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: 0.5px;
      padding-bottom: 30px;
    }
    .detail_section_movieInfo {
      .detail_section_director {
        width: 100%;
        display: flex;
        align-items: flex-start;
        min-height: 4.6rem;
        padding: 20px 0;
        font-size: 11px;
        .director {
          color: ${(props) => props.theme.background_grey_5};
          flex-basis: 15%;
          width: 100%;
        }
        .director_value {
          margin-left: 25px;
          bottom: 2px;
          color: ${(props) => props.theme.text};
        }
      }
      .mini_divider {
        width: 50%;
        height: 1px;
        background: ${(props) => props.theme.background_grey_2};
      }
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
    .movie_section {
      div:first-of-type {
        height: auto;
        margin: 15px;
        img {
          display: none;
        }
      }
    }
  }
`;

export default function Stream() {
  const { state } = useContext(HyperContext);
  const [details, setDetails] = useState({});
  const [error, setError] = useState({});
  const [open, setOpen] = useState(false);
  const movieID = window.location.search.split("=")[1];

  const handleClose = (reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const timeConvert = (n) => {
    const num = n;
    const hours = num / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return rhours + " hour(s) " + rminutes + " minute(s).";
  };
  useEffect(() => {
    const loadMovieDetails = async () => {
      if (movieID) {
        const response = await movieDetailsAction(state.token, movieID);
        if (response?.success === false) {
          console.log("ERROR", response.error);
        } else {
          setDetails(response);
        }
      } else {
        console.log("ERROR", "NO MOVIE ID FOUND");
      }
    };
    loadMovieDetails();
  }, []);
  return (
    <MainContainer>
      <Container>
        <MyVideo>
          <ReactPlayer
            url={[{ src: "movie.mp4" }, { src: "foo.mkv", type: "video/mkv" }]}
            controls={true}
            width='100%'
            height='100%'
            config={{
              file: {
                tracks: [
                  {
                    kind: "subtitles",
                    src: "", //"http://localhost:3001/subs/subtitles.en.vtt",
                    srcLang: "en",
                    default: true,
                  },
                  {
                    kind: "subtitles",
                    src: "", //"http://localhost:3001/subs/subtitles.fr.vtt",
                    srcLang: "fr",
                  },
                ],
              },
            }}
          />
        </MyVideo>
        <MovieDetailes>
          <div className='movie_section'>
            <div>
              <img src={details.large_cover_image} alt='cover' />
            </div>
            <div>Add to Favorites</div>
          </div>
          <div className='detail_section'>
            <div className='divider detail_section_name'>
              <h1>{details?.title_long}</h1>
              <div>
                <span>Rating: </span>
                <span>{details?.rating}</span>
              </div>
            </div>
            <div className='detail_section_duration'>
              <span>{timeConvert(details.runtime)}</span>
              <div className='movie_genre'>
                {details?.genres?.map((item) => (
                  <div>{item}</div>
                ))}
              </div>
            </div>
            <div className=' divider detail_section_description'>
              {details.description_intro}
            </div>
          </div>
        </MovieDetailes>
        {/* <div className='suggestions_like'>You May Also Like</div> */}
        {/* <Suggestions>
          {[0, 1, 2, 3, 4, 5].map((movie, id) => (
            <MyCard key={id}>
              <div className='info_section'>
                <div className='movie_header'>
                  <img
                    className='cover'
                    src='https://yts.mx/assets/images/movies/deadly_illusions_2021/large-cover.jpg'
                    alt='cover'
                  />
                  <h1>The Poker House</h1>
                  <h4>2017, David Ayer</h4>
                  <span className='minutes'>117 min</span>
                  <p className='type'>Action, Crime, Fantasy</p>
                </div>
                <div className='movie_desc'>
                  <p className='text'>
                    Set in a world where fantasy creatures live side by side
                    with humans. A human cop is forced to work with an Orc to
                    find a weapon everyone is prepared to kill for.
                  </p>
                </div>
              </div>
              <div className='blur_back bright_back'></div>
              <i className='las la-play-circle play_button' />
            </MyCard>
          ))}
        </Suggestions> */}
      </Container>
    </MainContainer>
  );
}
