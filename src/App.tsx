import { createEffect, createSignal, type Component } from 'solid-js';
import { PlatePair, availablePlates, calculatePlates } from './utils/calculators';

const App: Component = () => {

  const [weight, setWeight] = createSignal(95);
  const [percentage, setPercentage] = createSignal(100);
  const [percentageWeight, setPercentageWeight] = createSignal(weight());
  const [plates, setPlates] = createSignal<Array<PlatePair>>();
  const [selectedPlates, setSelectedPlates] = createSignal(availablePlates)
  const [barWeight, setBarWeight] = createSignal<number>(45);

  createEffect(() => {

    const targetWeight = weight() * (percentage() / 100);

    const plates = calculatePlates({
      targetWeight,
      barWeight: barWeight(),
      selectedPlates: selectedPlates(),
    });
    setPercentageWeight(targetWeight);
    setPlates(plates)
  });

  const handleWeightChange = (event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement;
    const newWeight = Number(target.value) > 9000 ? 9000 : Number(target.value);
    setWeight(newWeight);
  }

  const handlePercentageChange = (event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement;
    setPercentage(Number(target.value));
  }

  const handlePlateCheckbox = (index: number) => {
    const updatedSelectedPlantes = selectedPlates().map(({ enabled, weight }, i) => ({
      enabled: index === i ? !enabled : enabled,
      weight
    }))

    setSelectedPlates(updatedSelectedPlantes)
  }

  return (
    <div class="container mx-auto w-full sm:max-w-2xl flex flex-col gap-3 min-h-screen">
      <div class="m-4 flex flex-col gap-4">
        <h1 class="text-3xl mb-5">Barbell load calculator</h1>
        <div class="collapse collapse-arrow bg-base-200 rounded">
          <input type="checkbox" />
          <div class="collapse-title text-md font-medium">
            Customize available plates
          </div>
          <div class="collapse-content">
            <div class="grid gap-2 sm:grid-cols-4 grid-cols-3">
              {selectedPlates().map(({ enabled, weight }, index) => (
                <button class="btn btn-accent border-cyan-900 hover:bg-cyan-700 hover:border-cyan-700 bg-cyan-900 btn-block btn-lg h-24 flex flex-col justify-center items-center no-animation text-white" onClick={() => handlePlateCheckbox(index)}>
                  <label for={`${weight}-plate`}>{`${weight} lb`}</label>
                  <input class="checkbox checkbox-sm" type="checkbox" name={`${weight}-plate`} checked={enabled} />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div class="flex gap-4">
          <label class="form-control basis-2/3">
            <div class="label">
              <span class="label-text text-md font-semibold">Bar weight</span>
            </div>
            <select class="select select-bordered w-full input-md rounded" onChange={(e) => {
              setBarWeight(Number(e.target.value))
            }}>
              <option value={35}>35lb</option>
              <option value={45} selected>45lb</option>
            </select>
          </label>
          <label class="form-control basis-1/3">
            <div class="label">
              <span class="label-text text-md font-semibold">Target %</span>
            </div>
            <input class="input input-bordered input-md rounded" value={percentage()} type="number" min={1} max={100} onKeyUp={handlePercentageChange} />
          </label>
        </div>

        <label class="form-control w-full">
          <div class="label">
            <span class="label-text text-md font-semibold">Target weight</span>
          </div>
          <input class="input input-bordered w-full input-md rounded" value={weight()} type="number" min={45} max={9000} onKeyUp={handleWeightChange} />
        </label>



        {plates() && (
          <div class="p-4 bg-base-200 rounded">
            <h2 class="pb-3 text-lg font-semibold">For {percentageWeight()} you need</h2>
            <ul class="list-disc px-4 text-md">
              {plates()?.map(({ count, weight }) => (
                <li>{count} plate(s) of {weight}lb per side</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div >
  );
};

export default App;
