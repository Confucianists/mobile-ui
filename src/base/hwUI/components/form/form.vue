<template>
  <div class="form weui-cells weui-cells_form">
    <div v-for="(item, index) in data.show" :key="index">
      <!--字符串类型-->
      <div :class="item.warn ? 'weui-cell weui-cell_warn cgweui' : 'weui-cell cgweui'" v-if="item.type === 'text' || item.type === 'password'">
        <div class="weui-cell__hd"><label class="weui-label">{{item.text}}</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" :disabled="item.readonly || isEdit || item.edit" :type="item.type" v-model="data.f[item.value]" :placeholder="getplaceholder(item)">
        </div>
        <!--警告按钮-->
        <div class="weui-cell__ft" v-if="item.warn">
          <i class="weui-icon-warn"></i>
        </div>
      </div>
      <!--验证手机号码-->
      <div :class="item.warn ? 'weui-cell weui-cell_warn cgweui' : 'weui-cell cgweui'" v-if="item.type === 'tel'">
        <div class="weui-cell__hd"><label class="weui-label">{{item.text}}</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" :disabled="item.readonly || isEdit || item.edit" :type="item.type" v-model="data.f[item.value]" :placeholder="getplaceholder(item)">
        </div>
        <!--警告按钮-->
        <div class="weui-cell__ft" v-if="item.warn">
          <i class="weui-icon-warn"></i>
        </div>
      </div>
      <!--数字类型-->
      <div :class="item.warn ? 'weui-cell weui-cell_warn cgweui' : 'weui-cell cgweui'" v-if="item.type === 'number'">
        <div class="weui-cell__hd"><label class="weui-label">{{item.text}}</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="number" :disabled="isEdit || item.edit" v-model="data.f[item.value]" :placeholder="getplaceholder(item)">
        </div>
        <!--警告按钮-->
        <div class="weui-cell__ft" v-if="item.warn">
          <i class="weui-icon-warn"></i>
        </div>
      </div>
      <!--证件号码类型-->
      <div :class="item.warn ? 'weui-cell weui-cell_warn cgweui' : 'weui-cell cgweui'" v-if="item.type === 'certificate'">
        <div class="weui-cell__hd"><label class="weui-label">{{item.text}}</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" :disabled="isEdit || item.edit" v-model="data.f[item.value]" :placeholder="getplaceholder(item)">
        </div>
        <!--警告按钮-->
        <div class="weui-cell__ft" v-if="item.warn">
          <i class="weui-icon-warn"></i>
        </div>
      </div>
      <!--单选输入框-->
      <div 
        :class="item.warn ? 'weui-cell weui-cell_warn weui-cell_access cgweui' : 'weui-cell weui-cell_access cgweui'" 
        v-if="item.type === 'single'" 
        @click="!item.edit && !isEdit && picker(item)">
        <div class="weui-cell__hd"><label class="weui-label">{{item.text}}</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="item.valueShow" disabled :placeholder="clickGetplaceholder(item)">
        </div>
        <div class="weui-cell__ft">
          <i class="weui-icon-warn"></i>
        </div>
      </div>
      <!--点击事件-->
      <div 
        :class="item.warn ? 'weui-cell weui-cell_warn weui-cell_access cgweui' : 'weui-cell weui-cell_access cgweui'" 
        v-if="item.type === 'click'" 
        @click="!item.edit && !isEdit && clickli(item)">
        <div class="weui-cell__hd"><label class="weui-label">{{item.text}}</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="data.f[item.value]" disabled :placeholder="clickGetplaceholder(item)">
        </div>
        <div class="weui-cell__ft">
          <i class="weui-icon-warn"></i>
        </div>
      </div>
      <!--多选输入框 start-->
      <div 
        :class="item.warn ? 'weui-cell weui-cell_warn weui-cell_access cgweui' : 'weui-cell weui-cell_access cgweui'" 
        v-if="item.type === 'multi'" 
        @click="!item.edit && !isEdit && multiPickerBack({data:item, type:false, index:index})">
        <div class="weui-cell__hd"><label class="weui-label">{{item.text}}</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="item.valueShow" disabled :placeholder="clickGetplaceholder(item)">
        </div>
        <div class="weui-cell__ft">
          <i class="weui-icon-warn"></i>
        </div>
      </div>
      <!--地图标注-->
      <div 
        :class="item.warn ? 'weui-cell weui-cell_warn weui-cell_access cgweui' : 'weui-cell weui-cell_access cgweui'" 
        v-if="item.type === 'mapTagging'" 
        @click="!item.edit && !isEdit && tageMap({data:item, type:false, index:index})">
        <div class="weui-cell__hd"><label class="weui-label">{{item.text}}</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="data.f[item.value]" disabled :placeholder="clickGetplaceholder(item)">
        </div>
        <div class="weui-cell__ft">
          <i class="weui-icon-warn"></i>
        </div>
      </div>
      <!--日期输入框-->
      <div 
        :class="item.warn ? 'weui-cell weui-cell_warn weui-cell_access cgweui' : 'weui-cell weui-cell_access cgweui'" 
        v-if="item.type === 'date'" 
        @click="!item.edit && !isEdit && showDatePicker(item.text, item.min, item.max, item.val, item.columnCount, item.value)">
        <div class="weui-cell__hd"><label class="weui-label">{{item.text}}</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" disabled :placeholder="clickGetplaceholder(item)" v-model="data.f[item.value]">
        </div>
        <div class="weui-cell__ft">
          <i class="weui-icon-warn"></i>
        </div>
      </div>
      <!--switch开关 start-->
      <div v-if="item.type === 'switch'" class="weui-cell weui-cell_switch cgweui">
        <div class="weui-cell__bd">{{item.text}}</div>
        <div class="weui-cell__ft">
          <input :disabled="isEdit" class="weui-switch" type="checkbox" v-model="item.valueShow">
        </div>
      </div>
      <!--文本域 start-->
      <div class="weui-cell cgweui" v-if="item.type === 'textarea'">
        <div class="weui-cell__bd">
          <textarea class="weui-textarea" :placeholder="item.text" rows="3" v-model="data.f[item.value]"></textarea>
          <div class="weui-textarea-counter"><span>{{data.f[item.value].length}}</span>字</div>
        </div>
      </div>
    </div>
    <!--多选弹出层 start-->
    <hw-multi-picker :visible.sync="multiPickerVisible" ref="multi" @sure="multiPickerBack"></hw-multi-picker>
  </div>
