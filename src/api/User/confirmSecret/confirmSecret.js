import {prisma} from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default{
    Mutation:{
        // createAccount: async(_, args)=>{
        //     const {username, email, firstName="", lastName="", bio=""} = args;
        //     const user = await prisma.createUser({username, email, firstName, lastName, bio});
        //     return user;
        // }
        confirmSecret: async(_, args)=>{
            const {email, secret} = args;
            const user = await prisma.user({email});
            console.log('H', email, secret);
            if(user.loginSecret === secret){
                await prisma.updateUser({
                    where: {id:user.id},
                    data: {
                        loginSecret: ""
                    }
                });
                return generateToken(user.id);
            }else{
                throw Error("Wrong combination");
            }
        }
    }
}