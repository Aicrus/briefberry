import { RefObject, useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useTranslations } from "next-intl";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import Field from "@/components/Field";
import Button from "@/components/Button";
import Images from "./Images";

type SectionProps = {
    title: string;
    content: React.ReactNode;
    images?: string[];
    isOnlyView?: boolean;
    onRegenerate?: (instruction: string) => Promise<void> | void;
    onTitleChange?: (nextTitle: string) => void;
    editedContent?: string;
    onContentChange?: (nextContent: string) => void;
    onImagesChange?: (nextImages: string[]) => void;
};

const BriefSection = ({
    title,
    content,
    images,
    isOnlyView,
    onRegenerate,
    onTitleChange,
    editedContent: editedContentProp,
    onContentChange,
    onImagesChange,
}: SectionProps) => {
    const t = useTranslations("brief");
    const [isRegenerate, setIsRegenerate] = useState(false);
    const [isRegenerateModalOpen, setIsRegenerateModalOpen] = useState(false);
    const [regenerateInstruction, setRegenerateInstruction] = useState("");
    const [edit, setEdit] = useState(false);
    const [editedContent, setEditedContent] = useState<string | null>(
        editedContentProp ?? null
    );
    const [draftContent, setDraftContent] = useState("");
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [draftTitle, setDraftTitle] = useState(title);

    const ref = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const titleInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setEditedContent(editedContentProp ?? null);
    }, [editedContentProp]);

    useOnClickOutside(ref as RefObject<HTMLElement>, () => {
        if (!edit) return;
        const next = draftContent.trim();
        setEditedContent(next || null);
        onContentChange?.(next);
        setEdit(false);
    });

    const handleRegenerate = async () => {
        const instruction = regenerateInstruction.trim();
        if (!instruction || isRegenerate) return;

        setIsRegenerateModalOpen(false);
        setIsRegenerate(true);

        try {
            if (onRegenerate) {
                await onRegenerate(instruction);
            } else {
                await new Promise((resolve) => setTimeout(resolve, 1800));
            }
            setRegenerateInstruction("");
        } finally {
            setIsRegenerate(false);
        }
    };

    const handleStartEdit = () => {
        if (isOnlyView || edit) return;
        const currentText = editedContent ?? contentRef.current?.innerText ?? "";
        setDraftContent(currentText);
        setEdit(true);
        setTimeout(() => textareaRef.current?.focus(), 0);
    };

    const handleStartEditTitle = () => {
        if (isOnlyView || isEditingTitle) return;
        setDraftTitle(title);
        setIsEditingTitle(true);
        setTimeout(() => titleInputRef.current?.focus(), 0);
    };

    const handleCommitTitle = () => {
        const nextTitle = draftTitle.trim();
        if (nextTitle && onTitleChange) {
            onTitleChange(nextTitle);
        }
        setIsEditingTitle(false);
    };

    return (
        <>
            <div className="not-last:mb-6">
                <div className="py-2 text-h5" onClick={handleStartEditTitle}>
                    {isEditingTitle ? (
                        <input
                            ref={titleInputRef}
                            className="w-full bg-transparent border-0 outline-0 text-h5"
                            value={draftTitle}
                            onChange={(e) => setDraftTitle(e.target.value)}
                            onBlur={handleCommitTitle}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleCommitTitle();
                                }
                            }}
                        />
                    ) : (
                        title
                    )}
                </div>
                <div className="group relative">
                    <div
                        className={`relative -mx-4 p-4 border-[1.5px] border-transparent rounded-2xl text-body text-t-primary-body [&_p]:not-last:mb-6 transition-colors ${
                            isOnlyView
                                ? ""
                                : "group-hover:border-stroke2 overflow-hidden"
                        } ${isRegenerate && !edit ? "border-stroke2!" : ""} ${
                            edit ? "border-primary1!" : ""
                        }`}
                        onClick={handleStartEdit}
                        ref={ref}
                    >
                        {edit ? (
                            <textarea
                                ref={textareaRef}
                                className="w-full min-h-40 p-0 bg-transparent resize-none outline-0 text-body text-t-primary-body"
                                value={draftContent}
                                onChange={(e) => setDraftContent(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        ) : editedContent !== null ? (
                            <div className="whitespace-pre-wrap">{editedContent}</div>
                        ) : (
                            <div ref={contentRef}>{content}</div>
                        )}
                        {images && (
                            <Images
                                images={images}
                                edit={edit}
                                onImagesChange={onImagesChange}
                            />
                        )}
                    </div>
                    {!isOnlyView && !edit && (
                        <button
                            className={`absolute -top-4 right-0 flex items-center gap-2 h-7 px-3 rounded-full bg-b-surface2 border border-stroke2 text-small font-bold text-t-secondary fill-t-secondary transition-all invisible opacity-0 hover:text-t-primary hover:fill-t-primary group-hover:visible group-hover:opacity-100 ${
                                isRegenerate
                                    ? "visible! opacity-100! text-primary2! fill-primary2!"
                                    : ""
                            }`}
                            disabled={isRegenerate}
                            onClick={() => setIsRegenerateModalOpen(true)}
                        >
                            <Icon
                                className="size-4! fill-inherit"
                                name="generation"
                            />
                            {isRegenerate ? t("regenerating") : t("regenerate")}
                        </button>
                    )}
                </div>
            </div>
            <Modal
                classWrapper="max-w-180 px-10 py-10 max-md:px-6 max-md:py-8"
                open={isRegenerateModalOpen}
                onClose={() => setIsRegenerateModalOpen(false)}
            >
                <div className="mb-6">
                    <div className="mb-2 text-h5">{t("regenerateModalTitle")}</div>
                    <div className="text-body text-t-secondary">
                        {t("regenerateModalDescription")}
                    </div>
                </div>
                <Field
                    isTextarea
                    value={regenerateInstruction}
                    onChange={(e) => setRegenerateInstruction(e.target.value)}
                    placeholder={t("regenerateModalPlaceholder")}
                    maxLength={1200}
                    showCharCount
                />
                <div className="mt-6 flex justify-end">
                    <Button
                        isPrimary
                        disabled={!regenerateInstruction.trim() || isRegenerate}
                        onClick={handleRegenerate}
                    >
                        {t("regenerate")}
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default BriefSection;
