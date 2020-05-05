import { Component, OnInit } from "@angular/core";
import { InventoryService } from "./model/inventory.service";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {
    constructor(private inventory: InventoryService) {
        // Use the component constructor to inject providers.
    }

    async ngOnInit(): Promise<void> {
        await this.inventory.init("inventory.events.db3");
    }
}
