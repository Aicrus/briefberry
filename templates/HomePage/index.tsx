"use client";

import { useTranslations } from "next-intl";
import Layout from "@/components/Layout";
import Pricing from "@/components/Pricing";
import Hero from "./Hero";
import About from "./About";
import Start from "./Start";

const HomePage = () => {
    const t = useTranslations("home");
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
