import Navbar from '../components/Navbar'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/Firebase';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { UserData } from '../interfaces/MultifactedUser';
import authRefHelper from '../firebase/AuthRefHelper';
import firebase from '../firebase/Firebase';
import Title from '../components/Title'
import '../styles/Home.css'
import Recommendations from '../components/Recommendations';

function returnListByID(id : string, iSetter : (newItems : any[]) => any) {
    var devRef = firebase.firestore().collection("user_accounts")
    devRef.doc(id).get().then((doc) => {
        if (doc.exists) {
            const dataBlock = doc.data()
            if (dataBlock !== undefined) {
                const aniList = dataBlock.anime_list
                if (aniList !== undefined) {
                    const imDiv = []
                    for (let i = 0; i < aniList.length ; i++) {
                        imDiv.push(
                            <div key={i}>
                                <img
                                    src = {aniList[i].thumbnail}
                                    alt= {"cover picture of " + aniList[i].title}
                                    onClick={() => {window.open(aniList[i].url)}}/>
                                <br></br>
                                <div className='anime-title' aria-label='anime title'>{aniList[i].title}</div>
                                <button onClick={() => {
                                    devRef.doc(id).update({
                                        anime_list : firebase.firestore.FieldValue.arrayRemove(aniList[i])
                                    })
                                    ; returnListByID(id, iSetter)}}> Remove From List </button>
                            </div>
                        )
                    }
                    iSetter(imDiv)
                }
            }
        } else {
            console.log('could not find their id')
        }
    })
}

function Home() {

    const [incomingFriends, setIncomingFriends] = useState<any[]>([])
    const [userList, setList] = useState<any>([])

    // The below code block serves as a listener. After this, you will be able
    // to access both information relating to the GoogleUser and the FirebaseUser.
    const [googleUser, setGoogleUser] = useState<any>(null)
    const [fbUser, setFBUser] = useState<UserData>()
    useEffect(() => {authRefHelper(setGoogleUser, setFBUser)}, [])
    useEffect(() => {getIncomingFriends(); returnListByID(fbUser?.id ?? 'x', setList)}, [fbUser])
    const devRef = firebase.firestore().collection("user_accounts")


    interface EditBoxProps {
        localName : string | undefined,
        localSetName : Dispatch<SetStateAction<string | undefined>>,
        ariaLabel : string
    }

    function EditBox({localName, localSetName, ariaLabel} : EditBoxProps) {
        const [value, setValue] = useState('')
        const editName = (newName : string) => {
            var devRef = firebase.firestore().collection("user_accounts")
            devRef.doc(fbUser?.id).update({
                name : newName
            })
        }

        return(
            <div id='editBox' className='edit-section' aria-label={ariaLabel}>
                <input
                    value={value}
                    placeholder="New Name"
                    onChange={(ev) => setValue(ev.target.value)}
                    aria-label={'name change'}>
                </input>
                <br/>
                <button onClick={() => {editName(value); localSetName(value); setValue('')}}>Click to Change Name</button>
            </div>
        )
    }


    const getIncomingFriends = () => {
        devRef.get().then((items) => {
            return items.docs.map(doc => doc.data())
        }).then((allUsers)=> {
            getIncomingFriendsHelper(allUsers)
        })
    }

    const getIncomingFriendsHelper = (allUsers : any[]) => {
            devRef.doc(fbUser?.id).get().then((doc) => {
                if (doc.exists) {   
                    const dataBlock = doc.data()
                    if (dataBlock !== undefined) {
                        const incomingFriends = dataBlock.incoming_friends
                        if (incomingFriends !== undefined) {
                            const incomingFriendObjects = []
                            for (let i = 0; i < incomingFriends.length; i++) {
                                let incomingFriend = incomingFriends[i]
                                let userDict : Map<string, any> = new Map(allUsers.map(x => [x.id, x]))
                                if (userDict.has(incomingFriend)) {
                                    let incomingFriendObject = userDict.get(incomingFriend)
                                    console.log(incomingFriendObject.photoURL)
                                    incomingFriendObjects.push(
                                            <div key={i}>
                                                <img
                                                    src = {incomingFriendObject.photoURL}
                                                    alt= {"profile picture for " + incomingFriendObject.name}
                                                    onClick= {() => {acceptFriendRequest(incomingFriend)}}
                                                    referrerPolicy="no-referrer"/>
                                                <br></br>
                                                <p>{incomingFriendObject.name}</p>
                                            </div>
                                        )
                                }
                            }
                            setIncomingFriends(incomingFriendObjects)
                        }
                    }
                }
            })  
        }

    const acceptFriendRequest = (acceptedID : string) => {
        console.log(acceptedID)
        devRef.doc(acceptedID).get().then((doc) => {
            if (doc.exists) {
                const dataBlock = doc.data()
                if (dataBlock !== undefined) {
                    devRef.doc(acceptedID).update({
                        friend_list : firebase.firestore.FieldValue.arrayUnion(fbUser?.id)
                    })
                    console.log('added!')
                }
                return true
            } else {
                return false
            }
        }).then((foundUser) => {
            devRef.doc(fbUser?.id).update({
                incoming_friends : firebase.firestore.FieldValue.arrayRemove(acceptedID)
            })
            if (foundUser) {
                devRef.doc(fbUser?.id).update({
                    friend_list : firebase.firestore.FieldValue.arrayUnion(acceptedID)
                }).then(() => getIncomingFriends())
            } else {
                console.log("Couldn't find the user :((")
            }
        })
    }

    console.log('CHECK!')
    const [name, setName] = useState<string | undefined>(undefined)

    return (
        <div>
            <Title />
            <Navbar/>
            <p>Hi! Welcome to the home page!</p>
            <p>Welcome {name ?? fbUser?.name}! </p>

            <div>
                <img src= {googleUser?.photoURL as string} referrerPolicy="no-referrer"/>
                <br></br>
                <p>User ID: {fbUser?.id}</p> 

                <div>
                    <button onClick = {() => {const change = document.getElementById('editBox')
                                        if(change instanceof HTMLElement) {change.style.display = 'block'}}}> 
                                        Edit Profile </button>
                    <button onClick={() => {signOut(auth)}}> Log Out </button>
                </div>
                
                <br></br>

                <EditBox localName={name} localSetName={setName} ariaLabel='box to edit username'/>
                
            </div>

            <p>Your Watchlist!</p>
            <div 
                className='my-watchlist'
                aria-label='my watchlist'>
                {userList}
            </div>

            <p>Recommended Shows (based on your friends)!</p>
            <Recommendations userObject={fbUser}></Recommendations>


            <p>Incoming Friends Below</p>
            <div>{incomingFriends}</div>

        </div>
    );
  }
  
  export default Home;