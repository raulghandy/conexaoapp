import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, typography, spacing } from '../../theme';
import { MAX_FONT_SCALE } from '../../theme/typography';

interface Props {
  title: string;
  right?: string;
}

export function SectionHeading({ title, right }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.title} accessibilityRole="header" maxFontSizeMultiplier={MAX_FONT_SCALE}>
        {title}
      </Text>
      {right ? (
        <Text style={styles.right} maxFontSizeMultiplier={MAX_FONT_SCALE}>
          {right}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginTop: spacing.xxl,
    marginBottom: spacing.md,
    marginHorizontal: 2,
  },
  title: { ...typography.heading, color: colors.text },
  right: { ...typography.caption, fontWeight: '400', color: colors.textMuted },
});
