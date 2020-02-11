import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeUser: async (_, args) => {
            const {username} = args;
            // console.log("ID", id);
            // const user= await prisma.user({id});
            // const posts = await prisma.user({id}).posts();
            // return {user, posts}
            return prisma.user({username});
        }
    }
}