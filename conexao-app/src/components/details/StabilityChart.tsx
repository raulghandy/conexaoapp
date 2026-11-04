import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, tones, typography, spacing, radius, MAX_FONT_SCALE } from '../../theme';
import { StabilityReport } from '../../types/connection';
import { LEVELS } from '../../utils/levels';
import { Icon } from '../common/Icon';

// Barras abaixo desse valor são pintadas de âmbar ("com oscilação").
const OSCILLATION_LIMIT = 70;

export function StabilityChart({ report }: { report: StabilityReport }) {
  const config = LEVELS[report.level];
  const tone = tones[config.tone];

  // Descrição em texto: o gráfico não pode depender só da visão.
  const first = report.bars[0];
  const last = report.bars[report.bars.length - 1];
  const lowest = Math.min(...report.bars);
  const chartDescription =
    `Gráfico da estabilidade prevista para as próximas horas. ` +
    `Começou em ${first}%, terminou em ${last}% e o menor valor foi ${lowest}%.`;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View
          style={styles.headerText}
          accessible
          accessibilityRole="text"
          accessibilityLabel={`Estabilidade prevista: ${report.percent}% estável`}
        >
          <Text style={styles.caption} maxFontSizeMultiplier={MAX_FONT_SCALE}>
            Estabilidade prevista
          </Text>
          <Text style={styles.percent} maxFontSizeMultiplier={MAX_FONT_SCALE}>
            {report.percent}% estável
          </Text>
        </View>

        <View style={[styles.pill, { backgroundColor: tone.bg }]} accessible accessibilityLabel={report.label}>
          <Icon name={config.icon} size={14} color={tone.fg} />
          <Text style={[styles.pillText, { color: tone.fg }]} maxFontSizeMultiplier={MAX_FONT_SCALE}>
            {report.label}
          </Text>
        </View>
      </View>

      <View style={styles.chart} accessible accessibilityRole="image" accessibilityLabel={chartDescription}>
        {report.bars.map((value, index) => (
          <View
            key={index}
            style={[
              styles.bar,
              {
                height: `${value}%`,
                backgroundColor: value < OSCILLATION_LIMIT ? colors.accent : colors.brandChart,
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.axis} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
        {report.axis.map((label) => (
          <Text key={label} style={styles.axisText} maxFontSizeMultiplier={MAX_FONT_SCALE}>
            {label}
          </Text>
        ))}
      </View>

      {/* Legenda em texto: a cor das barras nunca é a única pista */}
      <View style={styles.legend} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
        <View style={styles.legendItem}>
          <View style={[styles.swatch, { backgroundColor: colors.brandChart }]} />
          <Text style={styles.axisText} maxFontSizeMultiplier={MAX_FONT_SCALE}>
            Estável
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.swatch, { backgroundColor: colors.accent }]} />
          <Text style={styles.axisText} maxFontSizeMultiplier={MAX_FONT_SCALE}>
            Com oscilação
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
    borderRadius: 24,
    padding: 19,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 },
  headerText: { flex: 1 },
  caption: { ...typography.caption, fontWeight: '400', color: colors.textMuted, marginBottom: 5 },
  percent: { ...typography.valueSmall, fontSize: 22, color: colors.text },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 7,
    paddingHorizontal: 9,
    borderRadius: radius.pill,
  },
  pillText: { ...typography.caption, fontWeight: '800' },
  chart: {
    height: 110,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 6,
    marginTop: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.lineStrong,
  },
  bar: {
    flex: 1,
    minHeight: 12,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  axis: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
  axisText: { ...typography.caption, fontWeight: '400', color: colors.textMuted },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.lg, marginTop: spacing.md },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  swatch: { width: 12, height: 12, borderRadius: 3 },
});
