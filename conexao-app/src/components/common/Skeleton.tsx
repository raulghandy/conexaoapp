import React from 'react';
import { DimensionValue, View } from 'react-native';
import { colors, radius } from '../../theme';

interface Props {
  height: number;
  width?: DimensionValue;
  borderRadius?: number;
}

// Bloco cinza mostrado enquanto os dados carregam.
// É só decorativo: quem avisa "carregando" ao leitor de tela é o container.
export function Skeleton({ height, width = '100%', borderRadius = radius.lg }: Props) {
  return (
    <View
      importantForAccessibility="no-hide-descendants"
      accessibilityElementsHidden
      style={{ height, width, borderRadius, backgroundColor: colors.skeleton }}
    />
  );
}
