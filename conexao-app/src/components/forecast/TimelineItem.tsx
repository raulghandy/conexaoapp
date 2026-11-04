import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, tones, typography, spacing, radius, MAX_FONT_SCALE } from '../../theme';
import { ACTIVITY_ICON } from '../../constants/options';
import { ForecastItem } from '../../types/connection';
import { LEVELS } from '../../utils/levels';
import { Icon } from '../common/Icon';

interface Props {
  item: ForecastItem;
  isLast: boolean;
}

export function TimelineItem({ item, isLast }: Props) {
  const config = LEVELS[item.level];
  const tone = tones[config.tone];

  // O leitor de tela lê o item inteiro de uma vez, na ordem certa.
  const label = `${item.time}. ${item.title}. ${config.tagLabel}. ${item.text} ${item.tag}.`;

  return (
    <View style={styles.row} accessible accessibilityRole="text" accessibilityLabel={label}>
      <Text style={styles.time} maxFontSizeMultiplier={MAX_FONT_SCALE}>
        {item.time}
      </Text>

      <View style={styles.markerColumn}>
        {!isLast ? <View style={styles.line} /> : null}
        <View style={[styles.marker, { backgroundColor: tone.marker, borderColor: tone.bg }]}>
          <Icon name={config.icon} size={13} color={colors.onBrand} />
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardTop}>
          <Text style={styles.title} maxFontSizeMultiplier={MAX_FONT_SCALE}>
            {item.title}
          </Text>
          <View style={[styles.chip, { backgroundColor: tone.bg }]}>
            <Icon name={config.icon} size={12} color={tone.fg} />
            <Text style={[styles.chipText, { color: tone.fg }]} maxFontSizeMultiplier={MAX_FONT_SCALE}>
              {config.tagLabel}
            </Text>
          </View>
        </View>

        <Text style={styles.text} maxFontSizeMultiplier={MAX_FONT_SCALE}>
          {item.text}
        </Text>

        <View style={styles.tag}>
          <Icon name={ACTIVITY_ICON[item.activity]} size={16} color={colors.brandBright} />
          <Text style={styles.tagText} maxFontSizeMultiplier={MAX_FONT_SCALE}>
            {item.tag}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: spacing.sm, minHeight: 148 },
  time: {
    ...typography.label,
    fontWeight: '800',
    color: colors.textMuted,
    minWidth: 46,
    paddingTop: 18,
  },
  markerColumn: { width: 21, alignItems: 'center' },
  line: {
    position: 'absolute',
    left: 9.5,
    top: 37,
    bottom: 0,
    width: 2,
    backgroundColor: colors.line,
  },
  marker: {
    width: 21,
    height: 21,
    marginTop: 16,
    borderRadius: radius.pill,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    marginBottom: 11,
    padding: 15,
    borderRadius: 19,
    backgroundColor: colors.surface,
    borderColor: colors.line,
    borderWidth: 1,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  title: { ...typography.cardTitle, color: colors.text, flexShrink: 1 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: radius.pill,
  },
  chipText: { ...typography.caption, fontWeight: '800' },
  text: { ...typography.bodySmall, color: colors.textMuted, marginTop: 7, marginBottom: 10 },
  tag: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: 9,
    borderRadius: radius.sm,
    backgroundColor: colors.surfaceSoft,
  },
  tagText: { ...typography.caption, color: colors.brandBright },
});
