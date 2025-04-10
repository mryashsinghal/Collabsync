import React from 'react'
import { createContext, useEffect } from "react";
import axios from 'axios'

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
    let [id,setId] = React.useState('');
    let [rooms, setRooms] = React.useState([]);
    let [topicId,setTopicId] = React.useState('');
    let [msgList, setMsgList] = React.useState([]);
    let [login,setLogin] = React.useState(false);
    let [image,setImage] = React.useState(null);
    let [person,setPerson] = React.useState(null);
    let [icon, setIcon] = React.useState(localStorage.getItem('profile'));
    let [user,setUser] = React.useState(null);
    const url = 'http://localhost:5000';
    useEffect(()=>{
           setId(localStorage.getItem("id"));
           const handledata = async () => {
            try {
              const res = await axios.get(`http://localhost:5000/api/users/profile/${localStorage.getItem("id")}`, {
                headers: { "Content-Type": "application/json" }
              });
              if (res.status === 200) {
                setPerson(res.data[0]);
                setImage(res.data[0].profilePicture);
                console.log(person);
              } else {
                alert("Error: " + res.data.message);
              }
            } catch (error) {
              console.error("Error fetching profile data", error);
            }
          };
          handledata();
    },[])
   
    const contextValue = {
        id,
        setId,
        rooms,
        topicId,
        setTopicId,
        setMsgList,
        msgList,
        login,
        icon,
        setIcon,
        image,
        setImage,
        user,
        setUser,
        url
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
