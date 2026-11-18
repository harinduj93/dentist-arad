"use client";
import React, { useState, useRef, useEffect } from 'react';
import {
  Phone,
  Calendar,
  MapPin,
  Clock,
  Mail,
  CheckCircle2,
  Star,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  ChevronDown,
  Search,
  X,
  ArrowRight,
  Menu,
  SlidersHorizontal,
  Award,
  Stethoscope,
  Smile,
  Microscope,
  Layers,
  Crown,
  Activity,
  Send,
  ExternalLink
} from 'lucide-react';

// --- DATA: SERVICES ---
const SERVICES_DATA = [
  {
    id: 'protetica',
    title: 'Protetică & Coroane Zirconiu',
    subtitle: 'Coroane fizionomice fără metal',
    description:
      'Restaurări protetice din zirconiu integral, ceramică presată E-Max, inlay/onlay și proteze mobile flexibile sau scheletate realizate cu precizie CAD-CAM.',
    duration: '45 - 60 min',
    startingPrice: '200 lei',
    icon: Crown,
    tag: 'Popular',
  },
  {
    id: 'estetica',
    title: 'Estetică Dentară & Fațete',
    subtitle: 'Zâmbet natural și luminos',
    description:
      'Fațete din ceramică presată, coroane frontale din zirconiu, albire și aplicare de bijuterii dentare Swarovski pentru un zâmbet armonios.',
    duration: '45 - 60 min',
    startingPrice: '300 lei',
    icon: Sparkles,
    tag: 'Estetică',
  },
  {
    id: 'endodontie',
    title: 'Endodonție & Terapie',
    subtitle: 'Salvarea dinților naturali',
    description:
      'Extirpare vitală cu anestezie, obturații radiculare pe canal, tratamentul gangrenei și obturații fizionomice din compozit fotopolimerizabil.',
    duration: '60 - 90 min',
    startingPrice: '100 lei',
    icon: Microscope,
    tag: 'Precizie',
  },
  {
    id: 'chirurgie',
    title: 'Chirurgie Dentară',
    subtitle: 'Intervenții blânde fără durere',
    description:
      'Extracții dentare monoradiculare, pluriradiculare și alveoloplastice cu hemostază și sutură, chiuretaj alveolar și drenaj abces în condiții de maximă siguranță.',
    duration: '30 - 60 min',
    startingPrice: '100 lei',
    icon: ShieldCheck,
    tag: 'Fără durere',
  },
  {
    id: 'profilaxie',
    title: 'Consultații & Profilaxie',
    subtitle: 'Prevenție completă & Igienizare',
    description:
      'Consultații stomatologice complete, detartraj cu ultrasunete și periaj profesional pe arcadă, precum și gutiere personalizate pentru bruxism.',
    duration: '30 - 45 min',
    startingPrice: '100 lei',
    icon: Activity,
    tag: 'Recomandat la 6 luni',
  },
  {
    id: 'reparatii-proteze',
    title: 'Proteze & Reabilitare Orală',
    subtitle: 'Confort și funcționalitate',
    description:
      'Proteze mobile acrilice, elastice (flexibile) și scheletate, rebazări directe/indirecte, pivoți din zirconiu și reparații rapide în laborator.',
    duration: '45 - 60 min',
    startingPrice: '100 lei',
    icon: Smile,
    tag: 'Confort',
  },
];

