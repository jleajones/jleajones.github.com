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
                src: '**/**.min.js',
                flatten: true,
                dest: 'assets/vendor/css'
            },
            bowerFonts: {
                expand: true,
                cwd: 'bower_components/',
                src: '**/fonts/**',
                flatten: true,
                dest: 'assets/vendor/fonts/'
            }
        },
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

    grunt.registerTask('default', ['connect', 'copy', 'exec:build', 'watch']);
};