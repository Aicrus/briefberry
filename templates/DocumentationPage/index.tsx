"use client";

import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import Modal from "@/components/Modal";

type TopicSection = {
    id: string;
    title: string;
    intro: string;
    bullets: string[];
    code?: {
        label: string;
        language: string;
        content: string;
    };
    image?: {
        src: string;
        alt: string;
        caption: string;
    };
};

type Topic = {
    id: string;
    title: string;
    summary: string;
    tag: string;
    readTime: string;
    sections: TopicSection[];
    research: string[];
};

const BASE_TOPICS: Topic[] = [
    {
        id: "proposta",
        title: "Proposta",
        summary:
            "Estrutura para apresentar escopo, prazo e investimento com leitura simples para qualquer cliente.",
        tag: "Comercial",
        readTime: "6 min",
        sections: [
            {
                id: "visao-geral",
                title: "Visao geral da proposta",
                intro:
                    "A proposta precisa responder tres perguntas: o que sera entregue, em quanto tempo e por qual valor.",
                bullets: [
                    "Comece com objetivo do projeto em uma frase.",
                    "Descreva entregaveis por etapa para facilitar aprovacao.",
                    "Finalize com proximo passo e prazo de resposta.",
                ],
                image: {
                    src: "/images/screen-light-1.png",
                    alt: "Estrutura de documento com secoes",
                    caption:
                        "Exemplo visual de documento organizado por secoes e leitura guiada.",
                },
            },
            {
                id: "modelo-base",
                title: "Modelo base (copiar e adaptar)",
                intro:
                    "Use este modelo inicial para padronizar suas propostas e reduzir retrabalho.",
                bullets: [
                    "Troque apenas os campos entre colchetes.",
                    "Mantenha linguagem direta e orientada a beneficio.",
                    "Evite termos tecnicos sem explicacao.",
                ],
                code: {
                    label: "Template de proposta",
                    language: "markdown",
                    content: `# Proposta - [Nome do projeto]\n\n## Objetivo\n[Descreva o resultado esperado em 1 a 2 frases]\n\n## Escopo\n- [Entregavel 1]\n- [Entregavel 2]\n- [Entregavel 3]\n\n## Prazo\n- Inicio: [data]\n- Entrega final: [data]\n\n## Investimento\n- Valor total: [R$]\n- Condicao: [50/50, por etapa, etc.]\n\n## Proximo passo\n[Aprovacao ate DD/MM e inicio imediato.]`,
                },
            },
        ],
        research: [
            "como montar proposta simples",
            "modelo de proposta comercial",
            "como apresentar escopo e prazo",
        ],
    },
    {
        id: "contrato",
        title: "Contrato",
        summary:
            "Guia de clausulas essenciais para proteger as duas partes e evitar conflitos durante o projeto.",
        tag: "Juridico",
        readTime: "7 min",
        sections: [
            {
                id: "clausulas-essenciais",
                title: "Clausulas essenciais",
                intro:
                    "Um contrato claro reduz discussao de escopo, pagamento e prazo ao longo do projeto.",
                bullets: [
                    "Objeto do contrato com entregaveis claros.",
                    "Regras de pagamento e atraso.",
                    "Regras de revisao, cancelamento e garantia.",
                ],
            },
            {
                id: "texto-base",
                title: "Trecho base de clausulas",
                intro:
                    "Exemplo simples para voce adaptar ao seu contexto e ao seu mercado.",
                bullets: [
                    "Substitua os campos entre colchetes.",
                    "Valide cidade e foro antes da assinatura.",
                    "Registre aceite por escrito.",
                ],
                code: {
                    label: "Trecho contratual",
                    language: "text",
                    content: `CLAUSULA 1 - OBJETO\nA CONTRATADA executara [descricao do servico], conforme escopo acordado.\n\nCLAUSULA 2 - PRAZO\nO servico sera iniciado em [data] e concluido ate [data], salvo alteracoes acordadas por escrito.\n\nCLAUSULA 3 - VALOR E PAGAMENTO\nO valor total e de [valor], pago em [condicao].\n\nCLAUSULA 4 - REVISOES\nSerao incluidas [quantidade] revisoes. Demandas extras poderao gerar aditivo.`,
                },
                image: {
                    src: "/images/brief-pic.jpg",
                    alt: "Documento assinado",
                    caption:
                        "Referencia visual para secoes de contrato e formalizacao de aceite.",
                },
            },
        ],
        research: [
            "clausulas essenciais contrato de servico",
            "como definir revisoes em contrato",
            "como evitar conflito de escopo",
        ],
    },
    {
        id: "prd-tasks",
        title: "PRD + Tasks",
        summary:
            "Area de produto para transformar requisitos em tarefas claras e acompanhar entregas por sprint.",
        tag: "Produto",
        readTime: "8 min",
        sections: [
            {
                id: "estrutura-prd",
                title: "Estrutura de PRD",
                intro:
                    "O PRD traduz objetivo de negocio em requisitos testaveis para produto, design e desenvolvimento.",
                bullets: [
                    "Defina problema, publico e objetivo principal.",
                    "Liste funcionalidades por prioridade (MVP primeiro).",
                    "Descreva criterio de aceite para cada funcionalidade.",
                ],
                code: {
                    label: "Estrutura de PRD",
                    language: "markdown",
                    content: `# PRD - [Nome do produto]\n\n## Objetivo\n[Resultado de negocio esperado]\n\n## Publico alvo\n[Quem usa e em qual contexto]\n\n## Funcionalidades MVP\n1. [Funcionalidade A]\n2. [Funcionalidade B]\n3. [Funcionalidade C]\n\n## Criterios de aceite\n- [Dado X, quando Y, entao Z]\n- [Metrica de sucesso]`,
                },
            },
            {
                id: "quebra-em-tasks",
                title: "Quebra em tasks",
                intro:
                    "Quebre o PRD em tarefas pequenas para facilitar acompanhamento, estimativa e entrega.",
                bullets: [
                    "Uma tarefa = um resultado verificavel.",
                    "Defina dono e prazo para cada item.",
                    "Organize por sprint ou marco de entrega.",
                ],
                code: {
                    label: "Backlog inicial",
                    language: "markdown",
                    content: `## Sprint 01\n- [ ] Setup inicial do projeto\n- [ ] Tela de login\n- [ ] Integracao com API de autenticacao\n- [ ] Validacao de formulario\n\n## Sprint 02\n- [ ] Dashboard inicial\n- [ ] Lista de itens\n- [ ] Filtro e busca\n- [ ] Testes de fluxo principal`,
                },
            },
            {
                id: "priorizacao-e-aceite",
                title: "Priorizacao e aceite",
                intro:
                    "Priorize tarefas com base em impacto no negocio e defina aceite objetivo para cada entrega.",
                bullets: [
                    "Use prioridade alta, media e baixa em todas as tasks.",
                    "Registre dependencia entre tarefas para evitar bloqueios.",
                    "Defina criterio de pronto (DoD) antes de iniciar sprint.",
                ],
                code: {
                    label: "Definition of Done (DoD)",
                    language: "markdown",
                    content: `## DoD - Task pronta\n- [ ] Funcionalidade implementada\n- [ ] Teste manual do fluxo principal\n- [ ] Tratamento de erro validado\n- [ ] Sem erro de lint\n- [ ] PR revisado e aprovado`,
                },
            },
        ],
        research: [
            "como escrever prd",
            "como quebrar prd em tasks",
            "como priorizar backlog de produto",
        ],
    },
];

