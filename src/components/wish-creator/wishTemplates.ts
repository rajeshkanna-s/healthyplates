// Template-based wish generator. {name} is replaced with recipient name.
// Each occasion has templates per tone x length combination.

interface TemplateSet {
  short: string[];
  medium: string[];
  long: string[];
}

type ToneTemplates = Record<string, TemplateSet>;
type OccasionTemplates = Record<string, ToneTemplates>;

const defaultTone: TemplateSet = {
  short: [
    "Wishing you all the best, {name}!",
    "Sending warm wishes your way, {name}!",
    "Hope this brings you joy, {name}!",
    "Here's to a wonderful time ahead, {name}!",
    "All the best to you, {name}!",
  ],
  medium: [
    "Sending you my warmest wishes, {name}. May this special moment bring you all the happiness you deserve. Enjoy every bit of it!",
    "Dear {name}, wishing you nothing but the best today and always. You truly deserve all the good things coming your way.",
    "{name}, here's to celebrating this beautiful moment. May it fill your heart with joy and your life with wonderful memories.",
    "To {name} — may this time bring peace, joy, and all the love in the world. You are truly special and deserve the best.",
  ],
  long: [
    "Dear {name}, as you celebrate this special moment, I want you to know how much you mean to everyone around you. Your kindness, your warmth, and your spirit make the world a better place. May this occasion bring you immense happiness, unforgettable memories, and the strength to chase every dream. Here's to you and all the wonderful things ahead!",
    "{name}, on this beautiful occasion, I just want to say — you are one of the most amazing people I know. Your presence lights up every room, and your heart touches everyone you meet. May today mark the beginning of an incredible new chapter filled with love, laughter, and endless possibilities. Wishing you nothing but the absolute best!",
    "To my dear {name}, life is made of moments, and this one is truly worth celebrating. You have worked so hard, loved so deeply, and given so much — it's time the universe gives back to you tenfold. May every day ahead be brighter than the last, and may you always find reasons to smile. With all my love and best wishes!",
  ],
};

