import { EarningPath, PlatformInfo, PracticeProblem, RoadmapItem } from '../types';

export const EARNING_PATHS: EarningPath[] = [
  {
    id: 'ai-rlhf-annotation',
    title: 'AI Math Specialist & Reasoning Evaluator',
    category: 'ai_annotation',
    shortDesc: 'Work with top AI research labs (via platforms like Outlier & DataAnnotation) reviewing step-by-step math reasoning, verifying calculus proofs, and catching model hallucinations.',
    avgHourlyRate: '$30 - $55 / hr',
    rateMin: 30,
    rateMax: 55,
    timeToFirstDollar: '3 - 7 days',
    difficulty: 'Moderate',
    mathSkillsRequired: ['Single & Multivariable Calculus', 'Linear Algebra', 'Probability & Combinatorics', 'Rigorous Proof Analysis'],
    toolsNeeded: ['Computer with stable internet', 'LaTeX familiarity (basic markdown)', 'PayPal or direct deposit account'],
    topPlatforms: ['Outlier.ai', 'DataAnnotation.tech', 'Alignerr', 'Mindrift', 'Scale AI'],
    stepByStep: [
      'Apply with your university math credentials and transcript/LinkedIn link.',
      'Take the preliminary 45-minute timed STEM/Math screening assessment (calculus, probability, algebra).',
      'Learn the rubric: AI companies grade on whether you catch calculation slips, missing assumptions, and faulty deductions.',
      'Start accepting tasks in queue: you review a math prompt, check two AI answers side-by-side, score them, and write a concise, bulletproof critique in LaTeX/Markdown.',
      'Get paid weekly via PayPal or direct deposit with 100% remote, flexible self-scheduled hours.'
    ],
    insiderTip: 'AI companies love clear step-by-step proof notation. When grading AI responses, always verify intermediate algebraic steps by hand and explicitly call out domain restrictions (like division by zero or logarithmic domain violations).',
    pros: ['Completely flexible hours (work whenever you want)', 'No client chasing or billing friction', 'High hourly starting rate for STEM students', 'Sharpens your own university coursework problem-solving'],
    cons: ['Task queues can fluctuate seasonally', 'Strict quality checks can pause your account if you rush through reviews']
  },
  {
    id: 'high-ticket-tutoring',
    title: 'High-Impact Math Tutoring (AP / University / SAT)',
    category: 'tutoring',
    shortDesc: 'Tutor high schoolers in AP Calculus / SAT Math or university freshmen in Calculus 1-3 & Linear Algebra. Highest hourly rate potential with recurring weekly clients.',
    avgHourlyRate: '$35 - $85 / hr',
    rateMin: 35,
    rateMax: 85,
    timeToFirstDollar: '2 - 5 days',
    difficulty: 'Easy',
    mathSkillsRequired: ['Algebra 2 & Precalculus', 'AP Calc AB/BC', 'Introductory Statistics', 'Clear Pedagogical Communication'],
    toolsNeeded: ['Tablet with stylus / Drawing pad (or digital whiteboard like Miro/Desmos)', 'Zoom or Google Meet', 'Curated practice problems & cheat sheets'],
    topPlatforms: ['Wyzant', 'Superprof', 'Preply', 'Local Facebook Parent Groups', 'Campus Bulletin Boards / Discord'],
    stepByStep: [
      'Pick your niche: AP Calculus BC or University Calculus 1 are the highest-demand, best-paying niches.',
      'Set up a Wyzant or Superprof profile highlighting your university math major & past exam scores.',
      'Post on local community Facebook groups ("College math major offering remote or in-person AP Calculus & SAT Math preparation").',
      'Offer a free 15-minute diagnostic call to evaluate the student’s weak spots and build confidence with parents.',
      'Charge $35-$50/hr to start, and raise to $65-$85/hr after gathering 3-5 positive reviews.'
    ],
    insiderTip: 'Parents pay for peace of mind, not just math formulas. Send a 2-sentence summary after each session: "Today we mastered the chain rule and fixed 3 common algebra sign errors. Homework assigned: 4 practice problems." Parents will keep you all semester.',
    pros: ['Builds recurring weekly income ($200-$600/week per 4-6 students)', 'Immediate cash flow', 'Rewarding interpersonal connection', 'Referrals can keep you fully booked'],
    cons: ['Requires scheduling around school/work hours (mostly afternoons/weekends)', 'Occasional last-minute student cancellations']
  },
  {
    id: 'quantitative-freelance',
    title: 'Quantitative Data & Python/R Math Freelancing',
    category: 'data_freelance',
    shortDesc: 'Help graduate students, small businesses, and researchers with statistical modeling, regression analysis, Excel financial math, and Python simulation scripts.',
    avgHourlyRate: '$40 - $75 / hr',
    rateMin: 40,
    rateMax: 75,
    timeToFirstDollar: '7 - 14 days',
    difficulty: 'Advanced',
    mathSkillsRequired: ['Applied Statistics & Hypothesis Testing', 'Probability Distributions', 'Basic Python (NumPy, SciPy, Pandas) or R', 'Excel Modeling'],
    toolsNeeded: ['Jupyter Notebooks', 'Python / R environment', 'GitHub portfolio / sample charts'],
    topPlatforms: ['Upwork', 'Freelancer.com', 'Fiverr Pro', 'Reddit (r/forhire, r/freelance)'],
    stepByStep: [
      'Create 2-3 sample Jupyter notebooks showcasing data cleaning, curve fitting, or Monte Carlo simulations.',
      'Create an Upwork profile under "Quantitative Data Analysis & Statistical Modeling".',
      'Filter job posts on Upwork for "Python math", "SPSS / R statistical analysis", or "linear optimization".',
      'Submit targeted proposals explaining your mathematical approach in plain English with a link to your sample code.',
      'Deliver reproducible scripts with clear comments and visual summary plots.'
    ],
    insiderTip: 'Target Master\'s and PhD candidates in non-math departments (biology, psychology, economics) who need statistical validation for their thesis papers.',
    pros: ['Excellent resume-builder for future Quant, Data Science, or Software roles', 'Higher project-based fees ($150 - $800 per gig)', 'Builds portfolio assets you own'],
    cons: ['Requires translating messy real-world data into math models', 'Initial proposal competition on freelance platforms']
  },
  {
    id: 'academic-latex-typesetting',
    title: 'Academic LaTeX Typesetting & Problem Set Authoring',
    category: 'latex',
    shortDesc: 'Convert handwritten lecture notes, exam papers, research drafts, and math textbooks into immaculate LaTeX documents with TikZ vector geometry diagrams.',
    avgHourlyRate: '$25 - $50 / hr',
    rateMin: 25,
    rateMax: 50,
    timeToFirstDollar: '3 - 7 days',
    difficulty: 'Moderate',
    mathSkillsRequired: ['Mathematical Typography', 'LaTeX & Overleaf Mastery', 'TikZ / Asymptote Diagramming', 'Proofreading Formulae'],
    toolsNeeded: ['Overleaf Pro (or free tier)', 'Mathpix Snipping Tool (to speed up transcription)'],
    topPlatforms: ['Fiverr', 'Upwork', 'Overleaf Community Gigs', 'University Department Bulletin Boards'],
    stepByStep: [
      'Build a 1-page sample portfolio showcasing: (1) Complex multi-line matrix algebra, (2) Beautiful TikZ geometric diagrams, (3) Clean bibliography and theorem environments.',
      'Post a Fiverr gig: "I will typeset your math / physics paper or handwritten notes in pristine LaTeX in 24 hours".',
      'Offer professors or graduate researchers at your university assistance formatting their arXiv submissions or lab worksheets.',
      'Use Mathpix to OCR equations into LaTeX quickly, then manually polish formatting and typography.'
    ],
    insiderTip: 'Learn TikZ for vector math diagrams (circuits, coordinate planes, geometry). Many researchers know basic LaTeX but hate creating diagrams in TikZ and will gladly pay $20-$50 just for 2-3 clean vector figures.',
    pros: ['Low stress, asynchronous work you can do while listening to music', 'Improves your own LaTeX speed for coursework and thesis', 'Fast delivery turnaround'],
    cons: ['Slightly lower price ceiling than direct 1-on-1 tutoring', 'Can be repetitive for long transcripts']
  },
  {
    id: 'math-content-tools',
    title: 'Math Cheat Sheets, Problem Banks & Micro-Tools',
    category: 'content',
    shortDesc: 'Author high-yield formula cheat sheets, Desmos interactive simulators, or video step-by-step solutions for high school / college courses and sell them on Gumroad/Etsy.',
    avgHourlyRate: '$20 - $60 / hr (Scalable)',
    rateMin: 20,
    rateMax: 60,
    timeToFirstDollar: '7 - 21 days',
    difficulty: 'Moderate',
    mathSkillsRequired: ['Curriculum Breakdown (Calculus 1/2/3, Linear Algebra, Discrete)', 'Visual Simplification', 'Explanatory Writing'],
    toolsNeeded: ['Canva / LaTeX / Notion', 'Gumroad or Etsy Store', 'Desmos / GeoGebra'],
    topPlatforms: ['Gumroad', 'Etsy', 'Teachers Pay Teachers', 'YouTube / TikTok Educational Shorts'],
    stepByStep: [
      'Identify the toughest topics students struggle with (e.g. "Taylor Series Convergence Tests" or "Eigenvalues & Diagonalization").',
      'Create a condensed, visually organized 2-4 page summary PDF with step-by-step decision trees and worked examples.',
      'List it on Gumroad / Etsy for $5 - $15.',
      'Share free helpful snippets or problem walkthroughs on Reddit (r/calculus, r/learnmath, r/matheducation) or TikTok/Instagram.',
      'Earn recurring passive income every time students prepare for midterms and finals.'
    ],
    insiderTip: 'Midterm and Final exam weeks (October/November and April/May) create massive spikes in cheat-sheet sales. Build your materials 3-4 weeks ahead of exam seasons.',
    pros: ['Create once, sell infinitely (passive income)', 'Enhances your own mastery of core math concepts', 'Great creative outlet'],
    cons: ['Requires marketing or initial audience distribution', 'Income builds gradually over weeks rather than same-day']
  }
];

