//LOGIC CHUNG
// Danh sách người dùng (bao gồm cả người dùng đăng ký)
let users = [
    { email: "admin@example.com", password: "admin12345", role: "admin" },
    { email: "user@example.com", password: "user12345", role: "user" }
];

// Xác thực định dạng email 
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/* Xóa thông báo lỗi */
function clearErrors(errorIds) {
    errorIds.forEach(id => {
        const errorElement = document.getElementById(id);
        if (errorElement) {
            errorElement.style.display = 'none';
            errorElement.innerHTML = '';
        }
    });
}

// Hiển thị thông báo lỗi 
function displayError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.innerHTML = message;
        errorElement.style.display = 'block';
    }
}

//Xác thực form đăng ký 
function checkRegister() {
    const fullname = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    // Xóa lỗi trước đó
clearErrors(['fullName-error', 'email-error', 'password-error', 'confirmPassword-error']);

    let hasError = false;
// Xác thực họ và tên
if (!fullname) {
        displayError('fullName-error', 'Họ và tên không được để trống');
        hasError = true;
    }
// Xác thực email
if (!email) {
        displayError('email-error', 'Email không được để trống');
        hasError = true;
} else if (!validateEmail(email)) {
        displayError('email-error', 'Email phải đúng định dạng');
        hasError = true;
    }

// Xác thực mật khẩu
if (!password) {
        displayError('password-error', 'Mật khẩu không được để trống');
        hasError = true;
 } else if (password.length < 8) {
        displayError('password-error', 'Mật khẩu tối thiểu 8 ký tự');
        hasError = true;
}

// Xác thực mật khẩu xác nhận
if (!confirmPassword) {
        displayError('confirmPassword-error', 'Mật khẩu xác nhận không được để trống');
        hasError = true;
} else if (password !== confirmPassword) {
        displayError('confirmPassword-error', 'Mật khẩu không trùng khớp');
        hasError = true;
}

// Nếu không có lỗi, lưu thông tin người dùng và hiển thị thông báo
if (!hasError) {
        users.push({ email: email, password: password, role: "user" });
        const successMessage = document.createElement('p');
        successMessage.style.color = 'green';
        successMessage.innerHTML = 'Đăng ký thành công! Vui lòng đăng nhập.';
        document.querySelector('.box').appendChild(successMessage);
 }
}

//Xác thực form đăng nhập
function checkLogin() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

// Xóa lỗi trước đó
    clearErrors(['email-error', 'password-error']);

    let hasError = false;

// Xác thực email
    if (!email) {
        displayError('email-error', 'Email không được để trống');
        hasError = true;
    } else if (!validateEmail(email)) {
        displayError('email-error', 'Email phải đúng định dạng');
        hasError = true;
    }

// Xác thực mật khẩu
    if (!password) {
        displayError('password-error', 'Mật khẩu không được để trống');
        hasError = true;
    }

 // Kiểm tra thông tin đăng nhập
    if (!hasError) {
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            displayError('password-error', 'Thông tin đăng nhập không đúng');
            hasError = true;
        } else {
            const successMessage = document.createElement('p');
            successMessage.style.color = 'green';
            if (user.role === 'admin') {
                successMessage.innerHTML = 'Đăng nhập thành công! Chuyển hướng đến trang quản lý dự án.';
            } else {
                successMessage.innerHTML = 'Đăng nhập thành công! Chuyển hướng đến trang chủ.';
            }
            document.querySelector('.box').appendChild(successMessage);
        }
    }
}