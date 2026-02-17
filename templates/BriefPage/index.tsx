"use client";

import { useEffect, useMemo, useState } from "react";
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

const DOC_DRAFT_TTL_MS = 1000 * 60 * 60 * 24;
const LOAD_TIME_MS = Date.now();
type SectionKey =
    | "introduction"
    | "goals"
    | "timeline"
    | "budget"
    | "references"
    | "conclusion";

const BriefPage = () => {
    const t = useTranslations("brief");
    const tQuiz = useTranslations("quiz");
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
    const sectionTitles = useMemo(
        () =>
            featureType === "contract"
                ? {
                      introduction: tQuiz("contractStep1"),
                      goals: tQuiz("contractStep2"),
                      timeline: tQuiz("contractStep3"),
                      budget: tQuiz("contractTerms"),
                      references: tQuiz("contractStepClauses"),
                      conclusion: tQuiz("contractStep5"),
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
    const storageKey = `briefberry:doc-edit:${featureType}`;
    const persistedDraft = useMemo(() => {
        if (typeof window === "undefined") return null;
        try {
            const raw = window.localStorage.getItem(storageKey);
            if (!raw) return null;
            const parsed = JSON.parse(raw) as {
                expiresAt: number;
                documentTitle?: string;
                subtitle?: string;
                sectionTitles?: Record<SectionKey, string>;
                sectionContents?: Record<SectionKey, string | null>;
                referenceImages?: string[];
            };
            if (!parsed.expiresAt || parsed.expiresAt < LOAD_TIME_MS) {
                window.localStorage.removeItem(storageKey);
                return null;
            }
            return parsed;
        } catch {
            return null;
        }
    }, [storageKey]);

    const [editableDocumentTitle, setEditableDocumentTitle] = useState(
        () => persistedDraft?.documentTitle ?? documentTitle
    );
    const [editableSubtitle, setEditableSubtitle] = useState(
        () => persistedDraft?.subtitle ?? subtitleDefault
    );
    const [editableSectionTitles, setEditableSectionTitles] = useState(
        () => persistedDraft?.sectionTitles ?? sectionTitles
    );
    const [editableSectionContents, setEditableSectionContents] = useState<
        Record<SectionKey, string | null>
    >(
        () =>
            persistedDraft?.sectionContents ?? {
                introduction: null,
                goals: null,
                timeline: null,
                budget: null,
                references: null,
                conclusion: null,
            }
    );
    const [editableReferenceImages, setEditableReferenceImages] = useState<string[]>(
        () => persistedDraft?.referenceImages ?? content.images
    );
    const [isEditingDocumentTitle, setIsEditingDocumentTitle] = useState(false);
    const [isEditingSubtitle, setIsEditingSubtitle] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const payload = {
            expiresAt: Date.now() + DOC_DRAFT_TTL_MS,
            documentTitle: editableDocumentTitle,
            subtitle: editableSubtitle,
            sectionTitles: editableSectionTitles,
            sectionContents: editableSectionContents,
            referenceImages: editableReferenceImages,
        };
        window.localStorage.setItem(storageKey, JSON.stringify(payload));
    }, [
        editableDocumentTitle,
        editableSubtitle,
        editableSectionTitles,
        editableSectionContents,
        editableReferenceImages,
        storageKey,
    ]);
    const categoryValue =
        featureType === "contract"
            ? "contract"
            : featureType === "prd"
            ? "prd"
            : "proposal";

    return (
        <Layout isFixedHeader isHiddenFooter isVisiblePlan isLoggedIn>
            <div className="pt-34 px-6 pb-38 max-2xl:pt-32 max-2xl:px-11 max-2xl:pb-33 max-xl:pt-30 max-lg:pt-28 max-md:pt-22 max-md:px-4 max-md:pb-24">
                <div
                    key={featureType}
                    className="relative max-w-170 mx-auto p-12 shadow-hover bg-b-surface4 rounded-4xl before:absolute before:top-full before:left-6 before:right-6 before:-z-1 before:h-3.75 before:rounded-b-4xl before:bg-b-surface2 max-md:px-8 max-md:pb-4 max-md:before:hidden"
                >
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
                                    onClick={() => setIsEditingDocumentTitle(true)}
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
                                onClick={() => setIsEditingSubtitle(true)}
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
                        images={editableReferenceImages}
                        onImagesChange={setEditableReferenceImages}
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
                    />
                </div>
            </div>
            <Actions featureType={featureType} />
        </Layout>
    );
};

export default BriefPage;
