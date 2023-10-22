import "./styles.css";
import { db } from "./firebase-config";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase-config';
import {
    getDocs,
    collection,
    query,
    where
} from "firebase/firestore";

const collectionRef = collection(db, "favouriteMovies")

export default function Favourites() {

    const loadingArray = [1]
    const [movieDetails, setMovieDetails] = useState([]);
    //const [documentId, setDocumentId] = useState();
    const [user, setUser] = useState("");



    const getMovie = useCallback(async () => {
        const movieMatch = query(collectionRef, where("userId", "==", user))
        const data = await getDocs(movieMatch);
        if (data.docs[0]) {
            console.log(data.docs[0].data().movieId);
            console.log(data.docs);
            //setDocumentId(data.docs[0].id);
            setMovieDetails(data.docs);
        } else {
            setMovieDetails([]);
            console.log("No such document!");
        }
    }, [user]);

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser.uid);
            // console.log(currentUser.uid);
            getMovie()
        })
        return subscriber;
    }, [user, getMovie]);

    // console.log('movieDetails', movieDetails)

    return (
        < div className="App" >

            <main>
                {loadingArray.map(function (array, index) {
                    return (
                        <Fragment key={index}>
                            <div className={`outer content ${movieDetails.length === 0 ? " display" : " hide"}`} >
                                <div className=" movieLoading">
                                    <img alt="" src={`https://retchhh.files.wordpress.com/2015/03/loading1.gif`}></img>
                                </div>
                            </div>
                        </Fragment>
                    )
                })}
                {movieDetails.map(function (movie, index) {
                    console.log(movie.data().movieId)
                    return (
                        < Fragment key={index} >
                            <div className="outer">
                                <Link className="link" to={(`/Movie/${movie.data().movieId}`)}>
                                    <div className="row content">
                                        <div className={movie.data().length === 0 ? " hide" : 'row  '}>

                                            <div className="subContent1  ">
                                                <img alt="" src={`https://image.tmdb.org/t/p/w500/${movie.data().moviePosterPath}`}></img>
                                            </div>

                                            <div className="textAlignLeft subContent2">

                                                <h3 className="movieTitle">{movie.data().movieTitle}</h3>
                                                <span className="releaseDate fontSize14px">{movie.data().movieReleaseDate}</span>
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