// --- DATA: OFFICIAL 2026 PRICE LIST (35 TARIFE) ---
const PRICE_LIST = [
  {
    id: 1,
    name: 'Consultație',
    category: 'Consultații & Profilaxie',
    unit: 'ședință',
    price: 100,
    priceLabel: '100 lei',
  },
  {
    id: 2,
    name: 'Obturație compozit fotopolimerizabil',
    category: 'Endodonție & Terapie',
    unit: 'dinte',
    price: 250,
    priceLabel: '250 lei',
  },
  {
    id: 3,
    name: 'Extirpare vitală (scoaterea nervului) cu anestezie',
    category: 'Endodonție & Terapie',
    unit: 'canal',
    price: 200,
    priceLabel: '200 lei / canal',
  },
  {
    id: 4,
    name: 'Obturația radiculară',
    category: 'Endodonție & Terapie',
    unit: 'canal',
    price: 200,
    priceLabel: '200 lei / canal',
  },
  {
    id: 5,
    name: 'Pansament calmant',
    category: 'Endodonție & Terapie',
    unit: 'ședință',
    price: 100,
    priceLabel: '100 lei',
  },
  {
    id: 6,
    name: 'Obturație foto după extirpare vitală',
    category: 'Endodonție & Terapie',
    unit: 'dinte',
    price: 250,
    priceLabel: '250 lei',
  },
  {
    id: 7,
    name: 'Extracția dentară monoradiculari',
    category: 'Chirurgie Dentară',
    unit: 'dinte',
    price: 300,
    priceLabel: '300 lei',
  },
  {
    id: 8,
    name: 'Extracția dentară pluriradiculari',
    category: 'Chirurgie Dentară',
    unit: 'dinte',
    price: 400,
    priceLabel: '400 lei',
  },
  {
    id: 9,
    name: 'Extracția alveoloplastică (hemostază și sutură)',
    category: 'Chirurgie Dentară',
    unit: 'intervenție',
    price: 300,
    priceLabel: '300 lei',
  },
  {
    id: 10,
    name: 'Chiuretaj alveolar',
    category: 'Chirurgie Dentară',
    unit: 'alveolă',
    price: 100,
    priceLabel: '100 lei',
  },
  {
    id: 11,
    name: 'Incizie și drenaj abces',
    category: 'Chirurgie Dentară',
    unit: 'intervenție',
    price: 200,
    priceLabel: '200 lei',
  },
  {
    id: 12,
    name: 'Tratamentul parodontitei apicale acute (abces)',
    category: 'Endodonție & Terapie',
    unit: 'ședință',
    price: 100,
    priceLabel: '100 lei / ședință',
  },
  {
    id: 13,
    name: 'Tratamentul gangrenei',
    category: 'Endodonție & Terapie',
    unit: 'ședință',
    price: 100,
    priceLabel: '100 lei / ședință',
  },
  {
    id: 14,
    name: 'Tratamentul afecțiunilor mucoasei bucale',
    category: 'Consultații & Profilaxie',
    unit: 'ședință',
    price: 100,
    priceLabel: '100 lei / ședință',
  },
  {
    id: 15,
    name: 'Detartraj cu ultrasunete și periaj profesional',
    category: 'Consultații & Profilaxie',
    unit: 'arcadă',
    price: 200,
    priceLabel: '200 lei / arcadă',
  },
  {
    id: 16,
    name: 'Coroană metalică (nefizionomică)',
    category: 'Protetică & Coroane',
    unit: 'element',
    price: 250,
    priceLabel: '250 lei / element',
  },
  {
    id: 17,
    name: 'Coroană fizionomică (fără metal) zirconiu în zona laterală',
    category: 'Protetică & Coroane',
    unit: 'element',
    price: 700,
    priceLabel: '700 lei / element',
  },
  {
    id: 18,
    name: 'Coroană fizionomică (fără metal) zirconiu în zona frontală',
    category: 'Protetică & Coroane',
    unit: 'element',
    price: 850,
    priceLabel: '850 lei / element',
  },
  {
    id: 19,
    name: 'Coroană metalo-ceramică fizionomică',
    category: 'Protetică & Coroane',
    unit: 'element',
    price: 600,
    priceLabel: '600 lei / element',
  },
  {
    id: 20,
    name: 'Ceramică pe capă presată (E-Max)',
    category: 'Protetică & Coroane',
    unit: 'element',
    price: 800,
    priceLabel: '800 lei / element',
  },
  {
    id: 21,
    name: 'Fațete ceramică presată',
    category: 'Estetică & Diverse',
    unit: 'element',
    price: 800,
    priceLabel: '800 lei / element',
  },
  {
    id: 22,
    name: 'Inlay/Onlay din ceramică',
    category: 'Protetică & Coroane',
    unit: 'element',
    price: 600,
    priceLabel: '600 lei / element',
  },
  {
    id: 23,
    name: 'Coroană din acrilat provizorie (CAD-CAM)',
    category: 'Protetică & Coroane',
    unit: 'element',
    price: 200,
    priceLabel: '200 lei / element',
  },
  {
    id: 24,
    name: 'Coroană metalo-ceramică semi-fizionomică',
    category: 'Protetică & Coroane',
    unit: 'element',
    price: 400,
    priceLabel: '400 lei / element',
  },
  {
    id: 25,
    name: 'Proteză mobilă acrilică (clasică)',
    category: 'Protetică & Coroane',
    unit: 'proteză',
    price: 1600,
    priceLabel: '1.600 lei',
  },
  {
    id: 26,
    name: 'Proteză mobilă flexibila (elastică)',
    category: 'Protetică & Coroane',
    unit: 'proteză',
    price: 2600,
    priceLabel: '2.600 lei',
  },
  {
    id: 27,
    name: 'Proteză scheletată',
    category: 'Protetică & Coroane',
    unit: 'proteză',
    price: 3500,
    priceLabel: '3.500 lei',
  },
  {
    id: 28,
    name: 'Rebazare directă și indirectă (căptușire proteză)',
    category: 'Protetică & Coroane',
    unit: 'proteză',
    price: 400,
    priceLabel: '400 lei',
  },
  {
    id: 29,
    name: 'Dispozitiv corono-radicular (pivot) metalic',
    category: 'Protetică & Coroane',
    unit: 'element',
    price: 300,
    priceLabel: '300 lei / element',
  },
  {
    id: 30,
    name: 'Dispozitiv corono-radicular (pivot) zirconiu, estetic',
    category: 'Protetică & Coroane',
    unit: 'element',
    price: 300,
    priceLabel: '300 lei / element',
  },
  {
    id: 31,
    name: 'Reparație proteză',
    category: 'Protetică & Coroane',
    unit: 'intervenție',
    price: 200,
    priceLabel: '200 lei',
  },
  {
    id: 32,
    name: 'Reparație croșet proteză',
    category: 'Protetică & Coroane',
    unit: 'croșet',
    price: 150,
    priceLabel: '150 lei / croșet',
  },
  {
    id: 33,
    name: 'Completare dinte în proteză',
    category: 'Protetică & Coroane',
    unit: 'dinte',
    price: 100,
    priceLabel: '100 lei / dinte',
  },
  {
    id: 34,
    name: 'Bijuterie dentară Swarovski (piatră plus aplicare)',
    category: 'Estetică & Diverse',
    unit: 'aplicare',
    price: 300,
    priceLabel: '300 lei',
  },
  {
    id: 35,
    name: 'Gutieră Bruxism',
    category: 'Estetică & Diverse',
    unit: 'gutieră',
    price: 300,
    priceLabel: '300 lei',
  },
];

const PRICE_CATEGORIES = [
  'Toate',
  'Consultații & Profilaxie',
  'Endodonție & Terapie',
  'Chirurgie Dentară',
  'Protetică & Coroane',
  'Estetică & Diverse',
];