const FLUTTER_TOPICS: Topic[] = [
    {
        id: "flutter-overview",
        title: "Visão geral",
        summary:
            "Visão geral da configuração padrão, instalação inicial e recursos incluídos no template.",
        tag: "Flutter",
        readTime: "6 min",
        sections: [
            {
                id: "visao-geral",
                title: "Visão geral do template",
                intro:
                    "🔥 O projeto vem, por padrão, configurado para fins de demonstração.",
                bullets: [
                    "Uma demonstração interativa completa também está disponível no ApparenceKit Demo.",
                    "A demonstração web não é totalmente funcional; alguns recursos não estão disponíveis.",
                ],
            },
            {
                id: "instalacao",
                title: "Instalação",
                intro:
                    "Você deve seguir estas etapas para configurar seu projeto.",
                bullets: [
                    "👍 Para ter acesso ao repositório, você precisa ter adquirido uma licença no ApparenceKit.",
                    "Instale a ferramenta de linha de comando (CLI) do ApparenceCli.",
                    "Configure seu projeto com Firebase, Supabase ou cliente HTTP.",
                    "Nota: dependendo da sua escolha, você também terá que configurar o backend correspondente.",
                    "Para facilitar, também disponibilizamos um template de backend para cada solução (exceto cliente HTTP).",
                ],
            },
            {
                id: "recursos-incluidos",
                title: "Recursos",
                intro:
                    "Aqui está uma lista resumida dos recursos incluídos no projeto.",
                bullets: [
                    "🧪 Múltiplos ambientes (dev, staging, prod...) ✅",
                    "📦 Exemplo de arquitetura modular ✅",
                    "📲 Exemplo de padrão Repository ✅",
                    "⏳ Inicializador do app ✅",
                    "👨‍💻 Estado de autenticação + armazenamento de token ✅",
                    "🔓 Exemplo de guards ✅",
                    "📭 Página de cadastro por e-mail ✅",
                    "🚪 Página de login por e-mail ✅",
                    "🔐 Página de recuperação de senha ✅",
                    "📱 Configuração fácil da barra inferior (+ adaptável ao sistema operacional) ✅",
                    "🚩 Exemplos avançados de testes unitários ✅",
                    "🖥️ Configuração de CI ✅",
                    "🎨 Gerenciador de tema aprimorado ✅",
                    "💼 Verificação regular de versões de dependências ✅",
                    "🔔 Gerenciamento de notificações ✅",
                    "💰 Assinatura no app (opcional) ✅",
                    "🤩 Google AdMob pronto (opcional) ✅",
                    "😎 Autenticações sociais (comando CLI) ✅",
                    "🏳️ Internacionalização (opcional) ✅",
                    "🚨 Relatório de erros com Sentry (opcional) ✅",
                    "E muito mais...",
                ],
            },
        ],
        research: ["overview template flutter", "instalação flutter", "features flutter starter"],
    },
    {
        id: "flutter-cli-installation",
        title: "Instalação da CLI",
        summary:
            "A CLI ajuda na configuração do projeto, na troca de backend e na geração de módulos.",
        tag: "Flutter",
        readTime: "4 min",
        sections: [
            {
                id: "sobre-cli",
                title: "ApparenceKit CLI",
                intro:
                    "A ApparenceKit possui uma CLI que pode ajudar a configurar seu projeto e alternar de uma API de backend customizada para Firebase ou Supabase.",
                bullets: [
                    "Ela configura os projetos Android e iOS e várias outras etapas.",
                    "Também inclui muitos outros comandos para gerar módulos.",
                ],
            },
            {
                id: "nota-firebase-push",
                title: "Nota importante",
                intro:
                    "🧐 Mesmo que você escolha Supabase ou API REST, ainda usaremos um projeto Firebase.",
                bullets: [
                    "Isso é necessário apenas para push notification.",
                    "Esse é o único caminho para enviar notificações para dispositivos Android.",
                ],
            },
            {
                id: "instalacao-cli",
                title: "Instalação",
                intro:
                    "Após comprar o ApparenceKit, você receberá um e-mail com as instruções de instalação.",
                bullets: [
                    "A instalação é feita com um script simples no seu computador.",
                    "Depois de executar o script, reinicie o terminal.",
                    "Em seguida, o comando apparence_cli estará disponível.",
                ],
                code: {
                    label: "Comandos iniciais",
                    language: "bash",
                    content: `apparence_cli <command>\n\n# Ver todos os comandos disponíveis\napparence_cli --help`,
                },
            },
        ],
        research: ["apparencekit cli", "instalação apparence_cli", "firebase push android"],
    },
    {
        id: "flutter-setup-http-client",
        title: "Setup com cliente HTTP",
        summary: "Configuração do ApparenceKit com cliente HTTP e Firebase para notificações.",
        tag: "Flutter",
        readTime: "8 min",
        sections: [
            {
                id: "pre-requisitos-http",
                title: "Pré-requisitos",
                intro: "Você precisa ter instalado:",
                bullets: ["Flutter", "ApparenceKit CLI"],
            },
            {
                id: "gerar-app-http",
                title: "1 - Gere seu app",
                intro:
                    "Com a ApparenceKit CLI instalada, rode o comando de setup para configurar o template conforme a necessidade do projeto.",
                bullets: [
                    "Abra o terminal na raiz do projeto.",
                    "Execute o comando de setup.",
                    "Quando for solicitado, escolha entre Firebase, Supabase ou cliente HTTP.",
                    "Escolha cliente HTTP e pressione Enter.",
                    "Você também será perguntado sobre: Sentry (erros), Firebase Remote Config (A/B test), Mixpanel (analytics), internacionalização e telas de introdução.",
                ],
                code: {
                    label: "Setup do template",
                    language: "bash",
                    content: `apparence_cli setup .`,
                },
            },
            {
                id: "firebase-notificacoes",
                title: "2 - Configure o Firebase para notificações ou Remote Config",
                intro:
                    "O ApparenceKit usa Firebase Cloud Messaging para enviar notificações aos usuários.",
                bullets: [
                    "Você precisa do firebase_tools.",
                    "Precisamos do Firebase para push notifications ou Remote Config.",
                    "O Google exige um projeto Firebase para aplicação Android.",
                    "O Firebase permite enviar push para iOS e Android.",
                    "Primeiro, crie um projeto Firebase.",
                ],
            },
            {
                id: "firebase-cli",
                title: "Instale o Firebase CLI",
                intro:
                    "No macOS você pode instalar com Homebrew, ou usar npm em qualquer sistema compatível.",
                bullets: [
                    "Consulte a [documentação oficial do Firebase CLI](https://firebase.google.com/docs/cli) para outros sistemas operacionais.",
                ],
                code: {
                    label: "Instalação do Firebase CLI",
                    language: "bash",
                    content: `# macOS\nbrew install firebase-cli\n\n# npm\nnpm install -g firebase-tools`,
                },
            },
            {
                id: "login-firebase",
                title: "Faça login no Firebase",
                intro: "Após instalar o CLI, autentique sua conta Firebase:",
                bullets: [],
                code: {
                    label: "Login no Firebase",
                    language: "bash",
                    content: `firebase login`,
                },
            },
            {
                id: "flutterfire-cli",
                title: "FlutterFire CLI",
                intro:
                    "O FlutterFire CLI gera arquivos de configuração do Firebase para Flutter.",
                bullets: ["Instale a ferramenta globalmente."],
                code: {
                    label: "Instalar FlutterFire CLI",
                    language: "bash",
                    content: `dart pub global activate flutterfire_cli`,
                },
            },
            {
                id: "configurar-projeto-flutterfire",
                title: "Configure seu projeto (ambiente dev no exemplo)",
                intro: "Gere o arquivo de configuração do Firebase para o ambiente desejado.",
                bullets: [
                    "O comando gera um arquivo dentro da pasta lib.",
                    "Crie quantos ambientes forem necessários.",
                ],
                code: {
                    label: "flutterfire configure",
                    language: "bash",
                    content: `# flutterfire configure --project=YOUR_PROJECT_NAME --out lib/firebase_options_[environment].dart\n# Exemplo:\nflutterfire configure --project=apparencekit-pro --out lib/firebase_options_dev.dart`,
                },
            },
            {
                id: "remover-arquivos-gerados",
                title: "Remova arquivos gerados antigos do Firebase",
                intro:
                    "A recomendação é remover arquivos gerados em Android/iOS e usar a configuração via código Dart.",
                bullets: [
                    "Remova o arquivo google-services.json da pasta android/app.",
                    "Remova o arquivo GoogleService-Info.plist da pasta ios/Runner.",
                ],
            },
            {
                id: "setup-firebase-codigo",
                title: "Configure a inicialização do Firebase no código",
                intro: "Exemplo de configuração por ambiente:",
                bullets: [],
                code: {
                    label: "Inicialização Firebase por ambiente",
                    language: "dart",
                    content: `import 'package:apparence_kit/firebase_options_dev.dart' as firebase_dev;\n...\nvoid main() async {\n  ...\n  await env.when(\n    dev: (_) => Firebase.initializeApp(\n      options: firebase_dev.DefaultFirebaseOptions.currentPlatform,\n    ),\n    ...\n  );\n}`,
                },
            },
        ],
        research: [
            "apparencekit http client setup",
            "firebase cloud messaging flutter",
            "flutterfire configure environments",
        ],
    },
    {
        id: "flutter-setup-firebase",
        title: "Setup com Firebase",
        summary: "Guia completo para configurar o ApparenceKit com Firebase.",
        tag: "Flutter",
        readTime: "12 min",
        sections: [
            {
                id: "pre-requisitos-firebase",
                title: "Pré-requisitos",
                intro: "Você precisa ter instalado:",
                bullets: ["Flutter", "ApparenceKit CLI"],
            },
            {
                id: "gerar-app-firebase",
                title: "1 - Gere seu app",
                intro:
                    "Com a ApparenceKit CLI instalada, execute o comando de setup na raiz do projeto.",
                bullets: [
                    "Quando for solicitado, escolha entre Firebase, Supabase ou cliente HTTP.",
                    "Escolha Firebase e pressione Enter.",
                    "Você também será perguntado sobre: Sentry (erros), Firebase Remote Config (A/B test), Mixpanel (analytics), internacionalização e telas de introdução.",
                    "Depois, execute o comando para configurar o projeto Firebase.",
                    "🔥 Se você usar o comando firebase abaixo, pode pular o restante deste guia porque o processo é automatizado.",
                ],
                code: {
                    label: "Setup com Firebase",
                    language: "bash",
                    content: `apparence_cli setup .\n\n# Em seguida\napparence_cli firebase .`,
                },
            },
            {
                id: "criar-projeto-firebase",
                title: "2 - Crie o projeto Firebase",
                intro:
                    "O apparence_cli normalmente instala o Firebase CLI durante o setup, mas você pode instalar manualmente.",
                bullets: ["No macOS use Homebrew; em qualquer ambiente compatível use npm."],
                code: {
                    label: "Instalação Firebase CLI",
                    language: "bash",
                    content: `# macOS\nbrew install firebase-cli\n\n# npm\nnpm install -g firebase-tools`,
                },
            },
            {
                id: "login-firebase-cli",
                title: "Login no Firebase",
                intro: "Depois da instalação, autentique sua conta:",
                bullets: [],
                code: {
                    label: "Comando de login",
                    language: "bash",
                    content: `firebase login`,
                },
            },
            {
                id: "flutterfire-cli-firebase",
                title: "FlutterFire CLI",
                intro:
                    "FlutterFire CLI é a ferramenta que gera os arquivos de configuração Firebase para Flutter.",
                bullets: [
                    "Instale com dart pub global.",
                    "No macOS, instale também xcodeproj.",
                    "Nota: o FlutterFire usa o gem xcodeproj para alterar o arquivo do projeto iOS com a configuração do Firebase.",
                ],
                code: {
                    label: "Instalar FlutterFire CLI",
                    language: "bash",
                    content: `dart pub global activate flutterfire_cli\n\n# macOS\nsudo gem install xcodeproj`,
                },
            },
            {
                id: "configurar-flutterfire-firebase",
                title: "Configure seu projeto (exemplo em dev)",
                intro:
                    "Gere o arquivo de configuração do Firebase para o ambiente desejado.",
                bullets: [
                    "O comando gera um arquivo em lib/.",
                    "Crie quantos ambientes forem necessários.",
                ],
                code: {
                    label: "flutterfire configure",
                    language: "bash",
                    content: `# flutterfire configure --project=YOUR_PROJECT_NAME --out lib/firebase_options_[environment].dart\n# Exemplo:\nflutterfire configure --project=apparencekit-pro --out lib/firebase_options_dev.dart`,
                },
            },
            {
                id: "remover-arquivos-firebase",
                title: "Remova arquivos gerados antigos do Firebase",
                intro:
                    "A recomendação é remover arquivos gerados das pastas Android/iOS e usar a configuração por código Dart.",
                bullets: [
                    "Remova google-services.json de android/app.",
                    "Remova GoogleService-Info.plist de ios/Runner.",
                    "Remova id 'com.google.gms.google-services' de android/build.gradle.",
                ],
            },
            {
                id: "setup-firebase-codigo-final",
                title: "Configure Firebase no código",
                intro: "Exemplo de inicialização por ambiente:",
                bullets: [],
                code: {
                    label: "Firebase initializeApp",
                    language: "dart",
                    content: `import 'package:apparence_kit/firebase_options_dev.dart' as firebase_dev;\n...\nvoid main() async {\n    ...\n    await env.when(\n        dev: (_) => Firebase.initializeApp(\n            options: firebase_dev.DefaultFirebaseOptions.currentPlatform,\n        ),\n        ...\n    );\n}`,
                },
            },
            {
                id: "deploy-firebase-functions",
                title: "3 - Deploy das Firebase Functions",
                intro:
                    "Nos planos Core ou Unlimited, você terá acesso ao boilerplate de Firebase Functions.",
                bullets: [
                    "As funções incluem tratamento de notificações.",
                    "Pré-requisito: firebase-tools globalmente instalado.",
                    "Faça clone do repositório (ou crie um novo com o template).",
                    "Instale dependências e faça deploy das funções.",
                ],
                code: {
                    label: "Deploy de functions",
                    language: "bash",
                    content: `npm install -g firebase-tools\n\nnpm install\nfirebase deploy --only functions`,
                },
            },
            {
                id: "deploy-firestore-rules",
                title: "Deploy das regras do Firestore",
                intro:
                    "As regras de segurança do Firestore vêm no repositório de functions e precisam ser ajustadas conforme suas coleções.",
                bullets: ["Faça o deploy das regras com Firebase CLI."],
                code: {
                    label: "Deploy de regras",
                    language: "bash",
                    content: `firebase deploy --only firestore:rules`,
                },
            },
            {
                id: "revenuecat-webhook",
                title: "Webhook do RevenueCat",
                intro:
                    "Se você escolheu o módulo de assinatura, faça deploy da função de webhook e configure sua conta RevenueCat.",
                bullets: [
                    "💡 Você pode pular esta etapa por enquanto e fazer depois.",
                    "Precisamos sincronizar o status da assinatura no Firestore.",
                    "1) Faça deploy do segredo do webhook.",
                    "2) Habilite a função de assinatura no arquivo index.ts.",
                    "3) Faça deploy das functions novamente.",
                ],
                code: {
                    label: "Configuração do webhook",
                    language: "bash",
                    content: `firebase functions:config:set revenuecat.token=\"your_bearer_token\"\n\n# No index.ts, descomente:\n# exports.subscriptions = require(\"./subscriptions/subscriptions_functions\");\n\nfirebase deploy --only functions`,
                },
            },
            {
                id: "android-setup-firebase",
                title: "4 - Setup Android",
                intro:
                    "O projeto Android está pronto para uso em modo de desenvolvimento.",
                bullets: [
                    "Para produção, consulte o guia de deploy na Play Store.",
                ],
            },
            {
                id: "ios-setup-firebase",
                title: "5 - Setup iOS",
                intro:
                    "Abra a pasta ios no Xcode e configure o app com seu bundle id, team e provisioning profile.",
                bullets: [
                    "Depois disso, tudo deve estar pronto para uso em desenvolvimento.",
                    "Para produção, consulte o guia de deploy na App Store.",
                    "Nota: você precisa de uma conta paga Apple Developer para publicar na App Store ou assinar o app com seu certificado.",
                ],
                image: {
                    src: "/images/flutter-ios-signing-config.png",
                    alt: "Configuração de signing no Xcode para iOS",
                    caption: "Setup do team, bundle identifier e signing no Xcode.",
                },
            },
        ],
        research: [
            "apparencekit firebase setup",
            "flutterfire configure",
            "firebase functions deploy",
            "ios signing xcode flutter",
        ],
    },
    {
        id: "flutter-setup-supabase",
        title: "Setup com Supabase",
        summary: "Guia completo para configurar o ApparenceKit com Supabase.",
        tag: "Flutter",
        readTime: "12 min",
        sections: [
            {
                id: "introducao-supabase",
                title: "Setup ApparenceKit com Supabase",
                intro:
                    "O ApparenceKit ajuda a iniciar seu app Flutter com autenticação, monetização, tema e internacionalização. Ele funciona totalmente com Supabase.",
                bullets: [
                    "Para facilitar, criamos uma CLI que gera muito código com base nas necessidades do projeto.",
                    "Este é um guia passo a passo para configurar seu app com ApparenceKit e Supabase.",
                    "Nota: mesmo usando Supabase, ainda exigimos Firebase para push notifications e Remote Config, pois o Supabase não fornece isso.",
                    "Guia em vídeo de instalação disponível: [assistir no YouTube](https://www.youtube.com/watch?v=fq4N0hgOWzU).",
                ],
                image: {
                    src: "/images/screen-dark-1.png",
                    alt: "Imagem genérica de setup com Supabase",
                    caption: "Visão geral do fluxo de instalação com Supabase.",
                },
            },
            {
                id: "pre-requisitos-supabase",
                title: "Pré-requisitos",
                intro: "Você precisa ter instalado:",
                bullets: ["Flutter", "ApparenceKit CLI"],
            },
            {
                id: "gerar-app-supabase",
                title: "1 - Gere seu app",
                intro: "A ApparenceKit CLI vai gerar bastante código automaticamente.",
                bullets: [
                    "Abra um terminal na raiz do projeto e execute o setup.",
                    "Quando for solicitado, escolha entre Firebase, Supabase ou cliente HTTP.",
                    "Escolha Supabase e pressione Enter.",
                    "Você também será perguntado sobre: Sentry, Firebase Remote Config, Mixpanel, internacionalização e telas de introdução.",
                    "Depois rode o comando para setup do Supabase.",
                    "🔥 Se você usar o comando supabase, pode pular o restante deste guia porque tudo será feito automaticamente.",
                ],
                code: {
                    label: "Setup com Supabase",
                    language: "bash",
                    content: `apparence_cli setup .\n\n# Em seguida\napparence_cli supabase .`,
                },
            },
            {
                id: "setup-supabase-config",
                title: "2 - Configure o Supabase",
                intro:
                    "Para isso, você precisa ter uma conta Supabase e um projeto criado.",
                bullets: [
                    "Dados necessários: URL do projeto Supabase e token do projeto Supabase.",
                ],
                image: {
                    src: "/images/screen-light-1.png",
                    alt: "Imagem genérica de configuração do projeto Supabase",
                    caption: "Conta e projeto Supabase prontos para configuração.",
                },
            },
            {
                id: "supabase-vscode",
                title: "Usando VSCode",
                intro:
                    "Abra o arquivo '.VSCode/launch.json' e adicione URL e token na seção 'args'.",
                bullets: [],
                code: {
                    label: "launch.json (Supabase - Development)",
                    language: "json",
                    content: `...\n{\n  "name": "Supabase - Development",\n  "request": "launch",\n  "type": "dart",\n  "program": "lib/main.dart",\n  "args": [\n    "--dart-define=ENV=dev",\n    "--dart-define=BACKEND_URL=",\n    "--dart-define=SUPABASE_TOKEN="\n  ]\n}`,
                },
            },
            {
                id: "supabase-cli",
                title: "Usando linha de comando",
                intro: "Execute o comando abaixo na raiz do projeto:",
                bullets: [],
                code: {
                    label: "flutter run com Supabase",
                    language: "bash",
                    content: `flutter run --dart-define=ENV=dev \\\n--dart-define=BACKEND_URL=YOUR_SUPABASE_PROJECT_URL \\\n--dart-define=SUPABASE_TOKEN=YOUR_SUPABASE_PROJECT_TOKEN`,
                },
            },
            {
                id: "supabase-codigo-direto",
                title: "Diretamente no código (não recomendado)",
                intro: "No arquivo 'lib/main.dart':",
                bullets: [],
                code: {
                    label: "Supabase.initialize por ambiente",
                    language: "dart",
                    content: `await env.map(\n  dev: (_) => Supabase.initialize(\n    url: env.backendUrl,\n    anonKey: const String.fromEnvironment('SUPABASE_TOKEN'),\n  ),\n  prod: (vars) => Supabase.initialize(\n    url: env.backendUrl,\n    anonKey: const String.fromEnvironment('SUPABASE_TOKEN'),\n  ),\n);`,
                },
            },
            {
                id: "supabase-cli-v5",
                title: "Comando automático (V5)",
                intro:
                    "🔥 O ApparenceKit V5 já fornece comando para setup completo do Supabase:",
                bullets: [
                    "Rode o comando abaixo e siga as instruções para configurar automaticamente.",
                    "👇 Você não precisa mais fazer manualmente as etapas anteriores.",
                ],
                code: {
                    label: "Setup automático Supabase",
                    language: "bash",
                    content: `apparence_cli supabase .`,
                },
            },
            {
                id: "provedores-auth-supabase",
                title: "3 - Setup do servidor Supabase (provedores de autenticação)",
                intro:
                    "Para usar qualquer provedor de login, você precisa habilitá-lo no projeto Supabase.",
                bullets: [
                    "Vá em Supabase > Authentication > Providers e habilite Email and Password.",
                    "Desative confirmação de e-mail (na maioria dos casos melhora a experiência e reduz abandono).",
                ],
                image: {
                    src: "/images/screen-dark-1.png",
                    alt: "Imagem genérica da tela de providers do Supabase",
                    caption: "Habilitação do provider de e-mail e senha no Supabase.",
                },
            },
            {
                id: "setup-db-supabase",
                title: "4 - Configure seu banco de dados",
                intro:
                    "Dependendo dos recursos escolhidos, o ApparenceKit exige tabelas específicas no banco.",
                bullets: [
                    "Ao comprar o ApparenceKit você recebe acesso ao repositório boilerplate do Supabase.",
                    "Esse repositório inclui o schema em arquivo SQL.",
                    "Abra o editor SQL do Supabase e cole o conteúdo do arquivo.",
                ],
            },
            {
                id: "policies-supabase",
                title: "Policies das tabelas",
                intro:
                    "As policies controlam o acesso ao banco. Sem elas, usuários não acessam os próprios dados.",
                bullets: [
                    "Se você é novo no Supabase, leia sobre policies de banco.",
                    "💡 O schema fornecido também cria as policies automaticamente.",
                    "Aqui está o resultado final das policies configuradas.",
                ],
                image: {
                    src: "/images/screen-light-1.png",
                    alt: "Imagem genérica do resultado das policies no Supabase",
                    caption: "Resultado esperado das policies após aplicar o schema.",
                },
            },
            {
                id: "firebase-notificacoes-supabase",
                title: "4 - Configure Firebase para notificações ou Remote Config",
                intro:
                    "O ApparenceKit usa Firebase Cloud Messaging para enviar notificações aos usuários.",
                bullets: [
                    "Você precisa do firebase_tools.",
                    "Precisamos do Firebase para push notifications ou Remote Config.",
                    "O Google exige um projeto Firebase para app Android.",
                    "O Firebase permite envio de push para iOS e Android.",
                    "Primeiro, crie um projeto Firebase.",
                ],
            },
            {
                id: "firebase-cli-supabase",
                title: "Instale Firebase CLI",
                intro:
                    "No macOS instale com Homebrew, ou use npm em qualquer sistema compatível.",
                bullets: [
                    "Consulte a [documentação oficial do Firebase CLI](https://firebase.google.com/docs/cli) para outros sistemas operacionais.",
                ],
                code: {
                    label: "Instalação Firebase CLI",
                    language: "bash",
                    content: `# macOS\nbrew install firebase-cli\n\n# npm\nnpm install -g firebase-tools`,
                },
            },
            {
                id: "firebase-login-supabase",
                title: "Login no Firebase",
                intro: "Após instalar o CLI, autentique sua conta:",
                bullets: [],
                code: {
                    label: "firebase login",
                    language: "bash",
                    content: `firebase login`,
                },
            },
            {
                id: "flutterfire-supabase",
                title: "FlutterFire CLI",
                intro:
                    "FlutterFire CLI gera arquivos de configuração Firebase para Flutter.",
                bullets: ["Instale com:"],
                code: {
                    label: "Instalar FlutterFire CLI",
                    language: "bash",
                    content: `dart pub global activate flutterfire_cli`,
                },
            },
            {
                id: "configure-firebase-supabase",
                title: "Configure o projeto Firebase (exemplo dev)",
                intro: "Gere o arquivo de configuração para cada ambiente necessário.",
                bullets: [
                    "O comando gera um arquivo dentro de lib/.",
                    "Crie quantos ambientes forem necessários.",
                ],
                code: {
                    label: "flutterfire configure",
                    language: "bash",
                    content: `# flutterfire configure --project=YOUR_PROJECT_NAME --out lib/firebase_options_[environment].dart\n# Exemplo:\nflutterfire configure --project=apparencekit-pro --out lib/firebase_options_dev.dart`,
                },
            },
            {
                id: "remover-firebase-files-supabase",
                title: "Remova arquivos gerados antigos do Firebase",
                intro:
                    "Recomendamos remover arquivos gerados em Android/iOS e usar configuração por código Dart.",
                bullets: [
                    "Remova google-services.json da pasta android/app.",
                    "Remova GoogleService-Info.plist da pasta ios/Runner.",
                ],
            },
            {
                id: "setup-firebase-code-supabase",
                title: "Configure Firebase no código",
                intro: "Exemplo de inicialização por ambiente:",
                bullets: [],
                code: {
                    label: "Firebase initializeApp",
                    language: "dart",
                    content: `import 'package:apparence_kit/firebase_options_dev.dart' as firebase_dev;\n...\nvoid main() async {\n    ...\n    await env.when(\n        dev: (_) => Firebase.initializeApp(\n            options: firebase_dev.DefaultFirebaseOptions.currentPlatform,\n        ),\n        ...\n    );\n}`,
                },
            },
            {
                id: "revenuecat-webhook-supabase",
                title: "5 - Deploy do webhook RevenueCat",
                intro:
                    "O ApparenceKit usa RevenueCat para compras in-app. Você precisa de um webhook para sincronizar compras no banco.",
                bullets: [
                    "O webhook está no repositório ApparenceKit-supabase.",
                ],
            },
        ],
        research: [
            "apparencekit supabase setup",
            "supabase auth providers",
            "firebase remote config flutter",
            "revenuecat webhook supabase",
        ],
    },
    {
        id: "flutter-environment",
        title: "Ambiente",
        summary: "Como estruturar ambientes, variáveis e execução por dev/staging/prod.",
        tag: "Flutter",
        readTime: "10 min",
        sections: [
            {
                id: "por-que-ambientes",
                title: "Por que precisamos de ambientes?",
                intro:
                    "Usar arquivo de ambiente permite gerenciar e isolar configurações (conexões de banco, chaves de API e dados sensíveis), aumentando segurança e flexibilidade da aplicação.",
                bullets: [
                    "Os ambientes ficam no arquivo lib/environnements.dart.",
                    "Crie uma factory para cada ambiente nesse arquivo.",
                ],
                code: {
                    label: "Factories de ambiente",
                    language: "dart",
                    content: `...\nconst factory Environment.dev({required String name}) = DevEnvironment;\nconst factory Environment.production({required String name}) = ProdEnvironment;\n...`,
                },
            },
            {
                id: "ambientes-padrao",
                title: "Ambientes padrão do template",
                intro: "Por padrão, o template fornece 3 ambientes:",
                bullets: [
                    "dev",
                    "staging",
                    "prod",
                    "Esses objetos concentram chaves de API e configurações de cada ambiente.",
                    "Prefira variáveis de ambiente em vez de valores hardcoded.",
                ],
            },
            {
                id: "variaveis-ambiente",
                title: "Variáveis de ambiente",
                intro:
                    "Para compilar com CI/CD, use variáveis de ambiente. O Dart permite passá-las via linha de comando.",
                bullets: [
                    "Evite chamar String.fromEnvironment('ENV') diretamente no código.",
                    "Crie propriedades no arquivo de ambiente para acessar variáveis.",
                    "Como o objeto usa Freezed, ele é imutável (ninguém altera propriedades em runtime).",
                ],
            },
            {
                id: "uso-variaveis-no-codigo",
                title: "Use variáveis de ambiente no código",
                intro:
                    "Injete o EnvironmentProvider onde precisar (geralmente nos arquivos *_api.dart).",
                bullets: [],
                code: {
                    label: "Exemplo com Provider",
                    language: "dart",
                    content: `final ratingApiProvider = Provider<RatingApi>((ref) {\n  final prefsBuilder = ref.watch(sharedPreferencesProvider);\n  return RatingApi(\n    ...\n    env: ref.watch(environmentProvider),\n  );\n});`,
                },
            },
            {
                id: "acesso-env-objeto",
                title: "Acesso às variáveis via objeto Environment",
                intro: "Depois, acesse os valores diretamente pelo objeto de ambiente:",
                bullets: [],
                code: {
                    label: "Exemplo de validação",
                    language: "dart",
                    content: `Future<void> openStoreListing() {\n  if (_env.appStoreId == null) {\n    throw Exception(\n      '''appStoreId is not defined in your environment, check [environnements.dart] file''',\n    );\n  }\n  return ...;\n}`,
                },
            },
            {
                id: "adicionar-nova-env-var",
                title: "Como adicionar sua própria variável",
                intro:
                    "Você pode adicionar novas variáveis no arquivo lib/environnements.dart.",
                bullets: [
                    "1) Adicione a propriedade em cada ambiente.",
                    "2) Regenere o código do Freezed.",
                    "3) Atualize o construtor factory fromEnv().",
                ],
                code: {
                    label: "Adicionar propriedade + build_runner",
                    language: "dart",
                    content: `const factory Environment.dev({\n  required String [MY PROPERTY],\n  ...\n}) = DevEnvironment;\n\n// Regenerar código\n// dart run build_runner build --delete-conflicting-outputs`,
                },
            },
            {
                id: "factory-from-env",
                title: "Atualize a factory fromEnv()",
                intro:
                    "Substitua [MY PROPERTY] pelo nome e tipo da sua propriedade e mapeie por ambiente.",
                bullets: [
                    "String.fromEnvironment('YOUR_KEY') lê variáveis de ambiente no Dart.",
                    "Passe os valores ao rodar o app via linha de comando.",
                ],
                code: {
                    label: "Exemplo fromEnv()",
                    language: "dart",
                    content: `...\nfactory Environment.fromEnv() {\n  switch (_kEnvironmentInput) {\n    case 'dev':\n      return const Environment.dev(\n        appStoreId: String.fromEnvironment('APP_STORE_ID', defaultValue: 'com.example.myapp.dev'),\n        ...\n      );\n    case 'prod':\n      return const Environment.dev(\n        appStoreId: String.fromEnvironment('APP_STORE_ID'),\n        ...\n      );\n  }\n}`,
                },
            },
            {
                id: "dart-define-execucao",
                title: "Rodando com --dart-define",
                intro:
                    "Prefira String.fromEnvironment com defaultValue para evitar hardcode de chaves no repositório.",
                bullets: [
                    "Hardcoded funciona, mas não é recomendado porque expõe chaves.",
                ],
                code: {
                    label: "Passando variável por CLI",
                    language: "bash",
                    content: `flutter run --dart-define=YOUR_KEY=YOUR_VALUE`,
                },
            },
            {
                id: "vscode-launch-env",
                title: "Usuários VSCode",
                intro:
                    "No VSCode, crie uma launch config para cada ambiente no arquivo .vscode/launch.json.",
                bullets: [
                    "Não esqueça de adicionar suas variáveis na configuração.",
                ],
                code: {
                    label: "Exemplo launch.json",
                    language: "json",
                    content: `{\n  "name": "Dev",\n  "request": "launch",\n  "type": "dart",\n  "args": [\n    "--dart-define=BACKEND_URL=https://..",\n    "--dart-define=ENV=dev"\n  ]\n}`,
                },
            },
            {
                id: "setup-firestore",
                title: "🔥 Setup Firestore",
                intro: "Parabéns, aqui você não precisa fazer mais nada.",
                bullets: ["A configuração do Firestore já vem pronta para você."],
            },
            {
                id: "setup-backend-api",
                title: "🌏 Setup da sua API backend",
                intro:
                    "Para testes, fornecemos um backend fake que responde com status 200 e JSON fictício.",
                bullets: [
                    "Você pode configurar a URL da API via variável de ambiente Dart.",
                ],
                code: {
                    label: "Backend URL por ambiente",
                    language: "bash",
                    content: `flutter run \\\n--dart-define=BACKEND_URL=https://myserver \\\n--dart-define=ENV=dev`,
                },
            },
            {
                id: "vscode-multiplos-ambientes",
                title: "VSCode com múltiplos ambientes",
                intro:
                    "No .vscode/launch.json, configure Dev, Staging e Prod com args diferentes.",
                bullets: [],
                code: {
                    label: "launch.json completo",
                    language: "json",
                    content: `{\n  "version": "0.2.0",\n  "configurations": [\n    {\n      "name": "Dev",\n      "request": "launch",\n      "type": "dart",\n      "args": [\n        "--dart-define=BACKEND_URL=https://..",\n        "--dart-define=ENV=dev"\n      ]\n    },\n    {\n      "name": "Staging",\n      "request": "launch",\n      "type": "dart",\n      "args": [\n        "--dart-define=BACKEND_URL=https://..",\n        "--dart-define=ENV=staging"\n      ]\n    },\n    {\n      "name": "Prod",\n      "request": "launch",\n      "type": "dart",\n      "args": [\n        "--dart-define=BACKEND_URL=https://...",\n        "--dart-define=ENV=prod"\n      ]\n    }\n  ]\n}`,
                },
            },
            {
                id: "setup-flavors",
                title: "📱 Setup de Flavors (opcional)",
                intro:
                    "Flavors permitem executar múltiplas versões do app no mesmo dispositivo, mas não são obrigatórios.",
                bullets: [
                    "Se você não tem familiaridade com flavors no Android/Xcode, pode pular.",
                    "Você pode usar package name diferente por ambiente.",
                    "Exemplos: com.example.myapp.dev, com.example.myapp.staging, com.example.myapp.",
                    "Isso evita publicar ambiente de dev em produção.",
                    "Também permite instalar staging e produção no mesmo dispositivo.",
                ],
            },
        ],
        research: [
            "flutter environments dart-define",
            "freezed environment object flutter",
            "vscode launch json flutter",
            "flutter flavors setup",
        ],
    },
    {
        id: "flutter-add-web-support",
        title: "Adicionar suporte à Web",
        summary: "Como habilitar Web no Flutter e ajustar layout/navegação para desktop.",
        tag: "Flutter",
        readTime: "7 min",
        sections: [
            {
                id: "web-cli",
                title: "Adicionar suporte Web com a CLI",
                intro:
                    "A ApparenceKit CLI possui um comando para adicionar suporte Web ao app Flutter.",
                bullets: [
                    "Esse comando gera a pasta web com arquivos e dependências necessários para rodar na web.",
                    "Execute o comando abaixo na raiz do projeto.",
                ],
                code: {
                    label: "Gerar suporte Web",
                    language: "bash",
                    content: `dart pub global run apparence_cli web --name=test .`,
                },
            },
            {
                id: "run-web",
                title: "Rodar o app na Web",
                intro: "Para executar no navegador, use:",
                bullets: [],
                code: {
                    label: "Run no Chrome",
                    language: "bash",
                    content: `flutter run -d chrome --dart-define=ENV=dev`,
                },
            },
            {
                id: "evitar-dart-io",
                title: "Não use dart:io",
                intro:
                    "O pacote dart:io não é suportado na Web. Use universal_io para alternar automaticamente por plataforma.",
                bullets: [
                    "Não use: import 'dart:io'",
                    "Use: import 'package:universal_io/io.dart'",
                ],
            },
            {
                id: "layout-responsivo",
                title: "Como criar layout responsivo",
                intro:
                    "Flutter oferece ferramentas fortes para layout responsivo: LayoutBuilder e MediaQuery.",
                bullets: [
                    "LayoutBuilder permite adaptar o layout ao espaço disponível.",
                    "MediaQuery permite adaptar pelo tamanho de tela.",
                    "Recomendação: prefira LayoutBuilder por ser mais flexível e poderoso.",
                ],
            },
            {
                id: "responsive-layout-builder",
                title: "ResponsiveLayoutBuilder",
                intro:
                    "Para facilitar layouts responsivos, use o widget ResponsiveLayout.",
                bullets: [
                    "Ele usa LayoutBuilder para ler a largura atual e retornar o widget do dispositivo correspondente.",
                    "Breakpoints: small < 768, medium >= 768, large >= 1024, xlarge >= 1280.",
                    "👉 Mobile first: se um tamanho não for informado, faz fallback para o tamanho anterior (small é obrigatório).",
                ],
                code: {
                    label: "Exemplo ResponsiveLayout",
                    language: "dart",
                    content: `return ResponsiveLayout(\n  small: ...,\n  medium: ...,\n  large: ...,\n  xlarge: ...,\n);`,
                },
            },
            {
                id: "navegacao-web",
                title: "Navegação para Web",
                intro:
                    "A navegação é feita com o plugin Bart. Isso permite usar o mesmo código para mobile e web, com suporte a rotas e botão voltar do navegador.",
                bullets: [
                    "Consulte a [documentação de rotas e navegação](topic:flutter-dev-routes-navigation) para mais detalhes.",
                    "Na web, você pode escolher entre dois modos de navegação lateral.",
                ],
            },
            {
                id: "web-navigation-rail",
                title: "Opção 1: NavigationRail (Material)",
                intro: "Exemplo usando sidebar Material:",
                bullets: [
                    "Para tema, configure normalmente no ThemeData.",
                ],
                code: {
                    label: "BartScaffold com Rail",
                    language: "dart",
                    content: `return BartScaffold(\n  routesBuilder: subRoutes,\n  showBottomBarOnStart: true,\n  bottomBar: BartBottomBar.material3(),\n  sideBarOptions: RailSideBarOptions(\n    extended: true,\n    gravity: Gravity.left,\n  ),\n);`,
                },
            },
            {
                id: "web-navigation-custom",
                title: "Opção 2: Sidebar customizada",
                intro: "Ou crie sua própria sidebar:",
                bullets: ["Fica a seu critério escolher a opção que preferir."],
                code: {
                    label: "BartScaffold com sidebar custom",
                    language: "dart",
                    content: `return BartScaffold(\n  routesBuilder: subRoutes,\n  showBottomBarOnStart: true,\n  bottomBar: BartBottomBar.material3(),\n  sideBarOptions: CustomSideBarOptions(\n    gravity: Gravity.left,\n    sideBarBuilder: ((onTapItem, currentItem) => ...),\n  ),\n);`,
                },
            },
        ],
        research: [
            "flutter web support",
            "layoutbuilder responsive flutter",
            "universal_io flutter web",
            "navigation rail flutter web",
        ],
    },
    {
        id: "flutter-auth-firebase",
        title: "Usando Firebase Auth",
        summary: "Como configurar e estender autenticação com Firebase no ApparenceKit.",
        tag: "Flutter",
        readTime: "8 min",
        sections: [
            {
                id: "introducao-firebase-auth",
                title: "Use Firebase Authentication",
                intro:
                    "Este guia vai te ajudar a entender como alterar a autenticação no ApparenceKit.",
                bullets: [
                    "A arquitetura do template com Firebase ou sem Firebase é a mesma.",
                    "Firebase Authentication fornece backend, SDKs e bibliotecas de UI prontas para autenticar usuários.",
                    "Ele suporta senha, telefone, provedores federados (Google, Facebook, Twitter e outros).",
                    "👉 Você precisa ter executado o setup da ApparenceKit CLI antes de usar este guia.",
                ],
            },
            {
                id: "metodos-disponiveis-firebase",
                title: "Métodos disponíveis no template",
                intro: "O template já inclui os seguintes fluxos:",
                bullets: [
                    "Login com e-mail e senha",
                    "Cadastro com e-mail e senha",
                    "Recuperação de senha",
                    "Login com Google",
                    "Login com Apple",
                    "Login com Facebook",
                    "Login com Twitter",
                    "Login anônimo",
                    "Vincular conta anônima a qualquer provedor (e-mail, Google, Apple etc.)",
                    "Logout",
                ],
            },
            {
                id: "ativar-firebase-auth",
                title: "Ative Firebase Authentication",
                intro:
                    "Você precisa ativar no projeto os métodos de autenticação que deseja usar.",
                bullets: [
                    "Acesse o [Firebase Console](https://console.firebase.google.com/u/0/?pli=1) e entre no seu projeto.",
                    "Abra a seção Authentication e habilite os métodos desejados.",
                    "Regenere a configuração Firebase no arquivo lib/firebase_options_[env].dart.",
                ],
            },
            {
                id: "adicionar-novo-metodo-auth",
                title: "Como adicionar um novo método de autenticação?",
                intro:
                    "Encapsulamos o FirebaseAuth em um provider para poder fazer fake/mock nos testes (FirebaseAuth é singleton e não pode ser mockado diretamente).",
                bullets: [
                    "1) Adicione um novo método de API.",
                    "Arquivo: lib/modules/authentication/api/authentication_api.dart",
                    "Exemplo: adicionar signInWithPhoneNumber.",
                    "2) Adicione um novo método no repository.",
                    "Arquivo: lib/modules/authentication/repository/authentication_repository.Dart",
                ],
            },
            {
                id: "api-vs-repository-auth",
                title: "Por que separar API e Repository?",
                intro:
                    "A API chama o SDK do Firebase. O Repository combina chamadas de API para executar ações específicas.",
                bullets: [
                    "O repository também pode persistir dados localmente (ex.: banco local).",
                    "Repository gerencia fontes de dados e retorna modelos de domínio.",
                    "API chama fonte remota/local e retorna dados diretamente.",
                ],
            },
            {
                id: "atualizar-testes-auth",
                title: "Atualize seus testes",
                intro: "Depois de adicionar o novo método, atualize os testes em:",
                bullets: [
                    "test/modules/authentication/repositories/authentication_repository_test.dart",
                    "Confira o código e os comentários nesses arquivos para entender o fluxo.",
                    "👌 Rode testes com frequência para garantir comportamento esperado.",
                    "Se possível, escreva os testes antes de codar.",
                ],
            },
        ],
        research: [
            "firebase auth flutter",
            "repository pattern authentication",
            "mock firebase auth tests flutter",
        ],
    },
    {
        id: "flutter-auth-own-backend",
        title: "Usando seu próprio backend",
        summary: "Como integrar autenticação REST da sua API no template ApparenceKit.",
        tag: "Flutter",
        readTime: "8 min",
        sections: [
            {
                id: "intro-own-backend",
                title: "Use seu próprio backend",
                intro:
                    "Este guia ajuda a instalar a autenticação da sua API REST no template do app.",
                bullets: [
                    "A arquitetura do ApparenceKit facilita conectar backend próprio.",
                ],
            },
            {
                id: "tldr-own-backend",
                title: "TLDR",
                intro: "A principal mudança fica nos arquivos *_api.dart.",
                bullets: [
                    "Esses arquivos são responsáveis diretamente pelas chamadas de API.",
                ],
            },
            {
                id: "como-funciona-camadas",
                title: "Como funciona?",
                intro: "A arquitetura é dividida em 4 camadas:",
                bullets: [
                    "Camada de API",
                    "Camada de Repository",
                    "Camada de Domínio",
                    "Camada de UI",
                ],
            },
            {
                id: "api-vs-repository-own-backend",
                title: "Por que separar API e Repository?",
                intro:
                    "A API chama o mundo externo. O Repository combina chamadas de API para executar ações específicas.",
                bullets: [
                    "Repository também pode persistir dados locais (ex.: banco local).",
                    "Repository gerencia fontes de dados e retorna modelos de domínio.",
                    "API chama fonte remota/local e retorna os dados diretamente.",
                ],
            },
            {
                id: "camada-api-own-backend",
                title: "Camada de API",
                intro:
                    "Abra o arquivo lib/modules/authentication/api/authentication_api.dart.",
                bullets: [
                    "Existe a classe HttpAuthenticationApi que implementa AuthenticationApi.",
                    "AuthenticationApi é uma classe abstrata com os métodos necessários.",
                    "As APIs são nosso contrato com o mundo externo.",
                    "Essa é a única parte que nossos testes unitários não cobrem diretamente.",
                    "O cliente Dio já está configurado para enviar o token no header Authorization Bearer.",
                ],
            },
            {
                id: "camada-repository-own-backend",
                title: "Camada de Repository",
                intro:
                    "A camada Repository chama a API e retorna dados usando os modelos de domínio.",
                bullets: [
                    "Também é responsável por persistência local quando necessário.",
                    "A UI chama apenas o Repository.",
                ],
            },
            {
                id: "token-storage-own-backend",
                title: "Como o token de autenticação é armazenado?",
                intro:
                    "O armazenamento é feito pela classe AuthSecuredStorage em:",
                bullets: [
                    "lib/core/security/secured_storage.dart",
                ],
            },
            {
                id: "novo-metodo-auth-own-backend",
                title: "Como adicionar um novo método de autenticação?",
                intro: "Fluxo recomendado:",
                bullets: [
                    "1) Adicione o método na API em lib/modules/authentication/api/authentication_api.dart",
                    "Exemplo: signInWithPhoneNumber.",
                    "2) Adicione o método no repository em lib/modules/authentication/repository/authentication_repository.Dart",
                ],
            },
            {
                id: "testes-own-backend",
                title: "Atualize seus testes",
                intro: "Depois da alteração, atualize os testes em:",
                bullets: [
                    "test/modules/authentication/repositories/authentication_repository_test.dart",
                    "Leia código e comentários dos arquivos para entender o fluxo.",
                    "👌 Rode os testes com frequência para garantir comportamento esperado.",
                    "Se possível, escreva testes antes de implementar.",
                ],
            },
            {
                id: "custom-header-http-auth",
                title: "Como customizar o header HTTP de autorização?",
                intro: "Abra o arquivo:",
                bullets: [
                    "lib/core/data/api/http_client.dart",
                    "Usamos Dio para chamadas de API.",
                    "Há uma única instância compartilhada por todas as APIs.",
                    "Por padrão, ela já injeta o token no header Authorization Bearer.",
                    "Você pode customizar esse comportamento como quiser.",
                ],
            },
        ],
        research: [
            "flutter rest api auth repository pattern",
            "dio authorization bearer token",
            "clean architecture authentication flutter",
        ],
    },
    {
        id: "flutter-auth-social",
        title: "Adicionar autenticação social",
        summary: "Como configurar login social (Google, Facebook, Apple) no template.",
        tag: "Flutter",
        readTime: "9 min",
        sections: [
            {
                id: "antes-de-comecar-social",
                title: "Antes de começar",
                intro:
                    "Autenticação com login social pode ser um pouco complexa de configurar.",
                bullets: [
                    "Se você quer começar rápido e não tem muita experiência, prefira Firebase.",
                ],
            },
            {
                id: "social-com-firebase",
                title: "Usando Firebase",
                intro:
                    "No Firebase Console, adicione os provedores sociais que deseja usar.",
                bullets: [
                    "Caminho: Project > Authentication > Sign-in method > Add provider.",
                    "Provedores como Facebook e Twitter exigem criar app na plataforma deles e obter app id/secret.",
                ],
            },
            {
                id: "social-backend-padrao",
                title: "API backend padrão",
                intro:
                    "Se você usa uma API backend própria, o login social precisa ser implementado no backend.",
                bullets: [
                    "Essa implementação depende da sua stack e não é o foco desta documentação.",
                ],
            },
            {
                id: "social-via-cli",
                title: "Usando CLI",
                intro:
                    "Temos ferramentas que geram parte do código para autenticação social.",
                bullets: [
                    "Se você usa Firebase e ativou corretamente os provedores, na prática não precisa fazer mais nada.",
                    "👉 Durante o setup do projeto, você será perguntado se quer adicionar login social.",
                    "Providers suportados: google, facebook, apple, googlePlay (outros ainda não suportados automaticamente).",
                ],
            },
            {
                id: "social-manual",
                title: "Fazendo manualmente",
                intro:
                    "Edite o arquivo lib/modules/authentication/api/authentication_api.dart e implemente os métodos do provedor desejado.",
                bullets: [
                    "A maioria dos provedores usa OAuth2. Se você não souber o que é, veja este vídeo do ByteByteGo: [OAuth2 explicado](https://www.youtube.com/watch?v=ZV5yTm4pT8g).",
                    "Depois adicione o método no repository em lib/modules/authentication/repositories/authentication_repository.dart.",
                    "Chame o método no state notifier da Signin Page: lib/modules/authentication/providers/signin_state_provider.dart.",
                    "Por fim, chame o método na sua view.",
                ],
            },
            {
                id: "social-google",
                title: "Google",
                intro:
                    "Google costuma ser o mais fácil de configurar via Firebase (vale conceito semelhante para Facebook e outros).",
                bullets: [
                    "No Firebase: Project > Authentication > Sign-in method > Google.",
                    "Ative o provedor.",
                    "Copie o client id (configure web SDK > ID client Web).",
                ],
            },
            {
                id: "social-google-mobile",
                title: "Setup no mobile",
                intro:
                    "Se aparecer erro de People API não utilizada, valide scopes e clientId no authentication_api.dart.",
                bullets: [
                    "Prefira passar GOOGLE_CLIENT_ID por variável de ambiente (IDE/CI).",
                    "Na primeira autenticação pode falhar até você ativar a People API.",
                    "Clique no link da mensagem de erro para ativar a API.",
                    "Evite commitar client id no código por segurança.",
                ],
                code: {
                    label: "signinWithGoogle (exemplo)",
                    language: "dart",
                    content: `@override\nFuture<Credentials> signinWithGoogle() async {\n  final loginResult = await GoogleSignIn(\n    clientId: env.googleClientId,\n    scopes: [\n      'email',\n      'https://www.googleapis.com/auth/contacts.readonly',\n    ],\n  ).signIn();\n\n  final googleAuth = await loginResult?.authentication;\n  final credentials = GoogleAuthProvider.credential(\n    accessToken: googleAuth?.accessToken,\n    idToken: googleAuth?.idToken,\n  );\n\n  return _auth.signInWithCredential(credentials).then(\n    (value) => Credentials(\n      id: value.user!.uid,\n      token: value.credential?.token.toString() ?? '',\n    ),\n  );\n}`,
                },
            },
            {
                id: "social-google-web",
                title: "Setup na web",
                intro:
                    "Adicione o client ID do projeto no arquivo web/index.html:",
                bullets: [
                    "YOUR_GOOGLE_OATH_KEY é o client id copiado do console.",
                ],
                code: {
                    label: "index.html",
                    language: "html",
                    content: `<meta name="google-signin-client_id" content="YOUR_GOOGLE_OATH_KEY.apps.googleusercontent.com">`,
                },
            },
        ],
        research: [
            "firebase social auth flutter",
            "google signin flutter firebase",
            "oauth2 social login mobile",
        ],
    },
    {
        id: "flutter-auth-phone-firebase",
        title: "Auth de telefone do Firebase",
        summary: "Configuração de autenticação por telefone com Firebase no ApparenceKit.",
        tag: "Flutter",
        readTime: "6 min",
        sections: [
            {
                id: "intro-phone-firebase",
                title: "Setup Firebase phone authentication no ApparenceKit",
                intro:
                    "Este guia ajuda a instalar autenticação por telefone do Firebase com nosso template.",
                bullets: [
                    "Por padrão, o fluxo de autenticação por telefone já é gerado no template.",
                    "Antes de autenticar com Firebase phone auth, é necessário fazer algumas configurações.",
                ],
            },
            {
                id: "cuidado-phone-auth",
                title: "💡 Use phone auth com cuidado",
                intro:
                    "Autenticação por telefone parece ótima, mas precisa ser usada com cautela.",
                bullets: [
                    "Em alguns países, SMS é caro e pode ser explorado de forma maliciosa.",
                    "Verifique o preço de SMS nos países-alvo.",
                    "Recomendação: tenha um método secundário de autenticação (como e-mail) para poder alternar se necessário.",
                ],
            },
            {
                id: "ativar-phone-auth-firebase",
                title: "Ative Firebase phone authentication",
                intro: "No Firebase Console:",
                bullets: [
                    "Selecione seu projeto.",
                    "Abra a seção Authentication.",
                    "Clique na aba Sign-in method.",
                    "Habilite o método Phone.",
                ],
            },
            {
                id: "android-phone-auth",
                title: "Setup Android",
                intro:
                    "👉 Firebase phone auth exige Play Integrity API ou reCAPTCHA.",
                bullets: [
                    "Siga a [documentação do Firebase para Android](https://firebase.google.com/docs/auth/android/phone-auth?hl=pt-br#enable-app-verification) para adicionar verificação de app (Play Integrity/reCAPTCHA).",
                ],
            },
            {
                id: "ios-phone-auth",
                title: "Setup iOS",
                intro:
                    "👉 Firebase phone auth exige adicionar um custom URL scheme no projeto Xcode.",
                bullets: [
                    "Siga a [documentação do Firebase para iOS](https://firebase.google.com/docs/auth/ios/phone-auth?hl=pt-br#set-up-recaptcha-verification) para configurar a verificação e o custom URL scheme no Xcode.",
                    "👉 Se ainda não estiver feito, adicione uma APN notification key no projeto Firebase.",
                    "O template já inclui a base de setup de notificações; consulte [Setup de notificações](topic:flutter-grow-setup-notifications) para criar a APN key.",
                ],
            },
            {
                id: "link-anon-phone",
                title: "Vincular usuário anônimo ao telefone",
                intro:
                    "Se o modo anônimo estiver habilitado, tentamos vincular o usuário anônimo ao número de telefone.",
                bullets: [
                    "Se o número já estiver em uso, fazemos login com esse número.",
                ],
            },
        ],
        research: [
            "firebase phone authentication flutter",
            "firebase play integrity recaptcha",
            "firebase phone auth ios url scheme",
        ],
    },
    {
        id: "flutter-auth-phone-supabase",
        title: "Auth de telefone do Supabase",
        summary: "Configuração de autenticação por telefone com Supabase no ApparenceKit.",
        tag: "Flutter",
        readTime: "6 min",
        sections: [
            {
                id: "intro-phone-supabase",
                title: "Setup Supabase phone authentication no ApparenceKit",
                intro:
                    "Este guia ajuda a instalar autenticação por telefone do Supabase com nosso template.",
                bullets: [
                    "Por padrão, o fluxo de phone auth já é gerado no template.",
                    "Antes de autenticar com Supabase phone auth, você precisa fazer algumas configurações.",
                ],
            },
            {
                id: "cuidado-phone-auth-supabase",
                title: "💡 Use phone auth com cuidado",
                intro:
                    "Autenticação por telefone pode ser ótima, mas precisa ser usada com cautela.",
                bullets: [
                    "Em alguns países, SMS é caro e pode ser explorado por usuários maliciosos.",
                    "Valide o custo de SMS nos países-alvo.",
                    "Recomendação: mantenha um método secundário de autenticação (como e-mail).",
                ],
            },
            {
                id: "ativar-phone-auth-supabase",
                title: "Ative Supabase phone authentication",
                intro: "No Supabase Dashboard:",
                bullets: [
                    "Selecione seu projeto.",
                    "Vá em Project Settings.",
                    "Abra a seção Authentication configuration.",
                    "Em General user signup, habilite o método Phone sign-in.",
                ],
            },
            {
                id: "escolher-provedor-sms",
                title: "Escolha um provedor de SMS",
                intro:
                    "O Supabase usa Twilio por padrão, mas você pode usar outros provedores.",
                bullets: [
                    "Alternativas: MessageBird, Vonage, Textlocal.",
                    "Sem provedor de SMS, você não conseguirá enviar SMS para os usuários.",
                ],
            },
            {
                id: "numero-teste-supabase",
                title: "Adicione um número de teste",
                intro:
                    "Você pode adicionar um número de teste no dashboard do Supabase para validar o fluxo.",
                bullets: [
                    "Formato: [numero]=[codigo_de_verificacao]",
                    "Exemplo: 33612345678=123456",
                ],
            },
            {
                id: "link-anon-phone-supabase",
                title: "Vincular usuário anônimo ao telefone",
                intro:
                    "Se o modo anônimo estiver habilitado, tentamos vincular o usuário anônimo ao número de telefone.",
                bullets: [
                    "Se o número já estiver em uso, fazemos login com esse número.",
                ],
            },
        ],
        research: [
            "supabase phone auth flutter",
            "supabase sms provider twilio",
            "supabase test phone number",
        ],
    },
    {
        id: "flutter-dev-architecture",
        title: "Arquitetura",
        summary: "Mindset arquitetural do ApparenceKit e estrutura recomendada para escalar.",
        tag: "Flutter",
        readTime: "12 min",
        sections: [
            {
                id: "intro-architecture",
                title: "Começando com a arquitetura do ApparenceKit",
                intro:
                    "A arquitetura fornecida é baseada na nossa experiência e opinião após anos construindo apps Flutter.",
                bullets: [
                    "Esse modelo evolui continuamente e a documentação é atualizada quando encontramos formas melhores de implementar.",
                    "A recomendação atual foca em criar apps profissionais, escaláveis e com o menor número possível de bugs em atualizações.",
                ],
            },
            {
                id: "why-architecture-matters",
                title: "Por que arquitetura importa",
                intro:
                    "Arquitetura é o que torna seu app sustentável no tempo.",
                bullets: [
                    "Melhora manutenção e escalabilidade.",
                    "Facilita testes e atualizações.",
                    "No longo prazo, economiza tempo e dinheiro.",
                    "O desafio é que exige trabalho inicial e/ou experiência para tomar boas decisões.",
                ],
            },
            {
                id: "architecture-mindset",
                title: "Mindset de arquitetura no ApparenceKit",
                intro: "A arquitetura segue os princípios abaixo:",
                bullets: [
                    "Separação de responsabilidades: cada parte do app tem responsabilidade única.",
                    "Testabilidade: cada parte deve ser testável.",
                    "Escalabilidade: o app precisa escalar sem problemas.",
                    "Manutenibilidade: o app precisa ser fácil de manter e atualizar.",
                    "Performance: o app precisa ser rápido e responsivo.",
                    "Modularidade: permitir atualizar/remover partes facilmente.",
                    "Reatividade: permitir atualização das partes do app quando necessário.",
                ],
            },
            {
                id: "architecture-overview",
                title: "Visão geral da arquitetura",
                intro: "A arquitetura do ApparenceKit é baseada em 3 camadas principais.",
                bullets: [],
            },
            {
                id: "data-layer",
                title: "1. Camada de dados (API layer)",
                intro:
                    "Responsável por buscar dados de qualquer fonte e fazer parse/serialização.",
                bullets: [
                    "Dependendo de servidor/Firebase/Supabase, você terá classes diferentes nessa camada.",
                    "Também é onde acessamos secured storage e plugins nativos.",
                    "É a única camada fora dos nossos testes unitários; validamos com testes de integração.",
                    "Nota: usamos Riverpod para injetar classes de API nos repositories.",
                ],
            },
            {
                id: "domain-layer",
                title: "2. Camada de domínio",
                intro:
                    "Responsável pela regra de negócio do app.",
                bullets: [
                    "Aqui tratamos dados da API e transformamos para a camada de apresentação.",
                    "Essa é a responsabilidade dos repositories.",
                    "Repositories são as únicas classes que comunicam com a API layer.",
                    "Um repository pode usar múltiplas APIs se necessário.",
                    "Nota: usamos Riverpod para injetar repositories na apresentação.",
                ],
            },
            {
                id: "presentation-layer",
                title: "3. Camada de apresentação (VIEW)",
                intro:
                    "Camada final, responsável por renderizar dados e tratar interação do usuário.",
                bullets: [
                    "Depende dos repositories para obter dados e executar ações.",
                    "Antes de codar nessa camada, é importante conhecer state management com Riverpod.",
                    "A view escuta um estado imutável vindo do notifier.",
                    "A view dispara ações que atualizam esse estado.",
                ],
            },
            {
                id: "project-structure",
                title: "Estrutura",
                intro:
                    "O template já vem com estrutura pronta, dividida em 2 pastas principais:",
                bullets: [
                    "core: contém camadas de dados/domínio e classes compartilhadas em todo app.",
                    "modules: contém as features do app.",
                    "Cada módulo é independente e pode ser removido/atualizado sem afetar outros módulos.",
                    "Módulos não se comunicam entre si diretamente; comunicam com a camada core.",
                ],
                code: {
                    label: "Estrutura de pastas",
                    language: "text",
                    content: `├── core\n│   ├── bottom_menu\n│   ├── data\n│   │   ├── api\n│   │   ├── entities\n│   │   └── models\n│   ├── guards\n│   ├── initializer\n│   │   └── models\n│   ├── rating\n│   ├── security\n│   ├── shared_preferences\n│   ├── states\n│   │   └── models\n│   └── widgets\n└── modules\n    └── module_1\n        ├── api\n        │   └── entities\n        ├── domain\n        ├── providers\n        │   └── models\n        ├── repositories\n        └── ui\n            ├── component\n            └── widgets`,
                },
            },
            {
                id: "global-states-core",
                title: "Estados globais (core)",
                intro:
                    "Apps modernos precisam de estados compartilhados entre módulos (ex.: usuário, assinatura).",
                bullets: [
                    "Por isso existe a pasta de estados globais em core/states.",
                    "Veja user_state_notifier.dart para um exemplo prático.",
                ],
            },
            {
                id: "app-initialization-core",
                title: "Inicialização do app (core)",
                intro:
                    "O app initializer é executado no start da aplicação.",
                bullets: [
                    "Ele inicializa serviços como shared preferences, security repository, user state etc., antes do app iniciar de fato.",
                    "Depois da inicialização, o app sabe para onde navegar.",
                    "Veja onstart_widget.dart em core/initializer para entender o fluxo.",
                    "Nota: classes chamadas pelo initializer devem implementar a interface OnStartService.",
                ],
            },
        ],
        research: [
            "flutter clean architecture",
            "riverpod architecture",
            "modular app structure flutter",
        ],
    },
    {
        id: "flutter-dev-routes-navigation",
        title: "Rotas e navegação",
        summary: "Estrutura de navegação com GoRouter, Bart, transições e guards.",
        tag: "Flutter",
        readTime: "8 min",
        sections: [
            {
                id: "routes-overview",
                title: "Routes and navigation",
                intro:
                    "A navegação global usa o pacote GoRouter.",
                bullets: [
                    "É um roteador simples e poderoso para definir rotas, navegar entre páginas e lidar com deep links.",
                    "Nesta estrutura de app temos duas camadas de navegação: top navigation e bottom navigation.",
                ],
            },
            {
                id: "top-navigation",
                title: "Top navigation",
                intro:
                    "A top navigation é definida em lib/router.dart.",
                bullets: [
                    "Você pode navegar com context.push('my_route').",
                    "👉 A rota precisa estar definida no arquivo lib/router.dart.",
                    "Nota: se a bottom navigation estiver visível, veja a seção de bottom navigation.",
                ],
                code: {
                    label: "Exemplo GoRoute",
                    language: "dart",
                    content: `GoRoute(\n  name: 'home',\n  path: '/',\n  builder: (context, state) => BottomMenu(),\n),`,
                },
            },
            {
                id: "bottom-navigation",
                title: "Bottom navigation",
                intro:
                    "A bottom navigation é definida em lib/core/bottom_menu/bottom_router.dart.",
                bullets: [
                    "Usamos o pacote Bart para navegação inferior conforme recomendações Apple e Google.",
                    "Dentro de uma página que pertence à aba atual, use Navigator.pushNamed('my_route').",
                    "👉 A rota precisa estar definida no lib/core/bottom_menu/bottom_router.dart.",
                ],
                code: {
                    label: "Rota interna do Bart",
                    language: "dart",
                    content: `BartMenuRoute.innerRoute(\n  path: 'my_route',\n  pageBuilder: (_, __, ___) => const MyPage(),\n),`,
                },
            },
            {
                id: "push-above-navbar",
                title: "Abrir página acima da barra de navegação",
                intro:
                    "Para abrir uma página acima da navigation bar (ex.: modal), use rootNavigator.",
                bullets: [
                    "👉 A rota deve estar definida em lib/router.dart.",
                    "Também é possível animar a bottom navigation bar e mostrar/ocultar top bar com animação.",
                    "Para mais detalhes sobre Bart, consulte a documentação do pacote.",
                ],
                code: {
                    label: "Push com rootNavigator",
                    language: "dart",
                    content: `Navigator.of(context, rootNavigator: true).pushNamed('my_route');`,
                },
            },
            {
                id: "page-transitions",
                title: "Transições de página",
                intro:
                    "As transições já vêm configuradas com recomendações nativas.",
                bullets: [
                    "Você pode alterar em lib/theme.dart por sistema operacional.",
                ],
                code: {
                    label: "PageTransitionsTheme",
                    language: "dart",
                    content: `pageTransitionsTheme: const PageTransitionsTheme(\n  builders: {\n    TargetPlatform.android: ZoomPageTransitionsBuilder(),\n    TargetPlatform.iOS: CupertinoPageTransitionsBuilder(),\n  },\n),`,
                },
            },
            {
                id: "route-guards",
                title: "Protegendo uma rota",
                intro:
                    "Você pode proteger rotas com guard: quando a condição falha, o usuário é redirecionado.",
                bullets: [
                    "Exemplo comum: redirecionar para login quando não autenticado.",
                    "Por padrão, o app inicia na home e redireciona para fluxo de autenticação se necessário.",
                    "Um guard é uma classe que usa a interface do widget Guard.",
                    "Exemplo: AuthenticatedGuard em lib/router.dart.",
                ],
                code: {
                    label: "Exemplo de rota com guard",
                    language: "dart",
                    content: `GoRoute(\n  name: 'home',\n  path: '/',\n  builder: (context, state) => const AuthenticatedGuard(\n    fallbackRoute: '/signup',\n    child: BottomMenu(),\n  ),\n),`,
                },
            },
            {
                id: "creating-guards",
                title: "Criando um guard",
                intro:
                    "Use o arquivo lib/core/guards/authenticated_guard.dart como referência para criar novos guards.",
                bullets: [],
            },
        ],
        research: [
            "go_router flutter",
            "flutter bottom navigation architecture",
            "route guards flutter",
        ],
    },
    {
        id: "flutter-dev-errors-monitoring",
        title: "Erros e monitoramento",
        summary: "Boas práticas para capturar erros, reportar falhas e melhorar a experiência do usuário.",
        tag: "Flutter",
        readTime: "7 min",
        sections: [
            {
                id: "errors-overview",
                title: "Errors and monitoring",
                intro:
                    "Tratamento de erros é algo essencial. Vale a pena dedicar tempo para estruturar isso corretamente no app.",
                bullets: [],
            },
            {
                id: "crash-reporting",
                title: "Ferramenta de crash e error reporting",
                intro:
                    "A recomendação principal é usar Sentry.",
                bullets: [
                    "A integração com Flutter é muito boa e fornece informações úteis para encontrar causa raiz de bugs.",
                    "Use a CLI para adicionar Sentry facilmente (normalmente já perguntamos isso no setup).",
                ],
                code: {
                    label: "Adicionar Sentry com CLI",
                    language: "bash",
                    content: `dart pub global run apparence_cli sentry .`,
                },
            },
            {
                id: "fail-fast-fail-safe",
                title: "Fail fast ou fail safe",
                intro:
                    "Defina o tipo de erro que você está enfrentando e a estratégia de reação.",
                bullets: [
                    "Nada frustra mais o usuário do que uma tela vermelha de erro.",
                    "Em erros anormais, exiba mensagem amigável dizendo que o erro foi registrado e sugerindo tentar novamente.",
                    "Exemplo: erro de autenticação em API é crítico; capture e explique ao usuário.",
                    "Fail fast: lançar erro assim que detectar anomalia.",
                    "Fail safe: tratar erro e mostrar feedback ao usuário para evitar frustração.",
                ],
            },
            {
                id: "base-api-error",
                title: "Erro base de API",
                intro:
                    "Se você usa API própria, trate erros com padrão estrito para facilitar o handling no app.",
                bullets: [
                    "Idealmente, mensagens de erro já vêm da API.",
                    "Confira: lib/core/data/api/base_api_exceptions.dart",
                    "Customize suas exceptions conforme necessário.",
                ],
                code: {
                    label: "Exemplo de exception",
                    language: "dart",
                    content: `class ApiError implements Exception {\n  ...\n}`,
                },
            },
            {
                id: "show-error-toast",
                title: "Exibir erro para o usuário",
                intro:
                    "Temos um helper simples para mostrar erro com toast animado no topo da aplicação.",
                bullets: [
                    "Isso ajuda em cenários com teclado aberto ou conteúdo bloqueando snackbars.",
                ],
                code: {
                    label: "Exemplo com showErrorToast",
                    language: "dart",
                    content: `ref\n  .read(signupStateProvider.notifier)\n  .signup()\n  .then((value) => Navigator.of(context).pushReplacementNamed('/'))\n  .catchError((err) {\n    showErrorToast(\n      context: context,\n      title: 'Erro',\n      text: (err as SignupException).message ?? '',\n    );\n    return err;\n  }, test: (err) => err is SignupException)\n  .catchError((err) {\n    showErrorToast(\n      context: context,\n      title: 'Erro',\n      text: 'Preencha e-mail e senha válidos',\n    );\n    return err;\n  });`,
                },
            },
        ],
        research: [
            "sentry flutter",
            "flutter error handling fail fast fail safe",
            "toast error handling flutter",
        ],
    },
    {
        id: "flutter-dev-unit-tests",
        title: "Escrevendo testes unitários",
        summary: "Guia prático de estratégia de testes no ApparenceKit (unit, widget e device tests).",
        tag: "Flutter",
        readTime: "12 min",
        sections: [
            {
                id: "unit-tests-intro",
                title: "Guia de Unit Tests",
                intro:
                    "Este guia é baseado na nossa experiência prática e no nosso modo de trabalho.",
                bullets: [
                    "Você pode adaptar para seu contexto (ou até não seguir), mas recomendamos fortemente testar.",
                ],
            },
            {
                id: "why-testing-matters",
                title: "Por que testar é importante",
                intro:
                    "Testes ajudam a encontrar bugs e regressões, além de melhorar código e arquitetura.",
                bullets: [
                    "Não tente testar tudo: foque cenários importantes para seu app.",
                    "100% de cobertura não significa app sem bugs.",
                    "A estratégia depende do contexto: POC, MVP ou app crítico.",
                ],
            },
            {
                id: "apparencekit-tests-mindset",
                title: "Testes no ApparenceKit",
                intro:
                    "Um teste unitário NÃO é teste de função isolada; é um teste isolado de cenário.",
                bullets: [
                    "Testes não devem depender de API, banco ou sistemas externos.",
                    "Por isso muita gente usa mocks; no nosso caso, preferimos fakes.",
                    "Exemplo: em vez de mock de SharedPreferences, usamos implementação fake.",
                ],
            },
            {
                id: "fake-vs-mock",
                title: "Por que fake em vez de mock?",
                intro:
                    "Queremos testar lógica de negócio, não refletir detalhes da implementação.",
                bullets: [
                    "Teste não deve quebrar por mudança interna de implementação.",
                    "Teste deve mudar apenas quando a regra de negócio muda.",
                    "Fakes tendem a ser mais simples de escrever/manter que mocks complexos.",
                ],
            },
            {
                id: "write-unit-test",
                title: "Como escrever um unit test",
                intro:
                    "Um padrão útil para nomear testes é: [contexto] -> [resultado esperado].",
                bullets: [
                    "Use nomes de teste legíveis e autoexplicativos.",
                    "Você também pode usar group para organizar por contexto.",
                ],
                code: {
                    label: "Exemplo de test e group",
                    language: "dart",
                    content: `void main() {\n  test('user is connected -> should throw an error', () {\n    // ...\n  });\n}\n\nvoid main() {\n  group('user is connected', () {\n    test('should throw an error', () {\n      // ...\n    });\n  });\n}`,
                },
            },
            {
                id: "examples-folder-tests",
                title: "Exemplos prontos",
                intro:
                    "Há vários exemplos na pasta de testes do projeto.",
                bullets: [
                    "Leia os testes existentes para entender padrão de escrita e organização.",
                ],
            },
            {
                id: "widget-test-pump-page",
                title: "Widget test com pumpPage",
                intro:
                    "Widget test usa o framework de testes Flutter para validar comportamento próximo do real.",
                bullets: [
                    "Criamos uma extensão AppWidgetTester em test/test-utils.dart.",
                    "Ela cria MaterialApp + Navigator.",
                    "Executa initializer como no main.dart.",
                    "Injeta fakes para APIs externas.",
                    "Permite override de dependências.",
                    "Permite definir UserState fake (usuário conectado ou anônimo).",
                ],
                code: {
                    label: "Exemplo com pumpPage",
                    language: "dart",
                    content: `testWidgets(\n  'user is not logged in => should not show any premium selection',\n  (tester) async {\n    await tester.pumpPage(\n      userState: const UserState(\n        subscription: Subscription.inactive(),\n        user: User.anonymous(),\n      ),\n      home: const PremiumPage(),\n    );\n\n    expect(find.byType(PremiumPageContent), findsNothing);\n    expect(find.byType(ActivePremiumContent), findsNothing);\n  },\n);`,
                },
            },
            {
                id: "pump-page-note",
                title: "Nota sobre test-utils",
                intro:
                    "Com essa abordagem, os testes ficam mais realistas e mais fáceis de manter.",
                bullets: [
                    "Você consegue testar fluxo com usuário conectado ou não.",
                    "Também pode sobrescrever dependências específicas.",
                    "Para detalhes, leia os comentários em test-utils.dart.",
                ],
            },
            {
                id: "tests-tips",
                title: "🔥 Dicas práticas",
                intro: "Boas práticas para melhorar qualidade e velocidade de entrega:",
                bullets: [
                    "Tente escrever o teste antes do código.",
                    "Evite rodar em dispositivo antes dos testes estarem verdes.",
                    "Refatore depois dos testes verdes.",
                    "Se não domina refatoração, leia M. Fowler (Refactoring).",
                    "Para cada bug encontrado: escreva teste que reproduz, corrija bug, mantenha teste na suíte.",
                ],
            },
            {
                id: "device-test-extension",
                title: "Device test extension",
                intro:
                    "Criamos DeviceTestExtension para facilitar testes em diferentes tamanhos de tela.",
                bullets: [
                    "Importe test/device_test_utils.dart.",
                    "Use para validar UI e detectar overflow em diferentes devices.",
                ],
                code: {
                    label: "Exemplo setScreenSize",
                    language: "dart",
                    content: `testWidgets('should show the page', (tester) async {\n  await tester.setScreenSize(iphone8Plus);\n  await tester.pumpWidget(MyApp());\n  expect(find.byType(MyPage), findsOneWidget);\n});`,
                },
            },
            {
                id: "device-variants",
                title: "Rodar múltiplos devices com variant",
                intro:
                    "Você pode rodar vários tamanhos pré-definidos dentro de um único teste usando variant.",
                bullets: [
                    "Ainda é válido usar integration tests para resultados mais completos.",
                    "Mas esse approach já é um ótimo começo e mais simples de usar.",
                ],
                code: {
                    label: "Exemplo com deviceVariants",
                    language: "dart",
                    content: `testWidgets('should show the page', (tester) async {\n  await tester.setScreenSize(deviceVariants.currentValue!);\n  await tester.pumpWidget(MyApp());\n  expect(find.byType(MyPage), findsOneWidget);\n}, variant: deviceVariants);`,
                },
            },
        ],
        research: [
            "flutter unit tests strategy",
            "flutter widget tests pump",
            "flutter device test variants",
        ],
    },
    {
        id: "flutter-dev-api-http",
        title: "API e requisições HTTP",
        summary: "Como o módulo de API/HTTP funciona no ApparenceKit e como criar chamadas.",
        tag: "Flutter",
        readTime: "7 min",
        sections: [
            {
                id: "api-http-introduction",
                title: "ApparenceKit API and HTTP requests module",
                intro:
                    "O ApparenceKit fornece arquitetura hexagonal para lidar com requisições HTTP e chamadas de API.",
                bullets: [
                    "👉 Por arquitetura, usamos chamadas HTTP apenas na camada de API.",
                    "A camada de API também pode chamar Firebase, Cloud Messaging, secured storage etc.",
                    "É a camada responsável por conversar com o mundo externo.",
                    "Consulte a [documentação de arquitetura](topic:flutter-dev-architecture) para mais detalhes.",
                ],
            },
            {
                id: "create-api-call",
                title: "Criar uma chamada de API",
                intro:
                    "ℹ️ Se você usa Firebase, não precisa de cliente DIO para isso (Firebase já fornece cliente pronto).",
                bullets: [
                    "Neste projeto usamos o pacote dio para requisições HTTP.",
                    "Há vários exemplos no código.",
                ],
                code: {
                    label: "Exemplo de chamada com Dio",
                    language: "dart",
                    content: `@override\nFuture<Credentials> signup(String email, String password) async {\n  try {\n    final response = await _client.post(\n      '/auth/signup',\n      data: {\n        'email': email,\n        'password': password,\n      },\n    );\n    return Credentials.fromJson(response.data as Map<String, dynamic>);\n  } on DioException catch (e, stackTrace) {\n    _logger.e(e, stackTrace: stackTrace);\n    throw ApiError.fromDioException(e);\n  } catch (e) {\n    _logger.e(e);\n    throw ApiError(\n      code: 0,\n      message: '$e',\n    );\n  }\n}`,
                },
            },
            {
                id: "inject-http-client",
                title: "Injetar cliente HTTP com Riverpod",
                intro:
                    "Para criar uma API, injete o client no provider via Riverpod.",
                bullets: [
                    "Esse client é um Dio com interceptors.",
                    "Exemplo: interceptor de autenticação que adiciona token em cada request quando o usuário está autenticado.",
                ],
                code: {
                    label: "Provider de API com httpClientProvider",
                    language: "dart",
                    content: `final authenticationApiProvider = Provider<AuthenticationApi>(\n  (ref) => HttpAuthenticationApi(\n    logger: Logger(),\n    client: ref.read(httpClientProvider),\n  ),\n);`,
                },
            },
            {
                id: "error-handling-api-http",
                title: "Tratamento de erros",
                intro:
                    "Usamos uma classe de erro customizada para padronizar o handling.",
                bullets: [
                    "Exemplo: ApiError.fromDioException(e).",
                    "Funciona muito bem quando backend retorna erros em formato uniforme.",
                    "É útil ter code, message e reason (o reason pode sugerir solução para usuário/frontend).",
                ],
            },
            {
                id: "using-firebase-api-layer",
                title: "Usando Firebase",
                intro:
                    "Com Firebase, você não precisa criar API HTTP manual para requests REST.",
                bullets: [
                    "Mesmo assim, encapsulamos métodos em APIs por vários motivos:",
                    "Facilita escrever testes.",
                    "Mantém arquitetura consistente para qualquer integração externa.",
                    "Permite adicionar lógica (tratamento de erro, logging etc.).",
                    "Esse padrão reduz custo de manutenção e acelera evolução dos testes.",
                ],
            },
        ],
        research: [
            "flutter dio best practices",
            "hexagonal architecture flutter",
            "riverpod dependency injection api layer",
        ],
    },
    {
        id: "flutter-dev-used-plugins",
        title: "Plugins usados",
        summary: "Principais plugins do projeto, com foco em estabilidade e uso em produção.",
        tag: "Flutter",
        readTime: "7 min",
        sections: [
            {
                id: "plugins-intro",
                title: "Plugins usados no ApparenceKit",
                intro:
                    "Abaixo estão os plugins mais importantes usados neste projeto.",
                bullets: [
                    "A lista não é exaustiva e depende dos módulos gerados via ApparenceCli.",
                    "A lista completa está no arquivo pubspec.yaml.",
                    "Recomendação: limite o número de plugins no projeto para reduzir conflitos.",
                    "Os plugins usados aqui são bem mantidos, amplamente usados e validados em produção.",
                ],
            },
            {
                id: "plugins-list",
                title: "Lista principal de plugins",
                intro: "Resumo dos principais plugins e seus papéis:",
                bullets: [
                    "Riverpod: gerenciamento de estado avançado para Flutter.",
                    "Bart: roteamento com bottom bar (navegação inferior).",
                    "flutter_animate: melhora o sistema de animações e facilita animações complexas.",
                    "dio: cliente HTTP com interceptors e extensões úteis.",
                    "intl: pacote oficial para localização (strings, datas etc.).",
                    "firebase_messaging: pacote oficial para push notifications.",
                    "flutter_local_notifications: notificações locais, agendamento e customização.",
                    "firebase_core: inicialização do Firebase no app.",
                    "json_annotation: geração de serialização/desserialização JSON.",
                    "freezed: geração de classes imutáveis e utilitários (copyWith etc.).",
                    "google_fonts: uso de fontes do catálogo Google Fonts.",
                    "build_runner: ferramenta oficial de code generation (usada por freezed/json_annotation e outras).",
                    "Consulte o pubspec.yaml para a lista completa.",
                ],
            },
        ],
        research: [
            "riverpod flutter",
            "dio flutter",
            "freezed json_annotation build_runner",
        ],
    },
    {
        id: "flutter-dev-code-generation",
        title: "Geração de código",
        summary: "Como e quando usar code generation no Flutter com Freezed/JsonSerializable.",
        tag: "Flutter",
        readTime: "6 min",
        sections: [
            {
                id: "codegen-intro",
                title: "Flutter Code generation",
                intro:
                    "Flutter depende bastante de geração de código, e isso economiza muito tempo no desenvolvimento.",
                bullets: [
                    "Você verá classes com anotações como @freezed e @JsonSerializable.",
                    "Quando alterar essas classes, execute o build_runner para regenerar os arquivos.",
                    "Como usamos code generation em todo o projeto, esse passo é recorrente no fluxo de trabalho.",
                ],
            },
            {
                id: "why-codegen",
                title: "Por que usamos code generation",
                intro:
                    "Exemplo com @freezed: geração de toJson, fromJson, copyWith e outros utilitários.",
                bullets: [
                    "Freezed também garante imutabilidade, essencial no desenvolvimento moderno.",
                    "Isso reduz código manual e acelera manutenção.",
                ],
            },
            {
                id: "run-build-runner",
                title: "Como rodar build_runner",
                intro: "Para regenerar código uma vez:",
                bullets: [],
                code: {
                    label: "build_runner build",
                    language: "bash",
                    content: `dart pub run build_runner build --delete-conflicting-outputs`,
                },
            },
            {
                id: "run-build-runner-watch",
                title: "Como rodar build_runner em watch mode",
                intro: "Para regenerar automaticamente enquanto desenvolve:",
                bullets: [],
                code: {
                    label: "build_runner watch",
                    language: "bash",
                    content: `dart pub run build_runner watch --delete-conflicting-outputs`,
                },
            },
            {
                id: "when-run-build-runner",
                title: "Quando rodar build_runner",
                intro:
                    "Execute sempre que criar ou alterar classes com @freezed/@JsonSerializable.",
                bullets: [
                    "Outras bibliotecas também usam code generation.",
                    "Verifique sempre a documentação dos pacotes que estiver usando.",
                ],
            },
            {
                id: "freezed-example",
                title: "Exemplo de classe com Freezed",
                intro: "Exemplo básico:",
                bullets: [],
                code: {
                    label: "Classe Freezed",
                    language: "dart",
                    content: `part 'my_freezed_class.freezed.dart';\n\n@freezed\nclass MyFreezedClass with _$MyFreezedClass {\n  const factory MyFreezedClass({\n    required String name,\n    required int age,\n  }) = _MyFreezedClass;\n}`,
                },
            },
            {
                id: "codegen-note-apparencekit",
                title: "Nota no ApparenceKit",
                intro:
                    "No ApparenceKit, a ideia é manter o uso de code generation o mais simples possível e sem excesso de dependência.",
                bullets: [],
            },
        ],
        research: [
            "freezed flutter",
            "json_serializable flutter",
            "build_runner flutter",
        ],
    },
    {
        id: "flutter-dev-event-dispatcher",
        title: "Event Dispatcher",
        summary: "Sistema centralizado e tipado para publicar e escutar eventos globais no app.",
        tag: "Flutter",
        readTime: "8 min",
        sections: [
            {
                id: "event-dispatcher-overview",
                title: "Event Dispatcher Documentation",
                intro:
                    "O AppEventsDispatcher é um sistema centralizado de gerenciamento de eventos, com padrão type-safe baseado em streams.",
                bullets: [
                    "Em vez de acoplar componentes entre si, você publica um evento e interessados reagem.",
                    "Também é possível manter buffer de eventos para subscribers tardios.",
                    "Pode ser combinado com ConditionalWidgetsEvents para exibir widgets one-time (ex.: pedir avaliação, mostrar atualização).",
                    "Disponível em: lib/core/states/events_dispatcher.dart",
                ],
            },
            {
                id: "why-use-event-dispatcher",
                title: "Por que usar?",
                intro:
                    "Use o Event Dispatcher quando precisar de comunicação desacoplada e eventos pontuais no app.",
                bullets: [
                    "Disparar eventos one-time (rating, review, update prompt etc.).",
                    "Desacoplar componentes: emitir sem conhecer quem escuta.",
                    "Manter histórico: subscribers tardios acessam eventos recentes.",
                    "Filtro type-safe: escutar apenas tipos específicos.",
                    "Exemplo: ao concluir tarefa, publique evento para atualizar todas as listas de tarefas sem callback manual.",
                ],
            },
            {
                id: "event-dispatcher-pattern",
                title: "Pattern",
                intro:
                    "O dispatcher usa streams com broadcast, permitindo múltiplos listeners e buffer de eventos recentes.",
                bullets: [],
            },
            {
                id: "event-dispatcher-basic-usage",
                title: "Uso básico",
                intro: "Fluxo mínimo:",
                bullets: [
                    "1) Defina seu evento.",
                    "2) Publique o evento.",
                    "3) Escute o evento por tipo.",
                ],
                code: {
                    label: "Definir / publicar / escutar evento",
                    language: "dart",
                    content: `class MyCustomEvent extends AppEvent {\n  final String message;\n  MyCustomEvent(this.message);\n}\n\nref.publishAppEvent(MyCustomEvent("Hello!"));\n\nref.onAppEvent<MyCustomEvent>().listen((event) {\n  print(event.message);\n});`,
                },
            },
            {
                id: "conditional-widgets-events",
                title: "ConditionalWidgetsEvents",
                intro:
                    "Esse widget organiza múltiplos listeners no tree de widgets. O primeiro que responder ao evento será exibido/executado.",
                bullets: [
                    "👉 A ordem dos widgets importa.",
                ],
                code: {
                    label: "Exemplo com ConditionalWidgetsEvents",
                    language: "dart",
                    content: `class HomePage extends ConsumerWidget {\n  const HomePage({super.key});\n\n  @override\n  Widget build(BuildContext context, WidgetRef ref) {\n    return ConditionalWidgetsEvents(\n      eventWidgets: [\n        MaybeAskForRating(),\n        MaybeAskForReview(),\n        MaybeShowPremiumPage(),\n        MaybeShowUpdateBottomSheet(),\n        MaybeShowNotificationPermission(),\n      ],\n      child: YourAppContent(),\n    );\n  }\n}`,
                },
            },
            {
                id: "maybe-widget-example",
                title: "Escrevendo um Maybe widget",
                intro:
                    "Cada widget pode escutar um ou mais eventos e decidir se trata ou não o evento atual.",
                bullets: [
                    "Se o evento for do tipo esperado, execute ação e retorne true.",
                    "Se não for, retorne false para permitir próximo handler.",
                ],
                code: {
                    label: "Exemplo MaybeAskForReview",
                    language: "dart",
                    content: `class MaybeAskForReview implements MaybeShowWithRef {\n  MaybeAskForReview();\n\n  @override\n  Future<bool> handle(WidgetRef ref, AppEvent event) async {\n    if (event is! UserActionEvent) {\n      return false;\n    }\n    await ref.read(ratingApiProvider).showReviewDialog();\n    return true;\n  }\n}`,
                },
            },
            {
                id: "event-dispatcher-note",
                title: "Nota",
                intro:
                    "🧐 Esse código está disponível apenas após gerar um app com ApparenceKit.",
                bullets: [],
            },
        ],
        research: [
            "dart stream broadcast events",
            "flutter event bus pattern",
            "typed events flutter",
        ],
    },
    {
        id: "flutter-monetize-subscription-module",
        title: "Módulo de assinaturas",
        summary: "Configuração de assinaturas mobile com RevenueCat e integração com o template.",
        tag: "Flutter",
        readTime: "12 min",
        sections: [
            {
                id: "subscriptions-mobile-intro",
                title: "Assinaturas mobile",
                intro:
                    "Assinaturas in-app são uma das melhores formas de receita recorrente.",
                bullets: [
                    "Elas são gerenciadas pela App Store e Google Play.",
                    "Apple e Google cuidam de impostos e pagamentos, mas ficam com comissão (geralmente 30%, com possibilidade de 15% em programas específicos).",
                    "Você não pode usar Stripe (ou outro meio externo) para assinatura dentro do app; isso pode levar à rejeição ou bloqueio da conta.",
                ],
            },
            {
                id: "revenuecat-integration",
                title: "Integrando com RevenueCat",
                intro:
                    "Usamos RevenueCat para assinaturas e compras in-app.",
                bullets: [
                    "É uma solução robusta para permissões, trials e gestão de assinaturas.",
                    "Primeiro crie uma conta no [RevenueCat](https://www.revenuecat.com/).",
                    "Depois crie um app e siga o onboarding.",
                ],
            },
            {
                id: "why-subscription-manager",
                title: "Por que usar um gerenciador de assinaturas?",
                intro:
                    "App Store e Play Store são boas, mas têm limitações operacionais.",
                bullets: [
                    "Não há webhook simples e unificado para todos os eventos de renovação.",
                    "Não há painel único com todas as métricas.",
                    "Gestão de trial/permissões é mais limitada sem camada adicional.",
                    "Veja a [documentação do RevenueCat](https://www.revenuecat.com/docs/getting-started/quickstart).",
                    "No RevenueCat, o preço é baseado na receita (sem receita, normalmente sem custo).",
                ],
            },
            {
                id: "setup-template-subscriptions",
                title: "Como configurar com nosso template",
                intro:
                    "Com conta/app no RevenueCat criados e produtos nas lojas configurados, o template já está pronto para uso.",
                bullets: [
                    "Você não precisa instalar nada extra: ApparenceKit já vem preparado para RevenueCat.",
                    "Configure suas lojas como descrito na [documentação](https://www.revenuecat.com/docs/getting-started/quickstart). Faça apenas os passos 1, 2 e 3 (o passo 4 já está feito no template).",
                    "Copie as chaves Android/iOS em Settings > API keys.",
                    "Preencha revenueCatAndroidApiKey e revenueCatIOSApiKey no ambiente ou use RC_ANDROID_API_KEY/RC_IOS_API_KEY no CI/CD. Veja o tópico [Ambiente](topic:flutter-environment).",
                    "Configure [Apple App Store notifications](https://www.revenuecat.com/docs/platform-resources/server-notifications/apple-server-notifications) para sincronizar renovações e eventos.",
                    "Configure [Google Real-Time Developer Notifications](https://www.revenuecat.com/docs/platform-resources/server-notifications/google-server-notifications) para sincronizar renovações e eventos.",
                    "🤝 Com isso, você terá sistema de assinatura funcional no app.",
                ],
            },
            {
                id: "subscriptions-webhooks",
                title: "Integrando webhooks",
                intro:
                    "O RevenueCat fornece webhooks para eventos de assinatura.",
                bullets: [
                    "Por padrão, o template busca estado de assinatura no seu backend.",
                    "Você também pode buscar diretamente no RevenueCat.",
                    "Esse comportamento pode ser alterado em lib/modules/subscription/repositories/subscription_repository.dart.",
                    "O método get contém chamada ao backend e também uma alternativa (comentada) de leitura direta do RevenueCat.",
                    "Usar backend próprio permite cenários avançados (ex.: assinatura vitalícia gratuita para usuário específico).",
                ],
                code: {
                    label: "Método get (referência)",
                    language: "dart",
                    content: `Future<Subscription> get(String userId) async { ... }`,
                },
            },
            {
                id: "configure-webhook-subscriptions",
                title: "Configurar webhook",
                intro:
                    "🔥 O código de webhook já está disponível no boilerplate de Firebase Functions.",
                bullets: [
                    "Siga a [documentação](https://www.revenuecat.com/docs/integrations/webhooks) para configurar o webhook no dashboard do RevenueCat.",
                ],
            },
            {
                id: "testing-subscriptions",
                title: "Testando assinaturas",
                intro: "Valide compras em ambos os ambientes:",
                bullets: [
                    "Como testar compras no [iOS](https://www.revenuecat.com/docs/test-and-launch/sandbox/apple-app-store).",
                    "Como testar compras no [Android](https://www.revenuecat.com/docs/test-and-launch/sandbox/google-play-store).",
                ],
            },
            {
                id: "subscription-module-features",
                title: "Módulo de assinatura do ApparenceKit",
                intro: "O módulo inclui:",
                bullets: [
                    "Página de assinatura (ofertas).",
                    "Página de assinatura ativa (gestão).",
                    "Botão de recuperação/restauração de assinatura em outro dispositivo.",
                    "Estado de assinatura no app (veja UserStateNotifier em lib/core/states/user_state.dart).",
                    "O módulo exibe automaticamente a tela correta conforme estado da assinatura.",
                    "Customização de telas: lib/modules/subscriptions/ui/component/active_premium_content.dart e lib/modules/subscriptions/ui/component/premium_content.dart.",
                ],
            },
            {
                id: "listen-subscription-state",
                title: "Ler estado de assinatura do usuário",
                intro:
                    "Você pode escutar mudanças de assinatura em qualquer ponto do app via UserStateNotifier.",
                bullets: [],
                code: {
                    label: "Exemplo com UserStateNotifier",
                    language: "dart",
                    content: `final userState = ref.watch<UserStateNotifier>();\n_userState.subscription.map(\n  active: (state) => print('active'),\n  inactive: (state) => print('inactive'),\n  loading: () => print('loading'),\n);`,
                },
            },
            {
                id: "customize-subscription-state",
                title: "Customizar estado de assinatura",
                intro:
                    "Arquivos principais para ajustar lógica de assinatura:",
                bullets: [
                    "lib/core/states/user_state.dart",
                    "user_state_notifier.dart (mudanças de estado)",
                    "lib/core/models/user.dart (dados de assinatura no User)",
                    "user_repository (busca assinatura no backend)",
                    "O user_state_notifier inicia no start do app e escuta mudanças de assinatura.",
                ],
            },
            {
                id: "alternative-backend-subscriptions",
                title: "Solução 2 - Assinaturas no backend próprio",
                intro:
                    "Alternativamente, você pode usar plugin de in-app purchase diretamente (sem RevenueCat).",
                bullets: [
                    "Plugin: [in_app_purchase](https://pub.dev/packages/in_app_purchase).",
                    "Nesse caso, você pode remover RevenueCat do pubspec.yaml.",
                    "Não recomendamos esse caminho para a maioria dos times.",
                    "APIs Apple/Google diferem bastante e têm muitos casos de borda.",
                    "Soluções como RevenueCat simplificam esse cenário.",
                ],
            },
        ],
        research: [
            "revenuecat flutter subscriptions",
            "in app subscriptions ios android",
            "firebase functions revenuecat webhook",
        ],
    },
    {
        id: "flutter-monetize-paywalls",
        title: "Paywalls",
        summary: "Templates de paywall, A/B testing e criação de paywall customizado.",
        tag: "Flutter",
        readTime: "7 min",
        sections: [
            {
                id: "paywalls-intro",
                title: "Paywalls templates",
                intro:
                    "O ApparenceKit oferece diferentes paywalls para ajudar na monetização por assinatura.",
                bullets: [
                    "Esses layouts foram inspirados em apps líderes do mercado para maximizar conversão.",
                    "Eles já foram usados e customizados em apps reais com bons resultados.",
                    "A ideia é acelerar sua implementação com base pronta no template.",
                ],
            },
            {
                id: "available-paywalls",
                title: "Paywalls disponíveis",
                intro:
                    "Os paywalls ficam no módulo de assinatura, na PaywallFactory:",
                bullets: [
                    "Arquivo: lib/modules/subscription/ui/components/premium_page_factory.dart",
                    "Por padrão, há 3 opções:",
                    "basic: paywall básico com preços em linhas.",
                    "withSwitch: paywall com alternância entre plano com teste grátis e sem teste grátis.",
                    "basicRows: paywall com preços em linhas/rows.",
                ],
                code: {
                    label: "Trocar tipo de paywall",
                    language: "dart",
                    content: `final paywallFactory = PaywallFactory.basic; // altere aqui para trocar o paywall`,
                },
            },
            {
                id: "ab-testing-paywalls",
                title: "A/B testing de paywalls",
                intro:
                    "Para maximizar conversão, teste variações de paywall e compare performance.",
                bullets: [
                    "Você pode usar solução de remote config, como Firebase Remote Config.",
                ],
                code: {
                    label: "Selecionar paywall por Remote Config",
                    language: "dart",
                    content: `final configuredPaywall = ref\n  .read(remoteConfigApiProvider)\n  .subscription\n  .paywall;\n\nfinal paywallFactory = switch (configuredPaywall) {\n  'withSwitch' => PaywallFactory.withSwitch,\n  _ => PaywallFactory.basic,\n};`,
                },
            },
            {
                id: "create-own-paywall",
                title: "Crie seu próprio paywall",
                intro:
                    "Você pode montar seu paywall com os widgets fornecidos no template.",
                bullets: [
                    "Widgets em: lib/modules/subscription/ui/widgets/",
                    "ComparisonTableComponent: tabela comparativa entre free e premium.",
                    "FeatureLine: linha de feature com ícone (opcional).",
                    "SelectableCol: coluna selecionável para preços.",
                    "SelectableRow: linha selecionável para preços.",
                    "E outros componentes prontos.",
                ],
            },
            {
                id: "custom-paywall-steps",
                title: "Como criar um paywall custom",
                intro:
                    "Fluxo recomendado para criar seu layout próprio:",
                bullets: [
                    "Duplique um paywall existente.",
                    "Troque nome de classe e arquivo.",
                    "Customize usando os widgets fornecidos.",
                    "Adicione o novo tipo na PaywallFactory em premium_page_factory.dart.",
                    "Selecione o novo paywall no PremiumPage.",
                    "Teste combinações de paywall + preço + textos para otimizar conversão.",
                ],
            },
            {
                id: "paywall-related-docs",
                title: "Documentação relacionada",
                intro: "Consulte também:",
                bullets: [
                    "[Módulo de assinaturas](topic:flutter-monetize-subscription-module).",
                ],
            },
        ],
        research: [
            "flutter paywall design",
            "ab testing paywalls",
            "firebase remote config flutter",
        ],
    },
    {
        id: "flutter-monetize-ads-module",
        title: "Módulo de anúncios",
        summary: "Configuração do AdMob e estratégias de exibição de anúncios no app.",
        tag: "Flutter",
        readTime: "6 min",
        sections: [
            {
                id: "ads-intro",
                title: "Monetize seu app com Ads",
                intro:
                    "Para usar AdMob, você precisa publicar uma primeira versão do app.",
                bullets: [
                    "Crie sua conta no [Google AdMob](https://admob.google.com/home/).",
                    "Pode parecer estranho, mas sem app publicado você não consegue concluir setup no AdMob.",
                ],
            },
            {
                id: "configure-ads-provider",
                title: "Configure o provider de AdMob",
                intro:
                    "Para facilitar o uso de anúncios, o template já inclui um provider.",
                bullets: [
                    "Descomente as linhas relacionadas no arquivo lib/core/ads/ads_provider.dart.",
                    "Atualize no ambiente de produção: androidInterstitialAdUnitId e iosInterstitialAdUnitId com os IDs do AdMob.",
                    "Não altere os IDs de desenvolvimento (já estão com test ads).",
                    "👌 No futuro haverá comando CLI para automatizar esse setup.",
                ],
            },
            {
                id: "show-ad",
                title: "Exibir anúncio",
                intro:
                    "Após criar o app no AdMob e configurar plugin/provider, você pode exibir anúncios.",
                bullets: [
                    "Use showIfElapsedTime para evitar mostrar anúncio com frequência excessiva.",
                    "Ou use show() para exibir diretamente quando necessário.",
                ],
                code: {
                    label: "Exibir anúncio com timer",
                    language: "dart",
                    content: `// você precisa de uma referência ao Ref do Riverpod\nref\n  .read(googleAdsProvider.notifier)\n  .showIfElapsedTime(secondsSinceLastAds: 60);`,
                },
            },
            {
                id: "show-ad-direct",
                title: "Exibição direta",
                intro: "Se quiser exibir imediatamente:",
                bullets: [],
                code: {
                    label: "Exibir anúncio direto",
                    language: "dart",
                    content: `// você precisa de uma referência ao Ref do Riverpod\nref\n  .read(googleAdsProvider.notifier)\n  .show();`,
                },
            },
            {
                id: "ads-best-practices",
                title: "Boas práticas",
                intro:
                    "Algumas práticas úteis de uso contínuo com AdMob:",
                bullets: [
                    "Nunca use test ads em produção.",
                    "Prefira interstitial em vez de banner (geralmente melhor retorno e experiência).",
                    "Use método com timer para não irritar usuários com excesso de anúncios.",
                    "Adicione tags para rastrear desempenho de anúncios no console do AdMob.",
                ],
            },
            {
                id: "ads-extra-info",
                title: "Informação adicional",
                intro:
                    "Consulte também a [documentação oficial do plugin google_mobile_ads](https://pub.dev/packages/google_mobile_ads).",
                bullets: [],
            },
        ],
        research: [
            "google admob flutter",
            "flutter interstitial ads",
            "admob best practices mobile apps",
        ],
    },
    {
        id: "flutter-grow-rating-review",
        title: "Avaliações e reviews",
        summary: "Estratégias para pedir avaliação no momento certo sem prejudicar experiência.",
        tag: "Flutter",
        readTime: "9 min",
        sections: [
            {
                id: "rating-when-to-ask",
                title: "Rating",
                intro:
                    "Peça avaliação apenas depois que o usuário demonstrar engajamento no app.",
                bullets: [
                    "Exemplo: após concluir fase, tarefa de produtividade ou objetivo relevante.",
                    "Nunca peça avaliação na primeira abertura ou durante onboarding.",
                    "Dê tempo suficiente para o usuário formar opinião.",
                    "Como Apple e Google não permitem forçar review, o foco é pedir no melhor momento possível.",
                ],
            },
            {
                id: "rating-options",
                title: "Opções de solicitação",
                intro: "Você pode usar duas abordagens:",
                bullets: [
                    "Popup nativo de avaliação in-app (Android/iOS).",
                    "Abrir página da loja (store listing) - mais invasivo.",
                ],
            },
            {
                id: "open-store-listing",
                title: "Abrir store listing",
                intro:
                    "Essa opção não tem quota rígida, mas tende a ser mais incômoda para o usuário.",
                bullets: [
                    "Popup de rating exige menos esforço do usuário.",
                    "Store listing normalmente pede mais esforço e converte pior.",
                ],
            },
            {
                id: "rate-banner-widget",
                title: "RateBanner widget",
                intro:
                    "Para melhor experiência, o kit inclui um banner que pede avaliação de forma amigável.",
                bullets: [
                    "O widget só aparece quando condições são atendidas.",
                    "delayBeforeAsking: tempo desde autenticação do usuário.",
                    "delayBeforeAskingAgain: tempo após clicar em “mais tarde”.",
                    "Você pode customizar tudo; por padrão vem do objeto de ambiente.",
                    "Você pode sobrescrever esses parâmetros direto no widget.",
                    "Veja os testes em /test/core/rating/rating_banner_test.dart.",
                    "👉 Recomendação: use popup OU store listing, não os dois ao mesmo tempo.",
                ],
            },
            {
                id: "rating-related-articles",
                title: "Artigos relacionados",
                intro: "Links úteis sobre pedido de avaliação:",
                bullets: [
                    "Boas práticas de momento/contexto para pedir review: [Batch guide](https://doc.batch.com/guides-and-best-practices/message/in-app-messaging/how-to-ask-users-for-an-app-review).",
                    "Regras da Apple para ratings e reviews: [Apple documentation](https://developer.apple.com/app-store/ratings-and-reviews/).",
                    "Plugin alternativo de diálogo de avaliação: [rating_dialog no pub.dev](https://pub.dev/packages/rating_dialog).",
                ],
            },
            {
                id: "in-app-popup-limits",
                title: "In-app rating popup",
                intro: "Entenda limites das plataformas:",
                bullets: [
                    "iOS: não é possível solicitar rating direto mais de 3 vezes em 365 dias.",
                    "Android: Google Play aplica quota temporal; chamar launchReviewFlow repetidamente pode não abrir diálogo.",
                    "A quota específica no Android pode mudar sem aviso.",
                ],
            },
            {
                id: "pre-request-popup",
                title: "Pré-request popup",
                intro:
                    "Para evitar exceder quota, criamos um popup prévio que só chama o popup nativo se o usuário aceitar.",
                bullets: [
                    "Você não deve influenciar/manipular o usuário para avaliar positivamente.",
                    "Esse popup pergunta se o usuário tem alguns segundos para avaliar antes de abrir o fluxo nativo.",
                    "Referência: lib/core/rating/widgets/rate_popup.dart",
                ],
                code: {
                    label: "Exemplo de chamada",
                    language: "dart",
                    content: `showRatingPopup(WidgetRef ref) { ... }`,
                },
            },
            {
                id: "pre-request-behavior",
                title: "Comportamento do controle",
                intro:
                    "Você pode chamar de qualquer widget com Riverpod sem se preocupar em spam.",
                bullets: [
                    "Salva última data de solicitação e resposta do usuário.",
                    "Não mostra novamente se o usuário viu recentemente (delay configurável).",
                    "Não mostra novamente se o usuário já respondeu “Sim”.",
                    "Veja detalhes em lib/core/rating/models/rating.dart.",
                    "✅ Bom: “Você tem um minuto para avaliar nosso app na loja?”",
                    "❌ Ruim: “Ganhe algo avaliando”, “Deixe review positivo”, “Avalie para continuar usando”.",
                ],
            },
        ],
        research: [
            "in app review best practices",
            "apple app store ratings and reviews",
            "flutter rating dialog",
        ],
    },
    {
        id: "flutter-grow-setup-notifications",
        title: "Setup de notificações",
        summary: "Configuração completa de push notifications com Firebase no ApparenceKit.",
        tag: "Flutter",
        readTime: "12 min",
        sections: [
            {
                id: "notifications-intro",
                title: "Setup push notifications no Flutter com ApparenceKit",
                intro:
                    "Antes de começar, você precisa ter projeto Firebase e setup inicial do ApparenceKit concluídos.",
                bullets: [
                    "Voltar à [Visão geral](topic:flutter-overview).",
                    "Usamos [firebase_messaging](https://pub.dev/packages/firebase_messaging) para push notifications.",
                    "Artigo completo: [Handle push and locale notifications](https://apparencekit.dev/blog/flutter-notifications-push-and-locale/).",
                    "Vídeo: [Understanding notifications with Flutter](https://www.youtube.com/watch?v=-v2BvueVrTw).",
                ],
            },
            {
                id: "notifications-how-it-works",
                title: "Como funciona",
                intro: "Fluxo resumido do módulo de notificações:",
                bullets: [
                    "Ao iniciar o app, pedimos permissão de notificações.",
                    "Se usuário aceitar, registramos o token no backend.",
                    "Inicializamos firebase_messaging e flutter_local_notifications.",
                    "Escutamos refresh de token e atualizamos backend.",
                    "Foreground: exibimos local notification; background: Firebase exibe automaticamente.",
                    "Se o app abre por notificação, aguardamos o app ficar pronto e tratamos a ação.",
                    "No logout, removemos/desregistramos o token do backend.",
                ],
            },
            {
                id: "notifications-plugins",
                title: "Plugins",
                intro: "O setup depende destes dois pacotes:",
                bullets: [
                    "[firebase_messaging](https://pub.dev/packages/firebase_messaging)",
                    "[flutter_local_notifications](https://pub.dev/packages/flutter_local_notifications)",
                ],
            },
            {
                id: "notifications-android-setup",
                title: "🤖 Android setup",
                intro:
                    "No Android, o setup básico já é feito automaticamente pelo ApparenceKit.",
                bullets: [],
            },
            {
                id: "notifications-ios-setup",
                title: "🍏 iOS setup",
                intro:
                    "Para push com Firebase no iOS, você precisa gerar uma chave APNs no Apple Developer.",
                bullets: [
                    "Acesse o [Apple Developer Member Center](https://idmsa.apple.com/IDMSWebAuth/signin?appIdKey=891bd3417a7776362562d2197f89480a8547b108fd934911bcbea0110d07f757&path=%2Faccount%2F&rv=1) e faça login.",
                    "Em Certificates, Identifiers & Profiles, abra Keys.",
                    "3 - Clique no botão '+' para criar nova key.",
                    "Veja também: [firebase_messaging no pub.dev](https://pub.dev/packages/firebase_messaging).",
                ],
                image: {
                    src: "/images/screen-light-1.png",
                    alt: "Criar nova chave APNs",
                    caption: "Passo 3: clique em '+' para criar a key APNs.",
                },
            },
            {
                id: "notifications-ios-register-download",
                title: "Registrar e baixar key APNs",
                intro:
                    "Depois de criar a key, registre e faça o download.",
                bullets: [
                    "4 - Defina nome e marque Apple Push Notifications Service (APNS).",
                    "5 - Clique em Register.",
                    "7 - Depois faça o download da key.",
                    "Guarde esse arquivo com segurança (download único e limite de chaves).",
                ],
                image: {
                    src: "/images/screen-dark-1.png",
                    alt: "Registrar e baixar chave APNs",
                    caption: "Passos 5 e 7: registrar e baixar a chave APNs.",
                },
            },
            {
                id: "notifications-upload-firebase",
                title: "Upload da key no Firebase",
                intro:
                    "Com a key em mãos, faça upload no Firebase:",
                bullets: [
                    "1 - Abra seu projeto no Firebase.",
                    "2 - Clique em Project settings.",
                    "3 - Abra a aba Cloud Messaging.",
                    "4 - Clique em Upload your APNs authentication key.",
                    "5 - Selecione o arquivo e clique em upload.",
                    "6 - Informe key id e team id.",
                ],
                image: {
                    src: "/images/flutter-ios-signing-config.png",
                    alt: "Upload de chave APNs no Firebase",
                    caption: "Passo 4: upload da APNs authentication key no Firebase.",
                },
            },
            {
                id: "notifications-related-links",
                title: "Links relacionados",
                intro: "Referências rápidas:",
                bullets: [
                    "[firebase_messaging](https://pub.dev/packages/firebase_messaging)",
                    "[Artigo completo sobre push e locale](https://apparencekit.dev/blog/flutter-notifications-push-and-locale/)",
                    "[Vídeo: Understanding notifications with Flutter](https://www.youtube.com/watch?v=-v2BvueVrTw)",
                ],
            },
        ],
        research: [
            "firebase messaging flutter",
            "flutter local notifications",
            "apple apns key firebase",
        ],
    },
    {
        id: "flutter-grow-send-notifications",
        title: "Enviar notificações",
        summary: "Envio de notificações remotas e locais no Flutter com ApparenceKit.",
        tag: "Flutter",
        readTime: "10 min",
        sections: [
            {
                id: "send-notifications-overview",
                title: "Como enviar notificações no Flutter com ApparenceKit",
                intro:
                    "Notificações remotas são enviadas pelo backend usando Firebase Cloud Messaging.",
                bullets: [
                    "Não se preocupe: o ApparenceKit já traz um fluxo simples para envio.",
                ],
            },
            {
                id: "remote-notifications-supabase",
                title: "☁️ Usando backend Supabase",
                intro:
                    "Para enviar notificação para um usuário, você pode criar o objeto Notification e salvar.",
                bullets: [
                    "content é título/corpo da notificação.",
                    "creation_date é data/hora de criação.",
                    "data é opcional e pode carregar metadados para filtros/ações.",
                    "supabase é o client do Supabase.",
                    "Nota: locale do usuário está disponível na entidade user (propriedade locale).",
                    "👉 Ao salvar, a notificação é persistida e enviada automaticamente (trigger no insert da tabela notifications).",
                    "Se preferir, você pode enviar direto com send() sem salvar no banco.",
                ],
                code: {
                    label: "Enviar com Supabase",
                    language: "typescript",
                    content: `const notification = Notification.fromData({\n  userId: user_id,\n  content: new TextNotificationContent(\n    translate({ key: "tile_removed", language: userInfo.language }),\n    translate({ key: "tile_removed_description", language: userInfo.language }),\n  ),\n  creation_date: new Date(),\n  data: {\n    type: "MY_NOTIFICATION_TYPE",\n  },\n}, supabase);\n\nawait notification.save();\n\n// ou enviar direto (sem salvar)\nawait notification.send();`,
                },
            },
            {
                id: "translations-notifications",
                title: "📦 Traduções",
                intro:
                    "As traduções ficam em _core/translations.ts e você pode adicionar novas chaves normalmente.",
                bullets: [
                    "key: chave da tradução.",
                    "language: idioma.",
                    "params: parâmetros dinâmicos.",
                    "👉 Se não encontrar tradução, retorna o idioma padrão (en).",
                ],
                code: {
                    label: "Exemplo de traduções",
                    language: "typescript",
                    content: `const translations: Translations = {\n  "en": {\n    "tile_removed": "Oh no! You lost a building!",\n  },\n};\n\nconst translation = translate({ key: "tile_removed", language: "en" });`,
                },
            },
            {
                id: "translation-params",
                title: "Parâmetros em traduções",
                intro:
                    "Use params para inserir valores dinâmicos no texto da notificação.",
                bullets: [
                    "Exemplo: nome do usuário, nome de plano, valor promocional etc.",
                ],
                code: {
                    label: "Exemplo com params",
                    language: "typescript",
                    content: `const translations: Translations = {\n  "en": {\n    "hello": "Hello {name}!",\n  },\n};\n\nconst translation = translate({\n  key: "hello",\n  language: "en",\n  params: { name: "John" },\n});\n// Resultado: "Hello John!"`,
                },
            },
            {
                id: "remote-notifications-firebase-provider",
                title: "🔥 Usando backend Firebase provider",
                intro:
                    "Também é possível enviar via notificationsApi no backend Firebase.",
                bullets: [
                    "Primeiro parâmetro: array de userIds.",
                    "Segundo parâmetro: conteúdo da notificação (title/body).",
                    "A notificação será salva e enviada automaticamente (se houver device token válido).",
                ],
                code: {
                    label: "Enviar com Firebase provider",
                    language: "typescript",
                    content: `import { notificationsApi } from "../notifications/notifications_api";\n...\n\nawait notificationsApi.notify(\n  [userId],\n  <SystemNotificationParams>{\n    title: "Subscription saved",\n    body: "Thank you",\n  },\n);`,
                },
            },
            {
                id: "local-notifications",
                title: "Agendar notificações locais",
                intro:
                    "Notificações locais são agendadas no dispositivo e não exigem backend.",
                bullets: [
                    "Nota: o usuário precisa conceder permissão para notificações funcionarem.",
                ],
                code: {
                    label: "Agendar notificação diária",
                    language: "dart",
                    content: `final localNotifier = ref.read(localNotifierProvider);\n\nlocalNotifier.scheduleDailyAt(\n  notificationId: 150000,\n  title: translations.dailyNotification.title,\n  body: translations.dailyNotification.body,\n  hour: reminder.hour,\n  minute: reminder.minute,\n);`,
                },
            },
            {
                id: "local-notifier-methods",
                title: "Métodos do local notifier",
                intro: "Além do agendamento diário, você tem:",
                bullets: [
                    "scheduleWeekly: agenda em dias específicos da semana.",
                    "scheduleAt: agenda para data/hora exata.",
                    "scheduleFromNow: agenda após um intervalo.",
                    "listPendingNotifications: lista agendamentos pendentes.",
                    "cancel: cancela por id.",
                    "cancelAll: cancela todos.",
                    "💡 O local notifier já lida com timezone automaticamente.",
                ],
            },
            {
                id: "handle-notification-tap",
                title: "Tratar ação de toque na notificação",
                intro:
                    "Para tratar tap em notificações, use o método onTap da classe Notification.",
                bullets: [
                    "Você pode reagir por tipo de notificação.",
                    "Também pode ler data para ações específicas.",
                    "Por padrão, notificações de link abrem a URL enviada em data.",
                ],
                code: {
                    label: "Exemplo onTap",
                    language: "dart",
                    content: `Future<void> onTap() async {\n  ...\n  if (type == NotificationTypes.LINK && data?.containsKey('url') == true) {\n    try {\n      launchUrl(Uri.parse(data!['url'] as String));\n    } catch (e, s) {\n      Logger().e("error $e");\n      Sentry.captureException(e, stackTrace: s);\n    }\n    return;\n  }\n  ...\n}`,
                },
            },
        ],
        research: [
            "firebase cloud messaging flutter",
            "flutter local notifications schedule",
            "notification deep link handling flutter",
        ],
    },
    {
        id: "flutter-grow-feedbacks",
        title: "Feedbacks",
        summary: "Módulo para coletar votos e sugestões dos usuários dentro do app.",
        tag: "Flutter",
        readTime: "7 min",
        sections: [
            {
                id: "feedback-module-overview",
                title: "Módulo de feedbacks",
                intro:
                    "O módulo de feedback é uma ótima forma de coletar opiniões dos usuários e priorizar melhorias.",
                bullets: [],
            },
            {
                id: "feedback-install",
                title: "Instalar",
                intro:
                    "Você será solicitado a instalar este módulo ao executar o comando de setup da CLI.",
                bullets: [
                    "O setup gera o app base com os módulos necessários.",
                    "Se ainda não configurou o projeto, veja [Instalação da CLI](topic:flutter-cli-installation).",
                ],
            },
            {
                id: "feedback-features",
                title: "Características",
                intro: "O módulo é composto por duas páginas principais:",
                bullets: ["Página de votação.", "Página de formulário de solicitação."],
            },
            {
                id: "feedback-voting-page",
                title: "Página de votação",
                intro:
                    "A página de votação permite que os usuários votem nas funcionalidades que querem ver no app.",
                bullets: [
                    "Isso ajuda a entender demanda real e priorizar backlog.",
                    "Cada funcionalidade exibida pode receber votos dos usuários.",
                ],
            },
            {
                id: "feedback-supabase",
                title: "Como adicionar recurso para votação com Supabase",
                intro:
                    "Para adicionar uma funcionalidade na votação, abra o painel do Supabase e adicione um registro na tabela feature_requests.",
                bullets: [
                    "Preencha nome e descrição da funcionalidade.",
                    "Nome e descrição usam tipo jsonb; adicione valor para cada idioma suportado.",
                    "A contagem de votos é incrementada automaticamente por trigger a cada novo voto.",
                    "Confirme que o script de setup criou esse trigger.",
                ],
                code: {
                    label: "Exemplo de campo jsonb",
                    language: "json",
                    content: `{\n  "en": "Your title"\n}`,
                },
                image: {
                    src: "/images/screen-light-1.png",
                    alt: "Adicionar nova linha na tabela feature_requests do Supabase",
                    caption:
                        "Adicione uma nova linha com o nome e a descrição da funcionalidade.",
                },
            },
            {
                id: "feedback-firebase",
                title: "Como adicionar recurso para votação com Firebase",
                intro:
                    "No Firebase, adicione um documento na coleção feature_requests com nome e descrição do recurso.",
                bullets: [
                    "Para cada idioma suportado, crie um campo com código do idioma como chave.",
                    "A contagem de votos também é incrementada automaticamente por trigger.",
                    "Garanta que o script de setup do backend foi executado.",
                ],
                image: {
                    src: "/images/screen-dark-1.png",
                    alt: "Adicionar documento na coleção feature_requests do Firebase",
                    caption:
                        "Adicione um novo documento com o nome e a descrição do recurso.",
                },
            },
            {
                id: "feedback-routes",
                title: "Rotas da página de feedback",
                intro:
                    "Você pode registrar as páginas no router e navegar por rota nomeada ou path.",
                bullets: [],
                code: {
                    label: "Exemplo de rotas",
                    language: "dart",
                    content: `GoRoute(\n  name: 'feedback',\n  path: '/feedback',\n  builder: (context, state) => const FeedbackPage(),\n),\nGoRoute(\n  name: 'feedback_new',\n  path: '/feedback/new',\n  builder: (context, state) => const AddFeatureComponent(),\n),`,
                },
            },
            {
                id: "feedback-navigation",
                title: "Navegação",
                intro: "Para abrir cada página, use:",
                bullets: [],
                code: {
                    label: "Abrir páginas de feedback",
                    language: "dart",
                    content: `context.go('/feedback');\ncontext.go('/feedback/new');`,
                },
            },
            {
                id: "feedback-where-to-show",
                title: "Onde exibir a página de feedback",
                intro:
                    "Recomendação: adicione acesso em Configurações e, principalmente, na página inicial do app.",
                bullets: [
                    "A home é onde o usuário passa mais tempo.",
                    "Quanto mais fácil o acesso, mais feedback você recebe.",
                    "Mais feedback gera melhoria contínua do produto.",
                ],
            },
        ],
        research: [
            "flutter feedback voting page",
            "supabase feature requests table",
            "firebase feature requests collection",
        ],
    },
    {
        id: "flutter-dashboard-installation",
        title: "Instalação",
        summary: "Setup do template de dashboard do ApparenceKit com Supabase.",
        tag: "Flutter",
        readTime: "10 min",
        sections: [
            {
                id: "dashboard-what-is",
                title: "Setup do template de dashboard do ApparenceKit",
                intro:
                    "O dashboard é um app web para gerenciar o conteúdo do seu app.",
                bullets: [
                    "Ele é exclusivo para quem tem acesso ao dashboard do ApparenceKit.",
                    "Não está disponível em todos os planos.",
                    "🔥 O ApparenceCli v5 configura o dashboard de ponta a ponta sem operação manual. Se você usar essa versão, pode pular boa parte do setup manual.",
                    "O dashboard está disponível apenas para projetos com Supabase.",
                ],
            },
            {
                id: "dashboard-prerequisite",
                title: "Pré-requisito",
                intro:
                    "Antes de começar, configure seu projeto Supabase com o template kickstarter.",
                bullets: [
                    "Se ainda não fez isso, veja [Setup com Supabase](topic:flutter-setup-supabase).",
                ],
            },
            {
                id: "dashboard-sql-setup",
                title: "1 - Deploy do arquivo SQL do dashboard",
                intro:
                    "Abra o repositório Supabase do ApparenceKit e execute o script de setup do dashboard.",
                bullets: [
                    "Repositório: [ApparenceKit-supabase](https://github.com/Apparence-io/ApparenceKit-supabase).",
                    "Abra o arquivo `supabase/dashboard-setup.sql`.",
                    "Copie o conteúdo e cole no SQL Editor do seu painel Supabase.",
                    "Execute o script.",
                    "Esse script cria as tabelas e permissões de acesso para leitura por admin.",
                ],
            },
            {
                id: "dashboard-token-hook",
                title: "2 - Deploy da função custom_access_token_hook",
                intro:
                    "Para usar o dashboard, além do SQL, você precisa configurar o hook de autenticação.",
                bullets: [
                    "No Supabase, vá em Authentication > Hooks (Beta).",
                    "Selecione a função postgres `custom_access_token_hook`.",
                    "Ative \"Customize Access Token claims hook\".",
                    "Não esqueça de deixar essa opção habilitada.",
                ],
                image: {
                    src: "/images/screen-light-1.png",
                    alt: "Customize Access Token claims hook no Supabase",
                    caption: "Ative a opção Customize Access Token claims hook.",
                },
            },
            {
                id: "dashboard-admin-user",
                title: "Criar usuário admin",
                intro:
                    "Depois do setup, crie um usuário administrador para acessar dados corretamente no dashboard.",
                bullets: [
                    "No Supabase, abra a aba Authentication.",
                    "Crie um usuário com e-mail e senha.",
                    "No Table Editor, abra a tabela `user_roles`.",
                    "Adicione uma linha com `user_id` e role `admin`.",
                    "Depois disso, faça login no dashboard com esse usuário.",
                ],
            },
            {
                id: "dashboard-campaigns",
                title: "Setup de campanhas de notificação",
                intro:
                    "O dashboard permite agendar campanhas de notificações usando a função `campaign` e CRON.",
                bullets: [
                    "As campanhas são cadastradas na tabela `notifications_campaigns`.",
                    "Antes disso, faça deploy da função `campaign`.",
                ],
                code: {
                    label: "Deploy da função campaign",
                    language: "bash",
                    content: `supabase functions deploy campaign`,
                },
            },
            {
                id: "dashboard-cron-extension",
                title: "2 - Habilitar extensão CRON",
                intro:
                    "Para disparar campanhas, configure um job CRON que execute a função periodicamente.",
                bullets: [
                    "No Supabase Dashboard, vá em Integrations.",
                    "Habilite a extensão CRON.",
                ],
            },
            {
                id: "dashboard-cron-job",
                title: "3 - Configurar job CRON",
                intro:
                    "Na extensão CRON instalada, clique em Add job e crie com os parâmetros abaixo:",
                bullets: [
                    "Name: send_notifications_campaigns (ou outro nome).",
                    "Schedule: * * * * * (a cada minuto).",
                    "Type: Supabase edge function.",
                    "Function: campaign.",
                ],
                image: {
                    src: "/images/screen-dark-1.png",
                    alt: "Configuração de job CRON para função campaign",
                    caption: "Selecione Type: Supabase edge function e Function: campaign.",
                },
            },
            {
                id: "dashboard-cron-auth-header",
                title: "Header de autenticação do job",
                intro:
                    "No campo Http header, adicione o header de autenticação com service key.",
                bullets: [
                    "Clique em \"Add a new header\".",
                    "Selecione \"Add auth header with service key\".",
                    "Finalize clicando em \"Create cron job\".",
                ],
                image: {
                    src: "/images/flutter-ios-signing-config.png",
                    alt: "Adicionar auth header com service key no CRON job",
                    caption:
                        "Em Http header, use Add a new header e Add auth header with service key.",
                },
            },
            {
                id: "dashboard-run",
                title: "Executar o dashboard",
                intro: "1) Clone o repositório do dashboard:",
                bullets: [
                    "Repositório: [apparencekit-dashboard](https://github.com/Apparence-io/apparencekit-dashboard).",
                ],
            },
            {
                id: "dashboard-run-env",
                title: "2) Rodar com variáveis de ambiente",
                intro:
                    "Como o dashboard é Flutter Web, execute com os `dart-define` do seu projeto Supabase.",
                bullets: [
                    "Você encontra URL e token no Supabase em Settings > API (URL e anon key).",
                    "No VSCode também é possível configurar via `.vscode/launch.json`.",
                ],
                code: {
                    label: "Rodar dashboard",
                    language: "bash",
                    content: `flutter run --dart-define=ENV=dev \\\n  --dart-define=BACKEND_URL=YOUR_SUPABASE_PROJECT_URL \\\n  --dart-define=SUPABASE_TOKEN=YOUR_SUPABASE_PROJECT_TOKEN`,
                },
            },
            {
                id: "dashboard-vscode-launch",
                title: "Configuração no VSCode (opcional)",
                intro:
                    "Abra `.vscode/launch.json` e adicione URL/token no campo args.",
                bullets: [],
                code: {
                    label: "launch.json",
                    language: "json",
                    content: `{\n  "name": "Supabase - Development",\n  "request": "launch",\n  "type": "dart",\n  "program": "lib/main.dart",\n  "args": [\n    "--dart-define=ENV=dev",\n    "--dart-define=BACKEND_URL=",\n    "--dart-define=SUPABASE_TOKEN="\n  ]\n}`,
                },
            },
            {
                id: "dashboard-build",
                title: "3) Build do dashboard",
                intro: "Para gerar build web do dashboard:",
                bullets: [],
                code: {
                    label: "Build web",
                    language: "bash",
                    content: `flutter build web --dart-define=ENV=dev \\\n  --dart-define=BACKEND_URL=YOUR_SUPABASE_PROJECT_URL \\\n  --dart-define=SUPABASE_TOKEN=YOUR_SUPABASE_PROJECT_TOKEN`,
                },
            },
        ],
        research: ["flutter dashboard installation"],
    },
    {
        id: "flutter-dashboard-create-table-view",
        title: "Criar visualização em tabela",
        summary: "Como exibir qualquer tabela de dados no dashboard do ApparenceKit em poucos minutos.",
        tag: "Flutter",
        readTime: "8 min",
        sections: [
            {
                id: "dashboard-table-view-overview",
                title: "Criar uma table view no dashboard do ApparenceKit",
                intro:
                    "Nosso dashboard permite visualizar facilmente qualquer tabela de dados em poucos minutos.",
                bullets: [
                    "Como adicionar uma tabela bruta no dashboard do ApparenceKit.",
                ],
            },
            {
                id: "dashboard-table-view-policy",
                title: "1 - Atualize a policy da tabela",
                intro:
                    "Primeiro, atualize a policy da tabela para permitir que usuários com role admin adicionem, leiam e atualizem nessa tabela.",
                bullets: [
                    "Você também pode liberar apenas leitura para admin se não houver nada para atualizar.",
                    "Substitua [YOUR TABLE] pelo nome da sua tabela.",
                ],
                code: {
                    label: "Exemplo de policies SQL",
                    language: "sql",
                    content: `-- Exemplo de policy de leitura\nCREATE POLICY "Users can select" ON public.[YOUR TABLE]\n  FOR SELECT TO public USING (auth.uid() = user_id OR (SELECT authorize('admin_all')));\n\n-- Exemplo de policy de insert apenas para admin\nCREATE POLICY "Enable insert for admin" ON public.[YOUR TABLE]\n  FOR INSERT with check ((SELECT authorize('admin_all')));`,
                },
            },
            {
                id: "dashboard-table-view-add-page",
                title: "2 - Adicione a página no dashboard",
                intro:
                    "Crie uma nova página no dashboard.",
                bullets: [
                    "Crie uma nova página em lib/modules/[your module]/ui.",
                    "Crie um novo widget nesse arquivo.",
                    "Adicione o código abaixo para mostrar os dados em uma table view.",
                ],
                code: {
                    label: "Exemplo de RawDataTableComponent",
                    language: "dart",
                    content: `RawDataTableComponent(\n    tableName: 'subscriptions', // troque para [YOUR TABLE]\n    orderBy: 'creation_date',\n    orderAscending: false,\n    showPagination: true, // exibir paginação (padrão: true)\n    showCheckbox: true, // adicionar checkbox para seleção (padrão: true)\n    showSearchBar: true, // adicionar barra de busca (padrão: true)\n    fields: [\n        Field.fromString(name: 'user_id'), // nome da coluna\n        Field.fromDateTime(name: 'creation_date'),\n        Field.fromDateTime(name: 'period_end_date'),\n        Field.fromString(name: 'sku_id'),\n        Field.fromString(name: 'store'),\n        Field.fromString(name: 'status'),\n    ],\n    actionsBuilder: (row) { // ações por linha\n        return [\n            IconButton(\n                onPressed: () => ..., // adicione sua ação aqui (ou remova)\n                icon: Icon(Icons.arrow_forward_ios, size: 14, color: context.colors.onSurface),\n            ),\n        ];\n    },\n)`,
                },
            },
            {
                id: "dashboard-table-view-menu",
                title: "3 - Adicione a página no menu do dashboard",
                intro: "Adicione a página ao menu do dashboard.",
                bullets: [
                    "Abra o arquivo lib/core/menu/widgets/sidebar_tabs.dart.",
                    "Adicione um novo item na lista de tabs.",
                ],
                code: {
                    label: "Item de menu na sidebar",
                    language: "dart",
                    content: `SideBarCategoryItem.fromPath(\n    context: context,\n    icon: HugeIcons.strokeRoundedInboxDownload,\n    title: 'User requests',\n    path: '/user-requests',\n    routerState: state,\n),`,
                },
            },
            {
                id: "dashboard-table-view-router",
                title: "4 - Adicione a rota no router do dashboard",
                intro: "Abra o arquivo lib/router.dart.",
                bullets: ["Adicione uma nova rota na lista de routes."],
                code: {
                    label: "Exemplo de rota",
                    language: "dart",
                    content: `StatefulShellBranch(\n    routes: [\n        GoRoute(\n            name: 'notifications',\n            path: '/notifications',\n            builder: (context, state) => YourNewPage(),\n        ),\n    ],\n),`,
                },
            },
            {
                id: "dashboard-table-view-done",
                title: "Pronto",
                intro:
                    "Pronto. Agora você consegue visualizar sua tabela no dashboard e também adicionar novas páginas no menu e no router.",
                bullets: [],
            },
        ],
        research: ["flutter dashboard table view"],
    },
    {
        id: "flutter-deploy-setup-icons-splashscreen",
        title: "Configurar ícones e splash screen",
        summary: "Configuração de ícones e splash screen para deploy.",
        tag: "Flutter",
        readTime: "6 min",
        sections: [
            {
                id: "deploy-splash-icon-overview",
                title: "Customize splashscreen and App icon",
                intro:
                    "Use os plugins [flutter_native_splash](https://pub.dev/packages/flutter_native_splash) e [flutter_launcher_icons](https://pub.dev/packages/flutter_launcher_icons).",
                bullets: [],
            },
            {
                id: "deploy-splashscreen",
                title: "Splashscreen",
                intro:
                    "Usamos o plugin flutter_native_splash para gerar a splash screen de iOS e Android.",
                bullets: [
                    "Esse plugin facilita a geração sem configuração manual.",
                    "Para personalizar, troque o arquivo assets/images/splashscreen.png pela sua imagem.",
                    "Abra o pubspec.yaml e ajuste a configuração.",
                ],
                code: {
                    label: "Configuração de splash no pubspec.yaml",
                    language: "yaml",
                    content: `flutter_native_splash:\n  color: "#FFFFFF"\n  fullscreen: true\n  ios: true\n  android: true\n  image: assets/images/splashscreen.png\n  android_12:\n    color: "#FFFFFF"`,
                },
            },
            {
                id: "deploy-splashscreen-generate",
                title: "Gerar splashscreen",
                intro: "Depois de alterar a imagem/configuração, execute:",
                bullets: ["Rode novamente após cada mudança de splash."],
                code: {
                    label: "Gerar splashscreen",
                    language: "bash",
                    content: `dart run flutter_native_splash:create`,
                },
            },
            {
                id: "deploy-app-icon",
                title: "App icon",
                intro:
                    "Usamos o plugin flutter_launcher_icons para gerar ícones de iOS e Android.",
                bullets: [
                    "Esse plugin simplifica o processo (manual costuma ser bem trabalhoso).",
                    "Para personalizar, troque o arquivo assets/images/app_icon.png pela sua imagem.",
                    "Abra o pubspec.yaml e ajuste o caminho do ícone.",
                ],
                code: {
                    label: "Configuração de ícone no pubspec.yaml",
                    language: "yaml",
                    content: `flutter_icons:\n  android: true\n  ios: true\n  image_path: "assets/images/app_icon.png"`,
                },
            },
            {
                id: "deploy-app-icon-generate",
                title: "Gerar app icon",
                intro: "Para gerar os ícones, execute:",
                bullets: [],
                code: {
                    label: "Gerar ícones",
                    language: "bash",
                    content: `dart run flutter_launcher_icons`,
                },
            },
        ],
        research: ["flutter app icons splashscreen"],
    },
    {
        id: "flutter-deploy-setup-flavors",
        title: "Configurar flavors",
        summary: "Configuração de flavors para ambientes e publicação.",
        tag: "Flutter",
        readTime: "9 min",
        sections: [
            {
                id: "deploy-flavors-overview",
                title: "Create flavors for your flutter app",
                intro:
                    "Flavor é um conjunto de configurações compiladas no app (nome, ícone, bundle id, etc.) para cada ambiente.",
                bullets: [
                    "Você pode ter dev, qa e prod com configurações diferentes.",
                    "ℹ️ Flavors é um recurso avançado; use somente se realmente precisar.",
                ],
            },
            {
                id: "deploy-flavors-android",
                title: "Android flavors",
                intro:
                    "Abra o arquivo android/app/build.gradle e ajuste a seção productFlavors.",
                bullets: [
                    "Adicione seu flavor customizado (ex.: qa).",
                    "Você também pode criar a pasta android/app/src/qa para arquivos específicos do flavor (ícones, splash, app name etc.).",
                ],
                code: {
                    label: "Exemplo productFlavors",
                    language: "gradle",
                    content: `flavorDimensions "release-type"\n\nproductFlavors {\n    dev {\n        dimension "release-type"\n        applicationIdSuffix ".dev"\n        versionNameSuffix "-dev"\n    }\n    prod {\n        dimension "release-type"\n    }\n    qa {\n        dimension "release-type"\n        applicationIdSuffix ".qa"\n        versionNameSuffix "-qa"\n    }\n}`,
                },
            },
            {
                id: "deploy-flavors-ios-open",
                title: "iOS flavors (schemes no Xcode)",
                intro: "Abra Runner.xcworkspace no Xcode.",
                bullets: [],
            },
            {
                id: "deploy-flavors-ios-config-file",
                title: "Criar arquivo de configuração",
                intro:
                    "Crie um novo arquivo em ios/Flutter e nomeie com o nome do flavor.",
                bullets: [],
                image: {
                    src: "/images/screen-light-1.png",
                    alt: "Criar arquivo de configuração de flavor no iOS",
                    caption:
                        "Create a new configuration file in ios/Flutter and name it after your flavor name.",
                },
            },
            {
                id: "deploy-flavors-ios-runner-target",
                title: "Selecionar Runner target",
                intro:
                    "Garanta que o target Runner está selecionado e que o arquivo será criado na pasta Flutter.",
                bullets: [],
                image: {
                    src: "/images/screen-dark-1.png",
                    alt: "Runner target selecionado no Xcode",
                    caption:
                        "Make sure that you have Runner target selected and your file will be placed in Flutter folder.",
                },
            },
            {
                id: "deploy-flavors-ios-xcconfig",
                title: "Conteúdo do arquivo .xcconfig",
                intro: "Cole o conteúdo abaixo no arquivo de configuração do flavor:",
                bullets: ["Substitua qa pelo nome do seu flavor."],
                code: {
                    label: "Arquivo xcconfig",
                    language: "text",
                    content: `#include "Pods/Target Support Files/Pods-Runner/Pods-Runner.qa.xcconfig"\n#include "Generated.xcconfig"\n#include "common.xcconfig"\n\napp_icon_suffix=-qa\nbundle_suffix=.qa\nIDENTIFIER=$(identifier)$(bundle_suffix)\nAPP_ICON=$(app_icon)$(app_icon_suffix)`,
                },
            },
            {
                id: "deploy-flavors-ios-duplicate-configs",
                title: "Duplicar Build Configurations",
                intro:
                    "Em Runner -> Project -> Runner -> Info, duplique Debug/Release/Profile para o novo flavor (Debug-qa, Release-qa, Profile-qa).",
                bullets: [
                    "Defina os arquivos de configuração corretos para cada configuração criada.",
                    "No final, deve ficar parecido com este exemplo.",
                ],
                image: {
                    src: "/images/flutter-ios-signing-config.png",
                    alt: "Duplicar configurações de build no Xcode",
                    caption: "In the end you should have something like this.",
                },
            },
            {
                id: "deploy-flavors-ios-create-scheme",
                title: "Criar novo Scheme",
                intro:
                    "Vá em Product -> Scheme -> New Scheme e crie um scheme com o nome do flavor.",
                bullets: [
                    "Garanta que o Runner target está selecionado.",
                    "No final, deve ficar parecido com este exemplo.",
                ],
                image: {
                    src: "/images/screen-light-1.png",
                    alt: "Criar novo scheme do flavor no Xcode",
                    caption: "In the end you should have something like this.",
                },
            },
            {
                id: "deploy-flavors-ios-edit-scheme",
                title: "Selecionar Build Configuration correto",
                intro:
                    "Vá em Product -> Scheme -> Edit Scheme e selecione a Build Configuration correta para cada etapa do scheme.",
                bullets: [],
                image: {
                    src: "/images/screen-dark-1.png",
                    alt: "Selecionar build configuration por scheme",
                    caption: "Select correct Build Configuration for each scheme.",
                },
            },
            {
                id: "deploy-flavors-icons",
                title: "Configuração de ícones por flavor",
                intro:
                    "Você pode usar ícones diferentes por flavor criando flutter_launcher_icons-{flavor}.yaml (ex.: flutter_launcher_icons-qa.yaml).",
                bullets: ["Depois, rode o comando de geração de ícones."],
                code: {
                    label: "Gerar ícones",
                    language: "bash",
                    content: `dart run flutter_launcher_icons`,
                },
            },
            {
                id: "deploy-flavors-vscode",
                title: "IDE Configuration - VSCode",
                intro: "No .vscode/launch.json, adicione uma configuração para o flavor:",
                bullets: [
                    "Depois você pode iniciar clicando em Run qa na aba de debug.",
                ],
                code: {
                    label: "launch.json (flavor qa)",
                    language: "json",
                    content: `{\n  "name": "Run qa",\n  "request": "launch",\n  "type": "dart",\n  "args": [\n    "--flavor",\n    "qa"\n  ]\n}`,
                },
                image: {
                    src: "/images/screen-light-1.png",
                    alt: "Executar flavor qa no VSCode",
                    caption: "Now you can launch app with qa flavor by clicking on Run qa in debug tab.",
                },
            },
            {
                id: "deploy-flavors-android-studio",
                title: "IDE Configuration - Android Studio",
                intro:
                    "Abra Run/Debug Configurations e adicione uma nova configuração Flutter.",
                bullets: ["No campo Build flavor, informe qa."],
                image: {
                    src: "/images/screen-dark-1.png",
                    alt: "Configurar build flavor no Android Studio",
                    caption:
                        "Open Run/Debug Configurations and add new Flutter configuration. In Build flavor field add qa.",
                },
            },
        ],
        research: ["flutter setup flavors"],
    },
    {
        id: "flutter-deploy-prepare-for-deployment",
        title: "Preparar para deploy",
        summary: "Checklist final antes da publicação.",
        tag: "Flutter",
        readTime: "6 min",
        sections: [
            {
                id: "deploy-prepare-overview",
                title: "Prepare seu app Flutter para deploy",
                intro:
                    "Antes de publicar, você precisa configurar seu app para produção.",
                bullets: [],
            },
            {
                id: "deploy-prepare-android-package",
                title: "Android",
                intro:
                    "Defina package name e bundle identifier do app (ex.: com.example.myapp).",
                bullets: [
                    "Evite espaços e caracteres especiais.",
                    "Apple e Google recomendam notação de domínio reverso.",
                    "Execute o comando abaixo para alterar package/bundle.",
                ],
                code: {
                    label: "Alterar package name",
                    language: "bash",
                    content: `dart run change_app_package_name:main com.example.myapp`,
                },
            },
            {
                id: "deploy-prepare-android-display-name",
                title: "Alterar nome do app (Android)",
                intro:
                    "Você pode alterar o nome exibido do app no AndroidManifest.xml.",
                bullets: [
                    "Abra android/app/src/main/AndroidManifest.xml.",
                    "Altere o valor de android:label para o nome do app.",
                ],
            },
            {
                id: "deploy-prepare-ios-open-xcode",
                title: "iOS",
                intro:
                    "Use o Xcode para configurar o app para produção.",
                bullets: [
                    "Se estiver no VSCode: clique com o botão direito na pasta iOS e escolha Open in Xcode.",
                    "No Xcode: Runner > Targets > Runner.",
                ],
            },
            {
                id: "deploy-prepare-ios-bundle-id",
                title: "Change the bundle identifier",
                intro: "Altere o bundle identifier do iOS no target Runner.",
                bullets: [
                    "Você pode usar o mesmo identificador base em Android e iOS.",
                    "O bundle identifier deve ser único na App Store e Google Play.",
                ],
                image: {
                    src: "/images/screen-light-1.png",
                    alt: "Alterar bundle identifier no iOS",
                    caption: "Change the bundle identifier.",
                },
            },
            {
                id: "deploy-prepare-ios-display-name",
                title: "Alterar nome do app (iOS)",
                intro:
                    "Você pode alterar o nome exibido no arquivo Info.plist.",
                bullets: [
                    "Altere CFBundleDisplayName para o nome do app.",
                    "Altere CFBundleName para o nome do app.",
                ],
                image: {
                    src: "/images/screen-dark-1.png",
                    alt: "Alterar display name no Info.plist",
                    caption: "You can change the app display name in the Info.plist file like this.",
                },
            },
        ],
        research: ["flutter deployment checklist"],
    },
    {
        id: "flutter-deploy-publish-google-play-store",
        title: "Publicar na Google Play Store",
        summary: "Publicação do app na Google Play Store.",
        tag: "Flutter",
        readTime: "8 min",
        sections: [
            {
                id: "deploy-play-overview",
                title: "Deploy do app Flutter Android na Google Play Store",
                intro:
                    "Vamos ver como publicar seu app Android na Google Play Store.",
                bullets: [],
            },
            {
                id: "deploy-play-signing-key",
                title: "Gerar chave para assinar o app",
                intro:
                    "Primeiro, gere uma chave para assinar seu app Android. Essa chave será usada em todas as futuras versões.",
                bullets: [
                    "Não perca essa chave, senão você não conseguirá atualizar o app depois.",
                ],
                code: {
                    label: "Gerar chave (keystore)",
                    language: "bash",
                    content: `keytool -genkey -v -keystore ~/my-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias`,
                },
            },
            {
                id: "deploy-play-keystore-properties",
                title: "Criar arquivo keystore.properties",
                intro:
                    "Crie o arquivo keystore.properties na pasta android do projeto.",
                bullets: [
                    "Substitua os valores pelos seus.",
                    "Por segurança, prefira variáveis de ambiente para senhas.",
                    "Nunca suba esse arquivo em repositório público.",
                ],
                code: {
                    label: "keystore.properties",
                    language: "properties",
                    content: `storePassword=YOUR_STORE_PASSWORD\nkeyPassword=YOUR_STORE_PASSWORD\nkeyAlias=my-key-alias\nstoreFile=my-key.jks`,
                },
                image: {
                    src: "/images/screen-light-1.png",
                    alt: "Estrutura da pasta android com keystore.properties",
                    caption: "Your android folder should look like this.",
                },
            },
            {
                id: "deploy-play-gradle-config",
                title: "Configurar o app (build.gradle)",
                intro:
                    "Abra android/app/build.gradle e adicione a configuração de assinatura.",
                bullets: [],
                code: {
                    label: "Assinatura de release no Gradle",
                    language: "gradle",
                    content: `// [...]\n\ndef keystoreProperties = new Properties()\ndef keystorePropertiesFile = rootProject.file('key.properties')\nif (keystorePropertiesFile.exists()) {\n   keystoreProperties.load(new FileInputStream(keystorePropertiesFile))\n}\n\nandroid {\n // [...]\n\n  signingConfigs {\n      release {\n         keyAlias keystoreProperties['keyAlias']\n         keyPassword keystoreProperties['keyPassword']\n         storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null\n         storePassword keystoreProperties['storePassword']\n      }\n   }\n  buildTypes {\n      release {\n        signingConfig signingConfigs.release\n      }\n   }\n}\n\n// [...]`,
                },
            },
            {
                id: "deploy-play-build-appbundle",
                title: "Gerar arquivo executável (AppBundle)",
                intro:
                    "Execute o build de release para gerar o AppBundle.",
                bullets: [
                    "Se você usa flavors, rode o comando com --flavor.",
                    "Não esqueça de passar variáveis de ambiente necessárias.",
                ],
                code: {
                    label: "Build AppBundle",
                    language: "bash",
                    content: `flutter build appbundle --release \\\n--dart-define=BACKEND_URL=https://us-central1-apparencekit-pro.cloudfunctions.net/app \\\n--dart-define=ENV=dev\n\n# Com flavor\nflutter build appbundle --release --flavor <flavor_name> \\\n--dart-define=BACKEND_URL=https://us-central1-apparencekit-pro.cloudfunctions.net/app \\\n--dart-define=ENV=dev`,
                },
            },
            {
                id: "deploy-play-appbundle-note",
                title: "AppBundle vs APK",
                intro:
                    "AppBundle é o formato exigido pela Google Play Store para publicação.",
                bullets: [
                    "Você pode gerar APK para testes locais.",
                    "Para publicar na Play Store, envie AppBundle (não APK).",
                ],
            },
            {
                id: "deploy-play-console-account",
                title: "Criar conta no Google Play Console",
                intro:
                    "Para publicar seu app, você precisa de uma conta no Google Play Console.",
                bullets: [
                    "Crie sua conta em [Google Play Console](https://play.google.com/console/u/0/signup).",
                ],
            },
            {
                id: "deploy-play-create-app",
                title: "Criar um novo aplicativo",
                intro:
                    "Depois da conta criada, abra um novo app e preencha as informações necessárias.",
                bullets: [
                    "Envie o AppBundle gerado para release de produção ou teste.",
                ],
            },
            {
                id: "deploy-play-update-version",
                title: "Publicar atualização",
                intro:
                    "Para atualizar o app, incremente a versão no pubspec.yaml e gere um novo AppBundle.",
                bullets: [
                    "Exemplo de incremento de versão:",
                ],
                code: {
                    label: "Versionamento no pubspec.yaml",
                    language: "yaml",
                    content: `version: 1.0.0+1\nversion: 1.0.1+2`,
                },
            },
            {
                id: "deploy-play-version-notes",
                title: "Notas de versão",
                intro:
                    "O Flutter recomenda usar Semantic Versioning.",
                bullets: [
                    "Referência: [Semantic Versioning](https://semver.org/).",
                    "Na Play Store, o número após `+` é o mais importante para atualização.",
                    "O prefixo `1.0.0` ajuda no controle interno e é boa prática manter.",
                ],
            },
        ],
        research: ["flutter publish google play"],
    },
    {
        id: "flutter-deploy-publish-apple-store",
        title: "Publicar na Apple Store",
        summary: "Publicação do app na Apple Store.",
        tag: "Flutter",
        readTime: "12 min",
        sections: [
            {
                id: "deploy-apple-overview",
                title: "Deploy do app Flutter iOS na Apple Store",
                intro:
                    "Assinar um app iOS garante que ele vem do desenvolvedor e não foi modificado após a publicação.",
                bullets: [
                    "Sem assinatura válida, o app não instala nem executa em dispositivos iOS.",
                ],
            },
            {
                id: "deploy-apple-prerequisites",
                title: "Pré-requisitos",
                intro:
                    "Sem conta paga no Apple Developer Program, você não consegue distribuir na App Store.",
                bullets: [
                    "Recursos avançados de assinatura também exigem conta paga.",
                ],
            },
            {
                id: "deploy-apple-auto-sign",
                title: "Assinar automaticamente",
                intro:
                    "Com conta paga e Apple ID logado no Xcode, você pode usar assinatura automática.",
                bullets: [],
                image: {
                    src: "/images/screen-light-1.png",
                    alt: "Assinatura automática no Xcode",
                    caption: "Sign your app automatically.",
                },
            },
            {
                id: "deploy-apple-cert-manual",
                title: "Criar certificado manualmente",
                intro:
                    "Para projetos simples, o Xcode automático costuma ser suficiente. Se precisar, crie manualmente.",
                bullets: [
                    "Guia oficial para CSR: [Create a certificate signing request](https://developer.apple.com/help/account/certificates/create-a-certificate-signing-request).",
                    "Acesse [Certificates, Identifiers & Profiles](https://idmsa.apple.com/IDMSWebAuth/signin?appIdKey=891bd3417a7776362562d2197f89480a8547b108fd934911bcbea0110d07f757&path=%2Faccount%2Fresources%2F&rv=1) e clique em Certificates, depois no botão +.",
                    "Siga o fluxo para gerar CSR, enviar arquivo e baixar o .cer.",
                    "Dê duplo clique no .cer para instalar no Keychain Access.",
                ],
            },
            {
                id: "deploy-apple-app-id",
                title: "Criar App Identifier",
                intro:
                    "O App ID identifica de forma única seu app e seu desenvolvedor.",
                bullets: [
                    "Acesse [Identifiers](https://idmsa.apple.com/IDMSWebAuth/signin?appIdKey=891bd3417a7776362562d2197f89480a8547b108fd934911bcbea0110d07f757&path=%2Faccount%2Fresources%2Fidentifiers%2Flist&rv=1).",
                    "Clique no botão + e selecione App IDs > Continue.",
                    "Selecione tipo App e continue.",
                    "Preencha Description, Bundle ID e capabilities (pode ajustar depois).",
                    "Finalize com Continue e Register.",
                ],
                image: {
                    src: "/images/screen-dark-1.png",
                    alt: "Criar App ID no Apple Developer",
                    caption: "Selecione App IDs e registre o identificador.",
                },
            },
            {
                id: "deploy-apple-app-id-plus",
                title: "Adicionar novo identificador",
                intro:
                    "Depois clique no botão azul + para adicionar um novo identificador único.",
                bullets: [],
                image: {
                    src: "/images/screen-light-1.png",
                    alt: "Botão azul mais para adicionar identificador",
                    caption: "Then click on the blue \"+\" button to add a new unique identifier.",
                },
            },
            {
                id: "deploy-apple-app-id-type",
                title: "Selecionar tipo de App ID",
                intro:
                    "Selecione o tipo correspondente de App ID (App) e clique em Continue.",
                bullets: [],
                image: {
                    src: "/images/screen-dark-1.png",
                    alt: "Selecionar tipo App ID App",
                    caption:
                        "Select the corresponding app ID type, i.e. \"App\", then click on \"Continue\".",
                },
            },
            {
                id: "deploy-apple-app-id-capabilities",
                title: "Capabilities",
                intro:
                    "As capacidades podem ser configuradas depois, então você pode deixar desmarcado no início.",
                bullets: [],
                image: {
                    src: "/images/flutter-ios-signing-config.png",
                    alt: "Tela de capabilities do app id",
                    caption:
                        "Capabilities can be updated later, so you can leave them unchecked at first.",
                },
            },
            {
                id: "deploy-apple-provisioning-profile",
                title: "Criar provisioning profile manualmente",
                intro:
                    "Provisioning profile vincula certificado + App ID e permite distribuição para dispositivos e App Store.",
                bullets: [
                    "No portal da Apple em [Profiles](https://idmsa.apple.com/IDMSWebAuth/signin?appIdKey=891bd3417a7776362562d2197f89480a8547b108fd934911bcbea0110d07f757&path=%2Faccount%2Fresources%2Fprofiles%2Flist&rv=1), clique em + para criar novo profile.",
                    "Escolha o tipo: iOS App Development, Ad Hoc ou App Store.",
                    "Selecione App ID, certificado e (se necessário) dispositivos.",
                    "Defina nome do profile e clique em Generate.",
                ],
                image: {
                    src: "/images/flutter-ios-signing-config.png",
                    alt: "Criação de provisioning profile",
                    caption: "Selecione tipo de profile, app id e certificado.",
                },
            },
            {
                id: "deploy-apple-profile-plus",
                title: "Criar novo profile",
                intro:
                    "Clique no botão azul + para criar um novo provisioning profile.",
                bullets: [],
                image: {
                    src: "/images/screen-light-1.png",
                    alt: "Botão azul para criar profile",
                    caption: "Then click on the blue \"+\" button to create a new profile.",
                },
            },
            {
                id: "deploy-apple-profile-ad-hoc",
                title: "Selecionar Ad Hoc",
                intro:
                    "Neste fluxo, selecione Ad Hoc e clique em Continue no canto superior direito.",
                bullets: [],
                image: {
                    src: "/images/screen-dark-1.png",
                    alt: "Selecionar tipo Ad Hoc",
                    caption:
                        "In this tutorial, we'll select \"Ad Hoc\" and then click on \"Continue\".",
                },
            },
            {
                id: "deploy-apple-profile-select-app-id",
                title: "Selecionar App ID do profile",
                intro:
                    "No próximo passo, selecione da lista o App ID criado anteriormente e clique em Continue.",
                bullets: [],
                image: {
                    src: "/images/screen-light-1.png",
                    alt: "Selecionar app id no provisioning profile",
                    caption:
                        "In the next step, select the app ID created earlier and click on Continue.",
                },
            },
            {
                id: "deploy-apple-profile-select-certificate",
                title: "Selecionar certificado",
                intro:
                    "Selecione o certificado que será associado ao profile e continue.",
                bullets: [],
                image: {
                    src: "/images/screen-dark-1.png",
                    alt: "Selecionar certificado do provisioning profile",
                    caption:
                        "Select the certificate associated with the provisioning profile and click on Continue.",
                },
            },
            {
                id: "deploy-apple-profile-select-devices",
                title: "Selecionar dispositivos",
                intro:
                    "Selecione os dispositivos permitidos para instalar/executar o app (não necessário para profile App Store).",
                bullets: [],
                image: {
                    src: "/images/flutter-ios-signing-config.png",
                    alt: "Selecionar devices no provisioning profile",
                    caption: "Select devices eligible to install and launch the application.",
                },
            },
            {
                id: "deploy-apple-profile-name",
                title: "Nomear provisioning profile",
                intro:
                    "Defina um nome para o profile (normalmente com padrão de nomenclatura do time/projeto).",
                bullets: [],
                image: {
                    src: "/images/screen-light-1.png",
                    alt: "Definir nome do provisioning profile",
                    caption: "Then give the provisioning profile a name.",
                },
            },
            {
                id: "deploy-apple-download-profile",
                title: "Baixar provisioning profile",
                intro:
                    "Baixe o profile na máquina que fará a assinatura (ex.: CI Mac).",
                bullets: [
                    "No Xcode: Settings > Download Profiles.",
                    "Em Flutter, esse passo manual costuma evitar falhas de download automático.",
                ],
                image: {
                    src: "/images/screen-light-1.png",
                    alt: "Download de profiles no Xcode",
                    caption: "Open Xcode settings and download profiles.",
                },
            },
            {
                id: "deploy-apple-build-ipa",
                title: "Build do app iOS (CLI)",
                intro: "Gere o arquivo IPA com o comando abaixo.",
                bullets: [
                    "Se usar flavors, rode com --flavor.",
                    "Lembre de passar todas as variáveis de ambiente.",
                    "Resultado: build/ios/ipa/[APP_NAME].ipa",
                ],
                code: {
                    label: "Build IPA",
                    language: "bash",
                    content: `flutter build ipa --release \\\n--dart-define=BACKEND_URL=https://us-central1-apparencekit-pro.cloudfunctions.net/app \\\n--dart-define=ENV=dev\n\n# Com flavor\nflutter build ipa --release --flavor <flavor_name> \\\n--dart-define=BACKEND_URL=https://us-central1-apparencekit-pro.cloudfunctions.net/app \\\n--dart-define=ENV=dev`,
                },
            },
            {
                id: "deploy-apple-build-ipa-result",
                title: "Local do arquivo IPA",
                intro:
                    "O resultado do build fica em build/ios/ipa/[APP_NAME].ipa.",
                bullets: [],
                image: {
                    src: "/images/screen-dark-1.png",
                    alt: "Caminho do arquivo ipa gerado",
                    caption: "You will find the result ipa in build/ios/ipa/[APP_NAME].ipa.",
                },
            },
            {
                id: "deploy-apple-app-store-connect",
                title: "Publicar no App Store Connect",
                intro:
                    "Acesse [App Store Connect](https://appstoreconnect.apple.com/login?targetUrl=%2Fapps&authResult=FAILED), clique em + e crie um novo app.",
                bullets: [
                    "Selecione a plataforma e preencha dados básicos (nome, descrição, screenshots e ícone).",
                    "Instale o app [Transporter](https://apps.apple.com/fr/app/transporter/id1450874784?mt=12) na Mac App Store.",
                    "Faça login, adicione o arquivo IPA e clique em Deliver.",
                    "A Apple processa o build antes de permitir envio para revisão.",
                ],
                image: {
                    src: "/images/screen-dark-1.png",
                    alt: "Criar novo app no App Store Connect",
                    caption: "Click on + and create a new app.",
                },
            },
            {
                id: "deploy-apple-app-store-info",
                title: "Informações básicas do app",
                intro:
                    "Preencha as informações básicas do aplicativo: nome, descrição, screenshots e ícone.",
                bullets: [],
                image: {
                    src: "/images/screen-light-1.png",
                    alt: "Formulário de informações do app no App Store Connect",
                    caption:
                        "Enter basic application information, including name, description, screenshots and icon.",
                },
            },
            {
                id: "deploy-apple-update-version",
                title: "Publicar atualização",
                intro:
                    "Para atualizar, incremente a versão no pubspec.yaml e gere novo build.",
                bullets: [
                    "O Flutter recomenda [Semantic Versioning](https://semver.org/).",
                ],
                code: {
                    label: "Versionamento",
                    language: "yaml",
                    content: `version: 1.0.0+1\nversion: 1.0.0+2`,
                },
            },
        ],
        research: ["flutter publish app store"],
    },
    {
        id: "flutter-deploy-publish-web-app",
        title: "Publicar app web",
        summary: "Publicação da versão web do app.",
        tag: "Flutter",
        readTime: "4 min",
        sections: [
            {
                id: "deploy-web-overview",
                title: "Deploy Flutter na web",
                intro:
                    "Consulte a documentação oficial:",
                bullets: [
                    "[Build a Flutter web app](https://docs.flutter.dev/platform-integration/web/building).",
                    "[Deploy a Flutter web app](https://docs.flutter.dev/deployment/web).",
                    "O Flutter gera a pasta build/web com os arquivos para deploy.",
                    "O ponto de entrada é o index.html.",
                    "Como é uma SPA, o servidor deve redirecionar todas as rotas para index.html.",
                ],
            },
            {
                id: "deploy-web-firebase",
                title: "Deploy do Flutter web no Firebase",
                intro: "Passos básicos:",
                bullets: ["Durante o firebase init, selecione Hosting e responda Yes para SPA."],
            },
            {
                id: "deploy-web-firebase-commands",
                title: "Comandos",
                intro: "Execute os comandos abaixo na ordem:",
                bullets: [],
                code: {
                    label: "Firebase Hosting",
                    language: "bash",
                    content: `# Instalar Firebase tools\nnpm install -g firebase-tools\n\n# Login\nfirebase login\n\n# Inicializar projeto\nfirebase init\n\n# Deploy\nfirebase deploy --only hosting`,
                },
            },
        ],
        research: ["flutter web deploy"],
    },
    {
        id: "flutter-deploy-codemagic-setup",
        title: "Setup Codemagic",
        summary: "Publicação automatizada com Codemagic para Android e iOS.",
        tag: "Flutter",
        readTime: "7 min",
        sections: [
            {
                id: "deploy-codemagic-overview",
                title: "Codemagic ApparenceKit template setup",
                intro:
                    "O Codemagic é uma ferramenta de CI/CD para Flutter que permite build e publicação automática nas lojas.",
                bullets: [
                    "É mais simples que montar CI do zero em GitHub Actions ou GitLab CI para esse caso.",
                    "Já vem com vários passos pré-configurados para Flutter.",
                    "Ajuda com manutenção de Xcode, CocoaPods e Android SDK.",
                    "É gratuito para open source e oferece minutos para projetos privados.",
                ],
            },
            {
                id: "deploy-codemagic-prerequisites",
                title: "Antes de começar",
                intro: "Você precisa ter:",
                bullets: [
                    "Conta no Codemagic conectada ao GitHub ou GitLab.",
                    "Conta Apple Developer.",
                    "App criado no portal Apple Developer.",
                    "Conta Google Play Developer.",
                    "App criado no Google Play Console.",
                ],
            },
            {
                id: "deploy-codemagic-store-setup",
                title: "Setup de conexão com as lojas",
                intro:
                    "Para envio automático para as lojas, configure as integrações no Codemagic.",
                bullets: [
                    "Android: [Google Play publishing (Codemagic)](https://docs.codemagic.io/yaml-publishing/google-play/).",
                    "iOS: [App Store Connect publishing (Codemagic)](https://docs.codemagic.io/yaml-publishing/app-store-connect/).",
                ],
            },
            {
                id: "deploy-codemagic-workflow",
                title: "Workflow",
                intro:
                    "A ideia é gerar um arquivo codemagic.yaml com workflows para Android e iOS.",
                bullets: [
                    "Build e publicação iOS.",
                    "Build e publicação Android.",
                    "Pode disparar por push na branch principal ou por tag.",
                    "Para customizar gatilhos, veja: [Starting builds automatically](https://docs.codemagic.io/yaml-running-builds/starting-builds-automatically/).",
                ],
            },
            {
                id: "deploy-codemagic-generate",
                title: "Gerar configuração do Codemagic",
                intro: "Execute o comando abaixo na raiz do projeto:",
                bullets: [
                    "Isso gera o arquivo codemagic.yaml no root.",
                    "Antes disso, configure as variáveis de ambiente.",
                ],
                code: {
                    label: "Gerar codemagic.yaml",
                    language: "bash",
                    content: `dart pub global run apparence_cli ci --provider=codemagic .`,
                },
            },
            {
                id: "deploy-codemagic-env",
                title: "Variáveis de ambiente",
                intro:
                    "Configure todas as variáveis exigidas no environment.dart e no painel do Codemagic.",
                bullets: [
                    "Assim os segredos não ficam no código-fonte.",
                    "No Codemagic: Project settings > Environment variables.",
                    "Vídeo de apoio: [Codemagic tutorial no YouTube](https://www.youtube.com/watch?v=7pAxVFe66hI&t=68s).",
                ],
            },
            {
                id: "deploy-codemagic-add-remove-vars",
                title: "Adicionar ou remover variáveis no build",
                intro:
                    "Abra o codemagic.yaml gerado e ajuste os passos de build para incluir/remover dart-defines.",
                bullets: [
                    "Exemplos de passo: Flutter build ipa and automatic versioning ou Build AAB with Flutter.",
                    "Todas as variáveis são passadas no comando de build.",
                ],
                code: {
                    label: "Exemplo de build com variáveis",
                    language: "yaml",
                    content: `- name: Flutter build ipa and automatic versioning\n  script: |\n    flutter build ipa --release \\\n      --dart-define=ENV=prod \\\n      --dart-define=BACKEND_URL=$BACKEND_URL \\\n      --dart-define=SENTRY_DSN=$SENTRY_DSN \\\n      --dart-define=GLASSFY_TOKEN=$GLASSFY_TOKEN`,
                },
            },
        ],
        research: ["codemagic flutter", "codemagic yaml publishing"],
    },
    {
        id: "flutter-other-onboarding",
        title: "Introdução",
        summary: "Estratégia e fluxo de onboarding.",
        tag: "Flutter",
        readTime: "8 min",
        sections: [
            {
                id: "other-onboarding-overview",
                title: "ApparenceKit - template de onboarding Flutter",
                intro:
                    "Onboarding é uma parte crítica do app, pois é a primeira experiência do usuário.",
                bullets: [
                    "O objetivo é tornar esse fluxo o mais claro, fluido e engajador possível.",
                    "O template reúne padrões usados em apps reais para acelerar implementação.",
                ],
            },
            {
                id: "other-onboarding-features",
                title: "Recursos do template",
                intro: "O módulo inclui:",
                bullets: [
                    "Onboarding de funcionalidades: apresenta os recursos do app.",
                    "Onboarding de permissões: solicita permissões de forma amigável.",
                    "Onboarding de perguntas: coleta respostas para personalizar experiência.",
                ],
            },
            {
                id: "other-onboarding-getting-started",
                title: "Getting started",
                intro:
                    "O template de onboarding está disponível após o setup do projeto com ApparenceKit.",
                bullets: [
                    "Você encontra o módulo em: lib/modules/onboarding.",
                    "Nota: no texto original havia “mobules”; o caminho correto é modules.",
                ],
            },
            {
                id: "other-onboarding-files-overview",
                title: "Arquivos principais",
                intro: "Visão rápida dos arquivos:",
                bullets: [
                    "Onboarding page: lib/modules/onboarding/ui/onboarding_page.dart.",
                    "Template de features: lib/modules/onboarding/ui/widgets/onboarding_feature.dart.",
                    "Template de permissões: lib/modules/onboarding/ui/widgets/onboarding_permission.dart.",
                ],
            },
            {
                id: "other-onboarding-feature-template",
                title: "Template de feature onboarding",
                intro:
                    "Use esse widget para apresentar funcionalidades do app.",
                bullets: [
                    "Código base em: lib/modules/onboarding/ui/widgets/onboarding_feature.dart.",
                    "Todos os textos são localizados via Translations.",
                    "Edite textos em: lib/i18n/strings.i18n.json.",
                ],
                code: {
                    label: "Exemplo de step de feature",
                    language: "dart",
                    content: `class OnboardingFeatureOne extends StatelessWidget {\n  final String nextRoute;\n\n  const OnboardingFeatureOne({\n    super.key,\n    required this.nextRoute,\n  });\n\n  @override\n  Widget build(BuildContext context) {\n    final translations = Translations.of(context).onboarding.feature_1;\n    return OnboardingStep(\n      title: translations.title,\n      description: translations.description,\n      btnText: translations.action,\n      nextRoute: nextRoute,\n      imgPath: 'assets/images/onboarding/purchase.png',\n      withBg: true,\n      progress: 0.1,\n    );\n  }\n}`,
                },
            },
            {
                id: "other-onboarding-questions",
                title: "Templates de perguntas no onboarding",
                intro:
                    "Para perguntas com seleção única (radio), use o template abaixo.",
                bullets: [
                    "Código em: lib/modules/onboarding/ui/widgets/onboarding_questions.dart.",
                ],
                code: {
                    label: "Exemplo de pergunta (radio)",
                    language: "dart",
                    content: `class UserAgeOnboardingQuestion extends ConsumerWidget {\n  final String nextRoute;\n\n  const UserAgeOnboardingQuestion({\n    super.key,\n    required this.nextRoute,\n  });\n\n  @override\n  Widget build(BuildContext context, WidgetRef ref) {\n    final translations = Translations.of(context).onboarding.ageQuestion;\n\n    return OnboardingRadioQuestion(\n      title: translations.title,\n      description: translations.description,\n      btnText: translations.action,\n      progress: 0.3,\n      optionIds: translations.options.keys.toList(),\n      optionBuilder: (key, selected) => SelectableRowTile(\n        title: translations.options[key],\n        selected: selected,\n      ),\n      reassuranceBuilder: (key) => CheckedReassurance(\n        text: translations.reassurance[key]!,\n      ),\n      onValidate: (key) {\n        ref.read(onboardingNotifierProvider.notifier)\n           .onAnsweredQuestion(UserAgeInfo.fromString(key));\n        Navigator.of(context).pushReplacementNamed(nextRoute);\n      },\n    );\n  }\n}`,
                },
            },
            {
                id: "other-onboarding-permissions",
                title: "Templates de permissões no onboarding",
                intro:
                    "O ApparenceKit inclui template pronto para solicitar permissões de forma amigável.",
                bullets: [
                    "Código base: lib/modules/onboarding/ui/widgets/onboarding_permission.dart.",
                    "Permissões pré-prontas: ATT e notificações.",
                    "ATT é aplicável para iOS 14+ quando usado no cenário de rastreamento (ex.: Facebook Pixel).",
                    "Componente ATT: lib/modules/onboarding/ui/components/onboarding_att_setup.dart.",
                    "Componente notificações: lib/modules/onboarding/ui/components/onboarding_notifications_setup.dart.",
                ],
            },
            {
                id: "other-onboarding-conclusion",
                title: "Conclusão",
                intro:
                    "Esse template ajuda a montar um onboarding eficiente rapidamente.",
                bullets: [
                    "Teste diferentes variações e itere continuamente no fluxo.",
                    "O onboarding impacta diretamente ativação e retenção dos usuários.",
                ],
            },
        ],
        research: ["flutter onboarding"],
    },
    {
        id: "flutter-other-internationalization",
        title: "Internacionalização",
        summary: "Internacionalização e idiomas.",
        tag: "Flutter",
        readTime: "7 min",
        sections: [
            {
                id: "other-i18n-overview",
                title: "Internacionalização",
                intro:
                    "O Flutter tem um sistema flexível para internacionalização.",
                bullets: [
                    "Você pode usar `intl` ou `i18n`.",
                    "A recomendação aqui é i18n com Slang por ser mais flexível.",
                    "Pacotes: [slang](https://pub.dev/packages/slang) e [slang - recursos avançados](https://pub.dev/packages/slang#complex-features).",
                ],
            },
            {
                id: "other-i18n-setup",
                title: "Getting started",
                intro:
                    "O comando de setup pergunta se você quer internacionalização, mas também pode ser feito manualmente.",
                bullets: [
                    "Execute o comando da CLI para adicionar tudo que precisa.",
                ],
                code: {
                    label: "Adicionar internacionalização",
                    language: "bash",
                    content: `dart pub global run apparence_cli translations .`,
                },
            },
            {
                id: "other-i18n-what-it-installs",
                title: "O que será configurado",
                intro:
                    "A CLI instala dependências e ajusta o main para iniciar o app com provider de traduções.",
                bullets: ["Dependências instaladas: slang e slang_flutter."],
            },
            {
                id: "other-i18n-fast-usage",
                title: "Como usar (versão rápida)",
                intro:
                    "As traduções ficam na pasta i18n; idioma principal em i18n/strings.i18n.json.",
                bullets: [
                    "Depois de adicionar chaves de tradução, gere os arquivos Dart.",
                    "Método recomendado: CLI do Slang.",
                ],
                code: {
                    label: "Gerar traduções",
                    language: "bash",
                    content: `dart run slang`,
                },
            },
            {
                id: "other-i18n-config-file",
                title: "Arquivo de configuração",
                intro:
                    "O arquivo de configuração é o slang.yaml na raiz do projeto.",
                bullets: ["Exemplo padrão:"],
                code: {
                    label: "slang.yaml",
                    language: "yaml",
                    content: `base_locale: en\nfallback_strategy: base_locale\ninput_directory: lib/i18n\ninput_file_pattern: .i18n.json\noutput_directory: lib/i18n\noutput_file_name: translations.g.dart\noutput_format: single_file`,
                },
            },
            {
                id: "other-i18n-add-language",
                title: "Adicionar um idioma",
                intro:
                    "Crie um arquivo por idioma, por exemplo i18n/strings_fr.i18n.json.",
                bullets: [
                    "Também adicione os idiomas no iOS em ios/Runner/Info.plist.",
                ],
                code: {
                    label: "CFBundleLocalizations (Info.plist)",
                    language: "xml",
                    content: `<key>CFBundleLocalizations</key>\n<array>\n  <string>en</string>\n  <string>fr</string>\n</array>`,
                },
            },
            {
                id: "other-i18n-use-translations",
                title: "Usar traduções no código",
                intro:
                    "Exemplo simples de chave e acesso no widget:",
                bullets: [
                    "Para casos mais avançados, consulte a doc do Slang.",
                ],
                code: {
                    label: "Exemplo de uso",
                    language: "dart",
                    content: `// i18n/strings.i18n.json\n{\n  "home": {\n    "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."\n  }\n}\n\n// Uso no app\nTranslations.of(context).home.title;`,
                },
            },
        ],
        research: ["flutter internationalization"],
    },
    {
        id: "flutter-other-theme-module",
        title: "Módulo de tema",
        summary: "Configuração de tema e variações visuais.",
        tag: "Flutter",
        readTime: "10 min",
        sections: [
            {
                id: "other-theme-overview",
                title: "Setup do tema",
                intro:
                    "O Flutter permite personalizar o tema, e o ApparenceKit organiza isso para ficar mais simples.",
                bullets: [
                    "Documentação oficial: [Flutter themes](https://docs.flutter.dev/cookbook/design/themes).",
                    "Problemas comuns do tema padrão: sem factory, troca de tema limitada e pouca separação por plataforma.",
                ],
            },
            {
                id: "other-theme-tldr",
                title: "TLDR",
                intro: "Você consegue customizar o tema alterando apenas:",
                bullets: [
                    "lib/app/core/theme/colors.dart (paleta de cores).",
                    "lib/app/core/theme/text_theme.dart (tipografia).",
                    "lib/app/core/theme/universal_theme.dart (factory de tema).",
                    "main.dart (modo padrão e provider de tema).",
                ],
            },
            {
                id: "other-theme-colors",
                title: "1) Paleta de cores",
                intro:
                    "Abra lib/app/core/theme/colors.dart e ajuste sua paleta.",
                bullets: [
                    "Use poucas cores; geralmente uma primária já resolve.",
                    "Mantenha base material: background, onBackground, surface, onSurface, primary, onPrimary, error, onError.",
                    "tons grey01..grey10 ajudam em sombras.",
                ],
                image: {
                    src: "/images/screen-light-1.png",
                    alt: "Exemplo simples de paleta de cores",
                    caption: "Here is a simple color palette example.",
                },
            },
            {
                id: "other-theme-text",
                title: "2) Texto e tipografia",
                intro:
                    "Em lib/app/core/theme/text_theme.dart, centralize as fontes do app.",
                bullets: [
                    "Times de design normalmente trabalham com até 2 fontes.",
                    "Com tipografia centralizada, trocar fonte no app todo fica simples.",
                ],
            },
            {
                id: "other-theme-factory",
                title: "3) Theme factory",
                intro:
                    "O UniversalThemeFactory monta o tema a partir de paleta + tipografia base.",
                bullets: [
                    "Arquivo: lib/app/core/theme/universal_theme.dart.",
                    "Ajuda a evitar manutenção de dois temas grandes (dark/light).",
                    "O ideal é só trocar algumas cores entre modos.",
                ],
                image: {
                    src: "/images/screen-dark-1.png",
                    alt: "Cheat sheet de uso da paleta de cores",
                    caption: "Here is a cheat sheet to understand how our color palette is used.",
                },
            },
            {
                id: "other-theme-default-text-usage",
                title: "Usando defaultTextTheme",
                intro:
                    "Prefira derivar estilos do defaultTextStyle para facilitar manutenção.",
                bullets: [],
                code: {
                    label: "Exemplo com defaultTextStyle",
                    language: "dart",
                    content: `TextTheme textTheme({\n  required ApparenceKitColors colors,\n  required ApparenceKitTextTheme defaultTextStyle,\n}) =>\n    TextTheme(\n      headlineLarge: defaultTextStyle.primary.copyWith(\n        fontSize: 32,\n        color: colors.onBackground,\n        fontWeight: FontWeight.w700,\n      ),\n    );`,
                },
            },
            {
                id: "other-theme-provider",
                title: "Setup do ThemeProvider",
                intro:
                    "O ThemeProvider permite trocar tema sem reiniciar o app.",
                bullets: [],
                code: {
                    label: "ThemeProvider no main.dart",
                    language: "dart",
                    content: `return ThemeProvider(\n  notifier: AppTheme.uniform(\n    themeFactory: const UniversalThemeFactory(),\n    lightColors: ApparenceKitColors.light(),\n    darkColors: ApparenceKitColors.dark(),\n    textTheme: ApparenceKitTextTheme.build(),\n    defaultMode: ThemeMode.dark,\n  ),\n  child: Builder(builder: (context) {\n    return MaterialApp(\n      theme: ThemeProvider.of(context).light,\n      darkTheme: ThemeProvider.of(context).dark,\n      themeMode: ThemeProvider.of(context).mode,\n    );\n  }),\n);`,
                },
            },
            {
                id: "other-theme-dark-light",
                title: "Dark e light mode",
                intro:
                    "O ApparenceKit já suporta dark/light e também troca System UI automaticamente.",
                bullets: [
                    "Para remover dark mode, tire darkColors/darkTheme e use defaultMode light.",
                    "Para alternar tema em runtime: ThemeProvider.of(context).toggle().",
                    "Para ler modo atual: ThemeProvider.of(context).mode.",
                ],
                image: {
                    src: "/images/flutter-ios-signing-config.png",
                    alt: "Exemplo de paleta em multi mode",
                    caption: "Here is an example.",
                },
            },
            {
                id: "other-theme-platform",
                title: "Tema por plataforma",
                intro:
                    "Use AppTheme.adaptive para ter factory diferente por iOS, Android e web.",
                bullets: [
                    "Ex.: ios: IosThemeFactory, android: AndroidThemeFactory, web: WebThemeFactory.",
                    "Também funciona com dark/light.",
                ],
                code: {
                    label: "AppTheme.adaptive",
                    language: "dart",
                    content: `return ThemeProvider(\n  notifier: AppTheme.adaptive(\n    defaultTextTheme: ApparenceKitTextTheme.build(),\n    ios: const IosThemeFactory(),\n    android: const AndroidThemeFactory(),\n    web: const WebThemeFactory(),\n    lightColors: ApparenceKitColors.light(),\n    darkColors: ApparenceKitColors.dark(),\n    mode: ThemeMode.dark,\n  ),\n  child: ...,\n);`,
                },
            },
            {
                id: "other-theme-gradients",
                title: "Adicionar cores e gradientes",
                intro:
                    "Você pode expandir o ThemeExtension em colors.dart para incluir gradientes.",
                bullets: [],
                code: {
                    label: "Exemplo com Gradient",
                    language: "dart",
                    content: `class ApparenceKitColors extends ThemeExtension<ApparenceKitColors> {\n  final Color primary;\n  final Gradient primaryGradient;\n\n  const ApparenceKitColors({\n    required this.primary,\n    required this.primaryGradient,\n  });\n}`,
                },
            },
            {
                id: "other-theme-extra-props",
                title: "Propriedades extras de tema",
                intro:
                    "Você pode criar temas específicos de widgets no theme_data.dart.",
                bullets: [
                    "Ex.: configuração de SoundCard em lib/app/core/theme/theme_data.dart.",
                    "Uso no widget: style: context.kitTheme.soundCardTheme.",
                ],
            },
            {
                id: "other-theme-context-shortcuts",
                title: "Acesso via context",
                intro:
                    "Use atalhos para acessar tema custom e tema material com menos boilerplate.",
                bullets: [
                    "context.kitTheme",
                    "context.kitTheme.colors.grey1",
                    "context.kitTheme.materialTheme.textTheme.bodyLarge",
                    "context.textTheme.bodyLarge",
                ],
            },
        ],
        research: ["flutter theme module"],
    },
    {
        id: "flutter-other-storage-module",
        title: "Módulo de armazenamento",
        summary: "Armazenamento local e persistência.",
        tag: "Flutter",
        readTime: "8 min",
        sections: [
            {
                id: "other-storage-overview",
                title: "ApparenceKit Storage module",
                intro:
                    "O módulo de storage facilita upload de arquivos e gerenciamento de avatar.",
                bullets: [],
            },
            {
                id: "other-storage-install",
                title: "Instalar template de storage",
                intro:
                    "Execute um dos comandos abaixo:",
                bullets: [
                    "Provider genérico: apparence_cli storage --provider=generic.",
                    "Provider Firebase: apparence_cli storage --provider=firebase.",
                ],
                code: {
                    label: "Comandos de instalação",
                    language: "bash",
                    content: `dart pub global run apparence_cli storage --provider=generic\n\n# ou com Firebase Storage\ndart pub global run apparence_cli storage --provider=firebase`,
                },
            },
            {
                id: "other-storage-dependencies",
                title: "Dependências instaladas",
                intro: "A CLI instala:",
                bullets: [
                    "firebase_storage (se usar provider firebase)",
                    "path_provider",
                    "image_picker",
                    "image",
                ],
            },
            {
                id: "other-storage-files-added",
                title: "Arquivos adicionados",
                intro: "O módulo também adiciona exemplos prontos no projeto:",
                bullets: [
                    "Storage API: lib/core/data/api/storage_api.dart",
                    "Exemplo de uso: lib/modules/settings/ui/components/avatar_component.dart",
                    "Template de edição de avatar: lib/modules/settings/ui/components/edit_avatar_component.dart",
                ],
            },
            {
                id: "other-storage-android",
                title: "Android",
                intro: "No Android, não há configuração adicional obrigatória.",
                bullets: ["Parabéns, aqui não tem nada para fazer."],
            },
            {
                id: "other-storage-ios",
                title: "iOS",
                intro:
                    "No iOS, configure permissões no Info.plist no Xcode.",
                bullets: [
                    "Adicione NSPhotoLibraryUsageDescription para acesso à galeria.",
                    "Se usar câmera: adicione NSCameraUsageDescription.",
                    "Se gravar vídeo/áudio: adicione NSMicrophoneUsageDescription.",
                ],
            },
            {
                id: "other-storage-firebase-setup",
                title: "Setup Firebase Storage",
                intro:
                    "Com Firebase Storage, você pode fazer upload direto do cliente e obter a URL de download.",
                bullets: [
                    "Pré-requisito: projeto Firebase + firebase_auth.",
                    "No Firebase Console: Storage > Get started > Next > Done.",
                    "Na aba Rules, substitua com regras iniciais e publique.",
                    "Atenção: regras amplas não são seguras para produção.",
                ],
                code: {
                    label: "Regra básica (exemplo)",
                    language: "text",
                    content: `rules_version = '2';\nservice firebase.storage {\n  match /b/{bucket}/o {\n    match /{allPaths=**} {\n      allow read, write: if request.auth != null;\n    }\n  }\n}`,
                },
            },
            {
                id: "other-storage-firebase-rules-advanced",
                title: "Exemplo de regra mais restrita",
                intro:
                    "Exemplo com upload apenas na pasta do próprio usuário e limite de tamanho.",
                bullets: [],
                code: {
                    label: "Regra avançada",
                    language: "text",
                    content: `rules_version = '2';\nservice firebase.storage {\n  match /b/{bucket}/o {\n    match /users/{id} {\n      allow write, update: if request.auth != null && request.auth.uid == id && request.resource.size < 100 * 1024;\n      allow read, delete: if request.auth != null && request.auth.uid == id;\n    }\n    match /{allPaths=**} {\n      allow read, write, update, delete: if false;\n    }\n  }\n}`,
                },
            },
            {
                id: "other-storage-edit-avatar-template",
                title: "Template EditAvatar",
                intro:
                    "Esse template edita avatar do usuário e pode ser usado após setup do módulo.",
                bullets: [
                    "Fluxo: abrir galeria, reduzir imagem, upload no storage, gerar URL pública e atualizar usuário.",
                ],
                code: {
                    label: "Uso do EditableUserAvatar",
                    language: "dart",
                    content: `import 'package:apparence_kit/modules/settings/ui/components/avatar_component.dart';\n\n...\nEditableUserAvatar();`,
                },
            },
            {
                id: "other-storage-upload-api",
                title: "Upload de arquivo com Storage API",
                intro:
                    "Importe a API em um repositório e use o método uploadData.",
                bullets: [
                    "Se usar backend próprio, esse método não vem implementado e você deve implementar.",
                ],
                code: {
                    label: "Assinatura do método uploadData",
                    language: "dart",
                    content: `import 'package:apparence_kit/core/data/api/storage_api.dart';\n\nStream<UploadResult> uploadData(\n  Uint8List data,\n  String folder,\n  String filename, {\n  String? mimeType, // ex: 'image/jpg'\n  bool isPublic = true,\n});`,
                },
            },
            {
                id: "other-storage-s3",
                title: "Usando Amazon S3",
                intro:
                    "Recomendação: não envie direto do cliente para o S3 sem controle.",
                bullets: [
                    "Prefira URL pré-assinada gerada pelo backend (presigned URL).",
                    "Alternativa: enviar arquivo ao backend e backend sobe no S3.",
                    "Isso melhora segurança e simplifica controle de acesso.",
                ],
            },
        ],
        research: ["flutter storage module"],
    },
    {
        id: "flutter-other-responsive-widgets",
        title: "Widgets responsivos",
        summary: "Estratégias de widgets responsivos.",
        tag: "Flutter",
        readTime: "4 min",
        sections: [
            {
                id: "other-responsive-overview",
                title: "Create a responsive app with ApparenceKit",
                intro:
                    "O ApparenceKit fornece widgets para tornar o app responsivo de forma simples.",
                bullets: [
                    "Os widgets ficam em: /lib/core/widgets/responsive_layout.dart.",
                ],
            },
            {
                id: "other-responsive-layout",
                title: "ResponsiveLayout",
                intro:
                    "Permite renderizar layouts diferentes de acordo com o tamanho disponível.",
                bullets: [
                    "💡 Use para trocar a estrutura completa da página por breakpoint.",
                    "Breakpoints: Small (mobile), Medium (tablet), Large (desktop), ExtraLarge (desktop).",
                    "Fallback automático para menor tamanho disponível (mobile-first).",
                ],
            },
            {
                id: "other-responsive-builder",
                title: "ResponsiveBuilder",
                intro:
                    "Cria um widget que reconstrói quando o tamanho de tela muda.",
                bullets: [
                    "💡 Use para adaptar partes da página (não a página inteira).",
                    "Reconstrói automaticamente em mudança de tamanho.",
                    "Breakpoints: Small (mobile), Medium (tablet), Large (desktop), ExtraLarge (desktop).",
                    "Fallback automático para menor tamanho disponível (mobile-first).",
                ],
            },
        ],
        research: ["flutter responsive widgets"],
    },
    {
        id: "flutter-other-home-widget-command",
        title: "Comando de Home Widget",
        summary: "Comandos e configuração de home widgets.",
        tag: "Flutter",
        readTime: "10 min",
        sections: [
            {
                id: "other-home-widget-overview",
                title: "Visão geral",
                intro:
                    "O comando de widget gera widgets nativos de tela inicial para iOS e Android a partir de um arquivo JSON simples.",
                bullets: [
                    "Plugins base: [home_widget](https://pub.dev/packages/home_widget) e [background_fetch](https://pub.dev/packages/background_fetch).",
                    "Gera código nativo + integração Flutter automaticamente.",
                ],
            },
            {
                id: "other-home-widget-command",
                title: "Comando",
                intro: "Execute:",
                bullets: [
                    "Gera widgets iOS (Swift/SwiftUI) e Android (Kotlin/Compose).",
                    "Cria services Flutter para gerenciamento de dados.",
                    "Configura atualizações em background.",
                    "Configura App Groups no iOS.",
                    "Integra no fluxo de inicialização do app.",
                ],
                code: {
                    label: "Gerar widgets",
                    language: "bash",
                    content: `apparence_cli widget [path]`,
                },
            },
            {
                id: "other-home-widget-options",
                title: "Opções",
                intro: "Opção disponível:",
                bullets: ["--force (-f): força a geração mesmo se já existir."],
            },
            {
                id: "other-home-widget-prereq-config",
                title: "Pré-requisito 1: arquivo de configuração",
                intro:
                    "Crie home_widget_config.json na raiz do projeto antes de rodar o comando.",
                bullets: [
                    "Você pode definir múltiplos widgets no array widgets.",
                    "Use nomes únicos para cada widget.",
                ],
                code: {
                    label: "home_widget_config.json",
                    language: "json",
                    content: `{\n  "widgets": [\n    {\n      "name": "MyWidget",\n      "description": "A sample home widget",\n      "metadata": {\n        "title": {\n          "type": "string",\n          "defaultValue": "Hello"\n        },\n        "counter": {\n          "type": "number",\n          "defaultValue": "0"\n        }\n      },\n      "isLockScreenWidget": false,\n      "iosSizes": ["systemSmall", "systemMedium", "systemLarge"],\n      "androidSize": {\n        "minWidth": 180,\n        "minHeight": 180,\n        "targetCellWidth": 2,\n        "targetCellHeight": 2\n      }\n    }\n  ]\n}`,
                },
            },
            {
                id: "other-home-widget-prereq-platform",
                title: "Pré-requisito 2: plataformas",
                intro: "Você precisa ter pelo menos uma plataforma disponível:",
                bullets: [
                    "iOS: projeto em ios/.",
                    "Android: projeto em android/.",
                    "Para gerar widget iOS, é necessário macOS com Xcode.",
                ],
            },
            {
                id: "other-home-widget-schema",
                title: "Schema de configuração",
                intro: "Campos principais por widget:",
                bullets: [
                    "name (obrigatório): identificador do widget.",
                    "description (obrigatório): descrição para usuário.",
                    "metadata (obrigatório): dados enviados para o widget.",
                    "isLockScreenWidget (opcional, iOS).",
                    "iosSizes (opcional).",
                    "androidSize (opcional).",
                ],
            },
            {
                id: "other-home-widget-sizes",
                title: "Tamanhos iOS e Android",
                intro: "iOS (iosSizes):",
                bullets: [
                    "systemSmall, systemMedium, systemLarge.",
                    "accessoryCircular, accessoryRectangular, accessoryInline (lock screen).",
                    "Android (androidSize): minWidth, minHeight, targetCellWidth, targetCellHeight, maxResizeWidth, maxResizeHeight, resizeMode.",
                ],
            },
            {
                id: "other-home-widget-generated-files",
                title: "Arquivos gerados",
                intro: "Após a geração, você terá arquivos Flutter, iOS e Android.",
                bullets: [],
                code: {
                    label: "Estrutura gerada",
                    language: "text",
                    content: `lib/\n└── core/\n    └── home_widgets/\n        ├── home_widget_service.dart\n        ├── home_widget_mywidget_service.dart\n        └── home_widget_manager.dart\n\nios/\n└── HomeWidgetExtension/\n    ├── MyWidget.swift\n    ├── Info.plist\n    └── Assets.xcassets\n\nandroid/app/src/main/\n├── kotlin/[package]/\n│   └── MyWidget.kt\n└── res/\n    ├── xml/\n    │   └── mywidget_info.xml\n    └── layout/\n        └── mywidget.xml`,
                },
            },
            {
                id: "other-home-widget-auto-integration",
                title: "Integração automática",
                intro: "O comando também:",
                bullets: [
                    "Instala dependências home_widget e background_fetch.",
                    "Atualiza main.dart para incluir homeWidgetsManagerProvider.",
                    "Configura App Groups no iOS.",
                    "Roda code generation (build_runner).",
                    "Formata e corrige código gerado.",
                ],
            },
            {
                id: "other-home-widget-post-steps",
                title: "Pós-geração",
                intro: "Checklist rápido:",
                bullets: [
                    "iOS: abrir ios/Runner.xcworkspace no Xcode e validar App Groups/extension target.",
                    "Android: buildar e adicionar widget na home via widget picker.",
                ],
            },
            {
                id: "other-home-widget-customization",
                title: "Customização",
                intro: "Arquivos para customizar:",
                bullets: [
                    "iOS: ios/HomeWidgetExtension/[WidgetName].swift",
                    "Android: android/app/src/main/kotlin/[packageName]/[WidgetName].kt",
                    "Flutter: lib/core/home_widgets/home_widget_service.dart",
                ],
            },
            {
                id: "other-home-widget-send-data",
                title: "Enviar dados para o widget",
                intro: "Para atualizar manualmente pelo Flutter:",
                bullets: [],
                code: {
                    label: "Update manual",
                    language: "dart",
                    content: `await ref.read(myWidgetHomeWidgetProvider).update();`,
                },
            },
            {
                id: "other-home-widget-update-logic",
                title: "Customizar lógica de update",
                intro:
                    "Abra lib/core/home_widgets/home_widget_[YOUR_WIDGET_NAME].dart e ajuste o método update.",
                bullets: [
                    "Como ele recebe ref do Riverpod, você pode ler qualquer provider.",
                ],
                code: {
                    label: "Exemplo de update",
                    language: "dart",
                    content: `@override\nFuture<void> update() {\n  Logger().i('🔄 Updating [YOUR_WIDGET_NAME] Home Widget');\n  final userState = ref.read(userStateNotifierProvider);\n  final userName = userState.user.idOrNull ?? 'Guest';\n\n  return updateWidget({\n    // all widget properties or null\n  });\n}`,
                },
            },
            {
                id: "other-home-widget-background",
                title: "Atualizações em background",
                intro:
                    "O template configura atualização automática a cada 15 minutos em background.",
                bullets: [
                    "Customize em lib/core/home_widgets/home_widget_manager.dart.",
                    "No iOS, o sistema pode limitar frequência e horário exato.",
                ],
            },
            {
                id: "other-home-widget-guidelines",
                title: "Guias de plataforma",
                intro: "Referências oficiais:",
                bullets: [
                    "iOS: [Apple Widget Design Guidelines](https://developer.apple.com/design/human-interface-guidelines/widgets).",
                    "Android: [Android App Widgets Layout](https://developer.android.com/develop/ui/views/appwidgets/layouts?authuser=1&hl=pt-br).",
                    "Plugin: [home_widget no pub.dev](https://pub.dev/packages/home_widget).",
                ],
            },
            {
                id: "other-home-widget-troubleshooting",
                title: "Troubleshooting",
                intro: "Se algo falhar, verifique:",
                bullets: [
                    "Widget não aparece: build/install do app, logs Xcode/logcat, App Groups no iOS.",
                    "Dados não atualizam: Initializer com homeWidgetsManagerProvider, permissões e logs do WorkManager.",
                    "Erro de build: flutter clean, reinstalar dependências nativas e validar bundle id no iOS.",
                ],
            },
            {
                id: "other-home-widget-license",
                title: "Limites de licença",
                intro:
                    "Esse recurso pode ter limite conforme o plano da sua licença.",
                bullets: ["Verifique no seu plano o limite de widgets disponíveis."],
            },
        ],
        research: ["flutter home widget"],
    },
    {
        id: "flutter-other-camera-template",
        title: "Template de câmera",
        summary: "Template base para recursos de câmera.",
        tag: "Flutter",
        readTime: "6 min",
        sections: [
            {
                id: "other-camera-overview",
                title: "Template de câmera",
                intro:
                    "No Flutter mobile, você tem duas opções para usar câmera:",
                bullets: [
                    "Abrir o app nativo de câmera e esperar o resultado.",
                    "Usar plugin de câmera e construir sua própria UI embutida no app.",
                    "A primeira opção é mais simples, mas com pouco controle de UX.",
                    "A segunda opção exige mais implementação, mas oferece controle total da experiência.",
                    "Plugin: [camerawesome no pub.dev](https://pub.dev/packages/camerawesome).",
                    "Código-fonte: [CamerAwesome no GitHub](https://github.com/Apparence-io/CamerAwesome).",
                ],
            },
            {
                id: "other-camera-generate-template",
                title: "Gerar template de câmera",
                intro:
                    "Com ApparenceKit, as dependências são instaladas e uma página de câmera já configurada é gerada.",
                bullets: [
                    "--exifLocation=true habilita localização no EXIF (exige permissões extras).",
                    "--uiType=basic gera UI básica com botão de captura e troca entre câmera frontal/traseira.",
                ],
                code: {
                    label: "Comando de geração",
                    language: "bash",
                    content: `dart pub global run apparence_cli camera --exifLocation=true --uiType=basic .`,
                },
            },
            {
                id: "other-camera-permissions-android",
                title: "Permissões Android",
                intro:
                    "Adicione as permissões no AndroidManifest.xml:",
                bullets: [],
                code: {
                    label: "AndroidManifest.xml",
                    language: "xml",
                    content: `<uses-permission android:name="android.permission.CAMERA" />\n<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />`,
                },
            },
            {
                id: "other-camera-permissions-ios",
                title: "Permissões iOS",
                intro:
                    "Adicione as permissões no Info.plist:",
                bullets: [],
                code: {
                    label: "Info.plist",
                    language: "xml",
                    content: `<key>NSCameraUsageDescription</key>\n<string>Camera permission description</string>\n\n<key>NSLocationWhenInUseUsageDescription</key>\n<string>Location permission description</string>`,
                },
            },
            {
                id: "other-camera-warning",
                title: "Aviso importante",
                intro:
                    "Edite o Info.plist da pasta ios/Runner usando Xcode.",
                bullets: [
                    "Se editar apenas via VSCode ou Android Studio, seu projeto pode não compilar corretamente.",
                ],
            },
        ],
        research: ["flutter camera template"],
    },
];

