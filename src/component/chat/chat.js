import React from "react";
import { List, InputItem, NavBar, Icon, Grid } from "antd-mobile";
// import io from "socket.io-client";
import { connect } from "react-redux";
import {
  getMsgList,
  sendMsg,
  recvMsg,
  readMsg
} from "../../redux/chat.redux.js";
import { getChatId } from "../../util";

// const socket = io("ws://localhost:9093");

@connect(state => state, { getMsgList, sendMsg, recvMsg, readMsg })
class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "", msg: [], showEmoji: false };
  }
  componentDidMount() {
    // 避免在当前页面刷新页面，聊天数据丢失
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList();
      this.props.recvMsg();
    }
    setTimeout(function() {
      window.dispatchEvent(new Event("resize"));
    }, 0);
    // const socket = io("ws://localhost:9093");
    // socket.on("recvmsg", data => {
    //   console.log(data);
    //   this.setState({
    //     msg: [...this.state.msg, data.text]
    //   });
    // });
  }
  componentWillUnmount() {
    const to = this.props.match.params.user;
    this.props.readMsg(to);
  }
  fixCarousel() {
    setTimeout(function() {
      window.dispatchEvent(new Event("resize"));
    }, 0);
  }
  handleSubmit() {
    // console.log(this.state);
    // socket.emit("sendmsg", { text: this.state.text });
    // this.setState({ text: "" });
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({ from, to, msg });
    this.setState({ text: "" });
  }
  render() {
    const emoji = "😅😆😉😊😋😎😍😘😀😁😂🤣😃😅😆😉😊😋😎😍😘😀😁😂🤣😃😅😆😉😊😋😎😍😘😀😁😂🤣😃😅😆😉😊😋😎😍😘😀😁😂🤣😃😅😆😉😊😋😎😍😘"
      .split("")
      .map(v => ({ text: v }));
    const userid = this.props.match.params.user;
    console.log(userid);
    const Item = List.Item;
    const users = this.props.chat.users;
    if (!users[userid]) {
      return null;
    }
    const chatid = getChatId(userid, this.props.user._id);
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid);
    return (
      <div id="chat-page">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack();
          }}
        >
          {users[userid].name}
        </NavBar>
        {chatmsgs.map(v => {
          const avatar = require(`../img/${users[v.from].avatar}.png`);
          return v.from === userid ? (
            <List k={v._id}>
              <Item thumb={avatar}>{v.content}</Item>
            </List>
          ) : (
            <List k={v._id}>
              <Item className="chat-me" extra={<img src={avatar} alt="" />}>
                {v.content}
              </Item>
            </List>
          );
          // return <p key={v._id}>{v.content}</p>;
        })}
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={v => {
                console.log(v);
                this.setState({ text: v });
              }}
              extra={
                <div>
                  <span
                    style={{ marginRight: 10 }}
                    onClick={() => {
                      this.setState({ showEmoji: !this.state.showEmoji });
                      this.fixCarousel();
                    }}
                  >
                    ...
                  </span>
                  <span onClick={() => this.handleSubmit()}>发送</span>
                </div>
              }
            />
          </List>
          {this.state.showEmoji ? (
            <Grid
              data={emoji}
              columnNum={9}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={el => {
                this.setState({
                  text: this.state.text + el.text
                });
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Chat;
