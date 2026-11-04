import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  colors,
  typography,
  spacing,
  radius,
  BORDER_WIDTH,
  BORDER_WIDTH_SELECTED,
} from '../../theme';
import { MAX_FONT_SCALE } from '../../theme/typography';
import { ACTIVITIES } from '../../constants/options';
import { ActivityId } from '../../types/connection';
import { Icon } from '../common/Icon';

interface Props {
  value: ActivityId;
  onChange: (id: ActivityId) => void;
}

export function ActivityPicker({ value, onChange }: Props) {
  return (
    <View style={styles.group} accessibilityRole="radiogroup" accessibilityLabel="Atividade">
      {ACTIVITIES.map((item) => {
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
              styles.pill,
              selected && styles.pillSelected,
              pressed && styles.pressed,
            ]}
          >
            <Icon name={item.icon} color={selected ? colors.brandBright : colors.text} />
            <Text
              style={[styles.label, selected && styles.labelSelected]}
              maxFontSizeMultiplier={MAX_FONT_SCALE}
            >
              {item.label}
            </Text>
            {selected ? (
              <View style={styles.check}>
                <Icon name="check" size={13} color={colors.onBrand} />
              </View>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  group: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 },
  pill: {
    minHeight: 52,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderColor: colors.lineStrong,
    borderWidth: BORDER_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  pillSelected: {
    backgroundColor: colors.brandSoft,
    borderColor: colors.brandBright,
    borderWidth: BORDER_WIDTH_SELECTED,
  },
  pressed: { opacity: 0.85 },
  label: { ...typography.label, color: colors.text },
  labelSelected: { color: colors.brandBright },
  check: {
    width: 20,
    height: 20,
    borderRadius: radius.pill,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
