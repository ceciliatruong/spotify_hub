import { useState } from "react";
import { supabase } from "../../client";

export default function CommentForm({ currProfile, post_id }) {
    const [comment, setComment] = useState('');

    const handleComment = async (e) => {
        e.preventDefault();
        
        const { data, error } = await supabase
            .from('post_comments')
            .insert([{
                post_id: post_id,
                user_id: currProfile.user_id,
                comment: comment,
                username: currProfile.username,
                icon: currProfile.icon
            }])
            if(error) {
                console.log('error while posting comment: ', error.message);
            }
    }
    return(
        <div>
            <form>
                <input
                   type='text'
                   name='user-comment'
                   value={comment}
                   onChange={(e) => setComment(e.target.value)}
                />
                <button 
                    type='submit'
                    onClick={handleComment}
                >
                    Comment
                </button>
            </form>
        </div>
    );
}