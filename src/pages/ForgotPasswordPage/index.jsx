import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "../../components/ForgotPasswordForm";
import NavBar from "../../components/NavBar";
export default function ForgotPasswordPage( { anonUser, userID, currProfile } ) {
    const navigate = useNavigate();
    return(
        <div>
            {anonUser ? (
                <><h1>Forgot Password?</h1>
                <ForgotPasswordForm/></>
            ) : (
                navigate('/')
            )}
        </div>
    );
}