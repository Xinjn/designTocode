// 类型声明
// 面板
export interface IPanelDisplay {
  panelName: string;
  panelValue: string;
  panelType: string;
  folder?: string;
  panelImports?: IImport[]
}
// 导入
export interface IImport {
  _import: string;
  package: string;
  version: string;
}
// dsl
export interface IDslConfig {
  responseWidth: number;
  scale: number;
  globalCss: boolean;//全局样式
  componentStyle: 'components' | 'hooks';//组件风格
  cssUnit: 'px' | 'vw' | 'rpx' | 'rem';//单位
  inlineStyle: 'import' | 'module' | 'inline' | 'module_style';// 样式引入方式
  outputStyle: 'project' | 'component';// 导出格式
  cssStyle: 'kebabCase' | 'camelCase' | 'snakeCase',//样式名
  htmlFontSize: number//基准字体
}