import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);  //taking currentuser from AuthContext

  const ProtectedRoute = ({ children }) => {  //creating a protected route 
    if (!currentUser) {  //if no currentUser then navigate to login page
      return <Navigate to="/login" />;
    }

    return children  //children means home page
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
