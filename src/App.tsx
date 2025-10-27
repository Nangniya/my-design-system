import { useRef, useState } from 'react';
import TextField from './components/TextField';

import RadioGroup from './components/Radio';
import Select from './components/Select';

const App = () => {
  const [controlledValue, setControlledValue] = useState('');
  const textFieldRef = useRef<HTMLInputElement>(null);
  const [controlledRadio, setControlledRadio] = useState('1');
  const radioGroupRef = useRef<HTMLFieldSetElement>(null);
  const [selectedFruit, setSelectedFruit] = useState<string>();

  return (
    <main className="p-8">
      <div className="space-y-8">
        <section>
          <div className="space-y-2">
            <TextField
              label="제어 TextField"
              helperText="도움말"
              value={controlledValue}
              onChange={setControlledValue}
              placeholder="제어 value 입력"
            />
            <div className="text-xs text-gray-50">현재 값: {controlledValue}</div>
          </div>
        </section>
        <section>
          <TextField
            label="비제어 TextField"
            defaultValue="초기값"
            placeholder="비제어 value 입력"
            ref={textFieldRef}
          />
          <button
            onClick={() => alert(`현재 ref 값: ${textFieldRef.current?.value}`)}
            className="rounded-md bg-gray-200 px-2 py-1 text-sm"
          >
            ref 값 읽기
          </button>
        </section>
        <section className="space-y-2">
          <RadioGroup
            label="제어 Radio Group"
            value={controlledRadio}
            onValueChange={setControlledRadio}
          >
            <RadioGroup.Item value="1">선택 1</RadioGroup.Item>
            <RadioGroup.Item value="2">선택 2</RadioGroup.Item>
            <RadioGroup.Item value="3" disabled>
              선택 3 (비활성)
            </RadioGroup.Item>
          </RadioGroup>
          <div className="text-xs text-gray-50">현재 값: {controlledRadio}</div>
        </section>
        <section className="space-y-2">
          <RadioGroup label="비제어 Radio Group" defaultValue="a" ref={radioGroupRef}>
            <RadioGroup.Item value="a">선택 A</RadioGroup.Item>
            <RadioGroup.Item value="b">선택 B</RadioGroup.Item>
            <RadioGroup.Item value="c">선택 C</RadioGroup.Item>
          </RadioGroup>
          <button
            onClick={() => {
              const fieldset = radioGroupRef.current;
              if (fieldset) {
                const checkedRadio = fieldset.querySelector(
                  'input[type="radio"]:checked'
                ) as HTMLInputElement;
                alert(`현재 ref 값: ${checkedRadio?.value ?? '선택되지 않음'}`);
              }
            }}
            className="rounded-md bg-gray-200 px-2 py-1 text-sm"
          >
            ref 값 읽기
          </button>
        </section>
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Select(제어)</h2>
          <Select value={selectedFruit} onValueChange={setSelectedFruit}>
            <Select.Trigger placeholder="과일을 선택하세요" />
            <Select.Content>
              <Select.Option value="apple">사과</Select.Option>
              <Select.Option value="banana">바나나</Select.Option>
              <Select.Option value="blueberry">블루베리</Select.Option>
            </Select.Content>
          </Select>
          <div className="text-xs text-gray-50">현재 선택된 과일: {selectedFruit}</div>
        </section>
        <section>
          <h2 className="text-lg font-semibold">Select(비제어)</h2>
          <Select defaultValue="apple">
            <Select.Trigger placeholder="과일을 선택하세요" />
            <Select.Content>
              <Select.Option value="apple">사과</Select.Option>
              <Select.Option value="banana">바나나</Select.Option>
              <Select.Option value="blueberry">블루베리</Select.Option>
            </Select.Content>
          </Select>
        </section>
      </div>
    </main>
  );
};

export default App;
