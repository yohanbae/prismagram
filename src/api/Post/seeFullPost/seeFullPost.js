import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeFullPost: async(_, args) => {
            const { id } = args;

            return prisma.post({id});
            // return prisma.post({id}).$fragment(FULL_POST_FRAGMENT);
            // const comments = await prisma.post({id}).comments().$fragment(COMMENT_FRAGMENT);

            // const files = await prisma.post({id}).files();
            // const user = await prisma.post({id}).user();
        }
    }

}