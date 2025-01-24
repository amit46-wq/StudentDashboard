import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './sidebar.css'

const Sidebar = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth).then(() => navigate("/"));
  };

  return (
    <div className="w-60 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <ul>
        <li onClick={() => navigate("/students")} className="cursor-pointer p-2">
          Students Page
        </li>
        <li onClick={handleLogout} className="cursor-pointer p-2">
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
