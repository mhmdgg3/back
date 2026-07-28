import crypto from "crypto";
import bcrypt from "bcrypt";

import * as authRepository from "../repository/auth.repository.js";
import {
  sendVerificationPassword,
  sendVerificationEmail,
} from "./email.services.js";
import { error } from "console";

export async function findUserServices(email) {
  return await authRepository.findUser(email);
}

export async function createUserServices(name, email, password, phone) {
  return await authRepository.createUser(name, email, password, phone);
}

export async function saveVerificationCodeServices(email) {
  const code = crypto.randomInt(100000, 1000000).toString();

  const expires = new Date(Date.now() + 10 * 60 * 1000);

  await authRepository.saveVerificationCode(email, code, expires);
  await sendVerificationEmail(email, code);
}

export async function verifiUser(email, code) {
  const user = await authRepository.findByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.email_verification_cod !== code) {
    throw new Error("Invalid verification code");
  }

  if (new Date(user.email_verification_expires) < new Date()) {
    throw new Error("Verification code has expired");
  }

  await authRepository.verifyEmail(email);
  return {
    success: true,
    message: "Email verified successfully",
  };
}

export async function reSendCodeServices(email) {
  const code = await crypto.randomInt(100000, 1000000).toString();

  await sendVerificationEmail(email, code);

  await authRepository.reSendOpt(email, code);
}

export async function checkPassword(email, password) {
  const user = await authRepository.findByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  const hash = user.password;

  const isMatch = await bcrypt.compare(password, hash);

  if (!isMatch) {
    throw new Error("Incorrect password");
  }
}

export async function getByEmail(email) {
  const user = await authRepository.findByEmail(email);
  if (!user) {
    throw new Error(
      "We're sorry. We weren't able to identify you given the information provided.",
    );
  }
}

export async function sendOtpPasswordServices(email) {
  const user = await authRepository.findByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  const code = crypto.randomInt(100000, 1000000).toString();

  await authRepository.SendOtpPassword(code, email);
  await sendVerificationPassword(email, code);
}

export async function checkCodePasswordSevices(email, code) {
  const user = await authRepository.checkCodePassword(email);

  if (!user) {
    throw new Error("user not found");
  }

  if (user.verification_password_code !== code) {
    throw new Error("Invalid verification code");
  }

  return {
    success: true,
    message: "code success",
  };
}

export async function resetPasswordServices(password, email) {
  const user = await authRepository.findByEmail(email);

  if (!user) {
    throw new Error("user not found");
  }


  await authRepository.resetPassword(password, email);
}
