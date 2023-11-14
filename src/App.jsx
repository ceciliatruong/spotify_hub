import { useState, useEffect } from 'react'
import './App.css'
import SignUpPage from './pages/SignUpPage'
import { Routes, Route } from 'react-router-dom'
import HomeFeed from './pages/HomeFeed'
import ExtendedSignUpPage from './pages/ExtendedSignUpPage'
import SignInPage from './pages/SignInPage'
import { supabase } from './client'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import PasswordRecoveryPage from './pages/PasswordRecoveryPage'
import NavBar from './components/NavBar'
import CreatePostPage from './pages/CreatePostPage'
import ViewPostPage from './pages/ViewPostPage'
import UpdatePostPage from './pages/UpdatePostPage'
function App() {
  const [anonUser, setAnonUser] = useState(true);
  const [userID, setUserID] = useState(null);
  const [profile, setProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      isLoggedIn(session?.user);
    });
    isLoggedIn();
  }, []);
  
  const isLoggedIn = async (user) => {
    if (!user) {
      setAnonUser(true);
      setProfile(null);
      setUserID(null);
      return;
    }
    
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id);
  
    if (error) {
      console.log("ERROR: ", error);
      setAnonUser(true);
      setProfile(null);
      setUserID(null);
    } else {
      setProfile(data[0]);
      setAnonUser(false);
      setUserID(user.id);
      console.log("DATA: ", data);
    }
  };
  
  return (
    <>
    <NavBar anonUser={anonUser} currProfile={profile} setSearchTerm={setSearchTerm}/>
      <Routes>
        <Route index element={<HomeFeed anonUser={anonUser} userID={userID} currProfile={profile} searchTerm={searchTerm}/>}/>
        <Route path='create-post' element={<CreatePostPage anonUser={anonUser} userID={userID} currProfile={profile}/>}/>
        <Route path='password-recovery' element={<PasswordRecoveryPage anonUser={anonUser} userID={userID} currProfile={profile}/>}/>
        <Route path='forgot-password' element={<ForgotPasswordPage anonUser={anonUser} userID={userID} currProfile={profile}/>}/>
        <Route path='sign-up' element={<SignUpPage anonUser={anonUser} userID={userID} currProfile={profile}/>}/>
        <Route path='sign-in' element={<SignInPage anonUser={anonUser} userID={userID} currProfile={profile}/>}/>
        <Route path='home' element={<HomeFeed anonUser={anonUser} userID={userID} currProfile={profile}  searchTerm={searchTerm}/>}/>
        <Route path='onboarding' element={<ExtendedSignUpPage anonUser={anonUser} userID={userID} currProfile={profile} externalSetProfile={setProfile}/>}/>
        <Route path='post/:post_id' element={<ViewPostPage anonUser={anonUser} userID={userID} currProfile={profile}/>}/>
        <Route path='edit-post/:post_id' element={<UpdatePostPage anonUser={anonUser} userID={userID} currProfile={profile}/>}/>
        <Route path='*' element={(<h1>no</h1>)}/>
      </Routes>
    </>
  )
}

export default App
