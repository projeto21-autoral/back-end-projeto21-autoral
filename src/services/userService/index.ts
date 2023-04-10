import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { UserParams } from "protocols";
import { duplicatedEmailError } from "./errors";
import userRepository from "repositories/userRepository";

export async function createUser({name, email, password}: UserParams): Promise<User> {
    const existsUser = await userRepository.findByEmail(email);
    if(existsUser){
        throw duplicatedEmailError();
    }

    const hashedPassword = await bcrypt.hash(password,12)
    return userRepository.create({
        name,
        email,
        password:hashedPassword,
    })

}

const userService = {
    createUser,
}

export default userService