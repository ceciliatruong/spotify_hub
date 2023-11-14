import { supabase } from "../../client";
import { useState } from "react";
import './UserSignUpForm.css';

export default function UserSignUpForm() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [uniqueEmail, setUniqueEmail] = useState(true);
    const [passwordStrength, setPasswordStrength] = useState(true);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPasswordStrength(newPassword.length >= 6);
        setUser({...user, password: newPassword});
    }

    const setBackToDefault = () => {
        setUniqueEmail(true);
        setPasswordStrength(true);   
        setUser({
            email: '',
            password: ''
        });
    }

    const handleSignUp = async(e) => {
        e.preventDefault();

        if (passwordStrength) {
            const { user: newUser, error } = await supabase.auth.signUp({
                email: user.email,
                password: user.password,
                options: {
                    emailRedirectTo: 'https://ccs-spotify-hub.netlify.app/onboarding'
                }
            });

            if (error) {
                setUniqueEmail(false);
                console.error('Sign-up error:', error);
                alert('Unsuccessful sign up! Check your email input.');
                return;
            } else {
                alert('Successful sign up! Check your inbox to confirm your email and activate your account.');
                setBackToDefault();
            }
        } else {
            alert('Unsuccessful sign up! Password must be at least 6 characters long.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSignUp}>
                <label>
                    Email <br/>
                    <input 
                        required 
                        type="email" 
                        value={user.email} 
                        onChange={(e) => setUser({...user, email: e.target.value})} 
                    />
                    {!uniqueEmail && <p>Try a different email.</p>}
                </label> <br/>
                <label>
                    Password <br/>
                    <input 
                        required 
                        type="password" 
                        value={user.password} 
                        onChange={handlePasswordChange} 
                    />
                    {!passwordStrength && <p>Password must be at least 6 characters long.</p>}
                </label> <br/>
                <button type="submit">
                    Sign Up
                </button>
            </form>
        </div>
    );
}
