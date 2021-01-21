<template>
    <el-select v-model="value1" 
        :disabled="disabled"
        :placeholder="`请选择${label}`"
        :style='domCss' 
        :multiple='multiple' 
        :collapse-tags='collapseTags'
        clearable
        size="small"
        @change='Change("change")'
        @visible-change="Change('visibleChange')"
        @remove-tag="Change('removeTag')"
        @blur="Change('blur')"
        @focus="Change('focus')"
        >

        <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item[defaultProps.label]"
            :value="item[defaultProps.value]"
        ></el-option>
    </el-select>
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
        options: {
            type: Array,
            default: () => []
        },
        defaultProps: {
            type: Object,
            default: () => {return {
                label: 'label',
                value: 'value',
                children: 'children'
            }}
        },
        multiple: false,
        collapseTags: false,
        value: ''
    },
    data() {
        return {
            value1:'',
        }
    },
    watch: {
        value: {
            deep: true,
            immediate: true,
            handler: function(v) {
                if (v) {
                    this.value1 = v.indexOf(',') > -1 ? v.split(',') : v
                }
            }
        }
    },
    methods: {
        Change(type){
            let value = this.value1;
            if(this.multiple) value = value.join(',');
            this.$emit('input', value)
            this.$emit('EventHandler',type, this.$attrs.prop,value);
        },
    },
}
</script>

<style lang="scss" scoped>

</style>