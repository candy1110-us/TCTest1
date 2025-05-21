// Add style for highlight effect
const style = document.createElement('style');
style.textContent = `
    .markdown-highlight {
        background: linear-gradient(120deg, rgba(255, 255, 0, 0.4) 0%, rgba(255, 255, 0, 0.4) 100%);
        background-repeat: no-repeat;
        background-size: 100% 0.4em;
        background-position: 0 88%;
        transition: background-size 0.25s ease-in;
        padding: 0 2px;
        border-radius: 2px;
        box-shadow: 0 0 8px rgba(255, 255, 0, 0.3);
        position: relative;
        z-index: 1;
    }
    #answer-markdown {
        position: relative;
        z-index: 1;
    }
`;
document.head.appendChild(style);

// Initialize content from config
const questionMarkdown = config.question.markdown;
const answerMarkdown = config.answer.markdown;
const bottomCards = config.bottomCards;
const exploreCardsData = config.exploreCards;
const categoryIcons = config.categoryIcons;

// Render markdown
document.getElementById('question-markdown').innerHTML = marked.parse(questionMarkdown);

// Highlight and anchor answer sections
function highlightAnswerSections(answer, cards, exploreCardsData) {
    // Collect all anchor texts (from both bottom and explore cards)
    const anchorTexts = [
        ...cards.map(card => card.anchorText),
        ...Object.values(exploreCardsData).flat().map(card => card.anchorText)
    ].filter(Boolean);

    // Remove duplicates, keep order
    const uniqueAnchorTexts = [...new Set(anchorTexts)];

    // For each anchor text, replace only the first occurrence, and skip if already inside a span
    let html = answer;
    uniqueAnchorTexts.forEach(anchorText => {
        const anchorAttr = anchorText.replace(/\s/g, '-').toLowerCase();
        let replaced = false;
        
        // Remove any existing bold formatting from the anchor text
        const cleanAnchorText = anchorText.replace(/\*\*/g, '');
        
        // Create a more flexible regex that matches the text regardless of formatting
        const regex = new RegExp(`(\\*\\*)?${cleanAnchorText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\*\\*)?`, 'i');
        
        html = html.replace(regex, (match, p1, p2, offset, string) => {
            if (!replaced && !string.slice(0, offset).includes(`<span data-anchor="${anchorAttr}">`)) {
                replaced = true;
                return `<span data-anchor="${anchorAttr}">${cleanAnchorText}</span>`;
            }
            return match;
        });
    });
    return html;
}

document.getElementById('answer-markdown').innerHTML = marked.parse(
    highlightAnswerSections(answerMarkdown, bottomCards, exploreCardsData)
);

// Render bottom cards
const bottomCardsContainer = document.getElementById('bottom-cards');
bottomCardsContainer.innerHTML = ''; // Clear in case of hot reload
bottomCards.forEach((card) => {
    const div = document.createElement('div');
    div.className = `bottom-card type${card.type}`;
    div.id = `bottom-card-${card.id}`;
    div.innerHTML = `
        <div class="card-category">
            <span class="category-icon">${categoryIcons[card.title] || "📁"}</span>
            ${card.title}
        </div>
        <div class="card-title" style="display:none">${card.title}</div>
        <div class="card-summary">${card.summary}</div>
        <div class="card-content">${card.content}</div>
        <button>Explore more</button>
    `;
    div.querySelector('button').addEventListener('click', () => handleExploreMore(card));
    bottomCardsContainer.appendChild(div);
});

document.querySelector('.carousel-arrow.left').addEventListener('click', () => scrollBottomCards('left'));
document.querySelector('.carousel-arrow.right').addEventListener('click', () => scrollBottomCards('right'));

let lastExploreType = null;
let lastExploreCategory = null;

