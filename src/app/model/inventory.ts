// tslint:disable: max-classes-per-file

import { NSCrypto } from "nativescript-crypto";

export class FoodId {
    constructor() {
        this.id = new NSCrypto().randomUUID();
    }

    id: string;
}

export class FoodInfo {
    name: string;

    image?: string;

    uiEnabled: boolean = true;

    quantity?: number; // [g]
    calories?: number; // [kcal/100g]
    carbohydrates?: number; // [g/100g]
    sugar?: number; // [g/100g]
    fat?: number; // [g/100g]
    saturatedFat?: number; // [g/100g]
    protein?: number; // [g/100g]
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
    stored = new Map<FoodId, FoodInfo>();
}

export class DomainModel {
    storedFoods = new StoredFoods();

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
