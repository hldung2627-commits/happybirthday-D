document.addEventListener("DOMContentLoaded", () => {
    // 1. INIT CONFIG DATA
    document.getElementById('intro-text').innerText = CONFIG.introText;
    document.getElementById('start-btn').innerText = CONFIG.startButtonText;
    document.getElementById('quiz-intro').innerText = CONFIG.quizText;
    document.getElementById('gift-text').innerText = CONFIG.giftText;
    document.getElementById('open-gift-btn').innerText = CONFIG.giftButton;
    document.getElementById('bday-name').innerText = CONFIG.name;
    document.getElementById('final-wall-text').innerText = CONFIG.finalWallText;
    document.getElementById('bg-music').src = CONFIG.music;

    // State
    let currentScene = 'scene-intro';
    let currentQuizIndex = 0;
    
    // Scene Switcher
    function switchScene(nextSceneId, allowScroll = false) {
        document.getElementById(currentScene).classList.remove('active');
        const next = document.getElementById(nextSceneId);
        next.classList.add('active');
        currentScene = nextSceneId;
        
        // Handle scrolling state
        if (allowScroll) {
            document.body.classList.add('scrollable');
        } else {
            document.body.classList.remove('scrollable');
            window.scrollTo(0, 0);
        }
    }

    // 2. BACKGROUND STARS
    const bgCanvas = document.getElementById('bg-canvas');
    const ctxBg = bgCanvas.getContext('2d');
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    
    const stars = Array.from({length: 100}, () => ({
        x: Math.random() * bgCanvas.width,
        y: Math.random() * bgCanvas.height,
        r: Math.random() * 1.5,
        alpha: Math.random()
    }));

    function drawBg() {
        ctxBg.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        stars.forEach(star => {
            ctxBg.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
            ctxBg.beginPath();
            ctxBg.arc(star.x, star.y, star.r, 0, Math.PI * 2);
            ctxBg.fill();
            star.y -= 0.2; // Move up slowly
            if(star.y < 0) star.y = bgCanvas.height;
        });
        requestAnimationFrame(drawBg);
    }
    drawBg();

    // 3. MUSIC CONTROLS
    const musicBtn = document.getElementById('music-btn');
    const audio = document.getElementById('bg-music');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            musicBtn.classList.remove('playing');
        } else {
            audio.play().catch(e => console.log("Audio play failed:", e));
            musicBtn.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });

    // 4. SCENE 1 -> 2 (INTRO to TIMELINE)
    document.getElementById('start-btn').addEventListener('click', () => {
        if (!isPlaying) musicBtn.click(); // Auto play music
        renderTimeline();
        switchScene('scene-timeline', true);
    });

    // RENDER TIMELINE
    function renderTimeline() {
        const container = document.getElementById('timeline-container');
        container.innerHTML = '';
        CONFIG.memories.forEach((mem, index) => {
            const el = document.createElement('div');
            el.className = 'timeline-item';
            el.innerHTML = `
                <div class="memory-card">
                    <span class="year-badge">${mem.year}</span>
                    <img src="${mem.image}" alt="Memory ${mem.year}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjIwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzQ0NCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg=='">
                    <h3 class="cinzel-font">${mem.title}</h3>
                    <p>${mem.description}</p>
                </div>
            `;
            container.appendChild(el);
        });

        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.3 });
        
        document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));
    }

    // 5. SCENE 2 -> 3 (TIMELINE to QUIZ)
    document.getElementById('to-quiz-btn').addEventListener('click', () => {
        renderQuiz();
        switchScene('scene-quiz', false);
    });

    function renderQuiz() {
        const qData = CONFIG.quiz[currentQuizIndex];
        document.getElementById('quiz-question').innerText = qData.question;
        const optionsContainer = document.getElementById('quiz-options');
        optionsContainer.innerHTML = '';
        
        qData.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'quiz-btn';
            btn.innerText = opt;
            btn.onclick = () => handleQuizAnswer(btn, idx, qData.answer);
            optionsContainer.appendChild(btn);
        });
    }

    function handleQuizAnswer(btn, selected, correct) {
        if (selected === correct) {
            btn.classList.add('correct');
            // Check if end of quiz
            setTimeout(() => {
                currentQuizIndex++;
                if (currentQuizIndex < CONFIG.quiz.length) {
                    renderQuiz();
                } else {
                    document.getElementById('quiz-content').classList.add('hidden');
                    document.getElementById('quiz-success').classList.remove('hidden');
                }
            }, 1000);
        } else {
            btn.classList.add('wrong');
            setTimeout(() => btn.classList.remove('wrong'), 500);
        }
    }

    // 6. SCENE 3 -> 4 (QUIZ to GIFT)
    document.getElementById('to-gift-btn').addEventListener('click', () => {
        switchScene('scene-gift', false);
    });

    // 7. OPEN GIFT -> MESSAGE
    document.getElementById('open-gift-btn').addEventListener('click', function() {
        this.style.display = 'none';
        const box = document.getElementById('gift-box');
        const lid = document.getElementById('box-lid');
        
        box.classList.add('shake');
        
        setTimeout(() => {
            box.classList.remove('shake');
            lid.classList.add('open');
            // Thêm hiệu ứng chói sáng
            const flash = document.createElement('div');
            flash.style.cssText = "position:absolute; inset:0; background:white; opacity:0; z-index:100; transition:opacity 1s;";
            document.body.appendChild(flash);
            
            setTimeout(() => {
                flash.style.opacity = '1';
                setTimeout(() => {
                    switchScene('scene-message', false);
                    flash.style.opacity = '0';
                    setTimeout(() => flash.remove(), 1000);
                    startTypewriter();
                }, 1000);
            }, 800);
            
        }, 1500);
    });

    // 8. TYPEWRITER EFFECT
    async function startTypewriter() {
        const container = document.getElementById('typewriter-text');
        container.innerHTML = '';
        
        for (let i = 0; i < CONFIG.birthdayMessage.length; i++) {
            const line = document.createElement('div');
            container.appendChild(line);
            
            const text = CONFIG.birthdayMessage[i];
            for (let j = 0; j < text.length; j++) {
                line.innerHTML = text.substring(0, j + 1) + '<span class="cursor"></span>';
                await new Promise(r => setTimeout(r, 60)); // Typing speed
            }
            line.innerHTML = text; // Remove cursor from finished line
            await new Promise(r => setTimeout(r, 800)); // Delay between lines
        }
        
        // Auto transition to fireworks after 3s
        setTimeout(() => {
            switchScene('scene-fireworks', false);
            startFireworks();
        }, 3000);
    }

    // 9. FIREWORKS CANVAS
    let fwInterval;
    function startFireworks() {
        const fwCanvas = document.getElementById('fireworks-canvas');
        const ctxFw = fwCanvas.getContext('2d');
        fwCanvas.width = window.innerWidth;
        fwCanvas.height = window.innerHeight;
        
        let particles = [];
        
        function createExplosion(x, y) {
            const colors = ['#8b5cf6', '#c4b5fd', '#fde047', '#ff71ce'];
            for(let i=0; i<50; i++) {
                particles.push({
                    x, y,
                    vx: (Math.random() - 0.5) * 10,
                    vy: (Math.random() - 0.5) * 10,
                    alpha: 1,
                    color: colors[Math.floor(Math.random() * colors.length)]
                });
            }
        }

        function animateFw() {
            ctxFw.clearRect(0, 0, fwCanvas.width, fwCanvas.height);
            for(let i=0; i<particles.length; i++) {
                let p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.1; // gravity
                p.alpha -= 0.015;
                
                ctxFw.globalAlpha = p.alpha;
                ctxFw.fillStyle = p.color;
                ctxFw.beginPath();
                ctxFw.arc(p.x, p.y, 3, 0, Math.PI*2);
                ctxFw.fill();
                
                if(p.alpha <= 0) {
                    particles.splice(i, 1);
                    i--;
                }
            }
            ctxFw.globalAlpha = 1;
            fwInterval = requestAnimationFrame(animateFw);
        }
        animateFw();
        
        // Random explosions
        setInterval(() => {
            if(currentScene === 'scene-fireworks') {
                createExplosion(Math.random() * fwCanvas.width, Math.random() * fwCanvas.height * 0.5);
            }
        }, 800);
    }

    // 10. SCENE 6 -> 7 (FIREWORKS to FINAL WALL)
    document.getElementById('to-wall-btn').addEventListener('click', () => {
        cancelAnimationFrame(fwInterval);
        document.getElementById('fireworks-canvas').style.display = 'none';
        renderWall();
        switchScene('scene-wall', true);
    });

    function renderWall() {
        const grid = document.getElementById('masonry-grid');
        grid.innerHTML = '';
        CONFIG.memories.forEach(mem => {
            const rotation = (Math.random() - 0.5) * 20; // Random rotate -10 to 10 deg
            const el = document.createElement('div');
            el.className = 'polaroid';
            el.style.transform = `rotate(${rotation}deg)`;
            el.innerHTML = `
                <img src="${mem.image}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjIwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzQ0NCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TGVnYWN5PC90ZXh0Pjwvc3ZnPg=='">
                <p>${mem.year}</p>
            `;
            grid.appendChild(el);
        });
    }

    // REPLAY
    document.getElementById('replay-btn').addEventListener('click', () => {
        location.reload();
    });
});
