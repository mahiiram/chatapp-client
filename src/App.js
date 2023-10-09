import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "./Components/Login";
import Chat from "./Components/Chat";
import Signup from "./Components/Signup";
import Setimage from "./Components/Setimage";
import { ProtectRoute } from "./middleware.js/auth";
import Followers from "./Components/followers/Followers";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/"  element={<Login />} />
      <Route path="/signup"  element={<Signup />} />
      <Route path="/profile"  element={<ProtectRoute><Setimage /></ProtectRoute>} />
      <Route path="/follower"  element={<ProtectRoute><Followers /></ProtectRoute>} />
      <Route path="/Chat"  element={ <ProtectRoute> <Chat /></ProtectRoute>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
