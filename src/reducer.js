import { combineReducers } from "redux";
import { user } from "./redux/user.redux.js";
import { chatuser } from "./redux/chatuser.redux.js";
import { chat } from "./redux/chat.redux";
export default combineReducers({ user, chatuser, chat });
