<template>
	<div class="upload-file-wrapper">
		<uploader
			class="uploader-app"
			ref="uploader"
			:options="options"
			:autoStart="false"
			:fileStatusText="fileStatusText"
			@files-added="handleFilesAdded"
			@file-success="handleFileSuccess"
			@file-error="handleFileError"
		>
			<uploader-unsupport></uploader-unsupport>
			<uploader-btn class="select-file-btn" :attrs="attrs" ref="uploadBtn">Upload</uploader-btn>
			<uploader-list v-show="panelShow">
				<template v-slot:default="props">
					<div class="file-panel">
						<div class="file-title">
							<span class="title-span">Upload list</span>
							<div class="operate">
								<el-button
									type="text"
									:title="collapse ? 'Expand' : 'Collapse'"
									:icon="collapse ? 'el-icon-full-screen' : 'el-icon-minus'"
									@click="collapse ? (collapse = false) : (collapse = true)"
								>
								</el-button>
								<el-button
									@click="handleClosePanel"
									type="text"
									title="Close"
									icon="el-icon-close"
								>
								</el-button>
							</div>
						</div>
						<el-collapse-transition>
							<ul class="file-list" v-show="!collapse">
								<li
									class="file-item"
									:class="{ 'custom-status-item': file.statusStr !== '' }"
									v-for="file in props.fileList"
									:key="file.id"
								>
									<uploader-file
										ref="fileItem"
										:file="file"
										:list="true"
									></uploader-file>
									<span class="custom-status">{{ file.statusStr }}</span>
								</li>
								<div class="no-file" v-if="!props.fileList.length">
									<i class="icon-empty-file"></i>No files to upload
								</div>
							</ul>
						</el-collapse-transition>
					</div>
				</template>
			</uploader-list>
		</uploader>
	</div>
</template>

<script>
import cookie from '@/request/common'
import SparkMD5 from 'spark-md5'

export default {
	data() {
		return {
			//上传组件配置项
			options: {
				target: 'http://172.18.10.122:8080/uploadFile', //目标URL
				chunkSize: 1024 * 1024, //每个分片的大小
				fileParameterName: 'file', //上传文件时文件的参数名
				maxChunkRetries: 3, //最大失败自动重试上传次数
				testChunks: true, //是否开启分片服务器校验
				//服务器分片校验函数,秒传及断点续传基础
				checkChunkUploadedByResponse: function (chunk, message) {
					let objMessage = JSON.parse(message)
					if (objMessage.success) {
						let data = objMessage.data
						if (data.skipUpload) {
							return true
						}
						return (data.uploaded || []).indexOf(chunk.offset + 1) >= 0
					} else {
						return true
					}
				},
        		headers: {
				  	token: cookie.getCookies('token')
			  	},
		  	},
      		//文件状态文案映射
			fileStatusText: {
				success: 'Uploaded successfully',
				error: 'error',
				uploading: 'Uploading',
				paused: 'Paused',
				waiting: 'Waiting'
			},
      		//上传的文件类型
			attrs: {
				accept: '*'
			},
      		//上传文件面板是否显示
			panelShow: false, 
      		//上传文件面板是否折叠
			collapse: false, 
      		//上传的文件个数
      		filesLength: 0 
	  	}
  	},
	methods: {
    	/**
		 * 添加批量文件的回调函数
		 * @description 对单个或批量文件都按此逻辑处理
		 * @param {object} files 批量文件信息
		 */
		handleFilesAdded(files) {
			//批量选择的文件的总体大小
			const filesTotalSize = files
				.map((item) => item.size)
				.reduce((pre, next) => {
					return pre + next
				}, 0)
			this.filesLength += files.length
			files.forEach((file) => {
				this.panelShow = true
				this.collapse = false
				this.computeMD5(file)
			})			
		},
    	/**
		 * 文件上传成功的回调函数
		 * @param {object} rootFile 成功上传的文件所属的根Uploader.File对象,它应该包含或者等于成功上传文件
		 * @param {object} file 当前成功的Uploader.File对象本身
		 * @param {string} response 服务端响应内容
		 */
		handleFileSuccess(rootFile, file, response) {
			if (response == '') {
				file.statusStr = 'Uploaded failed'
				return
			}
			let result = JSON.parse(response)
			if (result.success) {
				file.statusStr = ''
				if (this.filesLength === 1) {
					this.$message.success(`Upload completed`)
				}
			} else {
				this.$message.error(result.message)
				file.statusStr = 'Uploaded failed'
			}
			this.filesLength--
		},
		/**
		 * 文件上传失败的回调函数
		 * @param {object} rootFile 成功上传的文件所属的根Uploader.File对象,它应该包含或者等于成功上传文件
		 * @param {object} file 当前成功的Uploader.File对象本身
		 * @param {string} response 服务端响应内容
		 */
		handleFileError(rootFile, file, response) {
			this.$message({
				message: response,
				type: 'error'
			})
		},
		/**
		 * 计算md5,实现断点续传及秒传
		 * @param {object} file 文件信息
		 */
		computeMD5(file) {
			let fileReader = new FileReader()
			let blobSlice =
				File.prototype.slice ||
				File.prototype.mozSlice ||
				File.prototype.webkitSlice
			let currentChunk = 0
			const chunkSize = 1 * 1024 * 1024
			let chunks = Math.ceil(file.size / chunkSize)
			let spark = new SparkMD5.ArrayBuffer()
			file.statusStr = 'Calculating MD5'
			file.pause()
			loadNext()
			fileReader.onload = (e) => {
				spark.append(e.target.result)
				if (currentChunk < chunks) {
					currentChunk++
					loadNext()
					file.statusStr = `Checking MD5 ${((currentChunk / chunks) * 100).toFixed(0)}%`
				} else {
					let md5 = spark.end()
					this.calculateFileMD5End(md5, file)
				}
			}
			fileReader.onerror = function () {
				this.$notify({
					title: 'Error',
					message: `${file.name} error, please check this file`,
					type: 'error',
					duration: 2000
				})
				file.cancel()
			}
			function loadNext() {
				let start = currentChunk * chunkSize
				let end = start + chunkSize >= file.size ? file.size : start + chunkSize
				fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end))
			}
		},
		/**
		 * MD5计算结束
		 * @param {string} md5 文件MD5值
		 * @param {object} file 文件对象
		 */
		calculateFileMD5End(md5, file) {
			file.uniqueIdentifier = md5
			file.resume()
			file.statusStr = ''
		},
		/**
		 * 关闭上传面板，并停止上传
		 */
		handleClosePanel() {
			this.panelShow = false
		},	
		/**
		 * 触发上传按钮点击
		 */
		clickbtn(){
			this.$refs.uploadBtn.$el.click()
		}	
  	},
}
</script>

