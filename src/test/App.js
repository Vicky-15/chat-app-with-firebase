import "./testStyle.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Users } from "./Users";
import { Form } from "./Form";
import {Home} from "./Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="form" element={<Form />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
