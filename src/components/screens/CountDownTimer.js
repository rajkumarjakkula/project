import React,{useRef, useState,useEffect} from 'react'
const CountDownTimer=(props)=>{
    const [timerdays,setTimerdays]=useState('00')
    const [timerhours,setTimerHours]=useState('00')
    const [timerminutes,setTimerminutes]=useState('00')
    const [timerseconds,setTimerseconds]=useState('00')
    let interval = useRef();
    const startTimer =()=>{
        let xpic =props.timer
        const countdowndate=parseInt(xpic)+1296000000
        interval = setInterval(()=>{
            const now = new Date().getTime();
            const distance =countdowndate - now

            const days = Math.floor(distance / (1000*60*60*24));
            const hours = Math.floor((distance % (1000*60*60*24) / (1000*60*60)));
            const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
            const seconds = Math.floor((distance % (1000*60)) / 1000);

            if (distance<0){
               clearInterval(interval.current)
            }
            else{
                setTimerdays(days)
                setTimerHours(hours)
                setTimerminutes(minutes)
                setTimerseconds(seconds)
            }
        },1000);
    }
    useEffect(()=>{
        startTimer();
        return()=>{
            clearInterval(interval.current);
        };
    });
    return(
        <div>{timerdays}days:{timerhours}hours:{timerminutes}minutes:{timerseconds}Seconds</div>
    )
};
export default CountDownTimer;