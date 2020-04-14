import { Component, OnInit } from "@angular/core";
import { AddItemViewmodel } from "./add-item-viewmodel";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    moduleId: module.id,
    selector: "add-item",
    templateUrl: "./add-item.component.html",
})
export class AddItemComponent implements OnInit {
    data = new AddItemViewmodel();

    constructor(private _routerExtensions: RouterExtensions) {}

    ngOnInit(): void {}

    onScanTap(): void {
        // TODO:.
        ca
    }

    onBackTap(): void {
        this._routerExtensions.back();
    }
}
