import React,{useEffect,useState} from "react";
import CountDown from './CountDown'
import CountDownTimer from './CountDownTimer'

const AdminPosts = () =>{
    const [data,setData]=useState([])
    useEffect(()=>{
        fetch('/adminposts',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            setData(result.Posts)
        })
     },[])
    return(
        <div className="home">
            {
                data.map(item=>{
                    return(
                        <div className="card home-card" key={item._id}>
                        <h5>{item.postedBy.name}</h5>
                        <div className="card-image">
                            <img src={item.photo} alt="none"></img>
                    </div>
                    <div className="card-content">
                        <h6>{item.title}</h6>
                        <p>{item.body}</p>
                        <CountDownTimer timer={item.time}></CountDownTimer>

                    </div>
                </div>
                )
            })
            } 
        </div>
        )
}
export default AdminPosts;