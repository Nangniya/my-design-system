import Radio from './Radio';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'DesignSystem/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Radio 컴포넌트는 단일 선택 옵션을 제공하는 디자인 시스템의 기본 라디오 버튼입니다.\n' +
          '- **checked**: 선택 여부\n' +
          '- **disabled**: 비활성화 여부\n' +
          '- **children**: 라벨 텍스트\n',
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: '선택 여부',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    children: {
      control: 'text',
      description: '라벨 텍스트',
    },
  },
  args: {
    checked: false,
    disabled: false,
    children: '라디오버튼',
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { checked: false, children: '라디오버튼' },
};

export const Checked: Story = {
  args: { checked: true, children: '선택됨' },
};

export const Disabled: Story = {
  args: { checked: false, disabled: true, children: '비활성화' },
};

export const CheckedDisabled: Story = {
  args: { checked: true, disabled: true, children: '선택+비활성화' },
};
