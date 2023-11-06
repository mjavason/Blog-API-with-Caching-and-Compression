import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_CONNECTION_STRING } from 'src/constants';
import { MailModule } from './mail/mail.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    AuthModule,
    BlogModule,
    MailModule,
    UserModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 5 * 60 * 60 * 1000, // 1 hour
    }),
    MongooseModule.forRoot(DB_CONNECTION_STRING),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
