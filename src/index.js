new Vue({
    // 挂载
    el: '#app',

    // 数据
    data() {
        return {
            editor: '',
            key: {
                editor: 'editor'
            },
            url: 'http://localhost:34473/api/markdown'
        }
    },

    // 计算属性
    computed: {
        editorPreview() {
            return marked(this.editor);
        }
    },

    // 侦听器
    watch: {
        editor(val) {
            localStorage.setItem(this.key.editor, this.editor);
            //this.save();
        }
    },

    // 生命周期钩子
    created() {
        //this.load();
        this.editor = localStorage.getItem(this.key.editor) || '第一次使用 Markdown 笔记本';
    },

    // 方法
    methods: {
        load() {
            var that = this;
            axios.get(that.url).then(function (result) {
                console.log(result.data);
                that.editor = result.data;
            });
        },
        save() {
            var that = this;
            axios.post(that.url, { content: that.editor }).then(function (result) { });
        }
    }
})