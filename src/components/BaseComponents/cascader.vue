<template>
    <div>
        <el-cascader
            v-model="value1" 
            :props="defaultProps" 
            :disabled="disabled" 
            :show-all-levels="showAllLevels" 
            :options="formatOption(options)" 
            :placeholder="`请选择${label}`" 
            :style="domCss"
            size="small"
            @blur="Change('blur')" 
            @focus="Change('focus')" 
            @change="Change('change')"></el-cascader>

    </div>
</template>
<script>
export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        showAllLevels: {
            type: Boolean,
            default: false
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
        
        domCss: {
            type: String,
            default: ''
        },
        value: '',
        controlType: {
            type: String,
            default: 'add'
        }
    },
    watch: {
        value: {
            deep: true,
            immediate: true,
            handler: function(v) {
                this.value1 = v.indexOf(',') > -1 ? v.split(',') : (typeof(v) === 'string' ? [v] : v)
            }
        }
    },
    data() {
        return {
            value1: [],
        };
    },
    
    methods: {
        Change(type) {
            this.$emit('input', this.value1.join(','))
            console.log(this.value1)
            this.$emit('EventHandler',type, this.$attrs.prop,this.value1.join(','));
        },
        formatOption(val) {
            let arr = []
            arr = val.map(item => {
                if (item[this.defaultProps.children] && item[this.defaultProps.children].length == 0) {
                    item[this.defaultProps.children] = null
                }
                return item
            })
            return arr
        }
    },
    filter: {
        
    }
};
</script>
