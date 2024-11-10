<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="title">开始称重</div>
	  <div class="history">历史过磅</div>
    </div>
	
    <!-- Tabs -->
    <!-- <div class="tabs">
      <button :class="{ active: activeTab === '净重' }" @click="activeTab = '净重'">称净重</button>
      <button :class="{ active: activeTab === '总重' }" @click="activeTab = '总重'">称总重</button>
      <button :class="{ active: activeTab === '皮重' }" @click="activeTab = '皮重'">称皮重</button>
      <button :class="{ active: activeTab === '二次过磅' }" @click="activeTab = '二次过磅'">二次过磅</button>
    </div> -->
	<div class="tabs">
	  <cover-view class="custom-button" :class="{ active: activeTab === '净重' }" @tap="activeTab = '净重'">称净重</cover-view>
	  <cover-view class="custom-button" :class="{ active: activeTab === '总重' }" @tap="activeTab = '总重'">称总重</cover-view>
	  <cover-view class="custom-button" :class="{ active: activeTab === '皮重' }" @tap="activeTab = '皮重'">称皮重</cover-view>
	  <cover-view class="custom-button" :class="{ active: activeTab === '二次过磅' }" @tap="activeTab = '二次过磅'">二次过磅</cover-view>
	</div>

    <!-- Vehicle Information -->
    <div class="section card-info">
      <div class="card-num"><div class="card-num-name">车牌号码*</div><input class="input-card-num" v-model="licensePlate" placeholder="请输入车牌号" /></div>
      <div class="quick-select">
        <div class="num-select-name">车牌快捷选择</div>
		<div class="record">
			<a class="history-record">历史记录</a>
			<a class="in-record">入场记录</a>
		</div>
      </div>
    </div>

    <!-- Fee Information -->
    <div class="section other-info">
		<div v-if="activeTab === '净重'" class="other-line card-weight-line">
			<div class="card-num-name">皮重(车重)KG*</div><input class="input-card-num" v-model="cardWeight" placeholder="重量" />
		</div>
		<div class="other-line">
			<div>磅费打印14元/次或1元/吨</div>
			<picker mode="selector" range="{{options}}" bindchange="onPickerChange">
			  <view class="picker">
			    {{selectedValue}}
			  </view>
			</picker>
			<!-- <select>
			  <option value="default">自定义</option>
			</select> -->
		</div>
		<div class="other-line">
			<div class="other-line2">
				<div class="line2-name">备注/柜号</div>
				<input class="company-input" v-model="remark" placeholder="可选" />
			</div>
		</div>
		<div class="other-line">
			<div class="other-line2">
				<div class="line2-name">企业账号</div>
				<input class="company-input" v-model="accountNumber" placeholder="无账号不需要输入" />
			</div>
			<div class="history-record">历史记录</div>
		</div>
    </div>
	
	<div v-if="activeTab === '二次过磅'" class="section card-info">
	    <view class="uni-list">
			<radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
					<view>{{item.name}}</view>
					<view>
						<radio :value="item.value" style="display: none;" :checked="index === current" />
						<view class="checkmark">
						    <text v-if="index === current" class="icon">✓</text> <!-- 显示蓝色勾勾 -->
						</view>
					</view>
				</label>
			</radio-group>
		</view>
	</div>

    <!-- Warnings -->
    <div class="warning">
      <div class="warn-title">温馨提示</div>
      <ol class="warn-content">
        <li>1、过磅结束后，您可以查看电子榜单，同时纸质榜单 将打印在园区门口保安室。</li>
        <li>2、收费规则：港车14元/次，其它车辆按含车重量、，1元/吨最低14元/次。</li>
        <li>3、有疑问请致电：18148566788</li>
      </ol>
    </div>

	<customloading v-if="showLoading" :show="showLoading" :loadingContent = "loadingContent"></customloading>
    <!-- Start Button -->
    <button class="start-button" @click="startWeighing">开始称重</button>
  </div>
</template>

<script>
	import { customloading } from '@/pages/demo-loading/demo-loading.vue'
export default {
  data() {
    return {
      activeTab: '总重',		// 导航栏的值，暂时有‘净重’、‘总重‘、’皮重‘、’二次过磅‘、四个可选。
      licensePlate: '粤B2K69C',		// 车牌号
	  cardWeight: '4200',		// 称重
      remark: '',			// 柜号
      accountNumber: '',	//	企业账号
	  options: ['自定义', '选项1', '选项2'],
	  selectedValue: '自定义',
	  showLoading: false,			// 开始、结束loading的开关
	  loadingContent: '等待中',		// loading内容
	  items: [{
				value: 'firstWeight',
				name: '第一次过磅',
			},
			{
				value: 'secondWeight',
				name: '第二次过磅'
			}],
	  current: 2	//	一、二次过磅的index标识，0表示第一次，1表示第二次，其他数字就是不选
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
		console.log('开始loading')
		this.showLoading = true; 	// 开启loading
		this.loadingContent = '正在启动设备，请稍后...', // loading内容
		setTimeout(() => {
			this.showLoading = false;	// 关闭loading
			setTimeout(() => {
				this.showLoading = true;
				this.loadingContent = '测量设备正在测量，请稍后...',
				setTimeout(() => {
					this.showLoading = false;
					// 用重载防止顶部导航栏出现返回按钮，下一个页面在onShow隐藏首页按钮即可让导航栏不显示回主页按钮。
					uni.reLaunch({
						url: '/pages/checkout/checkout'
					})
				}, 1000)
			}, 100);
		}, 1000)
		
    },
  },
  components: {
	  customloading
  }
};
</script>

