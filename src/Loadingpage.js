import "./movie.css"
import 'react-circular-progressbar/dist/styles.css';


export default function Loadingpage() {
    return (
        <div>
            <div className="marginTop50">
                <div className=" movieLoading">
                    <img alt="" src={`https://retchhh.files.wordpress.com/2015/03/loading1.gif`}></img>
                </div>
            </div>

        </div>
    )

}
