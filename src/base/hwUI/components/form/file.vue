<template>
  <div class="weui-cells weui-cells_form">
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <div class="weui-uploader">
          <div class="weui-uploader__hd">
            <p class="weui-uploader__title">{{title? title : '附件上传'}}</p>
            <div class="weui-uploader__info">{{files.length}}</div>
          </div>
          <div class="weui-uploader__bd">
            <ul class="weui-uploader__files" id="uploaderFiles">
              <div v-for="(item, index) in files" :key="index" class="weui-uploader__file">
                <img :src="filter(item)" @click="openFile(item)" class="imgshow" />
                <img @click="delfile(item, index)" src="../../common/images/icon_del.png" class="del" v-if="!isEdit">
              </div>
            </ul>
            <div class="weui-uploader__input-box" v-if="!isEdit">
              <div v-if="apiFlag" id="uploaderInput" class="weui-uploader__input" @click="choose"></div>
              <input v-else id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="hw-file-choose"></div> -->
    <!--录音组件-->
    <hw-file-record :visible.sync="recordVisible" @getrecoed="getrecoed"></hw-file-record>
  </div>
</template>

<script>
  import weui from 'weui.js'
  import OcnFileRecord from './record'
  export default {
    name: 'hw-file',
    components: {
      OcnFileRecord
    },
    data() {
      return {
        files: [],
        // 录音组件
        recordVisible: false
      }
    },
    props: ['type', 'title', 'maximum', 'isEdit'],
    created() {
      this.apiFlag = true
    },
    watch: {
      files(r) {
        if (this.files.length > this.maximum) {
          this.files.splice(0, 1)
        }
      }
    },
    methods: {
      // 加载图片数据
      addFiles(r) {
        this.files = this.files.concat(r)
      },
      // 获取文件地址
      getfiles() {
        let r = this.files.filter(item => item.substring(0, 4) != 'data' && item.substring(0, 4) != 'http')
        return Promise.resolve(r)
      },
      // 过滤分类数据信息
      filter(url) {
        let attribute = url.substring(url.lastIndexOf('.') + 1, url.length)
        let header = url.substring(0, 4)
        if (header == 'data') {
          return url
        } else if (attribute == 'jpg' || attribute == 'png' || attribute == 'jpg') {
          return url
        } else if (attribute == '3gp' || attribute == 'mp4') {
          return require('../../common/images/video.jpg')
        } else if (attribute == 'amr') {
          return require('../../common/images/record.png')
        } else {
          return require('../../common/images/file.png')
        }
      },
      // 照片选择
      choosePhoto() {
        let that = this
        let flag = 0
        let sourceType = ''
        weui.actionSheet([{
          label: '相机',
          onClick: function() {
            flag = 1
            sourceType = 'camera'
          }
        }, {
          label: '相册',
          onClick: function() {
            flag = 1
            sourceType = 'album'
          }
        }, {
          label: '图片库',
          onClick: function() {
            flag = 1
            sourceType = 'library'
          }
        }], [{
          label: '取消',
          onClick: function() {
            console.log('取消');
          }
        }], {
          className: 'ocn-photo-choose',
          onClose: function() {
            if (flag == 1) {
              that.camera_img(sourceType)
            }
          }
        });
      },
      // 照片
      camera_img(sourceType) {
        let that = this
        api.getPicture({
          sourceType: sourceType,
          encodingType: 'jpg',
          mediaValue: 'pic',
          destinationType: 'url',
          allowEdit: true,
          quality: 50,
          saveToPhotoAlbum: false
        }, function(ret, err) {
          if (ret) {
            const imgpath = ret.data
            if (imgpath != '') {
              const imageFilter = api.require('imageFilter')
              const timestamp = (new Date()).getTime()
              imageFilter.getAttr({
                path: imgpath
              }, function(r, e) {
                let tempwidth = r.width
                let tempheight = r.height
                let bili = tempwidth / tempheight
                let height = 1200
                let width = height * bili
                // 图片压缩
                imageFilter.compress({
                  img: imgpath,
                  quality: 1,
                  size: {
                    w: width,
                    h: height
                  },
                  save: {
                    album: false,
                    imgPath: "fs://apicloud/",
                    imgName: timestamp + '.jpg'
                  }
                }, function(imgr, imgerr) {
                  if (imgr.status) {
                    console.log(imgr)
                    let pathtemp = api.fsDir + "/apicloud/" + timestamp + ".jpg"
                    that.files.push(pathtemp)
                    console.log(that.files)
                  }
                })
              })
            }
          }
        })
      },
      // 查看照片
      openFile(url) {
        let vm = this
        let attribute = url.substring(url.lastIndexOf('.') + 1, url.length)
        if (attribute == 'jpg' || attribute == 'png') {
          api.require('imageBrowser').openImages({
            imageUrls: [url],
            showList: false,
            activeIndex: 0,
            tapClose: true
          });
        } else if (attribute == '3gp' || attribute == 'mp4') {
          api.openVideo({
            url: url
          });
        } else if (attribute == 'amr' || attribute == 'mp3') {
          this.ocn.loading(this).show('播放录音中……')
          api.startPlay({
            path: url
          }, function(ret, err) {
            vm.ocn.loading(vm).hide()
          });
        } else {
          vm.ocn.correct_toast(vm).show(url)
        }
      },
      // 选择视频的方式
      video_choose() {
        let that = this
        let flag = 0
        weui.actionSheet([{
          label: '录制视频',
          onClick: function() {
            flag = 1
          }
        }, {
          label: '选择视频',
          onClick: function() {
            flag = 2
          }
        }], [{
          label: '取消',
          onClick: function() {
            console.log('取消');
          }
        }], {
          className: 'ocn-video-choose',
          onClose: function() {
            if (flag == 1) {
              that.recordVideo()
            } else if (flag == 2) {
              that.getVideo()
            }
          }
        });
      },
      // 录制视频
      recordVideo() {
        let that = this
        api.getPicture({
          sourceType: 'camera',
          mediaValue: 'video',
          destinationType: 'url',
          allowEdit: true,
          saveToPhotoAlbum: false
        }, function(ret, err) {
          if (ret) {
            var videoPath = ret.data;
            if (videoPath != "") {
              that.files.push(videoPath)
            }
          } else {
            alert(JSON.stringify(err));
          }
        });
      },
      // 删除该文件
      delfile(item, index) {
        let arr = item.split('/')
        let vm = this
        weui.dialog({
          title: '删除文件',
          content: '确定要删除' + arr[arr.length - 1] + '文件吗？',
          className: 'ocn-file-del',
          buttons: [{
            label: '取消',
            type: 'default',
            onClick: function() {}
          }, {
            label: '确定',
            type: 'primary',
            onClick: function() {
              console.log(vm.files)
              vm.files.splice(index, index + 1)
              console.log(vm.files)
            }
          }]
        });
      },
      // 选择手机中的视频
      getVideo: function() {
        let that = this;
        api.require('UIMediaScanner').open({
          type: 'video',
          column: 4,
          classify: true,
          max: 4,
          sort: {
            key: 'time',
            order: 'desc'
          },
          texts: {
            stateText: '已选择*项',
            cancelText: '取消',
            finishText: '完成'
          },
          styles: {
            bg: '#fff',
            mark: {
              icon: '',
              position: 'bottom_left',
              size: 20
            },
            nav: {
              bg: '#eee',
              stateColor: '#000',
              stateSize: 18,
              cancelBg: 'rgba(0,0,0,0)',
              cancelColor: '#000',
              cancelSize: 18,
              finishBg: 'rgba(0,0,0,0)',
              finishColor: '#000',
              finishSize: 18
            }
          },
          scrollToBottom: {
            intervalTime: -1,
            anim: false
          },
          exchange: true,
          rotation: true
        }, function(ret) {
          if (ret) {
            if (ret.eventType != "cancel") {
              for (var i = 0; i < ret.list.length; i++) {
                var videoPath = ret.list[i].path;
                that.files.push(videoPath)
              }
            }
          }
        });
      },
      // 选择文件
      chooseFile: function() {
        var vm = this
        api.require('selectFile').open(function(ret, err) {
          if (ret.status) {
            vm.files.push(ret.path);
          } else {
            alert('选择文件不存在');
          }
        });
      },
      // 获取录音
      getrecoed(filepath) {
        this.files.push(filepath)
      },
      // 选择上传附件的类型
      choose() {
        if (this.type && this.type.length == 1 && this.type[0] == 'photo') {
          this.choosePhoto()
        } else {
          let that = this
          let flag = 0
          weui.actionSheet([{
            label: '照片',
            onClick: function() {
              flag = 1
            }
          }, {
            label: '视频',
            onClick: function() {
              flag = 2
            }
          }, {
            label: '录音',
            onClick: function() {
              flag = 3
            }
          }, {
            label: '文件',
            onClick: function() {
              flag = 4
            }
          }], [{
            label: '取消',
            onClick: function() {
              console.log('取消')
            }
          }], {
            className: 'ocn-file-choose',
            onClose: function() {
              if (flag == 1) {
                that.choosePhoto()
              } else if (flag == 2) {
                that.video_choose()
              } else if (flag == 3) {
                that.recordVisible = true
              } else if (flag == 4) {
                that.chooseFile()
              }
            }
          });
        }
      },
      // 上传附件
      upload(url) {
        let r = new Promise((reslove, reject) => {
          this.getfiles()
            .then(files => {
              if (files.length > 0) {
                this.ocn.loading(this).show('附件上传中……')
                let vm = this
                window.api && api.ajax({
                  url: url,
                  method: 'post',
                  data: {
                    files: {
                      file: files
                    }
                  }
                }, function(ret, err) {
                  vm.ocn.loading(vm).hide()
                  reslove(ret)
                })
              } else {
                reslove('')
              }
            })
        })
        return r
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable'
@import '../../common/stylus/mixin'
.weui-cells
  font-size 13px
.weui-uploader__file
  position relative
  overflow hidden
  .imgshow
    width 100%
  .del
    position absolute
    top 0px
    right 0px
    width 24px
</style>
