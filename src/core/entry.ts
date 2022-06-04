// DSL接口类型
import { IPanelDisplay, IDslConfig } from './interface'; // IPanelDisplay展示面板 IDslConfig配置文件

// 公共方法
import {
    line2Hump,//去下划线
    transComponentsMap,// 组件
    initSchema,//初始化schema
    traverse,// 遍历节点
    genStyleClass,// 样式类名
    getGlobalClassNames,//  提取全局样式
    genStyleCode,//  样式代码
  } from './utils';

  // 初始值
import { 
    CSS_TYPE,// css类型
    COMPONENT_TYPE,//组件类型
    OUTPUT_TYPE, //输出类型
    initConfig //初始化配置
    } from './consts';

// 导出Block
import exportBlock from './exportBlock';
import exportCreateApp from './exportCreateApp';
import exportGlobalCss from './exportGlobalCss';

const Entry = (schema, option) => {
    // console.log(schema, option);
    
    // get blocks json
    const blocks: any[] = [];
    // get components json
    const components: any[] = [];
    const pages: any[] = []

    // 参数设置
    // 尺寸比例
    option.scale = 750 / ((option.responsive && option.responsive.width) || 750);
    // 组件信息
    option.componentsMap = transComponentsMap(option.componentsMap);
    // 组件名
    option.blockInPage = schema.componentName === 'Page';
    // 全局样式
    option.pageGlobalCss = schema.css || '';

    // 初始化配置项
    const dslConfig = Object.assign(
        {
        scale: option.scale,
        inlineStyle: CSS_TYPE.IMPORT_CLASS,
        componentStyle: COMPONENT_TYPE.HOOKS,
        htmlFontSize: 16
        },
        option._.get(schema, 'imgcook.dslConfig')
    );

    dslConfig.useHooks = dslConfig.componentStyle ===  COMPONENT_TYPE.HOOKS;
    dslConfig.useTypescript = dslConfig.jsx === 'typescript'
    // 制导出格式 'project' | 'component' =》强制导出格式project
    dslConfig.outputStyle = 'project'
    option.dslConfig = dslConfig;

    // 初始化全局参数
    initConfig(dslConfig);

    const { inlineStyle } = dslConfig

    // clear schema
    initSchema(schema);

    // 记录所有blocks
    traverse(schema, (json) => {

        switch (json.componentName.toLowerCase()) {
        case 'block':
            
            blocks.push(json);
            break;
        case 'component':

            components.push(json);
            break;
        case 'page':
            pages.push(json);
            break;
        }
    });

    // 样式名处理：指定命名风格
    traverse(schema, (json) => {
        if (json.props && json.props.className) {
        json.props.className = genStyleClass(
            json.props.className,
            dslConfig.cssStyle
        );
        }
    });

    // 提取全局样式，类名数组存于 json.classString , 剩余样式覆盖 style
    traverse(schema, (json) => {
        let className = json.props && json.props.className || '';
        let classString = '';
        let style = json.props.style;
    
        // inline 
        if(inlineStyle === CSS_TYPE.INLINE_CSS){
        classString = `className="${className}"`;
        json.props.codeStyle = style;
        }else if(inlineStyle === CSS_TYPE.MODULE_STYLE){
        classString = ` style={${genStyleCode('styles', className)}}`;
        }else{
        let classnames: string[] = []
        let enableGlobalCss = dslConfig.globalCss && schema.css
    
        // 计算全局样式类名
        if (enableGlobalCss) {
            const cssResults = getGlobalClassNames(style, schema.css);
            if (cssResults.names.length > 0) {
            classnames = cssResults.names
            } 
            style = cssResults.style;
        } 
        
        if(inlineStyle == CSS_TYPE.MODULE_CLASS){
            // classnames.push(genStyleCode('styles', className));
        
            if(classnames.length){
            const nameStr =`${classnames.join(' ')} \$\{ ${ genStyleCode('styles', className) }\}`;
            classString = ` className={\`${nameStr.trim()}\`}`;
            }else{
            classString = ` className={${ genStyleCode('styles', className).trim()}}`;
            }

        }else{
            classnames.push(className);
            classString = ` className="${classnames.join(' ')}"`;
        }
        }
        
        json.props.style = style;
        json.classString = classString;
    });

    option.blocksCount = blocks.length;
    option.pagesCount = pages.length;

    // 导出模块代码
    let panelDisplay: IPanelDisplay[] = [];

    const panelImports = []

        // 导出blocks代码目录
    blocks.length > 0 &&
    blocks.forEach((block) => {
        // 渲染代码
        const result = exportBlock(block, option);
        // 合并
        panelDisplay = panelDisplay.concat(result);
    });

      // 导出component代码目录
  components.length > 0 &&
  components.forEach((component) => {
      // 渲染代码
      const result = exportBlock(component, option);
      // 合并
      panelDisplay = panelDisplay.concat(result);
  });
    
      // 导出page代码目录
  if (schema.componentName === 'Page') {
    const result = exportBlock(schema, option);
    panelDisplay = panelDisplay.concat(result);
  }

    
      // 导出格式（全部项目/组件）
  if(dslConfig.outputStyle == OUTPUT_TYPE.PROJECT){
    // 依赖 package.json
    const dependencies = {};
    for(let item of panelDisplay){
      if(item.panelImports && item.panelImports.length > 0){
        for( let pack of item.panelImports){
          dependencies[pack.package] = pack.version || '*'
        }
      }
    }

    // 项目文件
    panelDisplay = panelDisplay.concat(exportCreateApp(schema, {...option, dependencies}));
  }
    
      // 全局样式
  panelDisplay = panelDisplay.concat(exportGlobalCss(schema, option));
    
    
    console.log(panelDisplay);
    
  return {
    panelDisplay,
    noTemplate: true,
  };
}

export default Entry