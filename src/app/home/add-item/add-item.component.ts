import { Component, OnInit } from "@angular/core";
import { AddItemViewmodel } from "./add-item-viewmodel";
import { RouterExtensions } from "nativescript-angular/router";
import { BarcodeScanner } from "nativescript-barcodescanner";
import { NutritionRepositoryService } from "~/app/3rdparty-services/nutrition-repository.service";

@Component({
    moduleId: module.id,
    selector: "add-item",
    templateUrl: "./add-item.component.html",
})
export class AddItemComponent implements OnInit {
    data = new AddItemViewmodel();

    constructor(
        private _routerExtensions: RouterExtensions,
        private barcodeScanner: BarcodeScanner,
        private nutritionRepository: NutritionRepositoryService
    ) {}

    ngOnInit(): void {}

    async onScanTap(): Promise<void> {

        const result = await this.barcodeScanner.scan({
            formats: "EAN_13",
            showFlipCameraButton: true,
            preferFrontCamera: false,
            showTorchButton: true,
            beepOnScan: true,
            torchOn: false,
            resultDisplayDuration: 500,
            orientation: "portrait",
            openSettingsIfPermissionWasPreviouslyDenied: true, // ios only
        });

        this.data.name = result.text;

        this.data.uiEnabled = false;
        const lookup = await this.nutritionRepository.findByEAN(result.text);

        await delay(1000);

        Object.assign(this.data, lookup);
        this.data.uiEnabled = true;
    }

    onBackTap(): void {
        this._routerExtensions.back();
    }
}

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
