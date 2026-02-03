import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator, FileText, TrendingUp, Receipt, Handshake,
  ChevronDown, Phone, MapPin, Mail, Users, Award, Clock,
  Building2, ArrowLeft, CheckCircle2, Menu, X
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import emailjs from '@emailjs/browser';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Data
const teamMembers = [
  {
    name: 'רו״ח אמיר רוזנברג',
    role: 'מייסד המשרד',
    description: [
      'רו"ח חבר בלשכת רואי החשבון של ישראל',
      'מעל 30 שנה של ניסיון בתחום',
      'מרצה לשעבר בקורסי יזמות עסקית במכללה למנהל בתל אביב',
      'מגשר מוסמך מטעם המרכז הישראלי למשא ומתן וגישור'
    ],
    isFounder: true
  },
  {
    name: 'ירון דוקטורוביץ׳',
    role: 'רואה חשבון',
    description: ['בוגר הקריה האקדמית אונו', 'ותק וניסיון מעל לעשור'],
    isFounder: false
  },
  {
    name: 'אלינור גבריאלוב',
    role: 'מנהלת תיקי לקוחות',
    description: ['ותק וניסיון מעל ל-15 שנה'],
    isFounder: false
  },
  {
    name: 'אירינה שטיק',
    role: 'מנהלת תיקי לקוחות',
    description: ['ותק וניסיון מעל ל-15 שנה'],
    isFounder: false
  },
  {
    name: 'אולגה פיימר',
    role: 'מנהלת תיקי לקוחות',
    description: ['ותק וניסיון כעשור'],
    isFounder: false
  }
];

const services = [
  {
    icon: Calculator,
    title: 'שירותי ראיית חשבון',
    description: 'כל עסק זקוק לרואה חשבון מקצועי שמבין את המצב הפיננסי שלו לעומק ויכול לספק ייעוץ אסטרטגי, לוודא עמידה בדרישות החוק ולשפר את ההתנהלות הכלכלית.',
    points: [
      'ביקורת דוחות כספיים – ניתוח וביקורת לדוחות העסקיים',
      'תכנון פיננסי – גיבוש מודלים חשבונאיים לשיפור ההתנהלות הכלכלית',
      'מאזנים ודוחות – הכנת דוחות פיננסיים מקצועיים',
      'ניתוח סיכונים – הערכת סיכונים פיננסיים וניהול מושכל',
      'הצהרות הון – הכנת הצהרות הון מקצועיות',
      "בדיקות נאותות – בדיקות דיו דיליג'נס לקראת עסקאות והחלטות פיננסיות"
    ]
  },
  {
    icon: FileText,
    title: 'הנהלת חשבונות',
    description: 'הנהלת חשבונות מסודרת היא המפתח לניהול עסק חכם ומוצלח. תיעוד מדויק של הכנסות והוצאות מאפשר לכם לעקוב אחר הביצועים הפיננסיים.',
    points: [
      'חשבות שכר – ניהול חכם של שכר העובדים ועמידה בתקנות המס',
      'הכנת תלושי שכר – הפקת תלושי שכר חודשיים ודוחות שנתיים',
      'דיווחים לרשויות – הגשת דיווחים שוטפים למס הכנסה, מע"מ וביטוח לאומי',
      'דוחות רווח והפסד – מעקב פיננסי חודשי ורבעוני',
      'רישום והפקת דוחות – ניהול ספרי העסק בצורה ממוחשבת'
    ]
  },
  {
    icon: TrendingUp,
    title: 'ליווי עסקי ופיננסי',
    description: 'ניהול עסק מצליח דורש הרבה יותר מרעיון טוב – הוא דורש תכנון פיננסי נכון וקבלת החלטות מושכלות.',
    points: [
      'ניהול כספים חיצוני – תכנון וניהול פיננסי מקצועי לעסקים',
      'הכנת תוכנית עסקית – בניית אסטרטגיה כלכלית חכמה',
      'ניהול תזרים מזומנים – שמירה על יציבות פיננסית',
      'גיוס מימון – סיוע בהשגת מימון בנקאי וחוץ בנקאי',
      'הערכת שווי – קביעת שווי עסקי מקצועי'
    ]
  },
  {
    icon: Receipt,
    title: 'שירותי ייעוץ מס',
    description: 'ניהול מס נכון הוא לא רק חובה חוקית – הוא המפתח לחיסכון כלכלי משמעותי ולמיקסום רווחים.',
    points: [
      'תכנון מס אסטרטגי – בניית תוכנית מס להפחתת נטל המס',
      'ייצוג מול רשויות המס – ליווי מקצועי בדיוני שומה',
      'ליווי עסקאות – ייעוץ מס לעסקאות רכישה, מיזוגים והשקעות',
      'דוחות מס שנתיים – הכנת דוחות שנתיים לעצמאים ושכירים',
      'החזרי מס לשכירים – בדיקת זכאות להחזרי מס'
    ]
  },
  {
    icon: Handshake,
    title: 'שירותי גישור',
    description: 'גישור הוא הדרך היעילה, המהירה והנעימה ביותר ליישוב מחלוקות מחוץ לכותלי בית המשפט.',
    points: [
      'הליך גירושים – פתרונות הוגנים להליכי פרידה',
      'סכסוכי ירושה – פתרון חילוקי דעות בין יורשים',
      'מחלוקות עבודה – גישור בין עובדים ומעסיקים',
      'אי הסכמה עסקית – יישוב סכסוכים בין שותפים',
      'סכסוכי שכנים – פתרון בעיות בצורה נעימה'
    ]
  }
];