export const VETTED_PLATFORMS: PlatformInfo[] = [
  {
    id: 'outlier-ai',
    name: 'Outlier.ai (Scale AI)',
    category: 'AI Annotation',
    typicalPay: '$30 - $50 / hr',
    payRangeHourly: [30, 50],
    paymentMethod: 'PayPal / AirTM',
    payoutFrequency: 'Weekly (Every Tuesday)',
    qualificationRequirements: 'Undergraduate or Graduate STEM/Math student, ID verification, 45-min math screening test.',
    difficultyToEnter: 'Medium',
    testTips: 'Read questions extremely carefully. The test checks if you detect subtle logical flaws (e.g., assuming a function is continuous without proof, or algebraic transposition errors). Double check bounds and domain restrictions.',
    websiteUrl: 'https://outlier.ai',
    featured: true
  },
  {
    id: 'data-annotation',
    name: 'DataAnnotation.tech',
    category: 'AI Annotation',
    typicalPay: '$25 - $45 / hr',
    payRangeHourly: [25, 45],
    paymentMethod: 'PayPal',
    payoutFrequency: 'On-demand (every 3-7 days)',
    qualificationRequirements: 'Online qualification test evaluating critical reasoning, attention to detail, and math/coding skills.',
    difficultyToEnter: 'Medium',
    testTips: 'Accuracy and comprehensive justification matter more than speed. When explaining why an AI response is wrong, write full structured sentences explaining the exact axiom or formula violated.',
    websiteUrl: 'https://dataannotation.tech',
    featured: true
  },
  {
    id: 'wyzant',
    name: 'Wyzant Tutoring',
    category: 'Tutoring',
    typicalPay: '$35 - $80 / hr',
    payRangeHourly: [35, 80],
    paymentMethod: 'Direct Deposit',
    payoutFrequency: 'Bi-monthly or On-demand',
    qualificationRequirements: 'Pass subject-specific online math quizzes (Calculus, Linear Algebra, Stats). US-based tutors.',
    difficultyToEnter: 'Low',
    testTips: 'The subject tests are standard multiple-choice. Once passed, optimize your profile headline: "Ivy/Top University Math Major | 100+ Hours Helping Students Ace AP Calc & College Algebra".',
    websiteUrl: 'https://wyzant.com',
    featured: true
  },
  {
    id: 'alignerr',
    name: 'Alignerr',
    category: 'AI Annotation',
    typicalPay: '$30 - $60 / hr',
    payRangeHourly: [30, 60],
    paymentMethod: 'Deel / Bank Transfer',
    payoutFrequency: 'Bi-weekly',
    qualificationRequirements: 'Assessment on reasoning, mathematics, or computer science.',
    difficultyToEnter: 'Medium',
    testTips: 'Focus on high-level mathematical communication and precision. Alignerr values domain experts who can evaluate advanced university-level proofs.',
    websiteUrl: 'https://alignerr.com',
    featured: true
  },
  {
    id: 'superprof',
    name: 'Superprof',
    category: 'Tutoring',
    typicalPay: '$30 - $65 / hr',
    payRangeHourly: [30, 65],
    paymentMethod: 'Direct Client Payment / Stripe',
    payoutFrequency: 'Immediate / Direct from client',
    qualificationRequirements: 'Global availability, verify student ID or degree, write an engaging tutor bio.',
    difficultyToEnter: 'Low',
    testTips: 'Offer your first 30 minutes free for diagnostic consultation. This converts over 80% of interested parents into recurring weekly paid students.',
    websiteUrl: 'https://superprof.com'
  },
  {
    id: 'upwork',
    name: 'Upwork (Math & Quantitative)',
    category: 'Freelance',
    typicalPay: '$35 - $75 / hr',
    payRangeHourly: [35, 75],
    paymentMethod: 'Direct Deposit / PayPal / Wire',
    payoutFrequency: 'Weekly on Wednesdays',
    qualificationRequirements: 'Build an individual profile, submit proposals using Connects.',
    difficultyToEnter: 'Medium',
    testTips: 'Do not submit generic templates. Address the specific math problem in line 1: "I saw your differential equation modeling problem; here is how we can set up the boundary condition in Python..."',
    websiteUrl: 'https://upwork.com'
  },
  {
    id: 'mindrift',
    name: 'Mindrift (AI Tutoring & Review)',
    category: 'AI Annotation',
    typicalPay: '$25 - $40 / hr',
    payRangeHourly: [25, 40],
    paymentMethod: 'PayPal / Payoneer',
    payoutFrequency: 'Monthly / Bi-weekly',
    qualificationRequirements: 'English proficiency & STEM subject test.',
    difficultyToEnter: 'Low',
    testTips: 'Focus on editorial precision and rubric alignment. Explain clearly why one mathematical response is more pedagogical than another.',
    websiteUrl: 'https://mindrift.ai'
  },
  {
    id: 'preply',
    name: 'Preply',
    category: 'Tutoring',
    typicalPay: '$25 - $50 / hr',
    payRangeHourly: [25, 50],
    paymentMethod: 'PayPal / Wise / Payoneer',
    payoutFrequency: 'Instant withdrawal',
    qualificationRequirements: 'Record a short 1-minute video introduction explaining your math tutoring approach.',
    difficultyToEnter: 'Low',
    testTips: 'In your video intro, speak directly into the camera with good lighting. Show a digital tablet screen or whiteboard for 10 seconds solving a fun calculus problem to demonstrate your teaching clarity.',
    websiteUrl: 'https://preply.com'
  }
];

