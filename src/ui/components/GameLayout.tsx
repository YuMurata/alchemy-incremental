import React from 'react';

interface GameLayoutProps {
  children: {
    header: React.ReactNode;
    main: React.ReactNode;
    footer: React.ReactNode;
  };
}

export const GameLayout: React.FC<GameLayoutProps> = ({ children }) => {
  return (
    <div className="game-layout">
      <header className="game-header">{children.header}</header>
      <main className="game-main">{children.main}</main>
      <footer className="game-footer">{children.footer}</footer>
    </div>
  );
};
