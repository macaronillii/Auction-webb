// script.js

// --- Authentication Logic (Simulated with localStorage) ---
function updateAuthUI() {
    const headerRight = document.querySelector('.header-right');
    if (!headerRight) return; // Exit if header-right element is not found

    headerRight.innerHTML = ''; // Clear existing content

    const username = localStorage.getItem('loggedInUser'); // Get logged-in username

    if (username) {
        // User is logged in - แสดงเฉพาะชื่อผู้ใช้
        const userInfo = document.createElement('span');
        userInfo.className = 'user-info';
        userInfo.textContent = `สวัสดี, ${username}`;
        userInfo.style.cssText = `
            color: #333;
            font-weight: 600;
            padding: 10px 15px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            backdrop-filter: blur(10px);
        `;

        headerRight.appendChild(userInfo);
    } else {
        // User is not logged in
        const loginBtn = document.createElement('a');
        loginBtn.href = 'index.html';
        loginBtn.className = 'login-btn';
        loginBtn.textContent = 'เข้าสู่ระบบ';
        loginBtn.style.cssText = `
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
            padding: 10px 15px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            margin-right: 10px;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        `;

        const registerBtn = document.createElement('a');
        registerBtn.href = 'register.html';
        registerBtn.className = 'register-btn';
        registerBtn.textContent = 'ลงทะเบียน';
        registerBtn.style.cssText = `
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
            padding: 10px 15px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        `;

        headerRight.appendChild(loginBtn);
        headerRight.appendChild(registerBtn);
    }
}

// ** Function: Check login status for protected pages **
function checkLoginStatus() {
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage !== 'index.html' && currentPage !== 'register.html') {
        const username = localStorage.getItem('loggedInUser');
        if (!username) {
            alert('กรุณาเข้าสู่ระบบเพื่อเข้าถึงหน้านี้');
            window.location.replace('index.html');
        }
    }
}

// Call updateAuthUI on page load for all pages
document.addEventListener('DOMContentLoaded', updateAuthUI);
// Call checkLoginStatus on page load for all pages
document.addEventListener('DOMContentLoaded', checkLoginStatus);

// --- Existing Functionalities ---

// Search functionality
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value;
    alert(`ค้นหา: "${searchTerm}"`);
}

// Auction functionality
function placeBid() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert('กรุณาเข้าสู่ระบบก่อนทำการประมูล');
        window.location.href = 'index.html';
        return;
    }

    const bidAmount = prompt('กรุณาใส่จำนวนเงินที่ต้องการประมูล:');
    if (bidAmount) {
        alert(`ประมูลสำเร็จ! จำนวน: ฿${bidAmount}`);
    }
}

function setReminder() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert('กรุณาเข้าสู่ระบบก่อนตั้งเตือน');
        window.location.href = 'index.html';
        return;
    }
    alert('ตั้งเตือนสำเร็จ! เราจะแจ้งให้คุณทราบเมื่อการประมูลเริ่มต้น');
}

function filterByCategory(category) {
    alert(`กรองตามหมวดหมู่: ${category}`);
}

function startNewAuction() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert('กรุณาเข้าสู่ระบบก่อนเริ่มการประมูลใหม่');
        window.location.href = 'index.html';
        return;
    }
    alert('เปิดหน้าสร้างการประมูลใหม่');
}

// Image preview for add-product page
document.addEventListener("DOMContentLoaded", () => {
  const inputs = ["pic1", "pic2", "pic3", "pic4"];

  inputs.forEach((id) => {
    const input = document.getElementById(id);
    input?.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        alert("รองรับเฉพาะไฟล์ .png และ .jpeg เท่านั้น");
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = function (ev) {
        const imgPreview = document.getElementById(id + "-preview");
        if (imgPreview) {
          imgPreview.src = ev.target.result;
          imgPreview.style.display = "block";
        }
      };
      reader.readAsDataURL(file);
    });
  });
});

// Auto-update countdown timers
setInterval(() => {
    const timeElements = document.querySelectorAll('.card-time');
    timeElements.forEach(element => {
        if (element.textContent.includes('เหลือเวลา')) {
            let text = element.textContent;
            let parts = text.split('เหลือเวลา: ');
            if (parts.length > 1) {
                let timeStr = parts[1];
                let timeValue = 0;
                if (timeStr.includes('ชั่วโมง')) {
                    let h = parseInt(timeStr.split(' ')[0]);
                    let m = parseInt(timeStr.split(' ')[2]);
                    timeValue = h * 60 + m;
                } else if (timeStr.includes('นาที')) {
                    timeValue = parseInt(timeStr.split(' ')[0]);
                }

                if (timeValue > 0) {
                    timeValue--;
                    let newHours = Math.floor(timeValue / 60);
                    let newMinutes = timeValue % 60;
                    if (newHours > 0) {
                        element.textContent = `⏰ เหลือเวลา: ${newHours} ชั่วโมง ${newMinutes} นาที`;
                    } else {
                        element.textContent = `⏰ เหลือเวลา: ${newMinutes} นาที`;
                    }
                } else {
                    element.textContent = '❌ หมดเวลาแล้ว!';
                }
            }
        }
    });
}, 60000);