import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { LogsController } from './logs.controller';
import { ListQueue, LogInternalQueue, LogService } from './log.service';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: LogInternalQueue,
    }),
    BullModule.registerQueue({
      name: ListQueue,
    }),
  ],
  controllers: [LogsController],
  providers: [LogService],
})
export class AppModule {}
