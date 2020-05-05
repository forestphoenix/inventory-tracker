import {
    DomainModel,
    DomainEvent,
    FoodAdded,
    FoodInfo,
} from "../app/model/inventory";
import { InventoryCommand } from "~/app/model/inventory-commands";
import { addFood } from "../app/model/inventory-commands";
// tslint:disable: max-classes-per-file

function given(model: DomainModel): Given {
    return new Given(model);
}

class Given {
    constructor(private givenModel: DomainModel) {}

    when(command: InventoryCommand) {
        return new When(this.givenModel, command);
    }
}

class When {
    result: [DomainEvent];
    constructor(givenModel: DomainModel, when: InventoryCommand) {
        this.result = when(givenModel);
    }
}

describe("A new Item", () => {
    it("can be added to an empty inventory", () => {
        const result = given(new DomainModel()).when(addFood(new FoodInfo()))
            .result;

        expect(result.length).toBe(1);
        expect(result[0].tag).toBe("FoodAdded");
    });
});
