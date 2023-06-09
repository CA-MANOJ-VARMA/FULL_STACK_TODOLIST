import Header from './components/Header';
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import AllBlogs from './components/AllBlogs'
import MyBlogs from './components/MyBlogs'
import CreateBlog from './components/CreateBlog';
import EditBlog from './components/EditBlog';
import ProtectedRoute from './ProtectedRoute'
import {Switch, Route, Redirect} from 'react-router-dom'

import './App.css';

function App() {
  return (
    <>
    <Header/>
    <Switch>
      <Route exact path='/' component={AllBlogs}/>
      <Route exact path='/register' component={Register}/>
      <Route exact path='/login' component={Login}/>
      <ProtectedRoute exact path='/my-blogs' component={MyBlogs}/>
      <ProtectedRoute exact path='/create-blog' component={CreateBlog}/>
      <ProtectedRoute exact path='/edit-blog/:id' component={EditBlog}/>
    </Switch>
    </>
  );
}

export default App;
