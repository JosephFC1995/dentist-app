export default {
    methods: {
        beforeUpload(file) {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
            if (!isJpgOrPng) {
                this.$message.error('¡Solo puedes subir archivos JPG o PNG!')
            }
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                this.$message.error('¡La imagen debe ser inferior a 2 MB!')
            }
            return isJpgOrPng && isLt2M
        },
        changeUpload(info) {
            const status = info.file.status
            if (status !== 'uploading') {
                console.log(info)
            }
            if (status === 'done') {
                this.$message.success(`${info.file.name} file uploaded successfully.`)
                let _key = info.file.response.key ? info.file.response.key : null

                this.form[_key] = info.file.response.file
                this.form['id_' + _key + '_file'] = info.file.response.file.id
            } else if (status === 'error') {
                this.$message.error(`${info.file.name} file upload failed.`)
            }
        },
    },
}