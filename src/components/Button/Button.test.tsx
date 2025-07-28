import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('기본 props로 렌더링된다', () => {
    render(<Button>클릭하세요</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('클릭하세요');
  });

  it('variant와 size가 올바르게 적용된다', () => {
    render(
      <Button variant="danger" size="lg">
        버튼
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-danger-5');
    expect(button).toHaveClass('h-12');
  });

  it('onClick이 호출된다', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>클릭</Button>);
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  it('disabled 상태에서 클릭이 차단된다', async () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        비활성화
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('asChild로 다른 엘리먼트로 렌더링된다', () => {
    render(
      <Button asChild>
        <a href="/test">링크</a>
      </Button>
    );
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });
});
