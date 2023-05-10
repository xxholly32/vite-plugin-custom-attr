# vite-plugin-custom-attr

## 📖 Introduction

Set default values for tags.

## 📦 Installation

```bash

# vite-plugin-custom-attr

pnpm install vite-plugin-custom-attr -D
```

## 🦄 Usage

```ts
// for Vue3

import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import CustomProps from 'vite-plugin-custom-attr/vite'

export default defineConfig({
  plugins: [
    Vue(), 
    CustomProps({
      tags: {
        "h1" : {
          style: "font-size: 2rem;"
        },
        "el-button" : {
          type: "success",
          plain: true,
        }, 
      }
    })
  ],
})
```

```vue
<template>
  <h1>change style</h1>
  <el-button>no type</el-button>
  <el-button type="primary">type primay</el-button>
</template>
```

to 

```vue
<template>
  <h1 style="font-size: 2rem;">change style</h1>
  <el-button type="success" plain>no type</el-button>
  <el-button type="primary" plain>type primay</el-button>
</template>
```

