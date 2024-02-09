let canvas, ctx, w, h, particles = [], xPoint, yPoint, displayText = false;

window.addEventListener("resize", resizeCanvas);
window.addEventListener("DOMContentLoaded", onLoad);

function onLoad() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    resizeCanvas();

    // Listen for the music end event
    document.getElementById("backgroundMusic").addEventListener("ended", function () {
        endCelebration();
    });

    window.requestAnimationFrame(updateWorld);
}

function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}

function updateWorld() {
    update();
    paint();
    window.requestAnimationFrame(updateWorld);
}

function update() {
    if (particles.length < 500 && Math.random() < 0.04) {
        createFirework();
    }
    particles = particles.filter(particle => particle.move());
}

function paint() {
ctx.globalCompositeOperation = 'source-over';
ctx.fillStyle = "rgba(0,0,0,0.2)";
ctx.fillRect(0, 0, w, h);
ctx.globalCompositeOperation = 'lighter';
particles.forEach(particle => particle.draw(ctx));

if (displayText) {
ctx.fillStyle = getRandomColor();
ctx.font = "italic bold 40px 'Dancing Script', cursive";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("Happy New Year 2024", w / 2, h / 4);
}
}

function createFirework() {
    xPoint = Math.random() * (w - 200) + 100;
    yPoint = Math.random() * (h - 200) + 100;
    const nFire = Math.random() * 50 + 100;
    const c = getRandomFireworkColor();

    for (let i = 0; i < nFire; i++) {
        const particle = new Particle(c);
        particles.push(particle);
    }
}

function Particle(color) {
    const sizeFactor = Math.random() * 6;
    this.w = this.h = sizeFactor;
    const angle = Math.random() * Math.PI * 2;  // Random angle
    const speed = Math.random() * 4 + 2;  // Random speed
    this.x = xPoint + Math.cos(angle) * sizeFactor * 10;
    this.y = yPoint + Math.sin(angle) * sizeFactor * 10;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = Math.random() * 0.5 + 0.5;
    this.color = color;
}

Particle.prototype = {
    gravity: 0.05,
    move: function () {
        this.x += this.vx;
        this.vy += this.gravity;
        this.y += this.vy;
        this.alpha -= 0.01;
        return !(this.x <= -this.w || this.x >= w || this.y >= h || this.alpha <= 0);
    },
    draw: function (c) {
        c.save();
        c.beginPath();
        c.arc(this.x + this.w / 2, this.y + this.h / 2, this.w / 2, 0, Math.PI * 2);  // Sử dụng arc để vẽ hình tròn
        c.fillStyle = this.color;
        c.globalAlpha = this.alpha;
        c.closePath();
        c.fill();
        c.restore();
    }
};

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomFireworkColor() {
    const colors = ["#FF5252", "#FFD740", "#64B5F6", "#69F0AE", "#FF4081", "#4CAF50", "#FF69B4", "#FFF000", "#00CED1", "#8A2BE2", "#4FFF25", "#FF0115", "#FFA500", "#800080", "#00F"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function startMusic() {
    // Show audio controls
    document.getElementById("backgroundMusic").style.display = "block";

    // Hidden overlay
    document.getElementById("overlay").style.display = "none";

    // Start playing music
    document.getElementById("backgroundMusic").play();

    // Set displayText to true to display text on the canvas
    displayText = true;

    // Reset elapsedTime to 0 when music starts playing
    elapsedTime = 0;

    document.getElementById('overlay').style.display = 'none';
   
    currentTextIndex = 0;
    changeText();

    backgroundMusic.removeAttribute("controls");
}

const texts = ['','Hi, chào mọi người', 'Hôm nay mình có một điều muốn nói...', 'đó là...', 'Năm mới... thiệt là vui vẻ nghen ^^ !!', 'Năm 2024 sẽ có thật nhiều nhiều thành công và niềm vui trong cuộc sống...', '','Thời gian có lẽ cũng đã trôi qua khá là nhanh, mới đây thì cũng đã bước qua một năm mới rồi.','Nhìn lại một năm 2023, với mình có lẽ đã có khá nhiều chuyện xảy ra.', 'Có niềm vui, có nỗi buồn, có thành công, có những điều vẫn đợi chờ, có cả những lúc ngồi một mình lặng im và cũng chẳng biết phải làm thế nào.', 'Nhưng mà… sau tất cả thì vẫn luôn luôn cảm ơn những người bạn, những anh chị và mọi người đã luôn đồng hành, chia sẻ, giúp đỡ mình rất là nhiều trong một năm vừa qua. ', 'Hy vọng là một năm mới này thì sẽ tiếp tục nhận được nhiều những sự giúp đỡ như vậy từ mọi người, từ những người anh, người chị, và cũng hy vọng là mình sẽ giúp được điều gì đó.', 'Gác lại những chuyện buồn, vui và những quá khứ của 2023.', 'Dù sao thì vẫn chúc mọi người một năm 2024 thật là thành công, thật nhiều nhiều niềm vui và mọi thứ trong năm mới sẽ thật là tốt lành !!',
'',
'Time has probably passed quite quickly and now we are already in 2024.',
'Looking back at 2023, maybe quite a few things happened to me.',
'There was joy, there was sadness, there were successes, there were things that were still waiting, and there were times when I sat silently and did not know what to do.',
'But... after all,',
'I am always grateful to my friends, and everyone who has always accompanied, shared, helped me, and given me a lot of motivation throughout the past year.',
'Hopefully, in this new year, I will continue to receive a lot of help from everyone, and I also hope that I will be able to help with something.',
'Put aside the sad, happy, and past stories of 2023.',
'Anyway, I still wish everyone a very successful 2024, lots of joy and everything in the new year will always be good!!',
'',
'Thank you!!',
'',
'Mình cảm ơn!! ^^',
''
];
const timings = [8, 2, 2, 2, 2, 14, 2, 2, 2, 2, 2, 2, 2, 8,
14,
2, 1, 2, 1, 2, 1, 1, 2, 1, 2,
1,
4,
10
]; 
let intervalId;


function changeText() {
    const textContainer = document.getElementById('textContainer');
    textContainer.textContent = ''; 
  
    const text = texts[currentTextIndex];
    let i = 0;
  
    function type() {
      if (i < text.length) {
        textContainer.textContent += text.charAt(i);
        i++;
        setTimeout(type, 82); // Adjust the delay time between each character
      } else {
        startTimer(timings[currentTextIndex]);
        if (currentTextIndex === texts.length - 1) {
          clearInterval(intervalId);
        } else {
          currentTextIndex = (currentTextIndex + 1) % texts.length;
        }
      }
    }
  
    type();
  }

function updateTimer(seconds) {
document.getElementById('timer').innerText = `Next change in ${seconds} seconds`;
}

function startTimer(seconds) {
let remainingTime = seconds;

function countdown() {
updateTimer(remainingTime);
if (remainingTime === 0) {
clearInterval(intervalId); 
changeText();  
} else {
remainingTime--;
}
}

clearInterval(intervalId);  
intervalId = setInterval(countdown, 1000);  
}

// Initial text change after 1 second
setTimeout(function () {
changeText();
}, 1000);


function endCelebration() {
    canvas.style.display = "none";
    document.getElementById("backgroundMusic").style.display = "none";
}

let currentTime = 0;
let elapsedTime = 0;

function updateWorld() {
    

    update();
    paint();
    window.requestAnimationFrame(updateWorld);
}