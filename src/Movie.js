import Nav from "./Nav";
import "./movie.css"
import { db } from "./firebase-config";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getRatingColor } from "./utlities";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase-config';
import moment from "moment/moment";
import Footer from "./components/Footer";
import {
    addDoc,
    deleteDoc,
    doc,
    getDocs,
    collection,
    query,
    where
} from "firebase/firestore";

const collectionRef = collection(db, "favouriteMovies")

export default function Movie() {

    const [movie, setMovie] = useState(null);
    const [movieDetails, setMovieDetails] = useState(null);
    const [documentId, setDocumentId] = useState();
    const [user, setUser] = useState("");
    const [timer, setTimer] = useState(0);
    const params = useParams();

    const getMovie = useCallback(async () => {
        console.log("getMovie was called")
        const movieMatch = query(collectionRef, where("userId", "==", user), where("movieId", "==", parseInt(params.Id)))
        const data = await getDocs(movieMatch);
        if (data.docs[0]) {
            // console.log(data.docs[0].data());
            setDocumentId(data.docs[0].id);
            setMovieDetails(data.docs[0].data());
            setTimeout(() => {
                setTimer(1);
            }, 100);

        } else {
            setMovieDetails(null);
            console.log("No such document!");
            setTimeout(() => {
                setTimer(1);
            }, 700);
        }
    }, [params.Id, user])

    useEffect(() => {
        const endpoint = `https://api.themoviedb.org/3/movie/${params.Id}?api_key=d908cdc5e4223e480c0497b5a861d68d`
        //const endpoint = `https://api.themoviedb.org/3/movie/2?api_key=d908cdc5e4223e480c0497b5a861d68d`
        fetch(endpoint)
            .then(blob => blob.json())
            .then(movieApi => {
                setMovie(movieApi)
                getMovie()
                // console.log(movieApi);
            });
        const subscriber = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser.uid);
            //console.log(currentUser.uid);
        })
        return subscriber;
    }, [user, getMovie, params.Id]);



    const favourite = async (id, movieTitle, movieGenres, movieReleaseDate, moviePosterPath) => {
        if (movieDetails) {
            setTimeout(() => {
                setTimer(0);
            }, 100);
            const usersDoc = doc(db, "favouriteMovies", documentId);
            await deleteDoc(usersDoc);
        } else {
            setTimeout(() => {
                setTimer(0);
            }, 100);
            await addDoc(collectionRef, {
                movieId: id,
                userId: user,
                movieTitle: movieTitle,
                movieGenres: movieGenres[0].name,
                movieReleaseDate: movieReleaseDate,
                moviePosterPath: moviePosterPath
            })
        }
        getMovie()
    }

    if (!movie) {
        return (
            <div>
                <img alt="" className="movieLoading" src={`https://retchhh.files.wordpress.com/2015/03/loading1.gif`}></img>
            </div>
        );
    }

    const duration = moment.duration(movie.runtime, "minutes");

    return (
        <div className="movieDetails">
            <Nav />

            <div>
                <ul className=" movieNavBar">
                    <li>Overview</li>
                    <li>Media</li>
                    <li>Fandom</li>
                    <li>Share</li>
                </ul>
            </div>

            <div>
                <div >
                    <div className=" gradient"></div>
                    <img alt="" className="coverImage" src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} />
                </div>
                <img alt="" className="profileImage" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}></img>
            </div>

            <h2 className="movieName">{movie.title}(2023)</h2>

            <div className="row movieNavBar">

                <div className="ratingProgressbar">
                    <div  >
                        <CircularProgressbar styles={buildStyles({
                            textSize: '22px',
                            backgroundColor: 'black',
                            pathColor: `${getRatingColor((movie.vote_average * 10).toFixed(0))}`,
                            textColor: 'white',
                            trailColor: ' rgb(74, 69, 69)',
                        })} value={(movie.vote_average * 10).toFixed(0)}
                            text={`${(movie.vote_average * 10).toFixed(0)} %`} />
                    </div>
                </div>

                <div>
                    ▶️ Play Trailer
                </div>

                <div className={user ? " display heart" : 'hide'}>
                    <div className={timer ? " hide" : "display heartLoading"}>
                        <img alt="" src={`https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif`}></img>
                    </div>
                    <div className={timer ? " display favourites" : 'hide'} >
                        <input id={`${movie.id}`} className="transparent" type="checkbox"></input>
                        <label onClick={() => { favourite(movie.id, movie.title, movie.genres, moment(movie.release_date).format("MMM, YYYY"), movie.poster_path) }} for={`${movie.id}`}
                            className={movieDetails ? 'redHeart' : " greyHeart"} >❤</label>
                    </div>
                </div>
            </div>

            <div className="movieInfo column">
                <div class="facts">
                    <span class="certification">
                        U/A ●
                    </span>
                    <span class="release">
                        {moment(movie.release_date).format("MMM, YYYY")} (US)
                    </span>
                    <span class="runtime">
                        ● {moment.utc(duration.asMilliseconds()).format("h[h] mm[m]")}
                    </span>
                </div>
                <div class="facts">
                    <span class="genres">
                        {movie.genres.map(function (genres, i) {
                            return (
                                genres.name
                            )
                        }).join(', ')}
                    </span>
                </div>
            </div>

            <div className="overviewMovie">
                <h2>Overview</h2>
                <p>
                    {movie.overview}
                </p>
            </div>

            <div className="row movieNavBar">
                <div>
                    <h4>David Leitch</h4>
                    <span>Director</span>
                </div>
                <div>
                    <h4>Zak Olkewicz</h4>
                    <span>Screenplay</span>
                </div>
            </div>

            <Footer />


        </div >
    )

}
