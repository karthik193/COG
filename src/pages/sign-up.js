import React, { useState } from "react" ;
import { getAuth ,  createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth";


import '../style/common.css'; 
import '../style/signUp.css';
import { useNavigate } from "react-router-dom";

export default function SignUp(){


    const [infoDisplay , setID] = useState("none"); 
    const [CR , setCR] = useState(null);
    const [ls , setLS] = useState(true); 
    const [consumer , setConsumer] = useState(true); 

    const auth = getAuth();
    const navigate = useNavigate() ;  
    
    if(localStorage.getItem("logged") === "true"){
        navigate('/search');
    }

    var signUp = (email , password)=>{
        
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            localStorage.setItem("logged" , true); 
            localStorage.setItem("email" , email);
            navigate('/search');
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(errorMessage);
            
        });

    }

    var signIn = (email , password)=>{
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            localStorage.setItem("logged" , true); 
            navigate('/search'); 
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(errorMessage) ; 
        });

    }
    
    var handleSubmit = (event)=>{
        event.preventDefault() ; 
        const email  = event.target.email.value  ; 
        const pass = event.target.pass.value ; 
        

        if(ls){
            console.log(email , pass)
            const mobile = event.target.mobileNo.value ; 
            if(mobile == "")alert("enter mobile number");
            else signUp(email, pass); 
            //add mobile number to firestore
	    
        }
        else{
            signIn(email , pass); 
        }
    }

    return(
        <div>
            <div className="registerSection" align="center">
                <div className="card" align="left">
                    <div className="LSButtons">
                        <button onClick={(event)=>{
                            setLS(true); 
                            var elements = document.getElementsByClassName('goDown')
                            
                            for(var i = 0  ; i < elements.length  ; i++ ){
                                var element = elements[i] ; 
                                console.log(element);
                                element.classList.remove("goDown"); 
                            };

                            event.target.classList.add("goDown"); 
                        }}>Sign Up</button>
                        <button onClick={(event)=>{
                            setLS(false); 
                            var elements = document.getElementsByClassName('goDown')
                            
                            for(var i = 0  ; i < elements.length  ; i++ ){
                                var element = elements[i] ; 
                                console.log(element);
                                element.classList.remove("goDown"); 
                            };
                            event.target.classList.add("goDown"); 
                        }}>Log In</button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input name="email" placeholder="Email" type="email" />
                        {ls?
                        <input name="mobileNo" placeholder="Mobile number" type="tel"/>
                        :null}
                        
                        <div className="info" style={{display:infoDisplay}}>
                            <strong>[i]</strong> An Account already exits with this Email id.
                        </div>
                        <input name="pass" placeholder="Password" type="password"/>
                        {/* {
                            ls?
                            <div className="toggleSection">
                                <p>Consumer</p>
                                <div>
                                    <input type="checkbox" id="checkMe" style={{display : "none"}} 
                                        onClick={()=>{
                                            
                                            
                                            if(document.getElementById("toggleButton").classList.contains("moveRight")){
                                                document.getElementById("toggleButton").classList.remove("moveRight")
                                                setConsumer(true);
                                            }else{
                                                document.getElementById("toggleButton").classList.add("moveRight"); 
                                                setConsumer(false);
                                            }

                                        
                                            console.log(consumer);
                                            
                                        }}
                                    />
                                    <div className="toggle" onClick={()=>{
                                        document.getElementById("checkMe").click() ; 
                                    } }>
                                    <div id="toggleButton"></div>  
                                    </div>
                                </div>
                                <p>Provider</p>
                            </div>
                            :null
                        } */}
                        
                        
                        <button className="submitButton" type="submit" >{ls ? "Sign Up" : "Log In" } </button>
                    </form> 
                </div>
            </div>
        </div>
    );
}
