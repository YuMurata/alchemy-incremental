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
    
    // 合成開始ボタンを押す
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /合成開始/i }));
    });
    
    // 成功状態になることを確認
    // Playing 状態が一瞬でも表示された後に Success になる必要がある
    await new Promise(r => setTimeout(r, 100));
    expect(screen.getByTestId('synthesis-status')).toHaveTextContent('Success');
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
    
    // ボタンをクリック
    const button = screen.getByRole('button', { name: /合成開始/i });
    fireEvent.click(button);
    
    // 即座に Playing 状態になっていることを確認
    expect(screen.getByTestId('suikomi-animation')).toBeInTheDocument();
  });
});
