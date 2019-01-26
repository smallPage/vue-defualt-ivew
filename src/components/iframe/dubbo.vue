<template>
    <div>
        <iframe id="dubbo-iframe"  frameborder=0 scrolling=auto :src="url"></iframe>
    </div>
</template>

<script>

    import { baseUrl } from '@/config/env'

    export default {
        data() {
            return {
                url: 'http://47.95.247.246:12344/dubbo'
            }
        },
        mounted() {
            const oIframe = document.getElementById('dubbo-iframe');
            const deviceWidth = document.documentElement.clientWidth;
            const deviceHeight = document.documentElement.clientHeight;
            oIframe.style.width = '100%';
            oIframe.style.height = deviceHeight + 'px';
        }
    };
</script>

<style lang="scss" scoped>
</style>