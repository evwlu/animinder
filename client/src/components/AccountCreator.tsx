import React, {useState} from 'react'
import {ref} from '../pages/ScratchWork'
import {v4 as uuidv4} from 'uuid'

interface AccountProps {
    name: string
    email : string
    id : string
}

function generateAccount({name, email, id} : AccountProps) {
    ref.doc().set({name, email, id}).catch((e) => console.log(e))
}

function AccountCreator() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    return (
        <div>
            <input type='text' id='nameBox' placeholder='name' onChange={((e) => setName(e.target.value))}/>
            <input type='text' id='emailBox' placeholder='email' onChange={((e) => setEmail(e.target.value))}/>
            <button onClick={() => {
                // const nameBox = document.getElementById('nameBox') as HTMLInputElement
                // const emailBox = document.getElementById('emailBox') as HTMLInputElement
                // const id = uuidv4()
                // console.log(id)

                // generateAccount({name, email, id})
                
                // nameBox.value = ''
                // setName('')
                // emailBox.value = ''
                // setEmail('')
            }}> Input User Information (OLD, DO NOT USE ANYMORE; REFERENCE CODE IN ACCOUNTCREATOR) </button>
        </div>
    )
}

export default AccountCreator