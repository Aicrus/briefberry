"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import Layout from "@/components/Layout";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import BriefSection from "@/components/BriefSection";
import BriefCategory from "@/components/BriefCategory";
import SignaturePadModal from "@/components/SignaturePadModal";
import useEventsStore from "@/store/useEventsStore";
import { DRAFT_KEYS, loadDraft } from "@/lib/draftStorage";
import { digitsToNumber, type CurrencyId } from "@/lib/currency";
import Actions from "./Actions";

type ContractDocTypeId = 0 | 1 | 2 | 3 | 4 | 5;
type ContractWizardDraft = {
    contractorName: string;
    contractorDocType: ContractDocTypeId;
    contractorDocument: string;
    contractorEmail: string;
    contractorAddress: string;
    clientName: string;
    clientDocType: ContractDocTypeId;
    clientDocument: string;
    clientEmail: string;
    clientAddress: string;
    projectProposalLink: string;
    projectDescription: string;
    contractValue: string;
    paymentTerms: string;
    projectStartDate: string;
    projectDeliveryDate: string;
    warrantyDays: string;
    forumCity: string;
    signatureCity: string;
    signatureDate: string;
    currency: number | null;
};

function getContractDocTypeLabel(
    docType: ContractDocTypeId | null | undefined,
    docLocale: DocLocale
): string {
    if (docType === 0) return "CPF";
    if (docType === 1) return "CNPJ";
    if (docType === 2) return "SSN";
    if (docType === 3) return "EIN";
    if (docType === 4) return "VAT/NIF";
    return docLocale === "en" ? "Document" : "Documento";
}

type DocLocale = "pt" | "en" | "es";

function resolveDocLocale(locale: string): DocLocale {
    if (locale.startsWith("es")) return "es";
    if (locale.startsWith("en")) return "en";
    return "pt";
}

const CONTRACT_UI_COPY = {
    pt: {
        documentTitle: "Contrato de Desenvolvimento de Aplicativo",
        sectionIntroduction: "Partes Contratantes",
        sectionGoals: "Objeto do Contrato e Escopo",
        sectionTimeline: "Execução e Obrigações",
        sectionBudget: "Termos e Condições de Pagamento",
        sectionReferences: "Rescisão, Sigilo e Direitos",
        sectionConclusion: "Foro e Assinaturas",
        toDefine: "A definir",
        notInformed: "não informado",
        addressNotInformed: "endereço não informado",
        paymentTermsFallback: "Condições de pagamento a definir entre as partes.",
        clientLabel: "CONTRATANTE",
        contractorLabel: "CONTRATADA",
        introClientPrefix:
            "Pelo presente instrumento particular de contrato, de um lado, doravante denominada simplesmente",
        introClientSuffix: "inscrita no",
        introClientAddress: "com sede em",
        introClientEmail: "e e-mail",
        introContractorPrefix: "E, de outro lado, doravante denominada",
        introContractorSuffix: "inscrita no",
        introEnding: "têm entre si, justo e contratado o que segue:",
        objectTitle: "DO OBJETO DO CONTRATO",
        clause1:
            "CLÁUSULA 1ª - Constitui objeto deste contrato a prestação dos serviços pela CONTRATADA à CONTRATANTE, conforme escopo abaixo:",
        proposalReferenceLabel: "Referência da proposta do projeto:",
        paymentTitle: "DO CUSTO E DA FORMA DE PAGAMENTO",
        clause4:
            "CLÁUSULA 4ª - Pela prestação de serviços referidos na cláusula 1 supra, a CONTRATANTE pagará à CONTRATADA o valor total de",
        paymentClauseSuffix: "conforme condições abaixo:",
        timelineTitle: "DO PRAZO",
        timelineTextStart: "O presente contrato inicia em",
        timelineTextEnd: "e possui entrega acordada para",
        warrantyLabel: "GARANTIA",
        warrantyText: "O projeto possui",
        warrantyTextSuffix:
            "dias de garantia para eventuais ajustes e correção de bugs.",
        rescissionTitle: "DA RESCISÃO",
        clause5Prefix: "CLÁUSULA 5ª -",
        noRefundClause:
            "A rescisão do presente instrumento não extinguirá os direitos e obrigações que as partes tenham entre si e para com terceiros, não havendo estorno do valor já pago, caso o projeto já tenha sido iniciado.",
        forumTitle: "DO FORO",
        clause12:
            "CLÁUSULA 12ª - Para dirimir quaisquer controvérsias oriundas do contrato, as partes elegem o foro da comarca de",
        closingLine:
            "As partes acima já qualificadas ora contratadas, resolvem na melhor forma de direito firmar o presente contrato.",
        signaturesTitle: "Assinaturas",
        signerNamePlaceholder: "Nome do assinante",
        signAgain: "Assinar novamente",
        clickToSign: "Clique para assinar",
        signatureModalTitle: "Assinatura eletrônica",
        witnessRole: "TESTEMUNHA",
        witness1Default: "TESTEMUNHA 1",
        witness2Default: "TESTEMUNHA 2",
    },
    en: {
        documentTitle: "Application Development Contract",
        sectionIntroduction: "Contracting Parties",
        sectionGoals: "Contract Scope and Object",
        sectionTimeline: "Execution and Obligations",
        sectionBudget: "Payment Terms and Conditions",
        sectionReferences: "Termination, Confidentiality and Rights",
        sectionConclusion: "Jurisdiction and Signatures",
        toDefine: "To be defined",
        notInformed: "not informed",
        addressNotInformed: "address not informed",
        paymentTermsFallback: "Payment terms to be defined between the parties.",
        clientLabel: "CLIENT",
        contractorLabel: "CONTRACTOR",
        introClientPrefix:
            "By this private agreement, on one side, hereinafter referred to as",
        introClientSuffix: "registered under",
        introClientAddress: "with registered office at",
        introClientEmail: "and email",
        introContractorPrefix: "And, on the other side, hereinafter referred to as",
        introContractorSuffix: "registered under",
        introEnding: "agree to the following terms:",
        objectTitle: "OBJECT OF THE CONTRACT",
        clause1:
            "CLAUSE 1 - The object of this contract is the provision of services by the CONTRACTOR to the CLIENT, according to the scope below:",
        proposalReferenceLabel: "Project proposal reference:",
        paymentTitle: "COST AND PAYMENT TERMS",
        clause4:
            "CLAUSE 4 - For the services described in Clause 1, the CLIENT shall pay the CONTRACTOR the total amount of",
        paymentClauseSuffix: "according to the conditions below:",
        timelineTitle: "TIMELINE",
        timelineTextStart: "This contract starts on",
        timelineTextEnd: "and has an agreed delivery date of",
        warrantyLabel: "WARRANTY",
        warrantyText: "The project includes",
        warrantyTextSuffix:
            "days of warranty for bug fixes and adjustment corrections.",
        rescissionTitle: "TERMINATION",
        clause5Prefix: "CLAUSE 5 -",
        noRefundClause:
            "Termination of this agreement does not extinguish rights and obligations between the parties and third parties, and there will be no refund for amounts already paid once the project has started.",
        forumTitle: "JURISDICTION",
        clause12:
            "CLAUSE 12 - To settle any disputes arising from this contract, the parties elect the jurisdiction of",
        closingLine:
            "The parties identified above execute this agreement in the best form of law.",
        signaturesTitle: "Signatures",
        signerNamePlaceholder: "Signer name",
        signAgain: "Sign again",
        clickToSign: "Click to sign",
        signatureModalTitle: "Electronic signature",
        witnessRole: "WITNESS",
        witness1Default: "WITNESS 1",
        witness2Default: "WITNESS 2",
    },
    es: {
        documentTitle: "Contrato de Desarrollo de Aplicaciones",
        sectionIntroduction: "Partes Contratantes",
        sectionGoals: "Objeto y Alcance del Contrato",
        sectionTimeline: "Ejecución y Obligaciones",
        sectionBudget: "Términos y Condiciones de Pago",
        sectionReferences: "Rescisión, Confidencialidad y Derechos",
        sectionConclusion: "Foro y Firmas",
        toDefine: "Por definir",
        notInformed: "no informado",
        addressNotInformed: "dirección no informada",
        paymentTermsFallback: "Condiciones de pago por definir entre las partes.",
        clientLabel: "CLIENTE",
        contractorLabel: "CONTRATISTA",
        introClientPrefix:
            "Por el presente instrumento particular de contrato, de una parte, en adelante denominada",
        introClientSuffix: "inscrita en",
        introClientAddress: "con sede en",
        introClientEmail: "y correo electrónico",
        introContractorPrefix: "Y, de otra parte, en adelante denominada",
        introContractorSuffix: "inscrita en",
        introEnding: "acuerdan lo siguiente:",
        objectTitle: "OBJETO DEL CONTRATO",
        clause1:
            "CLÁUSULA 1 - Constituye objeto de este contrato la prestación de servicios por la CONTRATISTA al CLIENTE, según el alcance abajo:",
        proposalReferenceLabel: "Referencia de la propuesta del proyecto:",
        paymentTitle: "COSTO Y FORMA DE PAGO",
        clause4:
            "CLÁUSULA 4 - Por los servicios descritos en la cláusula 1, el CLIENTE pagará a la CONTRATISTA el valor total de",
        paymentClauseSuffix: "según las condiciones siguientes:",
        timelineTitle: "PLAZO",
        timelineTextStart: "El presente contrato inicia en",
        timelineTextEnd: "y tiene entrega acordada para",
        warrantyLabel: "GARANTÍA",
        warrantyText: "El proyecto tiene",
        warrantyTextSuffix:
            "días de garantía para ajustes eventuales y corrección de errores.",
        rescissionTitle: "RESCISIÓN",
        clause5Prefix: "CLÁUSULA 5 -",
        noRefundClause:
            "La rescisión del presente instrumento no extinguirá los derechos y obligaciones entre las partes y frente a terceros, sin reembolso de los valores ya pagados una vez iniciado el proyecto.",
        forumTitle: "FORO",
        clause12:
            "CLÁUSULA 12 - Para dirimir cualquier controversia derivada del contrato, las partes eligen el foro de",
        closingLine:
            "Las partes ya calificadas firman el presente contrato en la mejor forma de derecho.",
        signaturesTitle: "Firmas",
        signerNamePlaceholder: "Nombre del firmante",
        signAgain: "Firmar nuevamente",
        clickToSign: "Haz clic para firmar",
        signatureModalTitle: "Firma electrónica",
        witnessRole: "TESTIGO",
        witness1Default: "TESTIGO 1",
        witness2Default: "TESTIGO 2",
    },
} as const;

const GENERIC_SIGNATURE_COPY = {
    pt: {
        proposalClientRole: "CONTRATANTE",
        proposalProviderRole: "CONTRATADA",
        prdOwnerRole: "RESPONSÁVEL PELO PRODUTO",
        prdTechRole: "RESPONSÁVEL TÉCNICO",
        signer1: "Assinante 1",
        signer2: "Assinante 2",
    },
    en: {
        proposalClientRole: "CLIENT",
        proposalProviderRole: "CONTRACTOR",
        prdOwnerRole: "PRODUCT OWNER",
        prdTechRole: "TECHNICAL LEAD",
        signer1: "Signer 1",
        signer2: "Signer 2",
    },
    es: {
        proposalClientRole: "CLIENTE",
        proposalProviderRole: "CONTRATISTA",
        prdOwnerRole: "RESPONSABLE DEL PRODUCTO",
        prdTechRole: "RESPONSABLE TÉCNICO",
        signer1: "Firmante 1",
        signer2: "Firmante 2",
    },
} as const;

