import './App.css'
import React,{useEffect,createContext,useReducer, useContext} from "react"
import NavBar from "./components/NavBar"
import {BrowserRouter,Route,Switch,useHistory} from "react-router-dom"
import Home from './components/screens/Home'
import Login from './components/screens/Login'
import Signup from './components/screens/Signup'
import Profile from './components/screens/Profile'
import CreatePost from "./components/screens/Createpost";
import {initialState, reducer} from "./reducers/userReducer"
import AdminPosts from './components/screens/AdminPosts'


export const UserContext = createContext()

const Routing=()=>{
  const history = useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user =JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }
    else{
      history.push('/signin')
    }
  },[])
  return(
    <Switch>
    <Route path="/" exact>
    <Home/>
    </Route>
    <Route path="/profile">
      <Profile/>
    </Route>
    <Route path="/signup">
      <Signup/>
    </Route>
    <Route path="/signin">
      <Login/>
    </Route>
    <Route path="/createpost">
      <CreatePost/>
    </Route>
    <Route path="/adminposts">
      <AdminPosts/>
    </Route>
  </Switch>
  )
}
function App() {
   const [state,dispatch] =useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
        <BrowserRouter>
        <NavBar/>
        <Routing/>
        </BrowserRouter> 
    </UserContext.Provider>
      );
}

export default App;