const templates: OccasionTemplates = {
  birthday: {
    simple: {
      short: [
        "Happy birthday, {name}! Have an amazing day!",
        "Wishing you a wonderful birthday, {name}!",
        "Many happy returns of the day, {name}!",
        "Happy birthday! Hope it's a great one, {name}!",
        "Cheers to another year, {name}! Happy birthday!",
      ],
      medium: [
        "Happy birthday, {name}! May this new year of your life bring you happiness, good health, and all the success you deserve. Enjoy your special day!",
        "Wishing you the happiest birthday, {name}! May every moment today be filled with laughter, love, and beautiful memories. You deserve it all!",
        "Happy birthday, {name}! Another year older, another year wiser. May this year bring you closer to your dreams and fill your life with joy.",
        "{name}, happy birthday! I hope today is as wonderful as you are. May you be surrounded by people you love and things that make you smile.",
      ],
      long: [
        "Happy birthday, {name}! On this special day, I want to remind you of how incredible you are. Your kindness, your smile, and your energy make the world a better place. May this new chapter of your life bring you everything you've been wishing for — success, love, good health, and countless reasons to be happy. Here's to you and the amazing journey ahead!",
        "Dear {name}, happy birthday! Today is your day to shine, and I hope you know how much you are loved and appreciated. You bring so much joy to everyone around you, and you deserve the same in return — tenfold. May this year be filled with beautiful surprises, meaningful connections, and moments that take your breath away. Enjoy every single second!",
        "{name}, wishing you the most wonderful birthday! Life has a beautiful way of rewarding good people, and you are one of the best. May this year bring you closer to your goals, surround you with love, and give you reasons to celebrate every single day. Thank you for being you — the world is lucky to have you!",
      ],
    },
    heartfelt: {
      short: [
        "Happy birthday, {name}. You mean more to me than words can say.",
        "{name}, on your birthday — know that you are loved deeply.",
        "Another year of you in this world is a gift. Happy birthday, {name}.",
        "Happy birthday to someone truly special — you, {name}.",
        "{name}, may your birthday be as beautiful as your heart.",
      ],
      medium: [
        "Happy birthday, {name}. You are one of those rare people who make this world a genuinely better place. I'm grateful to have you in my life, and I hope this year brings you everything your beautiful heart deserves.",
        "{name}, happy birthday. I don't say it often enough, but you mean the world to me. Your strength, your warmth, and your spirit inspire me every day. Here's to a year filled with love and happiness.",
        "To {name}, on your birthday — thank you for being you. Thank you for every smile, every conversation, and every moment. I hope today fills your heart with as much joy as you've given me.",
        "Happy birthday, {name}. Some people come into your life and change it forever — you're one of them. May this year reward you with all the love, success, and peace you truly deserve.",
      ],
      long: [
        "Happy birthday, {name}. As I sit here thinking about what to write, I realize no words will ever be enough to express what you mean to me. You have been a constant source of strength, laughter, and comfort. On your special day, I just want you to know — you are seen, you are valued, and you are loved more than you know. May this year bring you everything your beautiful soul deserves and more. Here's to you!",
        "Dear {name}, happy birthday. You are one of those rare, beautiful humans who make this world worth living in. Your kindness touches hearts, your laughter heals wounds, and your presence makes everything better. I hope this new year of your life brings you the kind of happiness that stays — the kind that comes from within and never fades. You deserve the world, and I hope it starts giving back to you today.",
        "{name}, on your birthday, I want you to know something — you are extraordinary. Not because of what you do, but because of who you are. In a world that's always rushing, you take the time to care, to listen, to love. May this year be your best one yet — full of dreams coming true, hearts connecting, and moments that leave you speechless. Happy birthday, with all my love.",
      ],
    },
    funny: {
      short: [
        "Happy birthday, {name}! You're not old, you're vintage! 🎂",
        "{name}, another year? Don't worry, you don't look a day over fabulous!",
        "Happy birthday, {name}! Let's pretend the candles are for decoration.",
        "Getting older is mandatory. Growing up? Totally optional. Happy birthday, {name}!",
        "Happy birthday, {name}! Age is just a number… a really big one! 😄",
      ],
      medium: [
        "Happy birthday, {name}! They say with age comes wisdom. So by now, you must be practically a genius! Here's to another year of questionable decisions and unforgettable laughs.",
        "{name}, happy birthday! I was going to get you something amazing, but then I remembered — you already have me in your life. You're welcome! Have a fantastic day!",
        "Happy birthday, {name}! Science says you should eat more cake and worry less. Okay, I made that up. But you should do it anyway. Enjoy your day!",
        "Dear {name}, congrats on surviving another year! At this point, you're basically a professional at being alive. Keep up the good work! Happy birthday!",
      ],
      long: [
        "Happy birthday, {name}! Let's take a moment to appreciate the miracle that is you — a person who can eat an entire cake, blame it on celebrations, and feel absolutely zero guilt. That's a superpower. But seriously, you're one of the most fun, kind, and hilarious people I know. Another year means another year of your legendary stories, your terrible jokes, and your ability to make everyone around you laugh until they cry. Never change. Except maybe your age. That's going up whether you like it or not!",
        "Dear {name}, happy birthday! I know birthdays can feel weird — one day you're blowing candles, the next day your back hurts from blowing candles. But hey, look at the bright side: you're still younger than you'll be next year! On a serious note, you're an amazing person, and I'm lucky to know you. Here's to more laughs, more cake, and more 'I can't believe we did that' stories. Love you, old friend!",
        "{name}, happy birthday! They say age is just a number, and in your case, it's a number we should probably start hiding. Just kidding — you look incredible for someone who's been on this planet for this many trips around the sun. But all jokes aside, you bring so much joy and laughter to everyone around you. May this year bring you less drama, more pizza, and at least one really good nap. You deserve it all!",
      ],
    },
    formal: {
      short: [
        "Wishing you a very happy birthday, {name}. May this year bring you great success.",
        "Happy birthday, {name}. Wishing you good health and continued achievements.",
        "Many happy returns of the day, {name}. May this year be truly rewarding.",
        "Happy birthday, {name}. May you continue to inspire and excel.",
        "Wishing you a memorable birthday, {name}, and a prosperous year ahead.",
      ],
      medium: [
        "Dear {name}, wishing you a very happy birthday. May this year bring you continued success, good health, and fulfilment in all your endeavours. It is a pleasure to know someone as dedicated and accomplished as you.",
        "Happy birthday, {name}. On this occasion, I wish you prosperity, peace, and all the success you so richly deserve. May the coming year be filled with new achievements and rewarding experiences.",
        "Wishing you a wonderful birthday, {name}. Your dedication and hard work are an inspiration to all. May this year bring you even greater heights and the recognition you deserve.",
        "{name}, happy birthday. I hope this special day marks the beginning of an exceptional year ahead. May you continue to thrive both personally and professionally.",
      ],
      long: [
        "Dear {name}, on the occasion of your birthday, I extend my warmest wishes to you. Over the years, your dedication, professionalism, and integrity have been a source of great inspiration. As you begin another year, may it bring you even greater success, fulfilment, and opportunities to shine. I am confident that with your talent and determination, the best is yet to come. Wishing you a truly memorable birthday and a remarkable year ahead.",
        "Happy birthday, {name}. It is with great pleasure that I extend my best wishes to you on this special day. Your contributions and commitment have not gone unnoticed, and I trust that this new year will bring you the rewards and recognition you so richly deserve. May you continue to grow, excel, and inspire those around you. Here's to a year of health, happiness, and outstanding achievements.",
      ],
    },
    romantic: {
      short: [
        "Happy birthday, my love {name}. You are my everything. ❤️",
        "{name}, happy birthday to the one who makes my heart sing.",
        "Another year with you is a dream come true. Happy birthday, {name}.",
        "Happy birthday, {name}. My world is brighter because of you.",
        "To my favourite person — happy birthday, {name}. I love you endlessly.",
      ],
      medium: [
        "Happy birthday, {name}. Every day with you feels like a gift, and today I get to celebrate the most beautiful gift of all — you. May this year bring us even closer and fill our lives with love and laughter.",
        "{name}, happy birthday, my love. You are the reason I smile, the reason I dream, and the reason I believe in forever. Here's to another year of falling deeper in love with you.",
        "To my dearest {name}, happy birthday. You are my home, my heart, and my happiness. I promise to make this year as special as you make every day for me. I love you beyond words.",
        "Happy birthday, {name}. Before you, I didn't know what real love felt like. Now, I can't imagine life without it — without you. Here's to celebrating you today and loving you always.",
      ],
      long: [
        "Happy birthday, {name}, my love. On your special day, I want you to know that meeting you was the best thing that ever happened to me. You have filled my life with a love so deep, so real, that every moment with you feels like magic. I promise to be by your side through every high and every low, to hold your hand, and to never stop choosing you. May this year bring us even more beautiful memories, laughter that never ends, and a love that only grows stronger. You are my forever. I love you.",
        "Dear {name}, happy birthday. If I could give you one thing, it would be the ability to see yourself through my eyes — because then you would know how truly extraordinary you are. You are kind, beautiful, and brave, and loving you is the easiest thing I've ever done. On your birthday, I wish you a year of dreams fulfilled, adventures shared, and a love that wraps around you like the warmest blanket. Thank you for being mine. I love you more than words will ever say.",
      ],
    },
    emotional: {
      short: [
        "Happy birthday, {name}. You are a blessing I never want to lose.",
        "{name}, your birthday reminds me how grateful I am for you.",
        "Happy birthday. The world is so much better because you're in it, {name}.",
        "Thinking of you today, {name}. Happy birthday, with all my heart.",
        "{name}, happy birthday. You deserve every good thing this life has to offer.",
      ],
      medium: [
        "Happy birthday, {name}. There are people who come into your life and change everything — you are one of them. I carry your kindness, your laughter, and your love with me every single day. May this year be gentle and generous to you.",
        "{name}, on your birthday, I want you to know that you are one of the strongest, most beautiful souls I've ever known. You've touched my life in ways you'll never fully understand. I'm so grateful for you. Happy birthday.",
        "Happy birthday, {name}. If I could give the world one person to learn from, it would be you. Your heart, your resilience, your capacity to love — it's extraordinary. May this year mirror the beauty you bring to everyone around you.",
        "Dear {name}, happy birthday. Some people make life worth living, and you are at the top of that list. Thank you for every memory, every lesson, every moment. I love you more than I can say.",
      ],
      long: [
        "Happy birthday, {name}. Today, I'm not just celebrating your birthday — I'm celebrating you. Everything you are, everything you've overcome, and everything you're becoming. You have a way of making people feel seen, valued, and loved, and I don't think you even realise how rare that is. In a world full of noise, you are peace. In a world full of rush, you are stillness. May this year be the one where life gives you back everything you've given to others — tenfold. I'm so proud of you, and I'm so grateful you exist. Happy birthday, with all the love in my heart.",
        "Dear {name}, as another year begins for you, I find myself overwhelmed with gratitude. Grateful for your laughter that fills the room, your words that heal the heart, and your presence that makes everything okay. You have carried burdens with grace, faced storms with courage, and still managed to be the light for everyone around you. On your birthday, I wish you rest, I wish you peace, and I wish you the deep, quiet kind of happiness that stays. You deserve it all, and so much more. Happy birthday.",
      ],
    },
  },
  wedding: {
    simple: {
      short: ["Congratulations on your wedding, {name}! Wishing you a lifetime of love.", "Happy married life, {name}! May your journey together be beautiful.", "Cheers to the newlyweds! Best wishes, {name}!", "Wishing you love and laughter forever, {name}!", "Congratulations, {name}! Here's to happily ever after!"],
      medium: ["Congratulations, {name}! Marriage is one of life's greatest adventures, and I know yours will be filled with love, laughter, and beautiful memories. Wishing you both a lifetime of happiness together.", "Dear {name}, congratulations on this beautiful milestone! May your marriage be built on trust, filled with joy, and blessed with endless love. Here's to a wonderful life together.", "{name}, congratulations on your wedding! May every day of your married life bring you closer, make you stronger, and fill your hearts with gratitude. Enjoy this beautiful journey!", "Wishing you all the best, {name}! Marriage is about growing together, laughing together, and building something beautiful. May your love story inspire everyone around you."],
      long: ["Dear {name}, congratulations on your wedding! Today marks the beginning of one of life's most beautiful chapters — a journey of shared dreams, quiet mornings, loud laughter, and love that deepens with every passing year. May your home be filled with warmth, your hearts with joy, and your lives with memories that you'll cherish forever. Here's to a marriage that's as strong as it is sweet, as steady as it is adventurous, and as lasting as the stars. Wishing you both an eternity of happiness!"],
    },
    heartfelt: {
      short: ["So happy for you, {name}. You deserve this beautiful love.", "{name}, seeing you get married fills my heart with joy.", "Congratulations, {name}. May your love only grow deeper.", "You found your person, {name}. That's everything.", "Wishing you endless love, {name}. You deserve it all."],
      medium: ["Congratulations, {name}. Watching you find your person and build this life together has been one of the most beautiful things to witness. May your marriage be everything you've dreamed of and more. I'm so happy for you.", "{name}, today you begin a new chapter, and I know it will be filled with love. You two are proof that real, lasting love still exists. May your bond only grow stronger with time. Congratulations from the bottom of my heart.", "Dear {name}, marriage is about choosing each other every single day, and I know you two will do just that. Your love inspires me, and I'm so grateful to be part of this moment. Wishing you a lifetime of togetherness.", "To {name}, on your wedding day — love like yours is rare and precious. Hold onto it, nurture it, and never take it for granted. You are so deserving of this happiness. Congratulations."],
      long: ["Dear {name}, as I watch you step into this new chapter of life, my heart is overflowing with happiness for you. Marriage is not just a celebration — it's a promise. A promise to love even when it's hard, to stay even when it's easier to leave, and to grow together even when the world tries to pull you apart. I know you and your partner will build something truly extraordinary — a love that is patient, kind, and unwavering. May your home be filled with laughter, your days with peace, and your hearts with a love so deep that it takes your breath away every single day. Congratulations, with all my heart."],
    },
    funny: {
      short: ["Congrats, {name}! Welcome to 'What do you want to eat?' for the rest of your life!", "Marriage tip for {name}: Happy spouse, happy house!", "Congrats, {name}! The wedding is easy — marriage is the real adventure!", "{name}, you're officially off the market! Congrats! 😂", "Welcome to married life, {name}! Say goodbye to closet space!"],
      medium: ["Congrats, {name}! They say marriage is a workshop — where one person works and the other shops. Choose wisely! Just kidding — you two are going to be amazing together. Wishing you a lifetime of love and laughter!", "Dear {name}, welcome to married life! It's like a deck of cards — you start with hearts and diamonds, and end up wishing for a club and a spade. Just kidding! You two are perfect for each other. Enjoy every moment!", "{name}, congrats on finding someone who tolerates you as much as you tolerate them! That's true love, honestly. Wishing you both a wonderfully chaotic and happy life together!", "Happy wedding, {name}! Remember, a successful marriage is basically just two people repeatedly asking 'What do you want to eat?' until one of them dies. Good luck! 😄"],
      long: ["Dear {name}, congratulations on your wedding! Now that you're officially married, let me give you some unsolicited advice: never go to bed angry — stay up and argue all night! Just kidding. But honestly, marriage is the most beautiful, wild, hilarious, and sometimes completely baffling adventure you'll ever go on. There will be days of pure joy and days where you argue about whose turn it is to do the dishes. Through it all, remember — you chose this person for a reason. They are your teammate, your partner in crime, and the one person who will always have your back. Enjoy the ride, {name}!"],
    },
    formal: {
      short: ["Warm congratulations on your wedding, {name}. Wishing you a prosperous life together.", "Best wishes on your marriage, {name}. May your union be blessed.", "Congratulations, {name}. Wishing you a lifetime of happiness and harmony.", "On this joyous occasion, best wishes to you, {name}.", "Wishing you a blessed married life, {name}. Congratulations."],
      medium: ["Dear {name}, congratulations on your marriage. It is a pleasure to extend my warmest wishes on this auspicious occasion. May your life together be filled with mutual respect, shared joy, and lasting prosperity.", "Congratulations, {name}. Marriage is one of life's most significant milestones, and I wish you both a journey filled with love, understanding, and fulfilment. May this union bring you immeasurable happiness.", "{name}, on the occasion of your wedding, I extend my heartfelt congratulations. May your partnership be strong, your home be peaceful, and your future together be bright. Best wishes always.", "Warmest congratulations, {name}. It is a privilege to witness this beautiful beginning. May your marriage be a source of strength, joy, and purpose for both of you."],
      long: ["Dear {name}, on the occasion of your marriage, I would like to extend my most sincere congratulations and best wishes. Marriage is a partnership built on trust, respect, and shared values — and I have no doubt that yours will be exemplary in all these regards. As you embark on this new chapter, may it bring you professional fulfilment, personal growth, and a deepening bond that only strengthens with time. I wish you both a life of harmony, prosperity, and enduring happiness. Congratulations once again."],
    },
    romantic: {
      short: ["Two hearts, one journey. Congratulations, {name}.", "{name}, your love story is just beginning. How beautiful.", "To love and be loved — that's your story, {name}.", "Forever starts today. Happy wedding, {name}. ❤️", "Your love is a fairytale come true, {name}."],
      medium: ["Congratulations, {name}. Today, two hearts become one, and a love story becomes a life story. May your days be filled with stolen glances, whispered promises, and a love that never stops growing. This is just the beginning of forever.", "Dear {name}, love brought you together, and now commitment will keep you. May your marriage be a garden — tended with care, blooming with joy, and rooted in a love so deep it can weather any storm. Congratulations, beautiful soul.", "{name}, watching your love blossom into this commitment is truly magical. You two are proof that soulmates exist. May your married life be as enchanting as the love that brought you here.", "To {name}, on your wedding day — may you always look at each other the way you do today. With wonder. With adoration. With the quiet certainty that you've found your home in each other."],
      long: ["Dear {name}, today is the day your love story becomes official, but the truth is, your story has been beautiful from the very first chapter. Watching your love grow has been like watching a masterpiece unfold — each moment more breathtaking than the last. Marriage will bring you new adventures, new challenges, and new reasons to fall in love all over again. Never stop holding hands, never stop saying 'I love you,' and never stop choosing each other. You are each other's greatest gift. May your marriage be filled with passion, tenderness, and a love that only deepens with every passing day. Congratulations, my loves."],
    },
    emotional: {
      short: ["Seeing you married makes my heart so full, {name}.", "You deserve this love, {name}. Every bit of it.", "{name}, your happiness today moves me deeply.", "To see you loved like this, {name} — that's everything.", "Tears of joy for you, {name}. Congratulations."],
      medium: ["{name}, your wedding day is a reminder that good things do come to those who wait, who hope, and who never stop believing in love. Seeing you so happy fills my heart in ways I can't fully explain. You deserve this and so much more.", "Dear {name}, there are moments in life that change everything, and your wedding is one of them. As I watch you make this promise, I'm filled with gratitude — for your happiness, for your love, and for the privilege of being here. Congratulations.", "Congratulations, {name}. I always knew you'd find someone who sees you the way you deserve to be seen — fully, deeply, unconditionally. Today, watching you step into forever is one of the most beautiful things I've ever witnessed.", "{name}, your wedding brings tears to my eyes — the good kind. The kind that come from knowing someone you love has found their person. May your marriage be a safe harbour, a wild adventure, and the truest love you've ever known."],
      long: ["Dear {name}, as I watch you say your vows, I'm reminded of everything you've been through to get here. The heartbreaks, the waiting, the quiet nights when you wondered if this moment would ever come. And here you are — standing in love, wrapped in joy, beginning a new life with the person who was always meant for you. I want you to know that your journey has inspired me. Your resilience, your faith in love, and your beautiful heart have shown me what it means to never give up on happiness. May your marriage be everything you've ever dreamed of and more. I love you, {name}, and I'm so incredibly proud of you."],
    },
  },
};

