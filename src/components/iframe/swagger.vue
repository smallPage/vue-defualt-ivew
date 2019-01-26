<template>
    <div>
        <iframe id="swagger-iframe"  frameborder=0 scrolling=auto :src="url"></iframe>
    </div>
</template>

<script>

    import { baseUrl } from '@/config/env'

    export default {
        data() {
            return {
                url: baseUrl + '/swagger-ui.html'
            }
        },
        mounted() {
            const oIframe = document.getElementById('swagger-iframe');
            const deviceWidth = document.documentElement.clientWidth;
            const deviceHeight = document.documentElement.clientHeight;
            oIframe.style.width = '100%';
            oIframe.style.height = deviceHeight + 'px';
        }
    };
</script>

<style lang="scss" scoped>
</style>