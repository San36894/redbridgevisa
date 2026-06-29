import React, { useState, useEffect, useRef, useContext, createContext } from "react";
import {
  ShieldCheck, Award, Lock, GraduationCap, Plane, Briefcase, Users,
  Check, Phone, Mail, MessageCircle, MapPin, ChevronDown, Menu, X,
  FileCheck, Send, Clock, ArrowRight, Search, CalendarClock,
  ClipboardList, FileSearch, PenLine, BadgeCheck, Scale
} from "lucide-react";

/* =========================================================================
   RedBridge Visa Partners. Bilingual (English / 中文) single-file site.
   All copy lives in the T dictionary. Currency converts on language switch.
   ========================================================================= */

/* ---- Exchange rate: GBP -> CNY. Approximate. Update when you wish. ---- */
const GBP_TO_CNY = 8.95;
const PRICES = { general: 75, premium: 90 };

/* ============================ TRANSLATIONS ============================ */
const T = {
  en: {
    code: "en", other: "中文", otherLabel: "Switch to Chinese", htmlLang: "en",
    skip: "Skip to content",
    brandTag: "Visa Partners",
    nav: { home: "Home", services: "Visa Services", pricing: "Pricing", process: "How It Works", requirements: "Requirements", about: "About", contact: "Contact" },
    cta: { book: "Book consultation", start: "Start application", apply: "Apply now", learn: "Learn more", checklist: "View document checklist" },
    hero: {
      eyebrow: "China to the United Kingdom · 中国 → 英国",
      title: "Your trusted partner for Chinese visa applications to the UK",
      sub: "Expert guidance for students, tourists, business travelers, and families applying for UK visas.",
      start: "Start your application", book: "Book consultation",
      promises: ["Free first assessment", "Fixed, transparent pricing", "Support in English and 中文"],
    },
    badges: [
      { title: "Personal, dedicated support", text: "You work directly with our visa team, not a faceless call centre." },
      { title: "Secure and confidential", text: "Your documents are handled with care and kept private." },
      { title: "Clear, fixed pricing", text: "Quotes agreed up front, with no hidden fees." },
    ],
    svcOverview: { eyebrow: "What we do", title: "Visa services for every journey", sub: "Whether you are studying, travelling, or reuniting with family, we prepare your application with care from start to finish." },
    services: [
      { name: "Student Visa Assistance", blurb: "For university applicants moving to the UK to study.",
        points: ["University applicants", "Document preparation", "Application guidance", "Interview preparation"],
        requirements: ["Valid passport", "CAS from a licensed sponsor", "Proof of funds for tuition and living costs", "English language evidence", "Academic certificates and transcripts"],
        steps: ["Confirm your course and sponsor details", "Prepare and verify supporting documents", "Complete and review the online application", "Book biometrics and submit"] },
      { name: "Tourist Visa Assistance", blurb: "For holidays, family visits, and short stays in the UK.",
        points: ["Holiday travel", "Family visits", "Short stays"],
        requirements: ["Valid passport", "Travel itinerary and accommodation", "Bank statements showing funds", "Employment or study confirmation", "Invitation letter where relevant"],
        steps: ["Confirm travel dates and purpose", "Gather financial and travel documents", "Prepare the visitor application", "Submit and track the decision"] },
      { name: "Business Visa Assistance", blurb: "For meetings, conferences, and trade visits.",
        points: ["Business meetings", "Conferences", "Trade visits"],
        requirements: ["Valid passport", "Invitation from a UK company", "Letter from your employer", "Company and financial evidence", "Itinerary of business activities"],
        steps: ["Confirm the purpose and host details", "Prepare company and personal evidence", "Complete the business visitor application", "Submit and arrange biometrics"] },
      { name: "Family and Visitor Visa Assistance", blurb: "For visiting relatives and joining family in the UK.",
        points: ["Visiting relatives", "Family events", "Sponsored visits"],
        requirements: ["Valid passport", "Proof of relationship", "Sponsor details and status in the UK", "Accommodation and maintenance evidence", "Invitation letter from the family member"],
        steps: ["Confirm the relationship and sponsor", "Collect relationship and funding evidence", "Prepare the family visitor application", "Submit and follow the decision"] },
    ],
    svcCols: { who: "Who it is for", req: "Requirements", steps: "Process steps" },
    svcPage: { eyebrow: "Visa services", title: "Tailored support for your UK visa", sub: "Choose the route that fits your purpose. Each service includes a clear description, a requirements checklist, and the steps we take together." },
    process: {
      previewEyebrow: "Simple and clear", previewTitle: "Five steps from first call to decision", seeFull: "See the full process",
      heroEyebrow: "How it works", heroTitle: "A clear path to your UK visa", heroSub: "We keep every stage transparent so you always know what is happening and what comes next.",
      step: "Step",
      steps: [
        { title: "Free assessment", text: "We review your situation and confirm the right visa route, with no obligation." },
        { title: "Document review", text: "We check every document against the latest UK requirements and flag any gaps." },
        { title: "Application preparation", text: "We complete and refine your application so it reads clearly and accurately." },
        { title: "Submission support", text: "We guide you through biometrics, fees, and submission with confidence." },
        { title: "Visa decision support", text: "We help you understand the outcome and plan your next steps." },
      ],
      expectEyebrow: "At a glance", expectTitle: "What you can expect",
      expect: [
        { t: "Responsive support", d: "Quick replies during working hours and clear timelines at each stage." },
        { t: "Accuracy first", d: "Careful checks reduce the risk of avoidable refusals." },
        { t: "A named consultant", d: "One point of contact who knows your case from start to finish." },
      ],
    },
    track: {
      eyebrow: "Stay informed", title: "Track your application", sub: "Enter your reference to see where your application stands. This is a preview of our client tracking tool.",
      label: "Application reference", placeholder: "e.g. RB-2026-0481", btn: "Track",
      demoNote: "Demo preview. Use any reference to see how tracking looks.",
      stages: ["Received", "Document review", "Preparation", "Submitted", "Decision"],
      statusPre: "Currently at:", statusPost: "Your consultant will update you at the next stage.", demoType: "Student visa",
    },
    pricing: {
      eyebrow: "Pricing", title: "Simple, honest pricing",
      sub: "Choose the level of support that suits you. The official UK government visa fee is separate and paid directly to UK Visas and Immigration.",
      per: "per application", choose: "Choose {plan}", approx: "approx.",
      govNote: "Prices are for our service only. The official UK government visa fee is paid separately to UKVI.",
      tiers: [
        { name: "General", tagline: "Guided application support",
          features: ["Eligibility and visa route check", "Full personalised document checklist", "Application form prepared and reviewed", "Submission and biometrics guidance", "Email and WhatsApp support"] },
        { name: "Premium", tagline: "We book your appointment, plus a lawyer's final check", badge: "Most thorough",
          lawyer: "A qualified UK immigration lawyer reviews your completed application before you submit.",
          features: ["Everything in the General service", "We book your visa appointment on your behalf, starting within 48 hours of your documents being ready, and secure the earliest available slot", "Priority response times", "Refusal risk assessment", "Help responding to follow up requests"] },
      ],
    },
    promise: {
      eyebrow: "Our promise", title: "A new consultancy, built on doing right by you",
      sub: "We are just starting out, so we will not show you reviews we have not earned yet. Here is what we commit to every client from day one.",
      cards: [
        { title: "Honest advice", text: "If a visa route is not right for you, we will say so plainly. We would rather lose a fee than set you up to fail." },
        { title: "Fixed pricing", text: "You agree the price before any work begins. No surprises, no pressure, no hidden charges." },
        { title: "Personal attention", text: "As a new consultancy, every client matters. You get direct, one to one support at each step." },
      ],
      note: "As we help our first clients, their stories will appear here.",
    },
    faq: {
      eyebrow: "FAQ", title: "Questions, answered",
      items: [
        { q: "How long does a UK visa take?", a: "Standard visitor visas are often decided within three weeks, while student visas are usually faster. Timelines vary by route and season, and we always confirm the current guidance for your case." },
        { q: "What documents are needed?", a: "It depends on your visa route, but most applications need a valid passport, proof of funds, and evidence supporting your purpose of travel. We provide a personalised checklist after your assessment." },
        { q: "Can you help with rejected applications?", a: "Yes. We review the refusal reasons, identify what went wrong, and rebuild a stronger application or advise on the best next step for your situation." },
        { q: "Can you book my visa appointment for me?", a: "Yes. With our Premium service we book your appointment on your behalf once your documents are ready, and we secure the earliest available slot. Appointment availability is set by the visa centre, so we cannot guarantee a specific date, but we act fast to get you the soonest one." },
        { q: "How much does the service cost?", a: "Our service is £50 per application for General, and £90 for Premium, which includes a final check by a qualified UK immigration lawyer. The official government visa fee is separate." },
        { q: "Are you an established company?", a: "We are a new and independent service, and we are open about that. We keep our pricing fair, our advice honest, and our checks careful. We are happy to answer any questions before you decide to work with us." },
        { q: "Do you offer support in Mandarin?", a: "Yes. Our team provides bilingual support in English and Mandarin so nothing gets lost in translation." },
      ],
    },
    news: { eyebrow: "Stay updated", title: "UK visa news, straight to your inbox", sub: "Occasional updates on UK visa rule changes and practical tips. No spam.", placeholder: "Your email address", btn: "Subscribe", done: "You are subscribed. Welcome aboard." },
    finalCta: { title: "Ready to begin your UK visa journey?", sub: "Book a free assessment today. No obligation, just clear advice from people who do this every day." },
    requirements: {
      eyebrow: "Requirements", title: "Document checklists for UK visas", sub: "Use these checklists to prepare. We confirm the exact list for your specific route during your assessment.",
      lists: [
        { title: "Passport requirements", items: ["Valid for the full period of stay", "At least one blank page", "Previous passports if requested", "Clear copy of the photo page"] },
        { title: "Financial documents", items: ["Recent bank statements", "Proof of regular income", "Sponsorship letter if funded by another person", "Evidence of savings where relevant"] },
        { title: "Travel documents", items: ["Travel itinerary and dates", "Accommodation details", "Return or onward booking", "Travel history if available"] },
        { title: "Education documents", items: ["CAS or offer letter", "Academic certificates", "Transcripts", "English language test results"] },
        { title: "Supporting evidence", items: ["Employment or study confirmation", "Invitation letters", "Proof of ties to home country", "Any documents requested for your route"] },
      ],
      ctaTitle: "Not sure what you need?", ctaText: "Book a free assessment and we will send you a personalised checklist for your route.", ctaBtn: "Book free assessment",
    },
    about: {
      heroEyebrow: "About us", heroTitle: "A bridge between China and the UK", heroSub: "RedBridge was built to make UK visa applications calmer, clearer, and more reliable for people moving between two worlds.",
      storyEyebrow: "Our story", storyTitle: "A new service, here to make UK visas clearer",
      p1: "RedBridge Visa Partners is a young company built to make UK visa applications calmer and clearer. Applicants deserve patient, honest guidance instead of guesswork and jargon, and that is exactly what we set out to provide.",
      p2: "We are early in our journey, and we are open about that. What we lack in years we make up for with care: we stay current with UK rules, we check every detail, and we treat each client as if our reputation depends on them, because right now it does.",
      whyTitle: "Why choose us",
      why: ["Clear pricing with no hidden fees", "A named consultant for your case", "Bilingual support in English and Mandarin", "Careful checks before every submission", "Support even if a past application was refused"],
      valuesEyebrow: "Customer first", valuesTitle: "We measure success by yours",
      valuesText: "Every plan we make starts with your goal, not a template. We listen, explain your options in plain language, and stay with you until a decision is reached. Your trust is the reason RedBridge exists.",
    },
    contact: {
      heroEyebrow: "Contact", heroTitle: "Let us start your application", heroSub: "Send a message or book a consultation. We usually reply within one working day.",
      formTitle: "Request a consultation",
      name: "Full name", namePh: "Your name", email: "Email", phone: "Phone", phonePh: "+44 or +86",
      visa: "Visa type", visaOptions: ["Student visa", "Tourist visa", "Business visa", "Family or visitor visa", "Not sure yet"],
      message: "How can we help?", messagePh: "Tell us a little about your plans", send: "Send request",
      formNote: "By sending this form you agree to be contacted about your enquiry.",
      successH: "Thank you, {name}.", successText: "Your request has been received. A consultant will contact you shortly to arrange your free assessment.", another: "Send another message",
      reachTitle: "Reach us directly", phoneHours: "Mon to Fri, 9am to 6pm", emailNote: "We reply within one working day",
      wa: "Chat on WhatsApp", waNote: "Quick questions, quick answers",
      officeTitle: "Office location", address: "24 King William Street, London, EC4R 9AS, United Kingdom", mapLabel: "RedBridge · City of London",
    },
    footer: {
      blurb: "Trusted guidance for Chinese applicants seeking UK visas. Students, tourists, business travelers, and families.",
      services: "Services", company: "Company", touch: "Get in touch",
      about: "About us", how: "How it works", req: "Requirements", contact: "Contact", waText: "WhatsApp chat",
      rights: "© {year} RedBridge Visa Partners. All rights reserved.",
      disclaimer: "An independent, newly established visa assistance service. We are not a government body and do not issue visas.",
    },
    chat: { header: "RedBridge support", online: "Online now", greeting: "Hi, welcome to RedBridge. How can we help with your UK visa today?", reply: "Thanks. A consultant will reply here shortly. For a faster answer you can also reach us on WhatsApp.", placeholder: "Type your message", wa: "Chat on WhatsApp" },
    britain: {
      eyebrow: "Your destination", title: "The UK is waiting for you",
      sub: "From London's landmarks to Manchester's football, Edinburgh's castle and a proper plate of fish and chips, we help you get there.",
      items: [
        { name: "London", note: "Big Ben, the London Eye and Tower Bridge." },
        { name: "Manchester", note: "World famous football and a lively music scene." },
        { name: "Edinburgh", note: "Historic castle and the Scottish Highlands." },
        { name: "British classics", note: "Fish and chips, a warm pub and afternoon tea." },
      ],
    },
    unis: {
      eyebrow: "Partner universities", title: "Working with students from China's leading universities",
      sub: "We support summer school and study programmes for students from these institutions.",
      note: "University names are shown with their public reputation. Programme partnerships are arranged through our summer scheme tie ups.",
    },
    calc: {
      eyebrow: "Plan ahead", title: "When should I start my application?",
      sub: "Tell us your travel date and visa type, and we will suggest when to begin preparing and when to submit.",
      dateLabel: "Your planned travel date", visaLabel: "Visa type", btn: "Calculate",
      startBy: "Start preparing by", submitBy: "Submit your application by", resultIntro: "For travel on",
      tip: "These are guideline dates. Processing times change, so check GOV.UK for the latest, or book a free assessment and we will plan it with you.",
      past: "Please choose a date in the future.", soon: "That date is very soon. Contact us today so we can advise on priority options.",
      visas: ["Tourist or visitor visa", "Student visa", "Business visa", "Family visa"],
    },
    scenarios: {
      eyebrow: "How we help", title: "Example scenarios",
      sub: "These are illustrative examples of the kinds of cases we support, not real client records. Genuine client reviews will appear here as we complete applications.",
      tag: "Illustrative example",
      items: [
        { who: "A master's applicant, Wuhan", text: "A first application was refused over unclear financial evidence. In a case like this we would rebuild the bank statements to meet the 28 day rule and resubmit a clear, well evidenced application." },
        { who: "A family visitor, Chengdu", text: "A visitor application was refused for weak ties to home. We would strengthen the evidence of work, property and family before reapplying." },
        { who: "A tourist, Hangzhou", text: "A straightforward holiday application where we prepare the itinerary, funds and cover letter so the case reads clearly from the start." },
      ],
      emptyTitle: "Your review could be here",
      emptyText: "We are a new service. As we help our first clients, their genuine reviews will be shown in this space.",
    },
    checklist: { btn: "Download document checklist (PDF)", note: "A bilingual PDF covering the documents and funds needed for each visa type." },
    gallery: { eyebrow: "A glimpse of the UK", title: "Where your journey leads", captions: ["London", "Edinburgh", "Manchester", "A British classic"], note: "Photos via Unsplash, free to use. Swap in your own images any time." },
  },

  zh: {
    code: "zh", other: "EN", otherLabel: "切换为英文", htmlLang: "zh",
    skip: "跳到主要内容",
    brandTag: "签证顾问",
    nav: { home: "首页", services: "签证服务", pricing: "价格", process: "办理流程", requirements: "材料清单", about: "关于我们", contact: "联系我们" },
    cta: { book: "预约咨询", start: "开始申请", apply: "立即申请", learn: "了解更多", checklist: "查看材料清单" },
    hero: {
      eyebrow: "中国 → 英国 · 专业签证协助",
      title: "助您顺利申请英国签证的可靠伙伴",
      sub: "为留学生、游客、商务人士及家庭提供专业的英国签证申请指导。",
      start: "开始申请", book: "预约咨询",
      promises: ["首次评估免费", "价格固定透明", "提供中英文服务"],
    },
    badges: [
      { title: "专属贴心服务", text: "您将直接与我们的签证团队沟通，而非客服中心。" },
      { title: "安全与保密", text: "您的材料将被妥善处理并严格保密。" },
      { title: "价格清晰固定", text: "费用提前确认，绝无隐藏收费。" },
    ],
    svcOverview: { eyebrow: "我们的服务", title: "覆盖各类需求的签证服务", sub: "无论您是留学、旅行还是与家人团聚，我们都会从头到尾用心准备您的申请。" },
    services: [
      { name: "学生签证协助", blurb: "适用于赴英国高校就读的申请人。",
        points: ["大学申请人", "材料准备", "申请指导", "面试准备"],
        requirements: ["有效护照", "持牌院校出具的 CAS", "学费及生活费资金证明", "英语语言能力证明", "学历证书及成绩单"],
        steps: ["确认课程及院校信息", "准备并核对支持材料", "填写并检查在线申请", "预约采集生物信息并递交"] },
      { name: "旅游签证协助", blurb: "适用于赴英国度假、探亲及短期停留。",
        points: ["度假旅行", "探亲访友", "短期停留"],
        requirements: ["有效护照", "行程及住宿安排", "显示资金的银行流水", "在职或在读证明", "如适用，邀请函"],
        steps: ["确认出行日期及目的", "整理资金及行程材料", "准备访客签证申请", "递交并跟踪审理进度"] },
      { name: "商务签证协助", blurb: "适用于商务会议、会展及贸易考察。",
        points: ["商务会议", "会议会展", "贸易考察"],
        requirements: ["有效护照", "英国公司邀请函", "雇主出具的证明信", "公司及财务证明", "商务活动行程安排"],
        steps: ["确认访问目的及接待方信息", "准备公司及个人证明", "填写商务访客申请", "递交并安排生物信息采集"] },
      { name: "家庭及访客签证协助", blurb: "适用于赴英探亲及与家人团聚。",
        points: ["探望亲属", "家庭活动", "受邀探访"],
        requirements: ["有效护照", "亲属关系证明", "担保人信息及在英身份", "住宿及生活费用证明", "家庭成员邀请函"],
        steps: ["确认亲属关系及担保人", "收集关系及资金证明", "准备家庭访客申请", "递交并跟进结果"] },
    ],
    svcCols: { who: "适用人群", req: "所需材料", steps: "办理步骤" },
    svcPage: { eyebrow: "签证服务", title: "为您量身定制的英国签证支持", sub: "选择符合您目的的签证类型。每项服务都包含清晰的说明、材料清单以及我们与您一同完成的步骤。" },
    process: {
      previewEyebrow: "简单清晰", previewTitle: "从首次咨询到结果的五个步骤", seeFull: "查看完整流程",
      heroEyebrow: "办理流程", heroTitle: "通往英国签证的清晰路径", heroSub: "我们让每个阶段都公开透明，让您始终清楚进展与下一步。",
      step: "第",
      steps: [
        { title: "免费评估", text: "我们了解您的情况并确认合适的签证类型，无需任何承诺。" },
        { title: "材料审核", text: "我们按英国最新要求核对每份材料，指出任何缺漏。" },
        { title: "申请准备", text: "我们完成并完善您的申请，使其清晰准确。" },
        { title: "递交支持", text: "我们协助您完成生物信息采集、缴费及递交。" },
        { title: "结果跟进", text: "我们帮助您理解审理结果并规划下一步。" },
      ],
      expectEyebrow: "一目了然", expectTitle: "您可以期待",
      expect: [
        { t: "及时响应", d: "工作时间内快速回复，每个阶段都有清晰时间表。" },
        { t: "准确至上", d: "细致核对可降低不必要拒签的风险。" },
        { t: "专属顾问", d: "一位从头到尾了解您案件的联系人。" },
      ],
    },
    track: {
      eyebrow: "随时掌握", title: "查询申请进度", sub: "输入您的参考编号即可查看申请进展。这是我们客户进度查询工具的预览。",
      label: "申请参考编号", placeholder: "例如 RB-2026-0481", btn: "查询",
      demoNote: "演示预览。可输入任意编号查看效果。",
      stages: ["已收到", "材料审核", "准备中", "已递交", "出结果"],
      statusPre: "当前阶段：", statusPost: "顾问会在下一阶段更新您的进度。", demoType: "学生签证",
    },
    pricing: {
      eyebrow: "价格", title: "简单诚实的价格",
      sub: "选择适合您的服务级别。英国政府官方签证费用另计，需直接向英国签证及移民局缴纳。",
      per: "每次申请", choose: "选择{plan}", approx: "约",
      govNote: "以上价格仅为我们的服务费用。英国政府官方签证费用需另行直接支付给 UKVI。",
      tiers: [
        { name: "标准", tagline: "全程申请指导",
          features: ["资格及签证类型评估", "完整的个性化材料清单", "填写并审核申请表", "递交及生物信息指导", "邮件与 WhatsApp 支持"] },
        { name: "尊享", tagline: "我们代您预约递交，并由律师做最终审核", badge: "最全面",
          lawyer: "由具备资质的英国移民律师在您递交前对完整申请进行最终审核。",
          features: ["包含标准服务全部内容", "材料齐全后，我们在 48 小时内开始代您预约签证递交时间，并为您争取最早可用的名额", "优先回复", "拒签风险评估", "协助回应补件要求"] },
      ],
    },
    promise: {
      eyebrow: "我们的承诺", title: "全新顾问机构，以诚待客",
      sub: "我们刚刚起步，因此不会展示尚未获得的评价。以下是我们从第一天起对每位客户的承诺。",
      cards: [
        { title: "诚实建议", text: "如果某种签证不适合您，我们会如实相告。我们宁可不赚这笔费用，也不愿让您冒失败的风险。" },
        { title: "价格固定", text: "所有工作开始前先确认价格。没有意外，没有压力，没有隐藏收费。" },
        { title: "专属关怀", text: "作为新机构，每位客户都很重要。每一步您都将获得一对一的支持。" },
      ],
      note: "随着我们服务首批客户，他们的故事将在此呈现。",
    },
    faq: {
      eyebrow: "常见问题", title: "为您解答",
      items: [
        { q: "英国签证需要多长时间？", a: "标准访客签证通常在三周内出结果，学生签证一般更快。具体时间因签证类型和季节而异，我们会根据您的情况确认最新指引。" },
        { q: "需要哪些材料？", a: "这取决于您的签证类型，但大多数申请都需要有效护照、资金证明以及与出行目的相关的材料。评估后我们会提供针对您情况的个性化清单。" },
        { q: "申请被拒后你们能帮忙吗？", a: "可以。我们会分析拒签原因，找出问题所在，并为您重新准备更有力的申请或建议最合适的下一步。" },
        { q: "你们能代我预约签证递交时间吗？", a: "可以。选择尊享服务后，材料齐全时我们会代您预约，并为您争取最早可用的名额。名额由签证中心放出，因此我们无法保证具体日期，但会尽快为您争取最早的时间。" },
        { q: "服务费用是多少？", a: "我们的标准服务为每次申请 £50，尊享服务为 £90，其中包含由具备资质的英国移民律师做的最终审核。政府签证费用另计。" },
        { q: "你们是成熟的公司吗？", a: "我们是一家全新的独立机构，对此我们坦诚相告。我们价格公道、建议诚实、核对细致，并乐意在您决定合作前回答任何问题。" },
        { q: "你们提供中文服务吗？", a: "提供。我们的团队以中英文双语为您服务，确保沟通无障碍。" },
      ],
    },
    news: { eyebrow: "保持关注", title: "英国签证资讯，直达您的邮箱", sub: "不定期推送英国签证政策变化及实用提示。绝无垃圾邮件。", placeholder: "您的电子邮箱", btn: "订阅", done: "订阅成功，欢迎加入。" },
    finalCta: { title: "准备好开启您的英国签证之旅了吗？", sub: "立即预约免费评估。没有任何承诺，只有专业人士为您提供的清晰建议。" },
    requirements: {
      eyebrow: "材料清单", title: "英国签证材料清单", sub: "可用这些清单做准备。我们会在评估时确认适用于您具体签证类型的完整清单。",
      lists: [
        { title: "护照要求", items: ["在停留期内持续有效", "至少一页空白页", "如需要，提供旧护照", "护照资料页清晰复印件"] },
        { title: "资金材料", items: ["近期银行流水", "稳定收入证明", "如由他人资助，提供资助信", "如适用，存款证明"] },
        { title: "行程材料", items: ["行程安排及日期", "住宿信息", "回程或续程预订", "如有，出行记录"] },
        { title: "学历材料", items: ["CAS 或录取通知书", "学历证书", "成绩单", "英语考试成绩"] },
        { title: "辅助证明", items: ["在职或在读证明", "邀请函", "与母国的联系证明", "您签证类型所需的其他材料"] },
      ],
      ctaTitle: "不确定需要哪些材料？", ctaText: "预约免费评估，我们会为您的签证类型发送个性化清单。", ctaBtn: "预约免费评估",
    },
    about: {
      heroEyebrow: "关于我们", heroTitle: "连接中国与英国的桥梁", heroSub: "RedBridge 致力于让往返两国之间的人们，办理英国签证更安心、更清晰、更可靠。",
      storyEyebrow: "我们的故事", storyTitle: "全新顾问机构，让英国签证更清晰",
      p1: "RedBridge Visa Partners 是一家年轻的机构，致力于让英国签证申请更安心、更清晰。我们相信，申请人理应获得耐心、诚实的指导，而不是猜测和晦涩的术语，这正是我们努力提供的。",
      p2: "我们正处于起步阶段，对此我们坦然面对。我们或许经验尚浅，但以用心弥补：我们紧跟英国政策，核对每一个细节，把每位客户都视为关乎声誉的大事，因为现在确实如此。",
      whyTitle: "为何选择我们",
      why: ["价格清晰，绝无隐藏收费", "为您的案件配备专属顾问", "提供中英文双语服务", "每次递交前细致核对", "即使过往申请被拒也可协助"],
      valuesEyebrow: "客户至上", valuesTitle: "您的成功就是我们的成功",
      valuesText: "我们的每一个方案都从您的目标出发，而非套用模板。我们倾听，用通俗的语言解释您的选择，并陪伴您直到结果出来。您的信任，正是 RedBridge 存在的理由。",
    },
    contact: {
      heroEyebrow: "联系我们", heroTitle: "让我们开始您的申请", heroSub: "给我们留言或预约咨询。我们通常在一个工作日内回复。",
      formTitle: "预约咨询",
      name: "姓名", namePh: "您的姓名", email: "电子邮箱", phone: "电话", phonePh: "+44 或 +86",
      visa: "签证类型", visaOptions: ["学生签证", "旅游签证", "商务签证", "家庭或访客签证", "尚不确定"],
      message: "我们能帮您什么？", messagePh: "简单说说您的计划", send: "提交申请",
      formNote: "提交本表单即表示您同意我们就您的咨询与您联系。",
      successH: "谢谢您，{name}。", successText: "我们已收到您的请求。顾问将很快与您联系，安排免费评估。", another: "再发一条",
      reachTitle: "直接联系我们", phoneHours: "周一至周五 9:00 至 18:00", emailNote: "我们在一个工作日内回复",
      wa: "WhatsApp 在线咨询", waNote: "快速提问，快速解答",
      officeTitle: "办公地址", address: "英国伦敦 King William Street 24 号，EC4R 9AS", mapLabel: "RedBridge · 伦敦金融城",
    },
    footer: {
      blurb: "为申请英国签证的中国客户提供可靠指导，涵盖留学生、游客、商务人士及家庭。",
      services: "签证服务", company: "公司", touch: "联系方式",
      about: "关于我们", how: "办理流程", req: "材料清单", contact: "联系我们", waText: "WhatsApp 咨询",
      rights: "© {year} RedBridge Visa Partners 版权所有。",
      disclaimer: "独立运营的新成立签证协助机构。我们不是政府机构，也不签发签证。",
    },
    chat: { header: "RedBridge 客服", online: "在线", greeting: "您好，欢迎来到 RedBridge。今天有什么英国签证问题需要帮助？", reply: "谢谢。顾问会很快在此回复。如需更快回复，也可通过 WhatsApp 联系我们。", placeholder: "输入您的留言", wa: "WhatsApp 咨询" },
    britain: {
      eyebrow: "您的目的地", title: "英国正在等待您",
      sub: "从伦敦的地标到曼彻斯特的足球、爱丁堡的城堡，再到一份地道的炸鱼薯条，我们助您顺利抵达。",
      items: [
        { name: "伦敦", note: "大本钟、伦敦眼与塔桥。" },
        { name: "曼彻斯特", note: "闻名世界的足球与活力音乐文化。" },
        { name: "爱丁堡", note: "历史悠久的城堡与苏格兰高地。" },
        { name: "英式经典", note: "炸鱼薯条、温暖酒馆与英式下午茶。" },
      ],
    },
    unis: {
      eyebrow: "合作院校", title: "与中国顶尖高校的学子同行",
      sub: "我们为来自以下院校的暑期及留学项目学生提供支持。",
      note: "院校名称及其公开声誉仅供参考。项目合作通过我们的暑期计划对接安排。",
    },
    calc: {
      eyebrow: "提前规划", title: "我应该什么时候开始申请？",
      sub: "告诉我们您的出行日期与签证类型，我们会建议您何时开始准备、何时递交。",
      dateLabel: "您计划的出行日期", visaLabel: "签证类型", btn: "计算",
      startBy: "请在此日期前开始准备", submitBy: "请在此日期前递交申请", resultIntro: "出行日期为",
      tip: "以上为参考日期。审理时间会变化，请以 GOV.UK 最新信息为准，或预约免费评估，我们与您一同规划。",
      past: "请选择一个未来的日期。", soon: "该日期非常临近。请今天联系我们，我们会为您建议加急方案。",
      visas: ["旅游或访客签证", "学生签证", "商务签证", "家庭签证"],
    },
    scenarios: {
      eyebrow: "我们如何帮助", title: "示例情景",
      sub: "以下为我们可协助案件类型的示意性示例，并非真实客户记录。随着我们完成申请，真实的客户评价将在此呈现。",
      tag: "示意性示例",
      items: [
        { who: "硕士申请人，武汉", text: "首次申请因资金证明不清晰被拒。在类似情况下，我们会按 28 天规则重新整理银行流水，并重新递交一份清晰、证据充分的申请。" },
        { who: "探亲访客，成都", text: "访客申请因与母国联系薄弱被拒。我们会在重新申请前，加强工作、房产与家庭方面的证明。" },
        { who: "游客，杭州", text: "一份简单的度假申请，我们准备行程、资金与说明信，让案件从一开始就清晰明了。" },
      ],
      emptyTitle: "这里可以是您的评价",
      emptyText: "我们是全新的服务。随着我们服务首批客户，他们真实的评价将展示在此处。",
    },
    checklist: { btn: "下载材料清单（PDF）", note: "一份中英双语 PDF，涵盖各类签证所需材料与资金。" },
    gallery: { eyebrow: "英国掠影", title: "您旅程的目的地", captions: ["伦敦", "爱丁堡", "曼彻斯特", "英式经典"], note: "图片来自 Unsplash，可免费使用。您可随时替换为自己的照片。" },
  },
};

