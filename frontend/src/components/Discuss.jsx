import React, { useContext } from 'react';
import Chat from './Chat'
import { StoreContext } from '../context/StoreContext';

const Discuss = ({project}) => {
    const userId = localStorage.getItem('id');
    let { icon,profile,user } = useContext(StoreContext);
    //console.log(user);
  return (
    <div>
         <Chat projectId = {project._id} userId={userId} userProfile={icon} userName={user.username}/>
      
    </div>
  )
}

export default Discuss
