# NotesApp Server

Bu klasör, NotesApp uygulamasının sunucu (backend) tarafını içerir. Node.js ve Express.js kullanılarak geliştirilmiştir. Kullanıcı kimlik doğrulama, not yönetimi ve kullanıcı yönetimi gibi temel işlevleri sağlar.

## Özellikler
- JWT tabanlı kimlik doğrulama
- Not ekleme, silme, güncelleme ve listeleme
- Kullanıcı kaydı ve girişi
- Oran sınırlama (rate limiting)

## Kurulum

1. Gerekli bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. Ortam değişkenlerini ayarlayın. `.env` dosyası oluşturup aşağıdaki gibi doldurun:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/notesapp
   JWT_SECRET=your_jwt_secret
   ```

3. Sunucuyu başlatın:
   ```bash
   npm start
   ```
   veya geliştirme modunda çalıştırmak için:
   ```bash
   npm run dev
   ```

## Klasör Yapısı

```
server/
├── config/           # Veritabanı ve diğer konfigürasyon dosyaları
├── controllers/      # İş mantığı ve endpoint işlemleri
├── middlewares/      # Orta katman yazılımları (auth, rate limiter vs.)
├── models/           # Mongoose modelleri
├── routes/           # API rotaları
├── index.js          # Uygulama giriş noktası
```

## API Kullanımı

### Kimlik Doğrulama
- `POST /api/auth/signup` — Kullanıcı kaydı
- `POST /api/auth/login` — Kullanıcı girişi

### Notlar
- `GET /api/notes` — Notları listele (giriş gerekli)
- `POST /api/notes` — Yeni not ekle (giriş gerekli)
- `PUT /api/notes/:id` — Notu güncelle (giriş gerekli)
- `DELETE /api/notes/:id` — Notu sil (giriş gerekli)

## Katkıda Bulunma
Pull request'ler ve hata bildirimleri memnuniyetle karşılanır.
