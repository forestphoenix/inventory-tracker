// tslint:disable-next-line: variable-name
const Sqlite = require("nativescript-sqlite");

export class EventStoreService<TEvent, TProjection> {
    private db: any;
    private projectionVersion = 0;

    constructor(
        private projection: TProjection,
        private projector: (event: TEvent, proj: TProjection) => void
    ) {}

    async initDb(dbname: string): Promise<void> {
        this.db = await new Sqlite(dbname);

        const version = await this.db.version();

        if (version[0] === 0) {
            await this.db.execSQL(
                "CREATE TABLE Events ( " +
                    "event INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "event_timestamp TEXT, " +
                    "event_data BLOB, " +
                    "event_projection_cache BLOB " +
                    ");"
            );
            await this.db.version(1); // Sets the version to 1
        } else if (version[0] === 1) {
            await this.replayEvents();
        }
    }

    async close() : Promise<void> {
        this.db.close();
    }

    async recordEvent(event: TEvent): Promise<void> {
        this.projector(event, this.projection);
        this.projectionVersion++;

        const jsonEvent = JSON.stringify(event);
        const jsonProjection =
            this.projectionVersion % 10 === 0
                ? JSON.stringify({
                      ver: this.projectionVersion,
                      data: this.projection,
                  })
                : null;

        await this.db.execSQL(
            "INSERT INTO Events (event_timestamp, event_data, event_projection_cache) VALUES (datetime(), ?, ?)",
            [jsonEvent, jsonProjection]
        );
    }

    getProjection(): TProjection {
        return { ...this.projection };
    }

    private async replayEvents(): Promise<void> {
        const events: Array<any> = await this.db.all(
            "WITH last_cached_event AS (SELECT coalesce(max(event), 0) AS max FROM Events WHERE event_projection_cache NOT NULL)" +
                "SELECT event_data, event_projection_cache FROM Events, last_cached_event WHERE event >= max ORDER BY event ASC",
            []
        );

        events.forEach((val) => {
            if (val[1] !== null) {
                const projAndVer = JSON.parse(val[1]);
                this.projection = projAndVer.ver;
                this.projection = projAndVer.data;
            }
            else
            {
                this.projector(JSON.parse(val[0]), this.projection);
            }
        });
    }
}
