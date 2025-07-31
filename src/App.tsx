import { useRef, useState } from 'react';
import TextField from './components/TextField';
import TextArea from './components/TextArea/TextArea';

const App = () => {
  const [controlledValue, setControlledValue] = useState({
    name: '',
    age: 0,
  });
  const unControlledRef = useRef<HTMLInputElement>(null);

  return (
    <main className="p-8">
      <div className="space-y-8">
        <section>
          <div className="space-y-2">
            <TextField
              label="제어 TextField"
              helperText="도움말"
              value={controlledValue.name}
              onChange={value => setControlledValue(prev => ({ ...prev, name: value }))}
              placeholder="제어 value 입력"
            />
            <div className="text-xs text-gray-50">현재 값: {controlledValue.name}</div>
          </div>
        </section>
        <section>
          <TextField
            label="비제어 TextField"
            defaultValue="초기값"
            placeholder="비제어 value 입력"
            ref={unControlledRef}
          />
          <button onClick={() => console.log(unControlledRef.current?.value)}>ref 값 읽기</button>
        </section>
        <section>
          <TextArea label="레이블" helperText="도움말" placeholder="내용을 입력하세요" />
        </section>
      </div>
    </main>
  );
};

export default App;
