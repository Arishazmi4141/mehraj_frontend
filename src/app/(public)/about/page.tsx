"use client";

import { useState } from "react";

/**
 * /about — MehRāj
 * Palette: Wine (#3D1214) as primary accent, Taupe/Brass (#756961) as secondary accent.
 * Layout/design unchanged — only content replaced. Story-style flow, no numbered points.
 */

type Block =
  | { t: "p"; text: string }
  | { t: "quote"; text: string; accent?: boolean }
  | { t: "lines"; items: string[] }
  | { t: "verse"; text: string; note: string };

const STORY: Block[][] = [
  [
    { t: "p", text: "No matter how large a line becomes, it begins with a single point. The Ganga, too, begins at its source as a small stream." },
    { t: "p", text: "MehRāj began with a simple idea." },
    { t: "quote", text: "“What if Indian heritage were not merely remembered but worn?”" },
    { t: "p", text: "Some things reveal their true scale only when seen from a distance. When MehRāj founders Palash Soni and Tayyab Khan travelled to the United Kingdom to pursue their Master’s degrees, being away from home gave them the opportunity to look at India and its way of dressing from a different perspective. Distance offered them a fresh way of seeing the fashion, traditions and clothing they had grown up with." },
    { t: "p", text: "And they began to realise something important. Clothes are not merely meant to cover the body. They shape the way we present ourselves, express our personality and become a part of how the world sees us." },
    { t: "p", text: "Indian men wanted to dress well to look refined, confident and well put together. They wanted their clothes to express their individuality and sense of identity. They did not simply want to follow fashion; they wanted to understand it. But where does one begin? Every body and every personality is different." },
    {
      t: "lines",
      items: [
        "What would suit them?",
        "Which colours would bring out their best?",
        "What should they wear for a particular occasion?",
        "How can traditional clothing be worn in a contemporary way?",
        "Which garments and traditions belong to which part of India?",
        "How can Indian clothing evolve without losing its cultural soul?",
      ],
    },
    { t: "p", text: "And the questions did not end with Indian clothing. There was an equally strong need to understand Western clothing the Oxford shirt, trousers, suit and tie and to develop a sense of ease, refinement and personal style around them." },
    { t: "p", text: "Gradually, it became clear that the question was not about one garment or one category of clothing. It was about the entire wardrobe of the modern Indian man. And that is where the idea of MehRāj began to take shape." },
  ],
  [
    { t: "quote", text: "“THE CENTRAL IDEA HERITAGE MUST BE LIVED”" },
    { t: "p", text: "Heritage remains alive only when it becomes a part of life. It is not an inanimate object kept behind glass in a museum, nor merely a memory preserved in history books. It is meant to be embraced. To be lived with. To be worn. To be experienced." },
    { t: "p", text: "For MehRāj, preserving tradition does not mean reproducing the past exactly as it was. It means understanding its essence and finding ways to make it meaningful in the present. A traditional garment can be worn in a new way. Centuries old craftsmanship can find a place in contemporary clothing. An Indian silhouette can be refined for the modern man without losing what makes it Indian." },
    { t: "p", text: "MehRāj seeks to carry forward Indian craftsmanship, traditional clothing, textile traditions, embroidery, tailoring techniques and our distinctive sense of aesthetics to the generations ahead allowing them to evolve with time while retaining their cultural soul." },
  ],
  [
    { t: "quote", text: "“TRADITION AND EVOLUTION”" },
    { t: "p", text: "Keeping tradition alive does not mean freezing it in time. Time changes. Life changes. Needs change. Naturally, the way we dress changes too. But evolution does not have to mean abandoning identity. MehRāj does not seek to imitate the past. It seeks to carry forward the spirit that has kept Indian clothing alive for centuries." },
    { t: "p", text: "Tradition is not stagnant water. It is a river. And the true way to preserve a river is to let it flow." },
    { t: "p", text: "Tradition is not about going back. It is about moving forward without losing where you came from." },
  ],
  [
    { t: "quote", text: "“SLOW FASHION CLOTHING THAT CAN BECOME A STORY”" },
    { t: "p", text: "In a world that changes rapidly, fashion changes just as quickly. Sometimes it feels as though we have barely put on a new outfit and tied our shoelaces before the trend has already moved on. But clothes are not newspapers. They should not become yesterday’s news by evening. They should be more like stories ones that do not become old with time, but become more personal." },
    { t: "p", text: "Buy less. Choose thoughtfully. Wear longer." },
    { t: "p", text: "A garment should not be just another thing hanging in a wardrobe. Over time, it should gather your memories, experiences and sense of self. That is when a garment stops being merely clothing. It becomes yours." },
  ],
  [
    { t: "quote", text: "“RESPONSIBILITY TOWARDS NATURE”" },
    {
      
      t: "verse",
      text: "तेन त्यक्तेन भुञ्जीथाः",
      note: "This ancient Sanskrit principle from the Isha Upanishad speaks of consuming with a sense of restraint, responsibility and detachment taking from the world with an awareness that it does not belong to us alone.",
    },
    { t: "p", text: "The Indian philosophical tradition has long viewed nature not merely as something to be consumed, but as part of the larger fabric of life. Centuries later, Mahatma Gandhi expressed a similar thought in a modern context:" },
    { t: "p", text: "“The Earth provides enough for every person’s need, but not for every person’s greed.”" },
    { t: "p", text: "Sustainability is therefore not a suddenly discovered modern idea for us. It may have acquired new language, technologies and contexts today, but the consciousness of restraint and responsible consumption has existed in Indian thought for a very long time." },
    { t: "p", text: "MehRāj seeks to bring that consciousness into the way we work. Avoiding unnecessary production. Choosing responsible and more sustainable materials wherever feasible. Reducing our dependence on plastic and unnecessary synthetic materials. Creating garments that are made to last. And bringing the same thoughtfulness to packaging." },
    { t: "p", text: "Where possible, we seek alternatives to plastic such as paper boxes and fabric bags. We also see an opportunity to give leftover fabric from ethnic wear another life by turning it into useful bags, so that less of the material goes to waste." },
    { t: "p", text: "We would rather make honest claims than make grand environmental promises. Because for MehRāj, sustainability is not a marketing strategy. It is a way of working." },
  ],
  [
    { t: "quote", text: "“WHY WE CHOOSE LIMITED PRODUCTION”" },
    { t: "p", text: "Behind a garment there is more than a machine. There are years of practice. Experienced hands. Patience. Skill. And countless thoughtful decisions made over the smallest details." },
    { t: "p", text: "MehRāj respects the craftsmanship of people who have spent years refining their skills whether in fine tailoring, hand embroidery, traditional weaving or any of the many disciplines through which Indian clothing is created. Behind these crafts lies more than technique. There is knowledge passed down through generations. A living heritage. Some skills cannot be learned from books. They travel from hand to hand, from one generation to the next." },
    { t: "p", text: "Machines may assist the process, but the character of a garment comes from human experience, judgement and craftsmanship. We want you to feel something of those hands in what you wear the precision, sensitivity and care that make a garment more than something simply made to be worn." },
    { t: "p", text: "That is why we do not want to join the race towards indiscriminate mass production. Limited production also creates space for craftsmen to find meaningful work and opportunity, while allowing their skills and traditional knowledge to remain alive. We do not want a MehRāj garment to disappear into a crowd of anonymous products something bought today and forgotten tomorrow." },
  ],
  [
    { t: "quote", text: "“MEHRĀJ THE BEAUTY OF READY TO WEAR WITH A TAILORED FEEL”" },
    { t: "p", text: "Nature has an extraordinary way of creating. It uses every mould only once. So how can the people it creates possibly be expected to fit into one standard shape? One person is taller. Another has broader shoulders. Someone else has a different waist, posture or proportion. Every body has its own structure and its own beauty." },
    { t: "p", text: "That is why sometimes we may love a garment, its fabric or its colour, and yet feel that something is missing when we wear it. MehRāj respects every form of craftsmanship including nature’s. We believe every individual is unique, a one of a kind creation. So the garment should respect the person, rather than forcing the person to fit an arbitrary garment." },
    { t: "p", text: "The convenience of ready to wear has its place. But we want our garments to offer something more:" },
    { t: "p", text: "Ready to wear convenience, with the feeling that it was made for you." },
    { t: "p", text: "The classic design remains intact, while the fit comes as close as possible to the individual’s body, proportions and needs. Where feasible, personal preferences whether a small design detail, a colour choice or another minor change can also be considered. Not every request can always be accommodated, but listening to the customer and understanding what matters to them is important." },
    { t: "p", text: "This is where personal styling, occasion dressing, colour understanding, wardrobe guidance and thoughtful alterations become part of the experience. Because for MehRāj, it is not enough for a garment to look good. It should feel good on the person wearing it." },
    { t: "p", text: "That is the beauty we seek: The convenience of ready to wear, with the individuality of tailoring." },
  ],
  [
    { t: "quote", text: "“CLOTHING IS MORE THAN CLOTHING IT IS IDENTITY”" },
    { t: "p", text: "What we wear says something about us." },
    {
      t: "lines",
      items: ["Our taste.", "Our personality.", "Our culture.", "Our confidence.", "Our sense of refinement."],
    },
    { t: "p", text: "What we wear says something about us and sometimes, even our way of looking at life. For MehRāj, clothing is therefore more than a fashion statement. It is a part of identity. We want people not merely to follow a trend, but to understand why they have chosen something." },
    { t: "p", text: "Clothes should not overpower the person wearing them. They should bring the person into view." },
    { t: "p", text: "The best outfit is not the one that gets noticed the most. It is the one in which you are seen the most." },
  ],
  [
    { t: "quote", text: "“A WORLD IN YOUR WARDROBE”" },
    { t: "p", text: "We want your wardrobe to contain a world created for you. A world where India and Europe can exist side by side. Where the kurta and traditional Indian garments can sit comfortably alongside the Oxford shirt, trousers, suit and tie." },
    { t: "p", text: "The question is not whether a garment is Indian or Western. What matters is the understanding and ease with which you wear it. A modern Indian man can remain deeply connected to his heritage while feeling completely at home in contemporary Western clothing. MehRāj believes these worlds do not have to compete. They can belong in the same wardrobe." },
    { t: "p", text: "Because your wardrobe may contain the world, but the most important thing in it should always be you." },
  ],
  [
    { t: "quote", text: "“WHAT MAKES A GENTLEMAN?”" },
    { t: "p", text: "Is a gentleman someone who owns expensive, luxurious and imported clothes? MehRāj sees it differently. To us, a gentleman is someone whose clothing and character are not too far apart. His clothes reflect something of his personality, and his personality carries something of the dignity of what he wears." },
    { t: "p", text: "He understands how to present himself to the world. He knows who he is, understands his roots and knows what matters to him. He treats others with respect and grace. A gentleman’s confidence does not come from display. He does not need an expensive label or unnecessary glamour to prove his worth. He understands that expensive and good are not always the same thing, and he recognises true luxury in quality, craftsmanship, detail and thought. He knows why he chose what he wears." },
    { t: "p", text: "Because for MehRāj, a gentleman is not simply a man who dresses well. He carries a sense of refinement in his choices, his conduct and his character." },
  ],
  [
    { t: "quote", text: "“DOES LUXURY HAVE TO BE IMPORTED?”" },
    { t: "p", text: "Does something have to be foreign and expensive to be considered luxury? There is an old Indian saying:" },
    { t: "quote", text: "“Ghar ka jogi jogda, aan gaon ka sant.”", accent: true },
    { t: "p", text: "Literally, it speaks of the tendency to overlook the worthy person at home while holding an outsider in higher regard. Perhaps it captures something familiar about the way we sometimes value the best of what comes from elsewhere more than what comes from our own soil." },
    { t: "p", text: "Think of biryani. Rich with aroma, flavour, refinement and history, can it really be considered any less luxurious than the celebrated dishes of the world? Does a pizza or a burger automatically become more sophisticated simply because it comes from somewhere else? And yet, at times, the appeal of foreign fast food can become far greater in our minds than its actual qualities deserve." },
    { t: "p", text: "The same can happen with clothing. The softness, beauty, fine craftsmanship and elegance of Indian ethnic wear offer a sense of comfort, character and refinement that can stand confidently beside any luxury. And then imagine the same garment carrying a foreign label and a much higher price. Does that not turn the old wisdom on its head?" },
    { t: "p", text: "And this is not only about Indian ethnic wear. A beautifully made Oxford shirt, pair of trousers or suit can be every bit as luxurious when made in India with the same attention to quality, craftsmanship, fit and detail." },
    { t: "p", text: "Luxury is not defined by where something comes from or how much it costs. It is defined by quality, craftsmanship, detail, beauty, distinction and experience." },
    { t: "p", text: "India does not need to look elsewhere to learn what luxury is. We already have the traditions, skills and craftsmanship to create it. What we need is to look at them again with contemporary understanding and renewed confidence. That is the perspective MehRāj stands for." },
  ],
  [
    { t: "quote", text: "“BEYOND CLOTHING BECOMING PART OF A HERITAGE”" },
    { t: "p", text: "For MehRāj, a garment’s journey does not end when it is sold. A well made garment travels from the hands of a craftsman to someone’s wardrobe. And from there, it becomes part of a life a memory from a meeting, a special occasion, a journey, or simply an everyday moment." },
    { t: "p", text: "That is why MehRāj does not want to be merely a place that sells clothes. We want to build a community of people who value Indian craftsmanship, thoughtful dressing, refinement and their cultural identity." },
    { t: "p", text: "When you choose a MehRāj garment, you are choosing more than an object. You are valuing the skill of the person who made it. You are placing your trust in Indian talent and Indian manufacturing. And you are becoming part of keeping a living tradition relevant for the generations ahead." },
    { t: "p", text: "In that sense, the customer is not simply a customer. He becomes part of the MehRāj journey. A journey that begins with the hands of an Indian craftsman, reaches the wardrobe of the modern Indian man and continues from there." },
  ],
  [
    { t: "quote", text: "“IN THE END WHAT IS MEHRĀJ?”" },
    { t: "p", text: "For MehRāj, clothing is never just clothing. It is a conversation between tradition and modernity. A relationship between the craftsman and the wearer. A bridge between the past and the future. And above all, a way of allowing an individual to express who he is." },
    { t: "p", text: "We want to preserve tradition but not by keeping it behind glass. We want to honour craftsmanship but not by leaving it trapped in the past. We want to dress well but not merely to be seen. We want to be responsible towards nature but not simply by talking about it. And we want to support Indian talent and Indian manufacturing with the confidence that something does not need a foreign stamp to be truly exceptional." },
    {
      t: "lines",
      items: ["Create thoughtfully.", "Choose consciously.", "Wear meaningfully.", "And keep heritage alive in your own time."],
    },
    { t: "quote", text: "That is the MehRāj way." },
  ],
];