const contractContent = {
    introduction: (
        <div className="space-y-3">
            <p>
                Pelo presente instrumento particular de contrato, de um lado,
                doravante denominada simplesmente <strong>CONTRATANTE</strong>,
                pela pessoa jurídica BEST SOLUTIONS GROUP USA LLC com sede em
                WESTSIDE VLG LP, cidade de WINDERMERE/ estado FLÓRIDA Nº 12803,
                ZIP CODE 34786, inscrita no EIN Nº 99-0779895, e seu
                representante legal ALEXANDRE LUIS CAMARGO SOLE, E-MAIL:
                alexlcamargo75@gmail.com
            </p>
            <p>
                Com o objetivo de agilizar o processo e aumentar a precisão, a
                empresa delega ao parceiro, Mario Marcio Albino Pavão,
                identificado pelo ID A415-553-78-442-0, as funções de gestão do
                projeto, incluindo a comunicação com a equipe de desenvolvimento.
                Todas as informações e reportagens serão conduzidas por ele,
                residente no endereço 1910 Celebration Blvd, apt 205, CEP 34747,
                Celebration-FL, e acessível através do e-mail
                marcio@best4send.com. Mario Marcio Albino Pavão também se torna
                responsável oficial pelo projeto, conforme estabelecido neste
                contrato.
            </p>
            <p>
                E, de outro lado, doravante denominada <strong>CONTRATADA</strong>{" "}
                AICRUS com sede em São Paulo à rua MMDC, CEP 05510-000, inscrita
                no CPF/CNPJ N° 36.501.721/0001-22, e seu representante legal
                PAULO MORALES inscrito no CPF Nº 029.328.682-50 tem entre si,
                justo e contratado o que segue:
            </p>
        </div>
    ),
    goals: (
        <div className="space-y-3">
            <p>
                <strong>DO OBJETO DO CONTRATO</strong>
            </p>
            <p>
                <strong>CLÁUSULA 1ª</strong> - Constitui objeto deste contrato a prestação dos
                serviços pela CONTRATADA à CONTRATANTE o desenvolvimento de:
            </p>
            <p>
                Desenvolvimento de uma plataforma de meios de pagamentos, câmbio
                e remessa internacional &quot;BEST 4SEND” completa com todas as
                funções e integrações necessárias para sua operação, entregues em
                aplicação WEB e Mobile para utilização em computadores e
                aplicativos Android e IOS hospedados e funcionais nas respectivas
                plataformas.
            </p>
            <p>
                Aplicativo funcional para (Android, iOS) com entrega de
                código-fonte do projeto para registro de patente nos órgãos
                competentes (Código Dart) e transferência para a conta do
                CONTRATANTE.
            </p>
            <p>
                <strong>EXECUÇÃO DOS SERVIÇOS</strong>
            </p>
            <p>
                Os serviços objeto deste contrato serão executados pelo
                CONTRATADO, observando o disposto na proposta apresentada,
                conforme descrito a seguir sobre suas principais funcionalidades:
            </p>
            <p>
                I – Trata-se de uma abrangente plataforma de pagamentos
                internacionais que visa integrar serviços de geração de links de
                pagamento, gateways de pagamento, operações de câmbio e cartões
                pré-pagos com uma experiência segura e em conformidade com os
                regulamentos financeiros internacionais.
            </p>
            <p>
                <strong>Principais funcionalidades descritas abaixo:</strong>
            </p>
            <ul className="list-disc pl-8 space-y-2 [&>li]:leading-7">
                <li>Geração de Links de Pagamento e Checkout</li>
                <li>
                    Conta master plataforma com Dashboards e relatórios de gestão
                    completa
                </li>
                <li>
                    Contas de cliente com Dashboards e Relatórios individuais
                </li>
                <li>
                    Cotas de cartão de débito/pré-pago com Dashboards e
                    relatórios master e individuais (API)
                </li>
                <li>Configurações Gerenciais, Permissionamentos e taxas.</li>
                <li>
                    Integrações Externas com Gateway de pagamento, corretora de
                    cambio/remessa internacional e emissor de cartão pré-pago
                </li>
                <li>
                    Painel de gestão de afiliados com configuração de comissão e
                    geração link de divulgação para abertura de contas
                </li>
                <li>
                    API documentada com manual intuitivo para integração de
                    terceiros
                </li>
                <li>
                    Adoção de padrões de segurança global e conformidade com
                    regulamentos financeiros dos EUA e Brasil (A segurança na
                    aplicação e APIs foca no controle de acesso dos usuários,
                    excluindo segurança em integrações com terceiros)
                </li>
                <li>
                    Monitoramento transacional ponta a ponta com reconciliação em
                    tempo real e periódicas para prevenção de fraudes e erros nas
                    transformações seguindo regras de segurança e compilasse.
                </li>
                <li>Desempenho e Escalabilidade</li>
                <li>Arquitetura Modular Micro Serviços</li>
                <li>Tecnologia FlutterFlow e Supabase/PostgreSQL</li>
            </ul>
            <p>
                PARÁGRAFO ÚNICO - Este projeto possui 60 (dias) de garantia para
                eventuais ajustes e correção de bugs.
            </p>
            <p>
                Após o término do período de garantia de 60 dias, quaisquer
                correções ou ajustes necessários não incorrerão em custos
                adicionais, já que estão inclusos no plano anual de suporte, o
                qual tem um valor de R$ 3.600 reais. Além disso, ao se tornar
                nosso cliente anual, você terá direito a um desconto de 30% em
                futuras funcionalidades, tanto no front-end quanto no back-end.
            </p>
        </div>
    ),
    timeline: (
        <div className="space-y-3">
            <p>
                <strong>DAS OBRIGAÇÕES DA CONTRATANTE</strong>
            </p>
            <p>
                <strong>PARÁGRAFO PRIMEIRO</strong> - Para que a CONTRATADA
                possa executar os trabalhos de criação e desenvolvimento do
                projeto referidos no caput desta cláusula, o CONTRATANTE deverá
                fornecer briefing, do projeto para ser desenvolvido, materiais
                fornecidos pela CONTRATANTE preferencialmente por escrito, dos
                produtos/serviços sobre os quais e para os quais os trabalhos
                serão realizados.
            </p>
            <p>
                <strong>PARÁGRAFO SEGUNDO</strong> – Desenvolvimento e
                hospedagem diretamente nos ambientes gerenciados serão custeados
                pela CONTRATANTE como: Conta FlutterFlow, conta Supabase, GitHub
                e outros utilizados no processo de desenvolvimento e entrega, com
                ambientes configurados e prontos para continuidade de ajustes,
                manutenção e implementação de novos módulos em a necessidade de
                configurar novos ambientes.
            </p>
            <p>
                <strong>PARÁGRAFO TERCEIRO</strong> — Os custos associados a
                servidores, serviços de e-mail, SMS, bem como outras ferramentas
                e softwares essenciais para a operacionalização do sistema ficarão
                sob a responsabilidade do CONTRATANTE.
            </p>
            <p>
                <strong>DAS OBRIGAÇÕES DA CONTRATADA</strong>
            </p>
            <p>
                <strong>CLÁUSULA 2ª</strong> - Dentro do prazo de 2 dias a contar
                da assinatura deste contrato, a CONTRATADA deverá proceder à
                criação de uma primeira ideia ou primeiro esboços ou conceito,
                apresentando-os à CONTRATANTE, que, a contar do seu recebimento,
                deverá aprová-los ou não, sempre por escrito, no prazo de 1 dia.
            </p>
            <p>
                <strong>CLÁUSULA 3ª</strong> - As PARTES comprometem-se a
                utilizar as informações confidenciais apenas no âmbito do
                desenvolvimento e da execução do projeto de colaboração, sendo
                vedada tanto a sua divulgação à terceiros, quanto qualquer outra
                utilização que não seja expressamente permitida pela PARTE
                REVELADORA.
            </p>
        </div>
    ),
    budget: (
        <div className="space-y-3">
            <p>
                <strong>DO CUSTO E DA FORMA DE PAGAMENTO</strong>
            </p>
            <p>
                <strong>CLÁUSULA 4ª</strong> - Pela prestação de serviços
                referidos na cláusula 1 supra, bem como pela concessão na sua
                utilização mencionada a CONTRATANTE pagará a CONTRATADA uma única
                vez um total de R$ 80.400 (Setenta e cinco mil reais) pagos da
                seguinte forma:
            </p>
            <p>
                O valor do contrato, inclui monitoramento e o bom funcionamento e
                a manutenção contínua anual, é de R$ 3.600 (três mil e seiscentos)
                reais, garantindo a operacionalidade do sistema atualizações
                regulares e suporte técnico especializado.
            </p>
            <p>
                Além disso, abrange R$ 1.800 (mil e oitocentos) reais para
                disponibilizar o aplicativo na App Store e Google Play Store,
                assegurando sua presença nas principais plataformas móveis.
            </p>
            <p>
                Duas parcelas iguais no valor de R$ 40.200 (quarenta mil e
                duzentos) reais. A ser pago pelo CONTRATANTE à CONTRATADA primeira
                parcela no dia 27 de Fevereiro de 2024 e segunda parcela de 50% à
                ser paga após a finalização e entrega do App.
            </p>
            <p>
                O código-fonte permanecerá fora do servidor do Contratante até que
                o pagamento integral seja efetuado.
            </p>
            <p>
                O valor deverá ser repassado ao Contratado através de transferência
                PIX ou transferência bancária brasileira, conta americana ou
                Europeia fornecida pela CONTRATADA.
            </p>
            <p>
                <strong>DO PRAZO</strong>
            </p>
            <p>
                <strong>PARÁGRAFO TERCEIRO:</strong> o presente contrato possui
                prazo de até 60 (DIAS) ÚTEIS a partir da assinatura deste
                contrato, iniciando-se em 27 de Janeiro de 2024 e finalizando-se
                em 20 de Maio de 2024 com possibilidade de entrega antes deste
                prazo.
            </p>
        </div>
    ),
    references: (
        <div className="space-y-3">
            <p>
                <strong>DA RESCISÃO</strong>
            </p>
            <p>
                <strong>CLÁUSULA 5ª</strong> - A rescisão do presente instrumento
                não extinguirá os direitos e obrigações que as partes tenham entre
                si e para com terceiros, não havendo estorno do valor já pago,
                caso está já tenha iniciado o projeto.
            </p>
            <p>
                <strong>CLÁUSULA 6ª</strong> - A CONTRATADA agirá segundo as normas
                do Código de Ética da Associação dos Designes Gráficos, e também
                assume obrigação e o compromisso de manter em sigilo todas as
                informações que. lhe forem prestadas pela CONTRATANTE para que
                possa proceder ao desenvolvimento do projeto gráfico, assim também
                em relação ao trabalho em desenvolvimento.
            </p>
            <p>
                <strong>DOS DIREITOS À PROPRIEDADE INDUSTRIAL</strong>
            </p>
            <p>
                <strong>CLÁUSULA 7ª</strong> - Caso a consultoria resulte invenção,
                descobertas, aperfeiçoamentos ou inovações, os direitos de
                propriedade pertencerão à CONTRATANTE autor do trabalho que gerou
                desenvolvimento tecnológico, nos termos da Lei n° 9.279/96
                (Código de Propriedade Industrial) ou legislação aplicável 1.
            </p>
            <p>
                <strong>CLAUSULA 8ª</strong> - A equipe envolvida neste projeto se
                compromete a manter sigilo sobre os dados e informações decorrentes
                da consecução do presente contrato, salvo o CONTRATANTE autorize
                em contrário.
            </p>
            <p>
                O App seguirá toda legislação brasileira, inclusive a lei de
                proteção de dados.
            </p>
            <p>
                <strong>PARÁGRAFO ÚNICO</strong> - Não se considera Recuperação
                Judicial, até mesmo a branca, Falência ou Liquidação/Encerramento
                de Sociedade Empresarial ou Civil como justo motivo para rescisão
                unilateral do contrato sem a implicação das penalizares ajustadas
                neste contrato.
            </p>
            <p>
                <strong>DAS CONDIÇÕES GERAIS</strong>
            </p>
            <p>
                <strong>CLÁUSULA 9ª</strong> - A CONTRATADA não possuirá horário
                fixo de entrada e saída na empresa, uma vez que não existirá
                vínculo empregatício.
            </p>
            <p>
                <strong>CLÁUSULA 10ª</strong> - É livre à CONTRATADA ter seus
                próprios clientes, fora do âmbito deste contrato.
            </p>
            <p>
                <strong>CLÁUSULA 11ª</strong> - A CONTRATADA tem total direito de
                não dar continuidade ao serviço oferecida ao CONTRATANTE caso não
                haja o cumprimento das obrigações referidas na 1a página deste
                contrato.
            </p>
        </div>
    ),
    conclusion: (
        <div className="space-y-3">
            <p>
                <strong>DO FORO</strong>
            </p>
            <p>
                <strong>CLÁUSULA 12ª</strong> - Para dirimir quaisquer
                controvérsias oriundas do contrato, as partes elegem o foro da
                comarca de SÃO PAULO/SP.
            </p>
            <p>
                As partes acima já qualificadas ora contratadas, resolvem na
                melhor forma de direito firmar o presente contrato.
            </p>
            <p>São Paulo/SP 27/02/2024</p>
        </div>
    ),
};

