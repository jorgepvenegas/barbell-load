import { createEffect, createSignal, type Component } from 'solid-js';
import styles from './App.module.css';
import { PlatePair, availablePlates, calculatePlates } from './utils/calculators';



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
    <div class={styles.App}>
      <header class={styles.header}>
        <div>
          {selectedPlates().map(({ enabled, weight }, index) => (
            <div>
              <input type="checkbox" name={`${weight}-plate`} checked={enabled} onChange={() => handlePlateCheckbox(index)} />
              <label for={`${weight}-plate`}>{`${weight} plate`}</label>
            </div>
          ))}
        </div>
        <p class={styles.emojiThing}>🏋️</p>
        <select onChange={(e) => {
          setBarWeight(Number(e.target.value))
        }}>
          <option value={35}>35lb</option>
          <option value={45} selected>45lb</option>
        </select>
        <input class={styles.bigInput} value={weight()} type="number" min={45} max={9000} onKeyUp={onKeyUp} />
        {weight() <= barWeight() && (
          <p>Need <i>at least </i>{barWeight()} lb 🏋️</p>
        )}
        {weight() === 9000 ? (
          <p>IT'S OVER 9000!</p>
        ) : weight() >= 1000 ? (
          <p>WOAH DUDE!</p>
        ) : weight() >= 300 ? (
          <p>So strong...😏</p>
        ) : null}
        {plates() && (
          <div>
            <small>Considering a {barWeight()}(?) lb bar and<br /> the  plates available <br /> you need</small>
            <ul class={styles.ul}>
              {plates()?.map(({ count, weight }) => (
                <li>{count} plate(s) of {weight}lb per side</li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div >
  );
};

export default App;
