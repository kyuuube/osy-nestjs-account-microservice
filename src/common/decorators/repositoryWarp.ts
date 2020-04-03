import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
export function RepositoryWarp() {
    const logger = new Logger('repositoryWarp')
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        logger.log({target, key, descriptor})
        logger.log(JSON.stringify(descriptor))
        const value = descriptor.value
        // descriptor.value = async (...args: any) => {
        //     // const user = await value(args)
        //     // logger.log(user)
        //     // return {
        //     //     code: 500
        //     // }
        //     // if (!value) {
        //     //         throw new RpcException({code: 500, message: '获取失败'})
        //     // } else {
        //     //     return  value
        //     // }
        // };
        return descriptor
    }
}
