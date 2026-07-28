import { Router } from "express";
import * as authController from '../controllers/auth.controller.js'

const router = Router()


router.post("/" , authController.findUserRepo)
router.post("/create" , authController.createUserController)
router.post("/sendOtp" , authController.saveVerificationCodeController)
router.post("/verifyEmail" , authController.verifyEmailController  )
router.post("/reSendCode" , authController.reSendCodeController)
router.post("/checkPass" , authController.ckeckPassword)
router.post("/sendOtpPassword" , authController.sendOtpPassword )
router.post("/findEmail" , authController.getByEmail)
router.post("/checkCodePass" , authController.checkCodePass)
router.post("/resetPassword" , authController.resetPassword)

export default router