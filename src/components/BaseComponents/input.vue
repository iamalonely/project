<template>
    <div style='display:inline-block;' >
        <el-input
            v-model.trim="value1"
            :placeholder="`请输入${label}`"
            :disabled="disabled"
            :style="domCss"
            :maxlength="maxLength"
            :show-word-limit="showWordLimit"
            size="small"
            @input="Change('change')"
            @blur="Change('blur')"
            @focus="Change('focus')"
        ></el-input>
        <span v-if="afterTips" class="after_tips">{{afterTips}}</span>
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
        domCss: {
            type: String,
            default: ''
        },
        showWordLimit: {
            type: Boolean,
            default: false
        },
        maxLength: {
            type: Number,
            default: 500
        },
        afterTips: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        },
        controlType: {
            type: String,
            default: 'add'
        }
    },
    data() {
        return {
            value1: ""
        };
    },
    watch: {
        value: {
            deep: true,
            immediate: true,
            handler: function(v) {
                this.value1 = v
            }
        }
    },
    methods: {
        Change(type) {
            this.$emit('input', this.value1)
            this.$emit(type, this.value1)
            this.$emit("EventHandler", type, this.$attrs.prop, this.value);
        }
    }
};
</script>

<style lang="scss" scoped>
.after_tips {
    font-size: 14px;
    color: #606266;
    margin-left: 8px;
}
</style>