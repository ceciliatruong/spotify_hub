import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserSignInForm from '../../components/UserSignInForm';
import NavBar from '../../components/NavBar';

export default function SignInPage({ anonUser, userID, currProfile }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!anonUser) {
            navigate('/home');
        }
    }, [anonUser, navigate]);

    return (
        <div>
            <h1>Sign In</h1>
            <UserSignInForm/>
        </div>
    );
}
