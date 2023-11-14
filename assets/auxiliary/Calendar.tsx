// Calendar section. This is the second page of the website. It is currently
// unused, but it is a good example of how to use the Navbar and Title components.
// This is a next step for the website.

/*
import Navbar from "../components/Navbar";
import { useEffect, useState } from 'react';
import { UserData } from '../interfaces/MultifactedUser';
import authRefHelper from '../firebase/AuthRefHelper';
import firebase from '../firebase/Firebase';
import Title from '../components/Title'

function Calendar() {
    // The below code block serves as a listener. After this, you will be able
    // to access both information relating to the GoogleUser and the FirebaseUser.
    const [googleUser, setGoogleUser] = useState<any>(null)
    const [fbUser, setFBUser] = useState<UserData>()
    useEffect(() => {authRefHelper(setGoogleUser, setFBUser)}, [])
    var devRef = firebase.firestore().collection("user_accounts")

    return (
        <div>
            <Title />
            <Navbar />
            <p>Hi, this is a second page</p>
        </div>
    );
  }
  
export default Calendar;
*/