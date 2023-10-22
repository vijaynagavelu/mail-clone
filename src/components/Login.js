import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase-config';
import Nav from "../Nav";
import "./component.css";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Input from "./Input";

export default function Login() {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [disableError, setDisableError] = useState("");

    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            )
            setTimeout(() => navigate("/"), 1000);
            navigate("/Loadingpage");
        } catch (error) {
            setErrorMessage(error.message);
            console.log(error.message);
            navigate('/Login');
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function replaceText() {
        var a = errorMessage;
        setDisableError("")
        setEmailError("");
        setPasswordError("");

        if (a.toLowerCase().includes("not-found") || a.includes("email")) {
            setEmailError("Email not found");
            console.log("gott")
        }
        if (a.toLowerCase().includes("password")) {
            setPasswordError("Password incorrect");
            console.log("wrong passcode")
        }
        if (emailError && !loginPassword) {
            setPasswordError("Enter password ");
            console.log("wrong passcode")
        }
        if (a.toLowerCase().includes("disabled")) {
            setDisableError(errorMessage);
            console.log("down")
        }
    }


    useEffect(() => {
        replaceText()
    }, [errorMessage, replaceText]);

    return (
        <div>
            <Nav />

            <div className="loginPage">

                <h4 >Login to your account </h4>
                <p className="fontSize13px">In order to use the editing and rating capabilities of TMDB,
                    as well as get personal recommendations you will need to login to your account. If you do not have an account, registering for an account
                    is free and simple.
                </p>

                <form onSubmit={login} >
                    <div className="flexGrow">
                        <Input placeHolder=" Email" label="Email" setItem={setLoginEmail} errorMessage={emailError} />
                        <Input placeHolder=" Password" type="password" label="Password" setItem={setLoginPassword} errorMessage={passwordError} />
                    </div>

                    <input type="submit" className="loginButton" value="Login" />

                    <div className={disableError ? "errorMessage" : "transparentMessage"}> {`${disableError ? disableError : ""}`}</div>

                    <div className="newUser" >New User?   <Link className="" to={(`/SignIn/`)}> Sign In </Link></div>
                </form>
            </div>

            <Footer />

        </div >
    )
}