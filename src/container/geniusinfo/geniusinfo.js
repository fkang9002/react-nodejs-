import React from "react";
import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile";
import AvatarSelector from "../../component/avatar-selector/avatar-selector.js";
import { connect } from "react-redux";
import { update } from "../../redux/user.redux";
import { Redirect } from "react-router-dom";

@connect(state => state.user, { update })
class GeniusInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      desc: ""
    };
  }
  onChange(key, value) {
    this.setState({
      [key]: value
    });
  }
  render() {
    const path = this.props.location.pathname;
    const redirect = this.props.redirectTo;
    return (
      <div>
        {redirect && redirect !== path ? (
          <Redirect to={this.props.redirectTo} />
        ) : null}
        <NavBar>牛人完善信息页</NavBar>
        <AvatarSelector
          selectAvatar={imgname => {
            this.setState({ avatar: imgname });
          }}
        />
        <InputItem onChange={v => this.onChange("title", v)}>
          求职岗位
        </InputItem>
        <TextareaItem
          onChange={v => this.onChange("desc", v)}
          rows={3}
          autoheight
          title="个人简介"
        />
        <Button
          onClick={() => {
            this.props.updated(this.state);
          }}
          type="primary"
        >
          保存
        </Button>
      </div>
    );
  }
}

export default GeniusInfo;
