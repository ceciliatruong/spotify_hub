import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../../client';

export default function EditPostForm({ curr_user_id }) {
    const [post, setPost] = useState({
        title: '',
        description: '',
        spotify_url: '',
        user_id: ''
    });
    const [feedback, setFeedback] = useState(null);
    const { post_id } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('post_id', post_id)
                .single();

            if (error) {
                setFeedback('Error fetching post');
                return;
            }

            if (data) {
                setPost({
                    title: data.title,
                    description: data.description,
                    user_id: data.user_id,
                    spotify_url: `https://open.spotify.com/${data.spotify_type}/${data.spotify_id}`
                });
            }
        };

        fetchPost();
    }, [post_id]);

    const isValidSpotifyUrl = (url) => {
        const regex = /https:\/\/open\.spotify\.com\/(track|album|playlist|artist|episode|show)\/(\w+)/;
        const match = url.match(regex);
        return match ? { valid: true, type: match[1], id: match[2] } : { valid: false, type: null, id: null };
    };

    const handleUpdatePost = async (e) => {
        e.preventDefault();

        const { valid, type, id } = isValidSpotifyUrl(post.spotify_url);
        if (!valid) {
            setFeedback('Invalid Spotify URL! Try again.');
            return;
        }

        if (curr_user_id !== post.user_id) {
            setFeedback('You are not authorized to edit this post.');
            return;
        }

        const { error } = await supabase
            .from('posts')
            .update({ title: post.title, description: post.description, spotify_type: type, spotify_id: id })
            .eq('post_id', post_id);

        if (error) {
            setFeedback('Error updating post. Try again.');
        } else {
            setFeedback('Post updated successfully!');
        }
    };
    return (
        <div>
            {feedback}
            <form onSubmit={handleUpdatePost}>
                <label>
                    Title<br />
                    <input
                        required
                        type="text"
                        name="post-title"
                        value={post.title}
                        onChange={(e) => setPost({ ...post, title: e.target.value })}
                    />
                </label><br />
                <label>
                    Description<br />
                    <textarea
                        required
                        name="description"
                        value={post.description}
                        onChange={(e) => setPost({ ...post, description: e.target.value })}
                        rows={15}
                        cols={50}
                    />
                </label><br />
                <label>
                    Spotify URL<br />
                    <input
                        required
                        type="url"
                        name="spotify-url"
                        value={post.spotify_url}
                        onChange={(e) => setPost({ ...post, spotify_url: e.target.value })}
                    />
                </label><br />
                <button
                    type="submit"
                >
                    Update Post
                </button>
            </form>
        </div>
    );
}


