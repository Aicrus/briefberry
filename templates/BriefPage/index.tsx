"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import BriefSection from "@/components/BriefSection";
import BriefCategory from "@/components/BriefCategory";
import SignaturePadModal from "@/components/SignaturePadModal";
import useEventsStore from "@/store/useEventsStore";
import { DRAFT_KEYS, loadDraft } from "@/lib/draftStorage";
import Actions from "./Actions";

import { content } from "./content";

const contractContent = {
    introduction: (
        <div className="space-y-3">
            <p>
                Pelo presente instrumento particular de contrato, de um lado,
                doravante denominada simplesmente <strong>CONTRATANTE</strong>,
                pela pessoa jurídica BEST SOLUTIONS GROUP USA LLC com sede em
                WESTSIDE VLG LP, cidade de WINDERMERE/ estado FLÓRIDA Nº 12803,
                ZIP CODE 34786, inscrita no EIN Nº 99-0779895, e seu
                representante legal ALEXANDRE LUIS CAMARGO SOLE, E-MAIL:
                alexlcamargo75@gmail.com
            </p>
            <p>
                Com o objetivo de agilizar o processo e aumentar a precisão, a
                empresa delega ao parceiro, Mario Marcio Albino Pavão,
                identificado pelo ID A415-553-78-442-0, as funções de gestão do
                projeto, incluindo a comunicação com a equipe de desenvolvimento.
                Todas as informações e reportagens serão conduzidas por ele,
                residente no endereço 1910 Celebration Blvd, apt 205, CEP 34747,
                Celebration-FL, e acessível através do e-mail
                marcio@best4send.com. Mario Marcio Albino Pavão também se torna
                responsável oficial pelo projeto, conforme estabelecido neste
                contrato.
            </p>
            <p>
                E, de outro lado, doravante denominada <strong>CONTRATADA</strong>{" "}
                AICRUS com sede em São Paulo à rua MMDC, CEP 05510-000, inscrita
                no CPF/CNPJ N° 36.501.721/0001-22, e seu representante legal
                PAULO MORALES inscrito no CPF Nº 029.328.682-50 tem entre si,
                justo e contratado o que segue:
            </p>
        </div>
    ),
    goals: (
        <div className="space-y-3">
            <p>
                <strong>DO OBJETO DO CONTRATO</strong>
            </p>
            <p>
                <strong>CLÁUSULA 1ª</strong> - Constitui objeto deste contrato a prestação dos
                serviços pela CONTRATADA à CONTRATANTE o desenvolvimento de:
            </p>
            <p>
                Desenvolvimento de uma plataforma de meios de pagamentos, câmbio
                e remessa internacional &quot;BEST 4SEND” completa com todas as
                funções e integrações necessárias para sua operação, entregues em
                aplicação WEB e Mobile para utilização em computadores e
                aplicativos Android e IOS hospedados e funcionais nas respectivas
                plataformas.
            </p>
            <p>
                Aplicativo funcional para (Android, iOS) com entrega de
                código-fonte do projeto para registro de patente nos órgãos
                competentes (Código Dart) e transferência para a conta do
                CONTRATANTE.
            </p>
            <p>
                <strong>EXECUÇÃO DOS SERVIÇOS</strong>
            </p>
            <p>
                Os serviços objeto deste contrato serão executados pelo
                CONTRATADO, observando o disposto na proposta apresentada,
                conforme descrito a seguir sobre suas principais funcionalidades:
            </p>
            <p>
                I – Trata-se de uma abrangente plataforma de pagamentos
                internacionais que visa integrar serviços de geração de links de
                pagamento, gateways de pagamento, operações de câmbio e cartões
                pré-pagos com uma experiência segura e em conformidade com os
                regulamentos financeiros internacionais.
            </p>
            <p>
                <strong>Principais funcionalidades descritas abaixo:</strong>
            </p>
            <ul className="list-disc pl-8 space-y-2 [&>li]:leading-7">
                <li>Geração de Links de Pagamento e Checkout</li>
                <li>
                    Conta master plataforma com Dashboards e relatórios de gestão
                    completa
                </li>
                <li>
                    Contas de cliente com Dashboards e Relatórios individuais
                </li>
                <li>
                    Cotas de cartão de débito/pré-pago com Dashboards e
                    relatórios master e individuais (API)
                </li>
                <li>Configurações Gerenciais, Permissionamentos e taxas.</li>
                <li>
                    Integrações Externas com Gateway de pagamento, corretora de
                    cambio/remessa internacional e emissor de cartão pré-pago
                </li>
                <li>
                    Painel de gestão de afiliados com configuração de comissão e
                    geração link de divulgação para abertura de contas
                </li>
                <li>
                    API documentada com manual intuitivo para integração de
                    terceiros
                </li>
                <li>
                    Adoção de padrões de segurança global e conformidade com
                    regulamentos financeiros dos EUA e Brasil (A segurança na
                    aplicação e APIs foca no controle de acesso dos usuários,
                    excluindo segurança em integrações com terceiros)
                </li>
                <li>
                    Monitoramento transacional ponta a ponta com reconciliação em
                    tempo real e periódicas para prevenção de fraudes e erros nas
                    transformações seguindo regras de segurança e compilasse.
                </li>
                <li>Desempenho e Escalabilidade</li>
                <li>Arquitetura Modular Micro Serviços</li>
                <li>Tecnologia FlutterFlow e Supabase/PostgreSQL</li>
            </ul>
            <p>
                PARÁGRAFO ÚNICO - Este projeto possui 60 (dias) de garantia para
                eventuais ajustes e correção de bugs.
            </p>
            <p>
                Após o término do período de garantia de 60 dias, quaisquer
                correções ou ajustes necessários não incorrerão em custos
                adicionais, já que estão inclusos no plano anual de suporte, o
                qual tem um valor de R$ 3.600 reais. Além disso, ao se tornar
                nosso cliente anual, você terá direito a um desconto de 30% em
                futuras funcionalidades, tanto no front-end quanto no back-end.
            </p>
        </div>
    ),
    timeline: (
        <div className="space-y-3">
            <p>
                <strong>DAS OBRIGAÇÕES DA CONTRATANTE</strong>
            </p>
            <p>
                <strong>PARÁGRAFO PRIMEIRO</strong> - Para que a CONTRATADA
                possa executar os trabalhos de criação e desenvolvimento do
                projeto referidos no caput desta cláusula, o CONTRATANTE deverá
                fornecer briefing, do projeto para ser desenvolvido, materiais
                fornecidos pela CONTRATANTE preferencialmente por escrito, dos
                produtos/serviços sobre os quais e para os quais os trabalhos
                serão realizados.
            </p>
            <p>
                <strong>PARÁGRAFO SEGUNDO</strong> – Desenvolvimento e
                hospedagem diretamente nos ambientes gerenciados serão custeados
                pela CONTRATANTE como: Conta FlutterFlow, conta Supabase, GitHub
                e outros utilizados no processo de desenvolvimento e entrega, com
                ambientes configurados e prontos para continuidade de ajustes,
                manutenção e implementação de novos módulos em a necessidade de
                configurar novos ambientes.
            </p>
            <p>
                <strong>PARÁGRAFO TERCEIRO</strong> — Os custos associados a
                servidores, serviços de e-mail, SMS, bem como outras ferramentas
                e softwares essenciais para a operacionalização do sistema ficarão
                sob a responsabilidade do CONTRATANTE.
            </p>
            <p>
                <strong>DAS OBRIGAÇÕES DA CONTRATADA</strong>
            </p>
            <p>
                <strong>CLÁUSULA 2ª</strong> - Dentro do prazo de 2 dias a contar
                da assinatura deste contrato, a CONTRATADA deverá proceder à
                criação de uma primeira ideia ou primeiro esboços ou conceito,
                apresentando-os à CONTRATANTE, que, a contar do seu recebimento,
                deverá aprová-los ou não, sempre por escrito, no prazo de 1 dia.
            </p>
            <p>
                <strong>CLÁUSULA 3ª</strong> - As PARTES comprometem-se a
                utilizar as informações confidenciais apenas no âmbito do
                desenvolvimento e da execução do projeto de colaboração, sendo
                vedada tanto a sua divulgação à terceiros, quanto qualquer outra
                utilização que não seja expressamente permitida pela PARTE
                REVELADORA.
            </p>
        </div>
    ),
    budget: (
        <div className="space-y-3">
            <p>
                <strong>DO CUSTO E DA FORMA DE PAGAMENTO</strong>
            </p>
            <p>
                <strong>CLÁUSULA 4ª</strong> - Pela prestação de serviços
                referidos na cláusula 1 supra, bem como pela concessão na sua
                utilização mencionada a CONTRATANTE pagará a CONTRATADA uma única
                vez um total de R$ 80.400 (Setenta e cinco mil reais) pagos da
                seguinte forma:
            </p>
            <p>
                O valor do contrato, inclui monitoramento e o bom funcionamento e
                a manutenção contínua anual, é de R$ 3.600 (três mil e seiscentos)
                reais, garantindo a operacionalidade do sistema atualizações
                regulares e suporte técnico especializado.
            </p>
            <p>
                Além disso, abrange R$ 1.800 (mil e oitocentos) reais para
                disponibilizar o aplicativo na App Store e Google Play Store,
                assegurando sua presença nas principais plataformas móveis.
            </p>
            <p>
                Duas parcelas iguais no valor de R$ 40.200 (quarenta mil e
                duzentos) reais. A ser pago pelo CONTRATANTE à CONTRATADA primeira
                parcela no dia 27 de Fevereiro de 2024 e segunda parcela de 50% à
                ser paga após a finalização e entrega do App.
            </p>
            <p>
                O código-fonte permanecerá fora do servidor do Contratante até que
                o pagamento integral seja efetuado.
            </p>
            <p>
                O valor deverá ser repassado ao Contratado através de transferência
                PIX ou transferência bancária brasileira, conta americana ou
                Europeia fornecida pela CONTRATADA.
            </p>
            <p>
                <strong>DO PRAZO</strong>
            </p>
            <p>
                <strong>PARÁGRAFO TERCEIRO:</strong> o presente contrato possui
                prazo de até 60 (DIAS) ÚTEIS a partir da assinatura deste
                contrato, iniciando-se em 27 de Janeiro de 2024 e finalizando-se
                em 20 de Maio de 2024 com possibilidade de entrega antes deste
                prazo.
            </p>
        </div>
    ),
    references: (
        <div className="space-y-3">
            <p>
                <strong>DA RESCISÃO</strong>
            </p>
            <p>
                <strong>CLÁUSULA 5ª</strong> - A rescisão do presente instrumento
                não extinguirá os direitos e obrigações que as partes tenham entre
                si e para com terceiros, não havendo estorno do valor já pago,
                caso está já tenha iniciado o projeto.
            </p>
            <p>
                <strong>CLÁUSULA 6ª</strong> - A CONTRATADA agirá segundo as normas
                do Código de Ética da Associação dos Designes Gráficos, e também
                assume obrigação e o compromisso de manter em sigilo todas as
                informações que. lhe forem prestadas pela CONTRATANTE para que
                possa proceder ao desenvolvimento do projeto gráfico, assim também
                em relação ao trabalho em desenvolvimento.
            </p>
            <p>
                <strong>DOS DIREITOS À PROPRIEDADE INDUSTRIAL</strong>
            </p>
            <p>
                <strong>CLÁUSULA 7ª</strong> - Caso a consultoria resulte invenção,
                descobertas, aperfeiçoamentos ou inovações, os direitos de
                propriedade pertencerão à CONTRATANTE autor do trabalho que gerou
                desenvolvimento tecnológico, nos termos da Lei n° 9.279/96
                (Código de Propriedade Industrial) ou legislação aplicável 1.
            </p>
            <p>
                <strong>CLAUSULA 8ª</strong> - A equipe envolvida neste projeto se
                compromete a manter sigilo sobre os dados e informações decorrentes
                da consecução do presente contrato, salvo o CONTRATANTE autorize
                em contrário.
            </p>
            <p>
                O App seguirá toda legislação brasileira, inclusive a lei de
                proteção de dados.
            </p>
            <p>
                <strong>PARÁGRAFO ÚNICO</strong> - Não se considera Recuperação
                Judicial, até mesmo a branca, Falência ou Liquidação/Encerramento
                de Sociedade Empresarial ou Civil como justo motivo para rescisão
                unilateral do contrato sem a implicação das penalizares ajustadas
                neste contrato.
            </p>
            <p>
                <strong>DAS CONDIÇÕES GERAIS</strong>
            </p>
            <p>
                <strong>CLÁUSULA 9ª</strong> - A CONTRATADA não possuirá horário
                fixo de entrada e saída na empresa, uma vez que não existirá
                vínculo empregatício.
            </p>
            <p>
                <strong>CLÁUSULA 10ª</strong> - É livre à CONTRATADA ter seus
                próprios clientes, fora do âmbito deste contrato.
            </p>
            <p>
                <strong>CLÁUSULA 11ª</strong> - A CONTRATADA tem total direito de
                não dar continuidade ao serviço oferecida ao CONTRATANTE caso não
                haja o cumprimento das obrigações referidas na 1a página deste
                contrato.
            </p>
        </div>
    ),
    conclusion: (
        <div className="space-y-3">
            <p>
                <strong>DO FORO</strong>
            </p>
            <p>
                <strong>CLÁUSULA 12ª</strong> - Para dirimir quaisquer
                controvérsias oriundas do contrato, as partes elegem o foro da
                comarca de SÃO PAULO/SP.
            </p>
            <p>
                As partes acima já qualificadas ora contratadas, resolvem na
                melhor forma de direito firmar o presente contrato.
            </p>
            <p>São Paulo/SP 27/02/2024</p>
        </div>
    ),
};

