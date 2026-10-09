// Annual tithi shraddha (ekoddishta / barkhi shraddha), simplified household outline.
// Sankalpa and tarpan lines are the standard formula with the family's gotra and
// names filled in from S.sh. A priest's paddhati should be followed where available.

const SH_RELATIONS = {
  father:      { ne: 'बुबा', en: 'Father', hi: 'पिता', nom: 'अस्मत्पिता', gen: 'अस्मत्पितुः', rupa: 'वसुरूपः', f: false },
  mother:      { ne: 'आमा', en: 'Mother', hi: 'माता', nom: 'अस्मन्माता', gen: 'अस्मन्मातुः', rupa: 'वसुरूपा', f: true },
  grandfather: { ne: 'हजुरबुबा', en: 'Grandfather', hi: 'दादा', nom: 'अस्मत्पितामहः', gen: 'अस्मत्पितामहस्य', rupa: 'रुद्ररूपः', f: false },
  grandmother: { ne: 'हजुरआमा', en: 'Grandmother', hi: 'दादी', nom: 'अस्मत्पितामही', gen: 'अस्मत्पितामह्याः', rupa: 'रुद्ररूपा', f: true }
};
// Sanskrit endings for the name: nominative / genitive.
const SH_TITLES = {
  sharma: { ne: 'शर्मा (ब्राह्मण)', en: 'Sharma (Brahmin)', hi: 'शर्मा (ब्राह्मण)', nom: 'शर्मा', gen: 'शर्मणः' },
  varma:  { ne: 'वर्मा (क्षत्री)', en: 'Varma (Chhetri)', hi: 'वर्मा (क्षत्रिय)', nom: 'वर्मा', gen: 'वर्मणः' }
};
const SH_MONTH_STEMS = ['चैत्र', 'वैशाख', 'ज्येष्ठ', 'आषाढ', 'श्रावण', 'भाद्रपद', 'आश्विन', 'कार्तिक', 'मार्गशीर्ष', 'पौष', 'माघ', 'फाल्गुन'];
const SH_TITHI_STEMS = ['प्रतिपत्', 'द्वितीया', 'तृतीया', 'चतुर्थी', 'पञ्चमी', 'षष्ठी', 'सप्तमी', 'अष्टमी', 'नवमी', 'दशमी',
  'एकादशी', 'द्वादशी', 'त्रयोदशी', 'चतुर्दशी', 'पूर्णिमा'];

// Pieces of the formula, with अमुक ("so-and-so") where nothing is entered yet.
function shParts() {
  const sh = S.sh, rel = SH_RELATIONS[sh.relation] || SH_RELATIONS.father;
  const title = SH_TITLES[sh.title] || SH_TITLES.sharma;
  const gotra = sh.gotra.trim() || 'अमुक';
  const name = sh.name.trim() || 'अमुक';
  const me = sh.me.trim() || 'अमुक';
  const tithiStem = sh.paksha === 'K' && sh.tithi === 15 ? 'अमावास्या' : SH_TITHI_STEMS[sh.tithi - 1];
  return {
    rel,
    nameNom: `${name} ${rel.f ? 'देवी' : title.nom}`,
    nameGen: `${name} ${rel.f ? 'देव्याः' : title.gen}`,
    gotraNom: `${gotra}गोत्र${rel.f ? 'ा' : 'ः'}`,
    gotraGen: `${gotra}गोत्र${rel.f ? 'ायाः' : 'स्य'}`,
    myGotra: `${gotra}गोत्रः`,
    me: `${me} ${title.nom}`,
    when: `${SH_MONTH_STEMS[sh.month]}मासे ${sh.paksha === 'S' ? 'शुक्ल' : 'कृष्ण'}पक्षे ${tithiStem}तिथौ`
  };
}

