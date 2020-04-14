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

    onScanTap(): void {
        this.barcodeScanner
            .scan({
                formats: "EAN_13",
                showFlipCameraButton: true,
                preferFrontCamera: false,
                showTorchButton: true,
                beepOnScan: true,
                torchOn: false,
                resultDisplayDuration: 500,
                // orientation: orientation,
                openSettingsIfPermissionWasPreviouslyDenied: true, // ios only
            })
            .then((result) => {
                alert({
                    title: "You Scanned ",
                    message:
                        "Format: " +
                        result.format +
                        ",\nContent: " +
                        result.text,
                    okButtonText: "OK",
                });

                this.data.name = result.text;

                return this.nutritionRepository.findByEAN(result.text);
            })
            .then(
                (result) => {
                    copyInto(this.data, result);
                },
                (errorMessage) => {
                    console.log("Error when scanning " + errorMessage);
                }
            );
    }

    onBackTap(): void {
        this._routerExtensions.back();
    }
}

function copyInto<Target>(target: Target, ...sources: Array<object>) {
    return sources.forEach((current) => {
        Object.keys(current).forEach((key) => {
            target[key] = current[key];
        });
    });
}