type FlutterCategory = {
    id: string;
    title: string;
    topicIds: string[];
};

const FLUTTER_CATEGORIES: FlutterCategory[] = [
    {
        id: "flutter-getting-started",
        title: "Primeiros passos",
        topicIds: [
            "flutter-overview",
            "flutter-cli-installation",
            "flutter-setup-http-client",
            "flutter-setup-firebase",
            "flutter-setup-supabase",
            "flutter-environment",
            "flutter-add-web-support",
        ],
    },
    {
        id: "flutter-authentication",
        title: "Autenticação",
        topicIds: [
            "flutter-auth-firebase",
            "flutter-auth-own-backend",
            "flutter-auth-social",
            "flutter-auth-phone-firebase",
            "flutter-auth-phone-supabase",
        ],
    },
    {
        id: "flutter-development",
        title: "Desenvolvimento",
        topicIds: [
            "flutter-dev-architecture",
            "flutter-dev-routes-navigation",
            "flutter-dev-errors-monitoring",
            "flutter-dev-unit-tests",
            "flutter-dev-api-http",
            "flutter-dev-used-plugins",
            "flutter-dev-code-generation",
            "flutter-dev-event-dispatcher",
        ],
    },
    {
        id: "flutter-monetize",
        title: "Monetização",
        topicIds: [
            "flutter-monetize-subscription-module",
            "flutter-monetize-paywalls",
            "flutter-monetize-ads-module",
        ],
    },
    {
        id: "flutter-grow",
        title: "Crescimento",
        topicIds: [
            "flutter-grow-rating-review",
            "flutter-grow-setup-notifications",
            "flutter-grow-send-notifications",
            "flutter-grow-feedbacks",
        ],
    },
    {
        id: "flutter-dashboard",
        title: "Painel",
        topicIds: ["flutter-dashboard-installation", "flutter-dashboard-create-table-view"],
    },
    {
        id: "flutter-deploy",
        title: "Publicar seu app",
        topicIds: [
            "flutter-deploy-setup-icons-splashscreen",
            "flutter-deploy-setup-flavors",
            "flutter-deploy-prepare-for-deployment",
            "flutter-deploy-publish-google-play-store",
            "flutter-deploy-publish-apple-store",
            "flutter-deploy-publish-web-app",
            "flutter-deploy-codemagic-setup",
        ],
    },
    {
        id: "flutter-other-templates",
        title: "Outros templates",
        topicIds: [
            "flutter-other-onboarding",
            "flutter-other-internationalization",
            "flutter-other-theme-module",
            "flutter-other-storage-module",
            "flutter-other-responsive-widgets",
            "flutter-other-home-widget-command",
            "flutter-other-camera-template",
        ],
    },
];

