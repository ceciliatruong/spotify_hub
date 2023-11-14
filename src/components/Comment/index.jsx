import { supabase } from "../../client";
import { useState } from "react";
import './Comment.css'
export default function Comment({ commentData, anonUser, currUserId, postUserId }) {
    const [likes, setLikes] = useState(commentData.likes);
    const imageUrl = `https://rrevkztdfkwyzvibaael.supabase.co/storage/v1/object/public/profile-icons/${commentData.icon}`;
    const handleLike = async () => {
        setLikes(likes + 1);
        const { data, error } = await supabase
            .from('post_comments')
            .update({likes: likes})
            .eq('comment_id', commentData.comment_id);
        if (error) {
            console.error('Error updating likes', error);
            return;
        }
    };

    const handleDelete = async () => {
        const confirmation = window.confirm("Are you sure you want to delete this comment?");
        if(confirmation) {
            const { error } = await supabase
                .from('post_comments')
                .delete()
                .eq('comment_id', commentData.comment_id);

            if (error) {
                console.error('Error deleting the comment:', error);
            }
        }
    };
    return(
        <div className="comment-container">
            <img src={imageUrl} alt={`${commentData.username}'s icon`} className="user-icon" />
            <div className="comment-content">
                <div className="comment-username">{commentData.username}</div>
                <div className="comment-text">{commentData.comment}</div>
                <div className="comment-likes">Likes: {likes}</div>
                {!anonUser && (
                    <button onClick={handleLike} className="like-button">Like</button>
                )}
                {currUserId=== (commentData.user_id || postUserId) && (
                    <button onClick={handleDelete} className="delete-button">Delete</button>
                )}
               
            </div>
        </div>
    );
}