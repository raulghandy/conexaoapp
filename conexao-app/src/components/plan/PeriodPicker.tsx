import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, typography, spacing, MIN_TOUCH_SIZE } from '../../theme';
import { MAX_FONT_SCALE } from '../../theme/typography';
import { PERIODS } from '../../constants/options';
import { PeriodId } from '../../types/connection';
import { Icon } from '../common/Icon';

interface Props {
  value: PeriodId;
  onChange: (id: PeriodId) => void;
}

export function PeriodPicker({ value, onChange }: Props) {
  return (
    <View style={styles.group} accessibilityRole="radiogroup" accessibilityLabel="Período do dia">
      {PERIODS.map((item) => {
        const selected = item.id === value;
        return (
          <Pressable
            key={item.id}
            onPress={() => onChange(item.id)}
            accessible
            accessibilityRole="radio"
            accessibilityLabel={item.label}
            accessibilityState={{ checked: selected, selected }}
            style={({ pressed }) => [
              styles.option,
              selected && styles.optionSelected,
              pressed && styles.pressed,
            ]}
          >
            {selected ? <Icon name="check" size={14} color={colors.brandBright} /> : null}
            <Text
              style={[styles.label, selected && styles.labelSelected]}
              maxFontSizeMultiplier={MAX_FONT_SCALE}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    gap: 4,
    padding: 4,
    borderRadius: 16,
    backgroundColor: colors.surfaceInset,
    borderWidth: 1,
    borderColor: colors.line,
  },
  option: {
    flex: 1,
    minHeight: MIN_TOUCH_SIZE,
    borderRadius: 13,
    paddingHorizontal: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  optionSelected: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.lineStrong },
  pressed: { opacity: 0.85 },
  label: { ...typography.label, color: colors.textMuted },
  labelSelected: { color: colors.brandBright },
});
