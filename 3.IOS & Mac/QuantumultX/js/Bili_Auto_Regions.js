/**************************

原脚本地址：https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/Bili_Auto_Regions.js
改动：去除正确执行时的脚本通知（太烦了）

哔哩哔哩, 港澳台番剧自动切换地区 & 显示豆瓣评分

如需禁用豆瓣评分或策略通知, 可前往BoxJs设置.
BoxJs订阅地址: https://raw.githubusercontent.com/NobyDa/Script/master/NobyDa_BoxJs.json

Update: 2022.01.26
Author: @NobyDa
Use: Surge, QuanX, Loon

****************************
港澳台自动切换地区说明 :
****************************

地区自动切换功能仅适用于Surge4.7+(iOS)，Loon2.1.10(286)+，QuanX1.0.22(543)+
低于以上版本仅显示豆瓣评分.

您需要配置相关规则集:
Surge、Loon: 
https://raw.githubusercontent.com/DivineEngine/Profiles/master/Surge/Ruleset/StreamingMedia/StreamingSE.list

QuanX: 
https://raw.githubusercontent.com/DivineEngine/Profiles/master/Quantumult/Filter/StreamingMedia/StreamingSE.list

绑定相关select或static策略组，并且需要具有相关的区域代理服务器纳入您的子策略中，子策略可以是服务器也可以是其他区域策略组．
最后，您可以通过BoxJs设置策略名和子策略名，或者手动填入脚本.

如需搜索指定地区番剧, 可在搜索框添加后缀" 港", " 台", " 中". 例如: 进击的巨人 港

QX用户注: 使用切换地区功能请确保您的QX=>其他设置=>温和策略机制处于关闭状态, 以及填写策略名和子策略名时注意大小写.

****************************
Surge 4.7+ 远程脚本配置 :
****************************
[Script]
Bili Region = type=http-response,pattern=^https:\/\/ap(p|i)\.bili(bili|api)\.(com|net)\/(pgc\/view\/v\d\/app\/season|x\/v\d\/search\/defaultwords)\?access_key,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/Bili_Auto_Regions.js

#可选, 适用于搜索指定地区的番剧
Bili Search = type=http-request,pattern=^https:\/\/ap(p|i)\.bili(bili|api)\.(com|net)\/x\/v\d\/search(\/type)?\?.+?%20(%E6%B8%AF|%E5%8F%B0|%E4%B8%AD)&,script-path=https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/Bili_Auto_Regions.js

[MITM]
hostname = ap?.bilibili.com, ap?.biliapi.net

****************************
Quantumult X 远程脚本配置 :
****************************
[rewrite_local]
^https:\/\/ap(p|i)\.bili(bili|api)\.(com|net)\/(pgc\/view\/v\d\/app\/season|x\/v\d\/search\/defaultwords)\?access_key url script-response-body https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/Bili_Auto_Regions.js

#可选, 适用于搜索指定地区的番剧
^https:\/\/ap(p|i)\.bili(bili|api)\.(com|net)\/x\/v\d\/search(\/type)?\?.+?%20(%E6%B8%AF|%E5%8F%B0|%E4%B8%AD)& url script-request-header https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/Bili_Auto_Regions.js

[mitm]
hostname = ap?.bilibili.com, ap?.biliapi.net

[filter_local]
#可选, 由于qx纯tun特性, 不添加规则可能会导致脚本失效.
ip-cidr, 203.107.1.1/24, reject

****************************
Loon 远程脚本配置 :
****************************
[Script]
http-response ^https:\/\/ap(p|i)\.bili(bili|api)\.(com|net)\/(pgc\/view\/v\d\/app\/season|x\/v\d\/search\/defaultwords)\?access_key script-path=https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/Bili_Auto_Regions.js, requires-body=true, tag=bili自动地区

#可选, 适用于搜索指定地区的番剧
http-request ^https:\/\/ap(p|i)\.bili(bili|api)\.(com|net)\/x\/v\d\/search(\/type)?\?.+?%20(%E6%B8%AF|%E5%8F%B0|%E4%B8%AD)& script-path=https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/Bili_Auto_Regions.js, requires-body=true, tag=bili自动地区(搜索)

[Mitm]
hostname = ap?.bilibili.com, ap?.biliapi.net

***************************/

