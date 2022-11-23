// list of challenge ids relevant to ARAM
export const AramChallengeIds = new Set([
  // ARAM Authority Category
  "101000", // ARAM Authority Main

  // ARAM Warrior Category
  "101100", // ARAM Warrior Main
  "101102", // Double Decimation
  "101107", // Takedowns
  "101104", // Kill oppoent with recent health pack
  "101105", // Kill near enemy turret
  "101103", // Go Legendary
  "101108", // Solo carry (TD > 40%)
  "101106", // Pentakill
  "101101", // >1800 DPM

  // ARAM Finesse Category
  "101200", // ARAM Finesse Main
  "101201", // Hit skillshots
  "101202", // Dodge skillshots
  // "101206", // Poro Explosion
  "101203", // Hit snowball
  "101205", // Execute to turret before 10 min
  "101204", // Kill minions

  // ARAM Champion Category
  "101300", // ARAM Champion Main
  "101305", // Over 90% KP
  "101307", // Win ARAM Games
  "101301", // Earn S- on different champions
  "2022002", // Take first turret before 5 min
  "101304", // Win ARAM before 10 min
  "101306", // Win ARAM without being killed by enemy 
  "101302", // Earn S grade or higher
])