import { supabase } from "../../client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function UpdatePasswordForm() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [feedback, setFeedback] = useState(null);

    const checkPasswordMatching = () => {
        return (newPassword != confirmPassword) ? false : true;
    }

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        const isMatching = checkPasswordMatching();
        if(isMatching) {
            try {
                const { data, error } = await supabase.auth.updateUser({
                    password: newPassword,
                  })
                if(error) {
                    console.log('ERROR: ', error.message);
                    setFeedback('Password change unsuccessful. Passwords should be at least 6 characters. Try again.');
                }
                else {
                    setFeedback('Password successfully updated. Try logging in again.');
                }
            } catch (error) {
                console.log('ERROR: ', error.message);
                setFeedback('Password change unsuccessful. Try again.');
            }
        }
        else {
            setFeedback('Passwords do not match. Try again.');
        }
    }
    return(
        <div>
            <h1>Change your password</h1>
            {feedback}
            <form>
                <label>
                    New Password<br/>
                    <input
                        type='text'
                        name='new-password'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </label><br/>
                <label>
                    Confirm New Password<br/>
                    <input
                        type='password'
                        name='confirm-password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label><br/>
                <button
                    type='submit'
                    onClick={handlePasswordChange}
                >
                    Change Password
                </button>
            </form>
        </div>
    );
}