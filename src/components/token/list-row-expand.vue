<template>
    <div>
        <Row class="token-expand-row">
            <Col span="24">
                <span class="expand-key">TOKEN: </span>
                <span class="expand-value">{{ row.token }}</span>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        props: {
            row: Object
        }
    };
</script>

<style lang="scss" scoped>
    .token-expand-row {
        margin-bottom: 16px;
        .expand-key {
            margin-bottom: 5px;
            display: block;
        }
        .expand-value {
            color: #888;
            word-break: break-word;
        }
    }
</style>