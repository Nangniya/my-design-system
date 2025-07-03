import { useState, useRef } from 'react';
import downChevron from '../../assets/down-chevron.svg';
import useClickOutside from '../../utils/useClickOutside';

interface IOption {
  value: string;
  label: string;
}

const options = [
  { value: '1', label: '선택 1' },
  { value: '2', label: '선택 2' },
  { value: '3', label: '선택 3' },
];

const Select = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<IOption | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, () => setOpen(false));
  const handleOpen = () => setOpen(prev => !prev);
  const handleSelect = (option: IOption) => {
    setSelected(option);
    setOpen(false);
  };
  return (
    <section className="flex flex-col gap-2 w-full">
      <label htmlFor="select" className="font-bold">
        레이블
      </label>
      <div ref={wrapperRef} id="select" className="relative w-full">
        <button
          id="select"
          type="button"
          className={`
            text-left border rounded-md px-4 py-2 bg-white w-full
            border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-50
            flex items-center justify-between
            ${open && 'ring-2 ring-primary-50 border-primary-50'}
          `}
          onClick={handleOpen}
        >
          {selected ? (
            <span className="text-gray-100">{selected.label}</span>
          ) : (
            <span className="text-gray-500">선택해 주세요.</span>
          )}
          <img
            src={downChevron}
            alt="down-chevron"
            className={`w-5 h-5 transition-transform duration-300 ${open && 'rotate-180'}`}
          />
        </button>
        {open && (
          <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 p-0.5">
            {options.map(option => (
              <li
                key={option.value}
                className={`px-4 py-2 hover:bg-secondary-5 hover:text-primary-70 rounded-md cursor-pointer ${
                  selected?.value === option.value && 'bg-secondary-10 text-primary-70 font-bold'
                }`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Select;
