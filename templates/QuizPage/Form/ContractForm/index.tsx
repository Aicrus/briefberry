import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import { formatCPF, formatCNPJ, formatSSN, formatEIN } from "@/lib/masks";

/** 0=CPF, 1=CNPJ, 2=SSN (EUA), 3=EIN (EUA), 4=VAT/NIF (Europa), 5=Outro */
const DOC_TYPE_IDS = [2, 3, 4, 1, 0, 5] as const;
type DocTypeId = (typeof DOC_TYPE_IDS)[number];

function getDocTypeLabelKey(id: DocTypeId): string {
    const keys: Record<DocTypeId, string> = {
        0: "docTypeCpf",
        1: "docTypeCnpj",
        2: "docTypeSsn",
        3: "docTypeEin",
        4: "docTypeVat",
        5: "docTypeOther",
    };
    return keys[id];
}

function getDocPlaceholderKey(id: DocTypeId): string {
    const keys: Record<DocTypeId, string> = {
        0: "docTypeCpfPlaceholder",
        1: "docTypeCnpjPlaceholder",
        2: "docTypeSsnPlaceholder",
        3: "docTypeEinPlaceholder",
        4: "docTypeVatPlaceholder",
        5: "docTypeOtherPlaceholder",
    };
    return keys[id];
}

function formatDocumentByType(value: string, docType: DocTypeId): string {
    if (docType === 0) return formatCPF(value);
    if (docType === 1) return formatCNPJ(value);
    if (docType === 2) return formatSSN(value);
    if (docType === 3) return formatEIN(value);
    return value; // 4=VAT, 5=Outro: sem máscara
}

function getDocMaxLength(docType: DocTypeId): number {
    if (docType === 0) return 14; // CPF com máscara
    if (docType === 1) return 18; // CNPJ com máscara
    if (docType === 2) return 11; // SSN 999-99-9999
    if (docType === 3) return 10; // EIN 99-9999999
    if (docType === 4) return 20; // VAT alfanumérico
    return 100; // Outro
}

function isDocTypeNumeric(docType: DocTypeId): boolean {
    return docType <= 3; // CPF, CNPJ, SSN, EIN
}

const STEP_KEYS = [
    "contractStep1",
    "contractStep2",
    "contractStep3",
    "contractStep5",
] as const;

const cardClass = (active: boolean) =>
    `w-[calc(50%-1rem)] mt-4 mx-2 px-6 py-5.5 border-[1.5px] border-stroke1 rounded-[1.25rem] text-heading font-medium! text-t-secondary fill-t-secondary hover:border-transparent hover:bg-b-surface2 hover:shadow-hover hover:text-t-primary hover:fill-t-primary cursor-pointer transition-all max-md:w-[calc(50%-0.75rem)] max-md:mt-3 max-md:mx-1.5 ${
        active ? "border-stroke-focus! text-t-primary! fill-t-primary!" : ""
    }`;

