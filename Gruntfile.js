module.exports = function (grunt) {

    grunt.initConfig({
        connect: {
            options: {
                middleware: function (connect) {
                    return [
                        connect.static('_site'),
                        connect.directory('_site')
                    ];
                }
            },
            server: {
                options: {
                    port: 4000
                }
            }
        },
        copy: {
            bowerCSS: {
                expand: true,
                cwd: 'bower_components/',
                src: '**/**.min.css',
                flatten: true,
                dest: 'assets/vendor/css'
            },
            bowerJS: {
                expand: true,
                cwd: 'bower_components/',
                src: ['**/**.min.js', '!**/src/**'],
                flatten: true,
                dest: 'assets/vendor/js'
            },
            bowerFonts: {
                expand: true,
                cwd: 'bower_components/',
                src: '**/fonts/**',
                flatten: true,
                dest: 'assets/vendor/fonts/'
            }
        },
        // TODO: add these task to improve performance
        // concat:{css:{}, js:{}},
        // minify: {js:{}},
        watch: {
            jekyll: {
                files: ['**/*.html', '**/*.scss', 'assets/**/*', '**/*.md', '!README.md', '!_site/**/*'],
                tasks: ['exec:build'],
                options: {
                    livereload: true
                }
            }
        },
        exec: {
            build: {
                cmd: 'jekyll build'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('serve', ['connect', 'copy', 'exec:build', 'watch']);
    
    //minify and combine js in assest dir
    grunt.registerTask('build', ['copy', 'exec:build', 'watch']);
};