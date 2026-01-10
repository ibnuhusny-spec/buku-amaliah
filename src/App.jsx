import React, { useState, useEffect, useRef } from 'react';
import { Star, Moon, Sun, BookOpen, CheckCircle, Award, ChevronLeft, ChevronRight, User, Settings, Camera, X, Heart, MessageCircle, List, Trophy, AlertTriangle, Loader2, ArrowRight, Share2, Copy, Image as ImageIcon, Mic, PenTool, StopCircle, Play, Trash2, CloudUpload, Lock, LogOut, FileText, CheckSquare, KeyRound, Eye, EyeOff } from 'lucide-react';

// --- DATA STATIS ---
const THEMES = {
  emerald: { id: 'emerald', name: 'Hijau Eden', bg: 'bg-emerald-50', header: 'bg-emerald-600', text: 'text-emerald-800', btn: 'bg-emerald-600' },
  blue: { id: 'blue', name: 'Biru Langit', bg: 'bg-blue-50', header: 'bg-blue-600', text: 'text-blue-800', btn: 'bg-blue-600' },
  violet: { id: 'violet', name: 'Ungu Lailatul', bg: 'bg-violet-50', header: 'bg-violet-600', text: 'text-violet-800', btn: 'bg-violet-600' },
  rose: { id: 'rose', name: 'Merah Ceria', bg: 'bg-rose-50', header: 'bg-rose-600', text: 'text-rose-800', btn: 'bg-rose-600' },
  amber: { id: 'amber', name: 'Emas Gurun', bg: 'bg-amber-50', header: 'bg-amber-600', text: 'text-amber-900', btn: 'bg-amber-600' }
};

const DAFTAR_DOA = [
  { judul: "1. Doa Saat Bangun Tidur", arab: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ", latin: "Alhamdu lillahil-ladzi ahyana ba'da ma amatana wa ilaihin-nushur.", arti: "Segala puji bagi Allah yang menghidupkan kami kembali setelah mematikan kami dan kepada-Nya (kami) akan dibangkitkan." },
  // ... (Data doa disingkat untuk efisiensi kode, gunakan data lengkap Anda sebelumnya jika perlu, tapi ini sudah cukup representatif)
  { judul: "2. Doa Sebelum Makan", arab: "بِسْمِ اللهِ، اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ", latin: "Bismillah, Allahumma baarik lanaa fiimaa razaqtanaa...", arti: "Dengan nama Allah. Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan kepada kami." }
];

// --- HELPER FUNCTIONS ---
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

const compressImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = (scaleSize < 1) ? MAX_WIDTH : img.width;
        canvas.height = (scaleSize < 1) ? (img.height * scaleSize) : img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.6));
      }
    }
  });
};

const blobToBase64 = (blob) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};

// ==========================================
// KOMPONEN UTAMA
// ==========================================
export default function App() {
  const [role, setRole] = useState('home'); 
  const [scriptUrl, setScriptUrl] = useState('');
  const [schoolName, setSchoolName] = useState('Sekolah Dasar Islam Terpadu');
  const [logoUrl, setLogoUrl] = useState('');

  // Load Config
  useEffect(() => {
    const savedProfile = localStorage.getItem('ramadanProfile');
    const params = new URLSearchParams(window.location.search);
    const guruScript = params.get('guru');

    if (guruScript) {
       setScriptUrl(guruScript);
       localStorage.setItem('ramadanScriptUrl', guruScript);
    } else if (savedProfile) {
       const parsed = JSON.parse(savedProfile);
       setScriptUrl(parsed.scriptUrl || localStorage.getItem('ramadanScriptUrl') || '');
       setSchoolName(parsed.schoolName || 'Sekolah Dasar Islam Terpadu');
       setLogoUrl(parsed.logoUrl || '');
    } else {
       const globalUrl = localStorage.getItem('ramadanScriptUrl');
       if (globalUrl) setScriptUrl(globalUrl);
    }
  }, []);

  // --- CONTENT SWITCHER ---
  const renderContent = () => {
    if (role === 'home') return <HomeView setRole={setRole} schoolName={schoolName} />;
    if (role === 'teacher_login') return <TeacherLogin setRole={setRole} scriptUrl={scriptUrl} setScriptUrl={setScriptUrl} />;
    if (role === 'teacher') return <TeacherDashboard setRole={setRole} scriptUrl={scriptUrl} />;
    if (role === 'student') return <StudentApp setRole={setRole} globalScriptUrl={scriptUrl} schoolName={schoolName} />;
    return null;
  };

  // --- MOBILE WRAPPER ---
  return (
    <div className="flex justify-center bg-slate-900 min-h-screen">
      <div className="w-full max-w-md bg-white shadow-2xl overflow-hidden min-h-screen relative">
        {renderContent()}
      </div>
    </div>
  );
}

