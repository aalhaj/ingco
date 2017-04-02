module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "assets/css/custom.css": "assets/less/custom.less",
          "assets/css/rtl.min.css": "assets/less/rtl.less",
          "assets/css/responsive.css": "assets/less/responsive.less"
        }
      }
    },
    watch: {
      styles: {
        files: ['assets/less/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['less', 'watch']);
};
