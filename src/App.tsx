import { createEffect, createSignal, Show, type Component } from "solid-js";
import {
  PlatePair,
  availablePlates,
  calculatePlates,
} from "./utils/calculators";

const App: Component = () => {
  const [weight, setWeight] = createSignal(65);
  const [percentage, setPercentage] = createSignal(100);
  const [percentageWeight, setPercentageWeight] = createSignal(weight());
  const [plates, setPlates] = createSignal<Array<PlatePair>>();
  const [selectedPlates, setSelectedPlates] = createSignal(availablePlates);
  const [barWeight, setBarWeight] = createSignal<35 | 45>(45);

  createEffect(() => {
    const targetWeight = weight() * (percentage() / 100);

    const plates = calculatePlates({
      targetWeight,
      barWeight: barWeight(),
      selectedPlates: selectedPlates(),
    });
    setPercentageWeight(targetWeight);
    setPlates(plates);
  });

  const handlePercentageInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const newValue = Number(target.value);

    if (isNaN(newValue)) return;

    const newPercentage = Math.min(Math.max(newValue, 70), 100);
    setPercentage(newPercentage);
  };

  const handleWeightInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const newValue = Number(target.value);

    if (isNaN(newValue)) return;

    const newWeight = Math.min(Math.max(newValue, barWeight()), 1500);
    setWeight(newWeight);
  };

  const handlePlateCheckbox = (index: number) => {
    const updatedSelectedPlantes = selectedPlates().map(
      ({ enabled, weight }, i) => ({
        enabled: index === i ? !enabled : enabled,
        weight,
      })
    );

    setSelectedPlates(updatedSelectedPlantes);
  };

  const [increaseButtonDisabled, setIncreaseButtonDisabled] =
    createSignal(false);

  const [decrementButtonDisabled, setDecrementButtonDisabled] =
    createSignal(false);

  createEffect(() => {
    setIncreaseButtonDisabled(percentage() === 100);
    setDecrementButtonDisabled(percentage() === 70);
  });

  const incrementPercentage = () => {
    setPercentage((prev) => prev + 5);
  };

  const decrementPercentage = () => {
    setPercentage((prev) => prev - 5);
  };

  console.log(plates());

  return (
    <div class="container mx-auto w-full sm:max-w-2xl min-h-screen">
      <div class="mx-4 pt-8 flex flex-col gap-7">
        <h1 class="text-3xl mb-5">Barbell load calculator</h1>
        <div class="collapse collapse-arrow bg-base-200 rounded">
          <input type="checkbox" />
          <div class="collapse-title text-md font-medium">Plates</div>
          <div class="collapse-content">
            <div>
              <div class="grid gap-2 sm:grid-cols-4 grid-cols-4">
                {selectedPlates().map(({ enabled, weight }, index) => (
                  <button
                    class="btn btn-accent border-cyan-900 hover:bg-cyan-700 hover:border-cyan-700 bg-cyan-900 btn-block px-5 btn-lg h-24 flex flex-col justify-center items-center no-animation text-white font-normal"
                    onClick={() => handlePlateCheckbox(index)}
                  >
                    <label for={`${weight}-plate`}>{`${weight} lb`}</label>
                    <input
                      class="checkbox checkbox-sm"
                      type="checkbox"
                      name={`${weight}-plate`}
                      checked={enabled}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div class="collapse collapse-arrow bg-base-200 rounded">
          <input type="checkbox" />
          <div class="collapse-title text-md font-medium">
            Barbell ({barWeight()}lb)
          </div>
          <div class="collapse-content">
            <div>
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">35lb</span>
                  <input
                    onClick={() => setBarWeight(35)}
                    type="radio"
                    name="radio-10"
                    class="radio checked:bg-red-500"
                    checked={barWeight() === 35}
                  />
                </label>
              </div>
              <div class="form-control">
                <label class="label cursor-pointer">
                  <span class="label-text">45lb</span>
                  <input
                    onClick={() => setBarWeight(45)}
                    type="radio"
                    name="radio-10"
                    class="radio checked:bg-blue-500"
                    checked={barWeight() === 45}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="flex gap-4 w-full">
          <label class="form-control w-2/5">
            <div class="label">
              <span class="label-text text-lg font-semibold">
                Target weight
              </span>
            </div>
            <input
              class="input input-bordered input-lg rounded w-full text-2xl px-4 text-center"
              value={weight()}
              type="number"
              inputmode="numeric"
              pattern="[0-9]*"
              min={barWeight()}
              max={1500}
              onChange={handleWeightInputChange}
            />
          </label>
          <div class="form-control w-3/5">
            <div class="label">
              <span class="label-text text-lg font-semibold">Target %</span>
            </div>
            <div class="join w-full h-12 text-xl">
              <button
                class="btn join-item btn-lg text-xl rounded"
                onClick={decrementPercentage}
                disabled={decrementButtonDisabled()}
              >
                -
              </button>
              <input
                class="input input-bordered input-lg rounded join-item flex-1 min-w-0 text-2xl px-4 text-center bg-white cursor-default disabled:opacity-100 disabled:bg-white"
                value={percentage()}
                type="number"
                inputmode="numeric"
                pattern="[0-9]*"
                min={70}
                max={100}
                onChange={handlePercentageInputChange}
              />
              <button
                disabled={increaseButtonDisabled()}
                class="btn join-item btn-lg text-xl rounded"
                onClick={incrementPercentage}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div class="p-4 bg-base-200 rounded">
          <h2 class="pb-3 text-xl font-semibold">
            For {percentageWeight()}lb you'll need:
          </h2>
          <Show when={plates()}>
            <ul class="list-disc px-4 text-md text-lg">
              {plates()?.map(({ count, weight }) => (
                <li>
                  {count} plate(s) of {weight}lb per side
                </li>
              ))}
            </ul>
          </Show>
          <Show when={plates()?.length === 0}>
            <p class="text-lg">Just the barbell 😀</p>
          </Show>
        </div>
      </div>
    </div>
  );
};

export default App;
