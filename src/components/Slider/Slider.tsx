import {
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import { cn } from '@/utils/classNames';

import {
  sliderActiveTrackStyles,
  sliderCaptionStyles,
  sliderHeaderStyles,
  sliderLabelStyles,
  sliderRootStyles,
  sliderThumbButtonStyles,
  sliderThumbStyles,
  sliderTrackStyles,
  sliderTrackWrapStyles,
  sliderValueStyles,
  sliderValuesRowStyles,
} from './Slider.styles';
import type { SliderProps, SliderState, SliderValue } from './types';

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const normalizeBounds = (min: number, max: number) => {
  const safeMin = Number.isFinite(min) ? min : 0;
  const safeMax = Number.isFinite(max) && max > safeMin ? max : safeMin + 100;

  return { max: safeMax, min: safeMin };
};

const roundToStep = (value: number, min: number, step: number) => {
  if (!Number.isFinite(step) || step <= 0) {
    return value;
  }

  const steps = Math.round((value - min) / step);

  return min + steps * step;
};

const getInitialValue = (
  defaultValue: SliderProps['defaultValue'],
  range: boolean,
  min: number,
  max: number,
) => {
  if (range) {
    if (Array.isArray(defaultValue) && defaultValue.length === 2) {
      const start = clamp(defaultValue[0], min, max);
      const end = clamp(defaultValue[1], start, max);

      return [start, end] as [number, number];
    }

    const midpoint = min + (max - min) / 2;

    return [min, roundToStep(midpoint, min, 1)] as [number, number];
  }

  if (typeof defaultValue === 'number') {
    return clamp(defaultValue, min, max);
  }

  return min;
};

const normalizeValue = (
  incomingValue: SliderValue | undefined,
  range: boolean,
  min: number,
  max: number,
): SliderState => {
  if (range) {
    const fallback: [number, number] = [min, min + (max - min) / 2];
    const nextValue =
      Array.isArray(incomingValue) && incomingValue.length === 2
        ? incomingValue
        : fallback;
    const start = clamp(nextValue[0], min, max);
    const end = clamp(nextValue[1], start, max);

    return { max, min, values: [start, end] };
  }

  const nextValue =
    typeof incomingValue === 'number' ? clamp(incomingValue, min, max) : min;

  return { max, min, values: [nextValue] };
};

const getPercentage = (value: number, min: number, max: number) =>
  ((value - min) / (max - min)) * 100;

const defaultFormatValue = (value: number) => value;

const hasContent = (value: ReactNode | undefined) =>
  value !== undefined && value !== null && value !== false && value !== '';

const getClosestThumb = (
  value: number,
  startValue: number,
  endValue: number | undefined,
) => {
  if (endValue === undefined) {
    return 'end';
  }

  return Math.abs(value - startValue) <= Math.abs(value - endValue)
    ? 'start'
    : 'end';
};

export function Slider({
  caption,
  captionClassName,
  className,
  defaultValue,
  disabled = false,
  error,
  formatValue = defaultFormatValue,
  label,
  labelClassName,
  max = 100,
  min = 0,
  onValueChange,
  range = false,
  showMaxLabel = range,
  showMinLabel = true,
  showValueLabel = true,
  size = 'md',
  step = 1,
  thumbClassName,
  trackClassName,
  value,
  valueClassName,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  ...restProps
}: SliderProps) {
  const generatedId = useId();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const startThumbRef = useRef<HTMLButtonElement | null>(null);
  const endThumbRef = useRef<HTMLButtonElement | null>(null);
  const { max: safeMax, min: safeMin } = normalizeBounds(min, max);
  const [internalValue, setInternalValue] = useState<SliderValue>(() =>
    getInitialValue(defaultValue, range, safeMin, safeMax),
  );
  const [draggingThumb, setDraggingThumb] = useState<'start' | 'end' | null>(
    null,
  );

  const currentState = useMemo(
    () => normalizeValue(value ?? internalValue, range, safeMin, safeMax),
    [internalValue, range, safeMax, safeMin, value],
  );

  const [startValue, endValue] = currentState.values;
  const startPercentage = range
    ? getPercentage(startValue, safeMin, safeMax)
    : 0;
  const endPercentage =
    endValue !== undefined
      ? getPercentage(endValue, safeMin, safeMax)
      : getPercentage(startValue, safeMin, safeMax);

  const helperText = error ?? caption;
  const captionId = `${generatedId}-caption`;
  const invalid =
    Boolean(error) ||
    ariaInvalid === true ||
    ariaInvalid === 'true' ||
    ariaInvalid === 'grammar' ||
    ariaInvalid === 'spelling';
  const describedBy =
    [ariaDescribedBy, hasContent(helperText) ? captionId : undefined]
      .filter(Boolean)
      .join(' ') || undefined;
  const showStartValueLabel =
    range && showValueLabel && (!showMinLabel || startValue !== safeMin);
  const showEndValueLabel =
    showValueLabel &&
    (!showMaxLabel || endValue === undefined || endValue !== safeMax);

  const updateValue = useCallback(
    (nextValue: SliderValue) => {
      if (value === undefined) {
        setInternalValue(nextValue);
      }

      onValueChange?.(nextValue);
    },
    [onValueChange, value],
  );

  const getValueFromPointer = useCallback(
    (clientX: number) => {
      const track = trackRef.current;

      if (!track) {
        return safeMin;
      }

      const bounds = track.getBoundingClientRect();
      const ratio = clamp((clientX - bounds.left) / bounds.width, 0, 1);
      const rawValue = safeMin + ratio * (safeMax - safeMin);

      return clamp(roundToStep(rawValue, safeMin, step), safeMin, safeMax);
    },
    [safeMax, safeMin, step],
  );

  const focusThumb = useCallback((thumb: 'start' | 'end') => {
    if (thumb === 'start') {
      startThumbRef.current?.focus();
      return;
    }

    endThumbRef.current?.focus();
  }, []);

  const setThumbValue = useCallback(
    (thumb: 'start' | 'end', nextValue: number) => {
      if (!range || endValue === undefined) {
        updateValue(nextValue);
        return;
      }

      if (thumb === 'start') {
        updateValue([Math.min(nextValue, endValue), endValue]);
        return;
      }

      updateValue([startValue, Math.max(nextValue, startValue)]);
    },
    [endValue, range, startValue, updateValue],
  );

  const handleTrackPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (disabled) {
        return;
      }

      const nextValue = getValueFromPointer(event.clientX);
      const thumb = range
        ? getClosestThumb(nextValue, startValue, endValue)
        : 'end';

      setDraggingThumb(thumb);
      setThumbValue(thumb, nextValue);
      focusThumb(thumb);
    },
    [
      disabled,
      endValue,
      focusThumb,
      getValueFromPointer,
      range,
      setThumbValue,
      startValue,
    ],
  );

  const handleThumbPointerDown = useCallback(
    (thumb: 'start' | 'end') => {
      if (disabled) {
        return;
      }

      setDraggingThumb(thumb);
      focusThumb(thumb);
    },
    [disabled, focusThumb],
  );

  useEffect(() => {
    if (!draggingThumb) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const nextValue = getValueFromPointer(event.clientX);
      setThumbValue(draggingThumb, nextValue);
    };

    const handlePointerUp = () => {
      setDraggingThumb(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [draggingThumb, getValueFromPointer, setThumbValue]);

  const handleThumbKeyDown = useCallback(
    (
      event: KeyboardEvent<HTMLButtonElement>,
      thumb: 'start' | 'end',
      currentValue: number,
    ) => {
      if (disabled) {
        return;
      }

      let nextValue = currentValue;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          nextValue = currentValue + step;
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          nextValue = currentValue - step;
          break;
        case 'Home':
          nextValue = thumb === 'end' && range ? startValue : safeMin;
          break;
        case 'End':
          nextValue =
            thumb === 'start' && range ? (endValue ?? safeMax) : safeMax;
          break;
        default:
          return;
      }

      event.preventDefault();
      setThumbValue(
        thumb,
        clamp(roundToStep(nextValue, safeMin, step), safeMin, safeMax),
      );
    },
    [
      disabled,
      endValue,
      range,
      safeMax,
      safeMin,
      setThumbValue,
      startValue,
      step,
    ],
  );

  const handleStartThumbKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      handleThumbKeyDown(event, 'start', startValue);
    },
    [handleThumbKeyDown, startValue],
  );

  const handleEndThumbKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      handleThumbKeyDown(event, 'end', endValue ?? startValue);
    },
    [endValue, handleThumbKeyDown, startValue],
  );

  const handleStartThumbPointerDown = useCallback(() => {
    handleThumbPointerDown('start');
  }, [handleThumbPointerDown]);

  const handleEndThumbPointerDown = useCallback(() => {
    handleThumbPointerDown('end');
  }, [handleThumbPointerDown]);

  const getValueText = useCallback(
    (nextValue: number) => {
      const formattedValue = formatValue(nextValue);

      return typeof formattedValue === 'string' ||
        typeof formattedValue === 'number'
        ? String(formattedValue)
        : undefined;
    },
    [formatValue],
  );

  const sharedThumbProps = {
    'aria-describedby': describedBy,
    'aria-invalid': invalid || undefined,
    'aria-valuemax': safeMax,
    'aria-valuemin': safeMin,
    disabled,
    type: 'button' as const,
  };

  return (
    <div {...restProps} className={cn(sliderRootStyles(), className)}>
      {hasContent(label) && (
        <div className={cn(sliderHeaderStyles())}>
          <label
            className={cn(
              sliderLabelStyles({ disabled, size }),
              labelClassName,
            )}
            htmlFor={`${generatedId}-thumb-end`}
          >
            {label}
          </label>
        </div>
      )}

      <div className={cn(sliderTrackWrapStyles())}>
        <div
          aria-hidden='true'
          className={cn(sliderTrackStyles({ disabled, size }), trackClassName)}
          onPointerDown={handleTrackPointerDown}
          ref={trackRef}
        >
          <span
            className={cn(sliderActiveTrackStyles({ disabled, size }))}
            style={{
              left: `${startPercentage}%`,
              width: `${endPercentage - startPercentage}%`,
            }}
          />
        </div>

        {range && (
          <button
            {...sharedThumbProps}
            aria-label={ariaLabel ?? `${label ?? 'Slider'} minimum value`}
            aria-valuetext={getValueText(startValue)}
            aria-valuenow={startValue}
            className={cn(
              sliderThumbButtonStyles({
                active: draggingThumb === 'start',
                size,
              }),
              sliderThumbStyles({ disabled, size }),
              thumbClassName,
            )}
            id={`${generatedId}-thumb-start`}
            onKeyDown={handleStartThumbKeyDown}
            onPointerDown={handleStartThumbPointerDown}
            ref={startThumbRef}
            role='slider'
            style={{ left: `${startPercentage}%` }}
            tabIndex={0}
          />
        )}

        <button
          {...sharedThumbProps}
          aria-label={
            ariaLabel ??
            (range
              ? `${label ?? 'Slider'} maximum value`
              : (label?.toString() ?? 'Slider value'))
          }
          aria-valuetext={getValueText(endValue ?? startValue)}
          aria-valuenow={endValue ?? startValue}
          className={cn(
            sliderThumbButtonStyles({
              active: draggingThumb === 'end' || !range,
              size,
            }),
            sliderThumbStyles({ disabled, size }),
            thumbClassName,
          )}
          id={`${generatedId}-thumb-end`}
          onKeyDown={handleEndThumbKeyDown}
          onPointerDown={handleEndThumbPointerDown}
          ref={endThumbRef}
          role='slider'
          style={{ left: `${endPercentage}%` }}
          tabIndex={0}
        />
      </div>

      {(showMinLabel ||
        showStartValueLabel ||
        showEndValueLabel ||
        showMaxLabel) && (
        <div className={cn(sliderValuesRowStyles())}>
          {showMinLabel && (
            <span
              className={cn(
                sliderValueStyles({ anchor: 'start', disabled, size }),
                valueClassName,
              )}
            >
              {formatValue(safeMin)}
            </span>
          )}

          {showStartValueLabel && (
            <span
              className={cn(
                sliderValueStyles({ disabled, size }),
                valueClassName,
              )}
              style={{ left: `${startPercentage}%` }}
            >
              {formatValue(startValue)}
            </span>
          )}

          {showEndValueLabel && (
            <span
              className={cn(
                sliderValueStyles({ disabled, size }),
                valueClassName,
              )}
              style={{ left: `${endPercentage}%` }}
            >
              {formatValue(endValue ?? startValue)}
            </span>
          )}

          {showMaxLabel && (
            <span
              className={cn(
                sliderValueStyles({ anchor: 'end', disabled, size }),
                valueClassName,
              )}
            >
              {formatValue(safeMax)}
            </span>
          )}
        </div>
      )}

      {hasContent(helperText) && (
        <p
          className={cn(
            sliderCaptionStyles({ disabled, invalid, size }),
            captionClassName,
          )}
          id={captionId}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
