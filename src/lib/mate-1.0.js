import { shuffle } from 'lib/utils'

const MATE_1_0 = {
  info: {
    version: "1.0",
    slug: "mate-1.0",
    type: "mate",
    name: "MATE",
    title: "MATE Default Title",
    description: "Lorem ipsum dolor AIME.",
    items: 45,
    maxTime: 8100000, // 45 * 3 * 60 * 1000
  },
  conditions: {
    1: [1, 2, 3],
    2: [4, 5],
    3: [6],
    4: [7],
    5: [8],
    6: [9, 10],
    7: [11, 12, 13],
    8: [14, 15],
    9: [16],
   10: [17, 18, 19],
   11: [20],
   12: [21, 22],
   13: [23, 24],
   14: [25, 26 ],
   15: [27],
   16: [28],
   17: [29, 30],
   18: [31],
   19: [32, 33, 34],
   20: [35, 36],
   21: [37, 38, 39],
   22: [40],
   23: [41],
   24: [42],
   25: [43],
   26: [44, 45],
  },
  seeds: {
    1: [1, 2, 3],
    2: [4, 5],
    3: [6],
    4: [7],
    5: [8],
    6: [9, 10],
    7: [11, 12, 13],
    8: [14, 15],
    9: [16],
   10: [17, 18, 19],
   11: [20],
   12: [21, 22],
   13: [23, 24],
   14: [25, 26 ],
   15: [27],
   16: [28],
   17: [29, 30],
   18: [31],
   19: [32, 33, 34],
   20: [35, 36],
   21: [37, 38, 39],
   22: [40],
   23: [41],
   24: [42],
   25: [43],
   26: [44, 45],
  },
  items: {
    1: {
      condition: 1,
      teaser: "Berdasarkan informasi di atas, sepatu merek apa yang dianggap paling mampu memenuhi keinginan pasar sepatu sport untuk anak muda?",
      options: [
        { label: "A", text: "Niko" },
        { label: "B", text: "Tiger" },
        { label: "C", text: "Elang" },
        { label: "D", text: "Advantage" },
        { label: "E", text: "Newlife" },
      ]
    },
    2: {
      condition: 1,
      teaser: "Sepatu merek apa yang dianggap paling mampu memenuhi keinginan pasar sepatu sport untuk anak muda dalam hal harga, tanpa mempedulikan masalah keawetan?",
      options: [
        { label: "A", text: "Advantage" },
        { label: "B", text: "Niko" },
        { label: "C", text: "Tiger" },
        { label: "D", text: "Elang" },
        { label: "E", text: "Newlife" },
      ]
    },
    3: {
      condition: 1,
      teaser: "Sepatu merek apa yang akan Anda pilih bila Anda akan meraih pasar untuk golongan menengah yang mengutamakan penampilan?",
      options: [
        { label: "A", text: "Niko" },
        { label: "B", text: "Tiger" },
        { label: "C", text: "Elang" },
        { label: "D", text: "Advantage" },
        { label: "E", text: "Newlife" },
      ]
    },
    4: {
      condition: 2,
      teaser: "Dari pernyataan berikut ini, mana yang tidak akan menghasilkan keputusan 'ya' untuk tender sebuah proyek senilai Rp 125.000.000,- ?",
      options: [
        { label: "A", text: "Manajer Pembelian, Kepala Divisi Terkait, Kepala Divisi Pengadaan, Direktur Operasional dan Direktur Utama menyetujui." },
        { label: "B", text: "Kepala Divisi Pengadaan dan Direktur Operasional menyetujui, tetapi Direktur Utama tidak setuju" },
        { label: "C", text: "Kepala Divisi Pengadaan dan Direktur Operasional menyetujui, demikian juga Direktur Utama" },
        { label: "D", text: "Kepala Divisi Pengadaan tidak menyetujui, namun Direktur Operasional dan Direktur Utama menyetujui" },
        { label: "E", text: "Direktur Utama dan Kepala Divisi Pengadaan keduanya menyetujui" },
      ]
    },
    5: {
      condition: 2,
      teaser: "Untuk tender dengan nilai di atas Rp 500.000.000,- tim yang paling tepat untuk memberikan persetujuan tender tersebut adalah:",
      options: [
        { label: "A", text: "Hanya Direktur Utama" },
        { label: "B", text: "Dir Utama dan Dir. Keuangan" },
        { label: "C", text: "Dir Utama dan Dir. Operasional atau Dir Keuangan" },
        { label: "D", text: "Dir Utama, Dir. Operasional dan Dir Keuangan" },
        { label: "E", text: "Dir Utama, Dir. Operasional dan Kadiv Pengadaan" },
      ]
    },
    6: {
      condition: 3,
      teaser: "Perusahaan mana yang mempunyai keuntungan kumulatif tertinggi untuk kuartal 3 dan 4?",
      options: [
        { label: "A", text: "JKL" },
        { label: "B", text: "MNO" },
        { label: "C", text: "ABC" },
        { label: "D", text: "DEF" },
        { label: "E", text: "GHI" },
      ]
    },
    7: {
      condition: 4,
      teaser: "Pernyataan mana di bawah ini yang paling akurat sehubungan dengan informasi yang Anda miliki?",
        options: [
        { label: "A", text: "Komentar pribadi jelas berpengaruh dalam proses promosi" },
        { label: "B", text: "Masa kerja di posisi saat ini dapat menutupi kinerja yang kurang sempurna" },
        { label: "C", text: "Karyawan lebih tua selalu dipromosikan sebelum karyawan lebih muda" },
        { label: "D", text: "Jarwo dipromosikan menggunakan tolok ukur yang subjektif" },
        { label: "E", text: "Gunawan dan Elizabeth akan dipromosikan pada proses promosi berikutnya" },
      ]
    },
    8: {
      condition: 5,
      teaser: "Berdasarkan hasil evaluasi di atas, karyawan mana yang akan Anda pilih untuk menyelesaikan sebuah proyek dengan deadline yang ketat dan melibatkan analisis data yang mendalam? Selain itu, hasil proyek tersebut harus dipresentasikan secara lisan pada pertemuan departemen dalam bahasa yang mudah dipahami.",
        options: [
        { label: "A", text: "Perusahaan harus menambah 15 karyawan baru, biaya training akan meningkat, dan ruang kantor diperluas" },
        { label: "B", text: "Jalur produksi A harus menambah lima karyawan baru dan biaya training akan menurun." },
        { label: "C", text: "Jalur produksi B harus menambah lima karyawan baru dan produktivitas akan menurun" },
        { label: "D", text: "Produktivitas dan biaya training akan meningkat" },
        { label: "E", text: "Ruang kantor mungkin harus diperluas dan produktivitas akan menurun" },
      ]
    },
    9: {
      condition: 6,
      teaser: "Berdasarkan hasil evaluasi di atas, siapa yang akan yang anda pilih untuk memimpin proyek dengan anggota tim yang banyak dan beragam serta jangka waktu yang lama?",
        options: [
        { label: "A", text: "Amir" },
        { label: "B", text: "Berta" },
        { label: "C", text: "Carlo" },
        { label: "D", text: "Denny" },
        { label: "E", text: "Erni" },
      ]
    },
    10: {
      condition: 6,
      teaser: "Jika berwisata ke Taman Bunga Indonusa adalah insentif yang nilainya terendah, kepada siapa saja insentif tersebut akan Anda berikan?",
      options: [
        { label: "A", text: "Amir" },
        { label: "B", text: "Berta" },
        { label: "C", text: "Carlo" },
        { label: "D", text: "Denny" },
        { label: "E", text: "Erni" },
      ]
    },
    11: {
      condition: 7,
      teaser: "Jika tiga peringkat teratas paket ke luar negeri adalah ke Amerika Serikat (sudah diberikan ke Muladi), ke Perancis (sudah diberikan ke Petra), dan ke Inggris; siapakah yang berhak menerima paket ke Inggris?",
      options: [
        { label: "A", text: "Kelly, Sunarto, Chris, Truno" },
        { label: "B", text: "Kelly, Sunarto, Sandra, Chris" },
        { label: "C", text: "Tina, Sunarto, Kelly, Sandra" },
        { label: "D", text: "Muladi, Sunarto, Kelly, Truno" },
        { label: "E", text: "Kelly, Sandra, Sunarto, Truno" },
      ]
    },
    12: {
      condition: 7,
      teaser: "Jika tiga paket ke luar kota peringkatnya adalah: ke Bali dan Lombok selama 2 minggu, kemudian ke Bali 1 minggu dan ke Bali 3 hari, siapa saja yang berhak menerima paket tersebut sesuai dengan urutan peringkatnya? (urutan nama menunjukkan peringkat)",
        options: [
        { label: "A", text: "Sambas" },
        { label: "B", text: "Tina" },
        { label: "C", text: "Lisa" },
        { label: "D", text: "Sandra" },
        { label: "E", text: "Chris" },
      ]
    },
    13: {
      condition: 7,
      teaser: "Pada tahap mana saja Gilang akan bekerja?",
        options: [
        { label: "A", text: "Sambas, Sandra, Tina" },
        { label: "B", text: "Tina, Sandra, Sambas" },
        { label: "C", text: "Sambas, Tina, Sandra" },
        { label: "D", text: "Tina, Sambas, Sandra" },
        { label: "E", text: "Sandra, Sambas, Tina" },
      ]
    },
    14: {
      condition: 8,
      teaser: "Siapa sajakah anggota tim untuk tahap 1?",
        options: [
        { label: "A", text: "1 dan 4" },
        { label: "B", text: "3 dan 4" },
        { label: "C", text: "2 dan 3" },
        { label: "D", text: "2 dan 4" },
        { label: "E", text: "1 dan 3" },
      ]
    },
    15: {
      condition: 8,
      teaser: "Sebagai manajer, tindakan apa yang paling tepat Anda lakukan?",
      options: [
        { label: "A", text: "Parti dan Tari" },
        { label: "B", text: "Parti dan Heru" },
        { label: "C", text: "Tari dan Yudi" },
        { label: "D", text: "Heru dan Tari" },
        { label: "E", text: "Gilang dan Tari" },
      ]
    },
    16: {
      condition: 9,
      teaser: "Karyawan mana yang kemungkinan besar dapat Anda andalkan untuk dapat tepat waktu pada meeting di pagi hari?",
      options: [
        { label: "A", text: "Menanyakan kepada customer itu apakah ia ingin memilih seorang salesman baru atau apakah ia akan lebih suka jika Anda sendiri yang bertindak menjadi salesman" },
        { label: "B", text: "Memberitahukan kepada customer itu bahwa kalau bukan salesman itu, Anda sendiri yang akan menghubunginya hari ini juga untuk memberi informasi yang diminta." },
        { label: "C", text: "Memberitahu customer itu bahwa Anda akan meninggalkan pesan untuk salesman tersebut agar segera menghubunginya" },
        { label: "D", text: "Setuju untuk membantu customer itu dan menjanjikan jawaban dari salesman tersebut pada hari ini sebelum jam 17.00." },
        { label: "E", text: "Menjelaskan kepada customer bahwa bukanlah tanggungjawab Anda untuk menangani keluhan dan menyarankan agar dia menghubungi customer service." },
      ]
    },
    17: {
      condition: 10,
      teaser: "Dengan menggunakan informasi kebijakan dan catatan kehadiran Yudi, situasi mana di bawah ini akan/dapat berkonflik dengan kebijakan cuti?",
        options: [
        { label: "A", text: "Yuli, Yudi dan Melisa" },
        { label: "B", text: "Yuli" },
        { label: "C", text: "Melisa" },
        { label: "D", text: "Yudi" },
        { label: "E", text: "Tidak dapat ditentukan" },
      ]
    },
    18: {
      condition: 10,
      teaser: "Karyawan mana yang kebiasaan cutinya paling mengkhawatirkan?",
        options: [
        { label: "A", text: "Cuti kematian di bulan Februari" },
        { label: "B", text: "Hari-hari sakit di bulan Januari" },
        { label: "C", text: "19 April hari ijin pribadi" },
        { label: "D", text: "16 Maret hari sakit" },
        { label: "E", text: "Dimintakan pada hari Selasa untuk mengambil cuti pada hari Rabu minggu berikutnya sebagai hari ijin pribadi untuk mempersiapkan pesta ulang tahun anaknya" },
      ]
    },
    19: {
      condition: 10,
      teaser: "Arti lain dari pernyataan Fred dalam percakapan di atas adalah:",
        options: [
        { label: "A", text: "Melisa" },
        { label: "B", text: "Yudi" },
        { label: "C", text: "Yuli" },
        { label: "D", text: "Melisa dan Yudi" },
        { label: "E", text: "Yuli dan Melisa" },
      ]
    },
    20: {
      condition: 11,
      teaser: "Berdasarkan tabel rencana pemesanan di atas, Anda mengidentifikasi sebuah pemesanan material yang akan menimbulkan problem produksi. Material apakah yang dimaksud?",
      options: [
        { label: "A", text: "Fred ingin menunjukkan bahwa Pak Yunus omong kosong atau mengada-ada." },
        { label: "B", text: "Fred berpikir bahwa keuntungan jangka pendek selaras dengan keuntungan jangka panjang" },
        { label: "C", text: "Fred fokus pada biaya produksi yang dibandingkan dengan harga jual." },
        { label: "D", text: "Fred mengingatkan pada semua bahwa upaya kerja sama antar departemen tidak berjalan sejak tahun lalu" },
        { label: "E", text: "Fred berpikir keuntungan perusahaan dan ekspansi itu saling bergantung satu sama lain" },
      ]
    },
    21: {
      condition: 12,
      teaser: "Berdasarkan data diatas Anda menyadari bahwa ada dokumen penagihan untuk salah satu item yang dipesan Karno akan dipertanyakan oleh bagian Keuangan. Item mana yang memiliki kemungkinan terbesar akan dipertanyakan?",
      options: [
        { label: "A", text: "Baja Gulung" },
        { label: "B", text: "Pipa Aluminium" },
        { label: "C", text: "Besi Cor" },
        { label: "D", text: "Baja Lembaran" },
        { label: "E", text: "Kawat Baja" },
      ]
    },
    22: {
      condition: 12,
      teaser: "Siapakah yang paling mungkin mengalami hal berikut ini: mampu bekerja dalam kelompok yang anggotanya berasal dari beragam fungsi, namun akan mengalami kesulitan ketika terlibat pada beberapa kegiatan secara bersamaan?",
        options: [
        { label: "A", text: "Pipa Baja" },
        { label: "B", text: "Kawat Baja" },
        { label: "C", text: "Baja Lembaran" },
        { label: "D", text: "Besi Cor" },
        { label: "E", text: "Baja Gulung" },
      ]
    },
    23: {
      condition: 13,
      teaser: "Siapakah yang Anda asumsikan akan paling jarang mengalami masalah dalam menjalankan pekerjaannya secara keseluruhan?",
        options: [
        { label: "A", text: "Ari" },
        { label: "B", text: "Bayu" },
        { label: "C", text: "Cahyo" },
        { label: "D", text: "Dina" },
        { label: "E", text: "Emil" },
      ]
    },
    24: {
      condition: 13,
      teaser: "Meskipun alokasi waktu Meri pada proyek C, Tomi pada proyek B, dan Sari pada proyek A sama-sama sebesar 10 jam/minggu, tetapi:",
        options: [
        { label: "A", text: "Ari" },
        { label: "B", text: "Bayu" },
        { label: "C", text: "Cahyo" },
        { label: "D", text: "Dina" },
        { label: "E", text: "Emil" },
      ]
    },
    25: {
      condition: 14,
      teaser: "Siapakah yang akan paling memberikan dampak terbesar terhadap seluruh proyek ketika dia tidak masuk?",
      options: [
        { label: "A", text: "Kontribusi Meri terhadap proyek C lebih tinggi dari kontribusi Tomi pada proyek B" },
        { label: "B", text: "Kontribusi Meri terhadap proyek C sama dengan kontribusi Sari pada proyek A" },
        { label: "C", text: "Kontribusi Tomi pada proyek A lebih tinggi dari kontribusi Sari pada Proyek B" },
        { label: "D", text: "Kontribusi Tomi pada proyek B sama dengan kontribusi Sari pada Proyek A" },
        { label: "E", text: "Kontribusi Tomi pada proyek B lebih tinggi dari kontribusi Sari pada Proyek A" },
      ]
    },
    26: {
      condition: 14,
      teaser: "Berdasarkan grafik dan tabel di atas, tentukan mana di antara pernyataan-pernyataan berikut yang salah.",
      options: [
        { label: "A", text: "Meri atau Tomi" },
        { label: "B", text: "Tomi atau Sari" },
        { label: "C", text: "Meri" },
        { label: "D", text: "Tomi" },
        { label: "E", text: "Sari" },
      ]
    },
    27: {
      condition: 15,
      teaser: "Asumsikan semua pernyataan di bawah benar, pernyataan mana yang paling jelas menunjukkan ketidak-cocokan rumus di atas untuk menghitung tingkat efisiensi?",
        options: [
        { label: "A", text: "Pada tahun 2009, angka indeks keuntungan divisi C lebih kecil dari pada divisi B" },
        { label: "B", text: "Pada tahun 2010, angka indeks keuntungan divisi A lebih besar daripada divisi B" },
        { label: "C", text: "Pada tahun 2011, nilai keuntungan divisi A adalah Rp 650.000.000,-" },
        { label: "D", text: "Pada tahun 2007, divisi B memiliki angka indeks keuntungan tertinggi" },
        { label: "E", text: "Pada tahun 2008, divisi A dan C sama-sama memberikan keuntungan" },
      ]
    },
    28: {
      condition: 16,
      teaser: "Mana pengaturan display/set berikut yang harus dihindari oleh salesman Anda?",
        options: [
        { label: "A", text: "Tak seorang pun di antara salesman itu mempunyai tingkat efisiensi yang dapat diterima" },
        { label: "B", text: "Tingkat efisiensi gabungan untuk Melani dan Amy lebih tinggi daripada Lerbin dan Yusti" },
        { label: "C", text: "Penjualan Amy merupakan 40% total penjualan." },
        { label: "D", text: "Yusti menggunakan kebanyakan waktu di luar kantor." },
        { label: "E", text: "Melani adalah salesman yang paling efisien di perusahaan." },
      ]
    },
    29: {
      condition: 17,
      teaser: "Jika komputer BIM tidak dijadikan satu dengan printer Conan, produk apa saja yang bisa digabung dengan komputer BIM?",
        options: [
        { label: "A", text: "Program SIMKEU, Notebook Anyer, dan Monitor GL" },
        { label: "B", text: "Notebook Anyer, Monitor GL, dan Printer Conan" },
        { label: "C", text: "Mouse Logik, Komputer BIM, dan Printer Conan" },
        { label: "D", text: "Mouse Logik, Komputer BIM, dan Printer Conan" },
        { label: "E", text: "Program SIMKEU, Komputer PC BIM, dan Monitor GL" },
      ]
    },
    30: {
      condition: 17,
      teaser: "Kedua perusahaan di atas menawarkan untuk memberikan pelayanan mesin fotokopi dengan kesepakatan service seperti di atas. Mesin fotokopi yang mereka tawarkan berasal dari merek dan tipe yang sama, namun pelayanannya yang berbeda. Jika Anda memilih perusahaan fotokopi BERSAUDARA, alasan apa yang mendasari keputusan tersebut?",
      options: [
        { label: "A", text: "Mouse Logik dan Monitor GL" },
        { label: "B", text: "Monitor GL dan Program SIMKEU" },
        { label: "C", text: "Program SIMKEU dan Notebook Anyer" },
        { label: "D", text: "Mouse Logic dan Notebook Anyer" },
        { label: "E", text: "Bukan semua jawaban di atas" },
      ]
    },
    31: {
      condition: 18,
      teaser: "Berdasarkan grafik di atas, cabang manakah yang bisa dianggap paling efisien?",
      options: [
        { label: "A", text: "Perusahaan BERSAUDARA tidak menarik biaya perjalanan untuk 5 kilometer pertama" },
        { label: "B", text: "Jenis mesin fotokopi lebih penting daripada biaya service" },
        { label: "C", text: "Anda merasa lebih cocok mempunyai kontrak dengan perusahaan yang sudah mapan" },
        { label: "D", text: "Biaya sifatnya kritikal dan perusahaan BERSAUDARA akan melayani pembelanjaan besar" },
        { label: "E", text: "Perusahaan Anda tidak berencana membeli sebuah mesin fotokopi sampai layanan ini tidak berjalan lancar; sehingga garansi penggantian spare-parts menjadi penting" },
      ]
    },
    32: {
      condition: 19,
      teaser: "Berdasarkan grafik di atas, cabang mana sajakah yang paling tepat guna untuk dijadikan obyek riset dan pengembangan strategi penjualan dan pemasaran?",
        options: [
        { label: "A", text: "Medan (MDN)" },
        { label: "B", text: "Surabaya (SBY)" },
        { label: "C", text: "Surakarta (SKA)" },
        { label: "D", text: "Denpasar (DPS)" },
        { label: "E", text: "Yogyakarta (YGY)" },
      ]
    },
    33: {
      condition: 19,
      teaser: "Berdasarkan grafik di atas, cabang manakah yang memberi keuntungan paling tinggi?",
        options: [
        { label: "A", text: "Surakarta (SKA) dan Semarang (SMG)" },
        { label: "B", text: "Yogyakarta (YGY) dan Jakarta (JKT)" },
        { label: "C", text: "Bandung (BDG) dan Jakarta (JKT)" },
        { label: "D", text: "Palembang (PLB) dan Bandung (BDG)" },
        { label: "E", text: "Yogyakarta (YGY) dan Palembang (PLB)" },
      ]
    },
    34: {
      condition: 19,
      teaser: "Manakah alasan keluar yang mengindikasikan ketidakmampuan orang untuk menetapkan prioritas dan mengorganisasikan tugas-tugas?",
        options: [
        { label: "A", text: "Jakarta (JKT)" },
        { label: "B", text: "Surabaya (SBY)" },
        { label: "C", text: "Surakarta (SKA)" },
        { label: "D", text: "Medan (MDN)" },
        { label: "E", text: "Semarang (SMG)" },
      ]
    },
    35: {
      condition: 20,
      teaser: "Jika penjelasan mengenai tugas dan tanggung jawab pekerjaan yang diberikan kepada para pelamar cukup jelas dan tidak dilebih-lebihkan; alasan keluar manakah yang paling mungkin akan berkurang?",
      options: [
        { label: "A", text: "a" },
        { label: "B", text: "b" },
        { label: "C", text: "c" },
        { label: "D", text: "d" },
        { label: "E", text: "e" },
      ]
    },
    36: {
      condition: 20,
      teaser: "Jika Anda diminta untuk mengerjakan riset di luar kantor selama dua jam pada sore hari, hari apakah yang paling cocok?",
      options: [
        { label: "A", text: "a dan b" },
        { label: "B", text: "a dan e" },
        { label: "C", text: "c" },
        { label: "D", text: "b" },
        { label: "E", text: "a" },
      ]
    },
    37: {
      condition: 21,
      teaser: "Salah seorang klien akan berkunjung ke kantor Anda minggu depan. Hari apa yang paling memungkinkan jika Anda harus menggunakan satu hari penuh dengan klien Anda?",
      options: [
        { label: "A", text: "Senin" },
        { label: "B", text: "Selasa" },
        { label: "C", text: "Rabu" },
        { label: "D", text: "Kamis" },
        { label: "E", text: "Jumat" },
      ]
    },
    38: {
      condition: 21,
      teaser: "Anda harus ke luar kota pada hari Jumat jam 14.00. Dengan berpegang pada jadwal Anda seperti tercantum pada Kondisi 21 di atas, kapankah waktu terbaik untuk menjadwal-ulang rapat informal dengan staf di kantor?",
      options: [
        { label: "A", text: "Senin" },
        { label: "B", text: "Selasa" },
        { label: "C", text: "Rabu" },
        { label: "D", text: "Kamis" },
        { label: "E", text: "Jumat" },
      ]
    },
    39: {
      condition: 21,
      teaser: "Perusahaan Anda sedang mempertimbangkan untuk melakukan restrukturisasi, di mana Anda adalah orang yang diminta untuk mempertimbangkan gagasan itu. Dengan data-data sebagaimana grafik-grafik di atas, rekomendasi terbaik apa yang dapat Anda sampaikan?",
        options: [
        { label: "A", text: "Rabu jam 14.00" },
        { label: "B", text: "Kamis jam 15.00" },
        { label: "C", text: "Senin jam 14.00" },
        { label: "D", text: "Selasa jam 14.00" },
        { label: "E", text: "Bukan semua di atas" },
      ]
    },
    40: {
      condition: 22,
      teaser: "Anda tersinggung karena bukan haknya untuk memutuskan hal tersebut, namun Anda tidak ingin menambah jarak lebih jauh lagi. Langkah apa terbaik untuk Anda lakukan?",
      options: [
        { label: "A", text: "Perusahaan tidak perlu melakukan restrukturisasi" },
        { label: "B", text: "Belum bisa memberikan saran apapun; sampai Anda memperoleh lebih banyak informasi tentang restrukturisasi." },
        { label: "C", text: "Upayakan agar persentase nilai penjualan tiap cabang menandingi persentase nilai penjualan kompetitor." },
        { label: "D", text: "Perkuat cabang Jawa Timur dan Jawa Tengah untuk mengambil keuntungan dari lebih kecilnya persentase nilai penjualan kompetitor" },
        { label: "E", text: "Mengurangi persentase nilai penjualan Jawa Barat dan DKI agar setara dengan persentase nilai penjualan kompetitor" },
      ]
    },
    41: {
      condition: 23,
      teaser: "Berdasarkan informasi dan grafik di atas, pada kuartal ke berapa konfigurasi kondisi jumlah pekerja dibandingkan dengan rerata produksi paling optimal?",
      options: [
        { label: "A", text: "Kontrak itu tetap berlaku, namun informasikan kepada manajemen yang lebih tinggi mengenai adanya pelanggaran prosedur" },
        { label: "B", text: "Hubungi Bina Utama, dan jelaskan bahwa kontrak itu tidak sah namun mereka masih punya kesempatan untuk mendapatkan yang sah" },
        { label: "C", text: "Jelaskan proses evaluasi tawaran kepada Pundi, dan biarkan dia memutuskan apakah kontrak itu masih berlaku atau tidak" },
        { label: "D", text: "Lakukan proses evaluasi tawaran seperti biasa, dan abaikan kontrak yang dibuat oleh Pundi" },
        { label: "E", text: "Menyetujui keputusan Pundi dan kontrak itu berlaku" },
      ]
    },
    42: {
      condition: 24,
      teaser: "Jika Anda ingin memastikan kedua bawahan Bu Yati yang bertengkar itu ditegur, sementara Anda dan Bu Yati adalah kolega yang setara kedudukannya. Bagaimana cara yang paling diplomatis untuk melakukannya?",
      options: [
        { label: "A", text: "Kuartal ke-4" },
        { label: "B", text: "Kuartal ke-3" },
        { label: "C", text: "Kuartal ke-2" },
        { label: "D", text: "Kuartal ke-1" },
        { label: "E", text: "Bukan semua di atas" },
      ]
    },
    43: {
      condition: 25,
      teaser: "Perusahaan Anda mengadakan Program Pelatihan Manajemen Madya. Semua supervisor yang berminat mengikuti program tersebut diharuskan mencapai nilai minimal pada sejumlah tes: nilai 40 untuk Keterampilan Verbal, nilai 45 untuk Pemahaman Bacaan, dan nilai 30 untuk Penalaran Matematika. Siapa di antara supervisor di bawah ini yang memenuhi syarat untuk mengikuti program pelatihan tersebut?",
      options: [
        { label: "A", text: "Dekati Bu Yati dan sarankan agar dia mendisiplin karyawannya." },
        { label: "B", text: "Dekati kedua bawahan Bu Yati yang masih berada di situ dan dengan perlahan beri teguran." },
        { label: "C", text: "Panggil kedua bawahan Bu Yati tersebut ke ruangan Anda setelah Anda berbicara dengan klien Anda." },
        { label: "D", text: "Beritahu Pak Farid mengenai kekhawatiran Anda dengan harapan Beliau akan membicarakannya secara serius dengan Bu Yati." },
        { label: "E", text: "Selesaikan urusan dengan pelanggan Anda terlebih dahulu baru kemudian memikirkan rencana tindakan sehubungan dengan kasus perdebatan tadi." },
      ]
    },
    44: {
      condition: 26,
      teaser: "Ada sejumlah inisiatif proyek baru akan dilakukan dalam waktu 12 bulan mendatang. Untuk bisa terlibat dalam proyek tersebut, para supervisor harus mencapai nilai 25, 23, dan 35 berturut-turut pada tes Penalaran Matematika, Keterampilan Verbal dan Pemahaman Bacaan. Bagi supervisor yang dua dari tiga nilai tersebut di atas masih di bawah persyaratan diberi kesempatan untuk mengikuti pelatihan khusus. Siapa saja yang punya kesempatan untuk mengikuti pelatihan khusus tersebut?",
      options: [
        { label: "A", text: "Budi, Karmila, Rudi" },
        { label: "B", text: "Budi, Karmila" },
        { label: "C", text: "Karno, Karmila, Rudi" },
        { label: "D", text: "Karmila, Rudi" },
        { label: "E", text: "Budi, Karno, Rudi" },
      ]
    },
    45: {
      condition: 26,
      teaser: "Jika hasil meeting di atas harus Anda sampaikan secara ringkas kepada atasan Anda, mana di antara alternatif berikut ini yang akan Anda pilih sebagai kesimpulan yang Anda ambil?",
      options: [
        { label: "A", text: "Budi dan Sumadi" },
        { label: "B", text: "Sumadi saja" },
        { label: "C", text: "Gina dan Sumadi" },
        { label: "D", text: "Gina saja" },
        { label: "E", text: "Budi dan Gina" },
      ]
    }
  }
}

