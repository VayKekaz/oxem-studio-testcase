import Farm from "./Farm";
import {Cow, Chicken} from "./Animals";
import {generateArray} from "./util";

function main() {
    const farm = new Farm();
    const cowPaddockName = "cows";
    const tenCows = generateArray(10, _ => new Cow());
    const chickenPaddockName = "chickens"
    const twentyChickens = generateArray(20, _ => new Chicken());

    console.log("Initializing farm.");
    farm.addAnimals(cowPaddockName, ...tenCows);
    farm.addAnimals(chickenPaddockName, ...twentyChickens);
    farm.printAnimalInfo();
    console.log("Skipping a week.");
    farm.skipDays(7);
    farm.printProductionInfo();
    console.log("Going to the market to get 1 cow and 5 chickens.")
    farm.addAnimals(cowPaddockName, new Cow());
    farm.addAnimals(chickenPaddockName, ...generateArray(5, _ => new Chicken()));
    farm.printAnimalInfo();
    console.log("Skipping a week.");
    farm.skipDays(7);
    farm.printProductionInfo();
}

main();
