import React, { useState, useEffect } from 'react';
import { Star, Moon, Sun, BookOpen, CheckCircle, Award, ChevronLeft, ChevronRight, PenTool, User, CloudUpload, ArrowRight, Book, Settings, Camera, X, Heart, MessageCircle, List, Calendar, Palette, Sparkles, Loader2 } from 'lucide-react';

// --- DATA: KOLEKSI DOA ---
const DAFTAR_DOA = [
  { judul: "1. Doa Saat Bangun Tidur", arab: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ", latin: "Alhamdu lillahil-ladzi ahyana ba'da ma amatana wa ilaihin-nushur.", arti: "Segala puji bagi Allah yang menghidupkan kami kembali setelah mematikan kami dan kepada-Nya (kami) akan dibangkitkan." },
  { judul: "2. Doa Sebelum Makan", arab: "اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ", latin: "Allahumma baarik lanaa fiimaa razaqtanaa wa qinaa 'adzaaban naar.", arti: "Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa neraka." },
  { judul: "3. Doa Berbuka Puasa", arab: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللهُ", latin: "Dzahabazh-zhama'u wabtallatil 'uruuqu wa tsabatal ajru insyaa-allaah.", arti: "Telah hilang dahaga, telah basah urat-urat, dan telah tetap pahala, Insya Allah." },
  { judul: "4. Doa Masuk Masjid", arab: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ", latin: "Allahummaftah lii abwaaba rahmatik.", arti: "Ya Allah, bukalah untukku pintu-pintu rahmat-Mu." },
  { judul: "5. Doa Keluar Rumah", arab: "بِسْمِ اللهِ، تَوَكَّلْتُ عَلَى اللهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ", latin: "Bismillaahi tawakkaltu 'alallaah, wa laa haula wa laa quwwata illaa billaah.", arti: "Dengan nama Allah, aku bertawakkal kepada Allah. Tiada daya dan kekuatan kecuali dengan pertolongan Allah." }
];

// --- TEMA WARNA ---
const THEMES = {
  emerald: { id: 'emerald', name: 'Hijau Eden', bg: 'bg-emerald-50', header: 'bg-emerald-600', text: 'text-emerald-800', textLight: 'text-emerald-600', border: 'border-emerald-500', accent: 'emerald', secondary: 'orange', btnGradient: 'from-orange-400 to-orange-500' },
  blue: { id: 'blue', name: 'Biru Langit', bg: 'bg-blue-50', header: 'bg-blue-600', text: 'text-blue-800', textLight: 'text-blue-600', border: 'border-blue-500', accent: 'blue', secondary: 'yellow', btnGradient: 'from-blue-500 to-indigo-600' },
  violet: { id: 'violet', name: 'Ungu Lailatul', bg: 'bg-violet-50', header: 'bg-violet-600', text: 'text-violet-800', textLight: 'text-violet-600', border: 'border-violet-500', accent: 'violet', secondary: 'amber', btnGradient: 'from-violet-500 to-fuchsia-600' },
  rose: { id: 'rose', name: 'Merah Ceria', bg: 'bg-rose-50', header: 'bg-rose-600', text: 'text-rose-800', textLight: 'text-rose-600', border: 'border-rose-500', accent: 'rose', secondary: 'teal', btnGradient: 'from-rose-500 to-pink-600' },
  amber: { id: 'amber', name: 'Emas Gurun', bg: 'bg-amber-50', header: 'bg-amber-600', text: 'text-amber-900', textLight: 'text-amber-700', border: 'border-amber-500', accent: 'amber', secondary: 'emerald', btnGradient: 'from-amber-500 to-orange-600' }
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

const getGregorianDate = (startDate, dayIndex) => {
  if (!startDate) return "";
  const date = new Date(startDate);
  date.setDate(date.getDate() + (dayIndex - 1));
  return formatDate(date);
};

// --- FUNGSI KOMPRESI GAMBAR (PENTING AGAR TIDAK CRASH) ---
const compressImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800; // Maksimal lebar 800px (cukup untuk laporan)
        const scaleSize = MAX_WIDTH / img.width;
        
        // Jika gambar lebih kecil dari batas, tidak perlu resize dimensi
        const newWidth = (scaleSize < 1) ? MAX_WIDTH : img.width;
        const newHeight = (scaleSize < 1) ? (img.height * scaleSize) : img.height;

        canvas.width = newWidth;
        canvas.height = newHeight;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        
        // Ubah ke JPEG dengan kualitas 60% (Cukup jelas tapi ringan)
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.6);
        resolve(compressedDataUrl);
      }
    }
  });
};

