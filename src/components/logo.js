import React  from "react";
import "../style/logo.css" ; 
import "../style/common.css" ; 

export default function Logo(){

    return(
        <div>
            <div className="logo">
                <img src="/logo.png" style = {{
                    width : "140px" , 
                    height : "140px", 
                    position : "relative", 
                    left : "-2.7rem", 
                    top : "-2.7rem"
                }} />
            </div>
            
        </div>
    );
}