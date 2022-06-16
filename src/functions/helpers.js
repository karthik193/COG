function generateOTP() {
          
    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    const OTP = new Promise((resolve, reject)=>{
        let otp ="";
        for (let i = 0; i < 4; i++ ) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        resolve(otp);
    })
    
    return OTP;
}
  

export {
    generateOTP
}