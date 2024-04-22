import axios from 'axios'

const API = axios.create({ baseUrl: "https://localhost:1234" })

// TODO: Figure out how to store to local storage after verifying with Google. Also, what is the id and type?
API.interceptors.request.use((req) => {
    const data = JSON.parse(localStorage.getItem('profile'))
    if (data) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
        req.headers.id = data?.result?.id || data?.id
        req.headers.type = data.type
    }
    return req;
})

export const getJump = async (from, to) => {
    return API.get(`/api/v1/Logbook?From=${from}&To=${to}`)
}

export const logJump = async (jump) => {
    return API.post(`/api/v1/Logbook`, jump)
}

export const editJump = async (jump) => {
    return API.put(`/api/v1/Logbook`, jump)
}

export const deleteJump = async (jumpNumber) => {
    return API.delete(`/api/v1/Logbook`, { 'jumpNumber': jumpNumber })
}

export const getDefaultInfo = async () => {
    return API.get(`/api/v1/UserInfo/defaultInfo`)
}

export const getUserInfo = async () => {
    return API.get(`/api/v1/UserInfo/userInfo`)
}

export const modifyDefaultInfo = async (defaultInfo) => {
    return API.post(`/api/v1/UserInfo/defaultInfo`, defaultInfo)
}

export const modifyUserInfo = async (userInfo) => {
    return API.post(`/api/v1/UserInfo/userInfo`, userInfo)
}