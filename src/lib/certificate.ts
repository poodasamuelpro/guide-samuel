'use client';

import { AppState } from '@/types';

/**
 * Génère un certificat PDF professionnel et épuré
 * Charte graphique : turquoise (#073b4c, #0ea8d4) + lime (#8bd346)
 */
export async function generateCertificate(state: AppState): Promise<void> {
  if (!state.user) return;

  const jsPDF = (await import('jspdf')).default;

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const W = 297;
  const H = 210;

  // ── PALETTE ─────────────────────────────────────────────────────────────
  const C_DEEP  = { r: 7,   g: 59,  b: 76  }; // #073b4c
  const C_TURQ  = { r: 14,  g: 168, b: 212 }; // #0ea8d4
  const C_LIME  = { r: 139, g: 211, b: 70  }; // #8bd346
  const C_WHITE = { r: 255, g: 255, b: 255 };
  const C_GRAY  = { r: 100, g: 116, b: 139 }; // slate-500

  // ── FOND BLANC ────────────────────────────────────────────────────────────
  doc.setFillColor(C_WHITE.r, C_WHITE.g, C_WHITE.b);
  doc.rect(0, 0, W, H, 'F');

  // ── CADRE EXTÉRIEUR FIN (deep) ────────────────────────────────────────────
  doc.setDrawColor(C_DEEP.r, C_DEEP.g, C_DEEP.b);
  doc.setLineWidth(1.2);
  doc.rect(8, 8, W - 16, H - 16, 'D');

  // ── CADRE INTÉRIEUR FIN (turquoise) ───────────────────────────────────────
  doc.setDrawColor(C_TURQ.r, C_TURQ.g, C_TURQ.b);
  doc.setLineWidth(0.4);
  doc.rect(11.5, 11.5, W - 23, H - 23, 'D');

  // ── LISERÉS D'ANGLE (lime) — 4 coins ──────────────────────────────────────
  const cornerLen = 12;
  doc.setDrawColor(C_LIME.r, C_LIME.g, C_LIME.b);
  doc.setLineWidth(1.4);
  // haut-gauche
  doc.line(8, 8, 8 + cornerLen, 8);
  doc.line(8, 8, 8, 8 + cornerLen);
  // haut-droit
  doc.line(W - 8, 8, W - 8 - cornerLen, 8);
  doc.line(W - 8, 8, W - 8, 8 + cornerLen);
  // bas-gauche
  doc.line(8, H - 8, 8 + cornerLen, H - 8);
  doc.line(8, H - 8, 8, H - 8 - cornerLen);
  // bas-droit
  doc.line(W - 8, H - 8, W - 8 - cornerLen, H - 8);
  doc.line(W - 8, H - 8, W - 8, H - 8 - cornerLen);

  // ── EN-TÊTE INSTITUTION ────────────────────────────────────────────────────
  doc.setTextColor(C_DEEP.r, C_DEEP.g, C_DEEP.b);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('LE GUIDE DE SAMUEL', W / 2, 28, { align: 'center' });

  doc.setTextColor(C_GRAY.r, C_GRAY.g, C_GRAY.b);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Formation Importation Chine - Afrique de l\'Ouest', W / 2, 34, { align: 'center' });

  // petit trait lime sous l'en-tête
  doc.setDrawColor(C_LIME.r, C_LIME.g, C_LIME.b);
  doc.setLineWidth(0.8);
  doc.line(W / 2 - 15, 38, W / 2 + 15, 38);

  // ── TITRE "CERTIFICAT DE RÉUSSITE" — bien visible ────────────────────────
  doc.setTextColor(C_TURQ.r, C_TURQ.g, C_TURQ.b);
  doc.setFontSize(34);
  doc.setFont('helvetica', 'bold');
  doc.setCharSpace(3);
  doc.text('CERTIFICAT', W / 2, 56, { align: 'center' });
  doc.setCharSpace(0);

  doc.setTextColor(C_DEEP.r, C_DEEP.g, C_DEEP.b);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'normal');
  doc.setCharSpace(4);
  doc.text('DE REUSSITE', W / 2, 65, { align: 'center' });
  doc.setCharSpace(0);

  // ── TEXTE INTRO ────────────────────────────────────────────────────────────
  doc.setTextColor(C_GRAY.r, C_GRAY.g, C_GRAY.b);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Ce certificat est fièrement décerné à', W / 2, 82, { align: 'center' });

  // ── NOM DU PARTICIPANT ────────────────────────────────────────────────────
  const fullName = `${state.user.firstName} ${state.user.lastName}`;
  doc.setTextColor(C_DEEP.r, C_DEEP.g, C_DEEP.b);
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.text(fullName, W / 2, 98, { align: 'center' });

  // ligne turquoise sous le nom
  const nameWidth = Math.min(doc.getTextWidth(fullName) + 16, 180);
  doc.setDrawColor(C_TURQ.r, C_TURQ.g, C_TURQ.b);
  doc.setLineWidth(0.6);
  doc.line(W / 2 - nameWidth / 2, 103, W / 2 + nameWidth / 2, 103);

  // ── PARAGRAPHE DE RÉUSSITE ────────────────────────────────────────────────
  doc.setTextColor(C_GRAY.r, C_GRAY.g, C_GRAY.b);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('pour avoir complété avec succès l\'intégralité de la formation', W / 2, 114, { align: 'center' });

  doc.setTextColor(C_DEEP.r, C_DEEP.g, C_DEEP.b);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bolditalic');
  doc.text('« Commander depuis la Chine et Vendre en Afrique de l\'Ouest »', W / 2, 123, { align: 'center' });

  // ── STATS — texte simple sans encadré ni tableau ──────────────────────────
  doc.setDrawColor(C_LIME.r, C_LIME.g, C_LIME.b);
  doc.setLineWidth(0.4);
  doc.line(W / 2 - 70, 132, W / 2 + 70, 132);

  const stats = '5 Modules   •   500 XP   •   6 Simulateurs   •   100% Terminé';
  doc.setTextColor(C_DEEP.r, C_DEEP.g, C_DEEP.b);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(stats, W / 2, 140, { align: 'center' });

  // ── DATE ─────────────────────────────────────────────────────────────────
  const dateStr = state.modules.find(m => m.completedAt)
    ? new Date(state.modules[state.modules.length - 1]?.completedAt ?? Date.now())
        .toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  doc.setTextColor(C_GRAY.r, C_GRAY.g, C_GRAY.b);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'italic');
  doc.text(`Délivré le ${dateStr}`, W / 2, 150, { align: 'center' });

  // ── SIGNATURE (unique, centrée en bas) ────────────────────────────────────
  const sigY = 172;

  doc.setDrawColor(C_DEEP.r, C_DEEP.g, C_DEEP.b);
  doc.setLineWidth(0.5);
  doc.line(W / 2 - 35, sigY, W / 2 + 35, sigY);

  doc.setTextColor(C_DEEP.r, C_DEEP.g, C_DEEP.b);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Samuel Pooda', W / 2, sigY + 6, { align: 'center' });

  doc.setTextColor(C_GRAY.r, C_GRAY.g, C_GRAY.b);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Fondateur & Formateur - Le Guide de Samuel', W / 2, sigY + 11, { align: 'center' });

  // ── PIED DE PAGE (une seule ligne, sans caractères spéciaux) ───────────────
  doc.setDrawColor(C_TURQ.r, C_TURQ.g, C_TURQ.b);
  doc.setLineWidth(0.3);
  doc.line(30, H - 20, W - 30, H - 20);

  doc.setTextColor(C_GRAY.r, C_GRAY.g, C_GRAY.b);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text(
    'Formation privee - Importation Chine vers Afrique de l\'Ouest - poodasamuelpro@gmail.com',
    W / 2, H - 15, { align: 'center' }
  );

  // ── SAUVEGARDE ───────────────────────────────────────────────────────────
  const fileName = `certificat-guide-samuel-${state.user.firstName.toLowerCase()}-${state.user.lastName.toLowerCase()}.pdf`
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
  doc.save(fileName);
}