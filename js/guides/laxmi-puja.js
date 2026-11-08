// Laxmi Puja (Tihar, Kartik Krishna Aunsi): evening worship of Mahalakshmi at home.
// Steps follow common Nepali household practice. Shared steps (achaman, purification,
// lamp, Ganesh, forgiveness) reuse the Daily Puja wording and mantras.

const LAXMI_MATERIALS = [
  { ne: 'लक्ष्मी (र गणेश) को तस्बिर वा मूर्ति, रातो कपडा र चौकी', en: 'Picture or murti of Laxmi (and Ganesh), a red cloth and a low stand', hi: 'लक्ष्मी (और गणेश) का चित्र या मूर्ति, लाल कपड़ा और चौकी' },
  { ne: 'कलश (पानी भरेको), आँपका पात', en: 'Kalash filled with water, mango leaves', hi: 'जल से भरा कलश, आम के पत्ते' },
  { ne: 'धेरै दियो/पाला वा मैनबत्ती, तेल र बत्ती', en: 'Plenty of clay lamps (diyo/pala) or candles, oil and wicks', hi: 'बहुत से दीये या मोमबत्तियाँ, तेल और बाती' },
  { ne: 'सयपत्री र मखमली फूलको माला', en: 'Marigold (sayapatri) and makhamali garlands', hi: 'गेंदा और मखमली फूलों की माला' },
  { ne: 'रातो माटो वा रङ — लक्ष्मीको पाउ र रङ्गोली बनाउन', en: 'Red clay or colour powder for Laxmi’s footprints and rangoli', hi: 'लक्ष्मी के चरण और रंगोली के लिए लाल मिट्टी या रंग' },
  { ne: 'अबिर, सिन्दूर, चन्दन, अक्षता, सुपारी', en: 'Abir, sindur, sandalwood paste, akshata (rice), betel nut', hi: 'अबीर, सिंदूर, चंदन, अक्षत, सुपारी' },
  { ne: 'पैसा, सुन-चाँदीका सिक्का वा गहना, हिसाबको किताब (व्यापार भए)', en: 'Cash, gold or silver coins or jewellery, account books (for a business)', hi: 'रुपये, सोने-चाँदी के सिक्के या गहने, बही-खाता (व्यापार हो तो)' },
  { ne: 'धूप, कपूर, घण्टी', en: 'Incense, camphor, bell', hi: 'धूप, कपूर, घंटी' },
  { ne: 'नैवेद्य: सेलरोटी, फलफूल, मिठाई, खीर', en: 'Naivedya: sel roti, fruit, sweets, kheer', hi: 'नैवेद्य: सेल रोटी, फल, मिठाई, खीर' }
];

function dailyStep(en) { return DAILY_STEPS.find(s => s.title.en === en); }

