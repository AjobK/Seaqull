import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth.module'
import { BanModule } from './modules/ban.module'
import { CommentModule } from './modules/comment.module'
import { PostModule } from './modules/post.module'
import { ProfileModule } from './modules/profile.module'
import { RoleModule } from './modules/role.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { configValidationSchema } from './config.schema'
import { PostLikeModule } from './modules/post-like.module'
import { APP_GUARD, Reflector } from '@nestjs/core'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      validationSchema: configValidationSchema
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/public'),
    }),
    AuthModule,
    BanModule,
    CommentModule,
    PostModule,
    ProfileModule,
    RoleModule,
    PostLikeModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          autoLoadEntities: true,
          synchronize: true
        }
      }
    })
  ],
  providers: [
    {
      provide: APP_GUARD,
      useFactory: (ref) => new JwtAuthGuard(ref),
      inject: [Reflector],
    },
  ]
})
export class AppModule {}