export function getInfo() {
  return MATE_1_0.info
}

export function getSeeds() {
  return MATE_1_0.seeds
}

export function getItem(n) {
  // console.log(MATE_1_0.items[n])
  return MATE_1_0.items[n]
}

export function getCondition(n) {
  if (!MATE_1_0.conditions[n]) return null
  const conditions = [
    con1, con2, con3, con4, con5, con6, con7, con8, con9, con10,
    con11, con12, con13, con14, con15, con16, con17, con18, con19,
    con20, con21, con22, con23, con24, con25, con26
  ]
  return conditions[n-1]
}

export function Condition({ condition }) {
  if (!MATE_1_0.conditions[condition]) return <></>
  const conditions = [
    <Con1/>, <Con2/>, <Con3/>, <Con4/>, <Con5/>, <Con6/>, <Con7/>, <Con8/>, <Con9/>, <Con10/>,
    <Con11/>, <Con12/>, <Con13/>, <Con14/>, <Con15/>, <Con16/>, <Con17/>, <Con18/>, <Con19/>,
    <Con20/>, <Con21/>, <Con22/>, <Con23/>, <Con24/>, <Con25/>, <Con26 />
  ]

  return conditions[condition -1]
}

function Con1() { return (
  <>
  <p className="text-3xl text-center text-orange-400 font-light my-8">Situasi 1</p>
  </>
)}

