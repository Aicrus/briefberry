"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { DRAFT_KEYS, loadDraft } from "@/lib/draftStorage";

type ProposalTypeDraft = { active: number | null; otherType: string };
type ProposalWizardDraft = { projectName: string };
type ContractWizardDraft = { clientName: string };
type PrdWizardDraft = { projectName: string };

const PROPOSAL_TYPE_KEYS: Record<number, string> = {
    0: "typeWebApp",
    1: "typeMobileApp",
    2: "typeUiDesign",
    3: "typeBranding",
    4: "typeLandingPage",
};

type EmptyPageProps = {
    className?: string;
    featureType?: "proposal" | "contract" | "prd";
};

const EmptyPage = ({ className, featureType = "proposal" }: EmptyPageProps) => {
    const locale = useLocale();
    const tMyBriefs = useTranslations("myBriefs");
    const tQuiz = useTranslations("quiz");
    const tBrief = useTranslations("brief");

    const proposalTypeDraft =
        featureType === "proposal"
            ? loadDraft<ProposalTypeDraft>(DRAFT_KEYS.proposalTypeBrief)
            : null;
    const proposalTypeLabel =
        proposalTypeDraft?.active === 5 && proposalTypeDraft.otherType?.trim()
            ? proposalTypeDraft.otherType.trim()
            : proposalTypeDraft?.active != null &&
              PROPOSAL_TYPE_KEYS[proposalTypeDraft.active]
            ? tQuiz(PROPOSAL_TYPE_KEYS[proposalTypeDraft.active])
            : null;

    const previewContext =
        featureType === "proposal"
            ? loadDraft<ProposalWizardDraft>(DRAFT_KEYS.proposalWizard)
                  ?.projectName?.trim() || null
            : featureType === "contract"
            ? loadDraft<ContractWizardDraft>(DRAFT_KEYS.contractWizard)
                  ?.clientName?.trim() || null
            : loadDraft<PrdWizardDraft>(DRAFT_KEYS.prdWizard)?.projectName?.trim() ||
              null;

    const myBriefsTitle =
        featureType === "contract"
            ? tMyBriefs("contractsTitle")
            : featureType === "prd"
            ? tMyBriefs("prdsTitle")
            : tMyBriefs("proposalsTitle");
    const documentTypeLabel =
        featureType === "contract"
            ? tBrief("contract")
            : featureType === "prd"
            ? tBrief("prd")
            : tBrief("proposal");
    const documentTitle =
        featureType === "contract"
            ? tBrief("contractTitle")
            : featureType === "prd"
            ? tBrief("prdTitle")
            : tBrief("proposalDocumentTitle", {
                  type: proposalTypeLabel || tBrief("proposalDefaultTypeLabel"),
              });
    const topRightLabel =
        featureType === "prd"
            ? new Intl.DateTimeFormat(locale, {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
              }).format(new Date())
            : documentTitle;

    return (
        <div
            className={`w-131 min-h-154 px-15 py-13 bg-b-surface2 shadow-[0px_24px_48px_0px_rgba(0,0,0,0.15)] rounded-2xl text-left max-md:w-74 max-md:px-8 max-md:py-7 max-md:rounded-lg max-md:shadow-[0px_14px_27px_0px_rgba(0,0,0,0.05)] dark:shadow-[0px_24px_48px_0px_rgba(0,0,0,0.53)] dark:max-md:shadow-[0px_14px_27px_0px_rgba(0,0,0,0.53)] ${
                className || ""
            }`}
        >
            <div className="mb-28 max-md:mb-15.5">
                <div className="flex items-center mb-1 text-body-lg-bold text-t-tertiary max-md:mb-0.5 max-md:text-[0.625rem] max-md:leading-2.5">
                    <div className="shrink-0 size-3 mr-2 bg-primary2 rounded-full max-md:size-1.75 max-md:mr-1"></div>
                    <div className="">{myBriefsTitle}</div>
                    <div className="mx-2 max-md:mx-1">/</div>
                    <div className="text-t-primary/80">{topRightLabel}</div>
                </div>
                <div className="text-hairline text-t-secondary max-md:text-[0.5rem]">
                    {previewContext || tBrief("documentTypeLabel", { type: documentTypeLabel })}
                </div>
            </div>
            <ul className="flex flex-col gap-2.5 not-last:mb-12 max-md:gap-1.5 max-md:not-last:mb-6 *:h-1.5 *:rounded-xs *:bg-t-secondary/10 max-md:*:h-1 *:first:w-49 max-md:*:first:w-27">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <ul className="flex flex-col gap-2.5 not-last:mb-12 max-md:gap-1.5 max-md:not-last:mb-6 *:h-1.5 *:rounded-xs *:bg-t-secondary/10 max-md:*:h-1 *:first:w-49 max-md:*:first:w-27">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <div className="w-24 h-1.5 mb-6 rounded-xs bg-t-secondary/10 max-md:w-14 max-md:h-1 max-md:mb-3"></div>
            <ul className="flex gap-3 max-md:gap-1.5 *:w-24 *:h-27 *:bg-b-subtle *:rounded-xl max-md:*:w-14 max-md:*:h-15 max-md:*:rounded-md">
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    );
};

export default EmptyPage;
