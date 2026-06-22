import { beforeEach, describe, expect, it } from 'vitest';

import {
  buildButtonContent,
  buildNodeContent,
  formatEnumLabel,
  formatRevenue,
  formatRevenueShare,
  formatRoleLabel,
  normalizeOrgChartNode,
  resolveCssColor,
} from './utils';

describe('OrganizationChart utils', () => {
  beforeEach(() => {
    document.documentElement.style.setProperty(
      '--background-color-default',
      '#111111',
    );
    document.documentElement.style.setProperty('--text-color-white', '#ffffff');
    document.documentElement.style.setProperty('--border-color-primary', '#22aa44');
    document.documentElement.style.setProperty('--border-color-danger', '#cc3344');
    document.documentElement.style.setProperty('--border-color-default', '#445566');
    document.documentElement.style.setProperty('--text-color-default', '#101820');
    document.documentElement.style.setProperty('--text-color-caption', '#5c6773');
    document.documentElement.style.setProperty(
      '--background-color-primary-inverted',
      '#eef7f0',
    );
    document.documentElement.style.setProperty('--background-color-primary', '#2f8f5b');
    document.documentElement.style.setProperty('--text-color-primary', '#2f8f5b');
  });

  it('resolves css color expressions for export-safe inline styles', () => {
    expect(resolveCssColor('rgb(10, 20, 30)')).toBe('rgb(10, 20, 30)');
  });

  it('formats enum labels consistently', () => {
    expect(formatEnumLabel(undefined)).toBe('—');
    expect(formatEnumLabel('Primary_Risk')).toBe('Primary Risk');
  });

  it('formats role labels and suppresses not-applicable values', () => {
    expect(formatRoleLabel('not_applicable')).toBeNull();
    expect(formatRoleLabel('Borrower')).toBe('Borrower');
  });

  it('formats revenue in expected units', () => {
    expect(formatRevenue(undefined)).toBe('-');
    expect(formatRevenue(null)).toBe('-');
    expect(formatRevenue(12_000)).toBe('$12,000');
    expect(formatRevenue(1_500_000)).toBe('$1.5 M');
  });

  it('formats revenue share labels', () => {
    expect(formatRevenueShare(undefined)).toBeNull();
    expect(formatRevenueShare(0.1234)).toBe('12% of group');
  });

  it('normalizes API and internal nodes', () => {
    const apiNode = {
      id: 'n-1',
      entityName: 'Acme Holdings',
      country: {
        country_code: 'US',
      },
      entityType: 'Entity',
      role: 'Borrower',
      revenue: 2_000_000,
      revenueAllocPct: 0.3,
      securityPosition: 'Unsecured',
    };

    const normalizedApiNode = normalizeOrgChartNode(apiNode);

    expect(normalizedApiNode).toMatchObject({
      id: 'n-1',
      parentId: null,
      name: 'Acme Holdings',
      position: 'Entity',
      countryCode: 'US',
      securityPosition: 'Unsecured',
      role: 'Borrower',
    });

    const plainNode = {
      id: 'n-2',
      parentId: null,
      name: 'Beta Holdings',
      position: 'Issuer',
      countryName: 'United Kingdom',
      entityType: 'Issuer',
      role: null,
    };

    const normalizedPlainNode = normalizeOrgChartNode(plainNode);

    expect(normalizedPlainNode.securityPosition).toBe('Secured');
  });

  it('renders node and button templates', () => {
    const html = buildNodeContent(
      {
        id: 'n-3',
        parentId: null,
        name: 'Acme',
        position: 'Entity',
        countryName: 'United Kingdom',
        countryCode: null,
        role: 'Borrower',
        revenue: 1200,
        securityPosition: 'Unsecured',
      },
      300,
      120,
    );

    const buttonHtml = buildButtonContent({
      data: {
        id: 'n-3',
        parentId: null,
        name: 'Acme',
        position: 'Entity',
        _directSubordinates: 3,
      },
      children: [{}],
    });
    const collapsedButtonHtml = buildButtonContent({
      data: {
        id: 'n-4',
        parentId: null,
        name: 'Gamma',
        position: 'Subsidiary',
        _directSubordinates: 2,
      },
    });

    expect(html).toContain('BORROWER');
    expect(html).toContain('Acme');
    expect(buttonHtml).toContain('3');
    expect(html).not.toContain('color-mix(');
    expect(html).not.toContain('var(--border-color');
    expect(html).not.toContain('var(--background-color');
    expect(html).not.toContain('var(--text-color');
    expect(buttonHtml).not.toContain('var(--border-color');
    expect(buttonHtml).not.toContain('var(--background-color');
    expect(buttonHtml).not.toContain('var(--text-color');
    expect(buttonHtml).not.toContain('color-mix(');
    expect(collapsedButtonHtml).not.toContain('var(--border-color');
    expect(collapsedButtonHtml).not.toContain('var(--background-color');
    expect(collapsedButtonHtml).not.toContain('var(--text-color');
    expect(collapsedButtonHtml).not.toContain('color-mix(');

    const secondaryHtml = buildNodeContent(
      {
        id: 'n-4',
        parentId: null,
        name: 'Gamma',
        position: 'Subsidiary',
        companyCode: 'US',
        role: null,
        securityPosition: 'Secured',
        countryCode: 'US',
      },
      280,
      110,
    );

    expect(secondaryHtml).toContain('Headcount');
    expect(secondaryHtml).toContain('Gamma');
    expect(secondaryHtml).toContain('Subsidiary');
  });
});
