import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './UserContext';

import SignupLogin from './components/SignupLogin';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import CreateBlog from './components/CreateBlog';
function App() {
  return (
    // <div className="App">
      
    // </div>
    <UserProvider>
    <Router>
      <Routes>
        <Route exact path="/" element={<SignupLogin/>} />
        {/* <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} /> */}
        <Route exact path="/bulk" element={<Blogs/>}/>
        <Route exact path="/blogs/:id" element={<Blog/>}/>    
        <Route exact path ="/create" element={<CreateBlog/>} />
        {/* <Route exact path ="/comments/:commentId" element ={<CommentAndReplies/>} /> */}
          </Routes>
    </Router>
  </UserProvider>

  );
}

export default App;
