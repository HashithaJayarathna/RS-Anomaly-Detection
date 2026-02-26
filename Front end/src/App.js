import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import LandingPage from "./Components/LandingPage/LandingPage";
import Header from "./Components/Header";
import Form from "./Components/Form";
import About from "./Components/About";
import Contact from "./Components/Contact";
import ProtectedRoute from "./Components/ProtectedRoute";
import HomePage2 from "./Components/HomePage/HomePage";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* Protect the /Home and /Form routes */}
          <Route
            path="/Home"
            element={
              <ProtectedRoute>
                <HomePage2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Form"
            element={
              <ProtectedRoute>
                <Form />
              </ProtectedRoute>
            }
          />

          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


