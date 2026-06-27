import {
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useId,
  useMemo,
  useState,
} from 'react';

import { cn } from '@/utils/classNames';

import {
  feedbackEmojiStyles,
  feedbackFaceStyles,
  feedbackInputStyles,
  feedbackLabelStyles,
  feedbackOptionStyles,
  feedbackRootStyles,
} from './Feedback.styles';
import type {
  FeedbackGetLabelText,
  FeedbackOption,
  FeedbackProps,
} from './types';

const DEFAULT_OPTIONS: FeedbackOption[] = [
  { value: 1, label: 'Very dissatisfied', emoji: '😭' },
  { value: 2, label: 'Dissatisfied', emoji: '☹️' },
  { value: 3, label: 'Neutral', emoji: '😐' },
  { value: 4, label: 'Satisfied', emoji: '🙂' },
  { value: 5, label: 'Love it', emoji: '😍' },
];

const clampIndex = (index: number, max: number) =>
  Math.min(Math.max(index, 0), max);

const defaultGetLabelText: FeedbackGetLabelText = (option, index, total) =>
  `${index + 1} of ${total}, ${option.label}`;

const getInitialValue = (
  defaultValue: number | undefined,
  options: FeedbackOption[],
) => {
  if (defaultValue === undefined) {
    return options[0]?.value;
  }

  return options.some(option => option.value === defaultValue)
    ? defaultValue
    : options[0]?.value;
};

interface FaceIconProps {
  mood: FeedbackOption['value'];
  selected: boolean;
  size: NonNullable<FeedbackProps['size']>;
}

function FaceIcon({ mood, selected, size }: FaceIconProps) {
  const stroke = selected ? 'var(--neutral-900)' : 'var(--neutral-500)';
  const fill = selected ? 'var(--primary-600)' : 'none';
  const featureColor = selected ? 'var(--base-white)' : stroke;
  const strokeWidth = mood >= 4 ? 1.75 : 1.6;

  return (
    <svg
      aria-hidden='true'
      className={cn(feedbackFaceStyles({ size }))}
      data-feedback-face={selected ? 'selected' : 'idle'}
      focusable='false'
      viewBox='0 0 24 24'
    >
      <circle
        cx='12'
        cy='12'
        fill={fill}
        r='9'
        stroke={stroke}
        strokeWidth={selected ? 0 : 1.8}
      />

      {mood === 1 && (
        <>
          <circle cx='8.75' cy='9.5' fill={featureColor} r='1.1' />
          <circle cx='15.25' cy='9.5' fill={featureColor} r='1.1' />
          <path
            d='M7.5 16C8.4 14.8 9.95 14 12 14C14.05 14 15.6 14.8 16.5 16'
            fill='none'
            stroke={featureColor}
            strokeLinecap='round'
            strokeWidth={strokeWidth}
          />
          <path
            d='M6.8 12.1C6.8 10.9 7.75 9.95 8.95 9.95C10.15 9.95 11.1 10.9 11.1 12.1C11.1 12.7 10.82 13.22 10.45 13.68L8.95 15.6L7.45 13.68C7.08 13.22 6.8 12.7 6.8 12.1Z'
            fill={featureColor}
          />
        </>
      )}

      {mood === 2 && (
        <>
          <circle cx='8.75' cy='10' fill={featureColor} r='1.1' />
          <circle cx='15.25' cy='10' fill={featureColor} r='1.1' />
          <path
            d='M7.75 16C8.65 14.9 10 14.3 12 14.3C14 14.3 15.35 14.9 16.25 16'
            fill='none'
            stroke={featureColor}
            strokeLinecap='round'
            strokeWidth={strokeWidth}
          />
        </>
      )}

      {mood === 3 && (
        <>
          <circle cx='8.75' cy='10' fill={featureColor} r='1.1' />
          <circle cx='15.25' cy='10' fill={featureColor} r='1.1' />
          <path
            d='M8.5 15.1H15.5'
            fill='none'
            stroke={featureColor}
            strokeLinecap='round'
            strokeWidth={strokeWidth}
          />
        </>
      )}

      {mood === 4 && (
        <>
          <circle cx='8.75' cy='9.75' fill={featureColor} r='1.05' />
          <circle cx='15.25' cy='9.75' fill={featureColor} r='1.05' />
          <path
            d='M8.1 14.2C9 15.4 10.25 16 12 16C13.75 16 15 15.4 15.9 14.2'
            fill='none'
            stroke={featureColor}
            strokeLinecap='round'
            strokeWidth={strokeWidth}
          />
        </>
      )}

      {mood === 5 && (
        <>
          <path
            d='M7.35 8.8C7.35 7.85 8.1 7.1 9 7.1C9.45 7.1 9.88 7.28 10.2 7.6L10.5 7.92L10.8 7.6C11.12 7.28 11.55 7.1 12 7.1C12.9 7.1 13.65 7.85 13.65 8.8C13.65 10.65 11.38 12.12 10.64 12.55C10.55 12.61 10.45 12.61 10.36 12.55C9.62 12.12 7.35 10.65 7.35 8.8Z'
            fill={featureColor}
          />
          <path
            d='M10.35 8.8C10.35 7.85 11.1 7.1 12 7.1C12.45 7.1 12.88 7.28 13.2 7.6L13.5 7.92L13.8 7.6C14.12 7.28 14.55 7.1 15 7.1C15.9 7.1 16.65 7.85 16.65 8.8C16.65 10.65 14.38 12.12 13.64 12.55C13.55 12.61 13.45 12.61 13.36 12.55C12.62 12.12 10.35 10.65 10.35 8.8Z'
            fill={featureColor}
          />
          <path
            d='M8 14.1C9 15.6 10.35 16.35 12 16.35C13.65 16.35 15 15.6 16 14.1'
            fill='none'
            stroke={featureColor}
            strokeLinecap='round'
            strokeWidth={1.9}
          />
        </>
      )}
    </svg>
  );
}

