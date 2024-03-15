import { createEffect, createSignal, type Component } from 'solid-js';

import styles from './App.module.css';
import { availablePlates, calculatePlates } from './utils/calculators';

const App: Component = () => {

  const [weight, setWeight] = createSignal(45);
  const [plates, setPlates] = createSignal<Array<number>>([]);

  createEffect(() => {
    const {plates} = calculatePlates(weight());
    setPlates(plates)
  });

  console.log(plates);
  
  const onKeyUp = (e) => {
    setWeight(Number(e.target.value));
  }

  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <input value={weight()} type="number" onKeyUp={onKeyUp} />
        <h1>{weight()}</h1>
        {plates().length > 0 && (
          <div>
            <p>Considering {JSON.stringify(availablePlates)} plates available...</p>
            <p>You need:</p>
            <ul>
              {plates().map(p => (
                <li>2 x {p}lb plates</li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
};

export default App;
