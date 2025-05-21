const pages = {
    '1': {
        question: {
            markdown: config.question.markdown
        },
        answer: {
            markdown: config.answer.markdown
        },
        bottomCards: config.bottomCards,
        exploreCards: config.exploreCards
    },
    '2': {
        question: {
            markdown: `**Help me create a marketing strategy for a new tech startup focusing on AI solutions**`
        },
        answer: {
            markdown: `### Marketing Strategy for AI Tech Startup

1. **Target Audience Identification**
   - Enterprise businesses
   - Tech-savvy startups
   - Industry-specific solutions

2. **Value Proposition**
   - AI-powered automation
   - Cost reduction
   - Increased efficiency

3. **Marketing Channels**
   - LinkedIn for B2B
   - Tech conferences
   - Industry publications`
        },
        bottomCards: [
            {
                id: 'b1',
                type: 1,
                title: 'Market Research',
                summary: 'Understanding the AI market landscape',
                content: 'Analyze current market trends and competition',
                anchorText: 'Market Analysis'
            },
            {
                id: 'b2',
                type: 1,
                title: 'Competitive Analysis',
                summary: 'Identifying key competitors',
                content: 'Study competitor offerings and positioning',
                anchorText: 'Competition'
            }
        ],
        exploreCards: {
            b1: [
                { anchorText: 'Market Analysis', title: 'Market Size', summary: 'Total addressable market', content: 'Current market size and growth projections' },
                { anchorText: 'Market Trends', title: 'Industry Trends', summary: 'Emerging technologies', content: 'Latest developments in AI technology' }
            ],
            b2: [
                { anchorText: 'Competition', title: 'Direct Competitors', summary: 'Similar solutions', content: 'Companies offering similar AI solutions' },
                { anchorText: 'Indirect Competitors', title: 'Alternative Solutions', summary: 'Different approaches', content: 'Companies solving similar problems with different technologies' }
            ]
        }
    },
    '3': {
        question: {
            markdown: `**Help me develop a product launch strategy for a new mobile app**`
        },
        answer: {
            markdown: `### Product Launch Strategy

1. **Pre-launch Phase**
   - Beta testing
   - User feedback
   - Market research

2. **Launch Phase**
   - App store optimization
   - PR campaign
   - Social media push

3. **Post-launch**
   - User engagement
   - Performance monitoring
   - Iterative improvements`
        },
        bottomCards: [
            {
                id: 'b1',
                type: 1,
                title: 'User Testing',
                summary: 'Gathering user feedback',
                content: 'Conduct beta testing with target users',
                anchorText: 'Beta Testing'
            },
            {
                id: 'b2',
                type: 1,
                title: 'Marketing',
                summary: 'Promotion strategy',
                content: 'Develop comprehensive marketing plan',
                anchorText: 'Promotion'
            }
        ],
        exploreCards: {
            b1: [
                { anchorText: 'Beta Testing', title: 'Test Groups', summary: 'User selection', content: 'Selecting appropriate test groups' },
                { anchorText: 'Feedback Collection', title: 'User Feedback', summary: 'Gathering insights', content: 'Methods for collecting user feedback' }
            ],
            b2: [
                { anchorText: 'Promotion', title: 'Channels', summary: 'Marketing channels', content: 'Selecting effective marketing channels' },
                { anchorText: 'Timeline', title: 'Launch Schedule', summary: 'Promotion timeline', content: 'Detailed launch schedule' }
            ]
        }
    },
    '4': {
        question: {
            markdown: `**Help me create a customer retention strategy for a SaaS business**`
        },
        answer: {
            markdown: `### Customer Retention Strategy

1. **Onboarding Process**
   - Welcome emails
   - Tutorial videos
   - Support resources

2. **Engagement Programs**
   - Regular check-ins
   - Feature updates
   - Success stories

3. **Loyalty Programs**
   - Rewards system
   - Referral program
   - Exclusive features`
        },
        bottomCards: [
            {
                id: 'b1',
                type: 1,
                title: 'Customer Success',
                summary: 'Ensuring customer success',
                content: 'Implementing customer success programs',
                anchorText: 'Success Program'
            },
            {
                id: 'b2',
                type: 1,
                title: 'Feedback Loop',
                summary: 'Customer feedback',
                content: 'Establishing feedback mechanisms',
                anchorText: 'Feedback'
            }
        ],
        exploreCards: {
            b1: [
                { anchorText: 'Success Program', title: 'Onboarding', summary: 'Initial setup', content: 'Comprehensive onboarding process' },
                { anchorText: 'Training', title: 'User Training', summary: 'Education program', content: 'Training materials and sessions' }
            ],
            b2: [
                { anchorText: 'Feedback', title: 'Surveys', summary: 'Customer surveys', content: 'Regular customer satisfaction surveys' },
                { anchorText: 'Improvements', title: 'Product Updates', summary: 'Feature updates', content: 'Implementing customer feedback' }
            ]
        }
    },
    '5': {
        question: {
            markdown: `**Help me develop a digital transformation roadmap for a traditional business**`
        },
        answer: {
            markdown: `### Digital Transformation Roadmap

1. **Assessment Phase**
   - Current state analysis
   - Technology audit
   - Process evaluation

2. **Strategy Development**
   - Digital goals
   - Technology selection
   - Implementation plan

3. **Execution Plan**
   - Phased rollout
   - Training programs
   - Change management`
        },
        bottomCards: [
            {
                id: 'b1',
                type: 1,
                title: 'Technology Stack',
                summary: 'Selecting technologies',
                content: 'Choosing appropriate digital solutions',
                anchorText: 'Tech Stack'
            },
            {
                id: 'b2',
                type: 1,
                title: 'Change Management',
                summary: 'Managing transition',
                content: 'Implementing change management strategies',
                anchorText: 'Change'
            }
        ],
        exploreCards: {
            b1: [
                { anchorText: 'Tech Stack', title: 'Core Systems', summary: 'Main platforms', content: 'Selecting core digital platforms' },
                { anchorText: 'Integration', title: 'System Integration', summary: 'Connecting systems', content: 'Integrating new and existing systems' }
            ],
            b2: [
                { anchorText: 'Change', title: 'Training', summary: 'Staff training', content: 'Comprehensive training program' },
                { anchorText: 'Communication', title: 'Internal Communication', summary: 'Change communication', content: 'Effective communication strategy' }
            ]
        }
    },
    "6": {
        question: {
            markdown: `**Help me create a competitive analysis framework for my software company**`
        },
        answer: {
            markdown: `
### **Competitive Analysis Framework for Software Company**

A structured approach to analyze and understand your competitive landscape.

### **1. Competitor Identification**

*   **Direct Competitors**: Companies offering similar solutions
*   **Indirect Competitors**: Alternative solutions to the same problem
*   **Potential Competitors**: Companies that might enter your market`
        },
        bottomCards: [
            {
                id: "b1",
                type: 1,
                title: "Alternative framing",
                summary: "Analysis approaches",
                content: "Consider analyzing competitors from a customer perspective.",
                anchorText: "Alternative framing"
            }
        ],
        exploreCards: {
            a1: [
                {
                    title: "Idea Generator",
                    summary: "Analysis methods",
                    content: "Use social listening tools to monitor competitor mentions.",
                    anchorText: "Idea Generator"
                }
            ]
        }
    },
    "7": {
        question: {
            markdown: `**I need a brand positioning strategy for my organic food delivery service**`
        },
        answer: {
            markdown: `
### **Brand Positioning Strategy for Organic Food Delivery**

A comprehensive plan to position your organic food delivery service in the market.

### **1. Brand Identity Development**

*   **Core Values**: Sustainability, health, convenience
*   **Brand Voice**: Authentic, knowledgeable, approachable
*   **Visual Identity**: Natural, fresh, modern`
        },
        bottomCards: [
            {
                id: "b1",
                type: 2,
                title: "Long-term View",
                summary: "Brand building",
                content: "Focus on building trust through transparency in sourcing.",
                anchorText: "Long-term View"
            }
        ],
        exploreCards: {
            a1: [
                {
                    title: "Idea Generator",
                    summary: "Positioning ideas",
                    content: "Position as a lifestyle choice rather than just a delivery service.",
                    anchorText: "Idea Generator"
                }
            ]
        }
    },
    "8": {
        question: {
            markdown: `**Help me develop growth hacking techniques for my SaaS startup**`
        },
        answer: {
            markdown: `
### **Growth Hacking Techniques for SaaS Startup**

Innovative strategies to accelerate your SaaS startup's growth.

### **1. Product-Led Growth**

*   **Freemium Model**: Offer basic features for free
*   **Viral Loops**: Encourage user referrals
*   **Feature Adoption**: Guide users to key features`
        },
        bottomCards: [
            {
                id: "b1",
                type: 1,
                title: "Follow The Trends",
                summary: "Growth trends",
                content: "Product-led growth is outperforming traditional sales-led approaches.",
                anchorText: "Follow The Trends"
            }
        ],
        exploreCards: {
            a1: [
                {
                    title: "Idea Generator",
                    summary: "Growth ideas",
                    content: "Implement a referral program with tiered rewards.",
                    anchorText: "Idea Generator"
                }
            ]
        }
    },
    "9": {
        question: {
            markdown: `**I need a content marketing strategy for my B2B software company**`
        },
        answer: {
            markdown: `
### **Content Marketing Strategy for B2B Software**

A comprehensive plan to create and distribute valuable content for your B2B software company.

### **1. Content Pillars**

*   **Educational Content**: How-to guides and tutorials
*   **Thought Leadership**: Industry insights and trends
*   **Case Studies**: Success stories and use cases`
        },
        bottomCards: [
            {
                id: "b1",
                type: 2,
                title: "Alternative framing",
                summary: "Content approaches",
                content: "Consider creating content for different stages of the buyer's journey.",
                anchorText: "Alternative framing"
            }
        ],
        exploreCards: {
            a1: [
                {
                    title: "Idea Generator",
                    summary: "Content ideas",
                    content: "Create an interactive ROI calculator for your software.",
                    anchorText: "Idea Generator"
                }
            ]
        }
    },
    "10": {
        question: {
            markdown: `**Help me create a social media campaign plan for my fashion brand**`
        },
        answer: {
            markdown: `
### **Social Media Campaign Plan for Fashion Brand**

A strategic approach to engage your audience and promote your fashion brand on social media.

### **1. Platform Strategy**

*   **Instagram**: Visual content and stories
*   **TikTok**: Trend-focused short videos
*   **Pinterest**: Style inspiration and shopping`
        },
        bottomCards: [
            {
                id: "b1",
                type: 1,
                title: "Follow The Trends",
                summary: "Social trends",
                content: "Video content is driving 3x more engagement than static posts.",
                anchorText: "Follow The Trends"
            }
        ],
        exploreCards: {
            a1: [
                {
                    title: "Idea Generator",
                    summary: "Campaign ideas",
                    content: "Launch a user-generated content campaign with a branded hashtag.",
                    anchorText: "Idea Generator"
                }
            ]
        }
    }
}; 