function shSankalpa() {
  const p = shParts();
  return `ॐ विष्णुर्विष्णुर्विष्णुः। अद्य ${p.when}\n${p.myGotra} अहं ${p.me}\n${p.gotraGen} ${p.rel.gen} ${p.nameGen}\nवार्षिकं एकोद्दिष्टश्राद्धं करिष्ये॥`;
}
function shTarpan() {
  const p = shParts();
  return `${p.gotraNom} ${p.rel.nom} ${p.nameNom} ${p.rel.rupa}\nतृप्यताम् इदं सतिलं जलं ${p.rel.f ? 'तस्यै' : 'तस्मै'} स्वधा नमः॥`;
}
function shPinda() {
  const p = shParts();
  return `${p.gotraNom} ${p.rel.nom} ${p.nameNom} ${p.rel.rupa}\nइदं पिण्डं ${p.rel.f ? 'तस्यै' : 'तस्मै'} स्वधा॥`;
}

const SH_MATERIALS = [
  { ne: 'कुश (धेरै) र कुशको पवित्री (औंठी)', en: 'Kush grass (plenty) and a kush ring (pavitri)', hi: 'कुश (पर्याप्त) और कुश की पवित्री (अंगूठी)' },
  { ne: 'कालो तिल, जौ, अक्षता', en: 'Black sesame, barley, akshata (rice)', hi: 'काले तिल, जौ, अक्षत' },
  { ne: 'पिण्डका लागि: पकाएको भात वा जौको पीठो, घ्यू, मह, दूध', en: 'For pinda: cooked rice or barley flour, ghee, honey, milk', hi: 'पिंड के लिए: पका चावल या जौ का आटा, घी, शहद, दूध' },
  { ne: 'सेतो फूल, तुलसीपत्र, चन्दन', en: 'White flowers, tulsi leaves, sandalwood', hi: 'सफेद फूल, तुलसी पत्र, चंदन' },
  { ne: 'तामा वा कसको लोटा र थाली, टपरी (पातको थाल)', en: 'Copper or bronze pot and plate, leaf plates (tapari)', hi: 'तांबे या कांसे का लोटा और थाली, पत्तल' },
  { ne: 'नयाँ जनै, धोती (कर्ताका लागि)', en: 'A new janai and dhoti for the person performing', hi: 'नया जनेऊ और धोती (कर्ता के लिए)' },
  { ne: 'दियो, धूप', en: 'Lamp, incense', hi: 'दीपक, धूप' },
  { ne: 'सिदा (चामल, दाल, घ्यू, नुन, तरकारी, फलफूल) र दक्षिणा', en: 'Sidha (rice, lentils, ghee, salt, vegetables, fruit) and dakshina for the priest', hi: 'सीधा (चावल, दाल, घी, नमक, सब्ज़ी, फल) और दक्षिणा' },
  { ne: 'काग, गाई र कुकुरका लागि छुट्टै भाग', en: 'Separate portions for the crow, cow and dog', hi: 'कौवा, गाय और कुत्ते के लिए अलग भाग' }
];

