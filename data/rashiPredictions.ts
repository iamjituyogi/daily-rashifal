/** Horizon-style prediction copy keyed by static rashi `id` (string). Replace with CMS or API later. */

export interface RashiPredictions {
  daily: string;
  weekly: string;
  monthly: string;
  yearly: string;
}

export const rashiPredictionsById: Record<string, RashiPredictions> = {
  '1': {
    daily:
      'Today favors decisive action—start what you have been postponing. Afternoon conversations carry extra weight; keep tone direct yet warm. Avoid unnecessary arguments after sunset.',
    weekly:
      'The first half of the week energises career and physical vitality. Midweek is ideal for short trips or training. Weekend: pause before big purchases; favour rest and reflection.',
    monthly:
      'This month highlights leadership and new ventures. Partnerships strengthen if you listen as much as you speak. Financially, plan rather than impulse—review recurring expenses by month end.',
    yearly:
      'The year invites bold resets: new roles, relocations, or bold personal goals suit you. Long-term partnerships mature; clarity on commitments arrives in the second half. Pace yourself—sustainability beats speed.',
  },
  '2': {
    daily:
      'Ground yourself in routine—comfort and consistency bring luck today. Creative or culinary efforts shine. Steer clear of rushed financial decisions; sleep well before choosing.',
    weekly:
      'Domestic matters and savings take focus. Tuesday–Thursday support contracts and home improvements. Socially, small gatherings recharge you more than large crowds.',
    monthly:
      'Income stability and asset planning are favoured. Relationships deepen through shared meals and honest budgets. Health: mindful eating and steady exercise outperform extreme diets.',
    yearly:
      'The year rewards patience and quality over novelty. Property, family, or long savings plans progress. Later months may bring a meaningful shift in how you define security.',
  },
  '3': {
    daily:
      'Curiosity opens doors—read, call, ask. Short commutes or messages carry opportunity. Evening is better for synthesis than debate; jot ideas before you share them.',
    weekly:
      'Networking and learning peaks; pitch or present before Friday. Avoid scattering—pick two priorities and finish them. A sibling or peer may offer a useful introduction.',
    monthly:
      'Writing, teaching, or media projects gain traction. Contracts need fine print reviewed. Relationships benefit from playful honesty; ambiguity drains trust—name what you mean.',
    yearly:
      'The year expands your circle and skill stack. Study, certifications, or side projects pay off across seasons. Commitments clarify after mid-year; travel or relocation becomes realistic.',
  },
  '4': {
    daily:
      'Trust intuition about home and family—small gestures restore harmony. Workplace: protect focus time in the morning. Emotional tides ease if you voice needs calmly.',
    weekly:
      'Caregiving, nesting, or emotional processing takes centre stage. Lunar midweek heightens sensitivity—choose rest over confrontation. Finance: favour essentials and buffers.',
    monthly:
      'Domestic upgrades or boundary-setting with relatives may surface. Career benefits from nurturing your team. Health themes: hydration, sleep rhythms, and gentle movement.',
    yearly:
      'The year deepens roots: family, ancestry, or a place to belong. Legacy projects and emotional healing run in parallel. Later months favour private wins over public spectacle.',
  },
  '5': {
    daily:
      'Visibility is an asset—show your work with confidence. Creative blocks lift if you rehearse briefly then perform. Romance and self-expression sparkle; avoid ego clashes with authority.',
    weekly:
      'Spotlight moments midweek favour presentations and romance. Collaborations work when roles are clear. Spend energy on polish, not perfectionism.',
    monthly:
      'Recognition or leadership chances rise; document achievements. Children, hobbies, or passion projects deserve scheduled time. Budget for joy—moderation keeps abundance sustainable.',
    yearly:
      'The year amplifies creative authority and heartfelt courage. Major reveals or launches suit you—pair ambition with mentorship. Relationships may redefine “pride” as mutual respect.',
  },
  '6': {
    daily:
      'Small fixes compound—organise one corner, one list, one deliverable. Health routines and analytical work go smoothly; save big decisions for when data is complete.',
    weekly:
      'Systems, audits, and wellness check-ins pay off Tuesday–Thursday. Offer help without over-functioning. A practical favour returns as goodwill.',
    monthly:
      'Workload may peak; batch tasks and delegate where possible. Diet and digestion need gentle discipline. Skill upgrades (tools, courses) shorten future effort.',
    yearly:
      'The year refines craft and wellbeing. Roles or habits that no longer serve you exit quietly. Mid-year clarity on service vs. sacrifice helps you sustain high standards healthily.',
  },
  '7': {
    daily:
      'Balance asks for fair words and fair timing—mediate before you judge. Partnerships benefit from symmetry: give listening equal time with speaking. Aesthetic choices uplift mood.',
    weekly:
      'Contracts, design, or relationship talks flow best in the first half of the week. Legal or formal matters need written follow-up. Avoid people-pleasing that erases your line.',
    monthly:
      'Alliances deepen when values align; mismatch shows early—address it cleanly. Income may pair with a joint effort. Art, music, or diplomacy skills open doors.',
    yearly:
      'The year centres commitment, justice, and refined taste. Marriage, business pairing, or public reputation may redefine. Choose partners and platforms that mirror your integrity.',
  },
  '8': {
    daily:
      'Depth over surface—research what intrigues you. Confidential matters need discretion; trust instinct on people. Transformation is quiet today: shed one old habit.',
    weekly:
      'Financial or emotional merging themes rise; verify facts before merging resources. Passion projects intensify midweek. Rest is recovery, not weakness.',
    monthly:
      'Investments, therapy, or strategic pivots deserve attention. Power dynamics clarify—healthy boundaries preserve intimacy. Avoid control games; transparency dissolves suspicion.',
    yearly:
      'The year promises rebirth: endings make space for richer bonds and resources. Legacy, shared assets, or deep study transform you. Autumn may bring a defining truth you are ready for.',
  },
  '9': {
    daily:
      'Say yes to learning and movement—short journeys or teachers appear. Morning optimism carries projects; anchor big ideas with one practical step before nightfall.',
    weekly:
      'Philosophy, publishing, or cross-cultural links open midweek. Watch for over-promising—commit to what you can deliver. Outdoor time resets mental clutter.',
    monthly:
      'Long-distance plans, visas, or higher study gain momentum. Ethics in leadership matter—walk your talk. Income may follow teaching, travel, or certification.',
    yearly:
      'The year stretches horizons: study, pilgrimage, or a mission larger than yourself. Belief systems evolve; mentors appear when you admit you do not know it all yet.',
  },
  '10': {
    daily:
      'Discipline converts into progress—block time for deep work. Authority figures notice reliability. Patience with family expectations prevents friction; hold your vision.',
    weekly:
      'Career benchmarks and reputation build Tuesday–Thursday. Structure rewards: plans, KPIs, and follow-through. Weekend: recharge the body—mountains or silence help.',
    monthly:
      'Ambition meets reality checks—adjust timelines without abandoning goals. Seniors or parents may need practical support. Long-term investments favour slow, steady vehicles.',
    yearly:
      'The year crowns effort: titles, tenure, or legacy projects advance. Responsibilities grow—choose ladders you respect. Year-end offers a clearer “why” behind the climb.',
  },
  '11': {
    daily:
      'Innovation and teamwork mix well—brainstorm freely, prototype small. Friendships spark ideas; keep digital boundaries so focus stays intact. Evening suits community or cause work.',
    weekly:
      'Groups and networks deliver opportunities; share credit generously. Tech or data should be verified midweek. Detach from drama that is not yours to solve.',
    monthly:
      'Future-oriented projects and social impact align. Income may arrive through teams, platforms, or subscriptions. Rebellion for its own sake costs—reform with a plan instead.',
    yearly:
      'The year accelerates collective progress: alliances, inventions, or movements. Personal freedom expands when you pair vision with empathy. Late year may redefine “tribe.”',
  },
  '12': {
    daily:
      'Dreams and art hold messages—note symbols on waking. Compassion is strength; still, protect your energy from emotional sponges. Water, music, or meditation restore balance.',
    weekly:
      'Healing, charity, or behind-the-scenes work satisfies more than applause. Escapism tempts weekend—choose inspiration, not avoidance. Loving boundaries preserve magic.',
    monthly:
      'Creativity and spirituality merge in projects; finish drafts you abandoned. Romance benefits from tenderness and clarity. Finance: compassion does not mean unclear terms—write agreements.',
    yearly:
      'The year dissolves illusions so truer devotion can flow. Artistic, spiritual, or compassionate paths deepen. Surrender outdated rescuer roles—you are not everyone’s saviour.',
  },
};

export function getPredictionsForRashi(id: string): RashiPredictions | null {
  return rashiPredictionsById[id] ?? null;
}
