import React, { useState, useEffect } from 'react';
import Comment from '../Comment';
import { supabase } from '../../client';
import './CommentContainer.css'
export default function CommentContainer({ anonUser, postId, postUserId, currUserId }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            const { data, error } = await supabase
                .from('post_comments')
                .select('*')
                .eq('post_id', postId)
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching comments:', error);
            } else {
                setComments(data);
                console.log('COMMENTS: ', data);
            }
        };

        fetchComments();
    }, [postId, comments]);

    return (
        <div className="comments-container">
            {comments.length > 0 ? (
                comments.map((commentData) => (
                    <Comment
                        key={commentData.comment_id}
                        commentData={commentData}
                        anonUser={anonUser}
                        currUserId={currUserId}
                        postUserId={postUserId}
                    />
                ))
            ) : (
                <p>No comments yet. Be the first to comment!</p>
            )}
        </div>
    );
}