<style lang="less" scoped>
.container {
  font-family: Arial, sans-serif;
  width: 100%;
  font-size: 17px;
}

.header {
	position: fixed;
	top: 0;
  padding: 10px 0;
  width: 100%;
  font-size: 1em;
  display: flex;
  background-color: #fff;
  border-bottom: 0.5px solid #ccc;
  
  .title {
	  font-weight: 500;
	  margin-right: auto;
	  text-align: center;
	  flex: 1;
  }
  
  .history {
	  position: absolute;
	  right: 10px;
      color: #007aff;
    }
}


.tabs {
	margin-top: 43px;
  display: flex;
  background-color: white;
  border: 1px solid rgb(61, 126, 252);
  border-radius: 7px;
  color: rgb(61, 126, 252);
  height: 25px;
  margin-bottom: 35px;
}

.custom-button {
  flex: 1;
  border: none;
  box-shadow: none; /* 移除阴影 */
  // padding: 0 10px;
  // margin: 0 1px;
  border-right: 1px solid rgb(61, 126, 252) !important;
  border-radius: 0px;
  font-size: 0.8em;
  color: rgb(61, 126, 252);
  height: 25px;
  line-height: 25px;
	text-align: center;
}

 .custom-button.active {
  background-color: rgb(61, 126, 252);
  color: white;
  border-radius: 0;
}

.section {
  padding: 3px 10px;
  background-color: #fff;
  margin: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}
.card-info {
	box-shadow: 0px 4px 12px #eee;
	.card-num {
		display: flex;
		align-items: center;
		height: 33px;
		line-height: 33px;
		margin-top: 5px;
		.card-num-name {
			height: 33px;
			line-height: 33px;
			margin: 0 15px 0px 10px;
		}
		.input-card-num {
			height: 33px;
			line-height: 33px;
			padding-left: 10px;
			width: 66%;
			border: 0.7px solid #009aee;
		}
	}
	
	.uni-list {
		.uni-list-cell-pd {
			display: flex;
			justify-content: space-between;
			margin: 10px 10px 20px 10px;
		}
		
		.checkmark {
			  width: 20px;
			  height: 20px;
			  display: flex;
			  justify-content: center;
			  align-items: center;
			  border-radius: 50%;
			  margin-right: 8px;
			}

			.icon {
			  color: #007aff; /* 设置勾勾颜色为蓝色 */
			  font-size: 16px;
			}
	}
}

.quick-select {
  display: flex;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
  
  .num-select-name {
	  margin: 0px 15px 20px 10px;
  }
  
  .record {
	  font-size: 13px;
	  font-weight: 600;
	  display: flex;
	  justify-content: space-between;
	  width: 36%;
	  
	  .history-record {
		  color: #007aff;
	  }
	  .in-record {
		  color: #59d7dd;
	  }
  }
}

.other-info {
	box-shadow: 0px 4px 12px #eee;
	
	.other-line {
		display: flex;
		justify-content: space-between;
		margin: 10px 10px 20px 10px;
		.card-num-name {
			height: 33px;
			line-height: 33px;
		}
		.input-card-num {
			height: 33px;
			line-height: 33px;
			padding-left: 10px;
			width: 58%;
			border: 0.7px solid #009aee;
		}
		
		.other-line2 {
			display: flex;
			width: 80%;
			line-height: 25px;
			.line2-name {
				margin-right: 10px;
			}
			.company-input {
				width: 60%;
			}
		}
		.history-record {
			line-height: 25px;
			font-size: 13px;
			font-weight: 600;
			color: #007aff;
		}
	}
	.card-weight-line {
		margin-top: 4px !important;
		margin-right: 0px;
	}
}


.warning {
  padding: 15px;
  background-color: #fff;
  border-radius: 8px;
  margin: 15px;
  box-shadow: 0px 4px 12px #eee;
  
  .warn-title {
	  font-size: 1.7em;
	  font-weight: 500;
	  margin-bottom: 30px;
  }
  .warn-content {
	  font-size: 15px;
	  color: #666;
  }
}

.start-button {
  width: 98%;
  padding: 4px 0;
  background-color: rgb(59, 127, 252);
  color: white;
  border: none;
  border-radius: 0px;
  font-size: 17px;
  position: fixed;
  left: 1%;
  bottom: 5px;
}
</style>
