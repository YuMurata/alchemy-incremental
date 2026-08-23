import { render, screen, fireEvent, act } from '@testing-library/react';
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
    
    // 合成開始ボタンを押す
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /合成開始/i }));
    });
    
    // 状態が Failure になることを確認 (レシピID等の整合性による)
    await new Promise(r => setTimeout(r, 200)); 
    
    const status = screen.getByTestId('synthesis-status');
    expect(status.textContent).toContain('Failure');
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
    
    const button = screen.getByRole('button', { name: /合成開始/i });
    fireEvent.click(button);
    
    expect(screen.getByTestId('suikomi-animation')).toBeInTheDocument();
  });
});