
const getUserImageProfile = () => {
    return ''
}
const getFullname = () => {
    return 'mohammed es-sadki'
}
const getUsername = () => {
    return 'mes-sadk'
}
  
type API = {
    getUserImageProfile: () => string
    getUsername: () => string
    getFullname: () => string
}
  
export const api: API = {
    getUserImageProfile,
    getUsername,
    getFullname
}
