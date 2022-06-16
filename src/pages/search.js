import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {React , useState} from "react" ; 
import { useNavigate } from "react-router-dom";
import getNewProvider, { addNewRequest } from "../functions/database";
import '../style/common.css'; 
import '../style/search.css';


export default function Search(){

    
    const navigate  = useNavigate(); 
    const [request, setQuery] = useState("");
    const [chargeQuantity , setChargeQuantity] = useState(0);
    const [lat , setLat] = useState(""); 
    const [lng , setLng] = useState("");
    const auth = getAuth();

    var handleSubmit  = async (event)=>{
        event.preventDefault() ; 
        if(chargeQuantity <=0  || request  === ""){
            alert("invalid inputs"); 
            return ;
        }

        //addding to requests
        const db  = getFirestore();
        const newRequest  = {
            userId : localStorage.getItem("email"), 
            userLoc : lat + "," + lng, 
            userMno : localStorage.getItem("mobileNo"),
            amt : chargeQuantity * 1, 
            chargeAmt : chargeQuantity, 
            declinedList : [],
            id : "", 
            providerId : await getNewProvider().then(res=> res), 
            providerLoc: "", 
            providerMno: "", 
            status : 0
        }

        console.log(newRequest , "<NEW REQUEST>" )
        addNewRequest(newRequest);
        navigate('/myrequests'); 
    }
    
  
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos)=>{
                setLat(pos.coords.latitude); 
                setLng(pos.coords.longitude);
                return (pos.coords.latitude + "," + pos.coords.longitude);
            });
        } else {
            alert("Geolocation is not supported by this browser.");
            return null ; 
        }
    }
    getLocation();
    const handleCurrentLocation = (event)=>{
        var locationElement  = document.getElementById("search_input") ; 
        locationElement.value  = "getting current location";
        setTimeout(()=>{
            locationElement.value  = lat + "," + lng ;
            setQuery(locationElement.value);
        }, 1000);
        

    }

    const handleLogOut  = ()=>{
        localStorage.clear();
        auth.signOut();
    
        setTimeout(() => {
          navigate("/");
        }, 200);
    }

    return(
        <div>
            <div className="registerSection" align="center">
              <div className="card searchCard" align="left">
                <form onSubmit={handleSubmit}>
                    <input 
                    placeholder="📍 Enter Location" 
                    type = "text" id="search_input"
                    name = "location"
                    onChange={event => setQuery(event.target.value)}
                    />
                    <p onClick={handleCurrentLocation} className="currentLocBtn"> Use Current Location</p>

                    <h5>Charge Required (%) </h5>
                    <input
                        type = "number"
                        placeholder="Enter Amout of Charge"
                        onChange = {event => setChargeQuantity(event.target.value)}
                    />
                    <div>
                    <button className="submitButton" type="submit">Search Provider</button>
                    <button className="backToHomeBtn" style = {{ 
                        float : "right"

                    }}
                    onClick={()=>{
                        navigate("/myrequests");
                    }}
                    >MY REQUESTS</button> 
                    </div>
                    
                </form>

                
                
            </div>
            </div>

            <div 
            className="logoutButton" 
            onClick={()=> handleLogOut()}
            >Log Out</div> 
        </div>
    );
}
