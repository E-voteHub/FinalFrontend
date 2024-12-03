import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { useEffect,useState } from 'react';
import './index.css';
import App from './App.jsx';
import { BrowserRouter as Router , Route , Routes} from 'react-router-dom';  // Correct import
import Navbar from './navbar.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import {Provider, useSelector, useDispatch} from 'react-redux'
import { toggleLogin } from './reducers/loginReducer.js';
import { setUsername } from './reducers/usernameReducer.js';
import store from './store/Store.js'
import axios from 'axios';
import UserPage from './web-features/RegisterToVote.jsx'
import News from './web-features/News.jsx';
import HomePage from './HomePage.jsx';
import ContactPage from './Contact.jsx';
import CandidatePage from './web-features/CandidatePage.jsx';
import CandidateGallery from './web-features/CandidateGallery.jsx';
import ChatButton from './web-features/ChatButton.jsx';
import ChatWidget from './web-features/ChatWidget.jsx';

const RootComponent = () => { 
  const dispatch = useDispatch(); 
  const [isChatOpen, setIsChatOpen] = useState(false);
  useEffect(() => { 
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')) || false; 
    dispatch(toggleLogin(isLoggedIn)); 
    const ParamUsername = JSON.parse(localStorage.getItem('username'))|| 'meow'; 
    console.log(ParamUsername); 
    dispatch(setUsername(ParamUsername)); 
  }, [dispatch]); 

  const handleChatButtonClick = () => { setIsChatOpen(!isChatOpen); };

  const handleLogout = async () => { 
    try { await axios.get('/logout'); 
      dispatch({ type: 'login/toggleLogin', payload: false }); 
      dispatch({ type: 'username/setUsername', payload: null }); 
      localStorage.removeItem('isLoggedIn'); 
      localStorage.removeItem('username'); 
    } catch (error) { console.error("Logout error in main.jsx", error); } }; 
    return ( 
      <Router>
      
      <App />
        <Navbar handleLogout={handleLogout} />
       <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<Login />} /> {/* bhai idhar route set kardde */}
        <Route path='/register' element={<Register />} />
        <Route path="/user/:username" element={<UserPage />} />  {/* username must be used when taking input from useParams in other component */}
        {/* <Route path='/about' element={<About />} /> */}
        <Route path='/election-news' element={<News />} />
        <Route path= '/contact' element={<ContactPage/>}/>
        <Route path='/candidate/register/:username' element={<CandidatePage/>}/>
        <Route path='/admin/candidate/select' element={<CandidateGallery />}/>
       </Routes>
       <ChatButton onClick={handleChatButtonClick} />
       {isChatOpen && <ChatWidget Click = {handleChatButtonClick} />}
    </Router>
    
    
     ); };

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RootComponent />
    </Provider>
  </StrictMode>
);
