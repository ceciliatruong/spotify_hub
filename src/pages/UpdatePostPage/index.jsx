import { useParams } from "react-router-dom";
import { supabase } from "../../client";
import { useEffect, useState } from "react";
import EditPostForm from "../../components/EditPostForm";
export default function UpdatePostPage({ anonUser, userID, currProfile }) {
    const { post_id } = useParams();
    return(
        <div>
            {!anonUser ? <EditPostForm post_id={post_id} curr_user_id={userID}/> : <p>You don't have access to this page!</p>}
        </div>
    );
}