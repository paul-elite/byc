-- Create byc_blogs table
CREATE TABLE IF NOT EXISTS byc_blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  author_role TEXT NOT NULL,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  cover_image TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  reading_time INTEGER DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE byc_blogs ENABLE ROW LEVEL SECURITY;

-- Public read access for published posts
CREATE POLICY "Public can read published byc_blogs"
  ON byc_blogs
  FOR SELECT
  USING (status = 'published');

-- Service role has full access (for admin panel)
CREATE POLICY "Service role has full access on byc_blogs"
  ON byc_blogs
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER byc_blogs_updated_at
  BEFORE UPDATE ON byc_blogs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Insert sample blog posts
INSERT INTO byc_blogs (slug, title, excerpt, content, author, author_role, cover_image, tags, status, reading_time, published_at) VALUES
(
  'understanding-statutory-audits-nigeria',
  'Understanding Statutory Audits in Nigeria',
  'A comprehensive guide to statutory audit requirements, compliance frameworks, and best practices for Nigerian businesses navigating regulatory obligations.',
  '## Introduction

Statutory audits are a fundamental requirement for companies operating in Nigeria. As mandated by the Companies and Allied Matters Act (CAMA) 2020, every company registered in Nigeria must have its financial statements audited annually by an independent external auditor.

## Who Requires a Statutory Audit?

Under Nigerian law, the following entities are required to undergo statutory audits:

- **Public Limited Companies (PLCs)**: All publicly traded companies must submit audited financial statements to the Securities and Exchange Commission (SEC)
- **Private Limited Companies**: Companies with turnover exceeding ₦120 million annually
- **Banks and Financial Institutions**: Subject to additional oversight by the Central Bank of Nigeria (CBN)
- **Insurance Companies**: Regulated by the National Insurance Commission (NAICOM)

## The Audit Process

### 1. Planning and Risk Assessment

The auditor begins by understanding the client''s business environment, internal controls, and identifying areas of significant risk.

### 2. Substantive Testing

This phase involves detailed examination of financial transactions, balances, supporting documentation, and third-party confirmations.

### 3. Reporting

The auditor issues an opinion on whether the financial statements present a true and fair view of the company''s financial position.

## How BYC Can Help

At Babatunde Yunus & Co., our team of experienced chartered accountants provides comprehensive audit services tailored to your business needs.

> **Contact us today** to discuss your statutory audit requirements.',
  'Babatunde Yunus',
  'Managing Partner',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2011&auto=format&fit=crop',
  ARRAY['Audit', 'Compliance', 'CAMA', 'Regulations'],
  'published',
  6,
  '2026-01-15T09:00:00Z'
),
(
  'tax-planning-strategies-smes',
  'Tax Planning Strategies for SMEs',
  'Discover effective tax optimization strategies that can help small and medium enterprises reduce their tax burden while maintaining full compliance with Nigerian tax laws.',
  '## Introduction

For small and medium enterprises (SMEs) in Nigeria, effective tax planning is not about tax evasion—it''s about smart financial management.

## Understanding Nigeria''s Tax Framework

Nigerian SMEs are subject to several taxes:

- **Companies Income Tax (CIT)**: 30% for large companies, 20% for medium, 0% for small companies (turnover below ₦25 million)
- **Value Added Tax (VAT)**: 7.5% on goods and services
- **Withholding Tax (WHT)**: Varies from 5-10% depending on transaction type

## Key Tax Planning Strategies

### 1. Choose the Right Business Structure

Your business structure significantly impacts your tax obligations.

### 2. Maximize Allowable Deductions

Ensure you claim all legitimate business expenses including office rent, employee salaries, professional fees, and depreciation on assets.

### 3. Take Advantage of Tax Incentives

Nigeria offers several incentives including Pioneer Status (3-5 years tax holiday), Export Free Zone benefits, and rural location allowances.

## The BYC Advantage

Our tax advisory team stays current with all regulatory changes to ensure your business benefits from every available opportunity.

> **Schedule a consultation** with our tax specialists to develop a customized tax strategy for your business.',
  'Adeola Johnson',
  'Tax Director',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
  ARRAY['Tax Planning', 'SME', 'Business Strategy', 'Compliance'],
  'published',
  7,
  '2026-01-28T10:30:00Z'
),
(
  'chartered-accountants-corporate-governance',
  'The Role of Chartered Accountants in Corporate Governance',
  'Exploring how professional accountants contribute to organizational integrity, transparency, and sustainable business practices in modern corporations.',
  '## Introduction

In an era of increasing regulatory scrutiny and stakeholder expectations, corporate governance has never been more critical. Chartered accountants play a pivotal role in establishing, implementing, and monitoring governance frameworks.

## What is Corporate Governance?

Corporate governance encompasses the systems, principles, and processes by which companies are directed and controlled.

## The Accountant''s Role

### 1. Financial Reporting and Transparency

Chartered accountants ensure that financial statements present a true and fair view, comply with relevant standards, and include all necessary disclosures.

### 2. Internal Control Systems

We design and evaluate systems that safeguard company assets, prevent and detect fraud, and ensure accuracy of financial records.

### 3. Risk Management

Professional accountants contribute by identifying financial and operational risks, developing mitigation strategies, and reporting to the board.

### 4. Ethical Leadership

As professionals bound by strict codes of ethics, chartered accountants promote integrity, maintain objectivity, and uphold confidentiality.

## How BYC Supports Good Governance

Our governance advisory services include board effectiveness reviews, internal control assessments, corporate governance training, and regulatory compliance audits.

> **Partner with BYC** to strengthen your organization''s governance framework and build stakeholder confidence.',
  'Chukwuma Obi',
  'Audit Partner',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop',
  ARRAY['Corporate Governance', 'Professional Standards', 'Ethics', 'Leadership'],
  'published',
  8,
  '2026-02-03T14:00:00Z'
);
