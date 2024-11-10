<template>
	<view class="container">
	    <!-- Header -->
	    <div class="header">
			<div class="back" @click="back">
				<image class="back-icon" src="@/static/back.png"></image>
				<div class="back-desc">返回</div>
			</div>
			<div class="title">支付结算</div>
	    </div>
		<div class="amount">费用(¥)：14</div>
		<div class="payinfo-form">
			<div class="form-line">
				<div class="form-line-name">车牌号码</div>
				<div class="form-line-value">粤B2K69C</div>
			</div>
			<div class="form-line">
				<div class="form-line-name">皮重(车重)</div>
				<div class="form-line-value">14242KG</div>
			</div>
			<div class="form-line">
				<div class="form-line-name">过磅费</div>
				<div class="form-line-value">34元</div>
			</div>
			<div class="form-line">
				<div class="form-line-name">月卡用户</div>
				<div class="form-line-value"></div>
			</div>
			<div class="form-line">
				<div class="form-line-name">企业账号</div>
				<div class="form-line-value"></div>
			</div>
		</div>
		<button class="start-button">支付费用</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			back() {
				uni.redirectTo({
				    url: '/pages/index/index'
				});
			}
		},
		onShow() {
			uni.hideHomeButton();
		}
	}
</script>

<style lang="less" scoped>
.container {
  font-family: Arial, sans-serif;
  width: 100%;
  font-size: 17px;
}
.header {
  padding: 10px 0;
  width: 100%;
  font-size: 17px;
  display: flex;
  // align-items: center;
  // justify-content: space-between;
  
  .title {
	  font-weight: 500;
      // justify-content: center;
	  // text-align: center;
	  margin-right: auto;
	  text-align: center;
	  flex: 1;
  }
  
  .back {
	  position: absolute;
	  left: 6px;
      color: #007aff;
	  display: flex;
	  
	  .back-icon {
		  width: 21px;
		  height: 24px;
	  }
	  .back-desc {
		  line-height: 26px;
	  }
    }
}
.amount {
	width: 100%;
	background-color: rgb(2, 77, 160);
	color: white;
	font-size: 34px;
	text-align: center;
	height: 98px;
	line-height: 98px;
	margin: 0 auto;
}
.payinfo-form {
	.form-line {
		display: flex;
		margin: 0 20px;
		padding: 12px 0;
		border-bottom: 0.8px solid #ddd;
		justify-content: space-between;
		
		.form-line-name {
			
		}
		.form-line-value {
			color: #aaa;
		}
	}
}
.start-button {
  width: 98%;
  padding: 4px 0;
  background-color: rgb(59, 127, 252);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 17px;
  position: fixed;
  left: 1%;
  bottom: 5px;
}
</style>
