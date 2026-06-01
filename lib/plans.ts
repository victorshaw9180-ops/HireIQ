export const PLAN_CONFIG = {
  free: {
    planId: "free",
    uiName: "Free Trial",

    monthlyPrice: 0,
    monthlyPriceUSD: 0,

    aiCredits: 20,
    resumePool: 50,
    activeJobs: 2,

    recruiterSeats: 1,

    bulkEmail: false,
    teamManagement: false,
    advancedAnalytics: false,

    trialDays: 15,
  },

  starter: {
    planId: "starter",
    uiName: "Scout",

    monthlyPrice: 349,
    monthlyPriceUSD: 10,

    aiCredits: 200,
    resumePool: 500,
    activeJobs: 5,

    recruiterSeats: 1,

    bulkEmail: false,
    teamManagement: false,
    advancedAnalytics: false,
  },

  growth: {
    planId: "growth",
    uiName: "Hunter",

    monthlyPrice: 1349,
    monthlyPriceUSD: 39,

    aiCredits: 750,
    resumePool: 3000,
    activeJobs: 10,

    recruiterSeats: 3,

    bulkEmail: true,
    teamManagement: true,
    advancedAnalytics: true,
  },

  enterprise: {
    planId: "enterprise",
    uiName: "Elite",

    monthlyPrice: 3349,
    monthlyPriceUSD: 79,

    aiCredits: 3000,
    resumePool: 30000,
    activeJobs: 20,

    recruiterSeats: 6,

    bulkEmail: true,
    teamManagement: true,
    advancedAnalytics: true,
  },
} as const;