const prdContent = {
    introduction: (
        <>
            Este PRD descreve a visão do produto, requisitos funcionais e
            critérios de entrega para orientar design, desenvolvimento e
            validação do projeto de ponta a ponta.
        </>
    ),
    goals: (
        <>
            O documento busca alinhar objetivos de negócio e produto, com foco
            em experiência do usuário, escopo técnico viável e definição de
            prioridades para execução em ciclos.
        </>
    ),
    timeline: (
        <>
            O cronograma organiza discovery, arquitetura, implementação,
            testes e entrega, com checkpoints por sprint para acompanhar avanço,
            riscos e ajustes de prioridade.
        </>
    ),
    budget: (
        <>
            O investimento é distribuído por fases de produto, contemplando
            design, desenvolvimento, QA, integrações e ajustes pós-lançamento
            conforme o volume e a complexidade das funcionalidades.
        </>
    ),
    references: (
        <>
            <p>
                As referências visuais e técnicas servem de base para decisões
                de UX, arquitetura e identidade do produto.
            </p>
            <p>
                Incluem benchmarks, fluxos parecidos, padrões de interface e
                integrações que orientam as escolhas durante a execução.
            </p>
        </>
    ),
    conclusion: (
        <>
            Com requisitos, prioridades e critérios definidos, o PRD reduz
            retrabalho, aumenta previsibilidade e acelera a entrega com mais
            qualidade e alinhamento entre time e cliente.
        </>
    ),
};

