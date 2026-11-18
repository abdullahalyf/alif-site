# আলিফের কাছে কনটেন্টের প্রশ্ন

প্রতিটি সারির প্রশ্নের পাশে উত্তর লিখুন। কোনো তথ্য এখন প্রকাশ করতে না চাইলে সেটি লিখে দিন। নিচের ফাইলগুলো `src/content/`-এর ভেতরে আছে। কোডে চিহ্নিত উদাহরণের ফাইল ও লাইন দেখতে `pnpm demo:list` চালান।

## Home

| এখন কী আছে | আপনার কাছে প্রশ্ন | কোথায় বদলাবেন |
| --- | --- | --- |
| ডান পাশে একটি DEMO পোর্ট্রেট | এখানে আপনার কোন ছবি রাখব? | `site.ts → site.heroSide` |
| স্ট্রিপে About পোর্ট্রেটের পর তিনটি নমুনা ভ্রমণ ছবি | তিনটি ছবির ফাইল ও প্রত্যেকটির এক লাইনের বর্ণনা কী? | `site.ts → heroPhotos.images[1–3]` |
| ১২+ নমুনা প্রকল্প, ৪টি ক্ষেত্র, নির্মাণের ৩ বছর | কোন তিনটি সত্য ও যাচাইযোগ্য সংখ্যা প্রকাশ করা যাবে? প্রতিটির মানে কী? | `site.ts → site.stats[]` |
| মায়া রহমান, আরিফ হাসান ও নিনা চৌধুরীর তিনটি কাল্পনিক মন্তব্য | প্রত্যেকটির জায়গায় কার অনুমোদিত নাম, ভূমিকা ও হুবহু মন্তব্য দেওয়া যাবে? | `site.ts → site.testimonials[]` |

## About me

| এখন কী আছে | আপনার কাছে প্রশ্ন | কোথায় বদলাবেন |
| --- | --- | --- |
| DIU-তে CSE, নমুনা শুরুর সাল ও কোর্সের বর্ণনা | কবে ভর্তি হয়েছেন এবং কোন বিষয় বা কাজটি উল্লেখ করবেন? ক্যাম্পাসের ছবি দিন। | `site.ts → site.education[0]` |
| Riverbend College ও নমুনা HSC সাল | আপনার কলেজের নাম, বিভাগ, শুরুর সাল ও পাসের সাল কী? কলেজের ছবি দিন। | `site.ts → site.education[1]` |
| Northview High School ও নমুনা SSC সাল | আপনার স্কুলের নাম, পড়ার সময়, পাসের সাল ও উল্লেখযোগ্য স্মৃতি কী? স্কুলের ছবি দিন। | `site.ts → site.education[2]` |
| ছাত্র প্রযুক্তি প্রদর্শনী ও কমিউনিটি স্বীকৃতির দুটি DEMO মাইলফলক | আসল মাইলফলক দুটি কী? প্রতিটির সাল, আয়োজক, আপনার কাজ ও প্রকাশযোগ্য ফল কী? | `site.ts → site.achievements[]` (যেখানে `demo: true`) |
| শৈশব, স্কুল-কলেজ, বিশ্ববিদ্যালয় ও এখনকার চারটি অধ্যায় এবং নমুনা ছবি | চার সময়ের প্রতিটির একটি সত্য ঘটনা, স্থান ও ছবি দিন। Jhenaidah-তে শুরুটা কেমন ছিল? প্রথম কী বানিয়েছিলেন? DIU-তে কী শিখছেন? Savar-এ এখন কী করছেন? | `site.ts → site.story[0–3].{title,label,text,image}` |
| সিস্টেম দক্ষতা হিসেবে domain modelling, offline design, access control ও sync | প্রতিটি দক্ষতায় ১–৫ এর মধ্যে কত দেবেন? কী কাজে ব্যবহার করেছেন? | `site.ts → site.skills[0].items[]` |
| Web দক্ষতা হিসেবে TypeScript, React, Next.js ও accessible UI | প্রতিটির আসল মাত্রা ও এক লাইনের কাজের উদাহরণ কী? | `site.ts → site.skills[1].items[]` |
| ডেটা ও টুলিং হিসেবে PostgreSQL, SQLite, Python ও Git/CI | প্রতিটির আসল মাত্রা ও এক লাইনের কাজের উদাহরণ কী? | `site.ts → site.skills[2].items[]` |
| ভ্রমণ, স্ট্রিট ফটোগ্রাফি, ফুটবল ও শহর নিয়ে পড়া; সঙ্গে একটি নমুনা ছবি | কোন আগ্রহগুলো রাখতে চান? কী যোগ করবেন এবং কোন ছবি দেবেন? | `site.ts → site.interests[]`, `demoContent.interestsPhoto` |

