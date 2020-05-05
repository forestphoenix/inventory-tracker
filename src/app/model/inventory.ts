// tslint:disable: max-classes-per-file

import { NSCrypto } from "nativescript-crypto";

export class FoodId {
    constructor() {
        this.id = new NSCrypto().randomUUID();
    }

    id: string;
}

export class FoodInfo {
    name = "undefined";
    image = null as null | string; // Image as binary

    quantity = null as null | number; // [g]
    calories = null as null | number; // [kcal/100g]
    carbohydrates = null as null | number; // [g/100g]
    sugar = null as null | number; // [g/100g]
    fat = null as null | number; // [g/100g]
    saturatedFat = null as null | number; // [g/100g]
    protein = null as null | number; // [g/100g]) {
}

export class FoodAdded {
    tag: "FoodAdded";
    id: FoodId;

    info: FoodInfo;
}

export class FoodConsumed {
    tag: "FoodConsumed";
    id: FoodId;

    quantityRemaining = 0;
}

export class FoodCorrected {
    tag: "FoodCorrected";
    id: FoodId;

    info: FoodInfo;
}

export class FoodFinished {
    tag: "FoodFinished";
    id: FoodId;
}

export class FoodDisposed {
    tag: "FoodDisposed";
    id: FoodId;
}

export type DomainEvent =
    | FoodAdded
    | FoodConsumed
    | FoodCorrected
    | FoodFinished
    | FoodDisposed;

export class StoredFoods {
    stored: Map<FoodId, FoodInfo>;
}

export class DomainModel {
    storedFoods: StoredFoods;

    project(event: DomainEvent): void {
        switch (event.tag) {
            case "FoodAdded":
            case "FoodCorrected":
                this.storedFoods.stored.set(event.id, event.info);
                break;

            case "FoodConsumed":
                const food = this.storedFoods.stored.get(event.id);
                if (food) {
                    food.quantity = event.quantityRemaining;
                }
                break;

            case "FoodFinished":
            case "FoodDisposed":
                this.storedFoods.stored.delete(event.id);
                break;
        }
    }
}
