var src_dir = './src'
var platform = '/pc'
src_dir = src_dir + platform

var global_dir = './src'+ platform +'/js/global';
var path = require('path');
module.exports = {
    name: "SLAMEPACK",
    version: "1.0.0",
    description: "FKP-REST",
    port:{
        demo: 9000,
        dev: 8070
    },
    dirs: {
        src: src_dir,
        dist: "./dist",
        pages: src_dir + "/js/pages",
        modules: src_dir + "/js/modules",
        widgets: src_dir + "/js/widgets",
        global: src_dir + "/js/global",
        vendor: src_dir + "/js/vendor",
        stores: src_dir + "/js/stores",
        mixins: src_dir + "/js/mixins",
        libs: src_dir + "/js/libs",

        css_common: src_dir + "css/modules/base"
    },
    hash: false,
    //react, jq1.11
    vendorList: [
        path.join(__dirname, src_dir, '/js/vendor/jquery/dist/jquery.js'),
        //path.join(__dirname, src_dir, '/js/vendor/browser-request/dist/browser/request.js'),
        path.join(__dirname, src_dir, '/js/vendor/react/react-with-addons.js')
    ],
    //react, zepto/jq2
    vendorList_adv: [
        // path.join(__dirname, src_dir, '/js/vendor/jquery2/dist/jquery.js'),
        path.join(__dirname, src_dir, '/js/vendor/zepto/zepto.js'),
        path.join(__dirname, src_dir, '/js/vendor/react/react-with-addons.js')
    ],
    //angular
    vendorList_ng: [
        path.join(__dirname, src_dir, '/js/vendor/jquery/dist/jquery.js'),
        path.join(__dirname, src_dir, '/js/vendor/angular/angular.js')
    ],
    //backbone
    vendorList_bb: [
        path.join(__dirname, src_dir, '/js/vendor/jquery2/dist/jquery.js'),
        path.join(__dirname, src_dir, '/js/vendor/underscore/underscore.js'),
        path.join(__dirname, src_dir, '/js/vendor/backbone/backbone.js')
    ],
    //custom
    globalList: [
        path.join(__dirname, src_dir, '/js/global/config.js')
        // path.join(__dirname, src_dir, '/js/global/libs.js'),
        // path.join(__dirname, src_dir, '/js/global/core.js'),
        // path.join(__dirname, src_dir, '/js/global/toolkits.js')
    ],
    //ie
    ieRequireList: (function(){
        if(platform === '/pc'){
            return [
                path.join(__dirname, src_dir, '/js/vendor/html5shiv/dist/html5shiv.js'),
                path.join(__dirname, src_dir, '/js/vendor/respond/dest/respond.src.js'),
                path.join(__dirname, src_dir, '/js/vendor/es5-shim/es5-shim.js'),
                path.join(__dirname, src_dir, '/js/vendor/es5-shim/es5-sham.js'),
                path.join(__dirname, src_dir, '/js/vendor/json2/json2.js')
            ]
        }else{
            return []
        }
    })()
};