let $ = nobyda();
let run = EnvInfo();

async function SwitchRegion(play) {
	const Group = $.read('BiliArea_Policy') || 'Bilibili'; //Your blibli policy group name.
	const CN = $.read('BiliArea_CN') || 'Mainland'; //Your China sub-policy name.
	const TW = $.read('BiliArea_TW') || 'TW'; //Your Taiwan sub-policy name.
	const HK = $.read('BiliArea_HK') || 'HK'; //Your HongKong sub-policy name.
	const DF = $.read('BiliArea_DF') || 'HK'; //Sub-policy name used after region is blocked(e.g. url 404)
	const off = $.read('BiliArea_disabled') || ''; //WiFi blacklist(disable region change), separated by commas.
	const current = await $.getPolicy(Group);
	const area = (() => {
		let select;
		if (/\u50c5[\u4e00-\u9fa5]+\u6e2f|%20%E6%B8%AF&/.test(play)) {
			const test = /\u50c5[\u4e00-\u9fa5]+\u53f0/.test(play);
			if (current != HK && (current == TW && test ? 0 : 1)) select = HK;
		} else if (/\u50c5[\u4e00-\u9fa5]+\u53f0|%20%E5%8F%B0&/.test(play)) {
			if (current != TW) select = TW;
		} else if (play === -404) {
			if (current != DF) select = DF;
		} else if (current != CN) {
			select = CN;
		}
		if ($.isQuanX && current === 'direct' && select === 'DIRECT') {
			select = null; //avoid loops in some cases
		}
		return select;
	})()

	if (area && !off.includes($.ssid || undefined)) {
		const change = await $.setPolicy(Group, area);
		const notify = $.read('BiliAreaNotify') === 'true';
		const msg = SwitchStatus(change, current, area);
		if (!notify) {
			$.notify((/^(http|-404)/.test(play) || !play) ? `` : play, ``, msg);
		} else {
			console.log(`${(/^(http|-404)/.test(play)||!play)?``:play}\n${msg}`);
		}
		if (change) {
			return true;
		}
	}
	return false;
}

function SwitchStatus(status, original, newPolicy) {
	if (status && typeof original !== 'number') {
		return 
	} else if (original === 2) {
		return `切换失败, 策略组名未填写或填写有误 ⚠️`
	} else if (original === 3) {
		return `切换失败, 不支持您的VPN应用版本 ⚠️`
	} else if (status === 0) {
		return `切换失败, 子策略名未填写或填写有误 ⚠️`
	} else {
		return `策略切换失败, 未知错误 ⚠️`
	}
}

function EnvInfo() {
	if (typeof($response) !== 'undefined') {
		const raw = JSON.parse($response.body);
		const data = raw.data || raw.result || {};
		SwitchRegion(data.title || (raw.code === -404 ? -404 : null))
			.then(s => s ? $done({
				status: $.isQuanX ? "HTTP/1.1 408 Request Timeout" : 408,
				headers: {
					Connection: "close"
				},
				body: "{}"
			}) : QueryRating(raw, data));
	} else {
		const raw = $request.url;
		const res = {
			url: raw.replace(/%20(%E6%B8%AF|%E5%8F%B0|%E4%B8%AD)&/g, '&')
		};
		SwitchRegion(raw).then(() => $done(res));
	}
}

