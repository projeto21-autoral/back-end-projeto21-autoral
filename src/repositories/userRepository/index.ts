import { prisma } from "../../config";
import {Prisma} from "@prisma/client"

async function findByEmail(email:string, select?: Prisma.UserSelect){
    const params: Prisma.UserFindUniqueArgs = {
        where:{
          email,
        }
    }
    
    if(select) {
        params.select = select;
    }
    
    return prisma.user.findUnique(params)
}
async function findById(userId:number, select?:Prisma.UserSelect){
    const params: Prisma.UserFindUniqueArgs = {
        where:{
            id:userId
        }
    }
    if(select){
        params.select = select
    }
    return prisma.user.findUnique(params)
}

async function findAllUsers(select?:Prisma.UserFindManyArgs){
    return prisma.user.findMany()
}

async function create(data: Prisma.UserUncheckedCreateInput){
    return prisma.user.create({
        data,
    });
}


const userRepository = {
    findByEmail,
    findById,
    findAllUsers,
    create,
}

export default userRepository