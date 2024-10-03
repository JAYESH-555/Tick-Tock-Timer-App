import { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import audioFile from '../../assets/time-up.mp3';
import './Countdown.css'

function Countdown(){

    const[target, setTarget] = useState(null);
    const[diff, setDiff] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const id = useRef(null);
    const audioRef = useRef(null);

    function handleStart(){
        const targetDate = new Date(target);

        if (targetDate <= new Date() || !target) {
            toast.error('Please select a valid future date!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            return;
        }

        setIsStarted(true); 
        id.current = setInterval(() => {
            setDiff(targetDate - new Date()); // -> This gives number of milliseconds between target date-time and current date-time. 
        }, 1000);
    }

    useEffect(() => {
        if(diff < 0){
            clearInterval(id.current);
            setDiff(0);
            toast.success('Countdown Time completed!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            audioRef.current.play();
        }
    }, [diff]);

    
    const getDays = () => {
        return Math.floor(diff/(1000*60*60*24)); // -> No. of Days remaining.
    }

    const getHours = () => {
        const hoursInMs = diff%(1000*60*60*24);
        return Math.floor(hoursInMs/(1000*60*60)); // -> No. of Hours remaining.
    }

    const getMinutes = () => {
        const minutesInMs = diff%(1000*60*60);
        return Math.floor(minutesInMs/(1000*60)); // -> No. of Minutes remaining.
    }

    const getSeconds = () => {
        const secondsInMs = diff%(1000*60);
        return Math.floor(secondsInMs/(1000)); // -> No. of Seconds remaining.
    }

    return(
        <>
            <h1>Tick-Tock Timer 
            <img src="https://media0.giphy.com/media/6acQ7ZwsFSCaPOoinC/200.webp?cid=ecf05e47t6di5a0wg2itwq3fs7dal71z3gqys7s9kgz1mudb&ep=v1_gifs_search&rid=200.webp&ct=g" alt="Hourglass" />
            </h1>
            <div id="input">
                <input 
                    type="datetime-local" 
                    id="date-time"
                    onChange={(event) => setTarget(event.target.value)}    
                />

                <button id="start-btn" onClick={handleStart}>Start</button>
            </div>

            {isStarted && (
                <div id="display">
                    <ul>
                        <li><span id="days">{getDays()}</span>Days</li>
                        <li><span id="hours">{getHours()}</span>Hours</li>
                        <li><span id="minutes">{getMinutes()}</span>Minutes</li>
                        <li><span id="seconds">{getSeconds()}</span>Seconds</li>
                    </ul>
                </div>
            )}

            <audio ref={audioRef} src={audioFile} />
            <ToastContainer />
        </>
    );
}


export default Countdown;