function Con2() { return (
  <>
  <p className="text-3xl text-center text-orange-400 font-light my-8">Situasi 2</p>
  </>
)}

function Con3() { return (
  <>
  <p className="text-3xl text-center text-orange-400 font-light my-8">Situasi 3</p>
  </>
)}

function Con4() { return (
  <>
  <p className="text-3xl text-center text-orange-400 font-light my-8">Situasi 4</p>
  </>
)}

function Con5() { return (
  <>
    <p className="text-3xl text-center text-orange-400 font-light my-8">Situasi 5</p>
  </>
)}

function Con6() { return (
  <>
  Ringkasan Hasil Evaluasi Karyawan Amir Salah seorang karyawan paling produktif di departemen. Meskipun ia gampang tersinggung dan mempunyai kesulitan dalam berteman atau bergaul dalam kelompok. Ia memiliki kemampuan menyesuaikan diri terhadap tekanan tugas yang baik. Walaupun lancar berbicara, namun gaya berbicaranya tampak kaku. Kemampuan analisa dan sintesanya tergolong rata-rata. Berta Memiliki kemampuan yang baik dalam mengorganisasi pekerjaan dengan didukung kemampuan analisa yang mendalam, namun punya kesulitan dalam menyampaikan pikiran dan gagasan secara verbal. Walaupun kooperatif bila bekerja dengan orang lain, ia menunjukkan sikap dingin dan menjaga jarak saat berperan sebagai pemimpin. Dalam kesehariannya, prestasi kerja yang ditunjukkannya tergolong normatif. Carlo Ia memiliki kemampuan analisa yang memadai, serta menunjukkan ketenangan dan keyakinan saat bekerja dalam tekanan dan memenuhi target. Dalam kesehariannya, prestasi kerja yang ditunjukkannya tergolong normatif. Ia merupakan karyawan terbaru, namun mudah beradaptasi dan menunjukkan sikap kooperatif yang menonjol. Dalam beberapa hal ia juga dapat memainkan peran sebagai pimpinan yang efektif. Kelugasannya tersebut juga tampak saat ia harus mengkomunikasikan gagasannya secara lisan meskipun masih memerlukan perbaikan untuk komunikasi tulisan. Denny Memiliki kemampuan analisa dan sintesa yang baik meskipun kemampuannya dalam mengorganisasi pekerjaan menjadi titik lemahnya. Ia mampu menuangkan hasil analisanya dalam bentuk presentasi lisan maupun tulisan secara baik, namun kurang bisa membangun hubungan kerja sama dengan tim, termasuk dalam memimpin. Ia mampu bekerja baik di bawah tekanan sama halnya dengan dorongan untuk memberikan prestasi yang terbaik; namun dalam kesehariannya, ia belum bisa menunjukkan prestasi kerja yang baik. Erni Karyawan yang kooperatif dan banyak disukai dengan skill komunikasi yang kuat. Namun sikapnya santai dan tidak suka repot-repot membuat ia kurang optimal dalam mengerjakan tugas analisa dan sintesa. Meskipun ia suka menjadi pemimpin, tetapi kemampuan pengelolaan pekerjaannya tidak optimal. Ia terkadang terlambat memenuhi target namun ia mampu untuk bekerja di bawah tekanan.
  </>
)}

