# 参与 Solid Glass

[English](CONTRIBUTING.md)

欢迎。这份文件只写这个仓库特有的规矩 —— 通用的开源礼仪就不重复了。彼此如何相处，见[行为准则](CODE_OF_CONDUCT.zh-CN.md)。

## 分支与合并流程

| 分支 | 是什么 |
|---|---|
| `main` | 已发布的版本。[deeplethe.github.io/solid-glass](https://deeplethe.github.io/solid-glass) 上的站点和注册表由它构建。只由仓库管理者从 `dev` 合入 |
| `dev` | 集成分支，所有贡献先到这里 |

贡献者的路径：

```bash
git switch dev && git pull
git switch -c fix/some-thing        # 从 dev 开新分支，不要从 main
# 改代码，提交时带 -s（见下面 DCO）
git push -u origin fix/some-thing
```

然后开 PR，**base 选 `dev`，不是 `main`**。CI 通过、review 通过之后由维护者合并。

`dev → main` 的合并由仓库管理者择期发起，贡献者不需要管。有两条规矩防止两条分支越走越远，都是给管理者的：

- **发版之后紧接着把 `main` 回合进 `dev`。** `dev → main` 那个 merge 节点只存在于 `main`，不回合的话 `main` 会显示成领先，尽管两边文件一模一样，而且每发一版就多领先一个。
- **紧急修复也走 `dev`。** 直接对 `main` 开 PR 是唯一会让两条分支真正分叉的口子，分叉之后就得有人手工对账。

合进 `main` 就是发版：站点会重新构建，`shadcn add` 读取的注册表对所有人同时生效。在此之前，用户看不到任何改动。

两条分支都受保护：必须走 PR、CI（`web`）必须通过、禁止强推、禁止删除，管理员也不例外。

## 先开 issue，还是直接开 PR

| 改动 | 怎么做 |
|---|---|
| 修 bug、主题漏掉的组件、文档、示例 | 直接开 PR |
| 新组件或新区块、新增依赖 | 先开 [issue](https://github.com/deeplethe/solid-glass/issues) 说明使用场景 |
| 材质本身（某个变量的含义、四条规则、某种状态的样子）、注册表的地址或条目名 | 先在 issue 里讨论，再动代码 |

最后一行是别人的项目所依赖的东西。`src/solid-glass.css` 里的变量改了名，或者注册表里的条目改了名，原本能用的安装就坏了。

## 本地环境

需要 Node 22+ 和 npm。

```bash
npm install
npm run dev         # http://localhost:5191
```

`/dev/examples`（仅开发环境）把所有示例挂在一页上，并列出加载失败的。它接受 `?q=button,card` 只看一部分、`?theme=light`、`?hover=<选择器>` 让匹配的元素呈现悬停状态、`?click=<选择器>` 点开某个东西看它展开后的样子。

## 推送之前

CI 跑的就是这几条。本地绿，CI 就绿：

```bash
npm ci
npm run docs        # 文档和注册表是生成的，类型依赖它们
npm run typecheck
npm run build
```

这里没有单元测试：这个仓库产出的是"看起来怎样"。所以改动靠看来验证，PR 里要写明看了什么：

- `/dev/examples` 显示 `0 failed`。
- 改动涉及的组件，**深色和浅色都看**。深色是这套材质的本来面目；为深色写的规则最容易在浅色下出错。
- 展开状态也要看：菜单、对话框、悬停的行。漏掉的问题大多只有展开后才看得见。

## review 一定会打回的

**不能有平涂的色块。** 每个表面都在边缘收口：顶边一道亮线、一圈细边、离开页面处有投影。只是一块纯色的组件不算做完。四条规则在 [Material](https://deeplethe.github.io/solid-glass/docs/material) 页上，改动要对得上它们。

**样式表负责换装，不要求改组件。** `src/solid-glass.css` 靠 shadcn/ui 组件自带的 `data-slot` 和类名找到每个部件。一个要改 `src/components/ui/` 里的文件才生效的修复，对安装了原版组件的人毫无用处。在样式表里修，并且用 shadcn/ui 的原版组件验证。

**亮线画在边框以内。** 内阴影位于边框内侧。保留边框的元素，边框就是那圈细边、四周同一种颜色，亮线是紧贴其内的内阴影。把边框的顶边调亮会在圆角处断开；内侧的线和外侧的环之间夹着一条边框，会读成第二道边。两种写法都上过线，也都撤回过。

**没有自己的颜色。** 玻璃是中性灰。色相留给它要表达的东西：状态、失败的步骤、图表里的一个系列。会染上背后颜色的面板是液态玻璃，不是这一种。

**只有一种状态。** 悬停、选中、展开都用同一小片透明玻璃。要新增一种表示"就是这个"的方式，得有理由。

**Solid Glass 自己的组件要成套提交。** `src/components/ui/<name>.tsx` 按 shadcn/ui 组件的写法（函数组件、每个部件带 `data-slot`、用 `cn()`），`src/examples/` 里至少一个示例，`content/solid/` 里有它的页面。注册表由这三样生成。

**区块必须能在干净的项目里跑起来。** Solid Glass 自己的区块是 `src/blocks/` 顶层的单个文件，会发布到注册表。它们只引用注册表或 shadcn/ui 能装上的东西，数据都是虚构的：不出现真实的人名、产品或地址。

**图片改了就换文件名。** GitHub 按文件给 README 的图片一个固定地址，浏览器会缓存；`banner-5.webp` 要变成 `banner-6.webp`，README 指向新的。图片用 WebP。

**注释解释为什么。** 这个仓库注释写得密，并且特意记下踩过的坑（"浅色底上的白色亮线看不见"）。照这个来。复述代码在做什么的注释会被要求删掉。

**提交信息：一句英文，说明动机。** 翻一下 `git log` 找语感。

**每个 workflow 自己声明 `permissions:`。** 只做构建的用 `contents: read`。

## 来自 shadcn/ui 的部分

`src/components/ui/` 里的原版组件、`src/examples/` 里的示例、`content/components/` 里的页面、`src/create/cards/` 里的预览卡片、`src/blocks/` 下各文件夹里的区块都来自 shadcn/ui，采用 MIT 许可；[NOTICE.md](NOTICE.md) 写明了是哪些、取自哪个提交。对它们本身的改进应该提给上游 [shadcn-ui/ui](https://github.com/shadcn-ui/ui)。这里的改动只为材质服务。

## DCO：每条提交都要签名

我们用 [DCO](https://developercertificate.org/)，不用 CLA。代码的版权仍然归你；你是在声明自己有权以 MIT 许可提交它。

提交时带 `-s`，git 会替你加上这一行：

```bash
git commit -s -m "Fix the thing"
```

它会追加：

```
Signed-off-by: Your Name <your@email>
```

忘了？最后一条用 `git commit --amend -s`，多条用 `git rebase --signoff HEAD~3`（数字按实际调整），然后 `git push -f`。

请使用一个你会回应的固定身份 —— 有历史记录的 GitHub 账号就算 —— 以及一个能联系到你的地址；绑定在该账号上的 noreply 地址也可以。不接受匿名或一次性的贡献。

## 许可

参与贡献即表示你同意自己的作品以 [MIT 许可](LICENSE)发布。
