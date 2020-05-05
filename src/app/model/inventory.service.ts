import { Injectable } from "@angular/core";
import { EventStore } from "../storage/event-store";
import { DomainEvent, DomainModel, StoredFoods } from "./inventory";
import { InventoryCommand } from "./inventory-commands";

@Injectable({
    providedIn: "root",
})
export class InventoryService {
    private eventStore: EventStore<DomainEvent, DomainModel>;

    constructor() {
        this.eventStore = new EventStore(new DomainModel(), (ev, proj) =>
            proj.project(ev)
        );
    }

    async init(dbName: string) {
        this.eventStore.initDb(dbName);
    }

    getStoredFoods(): StoredFoods {
        return this.eventStore.getProjection().storedFoods;
    }

    runCommand(cmd: InventoryCommand) {
        const events = cmd(this.eventStore.getProjection());
        events.forEach((event) => {
            this.eventStore.recordEvent(event);
        });
    }
}
