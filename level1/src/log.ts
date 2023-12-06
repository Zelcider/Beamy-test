export default class Log {
    constructor(
        readonly id: string,
        readonly service_name: string,
        readonly process: string,
        readonly load_avg_1m: string,
        readonly load_avg_5m: string,
        readonly load_avg_15m: string,
    ) {
    }

    static parse(raw: string[]): Log {
        const temp_log: Record<string, string> = {};
        for (const rawLine of raw) {
            const [property_name, property_value] = rawLine.split('=');
            temp_log[property_name] = property_value;
        }
        return new Log(temp_log.id, temp_log.service_name, temp_log.process, temp_log.load_avg_1m, temp_log.load_avg_5m, temp_log.load_avg_15m)
    }
}