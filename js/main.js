document.addEventListener('DOMContentLoaded', () => {

    const burgerBtn = document.getElementById('burger-btn');
    const navigation = document.getElementById('navigation');
    const menuLinks = document.querySelectorAll('.menu-link');

    if (burgerBtn && navigation) {
        burgerBtn.addEventListener('click', () => {
            burgerBtn.classList.toggle('active');
            navigation.classList.toggle('open');
        });

        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                burgerBtn.classList.remove('active');
                navigation.classList.remove('open');
            });
        });
    }

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

    const modal = document.getElementById('video-modal');
    const modalPlayer = document.getElementById('modal-player');
    const modalImage = document.getElementById('modal-image');
    const modalClose = document.querySelector('.modal-close');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (modal) {
        portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
                const videoSrc = item.getAttribute('data-video');
                const clickedImg = item.querySelector('img');

                if (item.classList.contains('item-vertical')) {
                    modal.classList.add('modal-vertical-mode');
                } else {
                    modal.classList.remove('modal-vertical-mode');
                }

                if (videoSrc) {
                    modal.classList.remove('image-mode');
                    modal.classList.add('video-mode');
                    
                    modalPlayer.src = videoSrc;
                    modalPlayer.muted = true;
                    modal.classList.add('active');
                    
                    modalPlayer.play().catch(error => {
                        console.log("Автозапуск заблокирован браузером:", error);
                    });
                } 
                else if (clickedImg) {
                    modal.classList.remove('video-mode');
                    modal.classList.add('image-mode');
                    
                    modalImage.src = clickedImg.getAttribute('src');
                    modal.classList.add('active');
                }
            });
        });

        function closeModal() {
            modal.classList.remove('active');
            modal.classList.remove('video-mode');
            modal.classList.remove('image-mode');
            
            modalPlayer.pause();
            modalPlayer.src = "";
            modalImage.src = "";
        }

        if (modalClose) modalClose.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
        });
    }

    portfolioItems.forEach(item => {
        const videoUrl = item.getAttribute('data-video');
        if (videoUrl) {
            const tempVideo = document.createElement('video');
            tempVideo.src = videoUrl;
            tempVideo.preload = 'auto';

            tempVideo.addEventListener('canplaythrough', () => {
                item.classList.add('video-ready');
            }, { once: true });
        }
    });

    const contactValues = document.querySelectorAll('.contact-value');

    contactValues.forEach(item => {
        item.addEventListener('click', () => {
            const textToCopy = item.getAttribute('data-copy');
            
            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    item.classList.add('copied');
                    
                    setTimeout(() => {
                        item.classList.remove('copied');
                    }, 1500);
                }).catch(err => {
                    console.error('Ошибка при копировании текста: ', err);
                });
            }
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
