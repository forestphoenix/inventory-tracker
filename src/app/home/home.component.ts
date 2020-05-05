import { Component, OnInit } from "@angular/core";

import { InventoryService } from "../model/inventory.service";
import { FoodInfo } from "../model/inventory";

@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
    get items(): Array<FoodInfo> {
        return Array.from(this._itemService.getStoredFoods().stored.values());
    }

    constructor(private _itemService: InventoryService) {}

    ngOnInit(): void {}
}
