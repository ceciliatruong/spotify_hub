import './PostContainer.css';
import { supabase } from '../../client';
import { useState } from 'react';
import SpotifyEmbed from '../SpotifyEmbed';
import { Link, useNavigate } from 'react-router-dom';
export default function PostContainer({ post_id, anonUser, curr_user_id, user_id, created_at, username, icon, title, description, spotify_type, spotify_id, likes }) {
    const [likeCount, setLikeCount] = useState(likes);
    const imageUrl = `https://rrevkztdfkwyzvibaael.supabase.co/storage/v1/object/public/profile-icons/${icon}`;
    const formattedDate = new Date(created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const navigate = useNavigate();
    const handleLike = async () => {
        setLikeCount(prev => prev + 1);
        const { data, error } = await supabase
            .from('posts')
            .update({ likes: likeCount + 1 })
            .match({ post_id });

        if (error) {
            console.error('Error updating likes', error);
            return;
        }
    };
    const handleDeletePost = async () => {
        const confirmation = window.confirm("Are you sure you want to delete this post?");
        if(confirmation) {
            const { error } = await supabase
                .from('posts')
                .delete()
                .match({ post_id });

            if (error) {
                console.error('Error deleting the post:', error);
            } else {
                navigate('/');
            }
        }
    };

    return (
        <div className="post-container">
            <div className="user-info">
                <img src={imageUrl} alt={username} className="user-icon" />
                <div>
                    <div className="username">{username}</div>
                    <div className="post-date">{formattedDate}</div>
                </div>
            </div>
            <h2 className="post-title">{title}</h2>
            <p className="post-description">{description}</p>
            <iframe
                style={{ borderRadius: '12px' }}
                src={`https://open.spotify.com/embed/${spotify_type}/${spotify_id}?utm_source=generator`}
                width="100%"
                height={`352px`}
                allowFullScreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                
                loading="lazy">
            </iframe>
            <div className="post-likes">
                Likes: {likeCount}
            </div>
            {!anonUser && <button onClick={handleLike} className="like-button">Like</button>}
            {user_id === curr_user_id && (
                <>
                    <Link to={`/edit-post/${post_id}`} className="edit-button">Edit</Link>
                    <button onClick={handleDeletePost} className="delete-button">Delete</button>
                </>
            )}
        </div>
    );
}

