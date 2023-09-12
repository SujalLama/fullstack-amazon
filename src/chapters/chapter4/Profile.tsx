import { useState, useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { withAuthenticator} from '@aws-amplify/ui-react'
import Container from './Container'

function Profile({signOut}) {
    useEffect(() => {
    checkUser()
    }, [])
    const [user, setUser] = useState({})
    async function checkUser() {
    try {
        const data = await Auth.currentUserPoolUser()
        const userInfo = { username: data.username, ...data.attributes, }
        setUser(userInfo)
    } catch (err) { console.log('error: ', err) }
    }
    return (
    <Container>
        <h1>Profile</h1>
        <h2>Username: {user.username}</h2>
        <h3>Email: {user.email}</h3>
        <h4>Phone: {user.phone_number}</h4>
        <button onClick={signOut}>Sign out</button>
    </Container>
    );
}
    export default withAuthenticator(Profile)