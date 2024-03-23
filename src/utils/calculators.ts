type PlateAggregator = {
    targetWeight: number;
    remainingWeight: number;
    plates: Map<PlateWeight, number>; // weight, count
}

export type BarWeight = 35 | 45;
export type PlateWeight = .25 | .5 | 1 | 2.5 | 5 | 10 | 15 | 25 | 35 | 45 | 55;

export type Plates = Array<PlateWeight>;

export const availablePlates: Plates = [55, 45, 35, 25, 15, 10, 5, 2.5, 1, 0.5];

export type PlatePair = {
    count: number;
    weight: PlateWeight
};

export const calculatePlates = ({ targetWeight, barWeight }: { targetWeight: number, barWeight: number }): Array<PlatePair> => {

    const { plates } = availablePlates.reduce((acc, next) => {
        const plate = next;
        function addPlates() {
            if (acc.remainingWeight >= plate * 2) {
                if (acc.plates.get(plate)) {
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
    }, { targetWeight, remainingWeight: targetWeight - barWeight, plates: new Map<PlateWeight, number>() } as PlateAggregator)

    // Simplify the output as array of string so we use them in a unordered list
    let output: Array<PlatePair> = [];

    for (const [weight, count] of plates.entries()) {
        output.push({
            count,
            weight
        });
    }

    return output;
}
