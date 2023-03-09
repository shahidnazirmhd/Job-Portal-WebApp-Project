const correctNo = /^\d{10}$/;
function userDetailsAreValid(email, password, name, confirmEmail, mobileNo, city) {
    return (email && 
    email.includes('@') && 
    password && 
    password.trim().length >= 6 && 
    name && 
    name.trim() !== '' &&
    email === confirmEmail &&
    mobileNo && 
    mobileNo.trim() !== '' &&
    correctNo.test(mobileNo) &&
    city && 
    city.trim() !== '');
}

module.exports = {userDetailsAreValid: userDetailsAreValid};