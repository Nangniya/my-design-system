import Select from './components/Select';
import type { IOption } from './components/Select/selectContext';
import Form from './components/Form';
import TextField from './components/TextField';
import Button from './components/Button';

const App = () => {
  const options: IOption[] = [
    { value: '1', label: '선택 1' },
    { value: '2', label: '선택 2' },
    { value: '3', label: '선택 3' },
  ];

  const handleFormSubmit = (values: Record<string, any>) => {
    alert(JSON.stringify(values));
  };

  return (
    <main className="p-8">
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Select</h2>
          <Select options={options} placeholder="선택해 주세요." label="레이블 이름" />
        </section>
        <section>
          <h2 className="text-xl font-semibold mb-4">Form</h2>
          <Form
            initialValues={{ email: '', question: '' }}
            onSubmit={handleFormSubmit}
            className="max-w-md space-y-4"
          >
            <Form.Control name="email">
              <TextField type="email" label="이메일" required placeholder="이메일을 입력하세요" />
            </Form.Control>
            <Form.Control name="question">
              <TextField as="textarea" label="질문" required placeholder="질문을 입력하세요" />
            </Form.Control>
            <Form.Submit>
              <Button type="submit">제출하기</Button>
            </Form.Submit>
          </Form>
        </section>
      </div>
    </main>
  );
};

export default App;