const SH_RULES = [
  { ne: 'श्राद्धको अघिल्लो दिन र श्राद्धको दिन कर्ताले एक छाक मात्र खाने (एकछाक), मासु, मदिरा, प्याज, लसुन नखाने।', en: 'On the day before and the day of shraddha, the performer eats one meal only (ekchhak) and avoids meat, alcohol, onion and garlic.', hi: 'श्राद्ध के पहले दिन और श्राद्ध के दिन कर्ता एक समय भोजन करे (एकभुक्त), मांस, मदिरा, प्याज, लहसुन न खाए।' },
  { ne: 'श्राद्ध दिउँसो (अपराह्न) मा गरिन्छ; बिहान सबेरै वा रातमा गरिँदैन।', en: 'Shraddha is done in the afternoon (aparahna), not early morning or at night.', hi: 'श्राद्ध दोपहर बाद (अपराह्न) में किया जाता है; सुबह जल्दी या रात में नहीं।' },
  { ne: 'पितृकार्य गर्दा जनै दाहिने काँधमा (अपसव्य) राखिन्छ र दक्षिणतिर फर्किइन्छ।', en: 'For the rites to the ancestors, the janai is moved to the right shoulder (apasavya) and you face south.', hi: 'पितृकार्य में जनेऊ दाहिने कंधे पर (अपसव्य) रखा जाता है और दक्षिण की ओर मुख किया जाता है।' },
  { ne: 'श्राद्धको तिथि मृत्युको चान्द्र मास, पक्ष र तिथिबाट हेरिन्छ — अङ्ग्रेजी मितिबाट होइन।', en: 'The shraddha date follows the lunar month, paksha and tithi of death — not the English date.', hi: 'श्राद्ध की तिथि मृत्यु के चांद्र मास, पक्ष और तिथि से निकाली जाती है — अंग्रेज़ी तारीख से नहीं।' },
  { ne: 'परिवारको परम्परा र पुरोहितको सल्लाह यो सङ्क्षिप्त विधिभन्दा माथि हुन्छ।', en: 'Your family tradition and your priest’s guidance come before this short outline.', hi: 'परिवार की परंपरा और पुरोहित का मार्गदर्शन इस संक्षिप्त विधि से ऊपर है।' }
];

