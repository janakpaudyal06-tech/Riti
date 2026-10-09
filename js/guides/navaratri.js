// Navaratri (Bada Dashain) puja: Ghatasthapana, the nine Durgas, and the main days.
// Dhyana shlokas for the nine forms are the ones commonly recited for each day;
// the list of nine names comes from the Devi Kavacham (Durga Saptashati).

const NAVA_MATERIALS = [
  { ne: 'माटो वा मसिनो बालुवा र जौ (वा मकै) — जमरा राख्न', en: 'Clean soil or fine sand, and barley (or maize) seeds for jamara', hi: 'जमरा के लिए मिट्टी या बारीक बालू और जौ (या मक्का)' },
  { ne: 'कलश (तामा वा माटोको), पानी भरेको', en: 'A kalash (copper or clay pot) filled with water', hi: 'कलश (तांबे या मिट्टी का), जल से भरा' },
  { ne: 'आँपको पात (५ वटा) र नरिवल वा पूर्णपात्र', en: 'Five mango leaves and a coconut or a dish of rice to cover the kalash', hi: 'आम के पाँच पत्ते और नारियल या चावल भरा पात्र' },
  { ne: 'रातो कपडा, रातो धागो, सिन्दूर, अबिर', en: 'Red cloth, red thread, sindur, abir', hi: 'लाल कपड़ा, लाल धागा, सिंदूर, अबीर' },
  { ne: 'अक्षता, सुपारी, सिक्का (दक्षिणा)', en: 'Akshata (rice), betel nut, a coin (dakshina)', hi: 'अक्षत, सुपारी, सिक्का (दक्षिणा)' },
  { ne: 'दियो (नौ दिन बल्ने अखण्ड दियो भए राम्रो), धूप', en: 'A lamp (ideally one kept burning all nine days), incense', hi: 'दीपक (नौ दिन जलने वाला अखंड दीप हो तो अच्छा), धूप' },
  { ne: 'रातो फूल, बेलपत्र, फलफूल, नैवेद्य', en: 'Red flowers, bel leaves, fruit, naivedya', hi: 'लाल फूल, बेलपत्र, फल, नैवेद्य' },
  { ne: 'दुर्गा वा देवीको तस्बिर/मूर्ति', en: 'A picture or murti of Durga', hi: 'दुर्गा माँ का चित्र या मूर्ति' },
  { ne: 'दुर्गा सप्तशती (चण्डी) पुस्तक, भए', en: 'Durga Saptashati (Chandi) book, if you read it', hi: 'दुर्गा सप्तशती पुस्तक, यदि पाठ करते हों' },
  { ne: 'दशमीका लागि: दही, अक्षता र अबिर मिसाएको रातो टीका', en: 'For Dashami: red tika of rice mixed with curd and abir', hi: 'दशमी के लिए: दही, अक्षत और अबीर मिलाकर लाल टीका' }
];

