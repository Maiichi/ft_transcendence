import { apiRequest } from "../../../core/utils/apiRequest";


interface UserInfo {
    id: number
    intraId: number
    email: string
    firstName: string
    lastName: string
    userName: string
    avatar_url: string
    status: boolean
    twoFactorActivate: boolean
    twoFactorSecret: undefined
    createdAt: string
    updatedAt: string
} 

const uinfo = (uname: string, token: string) => apiRequest(`/users/${uname}`, {
    headers: {
        Authorization: `Bearer ${token}`
    },
    method: 'GET'
})

export type { 
    UserInfo 
}
export {
    uinfo
}
