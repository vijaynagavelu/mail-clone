import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Movie from "./Movie";
import Loadingpage from "./Loadingpage";
import Favourites from "./Favourites";

export default function Routerpage() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/Movie/:Id" element={<Movie />} />
                    <Route path="/Loadingpage" element={<Loadingpage />} />
                    <Route path="/Favourites" element={<Favourites />} />
                </Routes>
            </div >
        </Router>
    );
}