const NAVA_STEPS = [
  {
    title: { ne: 'घटस्थापनाको तयारी', en: 'Preparing for Ghatasthapana', hi: 'घटस्थापना की तैयारी' },
    text: { ne: 'आश्विन शुक्ल प्रतिपदा (घटस्थापना) को साइतमा पूजा गरिन्छ। नेपालमा साइत पात्रोमा छापिन्छ; विदेशमा हुनुहुन्छ भने आफ्नो ठाउँको बिहानको समयमा गर्नुहोस्। घरको पूजाकोठा वा अँध्यारो, सफा कोठा छान्नुहोस् — जमरा उज्यालोमा हरियो हुन्छ, अँध्यारोमा पहेँलो-सुनौलो हुन्छ।',
      en: 'The puja is done at the auspicious time (sait) on Ashwin Shukla Pratipada. Nepal’s patro prints this time; abroad, do it in the morning at your own place. Choose the puja room or a clean, dark room — jamara grown in the dark comes up golden-yellow, not green.',
      hi: 'आश्विन शुक्ल प्रतिपदा (घटस्थापना) के शुभ मुहूर्त में पूजा की जाती है। नेपाल के पात्रो में मुहूर्त छपता है; विदेश में हों तो अपने स्थान पर सुबह करें। पूजा कक्ष या अँधेरा, साफ कमरा चुनें — अँधेरे में उगा जमरा हरा नहीं, सुनहरा-पीला होता है।' }
  },
  {
    title: { ne: 'शुद्धि र सङ्कल्प', en: 'Purification and sankalpa', hi: 'शुद्धि और संकल्प' },
    text: { ne: 'नुहाएर सफा लुगा लगाउनुहोस्। आचमन र पवित्रीकरण गर्नुहोस् (दैनिक पूजा हेर्नुहोस्)। हातमा पानी, अक्षता र फूल लिएर सङ्कल्प गर्नुहोस्: "आजदेखि नवरात्रभर परिवारको कल्याणका लागि दुर्गाको पूजा गर्छु।"',
      en: 'Bathe and wear clean clothes. Do achaman and purification (see Daily Puja). Hold water, rice and a flower and make the sankalpa: "From today, through Navaratri, I worship Durga for the wellbeing of my family."',
      hi: 'स्नान करके स्वच्छ वस्त्र पहनें। आचमन और पवित्रीकरण करें (दैनिक पूजा देखें)। हाथ में जल, अक्षत और फूल लेकर संकल्प करें: "आज से नवरात्रि भर परिवार के कल्याण हेतु दुर्गा पूजा करता/करती हूँ।"' },
    mantra: 'सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके।\nशरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते॥',
    meaning: { ne: 'सबै मङ्गलकी पनि मङ्गल, कल्याणकारी, सबै इच्छा पूरा गर्ने, शरण दिने, तीन नेत्र भएकी गौरी नारायणी, तपाईंलाई नमस्कार।',
      en: 'O auspicious one, source of all good, fulfiller of every aim, refuge of all, three-eyed Gauri, Narayani — salutations to you.',
      hi: 'सब मंगलों की मंगल, कल्याणकारी, सब कामनाएँ पूर्ण करने वाली, शरणदात्री, त्रिनेत्री गौरी नारायणी, आपको नमस्कार।' }
  },
  {
    title: { ne: 'जमरा राख्ने', en: 'Sowing the jamara', hi: 'जमरा बोना' },
    text: { ne: 'माटो वा बालुवा भाँडामा वा भुइँमा फिँजाएर जौ (वा मकै) छर्नुहोस्। माथिबाट हल्का माटो छर्केर पानी छर्कनुहोस्। नौ दिनसम्म हरेक बिहान थोरै पानी छर्कनुहोस्।',
      en: 'Spread the soil or sand in a tray or on the floor and scatter barley (or maize) over it. Cover lightly with more soil and sprinkle water. Sprinkle a little water every morning for nine days.',
      hi: 'मिट्टी या बालू को पात्र में या भूमि पर फैलाकर जौ (या मक्का) बोएँ। ऊपर से हल्की मिट्टी डालकर जल छिड़कें। नौ दिन तक हर सुबह थोड़ा जल छिड़कें।' }
  },
  {
    title: { ne: 'कलश स्थापना', en: 'Setting up the kalash', hi: 'कलश स्थापना' },
    text: { ne: 'कलशमा पानी, अक्षता, सुपारी र सिक्का हाल्नुहोस्। मुखमा आँपका पात राखेर माथि नरिवल वा चामल भरेको पात्र राख्नुहोस्। कलशमा सिन्दूरले स्वस्तिक बनाएर रातो धागो बाँध्नुहोस् र जमराको बीचमा राख्नुहोस्। कलशमा सबै देवता बस्छन् भनी सम्झनुहोस्।',
      en: 'Put water, rice, a betel nut and a coin in the kalash. Place mango leaves at its mouth and set the coconut or rice dish on top. Draw a swastika on it with sindur, tie red thread around the neck, and set it in the middle of the jamara. Remember that all the gods reside in the kalash.',
      hi: 'कलश में जल, अक्षत, सुपारी और सिक्का डालें। मुख पर आम के पत्ते रखकर ऊपर नारियल या चावल भरा पात्र रखें। कलश पर सिंदूर से स्वस्तिक बनाकर लाल धागा बाँधें और जमरा के बीच रखें। स्मरण करें कि कलश में सब देवता निवास करते हैं।' },
    mantra: 'कलशस्य मुखे विष्णुः कण्ठे रुद्रः समाश्रितः।\nमूले तत्र स्थितो ब्रह्मा मध्ये मातृगणाः स्मृताः॥',
    meaning: { ne: 'कलशको मुखमा विष्णु, कण्ठमा रुद्र, फेदमा ब्रह्मा र बीचमा मातृकाहरू बस्छन्।',
      en: 'Vishnu dwells at the mouth of the kalash, Rudra at its neck, Brahma at its base, and the Mother goddesses in its middle.',
      hi: 'कलश के मुख में विष्णु, कंठ में रुद्र, मूल में ब्रह्मा और मध्य में मातृगण निवास करते हैं।' }
  },
  {
    title: { ne: 'दुर्गाको आवाहन र पूजा', en: 'Inviting and worshipping Durga', hi: 'दुर्गा का आवाहन और पूजन' },
    text: { ne: 'कलश र देवीको तस्बिरमा अक्षता चढाउँदै दुर्गालाई आमन्त्रण गर्नुहोस्। चन्दन/सिन्दूर, रातो फूल, धूप, दियो र नैवेद्य चढाउनुहोस्। अखण्ड दियो बाल्नुहुन्छ भने नौ दिनसम्म निभ्न नदिनुहोस्।',
      en: 'Offering rice to the kalash and Durga’s picture, invite the Goddess. Offer sindur, red flowers, incense, the lamp and food. If you keep an unbroken lamp (akhanda diyo), don’t let it go out for nine days.',
      hi: 'कलश और देवी के चित्र पर अक्षत चढ़ाते हुए दुर्गा का आवाहन करें। सिंदूर, लाल फूल, धूप, दीप और नैवेद्य चढ़ाएँ। अखंड दीप जलाते हों तो नौ दिन बुझने न दें।' },
    mantra: 'या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता।\nनमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥',
    meaning: { ne: 'जुन देवी सबै प्राणीमा शक्तिका रूपमा बस्नुहुन्छ, उहाँलाई बारम्बार नमस्कार।',
      en: 'To the Goddess who dwells in all beings as power — salutations, salutations, salutations again and again.',
      hi: 'जो देवी सब प्राणियों में शक्ति रूप में स्थित हैं, उन्हें बारंबार नमस्कार।' }
  },
  {
    title: { ne: 'नौ दिनको दैनिक पूजा', en: 'Daily puja for nine days', hi: 'नौ दिन की दैनिक पूजा' },
    text: { ne: 'हरेक बिहान-बेलुका दियो बालेर पूजा गर्नुहोस् र जमरामा पानी छर्कनुहोस्। त्यस दिनकी नवदुर्गाको ध्यान मन्त्र पढ्नुहोस् ("नवदुर्गा" खण्ड हेर्नुहोस्)। सकिन्छ भने दुर्गा सप्तशती (चण्डी) पाठ गर्नुहोस् वा सुन्नुहोस्। धेरै परिवारले यी दिन मासु, मदिरा, प्याज-लसुन त्याग्छन्।',
      en: 'Each morning and evening, light the lamp, do puja and sprinkle water on the jamara. Read the dhyana mantra of that day’s form of Durga (see the "Nine Durgas" tab). If you can, read or listen to the Durga Saptashati (Chandi). Many families avoid meat, alcohol, onion and garlic during these days.',
      hi: 'हर सुबह-शाम दीप जलाकर पूजा करें और जमरा पर जल छिड़कें। उस दिन की नवदुर्गा का ध्यान मंत्र पढ़ें ("नवदुर्गा" टैब देखें)। हो सके तो दुर्गा सप्तशती का पाठ करें या सुनें। बहुत से परिवार इन दिनों मांस, मदिरा, प्याज-लहसुन त्यागते हैं।' }
  },
  {
    title: { ne: 'सप्तमी: फूलपाती', en: 'Saptami: Phulpati', hi: 'सप्तमी: फूलपाती' },
    text: { ne: 'फूलपातीका दिन केरा, दारिम, धान, बेल, अशोक, हलेदो, मानपात, कर्चुर र जयन्ती गरी नौ थरीका पात-फूल (नवपत्रिका) ल्याएर पूजाकोठामा भित्र्याइन्छ र पूजा गरिन्छ। काठमाडौंमा गोरखाबाट ल्याइएको फूलपाती हनुमानढोकामा भित्र्याइन्छ।',
      en: 'On Phulpati, nine kinds of plants (navapatrika) — banana, pomegranate, rice, bel, ashoka, turmeric, mana (arum), karchur and jayanti — are brought into the puja room and worshipped. In Kathmandu, the Phulpati from Gorkha is carried into Hanuman Dhoka.',
      hi: 'फूलपाती के दिन केला, अनार, धान, बेल, अशोक, हल्दी, मानकंद, कचूर और जयंती — नौ प्रकार के पत्ते-फूल (नवपत्रिका) पूजा कक्ष में लाकर पूजे जाते हैं। काठमांडू में गोरखा से लाई गई फूलपाती हनुमानढोका में प्रवेश कराई जाती है।' }
  },
  {
    title: { ne: 'अष्टमी र नवमी', en: 'Ashtami and Navami', hi: 'अष्टमी और नवमी' },
    text: { ne: 'महाअष्टमीमा महाकाली/कालरात्रिको विशेष पूजा हुन्छ; धेरै घरमा कन्या पूजा गरिन्छ (साना केटीलाई देवीका रूपमा पुजेर खुवाउने)। बलि दिने चलन भएका परिवारले पनि अचेल कुभिन्डो, नरिवल वा काँक्रोलाई बलिको सट्टा चढाउँछन्। महानवमीमा विश्वकर्माको पूजा गरी घरका औजार, सवारी र किताबको पूजा गरिन्छ।',
      en: 'Maha Ashtami is the special day of Mahakali/Kalaratri; many homes do kanya puja (worshipping and feeding young girls as the Goddess). Families with a tradition of animal offering often now offer an ash gourd (kubhindo), coconut or cucumber instead. On Maha Navami, Vishwakarma is worshipped along with household tools, vehicles and books.',
      hi: 'महाअष्टमी पर महाकाली/कालरात्रि की विशेष पूजा होती है; बहुत घरों में कन्या पूजन होता है (छोटी कन्याओं को देवी रूप में पूजकर भोजन कराना)। बलि की परंपरा वाले परिवार भी आजकल कुम्हड़ा, नारियल या खीरा बलि के स्थान पर चढ़ाते हैं। महानवमी पर विश्वकर्मा पूजा के साथ घर के औज़ार, वाहन और पुस्तकें पूजी जाती हैं।' }
  },
  {
    title: { ne: 'दशमी: टीका र जमरा', en: 'Dashami: tika and jamara', hi: 'दशमी: टीका और जमरा' },
    text: { ne: 'विजया दशमीको साइतमा देवीलाई टीका र जमरा चढाएर विसर्जन गर्नुहोस्। त्यसपछि घरका ठूला-बडाले सानालाई निधारमा रातो टीका लगाइदिई कानमा जमरा सिउरिदिँदै आशीर्वाद दिन्छन्। तल दुई प्रचलित आशीर्वाद श्लोक छन्।',
      en: 'At the Vijaya Dashami sait, offer tika and jamara to the Goddess and bid her farewell. Then elders place red tika on the foreheads of the young, tuck jamara behind their ears and give blessings. Two commonly recited blessing verses are below.',
      hi: 'विजयादशमी के मुहूर्त में देवी को टीका और जमरा चढ़ाकर विसर्जन करें। फिर घर के बड़े छोटों के माथे पर लाल टीका लगाकर कान में जमरा खोंसते हुए आशीर्वाद देते हैं। नीचे दो प्रचलित आशीर्वाद श्लोक हैं।' },
    mantra: 'ॐ जयन्ती मङ्गला काली भद्रकाली कपालिनी।\nदुर्गा क्षमा शिवा धात्री स्वाहा स्वधा नमोऽस्तु ते॥\n\nआयुर्द्रोणसुते श्रियं दशरथे शत्रुक्षयं राघवे\nऐश्वर्यं नहुषे गतिश्च पवने मानं च दुर्योधने।\nदानं सूर्यसुते बलं हलधरे सत्यं च कुन्तीसुते\nविज्ञानं विदुरे भवन्तु भवतां कीर्तिश्च नारायणे॥',
    meaning: { ne: 'पहिलो श्लोक: जयन्ती, मङ्गला, काली, भद्रकाली, कपालिनी, दुर्गा, क्षमा, शिवा, धात्री, स्वाहा, स्वधा — यी नामकी देवीलाई नमस्कार। दोस्रो श्लोक: अश्वत्थामाको जस्तो आयु, दशरथको जस्तो श्री, रामको जस्तो शत्रुविजय, नहुषको जस्तो ऐश्वर्य, पवनको जस्तो गति, दुर्योधनको जस्तो मान, कर्णको जस्तो दान, बलरामको जस्तो बल, युधिष्ठिरको जस्तो सत्य, विदुरको जस्तो ज्ञान र नारायणको जस्तो कीर्ति तिमीलाई प्राप्त होस्।',
      en: 'First verse: salutations to the Goddess of these names — Jayanti, Mangala, Kali, Bhadrakali, Kapalini, Durga, Kshama, Shiva, Dhatri, Svaha, Svadha. Second verse: may you have long life like Ashwatthama, prosperity like Dasharatha, victory over foes like Rama, splendour like Nahusha, speed like the Wind, honour like Duryodhana, generosity like Karna, strength like Balarama, truthfulness like Yudhishthira, wisdom like Vidura, and fame like Narayana.',
      hi: 'पहला श्लोक: जयंती, मंगला, काली, भद्रकाली, कपालिनी, दुर्गा, क्षमा, शिवा, धात्री, स्वाहा, स्वधा — इन नामों वाली देवी को नमस्कार। दूसरा श्लोक: तुम्हें अश्वत्थामा जैसी आयु, दशरथ जैसी श्री, राम जैसी शत्रु-विजय, नहुष जैसा ऐश्वर्य, पवन जैसी गति, दुर्योधन जैसा मान, कर्ण जैसा दान, बलराम जैसा बल, युधिष्ठिर जैसा सत्य, विदुर जैसा ज्ञान और नारायण जैसी कीर्ति प्राप्त हो।' }
  }
];

