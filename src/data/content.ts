import type { Guest } from '@/types/invitation';

export type Language = 'vi' | 'en';
export type GuestAddressing = 'co' | 'anh' | 'chi' | 'be' | 'em' | 'ban';

const englishInvitationMessages: Record<Guest['relationship'], string> = {
  senior:
    "I'd love for you to join me for a few photos and to make happy memories on my graduation day. Having you there would mean so much to me.",
  friend:
    "Come celebrate my graduation with me! Let's take a few photos and make some happy memories together.",
  junior:
    "I'd love to share my graduation day with you. Come join me for a few photos and a happy celebration!",
};

export function getInvitationMessage(guest: Readonly<Guest>): string {
  return guest.customMessage ?? englishInvitationMessages[guest.relationship];
}

export function getVietnameseInvitationMessage(guest: Readonly<Guest>): string {
  if (guest.customMessageVi) return guest.customMessageVi;
  const who = guest.name.trim();
  switch (guest.addressing) {
    case 'co':
      return `Em tốt nghiệp rồi ạ. Ngày 28/11 này, cô ghé qua chụp với em vài tấm hình kỷ niệm được không ạ? Em mong được gặp cô hôm đó!`;
    case 'anh':
      return `Em tốt nghiệp rồi nè. Ngày 28/11 này, anh ghé qua chụp với em vài tấm hình kỷ niệm nhé. Hy vọng hôm đó được gặp anh ạ!`;
    case 'chi':
      return `Em tốt nghiệp rồi nè. Ngày 28/11 này, chị ghé qua chụp với em vài tấm hình kỷ niệm nhé. Hy vọng hôm đó được gặp chị ạ!`;
    case 'be':
      return `Chị tốt nghiệp rồi nè. Ngày 28/11 này, bé ghé qua chụp với chị vài tấm hình nha. Mong gặp bé hôm đó!`;
    case 'em':
      return `Chị tốt nghiệp rồi nè. Ngày 28/11 này, em ghé qua chụp với chị vài tấm hình nha. Mong gặp em hôm đó!`;
    case 'ban':
      return `28/11 này Hải Hạnh tốt nghiệp rồi. Không biết hôm đó ${who} có rảnh ghé qua chụp với Hải Hạnh vài tấm hình không? Hải Hạnh muốn có một tấm hình với ${who} hôm ấy.\n\nHy vọng gặp ${who} nha.`;
    default:
      return `28/11 này Hải Hạnh tốt nghiệp rồi. Hôm đó ghé qua chụp với Hải Hạnh vài tấm hình nha. Mong được gặp bạn!`;
  }
}

export const siteContent = {
  title: "HAI HANH'S GRAD ERA",
  description: "A personal invitation to celebrate Dương Hải Hạnh's graduation.",
  rootGuidance: 'Please open your personal invitation link to view your invitation.',
  notFoundTitle: 'Invitation not found',
  notFoundMessage: 'Please check your invitation link or ask Hải Hạnh to send it again.',
};

export const editorialContent = {
  intro: {
    brand: 'SPECIAL DELIVERY',
    headline: ['A LETTER', 'FOR', 'YOU'],
    note: 'A little celebration. A lot of heart.',
    open: 'OPEN',
    accessibleOpen: 'Open your invitation',
    postal: 'PERSONAL DELIVERY',
  },
  cover: {
    edition: 'The graduation era',
    headline: 'I DID IT!',
    class: 'CLASS OF 2026',
    caption: "And I'd love to celebrate with you.",
    portrait: 'A new chapter',
    portraitLabel: 'Graduation portrait placeholder',
  },
  letter: {
    label: 'A personal invitation',
    displayStart: 'JUST',
    displayEnd: 'FOR YOU',
    signoff: 'With love,',
    signature: 'Hải Hạnh',
  },
  event: { headline: "IT'S A DATE", kicker: '' },
  accounting: {
    title: 'GRADUATION BALANCE SHEET',
    assetsLabel: 'Assets',
    assets: 'Good memories',
    liabilitiesLabel: 'Liabilities',
    liabilities: 'Deadlines',
    worthLabel: 'Equity',
    worth: 'Priceless',
    stamp: 'THE BOOKS ARE CLOSED',
  },
  location: {
    headline: 'FIND ME THERE',
    where: 'WHERE',
    assistance: 'NEED A HAND?',
    hint: 'Need help finding the venue? Give us a call.',
    action: 'GET DIRECTIONS',
    call: 'CALL',
  },
  wishes: {
    headline: 'WILL YOU BE THERE?',
    hint: 'Can you make it? Let me know below.',
    attendanceLabel: 'Will you attend?',
    yes: "I'll be there!",
    no: 'Sending love from afar',
    disclosure: 'Leave me a little note?',
    placeholder: 'Write me a little something...',
    label: 'Your message',
    submit: 'Send to Hạnh',
    sending: 'SENDING...',
    success: 'Delivered! Thanks for letting me know.',
    chooseAttendance: 'Choose an option before sending.',
    unavailable: "Replies aren't available yet.",
    short: 'A few more words, please.',
    long: 'Your note is a little too long.',
    rateLimited: 'Too many attempts. Please try again later.',
    failure: "Couldn't send your reply. Please try again.",
  },
  music: {
    off: 'Music off',
    on: 'Music on',
    play: 'Play music',
    pause: 'Pause music',
    blocked: 'Playback blocked · retry',
    unavailable: 'Audio unavailable',
  },
};

