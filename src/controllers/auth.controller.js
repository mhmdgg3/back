import * as authServices from "../services/auth.services.js";

export async function findUserRepo(req, res) {
  try {
    const { email } = req.body;

    const user = await authServices.findUserServices(email);

    if (user[0].length === 0) {
      return res.status(200).json({
        success: false,
        message: "User not found",
        step: "notFound",
      });
    }

    if (!user[0][0].is_email_verified) {
      return res.status(200).json({
        success: true,
        message: "email exist",
        is_email_active: user[0][0].is_email_verified,
        step: "verifyCode",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "email exist",
        is_email_active: user[0][0].is_email_verified,
        step: "password",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function createUserController(req, res) {
  try {
    const { name, email, password, phone } = req.body;

    const result = await authServices.createUserServices(
      name,
      email,
      password,
      phone,
    );

    res.status(200).json({
      success: true,
      message: "insert user success",
      step: "verifyCode",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function saveVerificationCodeController(req, res) {
  try {
    const { email } = req.body;

    const result = await authServices.saveVerificationCodeServices(email);

    res.status(200).json({
      success: true,
      message: "send code success",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  return result;
}

export async function verifyEmailController(req, res) {
  try {
    const { email, code } = req.body;

    const result = await authServices.verifiUser(email, code);

    res.status(200).json({
      success: true,
      message: "user verified success",
      step: "password",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function reSendCodeController(req, res) {
  try {
    const { email } = req.body;

    const result = await authServices.reSendCodeServices(email);

    res.status(200).json({
      success: true,
      message: "Verification OTP resent successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function ckeckPassword(req, res) {
  try {
    const { email, password } = req.body;

    const result = await authServices.checkPassword(email, password);

    res.status(200).json({
      success: true,
      message: "Login successful",
      step: "homePage",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function getByEmail(req, res) {
  try {
    const { email } = req.body;

    const result = await authServices.getByEmail(email);

    res.status(200).json({
      success: true,
      message: "user found",
      step:"verifyCode"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function sendOtpPassword(req, res) {
  try {
    const { email } = req.body;

    const result = await authServices.sendOtpPasswordServices(email);

    res.status(200).json({
      success: true,
      message: "success send OTP",
      step: "verifyCode",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}


export async function checkCodePass(req , res) {

  try {


    const {email, code} = req.body

    const result = await authServices.checkCodePasswordSevices(email , code)

     res.status(200).json({
      success:true,
      message:"code success",
      step: "resetPassword"

    })
    
  } catch (error) {
    res.status(500).json({
      success:false,
      message:error.message
    })
    
  }
  
}



export async function resetPassword(req , res) {

  try {


    const {password , email} = req.body

    const result = await authServices.resetPasswordServices(password , email)

    res.status(200).json({
      success:true,
      message:"reset password success",
      step:"password"
    })
    
  } catch (error) {
  console.log("RESET ERROR:", error);

  res.status(500).json({
    success:false,
    message:error.message || error
  })
}
    
  }
  
}
