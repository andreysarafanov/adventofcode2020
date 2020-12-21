type Receipt = {
    ingredients: string[],
    possibleAllergens: string[]
}

export function calcAllergens(input: string) {
    const receipts = parseInput(input);
    const possibleIngredientsByAllergen = new Map<string, Set<string>>();

    const allIngredients = new Set<string>();

    for (let receipt of receipts) {
        receipt.ingredients.forEach(ing => allIngredients.add(ing));

        for (let allergen of receipt.possibleAllergens) {
            const currentIngredients = possibleIngredientsByAllergen.get(allergen);
            if (!currentIngredients) {
                possibleIngredientsByAllergen.set(allergen, new Set(receipt.ingredients));
            } else {
                const newAllergens = new Set([...receipt.ingredients].filter(x => currentIngredients.has(x)))
                possibleIngredientsByAllergen.set(allergen, newAllergens);
            }
        }
    }

    const allIngredientsThatCannotContainAllergens = new Set([...allIngredients]);

    for(let ingList of possibleIngredientsByAllergen.values()) {
        ingList.forEach(ing => allIngredientsThatCannotContainAllergens.delete(ing));
    }

    while ([...possibleIngredientsByAllergen.values()].some(a => a.size > 1)) {
        
    }

    let result = 0;
    for (let receipt of receipts) {
        for (let ingredient of receipt.ingredients) {
            if (allIngredientsThatCannotContainAllergens.has(ingredient)) {
                result++;
            }
        }
    }
    return result;
}

function parseInput(input: string): Receipt[] {
    return input.split('\n').map(parseReceipt);
}

function parseReceipt(line: string): Receipt {
    const [_, ingStr, allergensStr] = line.match(/(.*) \(contains (.*)\)/);
    return {
        ingredients: ingStr.split(' '),
        possibleAllergens: allergensStr.split(', ')
    };
}