import { Logger } from '@nestjs/common'
import { Transport } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ExceptionFilter } from './common/filters/exceptionFilter'

const logger = new Logger('Account service')

const microserviceOptions = {
    transport: Transport.TCP,
    options: {
        host: '127.0.0.1',
        port: 8877
    }
}

async function bootstrap() {
    const app = await NestFactory.createMicroservice(
        AppModule,
        microserviceOptions
    )
    app.useGlobalFilters(new ExceptionFilter())
    app.listen(() => {
        logger.log('account microservice is listening')
    })
}
bootstrap()
