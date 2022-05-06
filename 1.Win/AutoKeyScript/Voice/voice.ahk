
;快捷切换音频设备
; 填写你的音频设备名称
devices := ["USB耳机", "蓝牙"]
; 设置提醒图标。0x0（无图标），0x1（信息图标），0x2（警告图标），0x3（错误图标）
logo := 0x1
; 设置切换提示声。0x0（有提示声），0x10（无提示声）
voice := 0x10

cur := 0
; Menu Tray, NoIcon
ChangeDevice(devices[cur+1], logo+voice)

;右Alt+p切换设备
RAlt & p::
    cur := Mod(cur + 1, devices.Length())
    option := logo+voice
    ChangeDevice(devices[cur+1], option)
    return
;右Alt+空格静音
RAlt & Space::
    SoundSet, -1, , mute
    return

ChangeDevice(device, option) {
    TrayTip, %device%, 当前播放设备, , %option%
    Run, nircmd.exe setdefaultsounddevice %device%
    SetTimer, HideTrayTip, 3000
}

HideTrayTip() {
    TrayTip  ; 尝试以正常的方式隐藏它.
    ; if SubStr(A_OSVersion,1,3) = "10." {
    ;     Menu Tray, NoIcon
    ;     Sleep 200  ; 可能有必要调整 sleep 的时间.
    ;     Menu Tray, Icon
    ; }
}

