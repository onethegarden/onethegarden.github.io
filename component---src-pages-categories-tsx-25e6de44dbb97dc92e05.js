"use strict";(self.webpackChunkgarden_by=self.webpackChunkgarden_by||[]).push([[260],{2342:function(e,r,t){t.r(r),t.d(r,{default:function(){return g}});var n=t(7294),a=t(9925),o=t(5444),i=a.default.ul.withConfig({displayName:"CategoryList__CategoryListWrapper",componentId:"sc-mx72mu-0"})(["display:flex;flex-wrap:wrap;list-style:none;padding-left:0;padding:0.8rem 1rem;"]),c=a.default.li.withConfig({displayName:"CategoryList__Category",componentId:"sc-mx72mu-1"})(["margin:0.3rem;margin-right:2rem;padding:0.5rem 0;font-size:18px;font-weight:400;margin-right:1rem;border-radius:0.3rem;padding:0.2rem 1rem;background-color:",";box-shadow:rgba(60,64,67,0.3) 0px 1px 2px 0px,rgba(60,64,67,0.15) 0px 1px 3px 1px;a{color:",";text-decoration:none;}&:hover{background-color:",";transition-duration:0.5s;}"],(function(e){return e.theme.color.gray1}),(function(e){return e.theme.color.gray3}),(function(e){return e.theme.color.gray2}));var u=function(e){var r=e.categoryList;return n.createElement(i,null,Object.entries(r).map((function(e){var r=e[0],t=e[1];return n.createElement(c,{key:r},n.createElement(o.rU,{to:"/?category="+r},r,"(",t,")"))})))},l=function(e){return e.reduce((function(e,r){return r.node.frontmatter.categories.forEach((function(r){void 0===e[r]?e[r]=1:e[r]++})),e.All++,e}),{All:0})},d=t(8706);var g=function(e){var r=e.data.allMarkdownRemark.edges,t=(0,n.useMemo)((function(){return l(r)}),[]);return n.createElement(d.Z,{pageTitle:"Blog"},n.createElement(u,{categoryList:t}))}}}]);
//# sourceMappingURL=component---src-pages-categories-tsx-25e6de44dbb97dc92e05.js.map