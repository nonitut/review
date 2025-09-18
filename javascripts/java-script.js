    document.addEventListener("DOMContentLoaded", function() {
    // --- Инициализация UTM-параметров ---
    // function getParam(param) {
    //     let params = new URLSearchParams(window.location.search);
    //     return params.get(param) || '';
    // }

    // const utmFields = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    // utmFields.forEach(param => {
    //     const input = document.getElementById(param);
    //     if (input) input.value = getParam(param);
    // });


    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.fade-up').forEach((el) => {
    gsap.to(el, {
        scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none'
    },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
    });
    });

    // Плавное появление карточек
    gsap.utils.toArray('.card').forEach((card, i) => {
    gsap.to(card, {
        scrollTrigger: {
        trigger: card,
        start: 'top 90%',
        toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: i * 0.1,
        ease: 'power2.out'
    });
    });

    document.querySelectorAll('a[data-scroll]').forEach(link => {
    link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
        gsap.to(window, {
        duration: 1,
        scrollTo: {
            y: target,
            offsetY: 80 // отступ, если у тебя фиксированный header
        },
        ease: 'power2.out'
        });
    }
    });
    });

    
});  