import { supabase } from "../config/db.js";

// GET all posts
export const getAllPosts = async (req, res) => {
  try {
    const {
      data: posts,
      error,
      status,
    } = await supabase.from("posts").select("*");

    if (error) throw error;
    return res.status(status).json({
      success: true,
      result: {
        response: posts
      }
    });
  } catch (err) {
    return res.status(500).json({
      sucess: false,
      result: {
        response: err.message
      }
    });
  }
};

// GET post
export const getPost = async (req, res) => {
  try {
    const {id} = req.params;

    const { data: post, error, status} = await supabase.from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return res.status(status).json({
      success: true,
      result: {
        response: post
      }
    });

  } catch (err) {
    return res.status(500).json({
      sucess: false,
      result: {
        response: err.message
      }
    });
  }
};
