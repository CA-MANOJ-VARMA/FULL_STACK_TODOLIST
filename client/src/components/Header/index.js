import './index.css'
import {Link,withRouter} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch} from 'react-redux'
import {authAction} from '../../redux/store'

const Header = (props) => {
    const isLogin = useSelector(state => state.isLogin)
    const dispatch = useDispatch()
    const {history} = props
    console.log(isLogin)

    const logouFunction = ()=>{
        try {
            dispatch(authAction.logout())
            alert('Logout Successful')
            history.replace('/login')
            localStorage.removeItem('userId')
            localStorage.removeItem('jwtToken')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <ul className='d-flex justify-content-between align-items-center css-navbar-ul-container'>
        <li>
        <Link to='/'>
            <button type="button" class="css-blog-app-button">BLOG APP</button>
        </Link>
        </li>
        {isLogin && 
        <li>
        <div className='css-register-login-container'>
                <Link to='/'>
                <button type="button" class="css-register-button" active>
                    BLOGS
                </button>
                </Link>
                <Link to='/my-blogs'>
                <button type="button" class="css-register-button">
                    MY BLOGS
                </button>
                </Link>
                <Link to='/create-blog'>
                <button type="button" class="css-register-button">
                    CREATE BLOG
                </button>
                </Link>
            </div>
        </li>
        }
        <li>
            <div className='css-register-login-container'>
                {!isLogin ? (
                    <>
                    <Link to='/register'>
                    <button type="button" class="css-register-button">
                        REGISTER
                    </button>
                    </Link>
                    <Link to='/login'>
                    <button type="button" class="css-register-button">
                        LOGIN
                    </button>
                    </Link>
                    </>
                ) :(
                    <button type="button" class="css-register-button" onClick={logouFunction}>
                    LOGOUT
                </button>
               
                )}
                
               
            </div>
        </li>
    </ul>
  )
}

export default withRouter(Header)