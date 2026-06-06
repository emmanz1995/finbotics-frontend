import { renderHook, act } from '@testing-library/react';
import { useCountDown } from './useCountDown';

describe('useCountDown', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-06-05T00:00:00Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllTimers();
    jest.restoreAllMocks();
  });
  it('should return initial state', () => {
    const { result } = renderHook(() => useCountDown('2026-06-06T00:00:00Z'));

    expect(result.current.time).toBe('');
  });
  it('should return time properly', () => {
    const mockSetMessage = jest.fn();
    const { result } = renderHook(() =>
      useCountDown('2026-06-06T00:00:00Z', mockSetMessage)
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    console.log(result.current.time);
    expect(result.current.time).toBeDefined();
    expect(mockSetMessage).toHaveBeenCalledTimes(0);
  });
  it("should run out of time and return time's up message", () => {
    const mockSetMessage = jest.fn();
    const { result } = renderHook(() =>
      useCountDown('2026-06-05T00:00:00Z', mockSetMessage)
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.time).toBe('00:00:00:00');
    expect(mockSetMessage).toHaveBeenCalledTimes(1);
    expect(mockSetMessage).toHaveBeenCalledWith(
      'Your account connection has just expired please reconnect if you want your account to be linked'
    );
  });
});
