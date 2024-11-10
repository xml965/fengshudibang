<template>
  <view class="container">
    <!-- 弹窗 -->
    <view class="modal-overlay" v-if="isShow">
      <view class="modal-content">
        <image class="loading-icon" src="@/static/loading.gif"></image>
        <text class="modal-text">{{loadingContent}}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "customloading",
  props: {
	  show: {
	  	default: true,
	  	type: Boolean
	  },
	  loadingContent: {
		  default: '等待中...',
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
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  max-width: 220px;
  padding: 22px 38px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  text-align: center;
  
  .loading-icon {
		width: 30px;
		height: 30px;
  }
  
  .modal-text {
	  text-align: left;
	  margin-left: 10px;
	  font-size: 14px;
	  width: 80%;
  }
}


</style>