const DOC_DRAFT_TTL_MS = 1000 * 60 * 60 * 24;
type SectionKey =
    | "introduction"
    | "goals"
    | "timeline"
    | "budget"
    | "references"
    | "conclusion";
type SignatureParticipant = {
    id: string;
    role: string;
    organization?: string;
    shortLabel?: string;
    fullName: string;
};

const BriefPage = () => {
    const t = useTranslations("brief");
    const tQuiz = useTranslations("quiz");
    const isPremiumPlan = useEventsStore((state) => state.isPremiumPlan);
    const searchParams = useSearchParams();
    const feature = searchParams.get("feature");
    const isReadOnlyView = searchParams.get("view") === "1";
    const featureType: "proposal" | "contract" | "prd" =
        feature === "contract"
            ? "contract"
            : feature === "prd"
            ? "prd"
            : "proposal";

    const editHref =
        featureType === "contract"
            ? "/quiz/contract?edit=1"
            : featureType === "prd"
            ? "/quiz/prd?edit=1"
            : "/quiz?edit=1";
    const documentTitle =
        featureType === "contract"
            ? "Contrato de Desenvolvimento de Aplicativo"
            : featureType === "prd"
            ? t("prdTitle")
            : t("proposalTitle");
    const displayedContent =
        featureType === "contract"
            ? contractContent
            : featureType === "prd"
            ? prdContent
            : content;
    const sectionTitles = useMemo(
        () =>
            featureType === "contract"
                ? {
                      introduction: "Partes Contratantes",
                      goals: "Objeto do Contrato e Escopo",
                      timeline: "Execução e Obrigações",
                      budget: "Termos e Condições de Pagamento",
                      references: "Rescisão, Sigilo e Direitos",
                      conclusion: "Foro e Assinaturas",
                  }
                : featureType === "prd"
                ? {
                      introduction: tQuiz("prdStep0"),
                      goals: tQuiz("prdStepLangAndDeadline"),
                      timeline: tQuiz("prdStepBackendAndAuth"),
                      budget: tQuiz("prdStepFeaturesAndIntegrations"),
                      references: tQuiz("prdStep7"),
                      conclusion: tQuiz("prdStep8"),
                  }
                : {
                      introduction: t("introduction"),
                      goals: t("goals"),
                      timeline: t("timeline"),
                      budget: t("budget"),
                      references: t("references"),
                      conclusion: t("conclusion"),
                  },
        [featureType, t, tQuiz]
    );
    const subtitleDefault =
        featureType === "contract"
            ? "Contrato"
            : featureType === "prd"
            ? "PRD"
            : "Proposta";
    const storageKey = `briefberry:doc-edit:${featureType}:v7`;

    const [editableDocumentTitle, setEditableDocumentTitle] = useState(documentTitle);
    const [editableSubtitle, setEditableSubtitle] = useState(subtitleDefault);
    const [editableSectionTitles, setEditableSectionTitles] = useState(sectionTitles);
    const [editableSectionContents, setEditableSectionContents] = useState<
        Record<SectionKey, string | null>
    >({
        introduction: null,
        goals: null,
        timeline: null,
        budget: null,
        references: null,
        conclusion: null,
    });
    const [editableReferenceImages, setEditableReferenceImages] = useState<string[]>(
        featureType === "proposal" ? content.images : []
    );
    const [isDraftHydrated, setIsDraftHydrated] = useState(false);
    const [signatureModalOpen, setSignatureModalOpen] = useState(false);
    const [signatureModalVersion, setSignatureModalVersion] = useState(0);
    const [activeSigner, setActiveSigner] = useState("");
    const [signatures, setSignatures] = useState<Record<string, string>>({});
    const [isEditingDocumentTitle, setIsEditingDocumentTitle] = useState(false);
    const [isEditingSubtitle, setIsEditingSubtitle] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const raw = window.localStorage.getItem(storageKey);
            if (!raw) {
                setIsDraftHydrated(true);
                return;
            }
            const parsed = JSON.parse(raw) as {
                expiresAt: number;
                documentTitle?: string;
                subtitle?: string;
                sectionTitles?: Record<SectionKey, string>;
                sectionContents?: Record<SectionKey, string | null>;
                referenceImages?: string[];
            };
            if (!parsed.expiresAt || parsed.expiresAt < Date.now()) {
                window.localStorage.removeItem(storageKey);
                setIsDraftHydrated(true);
                return;
            }
            if (parsed.documentTitle) setEditableDocumentTitle(parsed.documentTitle);
            if (parsed.subtitle) setEditableSubtitle(parsed.subtitle);
            if (parsed.sectionTitles) setEditableSectionTitles(parsed.sectionTitles);
            if (parsed.sectionContents) {
                const nextContents = { ...parsed.sectionContents };
                if (featureType === "contract") {
                    // Keep legal template formatting in the first two contract sections.
                    nextContents.introduction = null;
                    nextContents.goals = null;
                }
                setEditableSectionContents(nextContents);
            }
            if (parsed.referenceImages) setEditableReferenceImages(parsed.referenceImages);
        } catch {
            // Ignore corrupted draft payloads
        } finally {
            if (featureType === "contract") {
                const contractWizardDraft = loadDraft<{
                    contractType?: string;
                    projectDescription?: string;
                }>(DRAFT_KEYS.contractWizard);
                const rawType =
                    contractWizardDraft?.contractType?.trim() ??
                    contractWizardDraft?.projectDescription?.trim() ??
                    "";
                if (rawType) {
                    const normalized = rawType.toLowerCase().startsWith("contrato de")
                        ? rawType
                        : `Contrato de ${rawType}`;
                    setEditableDocumentTitle(normalized);
                }
            }
            setIsDraftHydrated(true);
        }
    }, [featureType, storageKey]);

    useEffect(() => {
        if (!isDraftHydrated) return;
        if (typeof window === "undefined") return;
        const payload = {
            expiresAt: Date.now() + DOC_DRAFT_TTL_MS,
            documentTitle: editableDocumentTitle,
            subtitle: editableSubtitle,
            sectionTitles: editableSectionTitles,
            sectionContents:
                featureType === "contract"
                    ? {
                          ...editableSectionContents,
                          introduction: null,
                          goals: null,
                      }
                    : editableSectionContents,
            referenceImages: editableReferenceImages,
        };
        window.localStorage.setItem(storageKey, JSON.stringify(payload));
    }, [
        editableDocumentTitle,
        editableSubtitle,
        editableSectionTitles,
        editableSectionContents,
        editableReferenceImages,
        isDraftHydrated,
        featureType,
        storageKey,
    ]);
    const categoryValue =
        featureType === "contract"
            ? "contract"
            : featureType === "prd"
            ? "prd"
            : "proposal";
    const signatureParticipants: SignatureParticipant[] =
        featureType === "contract"
            ? [
                  {
                      id: "ACORDANTE_1",
                      role: "ACORDANTE 1",
                      organization: "BEST SOLUTIONS GROUP USA LLC",
                      shortLabel: "AC",
                      fullName: "ALEXANDRE LUIS CAMARGO SOLE",
                  },
                  {
                      id: "TESTEMUNHA_1",
                      role: "TESTEMUNHA",
                      fullName: "MARIO MARCIO ALBINO PAVÃO",
                  },
                  {
                      id: "ACORDANTE_2",
                      role: "ACORDANTE 2",
                      organization: "AICRUS",
                      shortLabel: "Aicrus T",
                      fullName: "PAULO MORALES DIAZ DA COSTA",
                  },
                  {
                      id: "TESTEMUNHA_2",
                      role: "TESTEMUNHA",
                      shortLabel: "Taina S",
                      fullName: "TAINÁ EVANGELISTA DA SILVA",
                  },
              ]
            : featureType === "prd"
            ? [
                  {
                      id: "RESPONSAVEL_PRODUTO",
                      role: "RESPONSÁVEL PELO PRODUTO",
                      fullName: "Assinante 1",
                  },
                  {
                      id: "RESPONSAVEL_TECNICO",
                      role: "RESPONSÁVEL TÉCNICO",
                      fullName: "Assinante 2",
                  },
              ]
            : [
                  {
                      id: "CONTRATANTE",
                      role: "CONTRATANTE",
                      fullName: "Assinante 1",
                  },
                  {
                      id: "CONTRATADA",
                      role: "CONTRATADA",
                      fullName: "Assinante 2",
                  },
              ];

    return (
        <Layout isFixedHeader isHiddenFooter isVisiblePlan isLoggedIn>
            <div className="pt-34 px-6 pb-38 max-2xl:pt-32 max-2xl:px-11 max-2xl:pb-33 max-xl:pt-30 max-lg:pt-28 max-md:pt-22 max-md:px-4 max-md:pb-24">
                <div
                    key={featureType}
                    className="relative max-w-220 mx-auto p-12 shadow-hover bg-b-surface4 rounded-4xl before:absolute before:top-full before:left-6 before:right-6 before:-z-1 before:h-3.75 before:rounded-b-4xl before:bg-b-surface2 max-md:px-8 max-md:pb-4 max-md:before:hidden"
                >
                    {!isReadOnlyView && (
                        <Button
                            className="absolute! top-2 right-2 shadow-hover"
                            isCircle
                            isPrimary
                            as="link"
                            href={editHref}
                        >
                            <Icon name="edit" />
                        </Button>
                    )}
                    <div className="mb-10 max-md:mb-6">
                        <div className="mb-2 text-h2 max-md:text-h5">
                            <Icon
                                className={`hidden! relative -top-0.5 mr-2 fill-primary2 max-md:inline-block! max-md:size-5! ${
                                    isPremiumPlan
                                        ? "fill-primary2"
                                        : "fill-t-tertiary"
                                }`}
                                name={isPremiumPlan ? "verification" : "lock"}
                            />
                            {isEditingDocumentTitle ? (
                                <input
                                    className="w-full bg-transparent border-0 outline-0 text-h2 max-md:text-h5"
                                    value={editableDocumentTitle}
                                    onChange={(e) =>
                                        setEditableDocumentTitle(e.target.value)
                                    }
                                    onBlur={() => setIsEditingDocumentTitle(false)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            setIsEditingDocumentTitle(false);
                                        }
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <button
                                    type="button"
                                    className="text-left"
                                    onClick={() =>
                                        !isReadOnlyView &&
                                        setIsEditingDocumentTitle(true)
                                    }
                                >
                                    {editableDocumentTitle}
                                </button>
                            )}
                        </div>
                        {isEditingSubtitle ? (
                            <input
                                className="w-full bg-transparent border-0 outline-0 text-heading text-t-secondary"
                                value={editableSubtitle}
                                onChange={(e) => setEditableSubtitle(e.target.value)}
                                onBlur={() => setIsEditingSubtitle(false)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        setIsEditingSubtitle(false);
                                    }
                                }}
                                autoFocus
                            />
                        ) : (
                            <button
                                type="button"
                                className="text-left"
                                onClick={() =>
                                    !isReadOnlyView && setIsEditingSubtitle(true)
                                }
                            >
                                <BriefCategory
                                    value={categoryValue}
                                    label={editableSubtitle}
                                />
                            </button>
                        )}
                    </div>
                    <BriefSection
                        title={editableSectionTitles.introduction}
                        onTitleChange={(nextTitle) =>
                            setEditableSectionTitles((prev) => ({
                                ...prev,
                                introduction: nextTitle,
                            }))
                        }
                        content={
                            editableSectionContents.introduction ??
                            displayedContent.introduction
                        }
                        editedContent={
                            editableSectionContents.introduction ?? undefined
                        }
                        onContentChange={(nextContent) =>
                            setEditableSectionContents((prev) => ({
                                ...prev,
                                introduction: nextContent || null,
                            }))
                        }
                        isOnlyView={isReadOnlyView}
                    />
                    <BriefSection
                        title={editableSectionTitles.goals}
                        onTitleChange={(nextTitle) =>
                            setEditableSectionTitles((prev) => ({
                                ...prev,
                                goals: nextTitle,
                            }))
                        }
                        content={editableSectionContents.goals ?? displayedContent.goals}
                        editedContent={editableSectionContents.goals ?? undefined}
                        onContentChange={(nextContent) =>
                            setEditableSectionContents((prev) => ({
                                ...prev,
                                goals: nextContent || null,
                            }))
                        }
                        isOnlyView={isReadOnlyView}
                    />
                    <BriefSection
                        title={editableSectionTitles.timeline}
                        onTitleChange={(nextTitle) =>
                            setEditableSectionTitles((prev) => ({
                                ...prev,
                                timeline: nextTitle,
                            }))
                        }
                        content={
                            editableSectionContents.timeline ??
                            displayedContent.timeline
                        }
                        editedContent={editableSectionContents.timeline ?? undefined}
                        onContentChange={(nextContent) =>
                            setEditableSectionContents((prev) => ({
                                ...prev,
                                timeline: nextContent || null,
                            }))
                        }
                        isOnlyView={isReadOnlyView}
                    />
                    <BriefSection
                        title={editableSectionTitles.budget}
                        onTitleChange={(nextTitle) =>
                            setEditableSectionTitles((prev) => ({
                                ...prev,
                                budget: nextTitle,
                            }))
                        }
                        content={editableSectionContents.budget ?? displayedContent.budget}
                        editedContent={editableSectionContents.budget ?? undefined}
                        onContentChange={(nextContent) =>
                            setEditableSectionContents((prev) => ({
                                ...prev,
                                budget: nextContent || null,
                            }))
                        }
                        isOnlyView={isReadOnlyView}
                    />
                    <BriefSection
                        title={editableSectionTitles.references}
                        onTitleChange={(nextTitle) =>
                            setEditableSectionTitles((prev) => ({
                                ...prev,
                                references: nextTitle,
                            }))
                        }
                        content={
                            editableSectionContents.references ??
                            displayedContent.references
                        }
                        editedContent={editableSectionContents.references ?? undefined}
                        onContentChange={(nextContent) =>
                            setEditableSectionContents((prev) => ({
                                ...prev,
                                references: nextContent || null,
                            }))
                        }
                        images={
                            featureType === "proposal"
                                ? editableReferenceImages
                                : undefined
                        }
                        onImagesChange={setEditableReferenceImages}
                        isOnlyView={isReadOnlyView}
                    />
                    <BriefSection
                        title={editableSectionTitles.conclusion}
                        onTitleChange={(nextTitle) =>
                            setEditableSectionTitles((prev) => ({
                                ...prev,
                                conclusion: nextTitle,
                            }))
                        }
                        content={
                            editableSectionContents.conclusion ??
                            displayedContent.conclusion
                        }
                        editedContent={editableSectionContents.conclusion ?? undefined}
                        onContentChange={(nextContent) =>
                            setEditableSectionContents((prev) => ({
                                ...prev,
                                conclusion: nextContent || null,
                            }))
                        }
                        isOnlyView={isReadOnlyView}
                    />
                    {featureType === "contract" && (
                        <div className="mt-10 border-t border-stroke2 pt-8">
                        <div className="mb-4 text-h5">Assinaturas</div>
                        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                            {signatureParticipants.map((participant) => (
                                <div
                                    key={participant.id}
                                    className="rounded-2xl border border-stroke2 bg-b-surface1 p-4"
                                >
                                    <div className="mb-3 text-small text-t-secondary">
                                        {participant.role}
                                    </div>
                                    {participant.organization && (
                                        <div className="mb-1 text-caption text-t-primary">
                                            {participant.organization}
                                        </div>
                                    )}
                                    {participant.shortLabel && (
                                        <div className="mb-1 text-caption text-t-secondary">
                                            {participant.shortLabel}
                                        </div>
                                    )}
                                    <div className="mb-3 text-small text-t-primary">
                                        {participant.fullName}
                                    </div>
                                    {signatures[participant.id] ? (
                                        <Image
                                            src={signatures[participant.id]}
                                            alt={`Assinatura ${participant.role}`}
                                            width={280}
                                            height={56}
                                            className="mb-3 h-14 w-auto object-contain"
                                        />
                                    ) : (
                                        <div className="mb-3 h-14 w-full rounded-lg border border-dashed border-stroke2" />
                                    )}
                                    {!isReadOnlyView && (
                                        <Button
                                            isPrimary
                                            onClick={() => {
                                                setActiveSigner(participant.id);
                                                setSignatureModalVersion((prev) => prev + 1);
                                                setSignatureModalOpen(true);
                                            }}
                                        >
                                            {signatures[participant.id]
                                                ? "Assinar novamente"
                                                : "Clique para assinar"}
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                        </div>
                    )}
                </div>
            </div>
            {!isReadOnlyView && <Actions featureType={featureType} />}
            {featureType === "contract" && (
                <SignaturePadModal
                    key={signatureModalVersion}
                    open={signatureModalOpen}
                    onClose={() => setSignatureModalOpen(false)}
                    title="Assinatura eletrônica"
                    signerName={activeSigner}
                    onSave={(dataUrl) =>
                        setSignatures((prev) => ({
                            ...prev,
                            [activeSigner]: dataUrl,
                        }))
                    }
                />
            )}
        </Layout>
    );
};

export default BriefPage;
