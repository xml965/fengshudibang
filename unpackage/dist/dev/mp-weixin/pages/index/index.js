"use strict";
const common_vendor = require("../../common/vendor.js");
const customloading = () => "../demo-loading/demo-loading2.js";
const _sfc_main = {
  data() {
    return {
      activeTab: "总重",
      // 导航栏的值，暂时有‘净重’、‘总重‘、’皮重‘、’二次过磅‘、四个可选。
      licensePlate: "粤B2K69C",
      // 车牌号
      cardWeight: "4200",
      // 称重
      remark: "",
      // 柜号
      accountNumber: "",
      //	企业账号
      options: ["自定义", "选项1", "选项2"],
      selectedValue: "自定义",
      showLoading: false,
      // 开始、结束loading的开关
      loadingContent: "等待中",
      // loading内容
      items: [
        {
          value: "firstWeight",
          name: "第一次过磅"
        },
        {
          value: "secondWeight",
          name: "第二次过磅"
        }
      ],
      current: 2
      //	一、二次过磅的index标识，0表示第一次，1表示第二次，其他数字就是不选
    };
  },
  methods: {
    onPickerChange(e) {
      const index = e.detail.value;
      this.setData({
        selectedValue: this.data.options[index]
      });
    },
    // 一、二次过磅radio单选框方法
    radioChange(evt) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].value === evt.detail.value) {
          this.current = i;
          break;
        }
      }
    },
    // 开始称重方法
    startWeighing() {
      console.log("开始loading");
      this.showLoading = true;
      this.loadingContent = "正在启动设备，请稍后...", // loading内容
      setTimeout(() => {
        this.showLoading = false;
        setTimeout(() => {
          this.showLoading = true;
          this.loadingContent = "测量设备正在测量，请稍后...", setTimeout(() => {
            this.showLoading = false;
            common_vendor.index.reLaunch({
              url: "/pages/checkout/checkout"
            });
          }, 1e3);
        }, 100);
      }, 1e3);
    }
  },
  components: {
    customloading
  }
};
if (!Array) {
  const _component_customloading = common_vendor.resolveComponent("customloading");
  _component_customloading();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.activeTab === "净重" ? 1 : "",
    b: common_vendor.o(($event) => $data.activeTab = "净重"),
    c: $data.activeTab === "总重" ? 1 : "",
    d: common_vendor.o(($event) => $data.activeTab = "总重"),
    e: $data.activeTab === "皮重" ? 1 : "",
    f: common_vendor.o(($event) => $data.activeTab = "皮重"),
    g: $data.activeTab === "二次过磅" ? 1 : "",
    h: common_vendor.o(($event) => $data.activeTab = "二次过磅"),
    i: $data.licensePlate,
    j: common_vendor.o(($event) => $data.licensePlate = $event.detail.value),
    k: $data.activeTab === "净重"
  }, $data.activeTab === "净重" ? {
    l: $data.cardWeight,
    m: common_vendor.o(($event) => $data.cardWeight = $event.detail.value)
  } : {}, {
    n: common_vendor.t($data.selectedValue),
    o: $data.remark,
    p: common_vendor.o(($event) => $data.remark = $event.detail.value),
    q: $data.accountNumber,
    r: common_vendor.o(($event) => $data.accountNumber = $event.detail.value),
    s: $data.activeTab === "二次过磅"
  }, $data.activeTab === "二次过磅" ? {
    t: common_vendor.f($data.items, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.name),
        b: item.value,
        c: index === $data.current,
        d: index === $data.current
      }, index === $data.current ? {} : {}, {
        e: item.value
      });
    }),
    v: common_vendor.o((...args) => $options.radioChange && $options.radioChange(...args))
  } : {}, {
    w: $data.showLoading
  }, $data.showLoading ? {
    x: common_vendor.p({
      show: $data.showLoading,
      loadingContent: $data.loadingContent
    })
  } : {}, {
    y: common_vendor.o((...args) => $options.startWeighing && $options.startWeighing(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
