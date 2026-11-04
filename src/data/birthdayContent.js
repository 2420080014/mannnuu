const placeholderPhoto = (label, number, colors) => {
  const [from, to] = colors
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 960"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient><filter id="grain"><feTurbulence baseFrequency=".65" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="table" tableValues="0 .08"/></feComponentTransfer></filter></defs><rect width="800" height="960" fill="url(#g)"/><circle cx="590" cy="260" r="180" fill="#fff" opacity=".11"/><circle cx="210" cy="730" r="240" fill="#111" opacity=".15"/><path d="M0 710 Q200 570 410 730 T800 660 V960 H0Z" fill="#101010" opacity=".18"/><rect width="800" height="960" filter="url(#grain)"/><text x="56" y="820" font-family="Arial, sans-serif" font-size="28" letter-spacing="6" fill="#fff" opacity=".82">${label.toUpperCase()}</text><text x="58" y="870" font-family="Georgia, serif" font-size="18" fill="#fff" opacity=".6">a placeholder for a memory</text><text x="710" y="86" text-anchor="end" font-family="Arial, sans-serif" font-size="16" letter-spacing="4" fill="#fff" opacity=".7">${String(number).padStart(2, '0')}</text></svg>`
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export const birthdayContent = {
  // EDIT THESE VALUES FIRST: the site is intentionally personalized from this object.
  herName: 'Your Birthday Girl',
  nickname: 'Sunshine',
  creatorName: 'Someone who loves you',
  birthdayDate: '2026-12-31T00:00:00+05:30',
  countdownPreviewMode: true,
  countdownPreviewSeconds: 7,
  // Add your image at public/images/countdown-background.jpg or change this path.
  countdownBackgroundImage: '/images/countdown-background.jpg',
  // EDIT THESE TWO VALUES for the age-change animation.
  oldAge: '17',
  newAge: '18',
  audioPath: '/audio/birthday-song.mp3',
  letterVideoPath: '/video/birthday-letter.mp4',
  letterVideoPoster: '',
  letterAudioPath: '/audio/letter-music.mp3',
  candleWishes: [
    'I wish that you heal from the traumas that you joke about.',
    'I wish that you stop thinking about what other people think about you — it will make your life a lot easier.',
    'I wish that you live up to all the expectations you have for yourself.',
  ],
  candleRevealText: 'You blew them out. Make a wish, Sunshine — this new chapter is yours.',
  intro: 'Today is a little reminder of how special you are. Some people make ordinary moments feel beautiful, and you have a way of making memories worth keeping. This little corner of the internet is something I made just for you.',
  finalWish: 'May the year ahead feel gentle, bright, and completely yours.',
  letter: `Happy Birthday Potti Akkkaww ! ❤️\n\nI wanted to make something a little different for your special day, something that could bring a small smile to your face whenever you see it. You deserve so many beautiful things in life, and I hope this new year brings you happiness, peace, confidence, and lots of reasons to smile.\n\nI know sometimes you overthink things and worry about what might happen, but I hope you remember to be a little kinder to yourself. You don't have to have everything figured out, and you don't have to be perfect to be special. Just be yourself, take things one day at a time, and don't forget to enjoy the little moments too. 🫂\n\nAnd please, don't be too hard on yourself, okay? There are so many good things about you that you might not even notice yourself. I hope you get to see yourself with a little more kindness and give yourself the same care that you give to others.\n\nI'm glad I got to know you, Mannu. Thank you for the random conversations, the little laughs, and all those small moments that make talking to you special. I hope this birthday gives you memories you'll look back on with a smile.\n\nNo matter how this year goes, I hope you keep smiling, keep growing, and keep being the lovely person you are. May your worries become lighter, your happiness become bigger, and your days be filled with people and moments that make you feel appreciated. 🤍\n\nToday is your day, so enjoy every little moment of it. Eat lots of cake, smile a little extra, and make some beautiful memories!\n\n**Happy Birthday once again, Mannu!** 🎂🎀❤️\n\nWith lots of care and warm wishes,  \nSomeone who's really glad to know you 🤍`,
  photos: [
    { src: '/images/memory-01.jpeg', alt: 'Photo memory 1', caption: 'Soft days', tag: '01' },
    { src: '/images/memory-02.jpeg', alt: 'Photo memory 2', caption: 'Cutie', tag: '02' },
    { src: '/images/memory-03.jpeg', alt: 'Photo memory 3', caption: 'Sunshine', tag: '03' },
    { src: '/images/memory-04.jpeg', alt: 'Photo memory 4', caption: 'Always you', tag: '04' },
    { src: '/images/memory-05.jpeg', alt: 'Photo memory 5', caption: 'My love', tag: '05' },
    { src: '/images/memory-06.jpeg', alt: 'Photo memory 6', caption: 'Beautiful', tag: '06' },
    { src: '/images/memory-07.jpeg', alt: 'Photo memory 7', caption: 'Dream girl', tag: '07' },
    { src: '/images/memory-08.jpeg', alt: 'Photo memory 8', caption: 'Queen', tag: '08' },
  ],
  sketchbookPages: [
    {
      type: 'cover',
      title: 'SKETCHBOOK',
      subtitle: 'a little collection of lovely things',
      photoIndex: 0,
      label: 'for Sunshine',
    },
    {
      type: 'spread',
      left: { quote: 'You are a bright thing in the quiet dark.', photoIndex: 1, caption: 'keep this one close', accent: 'red' },
      right: { quote: 'May the soft days find you often.', photoIndex: 2, caption: 'a little sunshine', accent: 'cream' },
      note: 'PAGE TWO / THREE',
    },
    {
      type: 'spread',
      left: { quote: 'I like the way you make ordinary moments feel new.', photoIndex: 3, caption: 'always you', accent: 'pink' },
      right: { quote: 'Some memories arrive quietly and stay forever.', photoIndex: 4, caption: 'worth keeping', accent: 'green' },
      note: 'PAGE FOUR / FIVE',
    },
    {
      type: 'spread',
      left: { quote: 'A little more laughter. A little less worry.', photoIndex: 5, caption: 'good things ahead', accent: 'red' },
      right: { quote: 'You make a beautiful kind of sense.', photoIndex: 6, caption: 'notes on you', accent: 'purple' },
      note: 'PAGE SIX / SEVEN',
    },
    {
      type: 'final',
      title: 'darling,\nyou will be okay.',
      quote: 'Keep dreaming big. Keep becoming you.',
      photoIndex: 7,
      label: 'HAPPY BIRTHDAY',
      note: 'PAGE EIGHT / THE END FOR NOW',
    },
  ],
}

export { placeholderPhoto }
