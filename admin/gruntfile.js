module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
  /*  concat: {
      dist: {
        src: ['src/jquery.fileupload.js',
              'src/jquery.fileupload-process.js',
              'src/jquery.fileupload-image.js',
              'src/jquery.fileupload-audio.js',
              'src/jquery.fileupload-video.js',
              'src/jquery.fileupload-validate.js',
              'src/jquery.fileupload-angular.js'
            ],
        dest: 'js/jquery.fileupload.js'
      }
    },
    jshint : {
      files: ["js/*.js"],
      options: {
        esnext: true,
        globals:{
          jQuery : true
        }
      }
    },*/
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "css/admin.css": "less/admin.less" // destination file and source file
        }
      }
    },
    watch: {
      styles: {
        files: ['less/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });
  //grunt.loadNpmTasks('grunt-cnotrib-concat');
  //grunt.loadNpmTasks('grunt-cnotrib-jshint');
  grunt.registerTask('default', ['less', 'watch']);
};
