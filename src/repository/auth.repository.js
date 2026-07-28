import db from "../config/db.js";

import bcrypt from "bcrypt";
import { v4 as uuid4 } from "uuid";

export async function findUser(email) {
  const [rows] = await db.query(
    `
        SELECT * FROM users

        WHERE email = ?
        
        `,
    [email],
  );
  return [rows];
}

export async function createUser(name, email, password, phone) {
  const hash = await bcrypt.hash(password, 10);

  const uuid = uuid4();

  const [result] = await db.query(
    `
        INSERT INTO users(uuid , name ,email , password ,  phone)

        VALUES(?,?,?,?,?)

        `,
    [uuid, name, email, hash, phone],
  );

  return result;
}

export async function saveVerificationCode(email, code, expires) {
  const [result] = await db.query(
    `
        UPDATE users
        SET
        email_verification_cod = ?,
        email_verification_expires = ?

        WHERE email = ?

        `,
    [code, expires, email],
  );

  return result;
}

export async function findByEmail(email) {
  const [rows] = await db.query(
    `
        SELECT * FROM users

        WHERE email = ?
        
        
        `,
    [email],
  );

  return rows[0];
}

export async function verifyEmail(email) {
  const [result] = await db.query(
    `
        UPDATE users
        SET

        is_email_verified = 1,
        email_verification_cod = NULL,
        email_verification_expires = NULL

        WHERE email = ?
        
        
        
        `,
    [email],
  );
}

export async function reSendOpt(email, code) {
  const [rows] = await db.query(
    `
        UPDATE users

        SET 

        email_verification_cod = ?

        WHERE email = ?
        `,
    [code, email],
  );

  return rows[0];
}

export async function SendOtpPassword(code, email) {
  const [result] = await db.query(
    `
        UPDATE  users

        SET
        verification_password_code = ?

        WHERE email = ?
        `,
    [code, email],
  );
  return result;
}

export async function checkCodePassword(email) {
  const [rows] = await db.query(
    `
SELECT * FROM users

WHERE email = ?

        
        `,
    [email],
  );

  return rows[0];
}

export async function resetPassword(password, email) {
  const hash = await bcrypt.hash(password, 10);

  const [result] = await db.query(
    `

        UPDATE users

        SET

        password = ?
        
        WHERE email = ?
        
        
        `,
    [hash, email],
  );
}
