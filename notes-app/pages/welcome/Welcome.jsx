import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import NoteImg from '../../src/assets/note.png';

export default function Welcome() {
    return(
        <div>
            <Navbar userInfo={null} />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">

                <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center max-w-lg w-full mt-8">
                    <img src={NoteImg} alt="Notlar" className="w-32 h-32 mb-6 drop-shadow-lg" />
                    <h1 className="text-5xl font-extrabold text-blue-600 mb-3 text-center">Hoş Geldiniz!</h1>
                    <p className="text-lg text-gray-700 mb-4 text-center">
                        Notlarınızı kolayca oluşturun, düzenleyin ve yönetin. Kişisel not defterinizle fikirlerinizi ve hatırlatıcılarınızı güvenle saklayın.
                    </p>
                </div>
                <div className="mt-10 text-gray-400 text-sm text-center">
                    <span>Notlarınızı dijital ortamda güvenle saklayın ve her yerden erişin.</span>
                </div>
            </div>
        </div>

    )
}