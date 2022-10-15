const User = require('../../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    generatedAccessToken,
    generatedRefreshToken,
} = require('../../helpers/generateToken');
const { response } = require('express');
const authController = {
    register: async (req, res) => {
        const { username, email } = req.body;
        try {
            const user = await User.findOne({ email });
            if (user) {
                return res
                    .status(400)
                    .json({ message: 'Email already in used.' });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const newUser = new User({
                username: username,
                email: email,
                password: hashedPassword,
            });
            const savedUser = await newUser.save();
            const { password, ...info } = savedUser._doc;
            return res.status(201).json(info);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    login: async (req, res) => {
        const { email } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'Email not found!' });
            }
            const isValiPassword = await bcrypt.compare(
                req.body.password,
                user.password,
            );
            if (user && isValiPassword) {
                const { password, ...info } = user?._doc;
                const accessToken = generatedAccessToken(info);
                const refreshToken = generatedRefreshToken(info);
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: 'strict',
                    maxAge: 365 * 24 * 60 * 60 * 60,
                });
                return res.status(200).json({ ...info, accessToken });
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    logout: async (req, res) => {
        try {
            // console.log(req.cookies.refreshToken);
            res.clearCookie('refreshToken');
            return res.status(200).json({ message: 'Logout successfully!' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    },
    refreshToken: async (req, res) => {
        try {
            //Take refresh token from user
            const refreshToken = req.cookies.refreshToken;
            //Send error if token is not valid
            if (!refreshToken)
                return res.status(401).json("You're not authenticated");
            jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                (err, user) => {
                    if (err) {
                        console.log(err);
                        return res.status(401).json({ message: err.message });
                    }
                    //create new access token, refresh token and send to user
                    const newAccessToken = generatedAccessToken(user);
                    const newRefreshToken = generatedRefreshToken(user);
                    res.cookie('refreshToken', refreshToken, {
                        httpOnly: true,
                        secure: false,
                        path: '/',
                        sameSite: 'strict',
                    });
                    return res.status(200).json({
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken,
                    });
                },
            );
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }
    },
};

module.exports = authController;