## Work

| এখন কী আছে | আপনার কাছে প্রশ্ন | কোথায় বদলাবেন |
| --- | --- | --- |
| আসল মাল্টি-ব্রাঞ্চ POS-এর কেস স্টাডিতে দুটি DEMO ছবি ও ধারণাভিত্তিক ডায়াগ্রাম | অনুমোদিত স্ক্রিনশট দুটি কী? কোন সিস্টেম অংশ, সংযোগ ও সীমা প্রকাশ করা যাবে? | `projects.ts → projects[slug=multi-branch-pos].images[]`; `diagrams.ts → pos` |
| ট্রাফিক দুর্ঘটনা গবেষণায় দুটি DEMO ছবি, পদ্ধতির নমুনা বর্ণনা ও ধারণাভিত্তিক পাইপলাইন | আপনার সঠিক ভূমিকা, ডেটা, মডেল, টুল ও প্রকাশযোগ্য ফল কী? কোন ছবি ও পাইপলাইন ব্যবহার করব? | `projects.ts → projects[slug=traffic-accident-risk].{role,solution,stack,results,images}`; `diagrams.ts → research` |
| Stockroom Operations Hub — ক্রয় ও গুদাম স্থানান্তরের নমুনা | কোন যাচাইযোগ্য প্রকল্প দিয়ে বদলাবেন? গ্রাহক, সাল, ভূমিকা, সমস্যা, সমাধান, স্ট্যাক, ফল, লিংক, ছবি ও সিস্টেমের ধাপ কী? | `projects.ts → projects[slug=stockroom-operations]`; `diagrams.ts → diagrams` |
| Clinic Booking — অ্যাপয়েন্টমেন্ট ও ফলোআপের নমুনা | প্রকাশযোগ্য ক্লিনিক বা অন্য প্রকল্প কী? ভূমিকা, কাজ, ফল, ছবি ও ডায়াগ্রাম দিন। | `projects.ts → projects[slug=clinic-booking]`; `diagrams.ts → diagrams` |
| Field Service Dispatch — টেকনিশিয়ান পাঠানোর নমুনা | কোন আসল কাজটি দেখাব? সমস্যা, সমাধান, ফল মাপার উপায়, ছবি ও ডায়াগ্রাম কী? | `projects.ts → projects[slug=field-service]`; `diagrams.ts → diagrams` |
| Learning Progress Dashboard — ব্যক্তিগত শিক্ষার নমুনা | কোন ব্যক্তিগত প্রকল্প, সাল, ভূমিকা, স্ট্যাক, ফল, লিংক, ছবি ও ডায়াগ্রাম দেখাব? | `projects.ts → projects[slug=learning-dashboard]`; `diagrams.ts → diagrams` |
| Sync Inspector — সিঙ্ক পর্যবেক্ষণের নমুনা | কোন ওপেন সোর্স প্রকল্প এবং আপনার কী অবদান দেখাব? রিপো, ফল, ছবি ও ডায়াগ্রাম কী? | `projects.ts → projects[slug=sync-inspector]`; `diagrams.ts → diagrams` |

## Services ও Contact

