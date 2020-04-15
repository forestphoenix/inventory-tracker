import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export interface FoodNutrition {
    name: string;

    image?: string; // Image as binary

    quantity?: number; // [g]
    calories?: number; // [kcal/100g]
    carbohydrates?: number; // [g/100g]
    sugar?: number; // [g/100g]
    fat?: number; // [g/100g]
    saturatedFat?: number; // [g/100g]
    protein?: number; // [g/100g]
}

@Injectable({
    providedIn: "root",
})
export class NutritionRepositoryService {
    private foodFactsRoot = "http://www.openfoodfacts.org/api/v0/";

    constructor(private http: HttpClient) {}

    findByEAN(ean: string): Promise<FoodNutrition> {
        const apiURL = `${this.foodFactsRoot}product/${ean}`;

        return this.http
            .get(apiURL)
            .toPromise()
            .then((result) => {
                const nutriments = result["product"]["nutriments"];

                return {
                    name: result["product"]["product_name"],
                    quantity: result["product"]["product_quantity"],

                    image:
                        result["product"]["selected_images"]["front"][
                            "display"
                        ]["de"],

                    // We can only get the data in kJ, but would like to have kcal
                    calories: NutritionRepositoryService.joulesToCalories(
                        nutriments["energy_100g"]
                    ),
                    carbohydrates: nutriments["carbohydrates_100g"],
                    sugar: nutriments["sugars_100g"],
                    fat: nutriments["fat_100g"],
                    saturatedFat: nutriments["saturated-fat_100g"],
                    protein: nutriments["proteins_100g"],
                };
            });
    }

    private static joulesToCalories(joules: number): number {
        return Math.round(joules / 4.1868);
    }
}