function Con7() { return (
  <>
  Divisi Anda telah menunjukkan prestasi terbaik pada tahun ini, dan perusahaan memberikan insentif berupa paket liburan ke sejumlah tujuan wisata dalam dan luar negeri. Biasanya, dalam menentukan siapa yang berhak berwisata di dalam kota, ke luar kota atau yang berhak ke luar negeri, tolok ukur utamanya adalah hierarki jabatan dan masa kerja. Namun Anda berpandangan bahwa prestasi kerja (nilai kinerja) merupakan kriteria utama, diikuti dengan yang kedua: hierarki jabatan, lalu gaji dan yang terakhir masa kerja. Untuk membantu Anda mengambil keputusan, Anda telah menentukan bahwa prestasi dua kali lebih penting daripada gaji, dan masa kerja hanya setengah pentingnya dari gaji. Jawablah pertanyaan-pertanyaan berikut berdasarkan informasi di bawah ini.
  </>
)}

function Con8() { return (
  <>
  Sebagai seorang manajer, Anda mempunyai sebuah proyek yang terdiri dari empat tahap. Masing-masing tahap memerlukan waktu dua minggu dan dikerjakan oleh satu tim yang terdiri dari dua orang. Anda mempunyai enam orang staff, 4 diantaranya: Yudi, Yuda, Parti, dan Heru yang karena kesibukannya hanya bisa terlibat untuk satu tahap saja; sedangkan dua yang lainnya adalah Tari dan Gilang. Parti hanya memiliki waktu luang di bulan pertama dan tidak bisa bekerja sama dengan Tari. Gilang bertanggungjawab untuk implementasi dan lebih suka bekerja di bagian akhir. Yuda hanya bisa bekerja pada tahap dua atau tiga. Heru lebih suka bekerja di bulan pertama, namun dia tidak cocok bekerja dengan Parti dan/atau Yudi. Tari adalah pemimpin tim secara keseluruhan sehingga harus bekerja di tahap pertama dan empat. Hal lain yang perlu diperhatikan adalah tak seorang pun boleh bekerja lebih dari dua tahap.
  </>
)}

