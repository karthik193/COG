import React, { useEffect, useState } from "react" ; 
import '../style/common.css'; 
import '../style/assign.css'; 
import { useNavigate, useSearchParams } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";

export default function Assign(){

    const [searchParams , setSearchParams] = useSearchParams(); 
    const [request , setRequest] = useState();
    const navigate = useNavigate(); 
    const requestId  = searchParams.get("id"); 
    const firestore  = getFirestore() ; 

    useEffect(()=>{
        getDoc(doc(firestore , "requests" , requestId)).then( d=>{
            setRequest(d.data());
        })
    }, []);


    console.log(request , "request data" )
    return(
        <div> 
                    <div className="registerSection" align="center">
                    <div class="card assignCard" align="left">
                    {
                        request ?
                        <div>
                            <h1>PROVIDER ASSIGNED</h1>
                            <div class="nameSection">
                                {request.status == 0 ? <p>Waiting for</p> : null}
                                <h2>{request.providerId},</h2>
                                {request.status == 1 ? <p>is getting things ready for you.</p> : null}
                                {request.status == 2 ? <p>is on his way to your location.</p> : null}
                                {request.status == 3 ? <p>reached your location.</p> : null}
                                {request.status == 4 ? <p>OTP VERFIED.</p> : null}
                            </div>
                            {
                                request.status > 0 ?
                                <div class="detailsSection">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><strong>OTP</strong></td>
                                                    <td>{request.otp}</td>
                                                </tr>
                                                <tr>
                                                    <td>Contact</td>
                                                    <td>+91 {request.providerMno}</td>
                                                </tr>
                                            
                                                <tr>
                                                    <td>Location</td>
                                                    <td id="demo" > {request.providerLoc} [<a href={"https://www.google.com/maps/search/" + request.providerLoc} target="#">Maps</a>] </td>
                                                </tr>
                                                
                                                <tr>
                                                    <td>Bike Number</td>
                                                    <td>{request.providerVno}</td>
                                                </tr>
            
                                                <tr>
                                                    <td>Amount to be paid</td>
                                                    <td>{request.amt*4} Rs</td>
                                                </tr>

                                                <tr>
                                                    <td>Charge Requested</td>
                                                    <td>{request.chargeAmt}%</td>
                                                </tr>
                                                
                                            </tbody>
                                        </table>
                                    <button class="submitButton" onClick = {()=>{
                                    window.open("tel:" + request.providerMno) }}>Call</button>
                                    
                                </div>: 
                                null 
                            }

                        </div>
                        : null
                    }
                    <button className="submitButton" style = {{ 
                        marginLeft : ".2rem", 

                    }}
                    onClick={()=>{
                        navigate("/search");
                    }}
                    >Back to Home</button>
                    </div>
                    </div>
                    
        </div>
    );
}