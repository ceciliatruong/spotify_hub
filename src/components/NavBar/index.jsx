import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirecting after logout
import { supabase } from "../../client";
import './NavBar.css'

export default function NavBar({ anonUser, currProfile, setSearchTerm }) {
    const [imageUrl, setImageUrl] = useState();
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        currProfile ? setImageUrl(`https://rrevkztdfkwyzvibaael.supabase.co/storage/v1/object/public/profile-icons/${currProfile.icon}`) : setImageUrl(null);
    }, [currProfile]);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error);
        }
        navigate('/');
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setSearchTerm(searchInput);
    };

    return (
        <nav>
            <div className="nav-title">cc's Spotify Hub</div>
            {anonUser ? (
                <>
                    <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Search post titles..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button type="submit">Search</button>
                    </form>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/sign-in'>Sign In</Link></li>
                        <li><Link to='/sign-up'>Sign Up</Link></li>
                    </ul>
                </>
            ) : (
                <ul>
                    <div>
                        {imageUrl && <img className='user-icon' src={imageUrl} alt={`${currProfile.username}'s profile icon`}/>}
                        <p>{currProfile?.username}</p>
                    </div>
                    <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Search post titles..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <button type="submit">Search</button>
                    </form>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/create-post'>Create Post</Link></li>
                    <li>
                        <button className='log-out'onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            )}
        </nav>
    );
}

