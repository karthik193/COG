import React from "react" ; 
import '../style/common.css'; 
import '../style/assign.css'; 

export default function Assign(){
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
                                <td>Near KPHB Metro Station </td>
                            </tr>
                            
                            <tr>
                                <td>Bike Number</td>
                                <td>TS E11 2354</td>
                            </tr>

                            <tr>
                                <td>Rating</td>
                                <td>⭐ ⭐ ⭐ 3/5</td>
                            </tr>
                            
                        </tbody>
                    </table>
                    <button class="submitButton">Call</button>
                </div>
            </div>
            </div>
        </div>
    );
}