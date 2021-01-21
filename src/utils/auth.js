const TokenKey = 'token'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function setRoles(roles) {
  return localStorage.setItem('roles', roles)
}

export function getRoles() {
  let roles = []
  try {
    const rolesStr = localStorage.getItem('roles')
    roles = JSON.parse(rolesStr) || []
  /* eslint-disable */
  } catch (error) {}

  return roles
}

export function removeRoles(){
  return localStorage.setItem('roles', '')
}

export function setRoutes(routes) {
  return localStorage.setItem('routes', routes)
}

export function getRoutes() {
  let routes = []
  try {
    const routesStr = localStorage.getItem('routes')
    routes = JSON.parse(routesStr) || []
  /* eslint-disable */
  } catch (error) {}

  return routes
}

export function removeRoutes() {
  return localStorage.setItem('routes', '')
}

