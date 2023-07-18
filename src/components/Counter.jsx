import React, { useState, useEffect } from 'react';
import '../components/Counter.css';
import {HiPlus,HiMinus} from 'react-icons/hi'
import {BiReset} from 'react-icons/bi'
import {VscDebugStart} from 'react-icons/vsc'


function Counter() {
  const [counters, setCounters] = useState([
    { id: 1, name: 'Counter 1', value: 0 },
  ]);
  const [newCounterName, setNewCounterName] = useState('');
  const [newCounterValue, setNewCounterValue] = useState(0);
  const [selectedCounterId, setSelectedCounterId] = useState(null);
  const [startValue, setStartValue] = useState(0);

  useEffect(() => {
    // Retrieve counters from localStorage on component mount
    const storedCounters = localStorage.getItem('counters');
    if (storedCounters) {
      setCounters(JSON.parse(storedCounters));
    }
  }, []);

  useEffect(() => {
    // Save counters to localStorage whenever counters state changes
    localStorage.setItem('counters', JSON.stringify(counters));
  }, [counters]);

  const addCounter = () => {
    const newCounter = {
      id: Date.now(),
      name: newCounterName || `Counter ${counters.length + 1}`,
      value: newCounterValue,
    };

    setCounters((prevCounters) => [...prevCounters, newCounter]);
    setNewCounterName('');
    setNewCounterValue(0);
  };

  const removeCounter = (id) => {
    setCounters((prevCounters) =>
      prevCounters.filter((counter) => counter.id !== id)
    );
  };

  const increment = (id) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === id ? { ...counter, value: counter.value + 1 } : counter
      )
    );
  };

  const decrement = (id) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === id ? { ...counter, value: counter.value - 1 } : counter
      )
    );
  };

  const reset = (id) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === id ? { ...counter, value: 0 } : counter
      )
    );
  };

  const handleStartValueChange = (e) => {
    setStartValue(Number(e.target.value));
  };

  const handleSetStartValue = () => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === selectedCounterId
          ? { ...counter, value: startValue }
          : counter
      )
    );
    setSelectedCounterId(null);
    setStartValue(0);
  };

  return (
    <div className="counter">
      {counters.map((counter) => (
        <div key={counter.id} className="counter-item">
          <h2>{counter.name}</h2>
          <h3>Counter: {counter.value}</h3>
          <div className="buttons">
          <button className="btn" onClick={() => increment(counter.id)}>
  <HiPlus className="icon" />
  Increment
</button>
<button className="btn" onClick={() => decrement(counter.id)}>
  <HiMinus className="icon" />
  Decrement
</button>
<button className="btn" onClick={() => reset(counter.id)}>
  <BiReset className="icon"  />
  Reset
</button>
<button className="btn" onClick={() => setSelectedCounterId(counter.id)}>
  <VscDebugStart className="icon" />
  Set Start Value
</button>

            {selectedCounterId === counter.id && (
              <div className="start-value-input">
                <input
                  type="number"
                  value={startValue}
                  placeholder="Start value"
                  onChange={handleStartValueChange}
                />
                <button className="btn" onClick={handleSetStartValue}>
                  Set
                </button>
              </div>
            )}
               <i
          className="fas fa-times remove-icon"
          onClick={() => removeCounter(counter.id)}
        ></i>
          </div>
        </div>
      ))}

      <div className="add-counter">
        <input
          type="text"
          value={newCounterName}
          placeholder="Counter name"
          onChange={(e) => setNewCounterName(e.target.value)}
        />
        <input
          type="number"
          value={newCounterValue}
          placeholder="Start value"
          onChange={(e) => setNewCounterValue(Number(e.target.value))}
        />
        <button className="btn" onClick={addCounter}>
          Add Counter
        </button>
      </div>
    </div>
  );
}

export default Counter;
