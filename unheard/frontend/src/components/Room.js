import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'

function Room(props) {
  const [getVotesToSkip,setVotesToSkip]= useState(2)
  const [getGuestCanPause,setGuestCanPause]= useState(false)
  const [getIsHost,setIsHost]= useState(false)
  useEffect(()=>{getRoomDetails()})
  let {roomCode} = useParams()

  function getRoomDetails(){
    fetch("/api/get-room" + "?code=" + {roomCode})
      .then((response) => response.json())
      .then((data) => {
        setVotesToSkip = data.votes_to_skip
        setGuestCanPause = data.guest_can_pause
        setIsHost = data.is_host
        
      });
  }
  
  return (
    <div>
      <h3>{roomCode}</h3>
        <p>Votes: {getVotesToSkip}</p>
        <p>Guest Can Pause: {getGuestCanPause.toString()}</p>
        <p>Host: {getIsHost.toString()}</p>
    </div>
  )
}


export default Room
