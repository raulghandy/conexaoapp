# Conexão App

App em React Native + Expo (TypeScript) que mostra a previsão da qualidade da conexão de internet,
explica as medições em linguagem simples, ajuda a planejar atividades e mostra as próximas horas.
O design segue o protótipo do Figma. Os dados vêm da API do professor (pasta `api`, Java/Spring Boot).

## Como rodar (um clique)

- **Windows:** dê duplo clique em `instalar.bat` (só na primeira vez). Ele baixa o que faltar (Node.js, Java 17
  e Maven) para a pasta `.tools` deste projeto, sem precisar de administrador, e já abre o app.
  Nas próximas vezes, use `iniciar.bat`.
- **Mac/Linux:** `bash instalar.sh` na primeira vez (usa Homebrew ou apt) e depois `bash iniciar.sh`.

Eles ligam a API (`http://localhost:8080`), esperam ela ficar pronta e abrem o app no navegador.
A primeira vez demora alguns minutos (downloads). Para parar, feche as janelas. Precisa de internet na primeira vez.

**Manual** (com Node.js, JDK 17 e Maven já instalados), em dois terminais:

```bash
cd api && mvn spring-boot:run     # terminal 1: API
npm install && npm start          # terminal 2: app no navegador
```

Outros comandos: `npm run android`, `npm run ios`, `npm run typecheck`.

**No celular (Expo Go):** o celular precisa alcançar a API. Copie `.env.example` para `.env`
e troque `localhost` pelo IP do computador (ex.: `http://192.168.0.10:8080`).

## Telas (4 abas)

| Aba | Arquivo | O que faz |
|---|---|---|
| Agora | `screens/HomeScreen.tsx` | Previsão para este momento, 2 métricas e botão "Atualizar" |
| Detalhes | `screens/DetailsScreen.tsx` | Gráfico de estabilidade e explicação de cada métrica |
| Planejar | `screens/PlanScreen.tsx` | Escolhe atividade, período e horário; a API diz se é adequado |
| Previsão | `screens/ForecastScreen.tsx` | Melhor janela e linha do tempo das próximas horas |

## Estrutura

```
App.tsx
api/              API do professor (sem alterações)
src/
├── api/          apiTypes (formato das respostas) e connectionService (chama a API e converte para as telas)
├── components/   pedaços reutilizáveis de tela, por tela (common, home, details, plan, forecast)
├── constants/    listas de atividades e períodos
├── hooks/        useFetch (carrega dados) e useReduceMotion
├── navigation/   AppNavigator (abas) e types
├── screens/      as 4 telas
├── theme/        cores, tipografia e espaçamentos
├── types/        tipos TypeScript dos dados
└── utils/        formatters (datas), levels (níveis da conexão), a11y (anúncios)
```

## Como o código funciona

1. **Dados:** cada tela chama `useFetch(função da API)`. O hook devolve `data`, `loading`, `error` e `reload`.
2. **Telas:** mostram esqueleto enquanto carrega, `ErrorCard` se der erro e o conteúdo quando os dados chegam.
3. **API:** `api/connectionService.ts` chama `/forecasts/nearby`, `/forecasts/probes/{id}/timeline` e
   `/activity/check` e converte as respostas para o formato das telas. O endereço vem de `EXPO_PUBLIC_API_URL`
   (padrão `http://localhost:8080`).
4. **Tema:** todas as cores e tamanhos vêm de `src/theme`, nada fica solto nos componentes.

Limitações dos dados da API: só existem latência (RTT) e perda de pacotes (não há jitter), a qualidade tem
3 níveis (boa, regular, instável) e as previsões são de um dia fixo (20/08/2026), então o app mostra esse dia.

## Acessibilidade

- Contraste WCAG AA conferido (texto ≥ 4,5:1; ícones e bordas de controles ≥ 3:1). O verde de marca só é usado como fundo de botão com texto branco.
- A informação nunca depende só da cor: níveis têm ícone + texto (ex.: "Recomendado", "Atenção").
- `accessibilityRole`, `accessibilityLabel`, `accessibilityHint` e `accessibilityState` nos controles; grupos de escolha usam `radiogroup`/`radio`.
- Áreas de toque de no mínimo 48x48dp; texto mínimo de 12sp (o protótipo usava 8–11px).
- Fontes escaláveis com o sistema (limite de 1,8x para não quebrar o layout).
- Estados de carregamento, erro e fim de lista; leitores de tela são avisados quando os dados chegam.
- Gráfico com descrição em texto e legenda; botão "Atualizar" em vez de depender de gesto.
- Sem atualização automática por timer (WCAG 2.2.2) e animação entre abas desligada em "reduzir movimento".
- Ícones decorativos escondidos do leitor de tela.
