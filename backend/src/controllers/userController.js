import {supabase} from "../config/db.js";
import bcrypt from 'bcrypt';

// GET all users
export const getAllUsers = async (req, res) => {
  try {
    const {data: users, error, status} = await supabase.from("users").select("*");

    if (error) throw new Error(error);

    return res.status(status).json({
      success: true,
      result: {
        response: users,
      }
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      result: {
        response: err.message,
      },
    });
  }
};

// GET user
export const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {data: user, error, status} = await supabase.from('users').select('*').eq('id', id).single()
    
        if (error) throw new Error(error);

        return res.status(status).json({
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

