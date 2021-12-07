const state = {
	// 自适应屏幕,默认PC,否则mobile
	responsive: 'PC',
	// 是否显示消息通知
	isShowSnackbar: false,
	// 消息通知信息
	snackbarMessage: null,
	// MetaMask钱包
	metaMask: null,
	// MetaMask钱包网络
	metaMaskNet: "",
	// 钱包地址
	walletAddress: null,
}

const getters = {
	responsive: state => state.responsive,
	snackbarMessage: state => state.snackbarMessage,
	isShowSnackbar: state => state.isShowSnackbar,
	metaMask: state => state.metaMask,
	metaMaskNet: state => state.metaMaskNet,
	walletAddress: state => state.walletAddress,
}

const actions = {
	responsiveHandler(context, payload){
		context.commit('responsiveHandler', payload);
	},
	isShowSnackbarHandler(context, payload){
		context.commit('isShowSnackbarHandler', payload);
	},
	snackbarMessageHandler(context, payload){
		context.commit('snackbarMessageHandler', payload);
	},
	metaMaskHandler(context, payload){
		context.commit('metaMaskHandler', payload);
	},
	metaMaskNetHandler(context, payload){
		context.commit('metaMaskNetHandler', payload);
	},
	walletAddressHandler(context, payload){
		context.commit('walletAddressHandler', payload);
	},
}

const mutations = {
	responsiveHandler(state, responsive){
		state.responsive = responsive;
	},
	isShowSnackbarHandler(state, isShowSnackbar){
		state.isShowSnackbar = isShowSnackbar;
	},
	snackbarMessageHandler(state, snackbarMessage){
		if(snackbarMessage != null && snackbarMessage != ''){
			state.snackbarMessage = snackbarMessage;
			state.isShowSnackbar = true;
		}
	},
	metaMaskHandler(state, metaMask){
		state.metaMask = metaMask;
	},
	metaMaskNetHandler(state, metaMaskNet){
		state.metaMaskNet = metaMaskNet;
	},
	walletAddressHandler(state, walletAddress){
		state.walletAddress = walletAddress;
	},
}

export default {
	state,
	getters,
	actions,
	mutations
}