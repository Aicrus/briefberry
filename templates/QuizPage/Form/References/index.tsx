import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Icon from "@/components/Icon";
import Field from "@/components/Field";
import Button from "@/components/Button";

const MAX_IMAGES = 4;
const MAX_LINKS = 2;

const References = ({}) => {
    const t = useTranslations("quiz");
    const [referenceLink, setReferenceLink] = useState("");
    const [referenceLinks, setReferenceLinks] = useState<string[]>([]);
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const nextPreviews = images.map((image) => URL.createObjectURL(image));
        setPreviews(nextPreviews);

        return () => {
            nextPreviews.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [images]);

    const handleFiles = (fileList: FileList | null) => {
        if (!fileList) return;
        const selected = Array.from(fileList).filter((file) =>
            file.type.startsWith("image/")
        );
        if (selected.length === 0) return;
        setImages((prev) => [...prev, ...selected].slice(0, MAX_IMAGES));
        if (inputRef.current) inputRef.current.value = "";
    };

    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleAddLink = () => {
        const value = referenceLink.trim();
        if (!value || referenceLinks.length >= MAX_LINKS) return;
        setReferenceLinks((prev) => [...prev, value].slice(0, MAX_LINKS));
        setReferenceLink("");
    };

    const handleRemoveLink = (index: number) => {
        setReferenceLinks((prev) => prev.filter((_, i) => i !== index));
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        handleFiles(e.dataTransfer.files);
    };

    return (
        <div className="">
            <div
                className={`relative flex flex-col justify-center items-center h-50 mb-5 rounded-3xl bg-b-subtle border-[1.5px] border-transparent transition-colors max-md:h-40 ${
                    isDragOver ? "border-stroke-focus bg-b-surface2" : ""
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    ref={inputRef}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleFiles(e.target.files)}
                />
                <Icon className="mb-1.5 fill-t-tertiary" name="camera" />
                <div className="text-button text-t-secondary">
                    {t("dragDrop")}{" "}
                    <span className="text-t-primary">{t("browse")}</span>
                </div>
                <div className="mt-1 text-hairline text-t-tertiary">
                    {images.length} / {MAX_IMAGES}
                </div>
            </div>
            {previews.length > 0 && (
                <ul className="grid grid-cols-4 gap-3 mb-5 max-md:grid-cols-2">
                    {previews.map((src, index) => (
                        <li key={src} className="relative h-24 rounded-xl overflow-hidden bg-b-subtle">
                            <img
                                className="w-full h-full object-cover"
                                src={src}
                                alt={`reference-${index + 1}`}
                            />
                            <button
                                className="absolute top-2 right-2 flex justify-center items-center size-6 rounded-full bg-b-surface2/90"
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                            >
                                <Icon className="size-3.5 fill-t-primary" name="close-small" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {referenceLinks.length < MAX_LINKS && (
                <>
                    <Field
                        className="mb-4"
                        label={t("referenceLink")}
                        value={referenceLink}
                        onChange={(e) => setReferenceLink(e.target.value)}
                        name="reference-link"
                        placeholder={t("referenceLinkPlaceholder")}
                        isLarge
                        required
                        maxLength={500}
                    />
                    <Button
                        className="px-5.5"
                        isStroke
                        onClick={handleAddLink}
                    >
                        <Icon className="mr-2" name="plus" />
                        {t("addLink")}
                    </Button>
                </>
            )}
            {referenceLinks.length > 0 && (
                <ul className="mt-4 space-y-2">
                    {referenceLinks.map((link, index) => (
                        <li
                            key={`${link}-${index}`}
                            className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-b-subtle"
                        >
                            <a
                                className="truncate text-body text-t-primary underline"
                                href={link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {link}
                            </a>
                            <button
                                type="button"
                                onClick={() => handleRemoveLink(index)}
                                className="shrink-0"
                            >
                                <Icon className="size-4 fill-t-secondary" name="close-small" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <div className="mt-2 text-hairline text-t-tertiary">
                {referenceLinks.length} / {MAX_LINKS} links
            </div>
        </div>
    );
};

export default References;
