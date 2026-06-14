import os
import re

for file in os.listdir('.'):
    if file.endswith('.html'):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Replace desktop buttons with hidden on mobile classes
        content = content.replace(
            '<a href="login.html" class="px-4 py-2',
            '<a href="login.html" class="hidden md:inline-block px-4 py-2'
        )
        content = content.replace(
            '<a href="register.html" class="bg-green-600 text-white px-5',
            '<a href="register.html" class="hidden md:inline-block bg-green-600 text-white px-5'
        )

        # Add to mobile menu if not exists
        if 'Tài Khoản' in content and 'fa-sign-in-alt' not in content:
            mobile_login = '\n        <a href="login.html" class="hover:text-green-600 transition md:hidden"><i class="fa-solid fa-sign-in-alt mr-2"></i>Đăng nhập</a>\n        <a href="register.html" class="hover:text-green-600 transition md:hidden"><i class="fa-solid fa-user-plus mr-2"></i>Đăng ký</a>'
            content = re.sub(r'(<a href="profile.html".*?>.*?Tài Khoản</a>)', r'\1' + mobile_login, content)

        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
