"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import BriefSection from "@/components/BriefSection";
import BriefCategory from "@/components/BriefCategory";
import useEventsStore from "@/store/useEventsStore";
import Actions from "./Actions";

import { content } from "./content";

const contractContent = {
    introduction: (
        <>
            Este contrato formaliza a prestação de serviços entre contratada e
            contratante, definindo escopo, responsabilidades e regras de
            execução para garantir segurança jurídica em todas as etapas do
            projeto.
        </>
    ),
    goals: (
        <>
            O objetivo principal é proteger as duas partes com cláusulas claras
            sobre entregas, pagamento, direitos autorais, revisões,
            confidencialidade e cancelamento, reduzindo riscos e ambiguidades.
        </>
    ),
    timeline: (
        <>
            A vigência considera início na assinatura e término após a entrega
            final aprovada, com marcos intermediários vinculados às etapas
            definidas na proposta comercial.
        </>
    ),
    budget: (
        <>
            O valor contratado seguirá o modelo de cobrança acordado, com
            condições de pagamento, multas por atraso e política de reembolso
            detalhadas para evitar conflitos financeiros.
        </>
    ),
    references: (
        <>
            <p>
                Este documento é baseado nas informações preenchidas pelas partes
                e na proposta do projeto.
            </p>
            <p>
                Caso existam anexos (escopo, cronograma, requisitos técnicos),
                eles passam a integrar este contrato para efeito de interpretação
                e execução.
            </p>
        </>
    ),
    conclusion: (
        <>
            Com as cláusulas definidas, o contrato estabelece uma relação
            profissional mais previsível, garantindo segurança legal e clareza
            operacional do início ao encerramento do projeto.
        </>
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

const BriefPage = () => {
    const t = useTranslations("brief");
    const isPremiumPlan = useEventsStore((state) => state.isPremiumPlan);
    const searchParams = useSearchParams();
    const feature = searchParams.get("feature");
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
            ? t("contractTitle")
            : featureType === "prd"
            ? t("prdTitle")
            : t("proposalTitle");
    const displayedContent =
        featureType === "contract"
            ? contractContent
            : featureType === "prd"
            ? prdContent
            : content;
    const categoryValue =
        featureType === "contract"
            ? "contract"
            : featureType === "prd"
            ? "prd"
            : "proposal";

    return (
        <Layout isFixedHeader isHiddenFooter isVisiblePlan isLoggedIn>
            <div className="pt-34 px-6 pb-38 max-2xl:pt-32 max-2xl:px-11 max-2xl:pb-33 max-xl:pt-30 max-lg:pt-28 max-md:pt-22 max-md:px-4 max-md:pb-24">
                <div className="relative max-w-170 mx-auto p-12 shadow-hover bg-b-surface4 rounded-4xl before:absolute before:top-full before:left-6 before:right-6 before:-z-1 before:h-3.75 before:rounded-b-4xl before:bg-b-surface2 max-md:px-8 max-md:pb-4 max-md:before:hidden">
                    <Button
                        className="absolute! top-2 right-2 shadow-hover"
                        isCircle
                        isPrimary
                        as="link"
                        href={editHref}
                    >
                        <Icon name="edit" />
                    </Button>
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
                            {documentTitle}
                        </div>
                        <BriefCategory value={categoryValue} />
                    </div>
                    <BriefSection
                        title={t("introduction")}
                        content={displayedContent.introduction}
                    />
                    <BriefSection title={t("goals")} content={displayedContent.goals} />
                    <BriefSection title={t("timeline")} content={displayedContent.timeline} />
                    <BriefSection title={t("budget")} content={displayedContent.budget} />
                    <BriefSection
                        title={t("references")}
                        content={displayedContent.references}
                        images={content.images}
                    />
                    <BriefSection
                        title={t("conclusion")}
                        content={displayedContent.conclusion}
                    />
                </div>
            </div>
            <Actions featureType={featureType} />
        </Layout>
    );
};

export default BriefPage;
