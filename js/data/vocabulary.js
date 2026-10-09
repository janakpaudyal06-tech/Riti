// Shared ritual vocabulary: month, tithi, paksha and weekday names in three languages.

const BS_MONTHS = [
  { ne: 'बैशाख', en: 'Baisakh', hi: 'बैशाख' }, { ne: 'जेठ', en: 'Jestha', hi: 'जेठ' },
  { ne: 'असार', en: 'Asar', hi: 'असार' }, { ne: 'साउन', en: 'Shrawan', hi: 'साउन' },
  { ne: 'भदौ', en: 'Bhadra', hi: 'भदौ' }, { ne: 'असोज', en: 'Ashwin', hi: 'असोज' },
  { ne: 'कात्तिक', en: 'Kartik', hi: 'कात्तिक' }, { ne: 'मंसिर', en: 'Mangsir', hi: 'मंसिर' },
  { ne: 'पुस', en: 'Poush', hi: 'पुस' }, { ne: 'माघ', en: 'Magh', hi: 'माघ' },
  { ne: 'फागुन', en: 'Falgun', hi: 'फागुन' }, { ne: 'चैत', en: 'Chaitra', hi: 'चैत' }
];

// Lunar months, index 0 = Chaitra (as returned by lunationOf).
const LUNAR_MONTHS = [
  { ne: 'चैत्र', en: 'Chaitra', hi: 'चैत्र' }, { ne: 'वैशाख', en: 'Vaishakh', hi: 'वैशाख' },
  { ne: 'ज्येष्ठ', en: 'Jyeshtha', hi: 'ज्येष्ठ' }, { ne: 'आषाढ', en: 'Ashadh', hi: 'आषाढ़' },
  { ne: 'श्रावण', en: 'Shravan', hi: 'श्रावण' }, { ne: 'भाद्र', en: 'Bhadra', hi: 'भाद्रपद' },
  { ne: 'आश्विन', en: 'Ashwin', hi: 'आश्विन' }, { ne: 'कार्तिक', en: 'Kartik', hi: 'कार्तिक' },
  { ne: 'मार्गशीर्ष', en: 'Margashirsha', hi: 'मार्गशीर्ष' }, { ne: 'पौष', en: 'Paush', hi: 'पौष' },
  { ne: 'माघ', en: 'Magh', hi: 'माघ' }, { ne: 'फाल्गुन', en: 'Phalgun', hi: 'फाल्गुन' }
];

const TITHIS = [
  { ne: 'प्रतिपदा', en: 'Pratipada', hi: 'प्रतिपदा' }, { ne: 'द्वितीया', en: 'Dwitiya', hi: 'द्वितीया' },
  { ne: 'तृतीया', en: 'Tritiya', hi: 'तृतीया' }, { ne: 'चतुर्थी', en: 'Chaturthi', hi: 'चतुर्थी' },
  { ne: 'पञ्चमी', en: 'Panchami', hi: 'पंचमी' }, { ne: 'षष्ठी', en: 'Shashthi', hi: 'षष्ठी' },
  { ne: 'सप्तमी', en: 'Saptami', hi: 'सप्तमी' }, { ne: 'अष्टमी', en: 'Ashtami', hi: 'अष्टमी' },
  { ne: 'नवमी', en: 'Navami', hi: 'नवमी' }, { ne: 'दशमी', en: 'Dashami', hi: 'दशमी' },
  { ne: 'एकादशी', en: 'Ekadashi', hi: 'एकादशी' }, { ne: 'द्वादशी', en: 'Dwadashi', hi: 'द्वादशी' },
  { ne: 'त्रयोदशी', en: 'Trayodashi', hi: 'त्रयोदशी' }, { ne: 'चतुर्दशी', en: 'Chaturdashi', hi: 'चतुर्दशी' },
  { ne: 'पूर्णिमा', en: 'Purnima', hi: 'पूर्णिमा' }, { ne: 'औंसी', en: 'Aunsi (Amavasya)', hi: 'अमावस्या' }
];

// Tithi 1..30 → its name (16–29 reuse 1–14; 30 is aunsi).
function tithiName(n) {
  if (n === 15) return TO(TITHIS[14]);
  if (n === 30) return TO(TITHIS[15]);
  return TO(TITHIS[(n - 1) % 15]);
}
function pakshaName(p) {
  return p === 'S' ? T('शुक्ल पक्ष', 'Shukla paksha (waxing)', 'शुक्ल पक्ष')
    : T('कृष्ण पक्ष', 'Krishna paksha (waning)', 'कृष्ण पक्ष');
}
function pakshaShort(p) { return p === 'S' ? T('शुक्ल', 'Shukla', 'शुक्ल') : T('कृष्ण', 'Krishna', 'कृष्ण'); }

const WEEKDAYS = [
  { ne: 'आइतबार', en: 'Sunday', hi: 'रविवार' }, { ne: 'सोमबार', en: 'Monday', hi: 'सोमवार' },
  { ne: 'मङ्गलबार', en: 'Tuesday', hi: 'मंगलवार' }, { ne: 'बुधबार', en: 'Wednesday', hi: 'बुधवार' },
  { ne: 'बिहीबार', en: 'Thursday', hi: 'गुरुवार' }, { ne: 'शुक्रबार', en: 'Friday', hi: 'शुक्रवार' },
  { ne: 'शनिबार', en: 'Saturday', hi: 'शनिवार' }
];
const WEEKDAYS_SHORT = [
  { ne: 'आइत', en: 'Sun', hi: 'रवि' }, { ne: 'सोम', en: 'Mon', hi: 'सोम' }, { ne: 'मङ्गल', en: 'Tue', hi: 'मंगल' },
  { ne: 'बुध', en: 'Wed', hi: 'बुध' }, { ne: 'बिही', en: 'Thu', hi: 'गुरु' }, { ne: 'शुक्र', en: 'Fri', hi: 'शुक्र' },
  { ne: 'शनि', en: 'Sat', hi: 'शनि' }
];

const AD_MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const AD_MONTHS_NE = ['जनवरी', 'फेब्रुअरी', 'मार्च', 'अप्रिल', 'मे', 'जुन', 'जुलाई', 'अगस्ट', 'सेप्टेम्बर', 'अक्टोबर', 'नोभेम्बर', 'डिसेम्बर'];
const AD_MONTHS_HI = ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];
