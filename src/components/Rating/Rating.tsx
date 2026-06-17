import {
  type ChangeEvent,
  type FC,
  type KeyboardEvent,
  useCallback,
  useId,
  useState,
} from 'react';

import { cn } from '@/utils';

import {
  ratingEmptyIconStyles,
  ratingFilledIconStyles,
  ratingFillLayerStyles,
  ratingIconCanvasStyles,
  ratingInputStyles,
  ratingOptionLabelStyles,
  ratingRootStyles,
  ratingStarIconStyles,
  ratingStarStyles,
} from './Rating.styles';
import type { RatingPrecision, RatingProps } from './types';

const STAR_PATH =
  'M12 3.15L14.72 8.66L20.8 9.54L16.4 13.83L17.44 19.88L12 17.02L6.56 19.88L7.6 13.83L3.2 9.54L9.28 8.66L12 3.15Z';

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const roundToPrecision = (value: number, precision: RatingPrecision) =>
  Math.round(value / precision) * precision;

const getStarFill = (value: number, index: number) =>
  clamp(value - index, 0, 1) * 100;

const defaultGetLabelText = (value: number, max: number) =>
  `${value} out of ${max}`;

interface RatingIconProps {
  filled?: boolean;
}

const RatingIcon: FC<RatingIconProps> = ({ filled = false }) => (
  <svg
    aria-hidden='true'
    className={cn(ratingStarIconStyles())}
    data-rating-icon={filled ? 'filled' : 'empty'}
    focusable='false'
    viewBox='0 0 24 24'
  >
    <path
      d={STAR_PATH}
      fill={filled ? 'var(--text-color-primary)' : 'none'}
      stroke={filled ? 'var(--text-color-primary)' : 'var(--neutral-500)'}
      strokeLinejoin='round'
      strokeWidth='1.75'
    />
  </svg>
);

interface RatingOptionProps {
  checked: boolean;
  disabled: boolean;
  groupName: string;
  id: string;
  interactive: boolean;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onHover: (value: number) => void;
  part: 'half' | 'full' | 'whole';
  value: number;
}

const RatingOption: FC<RatingOptionProps> = ({
  checked,
  disabled,
  groupName,
  id,
  interactive,
  label,
  onChange,
  onHover,
  part,
  value,
}) => {
  const handleMouseEnter = useCallback(() => {
    if (interactive) {
      onHover(value);
    }
  }, [interactive, onHover, value]);

  return (
    <>
      <input
        aria-label={label}
        checked={checked}
        className={cn(ratingInputStyles())}
        disabled={disabled}
        id={id}
        name={groupName}
        onChange={onChange}
        type='radio'
        value={value}
      />
      <label
        className={cn(ratingOptionLabelStyles({ interactive, part }))}
        htmlFor={id}
        onMouseEnter={handleMouseEnter}
        title={label}
      >
        <span className='sr-only'>{label}</span>
      </label>
    </>
  );
};

interface RatingStarProps {
  disabled: boolean;
  displayValue: number;
  getLabelText: (value: number, max: number) => string;
  groupName: string;
  index: number;
  interactive: boolean;
  max: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onHover: (value: number) => void;
  precision: RatingPrecision;
  selectedValue: number;
  size: RatingProps['size'];
}

