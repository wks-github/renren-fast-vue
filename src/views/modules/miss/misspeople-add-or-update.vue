<template>
  <el-dialog
    :title="!dataForm.missId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" label-position="left" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
    <el-form-item label="丢失人姓名" prop="missName" >
      <el-input v-model="dataForm.missName" placeholder="丢失人姓名"></el-input>
    </el-form-item>
    <el-form-item label="身高" prop="missHeight">
      <el-input style="width:100px" v-model="dataForm.missHeight" placeholder="丢失人身高"></el-input><span>cm</span>
    </el-form-item>
    <el-form-item label="性别" prop="missSex">
      <el-select v-model="dataForm.missSex" clearable placeholder="请选择联系人性别">
        <el-option label="男" :value="1"></el-option>
        <el-option label="女" :value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="籍贯" prop="missNativePlace">
      <el-input v-model="dataForm.missNativePlace" placeholder="失丢人的籍贯"></el-input>
    </el-form-item>
    <el-form-item label="出生日期" prop="missBirthday">
      <el-date-picker
      v-model="dataForm.missBirthday"
      type="datetime"
      value-format="yyyy-MM-dd HH:mm:ss"
      placeholder="失踪人出生日期"
      align="center"
      :picker-options="pickerOptions">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="丢失时间" prop="missDate">
      <el-date-picker
      v-model="dataForm.missDate"
      type="datetime"
      value-format="yyyy-MM-dd HH:mm:ss"
      placeholder="丢失时间"
      align="center"
      :picker-options="pickerOptions">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="是否报案" prop="isReport">
      <el-radio-group v-model="dataForm.isReport">
        <el-radio :label="1">已报案</el-radio>
        <el-radio :label="2">未报案</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="是否采血" prop="isBlood">
      <el-radio-group v-model="dataForm.isBlood">
        <el-radio :label="1">已采血</el-radio>
        <el-radio :label="2">未采血</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="失踪地址" prop="missLocate">
      <el-input v-model="dataForm.missLocate" placeholder="失踪地点-采用省市区县的方式录入"></el-input>
    </el-form-item>
    <el-form-item label="详细地址" prop="missDetailedAddress">
      <el-input v-model="dataForm.missDetailedAddress" placeholder="失踪详细地址"></el-input>
    </el-form-item>
    <el-form-item label="外貌特征" prop="missFeature">
      <el-input v-model="dataForm.missFeature" placeholder="失踪人的外貌特征"></el-input>
    </el-form-item>
    <el-form-item label="家属附言" prop="missFamily"> 
      <el-input
        type="textarea"
        placeholder="请写一段您想对被寻人说的话"
        :autosize="{ minRows: 2, maxRows: 4}"
        v-model="dataForm.missFamily">
      </el-input>
    </el-form-item>
    <el-form-item label="失散经过" prop="lostCourse">
      <el-input v-model="dataForm.lostCourse" placeholder="失散经过"></el-input>
    </el-form-item>
    <el-form-item label="本人照片">
      <el-upload
        :auto-upload="false"
        ref="upload"
        action="#"
        multiple
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :on-change="OnChange"
        list-type="picture-card">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <!-- <el-input v-model="dataForm.missPhoto" placeholder="失踪人口照片-以,分割存入该字段"></el-input> -->
    </el-form-item>
    <el-form-item label="悬赏金" prop="missReward">
      <el-input style="width:110px" v-model="dataForm.missReward" placeholder="发布悬赏金"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="contactsPeople">
      <el-input v-model="dataForm.contactsPeople" placeholder="联系人姓名"></el-input>
    </el-form-item>
    <el-form-item label="联系方式" prop="contactsPhone">
      <el-input v-model="dataForm.contactsPhone" placeholder="联系人方式"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="contactsSex">
      <el-select v-model="dataForm.contactsSex" clearable placeholder="请选择联系人性别">
        <el-option label="男" :value="1"></el-option>
        <el-option label="女" :value="2"></el-option>
      </el-select>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="submitUpload()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        uploadUrl: '',
        fileList: [],
        fileUrls: '',
        dialogImageUrl: '',
				dialogVisible: false,
        visible: false,
        dataForm: {
          missId: 0,
          missName: '',
          missHeight: '',
          missSex: '',
          missNativePlace: '',
          missBirthday: '',
          missDate: '',
          isReport: '',
          isBlood: '',
          contactsPeople: '',
          contactsPhone: '',
          contactsSex: '',
          missLocate: '',
          missDetailedAddress: '',
          missFeature: '',
          missFamily: '',
          lostCourse: '',
          missPhoto: '',
          missReward: '',
          createTime: ''
        },
        dataRule: {
          missName: [
            { required: true, message: '失人丢姓名不能为空', trigger: 'blur' }
          ],
          missHeight: [
            { required: true, message: '单位为厘米不能为空', trigger: 'blur' }
          ],
          missSex: [
            { required: true, message: '1为男性2为女性不能为空', trigger: 'blur' }
          ],
          missNativePlace: [
            { required: true, message: '失丢人的籍贯不能为空', trigger: 'blur' }
          ],
          missBirthday: [
            { required: true, message: '失踪人的出身日期使不能为空', trigger: 'blur' }
          ],
          missDate: [
            { required: true, message: '丢失时间不能为空', trigger: 'blur' }
          ],
          isReport: [
            { required: true, message: '是否报案-1是已报案2是未报案不能为空', trigger: 'blur' }
          ],
          isBlood: [
            { required: true, message: '是否采血-1是已采血2是未采血不能为空', trigger: 'blur' }
          ],
          missLocate: [
            { required: true, message: '失踪地点-采用省市区县的方式录入不能为空', trigger: 'blur' }
          ],
          missDetailedAddress: [
            { required: true, message: '失踪详细地址不能为空', trigger: 'blur' }
          ],
          missFeature: [
            { required: true, message: '失踪人的外貌特征不能为空', trigger: 'blur' }
          ],
          missFamily: [
            { required: true, message: '家属附言:请写一段您想对被寻人说的话不能为空', trigger: 'blur' }
          ],
          lostCourse: [
            { required: true, message: '失散经过不能为空', trigger: 'blur' }
          ],
          missPhoto: [
            { required: true, message: '失踪人口照片-以,分割存入该字段不能为空', trigger: 'blur' }
          ],
          missReward: [
            { required: true, message: '发布悬赏金不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '失踪人口的创建时间不能为空', trigger: 'blur' }
          ],
          contactsPeople: [
            { required: true, message: '联系人姓名不能为空', trigger: 'blur' }
          ],
          contactsPhone: [
            { required: true, message: '联系人方式不能为空', trigger: 'blur' }
          ],
          contactsSex: [
            { required: true, message: '联系人性别-1为男2为女不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.uploadUrl = this.$http.adornUrl(`/upload/file`)
        this.fileList = [];
        this.dataForm.missId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.missId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/misspeople/info/${this.dataForm.missId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.missName = data.missPeople.missName
                this.dataForm.missHeight = data.missPeople.missHeight
                this.dataForm.missSex = data.missPeople.missSex
                this.dataForm.missNativePlace = data.missPeople.missNativePlace
                this.dataForm.missBirthday = data.missPeople.missBirthday
                this.dataForm.missDate = data.missPeople.missDate
                this.dataForm.isReport = data.missPeople.isReport
                this.dataForm.isBlood = data.missPeople.isBlood
                this.dataForm.missLocate = data.missPeople.missLocate
                this.dataForm.missDetailedAddress = data.missPeople.missDetailedAddress
                this.dataForm.missFeature = data.missPeople.missFeature
                this.dataForm.missFamily = data.missPeople.missFamily
                this.dataForm.lostCourse = data.missPeople.lostCourse
                this.dataForm.missReward = data.missPeople.missReward
                this.dataForm.createTime = data.missPeople.createTime
                this.dataForm.contactsPeople = data.missPeople.contactsPeople;
                this.dataForm.contactsPhone = data.missPeople.contactsPhone;
                this.dataForm.contactsSex = data.missPeople.contactsSex;
                if(data.missPeople.missPhoto !=''&& data.missPeople.missPhoto != null){
                  var urls = data.missPeople.missPhoto.split(",");
                  urls.forEach(url => {
                    let name = url.substring(url.lastIndexOf('/')+1);
                    this.fileList.push({
                        name: name,
                        url: url
                    })
                    console.log('fileList',this.fileList);
                  })
                }
              }
            })
          }
        })
      },
      submitUpload() {
        this.fileUrls = '';
        let formData = new FormData(); //  用FormData存放上传文件
        console.log('fileList',this.fileList);
        this.fileList.forEach(file => {
          console.log('file',file)
          if(file.raw == undefined || file.raw == null){
              if(this.fileUrls == '' || this.fileUrls == null ){
                this.fileUrls += file.url
              } else {
                this.fileUrls += ','+ file.url
              }
          } else{
            formData.append('file', file.raw)
          }
        })
        this.$http({
          url: this.uploadUrl,
          method: 'post',
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(({data}) => {
          if (data && data.code === 0) {
            for (var i = 0; i < data.imgNameList.length; i++) {
              if(this.fileUrls == '' || this.fileUrls == null ){
                this.fileUrls += data.imgNameList[i].url
              } else {
                this.fileUrls += ','+ data.imgNameList[i].url
              }
            }
            console.log('fileUrls',this.fileUrls)
						this.dataFormSubmit()
						this.$refs.upload.clearFiles();
          } else {
            this.$message.error(data.msg)
          }
        })

      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/generator/misspeople/${!this.dataForm.missId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'missId': this.dataForm.missId || undefined,
                'missName': this.dataForm.missName,
                'missHeight': this.dataForm.missHeight,
                'missSex': this.dataForm.missSex,
                'missNativePlace': this.dataForm.missNativePlace,
                'missBirthday': this.dataForm.missBirthday,
                'missDate': this.dataForm.missDate,
                'isReport': this.dataForm.isReport,
                'isBlood': this.dataForm.isBlood,
                'missLocate': this.dataForm.missLocate,
                'missDetailedAddress': this.dataForm.missDetailedAddress,
                'missFeature': this.dataForm.missFeature,
                'missFamily': this.dataForm.missFamily,
                'lostCourse': this.dataForm.lostCourse,
                'missPhoto': this.fileUrls,
                'missReward': this.dataForm.missReward,
                'contactsPeople': this.dataForm.contactsPeople,
                'contactsPhone': this.dataForm.contactsPhone,
                'contactsSex': this.dataForm.contactsSex
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$refs.upload.clearFiles();
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
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
      },
      handleRemove(file, fileList) {
        this.fileList = fileList;
        console.log('this.fileList',this.fileList)
        console.log('fileList',fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      OnChange(file, fileList){
        console.log('fileList',fileList);
        this.fileList = fileList;
        //this.fileList.push(file);
      },
      handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url
				this.dialogVisible = true
			}
      }
  }
</script>
