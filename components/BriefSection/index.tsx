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
    const draftContentHtmlRef = useRef("");
    const didEditContentRef = useRef(false);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [draftTitle, setDraftTitle] = useState(title);

    const ref = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const editableDivRef = useRef<HTMLDivElement | null>(null);
    const titleInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setEditedContent(editedContentProp ?? null);
    }, [editedContentProp]);

    useOnClickOutside(ref as RefObject<HTMLElement>, () => {
        if (!edit) return;
        if (!didEditContentRef.current) {
            setEdit(false);
            return;
        }
        const next = draftContentHtmlRef.current.trim();
        setEditedContent(next || null);
        onContentChange?.(next);
        setEdit(false);
        didEditContentRef.current = false;
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

    const focusEditorAtPoint = (x: number, y: number) => {
        const editable = editableDivRef.current;
        if (!editable) return;

        editable.focus();

        const selection = window.getSelection();
        if (!selection) return;

        let range: Range | null = null;
        const doc = document as Document & {
            caretPositionFromPoint?: (
                px: number,
                py: number
            ) => { offsetNode: Node; offset: number } | null;
            caretRangeFromPoint?: (px: number, py: number) => Range | null;
        };

        if (doc.caretPositionFromPoint) {
            const caret = doc.caretPositionFromPoint(x, y);
            if (caret) {
                range = document.createRange();
                range.setStart(caret.offsetNode, caret.offset);
                range.collapse(true);
            }
        } else if (doc.caretRangeFromPoint) {
            range = doc.caretRangeFromPoint(x, y);
        }

        if (!range) {
            range = document.createRange();
            range.selectNodeContents(editable);
            range.collapse(false);
        }

        selection.removeAllRanges();
        selection.addRange(range);
    };

    const handleStartEditAtPoint = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isOnlyView || edit) return;
        const currentHtml = editedContent ?? contentRef.current?.innerHTML ?? "";
        draftContentHtmlRef.current = currentHtml;
        didEditContentRef.current = false;
        const { clientX, clientY } = e;
        setEdit(true);
        setTimeout(() => focusEditorAtPoint(clientX, clientY), 0);
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
                        className={`relative -mx-4 p-4 border-[1.5px] border-transparent rounded-2xl text-[15.5px] leading-7 text-t-primary [&_p]:not-last:mb-6 [text-align:justify] [&_li]:text-left transition-colors ${
                            isOnlyView
                                ? ""
                                : "group-hover:border-stroke2 overflow-hidden"
                        } ${isRegenerate && !edit ? "border-stroke2!" : ""} ${
                            edit ? "border-primary1!" : ""
                        }`}
                        onClick={handleStartEditAtPoint}
                        ref={ref}
                    >
                        {edit ? (
                            <div
                                ref={editableDivRef}
                                className="w-full min-h-40 p-0 bg-transparent outline-0 text-body text-t-primary-body [&_p]:not-last:mb-6"
                                contentEditable
                                suppressContentEditableWarning
                                dangerouslySetInnerHTML={{
                                    __html: draftContentHtmlRef.current,
                                }}
                                onInput={(e) => {
                                    draftContentHtmlRef.current =
                                        e.currentTarget.innerHTML;
                                    didEditContentRef.current = true;
                                }}
                                onClick={(e) => e.stopPropagation()}
                            />
                        ) : editedContent !== null ? (
                            <div
                                className="whitespace-normal [text-align:justify] [&_li]:text-left [&_p]:not-last:mb-6"
                                dangerouslySetInnerHTML={{ __html: editedContent }}
                            />
                        ) : (
                            <div
                                ref={contentRef}
                                className="whitespace-normal [text-align:justify] [&_li]:text-left"
                            >
                                {content}
                            </div>
                        )}
                        {images && (
                            <div className={edit ? "" : "mt-4"}>
                                <Images
                                    images={images}
                                    edit={edit}
                                    onImagesChange={onImagesChange}
                                />
                            </div>
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