const SERVICE_ICONS = [GraduationCap, Plane, Briefcase, Users];
const STEP_ICONS = [ClipboardList, FileSearch, PenLine, Send, BadgeCheck];
const EXPECT_ICONS = [Clock, ShieldCheck, Users];
const BADGE_ICONS = [Users, Lock, Award];
const REQ_ICONS = [FileCheck, Briefcase, Plane, GraduationCap, ClipboardList];
const PROMISE_ICONS = [BadgeCheck, Award, Users];

const UNIS = [
  { en: "Zhejiang University", zh: "浙江大学", tagEn: "C9 League", tagZh: "C9 联盟" },
  { en: "Wuhan University", zh: "武汉大学", tagEn: "Top 10 elite", tagZh: "顶尖名校" },
  { en: "Huazhong University of Science & Technology", zh: "华中科技大学", tagEn: "Top 10 elite", tagZh: "顶尖名校" },
  { en: "Shanghai Jiao Tong University", zh: "上海交通大学", tagEn: "C9 League", tagZh: "C9 联盟" },
  { en: "Fudan University", zh: "复旦大学", tagEn: "C9 League", tagZh: "C9 联盟" },
  { en: "Tsinghua University", zh: "清华大学", tagEn: "C9 League", tagZh: "C9 联盟" },
  { en: "Peking University", zh: "北京大学", tagEn: "C9 League", tagZh: "C9 联盟" },
  { en: "Nanjing University", zh: "南京大学", tagEn: "C9 League", tagZh: "C9 联盟" },
  { en: "University of Science & Technology of China", zh: "中国科学技术大学", tagEn: "C9 League", tagZh: "C9 联盟" },
  { en: "Xi'an Jiaotong University", zh: "西安交通大学", tagEn: "C9 League", tagZh: "C9 联盟" },
];

