import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";

import { InventoryService } from '../../model/inventory.service';
import { FoodInfo, StoredFoods, FoodId } from '../../model/inventory';

@Component({
    selector: "ItemDetail",
    templateUrl: "./item-detail.component.html"
})
export class ItemDetailComponent implements OnInit {
    item: FoodInfo | undefined;

    constructor(
        private _inventory: InventoryService,
        private _route: ActivatedRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {
        const id = {id: this._route.snapshot.params.id};
        this.item = this._inventory.getStoredFoods().stored.get(id);
    }

    onBackTap(): void {
        this._routerExtensions.back();
    }
}