async function QueryRating(body, play) {
	try {
		const ratingEnabled = $.read('BiliDoubanRating') === 'false';
		if (!ratingEnabled && play.title && body.data && body.data.badge_info) {
			const [t1, t2] = await Promise.all([
				GetRawInfo(play.title),
				GetRawInfo(play.origin_name)
			]);
			const exYear = body.data.publish.release_date_show.split(/^(\d{4})/)[1];
			const info1 = (play.staff && play.staff.info) || '';
			const info2 = (play.actor && play.actor.info) || '';
			const info3 = (play.celebrity && play.celebrity.map(n => n.name).join('/')) || '';
			const filterInfo = [play.title, play.origin_name, info1 + info2 + info3, exYear];
			const [rating, folk, name, id, other] = ExtractMovieInfo([...t1, ...t2], filterInfo);
			const limit = JSON.stringify(body.data.modules)
				.replace(/"\u53d7\u9650"/g, `""`).replace(/("area_limit":)1/g, '$10');
			body.data.modules = JSON.parse(limit);
			body.data.detail = body.data.new_ep.desc.replace(/连载中,/, '');
			body.data.badge_info.text = `⭐️ 豆瓣：${!$.is403?`${rating||'无评'}分 (${folk||'无评价'})`:`查询频繁！`}`;
			body.data.evaluate = `${body.data.evaluate||''}\n\n豆瓣评分搜索结果: ${JSON.stringify(other,0,1)}`;
			body.data.new_ep.desc = name;
			body.data.styles.unshift({
				name: "⭐️ 点击此处打开豆瓣剧集详情页",
				url: `https://m.douban.com/${id?`movie/subject/${id}/`:`search/?query=${encodeURI(play.title)}`}`
			});
		}
	} catch (err) {
		console.log(`Douban rating: \n${err}\n`);
	} finally {
		$done({
			body: JSON.stringify(body)
		});
	}
}

function ExtractMovieInfo(ret, fv) {
	const sole = new Set(ret.map(s => JSON.stringify(s))); //delete duplicate
	const f1 = [...sole].map(p => JSON.parse(p))
		.filter(t => {
			t.accuracy = 0;
			if (t.name && fv[0]) { //title
				if (t.name.includes(fv[0].slice(0, 4))) t.accuracy++;
				if (t.name.includes(fv[0].slice(-3))) t.accuracy++;
			}
			if (t.origin && fv[1]) { //origin title
				if (t.origin.includes(fv[1].slice(0, 4))) t.accuracy++;
				if (t.origin.includes(fv[1].slice(-3))) t.accuracy++;
			}
			if (t.pd && fv[2]) { //producer or actor
				const len = t.pd.split('/').filter(c => fv[2].includes(c));
				t.accuracy += len.length;
			}
			if (t.year && fv[3] && t.year == fv[3]) t.accuracy++; //year
			return Boolean(t.accuracy);
		});
	let x = {}; //assign most similar
	const f2 = f1.reduce((p, c) => c.accuracy > p ? (x = c, c.accuracy) : p, 0);
	return [x.rating, x.folk, x.name, x.id, f1];
}

