import React from "react";
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile'

@connect(state => state)
class Msg extends React.Component {
  getLast(arr){
    return arr[arr.length-1]
  }
  render() {
    const Item = List.Item
    const Brief = Item.Brief
    const msgGroup = {}
    const userid = this.props.user._id
    const userinfo = this.props.chat.users
    this.props.chat.chatmsg.forEach(v => {
      msgGroup[v.chatid] = msgGroup[v.chatid] || [];
      msgGroup[v.chatid].push(v)
    })
    const chatList = Object.values(msgGroup).sort((a,b) => {
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time
      return a_last - b_last
    })
    return (
      <div>
        { chatList.map(v => {
          const lastItem = this.getLast(v);
          const targetId = v[0].from === userid ? v[0].to : v[0].from
          const unreadNum = v.filter(v => (!v.read && v.to === userid)).length 
          if(!userinfo[targetId]){
            return null
          }
          return (
            <List>
              <Item onClick={()=>{this.props.history.push(`/chat/${targetId}`)}} arrow='horizontal' extra={<Badge text={unreadNum} />} key={lastItem._id} thumb={require(`../img/${userinfo[targetId].avatar}.png`)}>
                {lastItem.content}
                <Brief>{userinfo[targetId].name}</Brief>
              </Item>
            </List>
          )
        }) }
      </div>
    );
  }
}

export default Msg;
