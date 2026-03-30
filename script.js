// script.js - Dark Theme Version
document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Menu Logic ---
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const closeMenuBtn = document.getElementById('closeMenuBtn');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
  
  function openMobileMenu() {
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  
  function closeMobileMenu() {
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  
  if (mobileBtn) mobileBtn.addEventListener('click', openMobileMenu);
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      closeMobileMenu();
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
  
  // --- Active navigation highlight on scroll ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  function updateActiveNav() {
    let current = '';
    const scrollPos = window.scrollY + 150;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active-nav');
      const href = link.getAttribute('href').substring(1);
      if (href === current) {
        link.classList.add('active-nav');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();
  
  // --- Testimonials Carousel Logic ---
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevTesti');
  const nextBtn = document.getElementById('nextTesti');
  const dotsContainer = document.getElementById('sliderDots');
  let currentIndex = 0;
  let cardWidth = 0;
  let visibleCards = 1;
  
  function updateCarouselDimensions() {
    if (!track) return;
    const containerWidth = track.parentElement.clientWidth;
    const trackCards = Array.from(track.children);
    if (trackCards.length === 0) return;
    
    if (containerWidth >= 992) visibleCards = 3;
    else if (containerWidth >= 768) visibleCards = 2;
    else visibleCards = 1;
    
    const gap = 32;
    const cardBaseWidth = (containerWidth - (visibleCards - 1) * gap) / visibleCards;
    trackCards.forEach(card => {
      card.style.flex = `0 0 ${cardBaseWidth}px`;
    });
    cardWidth = cardBaseWidth + gap;
    const maxIndex = Math.max(0, trackCards.length - visibleCards);
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    updateDots(trackCards.length);
    setActiveDot();
  }
  
  function updateDots(totalCards) {
    if (!dotsContainer) return;
    const dotsCount = Math.max(1, totalCards - visibleCards + 1);
    dotsContainer.innerHTML = '';
    for (let i = 0; i < dotsCount; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.addEventListener('click', () => {
        currentIndex = i;
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        setActiveDot();
      });
      dotsContainer.appendChild(dot);
    }
    setActiveDot();
  }
  
  function setActiveDot() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) dot.classList.add('active');
      else dot.classList.remove('active');
    });
  }
  
  function slideNext() {
    if (!track) return;
    const totalCards = track.children.length;
    const maxIndex = Math.max(0, totalCards - visibleCards);
    if (currentIndex < maxIndex) {
      currentIndex++;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      setActiveDot();
    }
  }
  
  function slidePrev() {
    if (currentIndex > 0) {
      currentIndex--;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      setActiveDot();
    }
  }
  
  if (track && prevBtn && nextBtn) {
    window.addEventListener('resize', () => {
      updateCarouselDimensions();
    });
    updateCarouselDimensions();
    prevBtn.addEventListener('click', slidePrev);
    nextBtn.addEventListener('click', slideNext);
    setTimeout(() => updateCarouselDimensions(), 100);
  }
  
  // --- Gestione form di contatto con Formspree ---
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validazione base
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        
        if (!name || !email) {
            if (formFeedback) {
                formFeedback.innerHTML = '<span style="color:#E67E22;">⚠️ Per favore, inserisci nome e email.</span>';
                setTimeout(() => { if(formFeedback) formFeedback.innerHTML = ''; }, 3000);
            }
            return;
        }
        
        // Mostra messaggio di caricamento
        formFeedback.innerHTML = '<span style="color:#5DADE2;">📨 Invio in corso...</span>';
        
        try {
            // Invia i dati a Formspree
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formFeedback.innerHTML = '<span style="color:#5DADE2;"> Grazie! Ti risponderò entro 24 ore. </span>';
                contactForm.reset();
                setTimeout(() => {
                    if(formFeedback) formFeedback.innerHTML = '';
                }, 5000);
            } else {
                throw new Error('Errore invio');
            }
        } catch (error) {
            formFeedback.innerHTML = '<span style="color:#E67E22;">❌ Errore nell\'invio. Prova a ricaricare la pagina e riprova.</span>';
            setTimeout(() => {
                if(formFeedback) formFeedback.innerHTML = '';
            }, 5000);
        }
    });
}
  
  // --- Smooth scroll per tutti i link interni ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === "#" || targetId === "") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
        if (mobileOverlay.classList.contains('open')) closeMobileMenu();
      }
    });
  });
  
  // Header scroll effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.padding = '0.6rem 0';
      header.style.borderBottomColor = 'rgba(93, 173, 226, 0.3)';
    } else {
      header.style.padding = '1rem 0';
      header.style.borderBottomColor = 'rgba(93, 173, 226, 0.2)';
    }
  });
});

    // --- Slider Before/After Interattivo ---
    function initBeforeAfterSliders() {
        const sliders = document.querySelectorAll('.slider-container');
        
        sliders.forEach(container => {
            const sliderInput = container.querySelector('.slider-input');
            const overlay = container.querySelector('.slider-overlay');
            const handle = container.querySelector('.slider-handle');
            
            if (!sliderInput || !overlay || !handle) return;
            
            // Imposta la posizione iniziale
            const initialValue = sliderInput.value;
            overlay.style.width = initialValue + '%';
            handle.style.left = initialValue + '%';
            
            // Aggiungi indicatore percentuale opzionale
            const percentageSpan = document.createElement('div');
            percentageSpan.className = 'slider-percentage';
            percentageSpan.textContent = Math.round(initialValue) + '%';
            container.querySelector('.slider-image').appendChild(percentageSpan);
            
            // Funzione per aggiornare lo slider
            function updateSlider(value) {
                const percent = value;
                overlay.style.width = percent + '%';
                handle.style.left = percent + '%';
                percentageSpan.textContent = Math.round(percent) + '%';
                
                // Effetto visivo: cambia colore della maniglia in base alla percentuale
                if (percent < 30) {
                    handle.style.background = '#E67E22';
                } else if (percent > 70) {
                    handle.style.background = '#2ECC71';
                } else {
                    handle.style.background = '#5DADE2';
                }
                
                // Aggiorna anche il colore dell'icona
                const icon = handle.querySelector('.slider-handle-icon');
                if (icon) {
                    icon.style.background = handle.style.background;
                }
            }
            
            // Evento per quando si trascina lo slider
            sliderInput.addEventListener('input', function(e) {
                updateSlider(e.target.value);
            });
            
            // Evento per quando si clicca direttamente sull'immagine
            const imageContainer = container.querySelector('.slider-image');
            imageContainer.addEventListener('click', function(e) {
                const rect = imageContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percent = (x / rect.width) * 100;
                const clampedPercent = Math.min(100, Math.max(0, percent));
                sliderInput.value = clampedPercent;
                updateSlider(clampedPercent);
            });
            
            // Effetto hover sulla maniglia
            handle.addEventListener('mouseenter', () => {
                handle.style.boxShadow = '0 0 20px rgba(93, 173, 226, 0.8)';
            });
            
            handle.addEventListener('mouseleave', () => {
                handle.style.boxShadow = '0 0 15px rgba(93, 173, 226, 0.5)';
            });
        });
    }
    
    // Inizializza gli slider quando la pagina è caricata
    initBeforeAfterSliders();
