export const teamGroups = [
  {
    trName: "Yönetim",
    enName: "Management",
    trDescription: "Takımın genel koordinasyonu, karar süreçleri ve departmanlar arası yönetimi.",
    enDescription: "Overall team coordination, decision-making and cross-department management.",
    members: ["Prof. Dr. Ali Arslan Kaya", "Dr. Öğr. Üyesi Hayriye Serra Altınoluk"],
  },
  {
    trName: "Elektronik Ekibi",
    enName: "Electronics Team",
    trDescription: "Araç elektroniği, kablolama, veri toplama ve kontrol sistemleri.",
    enDescription: "Vehicle electronics, wiring, data acquisition and control systems.",
    members: ["Ufuk Çok", "Mahmut Can Aşar", "Eylül Deniz Kudu", "Alper Salih Günaydın", "Barış Bağcı", "Ebrar Azra Arslan", "Alperen Kaşıkçı", "Vatan Saatci"],
  },
  {
    trName: "Yazılım Ekibi",
    enName: "Software Team",
    trDescription: "Gömülü yazılım, telemetri, veri analizi ve takımın dijital sistemleri.",
    enDescription: "Embedded software, telemetry, data analysis and the team's digital systems.",
    members: ["Aslı Ceren Yılmaz", "Şenol Durmuş", "Yaşar Kaki"],
  },
  {
    trName: "Mekanik Ekip",
    enName: "Mechanical Team",
    trDescription: "Şasi, süspansiyon, aktarma, üretim ve aracın mekanik bütünlüğü.",
    enDescription: "Chassis, suspension, drivetrain, manufacturing and vehicle mechanical integrity.",
    members: ["Halil İbrahim Yılmaz", "Sertan Kurt", "Ata Üstün", "Tuğra Temur", "Zişan Günay"],
  },
  {
    trName: "Organizasyon Ekibi",
    enName: "Organization Team",
    trDescription: "Etkinlik, iletişim, sponsorluk ve takım organizasyonu.",
    enDescription: "Events, communications, sponsorship and team organization.",
    members: ["Eylül Deniz Kudu", "Ebrar Azra Arslan", "Şule Nilay Aktaş"],
  },
];

const linkedinProfiles: Record<string, string> = {
  "Ufuk Çok": "https://www.linkedin.com/in/ufuk-%C3%A7ok-9a326734a/",
  "Mahmut Can Aşar": "https://www.linkedin.com/in/mahmut-can-a%C5%9Far-50a2b93b0/",
  "Eylül Deniz Kudu": "https://www.linkedin.com/in/eyl%C3%BCldenizkudu/",
  "Alper Salih Günaydın": "https://www.linkedin.com/in/alper-g%C3%BCnayd%C4%B1n-2641543b6/",
  "Barış Bağcı": "https://www.linkedin.com/in/bar%C4%B1%C5%9F-ba%C4%9Fc%C4%B1-580a5a1ab/",
  "Ebrar Azra Arslan": "https://www.linkedin.com/in/ebrar-azra-arslan-88a592290/",
  "Alperen Kaşıkçı": "https://www.linkedin.com/in/alperen-ka%C5%9F%C4%B1k%C3%A7%C4%B1-05ab89401/",
  "Vatan Saatci": "https://www.linkedin.com/in/vatan-saatci-3a2571425/",
  "Aslı Ceren Yılmaz": "https://www.linkedin.com/in/asl%C4%B1cereny%C4%B1lmaz/",
  "Şenol Durmuş": "https://www.linkedin.com/in/%C5%9Fenol-durmu%C5%9F-b570613b7/",
  "Yaşar Kaki": "https://www.linkedin.com/in/yasarkaki/",
  "Halil İbrahim Yılmaz": "https://www.linkedin.com/in/halil-ibrahim-y%C4%B1lmaz-7a2a35229/",
  "Sertan Kurt": "https://www.linkedin.com/in/sertan-kurt-59bb6a185/",
  "Ata Üstün": "https://www.linkedin.com/in/ata-ustun/",
  "Tuğra Temur": "https://www.linkedin.com/in/tu%C4%9Fra-temur-8508732a3/",
  "Zişan Günay": "https://www.linkedin.com/in/zi%C5%9Fan-g%C3%BCnay-9bb27b286/",
  "Şule Nilay Aktaş": "https://www.linkedin.com/in/nilay-aktas-95b1aa3ab/",
  "Ekrem Alperen Aksak": "https://www.linkedin.com/in/ekremalperenaksak/",
};

const universityProfiles: Record<string, string> = {
  "Prof. Dr. Ali Arslan Kaya": "https://www.mu.edu.tr/tr/personel/aakaya",
  "Dr. Öğr. Üyesi Hayriye Serra Altınoluk": "https://www.mu.edu.tr/tr/personel/serraltinoluk",
};

export function getMemberProfile(member: string) {
  return universityProfiles[member] ?? linkedinProfiles[member];
}

export function isUniversityProfile(member: string) {
  return Boolean(universityProfiles[member]);
}
