import { type PointerEvent as ReactPointerEvent, useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import Modal from "@/components/Modal";
import Button from "@/components/Button";

type SignaturePadModalProps = {
    open: boolean;
    title: string;
    signerName: string;
    onClose: () => void;
    onSave: (dataUrl: string, inkTone: "light" | "dark") => void;
};

const SignaturePadModal = ({
    open,
    title,
    signerName,
    onClose,
    onSave,
}: SignaturePadModalProps) => {
    const locale = useLocale();
    const lang = locale.startsWith("es") ? "es" : locale.startsWith("en") ? "en" : "pt";
    const textByLang = {
        pt: {
            signerPrefix: "Assinante",
            clear: "Limpar",
            confirm: "Confirmar assinatura",
        },
        en: {
            signerPrefix: "Signer",
            clear: "Clear",
            confirm: "Confirm signature",
        },
        es: {
            signerPrefix: "Firmante",
            clear: "Limpiar",
            confirm: "Confirmar firma",
        },
    } as const;
    const copy = textByLang[lang];
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const inkToneRef = useRef<"light" | "dark">("dark");
    const isDrawingRef = useRef(false);
    const lastPointRef = useRef<{ x: number; y: number } | null>(null);
    const [hasStroke, setHasStroke] = useState(false);

    useEffect(() => {
        if (!open || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const isDarkMode =
            typeof document !== "undefined" &&
            (document.documentElement.getAttribute("data-theme") === "dark" ||
                document.documentElement.classList.contains("dark"));
        inkToneRef.current = isDarkMode ? "light" : "dark";
        const ratio = window.devicePixelRatio || 1;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        canvas.width = Math.floor(width * ratio);
        canvas.height = Math.floor(height * ratio);
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.scale(ratio, ratio);
        ctx.lineWidth = 2;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.strokeStyle = isDarkMode ? "#F5F5F5" : "#111111";
        ctx.clearRect(0, 0, width, height);
    }, [open]);

    const getPoint = (e: ReactPointerEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handlePointerDown = (e: ReactPointerEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;
        const point = getPoint(e);
        isDrawingRef.current = true;
        lastPointRef.current = point;
        canvas.setPointerCapture(e.pointerId);
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
    };

    const handlePointerMove = (e: ReactPointerEvent<HTMLCanvasElement>) => {
        if (!isDrawingRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;
        const point = getPoint(e);
        const last = lastPointRef.current;
        if (!last) return;
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
        lastPointRef.current = point;
        setHasStroke(true);
    };

    const handlePointerUp = (e: ReactPointerEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        isDrawingRef.current = false;
        lastPointRef.current = null;
        canvas.releasePointerCapture(e.pointerId);
    };

    const handleClear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        setHasStroke(false);
    };

    const handleSave = () => {
        const canvas = canvasRef.current;
        if (!canvas || !hasStroke) return;
        onSave(canvas.toDataURL("image/png"), inkToneRef.current);
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            classWrapper="max-w-180 px-10 py-10 max-md:px-6 max-md:py-8"
        >
            <div className="mb-6">
                <div className="text-h5">{title}</div>
                <div className="mt-1 text-body text-t-secondary">
                    {copy.signerPrefix}: {signerName}
                </div>
            </div>
            <div className="rounded-2xl border border-stroke2 bg-b-surface2 p-3">
                <canvas
                    ref={canvasRef}
                    className="h-52 w-full touch-none rounded-xl bg-b-surface2"
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerLeave={handlePointerUp}
                />
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
                <Button onClick={handleClear}>{copy.clear}</Button>
                <Button isPrimary disabled={!hasStroke} onClick={handleSave}>
                    {copy.confirm}
                </Button>
            </div>
        </Modal>
    );
};

export default SignaturePadModal;
