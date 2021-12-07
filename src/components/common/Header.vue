<template>
	<div>
        <v-app-bar fixed v-if="responsive == 'PC' ">
            <v-container class="px-0">
                <v-row no-gutters>
                    <v-col cols="6" md="2" class="">
                        
                    </v-col>
                    <v-col cols="6" md="1" offset="3" class="ml-n3">
                        <div class="pointer d-custom-flex mt-2">
                            <router-link to="/">
                                Logo
                            </router-link>
                        </div>
                    </v-col>
                    <v-col cols="6" md="3" class="">
                        
                    </v-col>
                    <v-col cols="6" md="4" class="pt-4 text-right">
                        <span color="grey darken-4" class="text--darken-2 fs-14 text-none mr-1" v-if="net != ''" :class="netColor + '--text'">{{ net }}</span>
                        <span v-show="account == null">
                            <v-menu offset-y left v-model="isShowConnectWalletMenu">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn tile outlined small text class="text-none mr-2" v-bind="attrs" v-on="on">Connect Wallet</v-btn>
                                </template>
                                <v-card tile width="340">
                                    <v-card-title class="pb-2 pt-5">
                                        <h6>Connect Wallet</h6>
                                    </v-card-title>
                                    <v-card-text class="pb-1">
                                        <v-row justify="center" class="metamask-menu-border mx-1" dense>
                                            <v-col cols="12" v-if="metaMask == null">
                                                <a href="https://metamask.io/download" target="_blank" class="del-underline title_txt">
                                                    <v-row class=" ma-1 fs-22">
                                                        <span class="fs-16 pure-red--text"><a>Install MetaMask</a></span>
                                                        <v-spacer></v-spacer>
                                                        <img src="https://files.iob.fi/2020/11/1606367867136-2a0d2f8d57075f0f9de812256a79ce91-metamask.webp" width="20px" height="20px" />
                                                    </v-row>
                                                </a>
                                            </v-col>
                                            <v-col cols="12" class="pointer" v-if="metaMask != null" @click="requestAccounts">
                                                <v-row class="mx-3 fs-18 ma-1">
                                                    <span class="fs-16">MetaMask</span>
                                                    <v-spacer></v-spacer>
                                                    <img src="https://files.iob.fi/2020/11/1606367867136-2a0d2f8d57075f0f9de812256a79ce91-metamask.webp" width="20px" height="20px" />
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                        <v-row dense class="mt-3">
                                            <v-col cols="12">
                                                <div class="fs-12 white--text">Non-custodial & Secure</div>
                                                <div class="caption">We do not own your private keys and cannot access your funds without your confirmation.</div>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-menu>
                        </span>
                        <span v-if="account != null">
                            <v-menu offset-y left>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn tile outlined small text class="fs-14 pointer mr-1 text-none" v-bind="attrs" v-on="on">
                                        <div class="mr-2" :class="netColor"></div>{{ account.substring(0,6).toLowerCase() + "..." + account.substring(38) }}
                                    </v-btn>
                                </template>
                                <v-card tile width="320">
                                    <v-card-title class="pb-2 pt-5 pl-5">
                                        <h6>Active Account</h6>
                                    </v-card-title>
                                    <v-card-text class="pb-2">
                                        <v-row class="metamask-menu-border ma-1">
                                            <v-col cols="12">
                                                <v-row class="mx-3 fs-18" dense>
                                                    <img src="https://files.iob.fi/2020/11/1606367867136-2a0d2f8d57075f0f9de812256a79ce91-metamask.webp" width="20px" height="20px" />
                                                    <span class="fs-14 ml-2">MetaMask</span>
                                                    <v-spacer></v-spacer>
                                                    <span class="fs-14">{{ account.substring(0,6).toLowerCase() + "..." + account.substring(38) }}</span>
                                                    <v-icon size="14" class="ml-2 pointer fs-12" @click="copy()">icon icon-copy1_2</v-icon>
                                                </v-row>
                                            </v-col>
                                        </v-row>
                                        <v-row justify="center" class="mt-3 mx-0" dense>
                                            <v-col cols="12">
                                                <v-btn block tile @click="disconnect()" small class="text-none">
                                                    <span class="fs-14">Disconnect</span>
                                                </v-btn>
                                            </v-col>
                                        </v-row>
                                    </v-card-text>
                                </v-card>
                            </v-menu>
                        </span>
                        <v-icon class="mt-1" @click.stop="drawer = !drawer">mdi-menu</v-icon>
                    </v-col>
                </v-row>
            </v-container>
        </v-app-bar>
        <v-app-bar fixed class="fi-toolbar" v-if="responsive == 'mobile'">
            <v-row align="center" justify="center" class="justify-space-between">
                <v-col cols="2" class="pt-10 pl-0" @click="goHome()">
                    <router-link to="/">
                        Logo
                    </router-link>
                </v-col>
                <v-col cols="8" class="align-sm-center justify-center">
                    
                </v-col>
                <v-col cols="2" class="mt-5 text-right pr-n2">
                    <v-icon @click.stop="drawer = !drawer">mdi-menu</v-icon>
                </v-col>
            </v-row>
        </v-app-bar>
        <!-- 侧边栏 -->
        <v-navigation-drawer v-model="drawer" fixed right temporary hide-overlay width="380">
            <v-card>
                <v-list-item>
                    <v-list-item-content>
                        <router-link to="/">
                            Logo
                        </router-link>
                    </v-list-item-content>
                    <v-list-item-icon>
                        <v-icon size="18" class="mt-2" @click="drawer = !drawer">mdi-close</v-icon>
                    </v-list-item-icon>
                </v-list-item>
                <v-divider></v-divider>
                <v-list class="py-0 white-hover" flat>
                    <router-link to="/investments" class="white--text del-underline">
                        <v-list-item tile>
                            <v-list-item-content class="pl-4 text-hover">
                                My Investments
                            </v-list-item-content>
                        </v-list-item>
                    </router-link>
                    <v-divider></v-divider>
                </v-list>
            </v-card>
            <v-list class="py-0">
                <!-- Discord -->
                <a href="" target="_blank" class="white--text del-underline">
                    <v-list-item tile class="pl-8 fs-24 white-hover">
                        <v-list-item-content class="text-hover">
                            <v-icon>mdi-discord</v-icon>
                        </v-list-item-content>
                    </v-list-item>
                </a>
                <!-- Twitter -->
                <a href="" target="_blank" class="white--text del-underline">
                    <v-list-item tile class="pl-8 fs-24 white-hover">
                        <v-list-item-content class="text-hover">
                            <v-icon>mdi-twitter</v-icon>
                        </v-list-item-content>
                    </v-list-item>
                </a>
                <!-- Facebook -->
                <a href="" target="_blank" class="white--text del-underline">
                    <v-list-item tile class="pl-8 fs-24 white-hover">
                        <v-list-item-content class="text-hover">
                            <v-icon>mdi-facebook</v-icon>
                        </v-list-item-content>
                    </v-list-item>
                </a>
            </v-list>
            <v-footer fixed class="fs-12 text-center align-center mx-0 px-0" v-if="responsive == 'pad' || responsive == 'mobile' ">
                <div class="my-1">
                    <span class="ml-2 mr-2">wending.fund © 2021</span>
                </div>
            </v-footer>
        </v-navigation-drawer>
        <a href="" target="_black" class="del-underline">
            <v-btn fixed fab x-small right bottom class="white--text gradient-btn">
                <v-icon>mdi-discord</v-icon>
            </v-btn>
        </a>
        <!-- PC版Cookie协议 -->
        <v-bottom-sheet v-model="isShowCookieStatement" hide-overlay persistent dense v-if="responsive == 'PC'">
            <v-card class="text-center pa-2">
                Cookie StatementMessage
                <v-btn class="ml-4 button--gradient-orange black--text" tile small @click="acceptCookieStatement">Accept</v-btn>
            </v-card>
        </v-bottom-sheet>
        <!-- 手机版Cookie协议 -->
        <v-bottom-sheet v-model="isShowCookieStatement" hide-overlay persistent dense v-if="responsive != 'PC'">
            <v-card class="pa-2 fs-12" tile color="#616161">
                <v-row>
                    <v-col cols="12">
                        <v-btn class="text-none black--text dark-grey" tile x-small>GDPR</v-btn>
                    </v-col>
                    <v-col cols="12">
                        Cookie StatementMessage
                    </v-col>
                    <v-col cols="12">
                        <v-btn class="text-none black--text dark-grey" tile x-small>Your Investments</v-btn>
                    </v-col>
                    <v-col cols="12">
                        Mobile InvestmentsInformation
                    </v-col>
                    <v-col cols="12">
                        <v-btn color="button--gradient-orange" class="text-none black--text" tile block @click="acceptCookieStatement">Continue</v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-bottom-sheet>
        <!-- 消息通知栏 -->
        <v-snackbar v-model="isShowSnackbar" :timeout="3000">
            {{ snackbarMessage }}
        </v-snackbar>
	</div>
