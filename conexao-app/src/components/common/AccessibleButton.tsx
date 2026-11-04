import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, typography, spacing, radius, MIN_TOUCH_SIZE } from '../../theme';
import { MAX_FONT_SCALE } from '../../theme/typography';
import { Icon, IconName } from './Icon';

interface Props {
  title: string;
  onPress: () => void;
  hint?: string;
  disabled?: boolean;
  variant?: 'primary' | 'outline';
  size?: 'md' | 'lg';
  icon?: IconName;
  iconRight?: IconName;
  /** Título à esquerda e ícone à direita, ocupando toda a largura. */
  spread?: boolean;
}

export function AccessibleButton({
  title,
  onPress,
  hint,
  disabled = false,
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  spread = false,
}: Props) {
  const outline = variant === 'outline';
  const contentColor = outline ? colors.danger : colors.onBrand;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessible
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={hint}
      accessibilityState={{ disabled }}
      style={({ pressed }) => [
        styles.base,
        size === 'lg' && styles.large,
        spread && styles.spread,
        outline
          ? styles.outline
          : [styles.primary, pressed && { backgroundColor: colors.brandPressed }],
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      {icon ? <Icon name={icon} size={outline ? 18 : 20} color={contentColor} /> : null}
      <Text
        style={[styles.text, { color: contentColor }, spread && styles.spreadText]}
        maxFontSizeMultiplier={MAX_FONT_SCALE}
      >
        {title}
      </Text>
      {iconRight ? <Icon name={iconRight} color={contentColor} /> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: MIN_TOUCH_SIZE,
    minWidth: MIN_TOUCH_SIZE,
    borderRadius: radius.md,
    paddingHorizontal: 17,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  large: { minHeight: 54, paddingHorizontal: 18 },
  spread: { alignSelf: 'stretch', justifyContent: 'space-between' },
  primary: { backgroundColor: colors.brand },
  outline: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.danger,
  },
  disabled: { opacity: 0.5 },
  pressed: { opacity: 0.88 },
  text: { ...typography.label, fontWeight: '800' },
  spreadText: { flex: 1 },
});