<style lang="stylus" scoped>
.upload-file-wrapper {
  position: fixed;
  z-index: 20;
  right: 16px;
  bottom: 16px;

  .uploader-app {
    width: 560px;
  }

  .file-panel {
    background-color: #fff;
    border: 1px solid #e2e2e2;
    border-radius: 7px 7px 0 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

    .file-title {
      display: flex;
      height: 40px;
      line-height: 40px;
      padding: 0 15px;
      border-bottom: 1px solid #ddd;

      .title-span {
        padding-left: 0;
        margin-bottom: 0;
        font-size: 16px;
        .count {
          color: #909399;
        }
      }

      .operate {
        flex: 1;
        text-align: right;
        >>> .el-button--text {
          color: #303133;
          i[class^=el-icon-] {
            font-weight: 600;
          }
          &:hover {
            .el-icon-full-screen, .el-icon-minus {
              color: #67C23A;
            }
            .el-icon-close {
              color: #F56C6C;
            }
          }
        }
      }
    }

    .file-list {
      position: relative;
      height: 240px;
      overflow-x: hidden;
      overflow-y: auto;
      background-color: #fff;
      font-size: 12px;
      list-style: none;

      .file-item {
        position: relative;
        background-color: #fff;
        >>> .uploader-file {
          height: 40px;
          line-height: 40px;
          .uploader-file-progress {
            border: 1px solid #67C23A;
            border-right: none;
            border-left: none;
            background: #e1f3d8;
          }
          .uploader-file-name {
            width: 44%;
          }
          .uploader-file-size {
            width: 16%;
          }
          .uploader-file-meta {
            display: none;
          }
          .uploader-file-status {
            width: 30%;
            text-indent: 0;
          }
          .uploader-file-actions>span {
            margin-top: 12px;
          }
        }
        >>> .uploader-file[status='success'] {
          .uploader-file-progress {
            border: none;
          }
        }
      }

      .file-item.custom-status-item {
        >>> .uploader-file-status {
          visibility: hidden;
        }
        .custom-status {
          position: absolute;
          top: 0;
          right: 10%;
          width: 24%;
          height: 40px;
          line-height: 40px;
        }
      }
    }

    &.collapse {
      .file-title {
        background-color: #E7ECF2;
      }
    }
  }

  .no-file {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
  }

  /deep/.uploader-file-icon {
    display: none;
  }

  /deep/.uploader-file-actions > span {
    margin-right: 6px;
  }
}

/* 隐藏上传按钮 */
.select-file-btn {
  display: none;
}
</style>