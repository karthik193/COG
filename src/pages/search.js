import {React , useState , useEffect , useRef} from "react" ; 
import { useNavigate } from "react-router-dom";
import '../style/common.css'; 
import '../style/search.css';

let autoComplete;

    const loadScript = (url, callback) => {
      let script = document.createElement("script");
      script.type = "text/javascript";
    
      if (script.readyState) {
        script.onreadystatechange = function() {
          if (script.readyState === "loaded" || script.readyState === "complete") {
            script.onreadystatechange = null;
            callback();
          }
        };
      } else {
        script.onload = () => callback();
      }
    
      script.src = url;
      document.getElementsByTagName("head")[0].appendChild(script);
    };
    
    function handleScriptLoad(updateQuery, autoCompleteRef) {
      autoComplete = new window.google.maps.places.Autocomplete(
        autoCompleteRef.current,
        { types: ["(cities)"], componentRestrictions: { country: "us" } }
      );
      autoComplete.setFields(["address_components", "formatted_address"]);
      autoComplete.addListener("place_changed", () =>
        handlePlaceSelect(updateQuery)
      );
    }
    
    async function handlePlaceSelect(updateQuery) {
      const addressObject = autoComplete.getPlace();
      const query = addressObject.formatted_address;
      updateQuery(query);
      console.log(addressObject);
}
export default function Search(){

    
    const navigator  = useNavigate(); 
    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);
    
    useEffect(() => {
        loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
        () => handleScriptLoad(setQuery, autoCompleteRef)
        );
    }, []);


    var handleSubmit  = (event)=>{
        event.preventDefault() ; 

        navigator('/assign'); 
    }
    return(
        <div>
            <div className="registerSection" align="center">
                <div className="card searchCard">
                <form onSubmit={handleSubmit}>
                    <input 
                    placeholder="📍 Enter Location" 
                    type = "text" id="search_input"
                    ref={autoCompleteRef}
                    onChange={event => setQuery(event.target.value)}
                    />
                    <button className="submitButton" type="submit">Search Provider</button>
                </form> 
                
            </div>
            </div>
        </div>
    );
}