/*jshint node:true*/
/* global require, module */
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');
var unwatchedTree = require('broccoli-unwatched-tree');
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var prepareBuild = function () {

  var matchLess = [new RegExp(/.*\.(less|css)/)];
  var moreStyles = mergeTrees([
    new Funnel(unwatchedTree('app/pods/components'), {
      srcDir: '/',
      destDir: 'components',
      include: matchLess
    }),
    new Funnel(unwatchedTree('app/pods'), {
      srcDir: '/',
      destDir: 'pods',
      include: matchLess
    }),
    new Funnel(unwatchedTree('app/styles'), {
      srcDir: '/',
      destDir: '.',
      include: matchLess
    })
  ]);

  var app = new EmberApp({
    trees: {
      styles: moreStyles
    },
    lessOptions: {
      sourceMap: false
    }
  });

  return app.toTree();
};

module.exports = prepareBuild;
