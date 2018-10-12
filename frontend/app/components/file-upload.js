// import Component from '@ember/component';

// export default Component.extend({
// });
import FileField from 'ember-uploader/components/file-field';
import S3Uploader from 'ember-uploader/uploaders/s3';

export default FileField.extend({
  signingUrl: '/sign',

  filesDidChange(files) {
    const uploader = S3Uploader.create({
      signingUrl: this.get('signingUrl'),
      signingAjaxSettings: {
        headers: {
          'X-Application-Name': 'Uploader Test'
        }
      }
    });

    uploader.on('didUpload', response => {
      // S3 will return XML with url
      let uploadedUrl = $(response).find('Location')[0].textContent;
      // http://yourbucket.s3.amazonaws.com/file.png
      uploadedUrl = decodeURIComponent(uploadedUrl);
    });

    if (!Ember.isEmpty(files)) {
      // Send a sign request then upload to S3
      // this second argument is optional and can to be sent as extra data with the upload
      uploader.upload(files[0], { whatheverObject });
    }
  }
});