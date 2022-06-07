import React, { useEffect , useState } from "react";
import RequestCard from "../components/requestCard";
import "../style/common.css";
import "../style/requests.css";
import firebase from "../firebase";

export default function Requests(){
    const [requests , setRequests] = useState([{
        userData : {
            id: "karthik.pasupulatei", 
            location : "17.3602217,78.5079683"
        }
    },
    {
        userData : {
            id: "karthik.pasupulatei", 
            location : "17.3602217,78.5079683"
        }
    }]); 

    useEffect(()=>{
        // load requests from the real time database
    },[]); 

    const handleAcceptRequest = (userData)=>{

    }
    const handleDeclineRequest = (userData)=>{

    }

    const db = firebase.database() ;
    const fetchRequest = db.ref("requests/")
    fetchRequest.on("child_added", function (snapshot) {
        const message = snapshot.val();
        requests.setRequests(preRequests =>{
            return(
                [
                    ...preRequests,
                    {
                        userData : message
                    }
                ]
            )
        })
    });
    return(
        <div >
            <div className="registerSection" align="center">
                <div className="card">REQUESTS</div>
                <div  className="requestsSection">
                {
                    requests.map((request , index)=>{

                        console.log(request)
                        return(
                            <div>
                                <RequestCard
                                key={index}
                                userData={request.userData} 
                                onAccept={()=>handleAcceptRequest(request.userData)}  
                                onDecline={()=>handleDeclineRequest(request.userData)} 
                                ></RequestCard>
                            </div>
                        );
                    })
                }
                </div>
               
            </div>
        </div>
    );
}