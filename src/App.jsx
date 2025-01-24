import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import Login from "./login";
import Students from "./pages/Students";
/*import "./app.css"*/

import './app.css'
function App() {
  const [user, setUser] = useState(null);

  // Check user authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <Router>
      <div className="app">
        {user && (
          <nav>
            <ul>
              
              
            </ul>
          </nav>
        )}

        <Routes>
          <Route
            path="/"
            element={!user ? <Login /> : <Navigate to="/students" />}
          />
          <Route
            path="/students"
            element={user ? <Students /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
