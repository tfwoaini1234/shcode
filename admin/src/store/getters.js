const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  hospitalName:state => state.user.hospitalName,
  permission_routes: state => state.user.routes,
  userInfo:state=>state.user.userInfo,
  permissions:state=>state.user.permissions
}
export default getters
