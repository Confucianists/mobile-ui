<template>
  <div class="map">
    <div id="ocn_2_5D_map_hot" :style="'height:'+mapdata.h+'px;'"></div>
  </div>
</template>

<script>
  export default {
    name: 'hw-25d-map-hot',
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
      })
    },
    methods: {
      // 初始化加载地图
      mapLoader() {
        let vm = this
        if (vm.map) return;
        let config = new OMAP.Config({
          imagePath: vm.mapdata.mapServiceUrl + "image",
          jsPath: vm.mapdata.mapServiceUrl + "resource/js/",
          mapId: 1,
          scale: 0.353,
          hotFileLevel: 5,
          overlook: Math.PI / 4,
          rotate: Math.PI / 4
        });
        vm.layer25D = new OMAP.Layer.NOGISLayer("25D", vm.mapdata.mapServiceUrl + "resource/", {
          isBaseLayer: true,
          transparent: true,
          defaultImage: '/static/images/transparent.png',
          loadHotspot: true,
          hotspotTouch: function(e) {
            vm.touchHandler(e)
          }
        });
        let ext = new OMAP.Bounds(-56255400.354765005, -56255400.354765005, 56255400.354765005, 56255400.354765005);
        // 地图配置
        let mapOptions = {
          extent: ext,
          center: vm.mapdata.mapCenter,
          zoom: 4,
          config: config,
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
          layers: [vm.layer25D],
          controls: [new OMAP.Control.Navigation()]
        };
        // 初始化地图
        vm.map = new OMAP.Map("ocn_2_5D_map_hot", mapOptions)
      },
      // 选择热区
      touchHandler(e) {
        if (e.target) {
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
            // 解析地址
            var trans = new Transformation(45, 45, 49); // 坐标转换对象
            var wgs84pt = trans.OCN2WGS84(pt.x, pt.y);
            if (window.api) {
              this.$axios.get('http://api.map.baidu.com/geocoder/v2/', {
                location: wgs84pt.y + "," + wgs84pt.x,
                coordtype: 'wgs84ll',
                output: 'json',
                ak: "4eb424fae9e47fe4549f4846791df8b6"
              }).then(r => {
                alert(JSON.stringify(r.result.formatted_address));
                this.$emit('mark_hot', {
                  buildId: hoverGeom.data.id,
                  buildName: hoverGeom.data.name,
                  address: r.result.formatted_address,
                  pt: pt
                })
              })
            } else {
              this.$emit('mark_hot', {
                buildId: hoverGeom.data.id,
                buildName: hoverGeom.data.name,
                address: '非手机环境，模拟地址',
                pt: pt
              })
            }
          }
        } else {
          this.ocn.warn_toast(this).show('没有选中建筑', true)
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
