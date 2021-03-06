import React from "react";
// import axios from "axios";
// import { WingBlank, Card, WhiteSpace } from "antd-mobile";
import { connect } from "react-redux";
import { getUserList } from "../../redux/chatuser.redux";
import UserCard from "../usercard/usercard";

@connect(state => state.chatuser, { getUserList })
class Boss extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     data: []
  //   };
  // }
  componentDidMount() {
    this.props.getUserList("genius");
  }
  render() {
    return <UserCard userlist={this.props.userlist} />;
    // const Header = Card.Header;
    // const Body = Card.Body;
    // return (
    //   <WingBlank>
    //     <WhiteSpace />
    //     {this.props.userlist.map(
    //       v =>
    //         v.avatar ? (
    //           <Card key={v._id}>
    //             <Header
    //               title={v.user}
    //               thumb={require(`../img/${v.avatar}.png`)}
    //               extra={<span>{v.title}</span>}
    //             />
    //             <Body>
    //               {v.desc.split("\n").map(v => <div key={v}>{v}</div>)}
    //             </Body>
    //           </Card>
    //         ) : null
    //     )}
    //   </WingBlank>
    // );
  }
}
export default Boss;