function Con9() { return (
  <>
  Sebagai seorang manajer penjualan, Anda mengetahui bahwa salah seorang salesman Anda tidak menindaklanjuti komitmennya pada seorang customer besar, yang dahulu adalah salah satu dari customer Anda ketika masih menjadi salesman. Hari ini, customer tersebut menelpon Anda dan mengeluhkan pelayanan yang kurang memadai dari salesman Anda, terutama ketidakmampuannya untuk memberikan informasi yang diminta secara tepat waktu. Sekarang jam 13.00 dan salesman tersebut sedang keluar makan siang.
  </>
)}

function Con10() { return (
  <>
  Sakit • Max. 5 hari per tahun, tidak dapat di akumulasi dan ada pemberitahuan terlebih dahulu kecuali keadaan darurat Kematian • 3 hari untuk kematian orang tua atau anak, 1 hari untuk anggota keluarga lain Ijin Keperluan Pribadi • Max. 5 hari per tahun, permintaan resmi diajukan 2 hari sebelumnya, kecuali dalam keadaan darurat, tidak boleh dilanjutkan dengan cuti Cuti • 10 hari setelah bekerja 1 tahun, 15 hari setelah bekerja 5 tahun, cuti yang tidak diambil akan hangus pada periode cuti berikutnya, cuti sampai dengan 5 hari dapat diambil bersama hari libur Berdasarkan aturan absensi karyawan dan catatan kehadiran enam bulan terakhir dari tiap-tiap karyawan pada kondisi di atas, jawablah pertanyaan-pertanyaan berikut.
  </>
)}

