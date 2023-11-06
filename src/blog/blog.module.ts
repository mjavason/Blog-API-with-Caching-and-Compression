import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { BlogControllerPublic } from './blog.public.controller';
import { Blog, BlogSchema } from './blog.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Blog.name,
        useFactory: () => {
          const schema = BlogSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [BlogController, BlogControllerPublic],
  providers: [BlogService],
})
export class BlogModule {}
