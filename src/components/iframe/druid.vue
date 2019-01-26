<template>
    <div>
        <iframe id="druid-iframe"  frameborder=0 scrolling=auto :src="url"></iframe>
    </div>
</template>

<script>

    import { baseUrl } from '@/config/env'

    export default {
        data() {
            return {
                url: baseUrl + '/druid/index.html'
            }
        },
        mounted() {
            const oIframe = document.getElementById('druid-iframe');
            const deviceWidth = document.documentElement.clientWidth;
            const deviceHeight = document.documentElement.clientHeight;
            oIframe.style.width = '100%';
            oIframe.style.height = deviceHeight + 'px';
        }
    };
</script>

<style lang="scss" scoped>
</style>