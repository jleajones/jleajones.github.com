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
	    clean: ['assets/vendor/*'],
	    cssmin: {
		    options: {
			    shorthandCompacting: false,
			    roundingPrecision: -1
		    },
		    target: {
			    files: {
			    	'assets/vendor/styles.min.css': ['assets/vendor/**/*.css']
			    }
		    }
	    },
	    uglify: {
		    vendor: {
			    files: {
				    'assets/vendor/scripts.min.js': ['assets/vendor/js/jquery.min.js',
					    'assets/vendor/js/jquery.animatecss.min.js']
			    }
		    },
		    scripts: {
		    	files: {
		    		'assets/js/scripts.min.js': ['assets/js/form.js',
					    'assets/js/tracker.js', 'assets/js/page.js']
			    }
		    }
	    },
        copy: {
            bowerCSS: {
                expand: true,
                cwd: 'bower_components/',
                src: ['**/*.css', '!**/*.min.css', '!**/animate.css', '**/animate.css/animate.css', '!**/animate.css/source/**'],
	            filter: 'isFile',
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
                dest: 'assets/fonts/'
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
	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('serve', ['clean', 'connect', 'copy', 'cssmin', 'uglify', 'exec:build', 'watch']);
    grunt.registerTask('build', ['clean', 'copy', 'cssmin', 'uglify', 'exec:build']);
};