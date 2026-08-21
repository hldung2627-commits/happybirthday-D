const CONFIG = {
    // Thông tin chung
    name: "Tên Của Bạn",
    music: "birthday.mp3",
    
    // Scene 1: Intro
    introText: "Hey, I have something magical for you...",
    startButtonText: "START THE JOURNEY ✨",

    // Scene 2: Timeline
   memories: [
        { 
            year: "2023", 
            images: ["9.jpg", "10.jpg", "11.jpg", "12.jpg"], 
            title: "Năm 2023", 
            description: "Cùng nhau trưởng thành, cùng nhau chia sẻ mọi khoảnh khắc vui buồn." 
        },
        { 
            year: "2024", 
            images: ["13.jpg", "14.jpg", "15.jpg", "16.jpg"], 
            title: "Năm 2024", 
            description: "Bình yên đơn giản là những lúc được ở cạnh nhau thế này." 
        },
        { 
            year: "2025", 
            images: ["17.jpg", "18.jpg", "19.jpg", "20.jpg"], 
            title: "Năm 2025", 
            description: "Một năm thật nhiều tiếng cười và những cột mốc đáng tự hào." 
        },
        { 
            year: "2026", 
            images: ["21.jpg", "22.jpg", "23.jpg", "24.jpg"], 
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
