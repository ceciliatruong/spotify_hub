import { supabase } from "../../client";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import UpdatePasswordForm from "../../components/UpdatePasswordForm";
export default function PasswordRecoveryPage( { anonUser, userID, currProfile } ) {
    const navigate = useNavigate();
    return(
        <div>
            {anonUser ? (
                <><h1>Password Recovery</h1>
                <UpdatePasswordForm/></>
            ) : (
                navigate('/')
            )}
        </div>
    );
}