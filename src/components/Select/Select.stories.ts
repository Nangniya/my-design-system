import type { Meta, StoryObj } from '@storybook/react-vite';
import Select from './index';
import type { IOption } from './selectContext';

const meta = {
  title: 'DesignSystem/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Select 컴포넌트는 드롭다운 형태의 선택 컴포넌트로, 사용자가 옵션 목록에서 하나를 선택할 수 있습니다.\n\n' +
          '## 주요 기능\n' +
          '- **옵션 선택**: 사용자가 드롭다운에서 옵션을 선택할 수 있습니다.\n' +
          '- **레이블 지원**: 선택 컴포넌트 위에 레이블을 표시할 수 있습니다.\n' +
          '- **플레이스홀더**: 선택되지 않았을 때 안내 텍스트를 표시합니다.\n' +
          '- **외부 클릭 감지**: 드롭다운 외부를 클릭하면 자동으로 닫힙니다.\n\n' +
          '## 사용법\n' +
          '```tsx\n' +
          'const options = [\n' +
          '  { value: "1", label: "옵션 1" },\n' +
          '  { value: "2", label: "옵션 2" },\n' +
          '];\n\n' +
          '<Select \n' +
          '  options={options}\n' +
          '  placeholder="옵션을 선택해주세요"\n' +
          '  label="선택 항목"\n' +
          '/>\n' +
          '```',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description:
        '선택할 수 있는 옵션들의 배열. 각 옵션은 `value`와 `label` 속성을 가져야 합니다.',
    },
    placeholder: {
      control: 'text',
      description: '선택되지 않았을 때 표시될 텍스트. 기본값은 "선택해 주세요."입니다.',
    },
    label: {
      control: 'text',
      description:
        'Select 컴포넌트 위에 표시될 레이블. 제공하지 않으면 레이블이 표시되지 않습니다.',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions: IOption[] = [
  { value: '1', label: '옵션 1' },
  { value: '2', label: '옵션 2' },
  { value: '3', label: '옵션 3' },
  { value: '4', label: '옵션 4' },
  { value: '5', label: '옵션 5' },
];

/**
 * 기본 Select 컴포넌트
 *
 * 가장 기본적인 형태의 Select 컴포넌트입니다.
 * 옵션 목록과 플레이스홀더만 제공됩니다.
 */
export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: '옵션을 선택해주세요',
  },
};

/**
 * 레이블이 있는 Select 컴포넌트
 *
 * Select 컴포넌트 위에 레이블을 표시하는 예제입니다.
 * 폼에서 사용할 때 유용합니다.
 */
export const WithLabel: Story = {
  args: {
    options: defaultOptions,
    placeholder: '옵션을 선택해주세요',
    label: '선택 항목',
  },
};

/**
 * 커스텀 플레이스홀더를 가진 Select 컴포넌트
 *
 * 커스텀 플레이스홀더 텍스트를 사용하는 예제입니다.
 */
export const CustomPlaceholder: Story = {
  args: {
    options: defaultOptions,
    placeholder: '원하는 옵션을 선택하세요',
    label: '커스텀 플레이스홀더',
  },
};

/**
 * 레이블이 없는 Select 컴포넌트
 *
 * 레이블 없이 사용하는 Select 컴포넌트 예제입니다.
 * 간단한 UI에서 사용할 때 유용합니다.
 */
export const WithoutLabel: Story = {
  args: {
    options: defaultOptions,
    placeholder: '옵션을 선택해주세요',
  },
};
