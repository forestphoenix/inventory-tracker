// tslint:disable: max-classes-per-file

import { EventStore } from "~/app/storage/event-store";

// tslint:disable-next-line: variable-name
const Sqlite = require("nativescript-sqlite");

class Event {
    increment: number;
}

class Projection {
    total: number;
}

describe("EventStoreService", () => {
    let service: EventStore<Event, Projection>;

    beforeEach(() => {
        service = new EventStore<Event, Projection>(
            { total: 0 },
            (ev, proj) => {
                proj.total += ev.increment;
            }
        );
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });

    it("can be initialized with an in-memory db", async () => {
        await service.initDb(":memory:");
        // Smoke-test: we just check for exceptions
    });

    describe("an initialized database", async () => {
        beforeEach(async () => {
            await service.initDb(":memory:");
        });

        it("can record an event", async () => {
            await service.recordEvent({ increment: 3 });

            expect(service.getProjection().total).toBe(3);
        });
    });

    describe("an initialized database", () => {
        beforeEach(async () => {
            await service.initDb(":memory:");
        });

        it("can record an event", async () => {
            await service.recordEvent({ increment: 3 });

            expect(service.getProjection().total).toBe(3);
        });
    });

    describe("reading from the database", () => {
        beforeEach(async () => {
            if (await Sqlite.exists("testdb.db3")) {
                await Sqlite.deleteDatabase("testdb.db3");
            }
        });

        let callsToProjectOnReopen = 0;
        const reopenedService = new EventStore<Event, Projection>(
            { total: 0 },
            (ev, proj) => {
                proj.total += ev.increment;
                callsToProjectOnReopen++;
            }
        );

        it("will use the projector with few events", async () => {
            await service.initDb("testdb.db3");

            await service.recordEvent({ increment: 1 });
            await service.recordEvent({ increment: 2 });
            await service.recordEvent({ increment: 3 });

            await service.close();
            callsToProjectOnReopen = 0;
            await reopenedService.initDb("testdb.db3");

            expect(reopenedService.getProjection().total).toBe(6);
            expect(callsToProjectOnReopen).toBe(3);

            await reopenedService.close();
        });

        it("will use the projector and the cache with many events", async () => {
            await service.initDb("testdb.db3");

            for (let i = 1; i < 100; i++) {
                await service.recordEvent({ increment: i });
            }

            await service.close();
            callsToProjectOnReopen = 0;
            await reopenedService.initDb("testdb.db3");

            expect(reopenedService.getProjection().total).toBe(4950);
            expect(callsToProjectOnReopen).toBeLessThan(10); // The projection should be cached every 10 entries.
            expect(callsToProjectOnReopen).toBeGreaterThan(0); // We want at least one project to be executed to test that scenario

            await reopenedService.close();
        });
    });
});
