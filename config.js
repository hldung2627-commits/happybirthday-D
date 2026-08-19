const CONFIG = {
    // Thông tin chung
    name: "Tên Của Bạn",
    music: "assets/music/birthday.mp3",
    
    // Scene 1: Intro
    introText: "Hey, I have something magical for you...",
    startButtonText: "START THE JOURNEY ✨",

    // Scene 2: Timeline
    memories: [
        {
            year: "2021",
            image: "assets/images/1.jpg", // Đặt ảnh vào thư mục assets/images
            title: "Ngày đầu tiên...",
            description: "Một ngày bình thường nhưng lại là khởi đầu cho những điều tuyệt vời nhất."
        },
        {
            year: "2022",
            image: "assets/images/2.jpg",
            title: "Những chuyến đi",
            description: "Cùng nhau đi qua những con phố, lưu lại những nụ cười rạng rỡ nhất."
        },
        {
            year: "2023",
            image: "assets/images/3.jpg",
            title: "Trưởng thành cùng nhau",
            description: "Cảm ơn cậu vì đã luôn ở đó, lắng nghe và chia sẻ mọi khoảnh khắc."
        }
        // Bạn có thể thêm bao nhiêu kỷ niệm tùy thích
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
