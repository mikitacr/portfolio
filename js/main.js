// Ждем, пока вся HTML-страница полностью загрузится
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. СКРИПТ: РАБОТА МОБИЛЬНОГО БУРГЕР-МЕНЮ
       ========================================================================== */
    const burgerBtn = document.getElementById('burger-btn');
    const navigation = document.getElementById('navigation');
    const navLinks = document.querySelectorAll('.menu-link');

    if (burgerBtn && navigation) {
        // Открытие и закрытие меню по клику на саму иконку бургера
        burgerBtn.addEventListener('click', () => {
            burgerBtn.classList.toggle('active');  // Превращает полоски в крестик
            navigation.classList.toggle('open');   // Выдвигает или прячет панель меню
            
            // Блокируем скролл страницы на мобильном, когда меню открыто
            if (navigation.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Автоматически закрываем меню и возвращаем скролл при клике на любой пункт меню
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                burgerBtn.classList.remove('active');
                navigation.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }


    /* ==========================================================================
       2. СКРИПТ: ПОДСВЕТКА ПУНКТОВ МЕНЮ ПРИ НАВЕДЕНИИ
       ========================================================================== */
    const menuLinks = document.querySelectorAll('.menu-link');

    menuLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.color = '#000000'; // Становится насыщенно-черным
        });

        link.addEventListener('mouseleave', () => {
            link.style.color = '#555555'; // Возвращается в темно-серый
        });
    });


    /* ==========================================================================
       3. СКРИПТ: СЛУЧАЙНЫЙ ПОРЯДОК РАБОТ ПРИ ПЕРЕЗАГРУЗКЕ СТРАНИЦЫ
       ========================================================================== */
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    if (portfolioGrid) {
        // 1. Собираем все карточки портфолио в массив
        const items = Array.from(portfolioGrid.children);
        
        // 2. Алгоритм тасования Фишера-Йетса (перемешиваем массив случайным образом)
        for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
        }
        
        // 3. Очищаем сетку и вставляем карточки уже в новом, случайном порядке
        portfolioGrid.innerHTML = '';
        items.forEach(item => portfolioGrid.appendChild(item));
    }


    /* ==========================================================================
       4. СКРИПТ: УМНЫЙ АВТОПЛЕЙ ВИДЕО В КОЛЛАЖЕ ПРИ СКРОЛЛЕ
       ========================================================================== */
    // (ВАЖНО: запускаем поиск видео ТОЛЬКО ПОСЛЕ того, как перемешали карточки выше)
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


    /* ==========================================================================
       5. СКРИПТ: КОПИРОВАНИЕ НИКНЕЙМОВ В БУФЕР ОБМЕНА
       ========================================================================== */
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

    /* ==========================================================================
       6. СКРИПТ: КНОПКА "НАВЕРХ" (ПЛАВНОЕ ПОЯВЛЕНИЕ И КЛИК)
       ========================================================================== */
    const backToTopBtn = document.getElementById('back-to-top');

    if (backToTopBtn) {
        // Следим за скроллом страницы
        window.addEventListener('scroll', () => {
            // Если прокрутили больше 400 пикселей — показываем кнопку, иначе — скрываем
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        // Плавный возврат наверх при клике на стрелку
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Задает плавную прокрутку вместо резкого прыжка
            });
        });
    }

}); // Это самый финал файла, закрывающий DOMContentLoaded