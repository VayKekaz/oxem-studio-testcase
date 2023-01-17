import Animal, {AnimalProduct} from "./Animals";
import {IdGenerator} from "./util";

export default class Farm {
    private paddocks: { [name: string]: Paddock<Animal> } = {}

    private daysPassed = 0
    private totalProduced: Array<AnimalProduct> = []

    private idGenerator: Generator<number> = IdGenerator();

    /**
     * Assigns ids for animals. It's unique across this farm. Should only be used in `addAnimals()` method.
     * @param animals
     * @private
     */
    private assignIds(...animals: Array<Animal>): void {
        for (const animal of animals) {
            if (animal.id !== null)
                throw new Error(`Animal ${animal} already has id assigned.`);
            animal.id = this.idGenerator.next().value;
        }
    }

    /**
     * Creates paddock with `paddockName` if doesn't exist yet and adds animals to it.
     * @param paddockName usually name of animal. Needed mostly to separate different types
     * because js doesn't have type checks. Can also be used to create different paddocks for
     * the same animal types.
     * @param animals
     */
    public addAnimals<AnimalType extends Animal>(paddockName: string, ...animals: Array<AnimalType>): void {
        if (paddockName in this.paddocks) {
            this.paddocks[paddockName].addAnimals(...animals);
        } else {
            this.paddocks[paddockName] = new Paddock(...animals);
        }
        this.assignIds(...animals);
    }

    /**
     * Skip one day and harvest all products.
     */
    public dayPassed(): void {
        this.daysPassed++;
        Object.values(this.paddocks)
            .map(it => it.harvestProducts())
            .forEach(product => {
                const productAlreadyExists = this.totalProduced.find(it => it.name == product.name);
                if (productAlreadyExists)
                    productAlreadyExists.quantity += product.quantity;
                else
                    this.totalProduced.push(product);
            })
    }

    public skipDays(days: number): void {
        for (let i = 0; i < days; i++) {
            this.dayPassed()
        }
    }

    /**
     * Prints info about every paddock and quantity of animals held.
     */
    public printAnimalInfo() {
        console.log(
            "Current animals on farm:\n" +
            Object.keys(this.paddocks)
                .map(paddockName => `${paddockName}: ${this.paddocks[paddockName].count}`)
                .join("\n")
        );
    }

    /**
     * Prints info about production across all days passed.
     */
    public printProductionInfo() {
        console.log(
            `Produced across ${this.daysPassed} days:\n` +
            this.totalProduced
                .map(product => `${product.name}: ${product.quantity}`)
                .join("\n")
        )
    }
}

/**
 * A paddock for one specific type of animal. I thought it's not a good idea to keep all
 * animals in one place. That's just how it works in real life. In this application it's not
 * necessary, furthermore it's one additional abstraction level, so it should be removed
 * and replaced with one `Array<Animal>` instead.
 */
class Paddock<AnimalType extends Animal> {
    public readonly animals: Array<AnimalType>

    constructor(...animals: Array<AnimalType>) {
        this.animals = animals;
    }

    public get count() {
        return this.animals.length
    }

    public harvestProducts(): AnimalProduct {
        return this.animals
            .map(a => a.harvestProduct())
            .reduce((prev, next) => {
                const name = prev.name;
                const quantity = prev.quantity + next.quantity;
                return {name, quantity}
            })
    }

    public addAnimals(...animals: Array<AnimalType>): void {
        this.animals.push(...animals);
    }
}

