import React, { useEffect , useState } from "react";
import RequestCard from "../components/requestCard";
import "../style/common.css";
import "../style/requests.css";
import firebase from "../firebase";
import { collection, Firestore, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { deleteRequest } from "../functions/database";

export default function Requests(){
    const [requests , setRequests] = useState([]); 

    const firestore  = getFirestore();
    const navigate  = useNavigate() ;

    useEffect(()=>{
        // load requests from the real time database

        
        const userId  = localStorage.getItem("email"); 
        const requestCollection = collection(firestore, "requests");
        const getRequest = async ()=>{
            const q  = query(requestCollection , where("userId" , "==" , userId));
            const querySnapshot = await getDocs(q); 
            var res  = [] ; 
            querySnapshot.forEach(doc =>{
                console.log("ere")
                console.log(doc.data(), "data");

                res.push({ 
                    ...doc.data(),
                    id : doc.id,
                });
            })
            setRequests(res);
        }

        getRequest();

    },[]); 


    const handleViewRequest = (requestId)=>{
        navigate("/request?id=" + requestId)
    }

    const handleCancelRequest = (requestId , index)=>{
        deleteRequest(requestId).then(()=>{

            console.log("index>>" , index);
            let filteredRequests = requests.filter((value , idx)=>{
                return (idx !== index) ; 
            })
            setRequests(filteredRequests);
        });
    }
    console.log(requests , "requests");
    return(
        <div >
            <div className="registerSection" align="center">
                <div className="card">REQUESTS</div>
                <button className="backToHomeBtn" style = {{ 
                        marginLeft : ".2rem", 

                    }}
                    onClick={()=>{
                        navigate("/search");
                    }}
                    >Back to Home</button>
                <div  className="requestsSection">
                {
                    requests.map((request , index)=>{

                        console.log(request)
                        return(
                            <div className="requestCardSection" align="left" key={index}>
                                <h5>Provider Id</h5>
                                <p>{request.providerId}</p>
                                <h5>Charge Requested</h5>
                                <p>{request.chargeAmt}%</p>
                                <button onClick={()=>handleViewRequest(request.id)}>View Request Details</button>
                                {
                                    request.status === 0 ? 
                                    <button onClick={()=>handleCancelRequest(request.id , index)}>Cancel Request</button>
                                    : 
                                    null
                                }
                            </div>
                        );
                    })
                }
                </div>
               
            </div>
        </div>
    );
}