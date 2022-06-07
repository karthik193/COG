import {getFirestore , collection, query , setDoc  , doc} from "firebase/firestore";
import {React , useState} from "react" ; 
import { useNavigate } from "react-router-dom";
import '../style/common.css'; 
import '../style/search.css';


export default function Search(){

    
    const navigate  = useNavigate(); 
    const [request, setQuery] = useState("");
    const [chargeQuantity , setChargeQuantity] = useState(0);
    const [lat , setLat] = useState(""); 
    const [lng , setLng] = useState("");

    var handleSubmit  = async (event)=>{
        event.preventDefault() ; 
        if(chargeQuantity <=0  || request  === ""){
            alert("invalid inputs"); 
            return ;
        }

        // sendMessage({
        //     location : query, 
        //     quantity : chargeQuantity
        // })

        //addding to requests
        var requestId  = Date.now().toString();
        const db  = getFirestore();
        const requestCollection  = collection(db , 'requests');

        const docSnap = await setDoc(doc(requestCollection , requestId) , {
            userId : localStorage.getItem("email"),
            amount : chargeQuantity,
            location : request
        }) ; 

        navigate('/assign/' + requestId, {
            location : query,
            chargeQuantity : chargeQuantity
        }); 
    }
    // const db = getDatabase();
    // function sendMessage(request) {
      
    //     // get values to be submitted
    //     const timestamp = Date.now();
      
    //     // create db collection and send in the data
    //     const username = localStorage.getItem("email");
    //     db.ref("requests/" + timestamp).set({
    //       username,
    //       request,
    //     });
    //   } 
  
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
                    <p onClick={handleCurrentLocation}><i class="fa fa-map-marker"></i> Use Current Location</p>
                    <input
                        type = "number"
                        placeholder="Enter Amout of Charge"
                        onChange = {event => setChargeQuantity(event.target.value)}
                    />
                    <button className="submitButton" type="submit">Search Provider</button>
                </form> 
                
            </div>
            </div>
        </div>
    );
}
