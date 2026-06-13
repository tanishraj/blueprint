import { describe, expect, it } from 'vitest';

import {
  buildButtonContent,
  buildNodeContent,
  formatEnumLabel,
  formatRevenue,
  formatRevenueShare,
  formatRoleLabel,
  normalizeOrgChartNode,
} from './utils';

describe('OrganizationChart utils', () => {
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

    const buttonHtml = buildButtonContent(3);

    expect(html).toContain('BORROWER');
    expect(html).toContain('Acme');
    expect(buttonHtml).toContain('3');

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
