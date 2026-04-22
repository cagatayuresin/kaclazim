# Değişim Günlüğü (Changelog)

Projedeki tüm önemli değişiklikler bu dosyada kayıt altına alınacaktır.

## [3.0] - 2026-04-22
### Değişenler
- **Tam Arayüz Yeniden Tasarımı:** Siyah/beyaz Swiss editorial kimliğe geçiş yapıldı.
- **Split Layout:** Masaüstünde sol panel (siyah, sticky, morph animasyonu) + sağ panel (beyaz, form + sonuç) mimarisine geçildi.
- **Yeni Font:** Oswald'dan DM Sans + DM Mono çiftine geçildi.
- **Sonuç Ekranı:** Büyük monospace sonuç sayısı eklendi; 3 durum rengi: normal / imkansız / zaten geçtin.
- **Logo & Sosyal Medya:** Sol panel altına logo ve sosyal medya ikonları entegre edildi.
- **Enter Kısayolu:** Enter tuşuyla hesaplama tetiklenebiliyor.
- **Tweaks Paneli:** Prototip içi font ve boyut ayar paneli eklendi.
- **Mobil Responsive:** Tek sütun yığılı layout ile tam mobil uyum sağlandı.

## [2.2] - 2026-04-09
### Eklenenler
- **PWA Desteği:** Uygulama artık telefona yüklenebilir ve internetsiz (offline) çalışabilir.
- **Web Manifest:** Tema renkleri ve ikon yapılandırmaları eklendi.

### Değişenler
- **Gelişmiş Mantık:** Hesaplama sonuçları artık yukarı yuvarlanıyor (`Math.ceil`).
- **Input İyileştirmeleri:** Mobil cihazlarda sayı klavyesini açan `type="number"` düzenlemesi yapıldı.
- **Veri Doğrulama:** Daha sıkı giriş kontrolleri ve hata mesajları eklendi.

## [2.1] - 2026-04-09
### Kaldırılanlar
- SonarCloud/SonarLint yapılandırması tamamen temizlendi.
- Gereksiz GitHub Actions iş akışları kaldırıldı.

## [2.0] - 2026-03-25
### Eklenenler
- Ders bazlı LocalStorage kaydı özelliği eklendi.
- Kullanıcıların vize notlarını ve kriterlerini tarayıcılarında saklamasına olanak tanındı.

## [1.3] - 2024-03-10
### Değişenler
- Genel yapılandırma ve tasarım iyileştirmeleri yapıldı.

## [1.2] - 2024-02-28
### Düzeltilenler
- Hesaplama mantığındaki küçük bir hata (bug) giderildi.

## [1.1] - 2024-02-15
### Düzeltilenler
- Arayüzdeki görsel kaymalar ve küçük bir hata giderildi.

## [1.0] - 2024-01-20
### Eklenenler
- Projenin ilk sürümü yayınlandı.
- Temel vize/final hesaplama mantığı oluşturuldu.
