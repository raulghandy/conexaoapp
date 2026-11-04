import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, MIN_TOUCH_SIZE } from '../theme';
import { Icon, IconName } from '../components/common/Icon';
import { useReduceMotion } from '../hooks/useReduceMotion';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import PlanScreen from '../screens/PlanScreen';
import ForecastScreen from '../screens/ForecastScreen';
import { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

// Tema escuro do React Navigation com as cores do app.
const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.brandBright,
    background: colors.background,
    card: colors.navBar,
    text: colors.text,
    border: colors.line,
    notification: colors.danger,
  },
};

// Cria o ícone da aba (o ícone é decorativo, o texto da aba descreve).
const tabIcon =
  (name: IconName) =>
  ({ color }: { color: string }) => <Icon name={name} size={22} color={color} />;

export default function AppNavigator() {
  // Se o usuário pediu "reduzir movimento" no celular, tira a animação entre abas.
  const reduceMotion = useReduceMotion();
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false, // cada tela já tem o próprio título
          animation: reduceMotion ? 'none' : 'fade',
          tabBarHideOnKeyboard: true,
          // aba ativa: fundo preenchido + cor (não depende só da cor)
          tabBarActiveTintColor: colors.onBrand,
          tabBarActiveBackgroundColor: colors.brand,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarStyle: {
            backgroundColor: colors.navBar,
            borderTopColor: colors.lineStrong,
            height: 68 + insets.bottom,
            paddingTop: 6,
            paddingBottom: insets.bottom + 6,
          },
          tabBarItemStyle: {
            minHeight: MIN_TOUCH_SIZE,
            borderRadius: 14,
            marginHorizontal: 4,
            marginVertical: 0,
          },
          tabBarLabelStyle: { fontSize: 12, fontWeight: '700' },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Agora',
            tabBarAccessibilityLabel: 'Conexão agora',
            tabBarIcon: tabIcon('home'),
          }}
        />
        <Tab.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: 'Detalhes',
            tabBarAccessibilityLabel: 'Detalhes da conexão',
            tabBarIcon: tabIcon('activity'),
          }}
        />
        <Tab.Screen
          name="Plan"
          component={PlanScreen}
          options={{
            title: 'Planejar',
            tabBarAccessibilityLabel: 'Planejar uma atividade',
            tabBarIcon: tabIcon('calendar'),
          }}
        />
        <Tab.Screen
          name="Forecast"
          component={ForecastScreen}
          options={{
            title: 'Previsão',
            tabBarAccessibilityLabel: 'Previsão das próximas horas',
            tabBarIcon: tabIcon('cloud'),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
