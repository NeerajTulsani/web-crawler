const authorizedUser = {
    status: 200,
    data: {
        status: true,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG4uZG9lQHRhbmxhLmNvbSIsInR6IjoiRXVyb3BlL0JlcmxpbiJ9.RWpaEr6NBfNPCElXtbttiPpFv0UR1SDEydg-xelQSOI'
    }
}

const unAuthorizedUser = {
    status: 401,
    data: {
        status: false
    }
}

export default {
    checkUser: (config) => {
        const _u = config.data.username
        const _p = config.data.password
        if (_u === 'admin@tanla.com' && _p === 'admin') {
            return authorizedUser
        }
        if (_u.includes('tanla.com')) {
            unAuthorizedUser.data.msg = 'Validation Error'
            unAuthorizedUser.data.errors = { password: ['Incorrect password'] }
            return unAuthorizedUser
        }
        unAuthorizedUser.data.msg = 'Validation Error'
        unAuthorizedUser.data.errors = { email: ['Email doesn\'t exist'] }
        return unAuthorizedUser
    },
    authorizedUser,
    unAuthorizedUser
}
