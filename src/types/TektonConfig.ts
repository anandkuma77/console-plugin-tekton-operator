import { K8sResourceCommon } from '@openshift-console/dynamic-plugin-sdk';

export interface TektonConfigSpec {
  targetNamespace?: string;
  profile?: string;
  pruner?: {
    disabled?: boolean;
    schedule?: string;
    keep?: number;
  };
  pipeline?: Record<string, any>;
  trigger?: Record<string, any>;
  addon?: Record<string, any>;
  chain?: Record<string, any>;
  hub?: Record<string, any>;
  platforms?: Record<string, any>;
}

export interface TektonConfig extends K8sResourceCommon {
  apiVersion: 'operator.tekton.dev/v1alpha1';
  kind: 'TektonConfig';
  spec: TektonConfigSpec;
  status?: any;
}

export const TektonConfigModel = {
  apiVersion: 'v1alpha1',
  apiGroup: 'operator.tekton.dev',
  plural: 'tektonconfigs',
  namespaced: false,
  kind: 'TektonConfig',
  id: 'tektonconfig',
  labelPlural: 'TektonConfigs',
  label: 'TektonConfig',
  abbr: 'TC',
};