| এখন কী আছে | আপনার কাছে প্রশ্ন | কোথায় বদলাবেন |
| --- | --- | --- |
| Architecture ১–২, Business software ৬–১২, Offline-first ৪–৮ ও Database/access ১–৩ সপ্তাহের নমুনা | চারটি সার্ভিসের প্রতিটির কাজের সীমা, ডেলিভারি ও সাধারণ সময় কত? | `services.ts → servicesContent.blocks[]` |
| Fixed scope, monthly retainer ও architecture review-এর নমুনা শর্ত | কোন তিন ধরনের চুক্তি দেবেন? প্রতিটির উপযুক্ত ক্লায়েন্ট, শুরুর মূল্য, মুদ্রা ও শর্ত কী? | `services.ts → servicesContent.models[]` |
| দুই কর্মদিবসে উত্তর ও অনিশ্চিত অ্যাভেইলেবিলিটি | সাধারণত কত দিনে উত্তর দেন? এখন কাজ নিতে পারবেন কি? বাজেট ও সময়ের কোন অপশন রাখবেন? | `contact.ts → contactContent.{response,availability,fields}` |

## Writing

| এখন কী আছে | আপনার কাছে প্রশ্ন | ফাইল (`src/content/posts/`) |
| --- | --- | --- |
| Database আগে ডিজাইন করার নমুনা লেখা | কোন বাস্তব মডেলিং সমস্যাটি উদাহরণ হিসেবে দেবেন? | `database-before-screens.md` |
| দুর্বল ইন্টারনেটের দোকানের জন্য নমুনা লেখা | নিজের অভিজ্ঞতায় কোন কাজগুলো অফলাইনে চলা জরুরি ছিল? | `offline-first-shops.md` |
| Idempotent sync-এর নমুনা লেখা | কেমন রিট্রাই বা ডুপ্লিকেট ঘটনা দেখেছেন? কোন উদাহরণ প্রকাশ করতে পারবেন? | `idempotent-sync.md` |
| প্রজেক্ট স্কোপিংয়ের নতুন নমুনা | প্রথম মিটিংয়ে কী জিজ্ঞেস করেন? আসল একটি acceptance example কী? | `how-i-scope-a-project.md` |
| ছোট ব্যবসার জন্য role-based access-এর নমুনা | আপনার আসল ভূমিকা ও ব্রাঞ্চ-নিয়মের কোন উদাহরণটি বোঝাতে চান? | `role-based-access-small-business.md` |
| SQLite ও Postgres-এর নমুনা | ডিভাইস ও সার্ভারের কাজ কীভাবে ভাগ করেছিলেন? কী ভুল বা সীমা দেখেছেন? | `sqlite-postgres-offline-first.md` |
| প্রথম POS তৈরির কাল্পনিক ব্যক্তিগত অভিজ্ঞতা | প্রথম POS-এর সত্য ঘটনা, শেখা বিষয় ও অনুমোদিত তথ্য কী? | `what-i-learned-first-pos.md` |
| নিজের পরিচয়ের অপ্রকাশিত খসড়া | নিজের ভাষায় পরিচয় ও ভবিষ্যতে কী নিয়ে লিখবেন তা দিন। কবে প্রকাশ করবেন? | `hello-im-alif.md` |

প্রতিটি লেখার `title`, `date`, `summary`, `tags`, `draft` এবং মূল লেখা দেখে অনুমোদন দিন।

## Travel

প্রতিটি নিচের যাত্রার জন্য আলাদা উত্তর দিন। সত্যিই কবে গিয়েছিলেন, কোথায় গিয়েছিলেন, কার সঙ্গে কী কথা হয়েছিল এবং কোন ছবি প্রকাশ করা যাবে? তারিখ, স্থান, জেলা বা দেশ, পিনের লোকেশন, ট্যাগ, ক্যাপশন ও ছবি দিন।