function Con11() { return (
  <>
  Berikut ini sebuah cuplikan dari sebuah rapat bisnis. Pak Yunus bertindak sebagai ketua panel, dan Fred, seorang manajer Produksi. Pak Yunus: "…. dan dengan proses kerja yang selaras dan terpadu antar departemen, serta keseragaman persepsi terhadap visi/misi perusahaan, kita dapat memastikan efisiensi dan efektivitas di setiap lini organisasi yang pada akhirnya akan menjamin tercapainya keuntungan perusahaan." Fred: "Maaf saya berbeda pendapat, Pak, tapi berdasarkan biaya produksi saat ini, akan sulit untuk bisa balik modal di tahun ini, apalagi meraih keuntungan."
  </>
)}

function Con12() { return (
  <>
  Tabel di bawah ini dipergunakan oleh Departemen Pembelian untuk memastikan bahwa pesanan material bisa datang tepat waktu agar tidak mengganggu proses produksi. Sebagai Manajer Pembelian, Anda melakukan pengawasan rutin pada bawahan Anda. Berikut ini adalah hasil pekerjaan Karno.
  </>
)}

function Con13() { return (
  <>
  <p className="text-3xl text-center text-orange-400 font-light my-8">Situasi 13</p>
  </>
)}

function Con14() { return (
  <>
  <p className="text-3xl text-center text-orange-400 font-light my-8">Situasi 14</p>
  </>
)}