const STORY_HI: Block[][] = [
  [
    { t: "p", text: "रेखा कितनी भी बड़ी हो, उसकी शुरुआत एक छोटे-से बिंदु से होती है। गंगा भी अपने उद्गम पर एक छोटी-सी जलधारा के रूप में निकलती है। MehRāj का जन्म भी एक छोटे-से विचार से हुआ।" },
    { t: "quote", text: "“क्या हो, अगर भारतीय विरासत को सिर्फ़ याद न किया जाए बल्कि पहना जाए?”" },
    { t: "p", text: "कुछ चीज़ें दूर से देखने पर ही अपने बड़े अर्थ में दिखाई देती हैं।" },
    { t: "p", text: "MehRāj के संस्थापक पलाश सोनी और तैयब ख़ान जब अपनी मास्टर डिग्री की पढ़ाई के लिए यूनाइटेड किंगडम गए, तो वहाँ उन्हें अपने देश और उसके पहनावे को थोड़ी दूरी से देखने का अवसर मिला। इस दूरी ने उन्हें भारतीय फैशन, परंपराओं और पहनावे को एक नए नज़रिए से समझने का मौका दिया।" },
    { t: "p", text: "उन्होंने महसूस किया कि कपड़े सिर्फ़ शरीर ढकने का साधन नहीं हैं। वे हमारे व्यक्तित्व को गढ़ते हैं, हमारी पहचान को व्यक्त करते हैं और दुनिया के सामने हमारे होने का एक अंदाज़ बनाते हैं।" },
    { t: "p", text: "भारतीय युवा भी अच्छे कपड़े पहनना चाहते थे सलीकेदार, आत्मविश्वासी और प्रभावशाली दिखना चाहते थे। वे सिर्फ़ फैशन का अनुसरण नहीं करना चाहते थे, बल्कि उसे समझना चाहते थे। लेकिन सवाल था शुरुआत कहाँ से हो? हर शरीर और व्यक्तित्व अलग है।" },
    {
      t: "lines",
      items: [
        "कौन-से कपड़े किस पर अच्छे लगेंगे?",
        "कौन-से रंग बेहतर होंगे?",
        "किस अवसर पर क्या पहनना चाहिए?",
        "पारंपरिक कपड़ों को आज के समय के अनुरूप कैसे पहना जाए?",
        "भारत के अलग-अलग हिस्सों की पोशाकों और परंपराओं को कैसे समझा जाए?",
        "भारतीय पहनावे को आधुनिक बनाते हुए उसकी सांस्कृतिक आत्मा को कैसे बचाए रखा जाए?",
      ],
    },
    { t: "p", text: "सवाल सिर्फ़ भारतीय कपड़ों तक सीमित नहीं थे। पश्चिमी पहनावे ऑक्सफोर्ड शर्ट, ट्राउज़र, सूट और टाई को भी समझने और उन्हें सलीके से पहनने की उतनी ही जरूरत थी।" },
    { t: "p", text: "धीरे-धीरे यह स्पष्ट हुआ कि सवाल किसी एक पोशाक का नहीं, बल्कि आधुनिक भारतीय पुरुष की पूरी अलमारी का है। यहीं से MehRāj के विचार ने आकार लेना शुरू किया।" },
  ],
  [
    { t: "quote", text: "“मेहराज का बुनियादी विचार”" },
    { t: "p", text: "विरासत तभी जीवित रहती है, जब वह जीवन का हिस्सा बने। विरासत संग्रहालय में रखी कोई निर्जीव वस्तु नहीं है और न ही इतिहास की किताबों में बची हुई कोई स्मृति। वह अपनाने की चीज़ है। उसे जीवन में बरता जाना चाहिए, पहना जाना चाहिए और महसूस किया जाना चाहिए।" },
    { t: "p", text: "परंपरा भी कुछ ऐसी ही है। उसके रूप बदल सकते हैं, लेकिन उसकी आत्मा जीवित रह सकती है। इसीलिए MehRāj का मानना है कि परंपरा को बचाने का अर्थ अतीत को हूबहू दोहराना नहीं, बल्कि उसकी आत्मा को समझकर उसे नए समय में जीने योग्य बनाना है।" },
    { t: "p", text: "एक पारंपरिक पोशाक को नए ढंग से पहना जा सकता है। सदियों पुरानी कारीगरी को आधुनिक पहनावे में जगह दी जा सकती है। भारतीय सिल्हूट को आज के पुरुष के लिए अधिक सधा हुआ और सुरुचिपूर्ण बनाया जा सकता है।" },
    { t: "p", text: "MehRāj का उद्देश्य भारतीय कारीगरी, पारंपरिक पहनावे, शिल्प-कौशल, बुनाई, कढ़ाई, सिलाई की तकनीकों और भारतीय सौंदर्यबोध को आने वाली पीढ़ियों तक पहुँचाना है बदलते समय के साथ, लेकिन उसकी सांस्कृतिक आत्मा को साथ लेकर। क्योंकि परंपरा ठहरा हुआ पानी नहीं है। वह बहता हुआ पानी है। उसे आगे ले जाना ही उसका असली संरक्षण है।" },
  ],
  [
    { t: "quote", text: "“परंपरा और बदलाव”" },
    { t: "p", text: "परंपरा को जीवित रखने का अर्थ यह नहीं कि उसे उसी रूप में हमेशा के लिए रोक दिया जाए। समय बदलता है। जीवन बदलता है। जरूरतें बदलती हैं। इसलिए पहनावा भी बदलता है। लेकिन बदलाव का अर्थ अपनी पहचान छोड़ देना नहीं है।" },
    { t: "p", text: "सदियों पुरानी कारीगरी को नए रूप में प्रस्तुत किया जा सकता है। भारतीय परंपराओं से प्रेरित सिल्हूट को आधुनिक बनाया जा सकता है। पारंपरिक तकनीकों को समकालीन परिधानों में जगह दी जा सकती है।" },
    { t: "p", text: "MehRāj अतीत की नकल नहीं करना चाहता। वह अतीत की उस आत्मा को आगे ले जाना चाहता है, जिसने भारतीय पहनावे को सदियों तक जीवित रखा।" },
    { t: "p", text: "परंपरा का अर्थ पीछे लौटना नहीं, अपनी जड़ों के साथ आगे बढ़ना है।" },
  ],
  [
    { t: "quote", text: "“स्लो फैशन कपड़ा जो कहानी बन सके”" },
    { t: "p", text: "तेज़ी से बदलती दुनिया में फैशन भी उतनी ही तेजी से बदल जाता है। कभी-कभी तो हम कपड़े पहनकर अभी अपने जूतों के तस्मे बाँध ही रहे होते हैं कि पता चलता है फैशन बदल चुका है। लेकिन कपड़े कोई अख़बार तो हैं नहीं कि सुबह की ख़बर शाम को रद्दी हो जाए। उन्हें कहानी की तरह होना चाहिए जो समय के साथ पुरानी नहीं, बल्कि और अपनी होती जाए।" },
    { t: "p", text: "MehRāj का विचार सरल है कम खरीदें, सोच-समझकर खरीदें और लंबे समय तक पहनें।" },
    { t: "p", text: "कपड़ा सिर्फ़ अलमारी में रखी एक और चीज़ नहीं होना चाहिए। समय के साथ उसमें आपकी अपनी स्मृतियाँ, अनुभव और पहचान जुड़नी चाहिए। तभी कोई परिधान सिर्फ़ कपड़ा नहीं रहता। वह आपका हो जाता है।" },
  ],
  [
    { t: "quote", text: "“प्रकृति के प्रति जिम्मेदारी”" },
    {
      t: "verse",
      text: "तेन त्यक्तेन भुञ्जीथाः",
      note: "त्याग और संयम की भावना के साथ उपभोग करो। ईशावास्य उपनिषद का यह सूत्र भारतीय चिंतन में संयमित उपभोग की उस भावना को व्यक्त करता है, जिसमें प्रकृति को केवल उपभोग की वस्तु नहीं, बल्कि जीवन के व्यापक ताने-बाने का हिस्सा माना गया है।",
    },
    { t: "p", text: "बाद में महात्मा गांधी ने इसी भाव को आधुनिक संदर्भ में रखते हुए कहा " },
    { t: "p", text: "“धरती हर व्यक्ति की ज़रूरत के लिए पर्याप्त देती है, लेकिन हर व्यक्ति के लालच के लिए नहीं।”" },
    { t: "p", text: "Sustainability हमारे लिए कोई अचानक खोजा गया आधुनिक विचार नहीं है। आज उसे नई भाषा और नए संदर्भ मिले हैं, लेकिन आवश्यकता से अधिक न लेने और संयमित उपभोग की चेतना हमारे चिंतन में बहुत पहले से मौजूद रही है।" },
    { t: "p", text: "MehRāj इसी विचार को अपने काम में उतारना चाहता है। अनावश्यक उत्पादन से बचना, जहाँ संभव हो जिम्मेदार और टिकाऊ सामग्रियों को प्राथमिकता देना, प्लास्टिक और अनावश्यक सिंथेटिक सामग्री से बचने की कोशिश करना, टिकाऊ परिधान बनाना और पैकेजिंग में भी विवेक रखना ये हमारे लिए केवल दावे नहीं, बल्कि काम करने के तरीके हैं।" },
    { t: "p", text: "इसी सोच के तहत पैकेजिंग में भी प्लास्टिक से बचने और पेपर बॉक्स तथा कपड़ों के बैग जैसे विकल्पों को अपनाने की कोशिश की जाती है। जहाँ संभव हो, एथनिक वेयर के बचे हुए कपड़े का भी उपयोग किया जा सकता है, ताकि कपड़े का कोई हिस्सा अनावश्यक रूप से व्यर्थ न जाए।" },
    { t: "p", text: "हम बड़े-बड़े पर्यावरणीय दावे करने के बजाय वही कहना चाहते हैं, जिसे ईमानदारी से निभा सकें। क्योंकि MehRāj के लिए sustainability कोई marketing strategy नहीं, काम करने का तरीका है।" },
  ],
  [
    { t: "quote", text: "“हम सीमित उत्पादन क्यों करते हैं?”" },
    { t: "p", text: "क्योंकि किसी परिधान के पीछे केवल मशीन नहीं होती, बल्कि वर्षों की साधना, अनुभवी हाथों का हुनर, अटूट धैर्य और हर बारीकी पर लिया गया एक विचारशील निर्णय होता है।" },
    { t: "p", text: "MehRāj उन कारीगरों के हुनर को सम्मान देता है, जिन्होंने वर्षों की मेहनत से अपनी कला को सँवारा है चाहे वह महीन टेलरिंग हो, हाथ की कढ़ाई, पारंपरिक बुनाई हो या भारतीय पहनावे को गढ़ने की कोई अन्य विद्या। इन शिल्पों के पीछे सिर्फ़ तकनीक नहीं, पीढ़ियों से चला आ रहा ज्ञान और एक जीवित विरासत है। कुछ हुनर किताबों से नहीं सीखे जाते। वे हाथ से हाथ और पीढ़ी से पीढ़ी तक पहुँचते हैं।" },
    { t: "p", text: "मशीनें काम में हमारी सहायता कर सकती हैं, लेकिन किसी परिधान की आत्मीयता उसके पीछे लगे मानवीय हाथों, अनुभव और निर्णय से आती है। हम चाहते हैं कि जब आप MehRāj का परिधान पहनें, तो उसमें उस कारीगर के हुनर की छाप भी महसूस हो जिसने उसे बनाया है।" },
    { t: "p", text: "इसीलिए हम अंधाधुंध mass production की दौड़ में शामिल नहीं होना चाहते। सीमित उत्पादन का एक उद्देश्य यह भी है कि कारीगरों को काम और अवसर मिलें, उनकी कला को सम्मान मिले और पारंपरिक कौशल जीवित रहें। हम नहीं चाहते कि MehRāj का परिधान बाज़ार की अनाम वस्तुओं की भीड़ में खो जाए जिसे आज खरीदा जाए और कल भुला दिया जाए।" },
  ],
  [
    { t: "quote", text: "“MehRāj रेडीमेड और टेलर्ड का सुंदर कॉम्बिनेशन”" },
    { t: "p", text: "कुदरत की कारीगरी बड़ी अनूठी है। वह हर साँचे को सिर्फ़ एक बार इस्तेमाल करती है। फिर उसके बनाए इंसान एक नाप के कैसे हो सकते हैं? किसी की लंबाई अलग है, किसी के कंधे, किसी की कमर। हर शरीर की अपनी बनावट है, अपनी खूबसूरती है। इसलिए कई बार कपड़ा पसंद आने के बावजूद पहनने पर वह वैसा नहीं लगता, जैसा हम चाहते हैं।" },
    { t: "p", text: "MehRāj हर कारीगरी का सम्मान करता है कुदरत की भी। MehRāj मानता है कि हर इंसान अनूठा है, कुदरत की एक नायाब कृति है। इसलिए कपड़े को पहनने वाले के अनुरूप होना चाहिए, न कि पहनने वाले को किसी तयशुदा साँचे में फिट होना चाहिए।" },
    { t: "p", text: "रेडीमेड कपड़ों की सुविधा अपनी जगह है, लेकिन कपड़े रेडीमेड हों और अहसास यह हो कि वे आपके लिए ही बने हैं।" },
    { t: "p", text: "क्लासिक डिज़ाइन अपनी जगह रहे, लेकिन पहनने वाला उसमें खुद को महसूस करे। फिटिंग को व्यक्ति की देह और जरूरत के जितना संभव हो, उतना करीब लाने की कोशिश हो। जहाँ संभव हो, रंग, बटन या किसी छोटे बदलाव जैसी व्यक्तिगत पसंद को भी समझने और शामिल करने की कोशिश की जाए। हर बदलाव संभव हो, यह जरूरी नहीं; लेकिन ग्राहक की जरूरत को सुनना और उसकी पसंद को महत्व देना जरूरी है।" },
    { t: "p", text: "इसी में fashion consultation, occasion dressing, colour understanding, wardrobe guidance और जरूरत के अनुसार alteration जैसी व्यक्तिगत सेवाओं की भूमिका आती है। क्योंकि MehRāj के लिए कपड़ा सिर्फ़ अच्छा दिखना काफी नहीं। उसे पहनने वाले पर अच्छा लगना भी उतना ही जरूरी है।" },
    { t: "p", text: "यानी रेडीमेड की सुविधा और टेलर्ड की व्यक्तिगतता का सुंदर मेल।" },
  ],
  [
    { t: "quote", text: "“कपड़े सिर्फ़ कपड़े नहीं, पहचान भी हैं”" },
    { t: "p", text: "हम क्या पहनते हैं, उससे हमारे बारे में बहुत कुछ पता चलता है।" },
    {
      t: "lines",
      items: ["हमारी पसंद।", "हमारा व्यक्तित्व।", "हमारी संस्कृति।", "हमारा आत्मविश्वास।", "हमारा सलीका।"],
    },
    { t: "p", text: "और कई बार हमारे जीवन के प्रति हमारा दृष्टिकोण भी। इसलिए MehRāj के लिए कपड़े केवल fashion statement नहीं हैं। वे व्यक्ति की पहचान का हिस्सा हैं। हम चाहते हैं कि पहनने वाला केवल किसी trend को follow न करे, बल्कि यह भी जाने कि उसने कुछ क्यों चुना है।" },
    { t: "p", text: "कपड़े व्यक्ति पर हावी न हों। वे उसके व्यक्तित्व को सामने लाएँ।" },
    { t: "p", text: "आख़िरकार, सबसे अच्छा पहनावा वह नहीं जो सबसे अधिक दिखाई दे, बल्कि वह है जिसमें आप सबसे अधिक दिखाई दें।" },
  ],
  [
    { t: "quote", text: "“अलमारी में दुनिया”" },
    { t: "p", text: "हम चाहते हैं कि आपकी अलमारी में एक ऐसी दुनिया हो, जो सिर्फ़ आपके लिए रची गई हो। एक ऐसी दुनिया जिसमें भारत भी हो और यूरोप भी। जिसमें कुर्ता और पारंपरिक परिधान हों, तो Oxford shirt, trousers, suit और tie भी हों।" },
    { t: "p", text: "मसला यह नहीं कि परिधान भारतीय है या पश्चिमी। अहम बात यह है कि आप उसे किस समझ और सलीके से पहनते हैं। एक आधुनिक भारतीय पुरुष अपनी परंपरा से जुड़ा हुआ होते हुए भी दुनिया के किसी भी आधुनिक पहनावे को सहजता से अपना सकता है।" },
    { t: "p", text: "MehRāj इसी सहजता की बात करता है जहाँ भारतीयता और आधुनिकता एक-दूसरे के विरोध में नहीं, बल्कि एक ही wardrobe में साथ दिखाई दें। क्योंकि आपकी अलमारी में दुनिया चाहे जितनी हो, उसमें सबसे महत्वपूर्ण आप होने चाहिए।" },
  ],
  [
    { t: "quote", text: "“जेंटलमैन कौन?”" },
    { t: "p", text: "जेंटलमैन किसे कहते हैं? क्या वह, जिसके पास महँगे, लग्ज़री और विदेशी कपड़े हों? MehRāj कुछ अलग विचार रखता है। उसके लिए जेंटलमैन वह है जिसकी पोशाक और चरित्र में बहुत ज़्यादा अंतर न हो। उसके पहनावे में उसके व्यक्तित्व की झलक दिखाई दे और उसके व्यक्तित्व में उसके पहनावे की गरिमा।" },
    { t: "p", text: "उसे अपने होने का बोध है, अपनी जड़ों की समझ है और यह भी पता है कि उसके लिए क्या महत्वपूर्ण है। वह दूसरों के साथ सम्मान और शालीनता से व्यवहार करना जानता है। जेंटलमैन का व्यक्तित्व दिखावे से नहीं, उसके आत्मविश्वास से झलकता है। उसे अपने होने को साबित करने के लिए महँगे ब्रांड या चमक-दमक का सहारा नहीं चाहिए।" },
    { t: "p", text: "उसे यह समझ है कि महँगी चीज़ और अच्छी चीज़ हमेशा एक ही बात नहीं होती। असली luxury उसकी गुणवत्ता, कारीगरी, बारीकी और उस चीज़ के पीछे की सोच में होती है। वह सिर्फ़ इसलिए कोई कपड़ा नहीं पहनता कि वह महँगा है या फैशन में है। वह जानता है कि उसने उसे क्यों चुना है।" },
    { t: "p", text: "क्योंकि MehRāj के लिए जेंटलमैन सिर्फ़ अच्छे कपड़े पहनने वाला आदमी नहीं है। वह अपने चुनाव, अपने व्यवहार और अपने व्यक्तित्व में भी सलीका रखता है।" },
  ],
  [
    { t: "quote", text: "“लग्ज़री के लिए विदेशी होना ज़रूरी है?”" },
    { t: "p", text: "क्या लग्ज़री होने के लिए किसी चीज़ का विदेशी और महँगा होना ज़रूरी है?" },
    { t: "quote", text: "“घर का जोगी जोगड़ा, आन गाँव का संत।”", accent: true },
    { t: "p", text: "शायद यह कहावत हमारी उस मानसिकता को सबसे ठीक तरह से बयान करती है, जिसमें हम अपने ही देश की श्रेष्ठ चीज़ों को उतनी कीमत नहीं देते, जितनी किसी विदेशी नाम के साथ आते ही देने लगते हैं।" },
    { t: "p", text: "ज़रा बिरयानी के बारे में सोचिए। खुशबुओं, स्वाद, तहज़ीब और नफ़ासत से भरा यह शाही व्यंजन दुनिया के किसी भी लग्ज़री व्यंजन से कम है क्या? क्या पिज़्ज़ा या बर्गर उसके सामने अपने आप किसी ऊँचे दर्जे के हो जाते हैं? फिर भी कई बार हमारी नज़र में विदेशी fast food का आकर्षण उसकी वास्तविक गुणवत्ता से कहीं आगे निकल जाता है।" },
    { t: "p", text: "यही बात पहनावे पर भी लागू होती है। भारतीय ethnic wear की मुलायमियत, खूबसूरती, महीन कारीगरी और नज़ाकत जिस आराम, आत्मीयता और गरिमा का अहसास देती है क्या वह किसी luxury से कम है? फिर सोचिए, यही परिधान जब किसी विदेशी brand के नाम और कीमत के साथ हमारे सामने आता है, तो क्या यह “उलटे बाँस बरेली को” वाली स्थिति नहीं हो जाती?" },
    { t: "p", text: "और बात सिर्फ़ भारतीय परिधानों की नहीं है। एक बेहतरीन Oxford shirt, trousers या suit भी उसी गुणवत्ता, कारीगरी, fit और समझ के साथ भारत में बनाया जाए, तो वह भी luxury हो सकता है।" },
    { t: "p", text: "क्योंकि luxury की पहचान उसके देश या कीमत से नहीं, उसकी गुणवत्ता, कारीगरी, बारीकी, सौंदर्य, विशिष्टता और अनुभव से होती है।" },
    { t: "p", text: "भारत को luxury सीखने के लिए बाहर देखने की जरूरत नहीं है। हमारे पास उसे बनाने की परंपरा पहले से है। जरूरत सिर्फ़ उसे नए समय की समझ और नए आत्मविश्वास के साथ फिर से देखने की है। MehRāj इसी नज़रिए की बात करता है।" },
  ],
  [
    { t: "quote", text: "“कपड़े से आगे एक विरासत का हिस्सा”" },
    { t: "p", text: "MehRāj के लिए किसी परिधान की यात्रा उसके बिक जाने के साथ खत्म नहीं होती। एक अच्छा परिधान किसी कारीगर के हाथ से निकलकर किसी व्यक्ति की अलमारी तक पहुँचता है। वहाँ से वह उसके जीवन का हिस्सा बनता है किसी मुलाकात की याद, किसी उत्सव का अवसर, किसी यात्रा का साथी या रोज़मर्रा की जिंदगी का एक हिस्सा।" },
    { t: "p", text: "इसीलिए MehRāj केवल कपड़े बेचने वाली जगह नहीं बनना चाहता। वह उन लोगों का एक समुदाय बनाना चाहता है, जो भारतीय कारीगरी, अच्छे पहनावे, सलीके और अपनी सांस्कृतिक पहचान को महत्व देते हैं।" },
    { t: "p", text: "जब आप MehRāj का कोई परिधान चुनते हैं, तो आप केवल एक वस्तु नहीं चुनते। आप उस कारीगर के हुनर को भी महत्व देते हैं, जिसने उसे बनाया है। आप भारतीय निर्माण और भारतीय प्रतिभा पर भरोसा करते हैं। और एक ऐसी परंपरा को आगे बढ़ाने में सहभागी बनते हैं, जो आने वाली पीढ़ियों तक पहुँचनी चाहिए।" },
    { t: "p", text: "MehRāj इसी अर्थ में अपने ग्राहक को केवल customer नहीं, बल्कि अपनी यात्रा का हिस्सा मानता है। यह यात्रा भारतीय कारीगर से शुरू होकर आधुनिक भारतीय पुरुष की अलमारी तक पहुँचती है और फिर वहीं से आगे बढ़ती है।" },
  ],
  [
    { t: "quote", text: "“अंत में MehRāj क्या है?”" },
    { t: "p", text: "MehRāj के लिए कपड़े केवल कपड़े नहीं हैं। वे परंपरा और आधुनिकता के बीच एक संवाद हैं। कारीगर और पहनने वाले के बीच एक रिश्ता हैं। अतीत और भविष्य के बीच एक पुल हैं। और सबसे बढ़कर व्यक्ति को उसकी अपनी पहचान के साथ प्रस्तुत करने का एक माध्यम हैं।" },
    { t: "p", text: "हम परंपरा को बचाना चाहते हैं, लेकिन उसे संग्रहालय में रखकर नहीं। हम कारीगरी का सम्मान करना चाहते हैं, लेकिन उसे सिर्फ़ अतीत की चीज़ बनाकर नहीं। हम अच्छा पहनना चाहते हैं, लेकिन सिर्फ़ दिखने के लिए नहीं। हम प्रकृति के प्रति जिम्मेदार रहना चाहते हैं, लेकिन केवल उसके बारे में बोलकर नहीं। हम भारतीय प्रतिभा और निर्माण को आगे बढ़ाना चाहते हैं और यह विश्वास रखना चाहते हैं कि अच्छी चीज़ बनाने के लिए दुनिया के किसी दूसरे कोने से मुहर लगवाना जरूरी नहीं।" },
    {
      t: "lines",
      items: ["सोच-समझकर बनाना।", "सोच-समझकर चुनना।", "अर्थपूर्ण ढंग से पहनना।", "और अपनी विरासत को अपने समय में जीवित रखना।"],
    },
    { t: "quote", text: "यही MehRāj की सोच है।" },
  ],
];

