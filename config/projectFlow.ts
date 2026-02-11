/**
 * Configuração do fluxo de projeto.
 * Expande o briefing_flow existente para proposal, contract e prd.
 * Todas as features usam o mesmo padrão de wizard (step_by_step, next/previous).
 */

export type FeatureKey = "create_proposal" | "create_contract" | "create_prd";

export type OutputType = "proposal" | "contract" | "prd";

export interface FeatureNavigation {
  step_by_step: boolean;
  next_previous: boolean;
  mocked: boolean;
}

export interface FeatureOutput {
  type: OutputType;
  generated_at_end: boolean;
}

export interface FeatureEntryOptions {
  from_proposal?: boolean;
  from_contract?: boolean;
  later_from_existing_proposal?: boolean;
}

export interface FeatureInputs {
  contractor_data?: boolean;
  client_data?: boolean;
  contract_rules?: boolean;
  technical_choices?: boolean;
  business_rules?: boolean;
  custom_features?: boolean;
}

export interface FeaturePostOutputActions {
  approve_prd?: boolean;
  generate_tasks_button?: boolean;
  tasks_generated_now?: boolean;
}

export interface FeatureConfig {
  type: "wizard";
  independent: boolean;
  based_on: "briefing_flow";
  ui_pattern: "same_as_briefing";
  navigation: FeatureNavigation;
  scope: "per_project";
  inputs_source?: "briefing";
  inputs?: FeatureInputs;
  entry_options?: FeatureEntryOptions;
  output: FeatureOutput;
  post_output_actions?: FeaturePostOutputActions;
}

export interface ProjectFlowConfig {
  project_flow: {
    start: {
      action: "select_feature";
      options: FeatureKey[];
    };
  };
  features: Record<FeatureKey, FeatureConfig>;
}

export const projectFlowConfig: ProjectFlowConfig = {
  project_flow: {
    start: {
      action: "select_feature",
      options: ["create_proposal", "create_contract", "create_prd"],
    },
  },
  features: {
    create_proposal: {
      type: "wizard",
      independent: true,
      based_on: "briefing_flow",
      ui_pattern: "same_as_briefing",
      navigation: {
        step_by_step: true,
        next_previous: true,
        mocked: true,
      },
      scope: "per_project",
      inputs_source: "briefing",
      output: {
        type: "proposal",
        generated_at_end: true,
      },
    },
    create_contract: {
      type: "wizard",
      independent: true,
      based_on: "briefing_flow",
      ui_pattern: "same_as_briefing",
      navigation: {
        step_by_step: true,
        next_previous: true,
        mocked: true,
      },
      scope: "per_project",
      entry_options: {
        from_proposal: true,
        later_from_existing_proposal: true,
      },
      inputs: {
        contractor_data: true,
        client_data: true,
        contract_rules: true,
      },
      output: {
        type: "contract",
        generated_at_end: true,
      },
    },
    create_prd: {
      type: "wizard",
      independent: true,
      based_on: "briefing_flow",
      ui_pattern: "same_as_briefing",
      navigation: {
        step_by_step: true,
        next_previous: true,
        mocked: true,
      },
      scope: "per_project",
      entry_options: {
        from_proposal: true,
        from_contract: false,
      },
      inputs: {
        technical_choices: true,
        business_rules: true,
        custom_features: true,
      },
      output: {
        type: "prd",
        generated_at_end: true,
      },
      post_output_actions: {
        approve_prd: true,
        generate_tasks_button: true,
        tasks_generated_now: false,
      },
    },
  },
};

/** Helpers para consumir a config */
export const getFeatureOptions = () => projectFlowConfig.project_flow.start.options;

export const getFeatureConfig = (key: FeatureKey) => projectFlowConfig.features[key];

export const getFeaturesWithBriefingFlow = () =>
  getFeatureOptions().filter(
    (key) => getFeatureConfig(key).based_on === "briefing_flow"
  );
