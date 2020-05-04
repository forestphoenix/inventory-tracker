// tslint:disable: max-classes-per-file

type FoodEventTag = "FoodAdded" | "FoodConsumed"

interface FoodEvent {
    readonly tag: FoodEventTag;
}

/*
export class FoodId extends UuidIdentity implements Event {}

export class FoodInfo extends Record({
    name: "undefined",
    image: null as null | string, // Image as binary

    quantity: null as null | number, // [g]
    calories: null as null | number, // [kcal/100g]
    carbohydrates: null as null | number, // [g/100g]
    sugar: null as null | number, // [g/100g]
    fat: null as null | number, // [g/100g]
    saturatedFat: null as null | number, // [g/100g]
    protein: null as null | number, // [g/100g]) {
}) {}

export class FoodAdded extends Record({ info: new FoodInfo() })
    implements DomainEvent {}

export class FoodConsumed extends Record({ quantityRemaining: 0 }) implements DomainEvent {
}

export class FoodCorrected implements DomainEvent {
    constructor(public info: FoodInfo) {}
}

export class FoodFinished implements DomainEvent {}

export class FoodDisposed implements DomainEvent {}

export class StoredFood implements ReadModel {
    constructor(private id: FoodId) {}

    getId(): FoodId {
        return this.id;
    }

    info: FoodInfo;
}

export class StoredFoodProjector implements Projector {
    constructor(private repository: Repository<StoredFood>) {}

    @HandleDomainEvent
    async foodAdded(
        _event: FoodAdded,
        message: DomainMessage<FoodAdded, FoodId>
    ) {
        const model = new StoredFood(message.aggregateId);
        await this.repository.save(model);
    }

    @HandleDomainEvent
    async foodConsumed(_event: FoodConsumed, message: DomainMessage) {
        const model = await this.repository.get(message.aggregateId);
        model.info = model.info.set("quantity", _event.quantityRemaining);
        await this.repository.save(model);
    }

    @HandleDomainEvent
    async foodCorrected(_event: FoodCorrected, message: DomainMessage) {
        const model = await this.repository.get(message.aggregateId);
        model.info = _event.info;
        await this.repository.save(model);
    }

    @HandleDomainEvent
    async foodFinished(_event: FoodFinished, message: DomainMessage) {
        await this.repository.remove(message.aggregateId);
    }

    @HandleDomainEvent
    async foodDisposed(_event: FoodDisposed, message: DomainMessage) {
        await this.repository.remove(message.aggregateId);
    }
}
*/
