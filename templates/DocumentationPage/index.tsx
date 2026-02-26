"use client";

import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import Layout from "@/components/Layout";
import Icon from "@/components/Icon";
import Button from "@/components/Button";
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
        id: "flutter-introducao",
        title: "Introducao",
        summary:
            "Visao geral da configuracao Flutter e ordem recomendada para iniciar o projeto.",
        tag: "Flutter",
        readTime: "3 min",
        sections: [
            {
                id: "visao-geral",
                title: "Como usar este modulo",
                intro:
                    "Este modulo esta separado em passos para facilitar setup tecnico sem perder padrao.",
                bullets: [
                    "Siga do passo 1 ao 10 para evitar retrabalho.",
                    "Valide cada etapa antes de avancar.",
                    "Documente decisoes tecnicas principais.",
                ],
                image: {
                    src: "/images/screen-dark-1.png",
                    alt: "Modulo de configuracao Flutter",
                    caption:
                        "Painel de referencia para setup tecnico de app Flutter.",
                },
            },
        ],
        research: ["roadmap setup flutter", "guia inicial flutter"],
    },
    {
        id: "flutter-sdk-ambiente",
        title: "SDK e ambiente local",
        summary: "Valide versao, dependencias e device antes de iniciar desenvolvimento.",
        tag: "Flutter",
        readTime: "3 min",
        sections: [
            {
                id: "check-ambiente",
                title: "Checklist de ambiente",
                intro:
                    "Um ambiente valido evita erros de build e problemas de plugin no inicio.",
                bullets: [
                    "Instale Flutter estavel e SDK compativel.",
                    "Rode diagnostico completo.",
                    "Garanta emulador ou device pronto.",
                ],
                code: {
                    label: "Verificacao",
                    language: "bash",
                    content: `flutter --version\nflutter doctor -v`,
                },
            },
        ],
        research: ["flutter doctor", "setup ambiente flutter"],
    },
    {
        id: "flutter-criacao-projeto",
        title: "Criacao do projeto",
        summary: "Padronize nome e estrutura inicial desde o primeiro commit.",
        tag: "Flutter",
        readTime: "3 min",
        sections: [
            {
                id: "bootstrap",
                title: "Bootstrap inicial",
                intro:
                    "Crie o app com nomenclatura consistente e execute para validar o setup.",
                bullets: [
                    "Use nome curto e alinhado ao produto.",
                    "Crie branch base para arquitetura.",
                    "Execute build inicial sem warnings.",
                ],
                code: {
                    label: "Criar app",
                    language: "bash",
                    content: `flutter create app_briefberry\ncd app_briefberry\nflutter run`,
                },
            },
        ],
        research: ["flutter create projeto", "nomenclatura app flutter"],
    },
    {
        id: "flutter-estrutura-pastas",
        title: "Estrutura de pastas",
        summary: "Organize camadas para escalar com clareza e menor acoplamento.",
        tag: "Flutter",
        readTime: "4 min",
        sections: [
            {
                id: "arquitetura",
                title: "Arquitetura sugerida",
                intro:
                    "Separar core, features e camadas tecnicas facilita manutencao e onboarding.",
                bullets: [
                    "Separe data, domain e presentation por feature.",
                    "Mantenha utilitarios em core.",
                    "Evite codigo de infraestrutura dentro de widget.",
                ],
                code: {
                    label: "Estrutura",
                    language: "text",
                    content: `lib/\n  core/\n    theme/\n    network/\n    utils/\n  features/\n    auth/\n      data/\n      domain/\n      presentation/\n    dashboard/\n      data/\n      domain/\n      presentation/\n  app.dart\n  main.dart`,
                },
            },
        ],
        research: ["clean architecture flutter", "estrutura de pastas flutter"],
    },
    {
        id: "flutter-dependencias-pubspec",
        title: "Dependencias no pubspec",
        summary: "Defina base minima de libs para estado, rota e comunicacao HTTP.",
        tag: "Flutter",
        readTime: "4 min",
        sections: [
            {
                id: "base-dependencias",
                title: "Base de dependencias",
                intro:
                    "Comece simples. Inclua apenas libs que resolvem requisitos do MVP.",
                bullets: [
                    "Estado com Riverpod.",
                    "Roteamento com GoRouter.",
                    "Requisicao HTTP com Dio.",
                ],
                code: {
                    label: "pubspec.yaml (base)",
                    language: "yaml",
                    content: `dependencies:\n  flutter:\n    sdk: flutter\n  flutter_riverpod: ^2.5.1\n  go_router: ^14.2.0\n  dio: ^5.5.0\n  flutter_secure_storage: ^9.2.2`,
                },
            },
        ],
        research: ["dependencias essenciais flutter", "pubspec exemplo"],
    },
    {
        id: "flutter-estado-riverpod",
        title: "Estado com Riverpod",
        summary: "Padrao de estado previsivel para reduzir duplicacao de regra na UI.",
        tag: "Flutter",
        readTime: "4 min",
        sections: [
            {
                id: "provider-base",
                title: "Provider basico",
                intro:
                    "Use providers para expor estado e manter logica fora dos widgets.",
                bullets: [
                    "StateNotifier para fluxos complexos.",
                    "Estado de dominio separado de estado de tela.",
                    "Teste providers isoladamente.",
                ],
                code: {
                    label: "Provider simples",
                    language: "dart",
                    content: `final counterProvider = StateProvider<int>((ref) => 0);\n\nclass CounterView extends ConsumerWidget {\n  const CounterView({super.key});\n\n  @override\n  Widget build(BuildContext context, WidgetRef ref) {\n    final value = ref.watch(counterProvider);\n    return Text('Valor: $value');\n  }\n}`,
                },
            },
        ],
        research: ["riverpod flutter exemplo", "state notifier flutter"],
    },
    {
        id: "flutter-roteamento-gorouter",
        title: "Roteamento com GoRouter",
        summary: "Organize rotas e controle de acesso para fluxos autenticados.",
        tag: "Flutter",
        readTime: "4 min",
        sections: [
            {
                id: "router-base",
                title: "Router inicial",
                intro:
                    "Centralize definicao de rotas e redirecionamento para manter fluxo previsivel.",
                bullets: [
                    "Defina rotas publicas e privadas.",
                    "Aplique redirect em caso de sessao invalida.",
                    "Padronize nomes de rota.",
                ],
                code: {
                    label: "GoRouter",
                    language: "dart",
                    content: `final router = GoRouter(\n  routes: [\n    GoRoute(path: '/', builder: (_, __) => const HomePage()),\n    GoRoute(path: '/login', builder: (_, __) => const LoginPage()),\n  ],\n);`,
                },
            },
        ],
        research: ["gorouter flutter", "auth redirect gorouter"],
    },
    {
        id: "flutter-flavors-ambientes",
        title: "Ambientes (dev, stage, prod)",
        summary: "Separe configuracoes por ambiente para evitar mistura de dados e APIs.",
        tag: "Flutter",
        readTime: "4 min",
        sections: [
            {
                id: "flavors",
                title: "Flavors",
                intro:
                    "Use entrypoints separados para cada ambiente e mantenha variaveis isoladas.",
                bullets: [
                    "Crie main_dev, main_stage e main_prod.",
                    "Defina baseUrl por ambiente.",
                    "Documente comando de execucao para time.",
                ],
                code: {
                    label: "Executar por ambiente",
                    language: "bash",
                    content: `flutter run --flavor dev -t lib/main_dev.dart\nflutter run --flavor stage -t lib/main_stage.dart\nflutter run --flavor prod -t lib/main_prod.dart`,
                },
            },
        ],
        research: ["flutter flavors", "flutter multi ambiente"],
    },
    {
        id: "flutter-api-dio",
        title: "Camada de API com Dio",
        summary: "Padronize chamadas HTTP, timeout e tratamento de erro de rede.",
        tag: "Flutter",
        readTime: "4 min",
        sections: [
            {
                id: "cliente-http",
                title: "Cliente HTTP base",
                intro:
                    "Um client unico facilita logs, autenticacao e manutencao da camada de dados.",
                bullets: [
                    "Configure baseUrl e timeout padrao.",
                    "Aplique headers globais.",
                    "Use interceptors para erros e refresh token.",
                ],
                code: {
                    label: "Dio base",
                    language: "dart",
                    content: `final dio = Dio(\n  BaseOptions(\n    baseUrl: 'https://api.seudominio.com',\n    connectTimeout: const Duration(seconds: 20),\n    receiveTimeout: const Duration(seconds: 20),\n  ),\n);`,
                },
            },
        ],
        research: ["dio flutter best practices", "interceptor dio flutter"],
    },
    {
        id: "flutter-qualidade-release",
        title: "Qualidade, CI e release",
        summary: "Feche o setup com pipeline automatizado para manter previsibilidade de entrega.",
        tag: "Flutter",
        readTime: "5 min",
        sections: [
            {
                id: "pipeline",
                title: "Pipeline minimo",
                intro:
                    "Automatize analyze e test para impedir regressao antes de merge e release.",
                bullets: [
                    "Rode format, analyze e test no CI.",
                    "Use checklist de release para Android e iOS.",
                    "Versione changelog por entrega.",
                ],
                code: {
                    label: "GitHub Actions",
                    language: "yaml",
                    content: `name: flutter-ci\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: subosito/flutter-action@v2\n      - run: flutter pub get\n      - run: flutter analyze\n      - run: flutter test`,
                },
                image: {
                    src: "/images/screen-dark-1.png",
                    alt: "Pipeline de qualidade Flutter",
                    caption: "Exemplo visual de painel tecnico para pipeline e release.",
                },
            },
        ],
        research: ["flutter ci github actions", "checklist release flutter"],
    },
];

