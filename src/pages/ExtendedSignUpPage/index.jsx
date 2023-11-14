import ExtendedUserSignUpForm from "../../components/ExtendedUserSignUpForm";
import NavBar from "../../components/NavBar";
export default function ExtendedUserSignUpPage({ anonUser, userID, currProfile }) {
    return(
        <div>
            { anonUser ? (
                <h1>You don't have access to this link! Try logging in.</h1> 
            ) : (
                <><h1>User Onboarding</h1><ExtendedUserSignUpForm /></>
                )
            }
        </div>
    );
}