| এখনকার নমুনা | কোথায় বদলাবেন |
| --- | --- |
| সিলেট চা-বাগান ও চা-চাষির কথা | `travel.ts → trips[slug=sylhet-tea]` |
| সুন্দরবন ও নৌকার পথপ্রদর্শকের কথা | `travel.ts → trips[slug=sundarbans]` |
| কক্সবাজার ও জেলের কথা | `travel.ts → trips[slug=coxs-bazar]` |
| বান্দরবান ও পথের নাশতার কথা | `travel.ts → trips[slug=bandarban]` |
| শ্রীমঙ্গল ও ছোট রাস্তার গল্প | `travel.ts → trips[slug=sreemangal]` |
| রাজশাহী ও শহরের গল্প | `travel.ts → trips[slug=rajshahi]` |
| কুয়াকাটা ও সমুদ্রের গল্প | `travel.ts → trips[slug=kuakata]` |
| ঝিনাইদহে বাড়ি ফেরার গল্প | `travel.ts → trips[slug=jhenaidah-home]` |
| কুয়ালালামপুরের কাল্পনিক ভ্রমণ ও দুটি তৈরি ছবি | `travel.ts → internationalTrips[slug=kuala-lumpur]` |

- শুরু ও শেষের নমুনা লেখার বদলে ভ্রমণ নিয়ে আপনার নিজের দুটি ছোট অনুচ্ছেদ কী? শীত কি সত্যিই পছন্দের ঋতু? `travel.ts → travelContent.{intro,description,closing,favouriteSeason}`
- ম্যাপের পিনগুলো আনুমানিক। আসল লোকেশন ও দেশের বাইরে যাত্রার শুরুর শহর কী? `travel.ts → trips[].{lat,lng}, internationalTrips[].{lat,lng}, travelContent.internationalOrigin`

## Lab ও Estimate

| এখন কী আছে | আপনার কাছে প্রশ্ন | কোথায় বদলাবেন |
| --- | --- | --- |
| Dhaka, Sylhet ও Khulna নামের তিনটি কাল্পনিক টার্মিনাল, নমুনা বিক্রির মূল্য ও আইডি | কোন কাল্পনিক শাখা, কোড, বিক্রির উদাহরণ, মুদ্রা ও ডেমো গতি রাখতে চান? | `lab.ts → syncContent.{branches,firstSequence,saleAmount,currency,packetDelay}` |
| ছয়টি নমুনা POS ভূমিকা, কাজ, ব্রাঞ্চ-সীমা ও অনুমতি | কোন নমুনা ভূমিকা কোথায় কোন কাজ করতে পারবে? বাস্তব ক্লায়েন্টের ব্যক্তিগত ডেটা ছাড়া উদাহরণ দিন। | `lab.ts → accessContent.{roles,resources,operations,actions,rules}`; নিয়মের বাস্তবায়ন `src/features/lab/access-control/engine.ts` |
| সপ্তাহে ৬৫০ USD ও ফেজ, জরুরি কাজ এবং ইন্টিগ্রেশনের DEMO হার | আসল মুদ্রা ও সাপ্তাহিক হার কত? প্রতিটি ধরনের কাজ, ফেজ, শাখা, ভূমিকা, অফলাইন, মাইগ্রেশন ও ইন্টিগ্রেশনের সময় কত? অনিশ্চয়তা ও জরুরি কাজের গুণক কী? | `estimate.ts → estimateModel.{currency,weeklyRate,baseBuildWeeks,discovery,architecture,build,rollout,integrationWeeks,range,urgency}` |
| একটি ব্রাঞ্চ ও তিন ভূমিকার POS দিয়ে হিসাব শুরু হয় | শুরুতে কোন প্রকল্প ও সেটিংস দেখাব? | `estimate.ts → estimateDefaults` |

## Résumé, Uses ও Now

