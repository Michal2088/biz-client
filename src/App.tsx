import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import Register from "./components/Register";
import Login from "./components/Login";
import AllCards from "./components/AllCards";
import MyCards from "./components/MyCards";
import NewCard from "./components/NewCard";
import EditCard from "./components/EditCard";

function App() {
  const bizImg: string = "images/הורדה.webp";
  const img: string = "images/השמים-מחייכים-אלי.jpg";
  return (
    <div>
      <ToastContainer theme="dark" />

      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route
            path="/register"
            element={<Register biz={false} text={"an"} img={img} />}
          ></Route>
          <Route
            path="/business"
            element={<Register biz={true} text={"a business"} img={bizImg} />}
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/NewCard" element={<NewCard />}></Route>
          <Route path="/AllCards" element={<AllCards />}></Route>
          <Route path="/MyCards">
            <Route index element={<MyCards />} />
            <Route path="edit/:id" element={<EditCard />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
