import { useNavigate } from "react-router-dom";
import UserSignUpForm from "../../components/UserSignUpForm";
import NavBar from "../../components/NavBar";
export default function SignUpPage({ anonUser, userID, currProfile }) {
    const navigate = useNavigate();
    return(
        <div>
            {anonUser ? (
                <>
                    <h1>Sign up here!</h1>
                    <UserSignUpForm />
                </>
            ) : (
                navigate('/')
            )}
        </div>
    );
}