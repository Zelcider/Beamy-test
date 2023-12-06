import { Body, Controller, Post } from '@nestjs/common';
import { LogDto } from './log.dto';
import { LogService } from './log.service';

@Controller()
export class LogsController {
  constructor(private readonly logService: LogService) {}

  @Post()
  async parse(@Body() logData: LogDto) {
    await this.logService.parse(logData);
  }
}
