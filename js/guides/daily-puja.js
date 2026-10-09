// Daily Puja (nitya puja): full and 5-minute versions.
// Steps follow common Nepali household practice; the mantras are standard
// shlokas recited in most homes.

const DAILY_MATERIALS = [
  { ne: 'तामाको लोटामा सफा पानी', en: 'Clean water in a copper pot (lota)', hi: 'तांबे के लोटे में स्वच्छ जल' },
  { ne: 'दियो (घ्यू वा तेल) र सलाई', en: 'Oil lamp (ghee or oil) and matches', hi: 'दीपक (घी या तेल) और माचिस' },
  { ne: 'धूप वा अगरबत्ती', en: 'Incense (dhoop or agarbatti)', hi: 'धूप या अगरबत्ती' },
  { ne: 'चन्दन, अबिर र अक्षता (चामल)', en: 'Sandalwood paste, red abir and akshata (unbroken rice)', hi: 'चंदन, अबीर और अक्षत (चावल)' },
  { ne: 'फूल र तुलसीपत्र', en: 'Flowers and tulsi leaves', hi: 'फूल और तुलसी पत्र' },
  { ne: 'नैवेद्य: फलफूल, मिठाई वा मिश्री', en: 'Naivedya: fruit, sweets or sugar crystals', hi: 'नैवेद्य: फल, मिठाई या मिश्री' },
  { ne: 'घण्टी (भए)', en: 'Small bell (if you have one)', hi: 'घंटी (यदि हो)' }
];

