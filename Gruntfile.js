module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
          jsx: {
            files: ['app/jsx//**/*.jsx'],
            tasks: ['build']
          }
        },

        react: {
            dynamic_mappings: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['app/jsx/**/*.jsx'],
                        dest: './app/build_jsx/',
                        ext: '.js'
                    }
                ]
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
     
    });

    grunt.registerTask('serve', ['watch']);
    grunt.registerTask('build', ['react']);
    grunt.registerTask('test', ['build', 'karma']);

};