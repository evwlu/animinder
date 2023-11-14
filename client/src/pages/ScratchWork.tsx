import { useState, useEffect } from 'react';
import firebase, { signInWithGoogle, signOutWithGoogle } from '../firebase/Firebase';
import AccountBlock from '../components/AccountBlock';
import AccountCreator from '../components/AccountCreator';
import Home from './Home'
import Navbar from '../components/Navbar';
import Title from '../components/Title'

const ref = firebase.firestore().collection("user_accounts")

function ScratchWork() {

  // Here we access the collection "developers". See the GitHub PR to see what
  // the collection entails. 
  // The structure of this collection:
    // name: developers
    // documents fields: 
      // name : string
      // email : string
    // (e.g.)
      // name: Evan
      // email: evan_lu@brown.edu
  // 
  const [data, setData] = useState<any[]>([])
  // Only displays the data once something has been loaded.
  const [loaded, setLoaded] = useState(false)

  // The getData method utilizes the reference to the collection and takes a 
  // snapshot of the data at the moment. It then pushes all the data for each document
  // in said collection to a list (items) and sets the value of Data to whatever
  // was in the collection. setLoaded is then set to true since we have loaded the
  // data.
  // 
  // THIS WILL CONSTANTLY UPDATE.
  function getData() {
    ref.onSnapshot((q) => {
      const items : any[] = []
      q.forEach((doc) => {items.push(doc.data())})
      setData(items)
      setLoaded(true)
    })
  }

  // The getDataSingular is getData, but it only will get the data a single time when on a page.
  //
  // This is generally the go-to method. If we want constant updates, simply change the
  // last line of the useEffect from "}, [])" to "}, [data])" 
  function getDataSingular() {
    ref.get().then((item) => {
      const items = item.docs.map((doc) => doc.data())
      console.log(items)
      setData(items)
      setLoaded(true)
    })
  }

  // The power of useEffect is that we will dynamically update data without needing
  // to reload the page or anything. Data will automatically change when we update
  // the Firebase library.
  useEffect(() => {
    getDataSingular()
  }, [])

  return (
    <div>
        <Title />
        <Navbar></Navbar>
      Title Goes Here

      {/* We only display the information once it has been loaded. We also
      use map to list out all documents in the collection */}
      {loaded === true && data.map((dev) => (
          <AccountBlock dev={dev} key={dev.id}/>
        ))
      }

      <AccountCreator></AccountCreator>

      <button onClick={signInWithGoogle}> Sign In With Google Experimentation</button>
      <h1> {localStorage.getItem('name')} </h1>
      <h1> {localStorage.getItem('email')} </h1>
      <img src={localStorage.getItem('profPic') as string | undefined} />
      
      <button onClick={signOutWithGoogle}> Sign Out </button>

    </div>
  );
}

export {ref};
export default ScratchWork