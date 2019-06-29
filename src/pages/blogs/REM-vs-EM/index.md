---
path: "/rem-vs-em"
date: "2019-06-28"
title: "CSS: rem vs. em"
tags: ["CSS"]
excerpt: "Sizing units in CSS can be confusing at best when they work, and when they don't it's a nightmare. Between rem's, em's, pixels, points, percentages, vw & vh, and even the seemingly useless ch..."
---
Sizing units in CSS can be confusing at best when they work, and when they don't it's a nightmare. Between rem's, em's, pixels, points, percentages, vw & vh, and even the seemingly useless ch, wrapping your head around what CSS units are best used for is tricky. In this post I'm going to compare the rem and em units to help give you clarity on how you should use each one.

### How EM works
EM is a relative unit that stands for 'element', and it's value depends strictly on the nearest parent container with a defined font-size. This behavior is similar to the way that percentages work, but at large values em tend to outgrow percentages drastically while at the smaller end em's get signicicantly smaller than their percentage counterparts.

EM's sound great, but one of the biggest issues with them is the cascading effect they carry as baggage. An outer div with a font size of .5em or 2em, for example, changes what it's child views as an em by half or double respectively. That means that 3 divs with a font-size of .5em nested within each other, will have values of .5, .25, and .125 of the ancestor elements size. This alone makes working with EM's a ginormous pain in most circumstances.

### How REM differs
As with every web technology in the last 20 years, the slightest invonveniece in the current technology results in something new coming along to solve it. This is where the REM comes in! REM stands for 'root element', and it's values are based upon the most senior parent elements font-size. Most commonly the html or body elements font-size.

The biggest advantage here is that all of your sizes that use rem are based upon that body font-size, which makes it super easy to automatically scale everything in the future by simply changing a single value.

The most common value for font-sizes given by browsers is 16px, and it's easy to forget that not every style given by browsers should be overwritten, specifically the body font-size. It's difficult and annoying to divide all of your desired font-sizes by 16px, so we use a trick of course.

```css
body {
    font-size: 62.5%;
}
```

62.5% is the magic number. Why? Because 16px * 62.5% = 10. By setting the root font-size to 10 effectively, our h1 that we want to be 24px becomes 2.4rem. This trick is especially great because it makes your site incredibly accessible to users who increase their browsers font-size. Increasing the font-size in Chrome from the standard 16px to 32px for example, changes all of your sites element sizes accordingly!

### When EM is useful
After reading about the wonders of REM, you may be wondering when you'll ever use EM again. While REM is typically far more useful than EM's, and involve many fewer side-effects, em's do still have their place in some sizing situations, like when you need text values to be specificly relative to each other.

### Summary
If all of this still seems confusing, don't fret. I've created this [Code Pen](https://codepen.io/austinnchristensen/pen/jjYGXp) that explains how REM and EM can look both the exact same in some situations, but also vastly different once cascading styles begin taking affect.