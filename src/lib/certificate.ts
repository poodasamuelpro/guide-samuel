'use client';

import { AppState } from '@/types';

export async function generateCertificate(state: AppState): Promise<void> {
  if (!state.user) return;

  // Dynamic import to avoid SSR issues
  const jsPDF = (await import('jspdf')).default;

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const W = 297;
  const H = 210;

  // ── Background ──────────────────────────────────────────────────────────────
  doc.setFillColor(26, 42, 74); // #1a2a4a
  doc.rect(0, 0, W, H, 'F');

  // ── Decorative border (outer) ─────────────────────────────────────────────
  doc.setDrawColor(242, 153, 74); // orange
  doc.setLineWidth(2);
  doc.rect(8, 8, W - 16, H - 16);
  doc.setLineWidth(0.5);
  doc.rect(12, 12, W - 24, H - 24);

  // ── Corner ornaments ──────────────────────────────────────────────────────
  const corners = [[14, 14], [W - 14, 14], [14, H - 14], [W - 14, H - 14]];
  doc.setFillColor(242, 153, 74);
  corners.forEach(([x, y]) => doc.circle(x, y, 2, 'F'));

  // ── Header ────────────────────────────────────────────────────────────────
  doc.setTextColor(242, 153, 74);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('LE GUIDE DE SAMUEL', W / 2, 30, { align: 'center' });

  // ── Seal / Badge ──────────────────────────────────────────────────────────
  doc.setFillColor(242, 153, 74);
  doc.circle(W / 2, 60, 18, 'F');
  doc.setFillColor(26, 42, 74);
  doc.circle(W / 2, 60, 15, 'F');
  doc.setTextColor(242, 153, 74);
  doc.setFontSize(22);
  doc.text('🏆', W / 2, 65, { align: 'center' });

  // ── Title ─────────────────────────────────────────────────────────────────
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('CERTIFICAT DE COMPLETION', W / 2, 88, { align: 'center', charSpace: 3 });

  // ── Recipient ─────────────────────────────────────────────────────────────
  doc.setTextColor(242, 153, 74);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  const fullName = `${state.user.firstName} ${state.user.lastName}`;
  doc.text(fullName, W / 2, 108, { align: 'center' });

  // ── Underline ─────────────────────────────────────────────────────────────
  const nameWidth = doc.getTextWidth(fullName);
  doc.setDrawColor(242, 153, 74);
  doc.setLineWidth(0.8);
  doc.line(W / 2 - nameWidth / 2, 112, W / 2 + nameWidth / 2, 112);

  // ── Description ──────────────────────────────────────────────────────────
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('a complété avec succès la formation', W / 2, 124, { align: 'center' });

  doc.setTextColor(242, 153, 74);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Commander et Vendre en Chine', W / 2, 136, { align: 'center' });

  doc.setTextColor(200, 220, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('5 modules complétés · 500 XP obtenus · Maîtrise de l\'importation depuis la Chine', W / 2, 146, { align: 'center' });

  // ── Date ─────────────────────────────────────────────────────────────────
  const dateStr = state.modules.find(m => m.completedAt)
    ? new Date(state.modules[state.modules.length - 1]?.completedAt ?? Date.now()).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  doc.setTextColor(150, 170, 210);
  doc.setFontSize(9);
  doc.text(`Délivré le ${dateStr}`, W / 2, 160, { align: 'center' });

  // ── Signature ────────────────────────────────────────────────────────────
  doc.setTextColor(242, 153, 74);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Samuel', W / 2, 178, { align: 'center' });
  doc.setDrawColor(242, 153, 74);
  doc.setLineWidth(0.5);
  doc.line(W / 2 - 20, 180, W / 2 + 20, 180);
  doc.setTextColor(150, 170, 210);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Formateur  --  Le Guide de Samuel', W / 2, 186, { align: 'center' });

  // ── Footer ────────────────────────────────────────────────────────────────
  doc.setTextColor(80, 100, 140);
  doc.setFontSize(7);
  doc.text('Formation privée · Importation depuis la Chine · Afrique de l\'Ouest', W / 2, 196, { align: 'center' });

  // ── Save ──────────────────────────────────────────────────────────────────
  const fileName = `certificat-guide-samuel-${state.user.firstName.toLowerCase()}-${state.user.lastName.toLowerCase()}.pdf`
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
  doc.save(fileName);
}
