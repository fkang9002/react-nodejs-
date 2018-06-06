import React from "react";
import Logo from "../../component/logo/logo";
// import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { List, InputItem, Radio, WhiteSpace, Button } from "antd-mobile";
import { connect } from "react-redux";
import { register } from "../../redux/user.redux";
import { Redirect } from "react-router-dom";
import imoocForm from "../../component/imooc-form/imooc-form.js";

@connect(state => state.user, { register })
@imoocForm
class Register extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   type: "genius",
    //   user: "",
    //   pwd: "",
    //   repeatpwd: ""
    // };
    this.handleRegister = this.handleRegister.bind(this);
  }
  componentDidMount() {
    this.props.handleChange("type", "genius");
  }
  // handleChange(key, value) {
  //   this.setState({
  //     [key]: value
  //   });
  // }
  handleRegister() {
    this.props.register(this.props.state);
    console.log(this.props.state);
  }
  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <List>
          {this.props.msg ? (
            <p className="error-msg">{this.props.msg}</p>
          ) : null}
          <InputItem onChange={v => this.props.handleChange("user", v)}>
            用户
          </InputItem>
          <InputItem
            type="password"
            onChange={v => this.props.handleChange("pwd", v)}
          >
            密码
          </InputItem>
          <InputItem
            type="password"
            onChange={v => this.props.handleChange("repeatpwd", v)}
          >
            确认密码
          </InputItem>
          <RadioItem
            onChange={() => this.props.handleChange("type", "genius")}
            checked={this.props.state.type === "genius"}
          >
            牛人
          </RadioItem>
          <RadioItem
            onChange={() => this.props.handleChange("type", "boss")}
            checked={this.props.state.type === "boss"}
          >
            BOSS
          </RadioItem>
          <WhiteSpace />
          <Button onClick={this.handleRegister} type="primary">
            注册
          </Button>
        </List>
      </div>
    );
  }
}
export default Register;
