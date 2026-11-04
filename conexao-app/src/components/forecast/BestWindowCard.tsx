import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, typography, spacing, radius } from '../../theme';
import { MAX_FONT_SCALE } from '../../theme/typography';
import { Icon } from '../common/Icon';

interface Props {
  label: string; // "Das 15:00 às 16:30"
  note: string;
}

export function BestWindowCard({ label, note }: Props) {
  return (
    <View
      style={styles.card}
      accessible
      accessibilityRole="summary"
      accessibilityLabel={`Melhor janela: ${label}. ${note}`}
    >
      <View style={styles.iconBox}>
        <Icon name="spark" color={colors.accentBright} />
      </View>
      <View style={styles.texts}>
        <Text style={styles.small} maxFontSizeMultiplier={MAX_FONT_SCALE}>
          Melhor janela
        </Text>
        <Text style={styles.strong} maxFontSizeMultiplier={MAX_FONT_SCALE}>
          {label}
        </Text>
        <Text style={styles.note} maxFontSizeMultiplier={MAX_FONT_SCALE}>
          {note}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.accentSoft,
    borderColor: colors.accentLine,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: { flex: 1, gap: 3 },
  small: { ...typography.caption, fontWeight: '400', color: colors.textMuted },
  strong: { ...typography.cardTitle, color: colors.text },
  note: { ...typography.caption, fontWeight: '400', color: colors.accentText, marginTop: 2 },
});