const FLUTTER_MODULE_TITLE = "Configuração Flutter";
const FLUTTER_TOPICS_BY_ID = new Map(FLUTTER_TOPICS.map((topic) => [topic.id, topic]));
const FLUTTER_CATEGORY_TOPICS = FLUTTER_CATEGORIES.map((category) => ({
    ...category,
    topics: category.topicIds
        .map((topicId) => FLUTTER_TOPICS_BY_ID.get(topicId))
        .filter((topic): topic is Topic => Boolean(topic)),
}));
const FLUTTER_CATEGORY_BY_TOPIC_ID = FLUTTER_CATEGORY_TOPICS.reduce<Record<string, string>>(
    (acc, category) => {
        category.topics.forEach((topic) => {
            acc[topic.id] = category.title;
        });
        return acc;
    },
    {}
);

const TERMINAL_KEYWORDS = [
    "flutter",
    "run",
    "create",
    "cd",
    "git",
    "pub",
    "get",
    "analyze",
    "test",
];

const TERMINAL_LANGUAGES = new Set(["bash", "shell", "sh", "zsh"]);

const KEYWORDS_BY_LANGUAGE: Record<string, string[]> = {
    bash: TERMINAL_KEYWORDS,
    shell: TERMINAL_KEYWORDS,
    sh: TERMINAL_KEYWORDS,
    zsh: TERMINAL_KEYWORDS,
    dart: [
        "class",
        "final",
        "const",
        "var",
        "import",
        "return",
        "if",
        "else",
        "for",
        "while",
        "extends",
        "with",
        "void",
        "int",
        "double",
        "bool",
        "String",
        "Widget",
        "build",
        "override",
        "new",
        "null",
        "true",
        "false",
    ],
    yaml: [
        "name",
        "on",
        "jobs",
        "runs-on",
        "steps",
        "uses",
        "run",
        "dependencies",
        "sdk",
        "flutter",
        "true",
        "false",
    ],
    markdown: [],
    text: [],
};

