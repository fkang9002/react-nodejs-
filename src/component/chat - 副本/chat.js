import React from "react";
import { List, InputItem } from "antd-mobile";
import io from "socket.io-client";

const socket = io("ws://localhost:9093");

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "", msg: [] };
  }
  componentDidMount() {
    // const socket = io("ws://localhost:9093");
    socket.on("recvmsg", data => {
      console.log(data);
      this.setState({
        msg: [...this.state.msg, data.text]
      });
    });
  }
  handleSubmit() {
    // console.log(this.state);
    socket.emit("sendmsg", { text: this.state.text });
    this.setState({ text: "" });
  }
  render() {
    return (
      <div>
        {this.state.msg.map(v => {
          return <p key={v}>{v}</p>;
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
              extra={<span onClick={() => this.handleSubmit()}>发送</span>}
            />
          </List>
        </div>
      </div>
    );
  }
}

export default Chat;
