import React, { useState } from "react" ; 
import '../style/common.css'; 
import '../style/assign.css'; 

export default function Assign(){

    const [lat , setLat] = useState(""); 
    const [lng , setLng] = useState(""); 

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos)=>{
                setLat(pos.coords.latitude); 
                setLng(pos.coords.longitude);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    getLocation();

    return(
        <div>
            <div className="registerSection" align="center">
            <div class="card assignCard" align="left">
                <h1>PROVIDER ASSIGNED</h1>
                <div class="nameSection">
                    <h2>Karthik P,</h2>
                    <p>is on his way to your location.</p>
                </div>
                <div class="detailsSection">
                    <table>
                        <tbody>
                            <tr>
                                <td>Contact</td>
                                <td>+91 7834569212</td>
                            </tr>
                           
                            <tr>
                                <td>Location</td>
                                <td id="demo" > {lat + "," + lng} [<a href={"https://www.google.com/maps/search/"+lat + "," + lng} target="#">Maps</a>] </td>
                            </tr>
                            
                            <tr>
                                <td>Bike Number</td>
                                <td>TS E11 2354</td>
                            </tr>

                            <tr>
                                <td>Amount to be paid</td>
                                <td>{10}</td>
                            </tr>

                            <tr>
                                <td>Rating</td>
                                <td>⭐ ⭐ ⭐ 3/5</td>
                            </tr>
                            
                        </tbody>
                    </table>
                    <button class="submitButton" onClick = {()=>{
                        window.open("tel:" + "6281058812") }}>Call</button>
                </div>
            </div>
            </div>

            
        </div>
    );
}