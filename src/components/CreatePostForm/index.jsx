import { supabase } from "../../client";
import { useState, useEffect } from "react";

export default function CreatePostForm( { userID, profile }) {
    const [post, setPost] = useState({
        title: '',
        description: '',
        spotify_url: ''
    });
    const [feedback, setFeedback] = useState(null);

    const isValidSpotifyUrl = (url) => {
        const regex = /https:\/\/open\.spotify\.com\/(track|album|playlist|artist|episode|show)\/(\w+)/;
        const match = url.match(regex);
        if (match) {
          return { valid: true, type: match[1], id: match[2] };
        }
        return { valid: false, type: null, id: null };
      }

    const handleCreatePost = async(e) => {
        e.preventDefault();

        const { valid, type, id } = isValidSpotifyUrl(post.spotify_url);
        if(valid) {
            const { data, error } = await supabase
                .from('posts')
                .insert([{
                    user_id: userID,
                    title: post.title,
                    description: post.description,
                    spotify_type: type,
                    spotify_id: id,
                    username: profile.username,
                    icon: profile.icon
                }])
                if(error) {
                    console.log('ERROR: ', error.message);
                    setFeedback('Post creation failed. Try again.');
                }
                else {
                    setFeedback('Post creation successful. Check out your new post on the home feed!')
                }
        }
        else {
            setFeedback('Invalid Spotify URL! Try again.');
        }

    }
    return(
        <div>
            {feedback}
            <form>
                <label>
                    Title<br/>
                    <input
                        required
                        type='title'
                        name='post-title'
                        value={post.title}
                        onChange={(e) => setPost({...post, title: e.target.value})}
                    />
                </label><br/>
                <label>
                    Description<br/>
                    <textarea 
                            required
                            name="description" 
                            value={post.description} 
                            onChange={(e) => setPost({...post, description: e.target.value})} 
                            rows={15} 
                            cols={50}
                        />
                </label><br/>
                <label>
                    Spotify URL<br/>
                    <input
                        required
                        type="url"
                        name='spotify-url'
                        value={post.spotify_url}
                        onChange={(e)=>setPost({...post, spotify_url: e.target.value})}
                    />
                </label><br/>
                <button
                    type="create-post"
                    onClick={handleCreatePost}
                >
                    Create Post
                </button>
            </form>
        </div>
    );
}