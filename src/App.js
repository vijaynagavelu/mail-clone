import "./styles.css";
import Pagination from './components/Pagination';
import { Fragment, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";

export default function App() {

  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8]


  useEffect(() => {
    const endpoint = `https://flipkart-email-mock.vercel.app/?page=${pageNumber}`;
    fetch(endpoint)
      .then(blob => blob.json())
      .then(api => {
        console.log(api.list)
        setMovies(api.list)
        setTotalPages(20)
      });
  }, [pageNumber]);

  function formatUnixTimestamp(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? 'pm' : 'am';

    // Adjust hours to 12-hour formatt
    const formattedHours = hours % 12 || 12;

    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    const formattedTime = `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}${amOrPm}`;

    return `${formattedDate} ${formattedTime}`;
  }



  return (
    < div className="App" >
      <Nav />

      <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalPages={totalPages} />

      <main>
        {loadingArray.map(function (array, index) {
          return (
            <Fragment key={index}>
              <div className={`outer content ${movies.length === 0 ? " display" : " hide"}`} >
                <div className=" movieLoading">
                  <img alt="" src={`https://retchhh.files.wordpress.com/2015/03/loading1.gif`}></img>
                </div>
              </div>
            </Fragment>
          )
        })}

        {movies.map(function (movie, index) {
          return (
            < Fragment key={index} >
              <div className="outer">
                <Link className="link" to={(`/Movie/${movie.id}`)}>
                  <div className="row content">
                    <div className={movies.length === 0 ? " hide" : 'row  '}>

                      <div className="subContent1">
                        F
                      </div>

                      <div className="textAlignLeft subContent2">
                        <span className="releaseDate fontSize14px">From:{movie.from.name} {movie.from.email}</span>
                        <span className="movieTitle">Subject {movie.subject}</span>
                        <p className="overview fontSize13px">{movie.short_description}</p>
                        <span className="releaseDate fontSize14px">{formatUnixTimestamp(movie.date)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </Fragment >
          )
        })}
      </main >

    </div >
  );
}
