document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Theme Toggle (Dark / Light Mode)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        document.body.classList.remove('light-mode');
        themeIcon.className = 'fa-solid fa-moon';
    }
    
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            themeIcon.className = 'fa-solid fa-sun';
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.className = 'fa-solid fa-moon';
            localStorage.setItem('theme', 'dark');
        }
    });

    /* ==========================================================================
       2. Sticky Navbar Scroll Effect
       ========================================================================== */
    const navbar = document.querySelector('.navbar-container');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       3. Mobile Navigation Drawer Toggle
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNavDrawer = document.getElementById('mobileNavDrawer');
    const drawerCloseBtn = document.getElementById('drawerCloseBtn');
    const drawerLinks = document.querySelectorAll('.drawer-link');

    const openDrawer = () => {
        mobileNavDrawer.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeDrawer = () => {
        mobileNavDrawer.classList.remove('open');
        document.body.style.overflow = ''; // Restore background scrolling
    };

    mobileMenuBtn.addEventListener('click', openDrawer);
    drawerCloseBtn.addEventListener('click', closeDrawer);
    
    drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    /* ==========================================================================
       4. Typing Effect (Hero Section)
       ========================================================================== */
    const words = ["BCA Student", "Stage Anchor", "Shayari Writer", "Continuous Learner"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedTextSpan = document.getElementById('typed-text');
    let typingSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Deleting is faster
        } else {
            typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 300;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (typedTextSpan) {
        typeEffect();
    }

    /* ==========================================================================
       5. Interactive Timeline (Journey Steps)
       ========================================================================== */
    const timelineData = [
        {
            year: "2000s - 2022",
            tag: "Roots & Inspiration",
            heading: "Serene Childhood in Rishikesh",
            description: "Growing up in Rishikesh, Uttarakhand, surrounded by the Himalayas and the pure flow of the Ganges. The peaceful environment and spiritual vibe sparked my creativity, giving me a deep respect for silence and written words.",
            lesson: "\"Simplicity and inner peace build the strongest foundations, helping us stay calm amidst life's chaos.\""
        },
        {
            year: "2023 - Present",
            tag: "Education",
            heading: "BCA at CGC University Mohali",
            description: "Ventured into computer science at Chandigarh Group of Colleges. Designing algorithms, learning programming languages, and understanding technical logic. This transition opened up my technical intellect and broadened my horizons.",
            lesson: "\"Stepping outside your comfort zone is the primary key to discovering your potential.\""
        },
        {
            year: "2024",
            tag: "Hobbies & Skills",
            heading: "Taking the Stage: Anchoring",
            description: "Started hosting college festivals, technical gatherings, and cultural events. Handling microphone duties, connecting with audiences of hundreds, and managing the event flow dynamically with impromptu communication.",
            lesson: "\"Confidence is not about never failing; it is about building a bridge of connection with the audience.\""
        },
        {
            year: "2024 - Present",
            tag: "Creativity",
            heading: "The Power of Pen: Shayari",
            description: "Nurtured my love for Hindi and Urdu poetry. Expressing deep emotions, philosophy, struggles of life, and the beauty of continuous improvement through rhythmic couplets. Incorporating these couplets into my stage anchoring.",
            lesson: "\"Words hold immense power; when spoken from the heart, they can heal, inspire, and unite people.\""
        },
        {
            year: "2025 & Beyond",
            tag: "Philosophy",
            heading: "Every Step is a Lesson",
            description: "Adopting the lifelong philosophy that every step—whether a major success or a minor stumble—is an asset. Combining tech logic (BCA) with stage confidence (Anchoring) and emotional expressions (Shayari) to grow every single day.",
            lesson: "\"Never stop learning, because life never stops teaching.\""
        }
    ];

    const timelineNodes = document.querySelectorAll('.timeline-node');
    const timelineProgressBar = document.getElementById('timelineProgressBar');
    const stepYear = document.getElementById('stepYear');
    const stepTag = document.getElementById('stepTag');
    const stepHeading = document.getElementById('stepHeading');
    const stepDescription = document.getElementById('stepDescription');
    const stepLesson = document.getElementById('stepLesson');
    const timelineContentDisplay = document.getElementById('timelineContentDisplay');

    function updateProgressBar(activeStepIndex) {
        const totalNodes = timelineNodes.length;
        const progressPercentage = (activeStepIndex / (totalNodes - 1)) * 100;
        timelineProgressBar.style.width = `${progressPercentage}%`;
    }

    function renderTimelineStep(index) {
        const data = timelineData[index];
        timelineContentDisplay.style.animation = 'none';
        void timelineContentDisplay.offsetWidth; // force reflow
        
        stepYear.textContent = data.year;
        stepTag.textContent = data.tag;
        stepHeading.textContent = data.heading;
        stepDescription.textContent = data.description;
        stepLesson.textContent = data.lesson;
        
        timelineContentDisplay.style.animation = 'slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    }

    timelineNodes.forEach(node => {
        node.addEventListener('click', () => {
            const selectedStep = parseInt(node.getAttribute('data-step'), 10);
            
            timelineNodes.forEach(btn => btn.classList.remove('active'));
            node.classList.add('active');
            
            updateProgressBar(selectedStep);
            renderTimelineStep(selectedStep);
        });
    });

    updateProgressBar(0);

    /* ==========================================================================
       6. Shayari Slider Section
       ========================================================================== */
    const shayariList = [
        {
            hindi: "रास्तों से कहो कि मैं रुकने वाला नहीं,<br>मंज़िल अभी दूर है पर मैं झुकने वाला नहीं।<br>हर ठोकर ने मुझे चलना सिखाया है,<br>मैं वो मुसाफ़िर हूँ जो कभी थकने वाला नहीं।",
            latin: "\"Raaston se kaho ki main rukne wala nahi,<br>Manzil abhi door hai par main jhukne wala nahi.<br>Har thokar ne mujhe chalna sikhaya hai,<br>Main wo musafir hoon jo kabhi thakne wala nahi.\"",
            meaning: "Tell the paths that I am not going to stop. The destination is far, but I will not bow down. Every stumble has taught me how to walk, I am a traveler who will never get tired."
        },
        {
            hindi: "कदम-कदम पर नए सबक सिखाती है ये जिंदगी,<br>तजुर्बों की धूप में सोना बनाती है ये जिंदगी।<br>हार हो या जीत, सफर का अपना ही मजा है,<br>हर मोड़ पर एक नई राह दिखाती है ये जिंदगी।",
            latin: "\"Kadam-kadam par naye sabaq sikhati hai ye zindagi,<br>Tajurbon ki dhoop mein sona banati hai ye zindagi.<br>Haar ho ya jeet, safar ka apna hi maza hai,<br>Har mod par ek nayi raah dikhati hai ye zindagi.\"",
            meaning: "At every step, life teaches a new lesson. In the heat of experiences, it refines you into gold. Loss or win, the journey itself is a delight, showing a new path at every turn."
        },
        {
            hindi: "मंच पर जब जाता हूँ तो समां बदल जाता है,<br>लफ्ज़ जब बोलते हैं तो जहां बदल जाता है।<br>एंकरिंग सिर्फ बातें करना नहीं यारों,<br>ये वो जरिया है जिससे दिल का रास्ता मिल जाता है।",
            latin: "\"Manch par jab jata hoon to samaa badal jata hai,<br>Lafz jab bolte hain to jahaan badal jata hai.<br>Anchoring sirf baatein karna nahi yaaron,<br>Ye wo zariya hai jisse dil ka raasta mil jata hai.\"",
            meaning: "When I walk onto the stage, the atmosphere changes. When words speak, the world shifts. Anchoring isn't just about talking, friends, it's the medium that unlocks paths to peoples' hearts."
        },
        {
            hindi: "गंगा की लहरों सा चंचल मन,<br>ऋषिकेश की वादियों सा शांत जीवन।<br>हर मोड़ पर नया अनुभव पाता हूँ,<br>सीख कर हर कदम पर आगे बढ़ता जाता हूँ।",
            latin: "\"Ganga ki lehron sa chanchal mann,<br>Rishikesh ki vaadiyon sa shaant jeevan.<br>Har mod par naya anubhav paata hoon,<br>Seekh kar har kadam par aage badhta jaata hoon.\"",
            meaning: "Mind restless like the waves of the Ganges, life peaceful like the valleys of Rishikesh. At every bend, I find a new experience, learning and moving forward with every step."
        }
    ];

    let currentShayariIndex = 0;
    const shayariCard = document.getElementById('shayariCard');
    const shayariHindi = document.getElementById('shayariHindi');
    const shayariLatin = document.getElementById('shayariLatin');
    const shayariMeaning = document.getElementById('shayariMeaning');
    const shayariCounter = document.getElementById('shayariCounter');
    const prevBtn = document.getElementById('prevShayariBtn');
    const nextBtn = document.getElementById('nextShayariBtn');
    const copyBtn = document.getElementById('copyShayariBtn');

    function updateShayariCard() {
        const shayari = shayariList[currentShayariIndex];
        
        shayariCard.classList.remove('active');
        void shayariCard.offsetWidth; // force reflow
        
        shayariHindi.innerHTML = shayari.hindi;
        shayariLatin.innerHTML = shayari.latin;
        shayariMeaning.innerHTML = `<strong>English Meaning:</strong> ${shayari.meaning}`;
        
        shayariCounter.textContent = `${currentShayariIndex + 1} / ${shayariList.length}`;
        shayariCard.classList.add('active');
        
        copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copy';
    }

    prevBtn.addEventListener('click', () => {
        currentShayariIndex = (currentShayariIndex - 1 + shayariList.length) % shayariList.length;
        updateShayariCard();
    });

    nextBtn.addEventListener('click', () => {
        currentShayariIndex = (currentShayariIndex + 1) % shayariList.length;
        updateShayariCard();
    });

    copyBtn.addEventListener('click', () => {
        const shayari = shayariList[currentShayariIndex];
        const cleanHindi = shayari.hindi.replace(/<br>/g, '\n');
        const cleanLatin = shayari.latin.replace(/<br>/g, '\n').replace(/"/g, '');
        const copyText = `${cleanHindi}\n\n${cleanLatin}\n\nEnglish Translation: ${shayari.meaning}\n— Vinay Verma`;
        
        navigator.clipboard.writeText(copyText).then(() => {
            copyBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Copied!';
            setTimeout(() => {
                copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copy';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy shayari: ', err);
        });
    });

    /* ==========================================================================
       7. Form Submission (Simulated)
       ========================================================================== */
    const contactForm = document.getElementById('portfolioContactForm');
    const toast = document.getElementById('toastNotification');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');

    const showToast = (title, message, isSuccess = true) => {
        toastTitle.textContent = title;
        toastMessage.textContent = message;
        
        const toastIcon = toast.querySelector('.toast-icon');
        if (isSuccess) {
            toastIcon.className = 'fa-solid fa-circle-check toast-icon';
            toast.style.borderColor = 'var(--primary)';
            toastIcon.style.color = 'var(--primary)';
        } else {
            toastIcon.className = 'fa-solid fa-triangle-exclamation toast-icon';
            toast.style.borderColor = 'var(--accent)';
            toastIcon.style.color = 'var(--accent)';
        }

        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    };

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('form-name').value;
        const email = document.getElementById('form-email').value;
        const subject = document.getElementById('form-subject').value;
        const message = document.getElementById('form-message').value;

        if (name && email && subject && message) {
            const submitBtn = document.getElementById('submitFormBtn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showToast(
                    'Message Sent!', 
                    `Thank you, ${name}. Your message has reached Vinay Verma.`
                );
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        } else {
            showToast('Form Error', 'Please fill out all fields before sending.', false);
        }
    });

    /* ==========================================================================
       8. Scroll Reveal Animation (Intersection Observer)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(element => {
        revealOnScroll.observe(element);
    });

    /* ==========================================================================
       9. Active Nav Link on Scroll
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});
