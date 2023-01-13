import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import ChatRooms from "./pages/Chat/Rooms";
import Login from "./pages/Login";
import Layout from "./components/Layout/index";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "Chat", path: "/chat" },
  { title: "Rooms", path: "/chat/rooms" },
  { title: "Login", path: "/login" },
];

function App() {
  return (
    <div className="App">
      <Header title={"Chat App"} navLinks={navLinks} />
      <Layout>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
          </Route>
          <Route path="/chat">
            <Route index element={<Chat />} />
            <Route path="/chat/rooms" element={<ChatRooms />} />
          </Route>
          <Route path="/login">
            <Route index element={<Login />} />
          </Route>
        </Routes>
      </Layout>
      <main></main>
      <footer></footer>
    </div>
  );
}

export default App;