function Con15() { return (
  <>
  <p className="text-3xl text-center text-orange-400 font-light my-8">Situasi 15</p>
  </>
)}

function Con16() { return (
  <>
  <p className="text-3xl text-center text-orange-400 font-light my-8">Situasi 16</p>
  </>
)}

function Con17() { return (
  <>
  Sebuah perusahaan akan membeli sejumlah perangkat teknologi informasi (IT) dari sebuah distributor perlengkapan komputer. Pada saat penawaran, Anda sebagai Manager Penjualan pada perusahaan distributor tersebut menjelaskan kepada salesman Anda tentang kemungkinan permasalahan yang akan terjadi apabila beberapa perangkat dihubungkan satu sama lain. Beberapa catatan tersebut adalah: • Program Akuntansi SIMKEU akan bermasalah bila digabung dengan printer merek Conan, karena program ini tidak cocok dengan printer Conan • Notebook merek Anyer tidak cocok dipasangkan dengan wireless mouse merek Logik, karena ketidaksesuaian sistem infrared-nya • Komputer PC merek BIM tidak boleh dipadukan dengan monitor merek GL, karena ketidak sesuaian sistem digital-nya. Pada saat menawarkan, salesman Anda akan mempresentasikan semua produk dalam bentuk beragam display/set.
  </>
)}

