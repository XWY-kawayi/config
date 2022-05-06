
;ctrl+alt+i 隐藏任务栏，可拉伸桌面
VarSetCapacity(APPBARDATA, A_PtrSize=4 ? 36:48)
^!i::
   NumPut(DllCall("Shell32\SHAppBarMessage", "UInt", 4 ; ABM_GETSTATE
                                           , "Ptr", &APPBARDATA
                                           , "Int")
 ? 2:1, APPBARDATA, A_PtrSize=4 ? 32:40) ; 2 - ABS_ALWAYSONTOP, 1 - ABS_AUTOHIDE
 , DllCall("Shell32\SHAppBarMessage", "UInt", 10 ; ABM_SETSTATE
                                    , "Ptr", &APPBARDATA)
   KeyWait, % A_ThisHotkey
   Return

;Press ctrl+Alt+D to hide or unhide desktop icons
^!d::
ControlGet, HWND, Hwnd,, SysListView321, ahk_class Progman
If HWND =
ControlGet, HWND, Hwnd,, SysListView321, ahk_class WorkerW
If DllCall("IsWindowVisible", UInt, HWND)
WinHide, ahk_id %HWND%
Else
WinShow, ahk_id %HWND%
Return


;alt+n最小化窗口
!n:: WinMinimize, A

;关闭窗口
!w::send !{F4}

;ctrl+alt+enter 当前窗口置顶/取消置顶
^!enter::
    WinGet ow, id, A
    WinTopToggle(ow)
    return
WinTopToggle(w) {
 
    WinGetTitle, oTitle, ahk_id %w%
    Winset, AlwaysOnTop, Toggle, ahk_id %w%
    WinGet, ExStyle, ExStyle, ahk_id %w%
    if (ExStyle & 0x8)  ; 0x8 为 WS_EX_TOPMOST.在WinGet的帮助中
        oTop = 置顶
    else
        oTop = 取消置顶
    tooltip %oTitle% %oTop%
    SetTimer, RemoveToolTip, 5000
    return
 
    RemoveToolTip:
    SetTimer, RemoveToolTip, Off
    ToolTip
    return
}

; 清空回收站win+del
#Del::FileRecycleEmpty ; win + del
return

;媒体键映射
!PgUp::Send {Media_Prev}
!Pause::Send {Media_Play_Pause}
!PgDn::Send {Media_Next}
!End::Send {Volume_Down}
!Home::Send {Volume_Up}

;虚拟桌面切换
^#Tab::^#right
^#CapsLock::^#left
^#w::^#F4

;Esc改建
CapsLock::Esc
+CapsLock::CapsLock
return