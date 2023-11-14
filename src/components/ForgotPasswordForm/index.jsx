import { supabase } from "../../client";
import { useState } from "react";
export default function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState(null);

    const handleForgetPassword = async(e) => {
        e.preventDefault();

        try {
            let { data, error } = await supabase.auth.resetPasswordForEmail(email, {redirectTo:'http://localhost:5173/password-recovery'});
            if(error) {
                if(error.message == 'For security purposes, you can only request this once every 60 seconds') {
                    setFeedback('For security purposes, you can only request this once every 60 seconds.');
                    console.error('ERROR: ', error.message);
                }
                else {
                    setFeedback('Error trying to send your email. Check if your email is correct.');
                    console.error('ERROR: ', error.message);
                }
            }
            else {
                setFeedback('Forgot password email has been sent. Check your inbox!');
            }
        } catch (error) {
            if(error) {
                setFeedback('Error trying to send your email. Check if your email is correct.');
                console.error('Error:', error.message);
            }
        }
    }
    return(
        <div>
            {feedback}
            <form>
                <label>
                    Email<br/>
                    <input
                        type='email'
                        name='user-email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label><br/>
                <button
                    type='submit'
                    onClick={handleForgetPassword}
                >
                    Send
                </button>
            </form>
        </div>
    );
}