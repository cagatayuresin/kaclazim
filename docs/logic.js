/**
 * Core calculation logic for Kaç Lazım
 * @param {number} vize - Vize notu (0-100)
 * @param {number} baraj - Final barajı (0-100)
 * @param {number} gecme - Geçme notu (0-100)
 * @param {number} etki - Final etkisi yüzdesi (0-100)
 * @returns {number} - Gereken minimum final notu
 */
export function calculateRequired(vize, baraj, gecme, etki) {
  const vize_etki = 100 - etki;
  const vize_katkisi = vize * vize_etki / 100;
  
  // (vize_katkisi) + (final * etki / 100) >= gecme
  // (final * etki / 100) >= gecme - vize_katkisi
  // final >= (gecme - vize_katkisi) * 100 / etki
  
  let required = (gecme - vize_katkisi) * 100 / etki;
  
  if (required < baraj) {
    required = baraj;
  }
  
  return Math.ceil(required);
}

/**
 * Validates inputs
 */
export function validateInputs(v, fb, gn, fe) {
  if (Number.isNaN(v) || v < 0 || v > 100) return false;
  if (Number.isNaN(fb) || fb < 0 || fb > 100) return false;
  if (Number.isNaN(gn) || gn < 0 || gn > 100) return false;
  if (Number.isNaN(fe) || fe <= 0 || fe > 100) return false;
  return true;
}
