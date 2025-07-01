// Quiz questions and answer data
const questions = [
  {
    question: "Why did you originally join debating?",
    options: [
      { text: "To prove myself and win arguments.", value: "a" },
      { text: "To better understand others' perspectives.", value: "b" },
      { text: "To sharpen my logic and analytical skills.", value: "c" },
      { text: "To explore ideas and express my creativity.", value: "d" }
    ]
  },
  {
    question: "How do you usually respond when your opponent misunderstands your argument?",
    options: [
      { text: "Use it as a pivot to reframe your entire argument.", value: "d" },
      { text: "Clarify calmly and restate in simpler terms.", value: "b" },
      { text: "Firmly correct them to regain control of the room.", value: "a" },
      { text: "Let it slide unless it affects the core of your case.", value: "c" }
    ]
  },
  {
    question: "What's your biggest strength during prep time?",
    options: [
      { text: "Brainstorming unusual but compelling frames.", value: "d" },
      { text: "Creating a clear case structure with layered logic.", value: "c" },
      { text: "Anticipating emotional angles or audience reaction.", value: "b" },
      { text: "Generating strong examples and punchy phrasing.", value: "a" }
    ]
  },
  {
    question: "During crossfire (POIs or rebuttal clashes), what's your instinct?",
    options: [
      { text: "Use crossfire to expose contradictions with humor or irony.", value: "d" },
      { text: "Avoid it unless necessary; focus on your speeches.", value: "c" },
      { text: "Interject often and aggressively to rattle your opponents.", value: "a" },
      { text: "Choose moments carefully and ask probing, polite questions.", value: "b" }
    ]
  },
  {
    question: "How do you make your case persuasive?",
    options: [
      { text: "Connect the motion to real-world impact and empathy.", value: "b" },
      { text: "Redefine the issue to make your side seem inevitable.", value: "d" },
      { text: "Build step-by-step logic that's hard to refute.", value: "c" },
      { text: "Deliver your points with passion and urgency.", value: "a" }
    ]
  },
  {
    question: "You're in a tight round against strong opponents. What's your strategy?",
    options: [
      { text: "Stick to your prepared structure and out-analyze them.", value: "c" },
      { text: "Stay adaptable and listen closely to tweak your case.", value: "b" },
      { text: "Flip the framing in your reply speech to undermine their assumptions.", value: "d" },
      { text: "Go bold: try to outshine with energy and assertiveness.", value: "a" }
    ]
  },
  {
    question: "Which type of motion do you usually enjoy the most?",
    options: [
      { text: "Meta or abstract motions about debate, identity, or philosophy.", value: "d" },
      { text: "Policy-heavy or tech-regulation motions.", value: "c" },
      { text: "Moral dilemmas or activism-based debates.", value: "a" },
      { text: "Social issues and nuanced ethical decisions.", value: "b" }
    ]
  },
  {
    question: "What motivates you most to improve in debate?",
    options: [
      { text: "The challenge of building flawless logical structures.", value: "c" },
      { text: "The thrill of outperforming tough opponents.", value: "a" },
      { text: "The desire to connect better with audiences and judges.", value: "b" },
      { text: "The curiosity to explore new ideas and experiment with framing.", value: "d" }
    ]
  },
  {
    question: "How do you typically respond when your team is under time pressure?",
    options: [
      { text: "Stick to the structure and avoid improvisation.", value: "c" },
      { text: "Push your team to be bolder and more decisive.", value: "a" },
      { text: "Keep morale high and reassure your team.", value: "b" },
      { text: "Suggest cutting the argument in an unexpected way.", value: "d" }
    ]
  },
  {
    question: "What's your mindset right before a debate round begins?",
    options: [
      { text: "I hype myself up—this is war and I'm ready to win.", value: "a" },
      { text: "I remind myself to stay composed and read the judges well.", value: "b" },
      { text: "I run through my case structure to check for gaps or weak links.", value: "c" },
      { text: "I think about clever angles or unexpected ways to flip the motion.", value: "d" }
    ]
  },
  {
    question: "Which kind of clash do you prefer handling?",
    options: [
      { text: "Technical disputes over principles or causation.", value: "c" },
      { text: "Heated ideological showdowns.", value: "a" },
      { text: "Subtle shifts in framing and assumptions.", value: "d" },
      { text: "Emotional or ethical dilemmas.", value: "b" }
    ]
  }
];

// Answer weights for scoring
const answerWeights = {
  a: { fire: 85, air: 15 },
  b: { water: 80, earth: 20 },
  c: { earth: 85, fire: 15 },
  d: { air: 85, water: 15 }
};

// Element descriptions
const descriptions = {
  fire: {
    name: "🔥 Fire – The Challenger",
    text: "You thrive in the heat of the moment. Passionate, competitive, and energetic, you bring intensity to every round. You're bold in clashes and unafraid to take risks — sometimes overwhelming, but always unforgettable. As a debater, you're the sparkplug of the team. You perform best in moments that require quick thinking, fiery rebuttals, or commanding the room with powerful rhetoric. When you're in your element, your speeches can shift the entire energy of a round."
  },
  water: {
    name: "🌊 Water – The Empath",
    text: "You navigate debates with emotional intelligence and grace. Calm, adaptable, and strategic, you read the room well and excel in nuanced analysis. You're not the loudest, but you often win hearts and minds. As a debater, you're the emotional compass of your team, able to sense tone shifts and tailor arguments to resonate deeply with judges. You're invaluable in moral debates, narrative framing, and empathy-driven persuasion."
  },
  earth: {
    name: "🌍 Earth – The Analyst",
    text: "You bring order to chaos. Logical, structured, and deeply prepared, you ground your team with solid analysis and unshakable frameworks. You may not dazzle, but you never crumble under pressure. In debate, you're the planner — the one who ensures arguments hold up under scrutiny. Your strength lies in clear structure, tight logic, and being the rock others rely on when the motion is messy or complex."
  },
  air: {
    name: "🌬 Air – The Visionary",
    text: "You're the abstract thinker with a creative edge. Witty, intuitive, and full of lateral insights, you challenge norms and flip debates on their heads. At your best, you inspire; at your worst, you confuse. As a debater, you shine when the motion invites reinterpretation or unorthodox framing. Your strength is in surprise — you see links others don't and make arguments feel fresh and intellectually exciting."
  }
};