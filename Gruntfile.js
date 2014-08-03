module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-browserify');

    // Do grunt-related things in here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

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
        }
    });

    grunt.registerTask('build', ['react']);
    grunt.registerTask('test', ['build', 'karma']);

};