// Fallback generator for occasions not covered above
function getGenericWishes(occasion: string, tone: string, length: "short" | "medium" | "long", name: string): string[] {
  const occasionLabel = occasion.replace(/_/g, " ");
  const toneMap: Record<string, TemplateSet> = {
    simple: {
      short: [
        `Wishing you a wonderful ${occasionLabel}, {name}!`,
        `Happy ${occasionLabel}, {name}! Hope it's amazing!`,
        `Sending warm wishes for ${occasionLabel}, {name}!`,
        `Here's to a great ${occasionLabel}, {name}!`,
        `All the best on this ${occasionLabel}, {name}!`,
      ],
      medium: [
        `Wishing you a truly memorable ${occasionLabel}, {name}! May this occasion bring you happiness, love, and everything wonderful. Enjoy every moment!`,
        `Happy ${occasionLabel}, {name}! This is your moment to celebrate, to reflect, and to look forward to all the beautiful things ahead. Sending you all my love!`,
        `Dear {name}, on this ${occasionLabel}, I want you to know how special you are. May this day be filled with joy, laughter, and cherished memories.`,
        `{name}, wishing you the best ${occasionLabel}! May this occasion mark the start of something beautiful and bring you closer to your dreams.`,
      ],
      long: [
        `Dear {name}, on this ${occasionLabel}, I want to take a moment to tell you how much you mean to me. This occasion is a reminder of how precious life's moments are, and sharing them with someone like you makes them even more meaningful. May this day bring you immense joy, peace of mind, and the warm feeling of being loved and appreciated. Here's to many more celebrations, many more memories, and a future filled with all the good things you deserve!`,
      ],
    },
    heartfelt: {
      short: [
        `From the bottom of my heart — happy ${occasionLabel}, {name}.`,
        `{name}, you make this ${occasionLabel} even more special.`,
        `Thinking of you this ${occasionLabel}, {name}. You mean so much.`,
        `Happy ${occasionLabel}, {name}. Grateful for you always.`,
        `{name}, may this ${occasionLabel} warm your heart the way you warm mine.`,
      ],
      medium: [
        `Dear {name}, this ${occasionLabel} reminds me how blessed I am to have you in my life. Your warmth, your kindness, and your unwavering spirit are gifts that keep on giving. May this occasion bring you the happiness you so richly deserve.`,
        `Happy ${occasionLabel}, {name}. Some people make the world brighter just by being in it — you're one of them. I hope this day fills your heart with as much love as you've poured into mine.`,
        `{name}, on this ${occasionLabel}, I want you to know that you are treasured. Every smile, every word, every memory — they all matter. Wishing you a day as beautiful as your heart.`,
        `To {name}, on this special ${occasionLabel} — thank you for being someone I can always count on. May this occasion bring you peace, joy, and the quiet confidence that you are deeply loved.`,
      ],
      long: [
        `Dear {name}, as this ${occasionLabel} arrives, I find myself reflecting on what you mean to me and to everyone around you. You have a way of making people feel seen, valued, and important. That is a rare gift, and I hope you know how much it matters. On this occasion, I wish you not just happiness, but the kind of deep, lasting contentment that comes from knowing you've made a difference. May your days be filled with love, your nights with peace, and your future with endless possibilities. You deserve every good thing this world has to offer.`,
      ],
    },
    funny: {
      short: [
        `Happy ${occasionLabel}, {name}! Try not to have too much fun! 😄`,
        `{name}, it's ${occasionLabel}! Time to celebrate (responsibly… maybe)!`,
        `Happy ${occasionLabel}, {name}! Let's party like it's an occasion!`,
        `{name}, wishing you a ${occasionLabel} that's as awesome as you (almost)!`,
        `Happy ${occasionLabel}, {name}! No speech, just vibes! 🎉`,
      ],
      medium: [
        `Happy ${occasionLabel}, {name}! I was going to write something profound, but let's be honest — you'd rather hear something funny. So here goes: you're amazing, you're loved, and you still owe me that lunch. Enjoy your day!`,
        `{name}, happy ${occasionLabel}! They say laughter is the best medicine, so consider this wish your daily dose. May your day be filled with joy, snacks, and zero responsibilities!`,
        `Dear {name}, happy ${occasionLabel}! I thought about getting you something special, but I figured my friendship is already the greatest gift. You're welcome! Have an awesome day!`,
        `Happy ${occasionLabel}, {name}! Remember, the best things in life are free — like this wish. But if you want, you can buy me dinner to say thanks. Just kidding! (Or am I?) 😄`,
      ],
      long: [
        `Happy ${occasionLabel}, {name}! I tried to write a serious, emotional message for you, but honestly, that's not us. We're the kind of people who laugh at inappropriate times, share terrible memes, and call each other out on everything. And you know what? That's the best kind of relationship. So here's my wish for you: may this ${occasionLabel} bring you ridiculous amounts of joy, zero stress, unlimited snacks, and at least one really good belly laugh. You deserve the world, {name} — but I know you'd settle for pizza and a good time. Happy ${occasionLabel}!`,
      ],
    },
    formal: {
      short: [
        `Warm wishes on this ${occasionLabel}, {name}.`,
        `Wishing you a pleasant and memorable ${occasionLabel}, {name}.`,
        `On this ${occasionLabel}, I extend my best wishes, {name}.`,
        `With warm regards — happy ${occasionLabel}, {name}.`,
        `Wishing you well on this occasion, {name}.`,
      ],
      medium: [
        `Dear {name}, I extend my warmest wishes to you on this ${occasionLabel}. May this occasion bring you joy, fulfilment, and continued success in all your endeavours. It is a pleasure to convey my regards on this special day.`,
        `{name}, on this ${occasionLabel}, please accept my sincere best wishes. May this day be marked with positivity, growth, and the satisfaction of knowing you are valued and respected.`,
        `Wishing you a very happy ${occasionLabel}, {name}. May this occasion serve as a reminder of your achievements and the bright future that lies ahead. My best regards to you.`,
        `Dear {name}, on the occasion of this ${occasionLabel}, I wish you good health, prosperity, and the continued fulfilment of your goals. It is always a pleasure to extend my best wishes to you.`,
      ],
      long: [
        `Dear {name}, on this ${occasionLabel}, I would like to take a moment to extend my most sincere congratulations and best wishes. Your dedication, integrity, and positive contributions have not gone unnoticed, and occasions like these serve as a reminder of the value you bring to everyone around you. May this day mark the beginning of an even more rewarding chapter, filled with professional success, personal growth, and lasting happiness. It is with great respect and admiration that I wish you all the very best.`,
      ],
    },
    romantic: {
      short: [
        `Happy ${occasionLabel}, my love {name}. You are my everything. ❤️`,
        `{name}, every day with you is a celebration. Happy ${occasionLabel}.`,
        `You make life beautiful, {name}. Happy ${occasionLabel}.`,
        `To the love of my life — happy ${occasionLabel}, {name}.`,
        `{name}, my heart is yours. Happy ${occasionLabel}. 💕`,
      ],
      medium: [
        `Happy ${occasionLabel}, {name}. Every moment with you feels like a dream I never want to wake up from. You are my favourite person, my safe place, and my greatest adventure. Here's to us.`,
        `{name}, on this ${occasionLabel}, I want you to know that you are the best part of my life. Your love is the kind that songs are written about and stories are told about. I'm the luckiest person alive.`,
        `Dear {name}, happy ${occasionLabel}. Before you, love was just a word. Now, it's a feeling I carry with me every single day. Thank you for making my world so incredibly beautiful.`,
        `To {name}, on this ${occasionLabel} — you are my today, my tomorrow, and my forever. I choose you, always. I love you more than you'll ever know.`,
      ],
      long: [
        `Dear {name}, on this ${occasionLabel}, I want to pour my heart out to you. You came into my life and changed everything — the way I see the world, the way I love, the way I dream. You are not just my partner; you are my best friend, my confidant, and the person I want to share every sunrise and sunset with. This occasion is special because I get to celebrate it with you. May our love continue to grow deeper, stronger, and more beautiful with every passing day. I love you with every fibre of my being, {name}. Happy ${occasionLabel}.`,
      ],
    },
    emotional: {
      short: [
        `This ${occasionLabel} means so much because of you, {name}.`,
        `{name}, you bring tears of joy to my eyes. Happy ${occasionLabel}.`,
        `Grateful beyond words for you, {name}. Happy ${occasionLabel}.`,
        `Happy ${occasionLabel}, {name}. You are my greatest blessing.`,
        `{name}, this ${occasionLabel} wouldn't be the same without you.`,
      ],
      medium: [
        `Dear {name}, this ${occasionLabel} has me feeling things I can barely put into words. You have been such a vital part of my life — through the highs and the lows, through laughter and tears. I am who I am because of you. Wishing you the most beautiful celebration.`,
        `{name}, on this ${occasionLabel}, I want you to know that you are one of the most important people in my world. Your love, your strength, and your presence have shaped my life in ways I'll never be able to fully express. Thank you for everything.`,
        `Happy ${occasionLabel}, {name}. Some feelings are too deep for words, and what I feel for you is one of them. Just know that you are loved, you are cherished, and you are never taken for granted.`,
        `To {name}, on this ${occasionLabel} — if I could give you one thing, it would be the ability to see yourself through my eyes. Because then you'd know just how extraordinary you truly are.`,
      ],
      long: [
        `Dear {name}, as this ${occasionLabel} arrives, I'm overwhelmed with emotion. Not because of the occasion itself, but because of what it represents — another moment I get to share with you, another chance to tell you how much you matter. You have walked with me through storms and sunshine, and you have never let go of my hand. Your strength gives me courage, your kindness gives me hope, and your love gives me everything. On this day, I don't just wish you happiness — I wish you peace, I wish you healing, and I wish you the deep, quiet joy of knowing that you are enough. You are more than enough. You are everything. Happy ${occasionLabel}, {name}.`,
      ],
    },
  };

  const set = toneMap[tone] || toneMap.simple;
  return (set[length] || set.short).map(t => t.replace(/{name}/g, name || "friend"));
}

