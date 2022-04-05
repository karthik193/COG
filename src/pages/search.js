import React from "react" ; 
import '../style/common.css'; 
import '../style/search.css';

export default function Search(){
    return(
        <div>
            <div className="registerSection" align="center">
                <div className="card searchCard">
                <form>
                    <input placeholder="📍 Enter Location"/>
                </form> 
                <button className="submitButton" type="submit">Search Provider</button>
            </div>
            </div>
        </div>
    );
}