"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import Pricing from "@/components/Pricing";
import { clearAllDrafts } from "@/lib/draftStorage";
import Hero from "./Hero";
import About from "./About";
import Start from "./Start";

const HomePage = () => {
    const t = useTranslations("home");

    useEffect(() => {
        clearAllDrafts();
    }, []);

    return (
        <Layout>
            <Hero />
            <About />
            <Pricing
                className="section"
                title={t("pricingTitle")}
            />
            <Start />
        </Layout>
    );
};

export default HomePage;
