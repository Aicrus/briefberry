"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Layout from "@/components/Layout";
import Select from "@/components/Select";
import Tags from "./Tags";
import Brief from "./Brief";
import EmptyBriefs from "./EmptyBriefs";

import { myBriefs } from "./briefs";

const TAG_KEYS = [
    { titleKey: "allBriefs" as const, value: "all-briefs" },
    { titleKey: "webApp" as const, value: "web-app" },
    { titleKey: "uxUiDesign" as const, value: "ux-ui-design" },
    { titleKey: "mobileApp" as const, value: "mobile-app" },
    { titleKey: "brandingLogo" as const, value: "branding-logo" },
    { titleKey: "illustration" as const, value: "illustration" },
    { titleKey: "threeDDesign" as const, value: "3d-design" },
];

const SORT_OPTION_KEYS = ["mostRecent", "popular", "mostLiked"] as const;

const MyBriefsPage = () => {
    const t = useTranslations("myBriefs");
    const [activeTag, setActiveTag] = useState("all-briefs");
    const [categoryId, setCategoryId] = useState(0);
    const options = SORT_OPTION_KEYS.map((key, id) => ({ id, name: t(key) }));
    const category = options[categoryId] ?? options[0];
    const tags = TAG_KEYS.map(({ titleKey, value }) => ({ title: t(titleKey), value }));

    return (
        <Layout isLoggedIn>
            <div className="py-20 max-[1179px]:py-16 max-lg:py-12 max-md:py-8 max-md:overflow-hidden">
                <div className="max-w-334 mx-auto px-12 max-3xl:max-w-304 max-2xl:max-w-280 max-[1179px]:max-w-232 max-md:px-6">
                    <div className="mb-8 text-h1 max-md:mb-6">{t("title")}</div>
                    <div className="flex justify-between mb-12 max-md:block max-md:mb-8">
                        <Tags
                            items={tags}
                            activeTag={activeTag}
                            setActiveTag={setActiveTag}
                        />
                        <Select
                            className="min-w-45"
                            value={category}
                            onChange={(opt) => setCategoryId(opt.id)}
                            options={options}
                        />
                    </div>
                    <div className="flex flex-wrap -mt-6 -mx-3 max-md:-mt-4 max-md:mx-0">
                        {myBriefs
                            .filter((brief) =>
                                activeTag === "all-briefs"
                                    ? true
                                    : brief.category === activeTag
                            )
                            .map((brief) => (
                                <Brief item={brief} key={brief.id} />
                            ))}
                    </div>
                    {myBriefs.filter((brief) =>
                        activeTag === "all-briefs"
                            ? true
                            : brief.category === activeTag
                    ).length === 0 && <EmptyBriefs />}
                </div>
            </div>
        </Layout>
    );
};

export default MyBriefsPage;
