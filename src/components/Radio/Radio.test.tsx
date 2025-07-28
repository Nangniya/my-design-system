import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import Radio from './Radio';

describe('Radio 컴포넌트', () => {
  it('기본 렌더링이 올바르게 되는지 확인', () => {
    render(<Radio>라디오 옵션</Radio>);

    const radio = screen.getByRole('radio');
    const label = screen.getByText('라디오 옵션');

    expect(radio).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(radio).not.toBeChecked();
  });

  it('checked, disabled 상태가 올바르게 적용되는지 확인', () => {
    render(
      <Radio checked disabled>
        선택된 비활성화 라디오
      </Radio>
    );

    const radio = screen.getByRole('radio');
    expect(radio).toBeChecked();
    expect(radio).toBeDisabled();
  });

  it('클릭 시 onChange 이벤트가 호출되는지 확인', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();

    render(<Radio onChange={handleChange}>클릭 테스트</Radio>);

    const radio = screen.getByRole('radio');
    await user.click(radio);

    expect(handleChange).toHaveBeenCalledTimes(1);
    // 제어 컴포넌트이므로 checked 상태는 부모에서 관리
    expect(radio).not.toBeChecked();
  });

  it('name과 value가 올바르게 설정되는지 확인', () => {
    render(
      <Radio name="test-group" value="option1">
        옵션 1
      </Radio>
    );

    const radio = screen.getByRole('radio');
    expect(radio).toHaveAttribute('name', 'test-group');
    expect(radio).toHaveAttribute('value', 'option1');
  });

  it('children이 없을 때도 정상적으로 렌더링되는지 확인', () => {
    render(<Radio />);

    const radio = screen.getByRole('radio');
    expect(radio).toBeInTheDocument();
    expect(radio).not.toBeChecked();
  });

  it('제어 컴포넌트로 올바르게 작동하는지 확인', async () => {
    const TestComponent = () => {
      const [checked, setChecked] = useState(false);

      return (
        <Radio checked={checked} onChange={e => setChecked(e.target.checked)}>
          제어 컴포넌트 테스트
        </Radio>
      );
    };

    const user = userEvent.setup();
    render(<TestComponent />);

    const radio = screen.getByRole('radio');
    expect(radio).not.toBeChecked();

    await user.click(radio);
    expect(radio).toBeChecked();
  });
});