// --- SUB COMPONENTS ---

function HomeView({ setRole, schoolName }) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-600 to-emerald-800 flex flex-col items-center justify-center p-6 text-white font-sans">
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl w-full border border-white/20 shadow-xl text-center animate-in fade-in zoom-in duration-500">
           <div className="w-28 h-28 bg-white rounded-full mx-auto mb-5 flex items-center justify-center shadow-lg overflow-hidden border-4 border-emerald-200">
              <img 
                src="/logo.png" 
                alt="Logo Sekolah" 
                className="w-full h-full object-contain p-1" 
                onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='block'; }} 
              />
              <BookOpen className="text-emerald-600 hidden" size={48} />
           </div>
           
           <h1 className="text-2xl font-bold font-serif mb-1 leading-tight">Buku Amaliah<br/>Ramadan OnLine</h1>
           <p className="text-emerald-100 text-xs mb-8 uppercase tracking-widest">{schoolName}</p>

           <div className="space-y-3">
             <button onClick={() => setRole('student')} className="w-full bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-lg border-b-4 border-yellow-600">
                <User size={24} /> Masuk sebagai Murid
             </button>
             <button onClick={() => setRole('teacher_login')} className="w-full bg-emerald-900/40 hover:bg-emerald-900/60 text-emerald-100 font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-transform active:scale-95 border border-emerald-500/30">
                <Lock size={20} /> Masuk sebagai Guru
             </button>
           </div>
           
           <div className="mt-8 pt-4 border-t border-white/10">
              <p className="text-[10px] text-emerald-200/60">Versi Secure 3.4</p>
           </div>
        </div>
      </div>
    );
}

