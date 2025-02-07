import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Login from "./Login";
import Account from "./Account";
import Likes from "./Likes";
import Register from "./Register";
import EditAccount from "./EditAccount";
import AddPet from "./AddPet";
import AuthContext from "../context/AuthContext";
import Preferences from "./Preferences";
import EditPet from "./EditPet";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<About />} />

        <Route
          path="/home"
          element={isLoggedIn ? <Home /> : <Navigate replace to={"/login"} />}
        />

        <Route path="/about" element={<About />} />

        <Route path="/login" element={isLoggedIn ? <Home /> : <Login />} />

        <Route
          path="/likes"
          element={isLoggedIn ? <Likes /> : <Navigate replace to={"/login"} />}
        />

        <Route
          path="/myaccount"
          element={
            isLoggedIn ? <Account /> : <Navigate replace to={"/login"} />
          }
        />

        <Route path="/register" element={<Register />} />

        <Route
          path="/editaccount"
          element={
            isLoggedIn ? <EditAccount /> : <Navigate replace to={"/login"} />
          }
        />

        <Route
          path="/addpet"
          element={isLoggedIn ? <AddPet /> : <Navigate replace to={"/login"} />}
        />

        <Route
          path="/editpreference"
          element={
            isLoggedIn ? <Preferences /> : <Navigate replace to={"/login"} />
          }
        />

        <Route
          path="/editpet"
          element={
            isLoggedIn ? <EditPet /> : <Navigate replace to={"/login"} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
