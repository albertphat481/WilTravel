Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('c:\Users\NITRO 5\OneDrive\Documents\WilTravel\images\logo.png')
$bmp = New-Object System.Drawing.Bitmap($img)
for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $p = $bmp.GetPixel($x, $y)
        if ($p.A -gt 0) {
            if ($p.R -gt 240 -and $p.G -gt 240 -and $p.B -gt 240) {
                $bmp.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
            }
        }
    }
}
$bmp.Save('c:\Users\NITRO 5\OneDrive\Documents\WilTravel\images\logo-footer-colored.png', [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
$img.Dispose()