const ContractForm = () => {
    const t = useTranslations("quiz");
    const [activeId, setActiveId] = useState(0);

    // Step 1: Contractor data
    const [contractorName, setContractorName] = useState("");
    const [contractorDocType, setContractorDocType] = useState<DocTypeId>(DOC_TYPE_IDS[0]);
    const [contractorDocument, setContractorDocument] = useState("");
    const [contractorEmail, setContractorEmail] = useState("");

    // Step 2: Client data
    const [clientName, setClientName] = useState("");
    const [clientDocType, setClientDocType] = useState<DocTypeId>(DOC_TYPE_IDS[0]);
    const [clientDocument, setClientDocument] = useState("");
    const [clientEmail, setClientEmail] = useState("");

    const [projectProposalLink, setProjectProposalLink] = useState("");
    const [projectDescription, setProjectDescription] = useState("");

    const [termination, setTermination] = useState<number | null>(null);

    const totalSteps = STEP_KEYS.length;

    const handleNext = () => {
        if (activeId < totalSteps - 1) setActiveId(activeId + 1);
    };

    const handlePrevious = () => {
        if (activeId > 0) {
            setActiveId(activeId - 1);
        }
    };

    return (
        <div className="flex flex-col w-full max-w-152 max-h-200 h-full max-3xl:max-w-127 max-3xl:max-h-169 max-xl:max-w-136 max-md:max-h-full">
            <div className="flex mb-20 max-3xl:mb-12 max-2xl:mb-10 max-md:flex-col-reverse max-md:mb-8">
                <div className="grow text-h2 max-md:text-h3">
                    {t(STEP_KEYS[activeId])}
                </div>
                <div className="flex justify-center items-center shrink-0 w-16 h-7 mt-3 ml-8 border-[1.5px] border-primary2/15 bg-primary2/5 rounded-full text-button text-primary2 max-md:m-0 max-md:mb-4">
                    {activeId + 1} / {totalSteps}
                </div>
            </div>
            <div className="flex-1 min-h-0 flex flex-col">
                {activeId === 0 && (
                    <>
                        <Field
                            label={t("contractorName")}
                            value={contractorName}
                            onChange={(e) => setContractorName(e.target.value)}
                            name="contractor-name"
                            placeholder={t("contractorNamePlaceholder")}
                            isLarge
                            required
                            maxLength={200}
                        />
                        <div className="mt-6">
                            <div className="mb-2 text-small font-medium text-t-primary">{t("documentTypeLabel")}</div>
                            <div className="flex flex-wrap gap-2">
                                {DOC_TYPE_IDS.map((id) => (
                                    <button
                                        key={id}
                                        type="button"
                                        onClick={() => {
                                            setContractorDocType(id);
                                            setContractorDocument("");
                                        }}
                                        className={`rounded-full border-[1.5px] px-4 py-2 text-hairline font-medium transition-all ${
                                            contractorDocType === id
                                                ? "border-stroke-focus bg-b-surface2 text-t-primary"
                                                : "border-stroke1 text-t-secondary hover:border-stroke-focus"
                                        }`}
                                    >
                                        {t(getDocTypeLabelKey(id))}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-3">
                                <Field
                                    label={t("contractorDocument")}
                                    value={contractorDocument}
                                    onChange={(e) =>
                                        setContractorDocument(formatDocumentByType(e.target.value, contractorDocType))
                                    }
                                    name="contractor-document"
                                    placeholder={t(getDocPlaceholderKey(contractorDocType))}
                                    isLarge
                                    required
                                    onlyNumeric={isDocTypeNumeric(contractorDocType)}
                                    maxLength={getDocMaxLength(contractorDocType)}
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <Field
                                label={t("contractorEmail")}
                                value={contractorEmail}
                                onChange={(e) => setContractorEmail(e.target.value)}
                                name="contractor-email"
                                type="email"
                                placeholder={t("contractorEmailPlaceholder")}
                                isLarge
                                required
                            />
                        </div>
                    </>
                )}
                {activeId === 1 && (
                    <>
                        <Field
                            label={t("clientName")}
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            name="client-name"
                            placeholder={t("clientNamePlaceholder")}
                            isLarge
                            required
                            maxLength={200}
                        />
                        <div className="mt-6">
                            <div className="mb-2 text-small font-medium text-t-primary">{t("documentTypeLabel")}</div>
                            <div className="flex flex-wrap gap-2">
                                {DOC_TYPE_IDS.map((id) => (
                                    <button
                                        key={id}
                                        type="button"
                                        onClick={() => {
                                            setClientDocType(id);
                                            setClientDocument("");
                                        }}
                                        className={`rounded-full border-[1.5px] px-4 py-2 text-hairline font-medium transition-all ${
                                            clientDocType === id
                                                ? "border-stroke-focus bg-b-surface2 text-t-primary"
                                                : "border-stroke1 text-t-secondary hover:border-stroke-focus"
                                        }`}
                                    >
                                        {t(getDocTypeLabelKey(id))}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-3">
                                <Field
                                    label={t("clientDocument")}
                                    value={clientDocument}
                                    onChange={(e) =>
                                        setClientDocument(formatDocumentByType(e.target.value, clientDocType))
                                    }
                                    name="client-document"
                                    placeholder={t(getDocPlaceholderKey(clientDocType))}
                                    isLarge
                                    required
                                    onlyNumeric={isDocTypeNumeric(clientDocType)}
                                    maxLength={getDocMaxLength(clientDocType)}
                                />
                            </div>
                        </div>
                        <div className="mt-6">
                            <Field
                                label={t("clientEmail")}
                                value={clientEmail}
                                onChange={(e) => setClientEmail(e.target.value)}
                                name="client-email"
                                type="email"
                                placeholder={t("clientEmailPlaceholder")}
                                isLarge
                                required
                            />
                        </div>
                    </>
                )}
                {activeId === 2 && (
                    <>
                        <Field
                            label={t("projectProposalLink")}
                            value={projectProposalLink}
                            onChange={(e) => setProjectProposalLink(e.target.value)}
                            name="project-proposal-link"
                            placeholder={t("projectProposalLinkPlaceholder")}
                            isLarge
                        />
                        <div className="mt-6">
                            <p className="mb-4 text-body text-t-secondary">{t("projectDescriptionHint")}</p>
                            <Field
                                label={t("projectDescription")}
                                value={projectDescription}
                                onChange={(e) => setProjectDescription(e.target.value)}
                                name="project-description"
                                placeholder={t("projectDescriptionPlaceholder")}
                                isLarge
                                isTextarea
                                maxLength={2000}
                            />
                        </div>
                    </>
                )}
                {activeId === 3 && (
                    <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                        {[0, 1].map((id) => (
                            <div
                                key={id}
                                className={cardClass(termination === id)}
                                onClick={() => setTermination(id)}
                            >
                                <Icon className="mb-5 fill-inherit max-3xl:mb-4" name={id === 0 ? "check" : "close-small"} />
                                <div className="text-body-bold">{t(id === 0 ? "terminationNoRefund" : "terminationProportionalRefund")}</div>
                                <div className="mt-2 text-body text-t-secondary leading-snug">
                                    {t(id === 0 ? "terminationYesDesc" : "terminationNoDesc")}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex mt-auto pt-10 max-md:-mx-1 max-md:pt-6">
                {activeId > 0 && (
                    <Button
                        className="min-w-40 max-md:min-w-[calc(50%-0.5rem)] max-md:mx-1"
                        isStroke
                        onClick={handlePrevious}
                    >
                        {t("previous")}
                    </Button>
                )}
                {activeId === totalSteps - 1 ? (
                    <Button
                        className="min-w-40 ml-auto max-md:min-w-[calc(50%-0.5rem)] max-md:mx-1"
                        isSecondary
                        as="link"
                        href="/quiz-generating"
                    >
                        {t("continue")}
                    </Button>
                ) : (
                    <Button
                        className="min-w-40 ml-auto max-md:min-w-[calc(50%-0.5rem)] max-md:mx-1"
                        isSecondary
                        onClick={handleNext}
                    >
                        {t("continue")}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ContractForm;
