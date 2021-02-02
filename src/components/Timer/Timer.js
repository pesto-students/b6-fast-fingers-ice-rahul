import React, { useState, useContext, useRef, useEffect } from 'react';
import { AppContext } from '../../components';
import './Timer.css';

function Timer() {
    const [appData, setAppData] = useContext(AppContext);
    const [status, setStatus] = useState(0);
    let timer = useRef(null);
    const [timeUnits,setTimeUnits]=useState({
        minutes:3,seconds:59
    })


    useEffect(()=>{
        myInterval(timeUnits)
        // return ()=>(
        //     clearInterval(myInterval)
        // )
    },[timeUnits])

    const myInterval =(time)=>(
        setInterval(() => {
            const { seconds, minutes } = time
            const decSec=seconds - 1
            if (seconds > 0) {
                setTimeUnits((prevValue) => {
                        return {
                            ...prevValue,
                            seconds:decSec
                        }
                    }
                )
            }
            if (seconds === 0) {
              if (minutes === 0) {
              //  clearInterval(myInterval)
              } else {
                  
                setTimeUnits(
                    {...time,minutes: minutes - 1,
                        seconds: 59}
                )
              }
            }
            console.log('timer',time)
          }, 1000)  
    )

//     useEffect(() => {
//         if(appData.pageIndex === 1) {
//  //           timer.current = setInterval(() => {
//                 setStatus(status<500 ? status + 50 : 0);
//                 console.log(status);
//  //           } ,1000);
//         }
//     })

  return (
    <div className="timerContainer">
       {console.log('render===>',)}
        <svg
            className="background-ring"
            width="200"
            height="200">
            <circle
                className="progress-ring__circle"
                stroke="#FFFFFFA6"
                strokeWidth="10"
                fill="transparent"
                r="80"
                cx="100"
                cy="100"/>
        </svg>
        <svg
            className="progress-ring"
            width="200"
            height="200">
            <circle
                className="progress-ring__circle"
                stroke="#FF5155"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={`${status}, 502`}
                strokeLinecap="round"
                r="80"
                cx="100"
                cy="100"/>
            <text 
                style={{fontFamily: 'Gotham', fontSize: '3em'}}
                x="50%" 
                y="50%" 
                textAnchor="middle" 
                stroke="#FFFFFF" 
                fill="#FFFFFF"
                strokeWidth="2px" 
                dy=".3em">
                2:14
            </text>    
        </svg>
    </div>
  );
}

export default Timer;
