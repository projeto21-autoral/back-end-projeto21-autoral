import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { UserParams } from "protocols";
import { duplicatedEmailError} from "./errors";
import { notFoundError } from "@/errors/notFoundError";
import userRepository from "repositories/userRepository";

type UserIdParams = {
    userId: number;
}
async function createUser({name, email, password}: UserParams): Promise<User> {
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

async function findUserById(userId: number): Promise<User>{
    const user = await userRepository.findById(userId)
    if(!user){
        throw notFoundError()
    }
    return user
}

async function findAllUsers(){
    const users = await userRepository.findAllUsers()
    if(!users) throw notFoundError()
    return users
}

const userService = {
    createUser,
    findUserById,
    findAllUsers,
}

export default userService