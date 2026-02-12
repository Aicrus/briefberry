import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import Field from "@/components/Field";
import Icon from "@/components/Icon";
import { formatCPF, formatCNPJ } from "@/lib/masks";

const CONTRACTOR_TYPE_OPTIONS = [
    { id: 0, titleKey: "contractorPF" as const, icon: "profile" },
    { id: 1, titleKey: "contractorPJ" as const, icon: "documents" },
] as const;

const STEP_KEYS = [
    "contractStep0",
    "contractStep1",
    "contractStep2",
    "contractStep3",
    "contractStep4",
    "contractStep5",
    "contractStep6",
] as const;

const cardClass = (active: boolean) =>
    `w-[calc(50%-1rem)] mt-4 mx-2 px-6 py-5.5 border-[1.5px] border-stroke1 rounded-[1.25rem] text-heading font-medium! text-t-secondary fill-t-secondary hover:border-transparent hover:bg-b-surface2 hover:shadow-hover hover:text-t-primary hover:fill-t-primary cursor-pointer transition-all max-md:w-[calc(50%-0.75rem)] max-md:mt-3 max-md:mx-1.5 ${
        active ? "border-stroke-focus! text-t-primary! fill-t-primary!" : ""
    }`;

const ContractForm = () => {
    const t = useTranslations("quiz");
    const [activeId, setActiveId] = useState(0);

    const [contractorType, setContractorType] = useState<number | null>(null);

    // Step 1: Contractor data
    const [contractorName, setContractorName] = useState("");
    const [contractorDocType, setContractorDocType] = useState<0 | 1 | 2>(0); // 0=CPF, 1=CNPJ, 2=Outro
    const [contractorDocument, setContractorDocument] = useState("");
    const [contractorEmail, setContractorEmail] = useState("");

    // Step 2: Client data
    const [clientName, setClientName] = useState("");
    const [clientDocType, setClientDocType] = useState<0 | 1 | 2>(0);
    const [clientDocument, setClientDocument] = useState("");
    const [clientEmail, setClientEmail] = useState("");

    const [intellectualProperty, setIntellectualProperty] = useState<number | null>(null);
    const [changePolicy, setChangePolicy] = useState<number | null>(null);
    const [termination, setTermination] = useState<number | null>(null);
    const [additionalTerms, setAdditionalTerms] = useState("");

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
                    <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                        {CONTRACTOR_TYPE_OPTIONS.map((option) => (
                            <div
                                key={option.id}
                                className={cardClass(contractorType === option.id)}
                                onClick={() => setContractorType(option.id)}
                            >
                                <Icon
                                    className="mb-8 fill-inherit max-3xl:mb-5"
                                    name={option.icon}
                                />
                                <div className="">{t(option.titleKey)}</div>
                            </div>
                        ))}
                    </div>
                )}
                {activeId === 1 && (
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
                                {([0, 1, 2] as const).map((id) => (
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
                                        {id === 0 ? t("docTypeCpf") : id === 1 ? t("docTypeCnpj") : t("docTypeOther")}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-3">
                                <Field
                                    label={t("contractorDocument")}
                                    value={contractorDocument}
                                    onChange={(e) => {
                                        const v = e.target.value;
                                        if (contractorDocType === 0) setContractorDocument(formatCPF(v));
                                        else if (contractorDocType === 1) setContractorDocument(formatCNPJ(v));
                                        else setContractorDocument(v);
                                    }}
                                    name="contractor-document"
                                    placeholder={
                                        contractorDocType === 2
                                            ? t("docTypeOtherPlaceholder")
                                            : t("contractorDocumentPlaceholder")
                                    }
                                    isLarge
                                    required
                                    onlyNumeric={contractorDocType !== 2}
                                    maxLength={contractorDocType === 0 ? 14 : contractorDocType === 1 ? 18 : 100}
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
                {activeId === 2 && (
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
                                {([0, 1, 2] as const).map((id) => (
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
                                        {id === 0 ? t("docTypeCpf") : id === 1 ? t("docTypeCnpj") : t("docTypeOther")}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-3">
                                <Field
                                    label={t("clientDocument")}
                                    value={clientDocument}
                                    onChange={(e) => {
                                        const v = e.target.value;
                                        if (clientDocType === 0) setClientDocument(formatCPF(v));
                                        else if (clientDocType === 1) setClientDocument(formatCNPJ(v));
                                        else setClientDocument(v);
                                    }}
                                    name="client-document"
                                    placeholder={
                                        clientDocType === 2 ? t("docTypeOtherPlaceholder") : t("clientDocumentPlaceholder")
                                    }
                                    isLarge
                                    required
                                    onlyNumeric={clientDocType !== 2}
                                    maxLength={clientDocType === 0 ? 14 : clientDocType === 1 ? 18 : 100}
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
                {activeId === 3 && (
                    <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                        {[0, 1].map((id) => (
                            <div
                                key={id}
                                className={cardClass(intellectualProperty === id)}
                                onClick={() => setIntellectualProperty(id)}
                            >
                                <Icon className="mb-5 fill-inherit max-3xl:mb-4" name="lock" />
                                <div className="text-body-bold">{t(id === 0 ? "ipAfterPayment" : "ipUntilPayment")}</div>
                                <div className="mt-2 text-body text-t-secondary leading-snug">
                                    {t(id === 0 ? "ipAfterPaymentDesc" : "ipUntilPaymentDesc")}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {activeId === 4 && (
                    <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                        {[0, 1].map((id) => (
                            <div
                                key={id}
                                className={cardClass(changePolicy === id)}
                                onClick={() => setChangePolicy(id)}
                            >
                                <Icon className="mb-5 fill-inherit max-3xl:mb-4" name={id === 0 ? "check" : "edit"} />
                                <div className="text-body-bold">{t(id === 0 ? "changesWithinScope" : "changesExtraCharged")}</div>
                                <div className="mt-2 text-body text-t-secondary leading-snug">
                                    {t(id === 0 ? "changesWithinScopeDesc" : "changesExtraChargedDesc")}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {activeId === 5 && (
                    <div className="flex flex-wrap -mt-4 -mx-2 max-md:-mt-3 max-md:-mx-1.5">
                        {[0, 1].map((id) => (
                            <div
                                key={id}
                                className={cardClass(termination === id)}
                                onClick={() => setTermination(id)}
                            >
                                <Icon className="mb-5 fill-inherit max-3xl:mb-4" name={id === 0 ? "check" : "close-small"} />
                                <div className="text-body-bold">{t(id === 0 ? "yes" : "no")}</div>
                                <div className="mt-2 text-body text-t-secondary leading-snug">
                                    {t(id === 0 ? "terminationYesDesc" : "terminationNoDesc")}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {activeId === 6 && (
                    <>
                        <p className="mb-4 text-body text-t-secondary">{t("contractTermsHint")}</p>
                        <Field
                            label={t("contractStep6")}
                            value={additionalTerms}
                            onChange={(e) => setAdditionalTerms(e.target.value)}
                            name="contract-additional-terms"
                            placeholder={t("contractTermsPlaceholder")}
                            isLarge
                            isTextarea
                            maxLength={1000}
                        />
                    </>
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
