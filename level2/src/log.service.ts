import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { LogDto } from './log.dto';
import Log from './log.domain';
import { compute } from '../../lib/slowComputation';

export const LogInternalQueue = 'logs-stream';
export const ListQueue = 'LIST';

export enum LogEvent {
  parsed = 'parsed',
  enriched = 'enriched',
}

@Injectable()
export class LogService {
  constructor(
    @InjectQueue(LogInternalQueue) private readonly logStreamQueue: Queue,
    @InjectQueue(ListQueue) private readonly listQueue: Queue,
  ) {}

  async parse(logDto: LogDto): Promise<void> {
    console.log('parse');

    const log = Log.parse(logDto.log);
    await this.logStreamQueue.add(LogEvent.parsed, { log });
  }

  async enrich(log: Log): Promise<void> {
    const { slow_computation } = await compute({});
    log = log.enrich(slow_computation);
    await this.logStreamQueue.add(LogEvent.enriched, { log });
  }

  async addToList(log: Log): Promise<void> {
    await this.listQueue.add({ log });
  }
}