export function generateWishes(
  occasionId: string,
  tone: string,
  length: "short" | "medium" | "long",
  recipientName: string,
  _relationship: string,
  extraDetails: string,
  count: number = 3
): string[] {
  const name = recipientName.trim() || "friend";
  
  // Try specific templates first
  const occasionTemplates = templates[occasionId];
  let pool: string[] = [];

  if (occasionTemplates) {
    const toneSet = occasionTemplates[tone] || occasionTemplates.simple;
    if (toneSet) {
      pool = [...(toneSet[length] || toneSet.short)];
    }
  }

  // Fallback to generic
  if (pool.length === 0) {
    pool = getGenericWishes(occasionId, tone, length, name);
  }

  // Replace name placeholder
  pool = pool.map(t => t.replace(/{name}/g, name));

  // If extra details provided, append a personalized line to medium/long wishes
  if (extraDetails.trim() && (length === "medium" || length === "long")) {
    pool = pool.map(t => {
      const detail = extraDetails.trim();
      return t + ` (P.S. — ${detail})`;
    });
  }

  // Pick `count` unique wishes, repeat if needed
  const result: string[] = [];
  const shuffled = pool.sort(() => Math.random() - 0.5);
  for (let i = 0; i < count; i++) {
    result.push(shuffled[i % shuffled.length]);
  }
  return result;
}
