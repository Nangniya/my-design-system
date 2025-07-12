/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextField from './TextField';

describe('TextField', () => {
  it('label, placeholder, value가 정상적으로 렌더링된다', () => {
    render(<TextField label="이름" placeholder="입력" value="홍길동" onChange={() => {}} />);
    expect(screen.getByText('이름')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', '입력');
    expect(screen.getByRole('textbox')).toHaveValue('홍길동');
  });

  it('onChange가 호출된다', async () => {
    const handleChange = vi.fn();
    render(<TextField label="이름" onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'a');
    expect(handleChange).toHaveBeenCalled();
  });

  it('required일 때 * 표시가 보인다', () => {
    render(<TextField label="이름" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('error 메시지가 보이면 에러 스타일이 적용된다', () => {
    render(<TextField label="이름" error="에러!" />);
    expect(screen.getByText('에러!')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('border-danger-50');
  });

  it('textarea로 렌더링할 수 있다', () => {
    render(<TextField as="textarea" label="소개" />);
    expect(screen.getByRole('textbox').tagName).toBe('TEXTAREA');
  });
});
