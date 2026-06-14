$htmlFiles = Get-ChildItem -Path . -Filter *.html -Recurse

foreach ($file in $htmlFiles) {
    if ($file.FullName -match "attachments") { continue }
    
    $content = Get-Content $file.FullName -Raw

    # Hide desktop login/register buttons on mobile
    $content = $content -replace '<a href="login.html" class="px-4 py-2 text-gray-700 hover:bg-gray-100', '<a href="login.html" class="hidden md:inline-block px-4 py-2 text-gray-700 hover:bg-gray-100'
    $content = $content -replace '<a href="register.html" class="bg-green-600 text-white px-5', '<a href="register.html" class="hidden md:inline-block bg-green-600 text-white px-5'

    # Add login/register to mobile menu (if not already there)
    if ($content -match '<a href="profile.html".*?>.*?Tài Khoản</a>' -and $content -notmatch '<a href="login.html".*?>.*?Đăng nhập</a>\s*</div>\s*</div>\s*</nav>') {
        $mobileLoginStr = "`n        <a href=`"login.html`" class=`"hover:text-green-600 transition md:hidden`"><i class=`"fa-solid fa-sign-in-alt mr-2`"></i>Đăng nhập</a>" + 
                          "`n        <a href=`"register.html`" class=`"hover:text-green-600 transition md:hidden`"><i class=`"fa-solid fa-user-plus mr-2`"></i>Đăng ký</a>"
        
        $content = $content -replace '(<a href="profile.html".*?>.*?Tài Khoản</a>)', "`$1$mobileLoginStr"
    }

    Set-Content -Path $file.FullName -Value $content -Encoding UTF8
}
