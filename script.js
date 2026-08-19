document.addEventListener("DOMContentLoaded", () => {
    // 1. INIT CONFIG DATA
    document.getElementById('intro-text').innerText = CONFIG.introText;
    document.getElementById('quiz-intro').innerText = CONFIG.quizText;
    document.getElementById('gift-text').innerText = CONFIG.giftText;
    document.getElementById('bday-name').innerText = CONFIG.name;
    document.getElementById('final-wall-text').innerText = CONFIG.finalWallText;
    document.getElementById('bg-music').src = CONFIG.music;

    let currentScene = 'scene-intro';
    let currentQuizIndex = 0;
    
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
        if(currentScene === 'scene-fireworks') return requestAnimationFrame(drawBg); // Hide stars during fireworks
        
        stars.forEach(star => {
            ctxBg.fillStyle = `rgba(255, 255, 255, ${star.alpha * 0.5})`; // Very soft
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
        
        // Burst of sparkles
        for(let i=0; i<30; i++) createSparkle(window.innerWidth/2 + (Math.random()-0.5)*200, window.innerHeight/2 + (Math.random()-0.5)*200);

        renderTimeline();
        switchScene('scene-timeline', true);
    });

 // RENDER TIMELINE (Giãn cách & Cuộn ngang)
    function renderTimeline() {
        const container = document.getElementById('timeline-container');
        container.innerHTML = '';
        
        // Render từng ảnh
        CONFIG.memories.forEach((mem) => {
            const el = document.createElement('div'); el.className = 'timeline-item';
            el.innerHTML = `
                <div class="magic-marker" onclick="popPhoto(this)">✨</div>
                <div class="memory-card">
                    <span class="year-badge">${mem.year}</span>
                    <img class="memory-img" src="${mem.image}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjIwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2U1ZTVlNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5QaG90bzwvdGV4dD48L3N2Zz4='">
                    <h3 class="heading-font text-gradient">${mem.title}</h3>
                    <p style="color: #4b5563; margin-top: 8px;">${mem.description}</p>
                </div>`;
            container.appendChild(el);
        });

        // Ẩn div bọc nút cũ và Di chuyển nút "Tiếp tục" xuống cuối dòng cuộn ngang
        const oldBtnContainer = document.querySelector('#scene-timeline .flex-center.mt-4');
        if (oldBtnContainer) oldBtnContainer.style.display = 'none';
        
        const nextBtn = document.getElementById('to-quiz-btn');
        nextBtn.classList.add('timeline-end-btn'); // Thêm class mới
        nextBtn.innerHTML = "TIẾP TỤC 💫";
        container.appendChild(nextBtn); // Gắn nút vào cuối cùng của thanh cuộn
    }

    // CHỨC NĂNG BẤM MỐC THỜI GIAN -> PHÓNG TO ẢNH (Bấm lần nữa để thu nhỏ)
    window.popPhoto = function(btn) {
        // Tìm bức ảnh tương ứng trong cùng một mốc thời gian
        const item = btn.closest('.timeline-item');
        const img = item.querySelector('.memory-img');
        
        // Bật/tắt class popped (phóng to/thu nhỏ)
        img.classList.toggle('popped');
        
        // Tạo một chút kim tuyến bay ra quanh nút bấm cho có cảm giác "Magical"
        if(typeof createSparkle === "function") {
            for(let i=0; i<5; i++) {
                createSparkle(btn.getBoundingClientRect().left + 20, btn.getBoundingClientRect().top + 20);
            }
        }
    }
    // 6. TIMELINE -> QUIZ
    document.getElementById('to-quiz-btn').addEventListener('click', () => {
        renderQuiz(); switchScene('scene-quiz', false);
    });

    function renderQuiz() {
        const qData = CONFIG.quiz[currentQuizIndex];
        document.getElementById('quiz-question').innerText = qData.question;
        const optionsContainer = document.getElementById('quiz-options');
        optionsContainer.innerHTML = '';
        
        qData.options.forEach((opt, idx) => {
            const btn = document.createElement('button'); btn.className = 'quiz-btn'; btn.innerText = opt;
            btn.onclick = () => handleQuizAnswer(btn, idx, qData.answer);
            optionsContainer.appendChild(btn);
        });
    }

    function handleQuizAnswer(btn, selected, correct) {
        if (selected === correct) {
            btn.classList.add('correct');
            for(let i=0; i<10; i++) createSparkle(btn.getBoundingClientRect().left + Math.random()*200, btn.getBoundingClientRect().top);
            
            setTimeout(() => {
                currentQuizIndex++;
                if (currentQuizIndex < CONFIG.quiz.length) renderQuiz();
                else {
                    document.getElementById('quiz-content').classList.add('hidden');
                    document.getElementById('quiz-success').classList.remove('hidden');
                }
            }, 1000);
        } else {
            btn.classList.add('wrong'); setTimeout(() => btn.classList.remove('wrong'), 500);
        }
    }

    // 7. QUIZ -> GIFT
    document.getElementById('to-gift-btn').addEventListener('click', () => switchScene('scene-gift', false));

    // 8. OPEN GIFT -> MESSAGE
    document.getElementById('open-gift-btn').addEventListener('click', function() {
        this.style.display = 'none';
        const box = document.getElementById('gift-box');
        const lid = document.getElementById('box-lid');
        
        box.classList.add('shake');
        
        setTimeout(() => {
            box.classList.remove('shake');
            lid.classList.add('open');
            
            // Light burst
            const flash = document.createElement('div');
            flash.style.cssText = "position:absolute; inset:0; background:radial-gradient(circle, #fff, transparent); opacity:0; z-index:100; transition:opacity 0.8s;";
            document.body.appendChild(flash);
            
            // Burst particles
            for(let i=0; i<50; i++) createSparkle(window.innerWidth/2, window.innerHeight/2);

            setTimeout(() => {
                flash.style.opacity = '1';
                setTimeout(() => {
                    switchScene('scene-message', false);
                    flash.style.opacity = '0';
                    setTimeout(() => flash.remove(), 1000);
                    startTypewriter();
                }, 800);
            }, 600);
        }, 1500);
    });

    // 9. TYPEWRITER
    async function startTypewriter() {
        const container = document.getElementById('typewriter-text');
        container.innerHTML = '';
        
        for (let i = 0; i < CONFIG.birthdayMessage.length; i++) {
            const line = document.createElement('div');
            container.appendChild(line);
            
            const text = CONFIG.birthdayMessage[i];
            for (let j = 0; j < text.length; j++) {
                line.innerHTML = text.substring(0, j + 1) + '<span class="cursor"></span>';
                await new Promise(r => setTimeout(r, 60)); // typing speed
            }
            line.innerHTML = text; 
            await new Promise(r => setTimeout(r, 600)); // delay line
        }
        
        setTimeout(() => {
            switchScene('scene-fireworks', false);
            startFireworks();
        }, 2000);
    }

    // 10. COLORFUL FIREWORKS SYSTEM
    let fwInterval;
    function startFireworks() {
        const fwCanvas = document.getElementById('fireworks-canvas');
        const ctxFw = fwCanvas.getContext('2d');
        
        function resizeFw() { fwCanvas.width = window.innerWidth; fwCanvas.height = window.innerHeight; }
        window.addEventListener('resize', resizeFw); resizeFw();
        
        let particles = [];
        
        // Pháo hoa sinh nhật có nhiều bảng màu tươi sáng
        const palettes = [
            ['#A855F7', '#EC4899', '#FFFFFF'], // Purple, Pink, White
            ['#22D3EE', '#38BDF8', '#FFFFFF'], // Cyan, Blue, White
            ['#FDE047', '#EC4899', '#D8B4FE'], // Gold, Pink, Lavender
            ['#10B981', '#38BDF8', '#FDE047']  // Emerald, Blue, Gold
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
            // Hiệu ứng Trail mờ dần thay vì xóa toàn bộ
            ctxFw.globalCompositeOperation = 'destination-out';
            ctxFw.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctxFw.fillRect(0, 0, fwCanvas.width, fwCanvas.height);
            ctxFw.globalCompositeOperation = 'lighter';

            for(let i=0; i<particles.length; i++) {
                let p = particles[i];
                p.x += p.vx; p.y += p.vy;
                p.vy += 0.05; // gravity nhẹ hơn
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
        
        // Bắt đầu animation
        animateFw();
        
        // MASSIVE FINALE LÚC MỚI VÀO
        setTimeout(() => {
            createExplosion(fwCanvas.width/2, fwCanvas.height/3, true);
            setTimeout(() => createExplosion(fwCanvas.width/3, fwCanvas.height/4), 300);
            setTimeout(() => createExplosion(fwCanvas.width/1.5, fwCanvas.height/4), 600);
        }, 500);
        
        // Random fireworks
        const autoFw = setInterval(() => {
            if(currentScene === 'scene-fireworks' && Math.random() > 0.4) {
                createExplosion(Math.random() * fwCanvas.width, Math.random() * fwCanvas.height * 0.5);
            }
        }, 1200);

        // Click để bắn pháo hoa
        fwCanvas.addEventListener('click', (e) => {
            if(currentScene === 'scene-fireworks') {
                createExplosion(e.clientX, e.clientY);
                // Tạo thêm sparkle khi click
                for(let i=0; i<5; i++) createSparkle(e.clientX, e.clientY);
            }
        });

        // Xóa interval khi rời scene
        document.getElementById('to-wall-btn').addEventListener('click', () => clearInterval(autoFw), {once: true});
    }

    // 11. FIREWORKS -> FINAL WALL
    document.getElementById('to-wall-btn').addEventListener('click', () => {
        cancelAnimationFrame(fwInterval);
        document.getElementById('fireworks-canvas').style.display = 'none';
        renderWall(); switchScene('scene-wall', true);
    });

    function renderWall() {
        const grid = document.getElementById('masonry-grid');
        grid.innerHTML = '';
        CONFIG.memories.forEach(mem => {
            const rotation = (Math.random() - 0.5) * 15;
            const el = document.createElement('div'); el.className = 'polaroid';
            el.style.transform = `rotate(${rotation}deg)`;
            el.innerHTML = `
                <img src="${mem.image}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjIwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2U1ZTVlNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5QaG90bzwvdGV4dD48L3N2Zz4='">
                <p>${mem.year}</p>
            `;
            grid.appendChild(el);
        });
    }

    // REPLAY
    document.getElementById('replay-btn').addEventListener('click', () => location.reload());
});
