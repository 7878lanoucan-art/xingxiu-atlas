# 二十八星宿 云上图鉴

星宿国风卡牌网页，包含四象分类、搜索、卡牌详情、动态星空、光球及反光交互。

## GitHub Pages

网站静态文件位于 `dist/`，可直接部署，无需在线安装依赖。资源使用相对路径，兼容项目子目录。

首次部署时，在仓库 Settings → Pages → Build and deployment → Source 中选择 GitHub Actions。
之后推送到 main 分支即可自动部署，也可从 Actions 手动运行 Deploy star atlas to GitHub Pages。

## 本地浏览

直接打开 `dist/index.html`。

## 编辑组件

组件源文件位于 `src/`；修改后运行 `node build-effects.mjs`，将生成的 dist/effects.js 与 dist/effects.css 一起提交。

React Bits 授权说明见 `dist/LICENSE.react-bits.md`。插画与文字来自用户提供资料；本仓库未声明这些素材可供第三方再分发。
