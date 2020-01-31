import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthUser } from './app.entity'
import * as dotenv from 'dotenv'

dotenv.config()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      database: 'account',
      entities: [AuthUser],
      host: process.env.DB_HOST,
      password: process.env.DB_ADMIN_PASSWORD,
      port: 3306,
      synchronize: true,
      type: 'mysql',
      username: process.env.DB_ADMIN_USERNAME,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
