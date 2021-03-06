import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { NavBar } from "antd-mobile";
import NavLinkBar from "../navlink/navlink";
import Boss from "../../component/boss/boss";
import Genius from "../../component/genius/genius";
import User from "../../component/user/user";
import Msg from "../../component/msg/msg";
import { getMsgList, recvMsg } from "../../redux/chat.redux.js";
// function Boss() {
//   return <h2>Boss首页</h2>;
// }
// function Genius() {
//   return <h2>牛人首页</h2>;
// }
// function Msg() {
//   return <h2>消息列表</h2>;
// }
// function User() {
//   return <h2>个人中心</h2>;
// }
@connect(state => state, { getMsgList, recvMsg })
class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getMsgList();
    this.props.recvMsg();
  }
  render() {
    // const { pathname } = this.props.location;
    const pathname = "/boss";
    console.log(pathname);
    const user = this.props.user;
    const navList = [
      {
        path: "/boss",
        text: "牛人",
        icon: "boss",
        title: "牛人列表",
        component: Boss,
        hide: user.type === "genius"
      },
      {
        path: "/genius",
        text: "boss",
        icon: "job",
        title: "BOSS列表",
        component: Genius,
        hide: user.type === "boss"
      },
      {
        path: "/msg",
        text: "消息",
        icon: "msg",
        title: "消息列表",
        component: Msg
      },
      {
        path: "/me",
        text: "我",
        icon: "user",
        title: "个人中心",
        component: User
      }
    ];
    return (
      <div>
        <NavBar className="fixed-header" mode="dark">
          {navList.find(v => v.path === pathname).title}
        </NavBar>
        <div>
          <Switch>
            {navList.map(v => (
              <Route key={v.path} path={v.path} component={v.component} />
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList} />
      </div>
    );
  }
}
export default Dashboard;