| এখন কী আছে | আপনার কাছে প্রশ্ন | কোথায় বদলাবেন |
| --- | --- | --- |
| Independent software collaborator-এর কাল্পনিক অভিজ্ঞতা | আপনার আসল পদ, প্রতিষ্ঠান, সময়কাল ও দায়িত্ব কী? About-এর শিক্ষা, দক্ষতা ও পুরস্কারগুলোও ঠিক আছে কি? | `resume.ts → resumeContent.experience[1]`; `site.ts → site.{education,skills,achievements}` |
| নমুনা ল্যাপটপ ও মনিটর | কোন মডেল ব্যবহার করেন, কেন? | `uses.ts → usesContent.groups[0].items[]` |
| VS Code, Codex ও Claude | কোন এডিটর ও AI টুল রাখবেন, কোন কাজে? | `uses.ts → usesContent.groups[1].items[]` |
| TypeScript, React, Next.js ও Python | কোন ভাষা ও ফ্রেমওয়ার্ক নিয়মিত ব্যবহার করেন, কেন? | `uses.ts → usesContent.groups[2].items[]` |
| PostgreSQL ও SQLite | কোন ডেটাবেস কোন কাজে ব্যবহার করেন? | `uses.ts → usesContent.groups[3].items[]` |
| Vercel, Cloudflare ও GitHub Actions | কোন হোস্টিং, CDN বা CI টুল ব্যবহার করেন, কী কাজে? | `uses.ts → usesContent.groups[4].items[]` |
| Markdown নোট ও সাপ্তাহিক রিভিউ | প্ল্যান, নোট বা কাজ গুছাতে আপনার আসল অভ্যাস কী? | `uses.ts → usesContent.groups[5].items[]` |
| Now-এর চারটি তথ্য ক্লায়েন্টের কাজ, DIU, গবেষণা ও জাপানি শেখা | কোনটি বদলেছে? এখন কী বানাচ্ছেন, পড়ছেন, গবেষণা করছেন বা শিখছেন? | `site.ts → site.now[]`, `site.statusCard.{availability,building,stack}` |

## ছবির ফাইল

| জায়গা | ফিল্ড | মাপ ও ধরন |
| --- | --- | --- |
| Home মূল ও শেয়ার পোর্ট্রেট | `site.ts → site.heroPhoto` | 2400×1350 JPG বা PNG |
| Home ছোট গোল ছবি | `site.ts → site.avatar` | 400×400 বর্গাকার |
| Home পাশের ছবি | `site.ts → site.heroSide` | 900×1100 পোর্ট্রেট |
| Home স্ট্রিপ | `site.ts → heroPhotos.images[]` | প্রথমটি About পোর্ট্রেট; পরের তিনটি 1200×900 |
| About পোর্ট্রেট | `site.ts → site.aboutPhoto` | 1200×1500 পোর্ট্রেট |
| About শিক্ষা | `site.ts → site.education[].image` | প্রতি প্রতিষ্ঠান 1200×900 |
| About অধ্যায় | `site.ts → site.story[].image` | চারটি ছবি, 1600×1200 |
| About Interests | `site.ts → demoContent.interestsPhoto` | 800×1000 পোর্ট্রেট |
| Work কভার, থাম্বনেইল ও কেস স্টাডির অতিরিক্ত ছবি | `projects.ts → projects[].images[]` | প্রতি ছবি 1600×1000 ল্যান্ডস্কেপ; প্রথমটি কভার |
| Travel ও About ট্রাভেল স্ট্রিপ | `travel.ts → trips[].photos[]`, `internationalTrips[].photos[]` | প্রতি ছবি 1200×900 ল্যান্ডস্কেপ; প্রথমটি কভার |
| ট্যাব আইকন ও Work/Writing/Travel শেয়ার কার্ড | `site.ts → site.logoInitial`; সংশ্লিষ্ট শিরোনাম | আইকন 64×64, শেয়ার কার্ড 1200×630; সফটওয়্যার তৈরি করে |

ফাইল যোগ করার নিয়ম ও কোন জায়গায় ছবি কীভাবে কাটে তা [ছবি বদলাবেন কীভাবে](CONTENT-GUIDE.md#ছবি-বদলাবেন-কীভাবে) অংশে আছে।