function Con18() { return (
  <>
  <p className="text-3xl text-center text-orange-400 font-light my-8">Situasi 18</p>
  </>
)}

function Con19() { return (
  <>
  <p className="text-3xl text-center text-orange-400 font-light my-8">Situasi 19</p>
  </>
)}

function Con20() { return (
  <>
  Hasil survey terhadap para karyawan yang dengan keluar secara sukarela, menunjukkan bahwa lima alasan tertinggi untuk mencari pekerjaan di tempat lain adalah: a. Kejemuan karena tidak cukup banyak tugas yang non-rutin b. Keinginan untuk mencoba pekerjaan di bidang lain c. Lembur yang diharapkan tidak datang-datang juga d. Tidak cocok dengan rekan sekerja e. Ketidakmampuan memenuhi tenggat waktu/dead-line.
  </>
)}

function Con21() { return (
  <>
  Sebagai manajer keuangan, Anda bekerja di kantor dari jam 09.00 hingga 14.00 setiap hari, kecuali pada hari Kamis, ketika Anda menghadiri rapat perusahaan sebagai wakil divisi dari jam 12.00 hingga 15.00 (Anda tetap bekerja di kantor dari jam 09.00 hingga 12.00). Pada hari Senin, Anda bekerja dengan Agung untuk tugas di luar kantor dari jam 14.00 hingga 17.00. Pada hari Selasa jam 15.00 Anda memimpin rapat sebuah komite, yang biasanya berlangsung hingga jam 17.30 atau 16.00. Pada hari Rabu, Anda harus mengunjungi beberapa cabang mulai jam 14.00. Pada hari Jumat, Anda biasanya mengadakan rapat informal dengan staff kantor dari jam 15.00 hingga 16.00, yang terkadang berlangsung hingga jam 16.30 atau 17.00.
  </>
)}

function Con22() { return (
  <>
    <p className="text-3xl text-center text-orange-400 font-light my-8">Situasi 22</p>
  </>
)}

function Con23() { return (
  <>
  Anda adalah manager yang bertanggungjawab atas pengadaan bahan mentah untuk produksi; dan salah satu tugas utamanya adalah mengevaluasi tawaran supplier setiap tahunnya. Tiga minggu yang lalu supervisor Anda pensiun dan digantikan oleh Pundi, seorang supervisor muda yang berkarir pesat yang berasal dari perusahaan kompetitor terbesar. Hubungan Anda dengan Pundi belum cukup harmonis, dan pada suatu hari, mendekati akhir proses evaluasi tahunan, Pundi menaruh kontrak dengan supplier Bina Utama, yang sudah dia tandatangani, di meja Anda, sambil memberitahu dia telah memutuskan untuk memilih supplier tersebut. Adapun alasannya karena dia pernah bekerja sama dengan Bina Utama di masa lalu dan benar-benar mempercayai produk dan service-nya, sambil menambahkan bahwa dia juga tahu kalau Bina Utama merupakan salah satu supplier yang sedang Anda pertimbangkan.
  </>
)}

function Con24() { return (
  <>
  Anda Manajer HRD yang baru di PLP Industries, yang selama ini selalu mengalami permasalahan naik turunnya jumlah pekerja di pabrik secara tak terduga. Permasalahan menjadi lebih rumit ketika persyaratan produksi minimum per bulan juga fluktuatif sebagaimana permintaan pasar yang juga fluktuatif. Untuk itu Anda perlu terlebih dahulu melakukan pemetaan terhadap fluktuasi jumlah pekerja satu tahun terakhir yang dibandingkan dengan hasil produksi pabrik.
  </>
)}

function Con25() { return (
  <>
  Anda melihat dua orang bawahan Bu Yati sedang berdebat seru, yang semakin lama meningkat menjadi pertengkaran mulut yang kasar dan mengganggu suasana kerja di sekitarnya, meskipun beberapa saat kemudian perdebatan tersebut berakhir ketika salah seorang bergegas menyingkir. Di lain pihak, pada waktu yang bersamaan, di sekitar tempat perdebatan terjadi, Anda melihat Bu Yati sedang berbicara dengan seorang pelanggan; dan setelah pelanggan itu pergi, Bu Yati kembali ke ruang kerjanya tanpa melakukan apa-apa terhadap kedua bawahannya yang berdebat tadi. Anda merasa kedua karyawan tersebut harus ditegur, karena berdebat dan bertengkar mulut di hadapan pelanggan adalah hal yang tabu di perusahaan. Pak Farid, sebagai atasan Anda dan Bu Yati, keluar kantor hari ini; dan Anda sendiri harus menemui pelanggan yang 15 menit lagi akan tiba.
  </>
)}

function Con26() { return (
  <>
    <p className="text-3xl text-center text-orange-400 font-light my-8">Situasi 26</p>
  </>
)}
