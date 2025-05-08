---
pubDatetime: 2022-09-23T15:22:00Z
modDatetime: 2025-03-22T06:25:46.734Z
title: Maintain aspect ratio
slug: aspect-ratio
featured: false
draft: false
tags:
  - javascript
  - aspect-ratio
description:
  Some rules & recommendations for creating or adding new posts using AstroPaper
  theme.
---

# Maintain aspect ratio: Mathematical principles and implementation of image scaling algorithms

In web and application development, we often need to fit content of different sizes(such as image, video or pdf) into fixed size container.

在网页和应用开发中，我们经常需要将不同尺寸的内容（如图片、视频或PDF页面）适配到固定大小的容器中。这就需要一个既能保持原始内容比例，又能最大化利用空间的缩放算法。今天，我们将深入探讨这个看似简单却至关重要的算法原理。

## 问题引入

想象一下这个场景：你正在开发一个图片浏览器，需要在一个 800×600 像素的容器中显示各种不同尺寸的图片。有些图片是横向的(1000×500)，有些是纵向的(500×1000)，还有些是正方形的(800×800)。

问题来了：
- 如何确保图片完全显示在容器内（不裁剪）？
- 如何避免图片变形（保持原始宽高比）？
- 如何最大化利用容器空间（图片尽可能大）？

## "Fit"缩放算法的核心

这个问题的解决方案是一个简单而优雅的算法，只需几行代码：

```javascript
let fitScale;
if (pageWidth / pageHeight > containerWidth / containerHeight) {
    fitScale = containerWidth / pageWidth;
} else {
    fitScale = containerHeight / pageHeight;
}
```

这短短几行代码蕴含着深刻的数学原理，让我们逐步分析。

## 数学原理解析

### 宽高比(Aspect Ratio)

首先，我们需要了解两个关键的宽高比：
- **内容宽高比** = 内容宽度 / 内容高度
- **容器宽高比** = 容器宽度 / 容器高度

宽高比是形状的关键特征。值越大，表示形状越"宽"；值越小，表示形状越"高"。例如：
- 16:9的屏幕，宽高比约为1.78
- 4:3的屏幕，宽高比约为1.33
- 1:1的正方形，宽高比为1.0

### 缩放因子(Scale Factor)

我们可以计算两种可能的缩放因子：
- **宽度缩放因子** = 容器宽度 / 内容宽度
- **高度缩放因子** = 容器高度 / 内容高度

这两个缩放因子分别表示：
- 如果只考虑宽度，内容需要缩放的倍数
- 如果只考虑高度，内容需要缩放的倍数

### 算法的关键决策

算法的核心是一个简单但精妙的判断：

```javascript
if (pageWidth / pageHeight > containerWidth / containerHeight)
```

这个条件比较内容与容器的宽高比：
- 当内容的宽高比 > 容器的宽高比时，意味着**内容相对更宽**
- 当内容的宽高比 ≤ 容器的宽高比时，意味着**内容相对更高**

## 图解算法逻辑

### 场景1：宽内容适应容器

假设我们有一个宽为1000px、高为500px的图片（宽高比为2.0），要放入一个800×600的容器（宽高比约为1.33）中：

1. 内容宽高比(2.0) > 容器宽高比(1.33)，说明内容相对更宽
2. 因此选择宽度缩放因子：`fitScale = 800 / 1000 = 0.8`
3. 应用缩放后，图片尺寸变为：800px × 400px

在这种情况下，图片宽度刚好填满容器，上下会有空白（图片高度只有400px，而容器高600px）。

### 场景2：高内容适应容器

现在假设我们有一个宽为500px、高为1000px的图片（宽高比为0.5），放入同样的800×600容器：

1. 内容宽高比(0.5) < 容器宽高比(1.33)，说明内容相对更高
2. 因此选择高度缩放因子：`fitScale = 600 / 1000 = 0.6`
3. 应用缩放后，图片尺寸变为：300px × 600px

在这种情况下，图片高度刚好填满容器，左右会有空白（图片宽度只有300px，而容器宽800px）。

## 为什么这个算法总是有效？

这个算法之所以有效，是因为它总是选择**较小的缩放因子**。这确保了：

1. **内容完全可见**：选择较小的缩放因子，确保内容的任何部分都不会超出容器
2. **保持宽高比**：同时按相同比例缩放宽度和高度，维持原始形状
3. **最大化利用空间**：在满足上述两个条件的前提下，尽可能让内容填充容器

## 实际应用场景

这个简单的算法在各种应用中被广泛使用：

- **图片浏览器**：显示不同尺寸的图片
- **PDF阅读器**：适配不同纸张大小的页面
- **视频播放器**：处理不同宽高比的视频
- **响应式设计**：调整UI元素以适应不同屏幕尺寸
- **打印预览**：显示如何在纸张上布局内容

## 代码实现示例

让我们扩展一下最初的例子，提供一个完整的缩放实现：

```javascript
function fitContentToContainer(content, container) {
    const contentRatio = content.width / content.height;
    const containerRatio = container.width / container.height;
    
    let scale, newWidth, newHeight;
    
    if (contentRatio > containerRatio) {
        // 内容较宽，以容器宽度为基准
        scale = container.width / content.width;
        newWidth = container.width;
        newHeight = content.height * scale;
    } else {
        // 内容较高，以容器高度为基准
        scale = container.height / content.height;
        newHeight = container.height;
        newWidth = content.width * scale;
    }
    
    // 计算内容在容器中的居中位置
    const left = (container.width - newWidth) / 2;
    const top = (container.height - newHeight) / 2;
    
    return {
        width: newWidth,
        height: newHeight,
        left: left,
        top: top,
        scale: scale
    };
}

// 使用示例
const result = fitContentToContainer(
    { width: 1000, height: 500 },  // 内容尺寸
    { width: 800, height: 600 }    // 容器尺寸
);

console.log(result);
// 输出: { width: 800, height: 400, left: 0, top: 100, scale: 0.8 }
```

## 算法变体：Fill模式

我们讨论的是"Fit"模式，确保内容完全显示。另一种常见变体是"Fill"模式，它确保容器完全填满，可能会裁剪内容的一部分：

```javascript
function fillContainerWithContent(content, container) {
    const contentRatio = content.width / content.height;
    const containerRatio = container.width / container.height;
    
    let scale, newWidth, newHeight;
    
    if (contentRatio > containerRatio) {
        // 内容较宽，以容器高度为基准
        scale = container.height / content.height;
        newHeight = container.height;
        newWidth = content.width * scale;
    } else {
        // 内容较高，以容器宽度为基准
        scale = container.width / content.width;
        newWidth = container.width;
        newHeight = content.height * scale;
    }
    
    // 计算内容在容器中的居中位置
    const left = (container.width - newWidth) / 2;
    const top = (container.height - newHeight) / 2;
    
    return {
        width: newWidth,
        height: newHeight,
        left: left,
        top: top,
        scale: scale
    };
}
```

注意"Fill"模式与"Fit"模式的条件判断正好相反。

## 总结

这个看似简单的缩放算法隐藏着优雅的数学原理。通过比较内容和容器的宽高比，我们可以智能地决定以宽度还是高度为基准进行缩放，从而实现内容在保持原始比例的同时最大化利用容器空间。


