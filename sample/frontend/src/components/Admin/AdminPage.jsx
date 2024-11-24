import { useNavigate } from "react-router-dom";
import "./AdminPage.css";


export default function AdminPage() {
  const nav = useNavigate();

  function ProductPage() {
    nav("/adminproduct");
  }
//   function UsersPage() {
//     nav("/adminUsers");
//   }
function UsersPage() {
  nav("/users");
}

function BanPage() {
  nav("/ban");
}





  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <button onClick={ProductPage}>Products</button>
        <button onClick={UsersPage}>Users</button>
        <button onClick={BanPage}>Ban</button>
      </div>
    </div>
  );
}