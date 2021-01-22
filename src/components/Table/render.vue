<script>
export default {
    render: function(createElement) {
        console.log(this.renderFnc)
        let cc = this.renderFnc;
        return cc;
    },
    props: ["renderFnc"],
};
</script>

<style lang="scss" scoped>
</style>