export const PRACTICE_PROBLEMS: PracticeProblem[] = [
  {
    id: 'calc-flaw-1',
    title: 'Calculus: Integration by Parts & Vanishing Constant',
    topic: 'Integral Calculus',
    difficulty: 'Undergraduate',
    problemStatement: 'Evaluate the integral $I = \\int \\frac{1}{x \\ln(x)} dx$ using substitution, and analyze an AI attempt that used integration by parts.',
    aiProposedSolution: `Let $u = \\frac{1}{\\ln(x)}$ and $dv = \\frac{1}{x} dx$.
Then $du = -\\frac{1}{x (\\ln(x))^2} dx$ and $v = \\ln(x)$.
Applying integration by parts:
$I = u v - \\int v du$
$I = \\left(\\frac{1}{\\ln(x)}\\right)(\\ln(x)) - \\int (\\ln(x)) \\left(-\\frac{1}{x (\\ln(x))^2}\\right) dx$
$I = 1 + \\int \\frac{1}{x \\ln(x)} dx$
$I = 1 + I$
Subtracting $I$ from both sides gives $0 = 1$.
Therefore, this integral has no solution and is undefined for all $x > 0$.`,
    actualFlaw: 'The AI committed the classic "0 = 1" integration paradox by forgetting that indefinite integrals represent families of functions differing by an arbitrary constant of integration $C$. When subtracting $\\int \\frac{1}{x \\ln(x)} dx$ from both sides, it actually yields $0 = 1 + C$, meaning $C = -1$. The correct substitution is $u = \\ln(x) \\implies du = \\frac{1}{x}dx \\implies \\int \\frac{1}{u} du = \\ln|u| + C = \\ln|\\ln(x)| + C$.',
    rubricHints: [
      'Identify the missing constant of integration $C$ in the algebraic manipulation.',
      'Point out that claiming the integral "has no solution" is a severe mathematical hallucination.',
      'Provide the standard $u$-substitution solution: $\\ln|\\ln(x)| + C$.',
      'Highlight the domain of convergence: $x \\in (0, 1) \\cup (1, \\infty)$.'
    ],
    sampleCritique: 'The AI’s response is mathematically incorrect. In step 5, it subtracts the indefinite integral from both sides without accounting for the constant of integration, producing the false contradiction $0 = 1$. Indefinite integrals are equivalence classes modulo constants. Furthermore, declaring the integral non-existent is incorrect: using $u = \\ln(x)$, $du = \\frac{dx}{x}$, the integral evaluates directly to $\\ln|\\ln(x)| + C$ on the domain $x > 0, x \\neq 1$.',
    correctSolution: 'Let $u = \\ln(x)$. Then $du = \\frac{1}{x} dx$.\nThe integral becomes $\\int \\frac{1}{u} du = \\ln|u| + C = \\ln|\\ln(x)| + C$, valid for $x \\in (0, 1) \\cup (1, \\infty)$.'
  },
  {
    id: 'linalg-flaw-2',
    title: 'Linear Algebra: Invertibility and Matrix Dimensions',
    topic: 'Linear Algebra',
    difficulty: 'Undergraduate',
    problemStatement: 'Let $A$ be a $3 \\times 2$ matrix and $B$ be a $2 \\times 3$ matrix such that $AB = I_3$. Is this possible? Analyze the AI solution.',
    aiProposedSolution: `Yes, this is possible.
For example, we can take $A = \\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\\\ 0 & 0 \\end{bmatrix}$ and $B = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\end{bmatrix}$.
Multiplying them:
$AB = \\begin{bmatrix} 1 & 0 & 0 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 0 \\end{bmatrix} \\approx I_3$.
Since the rank of $A$ is 2 and the rank of $B$ is 2, their product can achieve rank 3, yielding the identity matrix $I_3$.`,
    actualFlaw: 'By the rank inequality, $\\text{rank}(AB) \\le \\min(\\text{rank}(A), \\text{rank}(B)) \\le 2$. But $I_3$ is a $3 \\times 3$ identity matrix which has rank 3. Therefore, $AB$ can never equal $I_3$. The AI fabricated an approximation symbol "$\\approx I_3$" and falsely claimed two rank-2 matrices can produce a rank-3 product.',
    rubricHints: [
      'Cite the Rank-Nullity / Matrix Rank inequality: $\\text{rank}(AB) \\le \\min(\\text{rank}(A), \\text{rank}(B))$.',
      'Note that $\\text{rank}(A) \\le 2$ and $\\text{rank}(B) \\le 2$, while $\\text{rank}(I_3) = 3$.',
      'Call out the hallucinated calculation and false conclusion that $AB = I_3$ is possible.'
    ],
    sampleCritique: 'The response is completely false. The product of a $3 \\times 2$ matrix $A$ and a $2 \\times 3$ matrix $B$ has rank at most $\\min(\\text{rank}(A), \\text{rank}(B)) \\le 2$. The $3 \\times 3$ identity matrix $I_3$ has full rank 3. By the sub-multiplicative rank property, $\\text{rank}(AB) \\le 2 < 3 = \\text{rank}(I_3)$, so $AB = I_3$ is impossible. The AI also computed $AB$ and obtained a non-identity matrix with a zero row, then falsely equated it to $I_3$.',
    correctSolution: 'No, it is impossible. By the rank inequality, $\\text{rank}(AB) \\le \\min(\\text{rank}(A), \\text{rank}(B)) \\le 2$. Since $I_3$ has rank 3, no such matrices $A$ and $B$ exist. (Note: $BA = I_2$ is possible, but $AB = I_3$ is not).'
  },
  {
    id: 'prob-flaw-3',
    title: 'Probability: Monty Hall & Conditional Expectation',
    topic: 'Probability & Statistics',
    difficulty: 'High School / AP',
    problemStatement: 'In the Monty Hall problem with 3 doors, what is the probability of winning if you switch after the host reveals a goat? Analyze the AI response.',
    aiProposedSolution: `Once the host opens one door with a goat, there are only 2 doors remaining: your chosen door and the other closed door.
Since one of them contains a car and the other contains a goat, each door now has an equal $50\\%$ (1/2) chance of winning.
Therefore, switching doors does not change your probability of winning; it remains $1/2$.`,
    actualFlaw: 'The AI fell into the classic intuition trap. The host’s action is not random—the host always reveals a goat behind an unchosen door. The initial choice has a $1/3$ probability of containing the car, meaning the remaining two doors together contain the car with probability $2/3$. When the host eliminates the goat, all $2/3$ probability transfers to the single remaining unopened door. Thus, switching gives a $2/3$ win rate.',
    rubricHints: [
      'State the law of total probability / Bayes theorem.',
      'Explain that initial choice is $1/3$, host has constrained information.',
      'Switching yields $2/3$ probability, not $1/2$.'
    ],
    sampleCritique: 'The AI fails to understand the conditional information asymmetry in the Monty Hall problem. The host does not open a random door; they must open an unchosen door with a goat. When you pick your initial door, $P(\\text{Car in chosen door}) = 1/3$ and $P(\\text{Car in other two doors}) = 2/3$. The host eliminating one non-car door concentrates the entire $2/3$ probability into the single remaining unpicked door. Switching wins with probability $2/3$, not $1/2$.',
    correctSolution: 'Switching yields a winning probability of $\\frac{2}{3}$. You win by switching whenever your initial pick was a goat ($P = 2/3$). You lose by switching only if your initial pick was the car ($P = 1/3$).'
  }
];

