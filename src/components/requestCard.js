import React from "react";
import "../style/requests.css"

export default function RequestCard(props){
    
    return(
        <div className="requestCardSection" align="left">
            <div className="requestTitleSection">
                <p>User Id: {props.userData.id}</p>
                <p>Location: <a target="#" href= {"https://www.google.com/maps/search/" + props.userData.location} >{props.userData.location}</a> </p>
            </div>
            <div className="actionSection">
                <button onClick={props.onAccept()}> Accept ✅</button>
                <button onClick={props.onDecline()}> Decline ❌</button>
            </div>
        </div>
    );
}