# 🦅 IFPI Gavião - Cardápio Digital

> **Atividade Prática de Programação para Dispositivos Móveis (PDM) - IFPI**  
> **Professor:** Iallen Gábio de Sousa Santos

---

## 📱 Sobre o Projeto

O **IFPI Gavião** é um aplicativo de cardápio digital desenvolvido com **React Native**, **Expo (v57)** e **TypeScript** para uma lanchonete fictícia institucional. O projeto foi refatorado para uma implementação simplificada do padrão **MVVM**.

O sufixo **"BT"** no nome original do projeto refere-se ao padrão **"Big Tripe"** — uma referência bem-humorada à implementação inicial, que concentrava responsabilidades em cada tela:

- Acesso a dados e simulação de banco de dados diretamente na tela;
- Regras de negócio e cálculos de apresentação misturados com a interface;
- Gerenciamento direto de estado e controle de loading na própria View;
- Ausência de separação arquitetural e estilização monolítica com `StyleSheet`.

O banco de dados da aplicação é local, mas simula um pequeno atraso assíncrono para entregar os dados, comportando-se como um banco de dados ou API de verdade.

---

## 🏗️ Arquitetura MVVM Simplificada

O código está organizado em camadas com responsabilidades definidas:

- **`src/app`**: rotas do Expo Router. Cada rota encaminha a requisição para a tela correspondente.
- **`src/view`**: telas e componentes visuais do cardápio, categorias e detalhes dos itens.
- **`src/viewmodel`**: ações de navegação e carregamento de dados. Os ViewModels recebem uma ação tipada e executam a operação adequada.
- **`src/model/dataSource`**: camada de acesso aos dados. Os DataSources chamam o banco local simulado e retornam entidades tipadas.
- **`src/model/entities`**: interfaces que representam categorias e itens do cardápio.
- **`src/data/mockDatabase.ts`**: base local usada para simular consultas assíncronas.

### Fluxo de dados

1. A View dispara uma ação (`get-data`, `push-page` ou `back-page`).
2. O ViewModel interpreta a ação e chama o DataSource ou o roteador.
3. O DataSource consulta o banco local simulado.
4. O resultado retorna para a View por meio dos setters de estado fornecidos pela tela.

O tipo `Actions`, em `src/viewmodel/types.ts`, padroniza as mensagens entre View e ViewModel. Cada ação pode transportar o roteador, o identificador do conteúdo e os callbacks de estado necessários para a operação.

Esta é uma refatoração **MVVM simplificada**: os estados React e parte da lógica de apresentação continuam nas Views, enquanto o acesso a dados e as ações de navegação foram retirados do fluxo direto da tela.

## 📝 Histórico da refatoração

As alterações abaixo correspondem aos commits realizados na branch de refatoração:

| Commit    | Alteração                                                                                                                                                                                        |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `5cceb17` | Criou a estrutura inicial do MVVM, separando Views, ViewModels e DataSources; adicionou os DataSources de categorias e itens; moveu componentes reutilizáveis e ajustou as rotas do Expo Router. |
| `c666fee` | Criou o diretório `src/model/services` como ponto de extensão para serviços da camada Model.                                                                                                     |
| `74a8fa4` | Adicionou o sistema de ações tipadas e centralizou nos ViewModels as operações de carregamento, navegação para frente e retorno de tela.                                                         |

### Funcionalidades mantidas

- Exibição das categorias de comidas e bebidas.
- Listagem de produtos filtrada por categoria.
- Tela de detalhes com imagem, descrição, preço, informações nutricionais e controle de quantidade.
- Navegação entre início, categoria e detalhes do item.
- Indicadores de carregamento durante as consultas assíncronas.
- Banco de dados local simulado, sem necessidade de servidor externo.

---

## 🚀 Como Executar o Projeto

1. **Clone o repositório (ou o seu Fork):**

   ```bash
   git clone https://github.com/SEU_USUARIO/IFPIGaviaoBT.git
   cd IFPIGaviaoBT
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento do Expo:**

   ```bash
   npx expo start
   ```

4. **Abra o aplicativo:**
   - No celular físico usando o app **Expo Go** (leitura do QR Code).
   - No emulador Android (`a`) ou simulador iOS (`i`).
   - No navegador (`w`).

---

## 📤 Instruções para Envio da Atividade

1. Faça o **Fork** deste repositório para o seu perfil pessoal no GitHub.
2. Clone o seu fork na sua máquina de desenvolvimento.
3. Crie uma branch para o seu trabalho:
   ```bash
   git checkout -b feature/refactor-mvvm
   ```
4. Realize a refatoração completa para o **MVVM Simplificado**.
5. Faça commits frequentes e bem descritos.
6. Envie suas alterações para o seu GitHub e submeta o link do repositório conforme as orientações do professor no Google Classroom / SIGAA.

---

_IFPI - Campus Piripiri_  
_Tecnologia em Análise e Desenvolvimento de Sistemas (TADS)_
