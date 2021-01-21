<template>
    <div class="Box_">
        <el-date-picker v-model="value"
                        :type="pickerType"
                        :style="startDomCss"
                        :value-format="format"
                        :format="format"
                        :disabled='disabled'
                        @change="startChange"
                        placeholder="请选择开始时间"> </el-date-picker>
        <span>一</span>
        <el-date-picker v-model="value1"
                        :type="pickerType"
                        :value-format="format"
                        :format="format"
                        :style="endDomCss"
                        :disabled='disabled'
                        @change="endChange"
                        placeholder="请选择结束时间"> </el-date-picker>
    </div>
</template>

<script>
export default {
    props: {
        pickerType: {
            type: String,
            default: 'date'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        startDomCss: {
            type: String,
            default: ''
        },
        endDomCss: {
            type: String,
            default: ''
        },
        maxLength: {
            type: Number,
            default: 500
        },
        format: 'yyyy-MM-dd',
        defaultValue: ''
    },
    data() {
        return {
            value: "",
            value1: ""
        };
    },
    watch: {
        defaultValue: {
            deep: true,
            immediate: true,
            handler: function(v) {
                if (v) {
                    this.value = v.indexOf(',') > -1 ? v.split(',')[0] : v[0]
                    this.value1 = v.indexOf(',') > -1 ? v.split(',')[1] : v[1]
                }
                
            }
        }
    },
    methods: {
        startChange(time) {
            if (!!time && !!this.value1) {
                let start = new Date(time).getTime();
                let end = new Date(this.value1).getTime();
                if (start > end) {
                    this.$message.warning(
                        "开始时间不能大于结束时间,请重新选择开始时间!! "
                    );
                    this.value = "";
                }
            }
            this.Change();
        },
        endChange(time) {
            if (!!time && !!this.value) {
                let start = new Date(this.value).getTime();
                let end = new Date(time).getTime();
                if (start > end) {
                    this.$message.warning(
                        "开始时间不能大于结束时间,请重新选择开始时间!! "
                    );
                    this.value1 = "";
                }
            }
            this.Change();
        },
        Change() {
            // if (this.value && this.value1) {
            this.$emit("EventHandler", "changeTimeGroup", this.$attrs.prop, {
                startTime: this.value,
                endTime: this.value1
            });
            // }
        }
    }
};
</script>

<style>
.Box_ {
    display: inline-block;
}
</style>
