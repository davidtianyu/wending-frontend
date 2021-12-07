const state = {
	token: null,
	locale: 'en-US'
}

const getters = {
	token: state => {
		if (state.token) {
			return state.token;
		}
		state.token = localStorage.getItem('wending.fund-token');
		return state.token;
	},
	locale: state => {
		let locale = localStorage.getItem('wending.fund-locale');
		if (locale != null) {
			state.locale = locale;
		} else {
			localStorage.setItem('wending.fund-locale', 'en-US');
			state.locale = 'en-US';
		}
		return state.locale;
	}
}

const actions = {
	tokenHandler(context, payload){
		context.commit('tokenHandler', payload);
	},
	localeHandler(context, payload){
		context.commit('localeHandler', payload);
	}
}

const mutations = {
	tokenHandler(state, token){
		if(token == null){
			localStorage.removeItem('wending.fund-token');
		} else {
			localStorage.setItem('wending.fund-token', token);
		}
		state.token = token;
	},
	localeHandler(state, locale){
		localStorage.setItem("wending.fund-locale", locale);
		state.locale = locale;
		if (state.user != null) {
			state.user.locale = locale;
		}
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}