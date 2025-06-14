import { useRef, useState } from 'react';
import Button from './components/Button';
import TextField from './components/TextField';

const App = () => {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const ref = useRef<HTMLInputElement>(null);
  const handleCheckTextarea = () => {
    const textareaValue = ref.current?.value ?? '';
    if (textareaValue.length > 0 && textareaValue.length < 10)
      setErrorMessage('신청 사유는 10자 이상이어야 합니다.');
  };
  return (
    <main className="p-8">
      <form className="flex flex-col gap-4 w-2xl" onSubmit={e => e.preventDefault()}>
        <TextField
          label="이름"
          placeholder={'이름을 입력해 주세요.'}
          required
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          error={value.length > 0 && value.length < 2 ? '이름은 2자 이상이어야 합니다.' : undefined}
        />
        <TextField
          ref={ref}
          as="textarea"
          label="기타 정보"
          helperText={'신청 사유를 간단히 작성해 주세요.'}
          placeholder={'신청 사유를 입력해 주세요.'}
          error={errorMessage}
        />
        <div className="flex justify-end gap-2">
          <Button onClick={handleCheckTextarea}>입력값 보기</Button>
          <Button as="a" href="https://www.naver.com" variant="success">
            링크
          </Button>
        </div>
      </form>
    </main>
  );
};

export default App;
