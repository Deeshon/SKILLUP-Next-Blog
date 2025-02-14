import { supabase } from "../config/db.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// POST register
export const register = async (req, res) => {
    try {

        // hash the password
        const hashedPwd = await bcrypt.hash(req.body.password, 10)

        // create the user object with the hashed password
        const user = {name: req.body.name, email: req.body.email, password: hashedPwd}

        const {data: createdUser, error} = await supabase.from('users').insert(user)

        if (error) throw new Error(error)

        return res.status(201).json({
            success: true,
            result: {
                response: user
            }
        })

    } catch(err) {
        return res.status(500).json({
            success: false,
            result: {
                response: err.message
            }
        })
    }
}

// POST login
export const login = async (req, res) => {
    try {
        const user = {email: req.body.email, password: req.body.password}

        const {data, error} = await supabase.from('users').select('email, password').eq('email', user.email).single();

        // Check if the user is in the database
        if (error) {
            return res.status(500).json({
                success: false,
                result: {
                    response: error
                }
            })
        }

        // Check if the provided password matches the stored password
        if (!await bcrypt.compare(user.password, data.password)) {
            return res.status(500).json({
                success: false,
                result: {
                    response: "The password does not match the user."
                }
            })
        }

        // generate jwt access token and refresh token
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15m'
        });

        const payload = {...user, iat: Math.floor(Date.now() / 1000)}

        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '7d'
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true
        })

        res.status(200).json({
            success: true,
            result: {
                response: 'Successfully logged in.',
                accessToken: accessToken
            }
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            result: {
                response: err.message
            }
        })
    }
}

export const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(403).json({
        success: false,
        result: {
            response: 'Forbidden. No refresh token in the response.'
        }
    })

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({
            success: false,
            result: {
                response: 'Forbidden. Invalid refresh token'
            }
        })

        const payload = {...user, iat: Math.floor(Date.now()/1000)}
        delete payload.exp

        const newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15m'
        })

        res.status(200).json({
            success: true,
            result: {
                response: 'New access token granted',
                accessToken: newAccessToken
            }
        })
    })
}
