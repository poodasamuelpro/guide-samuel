'use client';

import { AppState } from '@/types';

/**
 * Génère un certificat PDF professionnel et élégant
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
  const C_DEEP     = { r: 7,   g: 59,  b: 76  }; // #073b4c
  const C_DEEP_L   = { r: 15,  g: 84,  b: 104 }; // #0f5468
  const C_TURQ     = { r: 14,  g: 168, b: 212 }; // #0ea8d4
  const C_TURQ_L   = { r: 56,  g: 198, b: 232 }; // #38c6e8
  const C_LIME     = { r: 139, g: 211, b: 70  }; // #8bd346
  const C_LIME_D   = { r: 107, g: 168, b: 50  }; // #6ba832
  const C_CREAM    = { r: 245, g: 250, b: 249 }; // #f5faf9
  const C_WHITE    = { r: 255, g: 255, b: 255 };
  const C_GRAY     = { r: 100, g: 116, b: 139 }; // slate-500
  const C_GRAY_L   = { r: 148, g: 163, b: 184 }; // slate-400

  // ── FOND CRÈME TRÈS DOUX ─────────────────────────────────────────────────
  doc.setFillColor(C_CREAM.r, C_CREAM.g, C_CREAM.b);
  doc.rect(0, 0, W, H, 'F');

  // ── BANDE SUPÉRIEURE DEEP TURQUOISE (dégradé simulé) ────────────────────
  doc.setFillColor(C_DEEP.r, C_DEEP.g, C_DEEP.b);
  doc.rect(0, 0, W, 28, 'F');
  // Accent turquoise clair bord bas de la bande
  doc.setFillColor(C_TURQ.r, C_TURQ.g, C_TURQ.b);
  doc.rect(0, 26, W, 2, 'F');

  // ── BANDE INFÉRIEURE DEEP ────────────────────────────────────────────────
  doc.setFillColor(C_DEEP.r, C_DEEP.g, C_DEEP.b);
  doc.rect(0, H - 18, W, 18, 'F');
  // Liseré lime au-dessus de la bande bas
  doc.setFillColor(C_LIME.r, C_LIME.g, C_LIME.b);
  doc.rect(0, H - 20, W, 2, 'F');

  // ── BARRE LATÉRALE GAUCHE ────────────────────────────────────────────────
  // Turquoise fin
  doc.setFillColor(C_TURQ.r, C_TURQ.g, C_TURQ.b);
  doc.rect(0, 28, 5, H - 48, 'F');

  // ── BARRE LATÉRALE DROITE ────────────────────────────────────────────────
  doc.setFillColor(C_LIME.r, C_LIME.g, C_LIME.b);
  doc.rect(W - 5, 28, 5, H - 48, 'F');

  // ── TITRE HEADER — blanc sur fond deep ───────────────────────────────────
  doc.setTextColor(C_WHITE.r, C_WHITE.g, C_WHITE.b);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('LE GUIDE DE SAMUEL  ·  FORMATION IMPORTATION — AFRIQUE DE L\'OUEST', W / 2, 12, { align: 'center' });
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(C_TURQ_L.r, C_TURQ_L.g, C_TURQ_L.b);
  doc.text('poodasamuelpro@gmail.com  ·  Ouagadougou, Burkina Faso', W / 2, 20, { align: 'center' });

  // ── LABEL "C E R T I F I C A T" — turquoise vif ─────────────────────────
  doc.setTextColor(C_TURQ.r, C_TURQ.g, C_TURQ.b);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setCharSpace(5);
  doc.text('C E R T I F I C A T', W / 2, 42, { align: 'center' });
  doc.setCharSpace(0);

  // ── TITRE "DE RÉUSSITE" — deep ───────────────────────────────────────────
  doc.setTextColor(C_DEEP.r, C_DEEP.g, C_DEEP.b);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('DE RÉUSSITE', W / 2, 55, { align: 'center' });

  // ── LIGNE DÉCORATIVE DOUBLE ───────────────────────────────────────────────
  // Ligne principale turquoise
  doc.setDrawColor(C_TURQ.r, C_TURQ.g, C_TURQ.b);
  doc.setLineWidth(1.5);
  doc.line(W / 2 - 50, 59, W / 2 + 50, 59);
  // Petite ligne lime décalée
  doc.setDrawColor(C_LIME.r, C_LIME.g, C_LIME.b);
  doc.setLineWidth(0.5);
  doc.line(W / 2 - 35, 61.5, W / 2 + 35, 61.5);

  // ── TEXTE "Ce certificat est décerné à" ───────────────────────────────────
  doc.setTextColor(C_GRAY.r, C_GRAY.g, C_GRAY.b);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Ce certificat est décerné à', W / 2, 72, { align: 'center' });

  // ── NOM DU PARTICIPANT ────────────────────────────────────────────────────
  const fullName = `${state.user.firstName} ${state.user.lastName}`;
  doc.setTextColor(C_DEEP.r, C_DEEP.g, C_DEEP.b);
  doc.setFontSize(30);
  doc.setFont('helvetica', 'bold');
  doc.text(fullName, W / 2, 88, { align: 'center' });

  // ── LIGNE SOUS LE NOM ─────────────────────────────────────────────────────
  const nameWidth = Math.min(doc.getTextWidth(fullName) + 10, 190);
  // Fond léger sous le nom
  doc.setFillColor(C_TURQ.r, C_TURQ.g, C_TURQ.b);
  doc.rect(W / 2 - nameWidth / 2, 91, nameWidth, 1, 'F');

  // ── TEXTE DE RÉUSSITE ─────────────────────────────────────────────────────
  doc.setTextColor(C_GRAY.r, C_GRAY.g, C_GRAY.b);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'normal');
  doc.text('pour avoir complété avec succès l\'intégralité de la formation', W / 2, 103, { align: 'center' });

  // ── NOM DE LA FORMATION (encadré décoratif) ───────────────────────────────
  const formTitle = '« Commander depuis la Chine et Vendre en Afrique de l\'Ouest »';
  doc.setFillColor(C_DEEP.r, C_DEEP.g, C_DEEP.b);
  doc.roundedRect(W / 2 - 108, 107, 216, 13, 3, 3, 'F');
  doc.setFillColor(C_TURQ.r, C_TURQ.g, C_TURQ.b);
  doc.roundedRect(W / 2 - 108, 107, 4, 13, 2, 0, 'F');
  doc.setTextColor(C_WHITE.r, C_WHITE.g, C_WHITE.b);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(formTitle, W / 2 + 2, 115.5, { align: 'center' });

  // ── BLOC STATS ÉLÉGANT ────────────────────────────────────────────────────
  const statsY = 126;
  // Fond subtil
  doc.setFillColor(C_WHITE.r, C_WHITE.g, C_WHITE.b);
  doc.roundedRect(W / 2 - 95, statsY, 190, 20, 4, 4, 'F');
  doc.setDrawColor(C_TURQ.r, C_TURQ.g, C_TURQ.b);
  doc.setLineWidth(0.5);
  doc.roundedRect(W / 2 - 95, statsY, 190, 20, 4, 4, 'D');

  const stats = [
    { label: '5 Modules', sub: 'complétés' },
    { label: '500 XP', sub: 'obtenus' },
    { label: '6 Simulateurs', sub: 'maîtrisés' },
    { label: '100%', sub: 'terminé' },
  ];
  stats.forEach(({ label, sub }, i) => {
    const x = W / 2 - 72 + i * 49;
    doc.setTextColor(C_DEEP.r, C_DEEP.g, C_DEEP.b);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(label, x, statsY + 9, { align: 'center' });
    doc.setTextColor(C_GRAY_L.r, C_GRAY_L.g, C_GRAY_L.b);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'normal');
    doc.text(sub, x, statsY + 15, { align: 'center' });
    if (i < stats.length - 1) {
      doc.setDrawColor(C_TURQ.r, C_TURQ.g, C_TURQ.b);
      doc.setLineWidth(0.3);
      doc.line(x + 22, statsY + 3, x + 22, statsY + 17);
    }
  });

  // ── DATE ─────────────────────────────────────────────────────────────────
  const dateStr = state.modules.find(m => m.completedAt)
    ? new Date(state.modules[state.modules.length - 1]?.completedAt ?? Date.now())
        .toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  doc.setTextColor(C_GRAY.r, C_GRAY.g, C_GRAY.b);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Délivré le ${dateStr}`, W / 2, 156, { align: 'center' });

  // ── BLOC SIGNATURE (gauche) ───────────────────────────────────────────────
  const sigX = 75;
  const sigY = 170;

  // Fond signature léger
  doc.setFillColor(C_CREAM.r, C_CREAM.g, C_CREAM.b);
  doc.roundedRect(sigX - 38, sigY - 16, 76, 28, 3, 3, 'F');
  doc.setDrawColor(C_TURQ.r, C_TURQ.g, C_TURQ.b);
  doc.setLineWidth(0.4);
  doc.roundedRect(sigX - 38, sigY - 16, 76, 28, 3, 3, 'D');

  // Barre turquoise haut du bloc signature
  doc.setFillColor(C_TURQ.r, C_TURQ.g, C_TURQ.b);
  doc.roundedRect(sigX - 38, sigY - 16, 76, 3, 3, 0, 'F');

  doc.setTextColor(C_DEEP.r, C_DEEP.g, C_DEEP.b);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Samuel Pooda', sigX, sigY - 4, { align: 'center' });

  doc.setDrawColor(C_LIME.r, C_LIME.g, C_LIME.b);
  doc.setLineWidth(0.8);
  doc.line(sigX - 20, sigY - 0.5, sigX + 20, sigY - 0.5);

  doc.setTextColor(C_GRAY.r, C_GRAY.g, C_GRAY.b);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text('Fondateur & Formateur', sigX, sigY + 5, { align: 'center' });
  doc.text('Le Guide de Samuel', sigX, sigY + 10, { align: 'center' });

  // ── SCEAU OFFICIEL (droite) ───────────────────────────────────────────────
  const sealX = W - 75;
  const sealY = 170;

  // Cercle extérieur deep
  doc.setFillColor(C_DEEP.r, C_DEEP.g, C_DEEP.b);
  doc.circle(sealX, sealY, 18, 'F');
  // Anneau turquoise
  doc.setFillColor(C_TURQ.r, C_TURQ.g, C_TURQ.b);
  doc.circle(sealX, sealY, 16, 'F');
  // Cercle intérieur deep
  doc.setFillColor(C_DEEP.r, C_DEEP.g, C_DEEP.b);
  doc.circle(sealX, sealY, 13, 'F');
  // Cercle blanc centre
  doc.setFillColor(C_WHITE.r, C_WHITE.g, C_WHITE.b);
  doc.circle(sealX, sealY, 10.5, 'F');

  // Petit accent lime
  doc.setFillColor(C_LIME.r, C_LIME.g, C_LIME.b);
  doc.circle(sealX, sealY, 1.5, 'F');

  // Texte du sceau
  doc.setTextColor(C_DEEP.r, C_DEEP.g, C_DEEP.b);
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  doc.text('GUIDE', sealX, sealY - 3, { align: 'center' });
  doc.text('SAMUEL', sealX, sealY + 3, { align: 'center' });

  // ── LOGO GS CENTRAL ──────────────────────────────────────────────────────
  const logoX = W / 2;
  const logoY = 168;

  doc.setFillColor(C_DEEP.r, C_DEEP.g, C_DEEP.b);
  doc.roundedRect(logoX - 9, logoY - 8, 18, 18, 3, 3, 'F');
  doc.setFillColor(C_TURQ.r, C_TURQ.g, C_TURQ.b);
  doc.triangle(logoX + 1, logoY - 8, logoX + 9, logoY - 8, logoX + 9, logoY - 1, 'F');

  doc.setTextColor(C_WHITE.r, C_WHITE.g, C_WHITE.b);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('G', logoX - 4.5, logoY + 6, { align: 'center' });
  doc.setTextColor(C_LIME.r, C_LIME.g, C_LIME.b);
  doc.text('S', logoX + 3.5, logoY + 6, { align: 'center' });

  // ── TEXTE BANDE BAS ───────────────────────────────────────────────────────
  doc.setTextColor(C_WHITE.r, C_WHITE.g, C_WHITE.b);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text(
    'Formation privée · Importation Chine → Afrique de l\'Ouest · poodasamuelpro@gmail.com',
    W / 2, H - 6, { align: 'center' }
  );

  // ── FILIGRANE DIAGONAL SUBTIL ─────────────────────────────────────────────
  doc.saveGraphicsState();
  doc.setTextColor(C_DEEP.r, C_DEEP.g, C_DEEP.b);
  doc.setFontSize(55);
  doc.setFont('helvetica', 'bold');
  // @ts-ignore
  doc.setGState(new doc.GState({ opacity: 0.025 }));
  doc.text('CERTIFIÉ', W / 2, H / 2 + 8, { align: 'center', angle: 35 });
  doc.restoreGraphicsState();

  // ── SAUVEGARDE ───────────────────────────────────────────────────────────
  const fileName = `certificat-guide-samuel-${state.user.firstName.toLowerCase()}-${state.user.lastName.toLowerCase()}.pdf`
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-');
  doc.save(fileName);
}
