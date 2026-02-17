"use client";

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

const BriefPage = () => {
    const t = useTranslations("brief");
    const isPremiumPlan = useEventsStore((state) => state.isPremiumPlan);
    const searchParams = useSearchParams();
    const feature = searchParams.get("feature");

    const editHref =
        feature === "contract"
            ? "/quiz/contract?edit=1"
            : feature === "prd"
            ? "/quiz/prd?edit=1"
            : "/quiz?edit=1";

    return (
        <Layout isFixedHeader isHiddenFooter isVisiblePlan isLoggedIn>
            <div className="pt-34 px-6 pb-38 max-2xl:pt-32 max-2xl:px-11 max-2xl:pb-33 max-xl:pt-30 max-lg:pt-28 max-md:pt-22 max-md:px-4 max-md:pb-24">
                <div className="relative max-w-170 mx-auto p-12 shadow-hover bg-b-surface4 rounded-4xl before:absolute before:top-full before:left-6 before:right-6 before:-z-1 before:h-3.75 before:rounded-b-4xl before:bg-b-surface2 max-md:px-8 max-md:pb-4 max-md:before:hidden">
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
                            Studio Modelo 2024
                        </div>
                        <BriefCategory value="ux-ui-design" />
                    </div>
                    <BriefSection
                        title={t("introduction")}
                        content={content.introduction}
                    />
                    <BriefSection title={t("goals")} content={content.goals} />
                    <BriefSection title={t("timeline")} content={content.timeline} />
                    <BriefSection title={t("budget")} content={content.budget} />
                    <BriefSection
                        title={t("references")}
                        content={content.references}
                        images={content.images}
                    />
                    <BriefSection
                        title={t("conclusion")}
                        content={content.conclusion}
                    />
                </div>
            </div>
            <Actions />
        </Layout>
    );
};

export default BriefPage;
