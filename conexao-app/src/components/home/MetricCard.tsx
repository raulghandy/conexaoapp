import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, tones, typography, spacing, radius, MAX_FONT_SCALE } from '../../theme';
import { MetricId, NetworkMetric } from '../../types/connection';
import { LEVELS } from '../../utils/levels';
import { Icon, IconName } from '../common/Icon';

const METRIC_ICON: Record<MetricId, IconName> = {
  rtt: 'clock',
  loss: 'loss',
};

export function MetricCard({ metric }: { metric: NetworkMetric }) {
  const config = LEVELS[metric.level];
  const tone = tones[config.tone];

  return (
    <View
      style={styles.card}
      accessible
      accessibilityRole="text"
      accessibilityLabel={`${metric.name}: ${metric.value} ${metric.spokenUnit}. ${metric.trend}.`}
    >
      <View style={styles.iconBox}>
        <Icon name={METRIC_ICON[metric.id]} color={colors.brandBright} />
      </View>
      <Text style={styles.name} maxFontSizeMultiplier={MAX_FONT_SCALE}>
        {metric.name}
      </Text>
      <Text maxFontSizeMultiplier={MAX_FONT_SCALE}>
        <Text style={styles.value}>{metric.value}</Text>
        <Text style={styles.unit}> {metric.unit}</Text>
      </Text>
      <View style={styles.trendRow}>
        <Icon name={config.icon} size={13} color={tone.fg} />
        <Text style={[styles.trend, { color: tone.fg }]} maxFontSizeMultiplier={MAX_FONT_SCALE}>
          {metric.trend}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexGrow: 1,
    flexBasis: '45%', // 2 cards por linha
    minHeight: 157,
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.brandSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },
  name: { ...typography.bodySmall, color: colors.textMuted, marginBottom: 2 },
  value: { ...typography.value, color: colors.text },
  unit: { ...typography.bodySmall, color: colors.textMuted },
  trendRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  trend: { ...typography.caption, flexShrink: 1 },
});
