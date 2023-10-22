import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase-config';
import Nav from "../Nav";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";

export default function SignIn() {

    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function replaceText() {
        var a = errorMessage;
        setEmailError("");
        setPasswordError("");

        if (a.includes("email")) {
            setEmailError("Email not found");
            console.log("gott")
        }
        if (a.includes("already-in-use")) {
            setEmailError("Email already in use");
            console.log("gott")
        }
        if (a.toLowerCase().includes("6 characters")) {
            setPasswordError("Password atleast should be 6 characters");
            console.log("wrong passcode")
        }
        if (emailError && !registerPassword) {
            setPasswordError("Enter password ");
            console.log("wrong passcode")
        }
    }

    useEffect(() => {
        replaceText()
    }, [errorMessage, replaceText]);

    const register = async (e) => {
        e.preventDefault();
        setConfirmPassword('');
        if (registerConfirmPassword !== registerPassword) {
            setConfirmPassword("Password confirmation do not match")
            return;
        }
        try {
            await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            setTimeout(() => navigate("/"), 1000);
            navigate("/Loadingpage");
        } catch (error) {
            setErrorMessage(error.message);
            console.log(error.message);
        }
    }

    // const register = async (e) => {
    //     e.preventDefault();
    //     setConfirmPassword('');
    //     if (registerConfirmPassword !== registerPassword) {
    //         setConfirmPassword("Password confirmation do not match")
    //         return;
    //     }
    //     try {
    //         const user = await createUserWithEmailAndPassword(
    //             auth,
    //             registerEmail,
    //             registerPassword
    //         );
    //         setTimeout(() => navigate("/"), 1000);
    //         navigate("/Loadingpage");
    //     } catch (error) {
    //         setErrorMessage(error.message);
    //         console.log(error.message);
    //     }
    // }


    return (
        <div>
            <div>
                <Nav />

                <div className="loginPage">

                    <h4 >Sign up for an account </h4>
                    <p className="fontSize13px">Signing up for an account is free
                        and easy. Fill out the form below to get started.
                        JavaScript is required to  continue.
                    </p>

                    <form onSubmit={register}>

                        <div className="flexGrow">

                            <Input placeHolder=" " label="Email" setItem={setRegisterEmail} errorMessage={emailError} />
                            <Input placeHolder=" " type="password" label="Password (6 characters minimum)" setItem={setRegisterPassword} errorMessage={passwordError} />
                            <Input placeHolder=" " type="password" label="Password Confirm" setItem={setRegisterConfirmPassword} errorMessage={confirmPassword} />

                        </div>

                        <p className="fontSize13px">By clicking the "Sign up" button below, I certify that I have read
                            and agree to the TMDB terms of use and privacy policy.
                        </p>

                        <input type="submit" className="loginButton" value="Sign Up" />

                        <div className="newUser" >Already a user?  <Link className="" to={(`/Login/`)}> Login </Link></div>

                    </form>

                </div>

                <Footer />

            </div>

        </div >
    )
}