function buildContractContentFromDraft(
    draft: ContractWizardDraft | null,
    docLocale: DocLocale
): Omit<ProposalContentShape, "images"> {
    const copy = CONTRACT_UI_COPY[docLocale];
    const isPt = docLocale === "pt";

    const contractorName = draft?.contractorName?.trim() || copy.contractorLabel;
    const contractorEmail = draft?.contractorEmail?.trim() || copy.notInformed;
    const contractorAddress =
        draft?.contractorAddress?.trim() || copy.addressNotInformed;
    const contractorDocument = draft?.contractorDocument?.trim() || copy.notInformed;
    const contractorDocLabel = getContractDocTypeLabel(
        draft?.contractorDocType,
        docLocale
    );

    const clientName = draft?.clientName?.trim() || copy.clientLabel;
    const clientEmail = draft?.clientEmail?.trim() || copy.notInformed;
    const clientAddress = draft?.clientAddress?.trim() || copy.addressNotInformed;
    const clientDocument = draft?.clientDocument?.trim() || copy.notInformed;
    const clientDocLabel = getContractDocTypeLabel(draft?.clientDocType, docLocale);

    const projectDescription =
        draft?.projectDescription?.trim() ||
        (isPt
            ? "Escopo do projeto a ser desenvolvido conforme briefing e proposta comercial."
            : docLocale === "en"
              ? "Project scope to be developed according to the brief and commercial proposal."
              : "Alcance del proyecto a desarrollar según el briefing y la propuesta comercial.");
    const projectProposalLink = draft?.projectProposalLink?.trim();
    const contractValue = formatProposalBudget(
        draft?.contractValue,
        draft?.currency,
        copy.toDefine
    );
    const paymentTerms =
        draft?.paymentTerms?.trim().replace(/\s*['"]+\s*$/, "") ||
        copy.paymentTermsFallback;
    const projectStartDate = draft?.projectStartDate?.trim() || copy.toDefine;
    const projectDeliveryDate = draft?.projectDeliveryDate?.trim() || copy.toDefine;
    const warrantyDays = draft?.warrantyDays?.trim() || "";
    const forumCity = draft?.forumCity?.trim() || copy.toDefine;
    const signatureCity = draft?.signatureCity?.trim() || forumCity;
    const signatureDate = draft?.signatureDate?.trim() || copy.toDefine;

    return {
        introduction: (
            <div className="space-y-3">
                <p>
                    {copy.introClientPrefix} <strong>{copy.clientLabel}</strong>,{" "}
                    {clientName}, {copy.introClientSuffix} {clientDocLabel} Nº{" "}
                    {clientDocument}, {copy.introClientAddress} {clientAddress},{" "}
                    {copy.introClientEmail} {clientEmail}.
                </p>
                <p>
                    {copy.introContractorPrefix} <strong>{copy.contractorLabel}</strong>,{" "}
                    {contractorName}, {copy.introContractorSuffix} {contractorDocLabel} Nº{" "}
                    {contractorDocument}, {copy.introClientAddress} {contractorAddress},{" "}
                    {copy.introClientEmail} {contractorEmail}, {copy.introEnding}
                </p>
            </div>
        ),
        goals: (
            <div className="space-y-3">
                <p>
                    <strong>{copy.objectTitle}</strong>
                </p>
                <p>
                    <strong>{copy.clause1}</strong>
                </p>
                <p>{projectDescription}</p>
                {projectProposalLink && (
                    <p>
                        {copy.proposalReferenceLabel}{" "}
                        <a
                            href={projectProposalLink}
                            target="_blank"
                            rel="noreferrer"
                            className="underline decoration-1 underline-offset-2"
                        >
                            {projectProposalLink}
                        </a>
                        .
                    </p>
                )}
            </div>
        ),
        timeline: isPt ? (
            contractContent.timeline
        ) : (
            <div className="space-y-3">
                <p>
                    <strong>
                        {docLocale === "en"
                            ? "EXECUTION AND OBLIGATIONS"
                            : "EJECUCIÓN Y OBLIGACIONES"}
                    </strong>
                </p>
                <p>
                    {docLocale === "en"
                        ? "The parties agree to provide all information, access, and materials needed for proper project execution."
                        : "Las partes se comprometen a proporcionar toda la información, acceso y materiales necesarios para la correcta ejecución del proyecto."}
                </p>
                <p>
                    {docLocale === "en"
                        ? "The contractor will execute the project according to the approved scope, keeping confidentiality over all data and documents shared during the engagement."
                        : "La contratista ejecutará el proyecto de acuerdo con el alcance aprobado, manteniendo confidencialidad sobre todos los datos y documentos compartidos durante el servicio."}
                </p>
            </div>
        ),
        budget: (
            <div className="space-y-3">
                <p>
                    <strong>{copy.paymentTitle}</strong>
                </p>
                <p>
                    <strong>{copy.clause4}</strong> <strong>{contractValue}</strong>,{" "}
                    {copy.paymentClauseSuffix}
                </p>
                <p>{paymentTerms}</p>
                <p>
                    <strong>{copy.timelineTitle}</strong>
                </p>
                <p>
                    {copy.timelineTextStart} <strong>{projectStartDate}</strong>{" "}
                    {copy.timelineTextEnd} <strong>{projectDeliveryDate}</strong>.
                </p>
                {warrantyDays && (
                    <p>
                        <strong>{copy.warrantyLabel}</strong> - {copy.warrantyText}{" "}
                        <strong>{warrantyDays}</strong> {copy.warrantyTextSuffix}
                    </p>
                )}
            </div>
        ),
        references: isPt ? (
            <div className="space-y-3">
                <p>
                    <strong>{copy.rescissionTitle}</strong>
                </p>
                <p>
                    <strong>{copy.clause5Prefix}</strong> {copy.noRefundClause}
                </p>
                <p>
                    <strong>CLÁUSULA 6ª</strong> - A CONTRATADA agirá segundo as normas
                    do Código de Ética da Associação dos Designes Gráficos, e também
                    assume obrigação e o compromisso de manter em sigilo todas as
                    informações que. lhe forem prestadas pela CONTRATANTE para que
                    possa proceder ao desenvolvimento do projeto gráfico, assim também
                    em relação ao trabalho em desenvolvimento.
                </p>
                <p>
                    <strong>DOS DIREITOS À PROPRIEDADE INDUSTRIAL</strong>
                </p>
                <p>
                    <strong>CLÁUSULA 7ª</strong> - Caso a consultoria resulte invenção,
                    descobertas, aperfeiçoamentos ou inovações, os direitos de
                    propriedade pertencerão à CONTRATANTE autor do trabalho que gerou
                    desenvolvimento tecnológico, nos termos da Lei n° 9.279/96
                    (Código de Propriedade Industrial) ou legislação aplicável 1.
                </p>
                <p>
                    <strong>CLAUSULA 8ª</strong> - A equipe envolvida neste projeto se
                    compromete a manter sigilo sobre os dados e informações decorrentes
                    da consecução do presente contrato, salvo o CONTRATANTE autorize
                    em contrário.
                </p>
            </div>
        ) : (
            <div className="space-y-3">
                <p>
                    <strong>{copy.rescissionTitle}</strong>
                </p>
                <p>
                    <strong>{copy.clause5Prefix}</strong> {copy.noRefundClause}
                </p>
                <p>
                    {docLocale === "en"
                        ? "Both parties agree to confidentiality over all technical, operational, and strategic information shared under this agreement."
                        : "Ambas partes se comprometen a la confidencialidad sobre toda la información técnica, operativa y estratégica compartida en este contrato."}
                </p>
                <p>
                    {docLocale === "en"
                        ? "All intellectual property rights resulting from the contracted work shall belong to the client after full payment."
                        : "Todos los derechos de propiedad intelectual resultantes del trabajo contratado pertenecerán al cliente tras el pago total."}
                </p>
            </div>
        ),
        conclusion: (
            <div className="space-y-3">
                <p>
                    <strong>{copy.forumTitle}</strong>
                </p>
                <p>
                    <strong>{copy.clause12}</strong> <strong>{forumCity}</strong>.
                </p>
                <p>{copy.closingLine}</p>
                <p>
                    <strong>
                        {signatureCity} {signatureDate}
                    </strong>
                </p>
            </div>
        ),
    };
}

const PRD_LANGUAGE_KEYS = [
    "langPtBr",
    "langEn",
    "langEs",
    "langMulti",
    "langOther",
] as const;
const PRD_PLATFORM_KEYS = [
    "platformWeb",
    "platformMobile",
    "platformWebAndMobile",
    "other",
] as const;
const PRD_WEB_FRAMEWORK_NAMES = [
    "Next.js",
    "Nuxt.js",
    "Remix",
    "Astro",
    "SvelteKit",
] as const;
const PRD_MOBILE_FRAMEWORK_NAMES = [
    "Flutter",
    "React Native",
    "Expo (React Native)",
    "Ionic",
    "Nativo (Swift/Kotlin)",
] as const;
const PRD_WEB_DESIGN_LABEL_KEY: Record<string, string> = {
    tailwind: "webDesignLibTailwind",
    mui: "webDesignLibMui",
    chakra: "webDesignLibChakra",
    shadcn: "webDesignLibShadcn",
};
const PRD_MOBILE_DESIGN_LABEL_KEY: Record<string, string> = {
    material: "mobileDesignLibMaterial",
    cupertino: "mobileDesignLibCupertino",
    paper: "mobileDesignLibPaper",
    nativebase: "mobileDesignLibNativebase",
    tamagui: "mobileDesignLibTamagui",
    ionic: "mobileDesignLibIonic",
};
const PRD_INTEGRATION_LABEL_KEY: Record<string, string> = {
    payments: "integrationPayments",
    ai: "integrationAi",
    external_api: "integrationExternal_api",
    whatsapp: "integrationWhatsapp",
    analytics: "integrationAnalytics",
    crm: "integrationCrm",
    email: "integrationEmail",
    push: "integrationPush",
};
const PRD_BACKEND_NAMES = ["Supabase", "Node.js", "Laravel", "Firebase"] as const;
const PRD_ICON_LABEL_KEYS = ["iconsLucide", "iconsFeather", "iconsHeroicons"] as const;

type PrdWizardDraft = {
    activeId: number;
    projectName: string;
    projectGoals?: string;
    language: number | null;
    languageOther: string;
    platform: number | null;
    platformOther: string;
    webFramework: number | null;
    webFrameworkOther: string;
    webDesignLibrary: string | null;
    webDesignLibraryOther: string;
    mobileFramework: number | null;
    mobileFrameworkOther: string;
    mobileDesignLibrary: string | null;
    mobileDesignLibraryOther: string;
    backendTech: number | null;
    authentication:
        | number
        | null
        | {
              emailPassword: boolean;
              socialLogin: boolean;
          };
    features: Record<string, boolean>;
    otherFeaturesTags: string[];
    integrations: Record<string, boolean>;
    otherIntegrationsTags: string[];
    projectDeadline: string;
    designSystem: number | null;
    theme: number | null;
    icons: number | null;
    customRules: string;
    acceptanceCriteria?: string;
    outOfScope?: string;
    assumptionsAndRisks?: string;
};

type PrdAuthSelection = {
    emailPassword: boolean;
    socialLogin: boolean;
};

const PRD_UI_COPY = {
    pt: {
        documentTitle: "Documento de Requisitos do Produto",
        subtitle: "PRD",
        sectionIntroduction: "Visão Geral e Público-Alvo",
        sectionGoals: "Escopo Funcional e User Stories",
        sectionTimeline: "Jornadas e Requisitos Técnicos",
        sectionBudget: "Dados e Fluxos Principais",
        sectionReferences: "Regras de Negócio e Interface",
        sectionConclusion: "Segurança e Métricas",
        toDefine: "A definir",
        notApplicable: "Não se aplica",
        notInformed: "não informado",
        projectNameFallback: "Projeto",
        projectGoalsFallback:
            "Objetivos detalhados serão refinados na fase de discovery.",
        overviewHeading: "1. Visão Geral",
        audienceHeading: "2. Público-Alvo",
        mainFeaturesHeading: "3. Funcionalidades Principais",
        userStoriesHeading: "4. User Stories",
        journeysHeading: "5. User Journeys (GIVEN / WHEN / THEN)",
        technicalHeading: "6. Requisitos Técnicos",
        entitiesHeading: "7. Entidades do Banco de Dados (alto nível)",
        flowsHeading: "8. Fluxos Principais de Uso",
        rulesHeading: "9. Regras de Negócio",
        screensHeading: "10. Telas e Interface (Design System)",
        securityHeading: "11. Segurança e Conformidade",
        metricsHeading: "12. Métricas de Sucesso",
        acceptanceCriteriaHeading: "13. Critérios de Aceite (MVP)",
        assumptionsRisksHeading: "14. Assunções, Dependências e Riscos",
        implementationGuidelinesHeading: "15. Diretrizes para Implementação por IA",
        outOfScopeHeading:
            "Anexo Opcional — Oportunidades de Evolução (Fora do Escopo do Projeto)",
        projectLanguageLabel: "Idioma do projeto",
        platformLabel: "Plataforma",
        deadlineLabel: "Prazo de entrega",
        webLabel: "Web",
        mobileLabel: "Mobile",
        backendLabel: "Backend",
        authenticationLabel: "Autenticação",
        integrationsLabel: "Integrações",
        designSystemLabel: "Design System",
        themeLabel: "Tema",
        iconsLabel: "Ícones",
        additionalDetailsLabel: "Requisitos adicionais informados no formulário",
        defaultStory:
            "USER-01 Como usuário, quero um fluxo principal claro para utilizar o produto com rapidez e segurança.",
        storyTemplate: "Como usuário, quero {feature} para atingir o objetivo do produto.",
        journeyOnboarding:
            "GIVEN um usuário elegível, WHEN acessa o sistema pela primeira vez, THEN conclui onboarding e inicia o uso sem bloqueios.",
        journeyAuthentication:
            "GIVEN um usuário cadastrado, WHEN informa credenciais válidas, THEN acessa as funcionalidades permitidas para seu perfil.",
        journeyPayments:
            "GIVEN itens elegíveis para cobrança, WHEN o usuário confirma a ação, THEN o sistema registra pagamento e atualiza status.",
        journeyUploads:
            "GIVEN arquivos válidos, WHEN o usuário realiza upload, THEN o sistema armazena e disponibiliza os anexos no contexto correto.",
        journeyRealtime:
            "GIVEN múltiplos usuários ativos, WHEN ocorre atualização de dados, THEN o sistema sincroniza a informação em tempo real.",
        journeyOffline:
            "GIVEN ausência de internet, WHEN o usuário interage com o app, THEN os dados são enfileirados e sincronizados ao reconectar.",
        journeyIntegrations:
            "GIVEN integrações configuradas, WHEN um evento externo é disparado, THEN o sistema recebe/processa o payload conforme regras.",
        flowOnboarding:
            "Cadastro/login inicial, configuração de perfil e validação de acesso.",
        flowCore:
            "Execução do fluxo principal de negócio com registro de ações e persistência de dados.",
        flowOperations:
            "Operação diária com consulta, edição e acompanhamento dos itens críticos.",
        flowMonitoring:
            "Acompanhamento por indicadores, alertas e ajustes contínuos de processo.",
        ruleAccess:
            "Controle de acesso por papéis/perfis para áreas e ações críticas.",
        ruleAudit:
            "Operações sensíveis devem gerar trilha de auditoria com data, usuário e contexto.",
        rulePayments:
            "Transações financeiras exigem validação de status e tratamento de falhas/estorno.",
        ruleUploads:
            "Uploads devem validar formato, tamanho e permissões antes de persistir.",
        ruleIntegrations:
            "Integrações externas devem prever timeout, retry e logs técnicos para suporte.",
        screenLogin: "Tela de login e recuperação de acesso (`/login`).",
        screenDashboard:
            "Dashboard com visão de KPIs, tarefas pendentes e status operacional (`/dashboard`).",
        screenCore:
            "Telas do fluxo principal de negócio com formulários, listagens e detalhes.",
        screenSettings: "Configurações de conta, permissões e preferências.",
        security1: "Autenticação e autorização por perfil de acesso.",
        security2: "Criptografia de dados sensíveis e armazenamento seguro de credenciais.",
        security3:
            "Validação de entrada para mitigar injeção, abuso e inconsistência de dados.",
        security4:
            "Arquivos de ambiente obrigatórios: `.env` e `.env.example` com variáveis documentadas.",
        metricAdoption:
            "Taxa de ativação e conclusão do fluxo principal nos primeiros dias de uso.",
        metricDelivery:
            "Cumprimento do prazo definido ({deadline}) com redução de retrabalho.",
        metricPayments:
            "Taxa de conversão e aprovação de pagamentos dentro do fluxo de compra.",
        metricReliability:
            "Estabilidade operacional (latência/erros) e satisfação do usuário final.",
        dbRelationshipsHeading: "7.1 Relacionamentos, PK/FK e Integridade",
        dbIndexesHeading: "7.2 Índices e Otimização de Consulta",
        rlsHeading: "11.1 RLS e Permissões por Papel",
        operationsHeading: "11.2 Migração, Backup e Observabilidade",
        nfrHeading: "12.1 Requisitos Não Funcionais (Metas)",
        dbPkFkRule:
            "Todas as tabelas devem ter PK UUID e FKs explícitas com ON UPDATE CASCADE.",
        dbDeletePolicyRule:
            "ON DELETE deve seguir regra de negócio por entidade (RESTRICT para financeiro/auditoria; CASCADE ou SET NULL para anexos).",
        dbAuditIntegrityRule:
            "Registros de auditoria não devem ser apagados por operações comuns de aplicação.",
        idxUsersRule:
            "`usuarios(email)` UNIQUE para autenticação e deduplicação.",
        idxAuditRule:
            "`logs_auditoria(usuario_id, created_at DESC)` para rastreabilidade.",
        idxPaymentsRule:
            "`transacoes_pagamento(status, created_at DESC)` e `external_id` UNIQUE para idempotência.",
        idxFilesRule:
            "`arquivos(usuario_id, created_at DESC)` para listagens e paginação.",
        idxIntegrationsRule:
            "`integracoes_externas(provider, external_ref)` com índice composto para conciliação.",
        relationUserRoles:
            "`usuarios.id` -> `perfis_permissoes.usuario_id` (1:N), ON DELETE RESTRICT.",
        relationUserAudit:
            "`usuarios.id` -> `logs_auditoria.usuario_id` (1:N), ON DELETE RESTRICT.",
        relationUserPayments:
            "`usuarios.id` -> `transacoes_pagamento.usuario_id` (1:N), ON DELETE RESTRICT.",
        relationUserFiles:
            "`usuarios.id` -> `arquivos.usuario_id` (1:N), ON DELETE SET NULL.",
        relationUserIntegrations:
            "`usuarios.id` -> `integracoes_externas.usuario_id` (1:N), ON DELETE RESTRICT.",
        rlsEnableRule:
            "Habilitar RLS em tabelas sensíveis (`usuarios`, pagamentos, auditoria, integrações).",
        rlsLeastPrivilegeRule:
            "Aplicar menor privilégio por papel (admin, operação, leitura), com políticas separadas de SELECT/INSERT/UPDATE/DELETE.",
        rlsOwnershipRule:
            "Usuário final acessa apenas dados próprios; dados globais somente para papéis administrativos.",
        opsMigrationsRule:
            "Migrations versionadas, revisadas em PR e com plano de rollback para mudanças críticas.",
        opsBackupRule:
            "Backup diário com retenção; em produção, preferir PITR e testar restauração periodicamente.",
        opsObservabilityRule:
            "Logs estruturados, métricas (latência/erro/throughput) e tracing distribuído nos fluxos críticos.",
        opsAlertsRule:
            "Alertas para erro 5xx, degradação de latência e falhas de integração externa.",
        nfrAvailability:
            "Disponibilidade mensal mínima: 99,5%.",
        nfrLatency:
            "Latência alvo (P95): até 400ms em leitura e 800ms em escrita nas rotas críticas.",
        nfrErrorRate:
            "Taxa de erro 5xx nas rotas críticas: abaixo de 1%.",
        nfrCapacityBase:
            "Capacidade inicial do MVP: ao menos 150 usuários concorrentes.",
        nfrCapacityRealtime:
            "Capacidade inicial do MVP: ao menos 300 usuários concorrentes com sincronização em tempo real.",
        acceptanceFallbackCore:
            "MUST: o fluxo principal deve ser concluído sem bloqueio crítico e persistir dados corretamente.",
        acceptanceFallbackAuth:
            "MUST: autenticação deve permitir login e proteger rotas privadas.",
        acceptanceFallbackPayments:
            "MUST: transações devem registrar status final (sucesso/falha) com idempotência.",
        acceptanceFallbackIntegrations:
            "SHOULD: integrações externas devem responder dentro do timeout definido e com retry controlado.",
        outOfScopeFallback:
            "Exemplos de oportunidades para próximas fases foram adicionados como referência.",
        evolutionAnnexLead:
            "As sugestões abaixo não fazem parte do escopo obrigatório do projeto e servem para planejamento de evolução.",
        evolutionAnnexOptional:
            "Este anexo é opcional: você pode remover esta seção do PRD ou mover itens para o backlog de futuras fases.",
        evolutionExamplesIntro:
            "Como não houve oportunidades específicas detectadas neste briefing, exibimos exemplos de referência:",
        evolutionUseLabel: "Como o usuário usaria",
        evolutionValueLabel: "Valor de negócio",
        evolutionPhaseLabel: "Fase sugerida",
        evolutionActionLabel: "Ação recomendada",
        evolutionPhase2: "Fase 2 (após estabilização da primeira versão)",
        evolutionPhase3: "Fase 3 (escala e otimização)",
        evolutionActionBacklogFeature:
            "Adicionar no backlog como novo épico funcional e estimar esforço técnico.",
        evolutionActionBacklogIntegration:
            "Adicionar no backlog de integrações com análise de fornecedor, custos e SLA.",
        evolutionCustomUse:
            "Atender um cenário complementar identificado no briefing para ampliar a jornada atual.",
        evolutionCustomValue:
            "Aumentar cobertura funcional e reduzir solicitações ad-hoc em etapas futuras.",
        evolutionCustomAction:
            "Registrar como oportunidade validável em discovery e priorizar por impacto x esforço.",
        futurePhaseTitleRealtime: "Sincronização em tempo real",
        futurePhaseUseRealtime:
            "Visualizar atualizações operacionais instantâneas entre equipes e painéis.",
        futurePhaseValueRealtime:
            "Reduz atraso de informação e melhora tomada de decisão em operações críticas.",
        futurePhaseTitleOffline: "Modo offline com sincronização",
        futurePhaseUseOffline:
            "Continuar usando fluxos principais sem internet e sincronizar ao reconectar.",
        futurePhaseValueOffline:
            "Evita interrupções operacionais em ambientes com conectividade instável.",
        futurePhaseTitleAnalytics: "Camada analítica de produto",
        futurePhaseUseAnalytics:
            "Acompanhar eventos, funis e KPIs para entender uso real da plataforma.",
        futurePhaseValueAnalytics:
            "Aumenta previsibilidade de crescimento e priorização baseada em dados.",
        futurePhaseTitleCrm: "Integração com CRM",
        futurePhaseUseCrm:
            "Gerenciar relacionamento com clientes e ciclo de vendas no fluxo operacional.",
        futurePhaseValueCrm:
            "Melhora retenção, segmentação e eficiência comercial.",
        futurePhaseTitleNotifications: "Orquestração de notificações",
        futurePhaseUseNotifications:
            "Receber alertas e comunicações por e-mail, WhatsApp ou push por evento de negócio.",
        futurePhaseValueNotifications:
            "Aumenta engajamento e reduz falhas de acompanhamento de processos.",
        futurePhaseTitlePayments: "Automações financeiras avançadas",
        futurePhaseUsePayments:
            "Acompanhar conciliação, antifraude e trilhas de auditoria em transações.",
        futurePhaseValuePayments:
            "Reduz risco financeiro e melhora governança operacional.",
        futurePhaseTitleAi: "Recursos assistidos por IA",
        futurePhaseUseAi:
            "Acelerar atividades operacionais com recomendações e automações assistidas.",
        futurePhaseValueAi:
            "Gera ganho de produtividade e escala com menor esforço manual.",
        assumptionsRisksFallback:
            "Dependemos de APIs externas e disponibilidade do time no prazo previsto; atrasos de homologação podem impactar cronograma.",
        aiGuidelineTraceability:
            "MUST: cada requisito funcional deve ter rastreabilidade para user story, tarefa técnica e teste.",
        aiGuidelineTests:
            "MUST: critérios de aceite devem ser cobertos por testes automatizados e checklist de validação manual.",
        aiGuidelineContracts:
            "SHOULD: definir contratos de API/esquema antes da implementação para reduzir retrabalho.",
        aiGuidelineDelivery:
            "SHOULD: implementar em incrementos pequenos com PRs revisáveis e notas de decisão.",
    },
    en: {
        documentTitle: "Product Requirements Document",
        subtitle: "PRD",
        sectionIntroduction: "Overview and Target Audience",
        sectionGoals: "Functional Scope and User Stories",
        sectionTimeline: "Journeys and Technical Requirements",
        sectionBudget: "Data Model and Main Flows",
        sectionReferences: "Business Rules and Interface",
        sectionConclusion: "Security and Success Metrics",
        toDefine: "To be defined",
        notApplicable: "Not applicable",
        notInformed: "not informed",
        projectNameFallback: "Project",
        projectGoalsFallback:
            "Detailed goals will be refined during the discovery phase.",
        overviewHeading: "1. Overview",
        audienceHeading: "2. Target Audience",
        mainFeaturesHeading: "3. Main Features",
        userStoriesHeading: "4. User Stories",
        journeysHeading: "5. User Journeys (GIVEN / WHEN / THEN)",
        technicalHeading: "6. Technical Requirements",
        entitiesHeading: "7. Database Entities (high-level)",
        flowsHeading: "8. Main Usage Flows",
        rulesHeading: "9. Business Rules",
        screensHeading: "10. Screens and Interface (Design System)",
        securityHeading: "11. Security and Compliance",
        metricsHeading: "12. Success Metrics",
        acceptanceCriteriaHeading: "13. Acceptance Criteria (MVP)",
        assumptionsRisksHeading: "14. Assumptions, Dependencies and Risks",
        implementationGuidelinesHeading: "15. AI Implementation Guidelines",
        outOfScopeHeading:
            "Optional Annex — Evolution Opportunities (Out of Project Scope)",
        projectLanguageLabel: "Project language",
        platformLabel: "Platform",
        deadlineLabel: "Delivery deadline",
        webLabel: "Web",
        mobileLabel: "Mobile",
        backendLabel: "Backend",
        authenticationLabel: "Authentication",
        integrationsLabel: "Integrations",
        designSystemLabel: "Design System",
        themeLabel: "Theme",
        iconsLabel: "Icons",
        additionalDetailsLabel: "Additional requirements provided in the form",
        defaultStory:
            "USER-01 As a user, I want a clear main flow so I can use the product quickly and safely.",
        storyTemplate:
            "As a user, I want {feature} so I can achieve the product goal.",
        journeyOnboarding:
            "GIVEN an eligible user, WHEN they access the system for the first time, THEN they complete onboarding and start using it without blockers.",
        journeyAuthentication:
            "GIVEN a registered user, WHEN valid credentials are submitted, THEN access is granted according to role permissions.",
        journeyPayments:
            "GIVEN billable items, WHEN the user confirms the action, THEN the system records payment and updates status.",
        journeyUploads:
            "GIVEN valid files, WHEN the user uploads them, THEN the system stores and links the files to the right context.",
        journeyRealtime:
            "GIVEN multiple active users, WHEN data changes, THEN the system synchronizes updates in real time.",
        journeyOffline:
            "GIVEN no internet connection, WHEN the user interacts with the app, THEN actions are queued and synced once online again.",
        journeyIntegrations:
            "GIVEN configured integrations, WHEN an external event occurs, THEN the system receives/processes the payload according to rules.",
        flowOnboarding:
            "Initial sign-up/sign-in, profile setup, and access validation.",
        flowCore:
            "Execution of the core business flow with action tracking and data persistence.",
        flowOperations:
            "Daily operation with search, update, and monitoring of critical items.",
        flowMonitoring:
            "Performance monitoring through KPIs, alerts, and continuous process adjustments.",
        ruleAccess:
            "Role-based access control for critical areas and actions.",
        ruleAudit:
            "Sensitive operations must generate audit logs with date, user, and context.",
        rulePayments:
            "Financial transactions require status validation and failure/refund handling.",
        ruleUploads:
            "Uploads must validate format, size, and permissions before persisting.",
        ruleIntegrations:
            "External integrations must include timeout, retry, and technical logging for support.",
        screenLogin: "Login and password recovery (`/login`).",
        screenDashboard:
            "Dashboard with KPIs, pending tasks, and operational status (`/dashboard`).",
        screenCore:
            "Core business flow screens with forms, lists, and detail views.",
        screenSettings: "Account settings, permissions, and preferences.",
        security1: "Authentication and authorization based on user role.",
        security2: "Sensitive data encryption and secure credential handling.",
        security3:
            "Input validation to mitigate injection, abuse, and data inconsistencies.",
        security4:
            "Required environment files: `.env` and `.env.example` with documented variables.",
        metricAdoption:
            "Activation rate and completion of the core flow in the first days of usage.",
        metricDelivery:
            "Deadline compliance ({deadline}) with reduced rework.",
        metricPayments:
            "Payment conversion and approval rate within the purchase flow.",
        metricReliability:
            "Operational stability (latency/errors) and end-user satisfaction.",
        dbRelationshipsHeading: "7.1 Relationships, PK/FK and Integrity",
        dbIndexesHeading: "7.2 Indexes and Query Optimization",
        rlsHeading: "11.1 RLS and Role-Based Permissions",
        operationsHeading: "11.2 Migration, Backup and Observability",
        nfrHeading: "12.1 Non-Functional Requirements (Targets)",
        dbPkFkRule:
            "All tables must use UUID primary keys and explicit foreign keys with ON UPDATE CASCADE.",
        dbDeletePolicyRule:
            "ON DELETE must follow business rules per entity (RESTRICT for financial/audit data; CASCADE or SET NULL for attachments).",
        dbAuditIntegrityRule:
            "Audit records must not be deleted by standard application operations.",
        idxUsersRule:
            "`usuarios(email)` UNIQUE for authentication and deduplication.",
        idxAuditRule:
            "`logs_auditoria(usuario_id, created_at DESC)` for traceability.",
        idxPaymentsRule:
            "`transacoes_pagamento(status, created_at DESC)` plus `external_id` UNIQUE for idempotency.",
        idxFilesRule:
            "`arquivos(usuario_id, created_at DESC)` for listings and pagination.",
        idxIntegrationsRule:
            "`integracoes_externas(provider, external_ref)` composite index for reconciliation.",
        relationUserRoles:
            "`usuarios.id` -> `perfis_permissoes.usuario_id` (1:N), ON DELETE RESTRICT.",
        relationUserAudit:
            "`usuarios.id` -> `logs_auditoria.usuario_id` (1:N), ON DELETE RESTRICT.",
        relationUserPayments:
            "`usuarios.id` -> `transacoes_pagamento.usuario_id` (1:N), ON DELETE RESTRICT.",
        relationUserFiles:
            "`usuarios.id` -> `arquivos.usuario_id` (1:N), ON DELETE SET NULL.",
        relationUserIntegrations:
            "`usuarios.id` -> `integracoes_externas.usuario_id` (1:N), ON DELETE RESTRICT.",
        rlsEnableRule:
            "Enable RLS on sensitive tables (`usuarios`, payments, audit logs, integrations).",
        rlsLeastPrivilegeRule:
            "Apply least-privilege policies by role (admin, operator, read-only) with separate SELECT/INSERT/UPDATE/DELETE policies.",
        rlsOwnershipRule:
            "End users can only access their own data; global data is restricted to administrative roles.",
        opsMigrationsRule:
            "Use versioned migrations, reviewed in PRs, with rollback plans for critical changes.",
        opsBackupRule:
            "Daily backups with retention; in production, prefer PITR and periodic restore drills.",
        opsObservabilityRule:
            "Structured logs, metrics (latency/error/throughput), and distributed tracing on critical flows.",
        opsAlertsRule:
            "Alerts for 5xx spikes, latency degradation, and external integration failures.",
        nfrAvailability:
            "Minimum monthly availability: 99.5%.",
        nfrLatency:
            "Target latency (P95): up to 400ms for reads and 800ms for writes on critical routes.",
        nfrErrorRate:
            "5xx error rate on critical routes: below 1%.",
        nfrCapacityBase:
            "Initial MVP capacity: at least 150 concurrent users.",
        nfrCapacityRealtime:
            "Initial MVP capacity: at least 300 concurrent users with real-time sync.",
        acceptanceFallbackCore:
            "MUST: the main flow must complete without critical blockers and persist data correctly.",
        acceptanceFallbackAuth:
            "MUST: authentication must allow login and protect private routes.",
        acceptanceFallbackPayments:
            "MUST: transactions must record a final status (success/failure) with idempotency.",
        acceptanceFallbackIntegrations:
            "SHOULD: external integrations should respond within the defined timeout with controlled retries.",
        outOfScopeFallback:
            "Reference examples for future phases were added.",
        evolutionAnnexLead:
            "The suggestions below are not part of the mandatory project scope and are intended for evolution planning.",
        evolutionAnnexOptional:
            "This annex is optional: you can remove this section from the PRD or move items to a future-phase backlog.",
        evolutionExamplesIntro:
            "Since no specific opportunities were detected in this briefing, we are showing reference examples:",
        evolutionUseLabel: "How users would use it",
        evolutionValueLabel: "Business value",
        evolutionPhaseLabel: "Suggested phase",
        evolutionActionLabel: "Recommended action",
        evolutionPhase2: "Phase 2 (after first-version stabilization)",
        evolutionPhase3: "Phase 3 (scale and optimization)",
        evolutionActionBacklogFeature:
            "Add to backlog as a functional epic and estimate technical effort.",
        evolutionActionBacklogIntegration:
            "Add to integration backlog with vendor, cost, and SLA analysis.",
        evolutionCustomUse:
            "Address a complementary scenario identified in the briefing to expand the current journey.",
        evolutionCustomValue:
            "Increase functional coverage and reduce ad-hoc requests in future phases.",
        evolutionCustomAction:
            "Register as a discovery opportunity and prioritize by impact vs effort.",
        futurePhaseTitleRealtime: "Real-time synchronization",
        futurePhaseUseRealtime:
            "View operational updates instantly across teams and dashboards.",
        futurePhaseValueRealtime:
            "Reduces information lag and improves decision-making in critical operations.",
        futurePhaseTitleOffline: "Offline mode with sync",
        futurePhaseUseOffline:
            "Keep using core flows without internet and sync when back online.",
        futurePhaseValueOffline:
            "Prevents operational interruptions in low-connectivity environments.",
        futurePhaseTitleAnalytics: "Product analytics layer",
        futurePhaseUseAnalytics:
            "Track events, funnels, and KPIs to understand real platform usage.",
        futurePhaseValueAnalytics:
            "Improves growth predictability and data-driven prioritization.",
        futurePhaseTitleCrm: "CRM integration",
        futurePhaseUseCrm:
            "Manage customer lifecycle and sales workflows within operations.",
        futurePhaseValueCrm:
            "Improves retention, segmentation, and commercial efficiency.",
        futurePhaseTitleNotifications: "Notification orchestration",
        futurePhaseUseNotifications:
            "Receive event-based alerts and communications via email, WhatsApp, or push.",
        futurePhaseValueNotifications:
            "Increases engagement and reduces process follow-up failures.",
        futurePhaseTitlePayments: "Advanced financial automations",
        futurePhaseUsePayments:
            "Track reconciliation, anti-fraud controls, and transaction audit trails.",
        futurePhaseValuePayments:
            "Reduces financial risk and improves operational governance.",
        futurePhaseTitleAi: "AI-assisted capabilities",
        futurePhaseUseAi:
            "Accelerate operations with assisted recommendations and automations.",
        futurePhaseValueAi:
            "Delivers productivity gains and scaling with less manual effort.",
        assumptionsRisksFallback:
            "We depend on external APIs and team availability within the planned timeline; certification/approval delays may impact delivery.",
        aiGuidelineTraceability:
            "MUST: every functional requirement must be traceable to a user story, technical task, and test.",
        aiGuidelineTests:
            "MUST: acceptance criteria must be covered by automated tests and a manual validation checklist.",
        aiGuidelineContracts:
            "SHOULD: define API/schema contracts before implementation to reduce rework.",
        aiGuidelineDelivery:
            "SHOULD: implement in small increments with reviewable PRs and decision notes.",
    },
    es: {
        documentTitle: "Documento de Requisitos del Producto",
        subtitle: "PRD",
        sectionIntroduction: "Visión General y Público Objetivo",
        sectionGoals: "Alcance Funcional e Historias de Usuario",
        sectionTimeline: "Jornadas y Requisitos Técnicos",
        sectionBudget: "Modelo de Datos y Flujos Principales",
        sectionReferences: "Reglas de Negocio e Interfaz",
        sectionConclusion: "Seguridad y Métricas de Éxito",
        toDefine: "Por definir",
        notApplicable: "No aplica",
        notInformed: "no informado",
        projectNameFallback: "Proyecto",
        projectGoalsFallback:
            "Los objetivos detallados se ajustarán durante la fase de discovery.",
        overviewHeading: "1. Visión General",
        audienceHeading: "2. Público Objetivo",
        mainFeaturesHeading: "3. Funcionalidades Principales",
        userStoriesHeading: "4. Historias de Usuario",
        journeysHeading: "5. User Journeys (GIVEN / WHEN / THEN)",
        technicalHeading: "6. Requisitos Técnicos",
        entitiesHeading: "7. Entidades de Base de Datos (alto nivel)",
        flowsHeading: "8. Flujos Principales de Uso",
        rulesHeading: "9. Reglas de Negocio",
        screensHeading: "10. Pantallas e Interfaz (Design System)",
        securityHeading: "11. Seguridad y Cumplimiento",
        metricsHeading: "12. Métricas de Éxito",
        acceptanceCriteriaHeading: "13. Criterios de Aceptación (MVP)",
        assumptionsRisksHeading: "14. Supuestos, Dependencias y Riesgos",
        implementationGuidelinesHeading: "15. Directrices para Implementación con IA",
        outOfScopeHeading:
            "Anexo Opcional — Oportunidades de Evolución (Fuera del Alcance del Proyecto)",
        projectLanguageLabel: "Idioma del proyecto",
        platformLabel: "Plataforma",
        deadlineLabel: "Plazo de entrega",
        webLabel: "Web",
        mobileLabel: "Mobile",
        backendLabel: "Backend",
        authenticationLabel: "Autenticación",
        integrationsLabel: "Integraciones",
        designSystemLabel: "Design System",
        themeLabel: "Tema",
        iconsLabel: "Íconos",
        additionalDetailsLabel: "Requisitos adicionales informados en el formulario",
        defaultStory:
            "USER-01 Como usuario, quiero un flujo principal claro para usar el producto de forma rápida y segura.",
        storyTemplate:
            "Como usuario, quiero {feature} para alcanzar el objetivo del producto.",
        journeyOnboarding:
            "GIVEN un usuario elegible, WHEN accede al sistema por primera vez, THEN completa onboarding e inicia uso sin bloqueos.",
        journeyAuthentication:
            "GIVEN un usuario registrado, WHEN envía credenciales válidas, THEN accede según los permisos de su rol.",
        journeyPayments:
            "GIVEN elementos cobrables, WHEN el usuario confirma la acción, THEN el sistema registra el pago y actualiza el estado.",
        journeyUploads:
            "GIVEN archivos válidos, WHEN el usuario realiza la carga, THEN el sistema guarda y vincula los archivos al contexto correcto.",
        journeyRealtime:
            "GIVEN múltiples usuarios activos, WHEN cambian los datos, THEN el sistema sincroniza la información en tiempo real.",
        journeyOffline:
            "GIVEN falta de internet, WHEN el usuario interactúa con la app, THEN las acciones se encolan y sincronizan al reconectar.",
        journeyIntegrations:
            "GIVEN integraciones configuradas, WHEN ocurre un evento externo, THEN el sistema recibe/procesa el payload según reglas.",
        flowOnboarding:
            "Registro/login inicial, configuración de perfil y validación de acceso.",
        flowCore:
            "Ejecución del flujo central del negocio con registro de acciones y persistencia de datos.",
        flowOperations:
            "Operación diaria con consulta, edición y seguimiento de elementos críticos.",
        flowMonitoring:
            "Seguimiento por KPIs, alertas y ajustes continuos del proceso.",
        ruleAccess:
            "Control de acceso por roles/perfiles para áreas y acciones críticas.",
        ruleAudit:
            "Operaciones sensibles deben generar trazabilidad con fecha, usuario y contexto.",
        rulePayments:
            "Transacciones financieras requieren validación de estado y manejo de fallos/reembolsos.",
        ruleUploads:
            "Las cargas deben validar formato, tamaño y permisos antes de persistir.",
        ruleIntegrations:
            "Integraciones externas deben contemplar timeout, retry y logs técnicos de soporte.",
        screenLogin: "Pantalla de login y recuperación de acceso (`/login`).",
        screenDashboard:
            "Dashboard con KPIs, tareas pendientes y estado operativo (`/dashboard`).",
        screenCore:
            "Pantallas del flujo principal con formularios, listados y vistas de detalle.",
        screenSettings: "Configuraciones de cuenta, permisos y preferencias.",
        security1: "Autenticación y autorización por perfil de acceso.",
        security2: "Cifrado de datos sensibles y gestión segura de credenciales.",
        security3:
            "Validación de entrada para mitigar inyección, abuso e inconsistencias de datos.",
        security4:
            "Archivos de entorno requeridos: `.env` y `.env.example` con variables documentadas.",
        metricAdoption:
            "Tasa de activación y finalización del flujo principal en los primeros días.",
        metricDelivery:
            "Cumplimiento del plazo definido ({deadline}) con menor retrabajo.",
        metricPayments:
            "Tasa de conversión y aprobación de pagos dentro del flujo de compra.",
        metricReliability:
            "Estabilidad operativa (latencia/errores) y satisfacción del usuario final.",
        dbRelationshipsHeading: "7.1 Relaciones, PK/FK e Integridad",
        dbIndexesHeading: "7.2 Índices y Optimización de Consultas",
        rlsHeading: "11.1 RLS y Permisos por Rol",
        operationsHeading: "11.2 Migraciones, Backup y Observabilidad",
        nfrHeading: "12.1 Requisitos No Funcionales (Objetivos)",
        dbPkFkRule:
            "Todas las tablas deben usar PK UUID y FKs explícitas con ON UPDATE CASCADE.",
        dbDeletePolicyRule:
            "ON DELETE debe seguir reglas de negocio por entidad (RESTRICT para datos financieros/auditoría; CASCADE o SET NULL para adjuntos).",
        dbAuditIntegrityRule:
            "Los registros de auditoría no deben eliminarse por operaciones comunes de aplicación.",
        idxUsersRule:
            "`usuarios(email)` UNIQUE para autenticación y deduplicación.",
        idxAuditRule:
            "`logs_auditoria(usuario_id, created_at DESC)` para trazabilidad.",
        idxPaymentsRule:
            "`transacoes_pagamento(status, created_at DESC)` y `external_id` UNIQUE para idempotencia.",
        idxFilesRule:
            "`arquivos(usuario_id, created_at DESC)` para listados y paginación.",
        idxIntegrationsRule:
            "`integracoes_externas(provider, external_ref)` con índice compuesto para conciliación.",
        relationUserRoles:
            "`usuarios.id` -> `perfis_permissoes.usuario_id` (1:N), ON DELETE RESTRICT.",
        relationUserAudit:
            "`usuarios.id` -> `logs_auditoria.usuario_id` (1:N), ON DELETE RESTRICT.",
        relationUserPayments:
            "`usuarios.id` -> `transacoes_pagamento.usuario_id` (1:N), ON DELETE RESTRICT.",
        relationUserFiles:
            "`usuarios.id` -> `arquivos.usuario_id` (1:N), ON DELETE SET NULL.",
        relationUserIntegrations:
            "`usuarios.id` -> `integracoes_externas.usuario_id` (1:N), ON DELETE RESTRICT.",
        rlsEnableRule:
            "Habilitar RLS en tablas sensibles (`usuarios`, pagos, auditoría, integraciones).",
        rlsLeastPrivilegeRule:
            "Aplicar mínimo privilegio por rol (admin, operación, solo lectura), con políticas separadas de SELECT/INSERT/UPDATE/DELETE.",
        rlsOwnershipRule:
            "El usuario final accede solo a sus propios datos; datos globales solo para roles administrativos.",
        opsMigrationsRule:
            "Usar migraciones versionadas, revisadas en PR, con plan de rollback para cambios críticos.",
        opsBackupRule:
            "Backup diario con retención; en producción, preferir PITR y pruebas periódicas de restauración.",
        opsObservabilityRule:
            "Logs estructurados, métricas (latencia/error/throughput) y tracing distribuido en flujos críticos.",
        opsAlertsRule:
            "Alertas para picos de error 5xx, degradación de latencia y fallas de integraciones externas.",
        nfrAvailability:
            "Disponibilidad mínima mensual: 99,5%.",
        nfrLatency:
            "Latencia objetivo (P95): hasta 400ms en lectura y 800ms en escritura en rutas críticas.",
        nfrErrorRate:
            "Tasa de error 5xx en rutas críticas: por debajo de 1%.",
        nfrCapacityBase:
            "Capacidad inicial del MVP: al menos 150 usuarios concurrentes.",
        nfrCapacityRealtime:
            "Capacidad inicial del MVP: al menos 300 usuarios concurrentes con sincronización en tiempo real.",
        acceptanceFallbackCore:
            "MUST: el flujo principal debe completarse sin bloqueos críticos y persistir los datos correctamente.",
        acceptanceFallbackAuth:
            "MUST: la autenticación debe permitir login y proteger rutas privadas.",
        acceptanceFallbackPayments:
            "MUST: las transacciones deben registrar estado final (éxito/fallo) con idempotencia.",
        acceptanceFallbackIntegrations:
            "SHOULD: las integraciones externas deben responder dentro del timeout definido con reintentos controlados.",
        outOfScopeFallback:
            "Se agregaron ejemplos de referencia para próximas fases.",
        evolutionAnnexLead:
            "Las sugerencias abajo no forman parte del alcance obligatorio del proyecto y sirven para planificar evolución.",
        evolutionAnnexOptional:
            "Este anexo es opcional: puedes remover esta sección del PRD o mover los puntos al backlog de próximas fases.",
        evolutionExamplesIntro:
            "Como no se detectaron oportunidades específicas en este briefing, mostramos ejemplos de referencia:",
        evolutionUseLabel: "Cómo lo usaría el usuario",
        evolutionValueLabel: "Valor de negocio",
        evolutionPhaseLabel: "Fase sugerida",
        evolutionActionLabel: "Acción recomendada",
        evolutionPhase2: "Fase 2 (tras estabilizar la primera versión)",
        evolutionPhase3: "Fase 3 (escala y optimización)",
        evolutionActionBacklogFeature:
            "Agregar al backlog como épica funcional y estimar esfuerzo técnico.",
        evolutionActionBacklogIntegration:
            "Agregar al backlog de integraciones con análisis de proveedor, costo y SLA.",
        evolutionCustomUse:
            "Atender un escenario complementario identificado en el briefing para ampliar la jornada actual.",
        evolutionCustomValue:
            "Aumentar cobertura funcional y reducir solicitudes ad-hoc en fases futuras.",
        evolutionCustomAction:
            "Registrar como oportunidad validable en discovery y priorizar por impacto vs esfuerzo.",
        futurePhaseTitleRealtime: "Sincronización en tiempo real",
        futurePhaseUseRealtime:
            "Ver actualizaciones operativas instantáneas entre equipos y dashboards.",
        futurePhaseValueRealtime:
            "Reduce retraso de información y mejora decisiones en operaciones críticas.",
        futurePhaseTitleOffline: "Modo offline con sincronización",
        futurePhaseUseOffline:
            "Continuar flujos principales sin internet y sincronizar al reconectar.",
        futurePhaseValueOffline:
            "Evita interrupciones operativas en contextos de conectividad inestable.",
        futurePhaseTitleAnalytics: "Capa analítica de producto",
        futurePhaseUseAnalytics:
            "Monitorear eventos, embudos y KPIs para entender uso real de la plataforma.",
        futurePhaseValueAnalytics:
            "Mejora previsibilidad de crecimiento y priorización basada en datos.",
        futurePhaseTitleCrm: "Integración con CRM",
        futurePhaseUseCrm:
            "Gestionar ciclo de vida de clientes y flujo comercial dentro de la operación.",
        futurePhaseValueCrm:
            "Mejora retención, segmentación y eficiencia comercial.",
        futurePhaseTitleNotifications: "Orquestación de notificaciones",
        futurePhaseUseNotifications:
            "Recibir alertas y comunicaciones por email, WhatsApp o push por eventos de negocio.",
        futurePhaseValueNotifications:
            "Aumenta engagement y reduce fallos de seguimiento de procesos.",
        futurePhaseTitlePayments: "Automatizaciones financieras avanzadas",
        futurePhaseUsePayments:
            "Monitorear conciliación, antifraude y trazabilidad de transacciones.",
        futurePhaseValuePayments:
            "Reduce riesgo financiero y mejora gobernanza operativa.",
        futurePhaseTitleAi: "Capacidades asistidas por IA",
        futurePhaseUseAi:
            "Acelerar tareas operativas con recomendaciones y automatizaciones asistidas.",
        futurePhaseValueAi:
            "Genera productividad y escala con menor esfuerzo manual.",
        assumptionsRisksFallback:
            "Dependemos de APIs externas y disponibilidad del equipo en el plazo previsto; retrasos de homologación pueden impactar la entrega.",
        aiGuidelineTraceability:
            "MUST: cada requisito funcional debe tener trazabilidad hacia historia de usuario, tarea técnica y prueba.",
        aiGuidelineTests:
            "MUST: los criterios de aceptación deben estar cubiertos por pruebas automatizadas y checklist manual de validación.",
        aiGuidelineContracts:
            "SHOULD: definir contratos de API/esquema antes de implementar para reducir retrabajo.",
        aiGuidelineDelivery:
            "SHOULD: implementar en incrementos pequeños con PRs revisables y notas de decisión.",
    },
} as const;

function normalizePrdAuthentication(value: unknown): PrdAuthSelection {
    if (typeof value === "number") {
        if (value === 1) return { emailPassword: true, socialLogin: false };
        if (value === 2) return { emailPassword: false, socialLogin: true };
        return { emailPassword: false, socialLogin: false };
    }
    if (value && typeof value === "object") {
        const auth = value as Partial<PrdAuthSelection>;
        return {
            emailPassword: Boolean(auth.emailPassword),
            socialLogin: Boolean(auth.socialLogin),
        };
    }
    return { emailPassword: false, socialLogin: false };
}

function cleanList(values: string[] | null | undefined): string[] {
    if (!values) return [];
    const seen = new Set<string>();
    const output: string[] = [];
    values.forEach((value) => {
        const normalized = value?.trim();
        if (!normalized) return;
        const key = normalized.toLowerCase();
        if (seen.has(key)) return;
        seen.add(key);
        output.push(normalized);
    });
    return output;
}

function truncateText(value: string, maxLength: number): string {
    if (value.length <= maxLength) return value;
    return `${value.slice(0, maxLength).trimEnd()}...`;
}

function toStructuredList(value: string | null | undefined): string[] {
    if (!value) return [];
    const normalized = value
        .split(/\n|;/g)
        .map((item) =>
            item
                .trim()
                .replace(/^[-*•]\s*/, "")
                .replace(/^\d+[\.)]\s*/, "")
        )
        .filter(Boolean);
    return cleanList(normalized);
}

function normalizeForKeywordSearch(value: string): string {
    return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function buildPrdContentFromDraft(
    draft: PrdWizardDraft | null,
    docLocale: DocLocale,
    tQuiz: TranslateFn
) {
    const copy = PRD_UI_COPY[docLocale];
    const projectName = draft?.projectName?.trim() || copy.projectNameFallback;
    const projectSummarySource =
        draft?.customRules?.trim() ||
        draft?.projectGoals?.trim() ||
        copy.projectGoalsFallback;
    const projectSummary = truncateText(projectSummarySource, 460);
    const deadline = draft?.projectDeadline?.trim() || copy.toDefine;

    const languageLabel =
        draft?.language === 4
            ? draft.languageOther?.trim() || copy.toDefine
            : draft?.language != null && PRD_LANGUAGE_KEYS[draft.language]
            ? tQuiz(PRD_LANGUAGE_KEYS[draft.language])
            : copy.toDefine;
    const hasWeb = draft?.platform === 0 || draft?.platform === 2;
    const hasMobile = draft?.platform === 1 || draft?.platform === 2;
    const platformLabel =
        draft?.platform === 3
            ? draft.platformOther?.trim() || copy.toDefine
            : draft?.platform != null && PRD_PLATFORM_KEYS[draft.platform]
            ? tQuiz(PRD_PLATFORM_KEYS[draft.platform])
            : copy.toDefine;

    const webFrameworkLabel = !hasWeb
        ? copy.notApplicable
        : draft?.webFramework === PRD_WEB_FRAMEWORK_NAMES.length
        ? draft.webFrameworkOther?.trim() || copy.toDefine
        : draft?.webFramework != null && PRD_WEB_FRAMEWORK_NAMES[draft.webFramework]
        ? PRD_WEB_FRAMEWORK_NAMES[draft.webFramework]
        : copy.toDefine;
    const webDesignLibraryLabel = !hasWeb
        ? copy.notApplicable
        : draft?.webDesignLibrary === "other"
        ? draft.webDesignLibraryOther?.trim() || copy.toDefine
        : draft?.webDesignLibrary &&
          PRD_WEB_DESIGN_LABEL_KEY[draft.webDesignLibrary]
        ? tQuiz(PRD_WEB_DESIGN_LABEL_KEY[draft.webDesignLibrary])
        : copy.toDefine;

    const mobileFrameworkLabel = !hasMobile
        ? copy.notApplicable
        : draft?.mobileFramework === PRD_MOBILE_FRAMEWORK_NAMES.length
        ? draft.mobileFrameworkOther?.trim() || copy.toDefine
        : draft?.mobileFramework != null &&
          PRD_MOBILE_FRAMEWORK_NAMES[draft.mobileFramework]
        ? PRD_MOBILE_FRAMEWORK_NAMES[draft.mobileFramework]
        : copy.toDefine;
    const mobileDesignLibraryLabel = !hasMobile
        ? copy.notApplicable
        : draft?.mobileDesignLibrary === "other"
        ? draft.mobileDesignLibraryOther?.trim() || copy.toDefine
        : draft?.mobileDesignLibrary &&
          PRD_MOBILE_DESIGN_LABEL_KEY[draft.mobileDesignLibrary]
        ? tQuiz(PRD_MOBILE_DESIGN_LABEL_KEY[draft.mobileDesignLibrary])
        : copy.toDefine;

    const backendLabel =
        draft?.backendTech != null && PRD_BACKEND_NAMES[draft.backendTech]
            ? PRD_BACKEND_NAMES[draft.backendTech]
            : copy.toDefine;
    const auth = normalizePrdAuthentication(draft?.authentication);
    const authLabel =
        auth.emailPassword && auth.socialLogin
            ? `${tQuiz("authEmailPassword")} + ${tQuiz("authSocialLogin")}`
            : auth.emailPassword
            ? tQuiz("authEmailPassword")
            : auth.socialLogin
            ? tQuiz("authSocialLogin")
            : tQuiz("authNone");
    const themeLabel =
        draft?.theme == null
            ? copy.toDefine
            : draft.theme === 0
            ? tQuiz("themeLightOnly")
            : tQuiz("themeLightDark");
    const iconsLabel =
        draft?.icons == null
            ? copy.toDefine
            : draft.icons === 3
            ? tQuiz("other")
            : PRD_ICON_LABEL_KEYS[draft.icons]
            ? tQuiz(PRD_ICON_LABEL_KEYS[draft.icons])
            : copy.toDefine;

    const selectedFeatureKeys = Object.entries(draft?.features ?? {})
        .filter(([, enabled]) => Boolean(enabled))
        .map(([key]) => key);
    const selectedIntegrationKeys = Object.entries(draft?.integrations ?? {})
        .filter(([, enabled]) => Boolean(enabled))
        .map(([key]) => key);
    const selectedFeatureLabels = cleanList([
        ...selectedFeatureKeys.map((key) => tQuiz(key)),
        ...cleanList(draft?.otherFeaturesTags),
    ]);
    const selectedIntegrationLabels = cleanList([
        ...selectedIntegrationKeys.map((key) => {
            const labelKey = PRD_INTEGRATION_LABEL_KEY[key];
            return labelKey ? tQuiz(labelKey) : key;
        }),
        ...cleanList(draft?.otherIntegrationsTags),
    ]);
    const keywordContext = normalizeForKeywordSearch(
        [
            draft?.projectName,
            projectSummarySource,
            draft?.projectGoals,
            draft?.customRules,
            ...selectedFeatureLabels,
            ...selectedIntegrationLabels,
        ]
            .filter(Boolean)
            .join(" ")
    );
    const mentionsRealtime = /real time|realtime|tempo real|sincron/.test(keywordContext);
    const mentionsOffline =
        /offline|sem internet|sin conexion|without internet|desconect/.test(
            keywordContext
        );
    const mentionsAnalytics =
        /analytic|kpi|metric|relatorio|dashboard|cohort|funil|funnel/.test(
            keywordContext
        );
    const mentionsCrm = /\bcrm\b/.test(keywordContext);
    const mentionsMessaging = /whatsapp|email|push|notific|sms/.test(keywordContext);
    const mentionsPayments =
        /pagament|payment|checkout|cobranc|billing|pix|cartao|card|tarjeta/.test(
            keywordContext
        );
    const mentionsAi =
        /\bia\b|\bai\b|inteligencia artificial|artificial intelligence|machine learning|\bml\b|copilot/.test(
            keywordContext
        );
    const hasPaymentsCapability =
        selectedFeatureKeys.includes("featPayments") ||
        selectedIntegrationKeys.includes("payments");
    const hasUploadCapability = selectedFeatureKeys.includes("featUpload");
    const hasRealtimeCapability = selectedFeatureKeys.includes("featRealtime");
    const hasIntegrationCapability =
        selectedIntegrationKeys.length > 0 || selectedIntegrationLabels.length > 0;
    const hasMessagingCapability =
        selectedIntegrationKeys.includes("whatsapp") ||
        selectedIntegrationKeys.includes("email") ||
        selectedIntegrationKeys.includes("push");
    const hasAnalyticsCapability = selectedIntegrationKeys.includes("analytics");
    const hasCrmCapability = selectedIntegrationKeys.includes("crm");
    const hasAiCapability = selectedIntegrationKeys.includes("ai");
    const requiresRealtime = hasRealtimeCapability || mentionsRealtime;
    const requiresOffline = selectedFeatureKeys.includes("featOffline") || mentionsOffline;
    const requiresAnalytics = hasAnalyticsCapability || mentionsAnalytics;
    const requiresCrm = hasCrmCapability || mentionsCrm;
    const requiresMessaging = hasMessagingCapability || mentionsMessaging;
    const requiresPayments = hasPaymentsCapability || mentionsPayments;
    const requiresAi = hasAiCapability || mentionsAi;

    const stories =
        selectedFeatureLabels.length > 0
            ? selectedFeatureLabels.map(
                  (featureLabel, index) =>
                      `USER-${String(index + 1).padStart(2, "0")} ${copy.storyTemplate.replace(
                          "{feature}",
                          featureLabel
                      )}`
              )
            : [copy.defaultStory];
    const journeys = [
        copy.journeyOnboarding,
        ...(auth.emailPassword || auth.socialLogin
            ? [copy.journeyAuthentication]
            : []),
        ...(hasPaymentsCapability ? [copy.journeyPayments] : []),
        ...(hasUploadCapability ? [copy.journeyUploads] : []),
        ...(hasRealtimeCapability ? [copy.journeyRealtime] : []),
        ...(selectedFeatureKeys.includes("featOffline") ? [copy.journeyOffline] : []),
        ...(hasIntegrationCapability ? [copy.journeyIntegrations] : []),
    ];
    const entities = [
        "usuarios",
        "perfis_permissoes",
        "logs_auditoria",
        ...(hasPaymentsCapability ? ["transacoes_pagamento"] : []),
        ...(hasUploadCapability ? ["arquivos"] : []),
        ...(hasRealtimeCapability ? ["eventos_tempo_real"] : []),
        ...(hasIntegrationCapability ? ["integracoes_externas"] : []),
        ...(selectedIntegrationKeys.includes("whatsapp")
            ? ["mensagens_whatsapp"]
            : []),
    ];
    const relationshipRules = cleanList([
        copy.dbPkFkRule,
        copy.dbDeletePolicyRule,
        copy.dbAuditIntegrityRule,
        copy.relationUserRoles,
        copy.relationUserAudit,
        ...(hasPaymentsCapability ? [copy.relationUserPayments] : []),
        ...(hasUploadCapability ? [copy.relationUserFiles] : []),
        ...(hasIntegrationCapability ? [copy.relationUserIntegrations] : []),
    ]);
    const indexRules = cleanList([
        copy.idxUsersRule,
        copy.idxAuditRule,
        ...(hasPaymentsCapability ? [copy.idxPaymentsRule] : []),
        ...(hasUploadCapability ? [copy.idxFilesRule] : []),
        ...(hasIntegrationCapability ? [copy.idxIntegrationsRule] : []),
    ]);
    const businessRules = [
        copy.ruleAccess,
        copy.ruleAudit,
        ...(hasPaymentsCapability ? [copy.rulePayments] : []),
        ...(hasUploadCapability ? [copy.ruleUploads] : []),
        ...(hasIntegrationCapability ? [copy.ruleIntegrations] : []),
    ];
    const rlsRules = [
        copy.rlsEnableRule,
        copy.rlsLeastPrivilegeRule,
        copy.rlsOwnershipRule,
    ];
    const operationsRules = [
        copy.opsMigrationsRule,
        copy.opsBackupRule,
        copy.opsObservabilityRule,
        copy.opsAlertsRule,
    ];
    const screens = [
        copy.screenLogin,
        copy.screenDashboard,
        copy.screenCore,
        copy.screenSettings,
    ];
    const successMetrics = [
        copy.metricAdoption,
        copy.metricDelivery.replace("{deadline}", deadline),
        ...(hasPaymentsCapability ? [copy.metricPayments] : []),
        copy.metricReliability,
    ];
    const nfrTargets = [
        copy.nfrAvailability,
        copy.nfrLatency,
        copy.nfrErrorRate,
        hasRealtimeCapability ? copy.nfrCapacityRealtime : copy.nfrCapacityBase,
    ];
    const acceptanceCriteriaItems = toStructuredList(draft?.acceptanceCriteria);
    const resolvedAcceptanceCriteria =
        acceptanceCriteriaItems.length > 0
            ? acceptanceCriteriaItems
            : cleanList([
                  copy.acceptanceFallbackCore,
                  ...(auth.emailPassword || auth.socialLogin
                      ? [copy.acceptanceFallbackAuth]
                      : []),
                  ...(hasPaymentsCapability
                      ? [copy.acceptanceFallbackPayments]
                      : []),
                  ...(hasIntegrationCapability
                      ? [copy.acceptanceFallbackIntegrations]
                      : []),
              ]);
    const outOfScopeItems = toStructuredList(draft?.outOfScope);
    const filteredOutOfScopeItems = outOfScopeItems.filter((item) => {
        const normalized = normalizeForKeywordSearch(item);
        return !(
            normalized.includes("nenhuma oportunidade adicional") ||
            normalized.includes("no additional opportunities") ||
            normalized.includes("no se mapearon automaticamente oportunidades adicionales") ||
            normalized.includes("se agregaron ejemplos de referencia")
        );
    });
    type EvolutionOpportunity = {
        title: string;
        userUse: string;
        businessValue: string;
        suggestedPhase: string;
        recommendedAction: string;
    };
    const evolutionOpportunities: EvolutionOpportunity[] = [
        ...filteredOutOfScopeItems.map((item) => ({
            title: item,
            userUse: copy.evolutionCustomUse,
            businessValue: copy.evolutionCustomValue,
            suggestedPhase: copy.evolutionPhase3,
            recommendedAction: copy.evolutionCustomAction,
        })),
        ...(!requiresRealtime
            ? [
                  {
                      title: copy.futurePhaseTitleRealtime,
                      userUse: copy.futurePhaseUseRealtime,
                      businessValue: copy.futurePhaseValueRealtime,
                      suggestedPhase: copy.evolutionPhase2,
                      recommendedAction: copy.evolutionActionBacklogFeature,
                  },
              ]
            : []),
        ...(!requiresOffline
            ? [
                  {
                      title: copy.futurePhaseTitleOffline,
                      userUse: copy.futurePhaseUseOffline,
                      businessValue: copy.futurePhaseValueOffline,
                      suggestedPhase: copy.evolutionPhase2,
                      recommendedAction: copy.evolutionActionBacklogFeature,
                  },
              ]
            : []),
        ...(!requiresAnalytics
            ? [
                  {
                      title: copy.futurePhaseTitleAnalytics,
                      userUse: copy.futurePhaseUseAnalytics,
                      businessValue: copy.futurePhaseValueAnalytics,
                      suggestedPhase: copy.evolutionPhase3,
                      recommendedAction: copy.evolutionActionBacklogFeature,
                  },
              ]
            : []),
        ...(!requiresCrm
            ? [
                  {
                      title: copy.futurePhaseTitleCrm,
                      userUse: copy.futurePhaseUseCrm,
                      businessValue: copy.futurePhaseValueCrm,
                      suggestedPhase: copy.evolutionPhase3,
                      recommendedAction: copy.evolutionActionBacklogIntegration,
                  },
              ]
            : []),
        ...(!requiresMessaging
            ? [
                  {
                      title: copy.futurePhaseTitleNotifications,
                      userUse: copy.futurePhaseUseNotifications,
                      businessValue: copy.futurePhaseValueNotifications,
                      suggestedPhase: copy.evolutionPhase2,
                      recommendedAction: copy.evolutionActionBacklogIntegration,
                  },
              ]
            : []),
        ...(!requiresPayments
            ? [
                  {
                      title: copy.futurePhaseTitlePayments,
                      userUse: copy.futurePhaseUsePayments,
                      businessValue: copy.futurePhaseValuePayments,
                      suggestedPhase: copy.evolutionPhase2,
                      recommendedAction: copy.evolutionActionBacklogIntegration,
                  },
              ]
            : []),
        ...(!requiresAi
            ? [
                  {
                      title: copy.futurePhaseTitleAi,
                      userUse: copy.futurePhaseUseAi,
                      businessValue: copy.futurePhaseValueAi,
                      suggestedPhase: copy.evolutionPhase3,
                      recommendedAction: copy.evolutionActionBacklogFeature,
                  },
              ]
            : []),
    ].slice(0, 6);
    const hasDetectedEvolutionOpportunities = evolutionOpportunities.length > 0;
    const fallbackEvolutionExamples: EvolutionOpportunity[] = [
        {
            title: copy.futurePhaseTitleAnalytics,
            userUse: copy.futurePhaseUseAnalytics,
            businessValue: copy.futurePhaseValueAnalytics,
            suggestedPhase: copy.evolutionPhase3,
            recommendedAction: copy.evolutionActionBacklogFeature,
        },
        {
            title: copy.futurePhaseTitleNotifications,
            userUse: copy.futurePhaseUseNotifications,
            businessValue: copy.futurePhaseValueNotifications,
            suggestedPhase: copy.evolutionPhase2,
            recommendedAction: copy.evolutionActionBacklogIntegration,
        },
        {
            title: copy.futurePhaseTitleAi,
            userUse: copy.futurePhaseUseAi,
            businessValue: copy.futurePhaseValueAi,
            suggestedPhase: copy.evolutionPhase3,
            recommendedAction: copy.evolutionActionBacklogFeature,
        },
    ];
    const resolvedEvolutionOpportunities = hasDetectedEvolutionOpportunities
        ? evolutionOpportunities
        : fallbackEvolutionExamples;
    const assumptionsRisksItems = toStructuredList(draft?.assumptionsAndRisks);
    const resolvedAssumptionsRisks =
        assumptionsRisksItems.length > 0
            ? assumptionsRisksItems
            : [copy.assumptionsRisksFallback];
    const aiImplementationGuidelines = [
        copy.aiGuidelineTraceability,
        copy.aiGuidelineTests,
        copy.aiGuidelineContracts,
        copy.aiGuidelineDelivery,
    ];
    const additionalDetails =
        draft?.customRules?.trim() || copy.notInformed;
    const additionalDetailsSummary = truncateText(additionalDetails, 1800);

    return {
        introduction: (
            <div className="space-y-3">
                <p>
                    <strong>{copy.overviewHeading}</strong>
                </p>
                <p>
                    {projectName}: {projectSummary}
                </p>
                <p>
                    <strong>{copy.projectLanguageLabel}:</strong> {languageLabel}.
                </p>
                <p>
                    <strong>{copy.platformLabel}:</strong> {platformLabel}.
                </p>
                <p>
                    <strong>{copy.deadlineLabel}:</strong> {deadline}.
                </p>
                <p>
                    <strong>{copy.audienceHeading}</strong>
                </p>
                <p>{projectSummary}</p>
            </div>
        ),
        goals: (
            <div className="space-y-3">
                <p>
                    <strong>{copy.mainFeaturesHeading}</strong>
                </p>
                <ul className="list-disc pl-8 space-y-1 [&>li]:leading-7">
                    {(selectedFeatureLabels.length > 0
                        ? selectedFeatureLabels
                        : [copy.toDefine]
                    ).map((feature, index) => (
                        <li key={`${feature}-${index}`}>{feature}</li>
                    ))}
                </ul>
                <p>
                    <strong>{copy.userStoriesHeading}</strong>
                </p>
                <ul className="list-disc pl-8 space-y-1 [&>li]:leading-7">
                    {stories.map((story, index) => (
                        <li key={`${story}-${index}`}>{story}</li>
                    ))}
                </ul>
            </div>
        ),
        timeline: (
            <div className="space-y-3">
                <p>
                    <strong>{copy.journeysHeading}</strong>
                </p>
                <ul className="list-disc pl-8 space-y-1 [&>li]:leading-7">
                    {journeys.map((journey, index) => (
                        <li key={`${journey}-${index}`}>{journey}</li>
                    ))}
                </ul>
                <p>
                    <strong>{copy.technicalHeading}</strong>
                </p>
                <ul className="list-disc pl-8 space-y-1 [&>li]:leading-7">
                    <li>
                        {copy.webLabel}: {webFrameworkLabel} ({webDesignLibraryLabel})
                    </li>
                    <li>
                        {copy.mobileLabel}: {mobileFrameworkLabel} ({mobileDesignLibraryLabel})
                    </li>
                    <li>
                        {copy.backendLabel}: {backendLabel}
                    </li>
                    <li>
                        {copy.authenticationLabel}: {authLabel}
                    </li>
                    <li>
                        {copy.integrationsLabel}:{" "}
                        {selectedIntegrationLabels.length > 0
                            ? selectedIntegrationLabels.join(", ")
                            : copy.toDefine}
                    </li>
                    <li>
                        {copy.themeLabel}: {themeLabel}; {copy.iconsLabel}: {iconsLabel}
                    </li>
                </ul>
            </div>
        ),
        budget: (
            <div className="space-y-3">
                <p>
                    <strong>{copy.entitiesHeading}</strong>
                </p>
                <ul className="list-disc pl-8 space-y-1 [&>li]:leading-7">
                    {entities.map((entity, index) => (
                        <li key={`${entity}-${index}`}>{entity}</li>
                    ))}
                </ul>
                <p>
                    <strong>{copy.dbRelationshipsHeading}</strong>
                </p>
                <ul className="list-disc pl-8 space-y-1 [&>li]:leading-7">
                    {relationshipRules.map((rule, index) => (
                        <li key={`${rule}-${index}`}>{rule}</li>
                    ))}
                </ul>
                <p>
                    <strong>{copy.dbIndexesHeading}</strong>
                </p>
                <ul className="list-disc pl-8 space-y-1 [&>li]:leading-7">
                    {indexRules.map((rule, index) => (
                        <li key={`${rule}-${index}`}>{rule}</li>
                    ))}
                </ul>
                <p>
                    <strong>{copy.flowsHeading}</strong>
                </p>
                <ol className="list-decimal pl-8 space-y-1 [&>li]:leading-7">
                    <li>{copy.flowOnboarding}</li>
                    <li>{copy.flowCore}</li>
                    <li>{copy.flowOperations}</li>
                    <li>{copy.flowMonitoring}</li>
                </ol>
            </div>
        ),
        references: (
            <div className="space-y-3">
                <p>
                    <strong>{copy.rulesHeading}</strong>
                </p>
                <ul className="list-disc pl-8 space-y-1 [&>li]:leading-7">
                    {businessRules.map((rule, index) => (
                        <li key={`${rule}-${index}`}>{rule}</li>
                    ))}
                </ul>
                <p>
                    <strong>{copy.additionalDetailsLabel}:</strong> {additionalDetailsSummary}
                </p>
                <p>
                    <strong>{copy.screensHeading}</strong>
                </p>
                <ul className="list-disc pl-8 space-y-1 [&>li]:leading-7">
                    {screens.map((screen, index) => (
                        <li key={`${screen}-${index}`}>{screen}</li>
                    ))}
                </ul>
            </div>
        ),
        conclusion: (
            <div className="space-y-3">
                <p>
                    <strong>{copy.securityHeading}</strong>
                </p>
                <ul className="list-disc pl-8 space-y-1 [&>li]:leading-7">
                    <li>{copy.security1}</li>
                    <li>{copy.security2}</li>
                    <li>{copy.security3}</li>
                    <li>{copy.security4}</li>
                </ul>
                <p>
                    <strong>{copy.rlsHeading}</strong>
                </p>
                <ul className="list-disc pl-8 space-y-1 [&>li]:leading-7">
                    {rlsRules.map((rule, index) => (
                        <li key={`${rule}-${index}`}>{rule}</li>
                    ))}
                </ul>
                <p>
                    <strong>{copy.operationsHeading}</strong>
                </p>
                <ul className="list-disc pl-8 space-y-1 [&>li]:leading-7">
                    {operationsRules.map((rule, index) => (
                        <li key={`${rule}-${index}`}>{rule}</li>
                    ))}
                </ul>
                <p>
                    <strong>{copy.metricsHeading}</strong>
                </p>
                <ul className="list-disc pl-8 space-y-1 [&>li]:leading-7">
                    {successMetrics.map((metric, index) => (
                        <li key={`${metric}-${index}`}>{metric}</li>
                    ))}
                </ul>
                <p>
                    <strong>{copy.nfrHeading}</strong>
                </p>
                <ul className="list-disc pl-8 space-y-1 [&>li]:leading-7">
                    {nfrTargets.map((metric, index) => (
                        <li key={`${metric}-${index}`}>{metric}</li>
                    ))}
                </ul>
                <p>
                    <strong>{copy.acceptanceCriteriaHeading}</strong>
                </p>
                <ul className="list-disc pl-8 space-y-1 [&>li]:leading-7">
                    {resolvedAcceptanceCriteria.map((item, index) => (
                        <li key={`${item}-${index}`}>{item}</li>
                    ))}
                </ul>
                <p>
                    <strong>{copy.assumptionsRisksHeading}</strong>
                </p>
                <ul className="list-disc pl-8 space-y-1 [&>li]:leading-7">
                    {resolvedAssumptionsRisks.map((item, index) => (
                        <li key={`${item}-${index}`}>{item}</li>
                    ))}
                </ul>
                <p>
                    <strong>{copy.implementationGuidelinesHeading}</strong>
                </p>
                <ul className="list-disc pl-8 space-y-1 [&>li]:leading-7">
                    {aiImplementationGuidelines.map((item, index) => (
                        <li key={`${item}-${index}`}>{item}</li>
                    ))}
                </ul>
                <p>
                    <strong>{copy.outOfScopeHeading}</strong>
                </p>
                <p>{copy.evolutionAnnexLead}</p>
                <p>
                    <em>{copy.evolutionAnnexOptional}</em>
                </p>
                {!hasDetectedEvolutionOpportunities && <p>{copy.evolutionExamplesIntro}</p>}
                <div className="space-y-3">
                    {resolvedEvolutionOpportunities.map((item, index) => (
                        <div
                            key={`${item.title}-${index}`}
                            className="rounded-2xl border-[1.5px] border-stroke2 p-4 space-y-1"
                        >
                            <p>
                                <strong>{index + 1}. {item.title}</strong>
                            </p>
                            <p>
                                <strong>{copy.evolutionUseLabel}:</strong>{" "}
                                {item.userUse}
                            </p>
                            <p>
                                <strong>{copy.evolutionValueLabel}:</strong>{" "}
                                {item.businessValue}
                            </p>
                            <p>
                                <strong>{copy.evolutionPhaseLabel}:</strong>{" "}
                                {item.suggestedPhase}
                            </p>
                            <p>
                                <strong>{copy.evolutionActionLabel}:</strong>{" "}
                                {item.recommendedAction}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        ),
    };
}

const DOC_DRAFT_TTL_MS = 1000 * 60 * 60 * 24;
type SectionKey =
    | "introduction"
    | "goals"
    | "timeline"
    | "budget"
    | "references"
    | "conclusion";
type SignatureParticipant = {
    id: string;
    role: string;
    fullName: string;
};
type SignatureAsset = { dataUrl: string; inkTone: "light" | "dark" };

const PROPOSAL_TYPE_KEYS: Record<number, string> = {
    0: "typeWebApp",
    1: "typeMobileApp",
    2: "typeUiDesign",
    3: "typeBranding",
    4: "typeLandingPage",
};

type ProposalTypeDraft = { active: number | null; otherType: string };
type ProposalWizardDraft = {
    projectName: string;
    projectGoals: string;
    yourBudget: string;
    date: string;
    billingModel: number | null;
    paymentMethod: number | null;
    billingAndPaymentOther: string;
    currency: number | null;
};
type ProposalBudgetItem = { id: number; scope: string; budget: string };
type ProposalContentShape = {
    introduction: React.ReactNode;
    goals: React.ReactNode;
    timeline: React.ReactNode;
    budget: React.ReactNode;
    references: React.ReactNode;
    conclusion: React.ReactNode;
    images: string[];
};

const CURRENCY_SYMBOL_BY_ID: Record<number, string> = {
    0: "R$",
    1: "US$",
    2: "€",
};

type TranslateFn = (
    key: string,
    values?: Record<string, string | number>
) => string;

function resolveProposalTypeLabel(
    draft: ProposalTypeDraft | null,
    tQuiz: TranslateFn,
    tBrief: TranslateFn
): string {
    if (!draft) return tBrief("proposalDefaultTypeLabel");
    if (draft.active === 5 && draft.otherType?.trim()) {
        return draft.otherType.trim();
    }
    if (draft.active != null && PROPOSAL_TYPE_KEYS[draft.active]) {
        return tQuiz(PROPOSAL_TYPE_KEYS[draft.active]);
    }
    return tBrief("proposalDefaultTypeLabel");
}

function resolveBillingModelLabel(
    model: number | null | undefined,
    tQuiz: TranslateFn,
    tBrief: TranslateFn
): string {
    if (model === 0) return tQuiz("billingFixedPrice");
    if (model === 1) return tQuiz("billingPerFeature");
    if (model === 2) return tQuiz("billingPerStage");
    return tBrief("proposalToDefine");
}

function resolvePaymentMethodLabel(
    method: number | null | undefined,
    tQuiz: TranslateFn,
    tBrief: TranslateFn
): string {
    if (method === 0) return tQuiz("payment5050");
    if (method === 1) return tQuiz("paymentPerStage");
    if (method === 2) return tQuiz("paymentOnDelivery");
    if (method === 3) return tQuiz("paymentDepositMilestones");
    return tBrief("proposalToDefine");
}

function formatProposalBudget(
    digits: string | undefined,
    currency: number | null | undefined,
    undefinedLabel: string
): string {
    if (!digits) return undefinedLabel;
    const currencyId = ((currency ?? 1) as CurrencyId) || 1;
    const symbol = CURRENCY_SYMBOL_BY_ID[currencyId] ?? "US$";
    const amount = digitsToNumber(digits);
    const formatted = amount.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return `${symbol} ${formatted}`;
}

function formatProposalBudgetFromAmount(
    amount: number,
    currency: number | null | undefined
): string {
    const currencyId = ((currency ?? 1) as CurrencyId) || 1;
    const symbol = CURRENCY_SYMBOL_BY_ID[currencyId] ?? "US$";
    const formatted = amount.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return `${symbol} ${formatted}`;
}

function buildProposalContentFromDrafts(
    typeDraft: ProposalTypeDraft | null,
    wizardDraft: ProposalWizardDraft | null,
    budgetDraft: ProposalBudgetItem[] | null,
    referenceLinks: string[] | null,
    referenceImages: string[] | null,
    tBrief: TranslateFn,
    tQuiz: TranslateFn
): ProposalContentShape {
    const projectName =
        wizardDraft?.projectName?.trim() || tBrief("proposalProjectNameFallback");
    const projectType = resolveProposalTypeLabel(typeDraft, tQuiz, tBrief);
    const projectGoals =
        wizardDraft?.projectGoals?.trim() ||
        tBrief("proposalGoalsFallback");
    const deadline = wizardDraft?.date?.trim() || tBrief("proposalToDefine");
    const totalBudget = formatProposalBudget(
        wizardDraft?.yourBudget,
        wizardDraft?.currency,
        tBrief("proposalToDefine")
    );
    const billingModel = resolveBillingModelLabel(
        wizardDraft?.billingModel,
        tQuiz,
        tBrief
    );
    const paymentMethod = resolvePaymentMethodLabel(
        wizardDraft?.paymentMethod,
        tQuiz,
        tBrief
    );
    const paymentNotes = wizardDraft?.billingAndPaymentOther?.trim() || "";
    const totalBudgetAmount = wizardDraft?.yourBudget
        ? digitsToNumber(wizardDraft.yourBudget)
        : null;
    const discounted24h =
        totalBudgetAmount !== null
            ? formatProposalBudgetFromAmount(
                  totalBudgetAmount * 0.9,
                  wizardDraft?.currency
              )
            : tBrief("proposalToDefine");
    const discounted48h =
        totalBudgetAmount !== null
            ? formatProposalBudgetFromAmount(
                  totalBudgetAmount * 0.95,
                  wizardDraft?.currency
              )
            : tBrief("proposalToDefine");
    const scopes =
        budgetDraft
            ?.filter((item) => item.scope?.trim())
            .map((item) => item.scope.trim()) ?? [];
    const stageBudgetRows =
        budgetDraft
            ?.filter((item) => item.scope?.trim() || item.budget?.trim())
            .map((item) => ({
                scope: item.scope?.trim() || tBrief("proposalStageFallback"),
                budget: formatProposalBudget(
                    item.budget,
                    wizardDraft?.currency,
                    tBrief("proposalToDefine")
                ),
            })) ?? [];
    const links = (referenceLinks ?? []).filter((link) => link?.trim());

    return {
        introduction: (
            <div className="space-y-3">
                <p>
                    {tBrief("proposalIntroLine1")}{" "}
                    <span className="text-[1.08rem] font-semibold">
                        {projectName}
                    </span>
                    .
                </p>
                <p>
                    <strong>{tBrief("proposalProjectTypeLabel")}</strong>{" "}
                    {projectType}.
                </p>
                <p>{tBrief("proposalIntroLine2")}</p>
            </div>
        ),
        goals: (
            <div className="space-y-3">
                <p>{projectGoals}</p>
            </div>
        ),
        timeline: (
            <div className="space-y-3">
                <p>
                    <strong>{tBrief("proposalMvpFeaturesLabel")}</strong>
                </p>
                {scopes.length > 0 ? (
                    <ul className="list-disc pl-8 space-y-1 [&>li]:leading-7">
                        {scopes.map((scope, index) => (
                            <li key={`${scope}-${index}`}>{scope}</li>
                        ))}
                    </ul>
                ) : (
                    <ul className="list-disc pl-8 space-y-1 [&>li]:leading-7">
                        <li>{tBrief("proposalDefaultScopeLine1")}</li>
                        <li>{tBrief("proposalDefaultScopeLine2")}</li>
                        <li>{tBrief("proposalDefaultScopeLine3")}</li>
                    </ul>
                )}
            </div>
        ),
        budget: (
            <div className="space-y-2">
                <p>
                    <strong>{tBrief("proposalTotalEstimatedLabel")}</strong>{" "}
                    {totalBudget}.
                </p>
                <p>
                    <strong>{tBrief("proposalDeadlineLabel")}</strong> {deadline}.
                </p>
                <p>
                    <strong>{tBrief("proposalBillingModelLabel")}</strong>{" "}
                    {billingModel}.
                </p>
                <p>
                    <strong>{tBrief("proposalPaymentMethodLabel")}</strong>{" "}
                    {paymentMethod}.
                </p>
                {paymentNotes && (
                    <p>
                        <strong>{tBrief("proposalCommercialNotesLabel")}</strong>{" "}
                        {paymentNotes}
                    </p>
                )}
                {stageBudgetRows.length > 0 && (
                    <>
                        <p>
                            <strong>{tBrief("proposalStageCompositionLabel")}</strong>
                        </p>
                        <ul className="list-disc pl-8 space-y-1 [&>li]:leading-7">
                            {stageBudgetRows.map((row, index) => (
                                <li key={`${row.scope}-${index}`}>
                                    {row.scope}: {row.budget}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        ),
        references: (
            <div className="space-y-3">
                {links.length > 0 ? (
                    <ul className="list-disc pl-8 space-y-1 [&>li]:leading-7">
                        {links.map((link, index) => (
                            <li key={`${link}-${index}`}>
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="underline decoration-1 underline-offset-2"
                                >
                                    {link}
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>{tBrief("proposalNoReferenceLinks")}</p>
                )}
                <p>{tBrief("proposalReferencesHelper")}</p>
            </div>
        ),
        conclusion: (
            <div className="space-y-3">
                <div className="rounded-2xl border border-primary2/20 bg-primary2/5 p-4">
                    <ul className="list-disc pl-6 space-y-1 [&>li]:leading-7">
                        <li>
                            {tBrief("proposalSpecialCondition24h")}
                            <strong> 10%</strong>. {tBrief("proposalFinalValueLabel")}{" "}
                            {discounted24h}.
                        </li>
                        <li>
                            {tBrief("proposalSpecialCondition48h")}
                            <strong> 5%</strong>. {tBrief("proposalFinalValueLabel")}{" "}
                            {discounted48h}.
                        </li>
                    </ul>
                </div>
                <p>{tBrief("proposalClosingText")}</p>
            </div>
        ),
        images: (referenceImages ?? []).slice(0, 4),
    };
}

const BriefPage = () => {
    const t = useTranslations("brief");
    const tQuiz = useTranslations("quiz");
    const locale = useLocale();
    const docLocale = resolveDocLocale(locale);
    const contractCopy = CONTRACT_UI_COPY[docLocale];
    const genericSignatureCopy = GENERIC_SIGNATURE_COPY[docLocale];
    const prdCopy = PRD_UI_COPY[docLocale];
    const tBrief = useMemo<TranslateFn>(
        () =>
            ((key: string, values?: Record<string, string | number>) =>
                t(key as never, values as never)) as TranslateFn,
        [t]
    );
    const tQuizText = useMemo<TranslateFn>(
        () =>
            ((key: string, values?: Record<string, string | number>) =>
                tQuiz(key as never, values as never)) as TranslateFn,
        [tQuiz]
    );
    const isPremiumPlan = useEventsStore((state) => state.isPremiumPlan);
    const searchParams = useSearchParams();
    const feature = searchParams.get("feature");
    const isReadOnlyView = searchParams.get("view") === "1";
    const featureType: "proposal" | "contract" | "prd" =
        feature === "contract"
            ? "contract"
            : feature === "prd"
            ? "prd"
            : "proposal";

    const editHref =
        featureType === "contract"
            ? "/quiz/contract?edit=1"
            : featureType === "prd"
            ? "/quiz/prd?edit=1"
            : "/quiz?edit=1";
    const defaultProposalTitle = t("proposalDocumentTitle", {
        type: t("proposalDefaultTypeLabel"),
    });
    const defaultProposalContent = useMemo(
        () =>
            buildProposalContentFromDrafts(
                null,
                null,
                null,
                null,
                null,
                tBrief,
                tQuizText
            ),
        [tBrief, tQuizText]
    );
    const defaultPrdContent = useMemo(
        () => buildPrdContentFromDraft(null, docLocale, tQuizText),
        [docLocale, tQuizText]
    );
    const documentTitle =
        featureType === "contract"
            ? contractCopy.documentTitle
            : featureType === "prd"
            ? prdCopy.documentTitle
            : defaultProposalTitle;
    const [proposalContentState, setProposalContentState] = useState<ProposalContentShape>(
        defaultProposalContent
    );
    const [contractDraftState, setContractDraftState] =
        useState<ContractWizardDraft | null>(null);
    const [contractContentState, setContractContentState] = useState<
        Omit<ProposalContentShape, "images">
    >(buildContractContentFromDraft(null, docLocale));
    const [prdContentState, setPrdContentState] = useState<
        Omit<ProposalContentShape, "images">
    >(defaultPrdContent);
    const displayedContent =
        featureType === "contract"
            ? contractContentState
            : featureType === "prd"
            ? prdContentState
            : proposalContentState;
    const sectionTitles = useMemo(
        () =>
            featureType === "contract"
                ? {
                      introduction: contractCopy.sectionIntroduction,
                      goals: contractCopy.sectionGoals,
                      timeline: contractCopy.sectionTimeline,
                      budget: contractCopy.sectionBudget,
                      references: contractCopy.sectionReferences,
                      conclusion: contractCopy.sectionConclusion,
                  }
                : featureType === "prd"
                ? {
                      introduction: prdCopy.sectionIntroduction,
                      goals: prdCopy.sectionGoals,
                      timeline: prdCopy.sectionTimeline,
                      budget: prdCopy.sectionBudget,
                      references: prdCopy.sectionReferences,
                      conclusion: prdCopy.sectionConclusion,
                  }
                : {
                      introduction: t("proposalSectionSummary"),
                      goals: t("proposalSectionGoals"),
                      timeline: t("proposalSectionScope"),
                      budget: t("proposalSectionInvestment"),
                      references: t("proposalSectionReferences"),
                      conclusion: t("proposalSectionConditions"),
                  },
        [contractCopy, featureType, prdCopy, t]
    );
    const subtitleDefault =
        featureType === "prd"
            ? prdCopy.subtitle
            : t("documentTypeLabel", {
                  type: featureType === "contract" ? t("contract") : t("proposal"),
              });
    const storageVersion = featureType === "prd" ? "v15" : "v13";
    const storageKey = `briefberry:doc-edit:${featureType}:${docLocale}:${storageVersion}`;

    const [editableDocumentTitle, setEditableDocumentTitle] = useState(documentTitle);
    const [editableSubtitle, setEditableSubtitle] = useState(subtitleDefault);
    const [editableSectionTitles, setEditableSectionTitles] = useState(sectionTitles);
    const [editableSectionContents, setEditableSectionContents] = useState<
        Record<SectionKey, string | null>
    >({
        introduction: null,
        goals: null,
        timeline: null,
        budget: null,
        references: null,
        conclusion: null,
    });
    const [editableReferenceImages, setEditableReferenceImages] = useState<string[]>(
        featureType === "proposal" ? proposalContentState.images : []
    );
    const [isDraftHydrated, setIsDraftHydrated] = useState(false);
    const [signatureModalOpen, setSignatureModalOpen] = useState(false);
    const [signatureModalVersion, setSignatureModalVersion] = useState(0);
    const [activeSigner, setActiveSigner] = useState("");
    const [signatures, setSignatures] = useState<
        Record<string, SignatureAsset | string>
    >({});
    const [signatureNames, setSignatureNames] = useState<Record<string, string>>({});
    const [isEditingDocumentTitle, setIsEditingDocumentTitle] = useState(false);
    const [isEditingSubtitle, setIsEditingSubtitle] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        let hasPersistedTitle = false;
        let hasPersistedSubtitle = false;
        let persistedTitleValue = "";
        let persistedSubtitleValue = "";
        let hasPersistedReferenceImages = false;
        try {
            const raw = window.localStorage.getItem(storageKey);
            if (!raw) {
                setIsDraftHydrated(true);
                return;
            }
            const parsed = JSON.parse(raw) as {
                expiresAt: number;
                documentTitle?: string;
                subtitle?: string;
                sectionTitles?: Record<SectionKey, string>;
                sectionContents?: Record<SectionKey, string | null>;
                referenceImages?: string[];
            };
            if (!parsed.expiresAt || parsed.expiresAt < Date.now()) {
                window.localStorage.removeItem(storageKey);
                setIsDraftHydrated(true);
                return;
            }
            if (parsed.documentTitle) {
                setEditableDocumentTitle(parsed.documentTitle);
                hasPersistedTitle = true;
                persistedTitleValue = parsed.documentTitle;
            }
            if (parsed.subtitle) {
                setEditableSubtitle(parsed.subtitle);
                hasPersistedSubtitle = true;
                persistedSubtitleValue = parsed.subtitle;
            }
            if (parsed.sectionTitles) setEditableSectionTitles(parsed.sectionTitles);
            if (parsed.sectionContents) {
                const nextContents = { ...parsed.sectionContents };
                if (featureType === "contract") {
                    // Keep legal template formatting in the first two contract sections.
                    nextContents.introduction = null;
                    nextContents.goals = null;
                }
                setEditableSectionContents(nextContents);
            }
            if (parsed.referenceImages) setEditableReferenceImages(parsed.referenceImages);
            if (parsed.referenceImages?.length) hasPersistedReferenceImages = true;
        } catch {
            // Ignore corrupted draft payloads
        } finally {
            const isLegacyPrdEnglishTitle =
                persistedTitleValue === "Product Requirements Document" ||
                persistedTitleValue === "Product Requirements Document (PRD)";
            const isLegacySimpleSubtitle =
                persistedSubtitleValue === "Proposta" ||
                persistedSubtitleValue === "Proposal" ||
                persistedSubtitleValue === "Propuesta" ||
                persistedSubtitleValue === "Contrato" ||
                persistedSubtitleValue === "Contract" ||
                persistedSubtitleValue === "PRD" ||
                persistedSubtitleValue === "Product Requirements Document (PRD)";
            const isLegacyPrdSubtitle =
                persistedSubtitleValue === "Especificação completa do projeto" ||
                persistedSubtitleValue === "Complete project specification" ||
                persistedSubtitleValue === "Especificación completa del proyecto" ||
                persistedSubtitleValue === "Documento: PRD" ||
                persistedSubtitleValue === "Document: PRD";

            if (featureType === "proposal") {
                const proposalTypeDraft =
                    loadDraft<ProposalTypeDraft>(DRAFT_KEYS.proposalTypeBrief);
                const proposalWizardDraft =
                    loadDraft<ProposalWizardDraft>(DRAFT_KEYS.proposalWizard);
                const proposalBudgetDraft =
                    loadDraft<ProposalBudgetItem[]>(DRAFT_KEYS.proposalBudget);
                const proposalReferencesDraft =
                    loadDraft<string[]>(DRAFT_KEYS.proposalReferences);
                const proposalReferenceImagesDraft =
                    loadDraft<string[]>(DRAFT_KEYS.proposalReferenceImages);

                const dynamicProposalContent = buildProposalContentFromDrafts(
                    proposalTypeDraft,
                    proposalWizardDraft,
                    proposalBudgetDraft,
                    proposalReferencesDraft,
                    proposalReferenceImagesDraft,
                    tBrief,
                    tQuizText
                );
                setProposalContentState(dynamicProposalContent);
                if (!hasPersistedReferenceImages) {
                    setEditableReferenceImages(dynamicProposalContent.images);
                }

                const typeLabel = resolveProposalTypeLabel(
                    proposalTypeDraft,
                    tQuizText,
                    tBrief
                );
                const dynamicTitle = tBrief("proposalDocumentTitle", {
                    type: typeLabel,
                });
                const isPrdDefaultTitle =
                    persistedTitleValue === "PRD" ||
                    isLegacyPrdEnglishTitle ||
                    persistedTitleValue === prdCopy.documentTitle;
                const isContractDefaultTitle =
                    persistedTitleValue === contractCopy.documentTitle;
                const isLegacyModelTitle =
                    persistedTitleValue === "Proposta Modelo 2026" ||
                    persistedTitleValue === "Proposal Model 2026" ||
                    persistedTitleValue === "Propuesta Modelo 2026";
                const isLegacyDynamicTitle = /^(Proposta Comercial de|Commercial Proposal for|Propuesta Comercial de)\s/i.test(
                    persistedTitleValue
                );
                const shouldOverrideTitle =
                    !hasPersistedTitle ||
                    isLegacyModelTitle ||
                    isLegacyDynamicTitle ||
                    isPrdDefaultTitle ||
                    isContractDefaultTitle;
                if (shouldOverrideTitle) {
                    setEditableDocumentTitle(dynamicTitle);
                }
                if (
                    !hasPersistedSubtitle ||
                    isLegacySimpleSubtitle ||
                    isLegacyPrdSubtitle ||
                    isPrdDefaultTitle ||
                    isContractDefaultTitle
                ) {
                    setEditableSubtitle(subtitleDefault);
                }
            }
            if (featureType === "contract") {
                const contractDraft = loadDraft<ContractWizardDraft>(
                    DRAFT_KEYS.contractWizard
                );
                setContractDraftState(contractDraft);
                setContractContentState(
                    buildContractContentFromDraft(contractDraft, docLocale)
                );
                const isProposalTitle = /^(Proposta Comercial de|Commercial Proposal for|Propuesta Comercial de)\s/i.test(
                    persistedTitleValue
                );
                const isPrdTitle =
                    persistedTitleValue === "PRD" ||
                    isLegacyPrdEnglishTitle ||
                    persistedTitleValue === prdCopy.documentTitle;
                if (!hasPersistedTitle || isProposalTitle || isPrdTitle) {
                    setEditableDocumentTitle(contractCopy.documentTitle);
                }
                if (
                    !hasPersistedSubtitle ||
                    isLegacySimpleSubtitle ||
                    isLegacyPrdSubtitle ||
                    isProposalTitle ||
                    isPrdTitle
                ) {
                    setEditableSubtitle(subtitleDefault);
                }
            }
            if (featureType === "prd") {
                const prdDraft = loadDraft<PrdWizardDraft>(DRAFT_KEYS.prdWizard);
                setPrdContentState(
                    buildPrdContentFromDraft(prdDraft, docLocale, tQuizText)
                );
                const isLegacyPrdTitle =
                    persistedTitleValue === "PRD" ||
                    isLegacyPrdEnglishTitle;
                const isProposalTitle = /^(Proposta Comercial de|Commercial Proposal for|Propuesta Comercial de)\s/i.test(
                    persistedTitleValue
                );
                const isContractTitle =
                    persistedTitleValue === contractCopy.documentTitle;
                if (
                    !hasPersistedTitle ||
                    isLegacyPrdTitle ||
                    isProposalTitle ||
                    isContractTitle
                ) {
                    setEditableDocumentTitle(prdCopy.documentTitle);
                }
                if (
                    !hasPersistedSubtitle ||
                    isLegacySimpleSubtitle ||
                    isLegacyPrdSubtitle ||
                    isProposalTitle ||
                    isContractTitle
                ) {
                    setEditableSubtitle(subtitleDefault);
                }
            }
            setIsDraftHydrated(true);
        }
    }, [
        docLocale,
        featureType,
        storageKey,
        locale,
        contractCopy.documentTitle,
        prdCopy,
        subtitleDefault,
        t,
        tBrief,
        tQuizText,
    ]);

    useEffect(() => {
        if (!isDraftHydrated) return;
        if (typeof window === "undefined") return;
        const payload = {
            expiresAt: Date.now() + DOC_DRAFT_TTL_MS,
            documentTitle: editableDocumentTitle,
            subtitle: editableSubtitle,
            sectionTitles: editableSectionTitles,
            sectionContents:
                featureType === "contract"
                    ? {
                          ...editableSectionContents,
                          introduction: null,
                          goals: null,
                      }
                    : editableSectionContents,
            referenceImages: editableReferenceImages,
        };
        window.localStorage.setItem(storageKey, JSON.stringify(payload));
    }, [
        editableDocumentTitle,
        editableSubtitle,
        editableSectionTitles,
        editableSectionContents,
        editableReferenceImages,
        isDraftHydrated,
        featureType,
        storageKey,
    ]);
    const categoryValue =
        featureType === "contract"
            ? "contract"
            : featureType === "prd"
            ? "prd"
            : "proposal";
    const signatureParticipants: SignatureParticipant[] = useMemo(
        () =>
            featureType === "contract"
                ? [
                      {
                          id: "ACORDANTE_1",
                          role: contractCopy.clientLabel,
                          fullName:
                              contractDraftState?.clientName?.trim() ||
                              contractCopy.clientLabel,
                      },
                      {
                          id: "ACORDANTE_2",
                          role: contractCopy.contractorLabel,
                          fullName:
                              contractDraftState?.contractorName?.trim() ||
                              contractCopy.contractorLabel,
                      },
                      {
                          id: "TESTEMUNHA_1",
                          role: `${contractCopy.witnessRole} 1`,
                          fullName: "",
                      },
                      {
                          id: "TESTEMUNHA_2",
                          role: `${contractCopy.witnessRole} 2`,
                          fullName: "",
                      },
                  ]
                : featureType === "prd"
                ? [
                      {
                          id: "RESPONSAVEL_PRODUTO",
                          role: genericSignatureCopy.prdOwnerRole,
                          fullName: genericSignatureCopy.signer1,
                      },
                      {
                          id: "RESPONSAVEL_TECNICO",
                          role: genericSignatureCopy.prdTechRole,
                          fullName: genericSignatureCopy.signer2,
                      },
                  ]
                : [
                      {
                          id: "CONTRATANTE",
                          role: genericSignatureCopy.proposalClientRole,
                          fullName: genericSignatureCopy.signer1,
                      },
                      {
                          id: "CONTRATADA",
                          role: genericSignatureCopy.proposalProviderRole,
                          fullName: genericSignatureCopy.signer2,
                      },
                  ],
        [
            contractCopy,
            featureType,
            contractDraftState?.clientName,
            contractDraftState?.contractorName,
            genericSignatureCopy,
        ]
    );

    useEffect(() => {
        if (featureType !== "contract") return;
        setSignatureNames((prev) => {
            const next = { ...prev };

            // Keep client/contractor always synced from the form.
            next.ACORDANTE_1 =
                contractDraftState?.clientName?.trim() || contractCopy.clientLabel;
            next.ACORDANTE_2 =
                contractDraftState?.contractorName?.trim() ||
                contractCopy.contractorLabel;

            // Witnesses are filled manually later by the user.
            if (next.TESTEMUNHA_1 == null) next.TESTEMUNHA_1 = "";
            if (next.TESTEMUNHA_2 == null) next.TESTEMUNHA_2 = "";

            return next;
        });
    }, [
        contractCopy.clientLabel,
        contractCopy.contractorLabel,
        contractDraftState?.clientName,
        contractDraftState?.contractorName,
        featureType,
    ]);

    return (
        <Layout isFixedHeader isHiddenFooter isVisiblePlan isLoggedIn>
            <div className="pt-34 px-6 pb-38 max-2xl:pt-32 max-2xl:px-11 max-2xl:pb-33 max-xl:pt-30 max-lg:pt-28 max-md:pt-22 max-md:px-4 max-md:pb-24">
                <div
                    key={featureType}
                    className="relative max-w-220 mx-auto p-12 shadow-hover bg-b-surface4 rounded-4xl before:absolute before:top-full before:left-6 before:right-6 before:-z-1 before:h-3.75 before:rounded-b-4xl before:bg-b-surface2 max-md:px-8 max-md:pb-4 max-md:before:hidden"
                >
                    {!isReadOnlyView && (
                        <Button
                            className="absolute! top-2 right-2 shadow-hover"
                            isCircle
                            isPrimary
                            as="link"
                            href={editHref}
                        >
                            <Icon name="edit" />
                        </Button>
                    )}
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
                            {isEditingDocumentTitle ? (
                                <input
                                    className="w-full bg-transparent border-0 outline-0 text-h2 max-md:text-h5"
                                    value={editableDocumentTitle}
                                    onChange={(e) =>
                                        setEditableDocumentTitle(e.target.value)
                                    }
                                    onBlur={() => setIsEditingDocumentTitle(false)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            setIsEditingDocumentTitle(false);
                                        }
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <button
                                    type="button"
                                    className="text-left"
                                    onClick={() =>
                                        !isReadOnlyView &&
                                        setIsEditingDocumentTitle(true)
                                    }
                                >
                                    {editableDocumentTitle}
                                </button>
                            )}
                        </div>
                        {isEditingSubtitle ? (
                            <input
                                className="w-full bg-transparent border-0 outline-0 text-heading text-t-secondary"
                                value={editableSubtitle}
                                onChange={(e) => setEditableSubtitle(e.target.value)}
                                onBlur={() => setIsEditingSubtitle(false)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        setIsEditingSubtitle(false);
                                    }
                                }}
                                autoFocus
                            />
                        ) : (
                            <button
                                type="button"
                                className="text-left"
                                onClick={() =>
                                    !isReadOnlyView && setIsEditingSubtitle(true)
                                }
                            >
                                <BriefCategory
                                    value={categoryValue}
                                    label={editableSubtitle}
                                />
                            </button>
                        )}
                    </div>
                    <BriefSection
                        title={editableSectionTitles.introduction}
                        onTitleChange={(nextTitle) =>
                            setEditableSectionTitles((prev) => ({
                                ...prev,
                                introduction: nextTitle,
                            }))
                        }
                        content={
                            editableSectionContents.introduction ??
                            displayedContent.introduction
                        }
                        editedContent={
                            editableSectionContents.introduction ?? undefined
                        }
                        onContentChange={(nextContent) =>
                            setEditableSectionContents((prev) => ({
                                ...prev,
                                introduction: nextContent || null,
                            }))
                        }
                        isOnlyView={isReadOnlyView}
                    />
                    <BriefSection
                        title={editableSectionTitles.goals}
                        onTitleChange={(nextTitle) =>
                            setEditableSectionTitles((prev) => ({
                                ...prev,
                                goals: nextTitle,
                            }))
                        }
                        content={editableSectionContents.goals ?? displayedContent.goals}
                        editedContent={editableSectionContents.goals ?? undefined}
                        onContentChange={(nextContent) =>
                            setEditableSectionContents((prev) => ({
                                ...prev,
                                goals: nextContent || null,
                            }))
                        }
                        isOnlyView={isReadOnlyView}
                    />
                    <BriefSection
                        title={editableSectionTitles.timeline}
                        onTitleChange={(nextTitle) =>
                            setEditableSectionTitles((prev) => ({
                                ...prev,
                                timeline: nextTitle,
                            }))
                        }
                        content={
                            editableSectionContents.timeline ??
                            displayedContent.timeline
                        }
                        editedContent={editableSectionContents.timeline ?? undefined}
                        onContentChange={(nextContent) =>
                            setEditableSectionContents((prev) => ({
                                ...prev,
                                timeline: nextContent || null,
                            }))
                        }
                        isOnlyView={isReadOnlyView}
                    />
                    <BriefSection
                        title={editableSectionTitles.budget}
                        onTitleChange={(nextTitle) =>
                            setEditableSectionTitles((prev) => ({
                                ...prev,
                                budget: nextTitle,
                            }))
                        }
                        content={editableSectionContents.budget ?? displayedContent.budget}
                        editedContent={editableSectionContents.budget ?? undefined}
                        onContentChange={(nextContent) =>
                            setEditableSectionContents((prev) => ({
                                ...prev,
                                budget: nextContent || null,
                            }))
                        }
                        isOnlyView={isReadOnlyView}
                    />
                    <BriefSection
                        title={editableSectionTitles.references}
                        onTitleChange={(nextTitle) =>
                            setEditableSectionTitles((prev) => ({
                                ...prev,
                                references: nextTitle,
                            }))
                        }
                        content={
                            editableSectionContents.references ??
                            displayedContent.references
                        }
                        editedContent={editableSectionContents.references ?? undefined}
                        onContentChange={(nextContent) =>
                            setEditableSectionContents((prev) => ({
                                ...prev,
                                references: nextContent || null,
                            }))
                        }
                        images={
                            featureType === "proposal"
                                ? editableReferenceImages
                                : undefined
                        }
                        onImagesChange={setEditableReferenceImages}
                        isOnlyView={isReadOnlyView}
                    />
                    <BriefSection
                        title={editableSectionTitles.conclusion}
                        onTitleChange={(nextTitle) =>
                            setEditableSectionTitles((prev) => ({
                                ...prev,
                                conclusion: nextTitle,
                            }))
                        }
                        content={
                            editableSectionContents.conclusion ??
                            displayedContent.conclusion
                        }
                        editedContent={editableSectionContents.conclusion ?? undefined}
                        onContentChange={(nextContent) =>
                            setEditableSectionContents((prev) => ({
                                ...prev,
                                conclusion: nextContent || null,
                            }))
                        }
                        isOnlyView={isReadOnlyView}
                    />
                    {featureType === "contract" && (
                        <div className="mt-10 border-t border-stroke2 pt-8">
                        <div className="mb-4 text-h5">{contractCopy.signaturesTitle}</div>
                        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                            {signatureParticipants.map((participant) => {
                                const signatureEntry = signatures[participant.id];
                                const signatureSrc =
                                    typeof signatureEntry === "string"
                                        ? signatureEntry
                                        : signatureEntry?.dataUrl;
                                const inkTone =
                                    typeof signatureEntry === "string"
                                        ? null
                                        : signatureEntry?.inkTone;

                                return (
                                <div
                                    key={participant.id}
                                    className="rounded-2xl border border-stroke2 bg-b-surface1 p-4"
                                >
                                    <div className="mb-3 text-small text-t-secondary">
                                        {participant.role}
                                    </div>
                                    {!isReadOnlyView ? (
                                        <input
                                            className="mb-3 w-full bg-transparent border-0 border-b border-stroke2 pb-1 outline-0 text-small text-t-primary"
                                            value={
                                                signatureNames[participant.id] ??
                                                participant.fullName
                                            }
                                            onChange={(e) =>
                                                setSignatureNames((prev) => ({
                                                    ...prev,
                                                    [participant.id]: e.target.value,
                                                }))
                                            }
                                            placeholder={contractCopy.signerNamePlaceholder}
                                        />
                                    ) : (
                                        <div className="mb-3 text-small text-t-primary">
                                            {signatureNames[participant.id] ??
                                                participant.fullName}
                                        </div>
                                    )}
                                    {signatureSrc ? (
                                        <div
                                            className={`mb-3 inline-flex max-w-full rounded-lg border border-stroke2 p-1.5 bg-[#D6DEE7]`}
                                        >
                                            <Image
                                                src={signatureSrc}
                                                alt={`Assinatura ${participant.role}`}
                                                width={280}
                                                height={56}
                                                className={`h-14 w-auto object-contain ${
                                                    inkTone === "light"
                                                        ? "brightness-0"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                    ) : (
                                        <div className="mb-3 h-14 w-full rounded-lg border border-dashed border-stroke2 bg-[#D6DEE7]/65" />
                                    )}
                                    {!isReadOnlyView && (
                                        <Button
                                            isPrimary
                                            onClick={() => {
                                                setActiveSigner(participant.id);
                                                setSignatureModalVersion((prev) => prev + 1);
                                                setSignatureModalOpen(true);
                                            }}
                                        >
                                            {signatureSrc
                                                ? contractCopy.signAgain
                                                : contractCopy.clickToSign}
                                        </Button>
                                    )}
                                </div>
                                );
                            })}
                        </div>
                        </div>
                    )}
                </div>
            </div>
            {!isReadOnlyView && <Actions featureType={featureType} />}
            {featureType === "contract" && (
                <SignaturePadModal
                    key={signatureModalVersion}
                    open={signatureModalOpen}
                    onClose={() => setSignatureModalOpen(false)}
                    title={contractCopy.signatureModalTitle}
                    signerName={signatureNames[activeSigner] || activeSigner}
                    onSave={(dataUrl, inkTone) =>
                        setSignatures((prev) => ({
                            ...prev,
                            [activeSigner]: { dataUrl, inkTone },
                        }))
                    }
                />
            )}
        </Layout>
    );
};

export default BriefPage;