export default function App() {
  const [activeDay, setActiveDay] = useState(1);
  const [userData, setUserData] = useState({});
  const [studentProfile, setStudentProfile] = useState({ 
    name: '', class: '', scriptUrl: '', startDateRamadan: '2026-02-18', schoolName: 'Sekolah Dasar Islam Terpadu', theme: 'emerald' 
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [view, setView] = useState('cover'); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [isCompressing, setIsCompressing] = useState(false); // Status kompresi

  const currentTheme = THEMES[studentProfile.theme] || THEMES.emerald;

  useEffect(() => {
    const savedData = localStorage.getItem('ramadanJournalData');
    const savedProfile = localStorage.getItem('ramadanProfile');
    
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      for (let i = 1; i <= 30; i++) {
        // Migrasi data lama jika ada field baru
        if (!parsedData[i]) parsedData[i] = {};
        if (!parsedData[i].hasOwnProperty('salatMalam')) parsedData[i].salatMalam = false;
        if (!parsedData[i].hasOwnProperty('kosakata')) parsedData[i].kosakata = false;
        if (!parsedData[i].hasOwnProperty('witir')) parsedData[i].witir = false; 
      }
      setUserData(parsedData);
    } else {
      const initialData = {};
      for (let i = 1; i <= 30; i++) {
        initialData[i] = {
          puasa: false, subuh: false, zuhur: false, ashar: false, maghrib: false, isya: false, 
          tarawih: false, witir: false, tadarus: false, 
          salatMalam: false, kosakata: false, bantuIbu: false, hafalDoa: "", amalanLain: "", amalanLainCheck: false,
          validated: false 
        };
      }
      setUserData(initialData);
    }

    if (savedProfile) {
      setStudentProfile(JSON.parse(savedProfile));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(userData).length > 0) localStorage.setItem('ramadanJournalData', JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    localStorage.setItem('ramadanProfile', JSON.stringify(studentProfile));
  }, [studentProfile]);

  const toggleCheck = (day, field) => {
    if (userData[day]?.validated) return;
    setUserData(prev => ({ ...prev, [day]: { ...prev[day], [field]: !prev[day][field] } }));
  };

  const updateField = (day, field, value) => {
    if (userData[day]?.validated) return;
    setUserData(prev => ({ ...prev, [day]: { ...prev[day], [field]: value } }));
  };

  const toggleValidation = (day) => {
    setUserData(prev => ({ ...prev, [day]: { ...prev[day], validated: !prev[day].validated } }));
    if (!userData[day].validated) triggerConfetti();
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsCompressing(true); // Tampilkan loading
      setSelectedImage(file.name);
      
      try {
        // Kompres gambar dulu sebelum disimpan ke state
        const compressedBase64 = await compressImage(file);
        setBase64Image(compressedBase64);
      } catch (error) {
        alert("Gagal memproses gambar.");
      } finally {
        setIsCompressing(false); // Selesai loading
      }
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setBase64Image("");
  };

  const calculateDailyScore = (dayData, dayNum) => {
    let score = 0;
    if (!dayData) return 0;
    if (dayData.puasa) score += 20;
    if (dayData.subuh) score += 10;
    if (dayData.zuhur) score += 10;
    if (dayData.ashar) score += 10;
    if (dayData.maghrib) score += 10;
    if (dayData.isya) score += 10;
    if (dayData.tarawih) score += 10;
    if (dayData.witir) score += 10; 
    if (dayData.tadarus) score += 10;
    if (dayData.salatMalam) score += (dayNum >= 21) ? 20 : 10;
    if (dayData.kosakata) score += 5;
    if (dayData.bantuIbu) score += 5;
    if (dayData.hafalDoa && dayData.hafalDoa !== "") score += 10;
    if (dayData.amalanLainCheck && dayData.amalanLain !== "") score += 5;
    return score;
  };

  const calculateTotalScore = () => {
    let score = 0;
    Object.entries(userData).forEach(([dayKey, dayData]) => {
      score += calculateDailyScore(dayData, parseInt(dayKey));
    });
    return score;
  };

  const sendToGoogleSheet = async (e) => {
    if (e) e.preventDefault(); // Mencegah reload halaman

    if (!studentProfile.scriptUrl) {
      alert("⚠️ Link Laporan Guru belum diisi!\nMinta link tersebut ke gurumu, lalu masukkan di menu Pengaturan.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const currentDayData = userData[activeDay];
      if (!currentDayData) throw new Error("Data hari ini belum siap");

      let catatanLengkap = [];
      if (currentDayData.salatMalam) catatanLengkap.push("✅ Salat Malam");
      if (currentDayData.tarawih) catatanLengkap.push("✅ Tarawih");
      if (currentDayData.witir) catatanLengkap.push("✅ Witir");
      if (currentDayData.kosakata) catatanLengkap.push("✅ Hafal Kosakata");
      if (currentDayData.bantuIbu) catatanLengkap.push("✅ Bantu Ibu");
      if (currentDayData.hafalDoa) catatanLengkap.push(`✅ Doa: ${currentDayData.hafalDoa}`);
      if (currentDayData.amalanLainCheck && currentDayData.amalanLain) catatanLengkap.push(`✅ Extra: ${currentDayData.amalanLain}`);
      
      const payload = {
        nama: studentProfile.name,
        kelas: studentProfile.class,
        hari: activeDay,
        poin: calculateDailyScore(currentDayData, activeDay), 
        puasa: currentDayData.puasa,
        tarawih: currentDayData.tarawih, 
        kebaikan: catatanLengkap.join(", "),
        foto: base64Image, // Ini sudah versi kompres (kecil)
        namaFoto: selectedImage
      };

      // Gunakan fetch dengan try-catch yang aman
      await fetch(studentProfile.scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Penting untuk Google Script
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload)
      });

      // Karena no-cors, kita asumsikan berhasil jika tidak error network
      setSubmitStatus('success');
      triggerConfetti();
      alert(`✅ Alhamdulillah! Laporan Hari ke-${activeDay} berhasil dikirim.`);
      removeImage();

    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
      alert("❌ Gagal mengirim data. Pastikan internet lancar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const startBook = () => {
    if (!studentProfile.name || !studentProfile.class) {
      alert("Isi Nama dan Kelas dulu ya!");
      return;
    }
    setView('journal');
  };

  const currentData = userData[activeDay] || {};
  const totalScore = calculateTotalScore();
  const currentDateGregorian = getGregorianDate(studentProfile.startDateRamadan, activeDay);
  const isLast10Days = activeDay >= 21;

  // --- RENDER HALAMAN ---

  // 1. HALAMAN SAMPUL
  if (view === 'cover') {
    return (
      <div className={`min-h-screen ${currentTheme.bg} flex items-center justify-center p-4 font-sans relative`}>
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className={`absolute top-4 right-4 bg-white p-2 rounded-full shadow-md text-slate-400 hover:${currentTheme.textLight} z-50`}
        >
          <Settings size={24} />
        </button>

        {showSettings && (
          <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-slate-700">Pengaturan</h3>
                <button onClick={() => setShowSettings(false)}><X size={24} className="text-slate-400" /></button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1 block">Nama Sekolah</label>
                  <input type="text" className="w-full p-2 border rounded-lg text-sm" value={studentProfile.schoolName} onChange={(e) => setStudentProfile(prev => ({...prev, schoolName: e.target.value}))} />
                </div>
                <div>
                   <label className="text-xs font-bold text-slate-500 mb-2 block">Pilih Tema</label>
                   <div className="flex gap-2 justify-center flex-wrap">
                      {Object.values(THEMES).map((t) => (
                         <button key={t.id} onClick={() => setStudentProfile(prev => ({...prev, theme: t.id}))} className={`w-8 h-8 rounded-full border-2 ${t.header} ${studentProfile.theme === t.id ? 'ring-2 ring-slate-400 border-white' : 'border-transparent'}`} />
                      ))}
                   </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1 block">Link Script Guru</label>
                  <input type="text" className="w-full p-2 border rounded-lg text-xs" placeholder="https://script.google.com/..." value={studentProfile.scriptUrl} onChange={(e) => setStudentProfile(prev => ({...prev, scriptUrl: e.target.value}))} />
                </div>
                <button onClick={() => setShowSettings(false)} className={`w-full ${currentTheme.header} text-white py-2 rounded-lg font-bold`}>Simpan</button>
              </div>
            </div>
          </div>
        )}

        <div className={`bg-white max-w-sm w-full rounded-3xl shadow-2xl overflow-hidden border-4 ${currentTheme.border} relative pb-8`}>
          <div className={`absolute top-0 left-0 w-full h-40 ${currentTheme.header} rounded-b-[50%] z-0`}></div>
          <div className="relative z-10 p-6 flex flex-col items-center text-center mt-4">
            <div className={`bg-white p-3 rounded-full shadow-xl mb-4 w-28 h-28 flex items-center justify-center border-4 border-${currentTheme.secondary}-400`}>
               <BookOpen size={48} className={currentTheme.text} />
            </div>
            <h1 className={`text-2xl font-bold ${currentTheme.text} font-serif leading-tight mb-2`}>Buku Amaliah<br/>Ramadan</h1>
            <h2 className="text-xs font-semibold text-white/90 bg-black/20 px-3 py-1 rounded-full mb-6">1446 H</h2>

            <div className="w-full space-y-3 mb-6">
              <input type="text" className="w-full p-3 border rounded-xl bg-slate-50 text-center font-bold text-slate-700" placeholder="Nama Lengkap" value={studentProfile.name} onChange={(e) => setStudentProfile(prev => ({ ...prev, name: e.target.value }))} />
              <input type="text" className="w-full p-3 border rounded-xl bg-slate-50 text-center font-bold text-slate-700" placeholder="Kelas" value={studentProfile.class} onChange={(e) => setStudentProfile(prev => ({ ...prev, class: e.target.value }))} />
            </div>

            <button onClick={startBook} className={`w-full bg-gradient-to-r ${currentTheme.btnGradient} text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2`}>
              Mulai <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. HALAMAN UTAMA (JURNAL, LAPOR, DOA)
  return (
    <div className={`min-h-screen ${currentTheme.bg} font-sans text-slate-800 pb-20`}>
      <div className={`${currentTheme.header} text-white p-5 pb-8 rounded-b-3xl shadow-lg sticky top-0 z-20`}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-lg">{studentProfile.name || 'Siswa'}</h1>
            <p className="text-xs opacity-90">{studentProfile.class} • Total Poin: {totalScore}</p>
          </div>
          <div className="bg-white/20 p-2 rounded-lg">
             <Star className="text-yellow-300 fill-yellow-300" size={20} />
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4 relative z-20 max-w-md mx-auto">
        <div className="bg-white p-1 rounded-xl shadow-md flex mb-4 text-xs font-bold text-center border border-slate-100">
             <button onClick={() => setView('journal')} className={`flex-1 py-2 rounded-lg ${view === 'journal' ? `${currentTheme.bg} ${currentTheme.textLight}` : 'text-slate-400'}`}>Jurnal</button>
             <button onClick={() => setView('doa')} className={`flex-1 py-2 rounded-lg ${view === 'doa' ? `${currentTheme.bg} ${currentTheme.textLight}` : 'text-slate-400'}`}>Doa</button>
             <button onClick={() => setView('achievements')} className={`flex-1 py-2 rounded-lg ${view === 'achievements' ? `${currentTheme.bg} ${currentTheme.textLight}` : 'text-slate-400'}`}>Lapor</button>
        </div>

        {/* --- VIEW: JURNAL --- */}
        {view === 'journal' && (
          <div className="space-y-4 pb-10">
            <div className="flex items-center justify-between bg-white p-2 rounded-xl shadow-sm">
                <button onClick={() => setActiveDay(d => Math.max(1, d - 1))} className="p-2 bg-slate-50 rounded-lg"><ChevronLeft size={16}/></button>
                <div className="text-center">
                  <div className="font-bold text-slate-800">Ramadan Hari ke-{activeDay}</div>
                  <div className="text-[10px] text-slate-500">{currentDateGregorian}</div>
                </div>
                <button onClick={() => setActiveDay(d => Math.min(30, d + 1))} className="p-2 bg-slate-50 rounded-lg"><ChevronRight size={16}/></button>
            </div>

            {currentData.validated && <div className="bg-green-100 text-green-700 p-2 rounded-lg text-xs font-bold text-center">✅ Data sudah divalidasi</div>}

            {/* --- KARTU PUASA SPESIAL (DESAIN BARU) --- */}
            <div 
                onClick={() => !currentData.validated && toggleCheck(activeDay, 'puasa')} 
                className={`
                    relative overflow-hidden p-5 rounded-3xl border-2 cursor-pointer transition-all duration-300 ease-out group shadow-sm
                    ${currentData.puasa 
                        ? `bg-gradient-to-br from-${currentTheme.secondary}-50 to-white border-${currentTheme.secondary}-400 shadow-${currentTheme.secondary}-100 scale-[1.02]` 
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }
                `}
            >
                {/* Background Blob jika aktif */}
                {currentData.puasa && (
                    <div className={`absolute -right-5 -top-5 w-24 h-24 bg-${currentTheme.secondary}-200 rounded-full blur-2xl opacity-50 pointer-events-none`}></div>
                )}

                <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                        {/* Ikon dengan Container */}
                        <div className={`
                            p-3 rounded-2xl transition-all duration-300
                            ${currentData.puasa ? `bg-${currentTheme.secondary}-500 text-white shadow-md shadow-${currentTheme.secondary}-200` : 'bg-slate-100 text-slate-400'}
                        `}>
                           <Sun size={28} className={currentData.puasa ? 'animate-spin-slow' : ''} />
                        </div>
                        
                        <div>
                           <h3 className={`font-bold text-lg leading-tight ${currentData.puasa ? `text-${currentTheme.secondary}-700` : 'text-slate-600'}`}>
                             Puasa Penuh
                           </h3>
                           <p className={`text-xs font-medium mt-1 ${currentData.puasa ? `text-${currentTheme.secondary}-600` : 'text-slate-400'}`}>
                             {currentData.puasa ? 'Alhamdulillah! (+20 Poin)' : 'Klik jika berpuasa hari ini'}
                           </p>
                        </div>
                    </div>
                    
                    {/* Checkmark Besar */}
                    <div className={`
                        w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300
                        ${currentData.puasa ? `bg-${currentTheme.secondary}-500 border-${currentTheme.secondary}-500 rotate-0` : 'border-slate-200 bg-slate-50 -rotate-12'}
                    `}>
                        {currentData.puasa && <CheckCircle size={20} className="text-white" />}
                    </div>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
               <h3 className="font-bold text-xs mb-3 text-slate-500 uppercase">Shalat Wajib (+10)</h3>
               <div className="flex flex-wrap gap-2">
                 {['Subuh', 'Zuhur', 'Ashar', 'Maghrib', 'Isya'].map(s => (
                    <button key={s} onClick={() => !currentData.validated && toggleCheck(activeDay, s.toLowerCase())} className={`flex-1 py-2 rounded-lg text-xs font-bold border ${currentData[s.toLowerCase()] ? 'bg-blue-500 text-white border-blue-500' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                      {s}
                    </button>
                 ))}
               </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
               <div onClick={() => !currentData.validated && toggleCheck(activeDay, 'tarawih')} className={`p-3 rounded-xl border-2 cursor-pointer flex flex-col items-center justify-center text-center ${currentData.tarawih ? 'bg-indigo-50 border-indigo-500' : 'bg-white border-slate-100'}`}>
                  <Moon size={20} className={`mb-1 ${currentData.tarawih ? 'text-indigo-600 fill-indigo-600' : 'text-slate-300'}`} />
                  <span className="text-xs font-bold">Tarawih</span>
               </div>
               <div onClick={() => !currentData.validated && toggleCheck(activeDay, 'tadarus')} className={`p-3 rounded-xl border-2 cursor-pointer flex flex-col items-center justify-center text-center ${currentData.tadarus ? 'bg-teal-50 border-teal-500' : 'bg-white border-slate-100'}`}>
                  <BookOpen size={20} className={`mb-1 ${currentData.tadarus ? 'text-teal-600' : 'text-slate-300'}`} />
                  <span className="text-xs font-bold">Tadarus</span>
               </div>
            </div>

            <div className="space-y-2">
               {[{key: 'kosakata', label: 'Hafal Kosakata (+5)'}, {key: 'bantuIbu', label: 'Bantu Ibu (+5)'}].map(item => (
                 <div key={item.key} onClick={() => !currentData.validated && toggleCheck(activeDay, item.key)} className={`p-3 rounded-xl border cursor-pointer flex justify-between items-center ${currentData[item.key] ? `${currentTheme.bg} border-${currentTheme.accent}-300` : 'bg-white border-slate-100'}`}>
                    <span className="text-xs font-bold">{item.label}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${currentData[item.key] ? `${currentTheme.header} border-transparent` : 'border-slate-300'}`}>
                       {currentData[item.key] && <CheckCircle size={12} className="text-white" />}
                    </div>
                 </div>
               ))}
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 text-center">
              <button onClick={() => toggleValidation(activeDay)} className="w-full py-2 bg-white border border-yellow-400 text-yellow-700 rounded-lg text-xs font-bold shadow-sm active:scale-95 transition">
                {currentData.validated ? 'Buka Validasi' : 'Tanda Tangan Orang Tua'}
              </button>
            </div>
          </div>
        )}

        {/* --- VIEW: LAPOR --- */}
        {view === 'achievements' && (
           <div className="space-y-4 pb-10">
             <div className="bg-white p-5 rounded-2xl shadow-sm text-center border border-slate-100">
                <Award size={40} className="mx-auto text-blue-500 mb-2" />
                <h2 className="text-lg font-bold">Lapor Guru</h2>
                <p className="text-xs text-slate-500 mb-4">Kirim poin & foto hari ini.</p>
                
                {/* UPLOAD FOTO DENGAN LOADER */}
                <div className="mb-4 text-left">
                  <label className="text-xs font-bold text-slate-400 block mb-2">Upload Foto (Otomatis Diperkecil)</label>
                  {!selectedImage ? (
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50">
                      <Camera size={20} className="text-slate-400 mb-1" />
                      <span className="text-[10px] text-slate-500">Ambil Foto</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                  ) : (
                    <div className="relative w-full h-40 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">
                      {isCompressing ? (
                        <div className="text-center">
                          <Loader2 size={24} className="animate-spin text-blue-500 mx-auto" />
                          <span className="text-[10px] text-slate-500">Mengecilkan foto...</span>
                        </div>
                      ) : (
                        <>
                          <img src={base64Image} alt="Preview" className="w-full h-full object-cover" />
                          <button onClick={removeImage} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"><X size={14} /></button>
                        </>
                      )}
                    </div>
                  )}
                </div>

                <button 
                  onClick={sendToGoogleSheet}
                  disabled={isSubmitting || isCompressing} // Jangan kirim kalau sedang kompres
                  className={`w-full text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 ${isSubmitting || isCompressing ? 'bg-slate-400' : 'bg-blue-600'}`}
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim Laporan'}
                </button>
             </div>
             <button onClick={() => setView('cover')} className="w-full text-center text-xs text-slate-400">Kembali ke Depan</button>
           </div>
        )}
        
        {/* --- VIEW: DOA --- */}
        {view === 'doa' && (
           <div className="space-y-3 pb-10">
             {DAFTAR_DOA.map((doa, i) => (
                <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                  <h3 className="font-bold text-sm text-slate-700 mb-2">{doa.judul}</h3>
                  <p className="text-right font-serif text-lg leading-loose mb-2 text-slate-800">{doa.arab}</p>
                  <p className="text-xs italic text-slate-500 border-t pt-2">{doa.arti}</p>
                </div>
             ))}
           </div>
        )}
      </div>
      {showConfetti && <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50"><div className="text-6xl animate-bounce">🎉</div></div>}
    </div>
  );
}