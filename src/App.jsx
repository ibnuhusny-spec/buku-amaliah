import React, { useState, useEffect } from 'react';
import { Star, Moon, Sun, BookOpen, CheckCircle, Award, ChevronLeft, ChevronRight, User, Settings, Camera, X, Heart, MessageCircle, List, Trophy, AlertTriangle, Loader2, ArrowRight, Share2, Copy, Link as LinkIcon, Image as ImageIcon, Mic, PenTool } from 'lucide-react';

// --- DATA: KOLEKSI DOA (HISNUL MUSLIM VERIFIED) ---
const DAFTAR_DOA = [
  { judul: "1. Doa Saat Bangun Tidur", arab: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ", latin: "Alhamdu lillahil-ladzi ahyana ba'da ma amatana wa ilaihin-nushur.", arti: "Segala puji bagi Allah yang menghidupkan kami kembali setelah mematikan kami dan kepada-Nya (kami) akan dibangkitkan." },
  { judul: "2. Doa Mengenakan Pakaian", arab: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا (الثَّوْبَ) وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ", latin: "Alhamdu lillahil-ladzi kasani hadza (ats-tsauba) wa razaqanihi min ghairi haulin minni wa la quwwah.", arti: "Segala puji bagi Allah yang telah memakaikan pakaian ini kepadaku dan mengaruniakannya kepadaku tanpa daya dan kekuatan dariku." },
  { judul: "3. Doa Mengenakan Pakaian Baru", arab: "اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ، أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا صُنِعَ لَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ", latin: "Allahumma lakal-hamdu anta kasautaniih, as-aluka min khairihi wa khairi maa shuni'a lah, wa a'udzu bika min syarrihi wa syarri maa shuni'a lah.", arti: "Ya Allah, bagi-Mu segala puji, Engkau-lah yang memakaikan pakaian ini kepadaku. Aku memohon kepada-Mu kebaikannya dan kebaikan apa saja yang dibuat untuknya, dan aku berlindung kepada-Mu dari keburukannya dan keburukan apa saja yang dibuat untuknya." },
  { judul: "4. Doa Menanggalkan Pakaian", arab: "بِسْمِ اللهِ", latin: "Bismillah.", arti: "Dengan nama Allah." },
  { judul: "5. Doa Ketika Masuk WC", arab: "(بِسْمِ اللهِ) اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ", latin: "(Bismillah) Allahumma inni a'udzu bika minal khubutsi wal khabaa-its.", arti: "Dengan nama Allah. Ya Allah, sesungguhnya aku berlindung kepada-Mu dari godaan setan laki-laki dan perempuan." },
  { judul: "6. Doa Ketika Keluar WC", arab: "غُفْرَانَكَ", latin: "Ghufraanak.", arti: "Aku memohon ampunan-Mu." },
  { judul: "7. Dzikir Sebelum Berwudhu", arab: "بِسْمِ اللهِ", latin: "Bismillah.", arti: "Dengan nama Allah." },
  { judul: "8. Dzikir Setelah Berwudhu", arab: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ", latin: "Asyhadu an laa ilaaha illallaah wahdahu laa syariika lah, wa asyhadu anna Muhammadan 'abduhu wa rasuuluh.", arti: "Aku bersaksi bahwa tidak ada Tuhan yang berhak disembah selain Allah semata, tidak ada sekutu bagi-Nya. Dan aku bersaksi bahwa Muhammad adalah hamba dan utusan-Nya." },
  { judul: "9. Doa Ketika Keluar Rumah", arab: "بِسْمِ اللهِ، تَوَكَّلْتُ عَلَى اللهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ", latin: "Bismillaahi tawakkaltu 'alallaah, wa laa haula wa laa quwwata illaa billaah.", arti: "Dengan nama Allah, aku bertawakkal kepada Allah. Tiada daya dan kekuatan kecuali dengan pertolongan Allah." },
  { judul: "10. Doa Ketika Masuk Rumah", arab: "بِسْمِ اللهِ وَلَجْنَا، وَبِسْمِ اللهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا", latin: "Bismillaahi walajnaa, wa bismillaahi kharajnaa, wa 'alaa rabbinaa tawakkalnaa.", arti: "Dengan nama Allah kami masuk, dan dengan nama Allah kami keluar, dan kepada Tuhan kami kami bertawakkal." },
  { judul: "11. Doa Pergi Ke Masjid", arab: "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي لِسَانِي نُورًا", latin: "Allahummaj'al fii qalbii nuuraa, wa fii lisaanii nuuraa.", arti: "Ya Allah, jadikanlah cahaya di hatiku dan cahaya di lisanku." },
  { judul: "12. Doa Masuk Masjid", arab: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ", latin: "Allahummaftah lii abwaaba rahmatik.", arti: "Ya Allah, bukalah untukku pintu-pintu rahmat-Mu." },
  { judul: "13. Doa Keluar Masjid", arab: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ", latin: "Allahumma innii as-aluka min fadhlika.", arti: "Ya Allah, sesungguhnya aku memohon keutamaan dari-Mu." },
  { judul: "14. Dzikir Setelah Azan", arab: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ", latin: "Allahumma rabba hadzihid-da'watit-tammah, wash-shalaatil qaa-imah, aati Muhammadanil-wasiilata wal-fadhilah, wab'atshu maqaamam-mahmuudanil-ladzi wa'adtah.", arti: "Ya Allah, Tuhan Pemilik panggilan yang sempurna ini dan shalat yang ditegakkan. Berilah Al-Wasilah dan fadhilah kepada Nabi Muhammad. Dan bangkitkanlah beliau di tempat yang terpuji yang telah Engkau janjikan." },
  { judul: "15. Doa Istiftah", arab: "اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ", latin: "Allahumma baa'id bainii wa baina khathaayaaya kamaa baa'adta bainal masyriqi wal maghrib.", arti: "Ya Allah, jauhkanlah antara aku dan kesalahan-kesalahanku sebagaimana Engkau menjauhkan antara timur dan barat." },
  { judul: "16. Doa Ruku'", arab: "سُبْحَانَ رَبِّيَ الْعَظِيمِ", latin: "Subhaana rabbiyal 'azhiim.", arti: "Maha Suci Tuhanku Yang Maha Agung." },
  { judul: "17. Doa Bangkit Dari Ruku'", arab: "سَمِعَ اللهُ لِمَنْ حَمِدَهُ ... رَبَّنَا وَلَكَ الْحَمْدُ", latin: "Sami'allaahu liman hamidah ... Rabbanaa wa lakal hamdu.", arti: "Allah Maha Mendengar orang yang memuji-Nya. Ya Tuhan kami, bagi-Mu segala puji." },
  { judul: "18. Doa Sujud", arab: "سُبْحَانَ رَبِّيَ الْأَعْلَى", latin: "Subhaana rabbiyal a'laa.", arti: "Maha Suci Tuhanku Yang Maha Tinggi." },
  { judul: "19. Doa Duduk Di Antara Dua Sujud", arab: "رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي", latin: "Rabbighfir lii, Rabbighfir lii.", arti: "Ya Tuhanku ampunilah aku, Ya Tuhanku ampunilah aku." },
  { judul: "20. Bacaan Tasyahhud", arab: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ", latin: "At-tahiyyaatu lillaahi wash-shalawaatu wath-thayyibaat.", arti: "Segala penghormatan, shalawat, dan kebaikan hanya milik Allah." },
  { judul: "21. Salawat Nabi", arab: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ", latin: "Allahumma shalli 'alaa Muhammad wa 'alaa aali Muhammad.", arti: "Ya Allah, berilah shalawat kepada Muhammad dan keluarga Muhammad." },
  { judul: "22. Doa Sebelum Salam", arab: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، وَمِنْ عَذَابِ جَهَنَّمَ", latin: "Allahumma inni a'udzu bika min 'adzabil qabri, wa min 'adzabi jahannama.", arti: "Ya Allah, aku berlindung kepada-Mu dari siksa kubur dan dari siksa neraka Jahanam." },
  { judul: "23. Dzikir Setelah Salam", arab: "أَسْتَغْفِرُ اللهَ (3x) اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ", latin: "Astaghfirullah (3x), Allahumma antas-salaam wa minkas-salaam.", arti: "Aku memohon ampun kepada Allah (3x). Ya Allah, Engkau Mahasejahtera, dan dari-Mu kesejahteraan." },
  { judul: "24. Doa Menjenguk Orang Sakit", arab: "لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللهُ", latin: "Laa ba'sa thahuurun insyaa-allaah.", arti: "Tidak mengapa, semoga sakitmu ini membuat dosamu bersih, Insya Allah." },
  { judul: "25. Doa Musibah", arab: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ", latin: "Innaa lillaahi wa innaa ilaihi raaji'uun.", arti: "Sesungguhnya kami milik Allah dan kepada-Nya kami kembali." },
  { judul: "26. Doa Berbuka Puasa", arab: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللهُ", latin: "Dzahabazh-zhama'u wabtallatil 'uruuqu wa tsabatal ajru insyaa-allaah.", arti: "Telah hilang dahaga, telah basah urat-urat, dan telah tetap pahala, Insya Allah." },
  { judul: "27. Doa Sebelum Makan", arab: "بِسْمِ اللهِ، اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ", latin: "Bismillah, Allahumma baarik lanaa fiimaa razaqtanaa wa qinaa 'adzaaban naar.", arti: "Dengan nama Allah. Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa neraka." },
  { judul: "28. Doa Setelah Makan", arab: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ", latin: "Alhamdu lillahil-ladzi ath'amanii hadzaa wa razaqanihi min ghairi haulin minni wa laa quwwah.", arti: "Segala puji bagi Allah yang telah memberiku makanan ini dan menganugerahkannya kepadaku tanpa daya dan kekuatan dariku." },
  { judul: "29. Doa Tamu Berpuasa", arab: "أَفْطَرَ عِنْدَكُمُ الصَّائِمُونَ، وَأَكَلَ طَعَامَكُمُ الْأَبْرَارُ", latin: "Afthara 'indakumush-shaa-imuun, wa akala tha'aamakumul abraar.", arti: "Semoga orang-orang yang berpuasa berbuka di tempat kalian dan orang-orang yang baik memakan makanan kalian." },
  { judul: "30. Doa Jika Dicela Saat Puasa", arab: "إِنِّي صَائِمٌ، إِنِّي صَائِمٌ", latin: "Innii shaa-im, innii shaa-im.", arti: "Sesungguhnya aku sedang berpuasa, sesungguhnya aku sedang berpuasa." },
  { judul: "31. Doa Melihat Buah Awal Musim", arab: "اللَّهُمَّ بَارِكْ لَنَا فِي ثَمَرِنَا", latin: "Allahumma baarik lanaa fii tsamarinaa.", arti: "Ya Allah, berkahilah kami pada buah-buahan kami." },
  { judul: "32. Doa Ketika Bersin", arab: "الْحَمْدُ لِلَّهِ", latin: "Alhamdu lillaah.", arti: "Segala puji bagi Allah." },
  { judul: "33. Doa Ketika Marah", arab: "أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ", latin: "A'udzu billaahi minasy-syaithaanir-rajiim.", arti: "Aku berlindung kepada Allah dari godaan setan yang terkutuk." },
  { judul: "34. Doa Naik Kendaraan", arab: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ", latin: "Subhaanal-ladzi sakhkhara lanaa hadzaa wa maa kunnaa lahu muqriniin.", arti: "Maha Suci Allah yang telah menundukkan semua ini bagi kami padahal kami sebelumnya tidak mampu menguasainya." },
  { judul: "35. Doa Masuk Pasar", arab: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ", latin: "Laa ilaaha illallaahu wahdahu laa syariika lah, lahul mulku wa lahul hamdu.", arti: "Tidak ada Tuhan yang berhak disembah selain Allah semata, tiada sekutu bagi-Nya. Bagi-Nya kerajaan dan segala puji." }
];

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

const compressImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800; 
        const scaleSize = MAX_WIDTH / img.width;
        const newWidth = (scaleSize < 1) ? MAX_WIDTH : img.width;
        const newHeight = (scaleSize < 1) ? (img.height * scaleSize) : img.height;
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
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
    name: '', 
    class: '', 
    scriptUrl: '', 
    logoUrl: '', 
    startDateRamadan: '2026-02-18', 
    schoolName: 'Sekolah Dasar Islam Terpadu', 
    theme: 'emerald' 
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [view, setView] = useState('cover'); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [isCompressing, setIsCompressing] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const currentTheme = THEMES[studentProfile.theme] || THEMES.emerald;
  const isScriptUrlValid = (url) => { if (!url) return false; return url.includes('script.google.com') && url.endsWith('/exec'); };

  // --- HELPER UNTUK MEMPERBAIKI LINK GOOGLE DRIVE ---
  const getProcessedLogoUrl = (url) => {
    if (!url) return '';
    if (url.includes('drive.google.com') && url.includes('/file/d/')) {
        const idMatch = url.match(/\/d\/(.*?)(?:\/|$)/);
        if (idMatch && idMatch[1]) {
            return `https://drive.google.com/uc?export=view&id=${idMatch[1]}`;
        }
    }
    return url;
  };

  useEffect(() => {
    // --- FITUR AUTO-CONFIG UNTUK SISWA ---
    const params = new URLSearchParams(window.location.search);
    const guruScript = params.get('guru');
    
    if (guruScript) {
      try {
        if (isScriptUrlValid(guruScript)) {
          setStudentProfile(prev => {
            const newProfile = { ...prev, scriptUrl: guruScript };
            localStorage.setItem('ramadanProfile', JSON.stringify(newProfile));
            return newProfile;
          });
          window.history.replaceState({}, document.title, window.location.pathname);
          alert("✅ Aplikasi berhasil terhubung ke Kelas Guru Anda!");
        }
      } catch (e) {
        console.error("Gagal memproses link guru");
      }
    }

    const savedData = localStorage.getItem('ramadanJournalData');
    const savedProfile = localStorage.getItem('ramadanProfile');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      for (let i = 1; i <= 30; i++) {
        if (!parsedData[i]) parsedData[i] = {};
        if (!parsedData[i].hasOwnProperty('salatMalam')) parsedData[i].salatMalam = false;
        if (!parsedData[i].hasOwnProperty('kosakata')) parsedData[i].kosakata = false;
        if (!parsedData[i].hasOwnProperty('witir')) parsedData[i].witir = false; 
        if (!parsedData[i].hasOwnProperty('namaPenceramah')) parsedData[i].namaPenceramah = ""; 
        if (!parsedData[i].hasOwnProperty('temaCeramah')) parsedData[i].temaCeramah = "";
      }
      setUserData(parsedData);
    } else {
      const initialData = {};
      for (let i = 1; i <= 30; i++) {
        initialData[i] = { 
          puasa: false, subuh: false, zuhur: false, ashar: false, maghrib: false, isya: false, 
          tarawih: false, witir: false, tadarus: false, 
          salatMalam: false, kosakata: false, bantuIbu: false, hafalDoa: "", amalanLain: "", amalanLainCheck: false,
          namaPenceramah: "", temaCeramah: "",
          validated: false 
        };
      }
      setUserData(initialData);
    }
    if (savedProfile) {
       if (!guruScript) {
         setStudentProfile(JSON.parse(savedProfile));
       }
    }
  }, []);

  useEffect(() => { if (Object.keys(userData).length > 0) localStorage.setItem('ramadanJournalData', JSON.stringify(userData)); }, [userData]);
  useEffect(() => { localStorage.setItem('ramadanProfile', JSON.stringify(studentProfile)); }, [studentProfile]);

  const toggleCheck = (day, field) => { if (userData[day]?.validated) return; setUserData(prev => ({ ...prev, [day]: { ...prev[day], [field]: !prev[day][field] } })); };
  const updateField = (day, field, value) => { if (userData[day]?.validated) return; setUserData(prev => ({ ...prev, [day]: { ...prev[day], [field]: value } })); };
  const toggleValidation = (day) => { setUserData(prev => ({ ...prev, [day]: { ...prev[day], validated: !prev[day].validated } })); if (!userData[day].validated) triggerConfetti(); };
  const triggerConfetti = () => { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 3000); };
  const handleImageUpload = async (e) => { const file = e.target.files[0]; if (file) { setIsCompressing(true); setSelectedImage(file.name); try { const compressedBase64 = await compressImage(file); setBase64Image(compressedBase64); } catch (error) { alert("Gagal memproses gambar."); } finally { setIsCompressing(false); } } };
  const removeImage = () => { setSelectedImage(null); setBase64Image(""); };

  // --- GENERATE LINK UNTUK GURU ---
  const generateShareLink = () => {
    if (!studentProfile.scriptUrl) return "";
    const baseUrl = window.location.origin + window.location.pathname;
    const encodedScript = encodeURIComponent(studentProfile.scriptUrl);
    return `${baseUrl}?guru=${encodedScript}`;
  };

  const copyShareLink = () => {
    const link = generateShareLink();
    if (link) {
      const textArea = document.createElement("textarea");
      textArea.value = link;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setShareLinkCopied(true);
        setTimeout(() => setShareLinkCopied(false), 3000);
      } catch (err) {
        console.error('Gagal menyalin:', err);
        alert('Gagal menyalin otomatis. Silakan salin manual.');
      }
      document.body.removeChild(textArea);
    }
  };

  const calculateDailyScore = (dayData, dayNum) => {
    let score = 0; if (!dayData) return 0;
    if (dayData.puasa) score += 20; if (dayData.subuh) score += 10; if (dayData.zuhur) score += 10; if (dayData.ashar) score += 10; if (dayData.maghrib) score += 10; if (dayData.isya) score += 10;
    if (dayData.tarawih) score += 10; if (dayData.witir) score += 10; if (dayData.tadarus) score += 10;
    if (dayData.salatMalam) score += (dayNum >= 21) ? 20 : 10; if (dayData.kosakata) score += 5; if (dayData.bantuIbu) score += 5;
    if (dayData.hafalDoa && dayData.hafalDoa !== "") score += 10; if (dayData.amalanLainCheck && dayData.amalanLain !== "") score += 5;
    
    // SCORE CERAMAH
    if (dayData.namaPenceramah && dayData.namaPenceramah.trim() !== "") score += 5;
    if (dayData.temaCeramah && dayData.temaCeramah.trim() !== "") score += 10;
    
    return score;
  };
  const calculateTotalScore = () => { let score = 0; Object.entries(userData).forEach(([dayKey, dayData]) => { score += calculateDailyScore(dayData, parseInt(dayKey)); }); return score; };

  const sendToGoogleSheet = async (e) => {
    if (e) e.preventDefault();
    const scriptUrl = studentProfile.scriptUrl ? studentProfile.scriptUrl.trim() : "";
    if (!scriptUrl) return alert("⚠️ Link Laporan Guru belum diisi!");
    if (!scriptUrl.includes('/exec')) return alert("⚠️ Link Script SALAH! Harus berakhiran '/exec'.");
    setIsSubmitting(true); setSubmitStatus(null);
    try {
      const currentDayData = userData[activeDay];
      let catatanLengkap = [];
      if (currentDayData.salatMalam) catatanLengkap.push("✅ Salat Malam");
      if (currentDayData.tarawih) catatanLengkap.push("✅ Tarawih");
      if (currentDayData.witir) catatanLengkap.push("✅ Witir");
      if (currentDayData.kosakata) catatanLengkap.push("✅ Hafal Kosakata");
      if (currentDayData.bantuIbu) catatanLengkap.push("✅ Bantu Ibu");
      if (currentDayData.hafalDoa) catatanLengkap.push(`✅ Doa: ${currentDayData.hafalDoa}`);
      
      // TAMBAHAN CERAMAH DI LAPORAN
      if (currentDayData.namaPenceramah) catatanLengkap.push(`🗣️ Penceramah: ${currentDayData.namaPenceramah}`);
      if (currentDayData.temaCeramah) catatanLengkap.push(`📝 Tema: ${currentDayData.temaCeramah}`);
      
      if (currentDayData.amalanLainCheck && currentDayData.amalanLain) catatanLengkap.push(`✅ Extra: ${currentDayData.amalanLain}`);
      
      const payload = { nama: studentProfile.name, kelas: studentProfile.class, hari: activeDay, poin: calculateDailyScore(currentDayData, activeDay), puasa: currentDayData.puasa, tarawih: currentDayData.tarawih, kebaikan: catatanLengkap.join(", "), foto: base64Image, namaFoto: selectedImage };
      await fetch(scriptUrl, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(payload) });
      setSubmitStatus('success'); triggerConfetti(); alert(`✅ Alhamdulillah! Laporan Hari ke-${activeDay} berhasil dikirim.`); removeImage();
    } catch (error) { console.error(error); setSubmitStatus('error'); alert("❌ Gagal mengirim data."); } finally { setIsSubmitting(false); }
  };

  const startBook = () => { if (!studentProfile.name || !studentProfile.class) { alert("Isi Nama dan Kelas dulu ya!"); return; } setView('journal'); };
  const currentData = userData[activeDay] || {};
  const totalScore = calculateTotalScore();
  const currentDateGregorian = getGregorianDate(studentProfile.startDateRamadan, activeDay);

  // --- RENDER HALAMAN ---
  if (view === 'cover') {
    return (
      <div className={`min-h-screen ${currentTheme.bg} flex items-center justify-center p-4 font-sans relative`}>
        <button onClick={() => setShowSettings(!showSettings)} className={`absolute top-4 right-4 bg-white p-2 rounded-full shadow-md text-slate-400 hover:${currentTheme.textLight} z-50`}><Settings size={24} /></button>
        {showSettings && (
          <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-lg text-slate-700">Pengaturan</h3><button onClick={() => setShowSettings(false)}><X size={24} className="text-slate-400" /></button></div>
              <div className="space-y-4">
                <div><label className="text-xs font-bold text-slate-500 mb-1 block">Nama Sekolah</label><input type="text" className="w-full p-2 border rounded-lg text-sm" value={studentProfile.schoolName} onChange={(e) => setStudentProfile(prev => ({...prev, schoolName: e.target.value}))} /></div>
                
                {/* --- INPUT LOGO (OPTIONAL) --- */}
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1 block flex items-center gap-1"><ImageIcon size={12}/> Link Logo Sekolah (Opsional)</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-lg text-xs font-mono" 
                    placeholder="https://... (Kosongkan jika pakai logo.png lokal)" 
                    value={studentProfile.logoUrl || ''} 
                    onChange={(e) => setStudentProfile(prev => ({...prev, logoUrl: e.target.value}))} 
                  />
                  <p className="text-[9px] text-slate-400 mt-1">Otomatis pakai /logo.png jika kosong.</p>
                </div>

                <div><label className="text-xs font-bold text-slate-500 mb-2 block">Pilih Tema</label><div className="flex gap-2 justify-center flex-wrap">{Object.values(THEMES).map((t) => (<button key={t.id} onClick={() => setStudentProfile(prev => ({...prev, theme: t.id}))} className={`w-8 h-8 rounded-full border-2 ${t.header} ${studentProfile.theme === t.id ? 'ring-2 ring-slate-400 border-white' : 'border-transparent'}`} />))}</div></div>
                <div><label className="text-xs font-bold text-slate-500 mb-1 block">Link Script Guru (Harus berakhiran /exec)</label><input type="text" className={`w-full p-2 border rounded-lg text-xs ${studentProfile.scriptUrl && !isScriptUrlValid(studentProfile.scriptUrl) ? 'border-red-500 bg-red-50 text-red-600' : ''}`} placeholder="https://script.google.com/.../exec" value={studentProfile.scriptUrl} onChange={(e) => setStudentProfile(prev => ({...prev, scriptUrl: e.target.value}))} />{studentProfile.scriptUrl && !isScriptUrlValid(studentProfile.scriptUrl) && (<p className="text-[10px] text-red-500 mt-1 flex items-center gap-1"><AlertTriangle size={10} /> Link sepertinya salah.</p>)}</div>
                
                {/* --- BAGIAN KHUSUS GURU: SHARE LINK --- */}
                {isScriptUrlValid(studentProfile.scriptUrl) && (
                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl mt-4">
                    <h4 className="text-xs font-bold text-blue-700 flex items-center gap-2 mb-2"><Share2 size={12}/> Bagikan ke Siswa</h4>
                    <p className="text-[10px] text-slate-500 mb-2">
                      ⚠️ <strong>PENTING:</strong> Pastikan Anda menyalin link ini dari <strong>Website Utama (Vercel)</strong>, bukan dari mode Preview/Editor.
                    </p>
                    <div className="flex gap-2">
                      <input readOnly type="text" className="w-full text-[10px] p-2 rounded border bg-white text-slate-500" value={generateShareLink()} />
                      <button onClick={copyShareLink} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
                        {shareLinkCopied ? <CheckCircle size={16}/> : <Copy size={16}/>}
                      </button>
                    </div>
                    {shareLinkCopied && <p className="text-[10px] text-green-600 mt-1 text-center font-bold">Link tersalin!</p>}
                  </div>
                )}

                <button onClick={() => setShowSettings(false)} className={`w-full mt-2 ${currentTheme.header} text-white py-2 rounded-lg font-bold`}>Simpan</button>
              </div>
            </div>
          </div>
        )}
        <div className={`bg-white max-w-sm w-full rounded-3xl shadow-2xl overflow-hidden border-4 ${currentTheme.border} relative pb-8`}>
          <div className={`absolute top-0 left-0 w-full h-40 ${currentTheme.header} rounded-b-[50%] z-0`}></div>
          <div className="relative z-10 p-6 flex flex-col items-center text-center mt-4">
            
            {/* LOGO SEKOLAH DENGAN FALLBACK */}
            <div className={`bg-white p-3 rounded-full shadow-xl mb-4 w-32 h-32 flex items-center justify-center border-4 border-${currentTheme.secondary}-400 overflow-hidden`}>
               {studentProfile.logoUrl || !logoError ? (
                 <img 
                   src={studentProfile.logoUrl ? getProcessedLogoUrl(studentProfile.logoUrl) : "/logo.png"} 
                   alt="Logo Sekolah" 
                   className="w-full h-full object-contain"
                   onError={(e) => {
                     // Jika pakai logoUrl gagal, coba /logo.png lokal
                     if (studentProfile.logoUrl) {
                        e.target.src = "/logo.png";
                        e.target.onerror = () => {
                           setLogoError(true);
                           e.target.style.display = 'none';
                        };
                     } else {
                        setLogoError(true);
                        e.target.style.display = 'none';
                     }
                   }}
                 />
               ) : null}
               
               {/* Fallback ke Ikon Buku jika semua gambar gagal */}
               {logoError && !studentProfile.logoUrl && (
                 <BookOpen size={48} className={currentTheme.text} />
               )}
            </div>

            <h1 className={`text-2xl font-bold ${currentTheme.text} font-serif leading-tight mb-2`}>Buku Amaliah<br/>Ramadan OnLine</h1>
            <h2 className="text-xs font-semibold text-white/90 bg-black/20 px-3 py-1 rounded-full mb-6">1446 H</h2>
            <div className="w-full space-y-3 mb-6">
              <input type="text" className="w-full p-3 border rounded-xl bg-slate-50 text-center font-bold text-slate-700" placeholder="Nama Lengkap" value={studentProfile.name} onChange={(e) => setStudentProfile(prev => ({ ...prev, name: e.target.value }))} />
              <input type="text" className="w-full p-3 border rounded-xl bg-slate-50 text-center font-bold text-slate-700" placeholder="Kelas" value={studentProfile.class} onChange={(e) => setStudentProfile(prev => ({ ...prev, class: e.target.value }))} />
            </div>
            <button onClick={startBook} className={`w-full bg-gradient-to-r ${currentTheme.btnGradient} text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2`}>Mulai <ArrowRight size={18} /></button>
            <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">{studentProfile.schoolName}</p>
          </div>
          <div className="absolute bottom-2 left-0 w-full text-center">
             <span className="text-[10px] text-slate-400 font-mono">Versi Final 2.3 (Ceramah + Share Fix)</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. HALAMAN UTAMA (JURNAL, LAPOR, DOA)
  return (
    <div className={`min-h-screen ${currentTheme.bg} font-sans text-slate-800 pb-20`}>
      <div className={`${currentTheme.header} text-white p-5 pb-8 rounded-b-3xl shadow-lg relative z-10`}>
        <div className="flex justify-between items-center mb-3"><div><h1 className="font-bold text-lg">{studentProfile.name || 'Siswa'}</h1><p className="text-xs opacity-90">{studentProfile.class}</p></div><div className="bg-white/20 p-2 rounded-lg"><Star className="text-yellow-300 fill-yellow-300" size={20} /></div></div>
        <div className="bg-yellow-400 text-yellow-900 p-3 rounded-2xl shadow-lg border-b-4 border-yellow-600 flex flex-col items-center transform scale-100 transition-transform"><div className="flex items-center gap-2"><Trophy size={24} className="fill-yellow-100 text-yellow-800" /><span className="text-xs font-bold uppercase tracking-widest text-yellow-800">Total Poin</span></div><span className="text-4xl font-black mt-1 leading-none">{totalScore}</span></div>
      </div>
      <div className="px-4 -mt-4 relative z-20 max-w-md mx-auto">
        <div className="bg-white p-1 rounded-xl shadow-md flex mb-4 text-xs font-bold text-center border border-slate-100">
             <button onClick={() => setView('journal')} className={`flex-1 py-2 rounded-lg ${view === 'journal' ? `${currentTheme.bg} ${currentTheme.textLight}` : 'text-slate-400'}`}>Jurnal</button>
             <button onClick={() => setView('doa')} className={`flex-1 py-2 rounded-lg ${view === 'doa' ? `${currentTheme.bg} ${currentTheme.textLight}` : 'text-slate-400'}`}>Doa</button>
             <button onClick={() => setView('achievements')} className={`flex-1 py-2 rounded-lg ${view === 'achievements' ? `${currentTheme.bg} ${currentTheme.textLight}` : 'text-slate-400'}`}>Lapor</button>
        </div>
        {view === 'journal' && (
          <div className="space-y-4 pb-10">
            <div className="flex items-center justify-between bg-white p-2 rounded-xl shadow-sm"><button onClick={() => setActiveDay(d => Math.max(1, d - 1))} className="p-2 bg-slate-50 rounded-lg"><ChevronLeft size={16}/></button><div className="text-center"><div className="font-bold text-slate-800">Ramadan Hari ke-{activeDay}</div><div className="text-[10px] text-slate-500">{currentDateGregorian}</div></div><button onClick={() => setActiveDay(d => Math.min(30, d + 1))} className="p-2 bg-slate-50 rounded-lg"><ChevronRight size={16}/></button></div>
            {currentData.validated && <div className="bg-green-100 text-green-700 p-2 rounded-lg text-xs font-bold text-center">✅ Data sudah divalidasi</div>}
            
            {/* PUASA */}
            <div onClick={() => !currentData.validated && toggleCheck(activeDay, 'puasa')} className={`relative overflow-hidden p-5 rounded-3xl border-2 cursor-pointer transition-all duration-300 ease-out group shadow-sm ${currentData.puasa ? `bg-gradient-to-br from-orange-400 to-yellow-500 border-orange-600 shadow-lg` : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                {currentData.puasa && (<div className="absolute -right-5 -top-5 w-24 h-24 bg-white opacity-20 rounded-full blur-2xl pointer-events-none"></div>)}
                <div className="flex items-center justify-between relative z-10"><div className="flex items-center gap-4"><div className={`p-3 rounded-2xl transition-all duration-300 ${currentData.puasa ? 'bg-white text-orange-500 shadow-md' : 'bg-slate-100 text-slate-400'}`}><Sun size={28} className={currentData.puasa ? 'animate-spin-slow fill-orange-500' : ''} /></div><div><h3 className={`font-bold text-lg leading-tight ${currentData.puasa ? 'text-white' : 'text-slate-600'}`}>Puasa Penuh</h3><p className={`text-xs font-medium mt-1 ${currentData.puasa ? 'text-orange-100' : 'text-slate-400'}`}>{currentData.puasa ? 'Alhamdulillah! (+20 Poin)' : 'Klik jika berpuasa hari ini'}</p></div></div><div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${currentData.puasa ? 'bg-white border-white rotate-0' : 'border-slate-200 bg-slate-50 -rotate-12'}`}>{currentData.puasa && <CheckCircle size={20} className="text-orange-500" />}</div></div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100"><h3 className="font-bold text-xs mb-3 text-slate-500 uppercase">Shalat Wajib (+10)</h3><div className="flex flex-wrap gap-2">{['Subuh', 'Zuhur', 'Ashar', 'Maghrib', 'Isya'].map(s => (<button key={s} onClick={() => !currentData.validated && toggleCheck(activeDay, s.toLowerCase())} className={`flex-1 py-2 rounded-lg text-xs font-bold border ${currentData[s.toLowerCase()] ? 'bg-blue-500 text-white border-blue-500' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>{s}</button>))}</div></div>
            <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-4 rounded-3xl shadow-lg border border-indigo-900 relative overflow-hidden text-white"><div className="absolute top-2 right-4 opacity-30"><Star size={10} className="fill-white" /></div><div className="absolute bottom-4 left-4 opacity-20"><Star size={14} className="fill-white" /></div><div className="flex justify-between items-center relative z-10"><div className="flex items-center gap-4"><div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm"><Moon size={24} className="text-yellow-200 fill-yellow-200" /></div><div><h3 className="font-bold text-white flex items-center gap-2">Salat Malam</h3><p className="text-xs text-indigo-200">Bangun Malam (Tahajud)</p></div></div><div onClick={() => !currentData.validated && toggleCheck(activeDay, 'salatMalam')} className={`w-10 h-10 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${currentData.salatMalam ? 'bg-yellow-400 border-yellow-400 text-yellow-900 scale-110' : 'border-indigo-400/50 bg-white/5'}`}>{currentData.salatMalam && <CheckCircle size={20} />}</div></div></div>
            <div className="grid grid-cols-3 gap-2">{[{ id: 'tarawih', label: 'Tarawih' }, { id: 'witir', label: 'Witir' }, { id: 'tadarus', label: 'Tadarus' }].map(ibadah => (<div key={ibadah.id} onClick={() => !currentData.validated && toggleCheck(activeDay, ibadah.id)} className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 cursor-pointer text-center ${currentData[ibadah.id] ? `bg-${currentTheme.accent}-50 border-${currentTheme.accent}-500` : 'bg-white border-slate-100'}`}><span className={`font-bold text-xs ${currentData[ibadah.id] ? currentTheme.text : 'text-slate-500'}`}>{ibadah.label}</span></div>))}</div>
            
            {/* KEGIATAN POSITIF */}
            <div className={`bg-gradient-to-br from-white to-${currentTheme.accent}-50 p-5 rounded-3xl shadow-sm border border-${currentTheme.accent}-100 space-y-3`}><h3 className={`font-bold text-sm ${currentTheme.textLight} flex items-center gap-2`}><Heart size={16} /> Kegiatan Positif</h3>{[{key: 'kosakata', label: 'Hafal Kosakata (+5)'}, {key: 'bantuIbu', label: 'Bantu Ibu (+5)'}].map(item => (<div key={item.key} onClick={() => !currentData.validated && toggleCheck(activeDay, item.key)} className={`p-3 rounded-xl border cursor-pointer flex justify-between items-center ${currentData[item.key] ? `${currentTheme.bg} border-${currentTheme.accent}-300` : 'bg-white border-slate-100'}`}><span className="text-xs font-bold">{item.label}</span><div className={`w-5 h-5 rounded-full border flex items-center justify-center ${currentData[item.key] ? `${currentTheme.header} border-transparent` : 'border-slate-300'}`}>{currentData[item.key] && <CheckCircle size={12} className="text-white" />}</div></div>))}<div className="p-3 bg-white rounded-2xl border border-slate-100"><div className="flex items-center gap-2 mb-2"><List size={18} className={`text-${currentTheme.accent}-500`} /><span className="text-xs font-bold text-slate-600">Menghafal Doa (+10)</span></div><select className={`w-full text-xs p-2 bg-slate-50 rounded-lg border-none outline-none text-slate-700`} value={currentData.hafalDoa || ""} onChange={(e) => updateField(activeDay, 'hafalDoa', e.target.value)} disabled={currentData.validated}><option value="">-- Pilih Doa --</option>{DAFTAR_DOA.map((d, i) => <option key={i} value={d.judul}>{d.judul}</option>)}</select></div><div className="p-3 bg-white rounded-2xl border border-slate-100"><div className="flex justify-between mb-2"><span className="text-xs font-bold text-slate-600">Amalan Lain (+5)</span><label className="flex items-center gap-1"><input type="checkbox" checked={currentData.amalanLainCheck || false} onChange={() => toggleCheck(activeDay, 'amalanLainCheck')} disabled={currentData.validated} /><span className="text-[10px]">Selesai</span></label></div><input type="text" className="w-full text-xs p-2 bg-slate-50 rounded-lg border border-slate-200 outline-none" placeholder="Contoh: Sedekah..." value={currentData.amalanLain || ""} onChange={(e) => updateField(activeDay, 'amalanLain', e.target.value)} disabled={currentData.validated} /></div></div>
            
            {/* JURNAL CERAMAH (FITUR BARU) */}
            <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-xs text-slate-500 mb-3 flex items-center gap-2 uppercase tracking-wide">
                  <Mic size={14} className="text-blue-500" /> Jurnal Ceramah (Tarawih/Subuh)
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold ml-1 mb-1 block">Nama Penceramah (+5 Poin)</label>
                    <div className="relative">
                      <User size={14} className="absolute left-3 top-3 text-slate-300" />
                      <input 
                        type="text" 
                        className="w-full pl-9 p-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:border-blue-300 outline-none transition-all"
                        placeholder="Contoh: Al-Ustaz Khidir bin Muh. Sunusi"
                        value={currentData.namaPenceramah || ""}
                        onChange={(e) => updateField(activeDay, 'namaPenceramah', e.target.value)}
                        disabled={currentData.validated}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 font-bold ml-1 mb-1 block">Tema Ceramah (+10 Poin)</label>
                    <div className="relative">
                      <PenTool size={14} className="absolute left-3 top-3 text-slate-300" />
                      <input 
                        type="text" 
                        className="w-full pl-9 p-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:border-blue-300 outline-none transition-all"
                        placeholder="Contoh: Keutamaan Sedekah"
                        value={currentData.temaCeramah || ""}
                        onChange={(e) => updateField(activeDay, 'temaCeramah', e.target.value)}
                        disabled={currentData.validated}
                      />
                    </div>
                  </div>
                </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200 text-center"><button onClick={() => toggleValidation(activeDay)} className="w-full py-2 bg-white border border-yellow-400 text-yellow-700 rounded-lg text-xs font-bold shadow-sm active:scale-95 transition">{currentData.validated ? 'Buka Validasi' : 'Tanda Tangan Orang Tua'}</button></div>
          </div>
        )}
        {view === 'achievements' && (
           <div className="space-y-4 pb-10"><div className="bg-white p-5 rounded-2xl shadow-sm text-center border border-slate-100"><Award size={40} className="mx-auto text-blue-500 mb-2" /><h2 className="text-lg font-bold">Lapor Guru</h2><p className="text-xs text-slate-500 mb-4">Kirim poin & foto hari ini.</p><div className="mb-4 text-left"><label className="text-xs font-bold text-slate-400 block mb-2">Upload Foto (Otomatis Diperkecil)</label>{!selectedImage ? (<label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50"><Camera size={20} className="text-slate-400 mb-1" /><span className="text-[10px] text-slate-500">Ambil Foto</span><input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} /></label>) : (<div className="relative w-full h-40 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center">{isCompressing ? (<div className="text-center"><Loader2 size={24} className="animate-spin text-blue-500 mx-auto" /><span className="text-[10px] text-slate-500">Mengecilkan foto...</span></div>) : (<><img src={base64Image} alt="Preview" className="w-full h-full object-cover" /><button onClick={removeImage} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"><X size={14} /></button></>)}</div>)}</div><button onClick={sendToGoogleSheet} disabled={isSubmitting || isCompressing} className={`w-full text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 ${isSubmitting || isCompressing ? 'bg-slate-400' : 'bg-blue-600'}`}>{isSubmitting ? 'Mengirim...' : 'Kirim Laporan'}</button></div><button onClick={() => setView('cover')} className="w-full text-center text-xs text-slate-400">Kembali ke Depan</button></div>
        )}
        {view === 'doa' && (
           <div className="space-y-3 pb-10">{DAFTAR_DOA.map((doa, i) => (<div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100"><h3 className="font-bold text-sm text-slate-700 mb-2">{doa.judul}</h3><p className="text-right font-serif text-lg leading-loose mb-2 text-slate-800">{doa.arab}</p><p className="text-xs italic text-slate-500 border-t pt-2">{doa.latin}</p><p className="text-xs text-slate-600 mt-1">{doa.arti}</p></div>))}</div>
        )}
      </div>
      {showConfetti && <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50"><div className="text-6xl animate-bounce">🎉</div></div>}
    </div>
  );
}