const stats = [
  { icon: Clock, value: '30+', label: 'שנות ניסיון' },
  { icon: Users, value: '100+', label: 'לקוחות פעילים' },
  { icon: Award, value: '1994', label: 'שנת הקמה' },
  { icon: Building2, value: 'תל אביב', label: 'מיקום המשרד' }
];

const translations = {
  he: {
    nav: { home: 'ראשי', about: 'אודות', services: 'שירותים', contact: 'צור קשר', cta: 'צור קשר' },
    hero: {
      badge: 'מעל 30 שנות מצוינות',
      title: 'אמיר רוזנברג ושות׳',
      subtitle: 'רואי חשבון',
      desc: 'משרדנו, שהוקם בשנת 1994, מעניק שירותי ראיית חשבון, ייעוץ פיננסי וליווי עסקי ברמה הגבוהה ביותר. אנו מחויבים לספק שירות מקצועי, אמין ואיכותי.',
      btnPrimary: 'מה אנחנו עושים',
      btnSecondary: 'עוד עלינו'
    },
    stats: [
      { value: '30+', label: 'שנות ניסיון' },
      { value: '100+', label: 'לקוחות פעילים' },
      { value: '1994', label: 'שנת הקמה' },
      { value: 'תל אביב', label: 'מיקום המשרד' }
    ],
    about: {
      badge: 'הצוות שלנו',
      title: 'הכירו את הצוות',
      desc: 'צוות המשרד שלנו כולל אנשי מקצוע מנוסים ומסורים, המובילים את תחום הפיננסים בהובלת רו"ח אמיר רוזנברג.'
    },
    services: {
      badge: 'השירותים שלנו',
      title: 'מה אנחנו עושים',
      desc: 'אנו מספקים מגוון רחב של שירותים מקצועיים המותאמים לצרכים הייחודיים של כל לקוח.',
      whyUs: 'למה לבחור בנו?',
      whyPoints: [
        'ניסיון של מעל 30 שנה בתחום',
        'יחס אישי ומותאם לכל לקוח',
        'מיקום נוח בלב תל אביב',
        'מענה מקצועי ומהיר',
        'מחירים הוגנים ושקופים'
      ],
      cta: 'צור קשר',
      subheading: 'חלק מהשירותים הניתנים:'
    },
    contact: {
      badge: 'צור קשר',
      title: 'בואו נדבר',
      desc: 'מחפשים שותף פיננסי אמין שילווה אתכם קדימה? אנחנו כאן בשבילכם!',
      formTitle: 'שלחו לנו הודעה',
      name: 'שם מלא',
      email: 'אימייל',
      message: 'הודעה',
      submit: 'שלח הודעה',
      success: 'ההודעה נשלחה בהצלחה! נחזור אליכם בהקדם.',
      namePlaceholder: 'הזינו את שמכם',
      emailPlaceholder: 'example@email.com',
      messagePlaceholder: 'במה נוכל לעזור?',
      address: 'כתובת',
      phone: 'טלפון',
      hoursTitle: 'שעות פעילות',
      hours1: 'ימים א׳-ה׳: 09:00 - 18:00',
      hoursNote: '* ניתן לתאם פגישות גם מחוץ לשעות הפעילות'
    },
    footer: {
      desc: 'מעל 30 שנות ניסיון במתן שירותי ראיית חשבון, ייעוץ מס וליווי עסקי מקצועי.',
      quickLinks: 'קישורים מהירים',
      contactInfo: 'פרטי התקשרות',
      copyright: 'אמיר רוזנברג ושות׳ רואי חשבון. כל הזכויות שמורות.'
    }
  },
  en: {
    nav: { home: 'Home', about: 'About', services: 'Services', contact: 'Contact', cta: 'Contact Us' },
    hero: {
      badge: 'Over 30 Years of Excellence',
      title: 'Amir Rozenberg & Co.',
      subtitle: 'Certified Public Accountants',
      desc: 'Founded in 1994, our firm provides top-tier accounting, financial consulting, and business advisory services. We are committed to delivering professional, reliable, and quality service.',
      btnPrimary: 'Our Services',
      btnSecondary: 'Learn More'
    },
    stats: [
      { value: '30+', label: 'Years of Experience' },
      { value: '100+', label: 'Active Clients' },
      { value: '1994', label: 'Established' },
      { value: 'Tel Aviv', label: 'Office Location' }
    ],
    about: {
      badge: 'Our Team',
      title: 'Meet the Team',
      desc: 'Our office team includes experienced and dedicated professionals, leading the finance sector under the guidance of CPA Amir Rozenberg.'
    },
    services: {
      badge: 'Our Services',
      title: 'What We Do',
      desc: 'We provide a wide range of professional services tailored to the unique needs of each client.',
      whyUs: 'Why Choose Us?',
      whyPoints: [
        'Over 30 years of experience',
        'Personal attention to every client',
        'Convenient location in central Tel Aviv',
        'Professional and prompt service',
        'Fair and transparent pricing'
      ],
      cta: 'Contact Us Now',
      subheading: 'Some of our services include:'
    },
    contact: {
      badge: 'Contact Us',
      title: 'Let\'s Talk',
      desc: 'Looking for a reliable financial partner to guide you forward? We\'re here for you!',
      formTitle: 'Send us a message',
      name: 'Full Name',
      email: 'Email',
      message: 'Message',
      submit: 'Send Message',
      success: 'Message sent successfully! We\'ll get back to you soon.',
      namePlaceholder: 'Enter your name',
      emailPlaceholder: 'example@email.com',
      messagePlaceholder: 'How can we help?',
      address: 'Address',
      phone: 'Phone',
      hoursTitle: 'Business Hours',
      hours1: 'Sunday-Thursday: 09:00 - 18:00',
      hoursNote: '* Appointments available outside business hours'
    },
    footer: {
      desc: 'Over 30 years of experience providing accounting services, tax consulting, and professional business advisory.',
      quickLinks: 'Quick Links',
      contactInfo: 'Contact Information',
      copyright: 'Amir Rozenberg & Co. CPA. All rights reserved.'
    }
  }
};

