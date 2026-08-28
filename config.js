const CONFIG = {
    // Thông tin chung
    name: "Lê Vi",
    music: "birthday.mp3",
    
    // Scene 1: Intro
    introText: "Hey, I have something magical for you...",
    startButtonText: "START THE JOURNEY ✨",

    // Scene 2: Timeline
   memories: [
        { 
            year: "2023", 
            images: ["20231.jpg", "20232.jpg", "20233.jpg", "20234.jpg", "20235.jpg", "20236.jpg", "20237.jpg", "20238.jpg", "20239.jpg"], 
            title: "Năm 2023", 
            description: "Cùng nhau trưởng thành, cùng nhau chia sẻ mọi khoảnh khắc vui buồn." 
        },
        { 
            year: "2024", 
            images: ["20241.jpg", "20242.jpg", "20243.jpg", "20244.jpg", "20245.jpg", "20246.jpg", "20247.jpg", "20248.jpg", "20249.jpg", "202410.jpg", "202411.jpg", "202412.jpg", "202413.jpg", "202414.jpg", "202415.jpg"], 
            title: "Năm 2024", 
            description: "Bình yên đơn giản là những lúc được ở cạnh nhau thế này." 
        },
        { 
            year: "2025", 
            images:["20251.jpg", "20252.jpg", "20253.jpg", "20254.jpg", "20255.jpg", "20256.jpg", "20257.jpg", "20258.jpg"], 
            title: "Năm 2025", 
            description: "Một năm thật nhiều tiếng cười và những cột mốc đáng tự hào." 
        },
        { 
            year: "2026", 
            images: ["20261.jpg", "20262.jpg", "20263.jpg", "20264.jpg", "20265.jpg", "20266.jpg", "20267.jpg", "20268.jpg", "20269.jpg", "202610.jpg", "202611.jpg", "202613.jpg"], 
            title: "Năm 2026", 
            description: "Chúc mừng sinh nhật! Tuổi mới hãy luôn rực rỡ và hạnh phúc nhé 💜" 
        }
    ],

    // Scene 3: Quiz
    quizText: "Okay... đủ kỷ niệm rồi. \nNhưng trước khi nhận quà, thử thách một chút nhé! 👀",
    quiz: [
        {
            question: "Nơi đầu tiên chúng ta gặp nhau là ở đâu?",
            options: ["Quán cafe quen thuộc", "Trường học", "Rạp chiếu phim", "Công viên"],
            answer: 0 // Index của đáp án đúng (0 = Quán cafe, 1 = Trường học...)
        },
        {
            question: "Món ăn yêu thích nhất của cậu là gì?",
            options: ["Pizza", "Sushi", "Trà sữa", "Cả 3 món trên"],
            answer: 3
        }
    ],

    // Scene 4: Gift Box
    giftText: "Mọi thứ đã sẵn sàng...",
    giftButton: "OPEN IT 🎁",

    // Scene 5: Birthday Message (Hiệu ứng gõ chữ)
    birthdayMessage: [
        "Chúc cậu tuổi mới...",
        "vẫn luôn vui vẻ và rạng rỡ như thế,",
        "vẫn luôn được yêu thương thật nhiều,",
        "và luôn có tớ đồng hành trong những chặng đường sắp tới.",
        "Happy Birthday! 💜"
    ],

    // Scene 6 & 7: Kết thúc
    finalWallText: "Thank you for being part of my story.",
    playAgainText: "PLAY AGAIN"
};
