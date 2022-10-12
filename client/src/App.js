import { useDispatch } from "react-redux";
import { useContext } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { getPosts } from "./redux/actions";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserContext } from "./context/userContext";

function App() {
  const user = useContext(UserContext) || localStorage.getItem("user");
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate replace to={"/login"} />}
          />
          <Route
            path="/login"
            element={user ? <Navigate replace to={"/"} /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate replace to={"/"} /> : <Register />}
          />
          z`
        </Routes>
      </Router>
    </div>
  );
}

export default App;
