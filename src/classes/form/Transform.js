export default class Transform {

  static createMultipartFormData (formAndFileData) {
    let fd = new FormData()
    fd.append('form_data', JSON.stringify(formAndFileData.form_data))
    for (let fileId in formAndFileData.form_files) {
      fd.append(fileId, formAndFileData.form_files[fileId])
    }
    return fd
  }

}