const normalizeText = (value: string) =>
    value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

const escapeRegExp = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const buildTokenRegex = (keywords: string[]) => {
    const keywordPattern =
        keywords.length > 0
            ? `\\b(?:${keywords.map((keyword) => escapeRegExp(keyword)).join("|")})\\b`
            : "";

    const parts = ["\"(?:\\\\.|[^\"])*\"|'(?:\\\\.|[^'])*'", "\\b\\d+(?:\\.\\d+)?\\b"];

    if (keywordPattern) {
        parts.push(keywordPattern);
    }

    return new RegExp(parts.join("|"), "g");
};

const resolveCommentToken = (language: string) => {
    if (language === "dart") {
        return "//";
    }

    if (language === "yaml" || TERMINAL_LANGUAGES.has(language)) {
        return "#";
    }

    return "";
};

const TOPIC_FILTERS = [
    { id: "all", label: "Todos" },
    { id: "flutter", label: "Flutter" },
    ...Array.from(new Set(BASE_TOPICS.map((topic) => topic.tag))).map((tag) => ({
        id: normalizeText(tag),
        label: tag,
    })),
];

type CodeSnippetProps = {
    code: NonNullable<TopicSection["code"]>;
    blockId: string;
};

const CodeSnippet = ({ code, blockId }: CodeSnippetProps) => {
    const [copyState, setCopyState] = useState<"idle" | "success" | "error">("idle");
    const resetTimerRef = useRef<number | null>(null);

    const language = normalizeText(code.language || "text");
    const isTerminal = TERMINAL_LANGUAGES.has(language);
    const useTerminalStyle = true;
    const keywords = KEYWORDS_BY_LANGUAGE[language] ?? KEYWORDS_BY_LANGUAGE.text;
    const keywordSet = useMemo(
        () => new Set(keywords.map((keyword) => normalizeText(keyword))),
        [keywords]
    );
    const tokenRegex = useMemo(() => buildTokenRegex(keywords), [keywords]);
    const commentToken = resolveCommentToken(language);

    useEffect(() => {
        return () => {
            if (resetTimerRef.current) {
                window.clearTimeout(resetTimerRef.current);
            }
        };
    }, []);

    const scheduleReset = () => {
        if (resetTimerRef.current) {
            window.clearTimeout(resetTimerRef.current);
        }

        resetTimerRef.current = window.setTimeout(() => {
            setCopyState("idle");
        }, 2200);
    };

    const handleCopy = async () => {
        let copied = false;

        if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
            try {
                await navigator.clipboard.writeText(code.content);
                copied = true;
            } catch {
                copied = false;
            }
        }

        if (!copied && typeof document !== "undefined") {
            const textarea = document.createElement("textarea");
            textarea.value = code.content;
            textarea.setAttribute("readonly", "true");
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.select();

            try {
                copied = document.execCommand("copy");
            } catch {
                copied = false;
            } finally {
                document.body.removeChild(textarea);
            }
        }

        setCopyState(copied ? "success" : "error");
        scheduleReset();
    };

    const resolveTokenClass = (token: string) => {
        const normalizedToken = normalizeText(token);

        if (/^["']/.test(token)) {
            return useTerminalStyle ? "text-[#ffd089]" : "text-primary2";
        }

        if (/^\d/.test(token)) {
            return useTerminalStyle ? "text-[#7dd3fc]" : "text-primary3";
        }

        if (keywordSet.has(normalizedToken)) {
            return useTerminalStyle ? "text-[#8ce97a]" : "font-medium text-primary1";
        }

        if (/^[A-Z_]{2,}$/.test(token)) {
            return useTerminalStyle ? "text-[#b5c8ff]" : "text-t-primary";
        }

        return useTerminalStyle ? "text-[#d7e3ff]" : "text-t-primary";
    };

    const highlightLine = (line: string): ReactNode => {
        if (language === "markdown") {
            if (/^\s*#{1,6}\s/.test(line)) {
                return <span className={useTerminalStyle ? "text-[#8ce97a]" : "text-primary1"}>{line}</span>;
            }

            if (/^\s*-\s\[[xX ]\]/.test(line)) {
                return (
                    <span className={useTerminalStyle ? "text-[#d7e3ff]" : "font-medium text-t-primary"}>
                        {line}
                    </span>
                );
            }

            if (/^\s*-\s/.test(line)) {
                return <span className={useTerminalStyle ? "text-[#d7e3ff]" : "text-t-secondary"}>{line}</span>;
            }
        }

        let source = line;
        let commentPart = "";

        if (commentToken) {
            const commentIndex = source.indexOf(commentToken);

            if (commentIndex >= 0) {
                commentPart = source.slice(commentIndex);
                source = source.slice(0, commentIndex);
            }
        }

        const nodes: ReactNode[] = [];
        tokenRegex.lastIndex = 0;
        let cursor = 0;
        let match: RegExpExecArray | null;

        while ((match = tokenRegex.exec(source)) !== null) {
            const token = match[0];
            const start = match.index;

            if (start > cursor) {
                const plainChunk = source.slice(cursor, start);
                nodes.push(
                    <span className={useTerminalStyle ? "text-[#d7e3ff]" : "text-t-secondary"} key={`${start}-plain`}>
                        {plainChunk}
                    </span>
                );
            }

            nodes.push(
                <span className={resolveTokenClass(token)} key={`${start}-token`}>
                    {token}
                </span>
            );

            cursor = start + token.length;
        }

        if (cursor < source.length) {
            nodes.push(
                <span className={useTerminalStyle ? "text-[#d7e3ff]" : "text-t-secondary"} key="tail">
                    {source.slice(cursor)}
                </span>
            );
        }

        if (commentPart) {
            nodes.push(
                <span className={useTerminalStyle ? "text-[#6d7ca8]" : "text-t-tertiary"} key="comment">
                    {commentPart}
                </span>
            );
        }

        if (nodes.length === 0) {
            return line || " ";
        }

        return nodes;
    };

    const lines = code.content.split("\n");
    const copyLabel =
        copyState === "success" ? "Copiado" : copyState === "error" ? "Falhou" : "Copiar";

    return (
        <div
            className={`mt-5 overflow-hidden rounded-2xl border ${
                useTerminalStyle ? "border-[#1f2f57] bg-[#050a18]" : "border-stroke-subtle bg-b-surface1"
            }`}
        >
            <div
                className={`flex items-center justify-between gap-3 border-b px-3 py-2 ${
                    useTerminalStyle ? "border-[#1f2f57] bg-[#0a1022]" : "border-stroke-subtle bg-b-surface1"
                }`}
            >
                <div className="flex min-w-0 items-center gap-2">
                    <span className={`truncate text-hairline ${useTerminalStyle ? "text-[#d7e3ff]" : "text-t-secondary"}`}>
                        {code.label}
                    </span>
                    <span
                        className={`shrink-0 rounded-full border px-2 py-0.5 text-small ${
                            useTerminalStyle
                                ? "border-[#2b4170] text-[#9fb6e6]"
                                : "border-stroke1 text-t-secondary"
                        }`}
                    >
                        {isTerminal ? "terminal" : language}
                    </span>
                </div>
                <button
                    aria-label={`Copiar código: ${code.label}`}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-small transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2 ${
                        useTerminalStyle
                            ? "border-[#2b4170] text-[#d7e3ff] hover:border-[#4a6ab0] hover:text-white focus-visible:ring-offset-[#0a1022]"
                            : "border-stroke1 text-t-secondary hover:border-stroke-highlight hover:text-t-primary focus-visible:ring-offset-b-surface1"
                    }`}
                    onClick={handleCopy}
                    type="button"
                >
                    <Icon className="size-3.5 fill-current" name="copy" />
                    {copyLabel}
                </button>
            </div>
            <pre className="overflow-x-auto">
                <code className="block min-w-full px-4 py-4 text-[0.8125rem] leading-6">
                    {lines.map((line, lineIndex) => (
                        <div
                            className={`grid items-start ${
                                isTerminal
                                    ? "grid-cols-[2.5rem_1.25rem_minmax(0,1fr)]"
                                    : "grid-cols-[2.5rem_minmax(0,1fr)]"
                            }`}
                            key={`${blockId}-line-${lineIndex}`}
                        >
                            <span
                                aria-hidden
                                className={`select-none text-small leading-6 ${
                                    useTerminalStyle ? "text-[#6a83ba]" : "text-t-tertiary"
                                }`}
                            >
                                {String(lineIndex + 1).padStart(2, "0")}
                            </span>
                            {isTerminal && (
                                <span aria-hidden className="select-none text-small leading-6 text-[#8ce97a]">
                                    {line.trim() ? "$" : ""}
                                </span>
                            )}
                            <span className={useTerminalStyle ? "text-[#d7e3ff]" : "text-t-secondary"}>
                                {line ? highlightLine(line) : " "}
                            </span>
                        </div>
                    ))}
                </code>
            </pre>
            <span aria-live="polite" className="sr-only" role="status">
                {copyState === "success"
                    ? `${code.label} copiado com sucesso`
                    : copyState === "error"
                    ? "Não foi possível copiar o código"
                    : ""}
            </span>
        </div>
    );
};

const buildSearchableText = (topic: Topic, parentLabel?: string) =>
    normalizeText(
        [
            topic.title,
            topic.summary,
            topic.tag,
            parentLabel ?? "",
            ...topic.research,
            ...topic.sections.flatMap((section) => [
                section.title,
                section.intro,
                ...section.bullets,
                section.code?.content ?? "",
                section.image?.caption ?? "",
            ]),
        ].join(" ")
    );

const URL_PATTERN = /(https?:\/\/[^\s)]+)(?=[\s)]|$)/g;
const MARKDOWN_LINK_PATTERN = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const TOPIC_LINK_PATTERN = /^topic:(?:\/\/)?(.+)$/;

const renderTextWithLinks = (text: string, onTopicSelect?: (topicId: string) => void) => {
    const markdownMatches = Array.from(text.matchAll(MARKDOWN_LINK_PATTERN));

    if (markdownMatches.length > 0) {
        const nodes: ReactNode[] = [];
        let cursor = 0;

        markdownMatches.forEach((match, index) => {
            const label = match[1];
            const target = match[2];
            const full = match[0];
            const start = match.index ?? 0;

            if (start > cursor) {
                nodes.push(
                    <span key={`md-text-${index}-${cursor}`}>
                        {text.slice(cursor, start)}
                    </span>
                );
            }

            const topicMatch = target.match(TOPIC_LINK_PATTERN);
            if (topicMatch && onTopicSelect) {
                const topicId = topicMatch[1];
                nodes.push(
                    <button
                        className="cursor-pointer underline decoration-primary1/40 underline-offset-2 transition-colors hover:text-t-blue"
                        key={`md-topic-${index}-${start}`}
                        onClick={() => onTopicSelect(topicId)}
                        type="button"
                    >
                        {label}
                    </button>
                );
            } else {
                nodes.push(
                    <a
                        className="underline decoration-primary1/40 underline-offset-2 transition-colors hover:text-t-blue"
                        href={target}
                        key={`md-url-${index}-${start}`}
                        rel="noreferrer noopener"
                        target="_blank"
                    >
                        {label}
                    </a>
                );
            }

            cursor = start + full.length;
        });

        if (cursor < text.length) {
            nodes.push(<span key={`md-tail-${cursor}`}>{text.slice(cursor)}</span>);
        }

        return nodes;
    }

    const matches = Array.from(text.matchAll(URL_PATTERN));

    if (matches.length === 0) {
        return text;
    }

    const nodes: ReactNode[] = [];
    let cursor = 0;

    matches.forEach((match, index) => {
        const url = match[0];
        const start = match.index ?? 0;

        if (start > cursor) {
            nodes.push(
                <span key={`text-${index}-${cursor}`}>
                    {text.slice(cursor, start)}
                </span>
            );
        }

        nodes.push(
            <a
                className="underline decoration-primary1/40 underline-offset-2 transition-colors hover:text-t-blue"
                href={url}
                key={`url-${index}-${start}`}
                rel="noreferrer noopener"
                target="_blank"
            >
                {url}
            </a>
        );

        cursor = start + url.length;
    });

    if (cursor < text.length) {
        nodes.push(<span key={`tail-${cursor}`}>{text.slice(cursor)}</span>);
    }

    return nodes;
};

const DocumentationPage = () => {
    const [query, setQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    const [activeTopicId, setActiveTopicId] = useState(FLUTTER_TOPICS[0]?.id ?? "");
    const [openFlutterCategories, setOpenFlutterCategories] = useState<Record<string, boolean>>(
        () =>
            FLUTTER_CATEGORIES.reduce<Record<string, boolean>>((acc, category) => {
                acc[category.id] = true;
                return acc;
            }, {})
    );
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [expandedImage, setExpandedImage] = useState<TopicSection["image"] | null>(null);
    const searchInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== "/") {
                return;
            }

            const target = event.target as HTMLElement | null;
            const isTypingElement =
                target?.tagName === "INPUT" ||
                target?.tagName === "TEXTAREA" ||
                target?.tagName === "SELECT" ||
                Boolean(target?.isContentEditable);

            if (isTypingElement || event.metaKey || event.ctrlKey || event.altKey) {
                return;
            }

            event.preventDefault();
            setIsSearchOpen(true);
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (!isSearchOpen) {
            return;
        }

        const focusTimeoutId = window.setTimeout(() => {
            searchInputRef.current?.focus();
        }, 0);

        return () => {
            window.clearTimeout(focusTimeoutId);
        };
    }, [isSearchOpen]);

    const handleTopicSelect = (topicId: string) => {
        setActiveTopicId(topicId);

        const prefersReducedMotion =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "auto" : "smooth",
        });
    };

    const handleSearchTopicSelect = (topicId: string) => {
        handleTopicSelect(topicId);
        setIsSearchOpen(false);
    };

    const normalizedQuery = normalizeText(query.trim());

    const queryBaseTopics = useMemo(() => {
        if (!normalizedQuery) {
            return BASE_TOPICS;
        }

        return BASE_TOPICS.filter((topic) =>
            buildSearchableText(topic).includes(normalizedQuery)
        );
    }, [normalizedQuery]);

    const queryFlutterTopics = useMemo(() => {
        if (!normalizedQuery) {
            return FLUTTER_TOPICS;
        }

        return FLUTTER_TOPICS.filter((topic) =>
            buildSearchableText(
                topic,
                `${FLUTTER_MODULE_TITLE} ${FLUTTER_CATEGORY_BY_TOPIC_ID[topic.id] ?? ""}`
            ).includes(normalizedQuery)
        );
    }, [normalizedQuery]);

    const filterCountById = useMemo(() => {
        const counts: Record<string, number> = {
            all: queryBaseTopics.length + queryFlutterTopics.length,
            flutter: queryFlutterTopics.length,
        };

        queryBaseTopics.forEach((topic) => {
            const tagId = normalizeText(topic.tag);
            counts[tagId] = (counts[tagId] ?? 0) + 1;
        });

        return counts;
    }, [queryBaseTopics, queryFlutterTopics]);

    const visibleBaseTopics = useMemo(() => {
        if (activeFilter === "flutter") {
            return [];
        }

        if (activeFilter === "all") {
            return queryBaseTopics;
        }

        return queryBaseTopics.filter(
            (topic) => normalizeText(topic.tag) === activeFilter
        );
    }, [activeFilter, queryBaseTopics]);

    const visibleFlutterTopics = useMemo(() => {
        if (activeFilter !== "all" && activeFilter !== "flutter") {
            return [];
        }

        return queryFlutterTopics;
    }, [activeFilter, queryFlutterTopics]);

    const visibleFlutterTopicIds = useMemo(
        () => new Set(visibleFlutterTopics.map((topic) => topic.id)),
        [visibleFlutterTopics]
    );

    const visibleFlutterCategories = useMemo(
        () =>
            FLUTTER_CATEGORY_TOPICS.map((category) => ({
                ...category,
                topics: category.topics.filter((topic) => visibleFlutterTopicIds.has(topic.id)),
            })).filter((category) => category.topics.length > 0),
        [visibleFlutterTopicIds]
    );

    const visibleTopics = useMemo(
        () => [...visibleFlutterTopics, ...visibleBaseTopics],
        [visibleBaseTopics, visibleFlutterTopics]
    );

    const selectedTopic = useMemo(
        () =>
            visibleTopics.find((topic) => topic.id === activeTopicId) ??
            visibleTopics[0] ??
            null,
        [activeTopicId, visibleTopics]
    );

    const isSelectedTopicFromFlutter = selectedTopic
        ? FLUTTER_TOPICS.some((topic) => topic.id === selectedTopic.id)
        : false;
    const selectedFlutterCategory = selectedTopic
        ? FLUTTER_CATEGORY_BY_TOPIC_ID[selectedTopic.id]
        : null;

    return (
        <Layout>
            <div className="px-6 pt-8 pb-16 max-md:px-4 max-md:pt-5 max-md:pb-10">
                <div className="mx-auto w-full max-w-334">
                    <div className="overflow-hidden rounded-5xl border-[1.5px] border-stroke-subtle bg-b-surface2 shadow-[0_18px_60px_-40px_rgba(0,0,0,0.5)]">
                        <a
                            className="sr-only z-20 rounded-full bg-b-surface2 px-3 py-2 text-small focus:not-sr-only focus:absolute focus:left-5 focus:top-5 focus:outline-none focus:ring-2 focus:ring-stroke-focus"
                            href="#documentation-main"
                        >
                            Pular para o conteúdo principal
                        </a>

                        <header className="border-b border-stroke-subtle bg-linear-to-r from-primary1/10 to-transparent px-6 py-5 max-md:px-4">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-9 items-center justify-center rounded-xl bg-primary1/15">
                                        <Icon className="size-5 fill-primary1" name="post" />
                                    </div>
                                    <div>
                                        <div className="text-body-bold">Documentação</div>
                                        <div className="text-hairline text-t-secondary">
                                            Proposta, Contrato, PRD + Tasks e Configuração Flutter
                                        </div>
                                    </div>
                                </div>
                                <button
                                    aria-label="Abrir busca na documentação"
                                    className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-stroke1 bg-b-surface1 px-3 py-1.5 text-hairline text-t-secondary transition-colors hover:border-stroke-highlight hover:text-t-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2 focus-visible:ring-offset-b-surface2"
                                    onClick={() => setIsSearchOpen(true)}
                                    type="button"
                                >
                                    <Icon className="size-4 fill-current" name="search" />
                                    Buscar
                                </button>
                            </div>

                            <div
                                aria-label="Filtros de tópicos"
                                className="mt-4 flex flex-wrap gap-2"
                                role="toolbar"
                            >
                                {TOPIC_FILTERS.map((filter) => {
                                    const isActive = activeFilter === filter.id;
                                    const count = filterCountById[filter.id] ?? 0;

                                    return (
                                        <button
                                            aria-pressed={isActive}
                                            className={`inline-flex items-center gap-2 rounded-full border-[1.5px] px-3 py-1.5 text-hairline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2 focus-visible:ring-offset-b-surface2 ${
                                                isActive
                                                    ? "border-primary1/25 bg-primary1/10 text-t-blue"
                                                    : "border-stroke1 text-t-secondary hover:border-stroke-highlight hover:text-t-primary"
                                            }`}
                                            key={filter.id}
                                            onClick={() => setActiveFilter(filter.id)}
                                            type="button"
                                        >
                                            <span>{filter.label}</span>
                                            <span
                                                className={`rounded-full border px-1.5 py-0.5 text-small ${
                                                    isActive
                                                        ? "border-primary1/25 text-t-blue"
                                                        : "border-stroke1 text-t-tertiary"
                                                }`}
                                            >
                                                {count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </header>

                        <div className="grid grid-cols-[18rem_minmax(0,1fr)_14rem] max-2xl:grid-cols-[16.5rem_minmax(0,1fr)] max-md:grid-cols-1">
                            <aside className="border-r border-stroke-subtle px-4 py-5 max-md:border-r-0 max-md:border-b max-md:px-4">
                                <nav aria-label="Tópicos principais" className="sticky top-24">
                                    <div className="mb-4 text-heading-thin text-t-secondary">
                                        Tópicos principais
                                    </div>

                                    <div className="space-y-1.5">
                                        {visibleFlutterCategories.length > 0 && (
                                            <div className="rounded-xl border border-stroke1/70 bg-b-surface1/70">
                                                <div className="border-b border-stroke-subtle px-3 py-2.5">
                                                    <div className="text-body-bold">Configuração Flutter</div>
                                                </div>

                                                <div className="space-y-2 px-2 py-2">
                                                    {visibleFlutterCategories.map((category) => {
                                                        const categoryKey = category.id;
                                                        const isOpen =
                                                            normalizedQuery ||
                                                            openFlutterCategories[categoryKey] !== false;

                                                        return (
                                                            <div className="rounded-lg" key={category.id}>
                                                                <button
                                                                    aria-controls={`docs-${category.id}-subtopics`}
                                                                    aria-expanded={isOpen}
                                                                    className="flex w-full items-center justify-between px-2.5 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-inset"
                                                                    onClick={() =>
                                                                        setOpenFlutterCategories((prev) => ({
                                                                            ...prev,
                                                                            [categoryKey]: !isOpen,
                                                                        }))
                                                                    }
                                                                    type="button"
                                                                >
                                                                    <div className="text-body-bold">
                                                                        {category.title}
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="rounded-full border border-stroke1 px-2 py-0.5 text-small text-t-secondary">
                                                                            {category.topics.length}
                                                                        </span>
                                                                        <Icon
                                                                            className={`size-4 fill-t-secondary transition-transform ${
                                                                                isOpen ? "rotate-180" : ""
                                                                            }`}
                                                                            name="chevron"
                                                                        />
                                                                    </div>
                                                                </button>

                                                                {isOpen && (
                                                                    <div
                                                                        className="space-y-1 px-1 pb-1"
                                                                        id={`docs-${category.id}-subtopics`}
                                                                    >
                                                                        {category.topics.map((topic) => (
                                                                            <button
                                                                                aria-current={
                                                                                    selectedTopic?.id === topic.id
                                                                                        ? "true"
                                                                                        : undefined
                                                                                }
                                                                                className={`w-full rounded-lg px-2.5 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-inset ${
                                                                                    selectedTopic?.id === topic.id
                                                                                        ? "bg-primary1/10 text-t-blue"
                                                                                        : "text-t-secondary hover:bg-b-subtle hover:text-t-primary"
                                                                                }`}
                                                                                key={topic.id}
                                                                                onClick={() =>
                                                                                    handleTopicSelect(topic.id)
                                                                                }
                                                                                type="button"
                                                                            >
                                                                                <div className="text-hairline font-medium">
                                                                                    {topic.title}
                                                                                </div>
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {visibleBaseTopics.length > 0 && (
                                            <div className="rounded-xl border border-stroke1/70 bg-b-surface1/70 p-2">
                                                <div className="mb-1 px-2 py-1 text-small text-t-tertiary">
                                                    Outros tópicos
                                                </div>
                                                <div className="space-y-1">
                                                    {visibleBaseTopics.map((topic) => (
                                                        <button
                                                            aria-current={
                                                                selectedTopic?.id === topic.id
                                                                    ? "true"
                                                                    : undefined
                                                            }
                                                            className={`w-full rounded-lg px-2.5 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-inset ${
                                                                selectedTopic?.id === topic.id
                                                                    ? "bg-primary1/10 text-t-blue"
                                                                    : "text-t-secondary hover:bg-b-subtle hover:text-t-primary"
                                                            }`}
                                                            key={topic.id}
                                                            onClick={() => handleTopicSelect(topic.id)}
                                                            type="button"
                                                        >
                                                            <span className="text-hairline font-medium">
                                                                {topic.title}
                                                            </span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {visibleTopics.length === 0 && (
                                            <div className="rounded-xl border border-dashed border-stroke1 px-3 py-3 text-hairline text-t-secondary">
                                                Nenhum tópico encontrado.
                                            </div>
                                        )}
                                    </div>
                                </nav>
                            </aside>

                            <main className="px-7 py-6 max-md:px-4" id="documentation-main">
                                {!selectedTopic ? (
                                    <div className="rounded-2xl border border-dashed border-stroke1 px-5 py-8 text-center text-t-secondary">
                                        Ajuste a busca para visualizar um tópico.
                                    </div>
                                ) : (
                                    <>
                                        <div className="rounded-3xl border border-stroke-subtle bg-linear-to-br from-primary1/8 via-b-surface1 to-b-surface1 px-5 py-5">
                                            <div className="mb-2 flex flex-wrap items-center gap-2">
                                                <span className="inline-flex rounded-full border border-primary1/20 bg-primary1/10 px-2.5 py-1 text-small text-t-blue">
                                                    {selectedTopic.tag}
                                                </span>
                                                {isSelectedTopicFromFlutter && (
                                                    <>
                                                        <span className="inline-flex rounded-full border border-stroke1 px-2.5 py-1 text-small text-t-secondary">
                                                            Módulo: {FLUTTER_MODULE_TITLE}
                                                        </span>
                                                        {selectedFlutterCategory && (
                                                            <span className="inline-flex rounded-full border border-stroke1 px-2.5 py-1 text-small text-t-secondary">
                                                                Categoria: {selectedFlutterCategory}
                                                            </span>
                                                        )}
                                                    </>
                                                )}
                                                <span className="inline-flex rounded-full border border-stroke1 px-2.5 py-1 text-small text-t-secondary">
                                                    Tempo: {selectedTopic.readTime}
                                                </span>
                                            </div>
                                            <h1 className="text-h2 max-md:text-h4">
                                                {selectedTopic.title}
                                            </h1>
                                            <p className="mt-2 text-body text-t-secondary">
                                                {selectedTopic.summary}
                                            </p>
                                        </div>

                                        <div className="mt-7 space-y-6">
                                            {selectedTopic.sections.map((section, sectionIndex) => {
                                                const anchorId = `${selectedTopic.id}-${section.id}`;
                                                const sectionImage = section.image;

                                                return (
                                                    <section
                                                        className="scroll-mt-28 rounded-3xl border border-stroke-subtle bg-b-surface1/85 px-5 py-5"
                                                        id={anchorId}
                                                        key={section.id}
                                                    >
                                                        <div className="mb-2 flex items-center gap-2">
                                                            <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary1/10 text-small text-t-blue">
                                                                {sectionIndex + 1}
                                                            </span>
                                                            <h2 className="text-h4 max-md:text-h5">
                                                                {section.title}
                                                            </h2>
                                                        </div>
                                                        <p className="text-body text-t-secondary">
                                                            {renderTextWithLinks(section.intro, handleTopicSelect)}
                                                        </p>

                                                        <ul className="mt-4 space-y-2">
                                                            {section.bullets.map((bullet, bulletIndex) => (
                                                                <li
                                                                    className="flex items-start gap-2 text-body text-t-secondary"
                                                                    key={`${anchorId}-bullet-${bulletIndex}`}
                                                                >
                                                                    <span className="mt-1.5 inline-flex size-1.5 shrink-0 rounded-full bg-primary1"></span>
                                                                    <span>
                                                                        {renderTextWithLinks(
                                                                            bullet,
                                                                            handleTopicSelect
                                                                        )}
                                                                    </span>
                                                                </li>
                                                            ))}
                                                        </ul>

                                                        {section.code && (
                                                            <CodeSnippet code={section.code} blockId={anchorId} />
                                                        )}

                                                        {sectionImage && (
                                                            <figure className="mt-5 overflow-hidden rounded-2xl border border-stroke-subtle bg-b-surface1 p-2">
                                                                <button
                                                                    aria-label={`Abrir imagem: ${sectionImage.alt}`}
                                                                    className="group w-full rounded-xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2 focus-visible:ring-offset-b-surface1"
                                                                    onClick={() => setExpandedImage(sectionImage)}
                                                                    type="button"
                                                                >
                                                                    <div className="relative h-64 w-full overflow-hidden rounded-xl max-md:h-52">
                                                                        <Image
                                                                            alt={sectionImage.alt}
                                                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                                                                            fill
                                                                            src={sectionImage.src}
                                                                            sizes="(max-width: 767px) 100vw, 720px"
                                                                        />
                                                                        <span className="pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/35 px-2.5 py-1 text-small text-white">
                                                                            <Icon
                                                                                className="size-4 fill-current"
                                                                                name="eye"
                                                                            />
                                                                            Ampliar
                                                                        </span>
                                                                    </div>
                                                                </button>
                                                                <figcaption className="px-2 py-2 text-hairline text-t-secondary">
                                                                    {sectionImage.caption}
                                                                </figcaption>
                                                            </figure>
                                                        )}
                                                    </section>
                                                );
                                            })}
                                        </div>

                                    </>
                                )}
                            </main>

                            <aside className="border-l border-stroke-subtle px-4 py-6 max-2xl:hidden">
                                {selectedTopic && (
                                    <nav aria-label="Navegação dentro do tópico" className="sticky top-24">
                                        <div className="mb-3 flex items-center gap-2 text-heading-thin text-t-secondary">
                                            <Icon className="size-4 fill-t-secondary" name="align-right" />
                                            Neste tópico
                                        </div>
                                        <div className="space-y-1.5">
                                            {selectedTopic.sections.map((section) => {
                                                const anchorId = `${selectedTopic.id}-${section.id}`;

                                                return (
                                                    <a
                                                        className="block rounded-lg px-2.5 py-2 text-hairline text-t-secondary transition-colors hover:bg-b-surface1 hover:text-t-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2 focus-visible:ring-offset-b-surface2"
                                                        href={`#${anchorId}`}
                                                        key={section.id}
                                                    >
                                                        {section.title}
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    </nav>
                                )}
                            </aside>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                classWrapper="max-w-[68rem] border-0 !bg-transparent !p-0 !shadow-none"
                open={Boolean(expandedImage)}
                onClose={() => setExpandedImage(null)}
            >
                {expandedImage && (
                    <figure>
                        <div className="relative h-[72vh] max-h-[42rem] w-full overflow-hidden rounded-2xl">
                            <Image
                                alt={expandedImage.alt}
                                className="h-full w-full object-contain"
                                fill
                                src={expandedImage.src}
                                sizes="(max-width: 767px) 100vw, 1100px"
                            />
                        </div>
                        <figcaption className="mt-3 px-1 text-center text-heading-thin text-white/80">
                            {expandedImage.caption}
                        </figcaption>
                    </figure>
                )}
            </Modal>

            <Modal
                classWrapper="max-w-160 rounded-3xl border border-stroke1 bg-b-surface2 p-4 max-md:p-3"
                open={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            >
                <div className="space-y-3">
                    <label className="sr-only" htmlFor="docs-search-modal">
                        Buscar tópicos da documentação
                    </label>
                    <div className="flex items-center gap-2 rounded-2xl border-[1.5px] border-stroke1 bg-b-surface1/70 px-3 py-2.5 transition-colors focus-within:border-primary1/30">
                        <Icon className="size-5 fill-t-secondary" name="search" />
                        <input
                            aria-label="Buscar tópicos da documentação"
                            className="w-full bg-transparent text-heading-thin text-t-primary outline-0 placeholder:text-t-tertiary"
                            id="docs-search-modal"
                            placeholder="Buscar tópico ou seção..."
                            ref={searchInputRef}
                            type="text"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        {query && (
                            <button
                                className="inline-flex items-center rounded-full px-2 py-1 text-small text-t-secondary transition-colors hover:bg-b-subtle hover:text-t-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2 focus-visible:ring-offset-b-surface2"
                                onClick={() => setQuery("")}
                                type="button"
                            >
                                Limpar
                            </button>
                        )}
                    </div>

                    <div className="max-h-90 overflow-y-auto pr-1">
                        <div className="space-y-1">
                            {visibleTopics.slice(0, 10).map((topic) => (
                                <button
                                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2 focus-visible:ring-offset-b-surface2 ${
                                        selectedTopic?.id === topic.id
                                            ? "bg-primary1/10 text-t-blue"
                                            : "text-t-secondary hover:bg-b-surface1 hover:text-t-primary"
                                    }`}
                                    key={topic.id}
                                    onClick={() => handleSearchTopicSelect(topic.id)}
                                    type="button"
                                >
                                    <span className="text-heading-thin">{topic.title}</span>
                                    <span className="text-small text-t-tertiary">{topic.tag}</span>
                                </button>
                            ))}
                        </div>
                        {visibleTopics.length === 0 && (
                            <div className="rounded-xl border border-dashed border-stroke1 px-3 py-4 text-center text-hairline text-t-secondary">
                                Nenhum tópico encontrado.
                            </div>
                        )}
                    </div>
                </div>
            </Modal>
        </Layout>
    );
};

export default DocumentationPage;