const LAXMI_STEPS = [
  {
    title: { ne: 'बिहान: गाई पूजा', en: 'Morning: Gai Puja', hi: 'सुबह: गाय पूजा' },
    text: { ne: 'लक्ष्मी पूजाको दिन बिहान गाईलाई लक्ष्मीको रूप मानेर पुजिन्छ — निधारमा टीका, घाँटीमा माला लगाएर राम्रो खाना खुवाइन्छ। विदेशमा गाई नभए यो चरण छोड्न वा मनमनै सम्झन सकिन्छ।',
      en: 'On the morning of Laxmi Puja, the cow is worshipped as a form of Laxmi — tika on her forehead, a garland, and good food. Abroad, if there is no cow, skip this or simply remember her in your heart.',
      hi: 'लक्ष्मी पूजा के दिन सुबह गाय को लक्ष्मी का रूप मानकर पूजा जाता है — माथे पर टीका, गले में माला और अच्छा भोजन। विदेश में गाय न हो तो यह चरण छोड़ दें या मन में स्मरण करें।' }
  },
  {
    title: { ne: 'घर सफा र सजावट', en: 'Clean and decorate the home', hi: 'घर की सफाई और सजावट' },
    text: { ne: 'दिउँसै घर राम्ररी सफा गर्नुहोस्। ढोकामा सयपत्रीको माला झुण्ड्याउनुहोस् र आँगन वा ढोकामा रङ्गोली बनाउनुहोस्। मूल ढोकादेखि पूजाकोठासम्म रातो माटो वा रङले लक्ष्मीका पाउ बनाउनुहोस् — लक्ष्मी भित्र आउनुभएको सङ्केत।',
      en: 'Clean the house well during the day. Hang marigold garlands at the door and make rangoli at the entrance. Draw Laxmi’s footprints in red clay or colour from the main door to the puja room — the sign of Laxmi coming in.',
      hi: 'दिन में ही घर अच्छे से साफ करें। द्वार पर गेंदे की माला लटकाएँ और द्वार पर रंगोली बनाएँ। मुख्य द्वार से पूजा कक्ष तक लाल मिट्टी या रंग से लक्ष्मी के चरण बनाएँ — लक्ष्मी के घर में आने का प्रतीक।' }
  },
  {
    title: { ne: 'पूजास्थल तयार', en: 'Set up the puja place', hi: 'पूजा स्थान तैयार करें' },
    text: { ne: 'चौकीमा रातो कपडा बिछ्याएर बीचमा लक्ष्मी र उहाँको बायाँपट्टि गणेश राख्नुहोस्। अगाडि पानी भरेको कलश राख्नुहोस्। एउटा थालमा पैसा, सुन-चाँदीका सिक्का वा गहना राख्नुहोस्; व्यापार गर्नेले हिसाबको किताब पनि राख्छन्।',
      en: 'Spread a red cloth on the stand; place Laxmi in the middle and Ganesh on her left. Put the water-filled kalash in front. Place cash, gold or silver coins or jewellery on a plate; business families also place their account books.',
      hi: 'चौकी पर लाल कपड़ा बिछाकर बीच में लक्ष्मी और उनकी बाईं ओर गणेश रखें। सामने जल से भरा कलश रखें। एक थाली में रुपये, सोने-चाँदी के सिक्के या गहने रखें; व्यापारी बही-खाता भी रखते हैं।' }
  },
  dailyStep('Achaman (sipping water)'),
  dailyStep('Purification'),
  dailyStep('Light the lamp'),
  {
    title: { ne: 'पहिले गणेश पूजा', en: 'Worship Ganesh first', hi: 'पहले गणेश पूजा' },
    text: { ne: 'कुनै पनि पूजा गणेशबाट सुरु हुन्छ। गणेशलाई अक्षता, फूल र दुबो चढाउँदै तलका श्लोक भन्नुहोस्।',
      en: 'Every puja begins with Ganesh. Offer rice, flowers and durva grass to Ganesh while saying the lines below.',
      hi: 'हर पूजा गणेश से आरंभ होती है। गणेश को अक्षत, फूल और दूर्वा चढ़ाते हुए नीचे के श्लोक बोलें।' },
    mantra: 'वक्रतुण्ड महाकाय सूर्यकोटिसमप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥\nॐ गं गणपतये नमः॥',
    meaning: dailyStep('Remember Ganesh').meaning
  },
  {
    title: { ne: 'सङ्कल्प', en: 'Sankalpa (intention)', hi: 'संकल्प' },
    text: { ne: 'दाहिने हातमा पानी, अक्षता, फूल र सिक्का लिएर मनमनै भन्नुहोस्: "आज कार्तिक कृष्ण औंसीका दिन घर-परिवारको सुख, शान्ति र समृद्धिका लागि म महालक्ष्मीको पूजा गर्छु।" त्यसपछि पानी भुइँमा छोड्नुहोस्।',
      en: 'Hold water, rice, a flower and a coin in the right hand and say in your heart: "Today, on Kartik Krishna Aunsi, I worship Mahalakshmi for the happiness, peace and prosperity of my home and family." Then let the water fall.',
      hi: 'दाहिने हाथ में जल, अक्षत, फूल और सिक्का लेकर मन में कहें: "आज कार्तिक अमावस्या के दिन घर-परिवार के सुख, शांति और समृद्धि हेतु मैं महालक्ष्मी की पूजा करता/करती हूँ।" फिर जल भूमि पर छोड़ें।' }
  },
  {
    title: { ne: 'लक्ष्मीको आवाहन र ध्यान', en: 'Inviting Laxmi', hi: 'लक्ष्मी का आवाहन और ध्यान' },
    text: { ne: 'हात जोडेर लक्ष्मीलाई घरमा आमन्त्रण गर्नुहोस् र तस्बिर/मूर्तिमा अक्षता चढाउँदै तलको श्लोक पढ्नुहोस्।',
      en: 'Join your hands and invite Laxmi into your home; offer rice to her picture or murti while reciting the verse below.',
      hi: 'हाथ जोड़कर लक्ष्मी को घर में आमंत्रित करें और चित्र/मूर्ति पर अक्षत चढ़ाते हुए नीचे का श्लोक पढ़ें।' },
    mantra: 'नमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते।\nशङ्खचक्रगदाहस्ते महालक्ष्मि नमोऽस्तु ते॥',
    meaning: { ne: 'हे महामाया, श्रीपीठमा बस्ने, देवताले पुज्ने, हातमा शङ्ख, चक्र र गदा लिने महालक्ष्मी, तपाईंलाई नमस्कार। (महालक्ष्म्यष्टकको पहिलो श्लोक)',
      en: 'Salutations to you, Mahamaya, seated on the throne of Shri, worshipped by the gods, holding conch, discus and mace — O Mahalakshmi, salutations to you. (First verse of the Mahalakshmi Ashtakam)',
      hi: 'हे महामाया, श्रीपीठ पर विराजमान, देवताओं द्वारा पूजित, हाथ में शंख, चक्र और गदा धारण करने वाली महालक्ष्मी, आपको नमस्कार। (महालक्ष्म्यष्टक का पहला श्लोक)' }
  },
  {
    title: { ne: 'पञ्चोपचार पूजा', en: 'Five offerings (panchopachar)', hi: 'पंचोपचार पूजा' },
    text: { ne: '"ॐ महालक्ष्म्यै नमः" भन्दै क्रमशः चन्दन/सिन्दूर, फूल र माला, धूप, दियो र नैवेद्य (सेलरोटी, फलफूल, मिठाई) चढाउनुहोस्। पैसा, सिक्का, गहना र हिसाबको किताबमा पनि अबिर, अक्षता र फूल चढाउनुहोस्।',
      en: 'Saying "Om Mahalakshmyai namah", offer in turn sandalwood/sindur, flowers and garland, incense, the lamp and food (sel roti, fruit, sweets). Also offer abir, rice and flowers to the money, coins, jewellery and account books.',
      hi: '"ॐ महालक्ष्म्यै नमः" बोलते हुए क्रम से चंदन/सिंदूर, फूल और माला, धूप, दीप और नैवेद्य (सेल रोटी, फल, मिठाई) चढ़ाएँ। रुपये, सिक्के, गहने और बही-खाते पर भी अबीर, अक्षत और फूल चढ़ाएँ।' },
    mantra: 'ॐ महालक्ष्म्यै नमः। गन्धं समर्पयामि। पुष्पं समर्पयामि।\nधूपम् आघ्रापयामि। दीपं दर्शयामि। नैवेद्यं निवेदयामि॥',
    meaning: { ne: 'महालक्ष्मीलाई नमस्कार; चन्दन, फूल, धूप, दियो र नैवेद्य अर्पण गर्छु।', en: 'Salutations to Mahalakshmi; I offer sandalwood, flowers, incense, the lamp and food.', hi: 'महालक्ष्मी को नमस्कार; चंदन, पुष्प, धूप, दीप और नैवेद्य अर्पित करता हूँ।' }
  },
  {
    title: { ne: 'लक्ष्मी गायत्री जप', en: 'Laxmi Gayatri japa', hi: 'लक्ष्मी गायत्री जप' },
    text: { ne: 'आसनमा बसेर ११ वा १०८ पटक जप गर्नुहोस्। गायत्री नगर्ने परिवारले "ॐ महालक्ष्म्यै नमः" मात्र जप्न सक्छन्।',
      en: 'Sit and repeat it 11 or 108 times. Families who do not recite Gayatri mantras may simply repeat "Om Mahalakshmyai namah".',
      hi: 'आसन पर बैठकर 11 या 108 बार जप करें। जो परिवार गायत्री मंत्र नहीं पढ़ते वे केवल "ॐ महालक्ष्म्यै नमः" जप सकते हैं।' },
    mantra: 'ॐ महालक्ष्म्यै च विद्महे विष्णुपत्न्यै च धीमहि।\nतन्नो लक्ष्मीः प्रचोदयात्॥',
    meaning: { ne: 'हामी महालक्ष्मीलाई जान्दछौं, विष्णुपत्नीको ध्यान गर्छौं; ती लक्ष्मीले हामीलाई प्रेरणा दिऊन्।', en: 'We know Mahalakshmi, we meditate on the consort of Vishnu; may that Lakshmi inspire us.', hi: 'हम महालक्ष्मी को जानते हैं, विष्णुपत्नी का ध्यान करते हैं; वे लक्ष्मी हमें प्रेरित करें।' }
  },
  {
    title: { ne: 'घरभरि दियो बाल्ने', en: 'Light lamps all through the home', hi: 'पूरे घर में दीये जलाएँ' },
    text: { ne: 'पूजाको दियोबाट अरू दियो बालेर ढोका, झ्याल, भान्सा, बाथरुम र आँगन — घरका सबै कुनामा राख्नुहोस्। धेरै परिवारले रातभर बत्ती बाल्छन् र लक्ष्मी पसून् भनी मूल ढोका खुला राख्छन्। (विदेशमा मैनबत्ती वा बिजुलीको बत्ती सुरक्षित हुन्छ — आगोबाट सावधान।)',
      en: 'From the puja lamp, light the other lamps and place them at the doors, windows, kitchen, bathroom and entrance — every corner of the home. Many families keep lights on all night and leave the main door open so Laxmi may enter. (Abroad, electric lights or candles in holders are safer — mind fire alarms and curtains.)',
      hi: 'पूजा के दीपक से अन्य दीये जलाकर द्वार, खिड़कियों, रसोई, स्नानघर और आँगन — घर के हर कोने में रखें। बहुत से परिवार रात भर रोशनी रखते हैं और लक्ष्मी के आगमन हेतु मुख्य द्वार खुला रखते हैं। (विदेश में बिजली की रोशनी या स्टैंड में मोमबत्ती सुरक्षित है — आग से सावधान।)' }
  },
  {
    title: { ne: 'आरती', en: 'Aarti', hi: 'आरती' },
    text: { ne: 'कपूर र घ्यूको दियोले "ॐ जय लक्ष्मी माता" गाउँदै आरती गर्नुहोस्। पूरा शब्द "आरती" ट्याबमा छन्।',
      en: 'Do aarti with a camphor or ghee lamp while singing "Om Jai Lakshmi Mata". The full words are in the Aarti tab.',
      hi: 'कपूर या घी के दीपक से "ॐ जय लक्ष्मी माता" गाते हुए आरती करें। पूरे शब्द "आरती" टैब में हैं।' },
    aarti: 'lakshmi'
  },
  dailyStep('Asking forgiveness'),
  {
    title: { ne: 'पूजापछि: भैलो र नियम', en: 'After the puja: Bhailo and customs', hi: 'पूजा के बाद: भैलो और नियम' },
    text: { ne: 'पूजापछि प्रसाद बाँड्नुहोस्। साँझ केटीहरू भैलो खेल्छन् — घरमा आउँदा सेलरोटी, फलफूल र दक्षिणा दिई बिदा गर्नुहोस्। धेरै घरमा यो रात कसैलाई पैसा वा सामान दिँदैनन् र घर बढार्दैनन्।',
      en: 'Share the prasad. In the evening girls go Bhailo singing — when they come, give them sel roti, fruit and dakshina. In many homes nothing is given away or lent that night and the house is not swept.',
      hi: 'प्रसाद बाँटें। शाम को लड़कियाँ भैलो गाने आती हैं — उन्हें सेल रोटी, फल और दक्षिणा देकर विदा करें। बहुत से घरों में इस रात किसी को पैसा या सामान नहीं दिया जाता और घर में झाड़ू नहीं लगाई जाती।' }
  }
];
