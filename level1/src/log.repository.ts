import Log from "./log";
import {constants as fsConstants, promises as fsp} from 'fs';

export default class LogRepository {
    static async persist(log: Log): Promise<void> {
        await this._createDir();
        await fsp.writeFile(`./parsed/${log.id}.json`, JSON.stringify(log));
    }

    private static async _createDir(): Promise<void> {
        try {
            await fsp.access('./parsed', fsConstants.F_OK);
        } catch (err) {
            await fsp.mkdir('./parsed');
        }
    }
}