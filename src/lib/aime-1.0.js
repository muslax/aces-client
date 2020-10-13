export const AIME_INFO = {
  version: "1.0",
  slug: "aime-1.0",
  name: "AIME Default Module",
  title: "AIME Default Title",
  description: "Lorem ipsum dolor AIME.",
  items: 136,
  maxTime: 8160000, // 136 * 60 * 1000
}

export const AIME_ELEMENTS = [ "MNGE", "USNG", "IDTK", "UDST" ]

export const AIME_LIKERT = {
  1: "Sangat setuju",
  2: "Setuju",
  3: "Ragu-ragu",
  4: "Tidak setuju",
  5: "Sangat tidak setuju",
}

export function getElement(n) {
  return AIME_ITEMS[n] ? AIME_ITEMS[n] : null
}

export const AIME_ITEMS = {
  1: ["MNGE","Saya cukup terbuka tentang perasaan dan emosi saya."],
  2: ["USNG","Ketika sedang memikirkan sesuatu, saya memblokir perasaan saya."],
  3: ["IDTK","Saya menjadi sedih ketika melihat ada orang diperlakukan tidak adil."],
  4: ["USNG","Bagi saya, kebohongan tidak bisa dimaafkan."],
  5: ["USNG","Saya jarang dipengaruhi oleh perasaan ketika sedang berpikir."],
  6: ["UDST","Saya bisa mengenali orang yang berlagak/sok percaya diri."],
  7: ["USNG","Saya selalu berkata jujur."],
  8: ["UDST","Saya tahu kenapa seseorang bisa menjadi marah."],
  9: ["USNG","Saya cenderung ragu dan penuh pertimbangan untuk berbagai hal."],
  10: ["USNG","Saya cenderung mengabaikan yang terjadi di sekitar saya."],
  11: ["UDST","Saya tahu mengapa emosi bisa berkembang dan berubah."],
  12: ["MNGE","Dengan cepat saya bisa merubah suasana hati, sesuai dengan situasi/kondisi."],
  13: ["UDST","Saya biasanya dapat memprediksi ketika emosi akan berubah."],
  14: ["MNGE","Saya terbuka terhadap perasaan tidak nyaman dari orang lain."],
  15: ["USNG","Saya bertindak mengandalkan perasaan saya sendiri."],
  16: ["IDTK","Saya bisa mengenali orang yang ekspresi emosinya dibuat-buat."],
  17: ["IDTK","Saya biasanya bisa mengetahui apa yang dirasakan orang lain."],
  18: ["USNG","Saya selalu mengakui kesalahan saya."],
  19: ["MNGE","Saya mempertimbangkan perasaan saya ketika membuat keputusan."],
  20: ["MNGE","Saya mencoba untuk menjadi positif dan ceria ketika menghadapi sebuah keputusan penting."],
  21: ["USNG","Saya bisa berubah pikiran, ketika mengetahui perasaan orang lain."],
  22: ["USNG","Saya mendengarkan percakapan orang lain."],
  23: ["USNG","Perasaan saya membantu saya fokus pada hal-hal yang memang penting."],
  24: ["USNG","Saya cenderung lebih mendengarkan suara hati daripada logika saya."],
  25: ["MNGE","Saya sering merasa kewalahan oleh suasana hati yang terjadi."],
  26: ["USNG","Saya peduli dengan orang lain."],
  27: ["IDTK","Saya bisa tahu apakah seseorang sedang bahagia."],
  28: ["IDTK","Saya mampu merasakan apa yang orang lain rasakan."],
  29: ["UDST","Saya tahu ketika seseorang mengalami perasaan yang campur aduk."],
  30: ["IDTK","Saya membaca situasi secara akurat."],
  31: ["UDST","Saya memahami apa penyebab rasa malu."],
  32: ["IDTK","Saya bisa membaca isyarat non-verbal."],
  33: ["UDST","Saya terkadang harus berbohong."],
  34: ["IDTK","Saya tidak begitu memperhatikan perasaan saya."],
  35: ["IDTK","Pada umumnya saya tahu ketika seseorang sedang marah."],
  36: ["IDTK","Saya bisa tahu apakah seseorang merasa jijik."],
  37: ["UDST","Saya benar-benar tidak tahu bagaimana emosi bekerja."],
  38: ["UDST","Saya menyadari apa yang membuat orang takut."],
  39: ["IDTK","Saya tidak selalu tahu, ketika seseorang sedang sedih."],
  40: ["IDTK","Saya biasanya menyadari apa yang saya rasakan."],
  41: ["UDST","Saya sulit menggambarkan perasaan saya."],
  42: ["IDTK","Saya sering salah membaca perasaan orang."],
  43: ["IDTK","Saya tidak memahami isyarat emosional."],
  44: ["MNGE","Saya sering tidak mempertimbangkan perasaan saya ketika memecahkan masalah ."],
  45: ["MNGE","Saya mengikuti naluri saya ketika harus mengambil sebuah keputusan penting."],
  46: ["MNGE","Saya bisa dengan tiba-tiba mengubah suasana hati saya bilamana diperlukan."],
  47: ["USNG","Saya memikirkan apa yang dikatakan oleh emosi saya."],
  48: ["USNG","Kondisi emosi orang lain bisa mempengaruhi saya."],
  49: ["IDTK","Saya bisa melihat ketika orang lain terkejut."],
  50: ["MNGE","Saya tetap tenang dan berpikir jernih dalam situasi yang sulit (krisis)."],
  51: ["USNG","Saya menyadari perubahan suasana hati saya ."],
  52: ["UDST","Saya memahami penyebab emosi saya."],
  53: ["UDST","Saya benar-benar tidak mengerti bagaimana cara emosi berubah."],
  54: ["MNGE","Perubahan suasana hati, memberi saya pandangan berbeda tentang sebuah situasi."],
  55: ["IDTK","Saya tahu ketika seseorang sedang terganggu."],
  56: ["MNGE","Saya percaya emosi memberikan arah untuk hidup."],
  57: ["UDST","Saya jarang bisa mengenali reaksi emosi orang lain."],
  58: ["USNG","Saya menghindari berurusan dengan emosi yang membuat tidak nyaman."],
  59: ["USNG","Saya bisa tetap jernih dan fokus di bawah tekanan."],
  60: ["IDTK","Saya kadang-kadang tidak memahami ekspresi dan gerak palsu."],
  61: ["UDST","Saya tahu bahwa emosi mengikuti sebuah pola tertentu."],
  62: ["IDTK","Saya bisa tahu ketika seseorang ketakutan."],
  63: ["MNGE","Saya membiarkan perasaan mengambil peran utama pada beragam keputusan saya."],
  64: ["UDST","Saya mampu menggambarkan apa yang saya rasakan dengan tepat."],
  65: ["UDST","Saya mengerti apa yang menyebabkan kecemasan."],
  66: ["MNGE","Saya mampu membantu orang lain mengelola perasaan mereka."],
  67: ["UDST","Saya tahu ketika orang mengalami suasana hati yang saling bertentangan."],
  68: ["UDST","Saya sering mengekspresikan rasa sayang saya secara fisik."],
  69: ["MNGE","Insting berperan paling besar ketika saya mengambil keputusan penting."],
  70: ["USNG","Saya tidak membiarkan emosi saya mempengaruhi pemikiran saya."],
  71: ["UDST","Saya biasanya tahu bagaimana emosi tertentu akan berkembang."],
  72: ["USNG","Saya tidak mudah terpengaruh oleh perasaan orang."],
  73: ["MNGE","Saya mampu mengatasi beragam kegagalan dengan baik."],
  74: ["IDTK","Saya bisa melihat ketika seseorang sedang kecewa."],
  75: ["USNG","Saya jarang memikirkan beragam alasan dibalik perasaan sesorang."],
  76: ["MNGE","Saya secara emosional stabil."],
  77: ["MNGE","Suasana hati yang berbeda membantu saya melihat masalah dari sudut yang berbeda."],
  78: ["MNGE","Saya membuat keputusan setelah saya memiliki semua fakta."],
  79: ["IDTK","Saya mencoba untuk memahami perasaan orang lain."],
  80: ["UDST","Saya tertarik pada bagaimana orang lain merasakan hal-hal tertentu."],
  81: ["MNGE","Saya menganalisa perasaan saya untuk membantu memecahkan masalah."],
  82: ["UDST","Saya tidak selalu seperti apa yang dilihat oleh orang lain."],
  83: ["USNG","Saya cenderung lebih kreatif ketika saya merasa positif."],
  84: ["IDTK","Saya sering menganalisis bagaimana perasaan saya."],
  85: ["IDTK","Saya bisa membaca ekspresi wajah."],
  86: ["IDTK","Saya tahu ketika seseorang sedang berusaha memanipulasi saya."],
  87: ["MNGE","Saya bukanlah orang yang mudah berubah (naik turun) suasana hatinya."],
  88: ["MNGE","Saya selalu berada dalam suasana hati yang sama."],
  89: ["IDTK","Saya jarang menyadari reaksi emosi saya."],
  90: ["USNG","Saya jarang memanfaatkan kondisi suasana hati saya."],
  91: ["UDST","Saya tidak memperlihatkan perasaan saya pada orang lain."],
  92: ["MNGE","Perasaan saya memberitahu ketika ada sesuatu yang salah."],
  93: ["UDST","Saya cenderung memendam perasaan saya."],
  94: ["UDST","Saya bisa menyadari latar belakang dari perasaan orang."],
  95: ["MNGE","Saya mendengarkan perasaan saya ketika membuat keputusan penting."],
  96: ["UDST","Saya mengerti bagaimana emosi dapat berkembang dari waktu ke waktu."],
  97: ["IDTK","Saya lebih suka berurusan dengan data daripada dengan perasaan."],
  98: ["UDST","Saya tahu apa yang membuat orang bahagia."],
  99: ["MNGE","Kadang saya mengubah suasana hati, untuk mendapatkan sudut pandang yang berbeda."],
  100: ["UDST","Saya tahu apa yang menyebabkan kegembiraan."],
  101: ["IDTK","Saya memperhatikan bahasa tubuh orang."],
  102: ["IDTK","Saya sering tidak sadar ketika seseorang berpura-pura atau menutupi sesuatu."],
  103: ["USNG","Saya mengalami beragam jenis dan bentuk emosi."],
  104: ["USNG","Saya cenderung untuk pamer jika mendapatkan kesempatan."],
  105: ["USNG","Saya mengikuti firasat dan perasaan saya."],
  106: ["IDTK","Saya biasanya tahu ketika orang mencoba menyembunyikan perasaannya."],
  107: ["IDTK","Saya suka memperhatikan orang."],
  108: ["USNG","Saya jarang betingkah laku secara berlebihan."],
  109: ["UDST","Saya bisa berbicara dengan lancar tentang perasaan saya."],
  110: ["IDTK","Saya bisa tertipu orang lain."],
  111: ["MNGE","Saya tidak pernah terpengaruh dengan perasaan saya."],
  112: ["IDTK","Saya menceritakan emosi saya dengan keluarga dan teman."],
  113: ["MNGE","Saya tidak ingin terlibat dalam masalah orang lain."],
  114: ["IDTK","Saya bisa tahu ketika seseorang tersenyum palsu."],
  115: ["USNG","Saya tidak membiarkan perasaan saya mempengaruhi penalaran saya."],
  116: ["USNG","Saya sering mengabaikan perasaan saya."],
  117: ["MNGE","Saya menggunakan perasaan untuk memahami beragam aspek dari sebuah situasi."],
  118: ["MNGE","Bilamana diperlukan, saya bisa membebaskan diri dari suasana hati saat itu ."],
  119: ["USNG","Saya terkadang memanfaatkan pujian dan sanjungan untuk bisa maju."],
  120: ["IDTK","Saya cenderung mengetahui emosi apa yang saya rasakan."],
  121: ["USNG","Saya sering tidak mempertimbangkan apa yang dipikirkan orang lain."],
  122: ["UDST","Saya bisa mengerti mengapa orang jadi agresif."],
  123: ["MNGE","Analisis saya terhadap suatu masalah jarang dipengaruhi oleh perasaan saya."],
  124: ["UDST","Saya peka terhadap perasaan orang lain."],
  125: ["USNG","Saya memahami bagaimana perasaan mempengaruhi perilaku saya."],
  126: ["USNG","Saya tidak terlalu peduli tentang perasaan orang lain."],
  127: ["UDST","Saya sering lupa bahwa suasana hati bisa berubah seiring perubahan situasi dan kondisi."],
  128: ["UDST","Saya berempati dengan orang-orang yang sedang dihimpit masalah."],
  129: ["MNGE","Saya biasanya merasa, ketika ada sesuatu yang salah."],
  130: ["UDST","Saya sering tidak menyadari kondisi emosi orang lain."],
  131: ["MNGE","Saya mengijinkan perasaan saya mempengaruhi keputusan saya."],
  132: ["MNGE","Saya jarang dikuasai oleh perasaan, ketika sedang memikirkan sesuatu."],
  133: ["UDST","Saya sering tidak bisa menemukan kata yang tepat untuk menggambarkan perasaan saya."],
  134: ["USNG","Saya suka mengamati orang."],
  135: ["MNGE","Saya bukan orang yang moody, yang suasana hatinya sering berubah ubah."],
  136: ["IDTK","Saya tahu ketika seseorang berusaha menutup-nutupi sesuatu dari saya."],
}