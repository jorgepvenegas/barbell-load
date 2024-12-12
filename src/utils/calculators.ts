type PlateAggregator = {
    targetWeight: number;
    remainingWeight: number;
    plateSet: Map<PlateWeight, number>; // weight, count
}

export type BarWeight = 35 | 45;
export type PlateWeight = .25 | .5 | 1 | 2.5 | 5 | 10 | 15 | 25 | 35 | 45 | 55 | 65;

type Plates = Array<PlateWeight>;

const plates: Plates = [65, 55, 45, 35, 25, 15, 10, 5, 2.5, 1, 0.5, 0.25];

export const availablePlates = plates.map(weight => ({
    enabled: true,
    weight
}));

export type PlatePair = {
    count: number;
    weight: PlateWeight
};

export const calculatePlates = ({ targetWeight, barWeight, selectedPlates }: { targetWeight: number, barWeight: number, selectedPlates: typeof availablePlates }): Array<PlatePair> => {
    const { plateSet } = selectedPlates.filter(({ enabled }) => enabled).reduce((acc, next) => {
        const plate = next;
        function addPlates() {
            if (acc.remainingWeight >= plate.weight * 2) {
                if (acc.plateSet.get(plate.weight)) {
                    acc.plateSet.set(plate.weight, acc.plateSet.get(plate.weight)! + 1)
                }
                else {
                    acc.plateSet.set(plate.weight, 1)
                }
                acc.remainingWeight -= plate.weight * 2;
                return addPlates();
            }
            return acc;
        }
        return addPlates();
    }, { targetWeight, remainingWeight: targetWeight - barWeight, plateSet: new Map<PlateWeight, number>() } as PlateAggregator)

    let output: Array<PlatePair> = [];

    for (const [weight, count] of plateSet.entries()) {
        output.push({
            count,
            weight
        });
    }

    return output;
}
