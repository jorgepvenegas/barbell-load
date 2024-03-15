import { createEffect, createSignal, type Component } from 'solid-js';

import styles from './App.module.css';
import { availablePlates, calculatePlates } from './utils/calculators';

const App: Component = () => {

  const [weight, setWeight] = createSignal(95);
  const [plates, setPlates] = createSignal<Array<string>>();

  createEffect(() => {
    const { plates } = calculatePlates(weight());
    setPlates(plates)
  });

  const onKeyUp = (e) => {
    const newWeight = Number(e.target.value) > 9000 ? 9000 : Number(e.target.value);
    console.log(newWeight);
    
    setWeight(newWeight);
  }

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <p class={styles.emojiThing}>🏋️</p>
        <input class={styles.bigInput} value={weight()} type="number" onKeyUp={onKeyUp} />
        {weight() <= 45 && (
          <p>Need <i>at least </i>45 lb 🏋️</p>
        )}
        {weight() === 9000 ? (
          <p>IT'S OVER 9000!</p>
        ) : weight() >= 1000 ? (
          <p>WOAH DUDE!</p>
        ) : weight() >= 400 ? (
          <p>So strong...😏</p>
        ) : null}
        {plates() && (
          <div>
            <small>Considering a 45(?) lb bar and<br /> {availablePlates.join(', ')} lb plates available <br /> you need</small>
            <ul class={styles.ul}>
              {plates()?.map(p => (
                <li>{p}  per side</li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div >
  );
};

export default App;
