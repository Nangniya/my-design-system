import Select from './components/Select';
import type { IOption } from './components/Select/selectContext';

const App = () => {
  const options: IOption[] = [
    { value: '1', label: '선택 1' },
    { value: '2', label: '선택 2' },
    { value: '3', label: '선택 3' },
  ];

  return (
    <main className="p-8">
      <Select options={options} placeholder="선택해 주세요." label="레이블 이름" />
    </main>
  );
};

export default App;
