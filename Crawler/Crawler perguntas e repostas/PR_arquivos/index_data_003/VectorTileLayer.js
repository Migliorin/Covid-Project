// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See https://js.arcgis.com/3.35/esri/copyright.txt for details.
//>>built
(function(){var h=function(){try{var b=window.WebGLRenderingContext}catch(c){b=!1}try{for(var g=document.createElement("canvas"),f=["webgl","experimental-webgl","webkit-3d","moz-webgl"],d=null,a=0;a<f.length;++a){try{d=g.getContext(f[a])}catch(c){}if(d)break}var e=d}catch(c){e=!1}return b&&e?!0:!1}(),k=["dojo/_base/lang","dojo/has","dojo/Deferred","../sniff","./layer"];h&&k.push("./VectorTileLayerImpl");define("esri/layers/VectorTileLayer",k,function(b,g,f,d,a,e){a=e?e:a.createSubclass({declaredClass:"esri.layers.VectorTileLayer",
constructor:function(){var c=new f;c.reject(Error("esri.layers.VectorTileLayer is not supported"));c.promise.otherwise(b.hitch(this,function(l){this._errorHandler(l)}))}});a.ACCESS_TOKEN=null;a.supported=function(){return h};g("extend-esri")&&b.setObject("layers.VectorTileLayer",a,d);return a})})();