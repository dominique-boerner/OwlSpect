import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CpuModule } from './modules/cpu/cpu.module';
import { MemoryModule } from './modules/memory/memory.module';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [CpuModule, MemoryModule],
})
export class AppModule implements NestModule {
  /**
   * To call any route of the host system, a password needs to be passed in the authorization header.
   * This method is called from nest, and applies the AuthMiddleware onto every Request, which checks, if
   * the specific password is set.
   * @see AuthMiddleware
   */
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
