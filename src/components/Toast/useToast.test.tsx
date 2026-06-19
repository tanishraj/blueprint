import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest';
import { toast } from 'sonner';

import type { AlertProps } from '../Alert';
import { useToast } from './useToast';

vi.mock('sonner');

describe('useToast', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls toast.custom with default options when using toast()', () => {
    const { result } = renderHook(() => useToast());

    result.current.toast({ title: 'Test' });

    expect(toast.custom).toHaveBeenCalledOnce();
  });

  it('passes custom duration and position to toast options', () => {
    const { result } = renderHook(() => useToast());

    result.current.toast({
      title: 'Test',
      duration: 5000,
      position: 'top-right',
    });

    expect(toast.custom).toHaveBeenCalledWith(expect.any(Function), {
      duration: 5000,
      position: 'top-right',
    });
  });

  it('uses variant-specific helpers with the current alert variants', () => {
    const { result } = renderHook(() => useToast());

    result.current.success({ title: 'Success' });
    let alertProps = getAlertPropsFromLastCall();
    expect(alertProps.variant).toBe('success');

    result.current.danger({ title: 'Danger' });
    alertProps = getAlertPropsFromLastCall();
    expect(alertProps.variant).toBe('danger');

    result.current.error({ title: 'Error' });
    alertProps = getAlertPropsFromLastCall();
    expect(alertProps.variant).toBe('danger');
  });

  it('handles dismissable toasts correctly', () => {
    const { result } = renderHook(() => useToast());
    const mockId = 'mock-toast-id';
    (toast.custom as Mock).mockReturnValue(mockId);

    result.current.toast({ title: 'Test', dismissable: true });
    let alertProps = getAlertPropsFromLastCall(mockId);
    alertProps.onClose?.();
    expect(toast.dismiss).toHaveBeenCalledWith(mockId);

    result.current.toast({ title: 'Test', dismissable: false });
    alertProps = getAlertPropsFromLastCall();
    expect(alertProps.onClose).toBeUndefined();
  });

  it('dismiss proxies to toast.dismiss', () => {
    const { result } = renderHook(() => useToast());

    result.current.dismiss('test-id');

    expect(toast.dismiss).toHaveBeenCalledWith('test-id');
  });

  function getAlertPropsFromLastCall(id: string = 'mock-id'): AlertProps {
    const [renderFunction] = (toast.custom as Mock).mock.lastCall || [];

    return renderFunction?.(id)?.props || {};
  }
});
