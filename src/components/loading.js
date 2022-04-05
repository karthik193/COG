import React from "react" ; 
import '../style/loading.css'; 

export default function Loading(){
    return(
        <div align="center">
            <div className="loadingSection" >
                <div className="loader"></div>
                <p className="loadText">SEARCHING FOR NEAREST PROVIDER</p>
            </div>
        </div>
        
    );
}