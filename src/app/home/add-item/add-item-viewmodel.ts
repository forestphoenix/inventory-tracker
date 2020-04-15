export class AddItemViewmodel {
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
