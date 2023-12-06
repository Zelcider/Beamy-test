export default class Log {
  readonly id: string;
  readonly service_name: string;
  readonly process: string;
  readonly load_avg_1m: string;
  readonly load_avg_5m: string;
  readonly load_avg_15m: string;
  slow_computation: string;

  constructor(
    id: string,
    service_name: string,
    process: string,
    load_avg_1m: string,
    load_avg_5m: string,
    load_avg_15m: string,
  ) {
    this.load_avg_15m = load_avg_15m;
    this.load_avg_5m = load_avg_5m;
    this.load_avg_1m = load_avg_1m;
    this.process = process;
    this.service_name = service_name;
    this.id = id;
    this.slow_computation = '';
  }

  static parse(raw: string[]): Log {
    const temp_log: Record<string, string> = {};
    for (const rawLine of raw) {
      const [property_name, property_value] = rawLine.split('=');
      temp_log[property_name] = property_value;
    }
    return new Log(
      temp_log.id,
      temp_log.service_name,
      temp_log.process,
      temp_log.load_avg_1m,
      temp_log.load_avg_5m,
      temp_log.load_avg_15m,
    );
  }

  enrich(slow_computation: string): Log {
    this.slow_computation = slow_computation;
    return this;
  }
}