// Steps; a step's mantra may be a function so names fill in live.
const SH_STEPS = [
  {
    title: { ne: 'तयारी', en: 'Preparation', hi: 'तैयारी' },
    text: { ne: 'बिहान नुहाएर सफा धोती लगाउनुहोस्। घर र भान्सा सफा गरी पिण्ड र भोजनका लागि शुद्ध खाना पकाउनुहोस्। सामग्री सबै एकै ठाउँमा राख्नुहोस्।',
      en: 'Bathe in the morning and put on a clean dhoti. Clean the house and kitchen and cook pure food for the pinda and the meal. Keep all materials in one place.',
      hi: 'सुबह स्नान करके स्वच्छ धोती पहनें। घर और रसोई साफ करके पिंड व भोजन के लिए शुद्ध भोजन बनाएँ। सारी सामग्री एक स्थान पर रखें।' }
  },
  {
    title: { ne: 'आचमन, पवित्री र पवित्रीकरण', en: 'Achaman, pavitri and purification', hi: 'आचमन, पवित्री और पवित्रीकरण' },
    text: { ne: 'दाहिने हातको अनामिकामा कुशको पवित्री लगाउनुहोस्। तीन पटक आचमन गरी आफू र सामग्रीमा पानी छर्कनुहोस्।',
      en: 'Wear the kush ring on the ring finger of the right hand. Sip water three times (achaman) and sprinkle water on yourself and the materials.',
      hi: 'दाहिने हाथ की अनामिका में कुश की पवित्री पहनें। तीन बार आचमन करके अपने ऊपर और सामग्री पर जल छिड़कें।' },
    mantra: 'ॐ अपवित्रः पवित्रो वा सर्वावस्थां गतोऽपि वा।\nयः स्मरेत् पुण्डरीकाक्षं स बाह्याभ्यन्तरः शुचिः॥'
  },
  {
    title: { ne: 'पितृ प्रार्थना', en: 'Prayer to the ancestors', hi: 'पितृ प्रार्थना' },
    text: { ne: 'हात जोडेर देवता र पितृहरूलाई तीन पटक नमस्कार गर्नुहोस्। यो श्लोक श्राद्धको सुरु र अन्त्यमा पढिन्छ।',
      en: 'Join your hands and bow to the gods and ancestors three times. This verse is recited at the start and the end of shraddha.',
      hi: 'हाथ जोड़कर देवताओं और पितरों को तीन बार नमस्कार करें। यह श्लोक श्राद्ध के आरंभ और अंत में पढ़ा जाता है।' },
    mantra: 'देवताभ्यः पितृभ्यश्च महायोगिभ्य एव च।\nनमः स्वधायै स्वाहायै नित्यमेव नमो नमः॥',
    meaning: { ne: 'देवता, पितृ र महायोगीहरूलाई नमस्कार; स्वधा र स्वाहालाई सधैं बारम्बार नमस्कार।', en: 'Salutations to the gods, the ancestors and the great yogis; to Svadha and Svaha, salutations always, again and again.', hi: 'देवताओं, पितरों और महायोगियों को नमस्कार; स्वधा और स्वाहा को सदा बारंबार नमस्कार।' }
  },
  {
    title: { ne: 'सङ्कल्प', en: 'Sankalpa', hi: 'संकल्प' },
    text: { ne: 'दाहिने हातमा पानी, कुश, तिल र अक्षता लिएर तलको सङ्कल्प पढ्नुहोस् र पानी भुइँमा छोड्नुहोस्। माथिको "विवरण" मा गोत्र र नाम भर्नुभयो भने यहाँ आफैं आउँछ।',
      en: 'Hold water, kush, sesame and rice in the right hand, recite the sankalpa below and let the water fall. If you fill in the gotra and names under "Details", they appear here automatically.',
      hi: 'दाहिने हाथ में जल, कुश, तिल और अक्षत लेकर नीचे का संकल्प पढ़ें और जल भूमि पर छोड़ें। "विवरण" में गोत्र और नाम भरें तो यहाँ अपने आप आ जाते हैं।' },
    mantra: () => shSankalpa()
  },
  {
    title: { ne: 'अपसव्य', en: 'Apasavya', hi: 'अपसव्य' },
    text: { ne: 'अब जनै दाहिने काँधमा सार्नुहोस् (अपसव्य) र दक्षिणतिर फर्कनुहोस्। कुश दक्षिणतिर टुप्पो पारेर बिछ्याउनुहोस्। पितृकार्यमा पानी बुढी औंला र चोर औंलाको बीचबाट (पितृतीर्थ) चढाइन्छ।',
      en: 'Now move the janai to the right shoulder (apasavya) and face south. Spread kush with the tips pointing south. In rites for ancestors, water is poured from between the thumb and index finger (pitri-tirtha).',
      hi: 'अब जनेऊ दाहिने कंधे पर करें (अपसव्य) और दक्षिण की ओर मुख करें। कुश को दक्षिण की ओर नोक करके बिछाएँ। पितृकार्य में जल अंगूठे और तर्जनी के बीच से (पितृतीर्थ) चढ़ाया जाता है।' }
  },
  {
    title: { ne: 'तर्पण', en: 'Tarpan (water offering)', hi: 'तर्पण' },
    text: { ne: 'अञ्जुलीमा पानी, कालो तिल र कुश लिएर तलको वाक्य भन्दै पितृतीर्थबाट तीन पटक पानी चढाउनुहोस्।',
      en: 'Hold water with black sesame and kush in your cupped hands; say the line below and pour the water from the pitri-tirtha three times.',
      hi: 'अंजलि में जल, काले तिल और कुश लेकर नीचे का वाक्य बोलते हुए पितृतीर्थ से तीन बार जल अर्पित करें।' },
    mantra: () => shTarpan(),
    meaning: { ne: 'हाम्रा पितृ (नाम, गोत्र) तृप्त होऊन्; तिलसहितको यो पानी उहाँलाई स्वधा।', en: 'May our ancestor (name, gotra) be satisfied; this water with sesame is offered to them with "svadha".', hi: 'हमारे पितर (नाम, गोत्र) तृप्त हों; तिल सहित यह जल उन्हें स्वधा।' }
  },
  {
    title: { ne: 'पिण्ड बनाउने र चढाउने', en: 'Making and offering the pinda', hi: 'पिंड बनाना और अर्पित करना' },
    text: { ne: 'भात वा जौको पीठोमा तिल, घ्यू, मह र दूध मिसाएर डल्लो (पिण्ड) बनाउनुहोस्। कुशमाथि राखेर तलको वाक्य भन्दै चढाउनुहोस्। पिण्डमाथि पानी, चन्दन, सेतो फूल, तिल र जनै/धागो चढाउनुहोस्।',
      en: 'Mix cooked rice or barley flour with sesame, ghee, honey and milk and shape it into a ball (pinda). Place it on the kush and offer it with the line below. Then offer water, sandalwood, white flowers, sesame and a thread over the pinda.',
      hi: 'पके चावल या जौ के आटे में तिल, घी, शहद और दूध मिलाकर गोला (पिंड) बनाएँ। कुश पर रखकर नीचे का वाक्य बोलते हुए अर्पित करें। पिंड पर जल, चंदन, सफेद फूल, तिल और धागा चढ़ाएँ।' },
    mantra: () => shPinda()
  },
  {
    title: { ne: 'काग, गाई र कुकुरको भाग', en: 'Portions for crow, cow and dog', hi: 'कौवा, गाय और कुत्ते का भाग' },
    text: { ne: 'भोजनको सानो भाग काग (कागबलि), गाई र कुकुरका लागि छुट्ट्याएर बाहिर राख्नुहोस्। विदेशमा गाई नभए फलफूल वा अन्न अरू जीवलाई दिन सकिन्छ।',
      en: 'Set aside small portions of the food for the crow (kag bali), the cow and the dog, and put them outside. Abroad, if there is no cow, food may be given to other animals or birds.',
      hi: 'भोजन का छोटा भाग कौवा (काकबलि), गाय और कुत्ते के लिए अलग करके बाहर रखें। विदेश में गाय न हो तो अन्न अन्य जीवों को दिया जा सकता है।' }
  },
  {
    title: { ne: 'ब्राह्मण भोजन वा सिदा दान', en: 'Feeding a priest or giving sidha', hi: 'ब्राह्मण भोजन या सीधा दान' },
    text: { ne: 'पुरोहित वा ब्राह्मणलाई भोजन गराउनुहोस्, वा कच्चा सामग्री (सिदा) र दक्षिणा दिनुहोस्। विदेशमा मन्दिर वा संस्थामा दान गर्न सकिन्छ।',
      en: 'Feed a priest or Brahmin, or give uncooked food (sidha) and dakshina. Abroad, you can give to a temple or a charity instead.',
      hi: 'पुरोहित या ब्राह्मण को भोजन कराएँ, या कच्ची सामग्री (सीधा) और दक्षिणा दें। विदेश में मंदिर या संस्था को दान दे सकते हैं।' }
  },
  {
    title: { ne: 'विसर्जन र सव्य', en: 'Closing and savya', hi: 'विसर्जन और सव्य' },
    text: { ne: 'जनै फेरि बायाँ काँधमा (सव्य) फर्काउनुहोस्। पितृ प्रार्थना फेरि पढी भूलका लागि क्षमा माग्नुहोस्। पिण्ड बगेको पानीमा सेलाउनुहोस् वा गाईलाई खुवाउनुहोस्। त्यसपछि परिवारसँग प्रसादस्वरूप भोजन गर्नुहोस्।',
      en: 'Return the janai to the left shoulder (savya). Recite the prayer to the ancestors again and ask forgiveness for mistakes. Put the pinda in flowing water or give it to a cow. Then eat together as a family.',
      hi: 'जनेऊ फिर बाएँ कंधे पर (सव्य) करें। पितृ प्रार्थना फिर पढ़कर भूलों के लिए क्षमा माँगें। पिंड बहते जल में प्रवाहित करें या गाय को खिलाएँ। फिर परिवार के साथ भोजन करें।' },
    mantra: 'मन्त्रहीनं क्रियाहीनं भक्तिहीनं सुरेश्वर।\nयत्पूजितं मया देव परिपूर्णं तदस्तु मे॥'
  }
];
