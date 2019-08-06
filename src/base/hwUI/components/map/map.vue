<template>
  <div class="map">
    <div id="ocn_2_5D_map" :style="'height:'+mapdata.h+'px;'"></div>
  </div>
</template>

<script>
  export default {
    name: 'hw-25d-map',
    data() {
      return {
        map: null,
        config: null,
        layer25D: null,
        currentMap: null,
        // 标注
        taggingMarkers: null,
        coordinate: '',
        address: ''
      }
    },
    props: {
      mapdata: {
        type: Object
      }
    },
    created() {
      this.$nextTick(() => {
        this.mapLoader();
        this.currentMap = 0;
        // 地图标注
        if (this.mapdata.mapTag) {
          var pt = this.map.getCenter();
          this.locate(pt);
        }
      })
    },
    methods: {
      // 初始化加载地图
      mapLoader() {
        if (this.map) return;
        this.config = new OMAP.Config({
          imagePath: this.mapdata.mapServiceUrl + "image",
          jsPath: this.mapdata.mapServiceUrl + "resource/js/",
          mapId: 1,
          scale: 0.353,
          hotFileLevel: 5,
          overlook: Math.PI / 4,
          rotate: Math.PI / 4
        });
        this.layer25D = new OMAP.Layer.NOGISLayer("25D", this.mapdata.mapServiceUrl + "resource/", {
          isBaseLayer: false,
          transparent: true,
          defaultImage: '/static/images/transparent.png',
          loadHotspot: true,
          hotspotTouch: this.touchHandler
        });
        var layerYX = new OMAP.Layer.NOGISLayer("YX", this.mapdata.mapServiceUrl + "resource/yx", {
          isBaseLayer: true,
          defaultImage: '/static/images/nopic.jpg',
          loadHotspot: false
        });
        var ext = new OMAP.Bounds(-56255400.354765005, -56255400.354765005, 56255400.354765005, 56255400.354765005);
        // 地图配置
        var mapOptions = {
          extent: ext,
          center: this.mapdata.mapCenter,
          zoom: 4,
          config: this.config,
          resolutions: [
            107.29866095498084608,
            53.64933047749042304,
            26.82466523874521152,
            13.41233261937260576,
            6.70616630968630288,
            3.35308315484315144,
            1.67654157742157572,
            0.83827078871078786,
            0.41913539435539393
          ],
          numZoomLevels: 9,
          layers: [this.layer25D, layerYX],
          controls: [new OMAP.Control.Navigation()]
        };
        // 初始化地图
        this.map = new OMAP.Map("ocn_2_5D_map", mapOptions);
        var defaultStyle = new OMAP.Style({
          pointRadius: 4,
          strokeWidth: 3,
          strokeOpacity: 1,
          strokeColor: "#00FF00",
          fillColor: "#ffcc66",
          fillOpacity: 0.3
        });
        var showLayer25D = new OMAP.Layer.Vector("标注图层", {
          styleMap: new OMAP.StyleMap({
            'default': defaultStyle
          }),
        });
        this.map.addLayer(showLayer25D);
        let vm = this
        // 地图标注
        this.mapdata.mapTag && this.map.events.register("moveend", this.map, function() {
          var pt = vm.map.getCenter();
          vm.locate(pt);
        });
        this.map.showLayer = showLayer25D;
        this.map.setLayerIndex(this.layer25D, 0);
        this.map.setLayerIndex(showLayer25D, 1);
        // 显示打点
        if (this.mapdata.pointOut.showPoint.length == 2) {
          this.taggingMarkers = new OMAP.Layer.Markers("Markers");
          this.map.addLayer(this.taggingMarkers);
          this.init_addTagging(this.mapdata.pointOut.showPoint[0], this.mapdata.pointOut.showPoint[1])
        }
        // 显示斑图
        if (this.mapdata.plaques.showPlaques.length > 0) {
          this.init_EditPolygon(this.mapdata.plaques.showPlaques);
        }
        if (this.mapdata.pointOut.isPoint) {
          this.init_markTool();
        }
      },
      // 选择热区
      touchHandler(e) {
        if (this.mapdata.hotZone) {
          var hoverGeom = e.target;
          this.layer25D.hotspot.hoverlayer.removeAllFeatures();
          if (this.layer25D.hotspot.popup) {
            this.map.removePopup(this.layer25D.hotspot.popup);
            this.layer25D.hotspot.popup.destroy();
            this.layer25D.hotspot.popup = null;
          }
          if (hoverGeom) {
            var geom = hoverGeom.geometry.clone();
            var attr = hoverGeom.attributes;
            var f = new OMAP.Feature.Vector(geom, attr, null);
            this.layer25D.hotspot.hoverlayer.addFeatures([f]);
            var pt = geom.getCentroid();
            var id = hoverGeom.data.id;
            var html = "<div style='background-color: rgba(255, 255, 255, 1);border-radius: 5px;padding: 2px 8px 2px 8px;margin-bottom: 3px;box-shadow: inset 0 0 0 rgba(0, 0, 0, .075), 2px 2px 2px 2px rgba(51, 51, 51, 0.7);white-space: nowrap;'>" + hoverGeom.data.name + "</div>";
            this.layer25D.hotspot.popup = this.createPop('' + id, html, pt.x, pt.y, -30, -40);
          }
        }
      },
      // 创造气泡
      createPop(id, html, x, y, xp, yp) {
        if (this.map == null || typeof(this.map) == 'undefined') return;
        var popup = new OMAP.Popup(id,
          new OMAP.LonLat(x, y),
          new OMAP.Size(100, 100),
          html,
          false, '', xp, yp);
        popup.setBackgroundColor("transparent");
        popup.autoSize = 1;
        this.map.addPopup(popup);
        return popup;
      },
      // 移动点获取数据
      locate(pt) {
        this.drawPoint(pt.lon, pt.lat)
        const trans = new this.ocn.Transformation(45, 45, 49)
        var wgs84pt = trans.OCN2WGS84(pt.lon, pt.lat);
        this.coordinate = wgs84pt.x + "," + wgs84pt.y;
        var vm = this
        api.ajax({
          url: 'http://api.map.baidu.com/geocoder/v2/',
          method: 'get',
          data: {
            values: {
              location: wgs84pt.y + "," + wgs84pt.x,
              coordtype: 'wgs84ll',
              output: 'json',
              ak: "4eb424fae9e47fe4549f4846791df8b6"
            }
          }
        }, function(ret, err) {
          if (ret && ret.result) {
            vm.address = ret.result.formatted_address;
          } else {
            api.alert({
              msg: JSON.stringify(err)
            });
          }
        });
      },
      // 获取地图标注的数据
      getMapTagData() {
        let r = new Promise((reslove, reject) => {
          // TODO 记得删除this.address
          if(!this.address){
            this.address = '测试地址'
          }
          if (this.coordinate && this.address) {
            reslove({
              coordinate: this.coordinate,
              address: this.address
            })
          }else if(this.address == ''){
            reject('地址名称解析失败')
          }else if(this.coordinate == ''){
            reject('经纬度获取失败')
          }
        })
        return r
      },
      // 绘制点
      drawPoint(x, y) {
        this.map.showLayer.removeAllFeatures();
        var pt = new OMAP.Geometry.Point(x, y);
        var feature = new OMAP.Feature.Vector(pt);
        this.map.showLayer.addFeatures([feature]);
      },
      // 显示地图打点
      init_addTagging(x, y, iconPath) {
        if (!this.taggingMarkers) {
          this.taggingMarkers = new OMAP.Layer.Markers("Markers");
          this.map.addLayer(this.taggingMarkers);
        };
        this.taggingMarkers.clearMarkers();
        var marker = new OMAP.Marker(new OMAP.LonLat(x, y));
        if (iconPath) {
          var size = new OMAP.Size(21, 25);
          var offset = new OMAP.Pixel(-(size.w / 2), -size.h);
          var icon = new OMAP.Icon(iconPath, size, offset);
          var marker = new OMAP.Marker(new OMAP.LonLat(x, y), icon);
        }
        this.taggingMarkers.addMarker(marker);
      },
      // 画斑图
      init_EditPolygon(list) {
        // this.$emit('updata:mapdata', {});
        var scaleStyle = { // 面的样式
          strokeWidth: 2,
          strokeOpacity: 1,
          strokeColor: "red",
          fillColor: "white",
          fillOpacity: 0.3
        };
        var scaleLayer = new OMAP.Layer.Vector("scaleLayer", {
          style: scaleStyle
        });
        this.map.addLayer(scaleLayer);
        var pts = [];
        for (var i = 0, len = list.length; i < len; i++) {
          var pt = new OMAP.Geometry.Point(list[i].x, list[i].y);
          pts.push(pt);
        }
        var ring = new OMAP.Geometry.LinearRing(pts);
        var p = new OMAP.Geometry.Polygon(ring);
        var b = new OMAP.Feature.Vector(p);
        scaleLayer.addFeatures(b);
        var editlayer = new OMAP.Layer.Vector("drawLayer");
        this.map.addLayer(editlayer);
        editlayer.addFeatures([b]);
        var modifyControl = new OMAP.Control.ModifyFeature(editlayer);
        this.map.addControl(modifyControl);
        modifyControl.mode = OMAP.Control.ModifyFeature.RESHAPE |
          OMAP.Control.ModifyFeature.DRAG;
        modifyControl.activate();
      },
      // 地图打点
      init_markTool(x, y) {
        var that = this;
        var pointLayer;
        var pointDrawHandler;
        var pointStyle = {
          pointRadius: 0
        }
        var markers = new OMAP.Layer.Markers("Markers");
        this.map.addLayer(markers);
        if (x) {
          var markerkk = new OMAP.Marker(new OMAP.LonLat(x, y), null);
          markers.clearMarkers();
          markers.addMarker(markerkk);
        }
        function drawMark() {
          if (pointLayer == null) {
            pointLayer = new OMAP.Layer.Vector("pointLayer", {
              style: pointStyle
            });
            that.map.addLayer(pointLayer);
          }
          if (pointDrawHandler == null) {
            pointDrawHandler = new OMAP.Control.DrawFeature(pointLayer,
              OMAP.Handler.Point);
            that.map.addControl(pointDrawHandler);
            var me = that;
            // 在地图点击完成后事件
            pointDrawHandler.events.on({
              "featureadded": function(eventArgs) {
                var size = new OMAP.Size(21, 25);
                // alert(eventArgs.feature.geometry.x);
                var marker = new OMAP.Marker(new OMAP.LonLat(
                  eventArgs.feature.geometry.x,
                  eventArgs.feature.geometry.y), null);
                markers.clearMarkers();
                markers.addMarker(marker);
                that.$emit('mark_tool', eventArgs.feature.geometry)
              }
            });
          }
          pointDrawHandler.activate();
        }
        drawMark();
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable'
@import '../../common/stylus/mixin'
.map
  #ocn_map
    width 100%
    height 500px
    background $color-blue
</style>