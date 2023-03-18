import React, { useEffect, useState } from 'react'
import {user} from "../Join/Join"
import socketIO from "socket.io-client"
import "./Chat.css"
import sendLogo from "../../images/send.png"
import Message  from '../Message/Message'
import ReactScrollToBottom from "react-scroll-to-bottom"
import closeIcon from "../../images/closeIcon.png"

let socket;
const ENDPOINT = "http://localhost:5000";

const Chat = () => {

  const [id, setid] = useState("")
  const [messages, setMessages] = useState([])
  const send =()=>{
    const message = document.getElementById("chatInput").value;
    socket.emit("message",{message,id})
    document.getElementById("chatInput").value = "";
  }
  
console.log(messages);
  useEffect(() => {
    socket = socketIO(ENDPOINT,{ transports: ["websocket"]});
    
    socket.on("connect",()=>{
      alert("connected");
      setid(socket.id);
    }) 
    //on means to receive data.
    // console.log(socket);
    socket.emit("joined",{ user })  //emit means to send data
    
    socket.on("welcome",(data)=>{
      setMessages([...messages,data]);
      console.log(data.user,data.message);

      //console.log(`hii from ${data.user},${data.message}`);
    })
    
    socket.on("userJoined",(data)=>{
      setMessages([...messages,data]);
      console.log(data.user,data.message);
    })
    socket.on("leave",(data)=>{
      setMessages([...messages,data]);
      console.log(data.user,data.message);
    })

    // socket.on("welcome",({user,message})=>{
    //   console.log(`${user},${message}`);
    // })
    return () => {
      socket.emit("disconnected")
      socket.off()
    }
  }, [])
  

  useEffect(() => {
    socket.on("sendMessage",(data)=>{
      setMessages([...messages,data]);
      console.log(data.user,data.message,data.id)
    })
  
    return () => {
      socket.off();
    }
  }, [messages])
  

  return (
    <div className='chatPage'>
      <div className='chatContainer'>
        <div className="header">
          <h2>O CHAT </h2>
          <a href="/"><img src={closeIcon} alt="close" /></a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {/* <Message  message={"hey,whatsup..!!"}/>
          <Message  message={"hey,whatsup..!!"}/>
          <Message  message={"hey,whatsup..!!"}/> */}
          {messages.map((item,i)=><Message user={item.id===id?"":item.user} message={item.message} key={i} classs={item.id===id?"right":"left"} />)}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input onKeyDown={(e)=>e.key === "Enter"?send():null} type="text" id="chatInput" />
          <button onClick={send} className='sendBtn'><img src={sendLogo} alt="" /></button>
        </div>
      </div>
    </div>
  )
  
}

export default Chat