type Lang = "en" | "hi";

const UI = {
  en: {
    tagline: "An Idea, A Heritage, A Way of Being",
    founders: "The Founders",
    coFounder: "Co-Founder",
    tayyab: "Tayyab Khan",
    palash: "Palash Soni",
  },
  hi: {
    tagline: "एक विचार, एक विरासत, एक अंदाज़",
    founders: "संस्थापक",
    coFounder: "सह-संस्थापक",
    tayyab: "तैयब ख़ान",
    palash: "पलाश सोनी",
  },
} as const;

function LanguageToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const options: { id: Lang; label: string }[] = [
    { id: "en", label: "English" },
    { id: "hi", label: "हिन्दी" },
  ];
  return (
    <div
      role="group"
      aria-label="Language / भाषा"
      className="mx-auto mt-8 inline-flex items-center rounded-full border p-1"
      style={{ borderColor: "var(--color-border-strong)", background: "var(--color-surface)" }}
    >
      {options.map((o) => {
        const active = lang === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => setLang(o.id)}
            aria-pressed={active}
            className="cursor-pointer rounded-full px-5 py-1.5 font-body text-[12px] font-semibold tracking-[0.08em] transition-all duration-300"
            style={{
              background: active ? "#3D1214" : "transparent",
              color: active ? "#FFFFFF" : "#756961",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

const FOUNDERS = [
  { name: "Tayyab Khan", designation: "Co-Founder", photo: "/images/tayyab-khan.jpg" },
  { name: "Palash Soni", designation: "Co-Founder", photo: "/images/palash-soni.jpg" },
];

function Divider() {
  return (
    <div className="mx-auto my-14 flex items-center justify-center gap-3" aria-hidden>
      <span className="h-px w-8" style={{ background: "var(--color-border-strong)" }} />
      <span className="h-1.5 w-1.5 rotate-45" style={{ background: "#756961" }} />
      <span className="h-px w-8" style={{ background: "var(--color-border-strong)" }} />
    </div>
  );
}

function RenderBlock({ b }: { b: Block }) {
  if (b.t === "p")
    return (
      <p className="font-body text-[14.5px] leading-[1.9]" style={{ color: "var(--color-ink-muted)" }}>
        {b.text}
      </p>
    );

  if (b.t === "quote" && b.accent)
    return (
      <blockquote
        className="my-2 py-1 text-center font-display text-[19px] font-semibold leading-[1.6] md:text-[21px]"
        style={{ color: "#8C6A2F" }}
      >
        {b.text}
      </blockquote>
    );

  if (b.t === "quote")
    return (
      <blockquote
        className="my-2 border-l-2 py-1 pl-6 font-display text-[19px] font-semibold leading-[1.6] md:text-[21px]"
        style={{ borderColor: "#3D1214", color: "#3D1214" }}
      >
        {b.text}
      </blockquote>
    );

  if (b.t === "lines")
    return (
      <div
        className="flex flex-col gap-2.5 rounded-lg border p-7 md:p-8"
        style={{ background: "var(--color-surface)", borderColor: "var(--color-border)" }}
      >
        {b.items.map((item) => (
          <p key={item} className="font-body text-[14px] font-medium" style={{ color: "var(--color-ink)" }}>
            {item}
          </p>
        ))}
      </div>
    );

  return (
    <div className="flex flex-col items-center gap-4 py-2 text-center">
      <p className="font-display text-2xl font-bold md:text-3xl" style={{ color: "#2F6B4F" }}>
        {b.text}
      </p>
      <p className="font-body text-[14px] leading-[1.85]" style={{ color: "var(--color-ink-muted)" }}>
        {b.note}
      </p>
    </div>
  );
}

export default function AboutPage() {
  const [lang, setLang] = useState<Lang>("en");
  const t = UI[lang];
  const story = lang === "hi" ? STORY_HI : STORY;

  return (
    <main lang={lang} className="min-h-screen selection:bg-[#3D1214] selection:text-white" style={{ background: "var(--color-bg)" }}>
      {/* Hero */}
      <section className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-105 w-180 -translate-x-1/2 -translate-y-1/3 rounded-full"
          style={{ background: "rgba(61,18,20,0.06)", filter: "blur(60px)" }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center md:px-12">
          <h1
            className="font-display text-4xl font-bold leading-[1.1] tracking-[-0.02em] md:text-[3.5rem]"
            style={{ color: "var(--color-ink)" }}
          >
            MehRāj
          </h1>
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-8" style={{ background: "var(--color-border-strong)" }} aria-hidden />
            <span
              className="font-body text-[12px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#3D1214" }}
            >
              {t.tagline}
            </span>
            <span className="h-px w-8" style={{ background: "var(--color-border-strong)" }} aria-hidden />
          </div>
          <LanguageToggle lang={lang} setLang={setLang} />
        </div>
      </section>

      {/* Story */}
      <section className="px-6 pb-20 md:px-12 md:pb-28">
        <article className="mx-auto max-w-2xl">
          {story.map((group, gi) => (
            <div key={gi}>
              <div className="flex flex-col gap-6">
                {group.map((b, bi) => (
                  <RenderBlock key={bi} b={b} />
                ))}
              </div>
              {gi < story.length - 1 && <Divider />}
            </div>
          ))}

          <div className="mt-16 text-center">
            <p
              className="font-display text-xl font-bold tracking-[0.04em] md:text-2xl"
              style={{ color: "#3D1214" }}
            >
              Designed in India. Made in India. Made for India.
            </p>
          </div>
        </article>
      </section>

      {/* Founders */}
      <section
        className="border-t px-6 py-20 md:px-12 md:py-28"
        style={{ borderColor: "var(--color-border)", background: "var(--color-surface)" }}
      >
        <div className="mx-auto max-w-3xl">
          <div className="mb-14 text-center">
            <span
              className="font-body text-[10px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: "#756961" }}
            >
              {t.founders}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {FOUNDERS.map((f) => (
              <div
                key={f.name}
                className="flex flex-col items-center rounded-lg border p-8 text-center"
                style={{ background: "var(--color-bg)", borderColor: "var(--color-border)" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.photo}
                  alt={f.name}
                  className="h-44 w-44 rounded-full border object-cover"
                  style={{ borderColor: "rgba(61,18,20,0.15)" }}
                />
                <p className="mt-6 font-display text-[18px] font-bold" style={{ color: "var(--color-ink)" }}>
                  {f.name === "Tayyab Khan" ? t.tayyab : t.palash}
                </p>
                <p
                  className="mt-1 font-body text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: "#756961" }}
                >
                  {t.coFounder}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}