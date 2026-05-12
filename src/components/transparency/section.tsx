import type { ReactNode } from "react";

export function Section({
    id,
    alt = false,
    children,
}: {
    id: string;
    alt?: boolean;
    children: ReactNode;
}) {
    return (
        <section
            id={id}
            className={`py-20 scroll-mt-[130px] ${alt ? "bg-white" : "bg-(--color-bg)"}`}
        >
            <div className="wrap">{children}</div>
        </section>
    );
}

export function SectionHead({
    eyebrow,
    title,
    children,
}: {
    eyebrow: string;
    title: string;
    children?: ReactNode;
}) {
    return (
        <div className="mb-11 max-w-[680px]">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold text-(--color-g600) tracking-[1.4px] uppercase mb-3 before:content-[''] before:w-6 before:h-[1.5px] before:bg-(--color-g500)">
                {eyebrow}
            </div>
            <h2 className="text-[32px] font-extrabold tracking-[-1px] leading-[1.18] mb-3">
                {title}
            </h2>
            {children ? (
                <p className="text-[15px] text-(--color-muted) leading-relaxed">{children}</p>
            ) : null}
        </div>
    );
}
