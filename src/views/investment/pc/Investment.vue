<template>
	<div>
        <v-container class="mt-70 pb-250">
            <v-row justify="center">
                <v-col cols="8" class="px-0 pb-0">
                    <span class="font-3x font-weight-bold pointer">
                        <h1>
                            <span @click="getUserTx(walletAddress)">{{ $t('investments.myInvestments') }}</span>
                        </h1>
                    </span>
                </v-col>
                <v-col cols="8" class="px-0 mt-5">
                    <v-row justify="center">
                        <v-col cols="12">
                            <h5>
                                <span>{{ $t('investments.myTotalInvestmentValue') }}</span>
                            </h5>
                            <div class="font-4x fw-bold mt-3">
                                <h1>
                                    <span v-if="walletAddress == null || metaMaskNet != ''">--</span>
                                    <span v-else>
                                        <count-to :start-val='0' :end-val='totalInvestmentsValue' :duration='600' :decimals='2' separator=',' prefix='$'></count-to>
                                    </span>
                                </h1>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row justify="center" align="center">
                <v-col cols="8" class="px-0" v-if="walletAddress != null && metaMaskNet == ''">
                    <h5 class="mb-6">
                        <span>{{ $t('investments.managedPoolAssets') }}</span>
                    </h5>
                    <v-divider class="dark-grey mb-5"></v-divider>
                    <v-card tile>
                    <v-card-text class="pt-2 pb-2 fs-16">
                        <v-row dense class="dark-gray--title">
                            <v-col cols="2" class="">{{ $t('investments.name') }}</v-col>
                            <v-col cols="1" class="">{{ $t('investments.symbol') }}</v-col>
                            <v-col cols="2" class="">{{ $t('investments.address') }}</v-col>
                            <v-col cols="2" class="text-right ml-n15">{{ $t('investments.total') }}</v-col>
                            <v-col cols="2" class="text-right ml-15">{{ $t('investments.USDValue') }}</v-col>
                            <v-col cols="2" class="ml-16">{{ $t('investments.actions') }}</v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider class="dark-grey"></v-divider>
                    </v-card>
                    <v-expansion-panels hover tile accordion focusable v-if="!loading">
                        <v-expansion-panel v-for="(item, i) in poolAssetItems" :readonly="item.data.length == 0" :key="i">
                            <v-expansion-panel-header>
                                <v-row class="fs-14">
                                    <v-col cols="2">
                                        <span class="ml-n2 dark-gray--text">{{item.name}}</span>
                                    </v-col>
                                    <v-col cols="1">
                                        <span class="ml-n2 dark-gray--text">{{item.symbol}}</span>
                                    </v-col>
                                    <v-col cols="2">
                                        <span class="title_txt ml-n2">
                                            <a :href="'https://etherscan.io/address/' + item.address" target="_blank" class="pure-red--text del-underline" rel="noopener noreferrer">
                                                <span class="">{{ item.address.substring(0,6)+"..."+item.address.substring(item.address.length-4) }}&#8599;</span>
                                            </a>
                                        </span>
                                    </v-col>
                                    <v-col cols="2" class="dark-gray--text text-right ml-n15">
                                        <span class="mr-n2">{{item.balance == null || item.balance == 0 ? "--" : formatNum(item.balance.toFixed(4))}}</span>
                                    </v-col>
                                    <v-col cols="2" class="dark-gray--text text-right ml-15">
                                        <span class="mr-n2">{{item.value == null || item.value == 0 ? "--" : '$' + formatNum(item.value.toFixed(4))}}</span>
                                    </v-col>
                                    <v-col cols="2" class="dark-gray--text">
                                        <span class="ml-14">
                                            <router-link to="/pool/0xca38034a69ebedd28ce62368890e7cf187309a0f" class="del-underline" v-if="item.name == 'DEFY'">
                                                <v-btn tile x-small class="button--gradient-orange black--text">{{ $t('common.invest') }}</v-btn>
                                            </router-link>
                                            <a :href="'https://app.dhedge.org/pool/' + item.address" class="del-underline" target="_blank" v-else>
                                                <v-btn tile x-small class="button--gradient-orange black--text">{{ $t('common.invest') }}</v-btn>
                                            </a>
                                        </span>
                                    </v-col>
                                </v-row>
                                <template v-slot:actions>
                                    <v-img v-if="item.data.length == 0" src="../../../public/img/1.png" alt="" class="ml-n5"></v-img>
                                    <v-icon v-else class="ml-n5">mdi-chevron-down</v-icon>
                                </template>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-row class="mx-n9">
                                    <v-col cols="12" >
                                        <v-data-table disable-sort :headers="poolHeaders" :items="item.data" :items-per-page="10" class="dark-gray--text my-n3 mx-0 px-0 black-gradient">
                                            <template v-slot:body="{ items }">
                                                <tbody>
                                                    <tr>
                                                        <td :colspan="poolHeaders.length" class="px-0">
                                                            <v-expansion-panels hover tile accordion focusable>
                                                                <v-expansion-panel v-for="(childItem, i) in item.data" :key="i">
                                                                    <v-expansion-panel-header>
                                                                        <v-row class="dark-gray--text">
                                                                            <v-col cols="1">
                                                                                <span class="ml-n2">{{childItem.symbol}}</span>
                                                                            </v-col>
                                                                            <v-col cols="2" class="text-right ml-10">
                                                                                <span >{{childItem.side}}</span>
                                                                            </v-col>
                                                                            <v-col cols="2" class="text-right ml-1">
                                                                                <span>{{ formatNum(parseHex(childItem.requestAmount).toFixed(4)) }}</span>
                                                                            </v-col>
                                                                            <v-col cols="2" class="text-right ml-10">
                                                                                <span>{{ childItem.fee }}</span>
                                                                            </v-col>
                                                                            <v-col cols="2" class="ml-2">
                                                                                <span>{{ childItem.time }}</span>
                                                                            </v-col>
                                                                            <v-col cols="2" class="title_txt ml-n8">
                                                                                <a :href="'https://etherscan.io/tx/' + childItem.hash" target="_blank" rel="noopener noreferrer" class="del-underline">
                                                                                    <span class="pure-red--text">{{childItem.hash.substring(0,6) + "..." + childItem.hash.substring(childItem.hash.length-4)}}&#8599;</span>&nbsp;
                                                                                </a>
                                                                            </v-col>
                                                                        </v-row>
                                                                        <template v-slot:actions>
                                                                            <v-img v-if="childItem.info.length == 0" src="../../../public/img/1.png" alt="" class="ml-n5"></v-img>
                                                                            <v-icon v-else class="ml-n5">mdi-chevron-down</v-icon>
                                                                        </template>
                                                                    </v-expansion-panel-header>
                                                                    <v-expansion-panel-content v-if="childItem.info.length > 0">
                                                                        <v-row class="dark-gray--text">
                                                                            <v-col cols="12" class="px-0">
                                                                                <v-row dense>
                                                                                    <v-col cols="3">
                                                                                        <span>{{ $t('investments.symbol') }}</span>
                                                                                    </v-col>
                                                                                    <v-col cols="3">
                                                                                        <span>{{ $t('investments.from') }}</span>
                                                                                    </v-col>
                                                                                    <v-col cols="3">
                                                                                        <span>{{ $t('investments.to') }}</span>
                                                                                    </v-col>
                                                                                    <v-col cols="3" class="text-right">
                                                                                        <span>{{ $t('investments.amount') }}</span>
                                                                                    </v-col>
                                                                                </v-row>
                                                                                <v-divider></v-divider>
                                                                                <v-row v-for="(info,i) in childItem.info" dense :key="i">
                                                                                    <v-col cols="3">{{info.symbol}}</v-col>
                                                                                    <v-col cols="3" class="title_txt">
                                                                                        <a :href="'https://etherscan.io/address/' + info.fromAddress" target="_blank" class="del-underline pure-red--text" rel="noopener noreferrer" :title="info.fromAddress">{{info.fromAddress.substring(0,6) + "..." + info.fromAddress.substring(info.fromAddress.length-4)}}&#8599;</a>
                                                                                    </v-col>
                                                                                    <v-col cols="3" class="title_txt">
                                                                                        <a :href="'https://etherscan.io/address/' + info.toAddress" target="_blank" class="del-underline pure-red--text" rel="noopener noreferrer" :title="info.toAddress">{{info.toAddress.substring(0,6) + "..." + info.toAddress.substring(info.toAddress.length-4)}}&#8599;</a>
                                                                                    </v-col>
                                                                                    <v-col cols="3" class="text-right">{{formatNum(info.amount.toFixed(4))}}</v-col>
                                                                                    <v-col v-if="i < childItem.info.length-1">
                                                                                        <v-divider></v-divider>
                                                                                    </v-col>
                                                                                </v-row>
                                                                            </v-col>
                                                                        </v-row>
                                                                    </v-expansion-panel-content>
                                                                </v-expansion-panel>
                                                            </v-expansion-panels>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </v-data-table>
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <v-card tile v-if="loading">
                        <v-skeleton-loader dense type="table-row-divider@4"></v-skeleton-loader>
                    </v-card>
                    <h5 class="mb-6 pt-70">
                        <span>iob.fi DAO {{ $t('investments.assets') }}</span>
                    </h5>
                    <v-divider class="dark-grey mb-5"></v-divider>
                    <v-card tile>
                    <v-card-text class="pt-2 pb-2 dark-gray--title">
                        <v-row dense>
                            <v-col cols="2" class="">{{ $t('investments.name') }}</v-col>
                            <v-col cols="1" class="">{{ $t('investments.symbol') }}</v-col>
                            <v-col cols="2" class="">{{ $t('investments.address') }}</v-col>
                            <v-col cols="2" class="text-right ml-n15">{{ $t('investments.total') }}</v-col>
                            <v-col cols="2" class="text-right ml-15">{{ $t('investments.USDValue') }}</v-col>
                            <v-col cols="2" class="ml-16">{{ $t('investments.actions') }}</v-col>
                        </v-row>
                    </v-card-text>
                    </v-card>
                    <v-divider class="dark-grey"></v-divider>
                    <v-expansion-panels hover tile accordion focusable v-if="!loading">
                        <v-expansion-panel v-for="(item, i) in daoAssetItems" :readonly="item.data.length == 0" :key="i">
                            <v-expansion-panel-header>
                                <v-row class="fs-14 dark-gray--text">
                                    <v-col cols="2">
                                        <span class="ml-n2">{{item.name}}</span>
                                    </v-col>
                                    <v-col cols="1">
                                        <span class="ml-n2">{{item.symbol}}</span>
                                    </v-col>
                                    <v-col cols="2">
                                        <span class="title_txt ml-n2">
                                            <a :href="'https://etherscan.io/address/' + item.address" target="_blank" class="pure-red--text del-underline" rel="noopener noreferrer">
                                                <span class="">{{ item.address.substring(0,6)+"..."+item.address.substring(item.address.length-4) }}&#8599;</span>
                                            </a>
                                        </span>
                                    </v-col>
                                    <v-col cols="2" class="dark-gray--text text-right ml-n15">
                                        <span class="mr-n2">{{item.balance == null || item.balance == 0 ? "--" : formatNum(item.balance.toFixed(4))}}</span>
                                    </v-col>
                                    <v-col cols="2" class="dark-gray--text text-right ml-15" v-if="item.name == 'IOB'">
                                        <span class="mr-n2">{{item.value == null || item.value == 0 ? "--" : '$' + formatNum(item.value.toFixed(4))}}</span>
                                    </v-col>
                                    <v-col cols="2" class="dark-gray--text text-right ml-15" v-if="item.name == 'iob.fi DAO'">
                                        <span class="mr-n2">{{item.balance == null || item.balance == 0 ? "--" : '$' + formatNum((item.balance * fiPrice).toFixed(4))}}</span>
                                    </v-col>
                                    <v-col cols="3" class="dark-gray--text">
                                        <span class="ml-14"  v-if="item.name == 'iob.fi DAO'">
                                            <router-link to="/token/0xf03d05ed4cf4e723c04500ab64281bfa591968f2/buy" class="del-underline">
                                                <v-btn tile x-small class="button--gradient-orange black--text">{{ $t('common.invest') }}</v-btn>
                                            </router-link>
                                            <a href="https://app.uniswap.org/#/add/v2/ETH/0xF03d05eD4Cf4E723C04500Ab64281BfA591968F2" target="_blank" class="del-underline ml-2">
                                                <v-btn tile x-small class="button--gradient-orange black--text">{{ $t('common.staking') }}</v-btn>
                                            </a>
                                        </span>
                                        <span v-else class="ml-14">--</span>
                                    </v-col>
                                </v-row>
                                <template v-slot:actions>
                                    <v-img v-if="item.data.length == 0" src="../../../public/img/1.png" alt="" class="ml-n5"></v-img>
                                    <v-icon v-else class="ml-n5">mdi-chevron-down</v-icon>
                                </template>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-row class="mx-n9">
                                    <v-col cols="12" >
                                        <v-data-table disable-sort :headers="userHeaders" :items="item.data" :items-per-page="10" class="dark-gray--text my-n3 mx-0 px-0 black-gradient">
                                            <template v-slot:body="{ items }">
                                                <tbody>
                                                    <tr v-for="(childItem, i) in items" :key="i">
                                                        <td>{{ childItem.symbol }}</td>
                                                        <td>{{ childItem.side }}</td>
                                                        <td class="text-right">{{ formatNum(parseHex(childItem.requestAmount).toFixed(4)) }}</td>
                                                        <td class="text-right">{{ childItem.fee }}</td>
                                                        <td>{{ childItem.time }}</td>
                                                        <td class="title_txt pr-0">
                                                            <a :href="'https://etherscan.io/tx/' + childItem.hash" target="_blank" rel="noopener noreferrer" class="del-underline">
                                                                <span class="pure-red--text">{{childItem.hash.substring(0,6) + "..." + childItem.hash.substring(childItem.hash.length-4)}}&#8599;</span>&nbsp;
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </v-data-table>
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                    <v-card tile v-if="loading">
                        <v-skeleton-loader dense type="table-row-divider@2"></v-skeleton-loader>
                    </v-card>
                </v-col>
                <!-- 未连接 -->
                <v-col cols="8" class="px-0" v-if="walletAddress == null || metaMaskNet != ''">
                    <v-card class="text-center" height="200px">
                        <v-card-text class="pt-16">
                            <v-btn v-if="metaMaskNet == '' && metaMaskNet == ''" tile class="text-none mt-5 mt-2 primary" small @click="connectWallet">{{ $t('wallet.connectWallet') }}</v-btn>
                        </v-card-text>
                        <v-card-text class="pt-2">
                            <span v-if="metaMaskNet != ''">{{ $t('investments.mainnetNetworkSupportOnly') }}</span>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
	</div>
