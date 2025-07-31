import { useRef, useState } from 'react';
import TextField from './components/TextField';

const App = () => {
  const [controlledValue, setControlledValue] = useState('');
  const unControlledRef = useRef<HTMLInputElement>(null);

  return (
    <main className="p-8">
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">TextField Controlled (제어 컴포넌트)</h2>
          <div className="space-y-2">
            <TextField
              label="제어 TextField"
              value={controlledValue}
              onChange={setControlledValue}
              placeholder="제어 value 입력"
            />
            <div className="text-xs text-gray-50">현재 값: {controlledValue}</div>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4">TextField Uncontrolled (비제어 컴포넌트)</h2>
          <TextField
            label="비제어 TextField"
            defaultValue="초기값"
            placeholder="비제어 value 입력"
            ref={unControlledRef}
          />
        </section>
      </div>
      <button onClick={() => console.log(unControlledRef.current?.value)}>ref 값 읽기</button>
    </main>
  );
};

export default App;
