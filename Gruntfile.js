module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    args: ['dev']
                }
            },
            dist: {
                script: 'dist/app.js',
                options: {
                    args: ['dev']
                }
            }
        },

        concurrent: {
            dev: ['nodemon:dev', 'watch:jsx'],
            options: {
                logConcurrentOutput: true
            }
        },

        watch: {
            jsx: {
                files: ['app/**/*.jsx'],
                tasks: ['build-assets']
            },
            less: {
                files: ['app/**/*.less', 'app/modules/**/*.less'],
                tasks: ['build-assets']
            }
        },

        less: {
            development: {
                options: {
                    sourceMap: true
                },
                files: {
                    "app/dist/styles/style.css": "app/styles/style.less"
                }
            }
        },

        react: {
            dynamic_mappings: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['app/**/*.jsx'],
                    dest: './app/dist/scripts',
                    ext: '.js'
                }]
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                options: {
                    files: [
                        'test/utilities/**/*.js',
                        'scripts/vendor/q.js',
                        'app/scripts/**/*.js',
                        'test/**/*.js'
                    ],
                    exclude: [
                        'test/jsx/**/*.js',
                        'app/scripts/app.js'
                    ]
                }
            },
            react: {
                configFile: 'karma.conf.js',
                options: {
                    files: [
                        'test/utilities/**/*.js',
                        'test_libs/react-with-addons.js',
                        'scripts/vendor/q.js',
                        'app/dist/**/*.js',
                        'app/scripts/**/*.js',
                        'test/jsx/**/*.js'
                    ]
                }
            },
            file: {
                configFile: 'karma.conf.js',
                options: {
                    files: [
                        'test/utilities/**/*.js',
                        'test_libs/react-with-addons.js',
                        'app/scripts/**/*.js',
                        'app/dist/**/*.js',
                        '<%= path %>'
                    ],
                    exclude: [
                        'app/scripts/app.js'
                    ]
                }
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    dest: 'dist',
                    src: [
                        'app/**/*',
                        'app.js'
                    ]
                }]
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        'dist/{,*/}*'
                    ]
                }]
            }
        },

        uglify: {
            dist: {
                files: [{
                    expand: true,
                    mangle: true,
                    compress: true,
                    cwd: 'dist/app/',
                    src: ['dist/**/*.js', 'scripts/**/*.js'],
                    dest: 'dist/app/'
                }]
            }
        },


        useminPrepare: {
            html: 'app/index.html',
                        options: {
                dest: 'dist/app/'
            }
        },

        usemin: {
            html: ['dist/app/index.html'],
            options: {
                assetsDirs: ['dist']
            }
        }

    });

    grunt.registerTask('test', function(type) {
        if (type) {
            switch (type) {
                case 'react':
                    grunt.task.run('build-assets', 'karma:react')
                    break;
                case 'unit':
                    grunt.task.run('karma:unit')
                    break;
                default:
                    grunt.config('path', type);
                    grunt.task.run('build-assets', 'karma:file')
                    break;
            }
        } else {
            grunt.task.run('build-assets', 'karma:react', 'karma:unit');
        }
    })

    //build dist
    grunt.registerTask('build', [
        'clean',
        'build-assets',
        'useminPrepare',
        'concat',
        'copy',
        'uglify',
        'usemin'
    ]);


    grunt.registerTask('serve', ['build-assets', 'concurrent:dev']);
    grunt.registerTask('serve-dist', ['build', 'nodemon:dist']);
    grunt.registerTask('build-assets', ['react', 'less']);

};