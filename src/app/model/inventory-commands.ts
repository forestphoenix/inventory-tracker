import { DomainModel, DomainEvent, FoodInfo, FoodAdded, FoodId } from './inventory';

export type InventoryCommand = (model: DomainModel) => [DomainEvent];

export function addFood(info: FoodInfo)
{
    return [{tag: "FoodAdded", info, id: new FoodId()}];
}
