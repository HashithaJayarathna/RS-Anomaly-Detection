import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import LandingPage from "./Components/LandingPage/LandingPage";
import HomePage from "./Components/HomePage";
import Form from "./Components/Form";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Header from "./Components/Header";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Restricted Routes */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
