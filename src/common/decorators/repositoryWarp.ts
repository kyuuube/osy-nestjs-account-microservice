import { Logger } from '@nestjs/common'
import { RpcException } from '@nestjs/microservices'
export function RepositoryWarp() {
    const logger = new Logger('repositoryWarp')
    return (target: any, key: string, descriptor: PropertyDescriptor) => {

        const method = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const result = await method.apply(this, args);
            if (!result) {
                throw new RpcException({code: 500, message: '获取失败'})
            }
            return result;
        }

        return descriptor
    }
}