</template>

<script type="text/ecmascript-6">
  /**
   * 表单配置type
   * certificate :公民身份号码  (验证是否含有中文，不能含有中文)
   * text :字符串 （验证是否为空）
   * number :数字类型 （验证是否为空）
   * single :单选 （验证是否为空）
   * multi :多选 （验证是否为空）
   * switch :是否开关
   * date :日期时间
   * map :关联地图
   */
  import OcnMultiPicker from './multiPicker'
  export default {
    name: 'hw-form',
    components: {
      OcnMultiPicker
    },
    props: {
      // 是否是编辑状态
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        data: {},
        // 多选弹出层
        multiPickerVisible: false,
        i: 0,
        // 多选数据临时存储
        multiData: {
          valueShow: ''
        },
        tagPoint: '', //修改标注信息
        tagAddress: ''
      }
    },
    methods: {
      // 动态展示
      getplaceholder(item) {
        if (item.placeholder) {
          return item.placeholder
        } else {
          if (item.validate) {
            return '必填'
          } else {
            return '选填'
          }
        }
      },
      clickGetplaceholder(item) {
        if (item.placeholder) {
          return item.placeholder
        } else {
          if (item.validate) {
            return '必填'
          } else {
            return '选填'
          }
        }
      },
      clickli(item) {
        if (!this.isEdit) {
          item.callback && item.callback()
        }
      },
      showToastType(n, flag) {
        const toast = this.$createToast({
          txt: n + (flag || '没有数据'),
          type: 'txt'
        })
        toast.show()
      },
      validate(flag, cb) {
        if (this.isEdit) {
          return false;
        }
        // this.data.show[1].warn = true;
        !flag && (this.i = 0);
        var reg = /[\u4e00-\u9fa5]/g;
        if (this.data.show[this.i].type != 'switch' && this.data.f[this.data.show[this.i].value] == '' && this.data.show[this.i].validate) {
          this.data.show[this.i].warn = true;
          this.showToastType(this.data.show[this.i].text);
        } else if (this.data.show[this.i].type == 'tel' && this.data.show[this.i].validate == true && !/^1\d{10}$/.test(this.data.f[this.data.show[this.i].value].replace(/\s/g, "").replace(/-/g, ""))) {
          this.data.show[this.i].warn = true;
          this.showToastType(this.data.show[this.i].text, '错误！');
        } else if (this.data.show[this.i].type == 'tel' && this.data.show[this.i].validate == false && this.data.f[this.data.show[this.i].value] != '' && !/^1\d{10}$/.test(this.data.f[this.data.show[this.i].value].replace(/\s/g, "").replace(/-/g, "")) ) {
          this.data.show[this.i].warn = true;
          this.showToastType(this.data.show[this.i].text, '错误！');
        } else if (this.data.show[this.i].type == 'certificate' && reg.test(this.data.f[this.data.show[this.i].value])) {
          this.data.show[this.i].warn = true;
          this.showToastType(this.data.show[this.i].text, '不能输入中文！');
        } else {
          this.data.show[this.i].warn = false;
          if (this.i < this.data.show.length - 1) {
            this.i++;
            this.validate(true);
          } else {
            // switch开关的重新赋值
            this.data.show.forEach(e => {
              if (e.type == 'switch') {
                e.options.forEach(ele => {
                  if (ele.text == '否') {
                    if (!e.valueShow) {
                      this.data.f[e.value] = ele.value
                    }
                  } else if (ele.text == '是') {
                    if (e.valueShow) {
                      this.data.f[e.value] = ele.value
                    }
                  }
                })
              }
            })
            this.$emit('submit', this.data.f);
          }
        }
      },
      init(r) {
        this.data = r;
        this.addDictionary()
        this.__location_Tag()
      },
      // 修改标注信息
      change_tag(point, address) {
        this.data.f[this.tagPoint] = point
        this.data.f[this.tagAddress] = address
      },
      // 修改表单内容
      changeData(r) {
        this.$set(this.data, "f", r.f)
        this.$set(this.data, "show", r.show)
      },
      getData() {
        let r = new Promise(reslove => {
          reslove(this.data)
        })
        return r
      },
      // 如果含有地图标注的选项
      __location_Tag() {
        this.data.show.forEach(e => {
          if (e.type == 'mapTagging') {
            this.tagPoint = e.value
            this.data.show.forEach(el => {
              if (el.text == '地址名称') {
                this.tagAddress = el.value
              }
            })
            this.ocn.location().getLocation()
              .then(r => {
                this.data.f[e.value] = r.ocn.string
                this.ocn.location().getAddressName(r.bd.string)
                  .then(rName => {
                    this.data.f[this.tagAddress] = rName.result.formatted_address
                  })
              })
          }
        })
      },
      // 数据字典加载数据
      addDictionary() {
        this.ocn.loading(this).show('数据字典配置中')
        this.ocn.dictionaries().get()
          .then(dictionaries => {
            this.data.show.forEach(eSet => {
              if (eSet.dictionary) {
                dictionaries.data.forEach(e => {
                  if (e.parentKey == eSet.dictionary) {
                    if (eSet.type == 'single' || eSet.type == 'switch') {
                      // 判断有没有值，有值的话，直接赋值
                      if (this.data.f[eSet.value] == e.extendAttributeKey) {
                        eSet.valueShow = e.extendAttributeValue
                      }
                      // 加入选择数据
                      eSet.options.push({
                        text: e.extendAttributeValue,
                        value: e.extendAttributeKey
                      })
                    } else if (eSet.type == 'multi') {
                      // 判断有没有值，有值的话，直接赋值
                      let arrmulti = this.data.f[eSet.value].split(',')
                      arrmulti.forEach(multiv => {
                        if (multiv == e.extendAttributeKey) {
                          eSet.checkList.push(multiv)
                          eSet.valueShow = eSet.valueShow + ' ' + e.extendAttributeValue
                        }
                      })
                      // 加入选择数据
                      eSet.options.push({
                        label: e.extendAttributeValue,
                        value: e.extendAttributeKey,
                        disabled: false
                      })
                    }
                  }
                })
              }
            })
            this.ocn.loading(this).hide()
          })
      },
      // 地图标注
      tageMap() {
        this.data.mapPath && this.$router.push(this.data.mapPath)
      },
      // 多选
      multiPickerBack(r) {
        if (!r.type) {
          // 弹出多选
          this.multiPickerVisible = true
          this.multiData = r.data;
          this.multiData.index = r.index;
          this.$refs.multi.updata({
            checkList: r.data.checkList,
            options: r.data.options
          })
        } else {
          // 返回数据
          this.data.f[this.multiData.value] = r.data.valueString;
          this.data.show[this.multiData.index].valueShow = r.data.optionsString;
          this.data.show[this.multiData.index].checkList = r.data.valueArray;
        }
      },
      /**
       * 选择日期时间
       * type: date (选择年月日)
       * type: time (选择时分)
       * type: yearMouth (选择年月)
       * type: dateTime (年月日时分)
       * type: dateTimeSecond (年月日时分秒)
       * title: 标题
       * min: 可选范围的最小值 new Date(2010, 1, 1)
       * max: 可选范围的最大值 new Date(2020, 12, 31)
       * value: 当前选择的日期 new Date()
       */
      showDatePicker(title, min, max, val, columnCount, value) {
        if (!this[value + 'Picker']) {
          this[value + 'Picker'] = this.$createDatePicker({
            title: title || '时间选择',
            min: min || new Date(2008, 7, 8),
            max: max || new Date(),
            value: val || new Date(),
            format: {
              year: 'YYYY',
              month: 'M',
              date: 'D',
              hour: 'hh',
              minute: 'mm',
              second: 'ss'
            },
            columnCount: columnCount || 3,
            onSelect: (date, selectedVal, selectedText) => {
              this.data.f[value] = 123;
              if (selectedVal.length <= 3) {
                this.data.f[value] = selectedVal.join('-');
              } else {
                var arr = selectedVal.slice(0, 3);
                var arr2 = selectedVal.slice(3, selectedVal.length);
                this.data.f[value] = arr.join('-') + ' ' + arr2.join(':');
              }
            }
          })
        }
        this[value + 'Picker'].show();
      },
      // 单选picker
      picker(item) {
        this.$createPicker({
          title: item.text,
          data: [item.options],
          onSelect: (selectedVal, selectedIndex, selectedText) => {
            item.valueShow = selectedText;
            this.data.f[item.value] = selectedVal[0];
          },
          onCancel: () => {}
        }).show();
      }
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~@/common/stylus/variable'
@import '../../common/stylus/mixin'
.form
  text-align left
  margin-top 0
  font-size 13px
.cgweui
  min-height: 23px;
  position relative
  // padding: 0px 15px;
  &:after
    setBottomLine($color-line-small)
</style>