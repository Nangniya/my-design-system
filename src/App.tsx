import React from 'react';
import Button from './components/Button';

const variants = ['danger', 'warning', 'success', 'info'] as const;
const sizes = ['lg', 'md', 'sm'] as const;

const variantLabels = {
  danger: 'Danger',
  warning: 'Warning',
  success: 'Success',
  info: 'Info',
};

const sizeLabels = {
  lg: 'Large',
  md: 'Medium',
  sm: 'Small',
};

const App = () => {
  return (
    <main className="p-8">
      {/* 헤더 */}
      <div className="grid grid-cols-[120px_repeat(4,1fr)] w-full items-center h-10">
        <div />
        {variants.map(variant => (
          <div key={variant} className="text-2xl font-bold text-center">
            {variantLabels[variant]}
          </div>
        ))}
      </div>
      {/* 버튼 영역 */}
      <div className="grid grid-cols-[120px_repeat(4,1fr)] w-full gap-y-4">
        {sizes.map(size => (
          <React.Fragment key={size}>
            <div className="font-bold text-right flex items-center justify-end p-4">
              {sizeLabels[size]}
            </div>
            {variants.map(variant => (
              <div key={variant} className="flex justify-center items-center w-full py-4">
                <Button variant={variant} size={size}>
                  {variantLabels[variant]} {sizeLabels[size]}
                </Button>
              </div>
            ))}
          </React.Fragment>
        ))}
        {/* Disabled row */}
        <div className="font-bold text-right flex items-center justify-end px-2 py-2">Disabled</div>
        {variants.map(variant => (
          <div key={variant} className="flex justify-center items-center py-2">
            <Button variant={variant} disabled>
              {variantLabels[variant]} Disabled
            </Button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default App;
