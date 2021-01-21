<template>
    <el-input-number 
        v-model="value1" 
        :disabled="disabled"
        @change="Change('change')"
        @input="Change('change')"
        :style="domCss"
        size="small"
        :min="min" 
        :max="max">
    </el-input-number>
</template>

<script>
export default {
    props:{
        label: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        domCss: {
            type: String,
            default: ''
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 10000
        },
        value: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            value1: 0,
        }
    },
    watch: {
        value: {
            deep: true,
            immediate: true,
            handler: function(v) {
                this.value1 = v || 0
            }
        }
    },
    created() {
    },
    methods: {
        Change(type){
            this.$emit('input', this.value1)
            this.$emit('EventHandler',type, this.$attrs.prop,this.value1);
        },
    },
}
</script>

<style lang="scss" scoped>

</style>