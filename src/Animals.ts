import {randomInt} from "./util";

/**
 * Base class for all animals.
 */
export default abstract class Animal {
    constructor(public id: number | null = null) {
    }

    abstract harvestProduct(): AnimalProduct
}

export class Cow extends Animal {
    public harvestProduct(): AnimalProduct {
        return {name: "milk", quantity: randomInt(8, 12)};
    }
}

export class Chicken extends Animal {
    public harvestProduct(): AnimalProduct {
        return {name: "egg", quantity: randomInt(0, 1)};
    }
}

/**
 * Thing produced by animals. Example: `{ name: "milk", quantity: 10 }` means ten liters of milk.
 * Could be replaced with abstract class and it's derived classes.
 */
export type AnimalProduct = {
    name: string;
    quantity: number;
}
