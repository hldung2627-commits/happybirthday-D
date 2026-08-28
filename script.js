document.addEventListener("DOMContentLoaded", () => {
    // 1. INIT CONFIG DATA
    document.getElementById('intro-text').innerText = CONFIG.introText;
    if(document.getElementById('quiz-intro')) document.getElementById('quiz-intro').innerText = CONFIG.quizText;
    document.getElementById('gift-text').innerText = CONFIG.giftText;
    document.getElementById('bday-name').innerText = CONFIG.name;
    document.getElementById('bg-music').src = CONFIG.music;

    let currentScene = 'scene-intro';
    
    // SCENE SWITCHER & BACKGROUND COLOR LOGIC
    function switchScene(nextSceneId, allowScroll = false) {
        document.getElementById(currentScene).classList.remove('active');
        const next = document.getElementById(nextSceneId);
        next.classList.add('active');
        currentScene = nextSceneId;
        
        // Update body attribute for CSS background transition
        document.body.setAttribute('data-scene', nextSceneId);
        
        if (allowScroll) {
            document.body.classList.add('scrollable');
        } else {
            document.body.classList.remove('scrollable');
            window.scrollTo(0, 0);
        }
    }

    // 2. MAGICAL SPARKLE SYSTEM
    const sparkleChars = ['✦', '✧', '✨', '⋆', '💖'];
    const sparkleColors = ['#A855F7', '#EC4899', '#22D3EE', '#FDE047', '#FFFFFF'];
    const sparkleContainer = document.getElementById('sparkles-container');

    function createSparkle(x, y, auto = false) {
        const sparkle = document.createElement('span');
        sparkle.className = 'sparkle';
        sparkle.innerText = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
        sparkle.style.color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
        
        // Position
        const posX = x !== undefined ? x : Math.random() * window.innerWidth;
        const posY = y !== undefined ? y : Math.random() * window.innerHeight;
        sparkle.style.left = `${posX}px`;
        sparkle.style.top = `${posY}px`;
        
        // Randomize animation duration
        const duration = Math.random() * 1 + 0.5; // 0.5s to 1.5s
        sparkle.style.animationDuration = `${duration}s`;
        
        sparkleContainer.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), duration * 1000);
    }

    // Auto generate sparkles
    setInterval(() => {
        if(currentScene !== 'scene-fireworks') {
            for(let i = 0; i < 3; i++) createSparkle();
        }
    }, 400);

    // Mouse move sparkles
    document.addEventListener('mousemove', (e) => {
        if(Math.random() > 0.8 && currentScene !== 'scene-fireworks') {
            createSparkle(e.clientX, e.clientY);
        }
    });

    // 3. BACKGROUND STARS (Subtle overlay)
    const bgCanvas = document.getElementById('bg-canvas');
    const ctxBg = bgCanvas.getContext('2d');
    function resizeCanvas() {
        bgCanvas.width = window.innerWidth; bgCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const stars = Array.from({length: 80}, () => ({
        x: Math.random() * bgCanvas.width, y: Math.random() * bgCanvas.height,
        r: Math.random() * 2, alpha: Math.random(), velocity: Math.random() * 0.5 + 0.1
    }));

    function drawBg() {
        ctxBg.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
        if(currentScene === 'scene-fireworks') return requestAnimationFrame(drawBg);
        
        stars.forEach(star => {
            ctxBg.fillStyle = `rgba(255, 255, 255, ${star.alpha * 0.5})`;
            ctxBg.beginPath(); ctxBg.arc(star.x, star.y, star.r, 0, Math.PI * 2); ctxBg.fill();
            star.y -= star.velocity; 
            if(star.y < 0) star.y = bgCanvas.height;
        });
        requestAnimationFrame(drawBg);
    }
    drawBg();

    // 4. MUSIC CONTROLS
    const musicBtn = document.getElementById('music-btn');
    const audio = document.getElementById('bg-music');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) { audio.pause(); musicBtn.classList.remove('playing'); } 
        else { audio.play(); musicBtn.classList.add('playing'); }
        isPlaying = !isPlaying;
    });

    // 5. INTRO -> TIMELINE
    document.getElementById('start-btn').addEventListener('click', () => {
        if (!isPlaying) musicBtn.click();
        
        for(let i=0; i<30; i++) createSparkle(window.innerWidth/2 + (Math.random()-0.5)*200, window.innerHeight/2 + (Math.random()-0.5)*200);

        renderTimeline();
        switchScene('scene-timeline', true);
    });

    // RENDER TIMELINE DỌC
    function renderTimeline() {
        const container = document.getElementById('timeline-container');
        container.innerHTML = '';
        
        CONFIG.memories.forEach((mem, index) => {
            const el = document.createElement('div'); el.className = 'timeline-item';
            el.innerHTML = `
                <div class="marker-wrapper" onclick="popPhoto(this, ${index})">
                    <div class="year-label">${mem.year}</div>
                    <div class="magic-marker">✨</div>
                </div>
                <div class="memory-text-card">
                    <h3 class="heading-font text-gradient">${mem.title}</h3>
                    <p style="color: #4b5563; margin-top: 8px;">${mem.description}</p>
                </div>
                <div class="scattered-photos-container"></div>
            `;
            container.appendChild(el);
        });

        const oldBtnContainer = document.querySelector('#scene-timeline .flex-center.mt-4');
        if (oldBtnContainer) oldBtnContainer.style.display = 'none';
        
        const nextBtn = document.getElementById('to-puzzle-btn');
        if (nextBtn) {
            nextBtn.classList.add('timeline-end-btn');
            nextBtn.innerHTML = "TIẾP TỤC 💫";
            container.appendChild(nextBtn);
        }
    }

    // LOGIC BUNG ẢNH VÀ ẨN CHỮ
    window.popPhoto = function(btnWrapper, index) {
        const item = btnWrapper.closest('.timeline-item');
        const photoContainer = item.querySelector('.scattered-photos-container');
        const isOpen = item.classList.contains('is-open');
        
        if (isOpen) {
            photoContainer.innerHTML = '';
            item.classList.remove('is-open');
        } else {
            item.classList.add('is-open');
            
            const mem = CONFIG.memories[index];
            const imgsList = Array.isArray(mem.images) ? mem.images : (mem.image ? [mem.image] : []);
            
            imgsList.forEach((src, i) => {
                const img = document.createElement('img');
                img.src = src; img.className = 'scattered-photo';
                img.onerror = function() { this.style.display = 'none'; };
                
                const total = imgsList.length;
                const baseAngle = (i / total) * (2 * Math.PI);
                const finalAngle = baseAngle + (Math.random() - 0.5) * 1.5; 
                const radius = 60 + Math.random() * 90; 
                
                const tx = Math.cos(finalAngle) * radius; 
                const ty = Math.sin(finalAngle) * radius; 
                const rot = (Math.random() - 0.5) * 80;       
                
                img.style.setProperty('--tx', tx + 'px');
                img.style.setProperty('--ty', ty + 'px');
                img.style.setProperty('--rot', rot + 'deg');
                photoContainer.appendChild(img);
            });

            if(typeof createSparkle === "function") {
                for(let j=0; j<8; j++) {
                    createSparkle(btnWrapper.getBoundingClientRect().left + 40, btnWrapper.getBoundingClientRect().top + 20);
                }
            }
        }
    };

    // 6. TIMELINE -> PUZZLE
    if (document.getElementById('to-puzzle-btn')) {
        document.getElementById('to-puzzle-btn').addEventListener('click', () => {
            switchScene('scene-puzzle', false);
        });
    }

    // 7. MYSTERY PUZZLE LOGIC
    const cipherImg = document.getElementById('cipher-image');
    const imgModal = document.getElementById('image-modal');
    const zoomedImg = document.getElementById('zoomed-image');
    const closeBtn = document.querySelector('.close-modal');

    if (cipherImg && imgModal && zoomedImg) {
        cipherImg.addEventListener('click', () => {
            imgModal.classList.add('show');
            zoomedImg.src = cipherImg.src;
        });
        if (closeBtn) {
            closeBtn.addEventListener('click', () => imgModal.classList.remove('show'));
        }
        imgModal.addEventListener('click', (e) => {
            if (e.target === imgModal) imgModal.classList.remove('show');
        });
    }

    // Passcode Validation
    const unlockBtn = document.getElementById('unlock-btn');
    const passInput = document.getElementById('passcode-input');
    const passMsg = document.getElementById('passcode-message');

    function checkPasscode() {
        const val = passInput.value.trim();
        if (!val) return;

        if (val === '3813') {
            passInput.disabled = true;
            unlockBtn.disabled = true;
            passInput.style.borderColor = '#10b981';
            
            passMsg.textContent = "✨ Chính xác! Cánh cửa bí mật đã mở...";
            passMsg.className = 'msg-success';
            
            if(typeof createSparkle === "function") {
                for(let i = 0; i < 30; i++) {
                    createSparkle(window.innerWidth/2 + (Math.random()-0.5)*400, window.innerHeight/2 + (Math.random()-0.5)*400);
                }
            }

            setTimeout(() => {
                switchScene('scene-gift', false);
            }, 1500);

        } else {
            passMsg.textContent = "Hmm... chưa đúng rồi. Hãy đọc lại những manh mối nhé 👀";
            passMsg.className = 'msg-error';
            
            passInput.classList.remove('shake-input');
            void passInput.offsetWidth; 
            passInput.classList.add('shake-input');
            passInput.value = ''; 
        }
    }

    if (unlockBtn && passInput) {
        unlockBtn.addEventListener('click', checkPasscode);
        passInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkPasscode();
        });
    }

    // 8. MỞ HỘP QUÀ & CHUYỂN CẢNH
    const openGiftBtn = document.getElementById('open-gift-btn');
    if (openGiftBtn) {
        openGiftBtn.addEventListener('click', function() {
            this.style.display = 'none';
            const box = document.querySelector('.gift-box');
            
            if (box) {
                box.classList.add('opened');
            }
            
            if(typeof createSparkle === "function") {
                for(let i=0; i<40; i++) {
                    createSparkle(window.innerWidth/2 + (Math.random()-0.5)*400, window.innerHeight/2 + (Math.random()-0.5)*400);
                }
            }

            // Lóe sáng trắng và chuyển sang Scene Lời chúc
            setTimeout(() => {
                const flash = document.createElement('div');
                flash.style.cssText = "position:fixed; top:0; left:0; width:100vw; height:100vh; background:white; opacity:0; z-index:9999; transition: opacity 0.8s ease-in-out; pointer-events:none;";
                document.body.appendChild(flash);
                
                setTimeout(() => { flash.style.opacity = '1'; }, 20);
                
                setTimeout(() => {
                    switchScene('scene-message', false);
                    flash.style.opacity = '0';
                    setTimeout(() => flash.remove(), 800);
                    startTypewriter();
                }, 1000);
                
            }, 800);
        });
    }

    // 9. TYPEWRITER EFFECT
    async function startTypewriter() {
        const container = document.getElementById('typewriter-text');
        container.innerHTML = '';
        
        for (let i = 0; i < CONFIG.birthdayMessage.length; i++) {
            const line = document.createElement('div');
            container.appendChild(line);
            
            const text = CONFIG.birthdayMessage[i];
            for (let j = 0; j < text.length; j++) {
                line.innerHTML = text.substring(0, j + 1) + '<span class="cursor"></span>';
                await new Promise(r => setTimeout(r, 60));
            }
            line.innerHTML = text; 
            await new Promise(r => setTimeout(r, 600));
        }
        
        setTimeout(() => {
            switchScene('scene-fireworks', false);
            startFireworks();
        }, 2000);
    }

    // 10. COLORFUL FIREWORKS SYSTEM
    let fwInterval;
    let autoFw;

    function startFireworks() {
        const fwCanvas = document.getElementById('fireworks-canvas');
        const ctxFw = fwCanvas.getContext('2d');
        
        function resizeFw() { fwCanvas.width = window.innerWidth; fwCanvas.height = window.innerHeight; }
        window.addEventListener('resize', resizeFw); resizeFw();
        
        let particles = [];
        const palettes = [
            ['#A855F7', '#EC4899', '#FFFFFF'],
            ['#22D3EE', '#38BDF8', '#FFFFFF'],
            ['#FDE047', '#EC4899', '#D8B4FE'],
            ['#10B981', '#38BDF8', '#FDE047']
        ];

        function createExplosion(x, y, isBig = false) {
            const palette = palettes[Math.floor(Math.random() * palettes.length)];
            const particleCount = isBig ? 150 : 60;
            
            for(let i=0; i<particleCount; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = (Math.random() * (isBig ? 12 : 7)) + 1;
                particles.push({
                    x, y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    alpha: 1,
                    decay: Math.random() * 0.015 + 0.01,
                    color: palette[Math.floor(Math.random() * palette.length)],
                    size: Math.random() * 3 + 1
                });
            }
        }

        function animateFw() {
            ctxFw.globalCompositeOperation = 'destination-out';
            ctxFw.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctxFw.fillRect(0, 0, fwCanvas.width, fwCanvas.height);
            ctxFw.globalCompositeOperation = 'lighter';

            for(let i=0; i<particles.length; i++) {
                let p = particles[i];
                p.x += p.vx; p.y += p.vy;
                p.vy += 0.05;
                p.alpha -= p.decay;
                
                ctxFw.globalAlpha = p.alpha;
                ctxFw.fillStyle = p.color;
                ctxFw.beginPath();
                ctxFw.arc(p.x, p.y, p.size, 0, Math.PI*2);
                ctxFw.fill();
                
                if(p.alpha <= 0) { particles.splice(i, 1); i--; }
            }
            ctxFw.globalAlpha = 1;
            fwInterval = requestAnimationFrame(animateFw);
        }
        
        animateFw();
        
        setTimeout(() => {
            createExplosion(fwCanvas.width/2, fwCanvas.height/3, true);
            setTimeout(() => createExplosion(fwCanvas.width/3, fwCanvas.height/4), 300);
            setTimeout(() => createExplosion(fwCanvas.width/1.5, fwCanvas.height/4), 600);
        }, 500);
        
        autoFw = setInterval(() => {
            if(currentScene === 'scene-fireworks' && Math.random() > 0.4) {
                createExplosion(Math.random() * fwCanvas.width, Math.random() * fwCanvas.height * 0.5);
            }
        }, 1200);

        fwCanvas.addEventListener('click', (e) => {
            if(currentScene === 'scene-fireworks') {
                createExplosion(e.clientX, e.clientY);
                for(let i=0; i<5; i++) createSparkle(e.clientX, e.clientY);
            }
        });
    }

    // 11. XỬ LÝ NÚT PLAY AGAIN TẠI SCENE FIREWORKS
    const playAgainBtn = document.getElementById('to-wall-btn');
    if (playAgainBtn) {
        playAgainBtn.addEventListener('click', () => {
            if (autoFw) clearInterval(autoFw);
            if (fwInterval) cancelAnimationFrame(fwInterval);
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
                location.reload();
            }, 350);
        });
    }
});
