import { secretGenerator, sendSecretMail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default{
    Mutation:{
        requestSecret: async(_, args, {request})=>{
            const {email} = args;
            const loginSecret = secretGenerator();
            console.log(loginSecret, email);
            try{
                await sendSecretMail(email, loginSecret);
                await prisma.updateUser(
                    {data:{loginSecret}, where:{email}}
                );
                return true;
            } catch{
                return false;
            }

        }
    }
}