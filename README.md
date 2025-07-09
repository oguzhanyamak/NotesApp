# NotesApp

Kişisel notlarınızı kolayca oluşturup yönetebileceğiniz, MERN stack (MongoDB, Express, React, Node.js) tabanlı bir not uygulaması.

## İçindekiler

- [Özellikler](#özellikler)
- [Kullanılan Teknolojiler](#kullanılan-teknolojiler)
- [Kurulum](#kurulum)
  - [Backend (Server)](#backend-server)
  - [Frontend (Client)](#frontend-client)
- [Kullanım](#kullanım)
- [Dizin Yapısı](#dizin-yapısı)
- [Katkıda Bulunma](#katkıda-bulunma)
- [Lisans](#lisans)

---

## Özellikler

- Kullanıcı kaydı ve girişi (JWT ile kimlik doğrulama)
- Not ekleme, düzenleme, silme ve listeleme
- Notlara etiket ekleyebilme
- Basit ve modern kullanıcı arayüzü
- Mobil uyumlu tasarım

## Kullanılan Teknolojiler

### Backend

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (JSON Web Token)
- Rate Limiting

### Frontend

- React.js (Vite ile)
- Axios
- Modern CSS

---

## Kurulum

### Gereksinimler

- Node.js (v16+)
- npm veya yarn
- MongoDB (lokal veya bulut)

### Backend (Server)

1. Terminalde backend dizinine geçin:
   ```bash
   cd NotesApp/server
   ```
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. `.env` dosyası oluşturun ve aşağıdaki değişkenleri ekleyin:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```
4. Sunucuyu başlatın:
   ```bash
   npm start
   ```
   Sunucu varsayılan olarak `http://localhost:5000` adresinde çalışacaktır.

### Frontend (Client)

1. Terminalde frontend dizinine geçin:
   ```bash
   cd NotesApp/frontend/notes-app
   ```
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. Uygulamayı başlatın:
   ```bash
   npm run dev
   ```
   Uygulama varsayılan olarak `http://localhost:5173` adresinde çalışacaktır.

> **Not:** Frontend, backend API'sine istek atabilmek için backend'in çalışıyor olması gerekir. Gerekirse `axiosInstance.js` dosyasındaki baseURL'i güncelleyebilirsiniz.

---

## Kullanım

1. Kayıt olarak yeni bir kullanıcı oluşturun veya mevcut hesabınızla giriş yapın.
2. Not ekleyin, düzenleyin veya silin.
3. Notlarınıza etiket ekleyerek kategorize edin.
4. Profil bilgilerinizi görüntüleyin.

---

## Dizin Yapısı

```
NotesApp/
  ├── frontend/
  │   └── notes-app/
  │       ├── components/
  │       ├── pages/
  │       ├── public/
  │       ├── src/
  │       └── ...
  └── server/
      ├── config/
      ├── controllers/
      ├── middlewares/
      ├── models/
      ├── routes/
      └── ...
```

---

## Katkıda Bulunma

Katkılarınızı memnuniyetle karşılıyoruz! Lütfen bir pull request (PR) açmadan önce bir issue oluşturun.

---

## Lisans

Bu proje MIT lisansı ile lisanslanmıştır. 