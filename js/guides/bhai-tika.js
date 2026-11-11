// Bhai Tika (Tihar, Kartik Shukla Dwitiya / Yama Dwitiya): sisters worship and bless
// their brothers for long life. Steps follow common Nepali household practice.
// There is no single Sanskrit mantra in common use; the blessing is the folk saying
// about Yamuna and Yama, given here as it is usually spoken.

const BHAI_MATERIALS = [
  { ne: 'सप्तरङ्गी टीका (सात रङको टीका)', en: 'Saptarangi tika — seven colours of tika', hi: 'सप्तरंगी टीका (सात रंगों का टीका)' },
  { ne: 'मखमली फूलको माला', en: 'Makhamali (globe amaranth) garlands', hi: 'मखमली फूल की माला' },
  { ne: 'दुबो, र दुबो राखेको पानी', en: 'Durva grass (dubo), and water with durva in it', hi: 'दूर्वा, और दूर्वा डाला हुआ जल' },
  { ne: 'ओखर (दाइभाइ जति वटा)', en: 'Walnuts — one for each brother', hi: 'अखरोट — हर भाई के लिए एक' },
  { ne: 'तामाको सानो लोटामा तोरीको तेल', en: 'Mustard oil in a small copper pot', hi: 'तांबे के छोटे लोटे में सरसों का तेल' },
  { ne: 'कलश, दियो, धूप, फूल, अक्षता', en: 'Kalash, lamp, incense, flowers, rice', hi: 'कलश, दीपक, धूप, फूल, अक्षत' },
  { ne: 'सगुन: सेलरोटी, फलफूल, मिठाई, सुकमेल-ल्वाङ, सुकेको फलफूल', en: 'Sagun: sel roti, fruit, sweets, cardamom and cloves, dried fruit', hi: 'सगुन: सेल रोटी, फल, मिठाई, इलायची-लौंग, सूखे मेवे' },
  { ne: 'दाइभाइलाई ढाका टोपी वा उपहार; दिदीबहिनीलाई दक्षिणा वा उपहार', en: 'A dhaka topi or gift for the brother; dakshina or a gift for the sister', hi: 'भाई के लिए ढाका टोपी या उपहार; बहन के लिए दक्षिणा या उपहार' }
];

const BHAI_BLESSING = {
  ne: 'यमुनाले यमराजलाई टीका लगाइन्, म मेरो दाइभाइलाई टीका लगाउँछु। यमराज अमर भएजस्तै मेरो दाइभाइ पनि अमर रहून्। जबसम्म यमुनाको पानी बगिरहन्छ र मखमलीको फूल ओइलाउँदैन, तबसम्म मेरो दाइभाइ सुखी र दीर्घायु रहून्।',
  en: 'Yamuna put tika on Yamaraj; I put tika on my brother. As Yamaraj is immortal, may my brother be so too. As long as the Yamuna flows and the makhamali flower does not wilt, may my brother live long and happily.',
  hi: 'यमुना ने यमराज को टीका लगाया, मैं अपने भाई को टीका लगाती हूँ। जैसे यमराज अमर हैं वैसे ही मेरा भाई भी अमर रहे। जब तक यमुना का जल बहता रहे और मखमली का फूल न मुरझाए, तब तक मेरा भाई सुखी और दीर्घायु रहे।'
};

