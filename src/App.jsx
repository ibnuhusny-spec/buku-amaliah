import React, { useState, useEffect } from 'react';
import { Star, Moon, Sun, BookOpen, CheckCircle, Award, ChevronLeft, ChevronRight, PenTool, User, CloudUpload, ArrowRight, Book, Settings, Camera, X, Heart, MessageCircle, List, Calendar, Palette, Sparkles } from 'lucide-react';

// --- DATA: KOLEKSI DOA (HISNUL MUSLIM LENGKAP) ---
const DAFTAR_DOA = [
  { 
    judul: "1. Doa Saat Bangun Tidur", 
    arab: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ", 
    latin: "Alhamdu lillahil-ladzi ahyana ba'da ma amatana wa ilaihin-nushur.",
    arti: "Segala puji bagi Allah yang menghidupkan kami kembali setelah mematikan kami dan kepada-Nya (kami) akan dibangkitkan."
  },
  { 
    judul: "2. Doa Mengenakan Pakaian", 
    arab: "الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا (الثَّوْبَ) وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ", 
    latin: "Alhamdu lillahil-ladzi kasani hadza (ats-tsauba) wa razaqanihi min ghairi haulin minni wa la quwwah.",
    arti: "Segala puji bagi Allah yang telah memakaikan pakaian ini kepadaku dan mengaruniakannya kepadaku tanpa daya dan kekuatan dariku."
  },
  { 
    judul: "3. Doa Mengenakan Pakaian Baru", 
    arab: "اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ، أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا صُنِعَ لَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ", 
    latin: "Allahumma lakal-hamdu anta kasautaniih, as-aluka min khairihi wa khairi maa shuni'a lah, wa a'udzu bika min syarrihi wa syarri maa shuni'a lah.",
    arti: "Ya Allah, segala puji bagi-Mu, Engkau-lah yang memakaikan pakaian ini kepadaku, aku memohon kepada-Mu untuk memperoleh kebaikannya dan kebaikan apa saja yang dibuat untuknya, dan aku berlindung kepada-Mu dari keburukannya dan keburukan apa saja yang dibuat untuknya."
  },
  { 
    judul: "4. Doa Menanggalkan Pakaian", 
    arab: "بِسْمِ اللهِ", 
    latin: "Bismillah.",
    arti: "Dengan nama Allah."
  },
  { 
    judul: "5. Doa Ketika Masuk WC", 
    arab: "(بِسْمِ اللهِ) اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ", 
    latin: "(Bismillah) Allahumma inni a'udzu bika minal khubutsi wal khabaa-its.",
    arti: "Ya Allah, sesungguhnya aku berlindung kepada-Mu dari godaan setan laki-laki dan perempuan."
  },
  { 
    judul: "6. Doa Ketika Keluar WC", 
    arab: "غُفْرَانَكَ", 
    latin: "Ghufraanak.",
    arti: "Aku memohon ampunan-Mu."
  },
  { 
    judul: "7. Dzikir Sebelum Berwudhu", 
    arab: "بِسْمِ اللهِ", 
    latin: "Bismillah.",
    arti: "Dengan nama Allah."
  },
  { 
    judul: "8. Dzikir Setelah Berwudhu", 
    arab: "أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ", 
    latin: "Asyhadu an laa ilaaha illallaah wahdahu laa syariika lah, wa asyhadu anna Muhammadan 'abduhu wa rasuuluh.",
    arti: "Aku bersaksi bahwa tidak ada Tuhan yang berhak disembah selain Allah semata, tidak ada sekutu bagi-Nya. Dan aku bersaksi bahwa Muhammad adalah hamba dan utusan-Nya."
  },
  { 
    judul: "9. Doa Ketika Keluar Rumah", 
    arab: "بِسْمِ اللهِ، تَوَكَّلْتُ عَلَى اللهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ", 
    latin: "Bismillaahi tawakkaltu 'alallaah, wa laa haula wa laa quwwata illaa billaah.",
    arti: "Dengan nama Allah, aku bertawakkal kepada Allah. Tiada daya dan kekuatan kecuali dengan pertolongan Allah."
  },
  { 
    judul: "10. Doa Ketika Masuk Rumah", 
    arab: "بِسْمِ اللهِ وَلَجْنَا، وَبِسْمِ اللهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا", 
    latin: "Bismillaahi walajnaa, wa bismillaahi kharajnaa, wa 'alaa rabbinaa tawakkalnaa.",
    arti: "Dengan nama Allah kami masuk, dan dengan nama Allah kami keluar, dan kepada Tuhan kami, kami bertawakkal."
  },
  { 
    judul: "11. Doa Pergi Ke Masjid", 
    arab: "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي لِسَانِي نُورًا، وَاجْعَلْ فِي سَمْعِي نُورًا، وَاجْعَلْ فِي بَصَرِي نُورًا", 
    latin: "Allahummaj'al fii qalbii nuuraa, wa fii lisaanii nuuraa, waj'al fii sam'ii nuuraa, waj'al fii basharii nuuraa.",
    arti: "Ya Allah, jadikanlah cahaya di hatiku, cahaya di lidahku, cahaya di pendengaranku, cahaya di penglihatanku."
  },
  { 
    judul: "12. Doa Masuk Masjid", 
    arab: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ", 
    latin: "Allahummaftah lii abwaaba rahmatik.",
    arti: "Ya Allah, bukalah untukku pintu-pintu rahmat-Mu."
  },
  { 
    judul: "13. Dzikir Setelah Azan", 
    arab: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ", 
    latin: "Allahumma rabba hadzihid-da'watit-tammah, wash-shalaatil qaa-imah, aati Muhammadanil-wasiilata wal-fadhilah, wab'atshu maqaamam-mahmuudanil-ladzi wa'adtah.",
    arti: "Ya Allah, Tuhan pemilik panggilan yang sempurna ini dan shalat yang ditegakkan, berikanlah kepada Muhammad wasilah dan keutamaan, dan bangkitkanlah ia di tempat yang terpuji yang telah Engkau janjikan kepadanya."
  },
  { 
    judul: "14. Doa Istiftah", 
    arab: "اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ", 
    latin: "Allahumma baa'id bainii wa baina khathaayaaya kamaa baa'adta bainal masyriqi wal maghrib.",
    arti: "Ya Allah, jauhkanlah antara aku dan kesalahan-kesalahanku sebagaimana Engkau menjauhkan antara timur dan barat."
  },
  { 
    judul: "15. Doa Ruku'", 
    arab: "سُبْحَانَ رَبِّيَ الْعَظِيمِ", 
    latin: "Subhaana rabbiyal 'azhiim.",
    arti: "Maha Suci Tuhanku Yang Maha Agung."
  },
  { 
    judul: "16. Doa Bangkit Dari Ruku'", 
    arab: "سَمِعَ اللهُ لِمَنْ حَمِدَهُ ... رَبَّنَا وَلَكَ الْحَمْدُ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ", 
    latin: "Sami'allaahu liman hamidah ... Rabbanaa wa lakal hamdu hamdan katsiiran thayyiban mubaarakan fiih.",
    arti: "Allah Maha Mendengar orang yang memuji-Nya. Ya Tuhan kami, bagi-Mu segala puji, pujian yang banyak, baik, dan penuh berkah."
  },
  { 
    judul: "17. Doa Sujud", 
    arab: "سُبْحَانَ رَبِّيَ الْأَعْلَى", 
    latin: "Subhaana rabbiyal a'laa.",
    arti: "Maha Suci Tuhanku Yang Maha Tinggi."
  },
  { 
    judul: "18. Doa Duduk Di Antara Dua Sujud", 
    arab: "رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي", 
    latin: "Rabbighfir lii, Rabbighfir lii.",
    arti: "Ya Tuhanku ampunilah aku, Ya Tuhanku ampunilah aku."
  },
  { 
    judul: "19. Bacaan Tasyahhud", 
    arab: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ", 
    latin: "At-tahiyyaatu lillaahi wash-shalawaatu wath-thayyibaat, as-salaamu 'alaika ayyuhan-nabiyyu wa rahmatullaahi wa barakaatuh.",
    arti: "Segala penghormatan, shalawat, dan kebaikan hanya milik Allah. Semoga keselamatan tercurah kepadamu wahai Nabi, begitu juga rahmat Allah dan keberkahan-Nya."
  },
  { 
    judul: "20. Salawat Nabi Setelah Tasyahhud", 
    arab: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ", 
    latin: "Allahumma shalli 'alaa Muhammad wa 'alaa aali Muhammad, kamaa shallaita 'alaa Ibraahiim wa 'alaa aali Ibraahiim.",
    arti: "Ya Allah, berilah shalawat kepada Muhammad dan keluarga Muhammad, sebagaimana Engkau telah memberi shalawat kepada Ibrahim dan keluarga Ibrahim."
  },
  { 
    judul: "21. Doa Setelah Tasyahhud Akhir", 
    arab: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، وَمِنْ عَذَابِ جَهَنَّمَ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ، وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ", 
    latin: "Allahumma inni a'udzu bika min 'adzabil qabri, wa min 'adzabi jahannama, wa min fitnatil mahyaa wal mamaati, wa min syarri fitnatil masiihid dajjaal.",
    arti: "Ya Allah, aku berlindung kepada-Mu dari siksa kubur, dari siksa neraka Jahanam, dari fitnah kehidupan dan kematian, dan dari keburukan fitnah Dajjal."
  },
  { 
    judul: "22. Dzikir Setelah Salam", 
    arab: "أَسْتَغْفِرُ اللهَ (3x) اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ", 
    latin: "Astaghfirullah (3x), Allahumma antas-salaam wa minkas-salaam, tabaarakta yaa dzal-jalaali wal-ikraam.",
    arti: "Aku memohon ampun kepada Allah (3x). Ya Allah, Engkau Mahasejahtera, dan dari-Mu kesejahteraan, Maha Suci Engkau wahai Tuhan pemilik keagungan dan kemuliaan."
  },
  { 
    judul: "23. Doa Qunut Salat Witir", 
    arab: "اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ", 
    latin: "Allahummahdinii fiiman hadait, wa 'aafinii fiiman 'aafait, wa tawallanii fiiman tawallait.",
    arti: "Ya Allah, berilah aku petunjuk sebagaimana orang-orang yang telah Engkau beri petunjuk, berilah aku keselamatan sebagaimana orang-orang yang telah Engkau beri keselamatan, dan uruslah aku sebagaimana orang-orang yang telah Engkau urus."
  },
  { 
    judul: "24. Doa Menjenguk Orang Sakit", 
    arab: "لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللهُ", 
    latin: "Laa ba'sa thahuurun insyaa-allaah.",
    arti: "Tidak mengapa, semoga sakitmu ini membuat dosamu bersih, Insya Allah."
  },
  { 
    judul: "25. Doa Orang Yang Tertimpa Musibah", 
    arab: "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ، اللَّهُمَّ أْجُرْنِي فِي مُصِيبَتِي وَأَخْلِفْ لِي خَيْرًا مِنْهَا", 
    latin: "Innaa lillaahi wa innaa ilaihi raaji'uun, Allahumma'jurnii fii mushiibatii wa akhlif lii khairan minhaa.",
    arti: "Sesungguhnya kami milik Allah dan kepada-Nya kami kembali. Ya Allah, berilah aku pahala dalam musibahku ini dan berilah aku ganti yang lebih baik darinya."
  },
  { 
    judul: "26. Doa Berbuka Puasa", 
    arab: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللهُ", 
    latin: "Dzahabazh-zhama'u wabtallatil 'uruuqu wa tsabatal ajru insyaa-allaah.",
    arti: "Telah hilang dahaga, telah basah urat-urat, dan telah tetap pahala, Insya Allah."
  },
  { 
    judul: "27. Doa Sebelum Makan", 
    arab: "(بِسْمِ اللهِ) اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ", 
    latin: "(Bismillah) Allahumma baarik lanaa fiimaa razaqtanaa wa qinaa 'adzaaban naar.",
    arti: "(Dengan nama Allah) Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa neraka."
  },
  { 
    judul: "28. Doa Setelah Makan", 
    arab: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ", 
    latin: "Alhamdu lillahil-ladzi ath'amanii hadzaa wa razaqanihi min ghairi haulin minni wa laa quwwah.",
    arti: "Segala puji bagi Allah yang telah memberiku makanan ini dan menganugerahkannya kepadaku tanpa daya dan kekuatan dariku."
  },
  { 
    judul: "29. Doa Berpuasa Di Rumah Orang Lain", 
    arab: "أَفْطَرَ عِنْدَكُمُ الصَّائِمُونَ، وَأَكَلَ طَعَامَكُمُ الْأَبْرَارُ، وَصَلَّتْ عَلَيْكُمُ الْمَلَائِكَةُ", 
    latin: "Afthara 'indakumush-shaa-imuun, wa akala tha'aamakumul abraar, wa shallat 'alaikumul malaa-ikah.",
    arti: "Semoga orang-orang yang berpuasa berbuka di tempat kalian, orang-orang yang baik memakan makanan kalian, dan para malaikat mendoakan kalian."
  },
  { 
    judul: "30. Doa Saat Puasa Ada Yang Mencela", 
    arab: "إِنِّي صَائِمٌ، إِنِّي صَائِمٌ", 
    latin: "Innii shaa-im, innii shaa-im.",
    arti: "Sesungguhnya aku sedang berpuasa, sesungguhnya aku sedang berpuasa."
  },
  { 
    judul: "31. Doa Melihat Buah Ranum", 
    arab: "اللَّهُمَّ بَارِكْ لَنَا فِي ثَمَرِنَا، وَبَارِكْ لَنَا فِي مَدِينَتِنَا", 
    latin: "Allahumma baarik lanaa fii tsamarinaa, wa baarik lanaa fii madiinatinaa.",
    arti: "Ya Allah, berkahilah buah-buahan kami, berkahilah kota kami."
  },
  { 
    judul: "32. Doa Ketika Bersin", 
    arab: "الْحَمْدُ لِلَّهِ", 
    latin: "Alhamdu lillaah.",
    arti: "Segala puji bagi Allah."
  },
  { 
    judul: "33. Doa Ketika Marah", 
    arab: "أَعُوذُ بِاللهِ مِنَ الشَّيْطَانِ الرَّجِيمِ", 
    latin: "A'udzu billaahi minasy-syaithaanir-rajiim.",
    arti: "Aku berlindung kepada Allah dari godaan setan yang terkutuk."
  },
  { 
    judul: "34. Doa Naik Kendaraan", 
    arab: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ", 
    latin: "Subhaanal-ladzi sakhkhara lanaa hadzaa wa maa kunnaa lahu muqriniin, wa innaa ilaa rabbinaa lamunqalibuun.",
    arti: "Maha Suci Allah yang telah menundukkan semua ini bagi kami padahal kami sebelumnya tidak mampu menguasainya, dan sesungguhnya kami akan kembali kepada Tuhan kami."
  },
  { 
    judul: "35. Doa Masuk Pasar", 
    arab: "لَا إِلَهَ إِلَّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، يُحْيِي وَيُمِيتُ وَهُوَ حَيٌّ لَا يَمُوتُ، بِيَدِهِ الْخَيْرُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ", 
    latin: "Laa ilaaha illallaahu wahdahu laa syariika lah, lahul mulku wa lahul hamdu, yuhyii wa yumiitu wa huwa hayyun laa yamuut, biyadihil khairu, wa huwa 'alaa kulli syai-in qadiir.",
    arti: "Tidak ada Tuhan yang berhak disembah selain Allah semata, tiada sekutu bagi-Nya. Bagi-Nya kerajaan dan segala puji. Dia yang menghidupkan dan yang mematikan. Dia Maha Hidup dan tidak mati. Di tangan-Nya segala kebaikan dan Dia Maha Kuasa atas segala sesuatu."
  }
];

