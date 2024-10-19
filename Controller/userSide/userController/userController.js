import { handleError } from "../../../utils/handleError.js";

// registration


//// logout

export const logout = async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({ success: true, message: "Logout" });
  } catch (error) {
    handleError(res, error);
  }
};