// --- DATA: FAQ ---
const FAQ_DATA = [
  {
    question: 'Este dureros tratamentul stomatologic sau extracția dentară?',
    answer:
      'Nu. Folosim protocoale moderne de anestezie locală blândă și tehnici minim invazive, astfel încât intervențiile — de la extirparea vitală până la extracții — se desfășoară fără durere. Acordăm timp suplimentar și explicăm fiecare pas înainte de a începe.',
  },
  {
    question: 'Care este programul de funcționare al cabinetului din Arad?',
    answer:
      'Cabinetul este deschis Luni, Miercuri și Joi între orele 12:00 – 18:00, iar Marți și Vineri între orele 10:00 – 16:00. Sâmbăta și Duminica este închis. Vă recomandăm programarea prealabilă la 0747 822 251 sau 0757 255 275.',
  },
  {
    question: 'Oferiți planuri de tratament personalizate și transparente?',
    answer:
      'Da, în cadrul consultației (100 lei) evaluăm starea dentară și stabilim împreună un plan clar de tratament, etapizat, cu tarife exacte afișate transparent în lista noastră de prețuri.',
  },
  {
    question: 'Unde vă găsim în Arad și cum putem ajunge?',
    answer:
      'Cabinetul Stomatologic Dr. Bucur Ioana este situat central în Arad, pe Str. Calea Iuliu Maniu 7, Bloc P4, Ap. 2 (cod poștal 310222), cu acces facil atât cu mașina personală, cât și cu transportul în comun.',
  },
  {
    question: 'Cât de des este recomandat detartrajul cu ultrasunete și periajul profesional?',
    answer:
      'Pentru menținerea sănătății gingiilor și prevenirea cariilor, recomandăm o ședință de detartraj cu ultrasunete și periaj profesional (200 lei / arcadă) o dată la 6 luni.',
  },
];

// --- COMPONENT: INTERACTIVE BEFORE/AFTER SLIDER ---
function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(52);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e) => {
      if (isDragging) handleMove(e.clientX);
    };
    const handleTouchMove = (e) => {
      if (isDragging && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        ref={containerRef}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          if (e.touches[0]) handleMove(e.touches[0].clientX);
        }}
        className="relative w-full h-[320px] sm:h-[420px] rounded-3xl overflow-hidden select-none cursor-ew-resize shadow-xl border border-[#0F5257]/15 bg-[#F4F1EA]"
        role="slider"
        aria-label="Comparație înainte și după tratament estetic"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setSliderPosition((p) => Math.max(5, p - 5));
          if (e.key === 'ArrowRight') setSliderPosition((p) => Math.min(95, p + 5));
        }}
      >
        {/* AFTER STATE (Full Base Layer - Bright, Harmonious Ceramic Veneers & Whitening) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#e7f3f3] via-[#f7fbfb] to-[#e4efe9] flex flex-col items-center justify-center p-6">
          <div className="text-center mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0F5257] text-white shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> DUPĂ TRATAMENT (Fațete E-max & Albire)
            </span>
          </div>

          {/* Stylized High-Precision Dental Arch Illustration - AFTER */}
          <svg
            viewBox="0 0 500 220"
            className="w-full max-w-md h-auto drop-shadow-md"
            aria-hidden="true"
          >
            {/* Soft Lip Contour */}
            <path
              d="M 40 110 Q 250 15 460 110 Q 250 215 40 110 Z"
              fill="#e39d96"
              opacity="0.35"
            />
            <path
              d="M 65 110 Q 250 42 435 110 Q 250 185 65 110 Z"
              fill="#3d1e22"
            />
            {/* Healthy Pink Gums */}
            <path
              d="M 85 104 Q 250 56 415 104 L 415 86 Q 250 45 85 86 Z"
              fill="#f2a6a0"
            />
            {/* Bright Symmetrical White Teeth (Upper Arch) */}
            {[
              { x: 96, y: 88, w: 26, h: 36, r: 8 },
              { x: 125, y: 84, w: 30, h: 42, r: 9 },
              { x: 158, y: 80, w: 34, h: 48, r: 10 },
              { x: 195, y: 77, w: 48, h: 54, r: 11 },
              { x: 247, y: 77, w: 48, h: 54, r: 11 },
              { x: 298, y: 80, w: 34, h: 48, r: 10 },
              { x: 335, y: 84, w: 30, h: 42, r: 9 },
              { x: 368, y: 88, w: 26, h: 36, r: 8 },
            ].map((t, idx) => (
              <g key={idx}>
                <rect
                  x={t.x}
                  y={t.y}
                  width={t.w}
                  height={t.h}
                  rx={t.r}
                  fill="#ffffff"
                  stroke="#e2ecec"
                  strokeWidth="1.5"
                />
                {/* Natural enamel sheen */}
                <rect
                  x={t.x + 5}
                  y={t.y + 6}
                  width={t.w * 0.25}
                  height={t.h * 0.55}
                  rx={4}
                  fill="#f0f9f9"
                />
              </g>
            ))}
            {/* Lower Arch Hint */}
            {[135, 168, 202, 236, 270, 304, 338].map((lx, i) => (
              <rect
                key={i}
                x={lx}
                y={135}
                width={28}
                height={24}
                rx={7}
                fill="#fafdfd"
                opacity="0.92"
              />
            ))}
          </svg>

          <p className="mt-3 text-xs sm:text-sm font-medium text-[#0F5257]">
            Nuanță naturală B1 • Simetrie gingivală • Rezultat în 2 ședințe
          </p>
        </div>

        {/* BEFORE STATE (Clipped Layer - Discolored, Slightly Uneven Enamel) */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#ebe5d8] via-[#f4efe4] to-[#e4dccb] flex flex-col items-center justify-center p-6"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <div className="text-center mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#5c5346] text-white shadow-sm">
              ÎNAINTE DE TRATAMENT
            </span>
          </div>

          {/* Stylized Dental Arch Illustration - BEFORE */}
          <svg
            viewBox="0 0 500 220"
            className="w-full max-w-md h-auto"
            aria-hidden="true"
          >
            <path
              d="M 40 110 Q 250 15 460 110 Q 250 215 40 110 Z"
              fill="#cfa09a"
              opacity="0.35"
            />
            <path
              d="M 65 110 Q 250 42 435 110 Q 250 185 65 110 Z"
              fill="#3d1e22"
            />
            <path
              d="M 85 104 Q 250 56 415 104 L 415 86 Q 250 45 85 86 Z"
              fill="#df8c86"
            />
            {/* Yellowed & Slightly Irregular Teeth */}
            {[
              { x: 96, y: 90, w: 26, h: 33, r: 7, rot: -2 },
              { x: 125, y: 85, w: 30, h: 40, r: 8, rot: 3 },
              { x: 158, y: 82, w: 33, h: 44, r: 8, rot: -3 },
              { x: 194, y: 78, w: 48, h: 51, r: 9, rot: 2 },
              { x: 248, y: 79, w: 47, h: 49, r: 9, rot: -2 },
              { x: 299, y: 81, w: 33, h: 45, r: 8, rot: 3 },
              { x: 335, y: 85, w: 30, h: 39, r: 8, rot: -2 },
              { x: 368, y: 89, w: 26, h: 34, r: 7, rot: 2 },
            ].map((t, idx) => (
              <g
                key={idx}
                transform={`rotate(${t.rot} ${t.x + t.w / 2} ${t.y + t.h / 2})`}
              >
                <rect
                  x={t.x}
                  y={t.y}
                  width={t.w}
                  height={t.h}
                  rx={t.r}
                  fill="#e6d6a8"
                  stroke="#cbb882"
                  strokeWidth="1.5"
                />
                {/* Slight staining line */}
                <rect
                  x={t.x + 3}
                  y={t.y + 3}
                  width={t.w - 6}
                  height={6}
                  rx={3}
                  fill="#d5c089"
                  opacity="0.7"
                />
              </g>
            ))}
            {[135, 168, 202, 236, 270, 304, 338].map((lx, i) => (
              <rect
                key={i}
                x={lx}
                y={136}
                width={28}
                height={22}
                rx={6}
                fill="#dfd0a3"
                opacity="0.9"
              />
            ))}
          </svg>

          <p className="mt-3 text-xs sm:text-sm font-medium text-[#5c5346]">
            Discromie dentară • Uzură a marginilor incizale
          </p>
        </div>

        {/* SLIDER HANDLE */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.35)] pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#0F5257] text-white border-4 border-white shadow-lg flex items-center justify-center">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
        </div>

        {/* Corner Badges */}
        <div className="absolute bottom-4 left-4 px-3 py-1 rounded-lg bg-black/55 backdrop-blur-sm text-white text-xs font-medium pointer-events-none">
          Înainte
        </div>
        <div className="absolute bottom-4 right-4 px-3 py-1 rounded-lg bg-[#0F5257]/90 backdrop-blur-sm text-white text-xs font-medium pointer-events-none">
          După
        </div>
      </div>
      <p className="text-center text-xs text-slate-500 mt-3">
        Trageți cursorul stânga-dreapta pentru a compara rezultatul estetic.
      </p>
    </div>
  );
}

