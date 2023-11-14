import { supabase } from "../../client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function ExtendedUserSignUpForm({ userId, externalSetProfile }) {
    const [uniqueUsername, setUniqueUsername] = useState(true);
    const [validUsername, setValidUsername] = useState(false);
    const [profile, setProfile] = useState({
        user_id: userId,
        username: '',
        bio: 'No bio yet!',
        icon: '',
    });

    const navigate = useNavigate();


    const checkUsernameUniqueness = async (username) => {
        let { data, error } = await supabase
            .from('user_profiles')
            .select('username')
            .textSearch('username', username);    
    
        if (error) {
            console.error('Error checking username uniqueness:', error);
            return false;
        }
    
        return data.length === 0;
    };
    

    const verifyUsername = async () => {
        const isValid = /^[A-Za-z0-9]+$/.test(profile.username);
        if (!isValid) {
            setValidUsername(false);
            return false;
        }
    
        const isUnique = await checkUsernameUniqueness(profile.username);
        setUniqueUsername(isUnique);
        return isUnique;
    };

    const setToDefault = () => {
        setUniqueUsername(true);
        setValidUsername(false);
        setProfile({
            user_id: userId,
            username: '',
            bio: '',
            icon: '',
        });
    }

    const uploadImage = async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${userId}/${fileName}`;
    
        let { error } = await supabase.storage
            .from('profile-icons')
            .upload(filePath, file);
    
        if (error) {
            console.error('Error uploading file:', error);
            console.log('file path: ',filePath);
            return;
        }

        return filePath;
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const filePath = await uploadImage(file);
        setProfile({...profile, icon: filePath});
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        if(!profile.icon) {
            alert('Please upload an icon before continuing.');
            return;
        }
        const isUnique = await verifyUsername();
        console.log(isUnique);
        if(isUnique) {
            const { error } = await supabase
                .from('user_profiles')
                .insert(profile)

            { (error) ? console.error('Error creating user profile: ', error): (alert('Success!'),setToDefault(), externalSetProfile(profile)) }
        }
        else {
            alert('Sign up failed! Make sure your username is valid.');
        }
    }

    return(
        <div>
            {
                profile ?
                <form>
                    <label>
                        Username<br/>
                        <input
                            required
                            type="text"
                            name='username'
                            value={profile.username}
                            onChange={(e) => setProfile({...profile, username: e.target.value})}
                        />
                        {!validUsername ? <p>Usernames can only include letters and numbers!</p> : null}
                        {!uniqueUsername ? <p>Username is already in use. Try another one!</p> : null}
                    </label><br/>
                    <label>
                        Profile Biography<br/>
                        <textarea 
                            name="bio" 
                            value={profile.bio} 
                            onChange={(e) => setProfile({...profile, bio: e.target.value})} 
                            rows={15} 
                            cols={50}
                        />
                    </label><br/>
                    <label>
                        Profile Icon<br/>
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={handleImageUpload}
                        /> <br/>
                        <p>Only JPEGs and PNGs allowed!</p>
                    </label><br/>
                    <button
                        type="submit"
                        onClick={handleSignUp}
                    >
                        Sign Up
                    </button>
                </form> : <p>Loading...</p>
            }
        </div>
    );

}