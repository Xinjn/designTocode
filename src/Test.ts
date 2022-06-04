const _ = require('lodash')
const helper = require('@imgcook/dsl-helper')
const componentsMap = require('./core/componentsMap')
const prettier = require('prettier/standalone')
const parserHtml = require('prettier/parser-html')
const parserBabel = require('prettier/parser-babel')
const parserCss = require('prettier/parser-postcss')
const parserMarkDown = require('prettier/parser-markdown')

const data = require('./core/data')
import Entry from './core/entry'

// 美化代码
const browerParser = {
  babel: parserBabel,
  json: parserBabel,
  vue: parserHtml,
  css: parserCss,
  scss: parserCss,
  less: parserCss,
  html: parserHtml,
  md: parserMarkDown
}

const options = {
  prettier: {
    format: (str, opt) => {
      if (opt && browerParser[opt.parser]) {
        opt.plugins = [browerParser[opt.parser]]
      } else {
        return str
      }
      try {
        return prettier.format(str, opt)
      } catch (e) {
        console.error('format error', e)
        return str
      }
    }
  },
  _: _,
  responsive: {
    width: 750,
    viewportWidth: 375
  },
  helper,
  componentsMap
}

Entry(data, options)
