import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';
import type { ReportData } from '@/app/(dashboard)/report/[id]/ReportClient';

// Register standard fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf', fontWeight: 700 }
  ]
});

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Inter',
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  logo: {
    fontSize: 16,
    fontWeight: 700,
    letterSpacing: 2,
    marginBottom: 30,
    color: '#4f46e5',

  },
  header: {
    marginBottom: 30,
    borderBottom: '1 solid #eaeaea',
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 8,
    lineHeight: 1.3,
  },
  subtitle: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 12,
    borderBottom: '1 solid #eef2ff',
    paddingBottom: 6,
    color: '#4f46e5',

  },
  text: {
    fontSize: 10,
    lineHeight: 1.6,
    marginBottom: 8,
    color: '#333333',
  },
  bold: {
    fontWeight: 700,
    color: '#111827',

  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  col: {
    flex: 1,
  },
  card: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    marginBottom: 10,
  },
  badge: {
    padding: '4 8',
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 600,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
    padding: 20,
    backgroundColor: '#f5f3ff',
    borderRadius: 8,
    border: '1 solid #ddd6fe',

  },
  scoreBadge: {
    fontSize: 24,
    fontWeight: 700,
    marginRight: 20,
    color: '#4f46e5',
  },

  scoreTextContainer: {
    flex: 1,
  },
  scoreTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 6,
  },
  scoreReason: {
    fontSize: 10,
    color: '#444444',
    lineHeight: 1.6,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 10,
    color: '#999999',
    borderTop: '1 solid #eaeaea',
    paddingTop: 10,
  }
});

interface ReportPDFProps {
  data: ReportData;
}

export const ReportPDF: React.FC<ReportPDFProps> = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.logo}>VALIDLY</Text>
        <View style={styles.header}>
          <Text style={styles.title}>{data.ideaTitle}</Text>
          <Text style={styles.subtitle}>Generated on {data.generatedAt} | Validly Executive Intelligence Report</Text>
        </View>

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreBadge}>{data.viabilityScore}/100</Text>
          <View style={styles.scoreTextContainer}>
            <Text style={styles.scoreTitle}>Viability Score: {data.verdict.toUpperCase()}</Text>
            <Text style={styles.scoreReason}>{data.verdictReason}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Executive Analyst Verdict</Text>
          <Text style={styles.text}>{data.honestVerdict}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Market Size & Dynamics</Text>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.bold}>Total Addressable Market (TAM)</Text>
              <Text style={styles.text}>{data.marketSize.tam}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.bold}>Serviceable Addressable (SAM)</Text>
              <Text style={styles.text}>{data.marketSize.sam}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.bold}>Serviceable Obtainable (SOM)</Text>
              <Text style={styles.text}>{data.marketSize.som}</Text>
            </View>
          </View>
          <Text style={styles.text}><Text style={styles.bold}>Market Trend:</Text> {data.marketSize.trend}</Text>
        </View>

        {data.marketInsights && data.marketInsights.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Market Insights</Text>
            {data.marketInsights.map((insight, idx) => (
              <Text key={idx} style={styles.text}>• {insight}</Text>
            ))}
          </View>
        )}

        <View style={styles.footer}>
          <Text>Validly Executive Report - Page 1</Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Competitive Analysis</Text>
          {data.competitors && data.competitors.map((comp, idx) => (
            <View key={idx} style={styles.card}>
              <Text style={[styles.title, { fontSize: 14 }]}>{comp.name}</Text>
              <Text style={styles.subtitle}>{comp.url}</Text>
              <View style={{ marginTop: 8 }}>
                <Text style={styles.text}><Text style={styles.bold}>Key Difference:</Text> {comp.keyDifference}</Text>
                <Text style={styles.text}><Text style={styles.bold}>Strength:</Text> {comp.strength}</Text>
                <Text style={styles.text}><Text style={styles.bold}>Weakness:</Text> {comp.weakness}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text>Validly Executive Report - Page 2</Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Target Audience</Text>
          {data.targetAudience && data.targetAudience.map((persona, idx) => (
            <View key={idx} style={{ marginBottom: 16 }}>
              <Text style={styles.bold}>{persona.title} ({persona.type})</Text>
              <Text style={styles.text}>{persona.description}</Text>
              <Text style={[styles.bold, { marginTop: 4, fontSize: 10 }]}>Core Pain Points:</Text>
              {persona.painPoints && persona.painPoints.map((pain, i) => (
                <Text key={i} style={styles.text}>- {pain}</Text>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Identified Risks & Mitigations</Text>
          {data.risks && data.risks.map((risk, idx) => (
            <View key={idx} style={styles.card}>
              <View style={styles.row}>
                <Text style={[styles.bold, { flex: 1 }]}>{risk.category} Risk</Text>
                <Text style={[styles.text, { fontWeight: 700, color: risk.severity === 'high' ? '#f43f5e' : '#f59e0b' }]}>Severity: {risk.severity.toUpperCase()}</Text>

              </View>
              <Text style={styles.text}>{risk.description}</Text>
              <Text style={[styles.text, { marginTop: 4 }]}><Text style={styles.bold}>Mitigation:</Text> {risk.mitigation}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text>Validly Executive Report - Page 3</Text>
        </View>
      </Page>

      {data.mvpFeatures && data.mvpFeatures.length > 0 && (
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>MVP Execution Roadmap</Text>
            {data.mvpFeatures.map((feat, idx) => (
              <View key={idx} style={styles.card}>
                <View style={styles.row}>
                   <Text style={[styles.bold, { flex: 1 }]}>{feat.title}</Text>
                   <Text style={[styles.text, { fontWeight: 700, color: '#666' }]}>Timeline: {feat.timeline}</Text>
                </View>
                <Text style={styles.text}>{feat.description}</Text>
                <Text style={[styles.text, { marginTop: 4, fontWeight: 700, fontSize: 9 }]}>Priority: {feat.priority.toUpperCase()}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.footer}>
            <Text>Validly Executive Report - Page 4</Text>
          </View>
        </Page>
      )}
    </Document>
  );
};
