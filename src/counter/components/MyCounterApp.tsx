import { useState } from "react";

export const MyCounterApp = () => {
  const [ counter, setCounter]  = useState(5);

  const handleAdd = () => setCounter(counter + 1);
    const handleSubtract = () => setCounter(prevState => prevState - 1);
    const handleReset = () => setCounter(0);
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>counter: {counter}</h1>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={handleAdd}>+1</button>
        <button onClick={handleSubtract}>-1</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}