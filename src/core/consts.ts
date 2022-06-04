// 初始值
import { IPanelDisplay, IDslConfig } from './interface';
export const prettierJsOpt = {
  parser: 'babel',
  printWidth: 120,
  singleQuote: true,
};
export const prettierCssOpt = {
  parser: 'css',
};

export const prettierJsonOpt = {
  parser: 'json',
};

export const prettierScssOpt = {
  parser: 'scss',
  tabWidth: 2,
  printWidth: 120,
  singleQuote: true
};

export const prettierLessOpt = {
  parser: 'less',
  tabWidth: 2,
  printWidth: 120,
  singleQuote: true
};

export const prettierHtmlOpt = {
  parser: 'html',
  printWidth: 120,
  singleQuote: true
};

// 样式引入方式
export const CSS_TYPE = {
  MODULE_CLASS: 'module',
  MODULE_STYLE: 'module_style',
  IMPORT_CLASS: 'import',
  INLINE_CSS: 'inline',
}
// 组件风格
export const COMPONENT_TYPE = {
  HOOKS: 'hooks',
  COMPONENT: 'component',
}
// 完整项目/组件
export const OUTPUT_TYPE = {
  PROJECT: 'project',
  COMPONENT: 'component',
}


// 出码设置：全局参数配置
export let DSL_CONFIG: IDslConfig = {
  responseWidth: 750,
  scale: 1,
  globalCss: true,//全局样式
  cssUnit: 'px',//'px' | 'vw' | 'rpx' | 'rem';//单位
  componentStyle: 'hooks',//'components' | 'hooks';//组件风格
  inlineStyle: 'module',//'import' | 'module' | 'inline' | 'module_style';// 样式引入方式
  outputStyle: 'component',//'project' | 'component';// 导出格式
  cssStyle: 'camelCase',// 'kebabCase' | 'camelCase' | 'snakeCase',//样式名
  htmlFontSize: 16//基准字体
};

// 初始值（可新增）
export const initConfig = (cfg)=>{
  return DSL_CONFIG = Object.assign(DSL_CONFIG, cfg)
}

