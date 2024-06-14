const getters = {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  // return true 表示已存在用户信息
  hasUserInfo: (state) => JSON.stringify(state.user.userInfo) !== '{}'
}
export default getters
