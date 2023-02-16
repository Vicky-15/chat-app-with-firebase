import "./style.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Posts } from "./pages/Posts";
import { Contact } from "./pages/Contact";

function App() {

  




  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="posts" element={<Posts/>} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
