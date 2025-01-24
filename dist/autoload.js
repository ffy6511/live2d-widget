// live2d_path 参数建议使用绝对路径
const live2d_path = "https://fastly.jsdelivr.net/gh/ffy6511/live2d-widget@v1.1.4/dist/";
//const live2d_path = "http://127.0.0.1:8080/dist/";

// 封装异步加载资源的方法
function loadExternalResource(url, type) {
	return new Promise((resolve, reject) => {
		let tag;

		if (type === "css") {
			tag = document.createElement("link");
			tag.rel = "stylesheet";
			tag.href = url;
		}
		else if (type === "js") {
			tag = document.createElement("script");
			tag.src = url;
		}
		if (tag) {
			tag.onload = () => resolve(url);
			tag.onerror = () => reject(url);
			document.head.appendChild(tag);
		}
	});
}

// 加载 waifu.css live2d.min.js waifu-tips.js
if (screen.width >= 768) {
	Promise.all([
		loadExternalResource(live2d_path + "waifu.css", "css"),
		loadExternalResource(live2d_path + "live2d.min.js", "js")
	]).then(() => {
		// 先加载其他资源，然后再加载 waifu-tips.js
		loadExternalResource(live2d_path + "waifu-tips.js", "js").then(() => {
			// 增加延迟时间，确保 waifu-tips.js 完全加载并执行
			setTimeout(() => {
				if (typeof initWidget === "function") {
					initWidget({
						waifuPath: live2d_path + "waifu-tips.json",
						//apiPath: "https://live2d.fghrsh.net/api/",
						cdnPath: "https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/",
						tools: ["hitokoto", "asteroids", "switch-model", "switch-texture", "photo", "info", "quit"]
					});
				} else {
					console.error("initWidget is not defined, waiting for waifu-tips.js to load...");
				}
			}, 2000); // 增加延迟时间到 2 秒
		});
	}).catch(error => {
		console.error("Failed to load Live2D resources:", error);
	});
}

console.log(`
  く__,.ヘヽ.        /  ,ー､ 〉
           ＼ ', !-─‐-i  /  /´
           ／｀ｰ'       L/／｀ヽ､
         /   ／,   /|   ,   ,       ',
       ｲ   / /-‐/  ｉ  L_ ﾊ ヽ!   i
        ﾚ ﾍ 7ｲ｀ﾄ   ﾚ'ｧ-ﾄ､!ハ|   |
          !,/7 '0'     ´0iソ|    |
          |.从"    _     ,,,, / |./    |
          ﾚ'| i＞.､,,__  _,.イ /   .i   |
            ﾚ'| | / k_７_/ﾚ'ヽ,  ﾊ.  |
              | |/i 〈|/   i  ,.ﾍ |  i  |
             .|/ /  ｉ：    ﾍ!    ＼  |
              kヽ>､ﾊ    _,.ﾍ､    /､!
              !'〈//｀Ｔ´', ＼ ｀'7'ｰr'
              ﾚ'ヽL__|___i,___,ンﾚ|ノ
                  ﾄ-,/  |___./
                  'ｰ'    !_,.:`);
