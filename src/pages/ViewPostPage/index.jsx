import { useParams } from "react-router-dom";
import PostContainer from "../../components/PostContainer";
import { supabase } from "../../client";
import { useEffect, useState } from "react";
import CommentContainer from "../../components/CommentContainer";
import CommentForm from "../../components/CommentForm";
export default function ViewPostPage({ anonUser, userID, currProfile }) {
    const [post, setPost] = useState(null);
    const { post_id } = useParams();
    console.log("POST ID:", post_id);
    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('post_id', post_id);

            if (error) {
                console.error('Error fetching post:', error);
            } else {
                console.log("EXPANDED POST DATA:", data);
                if (data.length > 0) {
                    setPost(data[0]);
                } else {
                    console.log('No post found with id:', post_id);
                }
            }
        };

        if (post_id) {
            fetchPost();
        }
    }, [post_id]);
    return(
        <div>
            {post ? 
                <div>
                    <PostContainer post_id={post_id} anonUser={anonUser} curr_user_id={userID} user_id={post.user_id} created_at={post.created_at} username={post.username} icon={post.icon} title={post.title} description={post.description} spotify_type={post.spotify_type} spotify_id={post.spotify_id} likes={post.likes}/> 
                    <CommentContainer anonUser={anonUser} postId={post_id} postUserId={post.user_id} currUserId={userID}/>
                    { !anonUser ? <CommentForm currProfile={currProfile} post_id={post_id}/> : <p>Log in to leave a comment on this post.</p> }
                </div>
            : <p>...Loading</p>
            }
        </div>
    );
}