interface FeedbackItemProps {
  checked: boolean;
  disabled: boolean;
  groupName: string;
  label: string;
  interactive: boolean;
  mood: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  option: FeedbackOption;
  size: NonNullable<FeedbackProps['size']>;
  variant: NonNullable<FeedbackProps['variant']>;
}

function FeedbackItem({
  checked,
  disabled,
  groupName,
  label,
  interactive,
  mood,
  onChange,
  option,
  size,
  variant,
}: FeedbackItemProps) {
  const labelId = `${groupName}-${option.value}`;
  const icon: ReactNode =
    variant === 'emoji' ? (
      <span
        aria-hidden='true'
        className={cn(feedbackEmojiStyles({ interactive, size }))}
      >
        {option.emoji}
      </span>
    ) : (
      <FaceIcon mood={mood} selected={checked} size={size} />
    );

  return (
    <span className={cn(feedbackOptionStyles({ size, variant }))}>
      <input
        aria-label={label}
        checked={checked}
        className={cn(feedbackInputStyles())}
        data-feedback-input={option.value}
        disabled={disabled}
        id={labelId}
        name={groupName}
        onChange={onChange}
        type='radio'
        value={option.value}
      />
      <label
        className={cn(
          'group',
          feedbackLabelStyles({
            interactive,
            size,
            variant,
          }),
        )}
        htmlFor={labelId}
        title={label}
      >
        <span className='sr-only'>{label}</span>
        {icon}
      </label>
    </span>
  );
}

export function Feedback({
  ref,
  className,
  defaultValue,
  disabled = false,
  getLabelText = defaultGetLabelText,
  name,
  onValueChange,
  options = DEFAULT_OPTIONS,
  readOnly = false,
  size = 'md',
  value,
  variant = 'face',
  'aria-label': ariaLabel,
  ...restProps
}: FeedbackProps) {
  const generatedId = useId();
  const groupName = name ?? `feedback-${generatedId}`;
  const normalizedOptions = useMemo(
    () => [...options].sort((left, right) => left.value - right.value),
    [options],
  );
  const safeOptions =
    normalizedOptions.length > 0 ? normalizedOptions : DEFAULT_OPTIONS;
  const [uncontrolledValue, setUncontrolledValue] = useState(() =>
    getInitialValue(defaultValue, safeOptions),
  );
  const isControlled = value !== undefined;
  const selectedValue = getInitialValue(
    value ?? uncontrolledValue,
    safeOptions,
  );
  const selectedIndex = safeOptions.findIndex(
    option => option.value === selectedValue,
  );
  const interactive = !disabled && !readOnly;
  const totalOptions = safeOptions.length;

  const updateValue = useCallback(
    (nextValue: number) => {
      if (!interactive) {
        return;
      }

      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }

      onValueChange?.(nextValue);
    },
    [interactive, isControlled, onValueChange],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      updateValue(Number(event.target.value));
    },
    [updateValue],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (!interactive) {
        return;
      }

      const isForward = event.key === 'ArrowRight' || event.key === 'ArrowDown';
      const isBackward = event.key === 'ArrowLeft' || event.key === 'ArrowUp';

      if (!isForward && !isBackward) {
        return;
      }

      event.preventDefault();

      const nextIndex = isForward
        ? clampIndex(selectedIndex + 1, safeOptions.length - 1)
        : clampIndex(selectedIndex - 1, safeOptions.length - 1);
      const nextValue = safeOptions[nextIndex]?.value;

      if (nextValue !== undefined && nextValue !== selectedValue) {
        updateValue(nextValue);
      }
    },
    [interactive, safeOptions, selectedIndex, selectedValue, updateValue],
  );

  return (
    <div
      {...restProps}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel ?? 'Feedback'}
      aria-readonly={readOnly || undefined}
      className={cn(feedbackRootStyles({ disabled, readOnly }), className)}
      onKeyDown={handleKeyDown}
      ref={ref}
      role='radiogroup'
      tabIndex={interactive ? 0 : undefined}
    >
      {safeOptions.map((option, index) => (
        <FeedbackItem
          key={option.value}
          checked={selectedValue === option.value}
          disabled={disabled}
          groupName={groupName}
          label={getLabelText(option, index, totalOptions)}
          interactive={interactive}
          mood={index + 1}
          onChange={handleChange}
          option={option}
          size={size}
          variant={variant}
        />
      ))}
    </div>
  );
}
