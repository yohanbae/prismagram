import {isAuthenticated} from "../../../middlewares";
import {prisma} from "../../../../generated/prisma-client";

export default {
    Mutation: {
        toggleLike: async (_, args, {request}) => {
            isAuthenticated(request);
            const {postId} = args;
            const {user} = request;
            const filterOptions = {
                AND: [
                    {
                        user: {
                            id: user.id
                        },
                        post: {
                            id: postId
                        }
                    }
                ]
            };

            try{
                const existingLike = await prisma.$exists.like(filterOptions);
                if(existingLike){
                    // If some user LIKED a post
                    // THEN TO DO ~~
                    await prisma.deleteManyLikes(filterOptions);
                }else{
                    // If the user didn't LIKE the POST
                    // then CREATE LIKE
                    
                    await prisma.createLike({
                        user: {
                            connect: {
                                id: user.id
                            },
                        },
                        post: {
                            connect: {
                                id: postId
                            }
                        }
                    });
                }
                return true;
            }catch{
                return false;
            }

        }
    }
}