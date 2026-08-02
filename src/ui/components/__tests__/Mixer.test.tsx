import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
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

  it('合成開始時に吸い込み演出がトリガーされること', async () => {
    render(
      <GameProvider>
        <Mixer />
      </GameProvider>
    );
    // act でクリックをラップして状態更新を同期させる
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /合成開始/i }));
    });
    expect(screen.getByTestId('suikomi-animation')).toBeInTheDocument();
  });
});
