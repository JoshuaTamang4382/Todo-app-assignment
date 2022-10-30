import { Routes, Route, Link } from "react-router-dom";
import User from "../components/User/User";
import UserTable from "../components/User/UserTable";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<UserTable/>} />
      <Route path="/createUser" element={<User/>} />
      <Route 
        path="/:userId/edit" 
        element={<User/>} />
    </Routes>
  )
}

export default Router;