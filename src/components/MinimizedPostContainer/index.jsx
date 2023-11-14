import React from 'react';
import { Link } from 'react-router-dom';
import SpotifyEmbed from '../SpotifyEmbed';
import './MinimizedPostContainer.css';
function timeAgo(dateString) {
    const date = new Date(dateString);
    const seconds = Math.round((new Date() - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    const months = Math.round(days / 30);
    const years = Math.round(days / 365);

    if (seconds < 45) return 'just now';
    else if (seconds < 90) return 'a minute ago';
    else if (minutes < 45) return `${minutes} minutes ago`;
    else if (minutes < 90) return 'an hour ago';
    else if (hours < 24) return `${hours} hours ago`;
    else if (hours < 42) return 'a day ago';
    else if (days < 30) return `${days} days ago`;
    else if (days < 45) return 'a month ago';
    else if (days < 365) return `${months} months ago`;
    else if (years < 1.5) return 'a year ago';
    else return `${years} years ago`;
}

export default function MinimizedPostContainer({ post_id, user_id, created_at, username, icon, title, spotify_type, spotify_id, likes }) {
    const imageUrl = `https://rrevkztdfkwyzvibaael.supabase.co/storage/v1/object/public/profile-icons/${icon}`;
    const formattedDate = timeAgo(created_at);

    return (
        <Link to={`/post/${post_id}`} className="minimized-post-container">
            <div className="user-info">
                <img src={imageUrl} alt={`${username}'s icon`} className="user-icon" />
                <div className="user-details">
                    <div className="username">{username}</div>
                    <div className="post-date">{formattedDate}</div>
                </div>
            </div>
            <div className="post-content">
                <div className="post-title">{title}</div>
                <div className="post-likes">Likes: {likes}</div>
            </div>
            <SpotifyEmbed type={spotify_type} id={spotify_id} size='152'/>
        </Link>
    );
}
