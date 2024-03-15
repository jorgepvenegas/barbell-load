type PlateAggregator = {
    totalWeight: number;
    remainingWeight: number;
    plates: number[];
  }
  
export const availablePlates = [55, 45, 35, 25, 15, 10, 5, 2.5, 1, 0.5];
export const calculatePlates = (totalWeight: number) => {  
    const barWeight = 45;

    return availablePlates.reduce((acc, next) => {
        const plate = next;
        function addPlates() {
        if(acc.remainingWeight >= plate * 2) {
            acc.plates.push(plate);
            acc.remainingWeight -= plate * 2;
            return addPlates();
        }
        return acc;
        }
        return addPlates();  
    }, {totalWeight, remainingWeight: totalWeight - barWeight, plates: []} as PlateAggregator)
}