/* ---- Original British landmark illustrations (no copyrighted imagery) ---- */
function BigBen({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="brit-ico" aria-hidden="true">
      <rect x="26" y="18" width="12" height="40" rx="1" />
      <polygon points="26,18 32,8 38,18" />
      <rect x="27.5" y="22" width="9" height="9" rx="1" className="brit-face" />
      <line x1="32" y1="26.5" x2="32" y2="24" /><line x1="32" y1="26.5" x2="34" y2="27.5" />
      <line x1="24" y1="58" x2="40" y2="58" />
    </svg>
  );
}
function Football({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="brit-ico" aria-hidden="true">
      <circle cx="32" cy="32" r="20" />
      <polygon points="32,24 39,29 36,37 28,37 25,29" className="brit-face" />
      <line x1="32" y1="12" x2="32" y2="24" /><line x1="49" y1="26" x2="39" y2="29" />
      <line x1="43" y1="48" x2="36" y2="37" /><line x1="21" y1="48" x2="28" y2="37" /><line x1="15" y1="26" x2="25" y2="29" />
    </svg>
  );
}
function Castle({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="brit-ico" aria-hidden="true">
      <path d="M14 56 V30 h6 v-6 h6 v6 h8 v-6 h6 v6 h6 v26 Z" />
      <rect x="28" y="44" width="8" height="12" className="brit-face" />
      <line x1="10" y1="56" x2="54" y2="56" />
    </svg>
  );
}
function FishChips({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="brit-ico" aria-hidden="true">
      <path d="M14 30 h36 l-4 22 a4 4 0 0 1 -4 3 h-20 a4 4 0 0 1 -4 -3 Z" />
      <line x1="24" y1="34" x2="22" y2="50" /><line x1="30" y1="34" x2="30" y2="50" /><line x1="36" y1="34" x2="38" y2="50" />
      <path d="M30 20 q10 -8 20 0 q-10 8 -20 0 Z" className="brit-face" />
      <circle cx="46" cy="20" r="1.4" className="brit-dot" />
    </svg>
  );
}
function Pint({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="brit-ico" aria-hidden="true">
      <path d="M22 26 h20 v26 a4 4 0 0 1 -4 4 h-12 a4 4 0 0 1 -4 -4 Z" />
      <path d="M42 30 h5 a4 4 0 0 1 4 4 v6 a4 4 0 0 1 -4 4 h-5" />
      <path d="M22 26 q2 -8 10 -8 q8 0 10 8 Z" className="brit-face" />
    </svg>
  );
}
function Bus({ size = 64 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className="brit-ico" aria-hidden="true">
      <rect x="10" y="20" width="44" height="26" rx="4" />
      <line x1="10" y1="30" x2="54" y2="30" />
      <rect x="14" y="33" width="8" height="8" className="brit-face" /><rect x="28" y="33" width="8" height="8" className="brit-face" /><rect x="42" y="33" width="8" height="8" className="brit-face" />
      <circle cx="20" cy="48" r="4" /><circle cx="44" cy="48" r="4" />
    </svg>
  );
}
const BRIT_ICONS = [BigBen, Football, Castle, Pint];

function Skyline() {
  return (
    <svg className="skyline" viewBox="0 0 1200 120" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <g className="skyline-g">
        <rect x="60" y="70" width="40" height="50" />
        <rect x="120" y="50" width="26" height="70" /><polygon points="120,50 133,34 146,50" />
        <circle cx="210" cy="66" r="30" fill="none" strokeWidth="3" /><circle cx="210" cy="66" r="4" />
        <rect x="300" y="40" width="34" height="80" /><rect x="306" y="30" width="22" height="12" />
        <path d="M400 120 V70 q40 -34 80 0 V120 Z" fill="none" strokeWidth="3" />
        <rect x="430" y="40" width="20" height="80" />
        <rect x="560" y="58" width="36" height="62" /><polygon points="560,58 578,40 596,58" />
        <path d="M680 120 V64 q26 -22 52 0 V120" fill="none" strokeWidth="3" />
        <rect x="780" y="46" width="30" height="74" /><rect x="786" y="36" width="18" height="10" />
        <circle cx="900" cy="70" r="26" fill="none" strokeWidth="3" />
        <rect x="980" y="56" width="40" height="64" />
        <rect x="1060" y="44" width="26" height="76" /><polygon points="1060,44 1073,30 1086,44" />
      </g>
    </svg>
  );
}

/* ---- Real UK photos (Unsplash, free licence) with graceful fallback ---- */
const GALLERY = [
  { img: "photo-1758543144598-9d954f44799a", Ico: BigBen, g: "linear-gradient(160deg,#8d1830,#6f1124)" },
  { img: "photo-1566037194426-1944346fc8d9", Ico: Castle, g: "linear-gradient(160deg,#2b0a12,#4a1020)" },
  { img: "photo-1657700819262-18792be64208", Ico: Football, g: "linear-gradient(160deg,#7C1326,#9E1B32)" },
  { img: "photo-1722105344016-0df8537c1799", Ico: FishChips, g: "linear-gradient(160deg,#a8842f,#7C1326)" },
];
function UKGallery() {
  const { t } = useLang();
  return (
    <section className="section section--paper">
      <div className="container">
        <Heading eyebrow={t.gallery.eyebrow} title={t.gallery.title} center />
        <div className="uk-gallery">
          {GALLERY.map((p, i) => {
            const Ico = p.Ico;
            return (
              <Reveal key={i} delay={i * 70} className="uk-photo">
                <div className="uk-photo-fallback" style={{ background: p.g }}><Ico size={72} /></div>
                <img src={`https://images.unsplash.com/${p.img}?auto=format&fit=crop&w=800&q=70`}
                     alt={t.gallery.captions[i]} loading="lazy"
                     onError={(e) => { e.currentTarget.style.display = "none"; }} />
                <span className="uk-photo-cap">{t.gallery.captions[i]}</span>
              </Reveal>
            );
          })}
        </div>
        <p className="uni-note">{t.gallery.note}</p>
      </div>
    </section>
  );
}


/* ============================ LANGUAGE CONTEXT ============================ */
const LangCtx = createContext(null);
const useLang = () => useContext(LangCtx);

function money(gbp, lang) {
  const cny = Math.round(gbp * GBP_TO_CNY);
  if (lang === "zh") return { main: `¥${cny}`, sub: `≈ £${gbp}` };
  return { main: `£${gbp}`, sub: `≈ ¥${cny}` };
}

