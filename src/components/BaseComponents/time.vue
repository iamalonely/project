<template>
    <el-date-picker
        :disabled="disabled"
        v-model="value1"
        :type="dataType||'date'"
        :style="domCss"
        size="small"
        :value-format="format||'yyyy-MM-dd'"
        :format="format||'yyyy-MM-dd'"
        @change="Change('change')"
        :placeholder="placeholder"
    ></el-date-picker>
</template>

<script>
export default {
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        domCss: {
            type: String,
            default: ''
        },
        pickerOptions: {
            type: Object,
            default: () => {}
        },
        vlaue: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String
        },
        dataType: {
            type: String,
            default: 'date'
        },
        format: {
            type: String,
            default: 'yyyy-MM-dd'
        }
    },
    data() {
        return {
            value1: ""
        };
    },
    created() {
    },
    watch: {
        value: {
            deep: true,
            immediate: true,
            handler: function(v) {
                if (v) {
                    this.value1 = v
                }
            }
        }
    },
    methods: {
        Change(type) {
            this.$emit('input', this.value1)
            this.$emit("EventHandler", type, this.$attrs.prop, this.value1);
        }
    }
};
</script>

<style></style>
