export const apiEndPoints = {
    //user end points
    postRegisterData : '/api/user/register',
    postRegisterOtp  : '/api/user/VerifyOtp',
    postLogin : '/api/user/Login',
    postResendOtp: '/api/user/ResendOtp',

    //admin end points
    postLoginAdmin: '/api/admin/verifyAdmin',
    getUsers:  'api/admin/getUsers',
    blockUser: 'api/admin/blockUser',
}