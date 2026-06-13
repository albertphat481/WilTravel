Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('c:\Users\NITRO 5\OneDrive\Documents\WilTravel\images\logo.png')
$bmp = New-Object System.Drawing.Bitmap($img)
for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $p = $bmp.GetPixel($x, $y)
        $avg = [int](($p.R + $p.G + $p.B) / 3)
        $a = 255 - $avg
        if ($p.A -eq 0) { $a = 0 }
        $bmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($a, 255, 255, 255))
    }
}
$bmp.Save('c:\Users\NITRO 5\OneDrive\Documents\WilTravel\images\logo-footer.png', [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$img.Dispose()
