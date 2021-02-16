// I could not utilize useHistory inside this function because
// it "Breaks the Rules of Hooks" so I had it return a boolean
// and I use the History Hook inside the functional component.
// Any workarounds you have I would love to hear. Thanks! --

const renavigateIfLoggedIn = () => {
    const isAuth = localStorage.getItem('isAuth');
    if (isAuth === "true") {
        console.log("Renavigate. Already logged in.");
        return true;
    } else {
        return false;
    }
}

export default renavigateIfLoggedIn;