// --- MAIN APPLICATION ---
export default function App() {
  // Navigation & UI State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState('Consultație');

  // Price List Filter State
  const [activeCategory, setActiveCategory] = useState('Toate');
  const [searchQuery, setSearchQuery] = useState('');

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Appointment Form State
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    service: 'Consultație',
    date: '',
    timeSlot: 'Luni / Miercuri / Joi (12:00 - 18:00)',
    notes: '',
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Quick Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [contactSent, setContactSent] = useState(false);

  // Open Booking Modal with optional pre-selected service
  const openBookingWithService = (serviceName = 'Consultație') => {
    setSelectedServiceForBooking(serviceName);
    setBookingForm((prev) => ({ ...prev, service: serviceName }));
    setBookingSubmitted(false);
    setBookingModalOpen(true);
  };

  // Filtered Price Items
  const filteredPrices = PRICE_LIST.filter((item) => {
    const matchesCategory = activeCategory === 'Toate' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle Appointment Submit
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookingForm.name.trim() || !bookingForm.phone.trim()) return;
    setBookingSubmitted(true);
  };

  // Handle Contact Submit
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.message.trim()) return;
    setContactSent(true);
    setTimeout(() => {
      setContactForm({ name: '', email: '', phone: '', message: '' });
    }, 300);
  };

  const navLinks = [
    { label: 'Acasă', href: '#acasa' },
    { label: 'Servicii', href: '#servicii' },
    { label: 'Rezultate', href: '#rezultate' },
    { label: 'Tarife', href: '#tarife' },
    { label: 'Despre Noi', href: '#despre' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div
      className="min-h-screen bg-[#FAFAFA] text-slate-800 selection:bg-[#0F5257] selection:text-white pb-20 md:pb-0"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif" }}
    >
      {/* --- 1. STICKY NAVIGATION HEADER --- */}
      <header className="sticky top-0 z-40 bg-[#FAFAFA]/90 backdrop-blur-md border-b border-[#0F5257]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <a href="#acasa" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-[#0F5257] text-white flex items-center justify-center shadow-sm group-hover:bg-[#0c4246] transition-colors">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-none stroke-current"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5.5c-1.5-2-4-2.5-5.5-1.5-2 1.3-2.2 4.3-1.2 7.2.8 2.4 1.3 5.8 2.7 6.3 1.2.4 1.8-1.8 2.5-3.5.4-1 1-1.5 1.5-1.5s1.1.5 1.5 1.5c.7 1.7 1.3 3.9 2.5 3.5 1.4-.5 1.9-3.9 2.7-6.3 1-2.9.8-5.9-1.2-7.2-1.5-1-4-.5-5.5 1.5z" />
                </svg>
              </div>
              <div>
                <span className="block text-base sm:text-lg font-bold tracking-tight text-[#0F5257] leading-tight">
                  Dr. Bucur Ioana
                </span>
                <span className="block text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  Stomatologie Arad
                </span>
              </div>
            </a>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-7" aria-label="Meniu principal">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-[#0F5257] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="tel:+40747822251"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-[#0F5257] bg-[#F4F1EA] hover:bg-[#e9e4d8] transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>0747 822 251</span>
              </a>
              <button
                onClick={() => openBookingWithService('Consultație')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#D97757] hover:bg-[#c86646] shadow-sm hover:shadow transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Programează-te</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-[#0F5257] hover:bg-[#F4F1EA] transition-colors"
              aria-label="Deschide meniul"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAFAFA] border-b border-[#0F5257]/10 px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-base font-medium text-slate-700 hover:bg-[#F4F1EA] hover:text-[#0F5257]"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2.5 px-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBookingWithService('Consultație');
                }}
                className="w-full py-3 rounded-xl text-center font-semibold text-white bg-[#D97757]"
              >
                Programează-te Online
              </button>
            </div>
          </div>
        )}
      </header>

      {/* --- 2. HERO SECTION --- */}
      <section id="acasa" className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              {/* Google Rating Trust Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#F4F1EA] border border-[#0F5257]/10">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-[#0F5257]">
                  5.0 ★ Recenzii Pacienți • Str. Calea Iuliu Maniu 7, Arad
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-[#0F5257] tracking-tight leading-[1.14]">
                Zâmbete sănătoase, îngrijire blândă și tehnologie modernă în inima Aradului
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                La <strong>Cabinet Stomatologic Dr. Bucur Ioana</strong>, îmbinăm empatia cu
                tratamentele stomatologice de ultimă generație. Fiecare vizită este gândită
                pentru confortul tău deplin, fără teamă și fără durere.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  onClick={() => openBookingWithService('Consultație')}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl text-base font-semibold text-white bg-[#D97757] hover:bg-[#c86646] shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Programează o consultație</span>
                </button>
                <a
                  href="#tarife"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-base font-semibold text-[#0F5257] bg-[#F4F1EA] hover:bg-[#e9e3d5] transition-colors"
                >
                  <span>Vezi toate tarifele (35)</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Key Clinic Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0F5257]/10 text-[#0F5257] flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0F5257]">Fără durere</p>
                    <p className="text-xs text-slate-500">Anestezie blândă & grijă</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0F5257]/10 text-[#0F5257] flex items-center justify-center shrink-0">
                    <Microscope className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0F5257]">Tehnologie digitală</p>
                    <p className="text-xs text-slate-500">Precizie și sterilizare 100%</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0F5257]/10 text-[#0F5257] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0F5257]">Programări rapide</p>
                    <p className="text-xs text-slate-500">Fără timp pierdut în așteptare</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Architectural / Modern Dental Clinic Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-[2rem] bg-[#F4F1EA] p-6 sm:p-8 border border-[#0F5257]/10 shadow-xl">
                {/* Architectural Clinic Illustration Card */}
                <div className="rounded-2xl bg-gradient-to-br from-[#0F5257] via-[#15666c] to-[#0a3c40] p-6 sm:p-8 text-white relative overflow-hidden">
                  {/* Decorative organic rings */}
                  <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/5" />
                  <div className="absolute -left-10 -bottom-10 w-36 h-36 rounded-full bg-[#D97757]/20" />

                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-white/15 text-xs font-medium backdrop-blur-sm">
                        Clinică Modernă • Arad
                      </span>
                      <ShieldCheck className="w-6 h-6 text-[#D97757]" />
                    </div>

                    {/* Minimalist Clinic Interior Architectural SVG */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
                      <svg
                        viewBox="0 0 360 180"
                        className="w-full h-auto"
                        aria-label="Ilustrație cabinet stomatologic modern"
                      >
                        {/* Warm sunlit window */}
                        <rect x="20" y="16" width="95" height="115" rx="12" fill="#F4F1EA" opacity="0.92" />
                        <line x1="67" y1="16" x2="67" y2="131" stroke="#0F5257" strokeWidth="2" opacity="0.25" />
                        <line x1="20" y1="72" x2="115" y2="72" stroke="#0F5257" strokeWidth="2" opacity="0.25" />

                        {/* Indoor botanical plant */}
                        <rect x="44" y="112" width="24" height="22" rx="4" fill="#D97757" />
                        <path d="M56 112 C45 96, 38 92, 46 82 C52 90, 55 100, 56 112 Z" fill="#68b09a" />
                        <path d="M56 112 C67 94, 76 90, 68 80 C62 88, 58 100, 56 112 Z" fill="#84c7b2" />

                        {/* Modern Ergonomic Dental Chair */}
                        <rect x="175" y="128" width="110" height="14" rx="7" fill="#ffffff" opacity="0.9" />
                        <path
                          d="M 165 92 Q 210 112 265 105 L 295 118 Q 305 123 295 128 L 215 124 Q 170 118 155 96 Z"
                          fill="#F4F1EA"
                        />
                        {/* Headrest */}
                        <rect x="142" y="82" width="24" height="12" rx="6" fill="#D97757" />
                        {/* Overhead Surgical LED Lamp */}
                        <path d="M 275 130 L 275 45 L 225 32" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
                        <ellipse cx="218" cy="33" rx="18" ry="7" transform="rotate(-15 218 33)" fill="#D97757" />
                        {/* Soft light cone */}
                        <polygon points="205,38 230,35 245,95 185,95" fill="#ffffff" opacity="0.12" />
                      </svg>
                    </div>

                    <div>
                      <p className="text-lg font-bold">Cabinet Stomatologic Dr. Bucur Ioana</p>
                      <p className="text-sm text-white/80 flex items-center gap-1.5 mt-1">
                        <MapPin className="w-4 h-4 text-[#D97757] shrink-0" />
                        Str. Calea Iuliu Maniu 7, Bloc P4, Ap. 2, Arad
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-white/85">
                      <span>L, Mi, J: 12:00–18:00 • Ma, Vi: 10:00–16:00</span>
                      <span className="font-semibold text-[#f3a68c]">Tel: 0747 822 251</span>
                    </div>
                  </div>
                </div>

                {/* Floating Patient Testimonial Card */}
                <div className="mt-4 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#0F5257]/10 text-[#0F5257] font-bold flex items-center justify-center shrink-0 text-sm">
                    AM
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 italic">
                      „O experiență minunată! Doamna doctor are o răbdare extraordinară, totul a
                      fost complet fără durere, iar cabinetul arată impecabil.”
                    </p>
                    <p className="text-xs font-semibold text-[#0F5257] mt-1">
                      Andreea M. • Pacient Arad
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. SERVICES SECTION (SERVICII STOMATOLOGICE) --- */}
      <section id="servicii" className="py-16 sm:py-24 bg-[#F4F1EA]/65 border-y border-[#0F5257]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97757]">
              Tratamente Complete
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#0F5257] tracking-tight">
              Servicii Stomatologice Moderne
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Abordăm fiecare caz multidisciplinar, folosind materiale biocompatibile și echipamente
              digitale pentru rezultate predictibile pe termen lung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SERVICES_DATA.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className="group bg-white rounded-3xl p-7 border border-slate-200/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-[#0F5257]/10 text-[#0F5257] group-hover:bg-[#0F5257] group-hover:text-white transition-colors flex items-center justify-center">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F4F1EA] text-[#0F5257]">
                        {service.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#0F5257] mb-1">{service.title}</h3>
                    <p className="text-xs font-medium text-[#D97757] mb-3">{service.subtitle}</p>
                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#0F5257]" /> {service.duration}
                      </span>
                      <span className="font-semibold text-[#0F5257] tabular-nums">
                        de la {service.startingPrice}
                      </span>
                    </div>

                    <button
                      onClick={() => openBookingWithService(service.title)}
                      className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-[#0F5257] bg-[#F4F1EA] group-hover:bg-[#D97757] group-hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Programează {service.title.split(' ')[0]}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- 4. INTERACTIVE BEFORE/AFTER SMILE COMPARISON SLIDER --- */}
      <section id="rezultate" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97757]">
              Transformări Reale & Naturale
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#0F5257] tracking-tight">
              Estetică Dentară: Înainte & După
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Redăm strălucirea și proporțiile naturale ale zâmbetului prin fațete ceramice
              minim-invazive și albire profesională fără sensibilitate.
            </p>
          </div>

          <BeforeAfterSlider />
        </div>
      </section>

      {/* --- 5. SEARCHABLE & FILTERABLE PRICE LIST (TARIFE TRANSPARENTE) --- */}
      <section id="tarife" className="py-16 sm:py-24 bg-[#F4F1EA]/65 border-y border-[#0F5257]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97757]">
              Fără Costuri Ascunse
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#0F5257] tracking-tight">
              Tarife Transparente
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Caută rapid tratamentul dorit sau filtrează pe categorii. Prețurile sunt exprimate în
              RON și includ materialele de cea mai înaltă calitate.
            </p>
          </div>

          {/* Search & Category Controls */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200/80 mb-6 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Caută în cele 35 de tarife (ex: consultație, zirconiu, extracție, proteză, detartraj)..."
                className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-[#FAFAFA] border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F5257]/30 focus:border-[#0F5257]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  aria-label="Șterge căutarea"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills & Counter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {PRICE_CATEGORIES.map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0F5257] text-white shadow-sm'
                          : 'bg-[#F4F1EA] text-slate-700 hover:bg-[#e8e2d5]'
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
              <span className="text-xs font-medium text-slate-500 shrink-0">
                Afișate: <strong className="text-[#0F5257]">{filteredPrices.length}</strong> din{' '}
                {PRICE_LIST.length} tarife
              </span>
            </div>
          </div>

          {/* Price Table Rows */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
            {filteredPrices.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {filteredPrices.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:px-7 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAFAFA] transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-start gap-2.5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-[#F4F1EA] text-[#0F5257] text-xs font-bold shrink-0 mt-0.5 tabular-nums">
                          {item.id}
                        </span>
                        <p className="text-sm sm:text-base font-semibold text-slate-800">
                          {item.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 pl-8">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#F4F1EA] text-[#0F5257] font-medium">
                          {item.category}
                        </span>
                        <span>Unitate: {item.unit}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 pl-8 sm:pl-0 border-t sm:border-t-0 border-slate-100">
                      <span className="text-base sm:text-lg font-extrabold text-[#0F5257] tabular-nums whitespace-nowrap">
                        {item.priceLabel}
                      </span>
                      <button
                        onClick={() => openBookingWithService(item.name)}
                        className="px-3.5 py-2 rounded-xl text-xs font-semibold text-[#D97757] bg-[#D97757]/10 hover:bg-[#D97757] hover:text-white transition-colors cursor-pointer shrink-0"
                      >
                        Programează
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center space-y-3">
                <p className="text-base font-semibold text-slate-700">
                  Nu am găsit niciun tratament pentru „{searchQuery}”.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('Toate');
                  }}
                  className="text-sm font-semibold text-[#0F5257] underline"
                >
                  Resetează filtrele
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --- 6. ABOUT THE CLINIC & DOCTOR (DESPRE DR. BUCUR IOANA) --- */}
      <section id="despre" className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0F5257] rounded-[2.5rem] p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-xl">
            <div className="absolute right-0 bottom-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              {/* Doctor Profile Portrait Card */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl bg-[#F4F1EA] text-slate-800 p-6 sm:p-8 shadow-lg">
                  <div className="w-20 h-20 rounded-2xl bg-[#0F5257] text-white flex items-center justify-center mb-5 shadow-md">
                    <Stethoscope className="w-10 h-10" />
                  </div>
                  <span className="inline-block px-3 py-1 rounded-full bg-[#D97757]/15 text-[#D97757] text-xs font-bold mb-2">
                    Medic Stomatolog Fondator
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#0F5257]">Dr. Bucur Ioana</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Stomatologie Generală, Estetică Dentară & Protetică
                  </p>

                  <div className="mt-6 pt-6 border-t border-slate-200 space-y-3 text-sm">
                    <div className="flex items-center gap-2.5 text-slate-700">
                      <Award className="w-4 h-4 text-[#0F5257] shrink-0" />
                      <span>Membru al Colegiului Medicilor Stomatologi din România</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-700">
                      <ShieldCheck className="w-4 h-4 text-[#0F5257] shrink-0" />
                      <span>Protocoale stricte de sterilizare și trasabilitate</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-slate-700">
                      <MapPin className="w-4 h-4 text-[#D97757] shrink-0" />
                      <span>Str. Calea Iuliu Maniu 7, Bloc P4, Ap. 2, Arad</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Empathy & Clinic Philosophy Copy */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#f3a68c]">
                  Despre Cabinetul Nostru
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  Credem într-o stomatologie calmă, bazată pe încredere și respect față de pacient
                </h2>
                <p className="text-base text-white/85 leading-relaxed">
                  Am creat <strong>Cabinetul Stomatologic Dr. Bucur Ioana</strong> din dorința de a
                  oferi locuitorilor din Arad un spațiu medical primitor, unde vizita la dentist nu
                  mai este asociată cu stresul. Ascultăm cu atenție fiecare dorință și explicăm pe
                  înțelesul tuturor opțiunile de tratament.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <p className="font-bold text-white flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#f3a68c]" />
                      Sterilizare la standarde europene
                    </p>
                    <p className="text-xs text-white/75 mt-1">
                      Autoclav clasa B și instrumentar sigilat individual pentru fiecare pacient.
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                    <p className="font-bold text-white flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#f3a68c]" />
                      Abordare conservatoare
                    </p>
                    <p className="text-xs text-white/75 mt-1">
                      Prioritizăm întotdeauna salvarea și protejarea structurii naturale a dintelui.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => openBookingWithService('Consultație')}
                    className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl text-sm sm:text-base font-semibold text-white bg-[#D97757] hover:bg-[#c86646] shadow-lg transition-all cursor-pointer"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Programează o vizită cunoaștere</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 7. INTERACTIVE FAQ ACCORDION --- */}
      <section id="faq" className="py-16 sm:py-24 bg-[#F4F1EA]/65 border-y border-[#0F5257]/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D97757]">
              Întrebări Frecvente
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#0F5257] tracking-tight">
              Tot ce trebuie să știi înainte de vizită
            </h2>
          </div>

          <div className="space-y-3.5">
            {FAQ_DATA.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAFAFA] transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-bold text-[#0F5257]">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#0F5257] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3.5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- 8. CONTACT & FOOTER SECTION --- */}
      <footer id="contact" className="pt-16 sm:pt-24 pb-12 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12">
            {/* Clinic Details & Location Card */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#D97757]">
                  Contact & Localizare
                </span>
                <h2 className="mt-2 text-3xl font-extrabold text-[#0F5257]">
                  Te așteptăm cu drag la cabinet
                </h2>
                <p className="mt-2 text-slate-600 text-sm sm:text-base">
                  Suntem situați central în Arad, pe Str. Calea Iuliu Maniu 7. Ne poți contacta
                  telefonic, pe email sau prin formularul de programare online.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4 p-4 rounded-2xl bg-[#F4F1EA]">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0F5257] text-white flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0F5257]">Adresă Cabinet</p>
                      <p className="text-sm text-slate-700">
                        Str. Calea Iuliu Maniu 7, Bloc P4, Ap. 2, Arad, 310222, România
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Calea+Iuliu+Maniu+7,+Bloc+P4,+Arad,+Romania"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#0F5257] bg-white hover:bg-[#0F5257] hover:text-white transition-colors shrink-0 shadow-2xs"
                  >
                    <span>Deschide în Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F4F1EA]">
                  <div className="w-10 h-10 rounded-xl bg-[#0F5257] text-white flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#0F5257]">Program de Lucru</p>
                    <p className="text-sm text-slate-700">
                      Luni, Miercuri, Joi: <strong>12:00 – 18:00</strong>
                    </p>
                    <p className="text-sm text-slate-700">
                      Marți, Vineri: <strong>10:00 – 16:00</strong>
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">Sâmbătă – Duminică: Închis</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#F4F1EA]">
                    <Phone className="w-5 h-5 text-[#D97757] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-slate-500">Telefon Programări</p>
                      <a
                        href="tel:+40747822251"
                        className="block text-sm font-bold text-[#0F5257] hover:underline"
                      >
                        0747 822 251
                      </a>
                      <a
                        href="tel:+40757255275"
                        className="block text-xs font-semibold text-slate-600 hover:text-[#0F5257] mt-0.5"
                      >
                        Secundar: 0757 255 275
                      </a>
                    </div>
                  </div>

                  <a
                    href="mailto:contact@dentistarad.ro"
                    className="flex items-start gap-3 p-4 rounded-2xl bg-[#F4F1EA] hover:bg-[#eae4d7] transition-colors"
                  >
                    <Mail className="w-5 h-5 text-[#0F5257] shrink-0 mt-0.5" />
                    <div className="overflow-hidden">
                      <p className="text-xs text-slate-500">Email</p>
                      <p className="text-sm font-bold text-[#0F5257] truncate">
                        contact@dentistarad.ro
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">Răspuns în max. 24h</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Interactive Quick Message Form */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
                <h3 className="text-xl font-bold text-[#0F5257] mb-1">Trimite-ne un mesaj rapid</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Ai o întrebare despre un tratament? Îți răspundem în cel mai scurt timp.
                </p>

                {contactSent ? (
                  <div className="p-6 rounded-2xl bg-[#0F5257]/10 text-[#0F5257] text-center space-y-2">
                    <CheckCircle2 className="w-10 h-10 mx-auto text-[#0F5257]" />
                    <p className="font-bold text-base">Mesajul tău a fost trimis!</p>
                    <p className="text-sm text-slate-600">
                      Îți mulțumim. Echipa Dr. Bucur Ioana te va contacta în curând.
                    </p>
                    <button
                      onClick={() => setContactSent(false)}
                      className="mt-2 text-xs font-semibold underline cursor-pointer"
                    >
                      Trimite alt mesaj
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Nume și Prenume *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Ex: Popescu Elena"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] border border-slate-200 text-sm focus:outline-none focus:border-[#0F5257]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Telefon
                        </label>
                        <input
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, phone: e.target.value })
                          }
                          placeholder="07xx xxx xxx"
                          className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] border border-slate-200 text-sm focus:outline-none focus:border-[#0F5257]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, email: e.target.value })
                          }
                          placeholder="nume@email.ro"
                          className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] border border-slate-200 text-sm focus:outline-none focus:border-[#0F5257]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Mesajul tău *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={contactForm.message}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, message: e.target.value })
                        }
                        placeholder="Scrie aici întrebarea ta..."
                        className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] border border-slate-200 text-sm focus:outline-none focus:border-[#0F5257]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl text-sm font-semibold text-white bg-[#0F5257] hover:bg-[#0b4044] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Trimite Mesajul</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Google Maps Embed */}
          <div className="pb-14 border-b border-slate-200">
            <div className="bg-white rounded-3xl p-3 sm:p-4 border border-slate-200/80 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2 pb-3">
                <div className="flex items-center gap-2 text-sm font-bold text-[#0F5257]">
                  <MapPin className="w-4 h-4 text-[#D97757]" />
                  <span>Localizare Google Maps — Str. Calea Iuliu Maniu 7, Bloc P4, Ap. 2, Arad</span>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Calea+Iuliu+Maniu+7,+Bloc+P4,+Arad,+Romania"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D97757] hover:underline"
                >
                  <span>Deschide în Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden bg-[#F4F1EA]">
                <iframe
                  title="Harta Google Maps - Cabinet Stomatologic Dr. Bucur Ioana Arad"
                  src="https://www.google.com/maps?q=Calea+Iuliu+Maniu+7,+Bloc+P4,+Arad,+Romania&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              © {new Date().getFullYear()} Cabinet Stomatologic Dr. Bucur Ioana (dentistarad.ro).
              Toate drepturile rezervate.
            </p>
            <div className="flex items-center gap-6">
              <a href="#acasa" className="hover:text-[#0F5257]">
                Acasă
              </a>
              <a href="#servicii" className="hover:text-[#0F5257]">
                Servicii
              </a>
              <a href="#tarife" className="hover:text-[#0F5257]">
                Tarife
              </a>
              <a href="#contact" className="hover:text-[#0F5257]">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* --- FIXED MOBILE BOTTOM ACTION BAR --- */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href="tel:+40747822251"
            className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-[#0F5257] bg-[#F4F1EA]"
          >
            <Phone className="w-4 h-4" />
            <span>Sună Acum</span>
          </a>
          <button
            onClick={() => openBookingWithService('Consultație')}
            className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white bg-[#D97757]"
          >
            <Calendar className="w-4 h-4" />
            <span>Programare Online</span>
          </button>
        </div>
      </div>

      {/* --- 9. INTERACTIVE APPOINTMENT BOOKING MODAL --- */}
      {bookingModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-[#0F5257] px-6 py-5 text-white flex items-center justify-between">
              <div>
                <h3 id="modal-title" className="text-lg font-bold">
                  Programare Online
                </h3>
                <p className="text-xs text-white/80">
                  Cabinet Stomatologic Dr. Bucur Ioana • Arad
                </p>
              </div>
              <button
                onClick={() => setBookingModalOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Închide fereastra"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-7">
              {bookingSubmitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#0F5257]/10 text-[#0F5257] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="text-xl font-extrabold text-[#0F5257]">
                    Solicitare de programare înregistrată!
                  </h4>
                  <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Îți mulțumim, <strong>{bookingForm.name}</strong>! Te vom contacta telefonic la{' '}
                    <strong>{bookingForm.phone}</strong> pentru confirmarea orei exacte pentru{' '}
                    <span className="text-[#0F5257] font-semibold">{bookingForm.service}</span>.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setBookingModalOpen(false)}
                      className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#0F5257] hover:bg-[#0b4044] cursor-pointer"
                    >
                      Înapoi la site
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Serviciul / Tratamentul dorit
                    </label>
                    <select
                      value={bookingForm.service}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, service: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:border-[#0F5257]"
                    >
                      {PRICE_LIST.map((item) => (
                        <option key={item.id} value={item.name}>
                          {item.name} ({item.priceLabel})
                        </option>
                      ))}
                      {!PRICE_LIST.some((item) => item.name === selectedServiceForBooking) && (
                        <option value={selectedServiceForBooking}>
                          {selectedServiceForBooking}
                        </option>
                      )}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Data preferată
                      </label>
                      <input
                        type="date"
                        value={bookingForm.date}
                        onChange={(e) =>
                          setBookingForm({ ...bookingForm, date: e.target.value })
                        }
                        className="w-full px-3.5 py-3 rounded-xl bg-[#FAFAFA] border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-[#0F5257]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Interval orar
                      </label>
                      <select
                        value={bookingForm.timeSlot}
                        onChange={(e) =>
                          setBookingForm({ ...bookingForm, timeSlot: e.target.value })
                        }
                        className="w-full px-3.5 py-3 rounded-xl bg-[#FAFAFA] border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-[#0F5257]"
                      >
                        <option>Luni / Miercuri / Joi (12:00 - 18:00)</option>
                        <option>Marți / Vineri (10:00 - 16:00)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Nume și Prenume *
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingForm.name}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, name: e.target.value })
                      }
                      placeholder="Ex: Ionescu Andrei"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] border border-slate-200 text-sm focus:outline-none focus:border-[#0F5257]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Număr de telefon *
                    </label>
                    <input
                      type="tel"
                      required
                      value={bookingForm.phone}
                      onChange={(e) =>
                        setBookingForm({ ...bookingForm, phone: e.target.value })
                      }
                      placeholder="07xx xxx xxx"
                      className="w-full px-4 py-3 rounded-xl bg-[#FAFAFA] border border-slate-200 text-sm focus:outline-none focus:border-[#0F5257]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-[#D97757] hover:bg-[#c86646] shadow-md transition-all cursor-pointer mt-2"
                  >
                    Confirmă Solicitarea de Programare
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}