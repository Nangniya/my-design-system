import type { Meta, StoryObj } from '@storybook/react-vite';
import TextField from './TextField';
import { useRef, useState } from 'react';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'TextField 컴포넌트는 다양한 상태와 폴리모픽(as) 렌더링을 지원하는 디자인 시스템의 입력 필드입니다.\n' +
          '- **label**: 입력 필드의 레이블을 지정합니다.\n' +
          '- **helperText**: 입력 필드 하단에 표시되는 도움말 텍스트입니다.\n' +
          '- **error**: 에러 메시지를 표시하며, 에러 상태 스타일이 적용됩니다.\n' +
          '- **required**: 필수 입력 여부를 지정합니다.\n' +
          '- **as**: input, textarea 등 다양한 엘리먼트로 렌더링할 수 있습니다.\n',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: '입력 필드의 레이블(필수)',
    },
    helperText: {
      control: 'text',
      description: '입력 필드 하단에 표시되는 도움말 텍스트',
    },
    error: {
      control: 'text',
      description: '에러 메시지(있으면 에러 스타일 및 메시지 표시)',
    },
    required: {
      control: 'boolean',
      description: '필수 입력 여부',
    },
    as: {
      control: 'text',
      description: '렌더링할 엘리먼트 타입(기본값: input)',
    },
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
  },
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
    required: false,
    helperText: '',
    error: '',
    as: 'input',
  },
};
export default meta;

type Story = StoryObj<typeof TextField>;

export const Basic: Story = {
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
  },
};

export const Required: Story = {
  args: {
    label: '이메일',
    required: true,
    placeholder: '이메일을 입력하세요',
  },
};

export const ErrorState: Story = {
  args: {
    label: '비밀번호',
    error: '비밀번호가 올바르지 않습니다.',
    placeholder: '비밀번호를 입력하세요',
  },
};

export const HelperText: Story = {
  args: {
    label: '닉네임',
    helperText: '2~10자 이내로 입력하세요.',
    placeholder: '닉네임을 입력하세요',
  },
};

export const Textarea: Story = {
  args: {
    as: 'textarea',
    label: '소개',
    placeholder: '자기소개를 입력하세요',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <TextField
        label="제어 컴포넌트"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        placeholder="입력해보세요"
      />
    );
  },
};

export const Uncontrolled: Story = {
  render: () => {
    const ref = useRef<HTMLInputElement>(null);
    return <TextField ref={ref} label="비제어 컴포넌트" placeholder="ref로 접근" />;
  },
};
