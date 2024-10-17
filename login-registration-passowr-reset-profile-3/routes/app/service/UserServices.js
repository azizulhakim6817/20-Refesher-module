import mongoose from "mongoose";
import UserModel from "../model/usersModel.js";
import OTPModel from "../model/OTPModel.js";
import { EncodeToken } from './../utility/tokenUtility.js';
import EmailSend from "../utility/emailUtility.js";

const ObjectId = mongoose.Types.ObjectId;

export const registerService = async (req) => {
    try {
        let reqBody = req.body;
        let data = await UserModel.create(reqBody);
        return { status: "success", data: data };


    } catch (e) {
        return { status: "error", error: e.toString() };
    }
}
export const loginService = async (req, res) => {
    try {
        let reqBody = req.body;
        let data = await UserModel.aggregate([
            { $match: reqBody },
            { $project: { _id: 1, email: 1 } },
        ]);

        if (data.length > 0) {
            let token = EncodeToken(data[0]["email"]);

            // Set cookie
            let options = {
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                httpOnly: true,
                sameSite: "none",
                secure: true,
            };

            res.cookie("Token", token, options);
            return { status: "success", token: token, data: data[0] };
        } else {
            return { status: "unauthorized", data: data };
        }
    } catch (e) {
        return { status: "error", error: e.toString() };
    }
}
export const profileReadService = async (req) => {
    let email = req.headers.email;
    try {
        let MatchStage = {
            $match: {
                email,
            }
        };

        let project = {
            $project: {
                email: 1,
                firstName: 1,
                lastName: 1,
                img: 1,
                phone: 1,
            }
        }


        let data = await UserModel.aggregate([
            MatchStage,
            project
        ]);


        return { status: "success", data: data[0] };
    } catch (e) {
        return { status: "error", error: e.toString() };
    }
}

export const logOutService = async (res) => {
    try {
        res.clearCookie('Token');
        return { status: "success" };
    } catch (e) {
        return { status: "error", error: e.toString() };
    }
}


//! recoverVerifyEmailUserService 
export const recoverVerifyEmailUserService = async (req) => {
    let email = req.params.email;
    let otp = Math.floor(100000 + Math.random() * 900000);

    try {
        // Email Account Query
        let UserCount = await UserModel.aggregate([
            { $match: { email: email } },
            { $count: "total" },
        ]);

        console.log(UserCount);


        if (UserCount[0].total === 1) {
            //Create OTP
            await OTPModel.updateOne(
                { email: email },
                {
                    otp,
                    status: 0,
                },
                { upsert: true, new: true }
            );
            // Send Email
            let SendEmail = await EmailSend(
                email,
                otp,
                "OTP Verification center"
            );
            return { status: true, data: SendEmail };
        } else {
            return { status: false, data: "No User Found" };
        }
    } catch (error) {
        return { status: false, error: error.toString() };
    }
};

//! RecoverVerifyOTPUserService
export const RecoverVerifyOTPUserService = async (req) => {
    let email = req.params.email;
    let otp = req.params.otp;
    otp = parseInt(otp);
    try {
        // otp verification
        let OTPCount = await OTPModel.aggregate([
            { $match: { email, otp, status: 0 } },
            { $count: "total" },
        ]);

        if (OTPCount[0].total === 1) {
            let OTPUpdate = await OTPModel.updateOne(
                {
                    email,
                    otp,
                    status: 0,
                },
                {
                    otp,
                    status: 1,
                }
            );
            return { status: true, data: OTPUpdate };
        } else {
            return { status: false, data: "Invalid OTP Code" };
        }
    } catch (error) {
        return { status: false, error: error.toString() };
    }
};

//! ResetPasswordUserService
export const ResetPasswordUserService = async (req) => {
    let email = req.params.email;
    let otp = req.params.otp;
    otp = parseInt(otp);
    let reqBody = {
        password: req.body.password,
    };
    try {
        let OTPUsedCount = await OTPModel.aggregate([
            { $match: { email, otp, status: 1 } },
            { $count: "total" },
        ]);
        if (OTPUsedCount[0].total === 1) {
            // update password
            let PassUpdate = await UserModel.updateOne(reqBody);

            // otp reset
            await OTPModel.updateOne(
                {
                    email,
                    otp,
                    status: 1,
                },
                {
                    otp: null,
                    status: null,
                }
            );
            return { status: true, data: PassUpdate };
        } else {
            return { status: false, data: "Something is Wrong!" };
        }
    } catch (error) {
        return { status: false, error: error.toString() };
    }
};