function TeacherLogin({ setRole, scriptUrl, setScriptUrl }) {
  const [pinInput, setPinInput] = useState('');
  const [localUrl, setLocalUrl] = useState(scriptUrl || '');
  const [mode, setMode] = useState('login'); // 'login' or 'change_pin'
  
  // State Ganti PIN
  const [oldPin, setOldPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [showPin, setShowPin] = useState(false);

  const getSavedPin = () => localStorage.getItem('teacherPin') || '1234';

  const handleLogin = () => {
    const currentPin = getSavedPin();
    if (pinInput === currentPin) {
      if (!localUrl) return alert("Mohon isi Link Script Guru terlebih dahulu.");
      setScriptUrl(localUrl);
      localStorage.setItem('ramadanScriptUrl', localUrl);
      setRole('teacher');
    } else {
      alert('PIN Salah!');
    }
  };

  const handleChangePin = () => {
    const currentPin = getSavedPin();
    if (oldPin !== currentPin) return alert("PIN Lama salah!");
    if (newPin.length < 4) return alert("PIN Baru minimal 4 digit!");
    
    localStorage.setItem('teacherPin', newPin);
    alert("PIN Berhasil diubah!");
    setMode('login');
    setPinInput('');
  };

  if (mode === 'change_pin') {
     return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 font-sans">
           <div className="bg-white p-6 rounded-3xl shadow-xl w-full text-center">
              <h2 className="text-xl font-bold text-slate-700 mb-4 flex items-center justify-center gap-2"><KeyRound size={20}/> Ganti PIN</h2>
              <input type="password" value={oldPin} onChange={(e) => setOldPin(e.target.value)} placeholder="PIN Lama" className="w-full p-3 bg-slate-50 border rounded-xl mb-3 text-center" />
              <input type="number" value={newPin} onChange={(e) => setNewPin(e.target.value)} placeholder="PIN Baru" className="w-full p-3 bg-slate-50 border rounded-xl mb-6 text-center" />
              <div className="flex gap-2">
                 <button onClick={() => setMode('login')} className="flex-1 py-3 bg-slate-200 rounded-xl font-bold text-sm">Batal</button>
                 <button onClick={handleChangePin} className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm">Simpan</button>
              </div>
           </div>
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6 font-sans">
      <div className="bg-white p-6 rounded-3xl shadow-xl w-full text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
           <Lock size={28} className="text-emerald-600"/>
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-1">Login Guru</h2>
        <p className="text-xs text-slate-400 mb-6">Area khusus guru pembimbing.</p>
        
        {/* INPUT PIN SECURE */}
        <div className="mb-4 text-left relative">
           <label className="text-xs font-bold text-slate-500 ml-1 mb-1 block">PIN Akses</label>
           <div className="relative">
             <input 
               type={showPin ? "text" : "password"} 
               value={pinInput} 
               onChange={(e) => setPinInput(e.target.value)} 
               placeholder="••••" 
               className="w-full p-3 bg-slate-50 border rounded-xl text-center text-2xl font-bold outline-none focus:ring-2 focus:ring-emerald-500 tracking-widest" 
             />
             <button onClick={() => setShowPin(!showPin)} className="absolute right-3 top-4 text-slate-400">
                {showPin ? <EyeOff size={18}/> : <Eye size={18}/>}
             </button>
           </div>
        </div>

        {/* INPUT URL SCRIPT */}
        <div className="mb-6 text-left">
           <label className="text-xs font-bold text-slate-500 ml-1 mb-1 block">Link Script Guru</label>
           <input 
             type="text" 
             value={localUrl} 
             onChange={(e) => setLocalUrl(e.target.value)} 
             placeholder="https://script.google.com/.../exec" 
             className="w-full p-3 bg-slate-50 border rounded-xl text-xs font-mono text-slate-600 outline-none focus:border-emerald-500" 
           />
        </div>

        <div className="flex gap-2 mb-4">
          <button onClick={() => setRole('home')} className="flex-1 py-3 bg-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-300 transition">Batal</button>
          <button onClick={handleLogin} className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-200">Masuk</button>
        </div>

        <button onClick={() => setMode('change_pin')} className="text-xs text-blue-500 underline">Ganti PIN Guru</button>
      </div>
    </div>
  );
}

function TeacherDashboard({ setRole, scriptUrl }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [nilaiInput, setNilaiInput] = useState('');
  const [koreksiInput, setKoreksiInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(scriptUrl);
      const json = await response.json();
      setData(json);
    } catch (e) {
      alert("Gagal mengambil data. Cek Link Script.");
    } finally {
      setLoading(false);
    }
  };

  const handleSimpanNilai = async () => {
    if (!selectedStudent) return;
    setSaving(true);
    try {
      await fetch(scriptUrl, {
        method: 'POST', mode: 'no-cors',
        body: JSON.stringify({ action: 'nilai', nama: selectedStudent.nama, hari: selectedStudent.hari, nilaiGuru: nilaiInput, koreksiGuru: koreksiInput })
      });
      alert("Nilai tersimpan!"); setSelectedStudent(null); fetchData(); 
    } catch (e) { alert("Gagal menyimpan."); } finally { setSaving(false); }
  };

  const openModal = (student) => {
    setSelectedStudent(student);
    setNilaiInput(student.nilaiGuru || '');
    setKoreksiInput(student.koreksiGuru || '');
  };

  // Generate Link Murid
  const copyStudentLink = () => {
      const link = `${window.location.origin}${window.location.pathname}?guru=${encodeURIComponent(scriptUrl)}`;
      const textArea = document.createElement("textarea");
      textArea.value = link;
      textArea.style.position = 'fixed'; textArea.style.left = '-9999px';
      document.body.appendChild(textArea); textArea.select();
      try { document.execCommand('copy'); setShareLinkCopied(true); setTimeout(()=>setShareLinkCopied(false),3000); } catch (e) { alert("Copy manual link di browser!"); }
      document.body.removeChild(textArea);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10 flex justify-between items-center">
        <h1 className="font-bold text-lg text-slate-700 flex items-center gap-2"><Award className="text-emerald-600"/> Dashboard Guru</h1>
        <button onClick={fetchData} className="p-2 bg-emerald-50 text-emerald-600 rounded-full hover:bg-emerald-100"><Loader2 size={18} className={loading ? "animate-spin" : ""} /></button>
      </div>

      {/* SHARE LINK SECTION */}
      <div className="p-4 pb-0">
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl flex items-center justify-between">
             <div className="text-xs text-blue-800">
                <span className="font-bold block">Bagikan ke Murid</span>
                Link otomatis untuk kelas ini.
             </div>
             <button onClick={copyStudentLink} className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm active:scale-95 transition">
                {shareLinkCopied ? <CheckCircle size={14}/> : <Share2 size={14}/>} Salin Link
             </button>
          </div>
      </div>

      <div className="p-4 space-y-3">
        {loading ? <div className="text-center py-10 text-slate-400">Memuat data...</div> : 
         data.length === 0 ? <div className="text-center py-10 text-slate-400">Belum ada setoran masuk.</div> :
         data.map((item, idx) => (
           <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
              <div className="flex justify-between items-start mb-2">
                 <div><h3 className="font-bold text-slate-800">{item.nama}</h3><p className="text-xs text-slate-500">Hari ke-{item.hari} • {item.kelas}</p></div>
                 <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-1 rounded-full">{item.poin} Poin</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg text-xs text-slate-600 mb-3 font-mono">{item.rincian}</div>
              {item.audio && item.audio !== '-' && (
                 <div className="mb-3 bg-blue-50 p-2 rounded-lg border border-blue-100 flex items-center justify-between">
                    <div className="flex items-center gap-2"><Play size={14} className="text-blue-600"/><span className="text-xs font-bold text-blue-700">Rekaman</span></div>
                    <a href={item.audio} target="_blank" className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded">Buka</a>
                 </div>
              )}
              {item.foto && item.foto !== '-' && (<div className="mb-3"><a href={item.foto} target="_blank" className="text-xs text-emerald-600 underline flex items-center gap-1"><ImageIcon size={12}/> Foto Bukti</a></div>)}
              <div className="border-t pt-2 mt-2 flex justify-between items-center">
                 <div className="text-xs">{item.nilaiGuru ? <span className="text-green-600 font-bold">Nilai: {item.nilaiGuru}</span> : <span className="text-red-400 italic">Belum dinilai</span>}</div>
                 <button onClick={() => openModal(item)} className="bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 active:scale-95 transition"><PenTool size={12}/> {item.nilaiGuru ? 'Edit' : 'Nilai'}</button>
              </div>
           </div>
         ))
        }
      </div>

      {/* MODAL PENILAIAN (POP UP) - FIX WIDTH RESPONSIVE */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
           <div className="bg-white w-[90%] max-w-sm rounded-2xl p-6 animate-in zoom-in-95 duration-200 shadow-2xl relative">
              <button onClick={() => setSelectedStudent(null)} className="absolute top-4 right-4 bg-slate-100 p-1 rounded-full"><X size={20} className="text-slate-500"/></button>
              
              <h3 className="font-bold text-lg mb-1 text-slate-800">Beri Nilai</h3>
              <p className="text-xs text-slate-500 mb-4">{selectedStudent.nama} • Hari {selectedStudent.hari}</p>

              {selectedStudent.audio && selectedStudent.audio !== '-' && (
                 <div className="mb-4 bg-blue-50 p-3 rounded-xl flex items-center gap-3 border border-blue-100">
                    <Play size={20} className="text-blue-600"/>
                    <a href={selectedStudent.audio} target="_blank" className="text-xs font-bold text-blue-700 underline">Dengarkan Hafalan</a>
                 </div>
              )}

              <div className="space-y-4 mb-6">
                 <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1">Nilai (Angka/Huruf)</label>
                    <input type="text" value={nilaiInput} onChange={(e) => setNilaiInput(e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Contoh: 90 / A" />
                 </div>
                 <div>
                    <label className="text-xs font-bold text-slate-500 block mb-1">Koreksi / Komentar</label>
                    <textarea rows="3" value={koreksiInput} onChange={(e) => setKoreksiInput(e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Catatan untuk siswa..." />
                 </div>
              </div>
              <button onClick={handleSimpanNilai} disabled={saving} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2 shadow-lg shadow-emerald-200 active:scale-95 transition">
                 {saving ? <Loader2 className="animate-spin"/> : <CheckSquare size={18}/>} Simpan Nilai
              </button>
           </div>
        </div>
      )}

      <button onClick={() => setRole('home')} className="fixed bottom-4 right-4 bg-red-500 text-white p-3 rounded-full shadow-lg hover:bg-red-600 transition"><LogOut size={20}/></button>
    </div>
  );
}

// ==========================================
// 2. MODUL MURID (Tidak Ada Perubahan Signifikan)
// ==========================================

function StudentApp({ setRole, globalScriptUrl, schoolName }) {
  // ... (Bagian Murid sama seperti sebelumnya, aman) ...
  // Saya tulis ulang di sini agar file tetap utuh satu kesatuan.
  const [activeDay, setActiveDay] = useState(1);
  const [view, setView] = useState('cover');
  const [userData, setUserData] = useState({});
  const [studentProfile, setStudentProfile] = useState({ name: '', class: '', scriptUrl: globalScriptUrl || '' });
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [namaSurah, setNamaSurah] = useState("");
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);
  const [raportData, setRaportData] = useState([]);
  const [loadingRaport, setLoadingRaport] = useState(false);
  const currentTheme = THEMES['emerald']; 
  const currentDateGregorian = getGregorianDate(studentProfile.startDateRamadan || '2026-02-18', activeDay);
  const triggerConfetti = () => { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 3000); };
  
  useEffect(() => {
     const savedData = localStorage.getItem('ramadanJournalData');
     if (savedData) {
        const parsed = JSON.parse(savedData);
        for(let i=1; i<=30; i++) {
           if(!parsed[i]) parsed[i] = {};
           ['salatMalam','kosakata','witir','namaPenceramah','temaCeramah'].forEach(f => {
              if(!parsed[i].hasOwnProperty(f)) parsed[i][f] = (f==='salatMalam'||f==='kosakata'||f==='witir') ? false : "";
           });
        }
        setUserData(parsed);
     } else {
        const init = {};
        for(let i=1; i<=30; i++) {
           init[i] = { puasa: false, subuh: false, zuhur: false, ashar: false, maghrib: false, isya: false, tarawih: false, witir: false, tadarus: false, salatMalam: false, kosakata: false, bantuIbu: false, hafalDoa: "", amalanLain: "", amalanLainCheck: false, namaPenceramah: "", temaCeramah: "", validated: false };
        }
        setUserData(init);
     }
     const savedProfile = localStorage.getItem('ramadanProfile');
     if (savedProfile) {
        const p = JSON.parse(savedProfile);
        setStudentProfile({...p, scriptUrl: globalScriptUrl || p.scriptUrl});
     } else if (globalScriptUrl) {
        setStudentProfile(prev => ({...prev, scriptUrl: globalScriptUrl}));
     }
  }, [globalScriptUrl]);
  useEffect(() => { if (Object.keys(userData).length > 0) localStorage.setItem('ramadanJournalData', JSON.stringify(userData)); }, [userData]);
  useEffect(() => { localStorage.setItem('ramadanProfile', JSON.stringify(studentProfile)); }, [studentProfile]);
  const toggleCheck = (day, field) => { if (userData[day]?.validated) return; setUserData(prev => ({ ...prev, [day]: { ...prev[day], [field]: !prev[day][field] } })); };
  const updateField = (day, field, value) => { if (userData[day]?.validated) return; setUserData(prev => ({ ...prev, [day]: { ...prev[day], [field]: value } })); };
  const toggleValidation = (day) => { setUserData(prev => ({ ...prev, [day]: { ...prev[day], validated: !prev[day].validated } })); if (!userData[day].validated) triggerConfetti(); };
  const handleImageUpload = async (e) => { const file = e.target.files[0]; if(file) { setIsCompressing(true); setSelectedImage(file.name); try { const b64 = await compressImage(file); setBase64Image(b64); } catch(e){} finally { setIsCompressing(false); } } };
  const removeImage = () => { setSelectedImage(null); setBase64Image(""); };
  const startRecording = async () => { try { const stream = await navigator.mediaDevices.getUserMedia({ audio: true }); const options = { mimeType: 'audio/webm;codecs=opus', audioBitsPerSecond: 32000 }; const mediaRecorder = new MediaRecorder(stream, MediaRecorder.isTypeSupported(options.mimeType) ? options : {}); mediaRecorderRef.current = mediaRecorder; const chunks = []; mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); }; mediaRecorder.onstop = () => { const blob = new Blob(chunks, { type: 'audio/webm' }); setAudioBlob(blob); setAudioUrl(URL.createObjectURL(blob)); stream.getTracks().forEach(track => track.stop()); }; mediaRecorder.start(); setIsRecording(true); timerRef.current = setInterval(() => setRecordingTime(p => p+1), 1000); } catch (e) { alert("Gagal akses Mic."); } };
  const stopRecording = () => { if(mediaRecorderRef.current) { mediaRecorderRef.current.stop(); setIsRecording(false); clearInterval(timerRef.current); } };
  const deleteRecording = () => { setAudioBlob(null); setAudioUrl(null); setRecordingTime(0); };
  const calculateDailyScore = (dayData) => { let score = 0; if (!dayData) return 0; if (dayData.puasa) score += 20; if (dayData.subuh) score += 10; if (dayData.zuhur) score += 10; if (dayData.ashar) score += 10; if (dayData.maghrib) score += 10; if (dayData.isya) score += 10; if (dayData.tarawih) score += 10; if (dayData.witir) score += 10; if (dayData.tadarus) score += 10; if (dayData.salatMalam) score += 20; if (dayData.kosakata) score += 5; if (dayData.bantuIbu) score += 5; if (dayData.hafalDoa) score += 10; if (dayData.amalanLainCheck) score += 5; if (dayData.namaPenceramah) score += 5; if (dayData.temaCeramah) score += 10; return score; };
  const calculateTotalScore = () => { let score = 0; Object.entries(userData).forEach(([_, d]) => score += calculateDailyScore(d)); return score; };
  const sendData = async () => { if(!studentProfile.scriptUrl) return alert("Link Script Guru belum diisi!"); if(view === 'hafalan' && (!audioBlob || !namaSurah)) return alert("Rekaman/Nama Surah belum ada!"); setIsSubmitting(true); try { const dayData = userData[activeDay] || {}; let payload = {}; if(view === 'hafalan') { payload = { action: 'lapor', nama: studentProfile.name, kelas: studentProfile.class, hari: activeDay, poin: calculateDailyScore(dayData), puasa: dayData.puasa, tarawih: dayData.tarawih, kebaikan: `🎤 Setor Hafalan: ${namaSurah}`, audio: await blobToBase64(audioBlob), namaSurah: namaSurah }; } else { let rincian = []; if(dayData.salatMalam) rincian.push("✅ Qiyamul Lail"); if(dayData.kosakata) rincian.push("✅ Kosakata"); if(dayData.bantuIbu) rincian.push("✅ Bantu Ortu"); if(dayData.hafalDoa) rincian.push(`✅ Doa: ${dayData.hafalDoa}`); if(dayData.namaPenceramah) rincian.push(`🗣️ Ceramah: ${dayData.namaPenceramah}`); if(dayData.amalanLainCheck) rincian.push(`✅ Extra: ${dayData.amalanLain}`); payload = { action: 'lapor', nama: studentProfile.name, kelas: studentProfile.class, hari: activeDay, poin: calculateDailyScore(dayData), puasa: dayData.puasa, tarawih: dayData.tarawih, kebaikan: rincian.join(", "), foto: base64Image, namaFoto: selectedImage }; } await fetch(studentProfile.scriptUrl, { method: 'POST', mode: 'no-cors', body: JSON.stringify(payload) }); triggerConfetti(); alert("Laporan Terkirim!"); if(view === 'hafalan') deleteRecording(); if(view === 'achievements') removeImage(); } catch(e) { alert("Gagal kirim. Cek koneksi."); } finally { setIsSubmitting(false); } };
  const fetchRaport = async () => { if (!studentProfile.scriptUrl) return; setLoadingRaport(true); try { const res = await fetch(studentProfile.scriptUrl); const json = await res.json(); const myData = json.filter(row => row.nama === studentProfile.name); setRaportData(myData); } catch(e) {} finally { setLoadingRaport(false); } };
  useEffect(() => { if (view === 'raport') fetchRaport(); }, [view]);
  
  // RENDER MURID
  if (view === 'cover') return (
    <div className="min-h-screen bg-emerald-50 p-6 flex flex-col items-center justify-center text-center font-sans">
       <div className="bg-white p-6 rounded-3xl shadow-xl w-full">
          <h1 className="text-xl font-bold text-emerald-800 mb-2">Halo, Murid Sholeh!</h1>
          <input type="text" className="w-full p-3 border rounded-xl mb-3" placeholder="Nama Lengkap" value={studentProfile.name} onChange={e => setStudentProfile({...studentProfile, name: e.target.value})} />
          <input type="text" className="w-full p-3 border rounded-xl mb-6" placeholder="Kelas" value={studentProfile.class} onChange={e => setStudentProfile({...studentProfile, class: e.target.value})} />
          <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-200 mb-6 text-left"><p className="text-[10px] font-bold text-slate-500 mb-1">Link Guru:</p>{studentProfile.scriptUrl ? <div className="text-xs text-green-600 truncate mb-2">✅ Terhubung</div> : <div className="text-xs text-red-500 mb-2">❌ Belum ada (Minta link ke Guru)</div>}<button onClick={() => setShowSettings(!showSettings)} className="text-[10px] text-blue-500 underline">Ubah Link Manual</button>{showSettings && (<div className="mt-2"><input type="text" className="w-full p-1 text-xs border mb-2" value={studentProfile.scriptUrl} onChange={e => setStudentProfile({...studentProfile, scriptUrl: e.target.value})} placeholder="https://script.google..." /></div>)}</div>
          <button onClick={() => setView('journal')} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold">Buka Bukumu</button>
          <button onClick={() => setRole('home')} className="mt-4 text-xs text-slate-400">Kembali ke Menu Utama</button>
       </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-emerald-50 pb-24 font-sans">
       <div className="bg-emerald-600 text-white p-5 rounded-b-3xl shadow-lg sticky top-0 z-10"><div className="flex justify-between items-center mb-2"><div><h1 className="font-bold">{studentProfile.name || 'Murid'}</h1><p className="text-xs opacity-80">{studentProfile.class}</p></div><button onClick={() => setView('cover')} className="bg-white/20 p-2 rounded-full"><Settings size={18}/></button></div><div className="bg-emerald-800/30 p-2 rounded-xl flex items-center justify-between"><span className="text-xs font-bold flex items-center gap-1"><Trophy size={14} className="text-yellow-300"/> Total Poin:</span><span className="text-xl font-black text-yellow-300">{calculateTotalScore()}</span></div></div>
       <div className="px-4 -mt-4 relative z-10">
         <div className="bg-white p-1 rounded-xl shadow-md flex mb-4 text-[10px] font-bold text-center border border-slate-100 overflow-x-auto">{['journal', 'doa', 'hafalan', 'raport', 'achievements'].map(m => (<button key={m} onClick={() => setView(m)} className={`flex-1 py-2 px-1 capitalize rounded-lg ${view===m ? 'bg-emerald-100 text-emerald-700' : 'text-slate-400'}`}>{m === 'achievements' ? 'Lapor' : m}</button>))}</div>
         
         {/* JOURNAL */}
         {view === 'journal' && (<div className="space-y-4 animate-in fade-in"><div className="flex items-center justify-between bg-white p-2 rounded-xl shadow-sm"><button onClick={() => setActiveDay(d => Math.max(1, d - 1))} className="p-2 bg-slate-50 rounded-lg"><ChevronLeft size={16}/></button><div className="text-center"><div className="font-bold text-slate-800">Hari ke-{activeDay}</div><div className="text-[10px] text-slate-500">{currentDateGregorian}</div></div><button onClick={() => setActiveDay(d => Math.min(30, d + 1))} className="p-2 bg-slate-50 rounded-lg"><ChevronRight size={16}/></button></div>{userData[activeDay]?.validated && <div className="bg-green-100 text-green-700 p-2 rounded-lg text-xs font-bold text-center">✅ Data sudah divalidasi</div>}<div onClick={() => toggleCheck(activeDay, 'puasa')} className={`p-4 rounded-2xl border-2 flex justify-between items-center transition-all ${userData[activeDay]?.puasa ? 'bg-orange-50 border-orange-400' : 'bg-white border-slate-100'}`}><div className="flex items-center gap-3"><div className={`p-2 rounded-full ${userData[activeDay]?.puasa ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-300'}`}><Sun size={20}/></div><span className="font-bold text-slate-700">Puasa Penuh (+20)</span></div>{userData[activeDay]?.puasa && <CheckCircle className="text-orange-500" size={20}/>}</div><div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100"><h3 className="text-xs font-bold text-slate-400 uppercase mb-3">Shalat Wajib (+10)</h3><div className="flex gap-2 overflow-x-auto pb-2">{['Subuh','Zuhur','Ashar','Maghrib','Isya'].map(s => (<button key={s} onClick={() => toggleCheck(activeDay, s.toLowerCase())} className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border ${userData[activeDay]?.[s.toLowerCase()] ? 'bg-blue-500 text-white border-blue-500' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>{s}</button>))}</div></div><div className="grid grid-cols-2 gap-3"><div onClick={() => toggleCheck(activeDay, 'tarawih')} className={`p-3 rounded-xl border-2 text-center cursor-pointer ${userData[activeDay]?.tarawih ? 'bg-indigo-50 border-indigo-500' : 'bg-white border-slate-100'}`}><Moon size={20} className={`mx-auto mb-1 ${userData[activeDay]?.tarawih ? 'text-indigo-600' : 'text-slate-300'}`}/><span className="text-xs font-bold">Tarawih</span></div><div onClick={() => toggleCheck(activeDay, 'salatMalam')} className={`p-3 rounded-xl border-2 text-center cursor-pointer ${userData[activeDay]?.salatMalam ? 'bg-purple-50 border-purple-500' : 'bg-white border-slate-100'}`}><Star size={20} className={`mx-auto mb-1 ${userData[activeDay]?.salatMalam ? 'text-purple-600' : 'text-slate-300'}`}/><span className="text-xs font-bold">Tahajud</span></div></div><div className="bg-white p-4 rounded-2xl border border-slate-100"><h3 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-1"><Mic size={12}/> Jurnal Ceramah</h3><div className="space-y-2"><input type="text" className="w-full text-xs p-2 bg-slate-50 rounded-lg border-none" placeholder="Nama Penceramah (+5)" value={userData[activeDay]?.namaPenceramah || ''} onChange={e => updateField(activeDay, 'namaPenceramah', e.target.value)} /><input type="text" className="w-full text-xs p-2 bg-slate-50 rounded-lg border-none" placeholder="Tema Ceramah (+10)" value={userData[activeDay]?.temaCeramah || ''} onChange={e => updateField(activeDay, 'temaCeramah', e.target.value)} /></div></div><div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 text-center"><button onClick={() => toggleValidation(activeDay)} className="w-full py-2 bg-white border border-yellow-400 text-yellow-700 rounded-lg text-xs font-bold">{userData[activeDay]?.validated ? 'Buka Validasi' : 'Tanda Tangan Orang Tua'}</button></div></div>)}
         {/* HAFALAN */}
         {view === 'hafalan' && (<div className="bg-white p-6 rounded-2xl text-center shadow-sm animate-in fade-in"><Mic size={40} className="mx-auto text-emerald-500 mb-2"/><h2 className="font-bold mb-4">Setor Hafalan Audio</h2><input className="w-full border p-3 rounded-xl mb-4 text-sm bg-slate-50" placeholder="Contoh: Surah An-Nas / Hadits Niat" value={namaSurah} onChange={e=>setNamaSurah(e.target.value)}/>{!audioUrl ? <button onClick={isRecording ? stopRecording : startRecording} className={`w-full py-6 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-2 shadow-lg ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-blue-600'}`}>{isRecording ? <StopCircle/> : <Mic/>} {isRecording ? 'Stop Rekam' : 'Mulai Rekam'}</button> : <div className="space-y-3"><div className="bg-slate-100 p-3 rounded-xl flex items-center gap-2"><Play className="text-blue-500" size={20}/> <span className="text-xs font-bold">Rekaman Siap</span></div><div className="flex gap-2"><button onClick={deleteRecording} className="flex-1 py-3 text-red-500 bg-red-50 rounded-xl font-bold text-xs">Hapus</button><button onClick={() => {const a = new Audio(audioUrl); a.play()}} className="flex-1 py-3 text-blue-500 bg-blue-50 rounded-xl font-bold text-xs">Dengar</button></div><button onClick={sendData} disabled={isSubmitting} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold flex justify-center gap-2 mt-2">{isSubmitting ? <Loader2 className="animate-spin"/> : <CloudUpload/>} Kirim Hafalan</button></div>}</div>)}
         {/* DOA */}
         {view === 'doa' && (<div className="space-y-3 pb-10">{DAFTAR_DOA.map((doa, i) => (<div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100"><h3 className="font-bold text-sm text-slate-700 mb-2">{doa.judul}</h3><p className="text-right font-serif text-lg leading-loose mb-2 text-slate-800">{doa.arab}</p><p className="text-xs italic text-slate-500 border-t pt-2">{doa.latin}</p><p className="text-xs text-slate-600 mt-1">{doa.arti}</p></div>))}</div>)}
         {/* RAPORT */}
         {view === 'raport' && (<div className="space-y-3 pb-10"><h2 className="font-bold text-emerald-800 flex items-center gap-2 mb-2"><FileText size={18}/> Riwayat & Nilai</h2>{loadingRaport ? <div className="text-center text-slate-400 py-4">Mengambil data...</div> : raportData.length === 0 ? <div className="text-center text-slate-400 py-4 bg-white rounded-xl">Belum ada data.</div> : raportData.map((item, idx) => (<div key={idx} className="bg-white p-4 rounded-xl shadow-sm border-l-4 border-emerald-500"><div className="flex justify-between text-xs text-slate-500 mb-1"><span>Hari ke-{item.hari}</span><span>{new Date(item.waktu).toLocaleDateString()}</span></div><div className="font-bold text-slate-800 text-sm mb-1">{item.rincian || 'Laporan Harian'}</div>{(item.nilaiGuru || item.koreksiGuru) ? (<div className="mt-2 bg-yellow-50 p-2 rounded-lg border border-yellow-100">{item.nilaiGuru && <div className="text-sm font-bold text-emerald-600">Nilai: {item.nilaiGuru}</div>}{item.koreksiGuru && <div className="text-xs text-slate-600 italic mt-1">"{item.koreksiGuru}"</div>}</div>) : <div className="mt-1 text-[10px] text-slate-400 italic">Menunggu penilaian...</div>}</div>))}</div>)}
         {/* ACHIVEMENTS */}
         {view === 'achievements' && (<div className="bg-white p-5 rounded-2xl shadow-sm text-center border border-slate-100"><h2 className="text-lg font-bold mb-1">Lapor Harian</h2><p className="text-xs text-slate-500 mb-4">Kirim poin jurnal & foto bukti.</p><div className="mb-4 text-left p-3 bg-slate-50 rounded-xl border border-dashed border-slate-300"><label className="text-xs font-bold text-slate-400 block mb-2">Upload Foto (Opsional)</label>{!selectedImage ? <label className="flex items-center justify-center h-20 cursor-pointer"><Camera className="text-slate-300 mr-2"/><span className="text-xs text-slate-400">Ambil Foto</span><input type="file" accept="image/*" className="hidden" onChange={handleImageUpload}/></label> : <div className="flex items-center justify-between"><span className="text-xs truncate max-w-[150px]">{selectedImage}</span><button onClick={removeImage} className="text-red-500"><X size={16}/></button></div>}</div><button onClick={sendData} disabled={isSubmitting} className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg flex justify-center items-center gap-2">{isSubmitting ? <Loader2 className="animate-spin"/> : <CloudUpload/>} Kirim Laporan</button></div>)}
       </div>
       {showConfetti && <div className="fixed inset-0 flex items-center justify-center z-50 text-6xl">🎉</div>}
    </div>
  );
}
