
import { loginService, logOutService, profileReadService, recoverVerifyEmailUserService, RecoverVerifyOTPUserService, registerService, ResetPasswordUserService } from './../service/UserServices.js';

//! Register service
export const register = async (req, res) => {
    let result = await registerService(req)
    return res.json(result);
}


//! Login Service 
export const login = async (req, res) => {
    let result = await loginService(req, res)
    return res.json(result);
}

//! Login Service 
export const profileRead = async (req, res) => {
    let result = await profileReadService(req)
    return res.json(result);
}

//! Login Service 
export const logOut = async (req, res) => {
    let result = await logOutService(res)
    return res.json(result);
}

//! recoverVerifyEmailUser Service 
export const recoverVerifyEmailUser = async (req, res) => {
    let result = await recoverVerifyEmailUserService(req)
    return res.json(result);
}

//! recoverVerifyOTPUser Service 
export const recoverVerifyOTPUser = async (req, res) => {
    let result = await RecoverVerifyOTPUserService(req)
    return res.json(result);
}

//! ResetPasswordUserService Service 
export const resetPasswordUser = async (req, res) => {
    let result = await ResetPasswordUserService(req)
    return res.json(result);
}