const BHAI_STEPS = [
  {
    title: { ne: 'तयारी', en: 'Getting ready', hi: 'तैयारी' },
    text: { ne: 'दिदीबहिनीले बिहान नुहाएर सगुन, सप्तरङ्गी टीका र मखमलीको माला तयार पार्छन्। धेरैजसो दिदीबहिनी टीका नलगाउन्जेल केही खाँदैनन्। दाइभाइ पनि नुहाएर सफा लुगा लगाई तयार हुन्छन्।',
      en: 'Sisters bathe in the morning and prepare the sagun, the seven-colour tika and the makhamali garlands. Many sisters do not eat until the tika is done. Brothers also bathe and dress in clean clothes.',
      hi: 'बहनें सुबह स्नान करके सगुन, सप्तरंगी टीका और मखमली की माला तैयार करती हैं। बहुत सी बहनें टीका होने तक कुछ नहीं खातीं। भाई भी स्नान करके स्वच्छ वस्त्र पहनते हैं।' }
  },
  {
    title: { ne: 'पूजा: गणेश र यमराज', en: 'Puja: Ganesh and Yamaraj', hi: 'पूजा: गणेश और यमराज' },
    text: { ne: 'दियो र धूप बालेर पहिले गणेशलाई सम्झनुहोस्, त्यसपछि यमराज, यमुना र चित्रगुप्तलाई फूल र अक्षता चढाई दाइभाइको लामो आयु माग्नुहोस्।',
      en: 'Light the lamp and incense and first remember Ganesh; then offer flowers and rice to Yamaraj, Yamuna and Chitragupta, praying for your brother’s long life.',
      hi: 'दीपक और धूप जलाकर पहले गणेश जी का स्मरण करें; फिर यमराज, यमुना और चित्रगुप्त को फूल और अक्षत चढ़ाकर भाई की लंबी आयु की प्रार्थना करें।' },
    mantra: 'वक्रतुण्ड महाकाय सूर्यकोटिसमप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥'
  },
  {
    title: { ne: 'दाइभाइलाई आसनमा राख्ने', en: 'Seating the brother', hi: 'भाई को आसन पर बिठाना' },
    text: { ne: 'दाइभाइलाई सफा आसन वा पिर्कामा बसाउनुहोस्। उमेरअनुसार जेठोदेखि क्रमैले टीका लगाइन्छ।',
      en: 'Seat the brother on a clean mat or low stool. With several brothers, tika is given from the eldest down.',
      hi: 'भाई को स्वच्छ आसन या पीढ़े पर बिठाएँ। कई भाई हों तो बड़े से छोटे के क्रम में टीका लगाया जाता है।' }
  },
  {
    title: { ne: 'तेलको धारो र दुबोको पानी', en: 'Circle of oil and durva water', hi: 'तेल की धार और दूर्वा का जल' },
    text: { ne: 'तामाको लोटाबाट तोरीको तेल थोपा-थोपा खसाउँदै दाइभाइको वरिपरि तीन फन्को घुम्नुहोस्, र दुबोले पानी छर्कंदै पनि घेरा बनाउनुहोस्। यो घेराले यमराजबाट दाइभाइको रक्षा गर्छ भन्ने विश्वास छ।',
      en: 'Walk around the brother three times, letting mustard oil drip from the copper pot to make a circle, and sprinkle water with durva around him too. The circle is believed to protect him from Yamaraj.',
      hi: 'तांबे के लोटे से सरसों का तेल बूँद-बूँद गिराते हुए भाई के चारों ओर तीन परिक्रमा करें, और दूर्वा से जल छिड़कते हुए भी घेरा बनाएँ। मान्यता है कि यह घेरा भाई की यमराज से रक्षा करता है।' }
  },
  {
    title: { ne: 'ओखर फोर्ने', en: 'Breaking the walnut', hi: 'अखरोट तोड़ना' },
    text: { ne: 'मूल ढोकाको सँघारमा ओखर राखेर फोर्नुहोस् — दाइभाइमाथि आउने विघ्न र अनिष्ट फुटेर जाओस् भन्ने भावनाले। फुटेको ओखर पछि सगुनसँग खान दिइन्छ।',
      en: 'Place a walnut at the threshold of the main door and crack it — so that any obstacle or harm coming to the brother is broken. The cracked walnut is later eaten with the sagun.',
      hi: 'मुख्य द्वार की देहरी पर अखरोट रखकर तोड़ें — इस भावना से कि भाई पर आने वाले विघ्न और अनिष्ट टूट जाएँ। टूटा अखरोट बाद में सगुन के साथ खाने को दिया जाता है।' }
  },
  {
    title: { ne: 'तेल, टीका र माला', en: 'Oil, tika and garland', hi: 'तेल, टीका और माला' },
    text: { ne: 'दाइभाइको शिरमा अलिकति तेल लगाइदिनुहोस्। निधारमा तलदेखि माथि सप्तरङ्गी टीका लगाउनुहोस्, घाँटीमा मखमलीको माला र शिरमा दुबो राख्नुहोस्। टीका लगाउँदा तलको प्रचलित भनाइ भनिन्छ।',
      en: 'Put a little oil on the brother’s head. Apply the seven-colour tika on his forehead from bottom to top, put the makhamali garland around his neck and durva on his head. The saying below is spoken while giving tika.',
      hi: 'भाई के सिर पर थोड़ा तेल लगाएँ। माथे पर नीचे से ऊपर सप्तरंगी टीका लगाएँ, गले में मखमली की माला और सिर पर दूर्वा रखें। टीका लगाते समय नीचे की प्रचलित बात कही जाती है।' },
    blessing: true
  },
  {
    title: { ne: 'सगुन र मिठाई', en: 'Sagun and sweets', hi: 'सगुन और मिठाई' },
    text: { ne: 'दाइभाइलाई सेलरोटी, फलफूल, मिठाई, सुकमेल-ल्वाङ र ओखर राखेको सगुन दिनुहोस्।',
      en: 'Give the brother the sagun plate — sel roti, fruit, sweets, cardamom and cloves, and the walnut.',
      hi: 'भाई को सेल रोटी, फल, मिठाई, इलायची-लौंग और अखरोट वाला सगुन दें।' }
  },
  {
    title: { ne: 'दाइभाइले दिदीबहिनीलाई टीका', en: 'The brother gives tika to the sister', hi: 'भाई बहन को टीका लगाता है' },
    text: { ne: 'त्यसपछि दाइभाइले पनि दिदीबहिनीलाई सप्तरङ्गी टीका र माला लगाइदिन्छन्, ढोग गर्छन् वा आशीर्वाद लिन्छन्, र दक्षिणा वा उपहार दिन्छन्।',
      en: 'Then the brother gives the sister seven-colour tika and a garland, bows to her or receives her blessing, and gives dakshina or a gift.',
      hi: 'फिर भाई भी बहन को सप्तरंगी टीका और माला लगाता है, प्रणाम करता है या आशीर्वाद लेता है, और दक्षिणा या उपहार देता है।' }
  },
  {
    title: { ne: 'दिदीबहिनी वा दाइभाइ नहुनेका लागि', en: 'If you have no sister or brother', hi: 'जिनकी बहन या भाई न हो' },
    text: { ne: 'काका-मामाका छोराछोरी वा नजिकका आफन्तसँग टीका लगाउन सकिन्छ। काठमाडौंमा रानीपोखरीको बालगोपालेश्वर मन्दिर भाइटीकाको दिन मात्र खुल्छ, जहाँ दिदीबहिनी वा दाइभाइ नहुनेहरू टीका लगाउन जान्छन्। विदेशमा भिडियो कलमा टीका गर्न वा पहिल्यै हुलाकबाट टीका, माला र सगुन पठाउन सकिन्छ।',
      en: 'Tika can be exchanged with cousins or close relatives. In Kathmandu, the Balgopaleshwar temple at Rani Pokhari opens only on Bhai Tika day, and people without a brother or sister go there for tika. Abroad, families do tika over a video call, or post the tika, garland and sagun ahead of time.',
      hi: 'चचेरे-ममेरे भाई-बहनों या निकट संबंधियों से टीका लगवा सकते हैं। काठमांडू में रानीपोखरी का बालगोपालेश्वर मंदिर केवल भाई टीका के दिन खुलता है, जहाँ जिनके भाई या बहन नहीं होते वे टीका लगवाने जाते हैं। विदेश में वीडियो कॉल पर टीका किया जाता है, या पहले से डाक से टीका, माला और सगुन भेजा जाता है।' }
  }
];
