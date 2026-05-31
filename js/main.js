document.addEventListener('DOMContentLoaded', () => {

    const burgerBtn = document.getElementById('burger-btn');
    const navigation = document.getElementById('navigation');
    const navLinks = document.querySelectorAll('.menu-link');

    if (burgerBtn && navigation) {
        burgerBtn.addEventListener('click', () => {
            burgerBtn.classList.toggle('active');
            navigation.classList.toggle('open');
            if (navigation.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                burgerBtn.classList.remove('active');
                navigation.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    const menuLinks = document.querySelectorAll('.menu-link');

    menuLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.color = '#000000';
        });

        link.addEventListener('mouseleave', () => {
            link.style.color = '#555555';
        });
    });

    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    if (portfolioGrid) {
        const items = Array.from(portfolioGrid.children);
        
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }
        
        portfolioGrid.innerHTML = '';
        items.forEach(item => portfolioGrid.appendChild(item));
    }

    const portfolioVideos = document.querySelectorAll('.portfolio-item video');

    const observerOptions = {
        root: null, 
        threshold: 0.2 
    };

    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            
            if (entry.isIntersecting) {
                video.play().catch(error => {
                    console.log("Автоплей ожидает взаимодействия пользователя:", error);
                });
            } else {
                video.pause();
            }
        });
    }, observerOptions);

    portfolioVideos.forEach(video => {
        videoObserver.observe(video);
    });

    const contactValues = document.querySelectorAll('.contact-value');

    contactValues.forEach(item => {
        item.addEventListener('click', () => {
            const textToCopy = item.getAttribute('data-copy');
            
            navigator.clipboard.writeText(textToCopy).then(() => {
                item.classList.add('copied');
                setTimeout(() => {
                    item.classList.remove('copied');
                }, 1500);
            }).catch(err => {
                console.error('Не удалось скопировать текст: ', err);
            });
        });
    });

    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});
