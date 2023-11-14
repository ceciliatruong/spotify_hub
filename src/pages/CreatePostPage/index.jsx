import CreatePostForm from "../../components/CreatePostForm";



export default function CreatePostPage( { anonUser, userID, currProfile } ) {
    return(
        <div>
             { !anonUser ? 
                <>
                    <h1>Create a new post!</h1>
                    <h3>Make sure to get a valid Spotify URL or else your post creation will fail!</h3>
                    <CreatePostForm userID={userID} profile={currProfile}/>
                </>
                : <p>You do not have access to this page. Please log in. </p>
             }
        </div>
    );
}