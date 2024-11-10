"use strict";
const common_vendor = require("./common/vendor.js");
const common_assets = require("./common/assets.js");
const _sfc_main = {
  name: "customloading",
  props: {
    show: {
      default: true,
      type: Boolean
    },
    loadingContent: {
      default: "等待中...",
      type: String
    }
  },
  data() {
    return {
      isShow: this.show,
      loadingContent: this.loadingContent
    };
  },
  methods: {
    // 隐藏弹窗
    hideModal() {
      this.isShow = false;
    }
  },
  watch: {
    show(val) {
      this.isShow = val;
    },
    loadingContent(val) {
      this.loadingContent = val;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.isShow
  }, $data.isShow ? {
    b: common_assets._imports_0$1,
    c: common_vendor.t($data.loadingContent)
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-45acf524"]]);
exports.MiniProgramPage = MiniProgramPage;