/* ---------- Reusable pieces ---------- */
function Seal({ size = 56, characters = "红桥", title = "RedBridge seal" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={title} className="seal">
      <rect x="4" y="4" width="92" height="92" rx="14" className="seal-bg" />
      <rect x="11" y="11" width="78" height="78" rx="9" className="seal-inner" />
      <text x="50" y="38" className="seal-char" textAnchor="middle">{characters[0]}</text>
      <text x="50" y="76" className="seal-char" textAnchor="middle">{characters[1] || ""}</text>
    </svg>
  );
}
function Lattice({ className = "" }) {
  return (
    <svg className={`lattice ${className}`} viewBox="0 0 60 60" aria-hidden="true">
      <path d="M2 2 H40 M2 2 V40" /><path d="M2 14 H28 M14 2 V28" /><path d="M2 26 H16 M26 2 V16" />
    </svg>
  );
}
function Reveal({ children, delay = 0, as: Tag = "div", className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setShown(true); return; }
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.14 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${shown ? "is-in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</Tag>;
}
function Heading({ eyebrow, title, sub, light = false, center = false }) {
  return (
    <div className={`heading ${center ? "heading--center" : ""} ${light ? "heading--light" : ""}`}>
      {eyebrow && <span className="eyebrow"><span className="eyebrow-mark" />{eyebrow}</span>}
      <h2 className="h-title">{title}</h2>
      {sub && <p className="h-sub">{sub}</p>}
    </div>
  );
}
function Btn({ children, onClick, variant = "primary", full = false, href, type, ...rest }) {
  const cls = `btn btn--${variant} ${full ? "btn--full" : ""}`;
  if (href) return <a className={cls} href={href} {...rest}>{children}</a>;
  return <button className={cls} onClick={onClick} type={type || "button"} {...rest}>{children}</button>;
}

/* ============================ NAVBAR ============================ */
function Navbar({ page, go }) {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [shadow, setShadow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShadow(window.scrollY > 24);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const handle = (id) => { go(id); setOpen(false); };
  const items = ["home", "services", "pricing", "process", "requirements", "about", "contact"];
  const LangToggle = () => (
    <div className="lang-toggle" role="group" aria-label="Language">
      <button className={lang === "en" ? "is-active" : ""} onClick={() => setLang("en")} aria-pressed={lang === "en"}>EN</button>
      <button className={lang === "zh" ? "is-active" : ""} onClick={() => setLang("zh")} aria-pressed={lang === "zh"}>中文</button>
    </div>
  );
  return (
    <header className={`nav ${shadow ? "nav--shadow" : ""}`}>
      <div className="container nav-row">
        <button className="brand" onClick={() => handle("home")} aria-label="RedBridge home">
          <Seal size={42} />
          <span className="brand-text">
            <span className="brand-name">RedBridge</span>
            <span className="brand-tag">{t.brandTag}</span>
          </span>
        </button>
        <nav className="nav-links" aria-label="Primary">
          {items.map((id) => (
            <button key={id} className={`nav-link ${page === id ? "is-active" : ""}`} onClick={() => handle(id)} aria-current={page === id ? "page" : undefined}>
              {t.nav[id]}
            </button>
          ))}
        </nav>
        <div className="nav-cta">
          <LangToggle />
          <Btn variant="primary" onClick={() => handle("contact")}>{t.cta.start}</Btn>
        </div>
        <button className="nav-burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="nav-mobile">
          {items.map((id) => (
            <button key={id} className={`nav-mobile-link ${page === id ? "is-active" : ""}`} onClick={() => handle(id)}>{t.nav[id]}</button>
          ))}
          <div className="nav-mobile-cta">
            <LangToggle />
            <Btn variant="primary" full onClick={() => handle("contact")}>{t.cta.start}</Btn>
          </div>
        </div>
      )}
    </header>
  );
}

/* ============================ TRUST BADGES ============================ */
function TrustBadges() {
  const { t } = useLang();
  return (
    <div className="badges">
      {t.badges.map((b, i) => {
        const Ico = BADGE_ICONS[i];
        return (
          <Reveal key={i} delay={i * 90} className="badge">
            <span className="badge-ico"><Ico size={22} /></span>
            <div><p className="badge-title">{b.title}</p><p className="badge-text">{b.text}</p></div>
          </Reveal>
        );
      })}
    </div>
  );
}

/* ============================ PROCESS TIMELINE ============================ */
function ProcessTimeline({ light = false }) {
  const { t, lang } = useLang();
  return (
    <div className={`timeline ${light ? "timeline--light" : ""}`}>
      {t.process.steps.map((s, i) => {
        const Ico = STEP_ICONS[i];
        const label = lang === "zh" ? `${t.process.step} ${i + 1} 步` : `${t.process.step} ${i + 1}`;
        return (
          <Reveal key={i} delay={i * 90} className="tl-item">
            <div className="tl-marker">
              <span className="tl-ico"><Ico size={22} /></span>
              <span className="tl-step">{label}</span>
            </div>
            <div className="tl-body"><h3 className="tl-title">{s.title}</h3><p className="tl-text">{s.text}</p></div>
          </Reveal>
        );
      })}
    </div>
  );
}

/* ============================ PRICING ============================ */
function Pricing({ go }) {
  const { t, lang } = useLang();
  const priceKeys = ["general", "premium"];
  return (
    <section className="section section--paper">
      <div className="container">
        <Heading eyebrow={t.pricing.eyebrow} title={t.pricing.title} sub={t.pricing.sub} center />
        <div className="pricing-grid">
          {t.pricing.tiers.map((tier, i) => {
            const m = money(PRICES[priceKeys[i]], lang);
            const featured = i === 1;
            return (
              <Reveal key={i} delay={i * 100} className={`price-card ${featured ? "price-card--featured" : ""}`}>
                {tier.badge && <span className="price-badge">{tier.badge}</span>}
                <h3 className="price-name">{tier.name}</h3>
                <p className="price-tag-line">{tier.tagline}</p>
                <div className="price-amount">
                  <span className="price-main">{m.main}</span>
                  <span className="price-sub">{t.pricing.approx} {m.sub.replace("≈ ", "")}</span>
                </div>
                <span className="price-per">{t.pricing.per}</span>
                {tier.lawyer && <div className="price-lawyer"><Scale size={18} /><span>{tier.lawyer}</span></div>}
                <ul className="price-features">
                  {tier.features.map((f) => <li key={f}><Check size={16} />{f}</li>)}
                </ul>
                <Btn variant={featured ? "primary" : "ghost"} full onClick={() => go("contact")}>
                  {t.pricing.choose.replace("{plan}", tier.name)}
                </Btn>
              </Reveal>
            );
          })}
        </div>
        <p className="gov-note">{t.pricing.govNote}</p>
      </div>
    </section>
  );
}

/* ============================ TRACKING MOCKUP ============================ */
function TrackingMockup() {
  const { t } = useLang();
  const [ref, setRef] = useState("");
  const [result, setResult] = useState(null);
  const lookup = () => { if (!ref.trim()) return; setResult({ code: ref.trim().toUpperCase(), stage: 2 }); };
  return (
    <Reveal className="track card">
      <div className="track-input">
        <label className="field track-field">
          <span>{t.track.label}</span>
          <div className="track-row">
            <input value={ref} onChange={(e) => setRef(e.target.value)} placeholder={t.track.placeholder} aria-label={t.track.label} />
            <Btn variant="primary" onClick={lookup}><Search size={16} /> {t.track.btn}</Btn>
          </div>
        </label>
        <p className="form-note">{t.track.demoNote}</p>
      </div>
      {result && (
        <div className="track-result">
          <div className="track-meta">
            <span className="track-code">{result.code}</span>
            <span className="track-type">{t.track.demoType}</span>
          </div>
          <div className="track-steps">
            {t.track.stages.map((s, i) => (
              <div key={i} className={`track-step ${i <= result.stage ? "is-done" : ""} ${i === result.stage ? "is-current" : ""}`}>
                <span className="track-dot">{i < result.stage ? <Check size={14} /> : i + 1}</span>
                <span className="track-lbl">{s}</span>
              </div>
            ))}
          </div>
          <p className="track-status"><Clock size={15} /> {t.track.statusPre} <strong>{t.track.stages[result.stage]}</strong>. {t.track.statusPost}</p>
        </div>
      )}
    </Reveal>
  );
}

/* ============================ PROMISE (was testimonials) ============================ */
function Promise() {
  const { t } = useLang();
  return (
    <section className="section section--cream">
      <div className="container">
        <Heading eyebrow={t.promise.eyebrow} title={t.promise.title} sub={t.promise.sub} center />
        <div className="grid grid-3">
          {t.promise.cards.map((r, i) => {
            const Ico = PROMISE_ICONS[i];
            return (
              <Reveal key={i} delay={i * 90} className="card review-card">
                <span className="review-seal"><Seal size={40} characters="承诺" title="Promise seal" /></span>
                <span className="svc-ico"><Ico size={24} /></span>
                <h3 className="svc-name">{r.title}</h3>
                <p className="svc-blurb">{r.text}</p>
              </Reveal>
            );
          })}
        </div>
        <p className="founding-note">{t.promise.note}</p>
      </div>
    </section>
  );
}

/* ============================ CHECKLIST DOWNLOAD BUTTON ============================ */
function ChecklistButton({ variant = "gold" }) {
  const { t } = useLang();
  return (
    <a className={`btn btn--${variant}`} href="redbridge-uk-visa-checklist.pdf" download>
      <FileCheck size={18} /> {t.checklist.btn}
    </a>
  );
}

