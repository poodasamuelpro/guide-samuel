'use client';

import { AppState } from '@/types';

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

  // ── FOND BLANC CREME ─────────────────────────────────────────────────────
  doc.setFillColor(254, 252, 248); // crème très doux
  doc.rect(0, 0, W, H, 'F');

  // ── BANDE NAVY EN HAUT ───────────────────────────────────────────────────
  doc.setFillColor(26, 42, 74); // navy
  doc.rect(0, 0, W, 22, 'F');

  // ── BANDE ORANGE EN BAS ──────────────────────────────────────────────────
  doc.setFillColor(242, 153, 74); // orange
  doc.rect(0, H - 14, W, 14, 'F');

  // ── BARRE VERTICALE ORANGE GAUCHE ────────────────────────────────────────
  doc.setFillColor(242, 153, 74);
  doc.rect(0, 22, 8, H - 36, 'F');

  // ── BARRE VERTICALE NAVY DROITE ───────────────────────────────────────────
  doc.setFillColor(26, 42, 74);
  doc.rect(W - 8, 22, 8, H - 36, 'F');

  // ── TITRE HEADER (blanc sur navy) ────────────────────────────────────────
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('LE GUIDE DE SAMUEL  ·  FORMATION IMPORTATION AFRIQUE DE L\'OUEST', W / 2, 13, { align: 'center' });

  // ── LABEL "CERTIFICAT" ───────────────────────────────────────────────────
  doc.setTextColor(242, 153, 74);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('C  E  R  T  I  F  I  C  A  T', W / 2, 36, { align: 'center' });

  // ── TITRE PRINCIPAL ───────────────────────────────────────────────────────
  doc.setTextColor(26, 42, 74);
  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.text('DE RÉUSSITE', W / 2, 50, { align: 'center' });

  // ── LIGNE DÉCORATIVE SOUS LE TITRE ───────────────────────────────────────
  doc.setDrawColor(242, 153, 74);
  doc.setLineWidth(1.5);
  doc.line(W / 2 - 40, 55, W / 2 + 40, 55);
  doc.setLineWidth(0.4);
  doc.line(W / 2 - 55, 57, W / 2 + 55, 57);

  // ── "Ce certificat est décerné à" ─────────────────────────────────────────
  doc.setTextColor(100, 115, 140);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Ce certificat est décerné à', W / 2, 70, { align: 'center' });

  // ── NOM DU PARTICIPANT ────────────────────────────────────────────────────
  const fullName = `${state.user.firstName} ${state.user.lastName}`;
  doc.setTextColor(26, 42, 74);
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.text(fullName, W / 2, 88, { align: 'center' });

  // ── LIGNE SOUS LE NOM ─────────────────────────────────────────────────────
  const nameWidth = Math.min(doc.getTextWidth(fullName), 180);
  doc.setDrawColor(242, 153, 74);
  doc.setLineWidth(1.2);
  doc.line(W / 2 - nameWidth / 2, 92, W / 2 + nameWidth / 2, 92);

  // ── TEXTE DE RÉUSSITE ─────────────────────────────────────────────────────
  doc.setTextColor(80, 95, 120);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'normal');
  doc.text('pour avoir complété avec succès l\'intégralité de la formation', W / 2, 103, { align: 'center' });

  // ── NOM DE LA FORMATION ───────────────────────────────────────────────────
  doc.setTextColor(26, 42, 74);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('« Commander depuis la Chine et Vendre en Afrique de l\'Ouest »', W / 2, 114, { align: 'center' });

  // ── BLOC STATS ────────────────────────────────────────────────────────────
  // Fond léger
  doc.setFillColor(240, 245, 255);
  doc.roundedRect(W / 2 - 90, 120, 180, 22, 4, 4, 'F');
  doc.setDrawColor(200, 215, 240);
  doc.setLineWidth(0.5);
  doc.roundedRect(W / 2 - 90, 120, 180, 22, 4, 4, 'D');

  // Stats texte
  const stats = [
    { label: '5 Modules', sub: 'complétés' },
    { label: '500 XP', sub: 'obtenus' },
    { label: '6 Simulateurs', sub: 'maîtrisés' },
    { label: '100%', sub: 'terminé' },
  ];
  stats.forEach(({ label, sub }, i) => {
    const x = W / 2 - 67 + i * 46;
    doc.setTextColor(26, 42, 74);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(label, x, 129, { align: 'center' });
    doc.setTextColor(130, 145, 170);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text(sub, x, 135, { align: 'center' });

    // Séparateur vertical
    if (i < stats.length - 1) {
      doc.setDrawColor(200, 215, 240);
      doc.setLineWidth(0.4);
      doc.line(x + 20, 122, x + 20, 140);
    }
  });

  // ── DATE ─────────────────────────────────────────────────────────────────
  const dateStr = state.modules.find(m => m.completedAt)
    ? new Date(state.modules[state.modules.length - 1]?.completedAt ?? Date.now())
        .toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  doc.setTextColor(130, 145, 170);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`Délivré le ${dateStr}`, W / 2, 153, { align: 'center' });

  // ── SIGNATURE À GAUCHE ────────────────────────────────────────────────────
  const sigX = 80;
  doc.setDrawColor(26, 42, 74);
  doc.setLineWidth(0.6);
  doc.line(sigX - 28, 168, sigX + 28, 168);

  doc.setTextColor(26, 42, 74);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Samuel Pooda', sigX, 165, { align: 'center' });

  doc.setTextColor(130, 145, 170);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Fondateur & Formateur', sigX, 173, { align: 'center' });
  doc.text('Le Guide de Samuel', sigX, 178, { align: 'center' });

  // ── SCEAU À DROITE ────────────────────────────────────────────────────────
  const sealX = W - 80;
  const sealY = 168;

  // Cercle extérieur orange
  doc.setFillColor(242, 153, 74);
  doc.circle(sealX, sealY, 16, 'F');
  // Cercle intérieur navy
  doc.setFillColor(26, 42, 74);
  doc.circle(sealX, sealY, 13, 'F');
  // Cercle intérieur blanc
  doc.setFillColor(255, 255, 255);
  doc.circle(sealX, sealY, 10, 'F');

  // Texte du sceau
  doc.setTextColor(26, 42, 74);
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.text('GUIDE', sealX, sealY - 1.5, { align: 'center' });
  doc.text('SAMUEL', sealX, sealY + 4.5, { align: 'center' });

  // ── LOGO GS AU CENTRE ────────────────────────────────────────────────────
  doc.setFillColor(26, 42, 74);
  doc.roundedRect(W / 2 - 8, 161, 16, 16, 3, 3, 'F');
  doc.setFillColor(242, 153, 74);
  doc.triangle(W / 2 + 2, 161, W / 2 + 8, 161, W / 2 + 8, 167, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('G', W / 2 - 4, 173, { align: 'center' });

  doc.setTextColor(242, 153, 74);
  doc.text('S', W / 2 + 3, 173, { align: 'center' });

  // ── TEXTE BANDE ORANGE BAS ───────────────────────────────────────────────
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(
    'Formation privée · Importation Chine → Afrique de l\'Ouest · poodasamuelpro@gmail.com',
    W / 2, H - 5, { align: 'center' }
  );

  // ── FILIGRANE DIAGONAL ───────────────────────────────────────────────────
  doc.saveGraphicsState();
  doc.setTextColor(26, 42, 74);
  doc.setFontSize(60);
  doc.setFont('helvetica', 'bold');
  // @ts-ignore
  doc.setGState(new doc.GState({ opacity: 0.03 }));
  doc.text('CERTIFIÉ', W / 2, H / 2 + 10, { align: 'center', angle: 35 });
  doc.restoreGraphicsState();

  // ── SAUVEGARDE ───────────────────────────────────────────────────────────
  const fileName = `certificat-guide-samuel-${state.user.firstName.toLowerCase()}-${state.user.lastName.toLowerCase()}.pdf`
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
  doc.save(fileName);
}
