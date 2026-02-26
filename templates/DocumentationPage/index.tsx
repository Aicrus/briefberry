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
                bullets: ["Consulte a documentação oficial para outros sistemas operacionais."],
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
                    "Guia em vídeo de instalação disponível:",
                    "https://www.youtube.com/watch?v=fq4N0hgOWzU",
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
                bullets: ["Consulte a documentação oficial para outros sistemas operacionais."],
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
                    "Consulte a documentação de rotas/navegação para mais detalhes.",
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
                    "Acesse o Firebase Console e entre no seu projeto.",
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
                    "A maioria dos provedores usa OAuth2.",
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
                    "Siga a documentação do Firebase para adicionar Play Integrity API no projeto Android.",
                ],
            },
            {
                id: "ios-phone-auth",
                title: "Setup iOS",
                intro:
                    "👉 Firebase phone auth exige adicionar um custom URL scheme no projeto Xcode.",
                bullets: [
                    "Siga a documentação do Firebase para adicionar o custom URL scheme no Xcode.",
                    "👉 Se ainda não estiver feito, adicione uma APN notification key no projeto Firebase.",
                    "O template já inclui a base de setup de notificações; use o guia de push notifications com Firebase para criar a APN key.",
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
        summary: "Configuração e boas práticas de navegação.",
        tag: "Flutter",
        readTime: "2 min",
        sections: [
            {
                id: "dev-routes-placeholder",
                title: "Conteúdo em preparação",
                intro: "Envie o conteúdo e eu aplico aqui no padrão da documentação.",
                bullets: ["Tópico de rotas e navegação aguardando conteúdo."],
            },
        ],
        research: ["flutter routes navigation"],
    },
    {
        id: "flutter-dev-errors-monitoring",
        title: "Erros e monitoramento",
        summary: "Estratégia de captura e monitoramento de erros.",
        tag: "Flutter",
        readTime: "2 min",
        sections: [
            {
                id: "dev-errors-placeholder",
                title: "Conteúdo em preparação",
                intro: "Envie o conteúdo e eu aplico aqui no padrão da documentação.",
                bullets: ["Tópico de erros e monitoramento aguardando conteúdo."],
            },
        ],
        research: ["flutter monitoring errors"],
    },
    {
        id: "flutter-dev-unit-tests",
        title: "Escrevendo testes unitários",
        summary: "Padrões para criar e manter testes unitários.",
        tag: "Flutter",
        readTime: "2 min",
        sections: [
            {
                id: "dev-tests-placeholder",
                title: "Conteúdo em preparação",
                intro: "Envie o conteúdo e eu aplico aqui no padrão da documentação.",
                bullets: ["Tópico de testes unitários aguardando conteúdo."],
            },
        ],
        research: ["flutter unit tests"],
    },
    {
        id: "flutter-dev-api-http",
        title: "API e requisições HTTP",
        summary: "Integração com API e fluxo de requisições HTTP.",
        tag: "Flutter",
        readTime: "2 min",
        sections: [
            {
                id: "dev-api-placeholder",
                title: "Conteúdo em preparação",
                intro: "Envie o conteúdo e eu aplico aqui no padrão da documentação.",
                bullets: ["Tópico de API e HTTP aguardando conteúdo."],
            },
        ],
        research: ["flutter api http"],
    },
    {
        id: "flutter-dev-used-plugins",
        title: "Plugins usados",
        summary: "Lista e função dos plugins principais do projeto.",
        tag: "Flutter",
        readTime: "2 min",
        sections: [
            {
                id: "dev-plugins-placeholder",
                title: "Conteúdo em preparação",
                intro: "Envie o conteúdo e eu aplico aqui no padrão da documentação.",
                bullets: ["Tópico de plugins usados aguardando conteúdo."],
            },
        ],
        research: ["flutter plugins"],
    },
    {
        id: "flutter-dev-code-generation",
        title: "Geração de código",
        summary: "Fluxo de geração de código e automações.",
        tag: "Flutter",
        readTime: "2 min",
        sections: [
            {
                id: "dev-codegen-placeholder",
                title: "Conteúdo em preparação",
                intro: "Envie o conteúdo e eu aplico aqui no padrão da documentação.",
                bullets: ["Tópico de geração de código aguardando conteúdo."],
            },
        ],
        research: ["flutter code generation"],
    },
    {
        id: "flutter-dev-event-dispatcher",
        title: "Event Dispatcher",
        summary: "Organização e despacho de eventos na aplicação.",
        tag: "Flutter",
        readTime: "2 min",
        sections: [
            {
                id: "dev-events-placeholder",
                title: "Conteúdo em preparação",
                intro: "Envie o conteúdo e eu aplico aqui no padrão da documentação.",
                bullets: ["Tópico de Event Dispatcher aguardando conteúdo."],
            },
        ],
        research: ["flutter event dispatcher"],
    },
    {
        id: "flutter-monetize-subscription-module",
        title: "Módulo de assinatura",
        summary: "Configuração e uso do módulo de assinaturas.",
        tag: "Flutter",
        readTime: "2 min",
        sections: [
            {
                id: "monetize-subscription-placeholder",
                title: "Conteúdo em preparação",
                intro: "Envie o conteúdo e eu aplico aqui no padrão da documentação.",
                bullets: ["Tópico de módulo de assinatura aguardando conteúdo."],
            },
        ],
        research: ["flutter subscriptions module"],
    },
    {
        id: "flutter-monetize-paywalls",
        title: "Paywalls",
        summary: "Estratégias e configuração de telas de paywall.",
        tag: "Flutter",
        readTime: "2 min",
        sections: [
            {
                id: "monetize-paywalls-placeholder",
                title: "Conteúdo em preparação",
                intro: "Envie o conteúdo e eu aplico aqui no padrão da documentação.",
                bullets: ["Tópico de paywalls aguardando conteúdo."],
            },
        ],
        research: ["flutter paywall"],
    },
    {
        id: "flutter-monetize-ads-module",
        title: "Módulo de anúncios",
        summary: "Integração de anúncios e pontos de exibição.",
        tag: "Flutter",
        readTime: "2 min",
        sections: [
            {
                id: "monetize-ads-placeholder",
                title: "Conteúdo em preparação",
                intro: "Envie o conteúdo e eu aplico aqui no padrão da documentação.",
                bullets: ["Tópico de módulo de anúncios aguardando conteúdo."],
            },
        ],
        research: ["flutter ads module"],
    },
    {
        id: "flutter-grow-rating-review",
        title: "Avaliações e reviews",
        summary: "Solicitação de avaliação e estratégia de reviews.",
        tag: "Flutter",
        readTime: "2 min",
        sections: [
            {
                id: "grow-rating-placeholder",
                title: "Conteúdo em preparação",
                intro: "Envie o conteúdo e eu aplico aqui no padrão da documentação.",
                bullets: ["Tópico de avaliações e reviews aguardando conteúdo."],
            },
        ],
        research: ["flutter rating review"],
    },
    {
        id: "flutter-grow-setup-notifications",
        title: "Setup de notificações",
        summary: "Configuração inicial de notificações no app.",
        tag: "Flutter",
        readTime: "2 min",
        sections: [
            {
                id: "grow-setup-notifications-placeholder",
                title: "Conteúdo em preparação",
                intro: "Envie o conteúdo e eu aplico aqui no padrão da documentação.",
                bullets: ["Tópico de setup de notificações aguardando conteúdo."],
            },
        ],
        research: ["flutter setup notifications"],
    },
    {
        id: "flutter-grow-send-notifications",
        title: "Enviar notificações",
        summary: "Fluxo para envio de notificações aos usuários.",
        tag: "Flutter",
        readTime: "2 min",
        sections: [
            {
                id: "grow-send-notifications-placeholder",
                title: "Conteúdo em preparação",
                intro: "Envie o conteúdo e eu aplico aqui no padrão da documentação.",
                bullets: ["Tópico de envio de notificações aguardando conteúdo."],
            },
        ],
        research: ["flutter send notifications"],
    },
    {
        id: "flutter-grow-feedbacks",
        title: "Feedbacks",
        summary: "Coleta e tratamento de feedback dos usuários.",
        tag: "Flutter",
        readTime: "2 min",
        sections: [
            {
                id: "grow-feedbacks-placeholder",
                title: "Conteúdo em preparação",
                intro: "Envie o conteúdo e eu aplico aqui no padrão da documentação.",
                bullets: ["Tópico de feedbacks aguardando conteúdo."],
            },
        ],
        research: ["flutter user feedback"],
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
        title: "Development",
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
        title: "Monetize",
        topicIds: [
            "flutter-monetize-subscription-module",
            "flutter-monetize-paywalls",
            "flutter-monetize-ads-module",
        ],
    },
    {
        id: "flutter-grow",
        title: "Grow",
        topicIds: [
            "flutter-grow-rating-review",
            "flutter-grow-setup-notifications",
            "flutter-grow-send-notifications",
            "flutter-grow-feedbacks",
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
                                                            {section.intro}
                                                        </p>

                                                        <ul className="mt-4 space-y-2">
                                                            {section.bullets.map((bullet, bulletIndex) => (
                                                                <li
                                                                    className="flex items-start gap-2 text-body text-t-secondary"
                                                                    key={`${anchorId}-bullet-${bulletIndex}`}
                                                                >
                                                                    <span className="mt-1.5 inline-flex size-1.5 shrink-0 rounded-full bg-primary1"></span>
                                                                    <span>{bullet}</span>
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
