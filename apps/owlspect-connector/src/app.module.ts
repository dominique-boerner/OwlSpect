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
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
