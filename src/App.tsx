import { createEffect, createSignal, type Component } from 'solid-js';
import { PlatePair, availablePlates, calculatePlates } from './utils/calculators';
import { styled } from "solid-styled-components";

const PlateSelector = styled("div")``;
const Header = styled("h1")`
  font-size: 1.5em;
  font-weight: bold;
`;

const ResultHeader = styled("h2")`
  font-size: 1.5em;
  font-weight: bold;
`;


const App: Component = () => {

  const [weight, setWeight] = createSignal(95);
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
    <div class="container mx-auto w-4/12 min-w-96 flex flex-col gap-3 min-h-screen justify-center">
      <Header>Barbell load calculator</Header>
      <div class="collapse collapse-arrow  bg-base-200">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">
          Customize plates
        </div>
        <div class="collapse-content">
          <PlateSelector class="grid gap-2 lg:grid-cols-4 grid-cols-3">
            {selectedPlates().map(({ enabled, weight }, index) => (
              <button class="btn btn-accent btn-block btn-lg h-24 flex flex-col justify-center items-center no-animation text-white" onClick={() => handlePlateCheckbox(index)}>
                <label for={`${weight}-plate`}>{`${weight} lb`}</label>
                <input class="checkbox" type="checkbox" name={`${weight}-plate`} checked={enabled} />
              </button>
            ))}
          </PlateSelector>
        </div>
      </div>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Pick a bar</span>
        </div>
        <select class="select select-bordered w-full" onChange={(e) => {
          setBarWeight(Number(e.target.value))
        }}>
          <option value={35}>35lb</option>
          <option value={45} selected>45lb</option>
        </select>
      </label>

      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Target weight</span>
        </div>
        <input class="input input-bordered w-full" value={weight()} type="number" min={45} max={9000} onKeyUp={onKeyUp} />
      </label>


      {weight() <= barWeight() && (
        <div role="alert" class="alert alert-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>Need <i>at least </i>{barWeight()} lb</span>
        </div>
      )}
      {weight() === 9000 ? (
        <div role="alert" class="alert alert-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>It's over 9000!</span>
        </div>
      ) : weight() >= 1000 ? (
        <div role="alert" class="alert alert-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>WOAH DUDE</span>
        </div>
      ) : weight() >= 300 ? (
        <div role="alert" class="alert alert-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>So strong...😏</span>
        </div>
      ) : null}
      {plates() && (
        <div class="p-4 bg-base-200 rounded-box">
            <ResultHeader class="pb-3">🏋️ You need</ResultHeader>
            <ul class="list-disc px-4">
              {plates()?.map(({ count, weight }) => (
                <li>{count} plate(s) of {weight}lb per side</li>
              ))}
            </ul>
        </div>
      )}
    </div >
  );
};

export default App;