export const SEVEN_DAY_ROADMAP: RoadmapItem[] = [
  {
    id: 'day-1',
    day: 'Day 1',
    title: 'Setup & Platform Applications (AI Annotation)',
    description: 'Apply to Outlier.ai and DataAnnotation.tech as a Math Specialist. Submit your student credentials and prepare for the online screening test.',
    category: 'Application',
    estimatedMinutes: 45,
    actionUrl: 'https://outlier.ai',
    actionText: 'Open Outlier.ai'
  },
  {
    id: 'day-2',
    day: 'Day 2',
    title: 'Screening Test Practice & Rubric Review',
    description: 'Use the RLHF Math Practice simulator in this app to practice spotting AI calculus/algebra proof errors and writing rubric feedback.',
    category: 'Preparation',
    estimatedMinutes: 40
  },
  {
    id: 'day-3',
    day: 'Day 3',
    title: 'Create High-Ticket Tutoring Profiles',
    description: 'Create accounts on Wyzant & Superprof. Use the AI Pitch Generator to generate your tutor bio targeting AP Calculus and SAT Math.',
    category: 'Application',
    estimatedMinutes: 30,
    actionUrl: 'https://wyzant.com',
    actionText: 'Open Wyzant'
  },
  {
    id: 'day-4',
    day: 'Day 4',
    title: 'Local & Campus Outreach Blitz',
    description: 'Post your tutoring flyer/message in local parent Facebook groups, university subreddits, and campus STEM Discord servers.',
    category: 'Outreach',
    estimatedMinutes: 35
  },
  {
    id: 'day-5',
    day: 'Day 5',
    title: 'LaTeX & Quantitative Portfolio One-Pager',
    description: 'Format a clean 1-page sample LaTeX document with TikZ diagrams or a quick Python data analysis script. Post a Fiverr/Upwork gig.',
    category: 'Preparation',
    estimatedMinutes: 45,
    actionUrl: 'https://upwork.com',
    actionText: 'Open Upwork'
  },
  {
    id: 'day-6',
    day: 'Day 6',
    title: 'First Diagnostic Calls & Screening Verification',
    description: 'Conduct initial 15-minute diagnostic video calls with interested tutoring clients. Check onboarding status on Outlier/DataAnnotation.',
    category: 'Execution',
    estimatedMinutes: 40
  },
  {
    id: 'day-7',
    day: 'Day 7',
    title: 'Lock In First Paid Sessions & Task Queue',
    description: 'Complete your first paid 1-hour tutoring session ($40-$60) or complete your first batch of paid AI math annotation tasks in queue.',
    category: 'Execution',
    estimatedMinutes: 60
  }
];