function handleExploreMore(card) {
    console.log('handleExploreMore called with card:', card);
    // Clear previous explore cards
    const exploreCardsContainer = document.getElementById('explore-cards');
    exploreCardsContainer.innerHTML = '';
    
    // Set container class based on card type
    if (card.type === 2) {
        exploreCardsContainer.className = 'explore-cards type2-container';
    } else {
        exploreCardsContainer.className = 'explore-cards';
    }

    // Remove all highlights first
    document.querySelectorAll('.markdown-highlight').forEach(section => {
        section.classList.remove('markdown-highlight');
    });

    const exploreCards = exploreCardsData[card.id] || [];
    lastExploreType = card.type;
    lastExploreCategory = card.title;
    console.log('Last explore type set to:', lastExploreType);

    // Create a promise to handle scroll completion
    const scrollToTop = () => {
        return new Promise((resolve) => {
            const scrollWrapper = document.querySelector('.scroll-wrapper');
            const answerSection = document.getElementById('answer-markdown');
            
            // Smooth scroll the scroll-wrapper to top
            scrollWrapper.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Force scroll answer section to top
            answerSection.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // Wait for scroll to complete
            setTimeout(resolve, 500);
        });
    };

    // Wait for scroll to complete before positioning cards
    scrollToTop().then(() => {
        console.log('Scroll completed, creating cards');
        
        // Clear previous explore cards
        exploreCardsContainer.innerHTML = '';

        if (card.type === 2) {
            // For type 2 cards, create a simple stacked layout
            exploreCards.forEach((exploreCard) => {
                const div = document.createElement('div');
                div.className = `card highlight type${exploreCard.type}`;
                div.innerHTML = `
                    <div class="card-category">
                        <span class="category-icon">${categoryIcons[lastExploreCategory] || "📁"}</span>
                        ${lastExploreCategory}
                    </div>
                    <div class="card-title" style="display:none">${lastExploreCategory}</div>
                    <div class="card-summary">${exploreCard.summary}</div>
                    <div class="card-content">${exploreCard.content}</div>
                `;
                div.dataset.anchor = exploreCard.anchorText.replace(/\s/g, '-').toLowerCase();
                exploreCardsContainer.appendChild(div);
            });

            // Ensure proper positioning after cards are added
            requestAnimationFrame(() => {
                const cards = exploreCardsContainer.querySelectorAll('.card');
                cards.forEach(card => {
                    // Remove fixed width setting to allow responsive behavior
                    card.style.width = '100%';
                    card.style.maxWidth = '100%';
                });
            });
        } else {
            // For type 1 cards, use the existing anchor-based positioning
            const highlightedSections = [];
            exploreCards.forEach(c => {
                const anchorAttr = c.anchorText.replace(/\s/g, '-').toLowerCase();
                const sections = document.querySelectorAll(`[data-anchor="${anchorAttr}"]`);
                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    highlightedSections.push({
                        element: section,
                        rect: {
                            ...rect,
                            top: rect.top + window.pageYOffset,
                            bottom: rect.bottom + window.pageYOffset
                        }
                    });
                });
            });

            // Sort highlighted sections by vertical position
            highlightedSections.sort((a, b) => a.rect.top - b.rect.top);

            // Create and position cards
            let lastCardBottom = 0;
            const cardSpacing = 0;

            highlightedSections.forEach((section, index) => {
                const exploreCard = exploreCards[index];
                if (!exploreCard) return;
                const div = document.createElement('div');
                div.className = `card highlight type${exploreCard.type}`;
                div.style.position = 'absolute';
                div.style.zIndex = '5';
                div.style.left = '0';
                div.style.width = '100%';
                div.innerHTML = `
                    <div class="card-category">
                        <span class="category-icon">${categoryIcons[card.title] || "📁"}</span>
                        ${card.title}
                    </div>
                    <div class="card-title" style="display:none">${card.title}</div>
                    <div class="card-summary">${exploreCard.summary}</div>
                    <div class="card-content">${exploreCard.content}</div>
                `;
                div.dataset.anchor = exploreCard.anchorText.replace(/\s/g, '-').toLowerCase();
                exploreCardsContainer.appendChild(div);
                const cardRect = div.getBoundingClientRect();
                const sectionRect = section.rect;
                const targetY = sectionRect.top;
                let cardTop = targetY - (cardRect.height / 2);
                if (cardTop < lastCardBottom + cardSpacing) {
                    cardTop = lastCardBottom + cardSpacing;
                }
                lastCardBottom = cardTop + cardRect.height;
                div.style.top = `${cardTop}px`;
            });
        }

        // Highlight the corresponding bottom card
        const bottomCard = document.getElementById(`bottom-card-${card.id}`);
        bottomCard.classList.add('highlight');
        bottomCard.style.position = 'relative';
        bottomCard.style.zIndex = '20';

        // Add highlights to the anchor texts only for type 1 cards
        if (card.type === 1) {
            exploreCards.forEach(exploreCard => {
                const anchorAttr = exploreCard.anchorText.replace(/\s/g, '-').toLowerCase();
                const sections = document.querySelectorAll(`[data-anchor="${anchorAttr}"]`);
                sections.forEach(section => {
                    section.classList.add('markdown-highlight');
                });
            });
        }

        // Redraw connections only for type 1 cards
        if (card.type === 1) {
            setTimeout(drawConnections, 0);
        }

        // Scroll to the first explore card
        const firstCard = document.querySelector('.explore-cards .card');
        if (firstCard) {
            const scrollWrapper = document.querySelector('.scroll-wrapper');
            const firstCardTop = firstCard.getBoundingClientRect().top + scrollWrapper.scrollTop;
            scrollWrapper.scrollTo({
                top: firstCardTop - 20,
                behavior: 'smooth'
            });
        }
    });
}

