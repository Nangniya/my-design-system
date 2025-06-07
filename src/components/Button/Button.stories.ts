import type { Meta, StoryObj } from '@storybook/react-vite';

import Button from './Button';

const meta = {
  title: 'DesignSystem/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Button 컴포넌트는 다양한 상태(variant)와 크기(size)를 지원하는 디자인 시스템의 기본 버튼입니다.\n' +
          '- **variant**: danger, warning, success, info 중 하나로 버튼의 색상 테마를 지정합니다.\n' +
          '- **size**: lg, md, sm 중 하나로 버튼의 크기를 지정합니다.\n' +
          '- **children**: 버튼 내부에 표시할 내용을 지정합니다.\n',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['danger', 'warning', 'success', 'info'],
      description: '색상 테마 (danger, warning, success, info)',
    },
    size: {
      control: 'select',
      options: ['lg', 'md', 'sm'],
      description: '버튼의 크기 (lg, md, sm)',
    },
    children: {
      control: 'text',
      description: '버튼 내부에 표시할 내용',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
  args: {
    variant: 'info',
    size: 'md',
    children: 'Button',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Danger: Story = {
  args: { variant: 'danger', children: 'Danger' },
};
export const Warning: Story = {
  args: { variant: 'warning', children: 'Warning' },
};
export const Success: Story = {
  args: { variant: 'success', children: 'Success' },
};
export const Info: Story = {
  args: { variant: 'info', children: 'Info' },
};
export const Disabled: Story = {
  args: { variant: 'info', children: 'Disabled', disabled: true },
};
