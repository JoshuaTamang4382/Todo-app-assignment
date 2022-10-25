import { Routes, Route, Link } from "react-router-dom";
import User from "../components/User/User";
import UserTable from "../components/User/UserTable";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<UserTable/>} />
      <Route path="/user" element={<User/>} />
    </Routes>
  )
}

export default Router;