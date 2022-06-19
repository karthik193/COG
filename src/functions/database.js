import { addDoc, collection,deleteDoc,doc,getDocs, getFirestore, query, where } from "firebase/firestore";


const getNewProvider = async ()=>{


    var freeProviders = []; 
    //get all free providers
    const firestore = getFirestore();
    const providersCollection = collection(firestore , "provider") ;
    const q  = query(
        providersCollection , 
        where("free" , "==" , true), 
        where("email" , "!=" , localStorage.getItem("email")) )
    const querySnapshot  = await getDocs(q);

    // add to free Providers

    querySnapshot.forEach(doc =>{
        freeProviders.push(doc.data().email);
    })

    console.log(freeProviders , "<FREE PROVIDERS>")
    const getRandomPI  = parseInt(Math.random() *  freeProviders.length); 

    console.log(freeProviders[getRandomPI] , getRandomPI);

    return freeProviders[getRandomPI]; 
}

const getUserDetails = async ()=>{

    var userDetails = []; 
    const firestore = getFirestore();
    const providerCollection = collection(firestore , "users");
    const q = query(providerCollection , where("email" , "==" , localStorage.getItem("email"))); 
    const qs  = await getDocs(q); 
    var retVal = null ; 
    qs.forEach(proDoc =>{
        retVal = {
            id : proDoc.id, 
            ...proDoc.data()
        }
    })
    return retVal
}


const addNewRequest = async (newRequest)=>{
    const firestore = getFirestore();
    await addDoc(collection(firestore , "requests") ,  newRequest );
}
const deleteRequest = async (requestId)=>{
    const firestore = getFirestore(); 
    await deleteDoc(doc(firestore, "requests", requestId)).then(()=> alert("Request Canceled"))
}
export default getNewProvider ;
export {
    getNewProvider,
    getUserDetails, 
    addNewRequest,
    deleteRequest
}