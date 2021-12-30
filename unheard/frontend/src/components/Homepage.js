import React, { Component } from "react";
import CreateRoomPage from "./CreateRoomPage"
import RoomJoinPage from "./RoomJoinPage"
import { BrowserRouter as Router, Routes,Route,Link, Redirect} from "react-router-dom"
import Room from "./Room";
export default class Homepage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Router>
        <Routes>
        <Route path="/" element={<p>This is the homePage</p>}></Route>
        <Route path="/join" element={<RoomJoinPage/>}></Route>
        <Route path="/create" element={<CreateRoomPage/>}></Route>
        <Route path="/room/:roomCode" element={<Room/>}></Route>
        </Routes>
    </Router>
  }
}