const teamTranslations = {
  he: [
    {
      name: 'רו״ח אמיר רוזנברג',
      role: 'מייסד המשרד',
      description: [
        'רו"ח חבר בלשכת רואי החשבון של ישראל',
        'מעל 30 שנה של ניסיון בתחום',
        'מרצה לשעבר בקורסי יזמות עסקית במכללה למנהל בתל אביב',
        'מגשר מוסמך מטעם המרכז הישראלי למשא ומתן וגישור'
      ]
    },
    {
      name: 'ירון דוקטורוביץ׳',
      role: 'רואה חשבון',
      description: ['בוגר הקריה האקדמית אונו', 'ותק וניסיון מעל ל-20 שנה']
    },
    {
      name: 'אירינה שטיק',
      role: 'מנהלת תיקי לקוחות',
      description: ['ותק וניסיון מעל ל-20 שנה']
    },
    {
      name: 'אולגה פיימר',
      role: 'מנהלת תיקי לקוחות',
      description: ['ותק וניסיון מעל לעשור']
    }
  ],
  en: [
    {
      name: 'CPA Amir Rozenberg',
      role: 'Founder',
      description: [
        'Member of the Institute of CPAs in Israel',
        'Over 30 years of experience',
        'Former lecturer in entrepreneurship at Tel Aviv Management College',
        'Certified mediator from the Israeli Center for Negotiation and Mediation'
      ]
    },
    {
      name: 'Yaron Doktorovitz',
      role: 'Accountant',
      description: ['Graduate of Ono Academic College', 'Over 20 years of experience']
    },
    {
      name: 'Irina Shtik',
      role: 'Client Portfolio Manager',
      description: ['Over 20 years of experience']
    },
    {
      name: 'Olga Peymer',
      role: 'Client Portfolio Manager',
      description: ['Over a decade of experience']
    }
  ]
};

