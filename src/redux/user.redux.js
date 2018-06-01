import axios from "axios";
import { getRedirectPath } from "../util.js";
// const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const ERROR_MSG = "ERROR_MSG";
// const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOAD_DATA = "LOAD_DATA";
const AUTH_SUCCESS = "AUTH_SUCCESS";

const initState = {
  redirectTo: "",
  msg: "",
  user: "",
  type: ""
};
//reducer
export function user(state = initState, action) {
  switch (action.type) {
    // case REGISTER_SUCCESS:
    //   return {
    //     ...state,
    //     msg: "",
    //     redirectTo: getRedirectPath(action.payload),
    //     isAuth: true,
    //     ...action.payload
    //   };
    case ERROR_MSG:
      return { ...state, isAuth: false, msg: action.msg };
    // case LOGIN_SUCCESS:
    //   return {
    //     ...state,
    //     isAuth: true,
    //     redirectTo: getRedirectPath(action.payload),
    //     ...action.payload
    //   };
    case LOAD_DATA:
      return { ...state, ...action.payload };
    case AUTH_SUCCESS:
      return {
        ...state,
        msg: "",
        redirectTo: getRedirectPath(action.payload),
        ...action.payload
      };
    default:
      return state;
  }
}

function errorMsg(msg) {
  return { msg, type: ERROR_MSG };
}
// function registerSucess(data) {
//   return { type: REGISTER_SUCCESS, payload: data };
// }
// function loginSuccess(data) {
//   return { type: LOGIN_SUCCESS, payload: data };
// }
function authSuccess(data) {
  // 过滤密码字段，防止前台看到密码信息
  const { pwd, ...obj } = data;
  return { type: AUTH_SUCCESS, payload: obj };
}
export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errorMsg("用户名和密码必须输入");
  }
  return dispatch => {
    axios
      .post("/user/login", {
        user,
        pwd
      })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data));
        } else {
          dispatch(errorMsg(res.data.msg));
        }
      });
  };
}
export function register({ user, pwd, repeatpwd, type }) {
  if (!user || !pwd || !type) {
    return errorMsg("用户名密码必须输入");
  }
  if (pwd !== repeatpwd) {
    return errorMsg("密码和确认密码不同");
  }
  return dispatch => {
    axios
      .post("/user/register", {
        user,
        pwd,
        type
      })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(
            authSuccess({
              user,
              pwd,
              type
            })
          );
        } else {
          dispatch(errorMsg(res.data.msg));
        }
      });
  };
}
// export function userinfo(){
//   return dispatch => {
//     axios.get("/user/info").then(res => {
//       if (res.status === 200) {
//         if (res.data.code === 0) {
//           // 有登录信息
//         } else {
//           this.props.history.push("/login");
//         }
//       }
//     });
//   }
// }
export function loadData(userinfo) {
  return { type: LOAD_DATA, payload: userinfo };
}
export function update(data) {
  return dispatch => {
    axios.post("/user/update", data).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}
