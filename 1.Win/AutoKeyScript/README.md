官网下载：[AutoKey]([AutoHotkey](https://www.autohotkey.com/))

手册：        [初学向导]([AutoHotkey 初学者向导 | AutoHotkey (wyagd001.github.io)](https://wyagd001.github.io/zh-cn/docs/Tutorial.htm))

## 1、定义热键时可以使用的修饰符：

<table align="center" border="1" cellpadding="1" cellspacing="1" style="width:600px">
	<tbody>
		<tr>
			<th>符号</th>
			<th>说明</th>
		</tr>
		<tr>
			<td><strong>#</strong></td>
			<td>Win (Windows 徽标键).</td>
		</tr>
		<tr>
			<td><strong>!</strong></td>
			<td>Alt键</td>
		</tr>
		<tr>
			<td><strong>^</strong></td>
			<td>Control键</td>
		</tr>
		<tr>
			<td><strong>+</strong></td>
			<td>Shift键</td>
		</tr>
		<tr>
			<td><strong>&amp;</strong></td>
			<td>和符号可以用来组合任意两个按键或鼠标按钮, 让它们成为自定义热键.&nbsp;</td>
		</tr>
		<tr>
			<td><strong>&lt;</strong></td>
			<td>使用成对按键中左边的那个. 例如 &lt;!a 相当于 !a, 只是使用左边的 Alt 键才可以触发.</td>
		</tr>
		<tr>
			<td><strong>&gt;</strong></td>
			<td>使用成对按键中右边的那个.</td>
		</tr>
		<tr>
			<td><strong>*</strong></td>
			<td>
			通配符: 即使附加的修饰键被按住也能激发热键. 这常与重映射按键或按钮组合使用. 例如：
			*#c::Run Calc.exe  <em>; Win+C、Shift+Win+C、Ctrl+Win+C 等都会触发此热键。</em>
*ScrollLock::Run Notepad  <em>; 即使在按住其他修饰键时按下 ScrollLock 也会触发此热键。
			</td>
		</tr>
		<tr>
			<td><strong>~</strong></td>
			<td>
			激发热键时，不会屏蔽（被操作系统隐藏）热键中按键原有的功能。
​			</td>
​		</tr>
​		<tr>
​			<td><strong>$</strong></td>
​			<td>
​			<p>通常只在脚本使用&nbsp;Send&nbsp;命令发送包含了热键自身的按键时才需要使用此符号, 此时可以避免触发它自己。</p>
​			</td>
​		</tr>
​	</tbody>
</table>
## 2、键盘鼠标映射关系：

<table align="center" border="1" cellpadding="1" cellspacing="1" style="width:600px">
	<tbody>
		<tr>
			<th>鼠标</th>
			<th>&nbsp;</th>
		</tr>
		<tr>
			<td>LButton</td>
			<td>鼠标左键</td>
		</tr>
		<tr>
			<td>RButton</td>
			<td>鼠标右键</td>
		</tr>
		<tr>
			<td>MButton</td>
			<td>鼠标中键或滚轮</td>
		</tr>
		<tr>
			<th>高级</th>
			<th>&nbsp;</th>
		</tr>
		<tr>
			<td>XButton1</td>
			<td>鼠标的第四个按钮。一般和 Browser_Back 执行相同功能。</td>
		</tr>
		<tr>
			<td>XButton2</td>
			<td>鼠标的第五个按钮。一般和 Browser_Forward 执行相同功能。</td>
		</tr>
		<tr>
			<th>Wheel</th>
			<th>&nbsp;</th>
		</tr>
		<tr>
			<td>WheelDown</td>
			<td>向下转动鼠标滚轮（向您的方向）。</td>
		</tr>
		<tr>
			<td>WheelUp</td>
			<td>向上转动鼠标滚轮（远离您的方向）。</td>
		</tr>
	</tbody>
</table>

-------------

<table align="center" border="1" cellpadding="1" cellspacing="1" style="width:600px">
	<tbody>
		<tr>
			<th>键盘</th>
			<th>&nbsp;</th>
		</tr>
		<tr>
			<td>CapsLock</td>
			<td>大小写锁定键</td>
		</tr>
		<tr>
			<td>Space</td>
			<td>空格键</td>
		</tr>
		<tr>
			<td>Tab</td>
			<td>Tab 键</td>
		</tr>
		<tr>
			<td>Enter (或 Return)</td>
			<td>回车键</td>
		</tr>
		<tr>
			<td>Escape (或 Esc)</td>
			<td>退出键</td>
		</tr>
		<tr>
			<td>Backspace (或 BS)</td>
			<td>退格键</td>
		</tr>
		<tr>
			<th>光标控制</th>
			<th>&nbsp;</th>
		</tr>
		<tr>
			<td>ScrollLock</td>
			<td>滚动锁定键</td>
		</tr>
		<tr>
			<td>Delete (或 Del)</td>
			<td>删除键</td>
		</tr>
		<tr>
			<td>Insert (或 Ins)</td>
			<td>插入改写切换键</td>
		</tr>
		<tr>
			<td>Home</td>
			<td>Home 键</td>
		</tr>
		<tr>
			<td>End</td>
			<td>End 键</td>
		</tr>
		<tr>
			<td>PgUp</td>
			<td>向上翻页键</td>
		</tr>
		<tr>
			<td>PgDn</td>
			<td>向下翻页键</td>
		</tr>
		<tr>
			<td>Up</td>
			<td>向上方向键</td>
		</tr>
		<tr>
			<td>Down</td>
			<td>向下方向键</td>
		</tr>
		<tr>
			<td>Left</td>
			<td>向左方向键</td>
		</tr>
		<tr>
			<td>Right</td>
			<td>向右方向键</td>
		</tr>
		<tr>
			<th>Numpad</th>
			<th>&nbsp;</th>
		</tr>
		<tr>
			<td><strong>NumLock 开启</strong></td>
			<td>
			<table>
				<tbody>
					<tr>
						<td><strong>NumLock 关闭</strong></td>
						<td>&nbsp;</td>
					</tr>
				</tbody>
			</table>
			</td>
		</tr>
		<tr>
			<td>Numpad0</td>
			<td>
			<table>
				<tbody>
					<tr>
						<td>NumpadIns</td>
						<td>0 / 插入改写切换键</td>
					</tr>
				</tbody>
			</table>
			</td>
		</tr>
		<tr>
			<td>Numpad1</td>
			<td>
			<table>
				<tbody>
					<tr>
						<td>NumpadEnd</td>
						<td>1 / End 键</td>
					</tr>
				</tbody>
			</table>
			</td>
		</tr>
		<tr>
			<td>Numpad2</td>
			<td>
			<table>
				<tbody>
					<tr>
						<td>NumpadDown</td>
						<td>2 / 向下方向键</td>
					</tr>
				</tbody>
			</table>
			</td>
		</tr>
		<tr>
			<td>Numpad3</td>
			<td>
			<table>
				<tbody>
					<tr>
						<td>NumpadPgDn</td>
						<td>3 / 向下翻页键</td>
					</tr>
				</tbody>
			</table>
			</td>
		</tr>
		<tr>
			<td>Numpad4</td>
			<td>
			<table>
				<tbody>
					<tr>
						<td>NumpadLeft</td>
						<td>4 / 向左方向键</td>
					</tr>
				</tbody>
			</table>
			</td>
		</tr>
		<tr>
			<td>Numpad5</td>
			<td>
			<table>
				<tbody>
					<tr>
						<td>NumpadClear</td>
						<td>5 / 通常什么都不做</td>
					</tr>
				</tbody>
			</table>
			</td>
		</tr>
		<tr>
			<td>Numpad6</td>
			<td>
			<table>
				<tbody>
					<tr>
						<td>NumpadRight</td>
						<td>6 / 向右方向键</td>
					</tr>
				</tbody>
			</table>
			</td>
		</tr>
		<tr>
			<td>Numpad7</td>
			<td>
			<table>
				<tbody>
					<tr>
						<td>NumpadHome</td>
						<td>7 / Home 键</td>
					</tr>
				</tbody>
			</table>
			</td>
		</tr>
		<tr>
			<td>Numpad8</td>
			<td>
			<table>
				<tbody>
					<tr>
						<td>NumpadUp</td>
						<td>8 / 向上方向键</td>
					</tr>
				</tbody>
			</table>
			</td>
		</tr>
		<tr>
			<td>Numpad9</td>
			<td>
			<table>
				<tbody>
					<tr>
						<td>NumpadPgUp</td>
						<td>9 / 向上翻页键</td>
					</tr>
				</tbody>
			</table>
			</td>
		</tr>
		<tr>
			<td>NumpadDot</td>
			<td>
			<table>
				<tbody>
					<tr>
						<td>NumpadDel</td>
						<td>十进制分隔符 / 删除键</td>
					</tr>
				</tbody>
			</table>
			</td>
		</tr>
		<tr>
			<td>NumpadDiv</td>
			<td>
			<table>
				<tbody>
					<tr>
						<td>NumpadDiv</td>
						<td>除</td>
					</tr>
				</tbody>
			</table>
			</td>
		</tr>
		<tr>
			<td>NumpadMult</td>
			<td>
			<table>
				<tbody>
					<tr>
						<td>NumpadMult</td>
						<td>乘</td>
					</tr>
				</tbody>
			</table>
			</td>
		</tr>
		<tr>
			<td>NumpadAdd</td>
			<td>
			<table>
				<tbody>
					<tr>
						<td>NumpadAdd</td>
						<td>加</td>
					</tr>
				</tbody>
			</table>
			</td>
		</tr>
		<tr>
			<td>NumpadSub</td>
			<td>
			<table>
				<tbody>
					<tr>
						<td>NumpadSub</td>
						<td>减</td>
					</tr>
				</tbody>
			</table>
			</td>
		</tr>
		<tr>
			<td>NumpadEnter</td>
			<td>
			<table>
				<tbody>
					<tr>
						<td>NumpadEnter</td>
						<td>回车键</td>
					</tr>
				</tbody>
			</table>
			</td>
		</tr>
		<tr>
			<th>功能</th>
			<th>&nbsp;</th>
		</tr>
		<tr>
			<td>F1 - F24</td>
			<td>在大多数键盘顶部的 12 个或更多的功能键。</td>
		</tr>
		<tr>
			<th>按键修饰符</th>
			<th>&nbsp;</th>
		</tr>
		<tr>
			<td>LWin</td>
			<td>左边的 Windows 徽标键。对应的热键前缀为&nbsp;<code>&lt;#</code>。</td>
		</tr>
		<tr>
			<td>RWin</td>
			<td>右边的 Windows 徽标键。对应的热键前缀为&nbsp;<code>&gt;#</code>。</td>
		</tr>
		<tr>
			<td>Control (或 Ctrl)</td>
			<td>Control 键。单独作为热键（<code>Control::</code>）时它在弹起时触发。对应的热键前缀为&nbsp;<code>^</code>。</td>
		</tr>
		<tr>
			<td>Alt</td>
			<td>Alt 键。单独作为热键（<code>Alt::</code>）时它在弹起时触发。对应的热键前缀为&nbsp;<code>!</code>。</td>
		</tr>
		<tr>
			<td>Shift</td>
			<td>Shift 键。单独作为热键（<code>Shift::</code>）时它在弹起时触发。对应的热键前缀为&nbsp;<code>+</code>。</td>
		</tr>
		<tr>
			<td>LControl（或 LCtrl）</td>
			<td>左 Control 键。对应的热键前缀为&nbsp;<code>&lt;^</code>。</td>
		</tr>
		<tr>
			<td>RControl（或 RCtrl）</td>
			<td>右 Control 键。对应的热键前缀为&nbsp;<code>&gt;^</code>。</td>
		</tr>
		<tr>
			<td>LShift</td>
			<td>左 Shift 键。对应的热键前缀为&nbsp;<code>&lt;+</code>。</td>
		</tr>
		<tr>
			<td>RShift</td>
			<td>右 Shift 键。对应的热键前缀为&nbsp;<code>&gt;+</code>。</td>
		</tr>
		<tr>
			<td>LAlt</td>
			<td>左 Alt 键。对应的热键前缀为&nbsp;<code>&lt;!</code>。</td>
		</tr>
		<tr>
			<td>RAlt</td>
			<td>右 Alt 键。对应的热键前缀为&nbsp;<code>&gt;!</code>。</td>
		</tr>
		<tr>
			<th>多媒体</th>
			<th>&nbsp;</th>
		</tr>
		<tr>
			<td>Browser_Back</td>
			<td>后退</td>
		</tr>
		<tr>
			<td>Browser_Forward</td>
			<td>前进</td>
		</tr>
		<tr>
			<td>Browser_Refresh</td>
			<td>刷新</td>
		</tr>
		<tr>
			<td>Browser_Stop</td>
			<td>停止</td>
		</tr>
		<tr>
			<td>Browser_Search</td>
			<td>搜索</td>
		</tr>
		<tr>
			<td>Browser_Favorites</td>
			<td>收藏夹</td>
		</tr>
		<tr>
			<td>Browser_Home</td>
			<td>主页</td>
		</tr>
		<tr>
			<td>Volume_Mute</td>
			<td>静音</td>
		</tr>
		<tr>
			<td>Volume_Down</td>
			<td>调低音量</td>
		</tr>
		<tr>
			<td>Volume_Up</td>
			<td>增加音量</td>
		</tr>
		<tr>
			<td>Media_Next</td>
			<td>下一首</td>
		</tr>
		<tr>
			<td>Media_Prev</td>
			<td>上一首</td>
		</tr>
		<tr>
			<td>Media_Stop</td>
			<td>停止</td>
		</tr>
		<tr>
			<td>Media_Play_Pause</td>
			<td>Play/Pause</td>
		</tr>
		<tr>
			<td>Launch_Mail</td>
			<td>打开默认的电子邮件程序</td>
		</tr>
		<tr>
			<td>Launch_Media</td>
			<td>打开默认的媒体播放器</td>
		</tr>
		<tr>
			<td>Launch_App1</td>
			<td>打开我的电脑</td>
		</tr>
		<tr>
			<td>Launch_App2</td>
			<td>打开计算器</td>
		</tr>
		<tr>
			<th>特别</th>
			<th>&nbsp;</th>
		</tr>
		<tr>
			<td>AppsKey</td>
			<td>菜单键。这是调用右键上下文菜单的按键。</td>
		</tr>
		<tr>
			<td>PrintScreen</td>
			<td>捕获屏幕</td>
		</tr>
		<tr>
			<td>CtrlBreak</td>
			<td>&nbsp;</td>
		</tr>
		<tr>
			<td>暂停</td>
			<td>暂停键</td>
		</tr>
		<tr>
			<td>中断</td>
			<td>中断键。由于此键和 Pause 含义相同，所以在热键中请使用&nbsp;<code>^CtrlBreak</code>&nbsp;代替&nbsp;<code>^Pause</code>&nbsp;或&nbsp;<code>^Break</code>。</td>
		</tr>
		<tr>
			<td>帮助</td>
			<td>帮助键。此键可能在大多数键盘上不存在。它通常和 F1 不同.</td>
		</tr>
		<tr>
			<td>Sleep</td>
			<td>休眠键。注意在一些键盘上的 sleep 键可能不是休眠功能。</td>
		</tr>
	</tbody>
</table>

**Tips：更多功能查看手册或者访问：**

([AutoHotkey教程-月光博客](https://www.williamlong.info/archives/6443.html))