const RatingStar: FC<RatingStarProps> = ({
  disabled,
  displayValue,
  getLabelText,
  groupName,
  index,
  interactive,
  max,
  onChange,
  onHover,
  precision,
  selectedValue,
  size,
}) => {
  const starValue = index + 1;
  const halfValue = starValue - 0.5;
  const fillPercentage = getStarFill(displayValue, index);
  const shouldShowEmpty = fillPercentage < 100;
  const shouldShowFilled = fillPercentage > 0;
  const fillAmount = fillPercentage === 50 ? 'half' : 'full';

  return (
    <span className={cn(ratingStarStyles({ size }))}>
      <span className={cn(ratingIconCanvasStyles({ size }))}>
        {shouldShowEmpty && (
          <span className={cn(ratingEmptyIconStyles())}>
            <RatingIcon />
          </span>
        )}
        {shouldShowFilled && (
          <span className={cn(ratingFillLayerStyles({ amount: fillAmount }))}>
            <span
              className={cn(
                ratingIconCanvasStyles({ size }),
                ratingFilledIconStyles(),
              )}
            >
              <RatingIcon filled />
            </span>
          </span>
        )}
      </span>

      {precision === 0.5 && (
        <RatingOption
          checked={selectedValue === halfValue}
          disabled={disabled}
          groupName={groupName}
          id={`${groupName}-${halfValue}`}
          interactive={interactive}
          label={getLabelText(halfValue, max)}
          onChange={onChange}
          onHover={onHover}
          part='half'
          value={halfValue}
        />
      )}
      <RatingOption
        checked={selectedValue === starValue}
        disabled={disabled}
        groupName={groupName}
        id={`${groupName}-${starValue}`}
        interactive={interactive}
        label={getLabelText(starValue, max)}
        onChange={onChange}
        onHover={onHover}
        part={precision === 0.5 ? 'full' : 'whole'}
        value={starValue}
      />
    </span>
  );
};

export const Rating: FC<RatingProps> = ({
  ref,
  className,
  defaultValue = 0,
  disabled = false,
  getLabelText = defaultGetLabelText,
  max = 5,
  name,
  onValueChange,
  precision = 1,
  readOnly = false,
  size = 'md',
  value,
  'aria-label': ariaLabel,
  ...restProps
}) => {
  const generatedId = useId();
  const groupName = name ?? `rating-${generatedId}`;
  const safeMax = Math.max(1, Math.floor(max));
  const isControlled = value !== undefined;
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState(() =>
    clamp(roundToPrecision(defaultValue, precision), 0, safeMax),
  );
  const selectedValue = clamp(
    roundToPrecision(value ?? uncontrolledValue, precision),
    0,
    safeMax,
  );
  const displayValue = hoverValue ?? selectedValue;
  const interactive = !disabled && !readOnly;

  const setRating = useCallback(
    (nextValue: number) => {
      if (!interactive) {
        return;
      }

      const normalizedValue = clamp(
        roundToPrecision(nextValue, precision),
        0,
        safeMax,
      );

      if (!isControlled) {
        setUncontrolledValue(normalizedValue);
      }

      onValueChange?.(normalizedValue);
    },
    [interactive, isControlled, onValueChange, precision, safeMax],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setRating(Number(event.currentTarget.value));
    },
    [setRating],
  );

  const handleHover = useCallback(
    (nextValue: number) => {
      if (interactive) {
        setHoverValue(nextValue);
      }
    },
    [interactive],
  );

  const handleMouseLeave = useCallback(() => {
    setHoverValue(null);
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!interactive) {
        return;
      }

      if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
        event.preventDefault();
        setRating(selectedValue + precision);
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
        event.preventDefault();
        setRating(selectedValue - precision);
      }

      if (event.key === 'Home') {
        event.preventDefault();
        setRating(0);
      }

      if (event.key === 'End') {
        event.preventDefault();
        setRating(safeMax);
      }
    },
    [interactive, precision, safeMax, selectedValue, setRating],
  );

  return (
    <div
      {...restProps}
      ref={ref}
      aria-label={ariaLabel ?? getLabelText(selectedValue, safeMax)}
      className={cn(ratingRootStyles({ disabled, readOnly }), className)}
      onKeyDown={handleKeyDown}
      onMouseLeave={handleMouseLeave}
      role='radiogroup'
      tabIndex={interactive ? 0 : undefined}
    >
      {Array.from({ length: safeMax }, (_, index) => (
        <RatingStar
          key={index}
          disabled={disabled}
          displayValue={displayValue}
          getLabelText={getLabelText}
          groupName={groupName}
          index={index}
          interactive={interactive}
          max={safeMax}
          onChange={handleChange}
          onHover={handleHover}
          precision={precision}
          selectedValue={selectedValue}
          size={size}
        />
      ))}
    </div>
  );
};
