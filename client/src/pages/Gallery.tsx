import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../components/Navbar";
import firebase from '../firebase/Firebase';
import Title from '../components/Title'
import "../styles/Gallery.css"

export function GalleryHome() {

    const [queriedID, setQueriedID] = useState('')
    const navigate = useNavigate()

    return (
        <div className="user-div" >
            <Title />
            <Navbar/>
            <div className="user-text">Enter someone else's UID to look into their profile.</div>
            <input
                className="user-id-search"
                value={queriedID}
                placeholder="Enter a user's profile UID"
                onChange={(ev) => setQueriedID(ev.target.value)}
                aria-label={'searchbar'}>
            </input>
            <button 
            className="gallery-button"
            aria-label="press to search for user gallery"
            onClick={() => {navigate('/gallery/' + queriedID)}}> Send me to the site</button>
        </div>
    );
  }


export function IndividualGallery() {
    
    const params = useParams()
    const queriedID = params.id
    const navigate = useNavigate()
    var devRef = firebase.firestore().collection("user_accounts")

    const [itemList, setItemList] = useState<any[]>([])

    function returnListByID(id : string | undefined, iSetter : (newItems : any[]) => any) {
        devRef.doc(id).get().then((doc) => {
            if (doc.exists) {
                const dataBlock = doc.data()
                if (dataBlock !== undefined) {
                    const aniList = dataBlock.anime_list
                    if (aniList !== undefined) {
                        const imDiv = []
                        for (let i = 0; i < aniList.length ; i++) {
                            imDiv.push(
                                <div >
                                <img
                                    src = {aniList[i].thumbnail}
                                    alt= {"cover picture of " + aniList[i].title}
                                    onClick={() => {window.open(aniList[i].url)}}/>
                                <br></br>
                                <div className='anime-title' aria-label='anime title'>{aniList[i].title}</div>
                            </div>
                            )
                            iSetter(imDiv)
                        }
                    }
                }
            } else {
                console.log('could not find their id')
            }
        })
    }
    returnListByID(queriedID, setItemList)

    return (
        <div>
            <Title />
            <Navbar/>
            <div
            className='my-watchlist'
            aria-label='my watchlist'>{itemList}</div>
            
            <button onClick={() => {navigate(-1)}}> Take me back </button>
        </div>
    );
}