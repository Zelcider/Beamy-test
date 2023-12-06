import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import Log from './log.domain';
import { LogEvent, LogInternalQueue, LogService } from './log.service';

@Processor(LogInternalQueue)
export class LogProcessor {
  constructor(private readonly logService: LogService) {}

  @Process(LogEvent.parsed)
  async parsed(job: Job<Log>) {
    const { data } = job;
    console.log('parsed');

    await this.logService.enrich(data);
  }

  @Process(LogEvent.enriched)
  async sendResetPasswordEmail(job: Job<Log>) {
    const { data } = job;
    console.log('enriched');

    await this.logService.addToList(data);
  }
}