const DAILY_STEPS = [
  {
    short: true,
    title: { ne: 'शुद्ध हुनुहोस्', en: 'Get ready', hi: 'शुद्ध हो जाएँ' },
    text: { ne: 'नुहाएर सफा लुगा लगाउनुहोस्। पूजाकोठा वा पूजास्थल सफा गर्नुहोस्। पूर्व वा उत्तरतर्फ फर्केर आसनमा बस्नुहोस्।',
      en: 'Bathe and put on clean clothes. Tidy the puja place. Sit on a mat facing east or north.',
      hi: 'स्नान करके स्वच्छ वस्त्र पहनें। पूजा स्थान साफ करें। पूर्व या उत्तर की ओर मुख करके आसन पर बैठें।' }
  },
  {
    title: { ne: 'आचमन', en: 'Achaman (sipping water)', hi: 'आचमन' },
    text: { ne: 'दाहिने हातको हत्केलामा अलिकति पानी लिएर तीन पटक पिउनुहोस्, हरेक पटक एउटा नाम भन्दै। त्यसपछि "ॐ हृषीकेशाय नमः" भन्दै हात धुनुहोस्।',
      en: 'Take a little water in the right palm and sip it three times, saying one name each time. Then wash the hand saying "Om Hrishikeshaya namah".',
      hi: 'दाहिनी हथेली में थोड़ा जल लेकर तीन बार पिएँ, हर बार एक नाम बोलते हुए। फिर "ॐ हृषीकेशाय नमः" कहकर हाथ धो लें।' },
    mantra: 'ॐ केशवाय नमः। ॐ नारायणाय नमः। ॐ माधवाय नमः।',
    meaning: { ne: 'केशव, नारायण र माधव (भगवान् विष्णु) लाई नमस्कार।', en: 'Salutations to Keshava, Narayana and Madhava (names of Vishnu).', hi: 'केशव, नारायण और माधव (भगवान विष्णु) को नमस्कार।' }
  },
  {
    short: true,
    title: { ne: 'पवित्रीकरण', en: 'Purification', hi: 'पवित्रीकरण' },
    text: { ne: 'बायाँ हातमा पानी लिएर दाहिने हातका औंलाले आफ्नो शरीर र पूजा सामग्रीमा छर्कनुहोस्।',
      en: 'Hold water in the left hand and sprinkle it with the fingers of the right hand over yourself and the puja items.',
      hi: 'बाएँ हाथ में जल लेकर दाहिने हाथ की उँगलियों से अपने ऊपर और पूजा सामग्री पर छिड़कें।' },
    mantra: 'ॐ अपवित्रः पवित्रो वा सर्वावस्थां गतोऽपि वा।\nयः स्मरेत् पुण्डरीकाक्षं स बाह्याभ्यन्तरः शुचिः॥',
    meaning: { ne: 'पवित्र होस् वा अपवित्र, जुनसुकै अवस्थामा भए पनि, जसले कमलनयन भगवान्‌लाई सम्झन्छ, ऊ भित्र-बाहिर दुवैतिरबाट शुद्ध हुन्छ।',
      en: 'Pure or impure, in whatever state one may be, whoever remembers the lotus-eyed Lord becomes pure within and without.',
      hi: 'पवित्र हो या अपवित्र, किसी भी अवस्था में हो, जो कमलनयन भगवान का स्मरण करता है वह भीतर-बाहर से शुद्ध हो जाता है।' }
  },
  {
    short: true,
    title: { ne: 'दियो बाल्नुहोस्', en: 'Light the lamp', hi: 'दीपक जलाएँ' },
    text: { ne: 'दियो र धूप बालेर भगवान्‌को दाहिनेतिर राख्नुहोस्।', en: 'Light the lamp and incense and place them to the right of the deity.', hi: 'दीपक और धूप जलाकर भगवान के दाहिनी ओर रखें।' },
    mantra: 'शुभं करोति कल्याणम् आरोग्यं धनसम्पदा।\nशत्रुबुद्धिविनाशाय दीपज्योतिर्नमोऽस्तु ते॥',
    meaning: { ne: 'शुभ, कल्याण, आरोग्य र धनसम्पत्ति दिने, शत्रुबुद्धि (नराम्रो विचार) नष्ट गर्ने दीपज्योतिलाई नमस्कार।',
      en: 'Salutations to the lamp’s light, which brings goodness, wellbeing, health and wealth, and destroys hostile thoughts.',
      hi: 'शुभ, कल्याण, आरोग्य और धन-संपदा देने वाली, शत्रुबुद्धि का नाश करने वाली दीपज्योति को नमस्कार।' }
  },
  {
    short: true,
    title: { ne: 'गणेश स्मरण', en: 'Remember Ganesh', hi: 'गणेश स्मरण' },
    text: { ne: 'हात जोडेर सबै काम निर्विघ्न होस् भनी गणेशलाई सम्झनुहोस्।', en: 'Join your hands and remember Ganesh, so that everything goes without obstacles.', hi: 'हाथ जोड़कर गणेश जी का स्मरण करें ताकि सब कार्य निर्विघ्न हों।' },
    mantra: 'वक्रतुण्ड महाकाय सूर्यकोटिसमप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥',
    meaning: { ne: 'हे घुमाउरो सुँड र विशाल शरीर भएका, करोडौं सूर्यजस्तै तेजिला देव, मेरा सबै काम सधैं विघ्नरहित बनाउनुहोस्।',
      en: 'O Lord with the curved trunk and mighty body, shining like a million suns, keep all my work free of obstacles, always.',
      hi: 'हे वक्रतुंड, महाकाय, करोड़ों सूर्यों के समान तेजस्वी देव, मेरे सभी कार्य सदा निर्विघ्न करें।' }
  },
  {
    title: { ne: 'सूर्यलाई अर्घ्य', en: 'Water offering to the Sun', hi: 'सूर्य को अर्घ्य' },
    text: { ne: 'बिहान हो भने लोटामा पानी, अक्षता र रातो फूल राखेर सूर्यतिर फर्की बिस्तारै पानी चढाउनुहोस्।',
      en: 'In the morning, put rice and a red flower in the water pot, face the sun and pour the water slowly.',
      hi: 'सुबह हो तो लोटे में जल, अक्षत और लाल फूल डालकर सूर्य की ओर मुख करके धीरे-धीरे जल अर्पित करें।' },
    mantra: 'ॐ सूर्याय नमः। इदम् अर्घ्यं समर्पयामि॥',
    meaning: { ne: 'सूर्यदेवलाई नमस्कार, यो अर्घ्य अर्पण गर्छु।', en: 'Salutations to the Sun; I offer this water.', hi: 'सूर्यदेव को नमस्कार, यह अर्घ्य अर्पित करता/करती हूँ।' }
  },
  {
    title: { ne: 'सङ्कल्प', en: 'Sankalpa (intention)', hi: 'संकल्प' },
    text: { ne: 'दाहिने हातमा पानी, अक्षता र फूल लिएर मनमनै भन्नुहोस्: "आज म आफ्नो परिवारको कल्याणका लागि भक्तिपूर्वक पूजा गर्छु।" त्यसपछि पानी भुइँमा छोड्नुहोस्।',
      en: 'Hold water, rice and a flower in the right hand and say in your heart: "Today I do this puja with devotion for the wellbeing of my family." Then let the water fall to the ground.',
      hi: 'दाहिने हाथ में जल, अक्षत और फूल लेकर मन में कहें: "आज मैं अपने परिवार के कल्याण हेतु भक्तिपूर्वक पूजा करता/करती हूँ।" फिर जल भूमि पर छोड़ दें।' }
  },
  {
    short: true,
    title: { ne: 'पञ्चोपचार पूजा', en: 'Five offerings (panchopachar)', hi: 'पंचोपचार पूजा' },
    text: { ne: 'आफ्नो इष्टदेवताको नाम लिएर (जस्तै "ॐ विष्णवे नमः", "ॐ नमः शिवाय", "ॐ दुर्गायै नमः") क्रमशः चन्दन, फूल, धूप, दियो र नैवेद्य चढाउनुहोस्। हरेकसँग तलको वाक्य भन्नुहोस्।',
      en: 'Using the name of your family deity (for example "Om Vishnave namah", "Om Namah Shivaya", "Om Durgayai namah"), offer in turn sandalwood, flowers, incense, the lamp and food. Say the line below with each.',
      hi: 'अपने इष्टदेव का नाम लेकर (जैसे "ॐ विष्णवे नमः", "ॐ नमः शिवाय", "ॐ दुर्गायै नमः") क्रम से चंदन, फूल, धूप, दीप और नैवेद्य चढ़ाएँ। हर एक के साथ नीचे का वाक्य बोलें।' },
    mantra: 'गन्धं समर्पयामि। पुष्पं समर्पयामि। धूपम् आघ्रापयामि।\nदीपं दर्शयामि। नैवेद्यं निवेदयामि॥',
    meaning: { ne: 'चन्दन अर्पण गर्छु, फूल अर्पण गर्छु, धूपको सुगन्ध दिन्छु, दियो देखाउँछु, नैवेद्य अर्पण गर्छु।',
      en: 'I offer sandalwood, I offer flowers, I offer the fragrance of incense, I show the lamp, I offer food.',
      hi: 'चंदन अर्पित करता हूँ, पुष्प अर्पित करता हूँ, धूप सुँघाता हूँ, दीप दिखाता हूँ, नैवेद्य निवेदित करता हूँ।' }
  },
  {
    title: { ne: 'जप र प्रार्थना', en: 'Japa and prayer', hi: 'जप और प्रार्थना' },
    text: { ne: 'इष्टदेवताको नाम-मन्त्र ११ वा १०८ पटक जप गर्नुहोस्, वा मनको कुरा भगवान्‌सँग भन्नुहोस्।',
      en: 'Repeat your deity’s name-mantra 11 or 108 times, or simply speak to God from the heart.',
      hi: 'इष्टदेव का नाम-मंत्र 11 या 108 बार जपें, या मन की बात भगवान से कहें।' },
    mantra: 'ॐ नमो भगवते वासुदेवाय॥',
    meaning: { ne: 'भगवान् वासुदेव (श्रीकृष्ण/विष्णु) लाई नमस्कार। (आफ्नो इष्टदेवताको मन्त्र पनि जप्न सकिन्छ।)',
      en: 'Salutations to Lord Vasudeva (Krishna/Vishnu). (You may use your own deity’s mantra instead.)',
      hi: 'भगवान वासुदेव (श्रीकृष्ण/विष्णु) को नमस्कार। (अपने इष्टदेव का मंत्र भी जप सकते हैं।)' }
  },
  {
    short: true,
    title: { ne: 'आरती र परिक्रमा', en: 'Aarti and circling', hi: 'आरती और परिक्रमा' },
    text: { ne: 'दियो घडीको दिशामा घुमाएर आरती गर्नुहोस्। आफू तीन पटक दाहिनेतिर घुम्नुहोस् वा उभिएर ठाउँमै घुम्नुहोस्।',
      en: 'Wave the lamp clockwise in front of the deity. Turn around clockwise three times where you stand.',
      hi: 'दीपक को घड़ी की दिशा में घुमाकर आरती करें। अपने स्थान पर ही दाहिनी ओर तीन बार घूमें।' }
  },
  {
    short: true,
    title: { ne: 'क्षमा प्रार्थना', en: 'Asking forgiveness', hi: 'क्षमा प्रार्थना' },
    text: { ne: 'हात जोडेर पूजामा भएका भूलका लागि क्षमा माग्नुहोस्। प्रसाद परिवारसँग बाँड्नुहोस्।',
      en: 'Join your hands and ask forgiveness for any mistakes in the puja. Share the prasad with your family.',
      hi: 'हाथ जोड़कर पूजा में हुई भूलों के लिए क्षमा माँगें। प्रसाद परिवार के साथ बाँटें।' },
    mantra: 'आवाहनं न जानामि न जानामि विसर्जनम्।\nपूजां चैव न जानामि क्षमस्व परमेश्वर॥\nमन्त्रहीनं क्रियाहीनं भक्तिहीनं सुरेश्वर।\nयत्पूजितं मया देव परिपूर्णं तदस्तु मे॥',
    meaning: { ne: 'म आवाहन, विसर्जन र पूजाविधि जान्दिनँ; हे परमेश्वर, क्षमा गर्नुहोस्। मन्त्र, क्रिया र भक्तिमा कमी भए पनि मैले गरेको पूजा पूर्ण होस्।',
      en: 'I do not know how to invite you, send you off, or worship properly; forgive me, O Lord. Though lacking in mantra, action and devotion, may the worship I have done be complete.',
      hi: 'मैं आवाहन, विसर्जन और पूजा-विधि नहीं जानता; हे परमेश्वर, क्षमा करें। मंत्र, क्रिया और भक्ति में कमी हो तो भी मेरी की हुई पूजा पूर्ण हो।' }
  }
];