// --- KONFIGURASI TEMA WARNA ---
const THEMES = {
  emerald: { 
    id: 'emerald', name: 'Hijau Eden', 
    bg: 'bg-emerald-50', header: 'bg-emerald-600', text: 'text-emerald-800', textLight: 'text-emerald-600', border: 'border-emerald-500', 
    accent: 'emerald', secondary: 'orange', btnGradient: 'from-orange-400 to-orange-500' 
  },
  blue: { 
    id: 'blue', name: 'Biru Langit', 
    bg: 'bg-blue-50', header: 'bg-blue-600', text: 'text-blue-800', textLight: 'text-blue-600', border: 'border-blue-500', 
    accent: 'blue', secondary: 'yellow', btnGradient: 'from-blue-500 to-indigo-600' 
  },
  violet: { 
    id: 'violet', name: 'Ungu Lailatul', 
    bg: 'bg-violet-50', header: 'bg-violet-600', text: 'text-violet-800', textLight: 'text-violet-600', border: 'border-violet-500', 
    accent: 'violet', secondary: 'amber', btnGradient: 'from-violet-500 to-fuchsia-600' 
  },
  rose: { 
    id: 'rose', name: 'Merah Ceria', 
    bg: 'bg-rose-50', header: 'bg-rose-600', text: 'text-rose-800', textLight: 'text-rose-600', border: 'border-rose-500', 
    accent: 'rose', secondary: 'teal', btnGradient: 'from-rose-500 to-pink-600' 
  },
  amber: { 
    id: 'amber', name: 'Emas Gurun', 
    bg: 'bg-amber-50', header: 'bg-amber-600', text: 'text-amber-900', textLight: 'text-amber-700', border: 'border-amber-500', 
    accent: 'amber', secondary: 'emerald', btnGradient: 'from-amber-500 to-orange-600' 
  }
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

export default function App() {
  const [activeDay, setActiveDay] = useState(1);
  const [userData, setUserData] = useState({});
  const [studentProfile, setStudentProfile] = useState({ 
    name: '', 
    class: '', 
    scriptUrl: '',
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

  const currentTheme = THEMES[studentProfile.theme] || THEMES.emerald;

  useEffect(() => {
    const savedData = localStorage.getItem('ramadanJournalData');
    const savedProfile = localStorage.getItem('ramadanProfile');
    
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      for (let i = 1; i <= 30; i++) {
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
          salatMalam: false, 
          kosakata: false, bantuIbu: false, hafalDoa: "", amalanLain: "", amalanLainCheck: false,
          validated: false 
        };
      }
      setUserData(initialData);
    }

    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      if (!profile.schoolName) profile.schoolName = 'Sekolah Dasar Islam Terpadu';
      if (!profile.theme) profile.theme = 'emerald';
      setStudentProfile(profile);
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { 
        alert("Ukuran foto terlalu besar! Maksimal 2MB ya.");
        return;
      }
      setSelectedImage(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64Image(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setBase64Image("");
  };

  // Helper untuk hitung skor harian
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

  // Hitung total skor (akumulasi) untuk tampilan header
  const calculateTotalScore = () => {
    let score = 0;
    Object.entries(userData).forEach(([dayKey, dayData]) => {
      score += calculateDailyScore(dayData, parseInt(dayKey));
    });
    return score;
  };

  const sendToGoogleSheet = async () => {
    if (!studentProfile.scriptUrl) {
      alert("⚠️ Link Laporan Guru belum diisi!\nMinta link tersebut ke gurumu, lalu masukkan di menu Pengaturan.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    const currentDayData = userData[activeDay];
    
    let catatanLengkap = [];
    if (currentDayData.salatMalam) catatanLengkap.push("✅ Salat Malam (Qiyam)");
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
      // Mengirimkan poin harian, bukan akumulasi
      poin: calculateDailyScore(currentDayData, activeDay), 
      puasa: currentDayData.puasa,
      tarawih: currentDayData.tarawih, 
      kebaikan: catatanLengkap.join(", "),
      foto: base64Image,
      namaFoto: selectedImage
    };

    try {
      await fetch(studentProfile.scriptUrl, {
        method: 'POST',
        mode: 'no-cors', 
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload)
      });

      setSubmitStatus('success');
      triggerConfetti();
      alert(`✅ Laporan Hari ke-${activeDay} berhasil dikirim!`);
      removeImage();
      
    } catch (error) {
      console.error(error);
      setSubmitStatus('error');
      alert("❌ Gagal mengirim data. Periksa koneksi internet.");
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

  // --- HALAMAN SAMPUL ---
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
          <div className="absolute inset-0 bg-black/50 z-40 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-slate-700">Pengaturan</h3>
                <button onClick={() => setShowSettings(false)}><X size={24} className="text-slate-400" /></button>
              </div>
              
              <div className="mb-4">
                <label className="text-xs font-bold text-slate-500 mb-1 block">Nama Sekolah</label>
                <input 
                  type="text"
                  className={`w-full p-3 border rounded-xl text-sm ${currentTheme.text} bg-slate-50 focus:ring-2 focus:ring-${currentTheme.accent}-500 outline-none`}
                  placeholder="Contoh: SD IT Al-Hikmah"
                  value={studentProfile.schoolName}
                  onChange={(e) => setStudentProfile(prev => ({...prev, schoolName: e.target.value}))}
                />
              </div>

              <div className="mb-4">
                 <label className="text-xs font-bold text-slate-500 mb-2 block flex items-center gap-1"><Palette size={12}/> Pilih Tema Warna</label>
                 <div className="flex gap-2 justify-center flex-wrap">
                    {Object.values(THEMES).map((t) => (
                       <button 
                         key={t.id}
                         onClick={() => setStudentProfile(prev => ({...prev, theme: t.id}))}
                         className={`w-10 h-10 rounded-full border-2 ${t.header} ${studentProfile.theme === t.id ? 'ring-4 ring-offset-2 ring-slate-300 border-white' : 'border-transparent opacity-70'}`}
                         title={t.name}
                       />
                    ))}
                 </div>
                 <p className="text-center text-[10px] text-slate-400 mt-1">{THEMES[studentProfile.theme]?.name}</p>
              </div>

              <div className="mb-4">
                <label className="text-xs font-bold text-slate-500 mb-1 block">Link Script Guru</label>
                <textarea 
                  className={`w-full p-3 border rounded-xl text-[10px] font-mono text-slate-600 bg-slate-50 focus:ring-2 focus:ring-${currentTheme.accent}-500 outline-none`}
                  rows="2"
                  placeholder="https://script.google.com/..."
                  value={studentProfile.scriptUrl}
                  onChange={(e) => setStudentProfile(prev => ({...prev, scriptUrl: e.target.value}))}
                />
              </div>

              <div className="mb-4">
                <label className="text-xs font-bold text-slate-500 mb-1 block">Tanggal 1 Ramadan</label>
                <div className="flex items-center gap-2 border rounded-xl p-3 bg-slate-50">
                   <Calendar size={18} className={`${currentTheme.textLight}`} />
                   <input 
                    type="date"
                    className="bg-transparent w-full text-sm outline-none text-slate-700"
                    value={studentProfile.startDateRamadan}
                    onChange={(e) => setStudentProfile(prev => ({...prev, startDateRamadan: e.target.value}))}
                   />
                </div>
              </div>

              <button 
                onClick={() => setShowSettings(false)}
                className={`w-full mt-2 ${currentTheme.header} text-white py-2 rounded-xl font-bold`}
              >
                Simpan
              </button>
            </div>
          </div>
        )}

        <div className={`bg-white max-w-sm w-full rounded-3xl shadow-2xl overflow-hidden border-4 ${currentTheme.border} relative pb-8`}>
          <div className={`absolute top-0 left-0 w-full h-48 ${currentTheme.header} rounded-b-[40%] z-0 transition-colors duration-500`}></div>
          
          <div className="relative z-10 p-6 flex flex-col items-center text-center mt-4">
            <div className={`bg-white p-3 rounded-full shadow-xl mb-6 w-32 h-32 flex items-center justify-center border-4 border-${currentTheme.secondary}-400 overflow-hidden transform hover:scale-105 transition-transform duration-300`}>
               <img 
                 src="logo.png" 
                 alt="Logo Sekolah" 
                 className="w-full h-full object-contain"
                 onError={(e) => {
                   e.target.onerror = null; 
                   e.target.style.display = 'none'; 
                   e.target.parentNode.innerHTML = `<svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="${currentTheme.text}"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>`; 
                 }}
               />
            </div>
            
            <h1 className={`text-3xl font-bold ${currentTheme.text} font-serif leading-tight drop-shadow-sm mb-2`}>Buku Amaliah<br/>Ramadan Online</h1>
            <div className={`w-20 h-1.5 bg-${currentTheme.secondary}-400 rounded-full mb-3`}></div>
            <h2 className="text-sm font-semibold text-white/90 bg-black/20 px-4 py-1.5 rounded-full mb-8 shadow-sm">1446 H / 2026 M</h2>

            <div className="w-full space-y-4 mb-8">
              <div className="text-left group">
                <label className="text-[11px] font-bold text-slate-400 uppercase ml-2 mb-1 block tracking-wider">Nama Lengkap</label>
                <div className="relative">
                  <User size={18} className={`absolute left-3 top-3.5 ${currentTheme.textLight}`} />
                  <input 
                    type="text" 
                    className={`w-full pl-10 pr-4 py-3 border-2 border-slate-100 rounded-2xl focus:border-${currentTheme.accent}-500 outline-none bg-slate-50 font-bold text-slate-700 transition-all text-sm shadow-sm focus:shadow-md`}
                    placeholder="Nama Siswa"
                    value={studentProfile.name}
                    onChange={(e) => setStudentProfile(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
              </div>
              <div className="text-left">
                <label className="text-[11px] font-bold text-slate-400 uppercase ml-2 mb-1 block tracking-wider">Kelas</label>
                 <div className="relative">
                  <Book size={18} className={`absolute left-3 top-3.5 ${currentTheme.textLight}`} />
                  <input 
                    type="text" 
                    className={`w-full pl-10 pr-4 py-3 border-2 border-slate-100 rounded-2xl focus:border-${currentTheme.accent}-500 outline-none bg-slate-50 font-bold text-slate-700 transition-all text-sm shadow-sm focus:shadow-md`}
                    placeholder="Contoh: 4 SD"
                    value={studentProfile.class}
                    onChange={(e) => setStudentProfile(prev => ({ ...prev, class: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            <button 
              onClick={startBook}
              className={`w-full bg-gradient-to-r ${currentTheme.btnGradient} text-white font-bold py-4 rounded-2xl shadow-lg transform transition active:scale-95 flex items-center justify-center gap-2 text-lg`}
            >
              Mulai Ibadah <ArrowRight size={20} />
            </button>
            
            <p className="mt-6 text-[10px] text-slate-400 font-medium px-4">© {studentProfile.schoolName}</p>
          </div>
        </div>
      </div>
    );
  }

  // --- HALAMAN JURNAL UTAMA ---
  return (
    <div className={`min-h-screen ${currentTheme.bg} font-sans text-slate-800 pb-24 transition-colors duration-500`}>
      {/* Header */}
      <div className={`${currentTheme.header} text-white p-5 pb-10 rounded-b-[2.5rem] shadow-xl relative overflow-hidden transition-colors duration-500`}>
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Moon size={100} />
        </div>
        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-white/80 text-xs mb-1">Assalamualaikum,</p>
            <h1 className="font-bold text-xl">{studentProfile.name || 'Siswa'}</h1>
            <p className="text-white/80 text-xs bg-black/20 inline-block px-2 py-0.5 rounded-lg mt-1">{studentProfile.class}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl flex flex-col items-center">
             <span className="text-[10px] text-white/90 uppercase font-bold tracking-wider">Total Poin</span>
             <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-300 fill-yellow-300" />
                <span className="font-bold text-2xl">{totalScore}</span>
             </div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-6 max-w-md mx-auto relative z-10">
        {view !== 'cover' && (
           <div className="bg-white p-1.5 rounded-xl shadow-lg shadow-slate-200/50 flex mb-5 text-xs font-bold text-center border border-slate-100">
             <button onClick={() => setView('journal')} className={`flex-1 py-2.5 rounded-lg transition-all ${view === 'journal' ? `${currentTheme.bg} ${currentTheme.textLight} shadow-sm border border-${currentTheme.accent}-200` : 'text-slate-400 hover:bg-slate-50'}`}>Jurnal</button>
             <button onClick={() => setView('doa')} className={`flex-1 py-2.5 rounded-lg transition-all ${view === 'doa' ? `${currentTheme.bg} ${currentTheme.textLight} shadow-sm border border-${currentTheme.accent}-200` : 'text-slate-400 hover:bg-slate-50'}`}>Doa</button>
             <button onClick={() => setView('achievements')} className={`flex-1 py-2.5 rounded-lg transition-all ${view === 'achievements' ? `${currentTheme.bg} ${currentTheme.textLight} shadow-sm border border-${currentTheme.accent}-200` : 'text-slate-400 hover:bg-slate-50'}`}>Lapor</button>
           </div>
        )}

        {/* --- VIEW: JURNAL --- */}
        {view === 'journal' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Navigasi Hari */}
            <div className="flex items-center justify-between bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
                <button onClick={() => setActiveDay(d => Math.max(1, d - 1))} disabled={activeDay === 1} className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl text-slate-600 disabled:opacity-30 hover:bg-slate-100"><ChevronLeft size={20} /></button>
                <div className="text-center">
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                     Ramadan {isLast10Days && <span className="text-[10px] bg-indigo-100 text-indigo-600 px-1.5 rounded">10 Akhir</span>}
                  </div>
                  <div className="font-bold text-slate-800 text-lg">Hari ke-{activeDay}</div>
                  <div className={`text-[10px] ${currentTheme.textLight} font-medium`}>{currentDateGregorian}</div>
                </div>
                <button onClick={() => setActiveDay(d => Math.min(30, d + 1))} disabled={activeDay === 30} className="w-10 h-10 flex items-center justify-center bg-slate-50 rounded-xl text-slate-600 disabled:opacity-30 hover:bg-slate-100"><ChevronRight size={20} /></button>
            </div>

            {currentData.validated && (
              <div className={`${currentTheme.bg} ${currentTheme.text} p-3 rounded-xl flex items-center justify-center gap-2 text-xs font-bold border ${currentTheme.border} shadow-sm`}>
                <CheckCircle size={16} /> DATA TERKUNCI (Sudah Divalidasi)
              </div>
            )}

            {/* Ibadah Wajib Section */}
            <div className="space-y-3">
               {/* Puasa */}
              <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1.5 h-full transition-colors ${currentData.puasa ? `bg-${currentTheme.secondary}-500` : 'bg-slate-200'}`}></div>
                <div className="flex justify-between items-center pl-3">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl transition-colors ${currentData.puasa ? `bg-${currentTheme.secondary}-100 text-${currentTheme.secondary}-600` : 'bg-slate-100 text-slate-400'}`}>
                      <Sun size={24} className={currentData.puasa ? `fill-${currentTheme.secondary}-600` : ""} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-700">Puasa</h3>
                      <p className="text-xs text-slate-400">Poin: 20</p>
                    </div>
                  </div>
                  <div 
                      onClick={() => !currentData.validated && toggleCheck(activeDay, 'puasa')}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${currentData.puasa ? `bg-${currentTheme.secondary}-500 border-${currentTheme.secondary}-500 scale-110` : `border-slate-300 bg-white hover:border-${currentTheme.secondary}-300`}`}
                  >
                      {currentData.puasa && <CheckCircle size={18} className="text-white" />}
                  </div>
                </div>
              </div>

               {/* Shalat Wajib Toggle */}
               <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
                  <h3 className="font-bold text-sm text-slate-700 mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div> Shalat Wajib
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['Subuh', 'Zuhur', 'Ashar', 'Maghrib', 'Isya'].map(s => (
                       <button
                         key={s}
                         onClick={() => !currentData.validated && toggleCheck(activeDay, s.toLowerCase())}
                         className={`flex-1 py-2 px-1 rounded-xl text-xs font-bold border transition-all ${
                            currentData[s.toLowerCase()] 
                            ? 'bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-200' 
                            : 'bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-100'
                         }`}
                       >
                         {s}
                       </button>
                    ))}
                  </div>
               </div>

               {/* Amalan Penting: Salat Malam (Tahajud) */}
               <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-4 rounded-3xl shadow-lg border border-indigo-900 relative overflow-hidden text-white">
                  {/* Efek Bintang */}
                  <div className="absolute top-2 right-4 opacity-30"><Star size={10} className="fill-white" /></div>
                  <div className="absolute bottom-4 left-4 opacity-20"><Star size={14} className="fill-white" /></div>
                  
                  <div className="flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                         <Moon size={24} className="text-yellow-200 fill-yellow-200" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white flex items-center gap-2">
                           Salat Malam
                           {isLast10Days && <span className="bg-yellow-400 text-yellow-900 text-[10px] px-2 py-0.5 rounded-full animate-pulse">20 Poin!</span>}
                        </h3>
                        <p className="text-xs text-indigo-200">Bangun Malam</p>
                      </div>
                    </div>
                    <div 
                        onClick={() => !currentData.validated && toggleCheck(activeDay, 'salatMalam')}
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all ${currentData.salatMalam ? 'bg-yellow-400 border-yellow-400 text-yellow-900 scale-110 shadow-[0_0_15px_rgba(250,204,21,0.5)]' : 'border-indigo-400/50 bg-white/5 hover:bg-white/10'}`}
                    >
                        {currentData.salatMalam && <CheckCircle size={20} />}
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/10 text-[10px] text-indigo-300 text-center">
                     {isLast10Days ? "Kejar Lailatul Qadar! (Poin x2)" : "Biasakan bangun malam yuk! (10 Poin)"}
                  </div>
               </div>

               {/* Amalan Sunnah (Tarawih/Witir/Tadarus) */}
               <div className="grid grid-cols-3 gap-2">
                 {[
                   { id: 'tarawih', label: 'Tarawih', icon: <Moon size={18} /> },
                   { id: 'witir', label: 'Witir', icon: <Sparkles size={18} /> },
                   { id: 'tadarus', label: 'Tadarus', icon: <BookOpen size={18} /> }
                 ].map(ibadah => (
                    <div 
                       key={ibadah.id} 
                       onClick={() => !currentData.validated && toggleCheck(activeDay, ibadah.id)} 
                       className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all cursor-pointer text-center ${
                         currentData[ibadah.id] 
                         ? `bg-${currentTheme.accent}-50 border-${currentTheme.accent}-500` 
                         : 'bg-white border-slate-100 hover:border-slate-200'
                       }`}
                    >
                      <div className={`mb-1 ${currentData[ibadah.id] ? currentTheme.textLight : 'text-slate-300'}`}>
                         {ibadah.icon}
                      </div>
                      <span className={`font-bold text-[10px] ${currentData[ibadah.id] ? currentTheme.text : 'text-slate-500'}`}>{ibadah.label}</span>
                    </div>
                 ))}
               </div>
            </div>

            {/* --- SEKSI: KEGIATAN POSITIF --- */}
            <div className={`bg-gradient-to-br from-white to-${currentTheme.accent}-50 p-5 rounded-3xl shadow-sm border border-${currentTheme.accent}-100`}>
               <h3 className={`font-bold text-sm ${currentTheme.textLight} mb-4 flex items-center gap-2`}>
                 <Heart size={16} className={`fill-${currentTheme.accent}-500 text-${currentTheme.accent}-500`} /> Kegiatan Positif
               </h3>

               <div className="space-y-3">
                  {/* 1. Kosakata */}
                  <div 
                    onClick={() => !currentData.validated && toggleCheck(activeDay, 'kosakata')}
                    className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${currentData.kosakata ? `${currentTheme.bg} border-${currentTheme.accent}-300` : 'bg-white border-slate-100 hover:border-slate-200'}`}
                  >
                    <div className="flex items-center gap-3">
                       <MessageCircle size={18} className={`text-${currentTheme.accent}-500`} />
                       <span className="text-xs font-bold text-slate-600">Menghafal Kosakata Arab</span>
                    </div>
                    {currentData.kosakata ? <div className={`text-[10px] font-bold ${currentTheme.header} text-white px-2 py-0.5 rounded-full`}>+5 Poin</div> : <div className="w-4 h-4 rounded border border-slate-300"></div>}
                  </div>

                  {/* 2. Bantu Ibu */}
                  <div 
                    onClick={() => !currentData.validated && toggleCheck(activeDay, 'bantuIbu')}
                    className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${currentData.bantuIbu ? `${currentTheme.bg} border-${currentTheme.accent}-300` : 'bg-white border-slate-100 hover:border-slate-200'}`}
                  >
                    <div className="flex items-center gap-3">
                       <User size={18} className={`text-${currentTheme.accent}-500`} />
                       <span className="text-xs font-bold text-slate-600">Membantu Ibu/Ayah</span>
                    </div>
                    {currentData.bantuIbu ? <div className={`text-[10px] font-bold ${currentTheme.header} text-white px-2 py-0.5 rounded-full`}>+5 Poin</div> : <div className="w-4 h-4 rounded border border-slate-300"></div>}
                  </div>

                  {/* 3. Hafal Doa (Dropdown) */}
                  <div className="p-3 bg-white rounded-2xl border border-slate-100">
                     <div className="flex items-center gap-2 mb-2">
                        <List size={18} className={`text-${currentTheme.accent}-500`} />
                        <span className="text-xs font-bold text-slate-600">Menghafal Doa</span>
                        {currentData.hafalDoa && <span className={`text-[10px] ${currentTheme.header} text-white px-2 rounded-full ml-auto`}>+10 Poin</span>}
                     </div>
                     <select 
                        className={`w-full text-xs p-2 bg-slate-50 rounded-lg border-none focus:ring-2 focus:ring-${currentTheme.accent}-300 outline-none text-slate-700`}
                        value={currentData.hafalDoa || ""}
                        onChange={(e) => updateField(activeDay, 'hafalDoa', e.target.value)}
                        disabled={currentData.validated}
                     >
                        <option value="">-- Pilih Doa yang Dihafal --</option>
                        {DAFTAR_DOA.map((d, i) => (
                           <option key={i} value={d.judul}>{d.judul}</option>
                        ))}
                     </select>
                  </div>

                  {/* 4. Amalan Lain (Custom Text + Checkbox) */}
                  <div className="p-3 bg-white rounded-2xl border border-slate-100">
                     <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-slate-600">Amalan Baik Lainnya</span>
                        <div className="flex items-center gap-2">
                           {currentData.amalanLainCheck && currentData.amalanLain && <span className={`text-[10px] ${currentTheme.header} text-white px-2 rounded-full`}>+5 Poin</span>}
                           <label className="flex items-center gap-1 cursor-pointer">
                              <input 
                                type="checkbox" 
                                className={`w-4 h-4 accent-${currentTheme.accent}-500 rounded`}
                                checked={currentData.amalanLainCheck || false}
                                onChange={() => toggleCheck(activeDay, 'amalanLainCheck')}
                                disabled={currentData.validated}
                              />
                              <span className="text-[10px] text-slate-400">Selesai</span>
                           </label>
                        </div>
                     </div>
                     <input 
                        type="text"
                        className={`w-full text-xs p-2 bg-slate-50 rounded-lg border border-slate-200 focus:border-${currentTheme.accent}-300 outline-none placeholder-slate-300`}
                        placeholder="Contoh: Bersihin kamar, Sedekah..."
                        value={currentData.amalanLain || ""}
                        onChange={(e) => updateField(activeDay, 'amalanLain', e.target.value)}
                        disabled={currentData.validated}
                     />
                  </div>
               </div>
            </div>

            {/* Validasi Ortu */}
            <div className={`bg-yellow-50 p-5 rounded-3xl border-2 border-yellow-200 text-center mb-8`}>
              <div className="flex justify-center mb-2 text-yellow-600">
                <PenTool size={24} />
              </div>
              <p className="text-xs text-yellow-800 mb-3 font-medium">Validasi Orang Tua</p>
              <button 
                onClick={() => toggleValidation(activeDay)} 
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${
                  currentData.validated 
                    ? `${currentTheme.header} text-white shadow-lg` 
                    : 'bg-white text-yellow-700 border border-yellow-400 hover:bg-yellow-100'
                }`}
              >
                {currentData.validated ? '✅ Validasi Selesai' : 'Tanda Tangan Ayah/Bunda'}
              </button>
            </div>
          </div>
        )}

        {/* --- VIEW: LAPOR --- */}
        {view === 'achievements' && (
           <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
             <div className="bg-white p-6 rounded-3xl shadow-sm text-center border border-slate-100">
                <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
                   <Award size={48} className="text-blue-500" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Lapor ke Guru</h2>
                <p className="text-xs text-slate-500 mb-6">Kirim laporan poin & foto kegiatan hari ini.</p>
                
                {/* UPLOAD FOTO */}
                <div className="mb-6 text-left">
                  <label className="text-xs font-bold text-slate-400 uppercase ml-1 mb-2 block">Upload Foto (Opsional)</label>
                  {!selectedImage ? (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:bg-slate-50 hover:border-blue-400 transition-all">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Camera size={24} className="text-slate-400 mb-2" />
                        <p className="text-xs text-slate-500">Klik untuk ambil foto</p>
                      </div>
                      <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                  ) : (
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-slate-200">
                      <img src={base64Image} alt="Preview" className="w-full h-full object-cover" />
                      <button 
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
                      >
                        <X size={16} />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] p-2 text-center truncate">
                        {selectedImage}
                      </div>
                    </div>
                  )}
                </div>

                <button 
                  onClick={sendToGoogleSheet}
                  disabled={isSubmitting}
                  className={`w-full text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 mb-3 transform transition active:scale-95 ${isSubmitting ? 'bg-slate-400' : 'bg-gradient-to-r from-blue-500 to-blue-600'}`}
                >
                  {isSubmitting ? 'Mengirim...' : <><CloudUpload size={20} /> Kirim Laporan</>}
                </button>

                {submitStatus === 'success' && <div className={`${currentTheme.bg} ${currentTheme.textLight} p-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2`}><CheckCircle size={14}/> Laporan Terkirim!</div>}
                {submitStatus === 'error' && <div className="bg-red-100 text-red-700 p-3 rounded-xl text-xs font-bold">❌ Gagal kirim. Cek link pengaturan.</div>}
             </div>
             
             <button onClick={() => setView('cover')} className="w-full py-3 text-slate-400 text-xs font-medium hover:text-slate-600">
               Kembali ke Sampul
             </button>
           </div>
        )}
        
        {/* --- VIEW: DOA (OTOMATIS DARI DATA) --- */}
        {view === 'doa' && (
           <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 pb-8">
             <div className="bg-white p-6 rounded-3xl shadow-sm text-center border border-slate-100 mb-4">
               <h2 className="text-xl font-bold text-slate-800 mb-1">Kumpulan Doa</h2>
               <p className="text-xs text-slate-500">Hisnul Muslim & Doa Harian</p>
             </div>

             {DAFTAR_DOA.map((doa, index) => (
                <div key={index} className="bg-white p-6 rounded-3xl shadow-sm text-center border border-slate-100 relative">
                  <h3 className="font-bold text-slate-700 mb-4 text-center">
                    {doa.judul}
                  </h3>
                  <div className={`p-6 rounded-2xl mb-4 border ${index % 2 === 0 ? `${currentTheme.bg} border-${currentTheme.accent}-100` : 'bg-orange-50 border-orange-100'}`}>
                      <p className={`font-bold text-xl mb-3 font-serif leading-loose ${index % 2 === 0 ? currentTheme.text : 'text-orange-800'}`}>{doa.arab}</p>
                      <p className="text-xs text-slate-500 italic mb-2 font-medium">"{doa.latin}"</p>
                      <p className="text-xs text-slate-600 border-t pt-2 mt-2">{doa.arti}</p>
                  </div>
                </div>
             ))}
           </div>
        )}
      </div>

      {showConfetti && <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50"><div className="text-6xl animate-bounce">🎉 ✨ ⭐</div></div>}
    </div>
  );
}