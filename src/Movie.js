import "./movie.css"
import { db } from "./firebase-config";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'react-circular-progressbar/dist/styles.css';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase-config';
import {

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
        const endpoint = `https://flipkart-email-mock.vercel.app/?id=${params.Id}`
        //const endpoint = `https://api.themoviedb.org/3/movie/2?api_key=d908cdc5e4223e480c0497b5a861d68d`
        fetch(endpoint)
            .then(blob => blob.json())
            .then(movieApi => {
                setMovie(movieApi)
                getMovie()
                console.log(movieApi);
            });
        const subscriber = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser.uid);
            //console.log(currentUser.uid);
        })
        return subscriber;
    }, [user, getMovie, params.Id]);


    if (!movie) {
        return (
            <div>
                <img alt="" className="movieLoading" src={`https://retchhh.files.wordpress.com/2015/03/loading1.gif`}></img>
            </div>
        );
    }


    return (
        <div className="movieDetails">
            <div dangerouslySetInnerHTML={{ __html: movie.body }}></div>
        </div >
    )

}