// Update clearHighlights to remove expand/collapse logic
function clearHighlights() {
    document.querySelectorAll('.markdown-highlight').forEach(section => {
        section.classList.remove('markdown-highlight');
    });
    document.querySelectorAll('.card.highlight').forEach(card => {
        card.classList.remove('highlight');
    });
    document.getElementById('explore-cards').innerHTML = '';
    drawConnections();
}

// Carousel arrow navigation
function scrollBottomCards(direction) {
    const container = document.getElementById('bottom-cards');
    const scrollAmount = 320; // Adjust to match card width
    if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

// Draw connections between highlighted sections and cards
function drawConnections() {
    if (window.lastExploreType === '2') return; // Ensure this is checked before anything else
    const container = document.querySelector('.cards-section');
    const canvas = document.getElementById('connections');
    
    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Could not get canvas context!');
        return;
    }

    // Set canvas size to match container
    const containerRect = container.getBoundingClientRect();
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '3';

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Get all highlighted sections and their corresponding cards
    const highlightedSections = document.querySelectorAll('.markdown-highlight');
    const exploreCards = document.querySelectorAll('.explore-cards .card');

    // Draw connections only for type 1 cards
    highlightedSections.forEach((section, index) => {
        const card = exploreCards[index];
        if (!card || card.classList.contains('type2')) return; // Skip type 2 cards

        const sectionRect = section.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();

        // Calculate connection points - keep Y position aligned with anchor text
        const startX = sectionRect.right;
        const startY = sectionRect.top + sectionRect.height / 2;
        const endX = cardRect.left;
        const endY = startY;

        // Draw the line
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = '#4f8cff';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
    });
}

// Make sure canvas exists in the DOM
function ensureCanvasExists() {
    let canvas = document.getElementById('connections');
    if (!canvas) {
        console.log('Creating canvas element');
        canvas = document.createElement('canvas');
        canvas.id = 'connections';
        document.body.appendChild(canvas);
    }
    return canvas;
}

// Update setupScrollListeners to ensure lines are redrawn more frequently
function setupScrollListeners() {
    const scrollWrapper = document.querySelector('.scroll-wrapper');
    const answerSection = document.getElementById('answer-markdown');
    const exploreSection = document.getElementById('explore-cards');

    // Sync scrolling between panels
    answerSection.addEventListener('scroll', () => {
        exploreSection.scrollTop = answerSection.scrollTop;
        requestAnimationFrame(drawConnections);
    });

    exploreSection.addEventListener('scroll', () => {
        answerSection.scrollTop = exploreSection.scrollTop;
        requestAnimationFrame(drawConnections);
    });

    // Add window resize listener
    window.addEventListener('resize', () => {
        requestAnimationFrame(drawConnections);
    });

    // Add scroll listener to the wrapper
    scrollWrapper.addEventListener('scroll', () => {
        requestAnimationFrame(drawConnections);
    });

    // Add scroll listener to window
    window.addEventListener('scroll', () => {
        requestAnimationFrame(drawConnections);
    });

    // Add a more frequent redraw to ensure lines stay visible
    setInterval(drawConnections, 50);  // Increased frequency from 100ms to 50ms
}

// Initialize
ensureCanvasExists();
setupScrollListeners();
drawConnections();

// Carousel show/hide functionality
document.addEventListener('DOMContentLoaded', function() {
    const bottomCards = document.querySelector('.bottom-cards');
    const expandBtn = document.getElementById('expand-carousel-btn');
    const container = document.querySelector('.container');
    
    // Handle expand button click
    expandBtn.addEventListener('click', () => {
        const isExpanded = bottomCards.classList.contains('expanded');
        if (isExpanded) {
            bottomCards.classList.remove('expanded');
            container.classList.remove('carousel-expanded');
            expandBtn.textContent = 'Show reflection cards';
            // Clear highlights when hiding reflection cards
            clearHighlights();
        } else {
            bottomCards.classList.add('expanded');
            container.classList.add('carousel-expanded');
            expandBtn.textContent = 'Hide reflection cards';
        }
    });

    // Handle page navigation
    const pageSelector = document.getElementById('page-selector');
    pageSelector.addEventListener('change', function() {
        const pageId = this.value;
        window.location.href = pageId === '1' ? '/' : `/question${pageId}`;
    });
});

// Make lastExploreType global
window.lastExploreType = lastExploreType;
// After rendering explore cards, call drawConnections
setTimeout(drawConnections, 0); 