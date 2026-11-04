import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, tones, typography, spacing, radius } from '../../theme';
import { MAX_FONT_SCALE } from '../../theme/typography';
import { MetricExplanation } from '../../types/connection';
import { LEVELS } from '../../utils/levels';
import { Icon } from '../common/Icon';

interface Props {
  metric: MetricExplanation;
  index: number;
}

export function MetricDetailCard({ metric, index }: Props) {
  const config = LEVELS[metric.level];
  const tone = tones[config.tone];

  return (
    <View
      style={styles.card}
      accessible
      accessibilityRole="text"
      accessibilityLabel={`${metric.name}: ${metric.spokenValue}. ${metric.description} ${metric.status}.`}
    >
      <View style={styles.number}>
        <Text style={styles.numberText} maxFontSizeMultiplier={MAX_FONT_SCALE}>
          {index + 1}
        </Text>
      </View>

      <View style={styles.copy}>
        <View style={styles.titleRow}>
          <Text style={styles.name} maxFontSizeMultiplier={MAX_FONT_SCALE}>
            {metric.name}
          </Text>
          <Text style={styles.value} maxFontSizeMultiplier={MAX_FONT_SCALE}>
            {metric.value}
          </Text>
        </View>
        <Text style={styles.description} maxFontSizeMultiplier={MAX_FONT_SCALE}>
          {metric.description}
        </Text>
        <View style={styles.statusRow}>
          <Icon name={config.icon} size={14} color={tone.fg} />
          <Text style={[styles.status, { color: tone.fg }]} maxFontSizeMultiplier={MAX_FONT_SCALE}>
            {metric.status}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 13,
  },
  number: {
    width: 32,
    height: 32,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: { ...typography.caption, fontWeight: '800', color: colors.brandBright },
  copy: { flex: 1 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' },
  name: { ...typography.cardTitle, color: colors.text },
  value: { ...typography.valueSmall, color: colors.brandBright },
  description: { ...typography.bodySmall, color: colors.textMuted, marginTop: 7, marginBottom: 9 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  status: { ...typography.caption },
});