// The nine forms, one for each night (Devi Kavacham order).
const NAVADURGA = [
  { ne: 'शैलपुत्री', en: 'Shailaputri', hi: 'शैलपुत्री',
    about: { ne: 'हिमालयकी छोरी, पार्वतीको पहिलो रूप। साँढेमा चढेकी, हातमा त्रिशूल र कमल।', en: 'Daughter of the Himalaya, the first form of Parvati. She rides a bull and holds a trident and a lotus.', hi: 'हिमालय की पुत्री, पार्वती का पहला रूप। वृषभ पर सवार, हाथ में त्रिशूल और कमल।' },
    mantra: 'वन्दे वाञ्छितलाभाय चन्द्रार्धकृतशेखराम्।\nवृषारूढां शूलधरां शैलपुत्रीं यशस्विनीम्॥' },
  { ne: 'ब्रह्मचारिणी', en: 'Brahmacharini', hi: 'ब्रह्मचारिणी',
    about: { ne: 'शिवलाई पाउन कठोर तप गर्ने रूप। हातमा जपमाला र कमण्डलु।', en: 'The form who performed hard austerities to win Shiva. She holds a rosary and a water pot.', hi: 'शिव को पाने के लिए कठोर तप करने वाला रूप। हाथ में जपमाला और कमंडलु।' },
    mantra: 'दधाना करपद्माभ्यामक्षमालाकमण्डलू।\nदेवी प्रसीदतु मयि ब्रह्मचारिण्यनुत्तमा॥' },
  { ne: 'चन्द्रघण्टा', en: 'Chandraghanta', hi: 'चंद्रघंटा',
    about: { ne: 'निधारमा घण्टाको आकारको अर्धचन्द्र भएकी, सिंहमा चढेकी, युद्धका लागि तयार रूप।', en: 'She wears a bell-shaped half-moon on her forehead, rides a lion and stands ready for battle.', hi: 'माथे पर घंटे के आकार का अर्धचंद्र, सिंह पर सवार, युद्ध के लिए तत्पर रूप।' },
    mantra: 'पिण्डजप्रवरारूढा चण्डकोपास्त्रकैर्युता।\nप्रसादं तनुते मह्यं चन्द्रघण्टेति विश्रुता॥' },
  { ne: 'कूष्माण्डा', en: 'Kushmanda', hi: 'कूष्मांडा',
    about: { ne: 'आफ्नो मुस्कानले ब्रह्माण्ड सृष्टि गर्ने भनिएकी, सूर्यमण्डलमा बस्ने रूप।', en: 'Said to have created the universe with her smile; she dwells in the sphere of the sun.', hi: 'अपनी मुस्कान से ब्रह्मांड की रचना करने वाली, सूर्यमंडल में निवास करने वाली।' },
    mantra: 'सुरासम्पूर्णकलशं रुधिराप्लुतमेव च।\nदधाना हस्तपद्माभ्यां कूष्माण्डा शुभदास्तु मे॥' },
  { ne: 'स्कन्दमाता', en: 'Skandamata', hi: 'स्कंदमाता',
    about: { ne: 'कार्तिकेय (स्कन्द) की आमा, काखमा बालक स्कन्द लिएर सिंहमा बसेकी।', en: 'Mother of Kartikeya (Skanda), seated on a lion with the child Skanda in her lap.', hi: 'कार्तिकेय (स्कंद) की माता, गोद में बालक स्कंद लिए सिंह पर विराजमान।' },
    mantra: 'सिंहासनगता नित्यं पद्माश्रितकरद्वया।\nशुभदास्तु सदा देवी स्कन्दमाता यशस्विनी॥' },
  { ne: 'कात्यायनी', en: 'Katyayani', hi: 'कात्यायनी',
    about: { ne: 'ऋषि कात्यायनकी छोरीका रूपमा जन्मिएकी, महिषासुर मार्ने योद्धा रूप।', en: 'Born as the daughter of the sage Katyayana; the warrior form who slew Mahishasura.', hi: 'ऋषि कात्यायन की पुत्री रूप में प्रकट, महिषासुर का वध करने वाला योद्धा रूप।' },
    mantra: 'चन्द्रहासोज्ज्वलकरा शार्दूलवरवाहना।\nकात्यायनी शुभं दद्याद्देवी दानवघातिनी॥' },
  { ne: 'कालरात्रि', en: 'Kalaratri', hi: 'कालरात्रि',
    about: { ne: 'अन्धकार र भय नाश गर्ने उग्र रूप; हेर्दा डरलाग्दी तर भक्तलाई सधैं शुभ दिने।', en: 'The fierce form who destroys darkness and fear — terrible to look at, yet always auspicious to devotees.', hi: 'अंधकार और भय का नाश करने वाला उग्र रूप; देखने में भयंकर पर भक्तों को सदा शुभ फल देने वाली।' },
    mantra: 'एकवेणी जपाकर्णपूरा नग्ना खरास्थिता।\nलम्बोष्ठी कर्णिकाकर्णी तैलाभ्यक्तशरीरिणी॥\nवामपादोल्लसल्लोहलताकण्टकभूषणा।\nवर्धनमूर्धध्वजा कृष्णा कालरात्रिर्भयङ्करी॥' },
  { ne: 'महागौरी', en: 'Mahagauri', hi: 'महागौरी',
    about: { ne: 'तपपछि गोरो, उज्यालो र शान्त भएको रूप; सेतो वस्त्र लगाएर सेतो साँढेमा चढेकी।', en: 'The radiant, peaceful form after her penance, dressed in white and riding a white bull.', hi: 'तप के बाद गौर, उज्ज्वल और शांत रूप; श्वेत वस्त्र धारण कर श्वेत वृषभ पर सवार।' },
    mantra: 'श्वेते वृषे समारूढा श्वेताम्बरधरा शुचिः।\nमहागौरी शुभं दद्यान्महादेवप्रमोददा॥' },
  { ne: 'सिद्धिदात्री', en: 'Siddhidatri', hi: 'सिद्धिदात्री',
    about: { ne: 'सबै सिद्धि दिने, कमलमा बस्ने रूप; देवता, ऋषि र सिद्धहरूले पुज्छन्।', en: 'Giver of all accomplishments, seated on a lotus; worshipped by gods, sages and siddhas.', hi: 'सब सिद्धियाँ देने वाली, कमल पर विराजमान; देवता, ऋषि और सिद्ध उनकी आराधना करते हैं।' },
    mantra: 'सिद्धगन्धर्वयक्षाद्यैरसुरैरमरैरपि।\nसेव्यमाना सदा भूयात् सिद्धिदा सिद्धिदायिनी॥' }
];

const NAVADURGA_LIST_SHLOKA = 'प्रथमं शैलपुत्री च द्वितीयं ब्रह्मचारिणी।\nतृतीयं चन्द्रघण्टेति कूष्माण्डेति चतुर्थकम्॥\nपञ्चमं स्कन्दमातेति षष्ठं कात्यायनीति च।\nसप्तमं कालरात्रीति महागौरीति चाष्टमम्॥\nनवमं सिद्धिदात्री च नवदुर्गाः प्रकीर्तिताः।';
