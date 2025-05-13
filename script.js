// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Matrix rain animation for the background
    createMatrixRain();
    
    // Typing animation functionality
    initTypewriterEffect();
    
    // Scroll reveal animations
    initScrollReveal();
    
    // Nav highlighting
    initNavHighlighting();
    
    // Form submission handling
    initFormHandler();
    
    // Initialize gallery if present
    initImageGallery();
});

// Function to initialize the image gallery
function initImageGallery() {
    // Check if gallery exists
    if (document.querySelector('.gallery-thumbnails')) {
        // Set the first thumbnail as active by default
        const thumbnails = document.querySelectorAll('.gallery-thumbnails .thumbnail');
        if (thumbnails.length > 0) {
            thumbnails[0].classList.add('active');
            
            // Add click event to all thumbnails
            thumbnails.forEach((thumbnail, index) => {
                thumbnail.addEventListener('click', function() {
                    // Update main image
                    document.getElementById('main-image').src = this.src;
                    
                    // Update active class
                    thumbnails.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            // Add enhanced zoom effect on hover for main image
            const mainImage = document.getElementById('main-image');
            if (mainImage) {
                const galleryMain = document.querySelector('.gallery-main');
                
                // Add zoomed class for extra styling
                galleryMain.classList.add('zoomable');
                
                galleryMain.addEventListener('mousemove', function(e) {
                    // Only apply zoom effect if device has hover capability
                    if (window.matchMedia('(hover: hover)').matches) {
                        const rect = galleryMain.getBoundingClientRect();
                        const x = (e.clientX - rect.left) / rect.width;
                        const y = (e.clientY - rect.top) / rect.height;
                        
                        // Apply stronger zoom with enhanced focus
                        mainImage.style.transformOrigin = `${x * 100}% ${y * 100}%`;
                        mainImage.style.transform = 'scale(1.5)'; // Stronger zoom on hover
                    }
                });
                
                // Reset transform on mouse leave
                galleryMain.addEventListener('mouseleave', function() {
                    mainImage.style.transformOrigin = 'center center';
                    mainImage.style.transform = 'scale(1)';
                });
                
                // Add zoom style
                const style = document.createElement('style');
                style.textContent = `
                    .gallery-main.zoomable {
                        cursor: zoom-in;
                    }
                    .gallery-main.zoomable img {
                        transition: transform 0.3s ease;
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }
}

// Function to change the main image
function changeImage(src, index) {
    // Change main image
    document.getElementById('main-image').src = src;
    
    // Update active thumbnail
    const thumbnails = document.querySelectorAll('.gallery-thumbnails .thumbnail');
    thumbnails.forEach(thumbnail => thumbnail.classList.remove('active'));
    thumbnails[index].classList.add('active');
}

// Function to create the Matrix-style digital rain effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-2';
    canvas.style.opacity = '0.15';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Matrix characters - using a mix of katakana, latin and special characters
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$+-*/=%"\'#&_(),.;:?!\\|{}<>[]^~';
    const columns = Math.floor(canvas.width / 20); // Each character takes about 20px width
    const drops = [];

    // Initialize drops at random positions
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height);
    }

    function draw() {
        // Semi-transparent black to create the fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0aff41';
        ctx.font = '18px "Courier New"';

        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            // Get a random character
            const text = chars[Math.floor(Math.random() * chars.length)];
            
            // Draw the character
            ctx.fillText(text, i * 20, drops[i] * 20);
            
            // Reset to top if the drop reaches the bottom or randomly
            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Move the drop down
            drops[i]++;
        }
    }

    // Animation loop
    setInterval(draw, 35);

    // Resize canvas when window is resized
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Function to initialize the typewriter effect
function initTypewriterEffect() {
    const elements = document.querySelectorAll('.typing-text');
    
    elements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typingSpeed = 100; // Adjust typing speed (ms)
        
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        
        // Start the typing animation
        typeWriter();
    });
}

// Function to initialize scroll reveal animations
function initScrollReveal() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                // Stop observing after it's revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });
    
    // Add CSS for the animations via JavaScript
    const style = document.createElement('style');
    style.textContent = `
        .hidden {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .reveal {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.append(style);
}

// Function to highlight the active section in navigation
function initNavHighlighting() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Add CSS for the active nav link via JavaScript
    const style = document.createElement('style');
    style.textContent = `
        nav a.active {
            color: var(--accent-green);
        }
        
        nav a.active::after {
            width: 100%;
        }
    `;
    document.head.append(style);
}

// Function to handle form submission
function initFormHandler() {
    const form = document.querySelector('.contact-form form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(form);
            const formValues = {};
            
            for (const [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Simple form validation
            if (!formValues.name || !formValues.email || !formValues.message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate form submission
            simulateFormSubmission(formValues);
        });
    }
}

// Function to simulate form submission (would be replaced with actual API call)
function simulateFormSubmission(data) {
    // Display loading message
    showFormMessage('Sending message...', 'loading');
    
    // Simulate API call delay
    setTimeout(() => {
        // For demo purposes, just log the data and show success message
        console.log('Form data:', data);
        showFormMessage('Message sent successfully!', 'success');
        
        // Reset form
        document.querySelector('.contact-form form').reset();
    }, 1500);
}

// Function to show form submission messages
function showFormMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageEl = document.createElement('div');
    messageEl.className = `form-message ${type}`;
    messageEl.textContent = message;
    
    // Add to DOM after the submit button
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.parentNode.insertBefore(messageEl, submitBtn.nextSibling);
    
    // Remove success/error message after a delay
    if (type !== 'loading') {
        setTimeout(() => {
            messageEl.remove();
        }, 5000);
    }
    
    // Add CSS for the message via JavaScript
    const style = document.createElement('style');
    style.textContent = `
        .form-message {
            margin-top: 10px;
            padding: 10px;
            border-radius: 4px;
            font-family: var(--font-mono);
        }
        
        .form-message.success {
            background-color: rgba(0, 255, 65, 0.1);
            color: var(--accent-green);
            border-left: 3px solid var(--accent-green);
        }
        
        .form-message.error {
            background-color: rgba(255, 0, 0, 0.1);
            color: #ff4d4d;
            border-left: 3px solid #ff4d4d;
        }
        
        .form-message.loading {
            background-color: rgba(0, 0, 0, 0.1);
            color: var(--text-primary);
            border-left: 3px solid var(--text-primary);
        }
    `;
    document.head.append(style);
} 