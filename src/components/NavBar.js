import React,{useContext} from "react"
import {Link} from "react-router-dom"
import {UserContext} from '../App'
const NavBar = () =>{
    const {state,dispatch} =useContext(UserContext)
    const renderList=()=>{
        console.log(dispatch)
        if(state){
            return [
                <li key="2"><Link to="/profile">Profile</Link></li>,
                <li key="3"><Link to="/createpost">Create Post</Link></li>, 
                <li key="4"><Link to="/adminposts">Posts</Link></li>,       
                <li  key="5">
                 <button className="btn #c62828 red darken-3"
                onClick={()=>{
                  localStorage.clear()
                  dispatch({type:"CLEAR"})
                }}
                >
                    Logout
                </button>
                </li>
               ]
        }
        else{
          return [
           <li  key="6"><Link to="/signin">Signin</Link></li>,
           <li  key="7"><Link to="/signup">Signup</Link></li>
           ]
        }
    }
    return(
        <nav>
            <div className="nav-wrapper blue">
            <Link to={state?"/":"/signin"} className="brand-logo left">Library</Link>
            <ul id="nav-mobile" className="right">  
            {renderList()}
            </ul>
            </div>
        </nav>
    )
}
export default NavBar;