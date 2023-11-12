import { useState } from 'react';

import Delimiter from './components/delimiter';


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <div>
        <h1>play me here</h1>
        <div>text1</div>
        <Delimiter h />
        <div>text2</div>
      </div>
    </>
  );
}

export default App;
