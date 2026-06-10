import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  PageSection,
  Content,
  Title,
  Card,
  CardTitle,
  CardBody,
  Grid,
  GridItem,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
  Spinner,
} from '@patternfly/react-core';
import { useK8sWatchResource } from '@openshift-console/dynamic-plugin-sdk';
import { TektonConfig, TektonConfigModel } from '../types';

export const TektonConfigPage: React.FC = () => {
  const { t } = useTranslation('plugin__console-plugin-tekton-operator');

  const [tektonConfig, loaded, loadError] = useK8sWatchResource<TektonConfig>({
    groupVersionKind: {
      group: TektonConfigModel.apiGroup,
      version: TektonConfigModel.apiVersion,
      kind: TektonConfigModel.kind,
    },
    name: 'config',
    namespaced: false,
  });

  if (loadError) {
    return (
      <PageSection>
        <Content>
          <Title headingLevel="h2">{t('Error loading Tekton configuration')}</Title>
        </Content>
      </PageSection>
    );
  }

  if (!loaded) {
    return (
      <PageSection>
        <Spinner />
      </PageSection>
    );
  }

  return (
    <>
      <PageSection variant="default">
        <Content>
          <Title headingLevel="h1">{t('Tekton Configuration')}</Title>
        </Content>
      </PageSection>
      <PageSection>
        <Grid hasGutter>
          <GridItem span={12}>
            <Card>
              <CardTitle>{t('General Settings')}</CardTitle>
              <CardBody>
                <DescriptionList columnModifier={{ default: '2Col' }}>
                  <DescriptionListGroup>
                    <DescriptionListTerm>{t('Name')}</DescriptionListTerm>
                    <DescriptionListDescription>
                      {tektonConfig?.metadata?.name || 'config'}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>{t('Profile')}</DescriptionListTerm>
                    <DescriptionListDescription>
                      {tektonConfig?.spec?.profile || 'default'}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                  <DescriptionListGroup>
                    <DescriptionListTerm>{t('Target Namespace')}</DescriptionListTerm>
                    <DescriptionListDescription>
                      {tektonConfig?.spec?.targetNamespace || 'openshift-pipelines'}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                </DescriptionList>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem span={12} md={6}>
            <Card>
              <CardTitle>{t('Pipeline Settings')}</CardTitle>
              <CardBody>
                <DescriptionList>
                  <DescriptionListGroup>
                    <DescriptionListTerm>{t('Status')}</DescriptionListTerm>
                    <DescriptionListDescription>
                      {tektonConfig?.spec?.pipeline ? t('Enabled') : t('Disabled')}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                </DescriptionList>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem span={12} md={6}>
            <Card>
              <CardTitle>{t('Triggers Settings')}</CardTitle>
              <CardBody>
                <DescriptionList>
                  <DescriptionListGroup>
                    <DescriptionListTerm>{t('Status')}</DescriptionListTerm>
                    <DescriptionListDescription>
                      {tektonConfig?.spec?.trigger ? t('Enabled') : t('Disabled')}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                </DescriptionList>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem span={12} md={6}>
            <Card>
              <CardTitle>{t('Chains (Supply Chain Security)')}</CardTitle>
              <CardBody>
                <DescriptionList>
                  <DescriptionListGroup>
                    <DescriptionListTerm>{t('Status')}</DescriptionListTerm>
                    <DescriptionListDescription>
                      {tektonConfig?.spec?.chain ? t('Configured') : t('Not configured')}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                </DescriptionList>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem span={12} md={6}>
            <Card>
              <CardTitle>{t('Pruner Settings')}</CardTitle>
              <CardBody>
                <DescriptionList>
                  <DescriptionListGroup>
                    <DescriptionListTerm>{t('Status')}</DescriptionListTerm>
                    <DescriptionListDescription>
                      {tektonConfig?.spec?.pruner?.disabled ? t('Disabled') : t('Enabled')}
                    </DescriptionListDescription>
                  </DescriptionListGroup>
                  {tektonConfig?.spec?.pruner?.schedule && (
                    <DescriptionListGroup>
                      <DescriptionListTerm>{t('Schedule')}</DescriptionListTerm>
                      <DescriptionListDescription>
                        {tektonConfig.spec.pruner.schedule}
                      </DescriptionListDescription>
                    </DescriptionListGroup>
                  )}
                </DescriptionList>
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </PageSection>
    </>
  );
};

export default TektonConfigPage;