const servicesTranslations = {
  he: [
    {
      icon: Calculator,
      title: 'שירותי ראיית חשבון',
      description: 'כל עסק זקוק לרואה חשבון מקצועי שמבין את המצב הפיננסי שלו לעומק ויכול לספק ייעוץ אסטרטגי, לוודא עמידה בדרישות החוק ולשפר את ההתנהלות הכלכלית.',
      points: [
        'ביקורת דוחות כספיים – ניתוח וביקורת לדוחות העסקיים',
        'תכנון פיננסי – גיבוש מודלים חשבונאיים לשיפור ההתנהלות הכלכלית',
        'מאזנים ודוחות – הכנת דוחות פיננסיים מקצועיים',
        'ניתוח סיכונים – הערכת סיכונים פיננסיים וניהול מושכל',
        'הצהרות הון – הכנת הצהרות הון מקצועיות',
        "בדיקות נאותות – בדיקות דיו דיליג'נס לקראת עסקאות והחלטות פיננסיות"
      ]
    },
    {
      icon: FileText,
      title: 'הנהלת חשבונות',
      description: 'הנהלת חשבונות מסודרת היא המפתח לניהול עסק חכם ומוצלח. תיעוד מדויק של הכנסות והוצאות מאפשר לכם לעקוב אחר הביצועים הפיננסיים.',
      points: [
        'חשבות שכר – ניהול חכם של שכר העובדים ועמידה בתקנות המס',
        'הכנת תלושי שכר – הפקת תלושי שכר חודשיים ודוחות שנתיים',
        'דיווחים לרשויות – הגשת דיווחים שוטפים למס הכנסה, מע"מ וביטוח לאומי',
        'דוחות רווח והפסד – מעקב פיננסי חודשי ורבעוני',
        'רישום והפקת דוחות – ניהול ספרי העסק בצורה ממוחשבת'
      ]
    },
    {
      icon: TrendingUp,
      title: 'ליווי עסקי ופיננסי',
      description: 'ניהול עסק מצליח דורש הרבה יותר מרעיון טוב – הוא דורש תכנון פיננסי נכון וקבלת החלטות מושכלות.',
      points: [
        'ניהול כספים חיצוני – תכנון וניהול פיננסי מקצועי לעסקים',
        'הכנת תוכנית עסקית – בניית אסטרטגיה כלכלית חכמה',
        'ניהול תזרים מזומנים – שמירה על יציבות פיננסית',
        'גיוס מימון – סיוע בהשגת מימון בנקאי וחוץ בנקאי',
        'הערכת שווי – קביעת שווי עסקי מקצועי'
      ]
    },
    {
      icon: Receipt,
      title: 'שירותי ייעוץ מס',
      description: 'ניהול מס נכון הוא לא רק חובה חוקית – הוא המפתח לחיסכון כלכלי משמעותי ולמיקסום רווחים.',
      points: [
        'תכנון מס אסטרטגי – בניית תוכנית מס להפחתת נטל המס',
        'ייצוג מול רשויות המס – ליווי מקצועי בדיוני שומה',
        'ליווי עסקאות – ייעוץ מס לעסקאות רכישה, מיזוגים והשקעות',
        'דוחות מס שנתיים – הכנת דוחות שנתיים לעצמאים ושכירים',
        'החזרי מס לשכירים – בדיקת זכאות להחזרי מס'
      ]
    },
    {
      icon: Handshake,
      title: 'שירותי גישור',
      description: 'גישור הוא הדרך היעילה, המהירה והנעימה ביותר ליישוב מחלוקות מחוץ לכותלי בית המשפט.',
      points: [
        'הליך גירושים – פתרונות הוגנים להליכי פרידה',
        'סכסוכי ירושה – פתרון חילוקי דעות בין יורשים',
        'מחלוקות עבודה – גישור בין עובדים ומעסיקים',
        'אי הסכמה עסקית – יישוב סכסוכים בין שותפים',
        'סכסוכי שכנים – פתרון בעיות בצורה נעימה'
      ]
    }
  ],
  en: [
    {
      icon: Calculator,
      title: 'Accounting Services',
      description: 'Every business needs a professional accountant who understands their financial situation and can provide strategic advice, ensure compliance, and improve financial management.',
      points: [
        'Financial statement audits – Analysis and review of business reports',
        'Financial planning – Building accounting models for improved financial management',
        'Balance sheets and reports – Professional financial report preparation',
        'Risk analysis – Financial risk assessment and management',
        'Net worth statements – Professional net worth declarations',
        'Due diligence reviews – DD checks for transactions and financial decisions'
      ]
    },
    {
      icon: FileText,
      title: 'Bookkeeping',
      description: 'Organized bookkeeping is the key to smart and successful business management. Accurate documentation allows you to track financial performance.',
      points: [
        'Payroll accounting – Smart management of employee wages and tax compliance',
        'Payslip preparation – Monthly payslips and annual reports',
        'Regulatory reporting – Ongoing reports to income tax, VAT, and social security',
        'Profit and loss statements – Monthly and quarterly financial tracking',
        'Recording and reporting – Computerized business book management'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Business & Financial Consulting',
      description: 'Running a successful business requires more than a good idea – it requires proper financial planning and smart decision-making.',
      points: [
        'External financial management – Professional financial planning for businesses',
        'Business plan preparation – Building smart economic strategy',
        'Cash flow management – Maintaining financial stability',
        'Fundraising – Assistance in obtaining bank and non-bank financing',
        'Business valuation – Professional business valuation'
      ]
    },
    {
      icon: Receipt,
      title: 'Tax Consulting Services',
      description: 'Proper tax management is not just a legal obligation – it\'s the key to significant financial savings and profit maximization.',
      points: [
        'Strategic tax planning – Building tax plans to reduce tax burden',
        'Tax authority representation – Professional support in assessment discussions',
        'Transaction support – Tax consulting for acquisitions, mergers, and investments',
        'Annual tax returns – Preparation of annual reports for freelancers and employees',
        'Tax refunds for employees – Checking eligibility for tax refunds'
      ]
    },
    {
      icon: Handshake,
      title: 'Mediation Services',
      description: 'Mediation is the most effective, quick, and pleasant way to resolve disputes outside of court.',
      points: [
        'Divorce proceedings – Fair solutions for separation processes',
        'Inheritance disputes – Resolving disagreements between heirs',
        'Employment disputes – Mediation between employees and employers',
        'Business disagreements – Resolving conflicts between partners',
        'Neighbor disputes – Solving problems amicably'
      ]
    }
  ]
};

export default function HomePage() {
  const [language, setLanguage] = useState('he');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(null);
  const [honeypot, setHoneypot] = useState(''); // Anti-bot honeypot field

  // Rate limiting - track submissions in sessionStorage
  const checkRateLimit = () => {
    const submissions = JSON.parse(sessionStorage.getItem('formSubmissions') || '[]');
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    const recentSubmissions = submissions.filter(time => time > oneHourAgo);
    return recentSubmissions.length < 3; // Max 3 submissions per hour
  };

  const recordSubmission = () => {
    const submissions = JSON.parse(sessionStorage.getItem('formSubmissions') || '[]');
    submissions.push(Date.now());
    sessionStorage.setItem('formSubmissions', JSON.stringify(submissions));
  };

  // Load Hebrew font
  React.useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  const t = translations[language];
  const team = teamTranslations[language];
  const servicesList = servicesTranslations[language];
  const isRTL = language === 'he';

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    // Security: Check honeypot (bots fill this hidden field)
    if (honeypot) {
      console.log('Bot detected');
      setFormStatus('success'); // Fake success to confuse bots
      return;
    }

    // Security: Rate limiting
    if (!checkRateLimit()) {
      setFormStatus('rateLimit');
      setTimeout(() => setFormStatus(null), 5000);
      return;
    }

    // Security: Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormStatus('invalidEmail');
      setTimeout(() => setFormStatus(null), 5000);
      return;
    }

    try {
      setFormStatus('sending');
      const subject = language === 'he' 
        ? 'הודעה חדשה מאתר אמיר רוזנברג רו"ח'
        : 'New message from Amir CPA site';
      const body = language === 'he'
        ? `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
            <h2 style="color: #1a3a70; border-bottom: 3px solid #4a7bc8; padding-bottom: 10px;">הודעה חדשה מהאתר</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 10px 0;"><strong style="color: #2c5aa0;">שם:</strong> ${formData.name}</p>
              <p style="margin: 10px 0;"><strong style="color: #2c5aa0;">אימייל:</strong> <a href="mailto:${formData.email}" style="color: #4a7bc8;">${formData.email}</a></p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 15px;">
              <p style="margin: 0 0 10px 0;"><strong style="color: #2c5aa0;">הודעה:</strong></p>
              <p style="color: #4a5f8a; line-height: 1.6; white-space: pre-wrap;">${formData.message}</p>
            </div>
          </div>
        `
        : `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
            <h2 style="color: #1a3a70; border-bottom: 3px solid #4a7bc8; padding-bottom: 10px;">New Message from Website</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 10px 0;"><strong style="color: #2c5aa0;">Name:</strong> ${formData.name}</p>
              <p style="margin: 10px 0;"><strong style="color: #2c5aa0;">Email:</strong> <a href="mailto:${formData.email}" style="color: #4a7bc8;">${formData.email}</a></p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 15px;">
              <p style="margin: 0 0 10px 0;"><strong style="color: #2c5aa0;">Message:</strong></p>
              <p style="color: #4a5f8a; line-height: 1.6; white-space: pre-wrap;">${formData.message}</p>
            </div>
          </div>
        `;
      
      // EmailJS - You need to set up your account at https://www.emailjs.com/
      // Replace these with your actual EmailJS credentials:
      // SERVICE_ID: Create an email service in EmailJS dashboard
      // TEMPLATE_ID: Create an email template in EmailJS dashboard  
      // PUBLIC_KEY: Found in EmailJS Account > API Keys
      await emailjs.send(
        'service_r1qchyc',
        'template_7c53xhy',
        {
          to_email: 'amir@arcpa.com',
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        'wMn1r948isd8EyrD6' // Replace with your EmailJS public key
      );
      recordSubmission(); // Track successful submission for rate limiting
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(null), 5000);
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus(null), 5000);
    }
  };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-white" style={{ fontFamily: isRTL ? "'Heebo', sans-serif" : "system-ui, -apple-system, sans-serif" }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-[#8b9dc3]/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row-reverse justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/logo.png" 
                alt={language === 'he' ? 'אמיר רוזנברג ושות׳' : 'Amir Rozenberg & Co.'} 
                className="h-16 w-auto object-contain"
              />
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { label: t.nav.home, id: 'hero' },
                { label: t.nav.about, id: 'about' },
                { label: t.nav.services, id: 'services' },
                { label: t.nav.contact, id: 'contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-slate-600 hover:text-[#0c2340] transition-colors font-medium relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8b9dc3] group-hover:w-full transition-all duration-300" />
                </button>
              ))}
              
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'he' ? 'en' : 'he')}
                className="px-3 py-1.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700"
              >
                {language === 'he' ? 'EN' : 'עב'}
              </button>

              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-[#0c2340] hover:bg-[#0a1d35] text-white px-6 shadow-lg shadow-[#0c2340]/30"
              >
                {t.nav.cta}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
              <button
                onClick={() => setLanguage(language === 'he' ? 'en' : 'he')}
                className="px-3 py-1.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium text-slate-700"
              >
                {language === 'he' ? 'EN' : 'עב'}
              </button>
              <button 
                className="p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100"
            >
              <div className="px-4 py-4 space-y-3">
                {[
                  { label: t.nav.home, id: 'hero' },
                  { label: t.nav.about, id: 'about' },
                  { label: t.nav.services, id: 'services' },
                  { label: t.nav.contact, id: 'contact' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full py-3 text-slate-600 hover:text-[#0f172a] font-medium border-b border-slate-100 ${isRTL ? 'text-right' : 'text-left'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-20 min-h-screen flex items-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f0f4ff] via-[#e8f1ff] to-[#d4e5ff]" />
        
        {/* Elegant Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.4]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 0 0 L 100 0 L 100 100 L 0 100 Z' fill='none' stroke='%236b8fd9' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '50px 50px'
        }} />
        
        {/* Diagonal Lines Overlay */}
        <div className="absolute inset-0 opacity-[0.15]" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 50px,
            rgba(107, 143, 217, 0.15) 50px,
            rgba(107, 143, 217, 0.15) 51px
          )`
        }} />
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] bg-[#b8d0f7]/40 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-[10%] w-[400px] h-[400px] bg-[#a5c2f0]/30 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#cfe0ff]/25 rounded-full blur-[140px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-6 mb-8">
                <img 
                  src="/amir.png"
                  alt="CPA Amir Rozenberg"
                  className="w-24 h-24 rounded-2xl object-cover shadow-2xl border-4 border-white"
                />
                <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md text-[#2c5aa0] border border-[#6b8fd9]/40 px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg">
                  <Award className="w-4 h-4 text-[#4a7bc8]" />
                  {t.hero.badge}
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#1a3a70] leading-tight mb-6">
                {t.hero.title}
                <span className="block bg-gradient-to-r from-[#4a7bc8] via-[#6b8fd9] to-[#4a7bc8] bg-clip-text text-transparent mt-3">{t.hero.subtitle}</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#4a5f8a] leading-relaxed mb-10 max-w-xl">
                {t.hero.desc}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  onClick={() => scrollToSection('services')}
                  className="bg-[#4a7bc8] hover:bg-[#3d6ab5] text-white px-8 py-6 text-lg font-semibold shadow-xl shadow-[#4a7bc8]/30 border-0"
                >
                  {t.hero.btnPrimary}
                  {isRTL ? <ArrowLeft className="w-5 h-5 mr-2" /> : <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />}
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection('about')}
                  className="border-2 border-[#4a7bc8] bg-white/80 backdrop-blur-md text-[#2c5aa0] hover:bg-white hover:border-[#3d6ab5] px-8 py-6 text-lg font-semibold"
                >
                  {t.hero.btnSecondary}
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#b8d0f7]/50 to-[#cfe0ff]/40 rounded-[2rem] blur-2xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/30 rounded-3xl backdrop-blur-sm border border-[#6b8fd9]/40" />
                
                <img 
                  src="/office.png"
                  alt="Professional accounting office"
                  className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Stats Row */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24"
          >
            {t.stats.map((stat, index) => {
              const Icon = stats[index].icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-[#b8d0f7]/50 text-center hover:scale-105 transition-transform duration-300"
                  >
                  <div className="w-14 h-14 bg-gradient-to-br from-[#6b8fd9] to-[#4a7bc8] rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#6b8fd9]/30">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-[#1a3a70] mb-1">{stat.value}</p>
                  <p className="text-slate-600 font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-slate-100/50 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-[#e8f1ff] border border-[#b8d0f7] text-[#2c5aa0] px-5 py-2 rounded-full text-sm font-semibold mb-6">
              <Users className="w-4 h-4" />
              {t.about.badge}
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#1a3a70] via-[#2c5aa0] to-[#1a3a70] bg-clip-text text-transparent mb-6">{t.about.title}</h2>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
              {t.about.desc}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}
              >
                <Card className={`h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group ${index === 0 ? 'bg-gradient-to-br from-[#4a7bc8] via-[#3d6ab5] to-[#2c5aa0] text-white' : 'bg-white hover:bg-blue-50/30'}`}>
                  <CardContent className="p-8 relative">
                    {/* Decorative corner */}
                    <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-32 h-32 ${index === 0 ? 'bg-white/10' : 'bg-blue-100/50'} rounded-full -translate-y-16 ${isRTL ? '-translate-x-16' : 'translate-x-16'} group-hover:scale-150 transition-transform duration-700`} />

                    <div className="h-6 mb-6" />
                    <h3 className={`text-2xl font-bold mb-2 ${index === 0 ? 'text-white' : 'text-[#1a3a70]'}`}>
                      {member.name}
                    </h3>
                    <p className={`font-semibold mb-5 text-lg ${index === 0 ? 'text-blue-100' : 'text-[#4a7bc8]'}`}>
                      {member.role}
                    </p>
                    <ul className="space-y-3">
                      {member.description.map((desc, i) => (
                        <li key={i} className={`text-sm flex items-start gap-3 ${index === 0 ? 'text-blue-50' : 'text-slate-600'}`}>
                          <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${index === 0 ? 'text-blue-200' : 'text-[#4a7bc8]'}`} />
                          <span className="leading-relaxed">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-[#e8f1ff] border border-[#b8d0f7] text-[#2c5aa0] px-5 py-2 rounded-full text-sm font-semibold mb-6">
              <Receipt className="w-4 h-4" />
              {t.services.badge}
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#1a3a70] via-[#2c5aa0] to-[#1a3a70] bg-clip-text text-transparent mb-6">{t.services.title}</h2>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
              {t.services.desc}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Accordion type="single" collapsible className="space-y-6">
                {servicesList.map((service, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border-0 rounded-2xl overflow-hidden bg-gradient-to-br from-white to-blue-50/30 shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <AccordionTrigger className="px-7 py-6 hover:no-underline group">
                      <div className={`flex items-center gap-4 ${isRTL ? 'text-right' : 'text-left'} w-full`}>
                        <div className="w-14 h-14 bg-gradient-to-br from-[#4a7bc8] to-[#3d6ab5] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <service.icon className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-xl font-bold text-[#1a3a70]">{service.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-7 pb-7">
                      <p className="text-slate-600 mb-5 leading-relaxed text-base">{service.description}</p>
                      <div className="bg-white border border-blue-100 rounded-xl p-5 shadow-sm">
                        <p className="text-sm font-semibold text-[#2c5aa0] mb-4 flex items-center gap-2">
                          <div className="w-1 h-5 bg-[#6b8fd9] rounded-full" />
                          {t.services.subheading}
                        </p>
                        <ul className="space-y-3">
                          {service.points.map((point, i) => (
                            <li key={i} className={`text-sm text-slate-600 flex items-start gap-3 ${isRTL ? '' : ''}`}>
                              <div className="w-2 h-2 bg-gradient-to-br from-[#6b8fd9] to-[#4a7bc8] rounded-full mt-1.5 flex-shrink-0" />
                              <span className="leading-relaxed">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative hidden lg:block"
            >
              <div className="sticky top-32 space-y-8">
                <div className="bg-gradient-to-br from-[#4a7bc8] via-[#3d6ab5] to-[#2c5aa0] rounded-3xl p-10 text-white shadow-2xl border border-[#b8d0f7]/30 relative overflow-hidden">
                  {/* Decorative gradient orb */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl" />

                  <h3 className="text-2xl font-bold mb-6 relative">{t.services.whyUs}</h3>
                  <ul className="space-y-4 relative">
                    {t.services.whyPoints.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-blue-50">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={() => scrollToSection('contact')}
                    className="w-full mt-8 bg-white text-[#2c5aa0] hover:bg-blue-50 py-6 text-lg font-semibold shadow-xl border-0"
                  >
                    {t.services.cta}
                  </Button>
                </div>

                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop"
                    alt="Financial calculations and accounting"
                    className="w-full h-[300px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c2340]/50 to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-gradient-to-b from-[#f0f4ff] via-[#e8f1ff] to-[#f0f4ff] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#b8d0f720_1px,transparent_1px),linear-gradient(to_bottom,#b8d0f720_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#b8d0f7]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#cfe0ff]/30 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-white border border-[#b8d0f7] text-[#2c5aa0] px-5 py-2 rounded-full text-sm font-semibold mb-6">
              <Mail className="w-4 h-4 text-[#4a7bc8]" />
              {t.contact.badge}
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#1a3a70] via-[#2c5aa0] to-[#1a3a70] bg-clip-text text-transparent mb-6">{t.contact.title}</h2>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
              {t.contact.desc}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border border-[#b8d0f7]/50 shadow-2xl bg-white">
                <CardContent className="p-10">
                  <h3 className="text-3xl font-bold text-[#1a3a70] mb-8">{t.contact.formTitle}</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Honeypot field - hidden from users, bots will fill it */}
                    <input
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      style={{ position: 'absolute', left: '-9999px', opacity: 0 }}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">{t.contact.name} *</label>
                      <Input 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="h-14 border-blue-200 focus:border-[#4a7bc8] focus:ring-[#4a7bc8] bg-white text-lg"
                        placeholder={t.contact.namePlaceholder}
                        required
                        maxLength={100}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">{t.contact.email} *</label>
                      <Input 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="h-14 border-blue-200 focus:border-[#4a7bc8] focus:ring-[#4a7bc8] bg-white text-lg"
                        placeholder={t.contact.emailPlaceholder}
                        required
                        maxLength={100}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">{t.contact.message} *</label>
                      <Textarea 
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="min-h-[180px] border-blue-200 focus:border-[#4a7bc8] focus:ring-[#4a7bc8] bg-white text-lg resize-none"
                        placeholder={t.contact.messagePlaceholder}
                        required
                        maxLength={2000}
                      />
                    </div>
                    <Button 
                      type="submit"
                      disabled={formStatus === 'sending'}
                      className="w-full bg-[#4a7bc8] hover:bg-[#3d6ab5] text-white py-7 text-lg font-bold shadow-xl shadow-[#4a7bc8]/30 border-0 disabled:opacity-50"
                    >
                      {formStatus === 'sending' ? (language === 'he' ? 'שולח...' : 'Sending...') : t.contact.submit}
                    </Button>
                    {formStatus === 'success' && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-green-500 text-center font-semibold bg-green-50 border border-green-200 rounded-lg p-4"
                      >
                        {t.contact.success}
                      </motion.p>
                    )}
                    {formStatus === 'error' && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-center font-semibold bg-red-50 border border-red-200 rounded-lg p-4"
                      >
                        {language === 'he' ? 'שגיאה בשליחת ההודעה. אנא נסו שוב.' : 'Error sending message. Please try again.'}
                      </motion.p>
                    )}
                    {formStatus === 'rateLimit' && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-orange-500 text-center font-semibold bg-orange-50 border border-orange-200 rounded-lg p-4"
                      >
                        {language === 'he' ? 'שלחת יותר מדי הודעות. אנא נסה שוב מאוחר יותר.' : 'Too many messages sent. Please try again later.'}
                      </motion.p>
                    )}
                    {formStatus === 'invalidEmail' && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-center font-semibold bg-red-50 border border-red-200 rounded-lg p-4"
                      >
                        {language === 'he' ? 'כתובת אימייל לא תקינה.' : 'Invalid email address.'}
                      </motion.p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map & Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Map */}
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=HaRakevet+58+Tel+Aviv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-white rounded-3xl overflow-hidden h-[320px] border border-[#b8d0f7]/50 shadow-2xl hover:shadow-3xl transition-shadow duration-300 relative group"
              >
                <iframe
                  title="Office map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.1234567890!2d34.7891234!3d32.0654321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDAzJzU1LjYiTiAzNMKwNDcnMjAuOCJF!5e0!3m2!1sen!2sil!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, pointerEvents: 'none' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Clickable overlay */}
                <div className="absolute inset-0 bg-transparent group-hover:bg-[#4a7bc8]/10 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 bg-[#4a7bc8] text-white px-4 py-2 rounded-lg font-medium shadow-lg transition-opacity duration-300">
                    {language === 'he' ? 'פתח בגוגל מפות' : 'Open in Google Maps'}
                  </span>
                </div>
              </a>

              {/* Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=HaRakevet+58+Tel+Aviv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="border border-[#b8d0f7]/50 bg-white shadow-xl hover:shadow-2xl hover:bg-blue-50/30 transition-all duration-300 cursor-pointer">
                    <CardContent className="p-6 flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#6b8fd9] to-[#4a7bc8] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <MapPin className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#1a3a70] mb-1">{t.contact.address}</p>
                        <p className="text-slate-600 text-sm">
                          {language === 'he' ? 'הרכבת 58, תל אביב-יפו' : '58 HaRakevet St, Tel Aviv'}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </a>

                <Card className="border border-[#b8d0f7]/50 bg-white shadow-xl hover:shadow-2xl hover:bg-blue-50/30 transition-all duration-300">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#6b8fd9] to-[#4a7bc8] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Phone className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1a3a70] mb-1">{t.contact.phone}</p>
                      <a href="tel:03-6134313" className="text-slate-600 hover:text-[#4a7bc8] transition-colors text-sm">03-6134313</a>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* CTA Box */}
              <div className="bg-gradient-to-br from-[#e8f1ff] to-[#d4e5ff] rounded-3xl p-8 border border-[#b8d0f7]/50 shadow-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#4a7bc8] rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1a3a70]">{t.contact.hoursTitle}</h3>
                </div>
                <div className="space-y-2 text-[#2c5aa0]">
                  <p className="font-medium">{t.contact.hours1}</p>
                  <p className="text-slate-600 text-sm mt-4 bg-white/60 rounded-lg p-3">{t.contact.hoursNote}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a3a70] text-white py-20 border-t border-[#2c5aa0]/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="mb-6">
                <img 
                  src="/logo.png" 
                  alt={language === 'he' ? 'אמיר רוזנברג ושות׳' : 'Amir Rozenberg & Co.'} 
                  className="h-16 w-auto object-contain"
                />
              </div>
              <p className="text-slate-400 leading-relaxed">
                {t.footer.desc}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">{t.footer.quickLinks}</h4>
              <ul className="space-y-3">
                {[
                  { label: t.nav.home, id: 'hero' },
                  { label: t.nav.about, id: 'about' },
                  { label: t.nav.services, id: 'services' },
                  { label: t.nav.contact, id: 'contact' }
                ].map((item) => (
                  <li key={item.id}>
                    <button 
                      onClick={() => scrollToSection(item.id)}
                      className="text-blue-200 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <ChevronDown className={`w-4 h-4 ${isRTL ? '-rotate-90' : 'rotate-90'}`} />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-white">{t.footer.contactInfo}</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-300 flex-shrink-0 mt-0.5" />
                  <span className="text-blue-200">{language === 'he' ? 'הרכבת 58, תל אביב-יפו' : '58 HaRakevet St, Tel Aviv-Yafo'}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-300 flex-shrink-0" />
                  <a href="tel:03-6134313" className="text-blue-200 hover:text-white transition-colors">03-6134313</a>
                </li>
              </ul>
            </div>
            </div>

            <div className="border-t border-[#2c5aa0]/30 pt-8">
            <p className="text-center text-blue-200 text-sm">
              © {new Date().getFullYear()} {t.footer.copyright}
            </p>
            </div>
        </div>
      </footer>
    </div>
  );
}