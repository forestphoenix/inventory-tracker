import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NutritionRepositoryService } from "./nutrition-repository.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [],
    imports: [NativeScriptCommonModule, HttpClientModule],
    exports: [NutritionRepositoryService],
    providers: [NutritionRepositoryService],
    schemas: [NO_ERRORS_SCHEMA],
})
export class ThirdpartyServicesModule {}
