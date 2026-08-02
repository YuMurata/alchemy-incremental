import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Mixer from '../Mixer';
import { GameProvider } from '../../hooks/useGameStore';

describe('Mixer Component - Synthesis Logic', () => {
  it('成功時に成功演出フラグが立つこと', async () => {
    render(
      <GameProvider>
        <Mixer />
      </GameProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: /合成開始/i }));
    // 成功演出のフラグが立つか期待
    expect(screen.getByTestId('synthesis-status')).toHaveTextContent('Playing');
  });

  it('失敗時に即座に再試行可能な状態になること', async () => {
    render(
      <GameProvider>
        <Mixer />
      </GameProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: /合成開始/i }));
    expect(screen.getByTestId('retry-button')).toBeInTheDocument();
  });
});