</template>
<script>
import { mapGetters } from "vuex";
import Bus from "@/components/bus/Bus";
import InvestmentAPI from "@/api/investment.js";
export default {
    data(){
        return {
            userHeaders:[
                { text: "Symbol" },
                { text: "Type" },
                { text: "Amount", align:"end" },
                { text: "Fee ( ETH )", align:"end" },
                { text: "Time" },
                { text: "Hash" },
            ],
            poolHeaders:[
                { text: "Symbol" },
                { text: "Type", align:"end" },
                { text: "Amount", align:"end" },
                { text: "Fee ( ETH )", align:"end" },
                { text: "Time" },
                { text: "Hash" },
                { text: "" },
            ],
            loading:false,
            daoAssetItems:[],
            poolAssetItems:[],
        }
    },
    created(){
    },
    mounted(){
        if(this.walletAddress != null && this.metaMaskNet == ''){
            this.getUserTx(this.walletAddress);
        }
    },
    computed: {
        ...mapGetters(['metaMask', 'metaMaskNet','walletAddress','responsive','fiethPrice','ethPrice']),
        // web3(){
        //     return new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/b23820f133fd4e84ae3f99ffc4dcccab"));
        // },
        fiPrice(){
            return this.fiethPrice * this.ethPrice;
        },
        totalInvestmentsValue(){
            var result = 0;
            if(this.daoAssetItems.length > 0){
                for (let i = 0; i < this.daoAssetItems.length; i++) {
                    const element = this.daoAssetItems[i];
                    if(element.name == 'iob.fi DAO' && element.balance > 0){
                        result += (element.balance * this.fiPrice);
                    }
                    result += element.value;
                }
            }
            if(this.poolAssetItems.length > 0){
                for (let i = 0; i < this.poolAssetItems.length; i++) {
                    const element = this.poolAssetItems[i];
                    result += element.value;
                }
                
            }
            return result;
        }
    },
    components:{
    },
    watch:{
        walletAddress(val){
            if(val != null && this.metaMaskNet == ''){
                this.getUserTx(val)
            }
        },
        metaMaskNet(val){
            if(val == '' && this.walletAddress != null){
                this.getUserTx(this.walletAddress)
            }
        }
    },
    methods: {
        async getUserTx(address){
            if(address == null){
                return;
            }
            this.loading = true;
            // address = "0xe5142159d7a88cc7096ab0bece1b8c8d924b4d78";// DEFY-1
            // address = "0x993E5cFf7f2dfC727576E4aaDE79f6a7Ec36bb98";// Quasar
            // address = "0x64f381f69431c32bf88be85172d16bd719b9c5a3";// IOB
            // address = "0xbddf82bdb823d666b5bff940038ecb66f1ce41b5";// FI
            // address = '0x00ec30bb1ebd8ae63a54490543d2766279c96022';// FI + DEFY + Pool
            let data = await InvestmentAPI.getInvestments(address).data;
            if(data && data.code == 200){
                this.daoAssetItems = data.result.dao;
                this.poolAssetItems = data.result.pool;
                this.loading = false;
            } else {
                this.loading = false;
            }
        },
        // 连接钱包
        connectWallet(){
            Bus.$emit('isShowConnectWalletMenu', true);
        },
        parseHex(hex){
            // return this.web3.utils.hexToNumberString(hex) / Math.pow(10,18);
            return hex / Math.pow(10,18);
        },
        formatUTCTime(timestamp){
            // 在日期格式中，月份是从0开始的，因此要加0
            // 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11
            var date = new Date(timestamp);
            var year = date.getUTCFullYear();
            var month = date.getUTCMonth() + 1;
            month = month < 10 ? ('0' + month) : month;
            var day = date.getUTCDate() < 10 ? '0' + date.getUTCDate() : date.getUTCDate();
            var hours = date.getUTCHours() < 10 ? '0' + date.getUTCHours() : date.getUTCHours();
            var minutes = date.getUTCMinutes() < 10 ? '0' + date.getUTCMinutes() : date.getUTCMinutes();
            var seconds = date.getUTCSeconds() < 10 ? '0' + date.getUTCSeconds() : date.getUTCSeconds();
            return month + '-' + day + '-' + year + ' ' + hours + ':' + minutes + ':' + seconds;
        },
        formatNum(num) {
            if (num == null) return '';
            if (num == NaN || num == 'NaN') return '';
            if (num == 'undefined') return '';
            if (num == '--') return '--';
            let number = num + '';
            let numberArray = number.split('.');
            let integerPart = numberArray[0];
            let decimalPart = numberArray.length > 1 ? '.' + numberArray[1] : '';
            let rgx = /(\d+)(\d{3})/;
            while (rgx.test(integerPart)) {
                integerPart = integerPart.replace(rgx, '$1' + ',' + '$2');
            }
            return integerPart + decimalPart;
        },
        copy(val) {
            let _this = this;
            this.$copyText(val, this.$refs.container).then(
                function () {
                    // 成功回调
                    _this.$store.dispatch("snackbarMessageHandler","Copied")
                },
                function () {
                    // 失败回调
                    _this.$store.dispatch("snackbarMessageHandler","Failed")
                }
            );
        },
    },
}
</script>
<style lang="scss" scoped>

</style>