const FLUTTER_GROUP = {
    id: "configuracao-flutter",
    title: "Configuracao Flutter",
    summary:
        "Modulo separado com submenu: introducao, setup tecnico e padrao de arquitetura.",
};

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
            return isTerminal ? "text-[#ffd089]" : "text-primary2";
        }

        if (/^\d/.test(token)) {
            return isTerminal ? "text-[#7dd3fc]" : "text-primary3";
        }

        if (keywordSet.has(normalizedToken)) {
            return isTerminal ? "text-[#8ce97a]" : "font-medium text-primary1";
        }

        if (/^[A-Z_]{2,}$/.test(token)) {
            return isTerminal ? "text-[#b5c8ff]" : "text-t-primary";
        }

        return isTerminal ? "text-[#d7e3ff]" : "text-t-primary";
    };

    const highlightLine = (line: string): ReactNode => {
        if (language === "markdown") {
            if (/^\s*#{1,6}\s/.test(line)) {
                return <span className={isTerminal ? "text-[#8ce97a]" : "text-primary1"}>{line}</span>;
            }

            if (/^\s*-\s\[[xX ]\]/.test(line)) {
                return (
                    <span className={isTerminal ? "text-[#d7e3ff]" : "font-medium text-t-primary"}>
                        {line}
                    </span>
                );
            }

            if (/^\s*-\s/.test(line)) {
                return <span className={isTerminal ? "text-[#d7e3ff]" : "text-t-secondary"}>{line}</span>;
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
                    <span className={isTerminal ? "text-[#d7e3ff]" : "text-t-secondary"} key={`${start}-plain`}>
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
                <span className={isTerminal ? "text-[#d7e3ff]" : "text-t-secondary"} key="tail">
                    {source.slice(cursor)}
                </span>
            );
        }

        if (commentPart) {
            nodes.push(
                <span className={isTerminal ? "text-[#6d7ca8]" : "text-t-tertiary"} key="comment">
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
                isTerminal ? "border-[#1f2f57] bg-[#050a18]" : "border-stroke-subtle bg-b-surface1"
            }`}
        >
            <div
                className={`flex items-center justify-between gap-3 border-b px-3 py-2 ${
                    isTerminal ? "border-[#1f2f57] bg-[#0a1022]" : "border-stroke-subtle bg-b-surface1"
                }`}
            >
                <div className="flex min-w-0 items-center gap-2">
                    <span className={`truncate text-hairline ${isTerminal ? "text-[#d7e3ff]" : "text-t-secondary"}`}>
                        {code.label}
                    </span>
                    <span
                        className={`shrink-0 rounded-full border px-2 py-0.5 text-small ${
                            isTerminal
                                ? "border-[#2b4170] text-[#9fb6e6]"
                                : "border-stroke1 text-t-secondary"
                        }`}
                    >
                        {isTerminal ? "terminal" : language}
                    </span>
                </div>
                <button
                    aria-label={`Copiar codigo: ${code.label}`}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-small transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2 ${
                        isTerminal
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
                                    isTerminal ? "text-[#6a83ba]" : "text-t-tertiary"
                                }`}
                            >
                                {String(lineIndex + 1).padStart(2, "0")}
                            </span>
                            {isTerminal && (
                                <span aria-hidden className="select-none text-small leading-6 text-[#8ce97a]">
                                    {line.trim() ? "$" : ""}
                                </span>
                            )}
                            <span className={isTerminal ? "text-[#d7e3ff]" : "text-t-secondary"}>
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
                    ? "Nao foi possivel copiar o codigo"
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
    const [isFlutterOpen, setIsFlutterOpen] = useState(true);
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
            buildSearchableText(topic, FLUTTER_GROUP.title).includes(normalizedQuery)
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

    const showFlutterGroup =
        (activeFilter === "all" || activeFilter === "flutter") &&
        (!normalizedQuery || visibleFlutterTopics.length > 0);
    const showFlutterChildren = normalizedQuery ? true : isFlutterOpen;

    const isSelectedTopicFromFlutter = selectedTopic
        ? FLUTTER_TOPICS.some((topic) => topic.id === selectedTopic.id)
        : false;
    const resultsLabel =
        visibleTopics.length === 1
            ? "1 topico encontrado"
            : `${visibleTopics.length} topicos encontrados`;

    return (
        <Layout>
            <div className="px-6 pt-8 pb-16 max-md:px-4 max-md:pt-5 max-md:pb-10">
                <div className="mx-auto w-full max-w-334">
                    <div className="overflow-hidden rounded-5xl border-[1.5px] border-stroke-subtle bg-b-surface2 shadow-[0_18px_60px_-40px_rgba(0,0,0,0.5)]">
                        <a
                            className="sr-only z-20 rounded-full bg-b-surface2 px-3 py-2 text-small focus:not-sr-only focus:absolute focus:left-5 focus:top-5 focus:outline-none focus:ring-2 focus:ring-stroke-focus"
                            href="#documentation-main"
                        >
                            Pular para o conteudo principal
                        </a>

                        <header className="border-b border-stroke-subtle bg-linear-to-r from-primary1/10 to-transparent px-6 py-5 max-md:px-4">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-9 items-center justify-center rounded-xl bg-primary1/15">
                                        <Icon className="size-5 fill-primary1" name="post" />
                                    </div>
                                    <div>
                                        <div className="text-body-bold">Documentacao</div>
                                        <div className="text-hairline text-t-secondary">
                                            Proposta, Contrato, PRD + Tasks e Config Flutter
                                        </div>
                                    </div>
                                </div>
                                <button
                                    aria-label="Abrir busca na documentacao"
                                    className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-stroke1 bg-b-surface1 px-3 py-1.5 text-hairline text-t-secondary transition-colors hover:border-stroke-highlight hover:text-t-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2 focus-visible:ring-offset-b-surface2"
                                    onClick={() => setIsSearchOpen(true)}
                                    type="button"
                                >
                                    <Icon className="size-4 fill-current" name="documents" />
                                    Buscar
                                </button>
                            </div>

                            <div
                                aria-label="Filtros de topicos"
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
                                <nav aria-label="Topicos principais" className="sticky top-24">
                                    <div className="mb-4 text-heading-thin text-t-secondary">
                                        Topicos principais
                                    </div>

                                    <div className="space-y-1.5">
                                        {showFlutterGroup && (
                                            <div className="rounded-xl border border-stroke1/70 bg-b-surface1/70">
                                                <button
                                                    aria-controls="docs-flutter-subtopics"
                                                    aria-expanded={showFlutterChildren}
                                                    className="flex w-full items-center justify-between px-3 py-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-inset"
                                                    onClick={() => {
                                                        const nextOpen = !isFlutterOpen;
                                                        setIsFlutterOpen(nextOpen);

                                                        if (nextOpen) {
                                                            const firstFlutterTopic =
                                                                visibleFlutterTopics[0] ?? FLUTTER_TOPICS[0];
                                                            if (firstFlutterTopic) {
                                                                handleTopicSelect(firstFlutterTopic.id);
                                                            }
                                                        }
                                                    }}
                                                    type="button"
                                                >
                                                    <div>
                                                        <div className="text-body-bold">
                                                            {FLUTTER_GROUP.title}
                                                        </div>
                                                        <div className="text-hairline text-t-secondary">
                                                            {FLUTTER_GROUP.summary}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="rounded-full border border-stroke1 px-2 py-0.5 text-small text-t-secondary">
                                                            {visibleFlutterTopics.length}
                                                        </span>
                                                        <Icon
                                                            className={`size-4 fill-t-secondary transition-transform ${
                                                                showFlutterChildren ? "rotate-180" : ""
                                                            }`}
                                                            name="chevron"
                                                        />
                                                    </div>
                                                </button>

                                                {showFlutterChildren && (
                                                    <div
                                                        className="space-y-1 border-t border-stroke-subtle px-2 py-2"
                                                        id="docs-flutter-subtopics"
                                                    >
                                                        {visibleFlutterTopics.map((topic) => (
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
                                                                <div className="text-hairline font-medium">
                                                                    {topic.title}
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {visibleBaseTopics.map((topic) => (
                                            <button
                                                aria-current={selectedTopic?.id === topic.id ? "true" : undefined}
                                                className={`w-full rounded-xl border px-3 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2 focus-visible:ring-offset-b-surface2 ${
                                                    selectedTopic?.id === topic.id
                                                        ? "border-primary1/25 bg-primary1/10"
                                                        : "border-transparent hover:border-stroke1 hover:bg-b-surface1"
                                                }`}
                                                key={topic.id}
                                                onClick={() => handleTopicSelect(topic.id)}
                                                type="button"
                                            >
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="text-body-bold">{topic.title}</span>
                                                    <span className="text-small text-t-tertiary">
                                                        {topic.readTime}
                                                    </span>
                                                </div>
                                                <div className="mt-2 text-hairline text-t-secondary">
                                                    {topic.summary}
                                                </div>
                                            </button>
                                        ))}

                                        {visibleTopics.length === 0 && (
                                            <div className="rounded-xl border border-dashed border-stroke1 px-3 py-3 text-hairline text-t-secondary">
                                                Nenhum topico encontrado.
                                            </div>
                                        )}
                                    </div>
                                </nav>
                            </aside>

                            <main className="px-7 py-6 max-md:px-4" id="documentation-main">
                                {!selectedTopic ? (
                                    <div className="rounded-2xl border border-dashed border-stroke1 px-5 py-8 text-center text-t-secondary">
                                        Ajuste a busca para visualizar um topico.
                                    </div>
                                ) : (
                                    <>
                                        <div className="rounded-3xl border border-stroke-subtle bg-linear-to-br from-primary1/8 via-b-surface1 to-b-surface1 px-5 py-5">
                                            <div className="mb-2 flex flex-wrap items-center gap-2">
                                                <span className="inline-flex rounded-full border border-primary1/20 bg-primary1/10 px-2.5 py-1 text-small text-t-blue">
                                                    {selectedTopic.tag}
                                                </span>
                                                {isSelectedTopicFromFlutter && (
                                                    <span className="inline-flex rounded-full border border-stroke1 px-2.5 py-1 text-small text-t-secondary">
                                                        Modulo: {FLUTTER_GROUP.title}
                                                    </span>
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

                                        <div className="mt-6 rounded-3xl border border-stroke-subtle bg-b-surface1 px-5 py-5">
                                            <div className="text-body-bold">Topicos para pesquisar</div>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {selectedTopic.research.map((term) => (
                                                    <button
                                                        className="rounded-full border border-stroke1 px-3 py-1.5 text-hairline text-t-secondary transition-colors hover:border-stroke-highlight hover:text-t-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2 focus-visible:ring-offset-b-surface1"
                                                        key={term}
                                                        onClick={() => setQuery(term)}
                                                        type="button"
                                                    >
                                                        {term}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-6 flex gap-2 max-md:flex-col">
                                            <Button as="link" href="/quiz" isSecondary>
                                                Criar proposta
                                            </Button>
                                            <Button as="link" href="/quiz/contract" isStroke>
                                                Criar contrato
                                            </Button>
                                            <Button as="link" href="/quiz/prd" isStroke>
                                                Criar PRD
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </main>

                            <aside className="border-l border-stroke-subtle px-4 py-6 max-2xl:hidden">
                                {selectedTopic && (
                                    <nav aria-label="Navegacao dentro do topico" className="sticky top-24">
                                        <div className="mb-3 flex items-center gap-2 text-heading-thin text-t-secondary">
                                            <Icon className="size-4 fill-t-secondary" name="align-right" />
                                            Neste topico
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
                classWrapper="max-w-[68rem] rounded-3xl border border-stroke1 bg-b-surface2 p-4 max-md:p-3"
                open={Boolean(expandedImage)}
                onClose={() => setExpandedImage(null)}
            >
                {expandedImage && (
                    <figure>
                        <div className="relative h-[72vh] max-h-[42rem] w-full overflow-hidden rounded-2xl bg-b-surface1">
                            <Image
                                alt={expandedImage.alt}
                                className="h-full w-full object-contain"
                                fill
                                src={expandedImage.src}
                                sizes="(max-width: 767px) 100vw, 1100px"
                            />
                        </div>
                        <figcaption className="mt-3 px-1 text-heading-thin text-t-secondary">
                            {expandedImage.caption}
                        </figcaption>
                    </figure>
                )}
            </Modal>

            <Modal
                classWrapper="max-w-160 rounded-3xl border border-stroke1 bg-b-surface2 p-6 max-md:p-4"
                open={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            >
                <div>
                    <label
                        className="mb-2 block text-heading-thin text-t-secondary"
                        htmlFor="docs-search-modal"
                    >
                        Buscar na documentacao
                    </label>
                    <div className="flex items-center gap-3 rounded-2xl border-[1.5px] border-stroke1 bg-transparent px-4 py-3">
                        <Icon className="size-5 fill-t-secondary" name="post" />
                        <input
                            aria-describedby="docs-search-modal-hint docs-search-modal-status"
                            className="w-full bg-transparent text-heading-thin text-t-primary outline-0 placeholder:text-t-tertiary"
                            id="docs-search-modal"
                            placeholder="Buscar em proposta, contrato, PRD + tasks ou configuracao Flutter..."
                            ref={searchInputRef}
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        {query && (
                            <button
                                className="rounded-full px-2.5 py-1 text-small text-t-secondary transition-colors hover:bg-b-subtle hover:text-t-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2 focus-visible:ring-offset-b-surface2"
                                onClick={() => setQuery("")}
                                type="button"
                            >
                                Limpar
                            </button>
                        )}
                    </div>
                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-small text-t-secondary">
                        <p id="docs-search-modal-hint">Atalho: pressione / para focar a busca.</p>
                        <p aria-live="polite" id="docs-search-modal-status" role="status">
                            {resultsLabel}
                        </p>
                    </div>
                </div>
            </Modal>
        </Layout>
    );
};

export default DocumentationPage;
