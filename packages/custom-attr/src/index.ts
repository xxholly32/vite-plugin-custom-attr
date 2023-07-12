import { createUnplugin } from 'unplugin'
import serialize from 'serialize-javascript'

interface TagsOptions {
  [key: string]: TagsOptions | String | Boolean
}

export interface VitePluginCustomPropsOptions {
  /**
  * Vue version
  * @default 3
  */
  vue?: 2 | 3

  /**
  * Default enable state
  * @default false
  */
  enabled?: boolean
  tags?: TagsOptions
}

export const DEFAULT_CUSTONPROPS_OPTIONS: VitePluginCustomPropsOptions = {
  vue: 3,
  enabled: false,
} as const

export default createUnplugin((useOptions: VitePluginCustomPropsOptions = DEFAULT_CUSTONPROPS_OPTIONS) => {
  const options = { ...DEFAULT_CUSTONPROPS_OPTIONS, ...useOptions }

  return {
    name: 'vite-plugin-custom-attr',
    enforce: 'pre',
    transformInclude(id) {
      return id.endsWith('.vue')
    },
    // just like rollup transform
    transform(code) {
      const { tags } = options
      for (const tag in tags) {
        const attrs = tags[tag]
        for (const attr in attrs) {
          const attrValue = attrs[attr]
          const regex = new RegExp(`<${tag}((?=\\\\s)[^>]*|[^\\\\s>]*?)(/?)>`, 'g') // 构建全局正则表达式匹配标签
          code = code.replace(regex, (match, p1, p2) => {
            // 如果已经存在该属性，则不添加
            if (p1.includes(`${attr}=`) || p1.includes(`${attr} `))
              return match

            let value = ''
            let temp = ''

            switch (typeof attrValue) {
              case 'string':
                value = `${attr}="${attrValue}"`
                break
              case 'boolean':
                value = attrValue ? `${attr}` : ''
                break
              case 'object':
                // https://github.com/yahoo/serialize-javascript#usage
                // need remove "" from key and replace '' from value
                temp = serialize(attrValue)
                  .replace(/"([^"]+)":/g, '$1:')
                  .replace(/"([^"]+)"/g, '\'$1\'')

                value = `:${attr}="${temp}"`
                break
            }

            return `<${tag}${p1} ${value}${p2}>` // 添加 attr 属性
          })
        }
      }
      return code
    },
  }
})
