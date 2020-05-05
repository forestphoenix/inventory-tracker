import { DomainModel, DomainEvent, FoodInfo, FoodAdded, FoodId } from './inventory';

export type InventoryCommand = (model: DomainModel) => [DomainEvent];

export function addFood(info: FoodInfo, id = new FoodId()): InventoryCommand
{
    return _ => [{tag: "FoodAdded", info, id}];
}
