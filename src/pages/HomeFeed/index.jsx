import { useEffect, useState } from "react";
import { supabase } from "../../client";
import MinimizedPostContainer from "../../components/MinimizedPostContainer";

export default function HomeFeed({ anonUser, userID, currProfile, searchTerm }) {
    const [posts, setPosts] = useState([]);
    const [sortedPosts, setSortedPosts] = useState([]);
    const [sortType, setSortType] = useState('recent');

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching posts', error);
            } else {
                setPosts(data);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        let sorted = [...posts];
        if (sortType === 'likes') {
            sorted = sorted.sort((a, b) => b.likes - a.likes);
        }

        const filtered = searchTerm
            ? sorted.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : sorted;

        setSortedPosts(filtered);
    }, [posts, searchTerm, sortType]);
    console.log('search term: ',searchTerm);

    return (
        <div>
            {anonUser ? (
                <h2>Welcome to cc's spotify hub! Feel free to browse :3</h2>
            ) : (
                <h2>Welcome back, {currProfile.username}! Check out what's new.</h2>
            )}
            <button onClick={() => setSortType('recent')}>Sort by Recent</button>
            <button onClick={() => setSortType('likes')}>Sort by Likes</button>
            {sortedPosts.length > 0 ? (
                sortedPosts.map((post) => (
                    <MinimizedPostContainer
                        key={post.post_id}
                        post_id={post.post_id}
                        user_id={post.user_id}
                        created_at={post.created_at}
                        username={post.username}
                        icon={post.icon}
                        title={post.title}
                        description={post.description}
                        spotify_type={post.spotify_type}
                        spotify_id={post.spotify_id}
                        likes={post.likes}
                    />
                ))
            ) : (
                <p>No posts to display</p>
            )}
        </div>
    );
}

