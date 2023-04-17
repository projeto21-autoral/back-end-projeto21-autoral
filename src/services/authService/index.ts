import bcrypt, { compare } from "bcrypt"
import jwt from "jsonwebtoken"
import sessionRepository from "@/repositories/sessionRepository";
import { AuthParams } from "@/protocols";
import userRepository from "@/repositories/userRepository";
import { invalidCredentialsError } from "./erros";
import { User } from "@prisma/client";
import { exclude } from "@/utils/exclude";

async function signIn(params: AuthParams): Promise <SignInResult> {
    const {email, password} = params;
    
    const user = await getUserOrFail(email);

    await validatePassword(password, user.password);
    
    const token =   await createSession(user.id);

    return {
        user: exclude(user, "password"),
        token,
    }
}
async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
    const user = await userRepository.findByEmail(email, { id: true, name:true, email: true, password: true });
    if (!user) throw invalidCredentialsError();
  
    return user;
  }

async function validatePassword(password: string, userPassword: string) {
    const isPasswordValid = await bcrypt.compare(password, userPassword);
    if (!isPasswordValid) throw invalidCredentialsError();
  }

async function createSession(userId:number){
    const token = jwt.sign({userId}, process.env.JWT_SECRET)
    await sessionRepository.create({
        token,
        userId
    });

    return token
}
export type SignInParams = Pick<User, "email" | "password">;

type SignInResult = {
  user: Pick<User, "id" | "email">;
  token: string;
};

type GetUserOrFailResult = Pick<User, "id" | "email" | "password">;


const authService = {
    signIn,
}



export default authService