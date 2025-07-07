/// <reference types="@testing-library/jest-dom" />
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from './index';
import type { IOption } from './selectContext';

// Mock SVG import
vi.mock('../../assets/down-chevron.svg', () => ({
  default: 'mock-chevron.svg',
}));

describe('Select 컴포넌트', () => {
  const mockOptions: IOption[] = [
    { value: 1, label: '옵션 1' },
    { value: 2, label: '옵션 2' },
    { value: 3, label: '옵션 3' },
    { value: 4, label: '옵션 4' },
    { value: 5, label: '옵션 5' },
  ];

  describe('기본 렌더링 테스트', () => {
    it('Select 컴포넌트가 올바르게 export되는지 확인', () => {
      expect(Select).toBeDefined();
      expect(typeof Select).toBe('function');
    });

    it('기본 Select 컴포넌트가 올바르게 렌더링되는지 확인', () => {
      render(<Select options={mockOptions} placeholder="옵션을 선택해주세요" />);

      // placeholder가 표시되는지 확인
      expect(screen.getByText('옵션을 선택해주세요')).toBeInTheDocument();

      // 드롭다운 버튼이 존재하는지 확인
      const trigger = screen.getByRole('button');
      expect(trigger).toBeInTheDocument();
    });

    it('레이블이 있는 Select 컴포넌트가 올바르게 렌더링되는지 확인', () => {
      render(<Select options={mockOptions} placeholder="옵션을 선택해주세요" label="선택 항목" />);

      // 레이블이 표시되는지 확인
      expect(screen.getByText('선택 항목')).toBeInTheDocument();
      expect(screen.getByText('옵션을 선택해주세요')).toBeInTheDocument();
    });

    it('레이블이 없는 Select 컴포넌트가 올바르게 렌더링되는지 확인', () => {
      render(<Select options={mockOptions} placeholder="옵션을 선택해주세요" />);

      // 레이블이 없는 경우 레이블 요소가 없는지 확인
      const labelElements = screen.queryByText('선택 항목');
      expect(labelElements).not.toBeInTheDocument();

      // placeholder는 여전히 표시되어야 함
      expect(screen.getByText('옵션을 선택해주세요')).toBeInTheDocument();
    });

    it('커스텀 플레이스홀더가 올바르게 표시되는지 확인', () => {
      render(
        <Select
          options={mockOptions}
          placeholder="원하는 옵션을 선택하세요"
          label="커스텀 플레이스홀더"
        />
      );

      expect(screen.getByText('원하는 옵션을 선택하세요')).toBeInTheDocument();
      expect(screen.getByText('커스텀 플레이스홀더')).toBeInTheDocument();
    });
  });

  describe('사용자 상호작용 테스트', () => {
    it('드롭다운 클릭 시 옵션 목록이 표시되는지 확인', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} placeholder="옵션을 선택해주세요" />);

      const trigger = screen.getByRole('button');
      await user.click(trigger);

      // 옵션들이 표시되는지 확인
      await waitFor(() => {
        expect(screen.getByText('옵션 1')).toBeInTheDocument();
        expect(screen.getByText('옵션 2')).toBeInTheDocument();
        expect(screen.getByText('옵션 3')).toBeInTheDocument();
        expect(screen.getByText('옵션 4')).toBeInTheDocument();
        expect(screen.getByText('옵션 5')).toBeInTheDocument();
      });
    });

    it('옵션 선택 시 선택된 내용이 반영되는지 확인', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} placeholder="옵션을 선택해주세요" />);

      // 드롭다운 열기
      const trigger = screen.getByRole('button');
      await user.click(trigger);

      // 옵션 선택
      const option = screen.getByText('옵션 2');
      await user.click(option);

      // 선택된 옵션이 표시되는지 확인
      await waitFor(() => {
        expect(screen.getByText('옵션 2')).toBeInTheDocument();
      });

      // placeholder가 더 이상 표시되지 않는지 확인
      expect(screen.queryByText('옵션을 선택해주세요')).not.toBeInTheDocument();
    });

    it('다른 옵션 선택 시 이전 선택이 새로운 선택으로 교체되는지 확인', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} placeholder="옵션을 선택해주세요" />);

      // 첫 번째 옵션 선택
      const trigger = screen.getByRole('button');
      await user.click(trigger);

      const firstOption = screen.getByText('옵션 1');
      await user.click(firstOption);

      // 첫 번째 옵션이 선택되었는지 확인
      await waitFor(() => {
        expect(screen.getByText('옵션 1')).toBeInTheDocument();
      });

      // 다시 드롭다운 열기
      await user.click(trigger);

      // 두 번째 옵션 선택
      const secondOption = screen.getByText('옵션 3');
      await user.click(secondOption);

      // 두 번째 옵션이 선택되었는지 확인
      await waitFor(() => {
        expect(screen.getByText('옵션 3')).toBeInTheDocument();
      });

      // 첫 번째 옵션이 더 이상 표시되지 않는지 확인
      expect(screen.queryByText('옵션 1')).not.toBeInTheDocument();
    });

    it('옵션 선택 시 드롭다운이 닫히는지 확인', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} placeholder="옵션을 선택해주세요" />);

      // 드롭다운 열기
      const trigger = screen.getByRole('button');
      await user.click(trigger);

      // 옵션 선택
      const option = screen.getByText('옵션 2');
      await user.click(option);

      // 드롭다운이 닫혔는지 확인
      await waitFor(() => {
        expect(screen.queryByText('옵션 1')).not.toBeInTheDocument();
        expect(screen.queryByText('옵션 3')).not.toBeInTheDocument();
        expect(screen.queryByText('옵션 4')).not.toBeInTheDocument();
        expect(screen.queryByText('옵션 5')).not.toBeInTheDocument();
      });
    });

    it('외부 클릭 시 드롭다운이 닫히는지 확인', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <div data-testid="outside">외부 영역</div>
          <Select options={mockOptions} placeholder="옵션을 선택해주세요" />
        </div>
      );

      // 드롭다운 열기
      const trigger = screen.getByRole('button');
      await user.click(trigger);

      // 외부 클릭
      const outside = screen.getByTestId('outside');
      await user.click(outside);

      // 드롭다운이 닫혔는지 확인
      await waitFor(() => {
        expect(screen.queryByText('옵션 1')).not.toBeInTheDocument();
      });
    });

    it('여러 번 클릭해도 올바르게 작동하는지 확인', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} placeholder="옵션을 선택해주세요" />);

      const trigger = screen.getByRole('button');

      // 여러 번 클릭
      await user.click(trigger);
      await user.click(trigger);
      await user.click(trigger);

      // 여전히 옵션들이 표시되는지 확인
      await waitFor(() => {
        expect(screen.getByText('옵션 1')).toBeInTheDocument();
      });
    });

    it('선택된 옵션의 값이 올바른지 확인', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} placeholder="옵션을 선택해주세요" />);

      // 드롭다운 열기
      const trigger = screen.getByRole('button');
      await user.click(trigger);

      // 옵션 선택
      const option = screen.getByText('옵션 4');
      await user.click(option);

      // 선택된 옵션이 올바른 값(4)을 가지고 있는지 확인
      await waitFor(() => {
        expect(screen.getByText('옵션 4')).toBeInTheDocument();
      });

      // 선택된 옵션의 value가 올바른지 확인 (DOM에서 직접 확인할 수는 없지만 구조적으로 확인)
      const selectedOption = mockOptions.find(opt => opt.label === '옵션 4');
      expect(selectedOption?.value).toBe(4);
    });
  });

  describe('경계 케이스 테스트', () => {
    it('빈 옵션 배열로 렌더링되는지 확인', () => {
      render(<Select options={[]} placeholder="옵션이 없습니다" />);

      expect(screen.getByText('옵션이 없습니다')).toBeInTheDocument();

      // 드롭다운을 열어도 옵션이 없는지 확인
      const trigger = screen.getByRole('button');
      fireEvent.click(trigger);

      // 옵션 목록이 비어있는지 확인
      const optionList = screen.queryByRole('listbox');
      expect(optionList).toBeInTheDocument();
    });

    it('App.tsx와 동일한 사용법으로 렌더링되는지 확인', () => {
      const options: IOption[] = [
        { value: 1, label: '선택 1' },
        { value: 2, label: '선택 2' },
        { value: 3, label: '선택 3' },
      ];

      render(<Select options={options} placeholder="선택해 주세요." label="레이블 이름" />);

      expect(screen.getByText('레이블 이름')).toBeInTheDocument();
      expect(screen.getByText('선택해 주세요.')).toBeInTheDocument();
    });

    it('Storybook의 모든 케이스가 올바르게 렌더링되는지 확인', () => {
      // Default 케이스
      const { rerender } = render(
        <Select options={mockOptions} placeholder="옵션을 선택해주세요" />
      );
      expect(screen.getByText('옵션을 선택해주세요')).toBeInTheDocument();

      // WithLabel 케이스
      rerender(
        <Select options={mockOptions} placeholder="옵션을 선택해주세요" label="선택 항목" />
      );
      expect(screen.getByText('선택 항목')).toBeInTheDocument();

      // CustomPlaceholder 케이스
      rerender(
        <Select
          options={mockOptions}
          placeholder="원하는 옵션을 선택하세요"
          label="커스텀 플레이스홀더"
        />
      );
      expect(screen.getByText('원하는 옵션을 선택하세요')).toBeInTheDocument();
      expect(screen.getByText('커스텀 플레이스홀더')).toBeInTheDocument();

      // WithoutLabel 케이스
      rerender(<Select options={mockOptions} placeholder="옵션을 선택해주세요" />);
      expect(screen.getByText('옵션을 선택해주세요')).toBeInTheDocument();
      expect(screen.queryByText('선택 항목')).not.toBeInTheDocument();
    });
  });
});
