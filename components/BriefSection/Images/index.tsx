import { useEffect, useRef, useState } from "react";
import Image from "@/components/Image";
import Icon from "@/components/Icon";

type Props = {
    images: string[];
    edit: boolean;
    onImagesChange?: (nextImages: string[]) => void;
};

const MAX_IMAGES = 4;

const Images = ({ images, edit, onImagesChange }: Props) => {
    const [localImages, setLocalImages] = useState<string[]>(images);
    const [isDragOver, setIsDragOver] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setLocalImages(images);
    }, [images]);

    const fileToDataUrl = (file: File) =>
        new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result || ""));
            reader.onerror = () => reject(new Error("file-read-error"));
            reader.readAsDataURL(file);
        });

    const handleFiles = async (fileList: FileList | null) => {
        if (!fileList) return;
        const selected = Array.from(fileList).filter((file) =>
            file.type.startsWith("image/")
        );
        if (selected.length === 0) return;
        const nextImages = await Promise.all(selected.map(fileToDataUrl));
        setLocalImages((prev) => {
            const merged = [...prev, ...nextImages].slice(0, MAX_IMAGES);
            onImagesChange?.(merged);
            return merged;
        });
        if (inputRef.current) inputRef.current.value = "";
    };

    const handleRemoveImage = (index: number) => {
        setLocalImages((prev) => {
            const next = prev.filter((_, i) => i !== index);
            onImagesChange?.(next);
            return next;
        });
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragOver(false);
        handleFiles(e.dataTransfer.files);
    };

    if (!edit && localImages.length === 0) {
        return null;
    }

    return (
        <div className={`flex items-stretch -mx-12 overflow-auto scrollbar-none max-md:-mx-8 before:shrink-0 before:w-12 after:shrink-0 after:w-12 max-md:before:w-8 max-md:after:w-8 ${
            edit || localImages.length > 0 ? "min-h-24" : ""
        }`}>
            {edit && (
                <div
                    className={`relative flex items-center justify-center shrink-0 w-32 h-24 mr-3 rounded-2xl border-[1.5px] border-transparent ${
                        isDragOver ? "bg-b-surface2 border-stroke-focus" : "bg-b-subtle"
                    }`}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragOver(true);
                    }}
                    onDragLeave={(e) => {
                        e.preventDefault();
                        setIsDragOver(false);
                    }}
                    onDrop={handleDrop}
                >
                    <input
                        ref={inputRef}
                        type="file"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleFiles(e.target.files)}
                    />
                    <Icon className="fill-t-secondary" name="camera-stroke" />
                </div>
            )}
            {localImages.map((image, index) => (
                <div
                    className="group/image relative shrink-0 w-32 h-24 not-last:mr-3"
                    key={index}
                >
                    <Image
                        className="w-full h-full object-cover rounded-2xl"
                        src={image}
                        width={128}
                        height={96}
                        alt=""
                    />
                    {edit && (
                        <button
                            className="absolute top-1 right-1 size-6 bg-b-surface1 rounded-full text-0 fill-t-secondary invisible opacity-0 transition-all hover:fill-t-primary group-hover/image:visible group-hover/image:opacity-100"
                            onClick={() => handleRemoveImage(index)}
                            type="button"
                        >
                            <Icon
                                className="size-5! fill-inherit"
                                name="close-small"
                            />
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Images;
