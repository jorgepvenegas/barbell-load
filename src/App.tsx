import { createEffect, createSignal, type Component } from 'solid-js';
import { PlatePair, availablePlates, calculatePlates } from './utils/calculators';
import { styled } from "solid-styled-components";

const App: Component = () => {

  const [weight, setWeight] = createSignal(950);
  const [plates, setPlates] = createSignal<Array<PlatePair>>();
  const [selectedPlates, setSelectedPlates] = createSignal(availablePlates)
  const [barWeight, setBarWeight] = createSignal<number>(45);

  createEffect(() => {
    const plates = calculatePlates({
      targetWeight: weight(),
      barWeight: barWeight(),
      selectedPlates: selectedPlates(),
    });
    setPlates(plates)
  });

  const onKeyUp = (event: KeyboardEvent) => {
    const target = event.target as HTMLInputElement;
    const newWeight = Number(target.value) > 9000 ? 9000 : Number(target.value);
    setWeight(newWeight);
  }

  const handlePlateCheckbox = (index: number) => {
    const updatedSelectedPlantes = selectedPlates().map(({ enabled, weight }, i) => ({
      enabled: index === i ? !enabled : enabled,
      weight
    }))

    setSelectedPlates(updatedSelectedPlantes)
  }

  return (
    <div class="container mx-auto w-full sm:max-w-2xl flex flex-col gap-3 min-h-screen justify-center">
      <div class="mx-4 flex flex-col gap-4">
        <h1 class="text-4xl mt-5">Barbell load calculator</h1>
        <div class="collapse collapse-arrow  bg-base-200">
          <input type="checkbox" />
          <div class="collapse-title text-lg font-medium">
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
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text text-lg">Pick a bar</span>
          </div>
          <select class="select select-bordered w-full input-lg" onChange={(e) => {
            setBarWeight(Number(e.target.value))
          }}>
            <option value={35}>35lb</option>
            <option value={45} selected>45lb</option>
          </select>
        </label>

        <label class="form-control w-full">
          <div class="label">
            <span class="label-text text-lg">Target weight</span>
          </div>
          <input class="input input-bordered w-full input-lg" value={weight()} type="number" min={45} max={9000} onKeyUp={onKeyUp} />
        </label>



        {plates() && (
          <div class="p-4 bg-base-200 rounded-box">
            <h2 class="pb-3 text-2xl font-semibold">🏋️ You need</h2>
            <ul class="list-disc px-4 text-xl">
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
