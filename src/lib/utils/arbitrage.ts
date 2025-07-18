/**
 * Devuelve “T” (beneficio igualado) y apuestas contrarias B_i.
 *   stake          = S
 *   combinedOdds   = C
 *   oppositeOdds[] = O_i
 */
export const computeArbitrage = (
  stake: number,
  combinedOdds: number,
  oppositeOdds: number[],
) => {
  let α = 0;          // coeficiente de T en ΣB
  let β = 0;          // término independiente en ΣB
  const coeffs: Array<{ a: number; b: number }> = [];

  for (const O of oppositeOdds) {
    const δ   = O - 1;
    const a_i = (1 + α) / δ;
    const b_i = (stake + β) / δ;

    coeffs.push({ a: a_i, b: b_i });

    α += a_i;
    β += b_i;
  }

  const equalResult = (stake * (combinedOdds - 1) - β) / (1 + α);

  const lineStakes = coeffs.map(({ a, b }) => a * equalResult + b);

  return { equalResult, lineStakes };
};