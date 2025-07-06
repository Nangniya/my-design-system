import Select from './components/Select/Select';

const App = () => {
  return (
    <main className="p-8">
      <Select>
        <Select.Trigger placeholder="선택해 주세요." />
        <Select.Content>
          <Select.Option value="1">선택 1</Select.Option>
          <Select.Option value="2">선택 2</Select.Option>
          <Select.Option value="3">선택 3</Select.Option>
        </Select.Content>
      </Select>
    </main>
  );
};

export default App;
