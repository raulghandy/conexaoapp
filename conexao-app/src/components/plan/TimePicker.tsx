import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  colors,
  typography,
  spacing,
  BORDER_WIDTH,
  BORDER_WIDTH_SELECTED,
  MAX_FONT_SCALE,
} from '../../theme';
import { PlanSlot } from '../../types/connection';
import { Icon } from '../common/Icon';

interface Props {
  slots: PlanSlot[];
  value: string | null;
  onChange: (time: string) => void;
}

export function TimePicker({ slots, value, onChange }: Props) {
  return (
    <View style={styles.grid} accessibilityRole="radiogroup" accessibilityLabel="Horários disponíveis">
      {slots.map((slot) => {
        const selected = slot.time === value;
        return (
          <Pressable
            key={slot.time}
            onPress={() => onChange(slot.time)}
            accessible
            accessibilityRole="radio"
            accessibilityLabel={slot.best ? `${slot.time}. Melhor horário` : slot.time}
            accessibilityState={{ checked: selected, selected }}
            style={({ pressed }) => [
              styles.button,
              selected && styles.buttonSelected,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.timeRow}>
              {selected ? <Icon name="check" size={14} color={colors.brandBright} /> : null}
              <Text
                style={[styles.time, selected && styles.timeSelected]}
                maxFontSizeMultiplier={MAX_FONT_SCALE}
              >
                {slot.time}
              </Text>
            </View>
            {slot.best ? (
              <Text style={styles.best} maxFontSizeMultiplier={MAX_FONT_SCALE}>
                Melhor
              </Text>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  button: {
    flexGrow: 1,
    flexBasis: '22%',
    minWidth: 72,
    minHeight: 58,
    borderRadius: 14,
    backgroundColor: colors.surface,
    borderColor: colors.lineStrong,
    borderWidth: BORDER_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  buttonSelected: {
    backgroundColor: colors.brandSoft,
    borderColor: colors.brandBright,
    borderWidth: BORDER_WIDTH_SELECTED,
  },
  pressed: { opacity: 0.85 },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  time: { ...typography.cardTitle, fontWeight: '800', color: colors.text },
  timeSelected: { color: colors.brandBright },
  best: { ...typography.caption, color: colors.brandBright },
});
