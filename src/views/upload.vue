<template>
	<el-dialog :title="!dataForm.id ? '新增' : '修改'" :close-on-click-modal="false" :visible.sync="visible">
		<el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
			<el-row>
				<el-col>
					<el-form-item label="单位名称" prop="groupName">
						<el-input v-model="dataForm.groupName" placeholder="单位名称"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col>
					<el-form-item label="负责人" prop="groupManager">
						<el-input v-model="dataForm.groupManager" placeholder="负责人"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col>
					<el-form-item label="联系方式" prop="telephone">
						<el-input v-model="dataForm.telephone" placeholder="联系方式" maxlength="11"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col>
					<el-form-item :class="{hide:hideUpload}">
						<el-upload ref="upload" action="#" multiple :limit="limit" :file-list="dataForm.imgFileList" list-type="picture-card"
						 :on-preview="handlePictureCardPreview" :on-change="OnChange" :on-remove="handleRemove" :on-exceed="handleExceed"
						 accept="image/jpeg,image/png" :auto-upload="false">
							<i class="el-icon-plus"></i>
							<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，最多上传5张且单张图片不超过5M
							</div>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible" append-to-body>
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>

		<span slot="footer" class="dialog-footer">
			<el-button @click="visible = false">取消</el-button>
			<el-button type="primary" @click="submitUpload()">确定</el-button>
		</span>
	</el-dialog>
</template>
<script>
	import {
		isMobile
	} from '@/utils/validate'
	export default {
		data() {
			var validateMobile = (rule, value, callback) => {
				if (!isMobile(value)) {
					callback(new Error('联系方式格式错误'))
				} else {
					callback()
				}
			}
			return {
				visible: false,
				uploadUrl: '',
				dialogImageUrl: '',
				dialogVisible: false,
				limit: 5,
				hideUpload: false, //是否显示上传图片的加号
				imgInfoList: [], //包含图片的id,name,size的集合
				imgNameList: [], //后端返回的上传图片的name集合，传到后端
				imgSize: [], //后端返回的上传图片的imgSize集合，传到后端
				deleteImgFileList: [], //存已被删除了的图片的id
				dataForm: {
					id: 0,
					groupName: '',
					groupManager: '',
					telephone: '',
					imgFileList: []//绑定用户上传的图片List
				},
				dataRule: {
					groupName: [{
						required: true,
						message: '单位名称不能为空',
						trigger: 'blur'
					}],
					groupManager: [{
						required: true,
						message: '负责人不能为空',
						trigger: 'blur'
					}],
					telephone: [{
						required: true,
						message: '联系方式不能为空',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			//点击上传图片
			submitUpload() {
				let formData = new FormData(); //  用FormData存放上传文件
				this.dataForm.imgFileList.forEach(file => {
					console.log(file.raw)
					console.log(file.size)
					formData.append('file', file.raw)
				})
				this.$http({
					url: this.uploadUrl,
					method: 'post',
					data: formData,
					headers: {
						"Content-Type": "multipart/form-data"
					}
				}).then(({
					data
				}) => {
					if (data && data.code === 0) {
						for (var i = 0; i < data.imgNameList.length; i++) {
							this.imgNameList.push(data.imgNameList[i].name)
							this.imgSize.push(data.imgNameList[i].size)
						}
						this.dataFormSubmit()
						this.$refs.upload.clearFiles();
					} else {
						this.$message.error(data.msg)
					}
				})
			},
			//预览图片时
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url
				this.dialogVisible = true
			},
			OnChange(file, fileList) {
				const isType = file.type === 'image/jpeg' || 'image/png'
				const isLt5M = file.size / 1024 / 1024 < 5

				if (!isType) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
					fileList.pop()
				}
				if (!isLt5M) {
					this.$message.error('上传头像图片大小不能超过 5MB!');
					fileList.pop()
				}
				this.dataForm.imgFileList.push(file)
				this.hideUpload = fileList.length >= this.limit

			},
			//删除图片时
			handleRemove(file, fileList) {
				if (file.id) {
					console.log('删除了已被上传过的图片')
					console.log(file.id)
					this.deleteImgFileList.push(file.id)
				}
				this.dataForm.imgFileList = fileList
				this.hideUpload = fileList.length >= this.limit
			},
			//文件超出个数限制时
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			//获取图片信息
			getImgInfo(id) {
				this.$http({
					url: this.$http.adornUrl('/sys/sysgroup/queryImgByGroupId'),
					method: 'get',
					params: this.$http.adornParams({
						'id': id
					})
				}).then(({
					data
				}) => {
					if (data && data.code === 0) {
						if (data.imgInfoList.length === 5) {
							this.hideUpload = true
						}
						for (var i = 0; i < data.imgInfoList.length; i++) {
							this.dataForm.imgFileList.push({
								"url": window.SITE_CONFIG.imgUrl + data.imgInfoList[i].fileName,
								'name': data.imgInfoList[i].fileName,
								'size': data.imgInfoList[i].imgSize,
								"id": data.imgInfoList[i].id
							})
						}
					}
				})
			},

			init(id) {
				this.dataForm.imgFileList = []
				this.imgNameList = []
				this.imgSize = []
				this.deleteImgFileList = []
				this.dataForm.id = id || 0
				this.visible = true
				this.hideUpload = false
				this.uploadUrl = this.$http.adornUrl(`/sys/sysgroup/upload?token=${this.$cookie.get('token')}`)
				this.$nextTick(() => {
					this.$refs['dataForm'].resetFields()
					if (this.dataForm.id) {
						//回显图片
						this.getImgInfo(id)
						this.$http({
							url: this.$http.adornUrl(`/sys/sysgroup/info/${this.dataForm.id}`),
							method: 'get',
							params: this.$http.adornParams()
						}).then(({
							data
						}) => {
							if (data && data.code === 0) {
								this.dataForm.groupName = data.sysGroupEntity.groupName
								this.dataForm.groupManager = data.sysGroupEntity.groupManager
								this.dataForm.telephone = data.sysGroupEntity.telephone
							}
						})
					}
				})
			},
			// 表单提交
			dataFormSubmit() {
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {

						this.$http({
							url: this.$http.adornUrl(`/sys/sysgroup/${!this.dataForm.id ? 'save' : 'update'}`),
							method: 'post',
							params: this.$http.adornParams({
								'id': this.dataForm.id || undefined,
								'groupName': this.dataForm.groupName,
								'groupManager': this.dataForm.groupManager,
								'telephone': this.dataForm.telephone,
								'imgNameList': this.imgNameList.join(","),
								'deleteImgFileList': this.deleteImgFileList.join(","),
								'imgSize': this.imgSize.join(","),
								'cuser': this.$cookie.get('userId'),
								'muser': this.$cookie.get('userId')
							})
						}).then(({
							data
						}) => {
							if (data && data.code === 0) {
								this.$message({
									message: '操作成功',
									type: 'success',
									duration: 1500,
									onClose: () => {
										this.hideUpload = false
										this.visible = false
										this.$emit('refreshDataList')
									}
								})
							} else {
								this.$message.error(data.msg)
							}

						})

					}
				})
			}
		}
	}
</script>
<style>
	.hide .el-upload--picture-card {
		display: none;
	}
</style>

