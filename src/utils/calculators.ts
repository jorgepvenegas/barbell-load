type PlateAggregator = {
    totalWeight: number;
    remainingWeight: number;
    plates: Map<number, number>; // weight, count
}

export const availablePlates = [55, 45, 35, 25, 15, 10, 5, 2.5, 1, 0.5];
export const calculatePlates = (totalWeight: number) => {
    const barWeight = 45;

    const { plates } = availablePlates.reduce((acc, next) => {
        const plate = next;
        function addPlates() {
            if (acc.remainingWeight >= plate * 2) {
                if(acc.plates.get(plate)) {
                    acc.plates.set(plate, acc.plates.get(plate)! + 1)
                }
                else {
                    acc.plates.set(plate, 1)
                }
                acc.remainingWeight -= plate * 2;
                return addPlates();
            }
            return acc;
        }
        return addPlates();
    }, { totalWeight, remainingWeight: totalWeight - barWeight, plates: new Map<number, number>() } as PlateAggregator)

    // Simplify the output as array of string so we use them in a unordered list
    let output = [];

    for(const[weight, count] of plates.entries()) {
        output.push(`${count} plate(s) of ${weight} lb`);
    }
    
    return { plates: output }
}
