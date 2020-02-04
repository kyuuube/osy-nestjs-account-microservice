import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'
import { join } from 'path'

dotenv.config()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      database: 'account',
      entities: [join(__dirname, './**/*.entity{.ts,.js}')],
      host: process.env.DB_HOST,
      password: process.env.DB_ADMIN_PASSWORD,
      port: 3306,
      synchronize: true,
      type: 'mysql',
      username: process.env.DB_ADMIN_USERNAME,
    }),
    AuthModule,
  ],
})
export class AppModule {}
