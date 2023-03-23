import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/infra/prisma.service';
import { Post } from '../model/post.model';

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query(() => [Post])
  async postList() {
    return this.prisma.post.findMany();
  }

  @Mutation(() => Post)
  async createPost(
    @Args('title') title: string,
    @Args('content') content: string,
  ) {
    return this.prisma.post.create({ data: { title, content } });
  }
}
