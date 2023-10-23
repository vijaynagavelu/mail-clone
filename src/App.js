import "./styles.css";
import { Fragment, useEffect, useState } from "react";

export default function App() {

  const [movies, setMovies] = useState([]);
  const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8]

  const [subject, setSubject] = useState();
  const [name, setName] = useState(false);
  const [time, setTime] = useState();
  const [des, setDes] = useState();
  const [id, setId] = useState();





  useEffect(() => {
    const endpoint = `https://flipkart-email-mock.vercel.app/`;
    fetch(endpoint)
      .then(blob => blob.json())
      .then(api => {
        console.log(api.list)
        setMovies(api.list)
      });
  }, []);

  useEffect(() => {
    const endpoint = `https://flipkart-email-mock.vercel.app/?id=${id}`
    //const endpoint = `https://api.themoviedb.org/3/movie/2?api_key=d908cdc5e4223e480c0497b5a861d68d`
    fetch(endpoint)
      .then(blob => blob.json())
      .then(movieApi => {
        setDes(movieApi.body)
        console.log(movieApi);
      });
  }, [id]);

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


  function profileLetter(letter) {
    if (letter) {
      return ((letter?.charAt(0)).toUpperCase());
    }
  }

  return (
    < div className="App" >

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

        <div className="separate">
          <div className={!name ? " leftSide1" : 'leftSide'}>
            <div className={movies.length === 0 ? " hide" : 'row nav'}>
              <div className="filter">Filter By:</div>
              <div className="space">Unread</div>
              <div className="space read">Read</div>
              <div className="space">Favourites</div>
            </div>

            {movies.map(function (movie, index) {
              return (
                < Fragment key={index} >
                  <div className="outer">
                    <div onClick={() => { setName(movie.from.name); setSubject(movie.subject); setTime(movie.date); setId(movie.id) }} className="row content">
                      <div className={movies.length === 0 ? " hide" : 'row  container'}>

                        <div className="subContent">
                          {profileLetter(movie.from.name)}
                        </div>

                        <div className="textAlignLeft">
                          <span className="fontSize14px">From: <span className="fontWeight600 grayText">{movie.from.name} {movie.from.email}</span></span>
                          <div className="">Subject: <span className="fontWeight600 grayText">{movie.subject}</span></div>
                          <p className=" fontSize13px">{movie.short_description}</p>
                          <span className=" fontSize14px">{formatUnixTimestamp(movie.date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment >
              )
            })}
          </div>

          <div className={!name ? " hide" : 'rightSide'}>
            <div className="content">
              <div className={!name ? " hide" : 'row  container'}>

                <div className="subContent">
                  {profileLetter(name)}
                </div>

                <div className="textAlignLeft">
                  <div className="">Subject: <span className="fontWeight600 grayText">{subject}</span></div>
                  <span className=" fontSize14px">{formatUnixTimestamp(time)}</span>
                  <div dangerouslySetInnerHTML={{ __html: des }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>



      </main >

    </div >
  );
}
