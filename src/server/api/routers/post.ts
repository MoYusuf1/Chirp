import { z } from "zod";
import { clerkClient } from "@clerk/nextjs/server"
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { User } from "@clerk/nextjs/dist/api";


 const filterUserforClient = (user: User) => {
  return {id: user.id, username:user.username, profilePicture: user.profileImageUrl}
 }

export const postsRouter = createTRPCRouter({

  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
    });


    const users = (
      await clerkClient.users.getUserList({
        userId: posts.map((post) => post.authorId),
        limit: 100,
      
    })
    ).map(filterUserforClient);


    return posts.map((post) => ({
      post,
      author: users.find((user) => user.id === post.authorId),
    })); 
    
  }),


});