export const SAMPLE_PITCH_PROMPTS = [
  {
    id: 'tutoring-parent',
    title: 'High School AP Calculus / SAT Parent Outreach',
    type: 'Tutoring Parent Outreach',
    target: 'Parents on local Facebook groups & community boards',
    subject: 'AP Calculus AB/BC & SAT Math',
    background: 'University Math Major with 4.0 in Calculus & 800 SAT Math score',
    rate: 45
  },
  {
    id: 'peer-college',
    title: 'University Peer Tutoring (Calc 1-3 & Linear Algebra)',
    type: 'University Peer Tutoring',
    target: 'College freshmen/sophomores taking required STEM math',
    subject: 'Calculus 2 (Sequences/Series) & Linear Algebra',
    background: 'Junior Math Major, passed both courses with an A+, former department TA',
    rate: 35
  },
  {
    id: 'outlier-app',
    title: 'AI Math Specialist Statement (Outlier / DataAnnotation)',
    type: 'Outlier/DataAnnotation Math Specialist Application Statement',
    target: 'AI Lab Hiring Reviewers',
    subject: 'Multivariable Calculus, Real Analysis & Formal Deductive Proofs',
    background: 'Mathematics Major with experience in LaTeX, rigorous proof grading, and catching AI edge-case errors',
    rate: 45
  },
  {
    id: 'freelance-latex',
    title: 'Upwork LaTeX & Problem Set Typesetting Proposal',
    type: 'Upwork Freelance Proposal for Math/Data/LaTeX',
    target: 'Academic authors, textbook editors, and graduate researchers',
    subject: 'LaTeX document formatting, TikZ vector figures, and equation OCR cleanup',
    background: 'Proficient in Overleaf, TikZ diagramming, and fast turnaround',
    rate: 30
  }
];
