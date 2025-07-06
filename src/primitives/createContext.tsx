import React from 'react';

interface ContextProps<T> {
  children?: React.ReactNode;
  value?: T | null;
}

const createContext = <T,>(name: string) => {
  const context = React.createContext<T | null | undefined>(null);

  const Provider = ({ children, value }: ContextProps<T>) => {
    return <context.Provider value={value}>{children}</context.Provider>;
  };

  const useContext = () => {
    const _context = React.useContext(context);

    if (!_context) throw new Error(`${name} context가 없습니다.`);

    return _context;
  };

  return [Provider, useContext] as const;
};

export default createContext;
