import rejectStyle from"./reject.module.css"
import imges from "../../assets/vonecia-carswell-0aMMMUjiiEQ-unsplash.jpg"
import { useEffect, useState } from "react";
function Reject(){
    const user=[
      {
        id: '1',
        firstName: 'Ragesh',
        lastName: 'J',
        profileImage: imges,
      },
      {
        id: '2',
        firstName: 'John',
        lastName: 'Doe',
        profileImage: 'https://via.placeholder.com/150',
      },
      {
        id: '3',
        firstName: 'Jane',
        lastName: 'Smith',
        profileImage: 'https://via.placeholder.com/150',
      }, {
          id: '1',
          firstName: 'Ragesh',
          lastName: 'J',
          profileImage: imges,
        },
        {
          id: '2',
          firstName: 'John',
          lastName: 'Doe',
          profileImage: 'https://via.placeholder.com/150',
        },
        {
          id: '3',
          firstName: 'Jane',
          lastName: 'Smith',
          profileImage: 'https://via.placeholder.com/150',
        },
    ];
    const [bySenderUsers,setBySenderUsers]=useState([])
    const [byReceiverUsers,setByReceiverUsers]=useState([])
    useEffect(()=>{
        const fetchSendrejectList=async()=>{
            const response=await fetch("http://localhost:8000/sender-reject-list",{
                headers:{
                    'Content-type':'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                }
            })
            const data=await response.json()
            if(response.ok){
                setBySenderUsers(data)
                console.log(data)
            }
        }
        const fetchRecieverejectList=async()=>{
            const response=await fetch("http://localhost:8000/receiver-reject-list",{
                headers:{
                    'Content-type':'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                }
            })
            const data=await response.json()
            if(response.ok){
                setByReceiverUsers(data)
                console.log(data)
            }
        }
        fetchSendrejectList()
        fetchRecieverejectList()
        
      },[])
    return<>
     <div className={rejectStyle.reject_list}>
        <h2>Connection you have rejected</h2>
      {byReceiverUsers.map(user => (
        <div key={user._id} className={rejectStyle.reject_list_item} >
          <img src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} className={rejectStyle.profile_image} />
          <div className={rejectStyle.user_info}>
            <h4 className={rejectStyle.user_name}>{user.firstName} {user.lastName}</h4>
          </div>
        </div>
      ))}
    </div>
    <div className={rejectStyle.reject_list}>
        <h2>Connection others have rejected</h2>
      {bySenderUsers.map(user => (
        <div key={user._id} className={rejectStyle.reject_list_item} >
          <img src={user.profileImage} alt={`${user.firstName} ${user.lastName}`} className={rejectStyle.profile_image} />
          <div className={rejectStyle.user_info}>
            <h4 className={rejectStyle.user_name}>{user.firstName} {user.lastName}</h4>
          </div>
        </div>
      ))}
    </div>
    </>

}
export default Reject;