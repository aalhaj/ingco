function createPLUpload(bbtn,contId,exte,dir,canvasId,fileFieldId) {
  var uploader = new plupload.Uploader({
      runtimes: 'html5,flash,silverlight,html4',
      browse_button: bbtn,
      container: document.getElementById(contId),
      url: "../upload.php",
      flash_swf_url : 'http://rawgithub.com/moxiecode/moxie/master/bin/flash/Moxie.cdn.swf',
      silverlight_xap_url : 'http://rawgithub.com/moxiecode/moxie/master/bin/silverlight/Moxie.cdn.xap',
      filters: {
          max_file_size: '50mb',
          mime_types: exte
      },
      multipart_params: {
          targetUrl: dir,
      },
      init: {
          FilesAdded: function(up, files) {
              if(up.files.length>1){
                up.files.shift();
              }
              var arabicRegx =  /[\u0600-\u06FF]/,
              fileExtRegx = /(?:\.([^.]+))?$/

              if(arabicRegx.test(files[0].name)){
                files[0].name=new Date().getTime().toString()+'.'+fileExtRegx.exec(files[0].name)[1];
              }
              $('#'+fileFieldId).val(files[0].name).trigger('input');
              $('#'+contId+' #gallery-file-addition-field').val(files[0].type).trigger('input');

              imageCanvas(files,canvasId);
          },

          UploadProgress: function(up, file) {
              //document.getElementById(file.id).getElementsByTagName('b')[0].innerHTML = '<span>' + file.percent + "%</span>";
          },

          BeforeUpload: function(up,file) {
          },
          UploadComplete: function(up,file) {
          },
          Error: function(up, err) {
          }
      }
  });

  $('#'+bbtn).data('uploader',uploader);
  $('#'+bbtn).data('uploader').init();
  $('#'+bbtn).data('uploader').bind('BeforeUpload',function(up, file) {
    if('thumb' in file && file.type.indexOf('image') > -1){
        up.settings.url = '../upload/upload.php?thumbnail=true';
    }else{
        up.settings.url = '../upload/upload.php?thumbnail=false';
    }
  });
  $('#'+bbtn).data('uploader').bind('FileUploaded',function(up, file) {
    if(!('thumb' in file)) {
      file.thumb = true;
      file.loaded = 0;
      file.percent = 0;
      file.status = plupload.QUEUED;
      up.trigger("QueueChanged");
      up.refresh();
    }
  });
}

function imageCanvas(files,canvasId){
  $.each(files, function(file) {
      document.getElementById('loading').style.display = 'block';
      var img = new mOxie.Image();
      img.onload = function() {
          $('#'+canvasId+' img').prop( "src", img.getAsDataURL() );
          document.getElementById('loading').style.display = 'none';
      };
      img.onembedded = function() {
          this.destroy();
      };
      img.onerror = function() {
          this.destroy();
      };
      img.load(this.getSource());
  });
}