const vietnameseContent: typeof editorialContent = {
  intro: {
    brand: 'THƯ GỬI RIÊNG',
    headline: ['CÓ THƯ', 'GỬI BẠN!'],
    note: 'Hải Hạnh có một lời mời nhỏ dành cho bạn.',
    open: 'MỞ THƯ',
    accessibleOpen: 'Mở thư mời của bạn',
    postal: 'GỬI RIÊNG',
  },
  cover: {
    edition: 'Tốt nghiệp 2026',
    headline: 'TỐT NGHIỆP RỒI!',
    class: 'TỐT NGHIỆP 2026',
    caption: 'Hôm đó, Hải Hạnh muốn có một tấm hình cùng bạn.',
    portrait: 'Chặng đường mới',
    portraitLabel: 'Ảnh tốt nghiệp',
  },
  letter: { label: '', displayStart: 'GỬI RIÊNG', displayEnd: 'BẠN', signoff: '', signature: '' },
  event: { headline: '', kicker: "HẢI HẠNH'S GRADUATION · 2026" },
  accounting: {
    title: 'GRADUATION BALANCE SHEET',
    assetsLabel: 'TÀI SẢN',
    assets: 'Kỷ niệm',
    liabilitiesLabel: 'NỢ PHẢI TRẢ',
    liabilities: 'Deadline',
    worthLabel: 'GIÁ TRỊ RÒNG',
    worth: 'Không định giá được',
    stamp: 'CHỐT SỔ!',
  },
  location: {
    headline: 'GẶP NHAU Ở ĐÂY',
    where: 'ĐỊA ĐIỂM',
    assistance: 'LẠC ĐƯỜNG THÌ GỌI NHA',
    hint: '',
    action: 'MỞ GOOGLE MAPS',
    call: 'GỌI',
  },
  wishes: {
    headline: 'HÔM ĐÓ BẠN ĐẾN ĐƯỢC KHÔNG?',
    hint: 'Hôm đó bạn đến được không?',
    attendanceLabel: 'Bạn có đến được không?',
    yes: 'Có nha, mình đến!',
    no: 'Tiếc quá, hôm đó không đến được',
    disclosure: 'Muốn nhắn Hải Hạnh gì không?',
    placeholder: 'Viết vài dòng ở đây nha...',
    label: 'Lời nhắn',
    submit: 'GỬI CHO HẢI HẠNH',
    sending: 'ĐANG GỬI...',
    success: 'Gửi xong rồi, Hải Hạnh nhận được nha!',
    chooseAttendance: 'Chọn một câu trả lời trước nha.',
    unavailable: 'Hiện chưa gửi được lời nhắn.',
    short: 'Nhắn thêm vài chữ nữa nhé.',
    long: 'Lời nhắn hơi dài rồi, rút ngắn chút nha.',
    rateLimited: 'Gửi nhiều lần quá rồi, thử lại sau nhé.',
    failure: 'Chưa gửi được, thử lại giúp Hải Hạnh nhé.',
  },
  music: {
    off: 'Tắt nhạc',
    on: 'Bật nhạc',
    play: 'Bật nhạc',
    pause: 'Tắt nhạc',
    blocked: 'Nhấn để thử bật nhạc',
    unavailable: 'Không có nhạc',
  },
};

const honorifics: Record<GuestAddressing, string> = {
  co: 'CÔ',
  anh: 'ANH',
  chi: 'CHỊ',
  be: 'BÉ',
  em: 'EM',
  ban: 'BẠN',
};

export function getCopy(language: Language, addressing: GuestAddressing) {
  if (language === 'en') return editorialContent;
  const recipient = honorifics[addressing];
  const adult = addressing === 'anh' || addressing === 'chi' || addressing === 'co';
  const lower = recipient.toLocaleLowerCase('vi-VN');
  const question =
    addressing === 'co'
      ? 'Hôm đó cô có đến được không ạ?'
      : adult
        ? `Hôm đó ${lower} đến được không ạ?`
        : `Hôm đó ${lower} đến được không?`;
  const yes =
    addressing === 'ban'
      ? 'Có nha, mình đến!'
      : addressing === 'co'
        ? 'Cô đến được'
        : `${recipient.charAt(0)}${lower.slice(1)} đến được nha!`;
  const no =
    addressing === 'ban' ? 'Tiếc quá, hôm đó không đến được' : `Tiếc quá, ${lower} không đến được`;
  const note = adult
    ? 'Có muốn nhắn em gì không ạ?'
    : addressing === 'ban'
      ? 'Muốn nhắn Hải Hạnh gì không?'
      : 'Có muốn nhắn Hải Hạnh gì không?';
  return {
    ...vietnameseContent,
    intro: {
      ...vietnameseContent.intro,
      headline: ['CÓ THƯ', `GỬI ${recipient}!`],
      note: `Hải Hạnh có một lời mời nhỏ dành cho ${lower}.`,
    },
    cover: {
      ...vietnameseContent.cover,
      caption: adult
        ? `Hôm đó, em muốn có một tấm hình cùng ${lower}.`
        : addressing === 'ban'
          ? `Hôm đó, Hải Hạnh muốn có một tấm hình cùng ${lower}.`
          : `Hôm đó, chị muốn có một tấm hình cùng ${lower}.`,
    },
    letter: { ...vietnameseContent.letter, displayEnd: recipient },
    wishes: {
      ...vietnameseContent.wishes,
      headline: question.toLocaleUpperCase('vi-VN'),
      yes,
      no,
      disclosure: note,
    },
  };
}
