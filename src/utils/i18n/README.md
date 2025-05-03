# 别看了，这可能是最简单的 React 国际化方案

如果你还在为维护大量的翻译 JSON 文件而发愁，或者被复杂的国际化配置搞得头痛，那你来对地方了。

## 这个方案能帮你解决什么问题？

想象一下，如果你可以：

- 直接在组件里写翻译，就像写普通的 JSX 一样自然
- 再也不用维护一堆分散的翻译文件
- 随时可以在文本中插入变量，就像模板字符串一样方便

听起来不错吧？这就是我们要做的。

## 有什么狠货？

### 1. 集成得不能再简单了

我们用了 React 的 Context API，这意味着：

- 状态管理？全交给 Context 处理
- TypeScript 支持？当然有，而且类型提示超级脑袋
- 集成难度？几行代码搞定

### 2. 使用起来超级直觉

看看这个：

```typescript
t({ zh: "你好，{{name}}", en: "Hello, {{name}}" }, { name: "John" });
```

没错，就是这么简单。不需要记一堆翻译的 key，直接写字符串。

### 3. 还能自动保存用户的语言偏好

用户选了中文？好，我们记住了。下次来还是中文。全自动的，你不用管。

## 怎么实现的？

别怕，就三个文件：

```
📄 types.ts          // 类型定义，让 TypeScript 开心
🌀 I18nContext.tsx    // 状态管理的核心
🌎 LanguageSwitch.tsx // 语言切换按钮
```

### 怎么用？看这里

1、首先拿到工具：

```typescript
const { currentLanguage, setLanguage, t } = useI18n();
```

2、然后就可以直接翻译：

```typescript
// 最简单的用法
t({ zh: "你好", en: "Hello" });

// 需要动态数据？没问题
t(
  {
    zh: "找到 {{count}} 个结果",
    en: "Found {{count}} results",
  },
  { count: 5 }
);
```

没错，就是这么直观。你在哪里需要翻译，就在哪里用 `t` 函数。

## 来点实战吧！

### 在组件里用起来

```typescript
// 先把工具导入进来
import { useI18n } from "../i18n/I18nContext";

function MyComponent() {
  // 拿到翻译函数
  const { t } = useI18n();

  // 直接用！
  return <div>{t({ zh: "标题", en: "Title" })}</div>;
}
```

### 加个语言切换按钮

```typescript
// 这个组件已经帮你做好了，直接用
import LanguageSwitch from "../i18n/LanguageSwitch";

function Layout() {
  return (
    <div>
      <LanguageSwitch />
      {/* 其他内容 */}
    </div>
  );
}
```

### 玩点高级的

比如说，你想在文本里加入一些动态数据：

```typescript
// 用 {{xxx}} 来插入变量，就像模板字符串一样
t(
  {
    zh: "嗨，{{username}}！你有 {{count}} 条未读消息",
    en: "Hi {{username}}! You have {{count}} unread messages",
  },
  {
    username: "John",
    count: 5,
  }
);
```

## 一些小建议

### 1. 保持简单，别玩花样

你可能会想："哈！我可以在这里写一大段文字！" 但是...别这么做。

✅ 好的做法：

- 保持每条翻译简短有力
- 复杂的格式化？写成函数

❌ 不好的做法：

- 在翻译里写小说
- 把所有逻辑都放在翻译里

### 2. 变量名要有意义

✅ 好的变量名：

```typescript
t({ zh: "你好 {{userName}}", en: "Hello {{userName}}" });
```

❌ 不好的变量名：

```typescript
t({ zh: "你好 {{x}}", en: "Hello {{x}}" });
```

### 3. 想添加新语言？很简单

比如说，你想加入日语支持：

```typescript
// types.ts
export type Language = "zh" | "en" | "ja"; // 加上 "ja"

export interface TranslationText {
  zh: string;
  en: string;
  ja: string; // 加上日语
}
```

然后在使用时：

```typescript
t({
  zh: "你好",
  en: "Hello",
  ja: "こんにちは",
});
```

就这么简单！不需要改动其他任何代码。