</template>
<script>
import { mapGetters } from "vuex";
import Bus from "@/components/bus/Bus";
import detectEthereumProvider from '@metamask/detect-provider';
export default {
    data(){
        return {
            metaMaskLink: '',
            metaMask: null, // 钱包对象
            account: null, // 钱包用户名
            net: "", // 网络名称
            netApi: "", // 网络请求地址
            netColor: null, //网络颜色
            isShowConnectWalletMenu: false,
            drawer: null,
            //是否显示使用cookies消息，null为显示，false为不显示
            isShowCookieStatement: false,
        }
    },
    components: {  },
    created(){

    },
    mounted(){
        this.checkMetaMask();
        this.watchEvent();
        // 监听当前价的事件
        Bus.$on('isShowConnectWalletMenu', data => {
            if (this.responsive == 'PC' || this.responsive == 'pad') {
                this.isShowConnectWalletMenu = data;
            } else {
                this.walletConnectDialog = data;
            }
        })
        Bus.$on('onRequestAccounts', data => {
            this.requestAccounts();
        })
    },
    computed: {
        ...mapGetters(["responsive", "snackbarMessage"]),
        // 是否显示提示信息
        isShowSnackbar: {
            get() {
              return this.$store.getters.isShowSnackbar;
            },
            set(v) {
              this.$store.dispatch("isShowSnackbarHandler", v);
            }
        }
    },
    watch:{

    },
    methods: {
        acceptCookieStatement() {
            this.isShowCookieStatement = false;
            // 重新赋值60天隐藏期限
            localStorage.setItem("wending.fund-isShowCookieStatementExpires", (new Date()).getTime() + 1000 * 60 * 60 * 24 * 60)
            localStorage.setItem("wending.fund-isShowCookieStatement", 0);
        },
        async checkMetaMask() {
            if (window.ethereum != null) {
                this.metaMask = window.ethereum;
                this.$store.dispatch('metaMaskHandler', this.metaMask);
                var chainId = null;
                if (this.metaMask.chainId != null) {
                    chainId = this.metaMask.chainId;
                } else {
                    const provider = await detectEthereumProvider();
                    chainId = await provider.request({
                        method: 'eth_chainId'
                    });
                }
                switch (chainId) {
                    case "0x1":
                    case "0x01":
                        this.net = "";
                        this.netApi = "https://mainnet.infura.io/v3/b23820f133fd4e84ae3f99ffc4dcccab";
                        this.netColor = "mainnet";
                        break;
                    case "0x3":
                    case "0x03":
                        this.net = "Ropsten";
                        this.netApi = "https://ropsten.infura.io/v3/b23820f133fd4e84ae3f99ffc4dcccab";
                        this.netColor = "ropsten";
                        break;
                    case "0x4":
                    case "0x04":
                        this.net = "Rinkeby";
                        this.netApi = "https://rinkeby.infura.io/v3/b23820f133fd4e84ae3f99ffc4dcccab";
                        this.netColor = "rinkeby";
                        break;
                    case "0x5":
                    case "0x05":
                        this.net = "Goerli";
                        this.netApi = "https://goerli.infura.io/v3/b23820f133fd4e84ae3f99ffc4dcccab";
                        this.netColor = "goerli";
                        break;
                    case "0x2a":
                        this.net = "Kovan";
                        this.netApi = "https://kovan.infura.io/v3/b23820f133fd4e84ae3f99ffc4dcccab";
                        this.netColor = "kovan";
                        break;
                }
                this.$store.dispatch('metaMaskNetHandler', this.net);
            };
        },
        // 监听事件
        watchEvent() {
            if (this.metaMask != null) {
                let _this = this;
                this.metaMask.on('chainChanged', function () {
                    _this.account = null;
                    _this.checkMetaMask();
                    _this.$store.dispatch('walletAddressHandler', null);
                });
                // 监听MetaMask账户切换时候，重新加载
                this.metaMask.on('accountsChanged', function (accounts) {});
            }
        },
        // 请求账户
        requestAccounts() {
            this.account = null;
            if (this.metaMask != null) {
                this.metaMask.request({
                    method: 'eth_requestAccounts'
                }).then(res => {
                    if (res.length > 0) {
                        this.account = res[0];
                        this.$store.dispatch('walletAddressHandler', this.account);
                        // 查询余额
                    }
                })
            }
        },
        // 断开连接
        disconnect() {
            this.account = null;
            this.$store.dispatch('walletAddressHandler', null);
        },
    }
}
</script>
<style lang="scss" scoped>

</style>