function GetRawInfo(t) {
	let res = [];
	let st = Date.now();
	return new Promise((resolve) => {
		if (!t) return resolve(res);
		$.get({
			url: `https://www.douban.com/search?cat=1002&q=${encodeURIComponent(t)}`,
			headers: {
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15',
				'Cookie': JSON.stringify(st)
			}
		}, (error, resp, data) => {
			if (error) {
				console.log(`Douban rating: \n${t}\nRequest error: ${error}\n`);
			} else {
				if (/\u767b\u5f55<\/a>\u540e\u91cd\u8bd5\u3002/.test(data)) $.is403 = true;
				let s = data.replace(/\n| |&#\d{2}/g, '')
					.match(/\[\u7535\u5f71\].+?subject-cast\">.+?<\/span>/g) || [];
				for (let i = 0; i < s.length; i++) {
					res.push({
						name: s[i].split(/\}\)">(.+?)<\/a>/)[1],
						origin: s[i].split(/\u540d:(.+?)(\/|<)/)[1],
						pd: s[i].split(/\u539f\u540d.+?\/(.+?)\/\d+<\/span>$/)[1],
						rating: s[i].split(/">(\d\.\d)</)[1],
						folk: s[i].split(/(\d+\u4eba\u8bc4\u4ef7)/)[1],
						id: s[i].split(/sid:(\d+)/)[1],
						year: s[i].split(/(\d+)<\/span>$/)[1]
					})
				}
				let et = ((Date.now() - st) / 1000).toFixed(2);
				console.log(`Douban rating: \n${t}\n${res.length} movie info searched. (${et} s)\n`);
			}
			resolve(res);
		})
	})
}

function nobyda() {
	const isHTTP = typeof $httpClient != "undefined";
	const isLoon = typeof $loon != "undefined";
	const isQuanX = typeof $task != "undefined";
	const isSurge = typeof $network != "undefined" && typeof $script != "undefined";
	const ssid = (() => {
		if (isQuanX && typeof($environment) !== 'undefined') {
			return $environment.ssid;
		}
		if (isSurge && $network.wifi) {
			return $network.wifi.ssid;
		}
		if (isLoon) {
			return JSON.parse($config.getConfig()).ssid;
		}
	})();
	const notify = (title, subtitle, message) => {
		console.log(`${title}\n${subtitle}\n${message}`);
		if (isQuanX) $notify(title, subtitle, message);
		if (isHTTP) $notification.post(title, subtitle, message);
	}
	const read = (key) => {
		if (isQuanX) return $prefs.valueForKey(key);
		if (isHTTP) return $persistentStore.read(key);
	}
	const adapterStatus = (response) => {
		if (!response) return null;
		if (response.status) {
			response["statusCode"] = response.status;
		} else if (response.statusCode) {
			response["status"] = response.statusCode;
		}
		return response;
	}
	const getPolicy = (groupName) => {
		if (isSurge) {
			if (typeof($httpAPI) === 'undefined') return 3;
			return new Promise((resolve) => {
				$httpAPI("GET", "v1/policy_groups/select", {
					group_name: encodeURIComponent(groupName)
				}, (b) => resolve(b.policy || 2))
			})
		}
		if (isLoon) {
			if (typeof($config.getPolicy) === 'undefined') return 3;
			const getName = $config.getPolicy(groupName);
			return getName || 2;
		}
		if (isQuanX) {
			if (typeof($configuration) === 'undefined') return 3;
			return new Promise((resolve) => {
				$configuration.sendMessage({
					action: "get_policy_state"
				}).then(b => {
					if (b.ret && b.ret[groupName]) {
						resolve(b.ret[groupName][1]);
					} else resolve(2);
				}, () => resolve());
			})
		}
	}
	const setPolicy = (group, policy) => {
		if (isSurge && typeof($httpAPI) !== 'undefined') {
			return new Promise((resolve) => {
				$httpAPI("POST", "v1/policy_groups/select", {
					group_name: group,
					policy: policy
				}, (b) => resolve(!b.error || 0))
			})
		}
		if (isLoon && typeof($config.getPolicy) !== 'undefined') {
			const set = $config.setSelectPolicy(group, policy);
			return set || 0;
		}
		if (isQuanX && typeof($configuration) !== 'undefined') {
			return new Promise((resolve) => {
				$configuration.sendMessage({
					action: "set_policy_state",
					content: {
						[group]: policy
					}
				}).then((b) => resolve(!b.error || 0), () => resolve());
			})
		}
	}
	const get = (options, callback) => {
		if (isQuanX) {
			options["method"] = "GET";
			$task.fetch(options).then(response => {
				callback(null, adapterStatus(response), response.body)
			}, reason => callback(reason.error, null, null))
		}
		if (isHTTP) {
			if (isSurge) options.headers['X-Surge-Skip-Scripting'] = false;
			$httpClient.get(options, (error, response, body) => {
				callback(error, adapterStatus(response), body)
			})
		}
	}
	return {
		getPolicy,
		setPolicy,
		isSurge,
		isQuanX,
		isLoon,
		notify,
		read,
		ssid,
		get
	}
}
