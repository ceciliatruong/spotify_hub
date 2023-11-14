import { supabase } from "../../client";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function UserSignInForm() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [successfulSignIn, setSuccessfulSignIn] = useState(true);
    const [signInFeedback, setSignInFeedback] = useState(null);
    const navigate = useNavigate();

    const handleSignIn = async(e) => {
      e.preventDefault();
      try {
          const { user:signInUser, error } = await supabase.auth.signInWithPassword({
            email: user.email,
            password: user.password,
            options: {
              redirectTo: 'https://ccs-spotify-hub.netlify.app/'
            }
          })
          if (error) {
            if (error.message === 'Email not confirmed') {
              setSuccessfulSignIn(false);
              setSignInFeedback('Please check your inbox and confirm your email before logging in.');
            } else {
              setSuccessfulSignIn(false);
              setSignInFeedback('Login failed. Please check if you correctly inputted the right email and password.');

              console.error('Error during sign in:', error.message);
            }
          }
          else {
            navigate('/');
          }
        } catch (error) {
          setSuccessfulSignIn(false);
          setSignInFeedback('Login failed. Please check if you correctly inputted the right email and password.');
          console.error('Error:', error.message);
        }        
    }



    return(
        <div>
            {successfulSignIn ? null : signInFeedback}
            <form>
                <label>
                    Email<br/>
                    <input
                        required
                        type='email'
                        name='user-email'
                        value={user.email}
                        onChange={(e) => (setUser({...user, email: e.target.value}))}
                    />
                </label> <br/>
                <label>
                    Password<br/>
                    <input
                        required
                        type='password'
                        name='user-password'
                        value={user.password}
                        onChange={(e) => (setUser({...user, password: e.target.value}))}
                    />
                </label> <br/>
                <button type='submit' onClick={handleSignIn}>
                    Sign In
                </button>
            </form> <br/>
            <Link to='/forgot-password'>Forgot Password?</Link>
        </div>
    );
}