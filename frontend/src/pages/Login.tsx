import React, { useState, useEffect } from "react"
import GoogleButton from 'react-google-button'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import firebase, { auth } from "../firebase/Firebase"
import { useNavigate } from "react-router-dom"
import { createAccountOrLogin } from "../firebase/AuthRefHelper"

function Login() {
    const navigate = useNavigate()
    const [authenticating, setAuthenticating] = useState(false)

    const signInWithGoogle = () => {
        console.log('i have been called')
        setAuthenticating(true)
        signInWithPopup(auth, new GoogleAuthProvider())
            .then(response => {
                createAccountOrLogin(response.user, response.user.uid)
                navigate('/')
            }).catch(e => {
                console.log(e)
                setAuthenticating(false)
            })
    }

    return (
            <div>
                Login Page
                <GoogleButton onClick={() => signInWithGoogle()} disabled={authenticating}></GoogleButton>
            </div>
    )
}

export default Login