/* ============================ UNIVERSITIES ============================ */
function Universities() {
  const { t, lang } = useLang();
  return (
    <section className="section section--paper">
      <div className="container">
        <Heading eyebrow={t.unis.eyebrow} title={t.unis.title} sub={t.unis.sub} center />
        <div className="uni-grid">
          {UNIS.map((u, i) => (
            <Reveal key={i} delay={(i % 5) * 60} className="uni-card">
              <span className="uni-mark">{(lang === "zh" ? u.zh : u.en).slice(0, 1)}</span>
              <div className="uni-body">
                <p className="uni-name">{lang === "zh" ? u.zh : u.en}</p>
                <span className="uni-tag">{lang === "zh" ? u.tagZh : u.tagEn}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="uni-note">{t.unis.note}</p>
      </div>
    </section>
  );
}

/* ============================ BRITAIN / DESTINATION ============================ */
function Britain() {
  const { t } = useLang();
  return (
    <section className="section section--brit">
      <div className="container">
        <Heading eyebrow={t.britain.eyebrow} title={t.britain.title} sub={t.britain.sub} light center />
        <div className="grid grid-4 brit-grid">
          {t.britain.items.map((it, i) => {
            const Ico = BRIT_ICONS[i];
            return (
              <Reveal key={i} delay={i * 80} className="brit-card">
                <span className="brit-ico-wrap"><Ico size={56} /></span>
                <h3 className="brit-name">{it.name}</h3>
                <p className="brit-note">{it.note}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
      <Skyline />
    </section>
  );
}

/* ============================ TIMING CALCULATOR ============================ */
function TimingCalculator({ hero = false }) {
  const { t, lang } = useLang();
  const [date, setDate] = useState("");
  const [visa, setVisa] = useState(0);
  const [out, setOut] = useState(null);
  const plans = [[8, 4], [12, 5], [8, 4], [9, 4]];

  const isoDate = (d) => d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const fmt = (d) => d.toLocaleDateString(lang === "zh" ? "zh-CN" : "en-GB", { year: "numeric", month: "long", day: "numeric" });

  const gcalUrl = (title, dateObj, description = "") => {
    const start = isoDate(dateObj);
    const end = isoDate(new Date(dateObj.getTime() + 60 * 60 * 1000));
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&details=${encodeURIComponent(description)}`;
  };

  const calc = () => {
    if (!date) return;
    const travel = new Date(date + "T00:00:00");
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (travel <= today) { setOut({ error: t.calc.past }); return; }
    const [prepW, subW] = plans[visa];
    const startD = new Date(travel); startD.setDate(startD.getDate() - prepW * 7);
    const submitD = new Date(travel); submitD.setDate(submitD.getDate() - subW * 7);
    const soon = startD <= today;
    const visaName = t.calc.visas[visa];
    setOut({
      travel: fmt(travel), travelD: travel,
      start: fmt(startD < today ? today : startD), startD: startD < today ? today : startD,
      submit: fmt(submitD < today ? today : submitD), submitD: submitD < today ? today : submitD,
      soon, visaName
    });
  };

  const CalBtn = ({ dateObj, label, desc }) => (
    <a
      href={gcalUrl(label, dateObj, desc)}
      target="_blank" rel="noreferrer"
      className="cal-btn"
      title={lang === "zh" ? "添加到 Google 日历" : "Add to Google Calendar"}
    >
      <CalendarClock size={15} />
      {lang === "zh" ? "加入日历" : "Add to calendar"}
    </a>
  );

  const sectionClass = hero ? "section section--calc-hero" : "section section--cream";

  return (
    <section className={sectionClass}>
      <div className="container">
        {!hero && <Heading eyebrow={t.calc.eyebrow} title={t.calc.title} sub={t.calc.sub} center />}
        {hero && (
          <div className="calc-hero-head">
            <span className="eyebrow"><span className="eyebrow-mark" />{t.calc.eyebrow}</span>
            <h2 className="calc-hero-title">{t.calc.title}</h2>
            <p className="calc-hero-sub">{t.calc.sub}</p>
          </div>
        )}
        <Reveal className="calc card">
          <div className="calc-inputs">
            <label className="field"><span>{t.calc.dateLabel}</span><input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
            <label className="field"><span>{t.calc.visaLabel}</span>
              <select value={visa} onChange={(e) => setVisa(Number(e.target.value))}>
                {t.calc.visas.map((v, i) => <option key={v} value={i}>{v}</option>)}
              </select>
            </label>
            <Btn variant="primary" onClick={calc}><CalendarClock size={18} /> {t.calc.btn}</Btn>
          </div>
          {out && (out.error ? <p className="calc-error">{out.error}</p> : (
            <div className="calc-result">
              <p className="calc-intro">{t.calc.resultIntro} <strong>{out.travel}</strong></p>
              <div className="calc-dates">
                <div className="calc-date">
                  <span className="calc-date-lbl">{t.calc.startBy}</span>
                  <span className="calc-date-val">{out.start}</span>
                  <CalBtn
                    dateObj={out.startD}
                    label={lang === "zh" ? `开始准备 ${out.visaName} 材料` : `Start preparing: ${out.visaName}`}
                    desc={lang === "zh" ? `为您前往英国的签证申请（出行日期：${out.travel}）开始整理材料。` : `Begin gathering documents for your UK ${out.visaName} application. Travel date: ${out.travel}.`}
                  />
                </div>
                <ArrowRight size={20} className="calc-arrow" />
                <div className="calc-date">
                  <span className="calc-date-lbl">{t.calc.submitBy}</span>
                  <span className="calc-date-val">{out.submit}</span>
                  <CalBtn
                    dateObj={out.submitD}
                    label={lang === "zh" ? `递交 ${out.visaName} 申请截止` : `Submit ${out.visaName} — deadline`}
                    desc={lang === "zh" ? `您的英国签证申请应在此日期前递交（出行日期：${out.travel}）。` : `Your UK ${out.visaName} application should be submitted by this date. Travel date: ${out.travel}.`}
                  />
                </div>
              </div>
              {out.soon && <p className="calc-soon">{t.calc.soon}</p>}
              <p className="calc-tip">{t.calc.tip}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ SCENARIOS (illustrative) ============================ */
function Scenarios() {
  const { t } = useLang();
  return (
    <section className="section">
      <div className="container">
        <Heading eyebrow={t.scenarios.eyebrow} title={t.scenarios.title} sub={t.scenarios.sub} center />
        <div className="grid grid-3">
          {t.scenarios.items.map((s, i) => (
            <Reveal key={i} delay={i * 80} className="card scenario-card">
              <span className="scenario-tag">{t.scenarios.tag}</span>
              <p className="scenario-who">{s.who}</p>
              <p className="svc-blurb">{s.text}</p>
            </Reveal>
          ))}
          <Reveal delay={240} className="card scenario-empty">
            <span className="review-seal"><Seal size={40} characters="期待" title="Awaiting reviews" /></span>
            <h3 className="svc-name">{t.scenarios.emptyTitle}</h3>
            <p className="svc-blurb">{t.scenarios.emptyText}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================ FAQ ============================ */
function FAQ() {
  const { t } = useLang();
  const [open, setOpen] = useState(0);
  return (
    <section className="section">
      <div className="container faq-wrap">
        <Heading eyebrow={t.faq.eyebrow} title={t.faq.title} center />
        <div className="faq-list">
          {t.faq.items.map((f, i) => (
            <Reveal key={i} delay={i * 50} className={`faq-item ${open === i ? "is-open" : ""}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{f.q}</span><ChevronDown size={20} className="faq-chev" />
              </button>
              <div className="faq-a" style={{ maxHeight: open === i ? 300 : 0 }}><p>{f.a}</p></div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================ NEWSLETTER ============================ */
function Newsletter() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="section section--navy">
      <div className="container news-wrap">
        <div className="news-text">
          <Heading eyebrow={t.news.eyebrow} title={t.news.title} light />
          <p className="news-sub">{t.news.sub}</p>
        </div>
        {done ? (
          <p className="news-done"><BadgeCheck size={20} /> {t.news.done}</p>
        ) : (
          <div className="news-form">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.news.placeholder} aria-label={t.news.placeholder} type="email" />
            <Btn variant="gold" onClick={() => email && setDone(true)}>{t.news.btn}</Btn>
          </div>
        )}
      </div>
    </section>
  );
}

/* ============================ PAGE HERO + CTA ============================ */
function PageHero({ eyebrow, title, sub }) {
  return (
    <section className="page-hero">
      <div className="hero-pattern" aria-hidden="true" />
      <div className="container page-hero-inner">
        <Reveal><span className="hero-eyebrow"><span className="eyebrow-mark" />{eyebrow}</span></Reveal>
        <Reveal delay={80} as="h1"><h1 className="page-hero-title">{title}</h1></Reveal>
        <Reveal delay={160}><p className="page-hero-sub">{sub}</p></Reveal>
      </div>
    </section>
  );
}
function CTASection({ go }) {
  const { t } = useLang();
  return (
    <section className="section cta-band">
      <div className="container cta-inner">
        <Reveal>
          <Seal size={64} />
          <h2 className="cta-title">{t.finalCta.title}</h2>
          <p className="cta-sub">{t.finalCta.sub}</p>
          <div className="hero-cta hero-cta--center">
            <Btn variant="primary" onClick={() => go("contact")}>{t.hero.start} <ArrowRight size={18} /></Btn>
            <Btn variant="gold" onClick={() => go("contact")}>{t.hero.book}</Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ HOME ============================ */
function Home({ go }) {
  const { t } = useLang();
  return (
    <main>
      <section className="hero">
        <div className="hero-pattern" aria-hidden="true" />
        <div className="hero-seal-watermark" aria-hidden="true"><Seal size={420} /></div>
        <div className="container hero-inner">
          <Reveal><span className="hero-eyebrow"><span className="eyebrow-mark" />{t.hero.eyebrow}</span></Reveal>
          <Reveal delay={80} as="h1"><h1 className="hero-title">{t.hero.title}</h1></Reveal>
          <Reveal delay={160}><p className="hero-sub">{t.hero.sub}</p></Reveal>
          <Reveal delay={240}>
            <div className="hero-cta">
              <Btn variant="primary" onClick={() => go("contact")}>{t.hero.start} <ArrowRight size={18} /></Btn>
              <Btn variant="gold" onClick={() => go("contact")}>{t.hero.book}</Btn>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="hero-promises">
              <span className="promise"><CalendarClock size={18} /> {t.hero.promises[0]}</span>
              <span className="promise"><Award size={18} /> {t.hero.promises[1]}</span>
              <span className="promise"><MessageCircle size={18} /> {t.hero.promises[2]}</span>
            </div>
          </Reveal>
          <Reveal delay={380}><div className="hero-download"><ChecklistButton variant="ghost-light" /></div></Reveal>
        </div>
      </section>

      <TimingCalculator hero />

      <section className="section section--paper"><div className="container"><TrustBadges /></div></section>

      <section className="section">
        <div className="container">
          <Heading eyebrow={t.svcOverview.eyebrow} title={t.svcOverview.title} sub={t.svcOverview.sub} center />
          <div className="grid grid-4">
            {t.services.map((s, i) => {
              const Ico = SERVICE_ICONS[i];
              return (
                <Reveal key={i} delay={i * 80} className="card svc-card">
                  <Lattice className="lattice--tl" />
                  <span className="svc-ico"><Ico size={26} /></span>
                  <h3 className="svc-name">{s.name}</h3>
                  <p className="svc-blurb">{s.blurb}</p>
                  <button className="link-arrow" onClick={() => go("services")}>{t.cta.learn} <ArrowRight size={16} /></button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <Universities />
      <Britain />
      <UKGallery />

      <section className="section section--navy">
        <div className="container">
          <Heading eyebrow={t.process.previewEyebrow} title={t.process.previewTitle} light center />
          <ProcessTimeline light />
          <div className="center-cta"><Btn variant="gold" onClick={() => go("process")}>{t.process.seeFull}</Btn></div>
        </div>
      </section>

      <Pricing go={go} />

      <section className="section section--cream">
        <div className="container">
          <Heading eyebrow={t.track.eyebrow} title={t.track.title} sub={t.track.sub} center />
          <TrackingMockup />
        </div>
      </section>

      <Promise />
      <Scenarios />
      <FAQ />
      <Newsletter />
      <CTASection go={go} />
    </main>
  );
}

/* ============================ SERVICES PAGE ============================ */
function ServicesPage({ go }) {
  const { t } = useLang();
  return (
    <main>
      <PageHero eyebrow={t.svcPage.eyebrow} title={t.svcPage.title} sub={t.svcPage.sub} />
      <section className="section">
        <div className="container svc-stack">
          {t.services.map((s, i) => {
            const Ico = SERVICE_ICONS[i];
            return (
              <Reveal key={i} className="svc-block">
                <div className="svc-block-head">
                  <span className="svc-block-ico"><Ico size={28} /></span>
                  <div><h2 className="svc-block-name">{s.name}</h2><p className="svc-block-blurb">{s.blurb}</p></div>
                  <span className="svc-block-no">0{i + 1}</span>
                </div>
                <div className="svc-block-body">
                  <div className="svc-col">
                    <h4 className="svc-col-title">{t.svcCols.who}</h4>
                    <ul className="tick-list">{s.points.map((p) => <li key={p}><Check size={16} />{p}</li>)}</ul>
                  </div>
                  <div className="svc-col">
                    <h4 className="svc-col-title">{t.svcCols.req}</h4>
                    <ul className="tick-list">{s.requirements.map((p) => <li key={p}><FileCheck size={16} />{p}</li>)}</ul>
                  </div>
                  <div className="svc-col">
                    <h4 className="svc-col-title">{t.svcCols.steps}</h4>
                    <ol className="step-list">{s.steps.map((p, n) => <li key={p}><span className="step-no">{n + 1}</span>{p}</li>)}</ol>
                  </div>
                </div>
                <div className="svc-block-foot">
                  <Btn variant="primary" onClick={() => go("contact")}>{t.cta.apply} <ArrowRight size={16} /></Btn>
                  <button className="link-arrow" onClick={() => go("requirements")}>{t.cta.checklist} <ArrowRight size={16} /></button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
      <Universities />
      <Pricing go={go} />
      <CTASection go={go} />
    </main>
  );
}

/* ============================ PRICING PAGE ============================ */
function PricingPage({ go }) {
  const { t } = useLang();
  return (
    <main>
      <PageHero eyebrow={t.pricing.eyebrow} title={t.pricing.title} sub={t.pricing.sub} />
      <Pricing go={go} />
      <FAQ />
      <CTASection go={go} />
    </main>
  );
}

/* ============================ PROCESS PAGE ============================ */
function ProcessPage({ go }) {
  const { t } = useLang();
  return (
    <main>
      <PageHero eyebrow={t.process.heroEyebrow} title={t.process.heroTitle} sub={t.process.heroSub} />
      <section className="section"><div className="container"><ProcessTimeline /></div></section>
      <section className="section section--paper">
        <div className="container">
          <Heading eyebrow={t.process.expectEyebrow} title={t.process.expectTitle} center />
          <div className="grid grid-3">
            {t.process.expect.map((c, i) => {
              const Ico = EXPECT_ICONS[i];
              return (
                <Reveal key={i} delay={i * 80} className="card mini-card">
                  <span className="svc-ico"><Ico size={24} /></span>
                  <h3 className="svc-name">{c.t}</h3>
                  <p className="svc-blurb">{c.d}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <TimingCalculator />
      <CTASection go={go} />
    </main>
  );
}

/* ============================ REQUIREMENTS PAGE ============================ */
function RequirementsPage({ go }) {
  const { t } = useLang();
  return (
    <main>
      <PageHero eyebrow={t.requirements.eyebrow} title={t.requirements.title} sub={t.requirements.sub} />
      <section className="section">
        <div className="container">
          <div className="download-band">
            <div><h3 className="check-title">{t.checklist.btn}</h3><p className="svc-blurb">{t.checklist.note}</p></div>
            <ChecklistButton variant="primary" />
          </div>
          <div className="grid grid-2 check-grid">
            {t.requirements.lists.map((c, i) => {
              const Ico = REQ_ICONS[i];
              return (
                <Reveal key={i} delay={i * 70} className="card check-card">
                  <div className="check-head"><span className="svc-ico"><Ico size={22} /></span><h3 className="check-title">{c.title}</h3></div>
                  <ul className="check-list">{c.items.map((it) => <li key={it}><span className="check-box"><Check size={14} /></span>{it}</li>)}</ul>
                </Reveal>
              );
            })}
            <Reveal delay={t.requirements.lists.length * 70} className="card check-card check-card--cta">
              <h3 className="check-title">{t.requirements.ctaTitle}</h3>
              <p className="svc-blurb">{t.requirements.ctaText}</p>
              <Btn variant="primary" onClick={() => go("contact")}>{t.requirements.ctaBtn}</Btn>
            </Reveal>
          </div>
        </div>
      </section>
      <TimingCalculator />
      <CTASection go={go} />
    </main>
  );
}

/* ============================ ABOUT PAGE ============================ */
function AboutPage({ go }) {
  const { t } = useLang();
  return (
    <main>
      <PageHero eyebrow={t.about.heroEyebrow} title={t.about.heroTitle} sub={t.about.heroSub} />
      <section className="section">
        <div className="container about-grid">
          <Reveal className="about-story">
            <Heading eyebrow={t.about.storyEyebrow} title={t.about.storyTitle} />
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <div className="about-mini-stats">
              <span className="promise promise--dark"><CalendarClock size={18} /> {t.hero.promises[0]}</span>
              <span className="promise promise--dark"><Award size={18} /> {t.hero.promises[1]}</span>
              <span className="promise promise--dark"><MessageCircle size={18} /> {t.hero.promises[2]}</span>
            </div>
          </Reveal>
          <Reveal delay={120} className="about-why card">
            <Lattice className="lattice--tl" />
            <h3 className="check-title">{t.about.whyTitle}</h3>
            <ul className="tick-list">{t.about.why.map((w) => <li key={w}><Check size={16} />{w}</li>)}</ul>
          </Reveal>
        </div>
      </section>
      <UKGallery />
      <section className="section section--navy">
        <div className="container values-row">
          <Heading eyebrow={t.about.valuesEyebrow} title={t.about.valuesTitle} light />
          <p className="values-text">{t.about.valuesText}</p>
        </div>
      </section>
      <CTASection go={go} />
    </main>
  );
}

/* ============================ CONTACT PAGE ============================ */
function ContactPage() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", phone: "", visa: t.contact.visaOptions[0], message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = () => { if (!form.name || !form.email) return; setSent(true); };
  return (
    <main>
      <PageHero eyebrow={t.contact.heroEyebrow} title={t.contact.heroTitle} sub={t.contact.heroSub} />
      <section className="section">
        <div className="container contact-grid">
          <Reveal className="contact-form card">
            <Lattice className="lattice--tl" />
            <h3 className="check-title">{t.contact.formTitle}</h3>
            {sent ? (
              <div className="form-success">
                <span className="success-ico"><BadgeCheck size={40} /></span>
                <h4>{t.contact.successH.replace("{name}", form.name.split(" ")[0] || "")}</h4>
                <p>{t.contact.successText}</p>
                <Btn variant="ghost" onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", visa: t.contact.visaOptions[0], message: "" }); }}>{t.contact.another}</Btn>
              </div>
            ) : (
              <div className="form">
                <label className="field"><span>{t.contact.name}</span><input value={form.name} onChange={set("name")} placeholder={t.contact.namePh} autoComplete="name" /></label>
                <div className="field-row">
                  <label className="field"><span>{t.contact.email}</span><input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" autoComplete="email" /></label>
                  <label className="field"><span>{t.contact.phone}</span><input value={form.phone} onChange={set("phone")} placeholder={t.contact.phonePh} autoComplete="tel" /></label>
                </div>
                <label className="field"><span>{t.contact.visa}</span>
                  <select value={form.visa} onChange={set("visa")}>{t.contact.visaOptions.map((o) => <option key={o}>{o}</option>)}</select>
                </label>
                <label className="field"><span>{t.contact.message}</span><textarea rows={4} value={form.message} onChange={set("message")} placeholder={t.contact.messagePh} /></label>
                <Btn variant="primary" full onClick={submit}>{t.contact.send} <Send size={16} /></Btn>
                <p className="form-note">{t.contact.formNote}</p>
              </div>
            )}
          </Reveal>
          <Reveal delay={120} className="contact-aside">
            <div className="card contact-info">
              <h3 className="check-title">{t.contact.reachTitle}</h3>
              <a className="contact-line" href="tel:+442071234567"><span className="contact-ico"><Phone size={18} /></span><span><strong>+44 20 7123 4567</strong><br />{t.contact.phoneHours}</span></a>
              <a className="contact-line" href="mailto:hello@redbridgevisa.co.uk"><span className="contact-ico"><Mail size={18} /></span><span><strong>hello@redbridgevisa.co.uk</strong><br />{t.contact.emailNote}</span></a>
              <a className="contact-line" href="https://wa.me/442071234567" target="_blank" rel="noreferrer"><span className="contact-ico contact-ico--wa"><MessageCircle size={18} /></span><span><strong>{t.contact.wa}</strong><br />{t.contact.waNote}</span></a>
            </div>
            <div className="card office-card">
              <h3 className="check-title">{t.contact.officeTitle}</h3>
              <p className="office-addr"><MapPin size={16} /> {t.contact.address}</p>
              <div className="map-mock" role="img" aria-label={t.contact.mapLabel}>
                <div className="map-grid" /><span className="map-pin"><MapPin size={28} /></span>
                <span className="map-label">{t.contact.mapLabel}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

/* ============================ FOOTER ============================ */
function Footer({ go }) {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand">
            <Seal size={44} />
            <span className="brand-text"><span className="brand-name brand-name--light">RedBridge</span><span className="brand-tag brand-tag--light">{t.brandTag}</span></span>
          </div>
          <p className="footer-blurb">{t.footer.blurb}</p>
        </div>
        <div className="footer-col">
          <h4>{t.footer.services}</h4>
          {t.services.map((s, i) => <button key={i} onClick={() => go("services")}>{s.name.replace(" Assistance", "").replace("协助", "")}</button>)}
        </div>
        <div className="footer-col">
          <h4>{t.footer.company}</h4>
          <button onClick={() => go("about")}>{t.footer.about}</button>
          <button onClick={() => go("process")}>{t.footer.how}</button>
          <button onClick={() => go("requirements")}>{t.footer.req}</button>
          <button onClick={() => go("contact")}>{t.footer.contact}</button>
        </div>
        <div className="footer-col">
          <h4>{t.footer.touch}</h4>
          <a href="tel:+442071234567">+44 20 7123 4567</a>
          <a href="mailto:hello@redbridgevisa.co.uk">hello@redbridgevisa.co.uk</a>
          <a href="https://wa.me/442071234567" target="_blank" rel="noreferrer">{t.footer.waText}</a>
          <span className="footer-addr">{t.contact.address}</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>{t.footer.rights.replace("{year}", new Date().getFullYear())}</span>
        <span className="footer-disclaimer">{t.footer.disclaimer}</span>
      </div>
    </footer>
  );
}

/* ============================ FLOATING ACTIONS ============================ */
function FloatingActions() {
  const { t } = useLang();
  const [chat, setChat] = useState(false);
  const [msg, setMsg] = useState("");
  const [log, setLog] = useState([{ from: "bot", text: t.chat.greeting }]);
  useEffect(() => { setLog([{ from: "bot", text: t.chat.greeting }]); }, [t]);
  const send = () => {
    if (!msg.trim()) return;
    const mine = msg.trim();
    setLog((l) => [...l, { from: "me", text: mine }]); setMsg("");
    setTimeout(() => setLog((l) => [...l, { from: "bot", text: t.chat.reply }]), 700);
  };
  return (
    <>
      <a className="fab fab--wa" href="https://wa.me/442071234567" target="_blank" rel="noreferrer" aria-label={t.chat.wa}><MessageCircle size={24} /></a>
      <button className="fab fab--chat" onClick={() => setChat(!chat)} aria-label={chat ? "Close live chat" : "Open live chat"}>
        {chat ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
      {chat && (
        <div className="chat-panel" role="dialog" aria-label={t.chat.header}>
          <div className="chat-head">
            <Seal size={30} />
            <div><strong>{t.chat.header}</strong><span className="chat-status"><span className="dot" /> {t.chat.online}</span></div>
          </div>
          <div className="chat-log">{log.map((m, i) => <div key={i} className={`chat-msg chat-msg--${m.from}`}>{m.text}</div>)}</div>
          <div className="chat-input">
            <input value={msg} onChange={(e) => setMsg(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder={t.chat.placeholder} aria-label={t.chat.placeholder} />
            <button onClick={send} aria-label="Send message"><Send size={18} /></button>
          </div>
        </div>
      )}
    </>
  );
}

/* ============================ ROOT APP ============================ */
export default function App() {
  const [lang, setLang] = useState("zh");
  const [page, setPage] = useState("home");
  const t = T[lang];
  const go = (id) => setPage(id);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, [page]);
  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    const base = "RedBridge Visa Partners";
    document.title = page === "home" ? `${base} | ${lang === "zh" ? "英国签证申请协助" : "UK Visa Application Assistance"}` : `${t.nav[page]} | ${base}`;
  }, [page, lang, t]);

  return (
    <LangCtx.Provider value={{ lang, setLang, t }}>
      <div className="rb-root">
        <Styles />
        <a className="skip-link" href="#main-content">{t.skip}</a>
        <Navbar page={page} go={go} />
        <div id="main-content">
          {page === "home" && <Home go={go} />}
          {page === "services" && <ServicesPage go={go} />}
          {page === "pricing" && <PricingPage go={go} />}
          {page === "process" && <ProcessPage go={go} />}
          {page === "requirements" && <RequirementsPage go={go} />}
          {page === "about" && <AboutPage go={go} />}
          {page === "contact" && <ContactPage />}
        </div>
        <Footer go={go} />
        <FloatingActions />
      </div>
    </LangCtx.Provider>
  );
}

/* ============================ STYLES ============================ */
function Styles() {
  return (
    <style>{`
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Serif+SC:wght@600;700&family=Noto+Sans+SC:wght@400;500;600;700&display=swap');

:root{
  --red:#9E1B32; --red-deep:#7C1326; --red-soft:#b83a52; --red-bright:#b21e3a;
  --navy:#2b0a12; --navy-2:#13294f; --gold:#C8A24A; --gold-soft:#e0c98c; --gold-deep:#a8842f;
  --plum:#2b0a12; --plum-2:#4a1020;
  --paper:#FBFAF6; --cream:#F6EBE6; --ink:#2a131a; --muted:#6a5358;
  --line:rgba(43,10,18,.12); --line-light:rgba(255,255,255,.16);
  --shadow:0 18px 50px -24px rgba(43,10,18,.32); --radius:18px;
}
*{box-sizing:border-box}
.rb-root{font-family:'Plus Jakarta Sans','Noto Sans SC',system-ui,sans-serif;color:var(--ink);background:var(--paper);line-height:1.65;-webkit-font-smoothing:antialiased;overflow-x:hidden}
.rb-root svg{display:block;max-width:100%}
button{font-family:inherit;cursor:pointer;border:none;background:none}
a{color:inherit;text-decoration:none}
h1,h2,h3,h4{font-family:'Noto Serif','Noto Serif SC',Georgia,serif;line-height:1.18;letter-spacing:-.01em;margin:0}
p{margin:0}
ul,ol{margin:0;padding:0;list-style:none}
.container{width:100%;max-width:1180px;margin:0 auto;padding:0 24px}
.section{padding:88px 0}
.section--paper{background:var(--paper)}
.section--cream{background:var(--cream)}
.section--navy{background:linear-gradient(160deg,var(--plum),var(--plum-2));color:#fff;position:relative;overflow:hidden}
.skip-link{position:absolute;left:-9999px;top:0;z-index:200;background:var(--red);color:#fff;padding:10px 16px;border-radius:0 0 10px 0}
.skip-link:focus{left:0}
.rb-root :focus-visible{outline:3px solid var(--gold);outline-offset:2px;border-radius:6px}

.seal .seal-bg{fill:var(--red)}
.seal .seal-inner{fill:none;stroke:var(--gold-soft);stroke-width:2.4;opacity:.85}
.seal .seal-char{fill:#fff;font-family:'Noto Serif SC','Noto Serif',serif;font-weight:700;font-size:34px}
.lattice{position:absolute;width:50px;height:50px;stroke:var(--gold);stroke-width:1.3;fill:none;opacity:.55;pointer-events:none}
.lattice--tl{top:14px;left:14px}

.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;font-weight:600;font-size:.95rem;padding:13px 22px;border-radius:12px;transition:transform .18s ease,box-shadow .2s ease,background .2s ease,color .2s ease;white-space:nowrap}
.btn--full{width:100%}
.btn--primary{background:var(--red);color:#fff;box-shadow:0 10px 24px -10px rgba(158,27,50,.6)}
.btn--primary:hover{background:var(--red-deep);transform:translateY(-2px)}
.btn--gold{background:var(--gold);color:var(--navy);box-shadow:0 10px 24px -12px rgba(200,162,74,.7)}
.btn--gold:hover{background:var(--gold-soft);transform:translateY(-2px)}
.btn--ghost{background:transparent;color:var(--navy);border:1.5px solid var(--line)}
.btn--ghost:hover{border-color:var(--navy);transform:translateY(-1px)}

.reveal{opacity:0;transform:translateY(22px);transition:opacity .7s cubic-bezier(.2,.7,.2,1),transform .7s cubic-bezier(.2,.7,.2,1)}
.reveal.is-in{opacity:1;transform:none}

.heading{max-width:680px;margin-bottom:46px}
.heading--center{margin-left:auto;margin-right:auto;text-align:center}
.heading--light .h-title{color:#fff}
.heading--light .h-sub{color:rgba(255,255,255,.78)}
.eyebrow{display:inline-flex;align-items:center;gap:10px;font-family:'Plus Jakarta Sans','Noto Sans SC';font-weight:700;font-size:.74rem;letter-spacing:.16em;text-transform:uppercase;color:var(--red);margin-bottom:18px}
.heading--light .eyebrow{color:var(--gold-soft)}
.eyebrow-mark{width:26px;height:2px;background:var(--gold)}
.h-title{font-size:clamp(1.9rem,3.4vw,2.7rem);font-weight:600;color:var(--navy)}
.h-sub{margin-top:16px;font-size:1.05rem;color:var(--muted)}

.nav{position:sticky;top:0;z-index:100;background:rgba(251,250,246,.9);backdrop-filter:blur(12px);transition:box-shadow .3s ease}
.nav--shadow{box-shadow:0 1px 0 var(--line),0 8px 30px -20px rgba(11,28,58,.4)}
.nav-row{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:12px 0}
.brand{display:inline-flex;align-items:center;gap:12px}
.brand-text{display:flex;flex-direction:column;line-height:1}
.brand-name{font-family:'Noto Serif',serif;font-weight:700;font-size:1.32rem;color:var(--navy);letter-spacing:-.02em}
.brand-tag{font-size:.66rem;letter-spacing:.22em;text-transform:uppercase;color:var(--red);font-weight:700;margin-top:3px}
.brand-name--light{color:#fff}
.brand-tag--light{color:var(--gold-soft)}
.nav-links{display:flex;align-items:center;gap:2px}
.nav-link{font-size:.9rem;font-weight:600;color:var(--ink);padding:9px 11px;border-radius:9px;transition:color .2s}
.nav-link:hover{color:var(--red)}
.nav-link.is-active{color:var(--red)}
.nav-link.is-active::after{content:"";display:block;width:18px;height:2px;background:var(--gold);margin:4px auto 0}
.nav-cta{display:flex;align-items:center;gap:12px}
.nav-cta .btn{padding:10px 16px;font-size:.86rem}
.lang-toggle{display:inline-flex;border:1px solid var(--line);border-radius:30px;overflow:hidden;flex:none}
.lang-toggle button{padding:6px 13px;font-size:.8rem;font-weight:700;color:var(--muted);transition:background .2s,color .2s}
.lang-toggle button.is-active{background:var(--navy);color:#fff}
.nav-burger{display:none;color:var(--navy)}
.nav-mobile{display:none}

.hero{position:relative;background:linear-gradient(155deg,#8d1830 0%,#6f1124 55%,#511020 100%);color:#fff;overflow:hidden;padding:90px 0 84px}
.hero-pattern{position:absolute;inset:0;opacity:.5;background-image:linear-gradient(var(--line-light) 1px,transparent 1px),linear-gradient(90deg,var(--line-light) 1px,transparent 1px);background-size:46px 46px;mask-image:radial-gradient(circle at 70% 30%,#000,transparent 72%)}
.hero-seal-watermark{position:absolute;right:-90px;top:-40px;opacity:.06;transform:rotate(-8deg)}
.hero-inner{position:relative;max-width:830px}
.hero-eyebrow{display:inline-flex;align-items:center;gap:10px;font-weight:700;font-size:.74rem;letter-spacing:.16em;text-transform:uppercase;color:var(--gold-soft);margin-bottom:22px}
.hero-title{font-size:clamp(2.2rem,5.2vw,3.9rem);font-weight:600;letter-spacing:-.02em}
.hero-sub{margin-top:22px;font-size:clamp(1.05rem,1.6vw,1.26rem);color:rgba(255,255,255,.82);max-width:640px}
.hero-cta{display:flex;flex-wrap:wrap;gap:14px;margin-top:34px}
.hero-cta--center{justify-content:center}
.hero-promises{display:flex;flex-wrap:wrap;gap:12px;margin-top:46px}
.promise{display:inline-flex;align-items:center;gap:8px;font-size:.86rem;font-weight:600;color:#fff;background:rgba(255,255,255,.08);border:1px solid var(--line-light);padding:9px 15px;border-radius:30px}
.promise svg{color:var(--gold-soft);flex:none}
.promise--dark{color:var(--navy);background:var(--cream);border-color:rgba(200,162,74,.4)}
.promise--dark svg{color:var(--red)}

.page-hero{position:relative;background:linear-gradient(155deg,#8d1830,#6f1124);color:#fff;overflow:hidden;padding:74px 0 66px}
.page-hero-inner{position:relative;max-width:760px}
.page-hero-title{font-size:clamp(2rem,4.4vw,3.1rem);font-weight:600;margin-top:6px}
.page-hero-sub{margin-top:18px;font-size:1.1rem;color:rgba(255,255,255,.8)}

.badges{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.badge{display:flex;gap:16px;align-items:flex-start;background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:24px;box-shadow:var(--shadow)}
.badge-ico{flex:none;width:46px;height:46px;border-radius:12px;display:grid;place-items:center;background:linear-gradient(150deg,var(--red),var(--red-deep));color:#fff}
.badge-title{font-weight:700;font-size:1rem;color:var(--navy)}
.badge-text{font-size:.9rem;color:var(--muted);margin-top:4px}

.grid{display:grid;gap:24px}
.grid-2{grid-template-columns:repeat(2,1fr)}
.grid-3{grid-template-columns:repeat(3,1fr)}
.grid-4{grid-template-columns:repeat(4,1fr)}
.card{position:relative;background:#fff;border:1px solid var(--line);border-radius:var(--radius);padding:30px;box-shadow:var(--shadow)}
.svc-card{transition:transform .2s ease,box-shadow .2s ease}
.svc-card:hover{transform:translateY(-6px);box-shadow:0 28px 60px -28px rgba(11,28,58,.4)}
.svc-ico{display:grid;place-items:center;width:54px;height:54px;border-radius:14px;background:var(--cream);color:var(--red);margin-bottom:18px;border:1px solid rgba(200,162,74,.4)}
.svc-name{font-size:1.18rem;color:var(--navy);font-weight:600;margin-bottom:8px}
.svc-blurb{color:var(--muted);font-size:.94rem}
.link-arrow{display:inline-flex;align-items:center;gap:6px;color:var(--red);font-weight:700;font-size:.9rem;margin-top:16px;transition:gap .2s}
.link-arrow:hover{gap:10px}
.mini-card{text-align:left}

.svc-stack{display:flex;flex-direction:column;gap:34px}
.svc-block{background:#fff;border:1px solid var(--line);border-radius:22px;padding:36px;box-shadow:var(--shadow)}
.svc-block-head{display:flex;align-items:flex-start;gap:18px;position:relative;padding-bottom:24px;border-bottom:1px solid var(--line)}
.svc-block-ico{flex:none;width:60px;height:60px;border-radius:16px;display:grid;place-items:center;background:linear-gradient(150deg,var(--red),var(--red-deep));color:#fff}
.svc-block-name{font-size:1.5rem;color:var(--navy);font-weight:600}
.svc-block-blurb{color:var(--muted);margin-top:4px}
.svc-block-no{margin-left:auto;font-family:'Noto Serif',serif;font-size:2.4rem;color:var(--cream);font-weight:700;line-height:1}
.svc-block-body{display:grid;grid-template-columns:repeat(3,1fr);gap:30px;padding:28px 0}
.svc-col-title{font-size:.78rem;letter-spacing:.1em;text-transform:uppercase;color:var(--red);margin-bottom:14px;font-family:'Plus Jakarta Sans','Noto Sans SC';font-weight:700}
.tick-list li{display:flex;gap:10px;align-items:flex-start;font-size:.93rem;color:var(--ink);margin-bottom:10px}
.tick-list li svg{flex:none;color:var(--gold-deep);margin-top:3px}
.step-list li{display:flex;gap:12px;align-items:flex-start;font-size:.93rem;margin-bottom:12px}
.step-no{flex:none;width:24px;height:24px;border-radius:50%;background:var(--navy);color:#fff;display:grid;place-items:center;font-size:.78rem;font-weight:700}
.svc-block-foot{display:flex;flex-wrap:wrap;align-items:center;gap:18px;padding-top:22px;border-top:1px solid var(--line)}

.timeline{display:grid;grid-template-columns:repeat(5,1fr);gap:18px;position:relative}
.timeline::before{content:"";position:absolute;top:33px;left:8%;right:8%;height:2px;background:linear-gradient(90deg,var(--gold),var(--red))}
.timeline--light::before{background:linear-gradient(90deg,var(--gold),var(--gold-soft));opacity:.6}
.tl-item{position:relative;text-align:center;display:flex;flex-direction:column;align-items:center}
.tl-marker{display:flex;flex-direction:column;align-items:center;gap:10px;position:relative;z-index:1}
.tl-ico{width:66px;height:66px;border-radius:50%;background:#fff;border:2px solid var(--gold);color:var(--red);display:grid;place-items:center;box-shadow:0 8px 22px -10px rgba(11,28,58,.4)}
.timeline--light .tl-ico{background:rgba(255,255,255,.08);border-color:var(--gold);color:var(--gold-soft)}
.tl-step{font-size:.72rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--red)}
.timeline--light .tl-step{color:var(--gold-soft)}
.tl-title{font-size:1.05rem;color:var(--navy);margin-top:14px;font-weight:600}
.timeline--light .tl-title{color:#fff}
.tl-text{font-size:.86rem;color:var(--muted);margin-top:6px;max-width:200px}
.timeline--light .tl-text{color:rgba(255,255,255,.72)}
.center-cta{display:flex;justify-content:center;margin-top:48px}

.pricing-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:24px;max-width:860px;margin:0 auto;align-items:stretch}
.price-card{position:relative;background:#fff;border:1px solid var(--line);border-radius:20px;padding:34px;box-shadow:var(--shadow);display:flex;flex-direction:column}
.price-card--featured{border:1.5px solid var(--gold);box-shadow:0 30px 70px -28px rgba(158,27,50,.35)}
.price-badge{position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:var(--red);color:#fff;font-size:.7rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:6px 16px;border-radius:30px;white-space:nowrap}
.price-name{font-family:'Noto Serif','Noto Serif SC';font-size:1.4rem;color:var(--navy);font-weight:600}
.price-tag-line{color:var(--muted);font-size:.92rem;margin-top:4px}
.price-amount{display:flex;align-items:baseline;gap:10px;margin:20px 0 2px;flex-wrap:wrap}
.price-main{font-family:'Noto Serif','Noto Serif SC';font-size:2.6rem;font-weight:700;color:var(--red);line-height:1}
.price-sub{font-size:.95rem;color:var(--muted)}
.price-per{font-size:.84rem;color:var(--muted)}
.price-lawyer{background:var(--cream);border:1px solid rgba(200,162,74,.45);border-radius:12px;padding:12px 14px;font-size:.88rem;color:var(--navy);display:flex;gap:9px;align-items:flex-start;margin:18px 0 4px}
.price-lawyer svg{flex:none;color:var(--red);margin-top:1px}
.price-features{margin:20px 0 24px;display:flex;flex-direction:column;gap:11px}
.price-features li{display:flex;gap:10px;align-items:flex-start;font-size:.93rem}
.price-features li svg{flex:none;color:var(--gold-deep);margin-top:3px}
.price-card .btn{margin-top:auto}
.gov-note{text-align:center;color:var(--muted);font-size:.86rem;margin-top:26px;max-width:620px;margin-left:auto;margin-right:auto}

.check-grid{align-items:start}
.check-card{padding:28px}
.check-head{display:flex;align-items:center;gap:14px;margin-bottom:18px}
.check-title{font-size:1.2rem;color:var(--navy);font-weight:600}
.check-list li{display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px dashed var(--line);font-size:.94rem}
.check-list li:last-child{border-bottom:none}
.check-box{flex:none;width:22px;height:22px;border-radius:6px;background:var(--cream);border:1px solid var(--gold);color:var(--gold-deep);display:grid;place-items:center}
.check-card--cta{background:linear-gradient(160deg,var(--plum),var(--plum-2));color:#fff;display:flex;flex-direction:column;gap:14px;justify-content:center}
.check-card--cta .check-title{color:#fff}
.check-card--cta .svc-blurb{color:rgba(255,255,255,.8)}
.check-card--cta .btn{align-self:flex-start;margin-top:6px}

.about-grid{display:grid;grid-template-columns:1.5fr 1fr;gap:40px;align-items:start}
.about-story p{color:var(--muted);margin-bottom:16px;font-size:1.02rem}
.about-mini-stats{display:flex;gap:12px;margin-top:26px;flex-wrap:wrap}
.about-why{padding-top:34px}
.team-card{text-align:center}
.team-avatar{display:inline-grid;place-items:center;margin-bottom:14px}
.team-name{font-size:1.12rem;color:var(--navy);font-weight:600}
.team-role{color:var(--red);font-size:.86rem;font-weight:600;margin:4px 0 8px}
.values-row{display:grid;grid-template-columns:1fr 1.2fr;gap:30px;align-items:center}
.values-text{color:rgba(255,255,255,.82);font-size:1.1rem}

.track{max-width:760px;margin:0 auto}
.track-row{display:flex;gap:10px}
.track-row input{flex:1}
.track-field{margin-bottom:0}
.track-result{margin-top:26px;padding-top:24px;border-top:1px solid var(--line)}
.track-meta{display:flex;align-items:center;gap:12px;margin-bottom:22px}
.track-code{font-family:'Noto Serif',serif;font-weight:700;color:var(--navy);font-size:1.1rem}
.track-type{font-size:.8rem;background:var(--cream);color:var(--red);padding:4px 12px;border-radius:20px;font-weight:600}
.track-steps{display:grid;grid-template-columns:repeat(5,1fr);gap:8px;position:relative}
.track-steps::before{content:"";position:absolute;top:16px;left:10%;right:10%;height:2px;background:var(--line)}
.track-step{display:flex;flex-direction:column;align-items:center;gap:8px;position:relative;z-index:1;text-align:center}
.track-dot{width:34px;height:34px;border-radius:50%;background:#fff;border:2px solid var(--line);color:var(--muted);display:grid;place-items:center;font-weight:700;font-size:.85rem;transition:.3s}
.track-step.is-done .track-dot{background:var(--gold);border-color:var(--gold);color:var(--navy)}
.track-step.is-current .track-dot{background:var(--red);border-color:var(--red);color:#fff;box-shadow:0 0 0 5px rgba(158,27,50,.15)}
.track-lbl{font-size:.74rem;color:var(--muted);font-weight:600}
.track-step.is-done .track-lbl{color:var(--navy)}
.track-status{margin-top:22px;display:flex;align-items:center;gap:8px;font-size:.92rem;color:var(--ink);background:var(--cream);padding:12px 16px;border-radius:12px}
.track-status svg{color:var(--red);flex:none}

.review-card{padding-top:34px}
.review-seal{position:absolute;top:-18px;right:22px;transform:rotate(8deg);filter:drop-shadow(0 6px 12px rgba(158,27,50,.3))}
.founding-note{text-align:center;margin-top:30px;font-size:.92rem;color:var(--muted);font-style:italic}

.faq-wrap{max-width:780px;margin:0 auto}
.faq-list{display:flex;flex-direction:column;gap:12px}
.faq-item{background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden;transition:border-color .2s,box-shadow .2s}
.faq-item.is-open{border-color:var(--gold);box-shadow:var(--shadow)}
.faq-q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px 24px;text-align:left;font-weight:600;font-size:1.04rem;color:var(--navy);font-family:'Noto Serif','Noto Serif SC',serif}
.faq-chev{color:var(--red);transition:transform .3s;flex:none}
.faq-item.is-open .faq-chev{transform:rotate(180deg)}
.faq-a{overflow:hidden;transition:max-height .35s ease}
.faq-a p{padding:0 24px 22px;color:var(--muted);font-size:.96rem}

.news-wrap{display:grid;grid-template-columns:1.3fr 1fr;gap:34px;align-items:center}
.news-text .heading{margin-bottom:14px}
.news-sub{color:rgba(255,255,255,.74)}
.news-form{display:flex;gap:10px}
.news-form input{flex:1}
.news-done{display:flex;align-items:center;gap:10px;color:var(--gold-soft);font-weight:600;font-size:1.05rem}

.field{display:flex;flex-direction:column;gap:7px;margin-bottom:16px}
.field>span{font-size:.82rem;font-weight:600;color:var(--navy)}
.field input,.field select,.field textarea,.track input,.news-form input{width:100%;font-family:inherit;font-size:.95rem;padding:12px 14px;border:1.5px solid var(--line);border-radius:11px;background:#fff;color:var(--ink);transition:border-color .2s,box-shadow .2s}
.news-form input{border-color:var(--line-light)}
.field input:focus,.field select:focus,.field textarea:focus,.track input:focus,.news-form input:focus{outline:none;border-color:var(--gold);box-shadow:0 0 0 3px rgba(200,162,74,.18)}
.field textarea{resize:vertical}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.form-note{font-size:.78rem;color:var(--muted);margin-top:10px}
.form-success{text-align:center;padding:18px 0}
.success-ico{display:inline-grid;place-items:center;width:74px;height:74px;border-radius:50%;background:var(--cream);color:var(--red);margin-bottom:14px}
.form-success h4{font-size:1.3rem;color:var(--navy);margin-bottom:8px}
.form-success p{color:var(--muted);margin-bottom:18px}

.contact-grid{display:grid;grid-template-columns:1.3fr 1fr;gap:30px;align-items:start}
.contact-aside{display:flex;flex-direction:column;gap:22px}
.contact-info{display:flex;flex-direction:column;gap:6px}
.contact-line{display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid var(--line);font-size:.94rem;transition:color .2s}
.contact-line:last-child{border-bottom:none}
.contact-line:hover{color:var(--red)}
.contact-ico{flex:none;width:42px;height:42px;border-radius:11px;display:grid;place-items:center;background:var(--cream);color:var(--red)}
.contact-ico--wa{background:#25D366;color:#fff}
.office-addr{display:flex;align-items:center;gap:8px;color:var(--muted);font-size:.92rem;margin-bottom:16px}
.office-addr svg{color:var(--red);flex:none}
.map-mock{position:relative;height:200px;border-radius:14px;overflow:hidden;background:linear-gradient(135deg,#e9eef5,#dde6f0);border:1px solid var(--line)}
.map-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(11,28,58,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(11,28,58,.07) 1px,transparent 1px);background-size:28px 28px}
.map-pin{position:absolute;top:50%;left:50%;transform:translate(-50%,-100%);color:var(--red);filter:drop-shadow(0 6px 8px rgba(0,0,0,.25))}
.map-label{position:absolute;bottom:14px;left:14px;background:#fff;padding:6px 12px;border-radius:8px;font-size:.78rem;font-weight:600;color:var(--navy);box-shadow:var(--shadow)}

.cta-band{background:linear-gradient(160deg,var(--red-deep),var(--red));color:#fff;text-align:center}
.cta-inner{max-width:680px;margin:0 auto;display:flex;flex-direction:column;align-items:center}
.cta-inner .seal{margin-bottom:22px;filter:drop-shadow(0 8px 16px rgba(0,0,0,.3))}
.cta-inner .seal .seal-bg{fill:#fff}
.cta-inner .seal .seal-char{fill:var(--red)}
.cta-inner .seal .seal-inner{stroke:var(--red-soft)}
.cta-title{font-size:clamp(1.8rem,3.4vw,2.5rem);font-weight:600}
.cta-sub{margin-top:16px;color:rgba(255,255,255,.88);font-size:1.08rem}

.footer{background:linear-gradient(160deg,var(--plum),#3a0d18);color:#fff;padding:64px 0 28px}
.footer-grid{display:grid;grid-template-columns:1.6fr 1fr 1fr 1.2fr;gap:34px}
.footer-blurb{color:rgba(255,255,255,.66);font-size:.9rem;margin-top:18px;max-width:300px}
.footer-col h4{font-family:'Plus Jakarta Sans','Noto Sans SC';font-size:.78rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gold-soft);margin-bottom:16px;font-weight:700}
.footer-col button,.footer-col a,.footer-addr{display:block;text-align:left;color:rgba(255,255,255,.74);font-size:.9rem;padding:5px 0;transition:color .2s}
.footer-col button:hover,.footer-col a:hover{color:#fff}
.footer-addr{color:rgba(255,255,255,.5);margin-top:6px}
.footer-bottom{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:46px;padding-top:24px;border-top:1px solid var(--line-light);font-size:.8rem;color:rgba(255,255,255,.55)}

.fab{position:fixed;right:22px;width:56px;height:56px;border-radius:50%;display:grid;place-items:center;color:#fff;z-index:120;box-shadow:0 12px 30px -8px rgba(0,0,0,.4);transition:transform .2s}
.fab:hover{transform:scale(1.07)}
.fab--wa{bottom:90px;background:#25D366}
.fab--chat{bottom:22px;background:var(--red)}
.chat-panel{position:fixed;right:22px;bottom:90px;width:340px;max-width:calc(100vw - 44px);background:#fff;border-radius:18px;box-shadow:0 30px 70px -20px rgba(11,28,58,.5);z-index:121;overflow:hidden;border:1px solid var(--line);animation:pop .25s ease}
@keyframes pop{from{opacity:0;transform:translateY(14px) scale(.97)}to{opacity:1;transform:none}}
.chat-head{display:flex;align-items:center;gap:12px;padding:16px 18px;background:linear-gradient(150deg,var(--plum),var(--plum-2));color:#fff}
.chat-head strong{font-size:.95rem}
.chat-status{display:flex;align-items:center;gap:6px;font-size:.74rem;color:rgba(255,255,255,.72)}
.chat-status .dot{width:8px;height:8px;border-radius:50%;background:#37d67a}
.chat-log{padding:16px;display:flex;flex-direction:column;gap:10px;max-height:280px;overflow-y:auto;background:var(--paper)}
.chat-msg{font-size:.88rem;padding:10px 13px;border-radius:13px;max-width:84%;line-height:1.5}
.chat-msg--bot{background:#fff;border:1px solid var(--line);color:var(--ink);align-self:flex-start;border-bottom-left-radius:4px}
.chat-msg--me{background:var(--red);color:#fff;align-self:flex-end;border-bottom-right-radius:4px}
.chat-input{display:flex;gap:8px;padding:12px;border-top:1px solid var(--line);background:#fff}
.chat-input input{flex:1;border:1.5px solid var(--line);border-radius:10px;padding:10px 12px;font-family:inherit;font-size:.88rem}
.chat-input input:focus{outline:none;border-color:var(--gold)}
.chat-input button{width:42px;height:42px;border-radius:10px;background:var(--red);color:#fff;display:grid;place-items:center;flex:none}

@media(max-width:1080px){
  .nav-links{display:none}
  .nav-burger{display:grid;place-items:center}
  .nav-mobile{display:flex;flex-direction:column;gap:4px;padding:14px 24px 22px;background:rgba(251,250,246,.98);backdrop-filter:blur(12px);border-top:1px solid var(--line);box-shadow:var(--shadow)}
  .nav-mobile-link{text-align:left;padding:12px 8px;font-weight:600;color:var(--ink);border-radius:9px;border-bottom:1px solid var(--line)}
  .nav-mobile-link.is-active{color:var(--red)}
  .nav-mobile-cta{display:flex;flex-direction:column;gap:12px;margin-top:12px}
}
@media(max-width:980px){
  .grid-4{grid-template-columns:repeat(2,1fr)}
  .timeline{grid-template-columns:repeat(2,1fr);gap:30px}
  .timeline::before{display:none}
  .about-grid,.values-row,.news-wrap,.contact-grid{grid-template-columns:1fr}
  .svc-block-body{grid-template-columns:1fr;gap:24px}
}
@media(max-width:640px){
  .section{padding:60px 0}
  .container{padding:0 18px}
  .badges,.grid-2,.grid-3,.grid-4,.pricing-grid{grid-template-columns:1fr}
  .field-row{grid-template-columns:1fr}
  .hero{padding:66px 0 60px}
  .svc-block{padding:24px}
  .svc-block-no{display:none}
  .timeline{grid-template-columns:1fr}
  .track-steps{grid-template-columns:repeat(5,1fr);gap:4px}
  .track-lbl{display:none}
  .footer-grid{grid-template-columns:1fr 1fr}
  .footer-brand{grid-column:1 / -1}
  .news-form{flex-direction:column}
  .review-seal{top:-14px;right:16px}
  .nav-cta{display:none}
}
.btn--ghost-light{background:rgba(255,255,255,.08);color:#fff;border:1.5px solid var(--line-light)}
.btn--ghost-light:hover{background:rgba(255,255,255,.16);transform:translateY(-1px)}
.hero-download{margin-top:20px}

.download-band{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;background:linear-gradient(150deg,var(--plum),var(--plum-2));color:#fff;border-radius:18px;padding:26px 30px;margin-bottom:34px;box-shadow:var(--shadow)}
.download-band .check-title{color:#fff}
.download-band .svc-blurb{color:rgba(255,255,255,.78);margin-top:4px}

.uni-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
.uni-card{display:flex;align-items:center;gap:14px;background:#fff;border:1px solid var(--line);border-radius:14px;padding:16px 18px;box-shadow:0 10px 30px -22px rgba(43,10,18,.4);transition:transform .2s,box-shadow .2s}
.uni-card:hover{transform:translateY(-3px);box-shadow:0 20px 40px -24px rgba(43,10,18,.45)}
.uni-mark{flex:none;width:46px;height:46px;border-radius:12px;display:grid;place-items:center;font-family:'Noto Serif','Noto Serif SC';font-size:1.4rem;font-weight:700;color:#fff;background:linear-gradient(150deg,var(--red),var(--red-deep))}
.uni-body{display:flex;flex-direction:column;gap:4px;min-width:0}
.uni-name{font-weight:700;color:var(--ink);font-size:.95rem;line-height:1.3}
.uni-tag{align-self:flex-start;font-size:.68rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:var(--gold-deep);background:var(--cream);border:1px solid rgba(200,162,74,.4);padding:2px 9px;border-radius:20px}
.uni-note{text-align:center;color:var(--muted);font-size:.84rem;margin-top:26px;max-width:680px;margin-left:auto;margin-right:auto;font-style:italic}

.section--brit{position:relative;background:linear-gradient(160deg,var(--plum),var(--plum-2));color:#fff;overflow:hidden;padding-bottom:0}
.brit-grid{position:relative;z-index:1;margin-bottom:70px}
.brit-card{text-align:center;background:rgba(255,255,255,.05);border:1px solid var(--line-light);border-radius:18px;padding:28px 22px}
.brit-ico-wrap{display:inline-grid;place-items:center;width:88px;height:88px;border-radius:50%;background:rgba(255,255,255,.06);border:1px solid rgba(200,162,74,.4);margin-bottom:16px}
.brit-ico{stroke:var(--gold-soft);stroke-width:2;fill:none;stroke-linecap:round;stroke-linejoin:round}
.brit-ico .brit-face{fill:rgba(200,162,74,.18);stroke:var(--gold-soft)}
.brit-ico .brit-dot{fill:var(--gold-soft);stroke:none}
.brit-name{color:#fff;font-size:1.15rem;font-weight:600;margin-bottom:6px}
.brit-note{color:rgba(255,255,255,.74);font-size:.9rem}
.skyline{display:block;width:100%;height:auto;position:relative;z-index:0}
.skyline .skyline-g{fill:rgba(255,255,255,.10);stroke:rgba(255,255,255,.16)}

.calc{max-width:760px;margin:0 auto}
.calc-inputs{display:grid;grid-template-columns:1fr 1fr auto;gap:14px;align-items:end}
.calc-inputs .field{margin-bottom:0}
.calc-inputs .btn{height:46px}
.calc-result{margin-top:26px;padding-top:24px;border-top:1px solid var(--line)}
.calc-intro{color:var(--muted);margin-bottom:16px}
.calc-dates{display:flex;align-items:stretch;gap:16px;flex-wrap:wrap}
.calc-date{flex:1;min-width:200px;background:var(--cream);border:1px solid rgba(200,162,74,.4);border-radius:14px;padding:18px}
.calc-date-lbl{display:block;font-size:.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--red);margin-bottom:8px}
.calc-date-val{font-family:'Noto Serif','Noto Serif SC';font-size:1.3rem;font-weight:700;color:var(--ink)}
.calc-arrow{align-self:center;color:var(--gold-deep);flex:none}
.calc-soon{margin-top:16px;background:#fbeaec;border:1px solid var(--red-soft);color:var(--red-deep);padding:12px 16px;border-radius:12px;font-size:.9rem;font-weight:600}
.calc-tip{margin-top:16px;font-size:.84rem;color:var(--muted)}
.calc-error{margin-top:20px;color:var(--red-deep);font-weight:600}

.section--calc-hero{background:linear-gradient(160deg,#8d1830 0%,#6f1124 60%,#511020 100%);padding:48px 0 64px;position:relative;overflow:hidden}
.section--calc-hero::before{content:"";position:absolute;inset:0;opacity:.35;background-image:linear-gradient(var(--line-light) 1px,transparent 1px),linear-gradient(90deg,var(--line-light) 1px,transparent 1px);background-size:46px 46px;pointer-events:none}
.calc-hero-head{text-align:center;margin-bottom:32px;position:relative}
.calc-hero-head .eyebrow{color:var(--gold-soft)}
.calc-hero-head .eyebrow .eyebrow-mark{background:var(--gold-soft)}
.calc-hero-title{font-size:clamp(1.7rem,3vw,2.4rem);color:#fff;margin-top:6px}
.calc-hero-sub{color:rgba(255,255,255,.8);margin-top:10px;font-size:1.05rem}
.section--calc-hero .calc{background:rgba(255,255,255,.96);backdrop-filter:blur(8px);border:none;box-shadow:0 30px 70px -24px rgba(0,0,0,.45)}

.cal-btn{display:inline-flex;align-items:center;gap:6px;margin-top:12px;font-size:.8rem;font-weight:700;color:var(--red);background:var(--cream);border:1px solid rgba(200,162,74,.5);padding:7px 13px;border-radius:20px;text-decoration:none;transition:background .2s,transform .15s}
.cal-btn:hover{background:rgba(158,27,50,.08);transform:translateY(-1px)}
.calc-date{align-items:flex-start}


.scenario-card{padding-top:30px}
.scenario-tag{display:inline-block;font-size:.68rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--gold-deep);background:var(--cream);border:1px solid rgba(200,162,74,.4);padding:3px 11px;border-radius:20px;margin-bottom:14px}
.scenario-who{font-weight:700;color:var(--ink);margin-bottom:8px;font-size:1rem}
.scenario-empty{display:flex;flex-direction:column;justify-content:center;text-align:center;background:linear-gradient(160deg,#fff,var(--cream));padding-top:34px}

.uk-gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.uk-photo{position:relative;height:240px;border-radius:16px;overflow:hidden;box-shadow:var(--shadow)}
.uk-photo-fallback{position:absolute;inset:0;display:grid;place-items:center}
.uk-photo-fallback svg{stroke:rgba(255,255,255,.55);fill:none;stroke-width:2}
.uk-photo img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.uk-photo-cap{position:absolute;left:0;right:0;bottom:0;padding:16px;color:#fff;font-weight:700;font-size:1.05rem;font-family:'Noto Serif','Noto Serif SC',serif;background:linear-gradient(to top,rgba(20,5,9,.85),rgba(20,5,9,0))}
@media(max-width:880px){.uk-gallery{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.uk-gallery{grid-template-columns:1fr}}

@media(max-width:980px){
  .uni-grid{grid-template-columns:1fr}
  .calc-inputs{grid-template-columns:1fr}
  .calc-inputs .btn{width:100%}
}

@media (prefers-reduced-motion: reduce){
  *{animation-duration:.001ms !important;transition-duration:.001ms !important}
  .reveal{opacity:1 !important;transform:none !important}
}
`}</style>
  );
}
