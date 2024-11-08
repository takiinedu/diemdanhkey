// Import Firestore và QRCode
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('Submit');
    const imgQR = document.getElementById('imgQR'); // Thẻ img để hiển thị QR code

    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBxIY1kKyUVYmjl-I3w2ivirYAPOBr-AhA",
        authDomain: "diem-danh-key.firebaseapp.com",
        projectId: "diem-danh-key",
        storageBucket: "diem-danh-key.firebasestorage.app",
        messagingSenderId: "385858861814",
        appId: "1:385858861814:web:8e4e5d9a725278d0ba4ad7",
        measurementId: "G-FQRH57RPZ2"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const db = getFirestore(app);

    async function getRandomKeyCodeAndGenerateQRCode() {
        const querySnapshot = await getDocs(collection(db, 'key'));
        const docsArray = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (!data.msv) { // Kiểm tra nếu trường msv là rỗng hoặc null
                docsArray.push(doc.id); // Thêm key_code vào mảng
            }
        });

        if (docsArray.length === 0) {
            console.log('Không có tài liệu nào trong collection "key" có trường msv rỗng.');
            return;
        }

        // Chọn ngẫu nhiên một key_code có trường msv rỗng
        const randomKeyCode = docsArray[Math.floor(Math.random() * docsArray.length)];
        console.log('Key_code ngẫu nhiên:', randomKeyCode);

        // Tạo QR code từ key_code và chuyển URL ảnh vào thẻ imgQR
        QRCode.toDataURL(randomKeyCode, (err, url) => {
            if (err) {
                console.error('Lỗi tạo QR code:', err);
            } else {
                imgQR.src = url; // Đặt URL ảnh vào thẻ img
                console.log('QR code URL:', url);
            }
        });
    }

    // Gọi hàm khi bấm nút Submit
    button.addEventListener('click', getRandomKeyCodeAndGenerateQRCode);
});
