import { useEffect } from 'react'
import { Auth } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'

const withProtectedRoute = (Comp, route = '/profile') => (props) => {
  const navigate = useNavigate();
  async function checkAuthState() {
    try {
      await Auth.currentAuthenticatedUser()
    } catch (err) {
        navigate('/profile')
    } 
    }

  useEffect(() => {
    checkAuthState()
    }, [])
    
  return <Comp {...props} />
}

export default withProtectedRoute