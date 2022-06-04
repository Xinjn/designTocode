import { IPanelDisplay } from './interface';

import { CSS_TYPE, OUTPUT_TYPE, prettierJsOpt, prettierCssOpt, prettierJsonOpt, prettierHtmlOpt } from './consts';

// 创建全部项目的配置文件
export default function exportCreateApp(schema, option): IPanelDisplay[] {
  const folderName = schema.folderName;

  
  const {
    dependencies,
    dslConfig,
    _,
    prettier
  } = option;

  let panelValue = '';
  const panelDisplay: IPanelDisplay[] = [];

  // pxtorem.hbs
  panelValue = `

  <script>
  window.__IFENG_ENV__ = window.__IFENG_ENV__ || {}
  window.__IFENG_ENV__.maxDocWidth = parseInt({{maxDocWidth}}) || 812
</script>

<script>
  var isGrounds = function () {
      return typeof grounds !== 'undefined' && typeof grounds.getDeviceInfo === 'function';
  }
  /*
  var getGroundsWidth = function () {
      if(window && window.location && window.location.href) {
          const regex = /?.*?screen=(d+xd+)/g;
          var match = window.location.href.match(regex);
          if(match) {
              return match[1].split('x')[0] / window.devicePixelRatio;
          }
      }
      var deviceInfo = grounds.getDeviceInfo();
      if(!deviceInfo || !deviceInfo.getScreen){
          return window.innerWidth;
      }
      var screen = deviceInfo.getScreen();
      if(!screen) {
          return window.innerWidth;
      }
      return screen.split('x')[0] / window.devicePixelRatio;
  }
  */
  
  var getWidth = function () {
      var width = 320;
      //if (isGrounds()) {
      //    width =  getGroundsWidth();
      //} else {
          width = window.innerWidth;
      //}
      return width > 0 ? width : 320;
  }
  var isWeixin = function() {
      //判断是否是微信
      var ua = navigator.userAgent.toLowerCase();
      return ua.match(/MicroMessenger/i) == 'micromessenger';
  };

  function getBigFont() {
      var docEl = document.documentElement;
      // var docWidth = window.innerWidth;
      var docWidth = getWidth();
      var fakeBody = document.createElement('body');

      var rem = docWidth / 10;
      docEl.style.fontSize = rem + 'px';
      var d = document.createElement('div');
      d.style.cssText =
          'width:1rem;height:0;overflow: hidden;position:absolute;z-index:-1;visibility: hidden;';
      fakeBody.appendChild(d);
      docEl.appendChild(fakeBody);
      // var realRem = (window.getComputedStyle(d, null).width.split('px')[0]/1).toFixed(1)/1;
      var realRem = isGrounds() ?  getGroundsWidth() / 10 : d.getBoundingClientRect().width.toFixed(1) / 1;
      // var realRem = d.offsetWidth;
      docEl.removeChild(fakeBody);
      docEl.style.cssText = '';
      console.log(realRem, rem);
      // alert(realRem + ':' + rem + ':' + realRem/rem);
      return {
          realRem: realRem,
          rem: rem
      };
      // alert(realRem + ':' + rem);
  }
  var __fontDiff = getBigFont();
</script> 

<script>
  (function() {
      if (typeof WeixinJSBridge == 'object' && typeof WeixinJSBridge.invoke == 'function') {
          handleFontSize();
      } else {
          document.addEventListener('WeixinJSBridgeReady', handleFontSize, false);
      }
      function handleFontSize() {
          // var docEl = doc.documentElement;
          // var docWidth = docEl.clientWidth;
          var docWidth = getWidth();
          var rem = docWidth / 10;
          // 按照iphone X的高度定制最大宽度
          if (docWidth >= window.__IFENG_ENV__.maxDocWidth) {
              rem = window.__IFENG_ENV__.maxDocWidth / 10;
          }

          // 设置网页字体为默认大小
          WeixinJSBridge.invoke('setFontSizeCallback', { fontSize: 0 });
          setTimeout(function() {
              document.documentElement.style.fontSize = rem + 'px';
          }, 0);
          // 重写设置网页字体大小的事件
          WeixinJSBridge.on('menu:setfont', function() {
              WeixinJSBridge.invoke('setFontSizeCallback', { fontSize: 0 });
              setTimeout(function() {
                  document.documentElement.style.fontSize = rem + 'px';
              }, 0);
          });
      }
  })();
</script>

<script>
      (function(win, doc) {
          var docEl = doc.documentElement;

          function setRemUnit() {
              console.log('runSetRemUnit');
              console.log('docEl.clientWidth=======>', docEl.clientWidth);
              // var docWidth = docEl.clientWidth;
              var docWidth = getWidth();
              var rem = docWidth / 10;
              // 按照iphone X的高度定制最大宽度
              if (docWidth >= window.__IFENG_ENV__.maxDocWidth) {
                  rem = window.__IFENG_ENV__.maxDocWidth / 10;
              }
              if (typeof __articleEditMode__ !== 'undefined' && __articleEditMode__) {
                  docEl.classList.add('article-edit-mode');
              } else {
                  if (__fontDiff.realRem !== __fontDiff.rem) {
                      // docEl.style.cssText = 'font-size: ' + rem + 'px !important';
                      // docEl.style.cssText = 'font-size: 37.6px !important';
                      docEl.style.cssText =
                          'font-size: ' + rem / (__fontDiff.realRem / __fontDiff.rem) + 'px !important';
                  } else {
                      docEl.style.cssText = 'font-size: ' + rem + 'px';
                  }
              }
          }

          var resetRemUnit = null;

          win.addEventListener(
              'resize',
              function() {
                  clearTimeout(resetRemUnit);
                  resetRemUnit = setTimeout(setRemUnit, 200);
              },
              false
          );
          win.addEventListener(
              'pageshow',
              function(e) {
                  if (e.persisted) {
                      clearTimeout(resetRemUnit);
                      resetRemUnit = setTimeout(setRemUnit, 200);
                  }
              },
              false
          );

          setRemUnit();

          if (win.devicePixelRatio && win.devicePixelRatio >= 2) {
              var testEl = doc.createElement('div');
              var fakeBody = doc.createElement('body');

              testEl.style.border = '0.5px solid transparent';
              fakeBody.appendChild(testEl);
              docEl.appendChild(fakeBody);

              if (testEl.offsetHeight === 1) {
                  docEl.classList.add('hairlines');
              }

              docEl.removeChild(fakeBody);
          }

          if (doc.readyState === 'complete') {
              if (__fontDiff.realRem !== __fontDiff.rem) {
                  doc.body.style.fontSize = 12 / (__fontDiff.realRem / __fontDiff.rem) + 'px';
              } else {
                  doc.body.style.fontSize = 12 + 'px';
              }
          } else {
              doc.addEventListener(
                  'DOMContentLoaded',
                  function(e) {
                      if (__fontDiff.realRem !== __fontDiff.rem) {
                          doc.body.style.fontSize = 12 / (__fontDiff.realRem / __fontDiff.rem) + 'px';
                      } else {
                          doc.body.style.fontSize = 12 + 'px';
                      }
                  },
                  false
              );
          }
      })(window, document);
</script> 

  `
  panelDisplay.push({
    panelName: `pxtorem.hbs`,
    panelType: 'hbs',
    panelValue:  panelValue,
    folder: 'src/mobile/index/layout/template',
  });

  // index.html
  panelValue = `<!DOCTYPE html>
  <html lang="zh">
    <head>
    <meta http-equiv="Cache-Control" content="no-transform">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta content="always" name="referrer">
    <meta name=viewport content="width=device-width,initial-scale=1,user-scalable=no,viewport-fit=cover">
    <title>demo</title>

        <!-- handlebars模版语法 -->
        {{> layout/template/pxtorem }}
    </head>
    <body>
      <div id="container"></div>
    </body>
  </html>`
  panelDisplay.push({
    panelName: `index.html`,
    panelType: 'html',
    panelValue,
    folder: 'src/mobile/index',
  });

  // app.js
  const isGlobal = schema.css && dslConfig.globalCss && dslConfig.inlineStyle !== CSS_TYPE.INLINE_CSS;
  panelValue = `'use strict';
  import React from 'react';
  import ReactDOM from 'react-dom';
  import "./app.css"

  ${isGlobal ? " import './global.css';" : ''}
  import App from './layout/index.jsx';
  
  ReactDOM.render(<App />, document.getElementById('container'));
  `
  panelDisplay.push({
    panelName: `app.js`,
    panelType:  'js',
    panelValue:  prettier.format(panelValue, prettierJsOpt),
    folder: 'src/mobile/index',
  });
  
  // app.css
  panelValue = `
  /**
 * 该reset参考了 normalize.css 和 typo.css
 * normalize.css: https://github.com/necolas/normalize.css/blob/master/normalize.css
 * typo.css: https://github.com/sofish/typo.css/blob/master/typo.css
 */

/**
 * 1. 防止在iOS上横屏文字放大
 * 2. 防止用户自定义颜色对网页的影响
 * 3. 防止节点本身的滚动效果（例如 Android 炫光和下拉刷新）
 */
 html {
    text-size-adjust: 100%; /* 1 */
    background: #ffffff; /* 2 */
    overscroll-behavior-y: none; /* 3 */
}

/**
   * 1. 防止节点本身的滚动效果（例如 Android 炫光和下拉刷新）
   */
body {
    overscroll-behavior-y: none; /* 1 */
    /* 默认字体-ios："PingFang SC";andorid/window："Microsoft YaHei";Linux:"WenQuanYi Micro Hei" */
    font-family: "PingFang SC", "Microsoft YaHei", "WenQuanYi Micro Hei",
    "Helvetica Neue", "Segoe UI", Helvetica, Arial, sans-serif;
}

/* 内外边距通常让各个浏览器样式的表现位置不同 */
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
code,
form,
fieldset,
legend,
input,
textarea,
p,
blockquote,
th,
td,
article,
aside,
details,
figcaption,
figure,
footer,
header,
menu,
nav,
section {
    margin: 0;
    padding: 0;
}

/* 修复表单元素不继承父级font的问题 */
button,
input,
optgroup,
select,
textarea {
    font-style: inherit;
    font-weight: inherit;
    font-stretch: inherit;
    font-size: 100%;
    line-height: inherit;
    font-family: inherit;
}

/* IE 中设置 overflow 为 visible ，和其它浏览器保持一致 */
button,
input {
    overflow: visible;
}

/* 阻止 IE 中button和select继承父级的text-transform属性 */
button {
    text-transform: none;
}

/* 阻止IE9+上默认的纵向滚动条 */
textarea {
    overflow: auto;
}

/* 去掉各Table cell 的边距并让其边重合 */
table {
    border-collapse: collapse;
    border-spacing: 0;
    font-size: inherit;
}

/* 去除默认边框 */
fieldset,
img {
    border: 0;
}

/* 一致的 del 样式 */
del {
    text-decoration: line-through;
}

/* 去掉列表前的标识 */
ol,
ul {
    list-style: none;
}

/* 一致的粗体样式 */
strong,
b {
    font-weight: bold;
}

/**
     * 1. 默认不显示下划线，保持页面简洁
     * 2. 移除IE10下a标签在active状态下的灰色背景
     */
a {
    text-decoration: none; /* 1 */
    background-color: transparent; /* 2 */
}

/* 消除img底部的留白 */
img {
    vertical-align: top;
}

/* 透明度设置为0，去掉点击链接和文本框对象时默认的灰色半透明覆盖层(iOS)或者虚框(Android) */
a,
input,
button {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

/* 取消chrome下默认的文本框聚焦样式 */
input,
textarea {
    outline: none;
}

/* 去掉IOS原生控件样式 */
/* input,
  button {
    -webkit-appearance: none;
    border-radius: 0;
  } */

h1,
h2,
h3,
h4,
h5,
h6 {
    font-size: 100%;
}

:global(#root) {
    max-width: 812px; /*no*/
    margin: 0 auto;
}

  `
  panelDisplay.push({
    panelName: `app.css`,
    panelType: 'css',
    panelValue:  prettier.format(panelValue, prettierCssOpt),
    folder: 'src/mobile/index',
  });

  // READMD.md
  panelValue = `
  npm install
  npm run dev
  `
  panelDisplay.push({
    panelName: `README.md`,
    panelType: 'md',
    panelValue:  panelValue,
    folder: '',
  });

  //.gitignore
  panelValue = ``
  panelDisplay.push({
    panelName: `.gitignore`,
    panelType: '',
    panelValue:  panelValue,
    folder: '',
  });

  //.babelrc
   panelValue = `
   {
    "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
    ]
  }
   `
   panelDisplay.push({
     panelName: `.babelrc`,
     panelType: '',
     panelValue:  panelValue,
     folder: '',
   });

  // dependencies
  let packDependencies = dependencies;

  // if (schema.imgcook && schema.imgcook.dependencies) {
  //   schema.imgcook.dependencies.forEach(({packageRax1, versionRax1}) => {
  //     packDependencies[packageRax1] = versionRax1
  //   })
  // }

  // package.json
  const packageJson = {
    "title": "imgcook demo",
    "name": "demo",
    "version": "1.0.0",
    "description": "",
    "scripts": {
      "react_test": "react-scripts test --env=jsdom",
      "react_start": "react-scripts start",
      "react_eject": "react-scripts eject",
      "react_build": "react-scripts build",
      "test": "echo \"Error: no test specified\" && exit 1",
      "dev": "webpack-dev-server --open --mode=development --hot",
      "start": "webpack-dev-server --mode=development --port 3000 --hot",
      "build": "webpack --mode=production",
    },
    "main": "index.js",
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "typescript": "^4.0.5"
    },
    "dependencies": {
      "@babel/core": "^7.17.9",
      "@babel/preset-env": "^7.16.11",
      "@babel/preset-react": "^7.16.7",
      "babel-loader": "^8.2.4",
      "babel-plugin-transform-runtime": "^6.23.0",
      "babel-preset-stage-0": "^6.24.1",
      "css-loader": "^6.7.1",
      "file-loader": "^6.2.0",
      "handlebars": "^4.7.7",
      "handlebars-loader": "^1.7.1",
      "html-webpack-plugin": "^5.5.0",
      "less": "^4.1.2",
      "less-loader": "^10.2.0",
      "mini-css-extract-plugin": "^2.6.0",
      "postcss-adaptive-extra": "^1.0.5",
      "postcss-loader": "^6.2.1",
      "react": "^18.0.0",
      "react-dom": "^18.0.0",
      "style-loader": "^3.3.1",
      "webpack": "^5.71.0",
      "webpack-cli": "^4.9.2",
      "webpack-dev-server": "^4.8.1",
      ...packDependencies
    },
    "browserslist": [
      ">0.2%",
      "not dead",
      "not ie <= 11",
      "not op_mini all"
    ]
  }
  panelValue = JSON.stringify(packageJson, null, 4)
  panelDisplay.push({
    panelName: `package.json`,
    panelType: 'json',
    panelValue:  prettier.format(panelValue, prettierJsonOpt),
    folder: '',
  });

  //webpack.config.js
  panelValue = `
  const webpack = require("webpack");
  const path = require("path");
  // 生成Html插件
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  // px2rem 库
  const adaptive = require("postcss-adaptive-extra");
  
  // webpack 配置
  var config = {
    mode: "development", // production development
    // 项目的入口文件，webpack会从这个文件开始读取整个项目的依赖模块
    // entry: ["./src/index.js"],
    // 设置实时更新
    entry: [
      "webpack/hot/dev-server",
      "webpack-dev-server/client?http://localhost:3000",
      "./src/mobile/index/app.js",
    ], // 入口文件
    // 打包输出文件
    output: {
      path: path.resolve(__dirname, "dist"), //自定义打包后的文件路径
      filename: "bundle.js", //自定义打包后的文件名称
    },
    module: {
      rules: [
        {
          test: /.css$/, // 匹配css文件
          use: [
            { loader: "style-loader" },
            {
              loader: "css-loader",
              options: {
                // 模块化配置
                modules: {
                  localIdentName: "[path][name]__[local]--[hash:base64:5]", //编译后的css类名
                },
              },
            },
            // px2rem
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    adaptive({
                      remUnit: 75,
                      autoRem: true,
                      useCssModules: true,
                    }),
                  ],
                },
              },
            },
            { loader: "less-loader" },
          ],
        },
        // 模版语法
        {
          test: /(\.html$)|(\.ejs$)|(\.handlebars$)|(\.hbs)/,
          loader: "handlebars-loader",
        },
        {
          test: /.js|jsx$/, // 匹配js文件
          exclude: /node_modules/, // 排除node_modules文件
          use: [{ loader: "babel-loader" }], // babel编译:es6语法
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Hello React",
        template: "./src/mobile/index/index.html", //源文件
      }),
    ],
    // 自动补全后缀名
    resolve: {
      extensions: [".js", ".jsx", ".json"],
    },
  };
  
  module.exports = config;  
  `
  panelDisplay.push({
    panelName: `webpack.config.js`,
    panelType: 'js',
    panelValue:  panelValue,
    folder: '',
  });

  if (dslConfig.useTypescript) {
    panelValue = `{
      "compilerOptions": {
        "target": "es5",
        "lib": [
          "dom",
          "dom.iterable",
          "esnext"
        ],
        "allowJs": true,
        "skipLibCheck": true,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "strict": true,
        "forceConsistentCasingInFileNames": true,
        "noFallthroughCasesInSwitch": true,
        "module": "esnext",
        "moduleResolution": "node",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "noEmit": true,
        "jsx": "react-jsx"
      },
      "include": [
        "src"
      ]
    }
     `
    panelDisplay.push({
      panelName: `tsconfig.json`,
      panelType: 'json',
      panelValue:  prettier.format(panelValue, prettierJsonOpt),
      folder: option.folder || '',
    });
  }


  return panelDisplay;
}
