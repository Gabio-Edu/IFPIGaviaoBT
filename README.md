# 🦅 IFPI Gavião — Cardápio Digital

> Atividade prática de Programação para Dispositivos Móveis (PDM) — IFPI
> **Professor:** Iallen Gábio de Sousa Santos

## Sobre o projeto

O **IFPI Gavião** é um aplicativo de cardápio digital desenvolvido com React Native, Expo SDK 57 e TypeScript. O projeto demonstra a organização **MVVM Simplificado** trabalhada na disciplina de PDM.

O sufixo `BT` no nome do repositório é parte do nome original do projeto, que começou como exemplo do padrão Big Tripe. A aplicação foi refatorada para separar rotas, interface, lógica de tela e acesso aos dados, preservando o visual e o comportamento do cardápio.

## Arquitetura

O fluxo das telas segue:

```text
App (rotas Expo Router)
  ↓
View (interface)
  ↓
ViewModel (estado, ações, parâmetros e navegação)
  ↓
Model (tipos e DataSources)
  ↓
mockDatabase (dados e consultas assíncronas)
```

- **App — `src/app/`:** contém as rotas do Expo Router e o layout global.
- **View — `src/view/`:** contém JSX e estilos. As Views recebem o estado e as ações da ViewModel.
- **ViewModel — `src/viewmodel/`:** cada tela tem um Custom Hook `useTelaViewModel()`. Os hooks controlam estado, carregamento, consulta, parâmetros da rota e navegação, e retornam `[state, actions]`.
- **Model — `src/model/`:** define os tipos `Categoria` e `Produto` e os DataSources usados pelas ViewModels.
- **Dados simulados — `src/data/mockDatabase.ts`:** mantém as categorias e os produtos do cardápio. As consultas são assíncronas e preservam o atraso de 600 ms.

A arquitetura permanece simplificada: não há Repository, Use Case, Infrastructure ou injeção de dependências.

### Estrutura principal

```text
src/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   ├── category/
│   │   └── [id].tsx
│   └── item/
│       └── [id].tsx
├── model/
│   ├── categoria.ts
│   ├── categoria-data-source.ts
│   ├── produto.ts
│   └── produto-data-source.ts
├── view/
│   ├── home-screen.tsx
│   ├── category-screen.tsx
│   └── item-screen.tsx
└── viewmodel/
    ├── use-home-view-model.ts
    ├── use-category-view-model.ts
    └── use-item-view-model.ts
```

## Fluxo do aplicativo

1. **Home:** apresenta as categorias Comidas e Bebidas. Toque em uma categoria para abrir seus produtos.
2. **Category:** apresenta os produtos da categoria. Toque em um produto para abrir seus detalhes.
3. **Item:** apresenta imagem, descrição, preço e informações nutricionais. Os controles alteram a quantidade, que não pode ficar abaixo de 1.

As consultas mostram um indicador de carregamento enquanto aguardam o mock. A tela Category mantém seu estado vazio e a tela Item informa quando um produto não é encontrado.

## Como executar

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/Nilson-Rodrigo/IFPIGaviaoBT.git
cd IFPIGaviaoBT
npm install
```

Inicie o Expo:

```bash
npx expo start
```

Abra o aplicativo com o Expo Go usando o QR Code, pressione `a` para iniciar no emulador Android ou `w` para abrir a versão web.

## Objetivo acadêmico

A refatoração demonstra a separação de responsabilidades do MVVM Simplificado: as rotas encaminham para as Views, as Views apresentam a interface, as ViewModels controlam estado e ações, e o Model concentra os tipos e o acesso aos dados.

---

*IFPI — Campus Piripiri*
*Tecnologia em Análise e Desenvolvimento de Sistemas (TADS)*
