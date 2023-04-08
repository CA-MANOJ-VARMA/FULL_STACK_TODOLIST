import {Redirect, Route} from 'react-router-dom'
// import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const jwtToken = localStorage.getItem('jwtToken')
  console.log(jwtToken)
  if (jwtToken === null) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute